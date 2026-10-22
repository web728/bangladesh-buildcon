

"use client";
import { useEffect, useId, useRef, useState } from "react";

import Link from "next/link";

import { usePathname } from "next/navigation";

import {

  AnimatePresence,

  motion,

  useReducedMotion,

  type Variants,

} from "framer-motion";
import { mainNav } from "@/config/navigation";

import { event } from "@/config/event";

import { clsx } from "@/lib/utils/clsx";
interface MobileMenuProps {

  open: boolean;

  onClose: () => void;

}
const EASE = [0.22, 1, 0.36, 1] as const;
const drawerVariants: Variants = {

  closed: {

    x: "100%",

    transition: {

      duration: 0.25,

      ease: EASE,

    },

  },

  open: {

    x: 0,

    transition: {

      duration: 0.4,

      ease: EASE,

    },

  },

};
function ChevronIcon({ expanded }: { expanded: boolean }) {

  return (

    <svg

      viewBox="0 0 24 24"

      fill="none"

      stroke="currentColor"

      strokeWidth="1.8"

      strokeLinecap="round"

      strokeLinejoin="round"

      aria-hidden="true"

      className={clsx(

        "size-4 shrink-0 transition-transform duration-300",

        expanded && "rotate-180"

      )}

    >

      <path d="m6 9 6 6 6-6" />

    </svg>

  );

}
function ArrowIcon() {

  return (

    <svg

      viewBox="0 0 24 24"

      fill="none"

      stroke="currentColor"

      strokeWidth="1.8"

      strokeLinecap="round"

      strokeLinejoin="round"

      aria-hidden="true"

      className="size-4 shrink-0"

    >

      <path d="M5 12h14m-6-6 6 6-6 6" />

    </svg>

  );

}
function CloseIcon() {

  return (

    <svg

      viewBox="0 0 24 24"

      fill="none"

      stroke="currentColor"

      strokeWidth="1.8"

      strokeLinecap="round"

      strokeLinejoin="round"

      aria-hidden="true"

      className="size-5"

    >

      <path d="M6 6 18 18M18 6 6 18" />

    </svg>

  );

}
function pathMatches(pathname: string, href: string) {

  return (

    pathname === href ||

    (href !== "/" && pathname.startsWith(`${href}/`))

  );

}
export function MobileMenu({

  open,

  onClose,

}: MobileMenuProps) {

  const pathname = usePathname();

  const reducedMotion = !!useReducedMotion();
  const titleId = useId();

  const drawerRef = useRef<HTMLElement>(null);
  const [expandedSubmenu, setExpandedSubmenu] =

    useState<string | null>(null);
  // Reset accordion when drawer opens or closes.

  // Open the group containing the current page.

  /* eslint-disable react-hooks/set-state-in-effect -- Preserve original accordion reset behavior. */
  useEffect(() => {

    if (!open) {

      setExpandedSubmenu(null);

      return;

    }
    const activeGroup = mainNav.find((item) =>

      item.children?.some((child) =>

        pathMatches(pathname, child.href)

      )

    );
    setExpandedSubmenu(activeGroup?.href ?? null);

  }, [open, pathname]);
  /* eslint-enable react-hooks/set-state-in-effect */
  // Close drawer on route change.

  // Parent Header also handles this.

  const previousPath = useRef(pathname);
  useEffect(() => {

    if (previousPath.current !== pathname) {

      previousPath.current = pathname;

      onClose();

    }

  }, [pathname, onClose]);
  // Focus a control inside the drawer.

  useEffect(() => {

    if (!open) return;
    const frame = window.requestAnimationFrame(() => {

      drawerRef.current

        ?.querySelector<HTMLButtonElement>(

          '[data-mobile-close="true"]'

        )

        ?.focus({ preventScroll: true });

    });
    return () => window.cancelAnimationFrame(frame);

  }, [open]);
  const cleanPhone = event.contact.general.phone.replace(

    /[^0-9+]/g,

    ""

  );
  function toggleSubmenu(href: string) {

    setExpandedSubmenu((previous) =>

      previous === href ? null : href

    );

  }
  return (

    <AnimatePresence initial={false}>

      {open && (

        <div

          id="mobile-menu"

          className="fixed inset-0 z-[100] h-[100dvh] w-full lg:hidden xl:hidden"

        >

          {/* Backdrop */}

          <motion.div

            aria-hidden="true"

            initial={{ opacity: 0 }}

            animate={{ opacity: 1 }}

            exit={{ opacity: 0 }}

            transition={{

              duration: reducedMotion ? 0 : 0.25,

            }}

            onClick={onClose}

            className="absolute inset-0 bg-[#050709]/70 backdrop-blur-[5px]"

          />
          {/* Drawer */}

          <motion.aside

            ref={drawerRef}

            role="dialog"

            aria-modal="true"

            aria-labelledby={titleId}

            variants={drawerVariants}

            initial={reducedMotion ? false : "closed"}

            animate="open"

            exit="closed"

            transition={

              reducedMotion

                ? { duration: 0 }

                : undefined

            }

            className="absolute inset-y-0 right-0 flex h-full w-[min(100%,360px)] flex-col overflow-hidden border-l border-white/10 bg-[#0C0E12] text-white shadow-[-25px_0_70px_rgba(0,0,0,0.35)]"

          >

            {/* Header */}

            <div className="relative shrink-0 border-b border-white/10 px-5 pb-4 pt-5">

              <span

                aria-hidden="true"

                className="absolute inset-x-0 top-0 h-[3px] bg-brand-primary"

              />
              <div className="flex items-center justify-between gap-3">

                <div className="min-w-0">

                  <p

                    id={titleId}

                    className="font-heading text-[13px] font-bold tracking-tight text-white"

                  >

                    Bangladesh Buildcon

                  </p>
                  <div className="mt-1.5 flex items-center gap-2">

                    <span className="size-1.5 rounded-full bg-brand-primary" />
                    <span className="text-[10px] font-medium text-white/55">

                      {event.dates.display}

                    </span>

                  </div>

                </div>
                <button

                  type="button"

                  data-mobile-close="true"

                  onClick={onClose}

                  aria-label="Close navigation"

                  className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/[0.06] text-white/75 transition-colors hover:border-brand-primary/40 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"

                >

                  <CloseIcon />

                </button>

              </div>

            </div>
            {/* Scrollable Navigation */}

            <nav

              aria-label="Mobile Navigation"

              className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4"

            >

              <ul className="space-y-1">

                {mainNav.map((item) => {

                  const children = item.children ?? [];

                  const hasChildren = children.length > 0;
                  const childActive = children.some(

                    (child) =>

                      pathMatches(pathname, child.href)

                  );
                  const isActive =

                    pathMatches(pathname, item.href) ||

                    childActive;
                  const expanded =

                    expandedSubmenu === item.href;
                  const baseClass = clsx(

                    "flex min-h-11 w-full items-center justify-between",

                    "gap-3 rounded-lg px-3.5 py-2.5",

                    "text-left font-heading text-[12px] font-semibold",

                    "transition-colors duration-200",

                    "focus-visible:outline-2",

                    "focus-visible:outline-offset-2",

                    "focus-visible:outline-brand-primary",

                    isActive

                      ? "bg-brand-primary/10 text-white"

                      : "text-white/70 hover:bg-white/[0.06] hover:text-white"

                  );
                  return (

                    <li key={item.href} className="min-w-0">

                      {/* Parent with children = BUTTON,

                          not a navigation link. */}

                      {hasChildren ? (

                        <button

                          type="button"

                          aria-expanded={expanded}

                          aria-controls={`mobile-submenu-${item.href.replace(/[^a-zA-Z0-9]/g, "-")}`}

                          onClick={() =>

                            toggleSubmenu(item.href)

                          }

                          className={baseClass}

                        >

                          <span className="flex min-w-0 items-center gap-3">

                            <span

                              aria-hidden="true"

                              className={clsx(

                                "h-4 w-[2px] shrink-0 rounded-full",

                                isActive

                                  ? "bg-brand-primary"

                                  : "bg-white/15"

                              )}

                            />
                            <span>{item.label}</span>

                          </span>
                          <span

                            className={clsx(

                              "flex size-7 shrink-0 items-center justify-center rounded-md",

                              expanded

                                ? "bg-brand-primary/15 text-red-300"

                                : "text-white/45"

                            )}

                          >

                            <ChevronIcon expanded={expanded} />

                          </span>

                        </button>

                      ) : (

                        <Link

                          href={item.href}

                          onClick={onClose}

                          aria-current={

                            isActive ? "page" : undefined

                          }

                          className={baseClass}

                        >

                          <span className="flex min-w-0 items-center gap-3">

                            <span

                              aria-hidden="true"

                              className={clsx(

                                "h-4 w-[2px] shrink-0 rounded-full",

                                isActive

                                  ? "bg-brand-primary"

                                  : "bg-white/15"

                              )}

                            />
                            {item.label}

                          </span>
                          <span className="text-white/35">

                            <ArrowIcon />

                          </span>

                        </Link>

                      )}
                      {/* Child links */}

                      {hasChildren && (

                        <AnimatePresence initial={false}>

                          {expanded && (

                            <motion.div

                              id={`mobile-submenu-${item.href.replace(/[^a-zA-Z0-9]/g, "-")}`}

                              key="submenu"

                              initial={

                                reducedMotion

                                  ? false

                                  : {

                                      height: 0,

                                      opacity: 0,

                                    }

                              }

                              animate={{

                                height: "auto",

                                opacity: 1,

                              }}

                              exit={{

                                height: 0,

                                opacity: 0,

                              }}

                              transition={{

                                duration: reducedMotion

                                  ? 0

                                  : 0.25,

                                ease: EASE,

                              }}

                              className="overflow-hidden"

                            >

                              <ul className="ml-[21px] mt-1 space-y-0.5 border-l border-white/10 pb-2 pl-3">

                                {children.map((child) => {

                                  const active =

                                    pathMatches(

                                      pathname,

                                      child.href

                                    );
                                  return (

                                    <li key={child.href}>

                                      <Link

                                        href={child.href}

                                        onClick={onClose}

                                        aria-current={

                                          active

                                            ? "page"

                                            : undefined

                                        }

                                        className={clsx(

                                          "flex min-h-9 items-center gap-2",

                                          "rounded-md px-3 py-2",

                                          "text-[11px] font-medium leading-[1.5]",

                                          "transition-colors duration-200",

                                          "focus-visible:outline-2 focus-visible:outline-brand-primary",

                                          active

                                            ? "bg-brand-primary/15 text-red-300"

                                            : "text-white/55 hover:bg-white/[0.06] hover:text-white"

                                        )}

                                      >

                                        <span

                                          aria-hidden="true"

                                          className={clsx(

                                            "size-1 shrink-0 rounded-full",

                                            active

                                              ? "bg-brand-primary"

                                              : "bg-white/25"

                                          )}

                                        />
                                        {child.label}

                                      </Link>

                                    </li>

                                  );

                                })}
                                {/* Parent page is still available

                                    without blocking expansion. */}

                                <li>

                                  <Link

                                    href={item.href}

                                    onClick={onClose}

                                    className="flex min-h-9 items-center gap-2 rounded-md px-3 py-2 text-[11px] font-semibold text-red-300 transition-colors hover:bg-white/[0.06]"

                                  >

                                    View All {item.label}

                                    <ArrowIcon />

                                  </Link>

                                </li>

                              </ul>

                            </motion.div>

                          )}

                        </AnimatePresence>

                      )}

                    </li>

                  );

                })}

              </ul>

            </nav>
            {/* Bottom CTAs */}

            <div className="shrink-0 border-t border-white/10 bg-[#101318] px-5 pb-[max(20px,env(safe-area-inset-bottom))] pt-4">

              <div className="grid grid-cols-2 gap-2.5">

                <Link

                  href={event.cta.registerVisit}

                  onClick={onClose}

                  className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white/20 bg-white/[0.06] px-3 py-2.5 text-center font-heading text-[11px] font-bold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"

                >

                  Register to Visit

                </Link>
                <Link

                  href={event.cta.bookStand}

                  onClick={onClose}

                  className="inline-flex min-h-11 items-center justify-center rounded-lg bg-brand-primary px-3 py-2.5 text-center font-heading text-[11px] font-bold text-white transition-colors hover:bg-brand-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"

                >

                  Book a Stand

                </Link>

              </div>
              <div className="mt-4 flex items-center justify-between gap-3 text-[10px] text-white/45">

                <span>Dhaka, Bangladesh</span>
                <a

                  href={`tel:${cleanPhone}`}

                  className="font-semibold text-red-300 transition-colors hover:text-white"

                >

                  {event.contact.general.phone}

                </a>

              </div>

            </div>

          </motion.aside>

        </div>

      )}

    </AnimatePresence>

  );

}
