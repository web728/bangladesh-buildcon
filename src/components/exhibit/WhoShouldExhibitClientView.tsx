
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
import { exhibitionSectors } from "@/data/exhibitionProfile";

/* ==========================================
   MOTION CONFIG
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
      staggerChildren: 0.07,
      delayChildren: 0.04,
    },
  },
};

/* ==========================================
   TARGET EXHIBITOR PROFILES

   Based on the supplied page's 11 business
   profiles, with product descriptions aligned
   to the official Buildcon exhibitor scope.

   These are prospective exhibitor types,
   not confirmed participants.
========================================== */

const EXHIBITOR_PROFILES = [
  {
    title: "Manufacturers",
    badge: "Product Manufacturing",
    description:
      "Manufacturers of construction materials, structural systems, finishing products and related building components looking to present their product ranges.",
    icon: "factory",
  },
  {
    title: "Exporters",
    badge: "International Trade",
    description:
      "Export-oriented businesses supplying building materials, machinery, equipment and construction-related products to overseas markets.",
    icon: "globe",
  },
  {
    title: "International Suppliers",
    badge: "Global Supply",
    description:
      "International suppliers introducing construction technologies, machinery, materials and engineering products relevant to the Bangladesh market.",
    icon: "network",
  },
  {
    title: "Bangladeshi Manufacturers",
    badge: "Domestic Industry",
    description:
      "Bangladesh-based manufacturers presenting locally produced construction materials, components, equipment and building solutions.",
    icon: "building",
  },
  {
    title: "Importers & Distributors",
    badge: "Distribution",
    description:
      "Importers, distributors, dealers and trading businesses handling building materials, electrical products, tools, construction equipment and related supplies.",
    icon: "package",
  },
  {
    title: "Construction Machinery Companies",
    badge: "Machinery & Equipment",
    description:
      "Companies involved in construction machinery, cranes, lifting equipment, handling systems, formwork, power tools and site equipment.",
    icon: "machinery",
  },
  {
    title: "Building Material Companies",
    badge: "Building Materials",
    description:
      "Suppliers of roofing, insulation, waterproofing, wall systems, façade materials, finishing materials and prefabricated construction products.",
    icon: "layers",
  },
  {
    title: "Engineering Product Manufacturers",
    badge: "Engineering",
    description:
      "Manufacturers of electrical engineering products, distribution equipment, automation systems and technical building components.",
    icon: "settings",
  },
  {
    title: "Equipment Suppliers",
    badge: "Tools & Equipment",
    description:
      "Suppliers of construction tools, welding equipment, pneumatic and hydraulic tools, lifting equipment and other site-use products.",
    icon: "tool",
  },
  {
    title: "Building Technology Companies",
    badge: "Construction Technology",
    description:
      "Businesses offering construction automation, resource-saving technologies, modern building systems and energy-related engineering solutions.",
    icon: "technology",
  },
  {
    title: "Construction Product & System Providers",
    badge: "Integrated Systems",
    description:
      "Providers of building envelopes, roofing systems, interior and exterior products, safety equipment and construction-related technical systems.",
    icon: "shield",
  },
] as const;

/* ==========================================
   ICON SYSTEM
========================================== */

