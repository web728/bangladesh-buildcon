"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import Image from "next/image";

import Link from "next/link";

import { usePathname } from "next/navigation";

import { motion, useReducedMotion } from "framer-motion";

import { mainNav } from "@/config/navigation";

import { event } from "@/config/event";

import { Container } from "@/components/ui/Container";

import { MobileMenu } from "./MobileMenu";

import { clsx } from "@/lib/utils/clsx";

/* =========================================

   ICONS

========================================= */

function ChevronDown({ open = false }: { open?: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"

      fill="none"

      stroke="currentColor"

      strokeWidth="1.7"

      strokeLinecap="round"

      strokeLinejoin="round"

      aria-hidden="true"

      className={clsx(
        "size-3.5 shrink-0 transition-transform duration-300",

        open && "rotate-180",
      )}
    >
      <path d="m5 7.5 5 5 5-5" />
    </svg>
  );
}

function ArrowUpRight() {
  return (
    <svg
      viewBox="0 0 20 20"

      fill="none"

      stroke="currentColor"

      strokeWidth="1.7"

      strokeLinecap="round"

      strokeLinejoin="round"

      aria-hidden="true"

      className="size-4 shrink-0"
    >
      <path d="M5.5 14.5 14.5 5.5M6.5 5.5h8v8" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-4 w-5">
      <span
        className={clsx(
          "absolute left-0 top-0 h-[1.8px] w-5 rounded-full bg-current transition-all duration-300",

          open && "top-[7px] rotate-45",
        )}
      />

      <span
        className={clsx(
          "absolute left-0 top-[7px] h-[1.8px] w-5 rounded-full bg-current transition-all duration-300",

          open && "scale-x-0 opacity-0",
        )}
      />

      <span
        className={clsx(
          "absolute left-0 top-[14px] h-[1.8px] w-5 rounded-full bg-current transition-all duration-300",

          open && "top-[7px] -rotate-45",
        )}
      />
    </span>
  );
}

/* =========================================

   EVENT INFORMATION MARQUEE

========================================= */

