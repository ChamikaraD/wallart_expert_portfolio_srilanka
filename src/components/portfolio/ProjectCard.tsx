import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/projects";
import { ArtImage } from "@/components/ui/ArtImage";

type ProjectCardProps = {
  project: Project;
  index?: number;
  /** Tailwind aspect-ratio class for the image, e.g. "aspect-[4/5]". */
  aspect?: string;
  sizes?: string;
  headingLevel?: "h2" | "h3";
};

export function ProjectCard({
  project,
  index,
  aspect = "aspect-[4/5]",
  sizes = "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw",
  headingLevel: Heading = "h3",
}: ProjectCardProps) {
  return (
    <article className="group relative">
      <div className={`relative overflow-hidden bg-sand ${aspect}`}>
        <ArtImage
          image={project.cover}
          sizes={sizes}
          className="transition-transform duration-[1400ms] ease-editorial group-hover:scale-[1.045] motion-reduce:transform-none"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-charcoal/0 transition-colors duration-700 ease-editorial group-hover:bg-charcoal/10"
        />
      </div>

      <div className="mt-5 flex items-start justify-between gap-6">
        <div>
          <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-1 text-muted">
            {typeof index === "number" ? <span className="text-bronze-deep">{String(index + 1).padStart(2, "0")}</span> : null}
            <span>{project.category}</span>
            {project.location ? (
              <>
                <span aria-hidden>·</span>
                <span>{project.location}</span>
              </>
            ) : null}
          </p>
          <Heading className="mt-3 font-display text-[1.65rem] leading-tight text-charcoal sm:text-[1.85rem]">
            <Link
              href={`/portfolio/${project.slug}`}
              className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-700 ease-editorial group-hover:bg-[length:100%_1px] after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
            >
              {project.title}
            </Link>
          </Heading>
        </div>
        <span
          aria-hidden
          className="mt-1 flex size-11 shrink-0 items-center justify-center rounded-full border border-line text-charcoal transition-all duration-500 ease-editorial group-hover:border-charcoal group-hover:bg-charcoal group-hover:text-ivory"
        >
          <ArrowUpRight strokeWidth={1.25} className="size-4 transition-transform duration-500 ease-editorial group-hover:rotate-45" />
        </span>
      </div>
      {/* Whole card is clickable via the stretched link; show focus ring on the card. */}
      <span aria-hidden className="pointer-events-none absolute -inset-2 hidden outline-2 outline-offset-0 outline-bronze-deep group-has-[a:focus-visible]:block" />
    </article>
  );
}
