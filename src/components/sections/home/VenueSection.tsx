"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { motion, useReducedMotion, type Variants } from "framer-motion";

import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";

/* ==========================================
   ICCB LOCATION

   Official address:
   Next to 300 ft. Purbachal Express Highway,
   Dhaka 1229, Bangladesh.

   Coordinates cross-checked against
   independent map references.

   Do not replace this with a broad
   "Dhaka" or combined address query.
========================================== */

const VENUE_NAME = "International Convention City Bashundhara (ICCB)";

const VENUE_LAT = 23.8276;
const VENUE_LNG = 90.42718;

const VENUE_COORDINATES = `${VENUE_LAT},${VENUE_LNG}`;

// Exact mapped point for the embedded map.
const GOOGLE_MAP_EMBED =
  `https://maps.google.com/maps?` +
  `q=${encodeURIComponent(VENUE_COORDINATES)}` +
  `&z=16&output=embed`;

// Directions to the same point.
const GOOGLE_DIRECTIONS =
  "https://www.google.com/maps/dir/?api=1" +
  `&destination=${encodeURIComponent(VENUE_COORDINATES)}` +
  "&travelmode=driving";

// Business listing search by name, for visitors
// who want Google Maps' venue information.
const GOOGLE_VENUE_SEARCH =
  "https://www.google.com/maps/search/?api=1" +
  `&query=${encodeURIComponent(VENUE_NAME + ", Dhaka, Bangladesh")}`;

/* ==========================================
   MOTION
========================================== */

const EASE = [0.22, 1, 0.36, 1] as const;

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

const reveal: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: EASE,
    },
  },
};

/* ==========================================
   ICONS
========================================== */

function MapPinIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M7 3v4M17 3v4M3 10h18" />
    </svg>
  );
}

function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
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

function BuildingIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      aria-hidden="true"
    >
      <path d="M4 21V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16" />
      <path d="M2 21h20M8 7h2m4 0h2M8 11h2m4 0h2M8 15h2m4 0h2M10 21v-4h4v4" />
    </svg>
  );
}

/* ==========================================
   SMALL DETAIL ITEM
========================================== */

function Detail({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: ReactNode;
}) {
  return (
    <div className="flex min-w-0 items-start gap-2.5 rounded-lg border border-[#EBE7EC] bg-[#FBFAFC] p-3">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#F8EAF3] text-brand-primary">
        {icon}
      </span>

      <div className="min-w-0">
        <p className="font-heading text-[10px] font-bold uppercase tracking-[0.08em] text-[#88818B]">
          {label}
        </p>

        <p className="mt-1 font-heading text-[12px] font-bold leading-[1.55] text-brand-dark">
          {value}
        </p>
      </div>
    </div>
  );
}

/* ==========================================
   GOOGLE MAP

   Explicit coordinate-based map:
   23.8276, 90.42718
========================================== */

