"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Pause, Play } from "lucide-react";
import type { ImageAsset } from "@/content/images";
import { ArtImage } from "@/components/ui/ArtImage";

type Slide = { slug: string; title: string; image: ImageAsset };

const INTERVAL_MS = 6500;

/**
 * Hero background slideshow. Slide 1 is server-rendered (visible without JavaScript);
 * the others cross-fade in with a slow zoom. Auto-advance pauses when the tab is hidden,
 * when the visitor presses pause, and never starts for reduced-motion users.
 */
export function HeroSlideshow({ slides }: { slides: Slide[] }) {
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const [userPaused, setUserPaused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const reduce = useReducedMotion();
  const paused = userPaused || hidden || Boolean(reduce);

  const go = (next: number) => {
    if (next === active) return;
    setPrevious(active);
    setActive(next);
  };

  // Advance after INTERVAL_MS; the timer restarts whenever the slide changes (incl. manual).
  useEffect(() => {
    if (paused || slides.length < 2) return;
    const timer = window.setTimeout(() => {
      setPrevious(active);
      setActive((active + 1) % slides.length);
    }, INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [active, paused, slides.length]);

  useEffect(() => {
    const onVisibility = () => setHidden(document.visibilityState === "hidden");
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  if (!slides.length) return null;
  const current = slides[active];

  return (
    <>
      {/* Image layer */}
      <div className="absolute inset-0 -z-20" aria-roledescription="carousel" aria-label="Featured murals">
        {slides.map((slide, i) => {
          const isActive = i === active;
          const isPrevious = i === previous;
          return (
            <div
              key={slide.slug}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}: ${slide.title}`}
              aria-hidden={!isActive}
              className={`absolute inset-0 transition-opacity duration-[1400ms] ease-editorial ${
                isActive ? "z-10 opacity-100" : "z-0 opacity-0"
              }`}
            >
              <div className={`absolute inset-0 ${isActive || isPrevious ? "animate-kenburns" : ""}`}>
                <ArtImage image={slide.image} sizes="100vw" priority={i === 0} className="object-center" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Controls: caption link, slide dots and pause/play */}
      <div className="animate-fade-up absolute top-6 right-6 z-10 flex items-center gap-4 sm:top-9 sm:right-10" style={{ animationDelay: "1200ms" }}>
        <Link
          href={`/portfolio/${current.slug}`}
          className="hidden max-w-[16rem] truncate text-[0.6875rem] tracking-[0.18em] text-ivory/80 uppercase underline-offset-4 hover:text-ivory hover:underline sm:block"
        >
          <span className="text-bronze">Featured</span> · {current.title}
        </Link>
        <div className="flex items-center gap-2" role="group" aria-label="Choose slide">
          {slides.map((slide, i) => (
            <button
              key={slide.slug}
              type="button"
              onClick={() => go(i)}
              aria-label={`Show slide ${i + 1}: ${slide.title}`}
              aria-current={i === active ? "true" : undefined}
              className="group flex size-6 items-center justify-center"
            >
              <span
                className={`block h-px transition-all duration-500 ease-editorial ${
                  i === active ? "w-6 bg-ivory" : "w-3 bg-ivory/50 group-hover:bg-ivory/80"
                }`}
              />
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setUserPaused((p) => !p)}
          aria-label={userPaused ? "Play slideshow" : "Pause slideshow"}
          aria-pressed={userPaused}
          className="flex size-8 items-center justify-center rounded-full border border-ivory/30 text-ivory/80 transition-colors hover:border-ivory hover:text-ivory"
        >
          {userPaused ? <Play aria-hidden strokeWidth={1.5} className="size-3.5" /> : <Pause aria-hidden strokeWidth={1.5} className="size-3.5" />}
        </button>
      </div>
    </>
  );
}
