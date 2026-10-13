
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import {
  exhibitionSectors,
  type SectorItem,
} from "@/data/exhibitionProfile";

/* ==========================================
   MOTION CONFIGURATION
========================================== */

const EASE = [0.22, 1, 0.36, 1] as const;

const reveal: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: EASE,
    },
  },
};

/* ==========================================
   TYPE FOR FILTERED RESULTS
========================================== */

interface FilteredSector {
  sector: SectorItem;
  index: number;
  subcategories: string[];
}

/* ==========================================
   SVG ICONS
========================================== */

function SectorIcon({ index }: { index: number }) {
  const paths = [
    <>
      <path d="M3 20h18M7 20V6h10v14M12 6V3h7M17 9h3v4" />
      <path d="M10 10h4M10 14h4M10 18h4" />
    </>,
    <>
      <path d="m3 9 9-5 9 5-9 5-9-5Z" />
      <path d="m3 13 9 5 9-5M3 17l9 5 9-5" />
    </>,
    <>
      <path d="M3 21h18M5 21V9l7-6 7 6v12" />
      <path d="M9 21v-7h6v7M8 10h1m6 0h1" />
    </>,
    <>
      <path d="m3 11 9-8 9 8M5 10v11h14V10" />
      <path d="M9 21v-7h6v7M3 21h18" />
    </>,
    <>
      <path d="M12 2v6m0 8v6M4.9 4.9l4.2 4.2m5.8 5.8 4.2 4.2" />
      <path d="M2 12h6m8 0h6M4.9 19.1l4.2-4.2m5.8-5.8 4.2-4.2" />
      <circle cx="12" cy="12" r="4" />
    </>,
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M8 3v18M8 12h13M12 7h5M12 17h5" />
    </>,
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </>,
  ];

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
      {paths[index] ?? paths[0]}
    </svg>
  );
}

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
   EXHIBITION PROFILE EXPLORER
========================================== */

