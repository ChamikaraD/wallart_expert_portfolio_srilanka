import { contactConfig, socialLinks } from "@/config/site";

export const hasWhatsApp = contactConfig.whatsappNumber.trim().length > 0;

export function whatsappUrl(message: string = contactConfig.whatsappGreeting): string | null {
  if (!hasWhatsApp) return null;
  return `https://wa.me/${contactConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export type InquiryAction = { href: string; external: boolean; channel: "whatsapp" | "form" };

/**
 * Where "Discuss Your Project" should lead: WhatsApp with a prefilled message when a
 * verified number is configured, otherwise the on-page contact form.
 */
export function primaryInquiry(message?: string): InquiryAction {
  const wa = whatsappUrl(message);
  if (wa) return { href: wa, external: true, channel: "whatsapp" };
  return { href: "/#contact", external: false, channel: "form" };
}

export const instagramDm = socialLinks.instagram.directMessage;