type IconName =
  | (typeof EXHIBITOR_PROFILES)[number]["icon"]
  | "arrow"
  | "check"
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
    factory: (
      <>
        <path d="M3 21h18M4 21V10l5 3V9l5 4V5h5v16" />
        <path d="M7 17h2m4 0h2m2-7h.01" />
      </>
    ),
    globe: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c-3 3-3 15 0 18M12 3c3 3 3 15 0 18" />
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
    building: (
      <>
        <path d="M3 21h18M5 21V5h10v16M15 10h5v11" />
        <path d="M8 9h4M8 13h4M8 17h4" />
      </>
    ),
    package: (
      <>
        <path d="m12 3 9 5-9 5-9-5 9-5Z" />
        <path d="M3 8v9l9 5 9-5V8M12 13v9" />
      </>
    ),
    machinery: (
      <>
        <path d="M3 20h18M5 20v-6h6l4 6" />
        <path d="M7 14V5h8l4 4v5" />
        <path d="M7 8h8m4 6h2" />
      </>
    ),
    layers: (
      <>
        <path d="m12 3 9 5-9 5-9-5 9-5Z" />
        <path d="m3 12 9 5 9-5M3 16l9 5 9-5" />
      </>
    ),
    settings: (
      <>
        <rect x="5" y="5" width="14" height="14" rx="2" />
        <path d="M9 9h6v6H9zM9 2v3m6-3v3M9 19v3m6-3v3M2 9h3m-3 6h3m14-6h3m-3 6h3" />
      </>
    ),
    tool: (
      <>
        <path d="M14 6a5 5 0 0 0-6 6l-5 5a3 3 0 0 0 4 4l5-5a5 5 0 0 0 6-6l-3 3-3-3 3-4Z" />
      </>
    ),
    technology: (
      <>
        <rect x="3" y="4" width="18" height="14" rx="2" />
        <path d="M8 22h8M12 18v4m-5-9 3-3 2 2 5-5" />
      </>
    ),
    shield: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    arrow: (
      <path d="M5 12h14m-6-6 6 6-6 6" />
    ),
    check: (
      <path d="m5 12 4 4L19 6" />
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

export function WhoShouldExhibitClientView() {
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
            01 — INTRODUCTION
        ====================================== */}

        <motion.header
          {...scrollProps}
          variants={reveal}
          className="flex flex-col gap-5 border-b border-brand-border pb-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-[760px]">
            <Eyebrow>Exhibitor Business Profiles</Eyebrow>

            <h2 className="mt-3 font-heading text-[clamp(1.55rem,2.8vw,2.2rem)] font-extrabold leading-[1.2] tracking-[-0.04em] text-brand-dark">
              Is Your Business a Fit for{" "}
              <span className="text-brand-primary-dark">
                Bangladesh Buildcon?
              </span>
            </h2>

            <p className="mt-3 max-w-[740px] text-[13px] leading-[1.85] text-brand-body sm:text-sm">
              Bangladesh Buildcon brings the
              building and construction industry
              into focus. Explore the manufacturer,
              supplier, distributor and technology
              provider profiles relevant to
              the exhibition.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <Link
              href="/exhibition-profile"
              className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-brand-border bg-white px-4 py-2.5 font-heading text-[12px] font-bold text-brand-dark transition-colors hover:border-brand-primary/35 hover:text-brand-primary-dark"
            >
              Exhibitor Sectors
              <span className="transition-transform group-hover:translate-x-1">
                <Icon name="arrow" className="size-4" />
              </span>
            </Link>

            <Link
              href={event.cta.bookStand}
              className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-brand-primary px-4 py-2.5 font-heading text-[12px] font-bold text-white transition-colors hover:bg-brand-primary-dark"
            >
              Enquire for Stand Space
              <span className="transition-transform group-hover:translate-x-1">
                <Icon name="arrow" className="size-4" />
              </span>
            </Link>
          </div>
        </motion.header>

        {/* =====================================
            02 — TARGET EXHIBITOR PROFILES
        ====================================== */}

        <section
          aria-labelledby="exhibitor-profiles-heading"
          className="pt-7 sm:pt-9"
        >
          <motion.div
            {...scrollProps}
            variants={reveal}
            className="mb-5 flex flex-wrap items-center justify-between gap-3"
          >
            <h2
              id="exhibitor-profiles-heading"
              className="font-heading text-[17px] font-extrabold tracking-[-0.03em] text-brand-dark sm:text-[19px]"
            >
              Businesses That Can Explore Participation
            </h2>

            <span className="rounded-lg border border-brand-primary/15 bg-brand-primary-soft px-3 py-1.5 font-heading text-[11px] font-bold text-brand-primary-dark">
              {EXHIBITOR_PROFILES.length} Business Profiles
            </span>
          </motion.div>

          <motion.div
            variants={stagger}
            initial={reducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.05,
            }}
            className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {EXHIBITOR_PROFILES.map((profile, index) => (
              <motion.article
                key={profile.title}
                variants={reveal}
                whileHover={
                  reducedMotion
                    ? undefined
                    : { y: -4 }
                }
                transition={{
                  duration: 0.28,
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
                    <Icon name={profile.icon} />
                  </span>

                  <span className="font-heading text-[11px] font-bold tabular-nums text-brand-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <span className="mt-5 inline-flex w-fit rounded-md border border-brand-primary/15 bg-brand-primary-soft px-2.5 py-1 font-heading text-[10px] font-bold text-brand-primary-dark">
                  {profile.badge}
                </span>

                <h3 className="mt-4 font-heading text-[16px] font-extrabold leading-[1.45] tracking-[-0.03em] text-brand-dark transition-colors group-hover:text-brand-primary-dark">
                  {profile.title}
                </h3>

                <p className="mt-3 text-[13px] leading-[1.85] text-brand-body">
                  {profile.description}
                </p>

                <div className="mt-auto border-t border-brand-border pt-4">
                  <Link
                    href={event.cta.bookStand}
                    aria-label={`Enquire about exhibiting as ${profile.title}`}
                    className="group/link inline-flex min-h-10 items-center gap-2 font-heading text-[12px] font-bold text-brand-primary-dark transition-colors hover:text-brand-primary hover:underline hover:underline-offset-4"
                  >
                    Explore Participation
                    <span className="transition-transform group-hover/link:translate-x-1">
                      <Icon name="arrow" className="size-4" />
                    </span>
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>

          <p className="mt-5 text-[11px] leading-[1.8] text-brand-muted">
            These business profiles describe
            prospective exhibitors relevant to
            the exhibition scope. They do not
            indicate confirmed participation or
            automatic eligibility.
          </p>
        </section>

        {/* =====================================
            03 — OFFICIAL EXHIBITOR CATEGORIES
        ====================================== */}

        <section
          aria-labelledby="exhibitor-sectors-heading"
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
                id="exhibitor-sectors-heading"
                className="mt-3 font-heading text-[clamp(1.5rem,2.7vw,2.1rem)] font-extrabold leading-[1.2] tracking-[-0.04em] text-brand-dark"
              >
                Seven Main{" "}
                <span className="text-brand-primary-dark">
                  Exhibition Sectors
                </span>
              </h2>

              <p className="mt-3 text-[13px] leading-[1.85] text-brand-body">
                The official Bangladesh Buildcon
                brochure identifies the following
                seven exhibitor profile categories.
              </p>
            </div>

            <Link
              href="/exhibition-profile"
              className="group inline-flex min-h-10 shrink-0 items-center gap-2 font-heading text-[12px] font-bold text-brand-primary-dark hover:underline hover:underline-offset-4"
            >
              Full Exhibition Profile
              <span className="transition-transform group-hover:translate-x-1">
                <Icon name="arrow" className="size-4" />
              </span>
            </Link>
          </motion.div>

          <motion.div
            variants={stagger}
            initial={reducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.07 }}
            className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          >
            {exhibitionSectors.map((sector, index) => (
              <motion.div
                key={sector.slug}
                variants={reveal}
              >
                <Link
                  href={`/exhibition-profile#${sector.slug}`}
                  className="group flex h-full items-center gap-3 rounded-xl border border-brand-border bg-white p-4 transition-[border-color,background-color] duration-300 hover:border-brand-primary/35 hover:bg-brand-primary-soft/40"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-primary-soft font-heading text-[11px] font-extrabold text-brand-primary-dark">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="min-w-0 flex-1 font-heading text-[12px] font-bold leading-[1.55] text-brand-dark sm:text-[13px]">
                    {sector.name}
                  </span>

                  <span className="shrink-0 text-brand-primary-dark transition-transform group-hover:translate-x-1">
                    <Icon name="arrow" className="size-4" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* =====================================
            04 — BROCHURE EVENT FEATURES
        ====================================== */}

        <motion.section
          {...scrollProps}
          variants={reveal}
          aria-labelledby="exhibitor-features-heading"
          className="mt-12 rounded-2xl border border-brand-border bg-white p-5 shadow-[0_8px_30px_rgba(5,7,9,0.035)] sm:mt-16 sm:p-7"
        >
          <Eyebrow>
            Exhibition Programme
          </Eyebrow>

          <h2
            id="exhibitor-features-heading"
            className="mt-3 font-heading text-[20px] font-extrabold tracking-[-0.035em] text-brand-dark sm:text-[24px]"
          >
            Present Your Products.{" "}
            <span className="text-brand-primary-dark">
              Connect with Industry.
            </span>
          </h2>

          <p className="mt-3 max-w-[740px] text-[13px] leading-[1.85] text-brand-body">
            The official brochure highlights
            product discovery, business interaction
            and technical knowledge exchange
            within the exhibition programme.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              "International exhibitors and country pavilions",
              "Live demonstrations and product launches",
              "B2B matchmaking opportunities",
              "Industry conferences and technical seminars",
            ].map((feature) => (
              <div
                key={feature}
                className="flex items-start gap-3 rounded-xl border border-brand-border bg-brand-light p-4"
              >
                <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-brand-primary-soft text-brand-primary-dark">
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
            05 — FINAL CTA
        ====================================== */}

        <motion.section
          {...scrollProps}
          variants={reveal}
          aria-labelledby="exhibitor-cta-heading"
          className="mt-6 flex flex-col gap-5 rounded-2xl border border-brand-primary/20 bg-brand-primary-soft p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
        >
          <div className="max-w-[680px]">
            <h2
              id="exhibitor-cta-heading"
              className="font-heading text-[17px] font-extrabold leading-[1.4] text-brand-dark sm:text-[18px]"
            >
              Interested in Exhibiting at Bangladesh Buildcon 2026?
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
              Submit an exhibition space enquiry
              to discuss your products, space
              requirements and participation
              arrangements with the organisers.
              Stand allocation is subject to confirmation.
            </p>
          </div>

          <Link
            href={event.cta.bookStand}
            className="group inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-brand-primary px-6 py-3 font-heading text-[12px] font-bold text-white transition-colors hover:bg-brand-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary sm:w-auto"
          >
            Enquire for Stand Space

            <span className="transition-transform group-hover:translate-x-1">
              <Icon name="arrow" className="size-4" />
            </span>
          </Link>
        </motion.section>
      </Container>
    </div>
  );
}
