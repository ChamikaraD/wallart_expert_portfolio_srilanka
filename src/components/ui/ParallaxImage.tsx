"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { ImageAsset } from "@/content/images";
import { ArtImage } from "./ArtImage";

/**
 * Image with a restrained scroll-linked drift. Motion drives this with a scroll
 * timeline (no per-frame React renders); disabled when reduced motion is preferred.
 */
export function ParallaxImage({ image, sizes, className }: { image: ImageAsset; sizes: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  return (
    <div ref={ref} className={`relative overflow-hidden bg-sand ${className ?? ""}`}>
      <motion.div className="absolute -inset-y-[8%] inset-x-0" style={reduce ? undefined : { y }}>
        <ArtImage image={image} sizes={sizes} />
      </motion.div>
    </div>
  );
}
