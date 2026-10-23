import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { socialLinks } from "@/config/site";
import type { Project } from "@/content/projects";
import { ArtImage } from "@/components/ui/ArtImage";
import { FacebookIcon, InstagramIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";

/** Credibility section: a featured project plus links to the studio's social channels. */
export function ProjectSpotlight({ project }: { project: Project }) {
  return (
    <section aria-labelledby="spotlight-heading" className="section-y">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-0">
        <Reveal y={40} className="relative lg:col-span-7 lg:col-start-1 lg:row-start-1">
          <div className="relative aspect-[4/3] overflow-hidden bg-sand lg:aspect-[5/4]">
            {/* Prefer a gallery photo other than the cover, so the spotlight doesn't repeat the grid card. */}
            <ArtImage
              image={project.gallery.find((img) => img.src !== project.cover.src) ?? project.cover}
              sizes="(min-width: 1024px) 58vw, 100vw"
            />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="relative flex flex-col justify-center bg-sand p-8 sm:p-12 lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:my-16 lg:p-14 xl:p-16">
          <p className="eyebrow flex items-center gap-3 text-bronze-deep">
            <span aria-hidden className="h-px w-8 bg-bronze-deep" />
            Project spotlight
          </p>
          <h2 id="spotlight-heading" className="mt-5 font-display text-subtitle text-charcoal sm:text-[2.75rem] sm:leading-[1.05]">
            {project.title}
          </h2>
          <p className="eyebrow mt-4 text-muted">
            {project.category}
            {project.location ? ` · ${project.location}` : ""}
          </p>
          <p className="mt-6 text-[0.9375rem] leading-relaxed text-muted">{project.summary}</p>
          <Link
            href={`/portfolio/${project.slug}`}
            className="group mt-8 inline-flex min-h-11 items-center gap-2 self-start text-[0.75rem] font-medium tracking-[0.14em] text-charcoal uppercase underline-offset-[6px] decoration-bronze hover:underline"
          >
            View the project
            <ArrowRight aria-hidden strokeWidth={1.5} className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <div className="mt-10 border-t border-charcoal/15 pt-8">
            <p className="text-[0.9375rem] text-charcoal">See our latest installations as they happen.</p>
            <a
              href={socialLinks.instagram.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-3 inline-flex min-h-11 items-center gap-2.5 text-sm text-charcoal hover:text-bronze-deep"
            >
              <InstagramIcon className="size-5" />
              <span className="font-medium">{socialLinks.instagram.handle}</span>
              <ArrowUpRight aria-hidden strokeWidth={1.5} className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              <span className="sr-only">(opens Instagram in a new tab)</span>
            </a>
            <a
              href={socialLinks.facebook.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-1 flex min-h-11 w-fit items-center gap-2.5 text-sm text-charcoal hover:text-bronze-deep"
            >
              <FacebookIcon className="size-5" />
              <span className="font-medium">{socialLinks.facebook.handle}</span>
              <ArrowUpRight aria-hidden strokeWidth={1.5} className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              <span className="sr-only">(opens Facebook in a new tab)</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
