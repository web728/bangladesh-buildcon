
"use client";

import Link from "next/link";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";
import { StatCard } from "@/components/ui/StatCard";
import {
  marketFacts,
  marketSources,
} from "@/data/marketFacts";

/* ==========================================
   DESIGN + MOTION
========================================== */

const EASE = [0.22, 1, 0.36, 1] as const;

const reveal: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: EASE,
    },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.04,
    },
  },
};

/* ==========================================
   ORIGINAL STRATEGIC PILLARS
========================================== */

const STRATEGIC_PILLARS = [
  {
    tag: "8%+ of GDP",
    title: "Booming Construction Industry",
    body: "Bangladesh's construction sector contributes more than 8% to GDP, sustaining demand for modern materials, machinery, equipment, and technical expertise.",
    icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
  },
  {
    tag: "National Priority",
    title: "Infrastructure Development",
    body: "Government initiatives, private investment, and international collaboration are accelerating infrastructure delivery and opening new opportunities across the supply chain.",
    icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    tag: "170M+ Population",
    title: "Urbanisation and Housing Demand",
    body: "A population exceeding 170 million and continuing urbanisation are increasing demand for housing, urban infrastructure, advanced construction technologies, and durable materials.",
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  },
  {
    tag: "Regional Connectivity",
    title: "Strategic South Asian Location",
    body: "Bangladesh connects South and Southeast Asian markets, giving international manufacturers a practical gateway to buyers, distributors, developers, and project decision-makers.",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
  },
];

/* ==========================================
   ORIGINAL BROCHURE OPPORTUNITIES
========================================== */

const BROCHURE_OPPORTUNITIES = [
  "Residential Development",
  "Commercial Construction",
  "Roads & Infrastructure",
  "Industrial Projects",
  "Hotels & Hospitality",
  "Factories & Warehousing",
  "Water & Utility Projects",
  "Public Infrastructure",
  "Renovation & Interior Projects",
];

/* ==========================================
   SMALL UI ELEMENTS
========================================== */

function ArrowIcon({
  diagonal = false,
}: {
  diagonal?: boolean;
}) {
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
      {diagonal ? (
        <path d="M7 17 17 7M8 7h9v9" />
      ) : (
        <path d="M5 12h14m-6-6 6 6-6 6" />
      )}
    </svg>
  );
}

function Eyebrow({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="h-[2px] w-7 bg-brand-primary" />

      <span className="font-heading text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#971568]">
        {children}
      </span>
    </div>
  );
}

