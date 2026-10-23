import { ArrowRight } from "lucide-react";
import { services } from "@/content/services";
import { primaryInquiry } from "@/lib/contact";
import { ArtImage } from "@/components/ui/ArtImage";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Services() {
  const pending = services.some((s) => !s.approved);
  const general = primaryInquiry();

  return (
    <section id="services" aria-labelledby="services-heading" className="section-y bg-sand">
      <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              id="services-heading"
              eyebrow="What we do"
              pendingApproval={pending}
              title={
                <>
                  Our <em className="italic">Services</em>
                </>
              }
              intro="Each commission is shaped around the space it lives in — from a single feature wall to a complete interior scheme."
            />
            <Reveal delay={0.15} className="mt-10">
              <ButtonLink href={general.href} external={general.external}>
                Discuss Your Project
              </ButtonLink>
            </Reveal>
          </div>
        </div>

        <RevealGroup as="li" className="border-t border-charcoal/15 lg:col-span-8">
          {services.map((service, i) => {
            const inquiry = primaryInquiry(`Hello Wall Art Expert, I'd like to ask about ${service.title} for my space.`);
            return (
              <RevealItem
                as="li"
                key={service.slug}
                className="group grid grid-cols-[1fr_auto] gap-x-5 gap-y-4 border-b border-charcoal/15 py-9 sm:grid-cols-[3.5rem_1fr_11rem] sm:gap-x-8 sm:py-11"
              >
                <span className="hidden font-display text-2xl text-bronze-deep italic sm:block">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="min-w-0">
                  <h3 className="font-display text-subtitle text-charcoal">{service.title}</h3>
                  <p className="mt-4 max-w-lg text-[0.9375rem] leading-relaxed text-muted">{service.description}</p>
                  <a
                    href={inquiry.href}
                    {...(inquiry.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="mt-6 inline-flex min-h-11 items-center gap-2 text-[0.75rem] font-medium tracking-[0.14em] text-charcoal uppercase underline-offset-[6px] decoration-bronze hover:underline"
                  >
                    Inquire<span className="sr-only"> about {service.title}</span>
                    <ArrowRight aria-hidden strokeWidth={1.5} className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>

                <div className="relative row-start-1 size-24 self-start overflow-hidden bg-ivory sm:col-start-3 sm:aspect-[4/3] sm:size-auto sm:w-full">
                  <ArtImage
                    image={service.image}
                    sizes="(min-width: 640px) 176px, 96px"
                    hideLabel
                    className="transition-transform duration-[1200ms] ease-editorial group-hover:scale-105 motion-reduce:transform-none"
                  />
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
