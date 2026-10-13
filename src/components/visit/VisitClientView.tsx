
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

/* ==========================================
   MOTION
========================================== */

const EASE = [0.22, 1, 0.36, 1] as const;

const reveal: Variants = {
  hidden: { opacity: 0, y: 18 },
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
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

/* ==========================================
   BROCHURE — VISITOR MOTIVATIONS

   Published brochure percentage breakdown.
   Not a forecast of 2026 attendance.
========================================== */

const VISIT_REASONS = [
  {
    title: "Discover New Products & Services",
    description:
      "Explore building materials, construction machinery, equipment, systems and services relevant to industry requirements.",
    percentage: 39,
    icon: "products",
  },
  {
    title: "Explore Industry Innovations",
    description:
      "Learn about construction technologies, machinery developments and modern product solutions presented at the exhibition.",
    percentage: 28,
    icon: "innovation",
  },
  {
    title: "Build Professional Networks",
    description:
      "Engage with manufacturers, suppliers, distributors, contractors, consultants and fellow industry professionals.",
    percentage: 20,
    icon: "network",
  },
  {
    title: "Identify Channel Partners",
    description:
      "Explore potential relationships with manufacturers, distributors, dealers and other trade-channel participants.",
    percentage: 12,
    icon: "partners",
  },
  {
    title: "Other Business Interests",
    description:
      "Attend for additional professional, technical or business objectives within the construction industry.",
    percentage: 1,
    icon: "building",
  },
] as const;

/* ==========================================
   BROCHURE — VISITOR BUSINESS PROFILE

   Brochure figures total 99%,
   likely due to published rounding.
========================================== */

const VISITOR_PROFILES = [
  {
    title: "Consultants & Civil Engineers",
    percentage: 36,
  },
  {
    title: "Architects & Interior Designers",
    percentage: 25,
  },
  {
    title: "Government",
    percentage: 19,
  },
  {
    title: "Builders & Real Estate",
    percentage: 11,
  },
  {
    title: "Importers, Dealers & Distributors",
    percentage: 8,
  },
] as const;

/* ==========================================
   OFFICIAL EXHIBITOR PROFILE — PAGE 3
========================================== */

const PRODUCT_AREAS = [
  "Construction Machinery and Equipment",
  "Construction Materials",
  "Construction",
  "Country Housing Landscaping",
  "Electricity and Electrical Engineering in Construction",
  "Interior & Exterior",
  "Safety & Security",
] as const;

/* ==========================================
   OFFICIAL EVENT FEATURES
========================================== */

const FEATURES = [
  "International exhibitors and country pavilions",
  "Live demonstrations and product launches",
  "B2B matchmaking opportunities",
  "Industry conferences and technical seminars",
] as const;

/* ==========================================
   SVG ICONS
========================================== */

type IconName =
  | "products"
  | "innovation"
  | "network"
  | "partners"
  | "building"
  | "arrow"
  | "calendar"
  | "location"
  | "check";

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
    innovation: (
      <>
        <path d="M9 18h6M10 22h4" />
        <path d="M8 14a7 7 0 1 1 8 0c-1 .8-1.5 1.5-1.5 4h-5C9.5 15.5 9 14.8 8 14Z" />
        <path d="M12 6v4m-2 0h4" />
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
    check: (
      <path d="m5 12 4 4L19 6" />
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
      <span className="h-[2px] w-7 bg-brand-primary" />
      <span className="font-heading text-[10px] font-extrabold uppercase tracking-[0.16em] text-brand-primary-dark">
        {children}
      </span>
    </div>
  );
}

/* ==========================================
   MAIN COMPONENT
========================================== */

export function VisitClientView() {
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
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(5,7,9,0.018)_1px,transparent_1px),linear-gradient(to_bottom,rgba(5,7,9,0.018)_1px,transparent_1px)] bg-[size:64px_64px]"
      />

      <Container className="relative z-10">
        {/* =====================================
            01 — REASONS TO VISIT
        ====================================== */}

        <section aria-labelledby="why-visit-heading">
          <motion.div
            {...scrollProps}
            variants={reveal}
            className="flex flex-col gap-5 border-b border-brand-border pb-6 sm:flex-row sm:items-end sm:justify-between"
          >
            <div className="max-w-[750px]">
              <Eyebrow>
                Official Brochure · Visitor Interests
              </Eyebrow>

              <h2
                id="why-visit-heading"
                className="mt-3 font-heading text-[clamp(1.55rem,2.8vw,2.2rem)] font-extrabold leading-[1.2] tracking-[-0.04em] text-brand-dark"
              >
                Why Visit{" "}
                <span className="text-brand-primary-dark">
                  Bangladesh Buildcon?
                </span>
              </h2>

              <p className="mt-3 text-[13px] leading-[1.85] text-brand-body sm:text-sm">
                The official exhibition brochure
                highlights product discovery,
                innovation, networking and channel
                development as key visitor interests.
              </p>
            </div>

            <Link
              href={event.cta.registerVisit}
              className="group inline-flex min-h-11 w-fit shrink-0 items-center justify-center gap-2 rounded-lg bg-brand-primary px-5 py-3 font-heading text-[12px] font-bold text-white transition-colors hover:bg-brand-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
            >
              Register to Visit
              <span className="transition-transform group-hover:translate-x-1">
                <Icon name="arrow" className="size-4" />
              </span>
            </Link>
          </motion.div>

          <motion.div
            variants={stagger}
            initial={reducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            className="mt-6 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {VISIT_REASONS.map((reason, index) => (
              <motion.article
                key={reason.title}
                variants={reveal}
                whileHover={
                  reducedMotion ? undefined : { y: -4 }
                }
                transition={{
                  duration: 0.28,
                  ease: EASE,
                }}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-brand-border bg-white p-5 shadow-[0_5px_22px_rgba(5,7,9,0.035)] transition-[border-color,box-shadow] duration-300 hover:border-brand-primary/35 hover:shadow-[0_14px_32px_rgba(5,7,9,0.075)] sm:p-6"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-brand-primary transition-transform duration-300 group-hover:scale-x-100"
                />

                <div className="flex items-start justify-between gap-3">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-brand-primary-soft text-brand-primary-dark transition-colors group-hover:bg-brand-primary group-hover:text-white">
                    <Icon name={reason.icon} />
                  </span>

                  <span className="font-heading text-[11px] font-bold tabular-nums text-brand-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-5 font-heading text-[15px] font-extrabold leading-[1.45] tracking-[-0.025em] text-brand-dark">
                  {reason.title}
                </h3>

                <p className="mt-3 text-[12px] leading-[1.85] text-brand-body">
                  {reason.description}
                </p>

                <div className="mt-auto pt-5">
                  <div className="flex items-end justify-between border-t border-brand-border pt-4">
                    <span className="text-[11px] font-semibold text-brand-muted">
                      Brochure visitor reason
                    </span>

                    <span className="font-heading text-[22px] font-extrabold tabular-nums tracking-[-0.04em] text-brand-primary-dark">
                      {reason.percentage}%
                    </span>
                  </div>

                  <div
                    aria-hidden="true"
                    className="mt-3 h-1.5 overflow-hidden rounded-full bg-brand-primary-soft"
                  >
                    <motion.div
                      initial={
                        reducedMotion
                          ? false
                          : { width: 0 }
                      }
                      whileInView={{
                        width: `${reason.percentage}%`,
                      }}
                      viewport={{ once: true }}
                      transition={{
                        duration: reducedMotion ? 0 : 0.8,
                        ease: EASE,
                      }}
                      className="h-full rounded-full bg-brand-primary"
                    />
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>

          <p className="mt-4 text-[11px] leading-[1.8] text-brand-muted">
            Percentages reproduce the visitor
            motivations published in the official
            exhibition brochure. They are not
            projections or guarantees for 2026.
          </p>
        </section>

        {/* =====================================
            02 — VISITOR BUSINESS PROFILE
        ====================================== */}

        <motion.section
          {...scrollProps}
          variants={reveal}
          aria-labelledby="visitor-profile-heading"
          className="mt-12 overflow-hidden rounded-2xl border border-brand-border bg-white shadow-[0_8px_32px_rgba(5,7,9,0.035)] sm:mt-16"
        >
          <div className="flex flex-col gap-4 border-b border-brand-border px-5 py-6 sm:flex-row sm:items-end sm:justify-between sm:px-7">
            <div className="max-w-[670px]">
              <Eyebrow>
                Official Brochure · Visitor Business Profile
              </Eyebrow>

              <h2
                id="visitor-profile-heading"
                className="mt-3 font-heading text-[21px] font-extrabold leading-[1.3] tracking-[-0.035em] text-brand-dark sm:text-[25px]"
              >
                Meet the People Who{" "}
                <span className="text-brand-primary-dark">
                  Buy, Build & Specify
                </span>
              </h2>

              <p className="mt-3 text-[13px] leading-[1.85] text-brand-body">
                The brochure identifies consultants,
                engineers, architects, government
                representatives, developers and
                distributors among the professional
                visitor business groups.
              </p>
            </div>

            <Link
              href="/who-should-visit"
              className="group inline-flex min-h-10 shrink-0 items-center gap-2 font-heading text-[12px] font-bold text-brand-primary-dark transition-colors hover:text-brand-primary hover:underline hover:underline-offset-4"
            >
              Explore Visitor Profiles
              <span className="transition-transform group-hover:translate-x-1">
                <Icon name="arrow" className="size-4" />
              </span>
            </Link>
          </div>

          <div className="grid gap-7 p-5 sm:p-7 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-5">
              {VISITOR_PROFILES.map((profile) => (
                <div key={profile.title}>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <h3 className="text-[12px] font-semibold leading-[1.5] text-brand-dark sm:text-[13px]">
                      {profile.title}
                    </h3>

                    <span className="font-heading text-[14px] font-extrabold tabular-nums text-brand-primary-dark">
                      {profile.percentage}%
                    </span>
                  </div>

                  <div
                    className="h-2 overflow-hidden rounded-full bg-brand-light"
                    aria-label={`${profile.title}: ${profile.percentage}% in the brochure visitor business profile`}
                    role="img"
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
                <Icon name="network" />
              </span>

              <h3 className="mt-5 font-heading text-[18px] font-extrabold leading-[1.4] tracking-[-0.03em] text-brand-dark">
                A Construction-Focused Professional Audience
              </h3>

              <p className="mt-3 text-[13px] leading-[1.85] text-brand-body">
                The exhibition is designed around
                the building and construction
                industry, connecting product
                suppliers with professionals
                involved in project planning,
                specification, procurement,
                construction and distribution.
              </p>

              <p className="mt-4 text-[11px] leading-[1.8] text-brand-muted">
                Business-profile percentages are
                reproduced as published in the
                brochure. Their total is 99%,
                consistent with rounded figures.
                They do not represent a confirmed
                2026 visitor composition.
              </p>
            </div>
          </div>
        </motion.section>

        {/* =====================================
            03 — EXHIBITION PRODUCT AREAS
        ====================================== */}

        <section
          aria-labelledby="visit-products-heading"
          className="mt-12 sm:mt-16"
        >
          <motion.div
            {...scrollProps}
            variants={reveal}
            className="border-b border-brand-border pb-6"
          >
            <Eyebrow>
              Official Brochure · Exhibitor Profile
            </Eyebrow>

            <h2
              id="visit-products-heading"
              className="mt-3 font-heading text-[clamp(1.5rem,2.7vw,2.1rem)] font-extrabold tracking-[-0.04em] text-brand-dark"
            >
              Explore the{" "}
              <span className="text-brand-primary-dark">
                Exhibition Categories
              </span>
            </h2>

            <p className="mt-3 max-w-[740px] text-[13px] leading-[1.85] text-brand-body">
              Browse the seven main product and
              industry areas presented in the official
              Bangladesh Buildcon exhibition profile.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial={reducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
            className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          >
            {PRODUCT_AREAS.map((area, index) => (
              <motion.div
                key={area}
                variants={reveal}
                className="flex items-center gap-3 rounded-xl border border-brand-border bg-white p-4 transition-colors hover:border-brand-primary/35 hover:bg-brand-primary-soft/40"
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

          <Link
            href="/exhibition-profile"
            className="group mt-5 inline-flex min-h-10 items-center gap-2 font-heading text-[12px] font-bold text-brand-primary-dark hover:underline hover:underline-offset-4"
          >
            View Complete Exhibition Profile
            <span className="transition-transform group-hover:translate-x-1">
              <Icon name="arrow" className="size-4" />
            </span>
          </Link>
        </section>

        {/* =====================================
            04 — EVENT FEATURES
        ====================================== */}

        <motion.section
          {...scrollProps}
          variants={reveal}
          aria-labelledby="visit-features-heading"
          className="mt-12 overflow-hidden rounded-2xl border border-brand-border bg-white p-5 shadow-[0_8px_30px_rgba(5,7,9,0.035)] sm:mt-16 sm:p-7"
        >
          <Eyebrow>
            Official Exhibition Features
          </Eyebrow>

          <h2
            id="visit-features-heading"
            className="mt-3 font-heading text-[20px] font-extrabold leading-[1.3] tracking-[-0.035em] text-brand-dark sm:text-[24px]"
          >
            More Than{" "}
            <span className="text-brand-primary-dark">
              Product Discovery
            </span>
          </h2>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {FEATURES.map((feature) => (
              <div
                key={feature}
                className="flex items-start gap-3 rounded-xl border border-brand-border bg-brand-light p-4"
              >
                <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-brand-primary-soft text-brand-primary-dark">
                  <Icon name="check" className="size-4" />
                </span>

                <p className="text-[12px] font-semibold leading-[1.75] text-brand-dark sm:text-[13px]">
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* =====================================
            FINAL VISITOR CTA
        ====================================== */}

        <motion.section
          {...scrollProps}
          variants={reveal}
          aria-labelledby="visit-cta-heading"
          className="mt-6 flex flex-col gap-5 rounded-2xl border border-brand-primary/20 bg-brand-primary-soft p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
        >
          <div>
            <h2
              id="visit-cta-heading"
              className="font-heading text-[17px] font-extrabold leading-[1.4] text-brand-dark"
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
              Review visitor registration information
              and submit your details through the
              official registration form.
            </p>
          </div>

          <Link
            href={event.cta.registerVisit}
            className="group inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-brand-primary px-6 py-3 font-heading text-[12px] font-bold text-white transition-colors hover:bg-brand-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary sm:w-auto"
          >
            Register to Visit
            <span className="transition-transform group-hover:translate-x-1">
              <Icon name="arrow" className="size-4" />
            </span>
          </Link>
        </motion.section>
      </Container>
    </div>
  );
}