function PillarCard({
  pillar,
  index,
  reducedMotion,
}: {
  pillar: (typeof STRATEGIC_PILLARS)[number];
  index: number;
  reducedMotion: boolean;
}) {
  return (
    <motion.article
      variants={reveal}
      whileHover={
        reducedMotion ? undefined : { y: -5 }
      }
      transition={{
        duration: 0.3,
        ease: EASE,
      }}
      className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-[#DFE3EA] bg-white p-5 shadow-[0_5px_20px_rgba(5,7,9,0.035)] transition-[border-color,box-shadow] duration-300 hover:border-brand-primary/35 hover:shadow-[0_16px_38px_rgba(5,7,9,0.08)] sm:p-6"
    >
      {/* Hover accent */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-brand-primary transition-transform duration-500 group-hover:scale-x-100"
      />

      <div className="flex items-start justify-between gap-4">
        <div className="flex size-11 items-center justify-center rounded-xl bg-brand-primary/[0.075] text-brand-primary transition-colors duration-300 group-hover:bg-brand-primary group-hover:text-white">
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
            <path d={pillar.icon} />
          </svg>
        </div>

        <span className="font-heading text-[11px] font-extrabold tabular-nums text-[#758090]">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="mt-5">
        <span className="inline-flex rounded-md border border-brand-primary/15 bg-brand-primary/[0.055] px-2.5 py-1 font-heading text-[10px] font-bold uppercase tracking-[0.08em] text-[#971568]">
          {pillar.tag}
        </span>

        <h3 className="mt-3 font-heading text-[16px] font-extrabold tracking-[-0.025em] text-[#171B24] sm:text-[17px]">
          {pillar.title}
        </h3>

        <p className="mt-2 text-[13px] leading-[1.9] text-[#424B58]">
          {pillar.body}
        </p>
      </div>

      <div className="mt-auto border-t border-[#E9EBF0] pt-4">
        <span className="font-heading text-[10px] font-semibold uppercase tracking-[0.1em] text-[#971568]">
          Market Growth Driver
        </span>
      </div>
    </motion.article>
  );
}

/* ==========================================
   MAIN COMPONENT
========================================== */

export function WhyBangladeshClientView() {
  const reducedMotion = !!useReducedMotion();

  const scrollReveal = {
    initial: reducedMotion ? false : "hidden",
    whileInView: "visible" as const,
    viewport: {
      once: true,
      amount: 0.1,
    },
  };

  return (
    <div className="relative overflow-hidden bg-[#F7F8FA] py-12 text-[#171B24] selection:bg-brand-primary selection:text-white sm:py-16">
      {/* Restrained architectural pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(5,7,9,0.018)_1px,transparent_1px),linear-gradient(to_bottom,rgba(5,7,9,0.018)_1px,transparent_1px)] bg-[size:68px_68px]"
      />

      <Container className="relative z-10">
        {/* =====================================
            SECTION 01 — MARKET FACTS
        ====================================== */}

        <section
          aria-labelledby="market-facts-heading"
        >
          <motion.div
            {...scrollReveal}
            variants={reveal}
            className="flex flex-col gap-5 border-b border-[#DFE3EA] pb-6 sm:flex-row sm:items-end sm:justify-between"
          >
            <div className="max-w-[750px]">
              <Eyebrow>
                Market & Exhibition Indicators
              </Eyebrow>

              <h2
                id="market-facts-heading"
                className="mt-3 font-heading text-[clamp(1.55rem,2.8vw,2.35rem)] font-extrabold leading-[1.2] tracking-[-0.045em] text-[#171B24]"
              >
                Bangladesh Market{" "}
                <span className="text-[#971568]">
                  at a Glance
                </span>
              </h2>

              <p className="mt-3 max-w-[680px] text-[13px] leading-[1.9] text-[#424B58] sm:text-[14px]">
                Explore construction market and exhibition
                indicators compiled from the event brochure,
                post-show materials and the reference sources
                listed below.
              </p>
            </div>

            <Link
              href={event.cta.bookStand}
              className="group inline-flex min-h-11 w-fit shrink-0 items-center justify-center gap-2 rounded-lg bg-brand-primary px-5 py-3 font-heading text-[12px] font-bold text-white shadow-[0_9px_25px_rgba(186,29,130,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#971568]"
            >
              Book Stand Space

              <span className="transition-transform group-hover:translate-x-1">
                <ArrowIcon />
              </span>
            </Link>
          </motion.div>

          {/* Original dynamic data from marketFacts */}
          <motion.div
            variants={stagger}
            initial={
              reducedMotion ? false : "hidden"
            }
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.08,
            }}
            className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {marketFacts.map((fact) => (
              <motion.div
                key={fact.id}
                variants={reveal}
                className="min-w-0"
              >
                <StatCard fact={fact} />
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* =====================================
            SECTION 02 — STRATEGIC PILLARS
        ====================================== */}

        <section
          aria-labelledby="growth-drivers-heading"
          className="mt-14 sm:mt-16"
        >
          <motion.div
            {...scrollReveal}
            variants={reveal}
            className="flex flex-col gap-4 border-b border-[#DFE3EA] pb-6 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <Eyebrow>
                Construction Industry Outlook
              </Eyebrow>

              <h2
                id="growth-drivers-heading"
                className="mt-3 font-heading text-[clamp(1.45rem,2.6vw,2.15rem)] font-extrabold tracking-[-0.04em] text-[#171B24]"
              >
                Why Dhaka &{" "}
                <span className="text-[#971568]">
                  Bangladesh?
                </span>
              </h2>
            </div>

            <p className="max-w-[410px] text-[13px] leading-[1.85] text-[#424B58]">
              Four key drivers shaping construction
              demand, infrastructure investment and
              commercial opportunities in Bangladesh.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial={
              reducedMotion ? false : "hidden"
            }
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.08,
            }}
            className="mt-6 grid gap-4 md:grid-cols-2"
          >
            {STRATEGIC_PILLARS.map(
              (pillar, index) => (
                <PillarCard
                  key={pillar.title}
                  pillar={pillar}
                  index={index}
                  reducedMotion={reducedMotion}
                />
              )
            )}
          </motion.div>
        </section>

        {/* =====================================
            SECTION 03 — NINE OPPORTUNITIES
        ====================================== */}

        <section
          aria-labelledby="opportunities-heading"
          className="mt-14 sm:mt-16"
        >
          <motion.div
            {...scrollReveal}
            variants={reveal}
            className="overflow-hidden rounded-2xl border border-[#DFE3EA] bg-white shadow-[0_10px_38px_rgba(5,7,9,0.035)]"
          >
            <div className="flex flex-col gap-4 border-b border-[#E7E9EF] px-5 py-6 sm:flex-row sm:items-end sm:justify-between sm:px-7">
              <div>
                <Eyebrow>
                  Commercial Opportunities
                </Eyebrow>

                <h2
                  id="opportunities-heading"
                  className="mt-3 font-heading text-[20px] font-extrabold tracking-[-0.035em] text-[#171B24] sm:text-[24px]"
                >
                  Opportunities Across{" "}
                  <span className="text-[#971568]">
                    Key Sectors
                  </span>
                </h2>
              </div>

              <span className="inline-flex w-fit rounded-md border border-brand-primary/15 bg-brand-primary/[0.06] px-3 py-1.5 text-[11px] font-bold text-[#971568]">
                9 Opportunity Categories
              </span>
            </div>

            {/* Nine original opportunity categories */}
            <motion.div
              variants={stagger}
              initial={
                reducedMotion ? false : "hidden"
              }
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.12,
              }}
              className="grid gap-3 p-5 sm:grid-cols-2 sm:p-7 lg:grid-cols-3"
            >
              {BROCHURE_OPPORTUNITIES.map(
                (category, index) => (
                  <motion.div
                    key={category}
                    variants={reveal}
                    whileHover={
                      reducedMotion
                        ? undefined
                        : { x: 3 }
                    }
                    transition={{
                      duration: 0.25,
                      ease: EASE,
                    }}
                    className="group flex min-h-[60px] items-center gap-3 rounded-xl border border-[#E2E5EB] bg-[#FAFAFC] p-3.5 transition-[border-color,background-color] duration-300 hover:border-brand-primary/35 hover:bg-[#FBF4F9]"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-primary/[0.08] font-heading text-[10px] font-extrabold tabular-nums text-[#971568]">
                      {String(index + 1).padStart(
                        2,
                        "0"
                      )}
                    </span>

                    <span className="font-heading text-[12px] font-bold leading-[1.55] text-[#29313E] sm:text-[13px]">
                      {category}
                    </span>
                  </motion.div>
                )
              )}
            </motion.div>

            {/* Source references */}
            <div className="border-t border-[#E7E9EF] bg-[#FAFAFC] px-5 py-5 sm:px-7">
              <h3 className="font-heading text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#29313E]">
                Market Reference Sources
              </h3>

              <p className="mt-1 text-[12px] leading-[1.75] text-[#505A68]">
                Reference publications and source
                materials used for the market
                indicators above.
              </p>

              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3">
                {marketSources.map((source) => (
                  <div
                    key={source.name}
                    className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#3E4856]"
                  >
                    <span className="size-1.5 shrink-0 rounded-full bg-brand-primary" />

                    {source.url ? (
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-brand-primary/25 underline-offset-4 transition-colors hover:text-[#971568]"
                      >
                        {source.name}
                      </a>
                    ) : (
                      <span>{source.name}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* =====================================
            SECTION 04 — CONVERSION CTA
        ====================================== */}

        <motion.section
          {...scrollReveal}
          variants={reveal}
          aria-labelledby="market-cta-heading"
          className="relative mt-12 overflow-hidden rounded-2xl border border-[#2B2530] bg-[#151019] p-6 shadow-[0_20px_50px_rgba(5,7,9,0.13)] sm:mt-16 sm:p-8 lg:p-9"
        >
          {/* Subtle dark grid */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:54px_54px]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-24 size-[320px] rounded-full bg-brand-primary/15 blur-[95px]"
          />

          <div className="relative z-10 flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-[670px]">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-semibold text-[#E9D9E4]">
                <span>{event.dates.display}</span>

                <span className="text-[#DA67AF]">
                  •
                </span>

                <span>
                  {event.venue.name},{" "}
                  {event.venue.city}
                </span>
              </div>

              <h2
                id="market-cta-heading"
                className="mt-4 font-heading text-[clamp(1.4rem,2.5vw,2rem)] font-extrabold leading-[1.3] tracking-[-0.04em] text-[#F0EAF0]"
              >
                Connect Your Brand with{" "}
                <span className="text-[#E68ABD]">
                  Bangladesh&apos;s Construction Market
                </span>
              </h2>

              <p className="mt-3 max-w-[610px] text-[13px] leading-[1.9] text-[#DDD2DC]">
                Meet contractors, importers,
                distributors, architects, engineers
                and industry buyers at Bangladesh
                Buildcon International Expo 2026.
              </p>
            </div>

            <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row lg:flex-col xl:flex-row">
              <Link
                href={event.cta.bookStand}
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-brand-primary px-6 py-3 font-heading text-[12px] font-bold text-white shadow-[0_10px_25px_rgba(186,29,130,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#A51974]"
              >
                Book Your Stand

                <span className="transition-transform group-hover:translate-x-1">
                  <ArrowIcon />
                </span>
              </Link>

              <Link
                href={event.cta.registerVisit}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/[0.08] px-6 py-3 font-heading text-[12px] font-bold text-white transition-colors duration-300 hover:bg-white/[0.15]"
              >
                Register to Visit
                <ArrowIcon diagonal />
              </Link>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-transparent via-brand-primary to-transparent"
          />
        </motion.section>
      </Container>
    </div>
  );
}
