
"use client";

import Image from "next/image";
import Link from "next/link";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

import type { ExhibitorSummary } from "@/lib/data/exhibitors";

/* ==========================================
   ANIMATION
========================================== */

const EASE = [0.22, 1, 0.36, 1] as const;

/* ==========================================
   SVG ICONS
========================================== */

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

function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-3.5 shrink-0"
      aria-hidden="true"
    >
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-8"
      aria-hidden="true"
    >
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M9 7h2m3 0h1M9 11h2m3 0h1M9 15h2m3 0h1M10 21v-4h4v4" />
    </svg>
  );
}

function PackageIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-3.5 shrink-0"
      aria-hidden="true"
    >
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="M3 8v9l9 5 9-5V8M12 13v9" />
    </svg>
  );
}

/* ==========================================
   EXHIBITOR CARD
========================================== */

interface ExhibitorCardProps {
  exhibitor: ExhibitorSummary;
  index?: number;
}

export function ExhibitorCard({
  exhibitor,
}: ExhibitorCardProps) {
  const reducedMotion = !!useReducedMotion();

  const visibleProducts =
    exhibitor.products?.slice(0, 3) ?? [];

  const extraProducts = Math.max(
    (exhibitor.products?.length ?? 0) -
      visibleProducts.length,
    0
  );

  return (
    <motion.article
      whileHover={
        reducedMotion
          ? undefined
          : {
              y: -5,
            }
      }
      transition={{
        duration: reducedMotion ? 0 : 0.3,
        ease: EASE,
      }}
      className="h-full min-w-0"
    >
      <Link
        href={`/exhibitors/${exhibitor.slug}`}
        aria-label={`View exhibitor profile of ${exhibitor.companyName}`}
        className="
          group relative flex h-full min-w-0
          flex-col overflow-hidden rounded-xl
          border border-[#E9E4EB]
          bg-white
          shadow-[0_5px_22px_rgba(5,7,9,0.035)]
          transition-[border-color,box-shadow]
          duration-300
          hover:border-brand-primary/40
          hover:shadow-[0_18px_38px_rgba(5,7,9,0.085)]
          focus-visible:outline-2
          focus-visible:outline-offset-2
          focus-visible:outline-brand-primary
        "
      >
        {/* Animated top pink accent */}
        <span
          aria-hidden="true"
          className="
            pointer-events-none absolute
            inset-x-0 top-0 z-10 h-[2px]
            origin-left scale-x-0
            bg-brand-primary
            transition-transform duration-500
            group-hover:scale-x-100
            motion-reduce:transition-none
          "
        />

        {/* ===================================
            TOP BADGES
        ==================================== */}

        <div className="flex min-h-[51px] flex-wrap items-center justify-between gap-2 px-5 pt-4">
          {exhibitor.country ? (
            <span className="inline-flex max-w-full items-center gap-1.5 rounded-md border border-[#EAE5EB] bg-[#FAF9FB] px-2.5 py-1.5 font-heading text-[10px] font-semibold text-[#68616B]">
              <span className="shrink-0 text-brand-primary">
                <PinIcon />
              </span>

              <span className="truncate">
                {exhibitor.country}
              </span>
            </span>
          ) : (
            <span className="font-heading text-[10px] font-bold uppercase tracking-[0.08em] text-[#96909B]">
              Official Exhibitor Profile
            </span>
          )}

          {exhibitor.standNumber && (
            <span className="inline-flex shrink-0 items-center rounded-md border border-brand-primary/15 bg-[#F9ECF5] px-2.5 py-1.5 font-heading text-[10px] font-bold text-brand-primary">
              Stand {exhibitor.standNumber}
            </span>
          )}
        </div>

        {/* ===================================
            LOGO DISPLAY
        ==================================== */}

        <div className="px-5 pt-4">
          <div
            className="
              relative flex h-[132px] w-full
              items-center justify-center
              overflow-hidden rounded-lg
              border border-[#ECE8EE]
              bg-[#FCFBFD] p-5
              transition-[border-color,background-color]
              duration-300
              group-hover:border-brand-primary/25
              group-hover:bg-white
            "
          >
            {exhibitor.logoUrl ? (
              <Image
                src={exhibitor.logoUrl}
                alt={`${exhibitor.companyName} logo`}
                width={240}
                height={110}
                sizes="(max-width: 640px) 230px, (max-width: 1024px) 210px, 240px"
                className="
                  h-auto max-h-[95px]
                  w-auto max-w-full
                  object-contain
                  transition-transform duration-500
                  group-hover:scale-[1.055]
                  motion-reduce:transform-none
                "
              />
            ) : (
              <div className="flex flex-col items-center gap-3 text-center">
                <span className="flex size-12 items-center justify-center rounded-xl border border-brand-primary/15 bg-[#F9ECF5] text-brand-primary">
                  <BuildingIcon />
                </span>

                <span className="line-clamp-2 max-w-[240px] font-heading text-[12px] font-extrabold leading-[1.45] text-brand-dark">
                  {exhibitor.companyName}
                </span>
              </div>
            )}

            {/* Subtle corner details */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="pointer-events-none absolute bottom-2 right-2 size-5 text-brand-primary/20"
            >
              <path
                d="M7 17h10V7"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        </div>

        {/* ===================================
            COMPANY CONTENT
        ==================================== */}

        <div className="flex flex-1 flex-col px-5 pb-5 pt-5">
          {/* Company name */}
          <h3 className="line-clamp-2 min-h-[44px] font-heading text-[16px] font-extrabold leading-[1.4] tracking-[-0.025em] text-brand-dark transition-colors duration-300 group-hover:text-brand-primary sm:text-[17px]">
            {exhibitor.companyName}
          </h3>

          {/* Category */}
          {exhibitor.category && (
            <div className="mt-3 flex items-start gap-2">
              <span className="mt-0.5 shrink-0 text-brand-primary">
                <PackageIcon />
              </span>

              <p className="line-clamp-2 font-heading text-[11px] font-semibold leading-[1.6] text-[#746C78]">
                {exhibitor.category}
              </p>
            </div>
          )}

          {/* Products */}
          {visibleProducts.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {visibleProducts.map(
                (product, index) => (
                  <span
                    key={`${product}-${index}`}
                    className="inline-flex max-w-full items-center rounded-md border border-[#EAE6EC] bg-[#FAF9FB] px-2.5 py-1.5 text-[10px] font-medium leading-[1.45] text-[#67616C]"
                  >
                    <span className="truncate">
                      {product}
                    </span>
                  </span>
                )
              )}

              {extraProducts > 0 && (
                <span className="inline-flex items-center rounded-md border border-brand-primary/15 bg-[#F9EDF5] px-2.5 py-1.5 font-heading text-[10px] font-bold text-brand-primary">
                  +{extraProducts} More
                </span>
              )}
            </div>
          )}

          <div className="mt-auto pt-5" />

          {/* Bottom content rule */}
          <div className="h-px w-full bg-[#EFEAF0]" />

          <div className="flex items-center justify-between gap-3 pt-4">
            <span className="font-heading text-[11px] font-bold text-brand-dark transition-colors group-hover:text-brand-primary">
              View Exhibitor Profile
            </span>

            <span
              className="
                flex size-9 shrink-0
                items-center justify-center
                rounded-lg border
                border-brand-primary/20
                bg-[#F9ECF5]
                text-brand-primary
                transition-[background-color,color,transform]
                duration-300
                group-hover:translate-x-0.5
                group-hover:bg-brand-primary
                group-hover:text-white
                motion-reduce:transform-none
              "
            >
              <ArrowIcon />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
