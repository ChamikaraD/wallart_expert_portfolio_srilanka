import { ButtonLink } from "@/components/ui/ButtonLink";

export default function NotFound() {
  return (
    <section className="container-page section-y text-center">
      <p className="eyebrow text-bronze-deep">404</p>
      <h1 className="mt-5 font-display text-title">This wall is still blank.</h1>
      <p className="mx-auto mt-6 max-w-md text-lead text-muted">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
        <ButtonLink href="/">Back to Home</ButtonLink>
        <ButtonLink href="/portfolio" variant="outline">
          View Portfolio
        </ButtonLink>
      </div>
    </section>
  );
}
