"use client";

import { inView, useAnimate, useReducedMotion } from "motion/react";
import { useEffect, type ElementType, type ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

type Tag = "div" | "li" | "ul" | "ol" | "section" | "article";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: Tag;
};

/** True when the element starts below the visible area, so hiding it causes no flash. */
const startsBelowFold = (el: Element) => el.getBoundingClientRect().top > window.innerHeight * 0.9;

/**
 * Fades and lifts content into view once, when it enters the viewport.
 *
 * Progressive enhancement: the server HTML is fully visible. Only after JavaScript runs is
 * below-the-fold content hidden and then revealed — so if scripts fail to load (or are
 * slow), every section still shows. Content already on screen is never hidden.
 */
export function Reveal({ children, className, delay = 0, y = 24, as = "div" }: RevealProps) {
  const [scope, animate] = useAnimate<HTMLElement>();
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = scope.current;
    if (!el || reduce || !startsBelowFold(el)) return;
    animate(el, { opacity: 0, y }, { duration: 0 });
    const stop = inView(
      el,
      () => {
        animate(el, { opacity: 1, y: 0 }, { duration: 0.9, ease: EASE, delay });
        stop();
      },
      { amount: 0.2 },
    );
    return stop;
  }, [animate, scope, reduce, delay, y]);

  const Component = as as ElementType;
  return (
    <Component ref={scope} className={className}>
      {children}
    </Component>
  );
}

/** Container that staggers its <RevealItem> children into view (same progressive behaviour). */
export function RevealGroup({ children, className, as = "div" }: Omit<RevealProps, "delay" | "y">) {
  const [scope, animate] = useAnimate<HTMLElement>();
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = scope.current;
    if (!el || reduce) return;
    const items = Array.from(el.querySelectorAll<HTMLElement>("[data-reveal-item]")).filter(startsBelowFold);
    if (!items.length) return;
    animate(items, { opacity: 0, y: 28 }, { duration: 0 });
    const stops = items.map((item, i) => {
      const stop = inView(
        item,
        () => {
          animate(item, { opacity: 1, y: 0 }, { duration: 0.9, ease: EASE, delay: (i % 4) * 0.08 });
          stop();
        },
        { amount: 0.15 },
      );
      return stop;
    });
    return () => stops.forEach((stop) => stop());
  }, [animate, scope, reduce]);

  const Component = (as === "li" ? "ul" : as) as ElementType;
  return (
    <Component ref={scope} className={className}>
      {children}
    </Component>
  );
}

export function RevealItem({ children, className, as = "div" }: Omit<RevealProps, "delay" | "y">) {
  const Component = as as ElementType;
  return (
    <Component data-reveal-item="" className={className}>
      {children}
    </Component>
  );
}