function EventMarquee() {
  const shouldReduceMotion = useReducedMotion();

  const items = [
    {
      label: "EVENT DATES",
      value: event.dates?.display || "11–13 November 2027",
    },
    {
      label: "EXPO VENUE",
      value: [event.venue?.name, event.venue?.city]
        .filter(Boolean)
        .join(", "),
    },
    {
      label: "REGISTRATION",
      value: "Exhibitor & Visitor Registration",
    },
  ];

  const renderItems = (prefix: string) =>
    items.map((item, index) => (
      <div
        key={`${prefix}-${index}`}
        className="inline-flex shrink-0 items-center gap-2.5 whitespace-nowrap"
      >
        <span className="font-heading text-[9px] font-extrabold uppercase tracking-[0.12em] text-white/60 sm:text-[10px]">
          {item.label}
        </span>

        <span
          aria-hidden="true"
          className="size-1 rounded-full bg-white/45"
        />

        <span className="text-[10px] font-semibold tracking-[0.01em] text-white sm:text-[11px]">
          {item.value}
        </span>

        <span
          aria-hidden="true"
          className="mx-5 h-3.5 w-px bg-white/25"
        />
      </div>
    ));

  return (
    <div className="relative h-[31px] w-full overflow-hidden bg-brand-primary text-white sm:h-[34px]">
      {shouldReduceMotion ? (
        <div className="flex h-full items-center justify-center overflow-hidden px-4">
          <span className="truncate text-[11px] font-semibold">
            {event.dates?.display || "11–13 November 2027"}
            {" · "}
            {event.venue?.name}
            {", "}
            {event.venue?.city}
          </span>
        </div>
      ) : (
        <div className="relative flex h-full w-full items-center overflow-hidden">
          <div
            className="flex w-max min-w-full shrink-0 items-center"
            style={{
              animation: "buildcon-marquee 35s linear infinite",
              willChange: "transform",
            }}
          >
            {/* First identical group */}
            <div className="flex min-w-full shrink-0 items-center justify-around">
              {renderItems("primary")}
            </div>

            {/* Second identical group */}
            <div
              className="flex min-w-full shrink-0 items-center justify-around"
              aria-hidden="true"
            >
              {renderItems("duplicate")}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


/* =========================================

   MAIN HEADER

========================================= */

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  const [mobileOpen, setMobileOpen] = useState(false);

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const headerRef = useRef<HTMLElement>(null);

  const pathname = usePathname();

  /* Scroll state */

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* Close menus on route change */

  /* eslint-disable react-hooks/set-state-in-effect -- Keep the existing route-change menu reset behavior. */
  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);
  /* eslint-enable react-hooks/set-state-in-effect */

  /* Body scroll lock */

  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  /* Outside click and Escape */

  const closeMenus = useCallback(() => {
    setOpenDropdown(null);

    setMobileOpen(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenus();
      }
    };

    const handleOutside = (event: PointerEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    document.addEventListener(
      "pointerdown",

      handleOutside,
    );

    return () => {
      window.removeEventListener(
        "keydown",

        handleKeyDown,
      );

      document.removeEventListener(
        "pointerdown",

        handleOutside,
      );
    };
  }, [closeMenus]);

  return (
    <header
      ref={headerRef}

      className={clsx(
        "sticky top-0 z-50 w-full",

        "bg-white",

        "transition-[box-shadow,border-color] duration-300",

        isScrolled
          ? "border-b border-brand-primary/10 shadow-[0_8px_30px_rgba(5,7,9,0.075)]"
          : "border-b border-[#e9eaf0]",
      )}
    >
      {/* =====================================

          ANIMATED TOP INFORMATION BAR

      ====================================== */}

      <EventMarquee />

      {/* =====================================

          MAIN NAVIGATION

      ====================================== */}

      <div
        className={clsx(
          "relative w-full bg-white",

          "transition-all duration-300",
        )}
      >
        <Container
          className="

            flex h-[88px] w-full max-w-[1440px]

            items-center justify-between

            gap-3

            sm:h-[72px]

            lg:gap-3

            xl:h-[78px]

            xl:gap-5

          "
        >
          {/* =================================

              LOGO

          ================================== */}

          <Link
            href="/"

            aria-label={`${event.name} homepage`}

            className="

              group relative z-10

              flex min-w-0 shrink-0

              items-center rounded-md

              focus-visible:outline-2

              focus-visible:outline-offset-4

              focus-visible:outline-brand-primary

            "
          >
            <Image
              src="/logos/bangla.png"

              alt={event.name}

              width={1560}

              height={468}

              priority

              className="

                h-auto w-[132px]

                object-contain object-left

                transition-transform duration-300

                group-hover:scale-[1.015]

                sm:w-[150px]

                lg:w-[166px]

                xl:w-[165px]

                2xl:w-[185px]

                motion-reduce:transform-none

              "
            />
          </Link>

          {/* =================================

              DESKTOP NAVIGATION

          ================================== */}

          <nav
            aria-label="Primary navigation"

            className="

              hidden min-w-0 flex-1

              items-center justify-center

              lg:flex

            "
          >
            <ul
              className="

                flex min-w-0

                items-center justify-center

                gap-0.5

                xl:gap-1

              "
            >
              {mainNav.map((item) => {
                const hasChildren = Boolean(item.children?.length);

                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" &&
                    pathname?.startsWith(`${item.href}/`)) ||
                  Boolean(
                    item.children?.some(
                      (child) =>
                        pathname === child.href ||
                        pathname?.startsWith(`${child.href}/`),
                    ),
                  );

                const dropdownOpen = openDropdown === item.label;

                return (
                  <li
                    key={item.href}

                    className="group relative shrink-0"

                    onMouseEnter={() => {
                      if (hasChildren) {
                        setOpenDropdown(item.label);
                      }
                    }}

                    onMouseLeave={() => {
                      if (hasChildren) {
                        setOpenDropdown(null);
                      }
                    }}
                  >
                    <div
                      className={clsx(
                        "relative flex items-center",

                        "rounded-md transition-colors duration-200",

                        isActive
                          ? "bg-brand-primary/[0.055]"
                          : "hover:bg-brand-light",
                      )}
                    >
                      <Link
                        href={item.href}

                        aria-current={isActive ? "page" : undefined}

                        className={clsx(
                          "relative inline-flex min-h-10",

                          "items-center justify-center",

                          "whitespace-nowrap",

                          "px-1.5 py-2",

                          "font-heading text-[10px]",

                          "font-bold tracking-[-0.015em]",

                          "transition-colors duration-200",

                          "xl:px-2.5 xl:text-[11px]",

                          "2xl:px-3 2xl:text-[12px]",

                          isActive
                            ? "text-brand-primary"
                            : "text-brand-dark hover:text-brand-primary",

                          "focus-visible:outline-2",

                          "focus-visible:outline-brand-primary",
                        )}
                      >
                        {item.label}
                      </Link>

                      {hasChildren && (
                        <button
                          type="button"

                          onClick={() => {
                            setOpenDropdown(dropdownOpen ? null : item.label);
                          }}

                          aria-label={`Toggle ${item.label} submenu`}

                          aria-expanded={dropdownOpen}

                          className={clsx(
                            "flex h-9 w-5 shrink-0",

                            "items-center justify-center",

                            "transition-colors duration-200",

                            "xl:w-6",

                            dropdownOpen || isActive
                              ? "text-brand-primary"
                              : "text-brand-dark/60 hover:text-brand-primary",

                            "focus-visible:outline-2",

                            "focus-visible:outline-brand-primary",
                          )}
                        >
                          <ChevronDown open={dropdownOpen} />
                        </button>
                      )}
                    </div>

                    {/* Active underline */}

                    {isActive && (
                      <span
                        aria-hidden="true"

                        className="

                          absolute bottom-0 left-2 right-2

                          h-[2px] rounded-full

                          bg-brand-primary

                        "
                      />
                    )}

                    {/* =========================

                        DROPDOWN

                    ========================== */}

                    {hasChildren && (
                      <div
                        className={clsx(
                          "absolute left-1/2 top-full",

                          "z-50 w-[258px]",

                          "-translate-x-1/2 pt-3",

                          "transition-all duration-200",

                          dropdownOpen
                            ? "visible translate-y-0 opacity-100"
                            : "pointer-events-none invisible translate-y-2 opacity-0",
                        )}
                      >
                        <div
                          className="

                            overflow-hidden rounded-xl

                            border border-[#e9eaf0]

                            bg-white p-1.5

                            shadow-[0_16px_45px_rgba(5,7,9,0.12)]

                          "
                        >
                          <div className="px-3 pb-2 pt-2">
                            <span
                              className="

                                font-heading text-[9px]

                                font-extrabold uppercase

                                tracking-[0.13em]

                                text-brand-primary

                              "
                            >
                              {item.label}
                            </span>
                          </div>

                          <div className="h-px bg-[#eef0f3]" />

                          <div className="py-1">
                            {item.children?.map((child) => {
                              const childActive = pathname === child.href;

                              return (
                                <Link
                                  key={child.href}

                                  href={child.href}

                                  onClick={() => setOpenDropdown(null)}

                                  className={clsx(
                                    "group/child flex",

                                    "items-start gap-2.5",

                                    "rounded-lg px-3 py-2.5",

                                    "transition-colors duration-200",

                                    childActive
                                      ? "bg-brand-primary/[0.07]"
                                      : "hover:bg-brand-light",
                                  )}
                                >
                                  <span
                                    className={clsx(
                                      "mt-[7px] size-1.5",

                                      "shrink-0 rounded-full",

                                      childActive
                                        ? "bg-brand-primary"
                                        : "bg-brand-blue/35 group-hover/child:bg-brand-primary",
                                    )}
                                  />

                                  <span className="min-w-0">
                                    <span
                                      className={clsx(
                                        "block font-heading",

                                        "text-[11px] font-bold",

                                        "leading-[1.5]",

                                        childActive
                                          ? "text-brand-primary"
                                          : "text-brand-dark group-hover/child:text-brand-primary",
                                      )}
                                    >
                                      {child.label}
                                    </span>

                                    {child.description && (
                                      <span
                                        className="

                                            mt-0.5 block

                                            text-[10px]

                                            leading-[1.6]

                                            text-[#737887]

                                          "
                                      >
                                        {child.description}
                                      </span>
                                    )}
                                  </span>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* =================================

              DESKTOP CTA BUTTONS

          ================================== */}

          <div
            className="

              hidden shrink-0 items-center

              justify-end gap-1.5

              lg:flex xl:gap-2

            "
          >
            <Link
              href={event.cta.bookStand}

              className="

                group inline-flex min-h-[37px]

                shrink-0 items-center justify-center

                gap-1 rounded-md

                bg-brand-primary

                px-2.5 py-2

                font-heading text-[10px]

                font-bold whitespace-nowrap

                text-white

                transition-[background-color,transform,box-shadow]

                duration-300

                hover:-translate-y-0.5

                hover:bg-brand-primary-dark

                hover:shadow-[0_7px_18px_rgba(186,29,130,0.2)]

                active:translate-y-0

                xl:gap-1.5 xl:px-3.5

                xl:text-[11px]

                focus-visible:outline-2

                focus-visible:outline-offset-2

                focus-visible:outline-brand-primary

                motion-reduce:transform-none

              "
            >
              Book a Stand
              <span
                className="

                  hidden transition-transform duration-300

                  group-hover:translate-x-0.5

                  group-hover:-translate-y-0.5

                  2xl:block

                  motion-reduce:transform-none

                "
              >
                <ArrowUpRight />
              </span>
            </Link>

            <Link
              href={event.cta.registerVisit}

              className="

                inline-flex min-h-[37px]

                shrink-0 items-center justify-center

                rounded-md border border-brand-blue/25

                bg-white px-2 py-2

                font-heading text-[10px]

                font-bold whitespace-nowrap

                text-brand-blue

                transition-[background-color,border-color,transform]

                duration-300

                hover:-translate-y-0.5

                hover:border-brand-blue

                hover:bg-brand-blue/[0.045]

                active:translate-y-0

                xl:px-3 xl:text-[11px]

                focus-visible:outline-2

                focus-visible:outline-offset-2

                focus-visible:outline-brand-blue

                motion-reduce:transform-none

              "
            >
              Register to Visit
            </Link>
          </div>

          {/* =================================

              MOBILE MENU TOGGLE

          ================================== */}

          <button
            type="button"

            onClick={() => setMobileOpen((previous) => !previous)}

            aria-expanded={mobileOpen}

            aria-controls="mobile-menu"

            aria-label={
              mobileOpen ? "Close navigation menu" : "Open navigation menu"
            }

            className={clsx(
              "relative flex size-10 shrink-0",

              "items-center justify-center",

              "rounded-lg border",

              "transition-colors duration-200",

              "lg:hidden",

              mobileOpen
                ? "border-brand-primary bg-brand-primary text-white"
                : "border-brand-primary/20 bg-brand-primary/[0.05] text-brand-primary hover:bg-brand-primary/10",

              "focus-visible:outline-2",

              "focus-visible:outline-offset-2",

              "focus-visible:outline-brand-primary",
            )}
          >
            <MenuIcon open={mobileOpen} />
          </button>
        </Container>
      </div>

      {/* =====================================

          MOBILE NAVIGATION

      ====================================== */}

      <MobileMenu
        open={mobileOpen}

        onClose={() => setMobileOpen(false)}
      />
    </header>
  );
}
