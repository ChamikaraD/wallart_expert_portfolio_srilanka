import { ArrowUpRight, Quote } from "lucide-react";
import { googleReviews, testimonials } from "@/content/testimonials";
import { StarRating } from "@/components/ui/StarRating";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

/** Social proof: the verified Google rating, plus genuine customer reviews when supplied. */
export function Testimonials() {
  const hasReviews = testimonials.length > 0;

  const summary = (
    <div className={hasReviews ? "" : "flex flex-col items-center text-center"}>
      <p className="eyebrow flex items-center gap-3 text-bronze-deep">
        <span aria-hidden className="h-px w-8 bg-bronze-deep" />
        Client reviews
        {hasReviews ? null : <span aria-hidden className="h-px w-8 bg-bronze-deep" />}
      </p>
      <h2 id="reviews-heading" className="mt-5 font-display text-title font-normal tracking-[-0.01em] text-balance">
        What Our <em className="italic">Clients Say</em>
      </h2>

      <div className={`mt-10 flex items-end gap-5 ${hasReviews ? "" : "justify-center"}`}>
        <span className="font-display text-[5.5rem] leading-[0.8] text-charcoal">{googleReviews.rating.toFixed(1)}</span>
        <span className="flex flex-col gap-2 pb-1">
          <StarRating value={googleReviews.rating} className="size-5" />
          <span className="text-sm text-muted">Based on {googleReviews.count} Google reviews</span>
        </span>
      </div>

      <a
        href={googleReviews.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-8 inline-flex min-h-11 items-center gap-2 border-b border-charcoal/30 text-[0.75rem] font-medium tracking-[0.14em] text-charcoal uppercase transition-colors hover:border-charcoal"
      >
        Read our reviews on Google
        <ArrowUpRight aria-hidden strokeWidth={1.5} className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    </div>
  );

  return (
    <section aria-labelledby="reviews-heading" className="section-y bg-sand">
      <div className={`container-page ${hasReviews ? "grid gap-14 lg:grid-cols-12 lg:gap-10" : ""}`}>
        <Reveal className={hasReviews ? "lg:col-span-4" : ""}>
          <div className={hasReviews ? "lg:sticky lg:top-32" : ""}>{summary}</div>
        </Reveal>

        {hasReviews ? (
          <RevealGroup as="li" className="gap-6 sm:columns-2 lg:col-span-8 [&>li]:mb-6">
            {testimonials.map((t) => (
              <RevealItem as="li" key={`${t.name}-${t.text.slice(0, 20)}`} className="break-inside-avoid">
                <figure className="relative bg-ivory p-7 sm:p-9">
                  <Quote aria-hidden strokeWidth={1} className="absolute top-6 right-6 size-8 text-bronze/40" />
                  <StarRating value={t.rating} />
                  <blockquote
                    className={`mt-5 font-display leading-snug text-charcoal ${
                      t.text.length > 220 ? "text-[1.1rem]" : t.text.length > 120 ? "text-[1.2rem]" : "text-[1.35rem]"
                    }`}
                  >
                    <p>{t.text}</p>
                  </blockquote>
                  <figcaption className="mt-6 border-t border-line pt-5">
                    <span className="block text-[0.9375rem] font-medium text-charcoal">{t.name}</span>
                    <span className="mt-0.5 block text-xs text-muted">
                      {t.meta ? `${t.meta} · ` : ""}
                      {t.source} review
                    </span>
                  </figcaption>
                </figure>
              </RevealItem>
            ))}
          </RevealGroup>
        ) : null}
      </div>
    </section>
  );
}
