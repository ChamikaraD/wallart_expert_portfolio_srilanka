import { Star } from "lucide-react";

/** Five stars with fractional fill (e.g. 4.9). Announced to screen readers as text. */
export function StarRating({ value, className = "size-4" }: { value: number; className?: string }) {
  return (
    <span className="inline-flex items-center gap-0.5" role="img" aria-label={`${value} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, value - i));
        return (
          <span key={i} className="relative inline-flex">
            <Star aria-hidden strokeWidth={1.25} className={`${className} text-bronze`} />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star aria-hidden strokeWidth={1.25} className={`${className} fill-bronze text-bronze`} />
            </span>
          </span>
        );
      })}
    </span>
  );
}
