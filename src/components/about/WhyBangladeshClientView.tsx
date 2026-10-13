
"use client";

import Link from "next/link";
import type { ReactNode } from "react";

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

import { exhibitionSectors } from "@/data/exhibitionProfile";

/* ==========================================
   ANIMATION
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
      duration: 0.58,
      ease: EASE,
    },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.075,
      delayChildren: 0.04,
    },
  },
};

/* ==========================================
   MARKET THEMES

   Qualitative industry context.
   No unsupported GDP/population statistics.
========================================== */

const MARKET_DRIVERS = [
  {
    title: "Building & Construction Activity",
    label: "Industry Development",
    description:
      "Construction activity creates opportunities to explore building materials, equipment, technical components and solutions used across different project types.",
    icon: "building",
  },
  {
    title: "Infrastructure Requirements",
    label: "Infrastructure",
    description:
      "Infrastructure projects involve machinery, engineered materials, electrical systems, safety equipment and specialised construction products.",
    icon: "infrastructure",
  },
  {
    title: "Urban Development & Housing",
    label: "Urban Construction",
    description:
      "Residential and commercial development involve structural products, interior and exterior systems, utility equipment and building technologies.",
    icon: "city",
  },
  {
    title: "Industry & Distribution Networks",
    label: "Business Connections",
    description:
      "Manufacturers, importers, distributors, consultants and contractors are relevant audiences for construction product sourcing and market development.",
    icon: "network",
  },
] as const;

/* ==========================================
   POTENTIAL PRODUCT APPLICATIONS

   Indicative end-use sectors, not claims
   of confirmed projects or investment.
========================================== */

const APPLICATION_AREAS = [
  "Residential Development",
  "Commercial Construction",
  "Roads & Infrastructure",
  "Industrial Facilities",
  "Hotels & Hospitality",
  "Factories & Warehousing",
  "Water & Utility Systems",
  "Public Buildings",
  "Renovation & Interiors",
] as const;

/* ==========================================
   OFFICIAL BROCHURE EVENT FEATURES
========================================== */

const EXHIBITION_FEATURES = [
  "International exhibitors and country pavilions",
  "Live demonstrations and product launches",
  "B2B matchmaking opportunities",
  "Industry conferences and technical seminars",
] as const;

/* ==========================================
   CUSTOM SVG ICONS
========================================== */

type IconName =
  | "building"
  | "infrastructure"
  | "city"
  | "network"
  | "arrow"
  | "external"
  | "calendar"
  | "location"
  | "check"
  | "chart";

