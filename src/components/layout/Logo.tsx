import Image from "next/image";
import Link from "next/link";

/** The company's official logo (/public/brand/logo-full.png), used everywhere on the site. */
export function Logo({
  className = "h-32 sm:h-36",
  priority = false,
  onClick,
}: {
  /** Height classes — the width follows the logo's aspect ratio. */
  className?: string;
  /** Load eagerly (above-the-fold placements such as the header). */
  priority?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link href="/" onClick={onClick} className="group inline-flex shrink-0" aria-label="Wall Art Expert (Pvt) Ltd — home">
      <Image
        src="/brand/logo-full.png"
        alt="Wall Art Expert (Pvt) Ltd logo"
        width={1069}
        height={1103}
        loading={priority ? "eager" : "lazy"}
        sizes="160px"
        className={`w-auto transition-[height,transform] duration-500 ease-editorial group-hover:-translate-y-0.5 ${className}`}
      />
    </Link>
  );
}
