
"use client";

import Link from "next/link";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { Container } from "@/components/ui/Container";
import { event } from "@/config/event";

const EASE = [0.22, 1, 0.36, 1] as const;

const reveal: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

function Icon({
  name,
}: {
  name: "arrow" | "external" | "calendar" | "location";
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4 shrink-0"
      aria-hidden="true"
    >
      {name === "arrow" && (
        <path d="M5 12h14m-6-6 6 6-6 6" />
      )}

      {name === "external" && (
        <path d="M7 17 17 7M8 7h9v9" />
      )}

      {name === "calendar" && (
        <>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M7 3v4M17 3v4M3 10h18" />
        </>
      )}

      {name === "location" && (
        <>
          <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="2.5" />
        </>
      )}
    </svg>
  );
}

/* Architectural SVG — subtle, large and refined */

function CtaGraphic({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <svg
        viewBox="0 0 1100 420"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 size-full"
      >
        <defs>
          <linearGradient
            id="final-cta-lines"
            x1="450"
            y1="0"
            x2="1100"
            y2="420"
            gradientUnits="userSpaceOnUse"
          >
            <stop
              offset="0"
              stopColor="#ED1C24"
              stopOpacity="0"
            />
            <stop
              offset="0.6"
              stopColor="#ED1C24"
              stopOpacity="0.32"
            />
            <stop
              offset="1"
              stopColor="#ED1C24"
              stopOpacity="0.06"
            />
          </linearGradient>

          <pattern
            id="final-cta-grid"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M48 0H0V48"
              stroke="#FFFFFF"
              strokeOpacity="0.035"
            />
          </pattern>
        </defs>

        <rect
          width="1100"
          height="420"
          fill="url(#final-cta-grid)"
        />

        {/* Construction-inspired elevation lines */}
        <motion.path
          d="M670 420V150l95-65 95 65v270"
          stroke="url(#final-cta-lines)"
          strokeWidth="1.5"
          initial={
            reducedMotion
              ? false
              : { pathLength: 0, opacity: 0 }
          }
          whileInView={{
            pathLength: 1,
            opacity: 1,
          }}
          viewport={{ once: true }}
          transition={{
            duration: reducedMotion ? 0 : 1.6,
            ease: EASE,
          }}
        />

        <path
          d="M710 420V172l55-37 55 37v248M670 240h190M670 315h190"
          stroke="#FFFFFF"
          strokeOpacity="0.08"
        />

        <path
          d="M765 85v335M670 150l190 270M860 150 670 420"
          stroke="#ED1C24"
          strokeOpacity="0.13"
          strokeDasharray="5 9"
        />

        {/* Structural orbit */}
        <circle
          cx="830"
          cy="205"
          r="185"
          stroke="#ED1C24"
          strokeOpacity="0.16"
        />

        <circle
          cx="830"
          cy="205"
          r="145"
          stroke="#FFFFFF"
          strokeOpacity="0.09"
          strokeDasharray="6 10"
        />

        <path
          d="M915 0v420M970 0v420"
          stroke="#FFFFFF"
          strokeOpacity="0.05"
        />

        <path
          d="M575 380 950 20M650 420 1020 55"
          stroke="#ED1C24"
          strokeOpacity="0.16"
        />
      </svg>

      {/* Readability gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/75 to-transparent" />
    </div>
  );
}

export function FinalCtaSection() {
  const reducedMotion = !!useReducedMotion();

  return (
    <section
      aria-labelledby="home-final-cta-heading"
      className="bg-brand-light py-10 sm:py-12 lg:py-14"
    >
      <Container>
        <motion.div
          initial={
            reducedMotion
              ? false
              : { opacity: 0, y: 22 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            duration: reducedMotion ? 0 : 0.7,
            ease: EASE,
          }}
          className="relative isolate overflow-hidden rounded-2xl border border-white/10 bg-brand-dark text-white shadow-[0_18px_48px_rgba(5,7,9,0.13)]"
        >
          <CtaGraphic reducedMotion={reducedMotion} />

          <div className="relative z-10 grid items-center gap-7 px-5 py-8 sm:px-8 sm:py-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-10 lg:px-10 lg:py-11">
            {/* LEFT */}
            <motion.div
              variants={stagger}
              initial={
                reducedMotion ? false : "hidden"
              }
              whileInView="visible"
              viewport={{ once: true }}
              className="max-w-[670px]"
            >
              <motion.div
                variants={reveal}
                className="flex items-center gap-2.5"
              >
                <span className="h-[2px] w-7 bg-brand-primary" />

                <span className="font-heading text-[10px] font-bold uppercase tracking-[0.15em] text-red-300">
                  Bangladesh Buildcon 2026
                </span>
              </motion.div>

              <motion.h2
                id="home-final-cta-heading"
                variants={reveal}
                className="mt-4 font-heading text-[clamp(1.55rem,2.7vw,2.25rem)] font-extrabold leading-[1.2] tracking-[-0.04em] text-white"
              >
                Be Part of the{" "}
                <span className="text-red-300">
                  Building &amp; Construction
                </span>{" "}
                Exhibition
              </motion.h2>

              <motion.p
                variants={reveal}
                className="mt-3 max-w-[580px] text-[12px] leading-[1.85] text-white/65 sm:text-[13px]"
              >
                Connect with construction industry
                professionals, explore innovative
                products and discover business
                opportunities at {event.name}.
              </motion.p>

              {/* Event information */}
              <motion.div
                variants={reveal}
                className="mt-5 flex flex-wrap gap-x-5 gap-y-2.5"
              >
                <span className="inline-flex items-center gap-2 text-[11px] font-medium text-white/85 sm:text-[12px]">
                  <span className="text-red-300">
                    <Icon name="calendar" />
                  </span>
                  {event.dates.display}
                </span>

                <span className="inline-flex items-center gap-2 text-[11px] font-medium text-white/85 sm:text-[12px]">
                  <span className="text-red-300">
                    <Icon name="location" />
                  </span>
                  {event.venue.name},{" "}
                  {event.venue.city}
                </span>
              </motion.div>
            </motion.div>

            {/* RIGHT — PRIMARY ACTIONS */}
            <motion.div
              initial={
                reducedMotion
                  ? false
                  : { opacity: 0, x: 16 }
              }
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: reducedMotion ? 0 : 0.6,
                delay: reducedMotion ? 0 : 0.15,
                ease: EASE,
              }}
              className="flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row lg:min-w-[205px] lg:flex-col"
            >
              <Link
                href={event.cta.bookStand}
                className="group inline-flex min-h-11 items-center justify-center gap-3 rounded-lg bg-brand-primary px-5 py-3 font-heading text-[12px] font-bold text-white shadow-[0_8px_22px_rgba(237,28,36,0.15)] transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-brand-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transform-none"
              >
                Book a Stand

                <span className="transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  <Icon name="arrow" />
                </span>
              </Link>

              <Link
                href={event.cta.registerVisit}
                className="group inline-flex min-h-11 items-center justify-center gap-3 rounded-lg border border-white/25 bg-white/[0.08] px-5 py-3 font-heading text-[12px] font-bold text-white transition-colors duration-300 hover:border-white/50 hover:bg-white/[0.14] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Register to Visit

                <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none">
                  <Icon name="external" />
                </span>
              </Link>
            </motion.div>
          </div>

          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-[3px] bg-brand-primary"
          />
        </motion.div>
      </Container>
    </section>
  );
}
