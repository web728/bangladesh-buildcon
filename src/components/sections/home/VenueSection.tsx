
"use client";

import Link from "next/link";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { Container } from "@/components/ui/Container";
import { event } from "@/config/event";

/* ==========================================
   ANIMATION
========================================== */

const EASE = [0.22, 1, 0.36, 1] as const;

const reveal: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: EASE,
    },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

/* ==========================================
   SVG ICONS
========================================== */

type IconName =
  | "location"
  | "calendar"
  | "building"
  | "arrow"
  | "external";

function Icon({
  name,
  className = "size-5",
}: {
  name: IconName;
  className?: string;
}) {
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
      {name === "location" && (
        <>
          <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="2.5" />
        </>
      )}

      {name === "calendar" && (
        <>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M7 3v4M17 3v4M3 10h18" />
        </>
      )}

      {name === "building" && (
        <>
          <path d="M3 21h18M5 21V5h14v16" />
          <path d="M8 9h3m2 0h3M8 13h3m2 0h3M10 21v-5h4v5" />
        </>
      )}

      {name === "arrow" && (
        <path d="M5 12h14m-6-6 6 6-6 6" />
      )}

      {name === "external" && (
        <path d="M7 17 17 7M8 7h9v9" />
      )}
    </svg>
  );
}

/* ==========================================
   VENUE INFORMATION ITEM
========================================== */

function VenueDetail({
  icon,
  label,
  value,
}: {
  icon: "calendar" | "building";
  label: string;
  value: string;
}) {
  return (
    <div className="group flex min-w-0 items-center gap-3 rounded-xl border border-brand-border bg-brand-light p-3.5 transition-colors duration-300 hover:border-brand-primary/30 hover:bg-white">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-primary-soft text-brand-primary-dark transition-colors duration-300 group-hover:bg-brand-primary group-hover:text-white">
        <Icon name={icon} className="size-5" />
      </span>

      <div className="min-w-0">
        <p className="font-heading text-[10px] font-bold uppercase tracking-[0.1em] text-brand-muted">
          {label}
        </p>

        <p className="mt-1 font-heading text-[12px] font-bold leading-snug text-brand-dark sm:text-[13px]">
          {value}
        </p>
      </div>
    </div>
  );
}

/* ==========================================
   MAIN VENUE SECTION
========================================== */

