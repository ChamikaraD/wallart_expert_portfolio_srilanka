import "server-only";

import nodemailer from "nodemailer";
import { contactConfig } from "@/config/site";

/**
 * Notification channels for new project inquiries. Credentials come only from server-side
 * environment variables (see .env.example) and are never sent to the browser.
 *
 * - Email:    Gmail SMTP with an App Password  → GMAIL_USER, GMAIL_APP_PASSWORD
 * - WhatsApp: WhatsApp Business Cloud API (Meta) → WHATSAPP_TOKEN, WHATSAPP_PHONE_NUMBER_ID,
 *             WHATSAPP_TO, WHATSAPP_TEMPLATE; or CallMeBot → CALLMEBOT_PHONE, CALLMEBOT_APIKEY
 */

export type Inquiry = {
  name: string;
  contact: string;
  space: string;
  service: string;
  message: string;
};

export type ChannelResult = { channel: "email" | "whatsapp"; ok: boolean; skipped?: boolean; error?: string };

const env = (key: string) => process.env[key]?.trim() ?? "";

export function inquiryText(i: Inquiry): string {
  return [
    "New project inquiry — wallartexpert website",
    "",
    `Name: ${i.name}`,
    `Contact: ${i.contact}`,
    i.space ? `Space: ${i.space}` : null,
    i.service ? `Service: ${i.service}` : null,
    "",
    "Message:",
    i.message,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function sendInquiryEmail(i: Inquiry): Promise<ChannelResult> {
  const user = env("GMAIL_USER");
  const pass = env("GMAIL_APP_PASSWORD").replace(/\s/g, "");
  if (!user || !pass) return { channel: "email", ok: false, skipped: true };

  const to = env("INQUIRY_TO_EMAIL") || contactConfig.email || user;
  const replyTo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(i.contact) ? i.contact : undefined;
  const rows: [string, string][] = [
    ["Name", i.name],
    ["Contact", i.contact],
    ["Space", i.space || "—"],
    ["Service", i.service || "—"],
  ];

  try {
    const transporter = nodemailer.createTransport({ service: "gmail", auth: { user, pass } });
    await transporter.sendMail({
      from: `"Wall Art Expert Website" <${user}>`,
      to,
      replyTo,
      // Strip line breaks so user input can't inject extra headers.
      subject: `New inquiry from ${i.name}`.replace(/[\r\n]+/g, " ").slice(0, 150),
      text: inquiryText(i),
      html: `
        <div style="font-family:Arial,sans-serif;color:#34312C;max-width:560px">
          <h2 style="font-weight:normal;margin:0 0 16px">New project inquiry</h2>
          <table style="border-collapse:collapse;width:100%;font-size:14px">
            ${rows
              .map(
                ([k, v]) =>
                  `<tr><td style="padding:6px 12px 6px 0;color:#716A60;width:90px">${k}</td><td style="padding:6px 0">${escapeHtml(v)}</td></tr>`,
              )
              .join("")}
          </table>
          <p style="margin:20px 0 6px;color:#716A60;font-size:13px">Message</p>
          <p style="margin:0;font-size:15px;line-height:1.6;white-space:pre-wrap">${escapeHtml(i.message)}</p>
          <p style="margin:24px 0 0;color:#716A60;font-size:12px">Sent from the contact form on the Wall Art Expert website.${
            replyTo ? " Reply to this email to answer the client directly." : ""
          }</p>
        </div>`,
    });
    return { channel: "email", ok: true };
  } catch (err) {
    return { channel: "email", ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

/**
 * WhatsApp alert. Uses the official WhatsApp Business Cloud API when configured, otherwise
 * falls back to CallMeBot. Returns `skipped` when neither is configured.
 */
export async function sendInquiryWhatsApp(i: Inquiry): Promise<ChannelResult> {
  if (env("WHATSAPP_TOKEN") && env("WHATSAPP_PHONE_NUMBER_ID") && env("WHATSAPP_TO")) return sendViaCloudApi(i);
  return sendViaCallMeBot(i);
}

/** Template parameters may not contain line breaks, tabs or long runs of spaces. */
const templateParam = (s: string, max: number) =>
  (s || "—").replace(/[\r\n\t]+/g, " ").replace(/ {4,}/g, "   ").trim().slice(0, max);

async function sendViaCloudApi(i: Inquiry): Promise<ChannelResult> {
  const version = env("WHATSAPP_GRAPH_VERSION") || "v23.0";
  const to = env("WHATSAPP_TO").replace(/\D/g, "");
  const template = env("WHATSAPP_TEMPLATE");

  // Business-initiated messages need an approved template. Without one, a plain text message
  // is sent, which WhatsApp only delivers within 24 hours of the owner messaging the business number.
  const message = template
    ? {
        type: "template",
        template: {
          name: template,
          language: { code: env("WHATSAPP_TEMPLATE_LANG") || "en" },
          components: [
            {
              type: "body",
              parameters: [
                templateParam(i.name, 100),
                templateParam(i.contact, 150),
                templateParam(i.space, 80),
                templateParam(i.service, 80),
                templateParam(i.message, 600),
              ].map((text) => ({ type: "text", text })),
            },
          ],
        },
      }
    : { type: "text", text: { preview_url: false, body: inquiryText(i).slice(0, 4000) } };

  try {
    const res = await fetch(`https://graph.facebook.com/${version}/${env("WHATSAPP_PHONE_NUMBER_ID")}/messages`, {
      method: "POST",
      headers: { Authorization: `Bearer ${env("WHATSAPP_TOKEN")}`, "Content-Type": "application/json" },
      body: JSON.stringify({ messaging_product: "whatsapp", to, ...message }),
      signal: AbortSignal.timeout(12_000),
      cache: "no-store",
    });
    if (!res.ok) {
      const body = await res.text();
      return { channel: "whatsapp", ok: false, error: `WhatsApp Cloud API ${res.status}: ${body.slice(0, 300)}` };
    }
    return { channel: "whatsapp", ok: true };
  } catch (err) {
    return { channel: "whatsapp", ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

async function sendViaCallMeBot(i: Inquiry): Promise<ChannelResult> {
  const phone = env("CALLMEBOT_PHONE").replace(/[^\d+]/g, "");
  const apikey = env("CALLMEBOT_APIKEY");
  if (!phone || !apikey) return { channel: "whatsapp", ok: false, skipped: true };

  const url = new URL("https://api.callmebot.com/whatsapp.php");
  url.searchParams.set("phone", phone);
  url.searchParams.set("apikey", apikey);
  url.searchParams.set("text", inquiryText(i).slice(0, 1500));

  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(12_000), cache: "no-store" });
    const body = await res.text();
    // CallMeBot answers 200 with an HTML page; failures mention "error" or "apikey".
    if (!res.ok || /error|invalid|apikey is not/i.test(body)) {
      return { channel: "whatsapp", ok: false, error: `HTTP ${res.status}: ${body.replace(/<[^>]+>/g, " ").trim().slice(0, 200)}` };
    }
    return { channel: "whatsapp", ok: true };
  } catch (err) {
    return { channel: "whatsapp", ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}
