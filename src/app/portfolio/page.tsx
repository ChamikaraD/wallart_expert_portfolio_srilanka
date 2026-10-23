import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { getSpace, projects, spaces, type Project } from "@/content/projects";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { primaryInquiry } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Explore wall art and feature wall projects by Wall Art Expert across homes, hospitality and commercial interiors.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage({ searchParams }: PageProps<"/portfolio">) {
  const inquiry = primaryInquiry();
  return (
    <>
      <section className="container-page pt-16 pb-12 lg:pt-24">
        <p className="eyebrow flex items-center gap-3 text-bronze-deep">
          <span aria-hidden className="h-px w-8 bg-bronze-deep" />
          Portfolio
        </p>
        <h1 className="mt-5 max-w-4xl font-display text-display font-normal tracking-[-0.02em]">
          Our <em className="italic">Work</em>
        </h1>
        <p className="mt-6 max-w-xl text-lead text-muted">
          A growing collection of spaces shaped by wall art. Browse by the kind of space you&apos;re planning.
        </p>
      </section>

      <Suspense fallback={<PortfolioSkeleton />}>
        <FilteredPortfolio searchParams={searchParams} />
      </Suspense>

      <section className="container-page section-y text-center">
        <h2 className="font-display text-title">Planning something similar?</h2>
        <div className="mt-8 flex justify-center">
          <ButtonLink href={inquiry.href} external={inquiry.external}>
            Discuss Your Project
          </ButtonLink>
        </div>
      </section>
    </>
  );
}

async function FilteredPortfolio({ searchParams }: { searchParams: PageProps<"/portfolio">["searchParams"] }) {
  const { space } = await searchParams;
  const active = getSpace(typeof space === "string" ? space : undefined);
  const items = active ? projects.filter((p) => p.space === active.slug) : projects;
  return <PortfolioGrid active={active?.slug} items={items} />;
}

function PortfolioGrid({ active, items }: { active: string | undefined; items: Project[] }) {
  const filters = [{ slug: undefined, title: "All spaces" }, ...spaces];
  return (
    <section aria-label="Projects" className="container-page">
      <nav aria-label="Filter by space" className="-mx-[var(--gutter)] overflow-x-auto px-[var(--gutter)] [scrollbar-width:none]">
        <ul className="flex min-w-max gap-2 border-b border-line pb-6">
          {filters.map((f) => {
            const current = f.slug === active;
            return (
              <li key={f.title}>
                <Link
                  href={f.slug ? `/portfolio?space=${f.slug}` : "/portfolio"}
                  scroll={false}
                  aria-current={current ? "page" : undefined}
                  className="inline-flex min-h-10 items-center border border-line px-4 text-[0.8125rem] text-charcoal transition-colors hover:border-charcoal aria-[current=page]:border-charcoal aria-[current=page]:bg-charcoal aria-[current=page]:text-ivory"
                >
                  {f.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {items.length ? (
        <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} aspect={i % 3 === 1 ? "aspect-[3/4]" : "aspect-[4/5]"} headingLevel="h2" />
          ))}
        </div>
      ) : (
        <p className="mt-12 max-w-md text-muted">
          Projects for this space will be added soon. <Link href="/portfolio" className="text-charcoal underline decoration-bronze underline-offset-4">View all projects</Link>
        </p>
      )}
    </section>
  );
}

function PortfolioSkeleton() {
  return (
    <section aria-busy="true" aria-label="Loading projects" className="container-page">
      <div className="h-16 border-b border-line" />
      <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="aspect-[4/5] animate-pulse bg-sand motion-reduce:animate-none" />
        ))}
      </div>
    </section>
  );
}