export function VenueSection() {
  const reducedMotion = !!useReducedMotion();

  const scrollProps = {
    initial: reducedMotion ? false : "hidden",
    whileInView: "visible" as const,
    viewport: {
      once: true,
      amount: 0.12,
    },
  };

  const mapEmbedUrl = event.venue.mapEmbedUrl;
  const mapLinkUrl = event.venue.mapLinkUrl;

  return (
    <section
      aria-labelledby="home-venue-heading"
      className="relative isolate overflow-hidden border-b border-brand-border bg-white py-12 text-brand-dark sm:py-14 lg:py-16"
    >
      {/* Subtle architectural background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(5,7,9,0.016)_1px,transparent_1px),linear-gradient(to_bottom,rgba(5,7,9,0.016)_1px,transparent_1px)] bg-[size:70px_70px]"
      />

      <Container className="relative z-10">
        {/* HEADER */}
        <motion.div
          {...scrollProps}
          variants={reveal}
          className="mb-6 flex flex-col gap-4 border-b border-brand-border pb-5 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-[670px]">
            <div className="flex items-center gap-2.5">
              <span className="h-[2px] w-7 bg-brand-primary" />

              <span className="font-heading text-[10px] font-extrabold uppercase tracking-[0.16em] text-brand-primary-dark">
                Official Event Venue
              </span>
            </div>

            <h2
              id="home-venue-heading"
              className="mt-3 font-heading text-[clamp(1.55rem,2.6vw,2.1rem)] font-extrabold leading-tight tracking-[-0.04em] text-brand-dark"
            >
              Discover the{" "}
              <span className="text-brand-primary-dark">
                Exhibition Venue
              </span>
            </h2>

            <p className="mt-2 text-[12px] leading-[1.8] text-brand-body sm:text-[13px]">
              Explore the location of Bangladesh
              Buildcon International Expo at
              ICCB Exhibition Hall, Dhaka.
            </p>
          </div>

          <Link
            href="/venue"
            className="group inline-flex min-h-10 w-fit shrink-0 items-center gap-2 rounded-lg border border-brand-border bg-white px-4 py-2.5 font-heading text-[11px] font-bold text-brand-dark transition-colors hover:border-brand-primary/40 hover:text-brand-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
          >
            Venue Details

            <span className="transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              <Icon name="external" className="size-4" />
            </span>
          </Link>
        </motion.div>

        {/* VENUE CONTENT + MAP */}
        <motion.div
          {...scrollProps}
          variants={stagger}
          className="grid items-stretch gap-5 lg:grid-cols-[0.9fr_1.1fr]"
        >
          {/* LEFT: VENUE CARD */}
          <motion.div
            variants={reveal}
            className="relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-brand-border bg-white p-5 shadow-[0_6px_28px_rgba(5,7,9,0.035)] sm:p-6"
          >
            {/* Accent */}
            <span
              aria-hidden="true"
              className="absolute inset-y-5 left-0 w-[3px] rounded-r-full bg-brand-primary"
            />

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-md border border-brand-primary/15 bg-brand-primary-soft px-2.5 py-1.5 font-heading text-[10px] font-bold uppercase tracking-[0.08em] text-brand-primary-dark">
                <span className="size-1.5 rounded-full bg-brand-primary" />
                Venue Information
              </span>
            </div>

            <h3 className="mt-4 font-heading text-[clamp(1.35rem,2vw,1.75rem)] font-extrabold leading-[1.3] tracking-[-0.035em] text-brand-dark">
              International Convention City{" "}
              <span className="text-brand-primary-dark">
                Bashundhara
              </span>
            </h3>

            <div className="mt-3 flex items-center gap-2 text-brand-primary-dark">
              <Icon name="location" className="size-4" />

              <span className="text-[12px] font-bold">
                {event.venue.city}, Bangladesh
              </span>
            </div>

            <p className="mt-3 max-w-[460px] text-[12px] leading-[1.85] text-brand-body sm:text-[13px]">
              ICCB Exhibition Hall is the
              venue listed for the 10th Bangladesh
              Buildcon International Expo 2026.
              Find the location and plan your
              journey using the map.
            </p>

            {/* Info cards */}
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <VenueDetail
                icon="calendar"
                label="Event Dates"
                value={event.dates.display}
              />

              <VenueDetail
                icon="building"
                label="Exhibition Venue"
                value={event.venue.name}
              />
            </div>

            {/* Address */}
            <div className="mt-4 rounded-xl border border-brand-border bg-brand-light p-4">
              <p className="font-heading text-[10px] font-bold uppercase tracking-[0.12em] text-brand-muted">
                Venue Location
              </p>

              <p className="mt-1.5 text-[12px] font-medium leading-[1.75] text-brand-body">
                {event.venue.fullLocation}
              </p>
            </div>

            {/* CTAs */}
            <div className="mt-auto flex flex-wrap gap-3 pt-5">
              <Link
                href="/plan-your-visit"
                className="group inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-brand-primary px-4 py-2.5 font-heading text-[11px] font-bold text-white transition-colors hover:bg-brand-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
              >
                Plan Your Visit

                <span className="transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  <Icon name="arrow" className="size-4" />
                </span>
              </Link>

              {mapLinkUrl && (
                <a
                  href={mapLinkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-brand-border bg-white px-4 py-2.5 font-heading text-[11px] font-bold text-brand-dark transition-colors hover:border-brand-primary/40 hover:text-brand-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
                >
                  Get Directions

                  <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none">
                    <Icon name="external" className="size-4" />
                  </span>
                </a>
              )}
            </div>
          </motion.div>

          {/* RIGHT: GOOGLE MAP */}
          <motion.div
            variants={reveal}
            whileHover={
              reducedMotion ? undefined : { y: -3 }
            }
            transition={{
              duration: 0.28,
              ease: EASE,
            }}
            className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-brand-border bg-white p-2.5 shadow-[0_7px_30px_rgba(5,7,9,0.045)]"
          >
            {/* Map header */}
            <div className="flex items-center justify-between gap-3 px-2 pb-3 pt-1.5 sm:px-3">
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-primary-soft text-brand-primary-dark">
                  <Icon name="location" className="size-4" />
                </span>

                <div className="min-w-0">
                  <p className="font-heading text-[12px] font-bold text-brand-dark">
                    ICCB Exhibition Hall
                  </p>

                  <p className="mt-0.5 text-[10px] text-brand-muted">
                    Dhaka, Bangladesh
                  </p>
                </div>
              </div>

              {mapLinkUrl && (
                <a
                  href={mapLinkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex shrink-0 items-center gap-1.5 text-[11px] font-bold text-brand-primary-dark transition-colors hover:text-brand-primary"
                >
                  Open Map

                  <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none">
                    <Icon name="external" className="size-4" />
                  </span>
                </a>
              )}
            </div>

            {/* Map embed */}
            <div className="relative min-h-[310px] flex-1 overflow-hidden rounded-xl border border-brand-border bg-brand-light sm:min-h-[345px] lg:min-h-[370px]">
              {mapEmbedUrl ? (
                <iframe
                  title="Map showing ICCB Exhibition Hall in Dhaka, Bangladesh"
                  src={mapEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0"
                />
              ) : (
                <div className="flex h-full min-h-[310px] flex-col items-center justify-center gap-3 p-6 text-center">
                  <span className="flex size-12 items-center justify-center rounded-xl bg-brand-primary-soft text-brand-primary-dark">
                    <Icon name="location" />
                  </span>

                  <p className="text-[13px] font-semibold text-brand-dark">
                    ICCB Exhibition Hall, Dhaka
                  </p>

                  <p className="text-[12px] text-brand-muted">
                    View the location on the
                    dedicated venue page.
                  </p>

                  <Link
                    href="/venue"
                    className="text-[12px] font-bold text-brand-primary-dark underline underline-offset-4"
                  >
                    View Venue Details
                  </Link>
                </div>
              )}

              {/* Corner detail */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0 h-9 w-9 rounded-tl-xl border-l-[3px] border-t-[3px] border-brand-primary/70"
              />
            </div>

            {/* Map footer */}
            <div className="flex items-center gap-2 px-2 py-3 sm:px-3">
              <span className="size-1.5 shrink-0 rounded-full bg-brand-primary" />

              <p className="text-[11px] font-medium leading-[1.6] text-brand-muted">
                {event.venue.fullLocation}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