function VenueMap() {
  return (
    <motion.div
      variants={reveal}
      className="min-w-0 overflow-hidden rounded-xl border border-[#E8E3EA] bg-white shadow-[0_8px_30px_rgba(5,7,9,0.045)]"
    >
      {/* Map toolbar */}
      <div className="flex items-center justify-between gap-3 border-b border-[#EEE9EF] px-4 py-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#F8EAF3] text-brand-primary">
            <MapPinIcon />
          </span>

          <div className="min-w-0">
            <h3 className="truncate font-heading text-[12px] font-extrabold text-brand-dark">
              ICCB, Dhaka
            </h3>

            <p className="text-[10px] font-medium text-[#827B86]">
              Venue location
            </p>
          </div>
        </div>

        <a
          href={GOOGLE_DIRECTIONS}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-lg border border-brand-primary/20 px-3 py-2 font-heading text-[11px] font-bold text-brand-primary transition-colors hover:bg-[#F8EAF3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
        >
          Directions
          <ArrowIcon diagonal />
        </a>
      </div>

      {/* Google Maps iframe */}
      <div className="relative h-[270px] w-full bg-[#F3F3F5] sm:h-[320px] lg:h-[340px]">
        <iframe
          title={`Google Maps location of ${VENUE_NAME}`}
          src={GOOGLE_MAP_EMBED}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>

      {/* Map footer */}
      <div className="flex items-start justify-between gap-3 px-4 py-3.5">
        <div className="min-w-0">
          <p className="font-heading text-[12px] font-bold leading-snug text-brand-dark">
            {VENUE_NAME}
          </p>
        </div>

        <a
          href={GOOGLE_VENUE_SEARCH}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View ICCB on Google Maps"
          title="View ICCB on Google Maps"
          className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#F8EAF3] text-brand-primary transition-colors hover:bg-brand-primary hover:text-white"
        >
          <ArrowIcon diagonal />
        </a>
      </div>
    </motion.div>
  );
}

/* ==========================================
   VENUE SECTION
========================================== */

export function VenueSection() {
  const reducedMotion = !!useReducedMotion();

  return (
    <section
      aria-labelledby="venue-section-heading"
      className="relative overflow-hidden border-b border-[#EEE9EF] bg-white py-11 text-brand-dark sm:py-14 lg:py-16"
    >
      <Container>
        {/* Section heading */}
        <motion.div
          variants={stagger}
          initial={reducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.1,
          }}
          className="mb-7 max-w-[760px] sm:mb-8"
        >
          <motion.div
            variants={reveal}
            className="mb-3 flex items-center gap-2.5"
          >
            <span aria-hidden="true" className="h-[2px] w-7 bg-brand-primary" />

            <span className="font-heading text-[10px] font-extrabold uppercase tracking-[0.13em] text-brand-primary">
              Official Event Location
            </span>
          </motion.div>

          <motion.h2
            id="venue-section-heading"
            variants={reveal}
            className="font-heading text-[clamp(1.65rem,3vw,2.35rem)] font-extrabold leading-[1.2] tracking-[-0.04em] text-brand-dark"
          >
            Venue & <span className="text-brand-primary">Location</span>
          </motion.h2>

          <motion.p
            variants={reveal}
            className="mt-2.5 max-w-[650px] text-[13px] leading-[1.75] text-[#67616C] sm:text-[14px]"
          >
            Find the venue, check its location and plan your visit to{" "}
            {event.name}.
          </motion.p>
        </motion.div>

        {/* Information + map */}
        <motion.div
          variants={stagger}
          initial={reducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.06,
          }}
          className="grid items-start gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-6"
        >
          {/* Venue information */}
          <motion.div
            variants={reveal}
            className="min-w-0 rounded-xl border border-[#E8E3EA] bg-white p-5 shadow-[0_8px_30px_rgba(5,7,9,0.035)] sm:p-6"
          >
            <div className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-lg bg-[#F8EAF3] text-brand-primary">
                <BuildingIcon />
              </span>

              <span className="font-heading text-[10px] font-bold uppercase tracking-[0.11em] text-brand-primary">
                Exhibition Venue
              </span>
            </div>

            <h3 className="mt-4 font-heading text-[clamp(1.3rem,2.3vw,1.75rem)] font-extrabold leading-[1.3] tracking-[-0.035em] text-brand-dark">
              {VENUE_NAME}
            </h3>

            <p className="mt-3 flex items-center gap-2 text-[12px] font-semibold text-brand-primary sm:text-[13px]">
              <MapPinIcon />
              Dhaka, Bangladesh
            </p>

            {/* Correct official address */}
            <div className="mt-5 rounded-lg border border-[#EEE9EF] bg-[#FBFAFC] px-4 py-3.5">
              <p className="font-heading text-[10px] font-bold uppercase tracking-[0.1em] text-[#847C87]">
                Official Venue Address
              </p>
            </div>

            {/* Event facts */}
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Detail
                label="Event Dates"
                value={event.dates.display}
                icon={<CalendarIcon />}
              />

              <Detail
                label="Venue"
                value="ICCB Expo Villages"
                icon={<BuildingIcon />}
              />
            </div>

            {/* CTAs */}
            <div className="mt-5 flex flex-wrap gap-2.5">
              <Link
                href="/plan-your-visit"
                className="group inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-brand-primary px-4 py-2.5 font-heading text-[12px] font-bold text-white transition-colors hover:bg-brand-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
              >
                Plan Your Visit
                <span className="transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transform-none">
                  <ArrowIcon />
                </span>
              </Link>

              <a
                href={GOOGLE_DIRECTIONS}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-[#DFD8E1] bg-white px-4 py-2.5 font-heading text-[12px] font-bold text-brand-dark transition-colors hover:border-brand-primary hover:text-brand-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
              >
                Get Directions
                <span className="transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transform-none">
                  <ArrowIcon diagonal />
                </span>
              </a>
            </div>
          </motion.div>

          <VenueMap />
        </motion.div>
      </Container>
    </section>
  );
}
