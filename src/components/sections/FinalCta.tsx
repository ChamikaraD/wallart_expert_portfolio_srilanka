import { contactConfig, socialLinks } from "@/config/site";
import { hasWhatsApp, primaryInquiry, whatsappUrl } from "@/lib/contact";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { FacebookIcon, InstagramIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "./ContactForm";

export function FinalCta() {
  const inquiry = primaryInquiry();
  const wa = whatsappUrl();

  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative overflow-hidden bg-charcoal text-ivory">
      {/* Restrained bronze frame line as a single decorative accent. */}
      <div aria-hidden className="pointer-events-none absolute inset-3 border border-bronze/25 sm:inset-5" />

      <div className="container-page relative section-y">
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="eyebrow flex items-center justify-center gap-3 text-bronze">
            <span aria-hidden className="h-px w-8 bg-bronze" />
            Start a conversation
            <span aria-hidden className="h-px w-8 bg-bronze" />
          </p>
          <h2 id="contact-heading" className="mt-6 font-display text-display font-normal tracking-[-0.02em] text-balance">
            Have a Wall <em className="text-bronze italic">in Mind?</em>
          </h2>
          <p className="mx-auto mt-7 max-w-lg text-lead text-ivory/75">
            Let&apos;s explore how thoughtful wall art can transform your space.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href={hasWhatsApp ? inquiry.href : "#inquiry-form"} external={inquiry.external} variant="ivory">
              Discuss Your Project
            </ButtonLink>
            <ButtonLink href="/portfolio" variant="outline-ivory">
              Explore Our Portfolio
            </ButtonLink>
          </div>
        </Reveal>

        <div className="mt-20 grid gap-12 lg:mt-28 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-4">
            <h3 className="font-display text-subtitle">Tell us about your space</h3>
            <p className="mt-5 max-w-sm text-[0.9375rem] leading-relaxed text-ivory/70">
              Share a few details and we&apos;ll get back to you to talk through ideas, scale and next steps.
            </p>

            <ul className="mt-10 space-y-5 border-t border-ivory/15 pt-8 text-[0.9375rem]">
              {wa ? (
                <li>
                  <span className="eyebrow block text-ivory/55">WhatsApp</span>
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block hover:text-bronze">
                    {contactConfig.whatsappDisplay || "Chat with us"}
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ) : null}
              {contactConfig.phoneNumber ? (
                <li>
                  <span className="eyebrow block text-ivory/55">Hotline</span>
                  <a href={`tel:+${contactConfig.phoneNumber}`} className="mt-1 inline-block hover:text-bronze">
                    {contactConfig.phoneDisplay}
                  </a>
                </li>
              ) : null}
              {contactConfig.email ? (
                <li>
                  <span className="eyebrow block text-ivory/55">Email</span>
                  <a href={`mailto:${contactConfig.email}`} className="mt-1 inline-block hover:text-bronze">
                    {contactConfig.email}
                  </a>
                </li>
              ) : null}
              <li>
                <span className="eyebrow block text-ivory/55">Instagram</span>
                <a
                  href={socialLinks.instagram.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-2 hover:text-bronze"
                >
                  <InstagramIcon className="size-4" />
                  {socialLinks.instagram.handle}
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
              <li>
                <span className="eyebrow block text-ivory/55">Facebook</span>
                <a
                  href={socialLinks.facebook.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-2 hover:text-bronze"
                >
                  <FacebookIcon className="size-4" />
                  Wall Art Expert
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
              {contactConfig.serviceArea ? (
                <li>
                  <span className="eyebrow block text-ivory/55">Service area</span>
                  <span className="mt-1 inline-block">{contactConfig.serviceArea}</span>
                </li>
              ) : null}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="scroll-mt-28 lg:col-span-8" >
            <div id="inquiry-form">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
