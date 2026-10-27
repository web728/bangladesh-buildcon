
"use client";

import { useEffect } from "react";
import Link from "next/link";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

import { Container } from "@/components/ui/Container";
import { event } from "@/config/event";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ==========================================
   ICONS
========================================== */

function AlertIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-6"
      aria-hidden="true"
    >
      <path d="M10.3 3.86 2.82 17a2 2 0 0 0 1.74 3h14.88a2 2 0 0 0 1.74-3L13.7 3.86a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}

function RefreshIcon() {
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
      <path d="M20 11a8 8 0 0 0-14.5-4.5L3 9" />
      <path d="M3 4v5h5" />
      <path d="M4 13a8 8 0 0 0 14.5 4.5L21 15" />
      <path d="M16 15h5v5" />
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

function PhoneIcon() {
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
      <path d="M3 5a2 2 0 0 1 2-2h3.28a1 1 0 0 1 .948.684l1.498 4.493a1 1 0 0 1-.502 1.21l-2.257 1.13a11.042 11.042 0 0 0 5.516 5.516l1.13-2.257a1 1 0 0 1 1.21-.502l4.493 1.498a1 1 0 0 1 .684.949V19a2 2 0 0 1-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function MailIcon() {
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
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
      />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

/* ==========================================
   MAIN ERROR PAGE
========================================== */

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const reducedMotion = !!useReducedMotion();
  const contact = event.contact.namit;

  useEffect(() => {
    console.error("Route Level Error:", error);
  }, [error]);

  return (
    <main
      id="main-content"
      className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[#111017] px-4 py-14 text-white selection:bg-brand-primary selection:text-white sm:py-20"
    >
      {/* Minimal SVG decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <svg
          viewBox="0 0 700 420"
          fill="none"
          className="absolute -right-24 -top-20 h-[380px] w-[620px] opacity-[0.14]"
        >
          <motion.path
            d="M0 330C145 210 270 380 445 175S615 50 735 -30"
            stroke="#BA1D82"
            strokeWidth="1.7"
            strokeLinecap="round"
            initial={
              reducedMotion
                ? false
                : { pathLength: 0 }
            }
            animate={{ pathLength: 1 }}
            transition={{
              duration: reducedMotion ? 0 : 1.6,
              ease: EASE,
            }}
          />

          <motion.path
            d="M20 380C170 260 300 420 480 220S650 90 770 10"
            stroke="#304090"
            strokeWidth="1.1"
            strokeLinecap="round"
            initial={
              reducedMotion
                ? false
                : { pathLength: 0 }
            }
            animate={{ pathLength: 1 }}
            transition={{
              duration: reducedMotion ? 0 : 1.9,
              delay: reducedMotion ? 0 : 0.12,
              ease: EASE,
            }}
          />
        </svg>
      </div>

      <Container className="relative z-10 w-full">
        <motion.section
          initial={
            reducedMotion
              ? false
              : {
                  opacity: 0,
                  y: 22,
                  scale: 0.985,
                }
          }
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: reducedMotion ? 0 : 0.6,
            ease: EASE,
          }}
          aria-labelledby="error-heading"
          className="relative mx-auto max-w-[610px] overflow-hidden rounded-2xl border border-white/10 bg-[#1B1821] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.22)] sm:p-8"
        >
          {/* Accent */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-[3px] bg-brand-primary"
          />

          {/* Icon */}
          <div className="flex size-12 items-center justify-center rounded-xl border border-brand-primary/25 bg-brand-primary/10 text-[#EFA8D6]">
            <AlertIcon />
          </div>

          {/* Status */}
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-brand-primary/25 bg-brand-primary/10 px-3 py-1.5">
            <span className="size-1.5 rounded-full bg-[#EFA8D6]" />

            <span className="font-heading text-[10px] font-bold uppercase leading-[1.5] tracking-[0.1em] text-[#EFA8D6]">
              Something Went Wrong
            </span>
          </div>

          {/* Heading */}
          <h1
            id="error-heading"
            className="mt-4 font-heading text-[clamp(1.6rem,3vw,2.25rem)] font-extrabold leading-[1.2] tracking-[-0.04em] text-white"
          >
            We Hit a{" "}
            <span className="text-[#EFA8D6]">
              Temporary Issue.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-3 max-w-[500px] text-[13px] leading-[1.8] tracking-normal text-white/60 sm:text-[14px]">
            Something prevented this page from
            loading correctly. Please try again.
            If the issue continues, you can return
            to the homepage.
          </p>

          {/* Error reference */}
          {error.digest && (
            <div className="mt-4">
              <span className="inline-flex max-w-full items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[10px] leading-[1.5] text-white/45">
                <span className="shrink-0 text-[#EFA8D6]">
                  Ref:
                </span>

                <span className="min-w-0 break-all">
                  {error.digest}
                </span>
              </span>
            </div>
          )}

          {/* Actions */}
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => reset()}
              className="group inline-flex min-h-11 cursor-pointer items-center justify-center gap-2.5 rounded-lg bg-brand-primary px-5 py-3 font-heading text-[12px] font-bold leading-[1.4] text-white transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-brand-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary motion-reduce:transform-none"
            >
              <span className="transition-transform duration-300 group-hover:rotate-45 motion-reduce:transform-none">
                <RefreshIcon />
              </span>

              Try Again
            </button>

            <Link
              href="/"
              className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/[0.05] px-5 py-3 font-heading text-[12px] font-semibold leading-[1.4] text-white/90 transition-colors duration-200 hover:border-white/40 hover:bg-white/[0.1] hover:text-white"
            >
              Return Home

              <span className="transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transform-none">
                <ArrowIcon />
              </span>
            </Link>
          </div>

          {/* Direct support */}
          <div className="mt-7 border-t border-white/10 pt-5">
            <div className="flex items-center gap-2.5">
              <span className="h-[2px] w-5 bg-brand-primary" />

              <p className="font-heading text-[10px] font-bold uppercase leading-[1.5] tracking-[0.1em] text-[#EFA8D6]">
                Direct Event Support
              </p>
            </div>

            <h2 className="mt-3 font-heading text-[15px] font-bold leading-[1.4] tracking-[-0.02em] text-white">
              {contact.name}
            </h2>

            <p className="mt-1 text-[11px] leading-[1.6] text-white/45">
              {event.shortName} · Event Enquiries
            </p>

            <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6">
              <a
                href={`tel:${contact.phoneHref}`}
                aria-label={`Call ${contact.name}`}
                className="inline-flex w-fit max-w-full items-center gap-2 text-[12px] font-medium leading-[1.6] text-white/75 transition-colors hover:text-[#EFA8D6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
              >
                <span className="text-[#EFA8D6]">
                  <PhoneIcon />
                </span>

                <span className="tabular-nums">
                  {contact.phone}
                </span>
              </a>

              <a
                href={`mailto:${contact.email}`}
                aria-label={`Email ${contact.name}`}
                className="inline-flex w-fit max-w-full items-center gap-2 text-[12px] font-medium leading-[1.6] text-white/75 transition-colors hover:text-[#EFA8D6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
              >
                <span className="text-[#EFA8D6]">
                  <MailIcon />
                </span>

                <span className="min-w-0 break-all">
                  {contact.email}
                </span>
              </a>
            </div>
          </div>
        </motion.section>
      </Container>
    </main>
  );
}
