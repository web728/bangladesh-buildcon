
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
import { visitorGroups } from "@/data/visitorProfile";

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
   OFFICIAL BROCHURE BUSINESS PROFILE

   Published visitor business-profile chart.
   These figures are not a forecast of 2026
   attendance or confirmed registrations.
========================================== */

const BROCHURE_PROFILES = [
  {
    name: "Consultants & Civil Engineers",
    percentage: 36,
  },
  {
    name: "Architects & Interior Designers",
    percentage: 25,
  },
  {
    name: "Government",
    percentage: 19,
  },
  {
    name: "Builders & Real Estate",
    percentage: 11,
  },
  {
    name: "Importers, Dealers & Distributors",
    percentage: 8,
  },
] as const;

/* ==========================================
   BROCHURE VISITOR MOTIVATIONS
========================================== */

const VISITOR_MOTIVATIONS = [
  {
    title: "Discover New Products & Services",
    percentage: 39,
  },
  {
    title: "Explore Innovations",
    percentage: 28,
  },
  {
    title: "Professional Networking",
    percentage: 20,
  },
  {
    title: "Find Channel Partners",
    percentage: 12,
  },
  {
    title: "Other Reasons",
    percentage: 1,
  },
] as const;

/* ==========================================
   VISITOR OPPORTUNITIES

   Interpretive copy aligned with brochure
   exhibitor scope and event features.
========================================== */

const VISITOR_OPPORTUNITIES = [
  {
    title: "Explore Construction Products",
    description:
      "Discover the construction machinery, building materials, interiors, electrical and safety product categories covered by the exhibition.",
    icon: "products",
  },
  {
    title: "Review New Technologies",
    description:
      "Learn about new construction equipment, building systems and technical solutions relevant to current industry requirements.",
    icon: "technology",
  },
  {
    title: "Meet Industry Suppliers",
    description:
      "Explore opportunities to speak with manufacturers, suppliers, distributors and other businesses participating in the event.",
    icon: "network",
  },
  {
    title: "Explore Channel Partnerships",
    description:
      "Connect with relevant industry participants and investigate potential distribution and supply relationships.",
    icon: "partners",
  },
  {
    title: "Discover Product Applications",
    description:
      "The official brochure highlights live demonstrations, product launches and technical knowledge exchange as exhibition features.",
    icon: "building",
  },
  {
    title: "Build Professional Connections",
    description:
      "Engage with people working across architecture, engineering, construction, development, procurement and distribution.",
    icon: "people",
  },
] as const;

/* ==========================================
   CUSTOM SVG ICONS
========================================== */

type IconName =
  | "products"
  | "technology"
  | "network"
  | "partners"
  | "building"
  | "people"
  | "arrow"
  | "calendar"
  | "location";

