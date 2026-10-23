import { images } from "@/content/images";
import { ArtImage } from "@/components/ui/ArtImage";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";

/** Brand statement. Copy describes approach only — no history or claims. OWNER APPROVAL */
export function Intro() {
  return (
    <section id="about" aria-labelledby="about-heading" className="section-y">
      <div className="container-page grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6 xl:col-span-5">
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-bronze-deep">
              <span aria-hidden className="h-px w-8 bg-bronze-deep" />
              About Wall Art Expert
            </p>
            <h2 id="about-heading" className="mt-5 font-display text-title font-normal tracking-[-0.01em] text-balance">
              More Than a Wall. <em className="text-bronze-deep italic">A Statement.</em>
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="mt-8 max-w-xl space-y-5 text-lead text-muted">
            <p>
              A wall is often the largest surface in a room — and the most overlooked. We see it as a canvas: a place
              to express character, set a mood and give a space its sense of identity.
            </p>
            <p>
              Every piece we create begins with the room itself — its proportions, its light and the people who use
              it — so the finished work feels like it has always belonged there.
            </p>
          </Reveal>

          <Reveal delay={0.2} className="mt-10 grid max-w-xl grid-cols-3 border-t border-line">
            {["Artistic expression", "Thoughtful design", "Careful craftsmanship"].map((value, i) => (
              <p key={value} className="border-line pt-5 pr-3 text-[0.8125rem] leading-snug text-charcoal [&:not(:first-child)]:border-l [&:not(:first-child)]:pl-4">
                <span className="mb-2 block font-display text-xl text-bronze-deep italic">0{i + 1}</span>
                {value}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.25} className="mt-10">
            <ButtonLink href="/#services" variant="text">
              Discover our services
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal className="relative lg:col-span-6 lg:col-start-7 xl:col-span-6 xl:col-start-7" y={40}>
          <div className="relative ml-auto w-[88%] sm:w-[78%] lg:w-[86%]">
            <div className="relative aspect-[4/5] overflow-hidden bg-sand">
              <ArtImage image={images.intro} sizes="(min-width: 1024px) 40vw, 80vw" />
            </div>
            {/* Offset frame line echoing a mounted artwork */}
            <div aria-hidden className="absolute -bottom-4 -left-4 -z-10 h-full w-full border border-bronze/50 sm:-bottom-6 sm:-left-6" />
          </div>
          <p className="mt-10 ml-auto w-[88%] text-xs tracking-[0.12em] text-muted uppercase sm:w-[78%] lg:w-[86%]">
            Art that belongs to the room
          </p>
        </Reveal>
      </div>
    </section>
  );
}