export function ExhibitionProfileExplorer() {
  const [query, setQuery] = useState("");

  const [activeSlug, setActiveSlug] =
    useState<string | null>(null);

  const reducedMotion = !!useReducedMotion();

  /* ======================================
     SEARCH + FILTER
  ====================================== */

  const filtered = useMemo<FilteredSector[]>(() => {
    const searchTerm = query.trim().toLowerCase();

    return exhibitionSectors.flatMap((sector, index) => {
      // Category filter applies when no search is active.
      if (
        !searchTerm &&
        activeSlug &&
        activeSlug !== sector.slug
      ) {
        return [];
      }

      const allSubcategories = [
        ...sector.subcategories,
      ];

      if (!searchTerm) {
        return [
          {
            sector,
            index,
            subcategories: allSubcategories,
          },
        ];
      }

      const sectorMatches = sector.name
        .toLowerCase()
        .includes(searchTerm);

      const matchingProducts = allSubcategories.filter(
        (product) =>
          product.toLowerCase().includes(searchTerm)
      );

      if (
        !sectorMatches &&
        matchingProducts.length === 0
      ) {
        return [];
      }

      return [
        {
          sector,
          index,
          subcategories: sectorMatches
            ? allSubcategories
            : matchingProducts,
        },
      ];
    });
  }, [query, activeSlug]);

  const hasFilters =
    query.trim().length > 0 || activeSlug !== null;

  const resetFilters = () => {
    setQuery("");
    setActiveSlug(null);
  };

  const handleSearch = (value: string) => {
    setQuery(value);
    setActiveSlug(null);
  };

  const selectCategory = (slug: string | null) => {
    setQuery("");
    setActiveSlug(slug);
  };

  const scrollReveal = {
    initial: reducedMotion ? false : "hidden",
    whileInView: "visible" as const,
    viewport: {
      once: true,
      amount: 0.08,
    },
  };

  return (
    <div className="w-full text-brand-dark">
      {/* ===================================
          INTRODUCTION
      ==================================== */}

      <motion.header
        {...scrollReveal}
        variants={reveal}
        className="mb-7 flex flex-col gap-4 border-b border-brand-border pb-6 sm:flex-row sm:items-end sm:justify-between"
      >
        <div className="max-w-[760px]">
          <div className="flex items-center gap-2.5">
            <span className="h-[2px] w-7 bg-brand-primary" />

            <span className="font-heading text-[10px] font-extrabold uppercase tracking-[0.16em] text-brand-primary-dark">
              Official Brochure · Exhibitor Profile
            </span>
          </div>

          <h2
            id="exhibition-profile-heading"
            className="mt-3 font-heading text-[clamp(1.5rem,2.7vw,2.1rem)] font-extrabold leading-[1.2] tracking-[-0.04em] text-brand-dark"
          >
            Products, Machinery{" "}
            <span className="text-brand-primary-dark">
              & Materials
            </span>
          </h2>

          <p className="mt-3 max-w-[680px] text-[13px] leading-[1.85] text-brand-body sm:text-sm">
            Explore the product categories listed in
            the official Bangladesh Buildcon 2026
            exhibitor profile, including construction
            machinery, materials, electrical
            engineering, interiors and safety.
          </p>
        </div>

        <span className="inline-flex w-fit shrink-0 rounded-lg border border-brand-primary/15 bg-brand-primary-soft px-3 py-2 font-heading text-[11px] font-bold text-brand-primary-dark">
          {exhibitionSectors.length} Main Categories
        </span>
      </motion.header>

      {/* ===================================
          SEARCH PANEL
      ==================================== */}

      <motion.div
        {...scrollReveal}
        variants={reveal}
        className="rounded-2xl border border-brand-border bg-white p-4 shadow-[0_8px_28px_rgba(5,7,9,0.035)] sm:p-6"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="w-full sm:max-w-[620px]">
            <label
              htmlFor="exhibitor-sector-search"
              className="mb-2 block font-heading text-[12px] font-bold text-brand-dark"
            >
              Search Products & Categories
            </label>

            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted">
                <SearchIcon />
              </span>

              <input
                id="exhibitor-sector-search"
                type="search"
                value={query}
                onChange={(e) =>
                  handleSearch(e.target.value)
                }
                placeholder="Search cranes, roofing, HVAC, electrical..."
                autoComplete="off"
                className="min-h-12 w-full rounded-xl border border-brand-border bg-brand-light py-3 pl-12 pr-12 text-[13px] font-medium text-brand-dark outline-none transition-[border-color,box-shadow] placeholder:text-brand-muted focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 sm:text-sm"
              />

              {query && (
                <button
                  type="button"
                  onClick={() => handleSearch("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-brand-muted transition-colors hover:bg-black/5 hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-brand-primary"
                >
                  <CloseIcon />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <p
              role="status"
              aria-live="polite"
              className="text-[12px] font-semibold text-brand-body"
            >
              <span className="font-extrabold text-brand-primary-dark">
                {filtered.length}
              </span>{" "}
              {filtered.length === 1
                ? "category"
                : "categories"}{" "}
              found
            </p>

            {hasFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-[12px] font-bold text-brand-primary-dark underline underline-offset-4 transition-colors hover:text-brand-primary"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* ===================================
            CATEGORY BUTTONS
        ==================================== */}

        <div className="mt-5 border-t border-brand-border pt-5">
          <p className="mb-3 font-heading text-[11px] font-bold text-brand-dark">
            Filter by Exhibitor Category
          </p>

          <div
            role="group"
            aria-label="Filter exhibitor categories"
            className="flex flex-wrap gap-2"
          >
            <button
              type="button"
              aria-pressed={!hasFilters}
              onClick={resetFilters}
              className={`min-h-9 rounded-lg px-3.5 py-2 font-heading text-[11px] font-bold transition-colors focus-visible:outline-2 focus-visible:outline-brand-primary ${
                !hasFilters
                  ? "bg-brand-dark text-white"
                  : "border border-brand-border bg-brand-light text-brand-body hover:border-brand-primary/30 hover:text-brand-primary-dark"
              }`}
            >
              All Categories
            </button>

            {exhibitionSectors.map((sector) => {
              const selected =
                activeSlug === sector.slug &&
                !query.trim();

              return (
                <button
                  key={sector.slug}
                  type="button"
                  aria-pressed={selected}
                  onClick={() =>
                    selectCategory(
                      selected ? null : sector.slug
                    )
                  }
                  className={`min-h-9 rounded-lg px-3.5 py-2 font-heading text-[11px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-brand-primary ${
                    selected
                      ? "bg-brand-primary text-white"
                      : "border border-brand-border bg-brand-light text-brand-body hover:border-brand-primary/35 hover:bg-brand-primary-soft hover:text-brand-primary-dark"
                  }`}
                >
                  {sector.name}
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* ===================================
          ANIMATED RESULTS
      ==================================== */}

      <div
        id="exhibition-sectors"
        aria-label="Exhibition category results"
        className="mt-6"
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
                    : {
                        opacity: 0,
                        y: 12,
                      }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  duration: reducedMotion ? 0 : 0.3,
                  ease: EASE,
                }}
                className="col-span-full rounded-2xl border border-dashed border-brand-border bg-white px-6 py-12 text-center"
              >
                <span className="mx-auto flex size-12 items-center justify-center rounded-xl bg-brand-primary-soft text-brand-primary-dark">
                  <SearchIcon />
                </span>

                <h3 className="mt-4 font-heading text-[17px] font-extrabold text-brand-dark">
                  No Matching Categories
                </h3>

                <p className="mx-auto mt-2 max-w-sm text-[13px] leading-[1.8] text-brand-body">
                  No product category matches your
                  search. Try another product,
                  equipment or material name.
                </p>

                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-5 min-h-10 rounded-lg bg-brand-primary px-5 py-2.5 font-heading text-[12px] font-bold text-white transition-colors hover:bg-brand-primary-dark"
                >
                  Clear Filters
                </button>
              </motion.div>
            ) : (
              filtered.map(
                ({
                  sector,
                  index,
                  subcategories,
                }) => (
                  <motion.article
                    key={sector.slug}
                    id={sector.slug}
                    layout={!reducedMotion}
                    initial={
                      reducedMotion
                        ? false
                        : {
                            opacity: 0,
                            y: 14,
                          }
                    }
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={
                      reducedMotion
                        ? {
                            opacity: 0,
                          }
                        : {
                            opacity: 0,
                            scale: 0.97,
                          }
                    }
                    transition={{
                      duration: reducedMotion
                        ? 0
                        : 0.35,
                      ease: EASE,
                      layout: {
                        duration: reducedMotion
                          ? 0
                          : 0.32,
                      },
                    }}
                    className="group relative flex h-full min-w-0 scroll-mt-28 flex-col overflow-hidden rounded-2xl border border-brand-border bg-white shadow-[0_5px_22px_rgba(5,7,9,0.035)] transition-[border-color,box-shadow] duration-300 hover:border-brand-primary/35 hover:shadow-[0_15px_35px_rgba(5,7,9,0.075)]"
                  >
                    {/* Hover accent */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-brand-primary transition-transform duration-300 group-hover:scale-x-100"
                    />

                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <div className="flex items-center justify-between gap-3">
                        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-primary-soft text-brand-primary-dark transition-colors duration-300 group-hover:bg-brand-primary group-hover:text-white">
                          <SectorIcon index={index} />
                        </span>

                        <span className="font-heading text-[11px] font-bold tabular-nums text-brand-muted">
                          {String(index + 1).padStart(
                            2,
                            "0"
                          )}
                        </span>
                      </div>

                      {/* Sector title */}
                      <h3 className="mt-5 font-heading text-[16px] font-extrabold leading-[1.45] tracking-[-0.025em] text-brand-dark transition-colors group-hover:text-brand-primary-dark">
                        {sector.name}
                      </h3>

                      <p className="mt-2 text-[11px] font-semibold text-brand-muted">
                        {subcategories.length}{" "}
                        {subcategories.length === 1
                          ? "Product Group"
                          : "Product Groups"}
                      </p>

                      {/* Product groups */}
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {subcategories.map(
                          (subcategory) => (
                            <li key={subcategory}>
                              <span className="inline-flex rounded-lg border border-brand-border bg-brand-light px-2.5 py-1.5 text-[11px] font-medium leading-[1.5] text-brand-body transition-colors group-hover:border-brand-primary/15 group-hover:bg-brand-primary-soft">
                                {subcategory}
                              </span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    {/* Booking button */}
                    <div className="border-t border-brand-border bg-brand-light/60 p-4 sm:px-6">
                      <Link
                        href="/book-a-stand"
                        aria-label={`Enquire about exhibiting in ${sector.name}`}
                        className="group/link inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg bg-brand-primary px-4 py-2.5 font-heading text-[12px] font-bold text-white transition-colors hover:bg-brand-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
                      >
                        Book Stand

                        <span className="transition-transform group-hover/link:translate-x-1">
                          <ArrowIcon />
                        </span>
                      </Link>
                    </div>
                  </motion.article>
                )
              )
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Data clarification */}
      <p className="mt-5 text-[11px] leading-[1.8] text-brand-muted">
        Product groups are based on the official
        Bangladesh Buildcon 2026 exhibitor profile.
        They describe the exhibition scope, not
        confirmed exhibitor participation.
      </p>
    </div>
  );
}
