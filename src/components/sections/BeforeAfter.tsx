"use client";

import { useId, useState } from "react";
import { MoveHorizontal } from "lucide-react";
import type { ImageAsset } from "@/content/images";
import { ArtImage } from "@/components/ui/ArtImage";
import { SectionHeading } from "@/components/ui/SectionHeading";

type BeforeAfterProps = { title: string; before: ImageAsset; after: ImageAsset };

/**
 * Signature before/after comparison. Only render with an AUTHENTIC photo pair of the
 * same wall. A native range input provides keyboard (arrows, Home/End, PageUp/Down),
 * touch and screen-reader support; the fixed aspect ratio prevents layout shift.
 */
export function BeforeAfter({ title, before, after }: BeforeAfterProps) {
  const [value, setValue] = useState(50);
  const id = useId();

  return (
    <section aria-labelledby={`${id}-heading`} className="section-y">
      <div className="container-page">
        <SectionHeading
          id={`${id}-heading`}
          eyebrow="Transformation"
          title={
            <>
              Before & <em className="italic">After</em>
            </>
          }
          intro={title}
        />

        <div className="relative mt-14 aspect-[4/5] touch-pan-y overflow-hidden bg-sand select-none sm:aspect-[16/9] lg:mt-20">
          <ArtImage image={after} sizes="(min-width: 1536px) 1440px, 100vw" />
          <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}>
            <ArtImage image={before} sizes="(min-width: 1536px) 1440px, 100vw" hideLabel />
          </div>

          <span className="eyebrow pointer-events-none absolute bottom-4 left-4 bg-ivory/90 px-3 py-1.5 text-charcoal">Before</span>
          <span className="eyebrow pointer-events-none absolute right-4 bottom-4 bg-charcoal/85 px-3 py-1.5 text-ivory">After</span>

          <div aria-hidden className="pointer-events-none absolute inset-y-0 w-px bg-ivory" style={{ left: `${value}%` }}>
            <span className="absolute top-1/2 left-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ivory text-charcoal shadow-sm">
              <MoveHorizontal strokeWidth={1.5} className="size-5" />
            </span>
          </div>

          <label htmlFor={`${id}-range`} className="sr-only">
            Reveal before and after: drag or use arrow keys
          </label>
          <input
            id={`${id}-range`}
            type="range"
            min={0}
            max={100}
            step={1}
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            aria-valuetext={`${value}% before, ${100 - value}% after`}
            className="peer absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
          />
          <span aria-hidden className="pointer-events-none absolute inset-0 hidden outline-2 -outline-offset-4 outline-bronze peer-focus-visible:block" />
        </div>
      </div>
    </section>
  );
}
