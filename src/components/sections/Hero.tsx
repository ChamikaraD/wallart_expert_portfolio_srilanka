import { ArrowDown } from "lucide-react";
import { siteConfig } from "@/config/site";
import { heroSlides } from "@/content/projects";
import { primaryInquiry } from "@/lib/contact";
import { HeroSlideshow } from "./HeroSlideshow";
import { ButtonLink } from "@/components/ui/ButtonLink";

/**
 * Hero — text is server-rendered with CSS keyframe entrances, so it appears without waiting
 * for JavaScript. The background is a slideshow of real projects (see heroSlides).
 */
export function Hero() {
  const { eyebrow, headline, description, primaryCta, secondaryCta } = siteConfig.hero;
  const inquiry = primaryInquiry();

  return (
    <section aria-labelledby="hero-heading" className="px-[clamp(0.5rem,1.4vw,1.25rem)]">
      <div className="animate-unveil relative isolate flex h-[calc(100svh-7.5rem)] max-h-[60rem] lg:h-[calc(100svh-9.25rem)] min-h-[36rem] overflow-hidden bg-charcoal">
        <HeroSlideshow slides={heroSlides} />

        {/* Legibility scrims: bottom fade on all viewports, plus a left wash on wide screens. */}
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-[#1d1b18]/90 via-[#1d1b18]/60 to-[#1d1b18]/15 lg:via-[#1d1b18]/45 lg:to-[#1d1b18]/5" />
        <div aria-hidden className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-[#1d1b18]/55 via-transparent to-transparent lg:block" />

        {/* Passe-partout line — frames the photograph like a mounted artwork. */}
        <div aria-hidden className="pointer-events-none absolute inset-3 border border-ivory/20 sm:inset-5" />

        <div className="container-page relative mt-auto grid gap-10 pb-12 sm:pb-16 lg:grid-cols-12 lg:items-end lg:pb-20">
          <div className="lg:col-span-8">
            <p className="animate-fade-up eyebrow flex items-center gap-3 text-ivory/80" style={{ animationDelay: "250ms" }}>
              <span aria-hidden className="h-px w-8 bg-bronze" />
              {eyebrow}
            </p>

            <h1 id="hero-heading" className="mt-6 font-display text-display font-normal tracking-[-0.02em] text-ivory">
              {headline.map((line, i) => (
                <span key={line} className="block overflow-hidden pb-[0.08em]">
                  <span className="animate-rise block" style={{ animationDelay: `${350 + i * 140}ms` }}>
                    {i === headline.length - 1 ? <ItalicLastWord text={line} /> : line}
                  </span>
                </span>
              ))}
            </h1>

            <p
              className="animate-fade-up mt-7 max-w-md text-lead text-ivory/85 text-pretty"
              style={{ animationDelay: "750ms" }}
            >
              {description}
            </p>

            <div
              className="animate-fade-up mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
              style={{ animationDelay: "900ms" }}
            >
              <ButtonLink href={primaryCta.href} variant="ivory">
                {primaryCta.label}
              </ButtonLink>
              <ButtonLink href={inquiry.href} external={inquiry.external} variant="outline-ivory">
                {secondaryCta.label}
              </ButtonLink>
            </div>
          </div>

          <div
            className="animate-fade-up hidden items-end justify-end gap-6 lg:col-span-4 lg:flex"
            style={{ animationDelay: "1100ms" }}
          >
            <a
              href="#about"
              className="group flex items-center gap-3 text-[0.6875rem] tracking-[0.22em] text-ivory/75 uppercase hover:text-ivory"
            >
              Scroll to discover
              <span className="flex size-10 items-center justify-center rounded-full border border-ivory/30 transition-colors group-hover:border-ivory">
                <ArrowDown aria-hidden strokeWidth={1.25} className="size-4 transition-transform duration-500 group-hover:translate-y-0.5" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ItalicLastWord({ text }: { text: string }) {
  const idx = text.lastIndexOf(" ");
  if (idx === -1) return <em className="italic">{text}</em>;
  return (
    <>
      {text.slice(0, idx + 1)}
      <em className="text-[#E3D3BC] italic">{text.slice(idx + 1)}</em>
    </>
  );
}
