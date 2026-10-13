
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
      duration: 0.6,
      ease: EASE,
    },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.085,
      delayChildren: 0.04,
    },
  },
};

/* ==========================================
   VENUE INFORMATION

   Event location: official 2026 brochure.
   Travel/operational information: general
   guidance, not guaranteed venue services.
========================================== */

const VENUE_HIGHLIGHTS = [
  {
    number: "01",
    icon: "location",
    title: "Official 2026 Exhibition Venue",
    description:
      "ICCB Exhibition Hall in Dhaka is the venue identified in the official brochure for the 10th Bangladesh Buildcon International Expo 2026.",
  },
  {
    number: "02",
    icon: "industry",
    title: "Building & Construction Focus",
    description:
      "The exhibition brings together construction machinery, building materials, infrastructure technologies, products and professionals from the building and construction industry.",
  },
  {
    number: "03",
    icon: "network",
    title: "Industry Interaction",
    description:
      "The exhibition brochure highlights B2B matchmaking, international exhibitors, country pavilions, product demonstrations and technical seminars.",
  },
  {
    number: "04",
    icon: "directions",
    title: "Plan Your Journey",
    description:
      "Use the venue map to plan your journey across Dhaka. Check your transport options, route and current travel conditions before leaving.",
  },
] as const;

/* ==========================================
   SVG ICONS
========================================== */

type IconName =
  | "location"
  | "calendar"
  | "building"
  | "industry"
  | "network"
  | "directions"
  | "arrow"
  | "external";

