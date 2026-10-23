/**
 * Central site configuration for Wall Art Expert (Pvt) Ltd.
 *
 * Anything marked `OWNER APPROVAL` must be confirmed by the company before launch.
 * Never fill contact fields with guessed values — leave them empty until verified.
 * Components hide or fall back gracefully when a value is empty.
 */

export const siteConfig = {
  name: "Wall Art Expert",
  legalName: "Wall Art Expert (Pvt) Ltd",
  country: "Sri Lanka",

  /**
   * Production URL, used for canonical links, Open Graph and the sitemap.
   * Set NEXT_PUBLIC_SITE_URL in the deployment environment (e.g. https://example.lk).
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  seo: {
    title: "Wall Art Expert — Bespoke Wall Art & Feature Walls in Sri Lanka",
    titleTemplate: "%s · Wall Art Expert",
    description:
      "Wall Art Expert (Pvt) Ltd creates thoughtfully crafted wall art and feature walls for homes, hospitality and commercial interiors in Sri Lanka. Explore our work and discuss your project.",
    keywords: [
      "wall art Sri Lanka",
      "feature wall design",
      "custom wall art",
      "decorative wall painting",
      "interior wall art",
    ],
  },

  /** Short brand line used in the footer and metadata. OWNER APPROVAL */
  tagline: "Thoughtfully crafted wall art for spaces with a story to tell.",

  /** Thin strip above the header. Set `enabled: false` to hide it. OWNER APPROVAL */
  announcement: {
    enabled: true,
    message: "Bespoke wall art for homes, hospitality and commercial interiors",
    link: { label: "Discuss your project", href: "#contact" },
  },

  hero: {
    eyebrow: "Wall Art Expert · Sri Lanka",
    headline: ["Walls That", "Tell a Story."],
    description:
      "Thoughtfully crafted wall art that transforms ordinary spaces into extraordinary experiences.",
    primaryCta: { label: "Explore Our Work", href: "#selected-works" },
    secondaryCta: { label: "Discuss Your Project" },
  },
} as const;

export type NavLink = { label: string; href: string };

export const mainNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Services", href: "/#services" },
  { label: "About Us", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export const socialLinks = {
  instagram: {
    label: "Instagram",
    handle: "@wall_art_expert_pvt_ltd",
    href: "https://www.instagram.com/wall_art_expert_pvt_ltd/",
    /** Opens an Instagram direct message thread with the studio. */
    directMessage: "https://ig.me/m/wall_art_expert_pvt_ltd",
  },
  facebook: {
    label: "Facebook",
    handle: "Wall Art Expert on Facebook",
    href: "https://www.facebook.com/Simpletones.lk",
  },
} as const;

/**
 * Verified contact details. Leave a field as an empty string until the owner confirms it.
 * - whatsappNumber / phoneNumber: international format, digits only (e.g. "94XXXXXXXXX").
 * - *Display: how the number is shown on the page.
 */
export type ContactConfig = {
  whatsappNumber: string;
  whatsappDisplay: string;
  phoneNumber: string;
  phoneDisplay: string;
  email: string;
  address: string;
  serviceArea: string;
  whatsappGreeting: string;
};

export const contactConfig: ContactConfig = {
  whatsappNumber: "94702341274",
  whatsappDisplay: "070 234 1274",
  phoneNumber: "94775504202", // hotline
  phoneDisplay: "077 550 4202",
  email: "wallartexpertpvt@gmail.com",
  address: "", // OWNER APPROVAL
  serviceArea: "", // OWNER APPROVAL — e.g. "Island-wide across Sri Lanka"
  whatsappGreeting:
    "Hello Wall Art Expert, I'd like to discuss a wall art project for my space.",
};

/** Brand colour tokens — mirrored as CSS variables in globals.css. */
export const brandColors = {
  ivory: "#F8F5EF",
  charcoal: "#34312C",
  bronze: "#B49A7A",
  sand: "#E7DED0",
  white: "#FFFFFF",
  muted: "#716A60",
  border: "#DED6C9",
} as const;
