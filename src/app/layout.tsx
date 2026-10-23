import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { contactConfig, siteConfig, socialLinks } from "@/config/site";
import { images } from "@/content/images";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MotionProvider } from "@/components/layout/MotionProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.seo.title, template: siteConfig.seo.titleTemplate },
  description: siteConfig.seo.description,
  keywords: [...siteConfig.seo.keywords],
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_LK",
    siteName: siteConfig.legalName,
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    url: "/",
    images: [{ url: images.nineArchBridge.src, width: images.nineArchBridge.width, height: images.nineArchBridge.height, alt: images.nineArchBridge.alt }],
  },
  twitter: { card: "summary_large_image", title: siteConfig.seo.title, description: siteConfig.seo.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#F8F5EF",
};

// Structured data limited to verified facts supplied by the company.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.legalName,
  url: siteConfig.url,
  logo: `${siteConfig.url.replace(/\/$/, "")}/brand/logo-full.png`,
  sameAs: [socialLinks.instagram.href, socialLinks.facebook.href],
  email: contactConfig.email || undefined,
  telephone: contactConfig.phoneNumber ? `+${contactConfig.phoneNumber}` : undefined,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable} antialiased`}>
      <body className="flex min-h-svh flex-col overflow-x-clip">
        <a
          href="#main"
          className="sr-only z-[60] bg-charcoal px-4 py-3 text-sm text-ivory focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <MotionProvider>
          <AnnouncementBar />
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </MotionProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
