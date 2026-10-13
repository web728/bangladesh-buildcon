
"use client";

import Link from "next/link";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";

/* =========================================
   MOTION CONFIG
========================================= */

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
      duration: 0.65,
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

/* =========================================
   ORIGINAL VENUE ADVANTAGES
========================================= */

const VENUE_ADVANTAGES = [
  {
    num: "01",
    tag: "Official 2026 Venue",
    title: "Established Dhaka Exhibition Complex",
    desc: "ICCB is the official venue named in the 2026 brochure, bringing exhibitors, trade buyers, contractors, developers, architects, and engineers together in Dhaka.",
    icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z",
  },
  {
    num: "02",
    tag: "Business Access",
    title: "Connected to Bangladesh's Commercial Hub",
    desc: "The Dhaka location supports direct access to the country's largest concentration of construction buyers, distributors, consultants, and project decision-makers.",
    icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    num: "03",
    tag: "Exhibition Ready",
    title: "Dedicated Exhibition Halls",
    desc: "The event programme supports product showcases, live demonstrations, supplier discovery, and focused B2B meetings.",
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  },
  {
    num: "04",
    tag: "Visitor Convenience",
    title: "Transit & Hospitality Corridor",
    desc: "Visitors can reach the venue by taxi or ride-hailing services from central Dhaka and Hazrat Shahjalal International Airport.",
    icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  },
];

/* =========================================
   EVENT FACTS
========================================= */

const VENUE_METRICS = [
  {
    label: "Official Dates",
    value: event.dates.display,
    detail: "Exhibition Schedule",
  },
  {
    label: "Venue Complex",
    value: event.venue.name,
    detail: "Official Venue",
  },
  {
    label: "City / Country",
    value: `${event.venue.city}, Bangladesh`,
    detail: "South Asia",
  },
  {
    label: "Event Format",
    value: event.format,
    detail: "Exhibition Programme",
  },
  {
    label: "Primary Industry",
    value: event.industry,
    detail: "Industry Focus",
  },
  {
    label: "Transit Connectivity",
    value: "Airport & Central Corridors",
    detail: "Travel Access",
  },
];

/* =========================================
   ICONS
========================================= */

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

function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5 shrink-0"
      aria-hidden="true"
    >
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
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
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="5"
        width="18"
        height="16"
        rx="2"
      />
      <path d="M8 3v4m8-4v4M3 10h18" />
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
      <span className="h-[2px] w-7 shrink-0 bg-brand-primary" />

      <span className="font-heading text-[10px] font-extrabold uppercase tracking-[0.17em] text-[#981568]">
        {children}
      </span>
    </div>
  );
}

/* =========================================
   VENUE ADVANTAGE CARD
========================================= */

