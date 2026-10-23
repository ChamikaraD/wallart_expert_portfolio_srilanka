"use client";

import { useEffect } from "react";
import { inView, useAnimate, useReducedMotion } from "motion/react";
import { processApproved, processSteps } from "@/content/services";
import { SectionHeading } from "@/components/ui/SectionHeading";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Process() {
  const [scope, animate] = useAnimate<HTMLOListElement>();
  const reduce = useReducedMotion();

  // Progressive enhancement: steps render visible; once JS runs, they are hidden only if
  // still below the fold, then the line draws and the steps rise in when scrolled into view.
  useEffect(() => {
    const list = scope.current;
    if (!list || reduce || list.getBoundingClientRect().top < window.innerHeight * 0.9) return;
    animate("[data-line]", { scaleX: 0 }, { duration: 0 });
    animate("[data-step]", { opacity: 0, y: 20 }, { duration: 0 });
    const stop = inView(
      list,
      () => {
        animate("[data-line]", { scaleX: 1 }, { duration: 1.6, ease: EASE });
        list.querySelectorAll("[data-step]").forEach((step, i) => {
          animate(step, { opacity: 1, y: 0 }, { duration: 0.8, ease: EASE, delay: 0.25 + i * 0.18 });
        });
        stop();
      },
      { amount: 0.3 },
    );
    return stop;
  }, [animate, scope, reduce]);

  return (
    <section aria-labelledby="process-heading" className="section-y bg-white">
      <div className="container-page">
        <SectionHeading
          id="process-heading"
          eyebrow="How we work"
          pendingApproval={!processApproved}
          title={
            <>
              From first idea <em className="italic">to finished wall</em>
            </>
          }
          intro="A clear, collaborative process that keeps you involved at every stage."
        />

        <ol ref={scope} className="relative mt-16 grid gap-12 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4 lg:gap-8">
          {/* Connecting line that draws across the steps on wide screens. */}
          <span
            data-line=""
            aria-hidden
            className="absolute top-[1.375rem] left-0 hidden h-px w-full origin-left bg-bronze/60 lg:block"
          />
          {processSteps.map((step, i) => (
            <li key={step.title} data-step="" className="relative">
              <span className="relative flex size-11 items-center justify-center rounded-full border border-bronze bg-white font-display text-lg text-bronze-deep italic">
                {i + 1}
              </span>
              <h3 className="mt-7 font-display text-[2rem] leading-none text-charcoal">{step.title}</h3>
              <p className="mt-4 max-w-xs text-[0.9375rem] leading-relaxed text-muted">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
