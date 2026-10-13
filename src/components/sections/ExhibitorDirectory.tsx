
"use client";

import {
  useMemo,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

import { ExhibitorCard } from "@/components/ui/ExhibitorCard";
import type { ExhibitorSummary } from "@/lib/data/exhibitors";

/* ==========================================
   TYPES & MOTION
========================================== */

interface ExhibitorDirectoryProps {
  exhibitors: ExhibitorSummary[];
}

type SortOrder = "name-asc" | "name-desc";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ==========================================
   SVG ICONS
========================================== */

function SearchIcon({
  className = "size-5",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
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

function FilterIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      aria-hidden="true"
    >
      <path d="M4 7h16M7 12h10M10 17h4" />
      <circle cx="8" cy="7" r="2" fill="white" />
      <circle cx="15" cy="12" r="2" fill="white" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
      aria-hidden="true"
    >
      <path d="M3 21h18M5 21V5h10v16M15 10h5v11" />
      <path d="M8 9h4M8 13h4M8 17h4" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c-3 3-4 6-4 9s1 6 4 9M12 3c3 3 4 6 4 9s-1 6-4 9" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="pointer-events-none size-4 shrink-0"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

/* ==========================================
   ANIMATED DIRECTORY ILLUSTRATION

   Used only for an empty directory.
   Solid brand colors, no gradients.
========================================== */

function DirectoryIllustration({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  return (
    <svg
      viewBox="0 0 320 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto h-auto w-full max-w-[300px]"
      aria-hidden="true"
    >
      {/* Ground */}
      <path
        d="M20 158H300"
        stroke="#E8DDE6"
        strokeWidth="1.5"
      />

      {/* Main exhibition structure */}
      <motion.path
        d="M62 158V61L143 24L224 61V158M77 158V72L143 42L209 72V158"
        stroke="#BA1D82"
        strokeWidth="2"
        initial={reducedMotion ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: reducedMotion ? 0 : 1.6,
          ease: EASE,
        }}
      />

      <path
        d="M62 91H224M62 125H224"
        stroke="#BA1D82"
        strokeOpacity=".3"
      />

      {[89, 126, 163, 200].map((x) => (
        <rect
          key={x}
          x={x}
          y="103"
          width="18"
          height="18"
          stroke="#BA1D82"
          strokeOpacity=".45"
        />
      ))}

      {/* Adjacent building */}
      <path
        d="M236 158V92h55v66M236 92l27-18 28 18M247 115h32M247 134h32"
        stroke="#304090"
        strokeOpacity=".8"
        strokeWidth="1.7"
      />

      {/* Scanning ring */}
      <motion.g
        animate={
          reducedMotion ? undefined : { rotate: 360 }
        }
        style={{
          transformOrigin: "254px 39px",
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <circle
          cx="254"
          cy="39"
          r="24"
          stroke="#BA1D82"
          strokeDasharray="4 7"
          strokeOpacity=".55"
        />

        <circle
          cx="254"
          cy="15"
          r="3.5"
          fill="#BA1D82"
        />
      </motion.g>

      {/* Animated site marker */}
      <motion.circle
        cx="143"
        cy="24"
        r="4"
        fill="#BA1D82"
        animate={
          reducedMotion
            ? undefined
            : {
                opacity: [0.4, 1, 0.4],
                scale: [1, 1.25, 1],
              }
        }
        style={{
          transformOrigin: "143px 24px",
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </svg>
  );
}

/* ==========================================
   SHARED FILTER SELECT
========================================== */

interface DirectorySelectProps {
  id: string;
  label: string;
  value: string;
  options: string[];
  allLabel: string;
  onChange: (value: string) => void;
}

function DirectorySelect({
  id,
  label,
  value,
  options,
  allLabel,
  onChange,
}: DirectorySelectProps) {
  return (
    <div className="min-w-0 flex-1">
      <label
        htmlFor={id}
        className="mb-2 block font-heading text-[11px] font-bold text-[#514B55]"
      >
        {label}
      </label>

      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="
            min-h-11 w-full appearance-none
            rounded-lg border border-[#E7E1E8]
            bg-white px-3.5 py-2.5 pr-10
            font-heading text-[12px] font-semibold
            text-brand-dark outline-none
            transition-[border-color,box-shadow]
            duration-200
            hover:border-brand-primary/30
            focus:border-brand-primary
            focus:ring-2 focus:ring-brand-primary/10
          "
        >
          <option value="">{allLabel}</option>

          {options.map((option) => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          ))}
        </select>

        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-brand-primary">
          <ChevronIcon />
        </span>
      </div>
    </div>
  );
}

/* ==========================================
   MAIN EXHIBITOR DIRECTORY
========================================== */

export function ExhibitorDirectory({
  exhibitors,
}: ExhibitorDirectoryProps) {
  const reducedMotion = !!useReducedMotion();

  const [query, setQuery] = useState("");
  const [selectedCountry, setSelectedCountry] =
    useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("");
  const [sortOrder, setSortOrder] =
    useState<SortOrder>("name-asc");

  /* ======================================
     FILTER OPTIONS FROM REAL DATA
  ====================================== */

  const countries = useMemo(() => {
    return Array.from(
      new Set(
        exhibitors
          .map((item) => item.country?.trim())
          .filter(
            (value): value is string => Boolean(value)
          )
      )
    ).sort((a, b) => a.localeCompare(b));
  }, [exhibitors]);

  const categories = useMemo(() => {
    return Array.from(
      new Set(
        exhibitors
          .map((item) => item.category?.trim())
          .filter(
            (value): value is string => Boolean(value)
          )
      )
    ).sort((a, b) => a.localeCompare(b));
  }, [exhibitors]);

  /* ======================================
     ACTIVE FILTERS
  ====================================== */

  const hasFilters =
    query.trim().length > 0 ||
    selectedCountry !== "" ||
    selectedCategory !== "";

  const activeFilterCount =
    Number(query.trim().length > 0) +
    Number(selectedCountry !== "") +
    Number(selectedCategory !== "");

  const resetFilters = () => {
    setQuery("");
    setSelectedCountry("");
    setSelectedCategory("");
  };

  /* ======================================
     SEARCH + FILTER + SORT

     All filtering remains client-side.
     Original exhibitor data is untouched.
  ====================================== */

  const filtered = useMemo(() => {
    const searchTerm = query.trim().toLocaleLowerCase();

    const result = exhibitors.filter((exhibitor) => {
      if (
        selectedCountry &&
        exhibitor.country?.trim() !== selectedCountry
      ) {
        return false;
      }

      if (
        selectedCategory &&
        exhibitor.category?.trim() !== selectedCategory
      ) {
        return false;
      }

      if (!searchTerm) {
        return true;
      }

      const searchableText = [
        exhibitor.companyName,
        exhibitor.country,
        exhibitor.category,
        ...(exhibitor.products ?? []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLocaleLowerCase();

      return searchableText.includes(searchTerm);
    });

    return [...result].sort((a, b) => {
      const comparison = (a.companyName ?? "").localeCompare(
        b.companyName ?? "",
        undefined,
        { sensitivity: "base", numeric: true }
      );

      return sortOrder === "name-asc"
        ? comparison
        : -comparison;
    });
  }, [
    exhibitors,
    query,
    selectedCountry,
    selectedCategory,
    sortOrder,
  ]);

  const totalCount = exhibitors.length;
  const hasExhibitors = totalCount > 0;

  return (
    <div className="w-full min-w-0">
      {/* ===================================
          01. PREMIUM SEARCH PANEL
      ==================================== */}

      <motion.section
        aria-label="Search and filter exhibitors"
        initial={
          reducedMotion
            ? false
            : { opacity: 0, y: 18 }
        }
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: reducedMotion ? 0 : 0.6,
          ease: EASE,
        }}
        className="
          relative overflow-hidden rounded-2xl
          border border-[#E9E4EB]
          bg-white
          shadow-[0_8px_28px_rgba(5,7,9,0.035)]
        "
      >
        {/* Solid pink top rule */}
        <div
          aria-hidden="true"
          className="h-[3px] w-full bg-brand-primary"
        />

        {/* Toolbar heading */}
        <div className="flex flex-col gap-3 border-b border-[#EEE9EF] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="min-w-0">
            <div className="flex items-center gap-2.5">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#F9ECF5] text-brand-primary">
                <SearchIcon className="size-[18px]" />
              </span>

              <div>
                <h2 className="font-heading text-[15px] font-extrabold tracking-[-0.025em] text-brand-dark">
                  Explore Exhibitors
                </h2>

                <p className="mt-0.5 text-[11px] leading-[1.6] text-[#77717D]">
                  Search published exhibitor profiles
                </p>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-[#F9ECF5] text-brand-primary">
              <BuildingIcon />
            </span>

            <span className="font-heading text-[12px] font-bold text-[#625B66]">
              <span className="font-extrabold tabular-nums text-brand-primary">
                {totalCount}
              </span>{" "}
              Total Exhibitors
            </span>
          </div>
        </div>

        {/* Search input */}
        <div className="px-4 pb-4 pt-5 sm:px-6">
          <label
            htmlFor="exhibitor-search"
            className="mb-2 block font-heading text-[11px] font-bold text-[#514B55]"
          >
            Search by Company, Product or Keyword
          </label>

          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brand-primary">
              <SearchIcon />
            </span>

            <input
              id="exhibitor-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search company, product, country or category..."
              autoComplete="off"
              className="
                min-h-12 w-full rounded-xl
                border border-[#E5DFE7]
                bg-[#FCFAFC]
                py-3 pl-12 pr-12
                text-[13px] font-medium
                text-brand-dark outline-none
                transition-[border-color,background-color,box-shadow]
                duration-200
                placeholder:text-[#97909A]
                hover:border-brand-primary/25
                focus:border-brand-primary
                focus:bg-white
                focus:ring-2 focus:ring-brand-primary/10
                sm:text-sm
              "
            />

            <AnimatePresence>
              {query.length > 0 && (
                <motion.button
                  type="button"
                  aria-label="Clear exhibitor search"
                  onClick={() => setQuery("")}
                  initial={
                    reducedMotion
                      ? false
                      : { opacity: 0, scale: 0.8 }
                  }
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.8,
                  }}
                  transition={{
                    duration: reducedMotion ? 0 : 0.2,
                  }}
                  className="absolute right-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-[#77717D] transition-colors hover:bg-[#F9ECF5] hover:text-brand-primary focus-visible:outline-2 focus-visible:outline-brand-primary"
                >
                  <CloseIcon />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Filter controls */}
        <div className="border-t border-[#F2EDF2] bg-[#FCFAFC] px-4 py-4 sm:px-6">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-brand-primary">
              <FilterIcon />

              <span className="font-heading text-[10px] font-extrabold uppercase tracking-[0.1em]">
                Refine Your Search
              </span>

              {activeFilterCount > 0 && (
                <span className="flex size-5 items-center justify-center rounded-full bg-brand-primary font-heading text-[10px] font-bold text-white">
                  {activeFilterCount}
                </span>
              )}
            </div>

            {hasFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 font-heading text-[11px] font-bold text-brand-primary transition-colors hover:text-brand-primary-dark"
              >
                <CloseIcon />
                Clear All Filters
              </button>
            )}
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <DirectorySelect
              id="exhibitor-country"
              label="Country"
              value={selectedCountry}
              options={countries}
              allLabel="All Countries"
              onChange={setSelectedCountry}
            />

            <DirectorySelect
              id="exhibitor-category"
              label="Category"
              value={selectedCategory}
              options={categories}
              allLabel="All Categories"
              onChange={setSelectedCategory}
            />

            <div className="min-w-0">
              <label
                htmlFor="exhibitor-sort"
                className="mb-2 block font-heading text-[11px] font-bold text-[#514B55]"
              >
                Sort Exhibitors
              </label>

              <div className="relative">
                <select
                  id="exhibitor-sort"
                  value={sortOrder}
                  onChange={(e) =>
                    setSortOrder(
                      e.target.value as SortOrder
                    )
                  }
                  className="
                    min-h-11 w-full appearance-none
                    rounded-lg border border-[#E7E1E8]
                    bg-white px-3.5 py-2.5 pr-10
                    font-heading text-[12px] font-semibold
                    text-brand-dark outline-none
                    transition-[border-color,box-shadow]
                    duration-200
                    hover:border-brand-primary/30
                    focus:border-brand-primary
                    focus:ring-2 focus:ring-brand-primary/10
                  "
                >
                  <option value="name-asc">
                    Company Name: A to Z
                  </option>
                  <option value="name-desc">
                    Company Name: Z to A
                  </option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-brand-primary">
                  <ChevronIcon />
                </span>
              </div>
            </div>
          </div>

          {/* Active filter chips */}
          <AnimatePresence>
            {hasFilters && (
              <motion.div
                initial={
                  reducedMotion
                    ? false
                    : { opacity: 0, height: 0 }
                }
                animate={{
                  opacity: 1,
                  height: "auto",
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                }}
                transition={{
                  duration: reducedMotion ? 0 : 0.25,
                  ease: EASE,
                }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap items-center gap-2 pt-4">
                  <span className="mr-1 font-heading text-[10px] font-semibold text-[#817B85]">
                    Active:
                  </span>

                  {query.trim() && (
                    <button
                      type="button"
                      onClick={() => setQuery("")}
                      aria-label="Remove search filter"
                      className="inline-flex items-center gap-1.5 rounded-md border border-brand-primary/20 bg-[#F8EAF3] px-2.5 py-1.5 font-heading text-[10px] font-bold text-brand-primary transition-colors hover:bg-[#F4DEED]"
                    >
                      Search: {query.trim()}
                      <CloseIcon />
                    </button>
                  )}

                  {selectedCountry && (
                    <button
                      type="button"
                      onClick={() => setSelectedCountry("")}
                      aria-label="Remove country filter"
                      className="inline-flex items-center gap-1.5 rounded-md border border-brand-primary/20 bg-[#F8EAF3] px-2.5 py-1.5 font-heading text-[10px] font-bold text-brand-primary transition-colors hover:bg-[#F4DEED]"
                    >
                      <GlobeIcon />
                      {selectedCountry}
                      <CloseIcon />
                    </button>
                  )}

                  {selectedCategory && (
                    <button
                      type="button"
                      onClick={() => setSelectedCategory("")}
                      aria-label="Remove category filter"
                      className="inline-flex items-center gap-1.5 rounded-md border border-brand-primary/20 bg-[#F8EAF3] px-2.5 py-1.5 font-heading text-[10px] font-bold text-brand-primary transition-colors hover:bg-[#F4DEED]"
                    >
                      {selectedCategory}
                      <CloseIcon />
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>

      {/* ===================================
          02. RESULTS HEADING
      ==================================== */}

      <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-b border-[#E9E4EB] pb-4">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-[2px] w-6 bg-brand-primary"
          />

          <h2 className="font-heading text-[15px] font-extrabold tracking-[-0.025em] text-brand-dark sm:text-[17px]">
            Exhibitor Directory
          </h2>
        </div>

        <p
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="rounded-md border border-brand-primary/15 bg-[#F9EDF5] px-3 py-1.5 font-heading text-[11px] font-bold text-brand-primary"
        >
          <span className="tabular-nums">
            {filtered.length}
          </span>{" "}
          {filtered.length === 1
            ? "Exhibitor"
            : "Exhibitors"}{" "}
          Found
        </p>
      </div>

      {/* ===================================
          03. ANIMATED RESULTS
      ==================================== */}

      <motion.div
        layout={!reducedMotion}
        className="mt-5 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence initial={false} mode="popLayout">
          {filtered.length > 0 ? (
            filtered.map((exhibitor, index) => (
              <motion.div
                key={String(exhibitor._id)}
                layout={!reducedMotion}
                initial={
                  reducedMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 15,
                        scale: 0.985,
                      }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={
                  reducedMotion
                    ? { opacity: 0 }
                    : {
                        opacity: 0,
                        y: -8,
                        scale: 0.97,
                      }
                }
                transition={{
                  duration: reducedMotion ? 0 : 0.35,
                  ease: EASE,
                  delay: reducedMotion
                    ? 0
                    : Math.min(index, 8) * 0.025,
                  layout: {
                    duration: reducedMotion ? 0 : 0.3,
                  },
                }}
                className="min-w-0"
              >
                {/* Existing ExhibitorCard */}
                <ExhibitorCard
                  exhibitor={exhibitor}
                  index={index}
                />
              </motion.div>
            ))
          ) : (
            <motion.div
              key="directory-empty-state"
              initial={
                reducedMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 18,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: 8,
              }}
              transition={{
                duration: reducedMotion ? 0 : 0.4,
                ease: EASE,
              }}
              className="col-span-full overflow-hidden rounded-2xl border border-[#E9E4EB] bg-white px-5 py-9 text-center sm:py-12"
            >
              <DirectoryIllustration
                reducedMotion={reducedMotion}
              />

              <h3 className="mt-3 font-heading text-[19px] font-extrabold tracking-[-0.03em] text-brand-dark">
                {hasExhibitors
                  ? "No Matching Exhibitors"
                  : "Exhibitor Directory Coming Soon"}
              </h3>

              <p className="mx-auto mt-3 max-w-[470px] text-[12px] leading-[1.85] text-[#6D6671] sm:text-[13px]">
                {hasExhibitors
                  ? "No published exhibitor matches the selected search or filters. Try another company, product, country or category."
                  : "Published exhibitor profiles will appear here when they become available. Please check back for directory updates."}
              </p>

              {hasFilters ? (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-brand-primary px-5 py-2.5 font-heading text-[12px] font-bold text-white transition-colors hover:bg-brand-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
                >
                  Clear All Filters
                </button>
              ) : (
                <p className="mx-auto mt-4 max-w-[350px] text-[11px] leading-[1.7] text-[#928B95]">
                  Directory listings depend on
                  published exhibitor data.
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