function Icon({
  name,
  className = "size-5",
}: {
  name: IconName;
  className?: string;
}) {
  const paths: Record<IconName, ReactNode> = {
    location: (
      <>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M7 3v4M17 3v4M3 10h18" />
        <path d="m9 15 2 2 4-4" />
      </>
    ),
    building: (
      <>
        <path d="M3 21h18M5 21V5h10v16M15 10h5v11" />
        <path d="M8 9h4M8 13h4M8 17h4" />
      </>
    ),
    industry: (
      <>
        <path d="M3 21h18M5 21V10l5 3V9l5 4V5h4v16" />
        <path d="M8 17h2m4 0h2" />
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
    directions: (
      <>
        <path d="m12 3 9 9-9 9-9-9 9-9Z" />
        <path d="M8 14v-2a3 3 0 0 1 3-3h5" />
        <path d="m13 6 3 3-3 3" />
      </>
    ),
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    external: <path d="M7 17 17 7M8 7h9v9" />,
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

export function VenueClientView() {
  const reducedMotion = !!useReducedMotion();

  const mapSearchQuery = encodeURIComponent(
    `${event.venue.name}, ${event.venue.city}, Bangladesh`
  );

  const googleMapsUrl =
    event.venue.mapLinkUrl ||
    `https://maps.google.com/?q=${mapSearchQuery}`;

  const scrollProps = {
    initial: reducedMotion ? false : "hidden",
    whileInView: "visible" as const,
    viewport: {
      once: true,
      amount: 0.08,
    },
  };

  return (
    <div className="relative overflow-hidden bg-brand-light py-10 text-brand-dark sm:py-14 lg:py-16">
      {/* Subtle architectural grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(5,7,9,0.018)_1px,transparent_1px),linear-gradient(to_bottom,rgba(5,7,9,0.018)_1px,transparent_1px)] bg-[size:64px_64px]"
      />

      <Container className="relative z-10">
        {/* =====================================
            01 — VENUE OVERVIEW + MAP
        ====================================== */}

        <section
          aria-labelledby="venue-overview-heading"
          className="grid items-stretch gap-5 lg:grid-cols-2"
        >
          {/* Venue information */}
          <motion.div
            {...scrollProps}
            variants={reveal}
            className="flex min-w-0 flex-col rounded-2xl border border-brand-border bg-white p-5 shadow-[0_8px_28px_rgba(5,7,9,0.035)] sm:p-7"
          >
            <Eyebrow>Official Exhibition Venue</Eyebrow>

            <h2
              id="venue-overview-heading"
              className="mt-4 font-heading text-[clamp(1.6rem,2.7vw,2.2rem)] font-extrabold leading-[1.2] tracking-[-0.04em] text-brand-dark"
            >
              {event.venue.name}
            </h2>

            <p className="mt-2 inline-flex items-center gap-2 font-heading text-[12px] font-bold text-brand-primary-dark">
              <Icon name="location" className="size-4" />
              {event.venue.city}, Bangladesh
            </p>

            <p className="mt-5 text-[13px] leading-[1.9] text-brand-body sm:text-sm">
              The 10th Bangladesh Buildcon International
              Expo 2026 is scheduled at{" "}
              <strong className="font-semibold text-brand-dark">
                {event.venue.name}
              </strong>
              , bringing the building and construction
              sector together in Dhaka.
            </p>

            <p className="mt-3 text-[13px] leading-[1.85] text-brand-body">
              The exhibition focuses on construction
              machinery, building materials, technologies
              and products, with opportunities for
              professional interaction and B2B networking.
            </p>

            {/* Event details */}
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-brand-border bg-brand-light p-4">
                <span className="flex items-center gap-2 font-heading text-[10px] font-extrabold uppercase tracking-[0.08em] text-brand-primary-dark">
                  <Icon name="calendar" className="size-4" />
                  Exhibition Dates
                </span>

                <p className="mt-2 font-heading text-[13px] font-extrabold text-brand-dark">
                  {event.dates.display}
                </p>
              </div>

              <div className="rounded-xl border border-brand-border bg-brand-light p-4">
                <span className="flex items-center gap-2 font-heading text-[10px] font-extrabold uppercase tracking-[0.08em] text-brand-primary-dark">
                  <Icon name="building" className="size-4" />
                  Host City
                </span>

                <p className="mt-2 font-heading text-[13px] font-extrabold text-brand-dark">
                  {event.venue.city}, Bangladesh
                </p>
              </div>
            </div>

            {/* Venue address */}
            <div className="mt-4 rounded-xl border border-brand-border bg-white p-4">
              <p className="font-heading text-[10px] font-extrabold uppercase tracking-[0.1em] text-brand-muted">
                Venue Location
              </p>

              <p className="mt-2 text-[13px] leading-[1.75] text-brand-body">
                {event.venue.fullLocation}
              </p>
            </div>

            {/* Actions */}
            <div className="mt-auto flex flex-wrap gap-3 pt-6">
              <Link
                href="/plan-your-visit"
                className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-brand-primary px-5 py-3 font-heading text-[12px] font-bold text-white transition-colors hover:bg-brand-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
              >
                Plan Your Visit

                <span className="transition-transform group-hover:translate-x-1">
                  <Icon name="arrow" className="size-4" />
                </span>
              </Link>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-brand-border bg-white px-5 py-3 font-heading text-[12px] font-bold text-brand-dark transition-colors hover:border-brand-primary/40 hover:text-brand-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
              >
                Google Maps

                <span className="transition-transform group-hover:translate-x-0.5">
                  <Icon name="external" className="size-4" />
                </span>
              </a>
            </div>
          </motion.div>

          {/* Embedded map */}
          <motion.div
            {...scrollProps}
            variants={reveal}
            className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-brand-border bg-white p-3 shadow-[0_8px_28px_rgba(5,7,9,0.035)]"
          >
            <div className="relative min-h-[350px] flex-1 overflow-hidden rounded-xl bg-brand-light sm:min-h-[430px]">
              {event.venue.mapEmbedUrl ? (
                <iframe
                  title={`Map of ${event.venue.name}, ${event.venue.city}`}
                  src={event.venue.mapEmbedUrl}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full border-0"
                />
              ) : (
                <div className="flex h-full min-h-[350px] flex-col items-center justify-center gap-4 p-6 text-center">
                  <span className="flex size-12 items-center justify-center rounded-xl bg-brand-primary-soft text-brand-primary-dark">
                    <Icon name="location" />
                  </span>

                  <h3 className="font-heading text-[15px] font-extrabold text-brand-dark">
                    {event.venue.name}
                  </h3>

                  <p className="text-[13px] text-brand-body">
                    {event.venue.city}, Bangladesh
                  </p>

                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-heading text-[12px] font-bold text-brand-primary-dark underline underline-offset-4"
                  >
                    Open Google Maps
                  </a>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between gap-3 px-2 py-3">
              <p className="min-w-0 text-[12px] font-semibold text-brand-body">
                <span className="font-bold text-brand-dark">
                  {event.venue.name}
                </span>
                {" · "}
                {event.venue.city}
              </p>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open venue directions in Google Maps"
                className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-primary-soft text-brand-primary-dark transition-colors hover:bg-brand-primary hover:text-white"
              >
                <Icon name="external" className="size-4" />
              </a>
            </div>
          </motion.div>
        </section>

        {/* =====================================
            02 — VENUE & EXHIBITION HIGHLIGHTS
        ====================================== */}

        <section
          aria-labelledby="venue-highlights-heading"
          className="mt-12 sm:mt-16"
        >
          <motion.div
            {...scrollProps}
            variants={reveal}
            className="flex flex-col gap-4 border-b border-brand-border pb-6 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <Eyebrow>Venue & Exhibition</Eyebrow>

              <h2
                id="venue-highlights-heading"
                className="mt-3 font-heading text-[clamp(1.5rem,2.6vw,2.1rem)] font-extrabold leading-[1.2] tracking-[-0.04em] text-brand-dark"
              >
                Location &{" "}
                <span className="text-brand-primary-dark">
                  Event Highlights
                </span>
              </h2>
            </div>

            <p className="max-w-[390px] text-[13px] leading-[1.8] text-brand-body">
              Official event information and practical
              guidance for planning a visit to the
              Dhaka exhibition venue.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial={reducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.07 }}
            className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {VENUE_HIGHLIGHTS.map((highlight) => (
              <motion.article
                key={highlight.number}
                variants={reveal}
                whileHover={
                  reducedMotion ? undefined : { y: -4 }
                }
                transition={{
                  duration: 0.28,
                  ease: EASE,
                }}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-brand-border bg-white p-5 shadow-[0_5px_22px_rgba(5,7,9,0.035)] transition-[border-color,box-shadow] duration-300 hover:border-brand-primary/35 hover:shadow-[0_14px_32px_rgba(5,7,9,0.075)]"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-brand-primary transition-transform duration-300 group-hover:scale-x-100"
                />

                <div className="flex items-start justify-between gap-3">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-brand-primary-soft text-brand-primary-dark transition-colors group-hover:bg-brand-primary group-hover:text-white">
                    <Icon name={highlight.icon} />
                  </span>

                  <span className="font-heading text-[11px] font-bold text-brand-muted">
                    {highlight.number}
                  </span>
                </div>

                <h3 className="mt-5 font-heading text-[15px] font-extrabold leading-[1.45] tracking-[-0.025em] text-brand-dark">
                  {highlight.title}
                </h3>

                <p className="mt-3 text-[12px] leading-[1.85] text-brand-body">
                  {highlight.description}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </section>

        {/* =====================================
            03 — OFFICIAL EVENT FACTS
        ====================================== */}

        <motion.section
          {...scrollProps}
          variants={reveal}
          aria-labelledby="venue-facts-heading"
          className="mt-12 overflow-hidden rounded-2xl border border-brand-border bg-white shadow-[0_8px_30px_rgba(5,7,9,0.035)] sm:mt-16"
        >
          <div className="border-b border-brand-border px-5 py-6 sm:px-7">
            <Eyebrow>Official Exhibition Information</Eyebrow>

            <h2
              id="venue-facts-heading"
              className="mt-3 font-heading text-[20px] font-extrabold tracking-[-0.035em] text-brand-dark sm:text-[24px]"
            >
              Venue &{" "}
              <span className="text-brand-primary-dark">
                Event Facts
              </span>
            </h2>
          </div>

          <dl className="grid sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                label: "Exhibition",
                value: "10th Bangladesh Buildcon International Expo 2026",
              },
              {
                label: "Dates",
                value: event.dates.display,
              },
              {
                label: "Venue",
                value: event.venue.name,
              },
              {
                label: "Location",
                value: `${event.venue.city}, Bangladesh`,
              },
              {
                label: "Industry",
                value: "Building & Construction",
              },
              {
                label: "Event Focus",
                value: "Machinery, Materials, Technologies & Products",
              },
            ].map((fact, index) => (
              <div
                key={fact.label}
                className="min-w-0 border-b border-brand-border p-5 transition-colors hover:bg-brand-primary-soft/40 sm:p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <dt className="font-heading text-[10px] font-extrabold uppercase tracking-[0.11em] text-brand-muted">
                    {fact.label}
                  </dt>

                  <span className="font-heading text-[10px] font-bold text-brand-primary-dark">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <dd className="mt-3 font-heading text-[13px] font-extrabold leading-[1.6] text-brand-dark sm:text-[14px]">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </motion.section>

        {/* =====================================
            04 — FINAL CTA
        ====================================== */}

        <motion.section
          {...scrollProps}
          variants={reveal}
          aria-labelledby="venue-cta-heading"
          className="mt-6 flex flex-col gap-5 rounded-2xl border border-brand-primary/20 bg-brand-primary-soft p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
        >
          <div className="flex items-start gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-brand-primary-dark">
              <Icon name="location" />
            </span>

            <div>
              <h2
                id="venue-cta-heading"
                className="font-heading text-[16px] font-extrabold leading-[1.4] text-brand-dark sm:text-[18px]"
              >
                Exhibit at Bangladesh Buildcon 2026
              </h2>

              <p className="mt-2 text-[12px] leading-[1.8] text-brand-body">
                {event.dates.display} · {event.venue.name},{" "}
                {event.venue.city}. Contact the organisers
                to enquire about exhibition space.
              </p>
            </div>
          </div>

          <Link
            href={event.cta.bookStand}
            className="group inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-brand-primary px-6 py-3 font-heading text-[12px] font-bold text-white transition-colors hover:bg-brand-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary sm:w-auto"
          >
            Book Exhibition Space

            <span className="transition-transform group-hover:translate-x-1">
              <Icon name="arrow" className="size-4" />
            </span>
          </Link>
        </motion.section>
      </Container>
    </div>
  );
}
