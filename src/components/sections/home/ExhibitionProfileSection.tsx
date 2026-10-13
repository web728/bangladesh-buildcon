
"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { Container } from "@/components/ui/Container";
import { event } from "@/config/event";
import { exhibitionSectors } from "@/data/exhibitionProfile";

const EASE = [0.22, 1, 0.36, 1] as const;

const reveal: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.055,
    },
  },
};

/* Official brochure sectors are read
   from exhibitionSectors directly. */

const details = [
  {
    description:
      "Machinery, equipment, lifting systems and construction tools.",
    icon: "M3 20h18M5 20v-6h6l4 6M7 14V5h8l4 4v5M7 8h8",
  },
  {
    description:
      "Concrete, cement, roofing, cladding and building products.",
    icon: "m12 3 9 5-9 5-9-5 9-5ZM3 8v9l9 5 9-5V8M12 13v9",
  },
  {
    description:
      "Building systems, structural products and construction solutions.",
    icon: "M3 21h18M5 21V9l7-5 7 5v12M9 21v-8h6v8",
  },
  {
    description:
      "Housing, landscape products and outdoor construction.",
    icon: "m3 11 9-8 9 8M5 10v11h14V10M9 21v-7h6v7",
  },
  {
    description:
      "Power distribution, lighting and electrical engineering.",
    icon: "M13 2 4 14h7l-1 8 10-12h-7l1-8Z",
  },
  {
    description:
      "Interiors, finishes, facades, doors and surface products.",
    icon: "M3 3h18v18H3zM12 3v18M3 12h18",
  },
  {
    description:
      "Site safety, fire protection and security technologies.",
    icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Zm-3-10 2 2 4-4",
  },
] as const;

const tabs = [
  {
    id: "all",
    label: "All Sectors",
    indices: [0, 1, 2, 3, 4, 5, 6],
  },
  {
    id: "construction",
    label: "Construction",
    indices: [0, 1, 2],
  },
  {
    id: "design",
    label: "Design & Housing",
    indices: [3, 5],
  },
  {
    id: "engineering",
    label: "Engineering & Safety",
    indices: [4, 6],
  },
] as const;

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      aria-hidden="true"
    >
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

