"use server";

import { headers } from "next/headers";
import { sendInquiryEmail, sendInquiryWhatsApp, type Inquiry } from "@/lib/notify";

export type InquiryState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Partial<Record<"name" | "contact" | "message", string>>;
  /** Echo the visitor's input back so a failed submission doesn't wipe the form. */
  values?: Partial<Inquiry>;
};

const LIMITS = { name: 100, contact: 150, space: 80, service: 80, message: 3000 } as const;

// Best-effort spam throttle (per server instance): 5 inquiries per IP per 10 minutes.
const recent = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  hits.push(now);
  recent.set(ip, hits);
  return hits.length > 5;
}

const field = (data: FormData, key: keyof typeof LIMITS) => String(data.get(key) ?? "").trim().slice(0, LIMITS[key]);

export async function submitInquiry(_prev: InquiryState, data: FormData): Promise<InquiryState> {
  const values: Inquiry = {
    name: field(data, "name"),
    contact: field(data, "contact"),
    space: field(data, "space"),
    service: field(data, "service"),
    message: field(data, "message"),
  };

  // Honeypot (hidden from people) and a minimum fill time catch most bots silently.
  const startedAt = Number(data.get("started_at") ?? 0);
  if (String(data.get("website") ?? "") !== "" || (startedAt && Date.now() - startedAt < 2500)) {
    return { status: "success", message: "Thank you — we'll be in touch soon." };
  }

  const fieldErrors: InquiryState["fieldErrors"] = {};
  if (values.name.length < 2) fieldErrors.name = "Please enter your name.";
  const digits = values.contact.replace(/\D/g, "");
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.contact);
  if (!isEmail && digits.length < 9) fieldErrors.contact = "Please enter a phone number or email so we can reply.";
  if (values.message.length < 10) fieldErrors.message = "Please tell us a little about your wall (at least a sentence).";
  if (Object.keys(fieldErrors).length) {
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors, values };
  }

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) {
    return { status: "error", message: "Too many inquiries in a short time. Please try again later or WhatsApp us.", values };
  }

  const results = await Promise.all([sendInquiryEmail(values), sendInquiryWhatsApp(values)]);
  for (const r of results) {
    if (!r.ok && !r.skipped) console.error(`[inquiry] ${r.channel} notification failed:`, r.error);
  }

  if (results.some((r) => r.ok)) {
    return { status: "success", message: "Thank you — your inquiry has been sent. We'll get back to you shortly." };
  }

  if (results.every((r) => r.skipped)) {
    console.error("[inquiry] No notification channel is configured. Set GMAIL_* and/or WHATSAPP_* (or CALLMEBOT_*) env variables — see .env.example.");
  }
  return {
    status: "error",
    message: "Sorry, your inquiry couldn't be sent right now. Please WhatsApp or call us instead.",
    values,
  };
}