function VenueAdvantageCard({
  advantage,
  reducedMotion,
}: {
  advantage: (typeof VENUE_ADVANTAGES)[number];
  reducedMotion: boolean;
}) {
  return (
    <motion.article
      variants={reveal}
      whileHover={
        reducedMotion
          ? undefined
          : { y: -5 }
      }
      transition={{
        duration: 0.3,
        ease: EASE,
      }}
      className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-[#E0E3EA] bg-white p-5 shadow-[0_5px_22px_rgba(5,7,9,0.035)] transition-[border-color,box-shadow] duration-300 hover:border-brand-primary/35 hover:shadow-[0_15px_35px_rgba(5,7,9,0.08)]"
    >
      {/* Top accent on hover */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-brand-primary transition-transform duration-500 group-hover:scale-x-100"
      />

      <div className="flex items-start justify-between">
        <div className="flex size-11 items-center justify-center rounded-xl bg-brand-primary/[0.08] text-brand-primary transition-colors duration-300 group-hover:bg-brand-primary group-hover:text-white">
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
            <path d={advantage.icon} />
          </svg>
        </div>

        <span className="font-heading text-[11px] font-extrabold tabular-nums text-[#757E8D]">
          {advantage.num}
        </span>
      </div>

      <p className="mt-5 font-heading text-[10px] font-bold uppercase tracking-[0.1em] text-[#981568]">
        {advantage.tag}
      </p>

      <h3 className="mt-2 font-heading text-[15px] font-extrabold leading-[1.45] tracking-[-0.025em] text-[#171B24]">
        {advantage.title}
      </h3>

      <p className="mt-3 text-[12px] leading-[1.85] text-[#414957]">
        {advantage.desc}
      </p>

      <div className="mt-auto border-t border-[#EAECF1] pt-4">
        <span className="text-[10px] font-semibold uppercase tracking-[0.09em] text-[#981568]">
          Venue & Logistics
        </span>
      </div>
    </motion.article>
  );
}

/* =========================================
   MAIN VENUE VIEW
========================================= */

export function VenueClientView() {
  const reducedMotion = !!useReducedMotion();

  const mapSearchQuery = encodeURIComponent(
    `${event.venue.name}, ${event.venue.city}, Bangladesh`
  );

  const googleMapsUrl =
    event.venue.mapLinkUrl ||
    `https://maps.google.com/?q=${mapSearchQuery}`;

  const scrollReveal = {
    initial: reducedMotion ? false : "hidden",
    whileInView: "visible" as const,
    viewport: {
      once: true,
      amount: 0.12,
    },
  };

  return (
    <div className="relative overflow-hidden bg-[#F8F9FB] py-12 text-[#171B24] selection:bg-brand-primary selection:text-white sm:py-16">
      {/* Minimal architectural grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(5,7,9,0.018)_1px,transparent_1px),linear-gradient(to_bottom,rgba(5,7,9,0.018)_1px,transparent_1px)] bg-[size:68px_68px]"
      />

      <Container className="relative z-10">
        {/* ===================================
            01 - VENUE INTRO & LOCATION MAP
        ==================================== */}

        <section
          aria-labelledby="venue-overview-heading"
          className="grid items-stretch gap-5 border-b border-[#E0E4EA] pb-12 lg:grid-cols-12 lg:gap-6"
        >
          {/* Venue information */}
          <motion.div
            {...scrollReveal}
            variants={reveal}
            className="flex min-w-0 flex-col rounded-2xl border border-[#E0E4EA] bg-white p-6 shadow-[0_8px_28px_rgba(5,7,9,0.035)] lg:col-span-6 sm:p-8"
          >
            <Eyebrow>
              Official Trade Fair Venue
            </Eyebrow>

            <h2
              id="venue-overview-heading"
              className="mt-4 font-heading text-[clamp(1.65rem,2.7vw,2.35rem)] font-extrabold leading-[1.18] tracking-[-0.045em] text-[#171B24]"
            >
              {event.venue.name}
            </h2>

            <p className="mt-2 font-heading text-[13px] font-bold text-[#981568]">
              {event.venue.city}, Bangladesh
            </p>

            <p className="mt-5 max-w-[610px] text-[13px] leading-[1.95] text-[#414957] sm:text-[14px]">
              {event.name} takes place at{" "}
              <strong className="font-semibold text-[#242B36]">
                {event.venue.name}
              </strong>
              , bringing together construction
              manufacturers, equipment suppliers,
              trade buyers and industry professionals
              in Bangladesh&apos;s capital.
            </p>

            <p className="mt-3 max-w-[610px] text-[13px] leading-[1.85] text-[#414957]">
              Find the exhibition location on the
              map, review the event schedule and plan
              your journey before arriving.
            </p>

            {/* Venue detail capsules */}
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-[#E5E8EE] bg-[#F9FAFC] p-4">
                <span className="flex items-center gap-2 text-[#981568]">
                  <CalendarIcon />

                  <span className="font-heading text-[10px] font-bold uppercase tracking-[0.1em]">
                    Event Dates
                  </span>
                </span>

                <p className="mt-2 font-heading text-[13px] font-extrabold text-[#171B24]">
                  {event.dates.display}
                </p>
              </div>

              <div className="rounded-xl border border-[#E5E8EE] bg-[#F9FAFC] p-4">
                <span className="flex items-center gap-2 text-[#981568]">
                  <PinIcon />

                  <span className="font-heading text-[10px] font-bold uppercase tracking-[0.1em]">
                    Location
                  </span>
                </span>

                <p className="mt-2 font-heading text-[13px] font-extrabold text-[#171B24]">
                  {event.venue.city}, Bangladesh
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-auto flex flex-wrap items-center gap-3 border-t border-[#E9EBF0] pt-6 sm:mt-7">
              <Link
                href="/plan-your-visit"
                className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-brand-primary px-5 py-3 font-heading text-[12px] font-bold text-white shadow-[0_8px_22px_rgba(186,29,130,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#981568]"
              >
                Plan Your Visit

                <span className="transition-transform group-hover:translate-x-1">
                  <ArrowIcon />
                </span>
              </Link>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#D8DCE5] bg-white px-5 py-3 font-heading text-[12px] font-bold text-[#333B47] transition-colors hover:border-brand-primary/40 hover:text-[#981568]"
              >
                Open Google Maps
                <ArrowIcon diagonal />
              </a>
            </div>
          </motion.div>

          {/* Google Maps card */}
          <motion.div
            {...scrollReveal}
            variants={reveal}
            className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[#E0E4EA] bg-white p-2.5 shadow-[0_8px_28px_rgba(5,7,9,0.035)] lg:col-span-6"
          >
            <div className="relative min-h-[330px] flex-1 overflow-hidden rounded-xl bg-[#E9ECF1] sm:min-h-[390px]">
              {event.venue.mapEmbedUrl ? (
                <iframe
                  title={`Google Map of ${event.venue.name}, ${event.venue.city}`}
                  src={event.venue.mapEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0"
                />
              ) : (
                <div className="flex h-full min-h-[330px] flex-col items-center justify-center gap-4 p-6 text-center">
                  <span className="flex size-12 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                    <PinIcon />
                  </span>

                  <p className="font-heading text-[14px] font-bold text-[#171B24]">
                    {event.venue.name}
                  </p>

                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[12px] font-bold text-[#981568] underline underline-offset-4"
                  >
                    View location on Google Maps
                  </a>
                </div>
              )}

              {/* Floating map label */}
              <div className="pointer-events-none absolute bottom-4 left-4 right-4 max-w-fit rounded-lg border border-white/80 bg-white/95 px-4 py-3 shadow-[0_8px_26px_rgba(0,0,0,0.12)] backdrop-blur-md">
                <p className="font-heading text-[12px] font-extrabold text-[#171B24]">
                  {event.venue.name}
                </p>

                <p className="mt-1 text-[11px] font-semibold text-[#4D5663]">
                  {event.venue.city}, Bangladesh
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ===================================
            02 - VENUE ADVANTAGES
        ==================================== */}

        <section
          aria-labelledby="venue-advantages-heading"
          className="pt-12 sm:pt-14"
        >
          <motion.div
            {...scrollReveal}
            variants={reveal}
            className="flex flex-col gap-4 border-b border-[#E0E4EA] pb-6 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <Eyebrow>
                Infrastructure & Access
              </Eyebrow>

              <h2
                id="venue-advantages-heading"
                className="mt-3 font-heading text-[clamp(1.5rem,2.5vw,2.1rem)] font-extrabold leading-[1.2] tracking-[-0.04em] text-[#171B24]"
              >
                Venue{" "}
                <span className="text-[#981568]">
                  Advantages
                </span>
              </h2>
            </div>

            <p className="max-w-[380px] text-[13px] leading-[1.85] text-[#414957]">
              Exhibition facilities, business access
              and visitor connectivity at the Dhaka
              event location.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial={reducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.08,
            }}
            className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {VENUE_ADVANTAGES.map((advantage) => (
              <VenueAdvantageCard
                key={advantage.num}
                advantage={advantage}
                reducedMotion={reducedMotion}
              />
            ))}
          </motion.div>
        </section>

        {/* ===================================
            03 - VENUE FACTS
        ==================================== */}

        <section
          aria-labelledby="venue-details-heading"
          className="mt-12 sm:mt-14"
        >
          <motion.div
            {...scrollReveal}
            variants={reveal}
            className="overflow-hidden rounded-2xl border border-[#E0E4EA] bg-white shadow-[0_8px_32px_rgba(5,7,9,0.035)]"
          >
            <div className="flex flex-col gap-4 border-b border-[#E8EAF0] px-5 py-6 sm:flex-row sm:items-end sm:justify-between sm:px-7">
              <div>
                <Eyebrow>
                  Official Event Information
                </Eyebrow>

                <h2
                  id="venue-details-heading"
                  className="mt-3 font-heading text-[20px] font-extrabold tracking-[-0.035em] text-[#171B24] sm:text-[24px]"
                >
                  Location &{" "}
                  <span className="text-[#981568]">
                    Event Details
                  </span>
                </h2>
              </div>

              <div className="flex flex-wrap gap-2.5">
                <Link
                  href="/exhibit"
                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-[#DBDFE6] bg-[#FAFAFC] px-4 py-2.5 font-heading text-[11px] font-bold text-[#313A47] transition-colors hover:border-brand-primary/35 hover:text-[#981568]"
                >
                  Why Exhibit
                  <ArrowIcon diagonal />
                </Link>

                <Link
                  href={event.cta.bookStand}
                  className="inline-flex min-h-10 items-center justify-center rounded-lg bg-brand-primary px-4 py-2.5 font-heading text-[11px] font-bold text-white transition-colors hover:bg-[#981568]"
                >
                  Book a Stand
                </Link>
              </div>
            </div>

            {/* Event facts matrix */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3">
              {VENUE_METRICS.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={
                    reducedMotion
                      ? false
                      : { opacity: 0, y: 12 }
                  }
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: (index % 3) * 0.065,
                    ease: EASE,
                  }}
                  className="group relative min-w-0 border-b border-[#EAECF1] p-5 transition-colors hover:bg-brand-primary/[0.025] sm:p-6"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-heading text-[10px] font-bold uppercase tracking-[0.12em] text-[#5C6573]">
                      {metric.label}
                    </span>

                    <span className="font-heading text-[10px] font-bold tabular-nums text-[#981568]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <p className="mt-4 font-heading text-[14px] font-extrabold leading-[1.5] text-[#171B24]">
                    {metric.value}
                  </p>

                  <p className="mt-1 text-[11px] font-semibold text-[#596371]">
                    {metric.detail}
                  </p>

                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-brand-primary transition-transform duration-300 group-hover:scale-x-100"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ===================================
            04 - FINAL BOOKING CTA
        ==================================== */}

        <motion.section
          {...scrollReveal}
          variants={reveal}
          aria-labelledby="venue-booking-heading"
          className="relative mt-10 overflow-hidden rounded-2xl border border-brand-primary/20 bg-[#F6EDF3] p-5 sm:p-7"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 size-52 rounded-full bg-brand-primary/10 blur-[75px]"
          />

          <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                <PinIcon />
              </span>

              <div>
                <h2
                  id="venue-booking-heading"
                  className="font-heading text-[15px] font-extrabold text-[#171B24] sm:text-[17px]"
                >
                  Exhibit at {event.venue.name}
                </h2>

                <p className="mt-1.5 text-[12px] leading-[1.75] text-[#414957]">
                  {event.dates.display} ·{" "}
                  {event.venue.city}, Bangladesh.
                  Contact the team to enquire about
                  stand participation.
                </p>
              </div>
            </div>

            <Link
              href={event.cta.bookStand}
              className="group inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-brand-primary px-6 py-3 font-heading text-[12px] font-bold text-white shadow-[0_8px_22px_rgba(186,29,130,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#981568] sm:w-auto"
            >
              Book Stand Space

              <span className="transition-transform group-hover:translate-x-1">
                <ArrowIcon />
              </span>
            </Link>
          </div>
        </motion.section>
      </Container>
    </div>
  );
}
