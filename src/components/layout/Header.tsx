
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  useReducedMotion,
} from "framer-motion";

import { mainNav } from "@/config/navigation";
import { event } from "@/config/event";
import { MobileMenu } from "./MobileMenu";
import { clsx } from "@/lib/utils/clsx";

const ease = [0.22, 1, 0.36, 1] as const;

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4 shrink-0"
      aria-hidden="true"
    >
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-3.5 transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function Header() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu on navigation
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Escape key support
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 w-full",
        "border-b border-black/[0.07]",
        "bg-white/95 backdrop-blur-xl",
        "transition-shadow duration-300",
        scrolled
          ? "shadow-[0_8px_30px_rgba(5,7,9,0.07)]"
          : "shadow-none"
      )}
    >
      {/* Top brand line */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[3px] bg-brand-primary"
      />

      {/* Main navigation */}
      <div className="mx-auto flex h-[72px] w-full max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8 lg:h-[80px] lg:px-10 xl:px-14">

        {/* LOGO */}
        <motion.div
          initial={
            reduceMotion
              ? false
              : { opacity: 0, x: -14 }
          }
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.55,
            ease,
          }}
          className="relative z-10 shrink-0"
        >
          <Link
            href="/"
            aria-label={`${event.name} - Home`}
            className="flex items-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary"
          >
            <Image
              src="/logos/bangladesh-buildcon-logo.png"
              alt={event.name}
              width={1560}
              height={468}
              priority
              sizes="(min-width: 1024px) 200px, 170px"
              className="h-auto w-[155px] object-contain sm:w-[170px] lg:w-[185px] xl:w-[200px]"
            />
          </Link>
        </motion.div>

        {/* DESKTOP NAVIGATION */}
        <nav
          aria-label="Primary Navigation"
          className="hidden min-w-0 items-center justify-center xl:flex"
        >
          <ul className="flex items-center gap-0.5">
            {mainNav.map((item) => {
              const hasChildren = Boolean(
                item.children?.length
              );

              const isActive =
                pathname === item.href ||
                (item.href !== "/" &&
                  pathname.startsWith(`${item.href}/`)) ||
                Boolean(
                  item.children?.some(
                    (child) =>
                      pathname === child.href ||
                      pathname.startsWith(`${child.href}/`)
                  )
                );

              return (
                <li
                  key={item.href}
                  className="group relative"
                >
                  <Link
                    href={item.href}
                    aria-current={
                      isActive ? "page" : undefined
                    }
                    className={clsx(
                      "relative flex h-[80px] items-center gap-1",
                      "whitespace-nowrap px-2.5",
                      "font-heading text-[12px] font-semibold",
                      "transition-colors duration-200",
                      "focus-visible:rounded-md focus-visible:outline-2",
                      "focus-visible:outline-brand-primary",
                      isActive
                        ? "text-brand-primary"
                        : "text-brand-dark/75 hover:text-brand-primary"
                    )}
                  >
                    {item.label}

                    {hasChildren && (
                      <ChevronIcon />
                    )}

                    {/* Active / hover underline */}
                    <span
                      aria-hidden="true"
                      className={clsx(
                        "absolute inset-x-2.5 bottom-[18px]",
                        "h-[2px] origin-left rounded-full",
                        "bg-brand-primary",
                        "transition-transform duration-300",
                        isActive
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100 group-focus-within:scale-x-100"
                      )}
                    />
                  </Link>

                  {/* DROPDOWN */}
                  {hasChildren && (
                    <div
                      className={clsx(
                        "invisible absolute left-1/2 top-full z-50",
                        "w-[270px] -translate-x-1/2 translate-y-2",
                        "pt-2 opacity-0",
                        "pointer-events-none",
                        "transition-all duration-200",
                        "group-hover:visible group-hover:translate-y-0",
                        "group-hover:opacity-100 group-hover:pointer-events-auto",
                        "group-focus-within:visible group-focus-within:translate-y-0",
                        "group-focus-within:opacity-100 group-focus-within:pointer-events-auto"
                      )}
                    >
                      <div className="overflow-hidden rounded-xl border border-black/[0.08] bg-white p-2 shadow-[0_20px_55px_rgba(5,7,9,0.13)]">
                        {item.children?.map((child) => {
                          const childActive =
                            pathname === child.href;

                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              aria-current={
                                childActive
                                  ? "page"
                                  : undefined
                              }
                              className={clsx(
                                "block rounded-lg px-4 py-3",
                                "transition-colors duration-200",
                                childActive
                                  ? "bg-brand-primary/5 text-brand-primary"
                                  : "text-brand-dark hover:bg-brand-primary/5"
                              )}
                            >
                              <span className="block font-heading text-[13px] font-semibold">
                                {child.label}
                              </span>

                              {child.description && (
                                <span className="mt-1 block text-[11px] leading-relaxed text-[#687080]">
                                  {child.description}
                                </span>
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* DESKTOP CTAS */}
        <motion.div
          initial={
            reduceMotion
              ? false
              : { opacity: 0, x: 12 }
          }
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.55,
            delay: 0.12,
            ease,
          }}
          className="hidden shrink-0 items-center gap-2 xl:flex"
        >
          <Link
            href={event.cta.registerVisit}
            className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-lg border border-brand-dark/15 bg-white px-3.5 font-heading text-[11px] font-bold text-brand-dark transition-colors duration-200 hover:border-brand-primary/40 hover:text-brand-primary"
          >
            Register to Visit
          </Link>

          <Link
            href={event.cta.bookStand}
            className="group inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-brand-primary px-4 font-heading text-[11px] font-bold text-white shadow-[0_8px_22px_rgba(186,29,130,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-primary-dark hover:shadow-[0_12px_28px_rgba(186,29,130,0.27)]"
          >
            Book a Stand
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">
              <ArrowIcon />
            </span>
          </Link>
        </motion.div>

        {/* TABLET / MOBILE CTA */}
        <div className="ml-auto flex items-center gap-2 xl:hidden">
          <Link
            href={event.cta.bookStand}
            className="hidden h-9 items-center justify-center rounded-lg bg-brand-primary px-4 font-heading text-xs font-bold text-white sm:inline-flex"
          >
            Book a Stand
          </Link>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() =>
              setMobileOpen((previous) => !previous)
            }
            aria-label={
              mobileOpen ? "Close menu" : "Open menu"
            }
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className={clsx(
              "relative flex size-10 shrink-0",
              "items-center justify-center rounded-lg",
              "border border-brand-dark/10 bg-white",
              "text-brand-dark",
              "transition-colors duration-200",
              "hover:border-brand-primary/40",
              "focus-visible:outline-2 focus-visible:outline-brand-primary"
            )}
          >
            <div className="relative h-4 w-5">
              <span
                className={clsx(
                  "absolute left-0 top-[2px] h-[2px] w-5",
                  "rounded-full bg-current",
                  "transition-all duration-300",
                  mobileOpen &&
                    "top-[7px] rotate-45"
                )}
              />

              <span
                className={clsx(
                  "absolute left-0 top-[7px] h-[2px] w-5",
                  "rounded-full bg-current",
                  "transition-all duration-200",
                  mobileOpen &&
                    "opacity-0"
                )}
              />

              <span
                className={clsx(
                  "absolute left-0 top-[12px] h-[2px] w-5",
                  "rounded-full bg-current",
                  "transition-all duration-300",
                  mobileOpen &&
                    "top-[7px] -rotate-45"
                )}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Existing mobile menu */}
      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </header>
  );
}
