"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowRight, Menu, X } from "lucide-react";
import { mainNav, siteConfig, socialLinks } from "@/config/site";
import { primaryInquiry } from "@/lib/contact";
import { Logo } from "./Logo";
import { FacebookIcon, InstagramIcon } from "@/components/ui/icons";

const EASE = [0.22, 1, 0.36, 1] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [section, setSection] = useState<string>("home");
  const [menuTop, setMenuTop] = useState(0);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const inquiry = primaryInquiry();

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > 24;
    setScrolled((prev) => (prev === next ? prev : next));
  });

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  // Lock background scroll, close on Escape, move focus into the menu.
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => desktop.matches && close(false);
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [open, close]);

  // From the open menu, release the scroll lock before jumping to an on-page section.
  const onMobileNavigate = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const [path, hash] = href.split("#");
    close(false);
    if (!hash || (path || "/") !== pathname) return;
    e.preventDefault();
    requestAnimationFrame(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      history.pushState(null, "", `#${hash}`);
    });
  };

  // Homepage scroll-spy: the active link follows the section currently in view. Sections are
  // watched with IntersectionObserver (no scroll polling); the active one is the last whose
  // top has passed 40% of the viewport height, or "home" above the first.
  useEffect(() => {
    if (pathname !== "/") return;
    const ids = mainNav.map((l) => l.href.split("#")[1]).filter((id): id is string => Boolean(id));
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
      // Page order, not nav order (the nav lists Services before About Us).
      .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
    if (!targets.length) return;
    const update = () => {
      const line = window.innerHeight * 0.4;
      let current = "home";
      for (const el of targets) if (el.getBoundingClientRect().top <= line) current = el.id;
      setSection(current);
    };
    const observer = new IntersectionObserver(update, { rootMargin: "0px 0px -60% 0px" });
    targets.forEach((el) => observer.observe(el));
    // Backstops for large jumps: one check when scrolling settles, and on hash navigation.
    window.addEventListener("scrollend", update, { passive: true });
    window.addEventListener("hashchange", update);
    update();
    return () => {
      observer.disconnect();
      window.removeEventListener("scrollend", update);
      window.removeEventListener("hashchange", update);
    };
  }, [pathname]);

  const isActive = (href: string) => {
    const [path, hash] = href.split("#");
    if (hash) return pathname === "/" && section === hash;
    if (href === "/") return pathname === "/" && section === "home";
    return pathname.startsWith(path);
  };

  // Reflect a click immediately rather than waiting for the smooth scroll to arrive.
  const markClicked = (href: string) => {
    const hash = href.split("#")[1];
    if (pathname === "/" || href === "/") setSection(hash ?? "home");
  };

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-500 ease-editorial ${
        scrolled || open ? "border-line bg-ivory" : "border-transparent bg-ivory"
      }`}
    >
      <div
        className={`container-page flex items-center justify-between gap-6 transition-[height] duration-500 ease-editorial ${
          scrolled ? "h-16 lg:h-[4.5rem]" : "h-[4.5rem] lg:h-28"
        }`}
      >
        <Logo
          priority
          onClick={() => open && close(false)}
          className={scrolled ? "h-12 lg:h-14" : "h-14 lg:h-24"}
        />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-6 xl:gap-10 2xl:gap-11">
            {mainNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => markClicked(link.href)}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className="group relative py-2 text-[0.8125rem] whitespace-nowrap tracking-[0.06em] text-charcoal/80 transition-colors duration-300 hover:text-charcoal aria-[current=page]:text-charcoal"
                >
                  {link.label}
                  <span
                    aria-hidden
                    className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-bronze transition-transform duration-500 ease-editorial group-hover:scale-x-100 group-focus-visible:scale-x-100 group-aria-[current=page]:scale-x-100"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <InquiryLink
            href={inquiry.href}
            external={inquiry.external}
            className="hidden min-h-11 items-center gap-2.5 whitespace-nowrap bg-charcoal px-5 text-[0.75rem] font-medium tracking-[0.1em] text-ivory uppercase transition-colors duration-300 hover:bg-[#23211d] sm:inline-flex"
          >
            {siteConfig.hero.secondaryCta.label}
            <ArrowRight aria-hidden strokeWidth={1.5} className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </InquiryLink>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => {
              if (!open) setMenuTop(headerRef.current?.getBoundingClientRect().bottom ?? 0);
              setOpen((v) => !v);
            }}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="-mr-2 inline-flex size-11 items-center justify-center text-charcoal lg:hidden"
          >
            {open ? <X strokeWidth={1.25} className="size-6" /> : <Menu strokeWidth={1.25} className="size-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: EASE }}
            className="fixed inset-x-0 bottom-0 overflow-y-auto bg-ivory lg:hidden"
            style={{ top: menuTop }}
          >
            <nav aria-label="Mobile" className="container-page flex min-h-full flex-col justify-between pt-8 pb-10">
              <ul className="divide-y divide-line border-y border-line">
                {mainNav.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.08 + i * 0.05 }}
                  >
                    <Link
                      ref={i === 0 ? firstLinkRef : undefined}
                      href={link.href}
                      onClick={(e) => {
                        markClicked(link.href);
                        onMobileNavigate(e, link.href);
                      }}
                      aria-current={isActive(link.href) ? "page" : undefined}
                      className="flex items-baseline justify-between py-4 font-display text-[2.1rem] leading-tight text-charcoal aria-[current=page]:text-bronze-deep"
                    >
                      {link.label}
                      <span className="font-sans text-[0.6875rem] tracking-[0.2em] text-muted">0{i + 1}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-10 flex flex-col gap-5">
                <InquiryLink
                  href={inquiry.href}
                  external={inquiry.external}
                  onClick={(e) => (inquiry.external ? close(false) : onMobileNavigate(e, inquiry.href))}
                  className="inline-flex min-h-12 items-center justify-center gap-3 bg-charcoal px-6 text-[0.8125rem] font-medium tracking-[0.1em] text-ivory uppercase"
                >
                  {siteConfig.hero.secondaryCta.label}
                  <ArrowRight aria-hidden strokeWidth={1.5} className="size-4" />
                </InquiryLink>
                <a
                  href={socialLinks.instagram.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 text-sm text-muted"
                >
                  <InstagramIcon className="size-4" />
                  {socialLinks.instagram.handle}
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
                <a
                  href={socialLinks.facebook.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 text-sm text-muted"
                >
                  <FacebookIcon className="size-4" />
                  Facebook
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function InquiryLink({
  href,
  external,
  className,
  onClick,
  children,
}: {
  href: string;
  external: boolean;
  className: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  children: React.ReactNode;
}) {
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" onClick={onClick} className={`group ${className}`}>
        {children}
        <span className="sr-only">(opens WhatsApp in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={href} onClick={onClick} className={`group ${className}`}>
      {children}
    </Link>
  );
}
