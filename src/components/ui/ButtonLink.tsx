import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

type Variant = "solid" | "outline" | "ivory" | "outline-ivory" | "text";

const variants: Record<Variant, string> = {
  solid: "bg-charcoal text-ivory hover:bg-[#23211d] active:bg-black",
  outline: "border border-charcoal/30 text-charcoal hover:border-charcoal hover:bg-charcoal hover:text-ivory",
  ivory: "bg-ivory text-charcoal hover:bg-white active:bg-sand",
  "outline-ivory": "border border-ivory/35 text-ivory hover:border-ivory hover:bg-ivory hover:text-charcoal",
  text: "px-0! text-charcoal underline-offset-[6px] hover:underline decoration-bronze",
};

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
  icon?: "arrow" | "external" | "none";
};

export function ButtonLink({ href, children, variant = "solid", external, className, icon = "arrow" }: ButtonLinkProps) {
  const classes = `group inline-flex min-h-12 items-center justify-center gap-3 px-6 text-[0.8125rem] font-medium tracking-[0.08em] uppercase transition-colors duration-300 ease-editorial ${variants[variant]} ${className ?? ""}`;
  const Icon = icon === "external" ? ArrowUpRight : ArrowRight;
  const content = (
    <>
      <span>{children}</span>
      {icon !== "none" ? (
        <Icon
          aria-hidden
          strokeWidth={1.5}
          className="size-4 transition-transform duration-300 ease-editorial group-hover:translate-x-1"
        />
      ) : null}
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
