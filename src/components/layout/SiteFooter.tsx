import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { contactConfig, mainNav, siteConfig, socialLinks } from "@/config/site";
import { services } from "@/content/services";
import { whatsappUrl } from "@/lib/contact";
import { FacebookIcon, InstagramIcon } from "@/components/ui/icons";
import { Logo } from "./Logo";
import { CurrentYear } from "./CurrentYear";

export function SiteFooter() {
  const wa = whatsappUrl();
  const contactItems = [
    contactConfig.phoneNumber && { label: "Hotline", value: contactConfig.phoneDisplay, href: `tel:+${contactConfig.phoneNumber}` },
    wa && { label: "WhatsApp", value: contactConfig.whatsappDisplay, href: wa, external: true },
    contactConfig.email && { label: "Email", value: contactConfig.email, href: `mailto:${contactConfig.email}` },
    contactConfig.address && { label: "Studio", value: contactConfig.address },
    contactConfig.serviceArea && { label: "Service area", value: contactConfig.serviceArea },
  ].filter(Boolean) as { label: string; value: string; href?: string; external?: boolean }[];

  return (
    <footer className="border-t border-line bg-ivory">
      <div className="container-page grid gap-14 py-16 md:grid-cols-12 md:gap-8 lg:py-24">
        <div className="md:col-span-5 lg:col-span-4">
          <Logo />
          <p className="mt-6 max-w-xs text-[0.9375rem] leading-relaxed text-muted">{siteConfig.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {wa ? (
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 bg-charcoal px-5 text-[0.75rem] font-medium tracking-[0.1em] text-ivory uppercase hover:bg-[#23211d]"
              >
                Chat on WhatsApp
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ) : null}
            <a
              href={socialLinks.instagram.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 border border-charcoal/25 px-5 text-[0.75rem] font-medium tracking-[0.1em] text-charcoal uppercase transition-colors hover:border-charcoal"
            >
              <InstagramIcon className="size-4" />
              Instagram
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <a
              href={socialLinks.facebook.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 border border-charcoal/25 px-5 text-[0.75rem] font-medium tracking-[0.1em] text-charcoal uppercase transition-colors hover:border-charcoal"
            >
              <FacebookIcon className="size-4" />
              Facebook
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>

        <nav aria-label="Footer" className="md:col-span-3 lg:col-span-2 lg:col-start-6">
          <h2 className="eyebrow text-muted">Explore</h2>
          <ul className="mt-5 space-y-3">
            {mainNav.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-[0.9375rem] text-charcoal underline-offset-4 decoration-bronze hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4 lg:col-span-2">
          <h2 className="eyebrow text-muted">Services</h2>
          <ul className="mt-5 space-y-3">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href="/#services" className="text-[0.9375rem] text-charcoal underline-offset-4 decoration-bronze hover:underline">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-12 lg:col-span-3 lg:col-start-10">
          <h2 className="eyebrow text-muted">Contact</h2>
          <ul className="mt-5 space-y-4 text-[0.9375rem]">
            {contactItems.map((item) => (
              <li key={item.label}>
                <span className="block text-xs text-muted">{item.label}</span>
                {item.href ? (
                  <a
                    href={item.href}
                    {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="text-charcoal hover:text-bronze-deep"
                  >
                    {item.value}
                    {item.external ? <span className="sr-only"> (opens in a new tab)</span> : null}
                  </a>
                ) : (
                  <span className="text-charcoal">{item.value}</span>
                )}
              </li>
            ))}
            <li>
              <span className="block text-xs text-muted">Instagram</span>
              <a
                href={socialLinks.instagram.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-charcoal hover:text-bronze-deep"
              >
                {socialLinks.instagram.handle}
                <ArrowUpRight aria-hidden strokeWidth={1.5} className="size-3.5" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
            <li>
              <span className="block text-xs text-muted">Facebook</span>
              <a
                href={socialLinks.facebook.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-charcoal hover:text-bronze-deep"
              >
                Wall Art Expert
                <ArrowUpRight aria-hidden strokeWidth={1.5} className="size-3.5" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
            <li>
              <Link href="/#contact" className="text-charcoal underline decoration-bronze underline-offset-4 hover:text-bronze-deep">
                Send a project inquiry
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CurrentYear /> {siteConfig.legalName}. All rights reserved.
          </p>
          <p>Crafted in {siteConfig.country}</p>
        </div>
      </div>
    </footer>
  );
}