function Icon({
  name,
  className = "size-5",
}: {
  name: IconName;
  className?: string;
}) {
  const paths: Record<IconName, ReactNode> = {
    building: (
      <>
        <path d="M3 21h18M5 21V5h10v16M15 10h5v11" />
        <path d="M8 9h4M8 13h4M8 17h4" />
      </>
    ),
    infrastructure: (
      <>
        <path d="M3 21h18M4 16h16M6 16l3-8h6l3 8" />
        <path d="M12 8V3M8 3h8" />
        <path d="M9 12h6" />
      </>
    ),
    city: (
      <>
        <path d="M3 21h18M5 21V9l5-5 5 5v12" />
        <path d="M15 12h5v9M9 21v-7h3v7" />
      </>
    ),
    network: (
      <>
        <circle cx="12" cy="5" r="2" />
        <circle cx="5" cy="18" r="2" />
        <circle cx="19" cy="18" r="2" />
        <path d="m11 7-5 9m7-9 5 9M7 18h10" />
      </>
    ),
    arrow: (
      <path d="M5 12h14m-6-6 6 6-6 6" />
    ),
    external: (
      <path d="M7 17 17 7M8 7h9v9" />
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M7 3v4M17 3v4M3 10h18" />
      </>
    ),
    location: (
      <>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    check: (
      <path d="m5 12 4 4L19 6" />
    ),
    chart: (
      <>
        <path d="M3 21h18M5 17v4M10 12v9M15 8v13M20 3v18" />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

function Eyebrow({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="h-[2px] w-7 shrink-0 bg-brand-primary" />

      <span className="font-heading text-[10px] font-extrabold uppercase tracking-[0.16em] text-brand-primary-dark">
        {children}
      </span>
    </div>
  );
}

/* ==========================================
   MAIN COMPONENT
========================================== */

export function WhyBangladeshClientView() {
  const reducedMotion = !!useReducedMotion();

  const scrollProps = {
    initial: reducedMotion ? false : "hidden",
    whileInView: "visible" as const,
    viewport: {
      once: true,
      amount: 0.08,
    },
  };

  return (
    <div className="relative overflow-hidden bg-brand-light py-12 text-brand-dark sm:py-16">
      {/* Subtle architectural grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(5,7,9,0.018)_1px,transparent_1px),linear-gradient(to_bottom,rgba(5,7,9,0.018)_1px,transparent_1px)] bg-[size:64px_64px]"
      />

      <Container className="relative z-10">
        {/* =====================================
            01 — MARKET FACTS
        ====================================== */}

        <section aria-labelledby="market-facts-heading">
          <motion.header
            {...scrollProps}
            variants={reveal}
            className="flex flex-col gap-5 border-b border-brand-border pb-6 sm:flex-row sm:items-end sm:justify-between"
          >
            <div className="max-w-[780px]">
              <Eyebrow>
                Bangladesh · Market Indicators
              </Eyebrow>

              <h2
                id="market-facts-heading"
                className="mt-3 font-heading text-[clamp(1.55rem,2.8vw,2.25rem)] font-extrabold leading-[1.2] tracking-[-0.04em] text-brand-dark"
              >
                Bangladesh Market{" "}
                <span className="text-brand-primary-dark">
                  at a Glance
                </span>
              </h2>

              <p className="mt-3 max-w-[730px] text-[13px] leading-[1.85] text-brand-body sm:text-sm">
                Explore the market indicators and
                exhibition-related facts maintained
                in the website&apos;s market
                information dataset. Individual
                figures should be interpreted
                according to their stated source
                and reporting year.
              </p>
            </div>

            <Link
              href={event.cta.bookStand}
              className="group inline-flex min-h-11 w-fit shrink-0 items-center justify-center gap-2 rounded-lg bg-brand-primary px-5 py-3 font-heading text-[12px] font-bold text-white transition-colors hover:bg-brand-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
            >
              Enquire for Stand Space

              <span className="transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                <Icon name="arrow" className="size-4" />
              </span>
            </Link>
          </motion.header>

          {marketFacts.length > 0 ? (
            <motion.div
              variants={stagger}
              initial={reducedMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.06,
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
          ) : (
            <div className="mt-6 rounded-2xl border border-brand-border bg-white p-6 text-[13px] leading-[1.8] text-brand-body">
              Market statistics will be displayed
              when source-backed information is
              available.
            </div>
          )}

          <p className="mt-4 text-[11px] leading-[1.8] text-brand-muted">
            Market indicators and historic
            exhibition figures may refer to
            different reporting periods.
            They should not be interpreted
            as confirmed 2026 exhibitor
            numbers or visitor attendance.
          </p>
        </section>

        {/* =====================================
            02 — CONSTRUCTION MARKET DRIVERS
        ====================================== */}

        <section
          aria-labelledby="market-drivers-heading"
          className="mt-12 sm:mt-16"
        >
          <motion.div
            {...scrollProps}
            variants={reveal}
            className="flex flex-col gap-4 border-b border-brand-border pb-6 sm:flex-row sm:items-end sm:justify-between"
          >
            <div className="max-w-[740px]">
              <Eyebrow>
                Construction Market Perspective
              </Eyebrow>

              <h2
                id="market-drivers-heading"
                className="mt-3 font-heading text-[clamp(1.5rem,2.7vw,2.1rem)] font-extrabold leading-[1.2] tracking-[-0.04em] text-brand-dark"
              >
                Areas Shaping{" "}
                <span className="text-brand-primary-dark">
                  Industry Demand
                </span>
              </h2>
            </div>

            <p className="max-w-[410px] text-[13px] leading-[1.85] text-brand-body">
              Key construction-related themes
              relevant to materials, equipment
              and technology suppliers.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial={reducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.06,
            }}
            className="mt-6 grid items-stretch gap-4 md:grid-cols-2"
          >
            {MARKET_DRIVERS.map((driver, index) => (
              <motion.article
                key={driver.title}
                variants={reveal}
                whileHover={
                  reducedMotion
                    ? undefined
                    : { y: -4 }
                }
                transition={{
                  duration: reducedMotion ? 0 : 0.28,
                  ease: EASE,
                }}
                className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-brand-border bg-white p-5 shadow-[0_5px_22px_rgba(5,7,9,0.035)] transition-[border-color,box-shadow] duration-300 hover:border-brand-primary/35 hover:shadow-[0_15px_35px_rgba(5,7,9,0.075)] sm:p-6"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-brand-primary transition-transform duration-300 group-hover:scale-x-100"
                />

                <div className="flex items-start justify-between gap-3">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-primary-soft text-brand-primary-dark transition-colors group-hover:bg-brand-primary group-hover:text-white">
                    <Icon name={driver.icon} />
                  </span>

                  <span className="font-heading text-[11px] font-bold tabular-nums text-brand-muted">
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </span>
                </div>

                <span className="mt-5 inline-flex w-fit rounded-lg border border-brand-primary/15 bg-brand-primary-soft px-3 py-1.5 font-heading text-[10px] font-bold text-brand-primary-dark">
                  {driver.label}
                </span>

                <h3 className="mt-4 font-heading text-[17px] font-extrabold leading-[1.4] tracking-[-0.03em] text-brand-dark">
                  {driver.title}
                </h3>

                <p className="mt-3 text-[13px] leading-[1.85] text-brand-body">
                  {driver.description}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </section>

        {/* =====================================
            03 — OFFICIAL EXHIBITOR CATEGORIES
        ====================================== */}

        <section
          aria-labelledby="bangladesh-sectors-heading"
          className="mt-12 sm:mt-16"
        >
          <motion.div
            {...scrollProps}
            variants={reveal}
            className="flex flex-col gap-4 border-b border-brand-border pb-6 sm:flex-row sm:items-end sm:justify-between"
          >
            <div className="max-w-[750px]">
              <Eyebrow>
                Official Brochure · Exhibitor Profile
              </Eyebrow>

              <h2
                id="bangladesh-sectors-heading"
                className="mt-3 font-heading text-[clamp(1.5rem,2.7vw,2.1rem)] font-extrabold leading-[1.2] tracking-[-0.04em] text-brand-dark"
              >
                Industries Covered by{" "}
                <span className="text-brand-primary-dark">
                  Bangladesh Buildcon
                </span>
              </h2>

              <p className="mt-3 max-w-[730px] text-[13px] leading-[1.85] text-brand-body">
                The official 2026 exhibition
                brochure identifies seven main
                exhibitor categories, providing
                a practical overview of the
                products and technologies
                relevant to the event.
              </p>
            </div>

            <Link
              href="/exhibition-profile"
              className="group inline-flex min-h-10 shrink-0 items-center gap-2 font-heading text-[12px] font-bold text-brand-primary-dark transition-colors hover:text-brand-primary hover:underline hover:underline-offset-4"
            >
              Full Exhibition Profile

              <span className="transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                <Icon name="arrow" className="size-4" />
              </span>
            </Link>
          </motion.div>

          <motion.div
            variants={stagger}
            initial={reducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.07,
            }}
            className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          >
            {exhibitionSectors.map((sector, index) => (
              <motion.div
                key={sector.slug}
                variants={reveal}
              >
                <Link
                  href={`/exhibition-profile#${sector.slug}`}
                  className="group flex h-full min-h-[76px] items-center gap-3 rounded-xl border border-brand-border bg-white p-4 transition-[border-color,background-color] hover:border-brand-primary/35 hover:bg-brand-primary-soft/40"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-primary-soft font-heading text-[11px] font-extrabold tabular-nums text-brand-primary-dark">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="min-w-0 flex-1 font-heading text-[12px] font-bold leading-[1.55] text-brand-dark sm:text-[13px]">
                    {sector.name}
                  </span>

                  <span className="shrink-0 text-brand-primary-dark transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    <Icon
                      name="arrow"
                      className="size-4"
                    />
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* =====================================
            04 — POTENTIAL APPLICATIONS
        ====================================== */}

        <motion.section
          {...scrollProps}
          variants={reveal}
          aria-labelledby="market-applications-heading"
          className="mt-12 overflow-hidden rounded-2xl border border-brand-border bg-white shadow-[0_8px_30px_rgba(5,7,9,0.035)] sm:mt-16"
        >
          <div className="flex flex-col gap-4 border-b border-brand-border px-5 py-6 sm:flex-row sm:items-end sm:justify-between sm:px-7">
            <div>
              <Eyebrow>
                Construction Applications
              </Eyebrow>

              <h2
                id="market-applications-heading"
                className="mt-3 font-heading text-[21px] font-extrabold leading-[1.3] tracking-[-0.035em] text-brand-dark sm:text-[25px]"
              >
                Where Construction Products{" "}
                <span className="text-brand-primary-dark">
                  Are Used
                </span>
              </h2>

              <p className="mt-3 max-w-[730px] text-[13px] leading-[1.85] text-brand-body">
                Examples of project types that
                may require building materials,
                machinery, equipment and
                engineering systems. These are
                illustrative applications—not a
                list of confirmed or funded projects.
              </p>
            </div>

            <span className="inline-flex w-fit shrink-0 rounded-lg border border-brand-primary/15 bg-brand-primary-soft px-3 py-1.5 font-heading text-[11px] font-bold text-brand-primary-dark">
              {APPLICATION_AREAS.length} Application Areas
            </span>
          </div>

          <motion.div
            variants={stagger}
            initial={reducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.07,
            }}
            className="grid gap-3 p-5 sm:grid-cols-2 sm:p-7 lg:grid-cols-3"
          >
            {APPLICATION_AREAS.map((area, index) => (
              <motion.div
                key={area}
                variants={reveal}
                className="flex min-h-[65px] items-center gap-3 rounded-xl border border-brand-border bg-brand-light p-4 transition-colors hover:border-brand-primary/35 hover:bg-brand-primary-soft/40"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-primary-soft font-heading text-[11px] font-extrabold text-brand-primary-dark">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="font-heading text-[12px] font-bold leading-[1.55] text-brand-dark sm:text-[13px]">
                  {area}
                </h3>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* =====================================
            05 — EXHIBITION FEATURES
        ====================================== */}

        <motion.section
          {...scrollProps}
          variants={reveal}
          aria-labelledby="bangladesh-features-heading"
          className="mt-6 rounded-2xl border border-brand-border bg-white p-5 shadow-[0_8px_30px_rgba(5,7,9,0.035)] sm:p-7"
        >
          <Eyebrow>
            Official Brochure · Exhibition Features
          </Eyebrow>

          <h2
            id="bangladesh-features-heading"
            className="mt-3 font-heading text-[20px] font-extrabold tracking-[-0.035em] text-brand-dark sm:text-[24px]"
          >
            Connect Market Interest with{" "}
            <span className="text-brand-primary-dark">
              Industry Opportunities
            </span>
          </h2>

          <p className="mt-3 max-w-[720px] text-[13px] leading-[1.85] text-brand-body">
            The official brochure describes
            professional interaction and product
            discovery as important parts of the
            exhibition programme.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {EXHIBITION_FEATURES.map((feature) => (
              <div
                key={feature}
                className="flex items-start gap-3 rounded-xl border border-brand-border bg-brand-light p-4"
              >
                <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-brand-primary-soft text-brand-primary-dark">
                  <Icon
                    name="check"
                    className="size-4"
                  />
                </span>

                <p className="text-[12px] font-semibold leading-[1.75] text-brand-dark sm:text-[13px]">
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* =====================================
            06 — SOURCE REFERENCES
        ====================================== */}

        {marketSources.length > 0 && (
          <motion.section
            {...scrollProps}
            variants={reveal}
            aria-labelledby="market-sources-heading"
            className="mt-6 rounded-2xl border border-brand-border bg-white p-5 sm:p-7"
          >
            <div className="flex items-start gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-primary-soft text-brand-primary-dark">
                <Icon name="chart" />
              </span>

              <div>
                <h2
                  id="market-sources-heading"
                  className="font-heading text-[17px] font-extrabold leading-[1.4] text-brand-dark sm:text-[19px]"
                >
                  Market Information Sources
                </h2>

                <p className="mt-2 text-[12px] leading-[1.8] text-brand-body">
                  Source references maintained
                  for the market facts displayed
                  on this page.
                </p>
              </div>
            </div>

            <ul className="mt-5 flex flex-wrap gap-3">
              {marketSources.map((source) => (
                <li key={source.name}>
                  {source.url ? (
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex min-h-10 items-center gap-2 rounded-lg border border-brand-border bg-brand-light px-3.5 py-2 text-[12px] font-semibold text-brand-body transition-colors hover:border-brand-primary/35 hover:text-brand-primary-dark"
                    >
                      {source.name}

                      <span className="transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none">
                        <Icon
                          name="external"
                          className="size-4"
                        />
                      </span>
                    </a>
                  ) : (
                    <span className="inline-flex min-h-10 items-center rounded-lg border border-brand-border bg-brand-light px-3.5 py-2 text-[12px] font-semibold text-brand-body">
                      {source.name}
                    </span>
                  )}
                </li>
              ))}
            </ul>

            <p className="mt-4 text-[11px] leading-[1.8] text-brand-muted">
              Check publication dates, measurement
              definitions and source coverage
              when comparing market statistics.
              The exhibition brochure and
              external market publications may
              describe different reporting periods.
            </p>
          </motion.section>
        )}

        {/* =====================================
            07 — FINAL CTA
        ====================================== */}

        <motion.section
          {...scrollProps}
          variants={reveal}
          aria-labelledby="market-cta-heading"
          className="relative mt-12 overflow-hidden rounded-2xl border border-brand-dark bg-brand-dark p-6 text-white shadow-[0_18px_45px_rgba(5,7,9,0.12)] sm:mt-16 sm:p-8"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:56px_56px]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-20 size-64 rounded-full bg-brand-primary/15 blur-[85px]"
          />

          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-[680px]">
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-[11px] font-semibold text-white/70">
                <span className="inline-flex items-center gap-2">
                  <Icon
                    name="calendar"
                    className="size-4 text-red-300"
                  />

                  {event.dates.display}
                </span>

                <span className="inline-flex items-center gap-2">
                  <Icon
                    name="location"
                    className="size-4 text-red-300"
                  />

                  {event.venue.name},{" "}
                  {event.venue.city}
                </span>
              </div>

              <h2
                id="market-cta-heading"
                className="mt-4 font-heading text-[clamp(1.5rem,2.6vw,2rem)] font-extrabold leading-[1.25] tracking-[-0.04em] text-white"
              >
                Explore Bangladesh&apos;s{" "}
                <span className="text-red-300">
                  Construction Industry
                </span>
              </h2>

              <p className="mt-3 max-w-[620px] text-[13px] leading-[1.85] text-white/75">
                Meet the construction sector
                through Bangladesh Buildcon
                International Expo 2026.
                Enquire about exhibiting or
                review the visitor registration
                information.
              </p>
            </div>

            <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row lg:flex-col xl:flex-row">
              <Link
                href={event.cta.bookStand}
                className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-brand-primary px-6 py-3 font-heading text-[12px] font-bold text-white transition-colors hover:bg-brand-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Enquire for Stand Space

                <span className="transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  <Icon
                    name="arrow"
                    className="size-4"
                  />
                </span>
              </Link>

              <Link
                href={event.cta.registerVisit}
                className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/10 px-6 py-3 font-heading text-[12px] font-bold text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Register to Visit

                <span className="transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  <Icon
                    name="arrow"
                    className="size-4"
                  />
                </span>
              </Link>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-[3px] bg-brand-primary"
          />
        </motion.section>
      </Container>
    </div>
  );
}
