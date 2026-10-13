
"use client";

import { useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

import { ExhibitorCard } from "@/components/ui/ExhibitorCard";
import type { ExhibitorSummary } from "@/lib/data/exhibitors";

interface ExhibitorDirectoryProps {
  exhibitors: ExhibitorSummary[];
}

const EASE = [0.22, 1, 0.36, 1] as const;

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

export function ExhibitorDirectory({
  exhibitors,
}: ExhibitorDirectoryProps) {
  const [query, setQuery] = useState("");
  const reducedMotion = !!useReducedMotion();

  const filtered = useMemo(() => {
    const searchTerm = query.trim().toLowerCase();

    if (!searchTerm) {
      return exhibitors;
    }

    return exhibitors.filter((exhibitor) => {
      const searchableText = [
        exhibitor.companyName,
        exhibitor.country,
        exhibitor.category,
        ...(exhibitor.products ?? []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(searchTerm);
    });
  }, [exhibitors, query]);

  return (
    <div className="w-full">
      {/* Search toolbar */}
      <div className="rounded-2xl border border-black/10 bg-white p-4 shadow-[0_8px_28px_rgba(5,7,9,0.035)] sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="w-full sm:max-w-[600px]">
            <label
              htmlFor="exhibitor-search"
              className="mb-2 block font-heading text-[12px] font-bold text-brand-dark"
            >
              Search Exhibitors
            </label>

            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#626B77]">
                <SearchIcon />
              </span>

              <input
                id="exhibitor-search"
                type="search"
                value={query}
                onChange={(event) =>
                  setQuery(event.target.value)
                }
                placeholder="Search company, product, country or category..."
                autoComplete="off"
                className="min-h-12 w-full rounded-xl border border-black/15 bg-brand-light py-3 pl-12 pr-12 text-[13px] font-medium text-brand-dark outline-none transition-[border-color,background-color,box-shadow] duration-200 placeholder:text-[#656D79] focus:border-brand-primary focus:bg-white focus:ring-2 focus:ring-brand-primary/10 sm:text-sm"
              />

              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear exhibitor search"
                  className="absolute right-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-[#596272] transition-colors hover:bg-black/[0.06] hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
                >
                  <CloseIcon />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 sm:justify-end">
            <p
              role="status"
              aria-live="polite"
              className="text-[12px] font-semibold text-[#414957]"
            >
              <span className="font-extrabold text-brand-primary-dark">
                {filtered.length}
              </span>{" "}
              {filtered.length === 1
                ? "Exhibitor"
                : "Exhibitors"}{" "}
              Found
            </p>

            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="text-[12px] font-bold text-brand-primary-dark underline decoration-brand-primary/30 underline-offset-4 hover:text-brand-primary"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Animated results */}
      <motion.div
        layout={!reducedMotion}
        className="mt-6 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3"
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
                        y: 12,
                      }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={
                  reducedMotion
                    ? { opacity: 0 }
                    : {
                        opacity: 0,
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
                <ExhibitorCard
                  exhibitor={exhibitor}
                  index={index}
                />
              </motion.div>
            ))
          ) : (
            <motion.div
              key="no-exhibitors-found"
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
              exit={{ opacity: 0 }}
              className="col-span-full rounded-2xl border border-dashed border-black/15 bg-white px-5 py-12 text-center"
            >
              <span className="mx-auto flex size-12 items-center justify-center rounded-xl bg-brand-primary/[0.08] text-brand-primary-dark">
                <SearchIcon />
              </span>

              <h3 className="mt-4 font-heading text-[17px] font-extrabold text-brand-dark">
                No Matching Exhibitors
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-[13px] leading-[1.8] text-[#414957]">
                No published exhibitor matches your
                search. Try another company name,
                category or product.
              </p>

              <button
                type="button"
                onClick={() => setQuery("")}
                className="mt-5 inline-flex min-h-10 items-center justify-center rounded-lg bg-brand-primary px-5 py-2.5 font-heading text-[12px] font-bold text-white transition-colors hover:bg-brand-primary-dark"
              >
                Clear Search
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
