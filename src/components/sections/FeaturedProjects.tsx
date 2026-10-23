import { featuredProjects } from "@/content/projects";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Editorial, asymmetric layout. Each slot defines its grid placement and image ratio,
 * so the composition stays balanced regardless of which projects are featured.
 */
const slots = [
  { cell: "md:col-span-2 lg:col-span-7", aspect: "aspect-[4/3]", sizes: "(min-width: 1024px) 58vw, 100vw" },
  { cell: "lg:col-span-4 lg:col-start-9 lg:mt-40", aspect: "aspect-[4/5]", sizes: "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" },
  { cell: "lg:col-span-4 lg:col-start-2 lg:-mt-10", aspect: "aspect-[3/4]", sizes: "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" },
  { cell: "lg:col-span-6 lg:col-start-7 lg:mt-24", aspect: "aspect-[4/5] lg:aspect-[4/3]", sizes: "(min-width: 1024px) 50vw, (min-width: 768px) 50vw, 100vw" },
  { cell: "lg:col-span-6 lg:mt-8", aspect: "aspect-[4/3]", sizes: "(min-width: 768px) 50vw, 100vw" },
  { cell: "md:col-span-2 lg:col-span-6 lg:col-start-7 lg:mt-28", aspect: "aspect-[4/3] md:aspect-[16/10] lg:aspect-[4/3]", sizes: "(min-width: 1024px) 50vw, 100vw" },
];

export function FeaturedProjects() {
  return (
    <section id="selected-works" aria-labelledby="works-heading" className="section-y bg-white">
      <div className="container-page">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="works-heading"
            eyebrow="Portfolio"
            title={
              <>
                Selected <em className="italic">Works</em>
              </>
            }
            intro="A closer look at the spaces we've helped transform."
          />
          <Reveal className="shrink-0">
            <ButtonLink href="/portfolio" variant="outline">
              View All Projects
            </ButtonLink>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-x-6 gap-y-16 md:grid-cols-2 md:gap-x-8 lg:mt-24 lg:grid-cols-12 lg:gap-y-20">
          {featuredProjects.map((project, i) => {
            const slot = slots[i % slots.length];
            return (
              <Reveal key={project.slug} className={slot.cell} delay={(i % 3) * 0.08}>
                <ProjectCard project={project} index={i} aspect={slot.aspect} sizes={slot.sizes} />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
