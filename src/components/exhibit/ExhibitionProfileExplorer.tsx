
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { exhibitionSectors } from "@/data/exhibitionProfile";
import { sectorIconMap } from "@/components/icons/SectorIcons";

/* ==========================================
   MOTION
========================================== */

const EASE = [0.22, 1, 0.36, 1] as const;

const sectionReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: EASE,
    },
  },
};

/* ==========================================
   ICONS
========================================== */

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
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
      className="size-4 shrink-0"
      aria-hidden="true"
    >
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
      aria-hidden="true"
    >
      <path d="M4 21V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16M2 21h20M9 7h1m4 0h1M9 11h1m4 0h1M9 15h1m4 0h1M10 21v-4h4v4" />
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
      className="size-4"
      aria-hidden="true"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

/* ==========================================
   EXPLORER
========================================== */

export function ExhibitionProfileExplorer() {
  const reducedMotion = !!useReducedMotion();

  const [query, setQuery] = useState("");
  const [activeSlug, setActiveSlug] =
    useState<string | null>(null);

  /* ----------------------------------------
     FILTERING

     Search matches sector titles and
     individual subcategories.

     Original behavior preserved:
     Searching clears selected sector.
  ----------------------------------------- */

  const filtered = useMemo(() => {
    const normalizedQuery =
      query.trim().toLowerCase();

    if (normalizedQuery) {
      return exhibitionSectors.flatMap((sector) => {
        const nameMatches = sector.name
          .toLowerCase()
          .includes(normalizedQuery);

        if (nameMatches) {
          return [sector];
        }

        const matchingSubcategories =
          sector.subcategories.filter((subcategory) =>
            subcategory
              .toLowerCase()
              .includes(normalizedQuery)
          );

        if (matchingSubcategories.length === 0) {
          return [];
        }

        return [
          {
            ...sector,
            subcategories: matchingSubcategories,
          },
        ];
      });
    }

    if (activeSlug) {
      return exhibitionSectors.filter(
        (sector) => sector.slug === activeSlug
      );
    }

    return exhibitionSectors;
  }, [query, activeSlug]);

  const hasFilters = Boolean(
    query.trim() || activeSlug
  );

  const clearFilters = () => {
    setQuery("");
    setActiveSlug(null);
  };

  const selectSector = (slug: string | null) => {
    setQuery("");
    setActiveSlug(slug);
  };

  const handleSearch = (value: string) => {
    setQuery(value);

    if (activeSlug) {
      setActiveSlug(null);
    }
  };

  const revealProps = {
    initial: reducedMotion ? false : "hidden",
    whileInView: "visible" as const,
    viewport: {
      once: true,
      amount: 0.08,
    },
  };

  return (
    <div className="w-full text-[#171B24]">
      {/* ======================================
          SECTION INTRODUCTION
      ======================================= */}

      <motion.div
        {...revealProps}
        variants={sectionReveal}
        className="mb-7 flex flex-col gap-4 border-b border-[#DFE3EA] pb-6 sm:flex-row sm:items-end sm:justify-between"
      >
        <div className="max-w-[730px]">
          <div className="flex items-center gap-2.5">
            <span className="h-[2px] w-7 bg-brand-primary" />

            <span className="font-heading text-[10px] font-extrabold uppercase tracking-[0.17em] text-[#981568]">
              Industry Exhibition Profile
            </span>
          </div>

          <h2 className="mt-3 font-heading text-[clamp(1.5rem,2.6vw,2.1rem)] font-extrabold leading-[1.2] tracking-[-0.04em] text-[#171B24]">
            Explore Products{" "}
            <span className="text-[#981568]">
              & Industry Categories
            </span>
          </h2>

          <p className="mt-3 max-w-[670px] text-[13px] leading-[1.85] text-[#414957] sm:text-[14px]">
            Browse the exhibition sectors and find
            relevant products, machinery, materials
            and building technologies.
          </p>
        </div>

        <span className="inline-flex w-fit shrink-0 items-center gap-2 rounded-lg border border-brand-primary/15 bg-brand-primary/[0.06] px-3 py-2 font-heading text-[11px] font-bold text-[#981568]">
          <span className="size-1.5 rounded-full bg-brand-primary" />

          {exhibitionSectors.length} Sectors
        </span>
      </motion.div>

      {/* ======================================
          SEARCH & FILTER CONTROLS
      ======================================= */}

      <motion.div
        {...revealProps}
        variants={sectionReveal}
        className="rounded-2xl border border-[#E0E3EA] bg-white p-4 shadow-[0_8px_30px_rgba(5,7,9,0.035)] sm:p-6"
      >
        {/* Search row */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="w-full lg:max-w-[610px]">
            <label
              htmlFor="sector-search"
              className="mb-2 block font-heading text-[12px] font-bold text-[#29313D]"
            >
              Search Exhibition Sectors
            </label>

            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7583]">
                <SearchIcon />
              </span>

              <input
                id="sector-search"
                type="search"
                value={query}
                onChange={(event) =>
                  handleSearch(event.target.value)
                }
                placeholder="Search steel, machinery, materials, lighting..."
                autoComplete="off"
                className="min-h-[48px] w-full rounded-xl border border-[#DDE1E8] bg-[#F9FAFC] py-3 pl-12 pr-12 text-[13px] font-medium text-[#171B24] outline-none transition-[border-color,background-color,box-shadow] duration-300 placeholder:text-[#687280] hover:border-[#BFC5D0] focus:border-brand-primary focus:bg-white focus:ring-2 focus:ring-brand-primary/10 sm:text-[14px]"
              />

              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear sector search"
                  className="absolute right-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-[#657080] transition-colors hover:bg-[#ECEEF3] hover:text-[#171B24] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
                >
                  <CloseIcon />
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 lg:justify-end">
            <p
              role="status"
              aria-live="polite"
              className="text-[12px] font-semibold text-[#424B58]"
            >
              <span className="font-extrabold text-[#981568]">
                {filtered.length}
              </span>{" "}
              {filtered.length === 1
                ? "sector"
                : "sectors"}{" "}
              found
            </p>

            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="rounded-lg px-2 py-1.5 text-[12px] font-bold text-[#981568] underline decoration-brand-primary/30 underline-offset-4 transition-colors hover:text-brand-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Sector selection */}
        <div className="mt-5 border-t border-[#EAECF1] pt-5">
          <p className="mb-3 font-heading text-[11px] font-bold text-[#3A4350]">
            Filter by Category
          </p>

          <div
            role="group"
            aria-label="Filter exhibition sectors"
            className="flex flex-wrap gap-2"
          >
            <button
              type="button"
              onClick={() => selectSector(null)}
              aria-pressed={!hasFilters}
              className={`min-h-9 rounded-lg px-3.5 py-2 font-heading text-[11px] font-bold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary ${
                !hasFilters
                  ? "bg-[#171B24] text-white"
                  : "border border-[#E1E4EA] bg-[#F8F9FB] text-[#303946] hover:border-brand-primary/35 hover:text-[#981568]"
              }`}
            >
              All Sectors
            </button>

            {exhibitionSectors.map((sector) => {
              const isSelected =
                activeSlug === sector.slug &&
                !query;

              return (
                <button
                  key={sector.slug}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() =>
                    selectSector(
                      isSelected ? null : sector.slug
                    )
                  }
                  className={`min-h-9 rounded-lg px-3.5 py-2 font-heading text-[11px] font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary ${
                    isSelected
                      ? "bg-brand-primary text-white shadow-[0_5px_15px_rgba(186,29,130,0.16)]"
                      : "border border-[#E1E4EA] bg-[#F8F9FB] text-[#303946] hover:border-brand-primary/35 hover:bg-[#FCF4F9] hover:text-[#981568]"
                  }`}
                >
                  {sector.name}
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* ======================================
          SECTOR RESULTS
      ======================================= */}

      <div
        id="exhibition-sectors"
        className="mt-6"
        aria-label="Exhibition sector results"
      >
        <motion.div
          layout={!reducedMotion}
          className="grid items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence
            initial={false}
            mode="popLayout"
          >
            {filtered.length === 0 ? (
              <motion.div
                key="no-results"
                initial={
                  reducedMotion
                    ? false
                    : { opacity: 0, y: 12 }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={
                  reducedMotion
                    ? { opacity: 1 }
                    : { opacity: 0 }
                }
                transition={{
                  duration: 0.3,
                  ease: EASE,
                }}
                className="col-span-full rounded-2xl border border-dashed border-[#D9DEE7] bg-white px-5 py-12 text-center"
              >
                <span className="mx-auto flex size-12 items-center justify-center rounded-xl bg-brand-primary/[0.07] text-[#981568]">
                  <SearchIcon />
                </span>

                <h3 className="mt-4 font-heading text-[17px] font-extrabold text-[#171B24]">
                  No Matching Sectors
                </h3>

                <p className="mx-auto mt-2 max-w-[370px] text-[13px] leading-[1.75] text-[#414957]">
                  No exhibit categories match your
                  search. Try a broader product or
                  material name.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 inline-flex min-h-10 items-center justify-center rounded-lg bg-brand-primary px-5 py-2.5 font-heading text-[12px] font-bold text-white transition-colors hover:bg-[#981568]"
                >
                  Clear Search & Filters
                </button>
              </motion.div>
            ) : (
              filtered.map((sector, index) => {
                const Icon =
                  sectorIconMap[sector.slug];

                return (
                  <motion.article
                    key={sector.slug}
                    id={sector.slug}
                    layout={!reducedMotion}
                    initial={
                      reducedMotion
                        ? false
                        : {
                            opacity: 0,
                            y: 12,
                          }
                    }
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={
                      reducedMotion
                        ? { opacity: 1 }
                        : {
                            opacity: 0,
                            scale: 0.97,
                            transition: {
                              duration: 0.18,
                            },
                          }
                    }
                    transition={{
                      duration: 0.36,
                      ease: EASE,
                      delay: reducedMotion
                        ? 0
                        : Math.min(index, 8) * 0.025,
                      layout: {
                        duration: 0.32,
                        ease: EASE,
                      },
                    }}
                    className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-[#E0E3EA] bg-white shadow-[0_5px_22px_rgba(5,7,9,0.035)] transition-[border-color,box-shadow] duration-300 hover:border-brand-primary/35 hover:shadow-[0_15px_35px_rgba(5,7,9,0.075)]"
                  >
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-brand-primary transition-transform duration-300 group-hover:scale-x-100"
                    />

                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      {/* Card top */}
                      <div className="flex items-start justify-between gap-3">
                        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-primary/[0.08] text-[#981568] transition-colors duration-300 group-hover:bg-brand-primary group-hover:text-white">
                          {Icon ? (
                            <Icon className="size-5" />
                          ) : (
                            <BuildingIcon />
                          )}
                        </span>

                        <span className="font-heading text-[11px] font-bold tabular-nums text-[#657080]">
                          {String(
                            exhibitionSectors.findIndex(
                              (item) =>
                                item.slug === sector.slug
                            ) + 1
                          ).padStart(2, "0")}
                        </span>
                      </div>

                      <h3 className="mt-5 font-heading text-[16px] font-extrabold leading-[1.4] tracking-[-0.025em] text-[#171B24] transition-colors group-hover:text-[#981568]">
                        {sector.name}
                      </h3>

                      <p className="mt-1.5 text-[11px] font-semibold text-[#56606D]">
                        {sector.subcategories.length}{" "}
                        {sector.subcategories.length === 1
                          ? "Product Category"
                          : "Product Categories"}
                      </p>

                      {/* Product subcategories */}
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {sector.subcategories.map(
                          (subcategory) => (
                            <li key={subcategory}>
                              <span className="inline-flex rounded-lg border border-[#E1E5EB] bg-[#F8F9FB] px-2.5 py-1.5 text-[11px] font-medium leading-[1.45] text-[#37414E] transition-colors group-hover:border-brand-primary/15 group-hover:bg-[#FDF7FB]">
                                {subcategory}
                              </span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    {/* Card footer */}
                    <div className="border-t border-[#EAECF1] bg-[#FCFCFD] p-4 sm:px-6">
                      <Link
                        href="/book-a-stand"
                        aria-label={`Enquire about exhibiting in ${sector.name}`}
                        className="group/link inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg bg-brand-primary px-4 py-2.5 font-heading text-[12px] font-bold text-white shadow-[0_7px_18px_rgba(186,29,130,0.12)] transition-all duration-300 hover:bg-[#981568] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
                      >
                        Book Stand

                        <span className="transition-transform duration-300 group-hover/link:translate-x-1">
                          <ArrowIcon />
                        </span>
                      </Link>
                    </div>
                  </motion.article>
                );
              })
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
