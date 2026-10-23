import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
  /** Shows a discreet note when the section's content still needs owner approval. */
  pendingApproval?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  intro,
  id,
  tone = "dark",
  align = "left",
  className,
  pendingApproval,
}: SectionHeadingProps) {
  const light = tone === "light";
  return (
    <Reveal className={`${align === "center" ? "mx-auto text-center" : ""} max-w-3xl ${className ?? ""}`}>
      <p className={`eyebrow flex flex-wrap items-center gap-3 ${align === "center" ? "justify-center" : ""} ${light ? "text-bronze" : "text-bronze-deep"}`}>
        <span aria-hidden className={`h-px w-8 ${light ? "bg-bronze" : "bg-bronze-deep"}`} />
        {eyebrow}
        {pendingApproval ? <DraftNote light={light} /> : null}
      </p>
      <h2
        id={id}
        className={`mt-5 font-display text-title font-normal tracking-[-0.01em] text-balance ${light ? "text-ivory" : "text-charcoal"}`}
      >
        {title}
      </h2>
      {intro ? (
        <p className={`mt-6 max-w-xl text-lead text-pretty ${align === "center" ? "mx-auto" : ""} ${light ? "text-ivory/75" : "text-muted"}`}>
          {intro}
        </p>
      ) : null}
    </Reveal>
  );
}

export function DraftNote({ light }: { light?: boolean }) {
  return (
    <span
      className={`border px-2 py-0.5 text-[0.5625rem] tracking-[0.16em] normal-case ${
        light ? "border-ivory/25 text-ivory/70" : "border-line text-muted"
      }`}
      title="Proposed content — to be confirmed by Wall Art Expert before launch"
    >
      Awaiting approval
    </span>
  );
}