function Icon({
  name,
  className = "size-5",
}: {
  name: IconName;
  className?: string;
}) {
  const paths: Record<IconName, ReactNode> = {
    products: (
      <>
        <path d="m12 3 9 5-9 5-9-5 9-5Z" />
        <path d="m3 12 9 5 9-5M3 16l9 5 9-5" />
      </>
    ),
    technology: (
      <>
        <rect x="3" y="4" width="18" height="14" rx="2" />
        <path d="M8 22h8M12 18v4m-5-9 3-3 2 2 5-5" />
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
    partners: (
      <>
        <path d="m3 12 5-4 4 2 4-2 5 4" />
        <path d="m7 13 5 5a2 2 0 0 0 3-1l2-2" />
        <path d="M3 15l3 3m12 0 3-3" />
      </>
    ),
    building: (
      <>
        <path d="M3 21h18M5 21V5h10v16M15 10h5v11" />
        <path d="M8 9h4M8 13h4M8 17h4" />
      </>
    ),
    people: (
      <>
        <circle cx="12" cy="8" r="3" />
        <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
        <path d="M4 9a2 2 0 1 0 0 4m16-4a2 2 0 1 1 0 4" />
      </>
    ),
    arrow: (
      <path d="M5 12h14m-6-6 6 6-6 6" />
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

function VisitorGroupIcon({
  index,
}: {
  index: number;
}) {
  const iconNames: IconName[] = [
    "building",
    "products",
    "people",
    "technology",
    "network",
  ];

  return (
    <Icon
      name={iconNames[index % iconNames.length]}
    />
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

export function WhoShouldVisitClientView() {
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
      {/* Architectural background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(5,7,9,0.018)_1px,transparent_1px),linear-gradient(to_bottom,rgba(5,7,9,0.018)_1px,transparent_1px)] bg-[size:64px_64px]"
      />

      <Container className="relative z-10">
        {/* =====================================
            01 — TARGET VISITOR GROUPS
        ====================================== */}

        <section aria-labelledby="visitor-groups-heading">
          <motion.header
            {...scrollProps}
            variants={reveal}
            className="flex flex-col gap-5 border-b border-brand-border pb-6 sm:flex-row sm:items-end sm:justify-between"
          >
            <div className="max-w-[760px]">
              <Eyebrow>Professional Visitor Audience</Eyebrow>

              <h2
                id="visitor-groups-heading"
                className="mt-3 font-heading text-[clamp(1.55rem,2.8vw,2.2rem)] font-extrabold leading-[1.2] tracking-[-0.04em] text-brand-dark"
              >
                Professionals Who{" "}
                <span className="text-brand-primary-dark">
                  Buy, Build & Specify
                </span>
              </h2>

              <p className="mt-3 max-w-[740px] text-[13px] leading-[1.85] text-brand-body sm:text-sm">
                Bangladesh Buildcon is focused on
                the building and construction
                industry. Explore the types of
                professionals involved in design,
                engineering, procurement, project
                delivery and construction trade.
              </p>
            </div>

            <Link
              href={event.cta.registerVisit}
              className="group inline-flex min-h-11 w-fit shrink-0 items-center justify-center gap-2 rounded-lg bg-brand-primary px-5 py-3 font-heading text-[12px] font-bold text-white transition-colors hover:bg-brand-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
            >
              Register to Visit

              <span className="transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                <Icon name="arrow" className="size-4" />
              </span>
            </Link>
          </motion.header>

          <motion.div
            variants={stagger}
            initial={reducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.06 }}
            className="mt-6 grid items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            {visitorGroups.map((group, index) => (
              <motion.article
                key={group.slug}
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
                  className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-brand-primary transition-transform duration-300 group-hover:scale-x-100 motion-reduce:transition-none"
                />

                <div className="flex items-center justify-between gap-3">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-primary-soft text-brand-primary-dark transition-colors group-hover:bg-brand-primary group-hover:text-white">
                    <VisitorGroupIcon index={index} />
                  </span>

                  <span className="font-heading text-[11px] font-bold tabular-nums text-brand-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-5 font-heading text-[16px] font-extrabold leading-[1.45] tracking-[-0.025em] text-brand-dark transition-colors group-hover:text-brand-primary-dark">
                  {group.name}
                </h3>

                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.roles.map((role) => (
                    <li key={role}>
                      <span className="inline-flex items-center gap-2 rounded-lg border border-brand-border bg-brand-light px-2.5 py-1.5 text-[11px] font-medium leading-[1.5] text-brand-body">
                        <span
                          aria-hidden="true"
                          className="size-1.5 shrink-0 rounded-full bg-brand-primary"
                        />
                        {role}
                      </span>
                    </li>
                  ))}
                </ul>

                <p className="mt-auto border-t border-brand-border pt-4 text-[11px] font-semibold text-brand-muted">
                  Professional visitor category
                </p>
              </motion.article>
            ))}
          </motion.div>

          <p className="mt-4 text-[11px] leading-[1.8] text-brand-muted">
            These categories describe relevant
            professional audiences, not confirmed
            visitors or guaranteed attendance.
          </p>
        </section>

        {/* =====================================
            02 — BROCHURE VISITOR PROFILE
        ====================================== */}

        <motion.section
          {...scrollProps}
          variants={reveal}
          aria-labelledby="visitor-profile-heading"
          className="mt-12 overflow-hidden rounded-2xl border border-brand-border bg-white shadow-[0_8px_32px_rgba(5,7,9,0.035)] sm:mt-16"
        >
          <div className="border-b border-brand-border px-5 py-6 sm:px-7">
            <Eyebrow>
              Official Brochure · Visitor Business Profile
            </Eyebrow>

            <h2
              id="visitor-profile-heading"
              className="mt-3 font-heading text-[21px] font-extrabold leading-[1.3] tracking-[-0.035em] text-brand-dark sm:text-[25px]"
            >
              Visitor{" "}
              <span className="text-brand-primary-dark">
                Business Profile
              </span>
            </h2>

            <p className="mt-3 max-w-[750px] text-[13px] leading-[1.85] text-brand-body">
              The official brochure presents the
              following breakdown of visitor
              business categories.
            </p>
          </div>

          <div className="grid gap-7 p-5 sm:p-7 lg:grid-cols-[1.35fr_0.9fr] lg:gap-10">
            <div className="space-y-5">
              {BROCHURE_PROFILES.map((profile) => (
                <div key={profile.name}>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <h3 className="text-[12px] font-semibold leading-[1.5] text-brand-dark sm:text-[13px]">
                      {profile.name}
                    </h3>

                    <span className="font-heading text-[14px] font-extrabold tabular-nums text-brand-primary-dark">
                      {profile.percentage}%
                    </span>
                  </div>

                  <div
                    role="img"
                    aria-label={`${profile.name}: ${profile.percentage}% according to the official brochure`}
                    className="h-2 overflow-hidden rounded-full bg-brand-light"
                  >
                    <motion.div
                      initial={
                        reducedMotion
                          ? false
                          : { width: 0 }
                      }
                      whileInView={{
                        width: `${profile.percentage}%`,
                      }}
                      viewport={{ once: true }}
                      transition={{
                        duration: reducedMotion ? 0 : 0.85,
                        ease: EASE,
                      }}
                      className="h-full rounded-full bg-brand-primary"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col justify-center rounded-xl border border-brand-border bg-brand-light p-5 sm:p-6">
              <span className="flex size-11 items-center justify-center rounded-xl bg-brand-primary-soft text-brand-primary-dark">
                <Icon name="people" />
              </span>

              <h3 className="mt-5 font-heading text-[18px] font-extrabold leading-[1.4] tracking-[-0.03em] text-brand-dark">
                A Cross-Section of the Construction Industry
              </h3>

              <p className="mt-3 text-[13px] leading-[1.85] text-brand-body">
                The brochure highlights
                consultants, civil engineers,
                architects, interior designers,
                government-related organisations,
                builders, real estate businesses
                and trading companies.
              </p>

              <p className="mt-4 text-[11px] leading-[1.8] text-brand-muted">
                Brochure percentages total
                99% as published. Figures
                should not be interpreted
                as confirmed 2026 registrations
                or attendance.
              </p>
            </div>
          </div>
        </motion.section>

        {/* =====================================
            03 — REASONS FOR VISITING
        ====================================== */}

        <section
          aria-labelledby="visitor-motivations-heading"
          className="mt-12 sm:mt-16"
        >
          <motion.div
            {...scrollProps}
            variants={reveal}
            className="border-b border-brand-border pb-6"
          >
            <Eyebrow>
              Official Brochure · Reasons to Attend
            </Eyebrow>

            <h2
              id="visitor-motivations-heading"
              className="mt-3 font-heading text-[clamp(1.5rem,2.7vw,2.1rem)] font-extrabold tracking-[-0.04em] text-brand-dark"
            >
              What Brings Visitors{" "}
              <span className="text-brand-primary-dark">
                to the Exhibition?
              </span>
            </h2>

            <p className="mt-3 max-w-[750px] text-[13px] leading-[1.85] text-brand-body">
              Product discovery and innovation
              lead the motivations chart
              featured in the official
              Bangladesh Buildcon brochure.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial={reducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
            className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
          >
            {VISITOR_MOTIVATIONS.map(
              (motivation, index) => (
                <motion.article
                  key={motivation.title}
                  variants={reveal}
                  className="relative overflow-hidden rounded-xl border border-brand-border bg-white p-4 sm:p-5"
                >
                  <span className="font-heading text-[10px] font-bold text-brand-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p className="mt-3 font-heading text-[27px] font-extrabold tabular-nums tracking-[-0.05em] text-brand-primary-dark">
                    {motivation.percentage}%
                  </p>

                  <h3 className="mt-2 min-h-10 text-[12px] font-semibold leading-[1.6] text-brand-dark">
                    {motivation.title}
                  </h3>

                  <div
                    aria-hidden="true"
                    className="mt-4 h-1.5 overflow-hidden rounded-full bg-brand-primary-soft"
                  >
                    <motion.div
                      initial={
                        reducedMotion
                          ? false
                          : { width: 0 }
                      }
                      whileInView={{
                        width: `${motivation.percentage}%`,
                      }}
                      viewport={{ once: true }}
                      transition={{
                        duration: reducedMotion ? 0 : 0.8,
                        ease: EASE,
                      }}
                      className="h-full rounded-full bg-brand-primary"
                    />
                  </div>
                </motion.article>
              )
            )}
          </motion.div>

          <p className="mt-4 text-[11px] leading-[1.8] text-brand-muted">
            These percentages reproduce the
            visitor motivations in the brochure.
            They are not forecasts of the
            2026 visitor population.
          </p>
        </section>

        {/* =====================================
            04 — VISITOR OPPORTUNITIES
        ====================================== */}

        <section
          aria-labelledby="visitor-opportunities-heading"
          className="mt-12 sm:mt-16"
        >
          <motion.div
            {...scrollProps}
            variants={reveal}
            className="border-b border-brand-border pb-6"
          >
            <Eyebrow>
              Exhibition Opportunities
            </Eyebrow>

            <h2
              id="visitor-opportunities-heading"
              className="mt-3 font-heading text-[clamp(1.5rem,2.7vw,2.1rem)] font-extrabold tracking-[-0.04em] text-brand-dark"
            >
              Explore Products, Technology{" "}
              <span className="text-brand-primary-dark">
                & Business Connections
              </span>
            </h2>

            <p className="mt-3 max-w-[750px] text-[13px] leading-[1.85] text-brand-body">
              Opportunities aligned with the
              exhibitor profile, event features
              and visitor interests presented
              in the official brochure.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial={reducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            className="mt-6 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {VISITOR_OPPORTUNITIES.map(
              (opportunity, index) => (
                <motion.article
                  key={opportunity.title}
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
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-brand-border bg-white p-5 shadow-[0_5px_22px_rgba(5,7,9,0.035)] transition-[border-color,box-shadow] duration-300 hover:border-brand-primary/35 hover:shadow-[0_14px_32px_rgba(5,7,9,0.075)] sm:p-6"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-brand-primary transition-transform duration-300 group-hover:scale-x-100"
                  />

                  <div className="flex items-center justify-between gap-3">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-primary-soft text-brand-primary-dark transition-colors group-hover:bg-brand-primary group-hover:text-white">
                      <Icon name={opportunity.icon} />
                    </span>

                    <span className="font-heading text-[11px] font-bold text-brand-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-5 font-heading text-[16px] font-extrabold leading-[1.45] text-brand-dark">
                    {opportunity.title}
                  </h3>

                  <p className="mt-3 text-[12px] leading-[1.85] text-brand-body">
                    {opportunity.description}
                  </p>
                </motion.article>
              )
            )}
          </motion.div>
        </section>

        {/* =====================================
            05 — FINAL REGISTRATION CTA
        ====================================== */}

        <motion.section
          {...scrollProps}
          variants={reveal}
          aria-labelledby="visitor-cta-heading"
          className="mt-12 flex flex-col gap-5 rounded-2xl border border-brand-primary/20 bg-brand-primary-soft p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
        >
          <div className="max-w-[680px]">
            <h2
              id="visitor-cta-heading"
              className="font-heading text-[17px] font-extrabold leading-[1.4] text-brand-dark sm:text-[18px]"
            >
              Planning to Visit Bangladesh Buildcon 2026?
            </h2>

            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[12px] font-medium text-brand-body">
              <span className="inline-flex items-center gap-2">
                <Icon
                  name="calendar"
                  className="size-4 text-brand-primary-dark"
                />
                {event.dates.display}
              </span>

              <span className="inline-flex items-center gap-2">
                <Icon
                  name="location"
                  className="size-4 text-brand-primary-dark"
                />
                {event.venue.name},{" "}
                {event.venue.city}
              </span>
            </div>

            <p className="mt-3 text-[12px] leading-[1.8] text-brand-body">
              Review the visitor registration
              details and submit your interest
              using the official event website.
              Registration and admission are
              subject to organiser confirmation.
            </p>
          </div>

          <Link
            href={event.cta.registerVisit}
            className="group inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-brand-primary px-6 py-3 font-heading text-[12px] font-bold text-white transition-colors hover:bg-brand-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary sm:w-auto"
          >
            Register to Visit

            <span className="transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              <Icon name="arrow" className="size-4" />
            </span>
          </Link>
        </motion.section>
      </Container>
    </div>
  );
}
