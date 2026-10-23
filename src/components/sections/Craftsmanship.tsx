import { images } from "@/content/images";
import { ArtImage } from "@/components/ui/ArtImage";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const principles = [
  { title: "Scale & proportion", text: "Composition planned around the wall, the furniture and the sightlines of the room." },
  { title: "Colour & light", text: "Palettes chosen to sit naturally with the interior through morning and evening light." },
  { title: "Detail & finish", text: "Attention to edges, textures and surfaces — the details you notice up close." },
];

/**
 * Signature feature (fallback). Shown instead of the before/after comparison until the
 * company supplies an authentic before/after photo pair.
 */
export function Craftsmanship() {
  return (
    <section aria-labelledby="craft-heading" className="section-y">
      <div className="container-page">
        <SectionHeading
          id="craft-heading"
          eyebrow="Craftsmanship"
          title={
            <>
              Made by Hand. <em className="italic">Finished with Care.</em>
            </>
          }
        />
      </div>

      <Reveal y={40} className="mt-14 px-[clamp(0.5rem,1.4vw,1.25rem)] lg:mt-20">
        <figure className="relative">
          <ParallaxImage image={images.craftWide} sizes="100vw" className="aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9]" />
          <figcaption className="absolute right-4 bottom-4 max-w-[16rem] bg-ivory px-5 py-4 text-sm leading-snug text-charcoal sm:right-8 sm:bottom-8">
            <span className="eyebrow mb-2 block text-bronze-deep">In the making</span>
            Every piece takes shape through layers of careful, deliberate work.
          </figcaption>
        </figure>
      </Reveal>

      <div className="container-page mt-16 grid gap-12 md:grid-cols-12 md:gap-8 lg:mt-24">
        <Reveal className="relative aspect-[4/5] overflow-hidden bg-sand md:col-span-4">
          <ArtImage image={images.craftDetail} sizes="(min-width: 768px) 33vw, 100vw" />
        </Reveal>

        <div className="md:col-span-4 md:self-center md:px-2 lg:px-6">
          <ol className="space-y-9">
            {principles.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.1}>
                  <h3 className="flex items-baseline gap-4 font-display text-[1.6rem] text-charcoal">
                    <span aria-hidden className="font-sans text-[0.6875rem] tracking-[0.2em] text-bronze-deep">{String(i + 1).padStart(2, "0")}</span>
                    {p.title}
                  </h3>
                  <p className="mt-2 pl-9 text-[0.9375rem] leading-relaxed text-muted">{p.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal delay={0.15} className="relative aspect-[4/5] overflow-hidden bg-sand md:col-span-4 md:mt-24">
          <ArtImage image={images.craftLandscape} sizes="(min-width: 768px) 33vw, 100vw" />
        </Reveal>
      </div>
    </section>
  );
}
