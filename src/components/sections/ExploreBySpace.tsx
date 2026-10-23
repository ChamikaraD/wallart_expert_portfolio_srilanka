import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { spaces } from "@/content/projects";
import { ArtImage } from "@/components/ui/ArtImage";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Room-led discovery. Desktop: panels widen on hover/focus. Mobile & tablet: a
 * swipeable, snap-scrolling row. Titles are always visible — hover only adds detail.
 */
export function ExploreBySpace() {
  return (
    <section aria-labelledby="spaces-heading" className="section-y overflow-hidden">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            id="spaces-heading"
            className="lg:col-span-7"
            eyebrow="Explore by space"
            pendingApproval
            title={
              <>
                Art for every <em className="italic">kind of room</em>
              </>
            }
          />
          <Reveal className="lg:col-span-4 lg:col-start-9">
            <p className="max-w-md text-lead text-muted">
              From private homes to busy dining rooms, discover how wall art shapes the character of each space.
            </p>
          </Reveal>
        </div>

        <Reveal y={32} className="mt-14 lg:mt-20">
          <ul className="-mx-[var(--gutter)] flex snap-x snap-mandatory scroll-px-[var(--gutter)] gap-3 overflow-x-auto px-[var(--gutter)] pb-4 [scrollbar-width:none] sm:gap-4 lg:mx-0 lg:h-[34rem] lg:snap-none lg:overflow-visible lg:px-0 lg:pb-0 xl:h-[38rem] [&::-webkit-scrollbar]:hidden">
            {spaces.map((space, i) => (
              <li
                key={space.slug}
                className="group relative w-[78%] shrink-0 snap-start transition-[flex-grow] duration-700 ease-editorial sm:w-[44%] lg:w-auto lg:min-w-0 lg:flex-1 lg:hover:flex-[2.1] lg:has-[a:focus-visible]:flex-[2.1]"
              >
                <Link
                  href={`/portfolio?space=${space.slug}`}
                  className="relative flex aspect-[3/4] h-full flex-col justify-between overflow-hidden bg-charcoal p-5 text-ivory sm:p-6 lg:aspect-auto"
                >
                  <ArtImage
                    image={space.image}
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 80vw"
                    labelPosition="bottom"
                    className="transition-transform duration-[1400ms] ease-editorial group-hover:scale-105 motion-reduce:transform-none"
                  />
                  <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#1d1b18]/85 via-[#1d1b18]/25 to-[#1d1b18]/20 transition-opacity duration-700 group-hover:opacity-90" />

                  <span className="relative eyebrow text-ivory/80">{String(i + 1).padStart(2, "0")}</span>

                  <span className="relative mb-10 block">
                    <span className="block font-display text-[1.75rem] leading-[1.05] text-balance lg:text-[1.9rem]">{space.title}</span>
                    <span className="mt-3 block max-w-[16rem] text-sm text-ivory/80 lg:max-h-0 lg:overflow-hidden lg:opacity-0 lg:transition-all lg:duration-700 lg:ease-editorial lg:group-hover:max-h-20 lg:group-hover:opacity-100 lg:group-has-[a:focus-visible]:max-h-20 lg:group-has-[a:focus-visible]:opacity-100">
                      {space.description}
                    </span>
                    <span className="mt-4 inline-flex items-center gap-2 text-[0.6875rem] tracking-[0.2em] uppercase">
                      View projects
                      <ArrowRight aria-hidden strokeWidth={1.5} className="size-3.5 transition-transform duration-500 group-hover:translate-x-1" />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
