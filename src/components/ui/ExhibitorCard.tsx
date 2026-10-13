
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
} from "framer-motion";

import type { ExhibitorSummary } from "@/lib/data/exhibitors";

interface ExhibitorCardProps {
  exhibitor: ExhibitorSummary;
  index?: number;
}

const EASE = [0.22, 1, 0.36, 1] as const;

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

function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-3.5"
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
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-6"
      aria-hidden="true"
    >
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M9 7h2m3 0h1M9 11h2m3 0h1M9 15h2m3 0h1M10 21v-4h4v4" />
    </svg>
  );
}

export function ExhibitorCard({
  exhibitor,
}: ExhibitorCardProps) {
  const reducedMotion = !!useReducedMotion();

  return (
    <motion.div
      whileHover={
        reducedMotion
          ? undefined
          : {
              y: -4,
            }
      }
      transition={{
        duration: 0.25,
        ease: EASE,
      }}
      className="h-full"
    >
      <Link
        href={`/exhibitors/${exhibitor.slug}`}
        aria-label={`View exhibitor profile of ${exhibitor.companyName}`}
        className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_5px_22px_rgba(5,7,9,0.035)] transition-[border-color,box-shadow] duration-300 hover:border-brand-primary/35 hover:shadow-[0_16px_38px_rgba(5,7,9,0.085)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
      >
        {/* Hover line */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 z-10 h-[3px] origin-left scale-x-0 bg-brand-primary transition-transform duration-300 group-hover:scale-x-100"
        />

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          {/* Country and booth */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            {exhibitor.country ? (
              <span className="inline-flex items-center gap-1.5 rounded-md border border-black/10 bg-brand-light px-2.5 py-1.5 font-heading text-[11px] font-semibold text-[#414957]">
                <span className="text-brand-primary-dark">
                  <PinIcon />
                </span>

                {exhibitor.country}
              </span>
            ) : (
              <span className="font-heading text-[10px] font-bold uppercase tracking-[0.1em] text-[#59626F]">
                Exhibitor Profile
              </span>
            )}

            {exhibitor.standNumber && (
              <span className="rounded-md border border-brand-primary/15 bg-brand-primary/[0.07] px-2.5 py-1.5 font-heading text-[10px] font-bold text-brand-primary-dark">
                Stand {exhibitor.standNumber}
              </span>
            )}
          </div>

          {/* Logo */}
          <div className="mt-5 flex h-[110px] w-full items-center justify-center overflow-hidden rounded-xl border border-black/[0.07] bg-brand-light p-4 transition-colors group-hover:border-brand-primary/20 group-hover:bg-white">
            {exhibitor.logoUrl ? (
              <Image
                src={exhibitor.logoUrl}
                alt={`${exhibitor.companyName} logo`}
                width={220}
                height={85}
                sizes="(max-width: 640px) 220px, 180px"
                className="max-h-[76px] w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.035]"
              />
            ) : (
              <span className="flex flex-col items-center gap-2 text-center">
                <span className="text-brand-primary-dark">
                  <BuildingIcon />
                </span>

                <span className="line-clamp-2 font-heading text-[12px] font-extrabold leading-[1.4] text-brand-dark">
                  {exhibitor.companyName}
                </span>
              </span>
            )}
          </div>

          {/* Company name */}
          <h3 className="mt-5 font-heading text-[16px] font-extrabold leading-[1.45] tracking-[-0.025em] text-brand-dark transition-colors group-hover:text-brand-primary-dark sm:text-[17px]">
            {exhibitor.companyName}
          </h3>

          {/* Published category */}
          {exhibitor.category && (
            <p className="mt-2 text-[11px] font-bold uppercase leading-[1.6] tracking-[0.045em] text-brand-primary-dark">
              {exhibitor.category}
            </p>
          )}

          {/* Published products */}
          {exhibitor.products &&
            exhibitor.products.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {exhibitor.products
                  .slice(0, 3)
                  .map((product, index) => (
                    <li
                      key={`${product}-${index}`}
                      className="rounded-md border border-black/10 bg-brand-light px-2.5 py-1.5 text-[10px] font-medium leading-[1.4] text-[#414957]"
                    >
                      {product}
                    </li>
                  ))}
              </ul>
            )}

          <div className="mt-auto pt-6" />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 border-t border-black/[0.08] bg-[#FCFCFD] px-5 py-4 sm:px-6">
          <span className="font-heading text-[11px] font-bold text-[#414957] transition-colors group-hover:text-brand-primary-dark">
            View Exhibitor Profile
          </span>

          <span className="text-brand-primary-dark transition-transform duration-300 group-hover:translate-x-1">
            <ArrowIcon />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
