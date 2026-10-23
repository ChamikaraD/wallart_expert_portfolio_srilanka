import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft } from "lucide-react";
import { getProject, getSpace, projects } from "@/content/projects";
import { ArtImage } from "@/components/ui/ArtImage";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { primaryInquiry } from "@/lib/contact";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/portfolio/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: `${project.title} — ${project.category} by Wall Art Expert.`,
    alternates: { canonical: `/portfolio/${project.slug}` },
    // Keep sample projects out of search results until real work replaces them.
    robots: project.placeholder ? { index: false, follow: true } : undefined,
  };
}

export default function ProjectPage({ params }: PageProps<"/portfolio/[slug]">) {
  return (
    <Suspense fallback={<div className="container-page min-h-[70svh] pt-20" aria-busy="true" />}>
      <ProjectContent params={params} />
    </Suspense>
  );
}

async function ProjectContent({ params }: { params: PageProps<"/portfolio/[slug]">["params"] }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const space = getSpace(project.space);
  const related = projects.filter((p) => p.slug !== project.slug).slice(0, 3);
  const inquiry = primaryInquiry(`Hello Wall Art Expert, I saw "${project.title}" and would like to discuss a similar project.`);

  return (
    <article>
      <header className="container-page pt-12 pb-12 lg:pt-20">
        <Link href="/portfolio" className="inline-flex min-h-11 items-center gap-2 text-[0.75rem] tracking-[0.14em] text-muted uppercase hover:text-charcoal">
          <ArrowLeft aria-hidden strokeWidth={1.5} className="size-4" /> All projects
        </Link>
        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow text-bronze-deep">{project.category}</p>
            <h1 className="mt-4 font-display text-display font-normal tracking-[-0.02em]">{project.title}</h1>
          </div>
          <dl className="grid grid-cols-2 gap-6 border-t border-line pt-6 text-sm lg:col-span-4">
            {space ? (
              <div>
                <dt className="eyebrow text-muted">Space</dt>
                <dd className="mt-2">
                  <Link href={`/portfolio?space=${space.slug}`} className="underline decoration-bronze underline-offset-4">
                    {space.title}
                  </Link>
                </dd>
              </div>
            ) : null}
            {project.location ? (
              <div>
                <dt className="eyebrow text-muted">Location</dt>
                <dd className="mt-2">{project.location}</dd>
              </div>
            ) : null}
          </dl>
        </div>
      </header>

      {project.cover.height > project.cover.width ? (
        // Portrait artwork is shown whole at its natural ratio rather than cropped to a wide band.
        <div className="container-page">
          <div
            className="relative mx-auto max-w-2xl overflow-hidden bg-sand"
            style={{ aspectRatio: `${project.cover.width} / ${project.cover.height}` }}
          >
            <ArtImage image={project.cover} sizes="(min-width: 768px) 672px, 100vw" priority />
          </div>
        </div>
      ) : (
        <div className="px-[clamp(0.5rem,1.4vw,1.25rem)]">
          <div className="relative aspect-[4/3] overflow-hidden bg-sand lg:aspect-[21/9]">
            <ArtImage image={project.cover} sizes="100vw" priority />
          </div>
        </div>
      )}

      <section className="container-page section-y grid gap-10 lg:grid-cols-12">
        <h2 className="font-display text-subtitle lg:col-span-4">About the project</h2>
        <div className="lg:col-span-7 lg:col-start-6">
          <p className="text-lead text-muted">{project.summary}</p>
          <div className="mt-10">
            <ButtonLink href={inquiry.href} external={inquiry.external}>
              Discuss a Similar Project
            </ButtonLink>
          </div>
        </div>
      </section>

      {project.gallery.length > 1 ? (
        <section aria-label="Gallery" className="container-page grid gap-6 sm:grid-cols-2">
          {project.gallery.slice(1).map((img, i, rest) => {
            // A lone image spans the full width; artwork is never cropped (natural aspect ratio).
            const solo = rest.length === 1;
            return (
              <div
                key={img.src}
                className={`relative overflow-hidden bg-sand ${solo ? "sm:col-span-2" : ""}`}
                style={{ aspectRatio: `${img.width} / ${img.height}` }}
              >
                <ArtImage image={img} sizes={solo ? "(min-width: 1536px) 1440px, 100vw" : "(min-width: 640px) 50vw, 100vw"} />
              </div>
            );
          })}
        </section>
      ) : null}

      <section aria-labelledby="related-heading" className="container-page section-y">
        <h2 id="related-heading" className="font-display text-title">More projects</h2>
        <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>
    </article>
  );
}
