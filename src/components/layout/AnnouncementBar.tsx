import Link from "next/link";
import { siteConfig } from "@/config/site";

export function AnnouncementBar() {
  const { enabled, message, link } = siteConfig.announcement;
  if (!enabled) return null;
  return (
    <div className="bg-charcoal text-ivory/85">
      <p className="container-page flex min-h-9 items-center justify-center gap-x-3 py-2 text-center text-[0.6875rem] tracking-[0.14em] uppercase">
        <span>{message}</span>
        {link ? (
          <>
            <span aria-hidden className="hidden text-bronze sm:inline">
              ·
            </span>
            <Link href={link.href} className="hidden whitespace-nowrap text-bronze underline-offset-4 hover:underline sm:inline">
              {link.label}
            </Link>
          </>
        ) : null}
      </p>
    </div>
  );
}