export function ExhibitionProfileSection() {
  const reduceMotion = !!useReducedMotion();
  const [activeTab, setActiveTab] = useState("all");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const selectedTab =
    tabs.find((tab) => tab.id === activeTab) ?? tabs[0];

  // No type predicate, so no TypeScript red-line error.
  const visibleSectors = exhibitionSectors
    .map((sector, index) => ({ sector, index }))
    .filter(({ index }) =>
      selectedTab.indices.some((selected) => selected === index)
    );

  function handleKeyDown(
    e: KeyboardEvent<HTMLButtonElement>,
    index: number
  ) {
    let next = index;

    if (e.key === "ArrowRight") {
      next = (index + 1) % tabs.length;
    } else if (e.key === "ArrowLeft") {
      next = (index - 1 + tabs.length) % tabs.length;
    } else if (e.key === "Home") {
      next = 0;
    } else if (e.key === "End") {
      next = tabs.length - 1;
    } else {
      return;
    }

    e.preventDefault();
    setActiveTab(tabs[next].id);
    tabRefs.current[next]?.focus();
  }

  return (
    <section
      aria-labelledby="exhibition-profile-heading"
      className="relative overflow-hidden bg-brand-light py-12 text-brand-dark sm:py-14"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(5,7,9,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(5,7,9,0.015)_1px,transparent_1px)] bg-[size:70px_70px]"
      />

      <Container className="relative z-10">
        {/* HEADER */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="flex flex-col gap-4 border-b border-brand-border pb-5 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="h-[2px] w-6 bg-brand-primary" />
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand-primary-dark">
                Exhibition Profile
              </span>
            </div>

            <h2
              id="exhibition-profile-heading"
              className="mt-2.5 font-heading text-[clamp(1.55rem,2.5vw,2rem)] font-extrabold leading-tight tracking-[-0.035em]"
            >
              Explore Our{" "}
              <span className="text-brand-primary-dark">
                Industry Sectors
              </span>
            </h2>

            <p className="mt-2 text-[12px] leading-[1.75] text-brand-body sm:text-[13px]">
              Seven exhibition categories covering
              construction materials, machinery,
              engineering, interiors and safety.
            </p>
          </div>

          <Link
            href="/exhibition-profile"
            className="group inline-flex min-h-10 w-fit items-center gap-2 rounded-lg border border-brand-border bg-white px-4 py-2.5 text-[11px] font-bold transition-colors hover:border-brand-primary/40 hover:text-brand-primary-dark"
          >
            View All Sectors
            <span className="transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              <ArrowIcon />
            </span>
          </Link>
        </motion.div>

        {/* TABS */}
        <div
          role="tablist"
          aria-label="Exhibition sector filters"
          className="mt-5 flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:pb-0"
        >
          {tabs.map((tab, index) => {
            const active = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                id={`sector-tab-${tab.id}`}
                role="tab"
                type="button"
                aria-selected={active}
                aria-controls="sector-panel"
                tabIndex={active ? 0 : -1}
                onClick={() => setActiveTab(tab.id)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={`relative inline-flex min-h-10 shrink-0 items-center gap-2 overflow-hidden rounded-lg px-4 py-2.5 text-[11px] font-semibold whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary ${
                  active
                    ? "bg-brand-dark text-white"
                    : "border border-brand-border bg-white text-brand-body hover:border-brand-primary/40 hover:text-brand-primary-dark"
                }`}
              >
                {tab.label}

                <span
                  className={`rounded px-1.5 py-0.5 text-[10px] ${
                    active
                      ? "bg-white/15"
                      : "bg-brand-light text-brand-muted"
                  }`}
                >
                  {tab.indices.length}
                </span>

                {active && (
                  <motion.span
                    layoutId="sector-active-line"
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : {
                            type: "spring",
                            stiffness: 380,
                            damping: 32,
                          }
                    }
                    className="absolute inset-x-0 bottom-0 h-[2px] bg-brand-primary"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* SECTOR GRID */}
        <div
          id="sector-panel"
          role="tabpanel"
          aria-labelledby={`sector-tab-${activeTab}`}
          className="mt-4"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeTab}
              variants={stagger}
              initial={reduceMotion ? false : "hidden"}
              animate="visible"
              exit={
                reduceMotion
                  ? { opacity: 1 }
                  : {
                      opacity: 0,
                      y: -6,
                      transition: { duration: 0.15 },
                    }
              }
              className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
            >
              {visibleSectors.map(({ sector, index }) => (
                <motion.article
                  key={sector.slug}
                  variants={reveal}
                  whileHover={
                    reduceMotion ? undefined : { y: -3 }
                  }
                  className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-brand-border bg-white p-4 shadow-[0_4px_18px_rgba(0,0,0,0.025)] transition-[border-color,box-shadow] hover:border-brand-primary/35 hover:shadow-[0_12px_28px_rgba(0,0,0,0.065)] sm:p-5"
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-brand-primary transition-transform group-hover:scale-x-100"
                  />

                  <div className="flex items-center justify-between gap-3">
                    <span className="flex size-10 items-center justify-center rounded-lg bg-brand-primary-soft text-brand-primary-dark transition-colors group-hover:bg-brand-primary group-hover:text-white">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="size-5"
                        aria-hidden="true"
                      >
                        <path
                          d={details[index]?.icon ?? details[0].icon}
                        />
                      </svg>
                    </span>

                    <span className="text-[10px] font-bold text-brand-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-4 font-heading text-[13px] font-bold leading-[1.5] text-brand-dark sm:text-[14px]">
                    {sector.name}
                  </h3>

                  <p className="mt-2 flex-1 text-[11px] leading-[1.75] text-brand-body">
                    {details[index]?.description ??
                      "Building and construction industry products."}
                  </p>

                  <Link
                    href={`/exhibition-profile#${sector.slug}`}
                    aria-label={`Explore ${sector.name}`}
                    className="mt-4 flex items-center justify-between border-t border-brand-border pt-3 text-[11px] font-semibold text-brand-primary-dark transition-colors hover:text-brand-primary"
                  >
                    Explore Sector

                    <span className="transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                      <ArrowIcon />
                    </span>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* COMPACT CTA */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mt-6 flex flex-col gap-4 rounded-xl bg-brand-dark p-5 text-white sm:flex-row sm:items-center sm:justify-between sm:px-6"
        >
          <div>
            <h3 className="font-heading text-[14px] font-bold sm:text-[15px]">
              Showcase Your Products at Buildcon 2026
            </h3>

            <p className="mt-1 text-[11px] leading-[1.7] text-white/60">
              Explore exhibition participation and stand enquiry.
            </p>
          </div>

          <Link
            href={event.cta.bookStand}
            className="group inline-flex min-h-10 w-fit shrink-0 items-center gap-2 rounded-lg bg-brand-primary px-5 py-2.5 text-[11px] font-bold text-white transition-colors hover:bg-brand-primary-dark"
          >
            Enquire for Stand Space

            <span className="transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              <ArrowIcon />
            </span>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
