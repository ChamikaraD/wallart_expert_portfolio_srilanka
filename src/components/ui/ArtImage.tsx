import Image from "next/image";
import type { ImageAsset } from "@/content/images";

type ArtImageProps = {
  image: ImageAsset;
  sizes: string;
  className?: string;
  /** Use for the single most important above-the-fold image. */
  priority?: boolean;
  /** Hide the placeholder label (e.g. for very small thumbnails). */
  hideLabel?: boolean;
  labelPosition?: "top" | "bottom";
};

/**
 * next/image wrapper that fills its (positioned, sized) parent and labels
 * development placeholders so stock imagery is never mistaken for company work.
 */
export function ArtImage({ image, sizes, className, priority, hideLabel, labelPosition = "top" }: ArtImageProps) {
  return (
    <>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        preload={priority}
        fetchPriority={priority ? "high" : undefined}
        loading={priority ? "eager" : "lazy"}
        className={`object-cover ${className ?? ""}`}
      />
      {image.placeholder && !hideLabel ? <PlaceholderLabel position={labelPosition} /> : null}
    </>
  );
}

export function PlaceholderLabel({ position = "top" }: { position?: "top" | "bottom" }) {
  return (
    <span
      className={`pointer-events-none absolute left-3 z-10 bg-ivory/85 px-2 py-1 text-[0.625rem] font-medium tracking-[0.16em] text-charcoal uppercase ${
        position === "top" ? "top-3" : "bottom-3"
      }`}
    >
      Placeholder image
    </span>
  );
}
