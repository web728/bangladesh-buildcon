
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

/* ----------------------------------------
   ANIMATION VARIANTS
---------------------------------------- */

const sectionVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.08,
    },
  },
};

const revealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: EASE,
    },
  },
};

const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.1,
    },
  },
};

const cardRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.72,
      ease: EASE,
    },
  },
};

/* ----------------------------------------
   ORIGINAL FIVE BUYER GROUPS
---------------------------------------- */

const VISITOR_PILLARS = [
  {
    num: "01",
    title: "Architects & Engineers",
    subtitle: "Specifiers & Consultants",
    tags: [
      "Architects",
      "Civil Engineers",
      "MEP Consultants",
      "Quantity Surveyors",
    ],
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  {
    num: "02",
    title: "Contractors & Builders",
    subtitle: "Execution Specialists",
    tags: [
      "Civil Contractors",
      "Building & Road",
      "EPC Contractors",
      "Specialists",
    ],
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  },
  {
    num: "03",
    title: "Importers & Distributors",
    subtitle: "Supply Chain & Wholesalers",
    tags: [
      "Importers",
      "Wholesalers",
      "Hardware Merchants",
      "Trade Buyers",
    ],
    icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  {
    num: "04",
    title: "Developers & Owners",
    subtitle: "Capital Project Leaders",
    tags: [
      "Real Estate Developers",
      "Logistics & Warehousing",
      "Hospitality Owners",
    ],
    icon: "M3 21h18M3 7v14m18-14v14M8 3h8v4H8V3zM9 11h2m-2 4h2m4-4h2m-4 4h2",
  },
  {
    num: "05",
    title: "Industrial & Institutional",
    subtitle: "Public & Private Sector",
    tags: [
      "Manufacturing Plants",
      "Utilities & Energy",
      "Government Bodies",
    ],
    icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
  },
];

/* ----------------------------------------
   ICONS
---------------------------------------- */

function ArrowUpRightIcon() {
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
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

function ArrowRightIcon() {
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

/* ----------------------------------------
   PREMIUM VISITOR CARD
---------------------------------------- */

type VisitorPillar = (typeof VISITOR_PILLARS)[number];

function VisitorCard({
  pillar,
  reducedMotion,
}: {
  pillar: VisitorPillar;
  reducedMotion: boolean;
}) {
  return (
    <motion.article
      variants={cardRevealVariants}
      className="min-w-0"
    >
      <motion.div
        initial="rest"
        whileHover={
          reducedMotion ? undefined : "hover"
        }
        variants={{
          rest: {
            y: 0,
            scale: 1,
            boxShadow:
              "0 8px 30px rgba(5,7,9,0.035)",
          },
          hover: {
            y: -9,
            scale: 1.012,
            boxShadow:
              "0 28px 60px rgba(5,7,9,0.11)",
          },
        }}
        transition={{
          duration: 0.42,
          ease: EASE,
        }}
        className="group relative flex h-full min-h-[292px] flex-col overflow-hidden rounded-2xl border border-[#E8E7EB] bg-white p-6 transition-colors duration-300 hover:border-brand-primary/40 sm:p-7"
      >
        {/* Soft magenta hover light */}
        <motion.div
          aria-hidden="true"
          variants={{
            rest: { opacity: 0 },
            hover: { opacity: 1 },
          }}
          transition={{ duration: 0.4 }}
          className="pointer-events-none absolute -right-20 -top-20 size-60 rounded-full bg-brand-primary/[0.09] blur-[70px]"
        />

        {/* Decorative rings */}
        <motion.div
          aria-hidden="true"
          variants={{
            rest: {
              opacity: 0.35,
              scale: 1,
            },
            hover: {
              opacity: 0.8,
              scale: 1.15,
              rotate: 12,
            },
          }}
          transition={{
            duration: 0.65,
            ease: EASE,
          }}
          className="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full border border-brand-primary/10"
        >
          <div className="absolute inset-6 rounded-full border border-brand-primary/10" />
        </motion.div>

        {/* Top: icon and number */}
        <div className="relative z-10 flex items-start justify-between gap-4">
          <motion.div
            variants={{
              rest: {
                rotate: 0,
                scale: 1,
                backgroundColor:
                  "rgba(186,29,130,0.08)",
                color: "#BA1D82",
              },
              hover: {
                rotate: -6,
                scale: 1.1,
                backgroundColor: "#BA1D82",
                color: "#FFFFFF",
              },
            }}
            transition={{
              duration: 0.38,
              ease: EASE,
            }}
            className="flex size-13 shrink-0 items-center justify-center rounded-xl"
          >
            {/* Original SVG path preserved */}
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
              <path d={pillar.icon} />
            </svg>
          </motion.div>

          <span className="font-heading text-[13px] font-bold tracking-[0.15em] text-brand-dark/25">
            {pillar.num}
          </span>
        </div>

        {/* Heading */}
        <div className="relative z-10 mt-6">
          <p className="font-heading text-[10px] font-bold uppercase tracking-[0.14em] text-brand-primary">
            {pillar.subtitle}
          </p>

          <h3 className="mt-2 font-heading text-[19px] font-extrabold leading-[1.32] tracking-[-0.035em] text-brand-dark transition-colors duration-300 group-hover:text-brand-primary">
            {pillar.title}
          </h3>
        </div>

        {/* Individual buyer tags */}
        <div className="relative z-10 mt-6 flex flex-1 flex-wrap content-start gap-2">
          {pillar.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-md border border-[#E9EAF0] bg-[#F7F8FA] px-2.5 py-1.5 text-[11px] font-medium leading-snug text-[#5B6370] transition-colors duration-300 group-hover:border-brand-primary/15 group-hover:bg-brand-primary/[0.045] group-hover:text-brand-dark"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="relative z-10 mt-7 flex items-center justify-between border-t border-brand-dark/10 pt-4">
          <span className="font-heading text-[10px] font-bold uppercase tracking-[0.12em] text-brand-dark/45">
            Target Buyer Segment
          </span>

          <motion.span
            aria-hidden="true"
            variants={{
              rest: {
                opacity: 0.35,
                x: 0,
                y: 0,
              },
              hover: {
                opacity: 1,
                x: 4,
                y: -4,
              },
            }}
            transition={{ duration: 0.3 }}
            className="text-brand-primary"
          >
            <ArrowUpRightIcon />
          </motion.span>
        </div>

        {/* Animated magenta bottom line */}
        <motion.div
          aria-hidden="true"
          variants={{
            rest: { scaleX: 0.12 },
            hover: { scaleX: 1 },
          }}
          transition={{
            duration: 0.55,
            ease: EASE,
          }}
          className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-brand-primary"
        />
      </motion.div>
    </motion.article>
  );
}

/* ----------------------------------------
   MAIN SECTION
---------------------------------------- */

export function WhoWillYouMeetSection() {
  const reducedMotion = !!useReducedMotion();

  return (
    <section
      aria-labelledby="who-will-you-meet-heading"
      className="relative isolate overflow-hidden border-b border-brand-dark/10 bg-[#F9FAFC] py-16 text-brand-dark sm:py-20 lg:py-24"
    >
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_85%_0%,rgba(186,29,130,0.055),transparent_45%)]"
      />

      {/* Subtle architectural blueprint pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(5,7,9,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(5,7,9,0.02)_1px,transparent_1px)] bg-[size:80px_80px]"
      />

      <Container className="relative z-10">
        {/* SECTION HEADER */}
        <motion.div
          variants={sectionVariants}
          initial={
            reducedMotion ? false : "hidden"
          }
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.25,
          }}
          className="flex flex-col gap-7 border-b border-brand-dark/10 pb-9 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-[770px]">
            {/* Eyebrow */}
            <motion.div
              variants={revealVariants}
              className="mb-5 flex items-center gap-3"
            >
              <motion.span
                aria-hidden="true"
                initial={
                  reducedMotion
                    ? false
                    : { scaleX: 0 }
                }
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.75,
                  ease: EASE,
                }}
                className="h-[2px] w-9 origin-left bg-brand-primary"
              />

              <span className="font-heading text-[11px] font-bold uppercase tracking-[0.16em] text-brand-primary">
                Visitor Demographics • 5 Trade Buyer Groups
              </span>
            </motion.div>

            {/* Animated headline */}
            <h2
              id="who-will-you-meet-heading"
              className="font-heading text-[clamp(1.95rem,3.35vw,2.95rem)] leading-[1.16] font-extrabold tracking-[-0.045em] text-brand-dark"
            >
              <motion.span
                variants={revealVariants}
                className="block"
              >
                The Decision-Makers Who
              </motion.span>

              <motion.span
                variants={revealVariants}
                className="block text-brand-primary"
              >
                Buy, Build, Specify &amp; Source
              </motion.span>
            </h2>

            <motion.p
              variants={revealVariants}
              className="mt-5 max-w-[660px] text-[14px] leading-[1.85] text-[#636C79] sm:text-[15px]"
            >
              Connect directly with architects,
              building & construction leads, regional distributors,
              and project developers sourcing building
              solutions.
            </motion.p>
          </div>

          {/* Header buttons */}
          <motion.div
            variants={revealVariants}
            className="flex shrink-0 flex-wrap gap-3"
          >
            <Link
              href="/who-should-visit"
              className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-brand-dark/15 bg-white px-5 py-3 font-heading text-[12px] font-bold text-brand-dark transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-primary/35 hover:text-brand-primary"
            >
              Visitor Guide

              <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRightIcon />
              </span>
            </Link>

            <Link
              href={event.cta.registerVisit}
              className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-brand-primary px-5 py-3 font-heading text-[12px] font-bold text-white shadow-[0_10px_26px_rgba(186,29,130,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-primary-dark sm:px-6"
            >
              Register to Visit

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRightIcon />
              </span>
            </Link>
          </motion.div>
        </motion.div>

        {/* ANIMATED VISITOR CARDS */}
        <motion.div
          variants={gridVariants}
          initial={
            reducedMotion ? false : "hidden"
          }
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.1,
          }}
          className="mt-9 grid auto-rows-fr gap-5 md:grid-cols-2 xl:grid-cols-3 lg:gap-6"
        >
          {VISITOR_PILLARS.map((pillar) => (
            <VisitorCard
              key={pillar.num}
              pillar={pillar}
              reducedMotion={reducedMotion}
            />
          ))}
        </motion.div>

        {/* BOTTOM VISITOR CTA */}
        <motion.div
          initial={
            reducedMotion
              ? false
              : { opacity: 0, y: 26 }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.75,
            ease: EASE,
          }}
          className="relative mt-10 overflow-hidden rounded-2xl bg-brand-dark p-6 text-white sm:p-8 lg:mt-12"
        >
          {/* Ambient brand glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-28 size-80 rounded-full bg-brand-primary/20 blur-[90px]"
          />

          {/* Decorative rings */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 right-14 size-52 rounded-full border border-white/10"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-14 right-24 size-32 rounded-full border border-brand-primary/30"
          />

          <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-[650px]">
              <div className="mb-3 flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="size-2 rounded-full bg-brand-primary"
                />

                <span className="font-heading text-[10px] font-bold uppercase tracking-[0.16em] text-[#F2A8D8]">
                  Trade Visitor Registration
                </span>
              </div>

              <p className="font-heading text-[17px] font-semibold leading-[1.5] tracking-[-0.02em] text-white sm:text-[20px]">
                Explore visitor registration for architects,
                contractors, trade buyers and project
                developers.
              </p>
            </div>

            <motion.div
              whileHover={
                reducedMotion
                  ? undefined
                  : { y: -3, scale: 1.02 }
              }
              whileTap={
                reducedMotion
                  ? undefined
                  : { scale: 0.97 }
              }
              transition={{
                duration: 0.3,
                ease: EASE,
              }}
              className="shrink-0"
            >
              <Link
                href={event.cta.registerVisit}
                className="group inline-flex min-h-11 items-center justify-center gap-3 rounded-lg bg-brand-primary px-6 py-3 font-heading text-[12px] font-bold text-white transition-colors duration-300 hover:bg-brand-primary-dark"
              >
                Register for a Visitor Badge

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRightIcon />
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Bottom accent */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-[3px] bg-brand-primary"
          />
        </motion.div>
      </Container>
    </section>
  );
}
