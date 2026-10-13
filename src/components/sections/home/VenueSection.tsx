
"use client";

import Link from "next/link";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";

/* ==========================================
   VENUE CONFIGURATION
========================================== */

const ICCB_VENUE_NAME =
  "International Convention City Bashundhara (ICCB)";

const ICCB_VENUE_ADDRESS =
  "ICCB Exhibition Hall, 300 Feet Purbachal Express Highway, Dhaka 1229, Bangladesh";

const ICCB_MAP_QUERY = encodeURIComponent(
  ICCB_VENUE_NAME +
    ", " +
    ICCB_VENUE_ADDRESS
);

/* Google Maps Search */
const GOOGLE_MAPS_URL =
  `https://www.google.com/maps/search/?api=1&query=${ICCB_MAP_QUERY}`;

/* Google Maps Embed */
const GOOGLE_MAPS_EMBED_URL =
  `https://maps.google.com/maps?q=${ICCB_MAP_QUERY}&z=16&output=embed`;

/* ==========================================
   ANIMATION SETTINGS
========================================== */

const EASE = [0.22, 1, 0.36, 1] as const;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const revealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 26,
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

/* ==========================================
   SVG ICONS
========================================== */

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

function LocationIcon() {
  return (
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
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="5"
        width="18"
        height="16"
        rx="2"
      />
      <path d="M7 3v4M17 3v4M3 10h18" />
      <path d="M8 15h3M8 18h3" />
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
      className="size-5"
      aria-hidden="true"
    >
      <path d="M4 21V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16" />
      <path d="M2 21h20M8 7h2m4 0h2M8 11h2m4 0h2M8 15h2m4 0h2M10 21v-4h4v4" />
    </svg>
  );
}

/* ==========================================
   ANIMATED INFORMATION CARD
========================================== */

type DetailCardProps = {
  label: string;
  value: string;
  icon: "calendar" | "building";
  reducedMotion: boolean;
};

function DetailCard({
  label,
  value,
  icon,
  reducedMotion,
}: DetailCardProps) {
  return (
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
            "0 6px 20px rgba(5,7,9,0.025)",
        },
        hover: {
          y: -5,
          scale: 1.015,
          boxShadow:
            "0 18px 36px rgba(5,7,9,0.09)",
        },
      }}
      transition={{
        duration: 0.35,
        ease: EASE,
      }}
      className="group relative flex min-w-0 items-center gap-3.5 overflow-hidden rounded-xl border border-brand-dark/10 bg-[#FAFAFC] p-4 transition-colors duration-300 hover:border-brand-primary/35 hover:bg-white"
    >
      {/* Hover glow */}
      <motion.div
        aria-hidden="true"
        variants={{
          rest: { opacity: 0 },
          hover: { opacity: 1 },
        }}
        transition={{
          duration: 0.35,
        }}
        className="pointer-events-none absolute -right-10 -top-10 size-36 rounded-full bg-brand-primary/10 blur-2xl"
      />

      {/* Icon */}
      <motion.div
        variants={{
          rest: {
            rotate: 0,
            scale: 1,
            color: "#BA1D82",
            backgroundColor:
              "rgba(186,29,130,0.09)",
          },
          hover: {
            rotate: -6,
            scale: 1.08,
            color: "#FFFFFF",
            backgroundColor: "#BA1D82",
          },
        }}
        transition={{
          duration: 0.35,
          ease: EASE,
        }}
        className="relative z-10 flex size-11 shrink-0 items-center justify-center rounded-lg"
      >
        {icon === "calendar" ? (
          <CalendarIcon />
        ) : (
          <BuildingIcon />
        )}
      </motion.div>

      {/* Text */}
      <div className="relative z-10 min-w-0">
        <p className="font-heading text-[10px] font-bold uppercase tracking-[0.12em] text-[#9298A2]">
          {label}
        </p>

        <p className="mt-1 font-heading text-[12px] font-bold leading-snug text-brand-dark sm:text-[13px]">
          {value}
        </p>
      </div>

      {/* Animated accent */}
      <motion.div
        aria-hidden="true"
        variants={{
          rest: { scaleX: 0 },
          hover: { scaleX: 1 },
        }}
        transition={{
          duration: 0.45,
          ease: EASE,
        }}
        className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-brand-primary"
      />
    </motion.div>
  );
}

/* ==========================================
   CORRECT ICCB GOOGLE MAP
========================================== */

function VenueMap({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  return (
    <motion.div
      variants={revealVariants}
      className="h-full min-w-0"
    >
      <motion.div
        whileHover={
          reducedMotion
            ? undefined
            : {
                y: -4,
                boxShadow:
                  "0 24px 55px rgba(5,7,9,0.12)",
              }
        }
        transition={{
          duration: 0.4,
          ease: EASE,
        }}
        className="relative flex h-full min-h-[420px] flex-col overflow-hidden rounded-2xl border border-brand-dark/10 bg-white p-2.5 shadow-[0_10px_35px_rgba(5,7,9,0.05)] sm:min-h-[490px] lg:min-h-[550px]"
      >
        {/* Map header */}
        <div className="flex items-center justify-between gap-3 px-3 pb-3 pt-2 sm:px-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
              <LocationIcon />
            </div>

            <div className="min-w-0">
              <p className="font-heading text-[12px] font-bold text-brand-dark sm:text-[13px]">
                ICCB Exhibition Hall
              </p>

              <p className="text-[11px] text-[#7B8390]">
                Dhaka, Bangladesh
              </p>
            </div>
          </div>

          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex shrink-0 items-center gap-1.5 rounded-md px-2 py-2 font-heading text-[11px] font-bold text-brand-primary transition-colors hover:bg-brand-primary/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
          >
            Directions

            <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRightIcon />
            </span>
          </a>
        </div>

        {/* Actual ICCB map */}
        <div className="relative min-h-[330px] flex-1 overflow-hidden rounded-xl bg-[#F1F2F5] sm:min-h-[390px] lg:min-h-[445px]">
          <iframe
            title="Google Map - International Convention City Bashundhara ICCB Exhibition Hall Dhaka"
            src={GOOGLE_MAPS_EMBED_URL}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />

          {/* Corner accents */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 h-14 w-14 rounded-tl-xl border-l-[3px] border-t-[3px] border-brand-primary/60"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 right-0 h-14 w-14 rounded-br-xl border-b-[3px] border-r-[3px] border-brand-primary/60"
          />
        </div>

        {/* Correct venue address */}
        <div className="flex items-center justify-between gap-3 px-3 pb-1 pt-3 sm:px-4">
          <div className="min-w-0">
            <p className="font-heading text-[12px] font-bold text-brand-dark">
              {ICCB_VENUE_NAME}
            </p>

            <p className="mt-1 text-[11px] leading-relaxed text-[#7B8390]">
              300 Feet Purbachal Express Highway,
              Dhaka 1229, Bangladesh
            </p>
          </div>

          <span
            aria-hidden="true"
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary"
          >
            <LocationIcon />
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ==========================================
   MAIN VENUE SECTION
========================================== */

export function VenueSection() {
  const reducedMotion = !!useReducedMotion();

  return (
    <section
      aria-labelledby="venue-section-heading"
      className="relative isolate overflow-hidden border-b border-brand-dark/10 bg-white py-16 text-brand-dark sm:py-20 lg:py-24"
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_92%_10%,rgba(186,29,130,0.05),transparent_45%)]"
      />

      {/* Architectural grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(5,7,9,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(5,7,9,0.025)_1px,transparent_1px)] bg-[size:76px_76px]"
      />

      <Container className="relative z-10">
        {/* Heading */}
        <motion.div
          variants={containerVariants}
          initial={
            reducedMotion ? false : "hidden"
          }
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.3,
          }}
          className="mb-10 max-w-[760px] lg:mb-12"
        >
          <motion.div
            variants={revealVariants}
            className="mb-5 flex items-center gap-3"
          >
            <span className="h-[2px] w-9 bg-brand-primary" />

            <span className="font-heading text-[11px] font-bold uppercase tracking-[0.17em] text-brand-primary">
              Official Event Location
            </span>
          </motion.div>

          <motion.h2
            id="venue-section-heading"
            variants={revealVariants}
            className="font-heading text-[clamp(1.95rem,3.3vw,2.85rem)] leading-[1.16] font-extrabold tracking-[-0.045em] text-brand-dark"
          >
            Discover the{" "}
            <span className="text-brand-primary">
              Exhibition Venue
            </span>
          </motion.h2>

          <motion.p
            variants={revealVariants}
            className="mt-4 max-w-[650px] text-[14px] leading-[1.85] text-[#636C79] sm:text-[15px]"
          >
            Plan your visit with event dates,
            venue information, and an interactive
            map of ICCB Exhibition Hall in Dhaka.
          </motion.p>
        </motion.div>

        {/* Main layout */}
        <motion.div
          variants={containerVariants}
          initial={
            reducedMotion ? false : "hidden"
          }
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.12,
          }}
          className="grid items-stretch gap-6 lg:grid-cols-12 lg:gap-8"
        >
          {/* LEFT: VENUE CONTENT */}
          <motion.div
            variants={revealVariants}
            className="flex min-w-0 flex-col justify-between rounded-2xl border border-brand-dark/10 bg-white p-6 shadow-[0_10px_35px_rgba(5,7,9,0.035)] sm:p-8 lg:col-span-6 lg:p-10"
          >
            <div>
              {/* Venue badge */}
              <motion.div
                initial={
                  reducedMotion
                    ? false
                    : { opacity: 0, x: -14 }
                }
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.65,
                  ease: EASE,
                }}
                className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-brand-primary/15 bg-brand-primary/[0.055] px-3.5 py-2"
              >
                <span
                  aria-hidden="true"
                  className="size-2 rounded-full bg-brand-primary"
                />

                <span className="font-heading text-[10px] font-bold uppercase tracking-[0.15em] text-brand-primary">
                  Venue Information
                </span>
              </motion.div>

              {/* Venue name */}
              <motion.h3
                initial={
                  reducedMotion
                    ? false
                    : { opacity: 0, y: 18 }
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
                className="max-w-[510px] font-heading text-[clamp(1.6rem,2.6vw,2.25rem)] leading-[1.2] font-extrabold tracking-[-0.04em] text-brand-dark"
              >
                {ICCB_VENUE_NAME}
              </motion.h3>

              {/* City */}
              <motion.div
                initial={
                  reducedMotion
                    ? false
                    : { opacity: 0, y: 14 }
                }
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: 0.1,
                  ease: EASE,
                }}
                className="mt-4 flex items-center gap-2.5 text-brand-primary"
              >
                <LocationIcon />

                <span className="font-heading text-[14px] font-bold sm:text-[15px]">
                  {event.venue.city},{" "}
                  {event.venue.country}
                </span>
              </motion.div>

              {/* Venue description */}
              <motion.p
                initial={
                  reducedMotion
                    ? false
                    : { opacity: 0, y: 14 }
                }
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: 0.15,
                  ease: EASE,
                }}
                className="mt-5 max-w-[520px] text-[14px] leading-[1.9] text-[#626C79]"
              >
                {ICCB_VENUE_NAME} is the announced
                exhibition venue for {event.name},
                bringing the building and construction
                industry together in Dhaka.
              </motion.p>

              {/* Information cards */}
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <DetailCard
                  label="Event Dates"
                  value={event.dates.display}
                  icon="calendar"
                  reducedMotion={reducedMotion}
                />

                <DetailCard
                  label="Facility"
                  value="Exhibition Halls"
                  icon="building"
                  reducedMotion={reducedMotion}
                />
              </div>

              {/* Exact address */}
              <motion.div
                initial={
                  reducedMotion
                    ? false
                    : { opacity: 0, y: 15 }
                }
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: 0.15,
                  ease: EASE,
                }}
                className="mt-6 rounded-xl border border-brand-dark/10 bg-[#FAFAFC] px-5 py-4"
              >
                <p className="font-heading text-[10px] font-bold uppercase tracking-[0.13em] text-[#9198A3]">
                  Full Venue Address
                </p>

                <p className="mt-2 text-[13px] font-medium leading-[1.75] text-[#454D59]">
                  {ICCB_VENUE_ADDRESS}
                </p>
              </motion.div>
            </div>

            {/* CTA buttons */}
            <motion.div
              initial={
                reducedMotion
                  ? false
                  : { opacity: 0, y: 18 }
              }
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: 0.2,
                ease: EASE,
              }}
              className="mt-8 flex flex-wrap gap-3 border-t border-brand-dark/10 pt-6"
            >
              <Link
                href="/plan-your-visit"
                className="group inline-flex min-h-11 items-center justify-center gap-2.5 rounded-lg bg-brand-primary px-6 py-3 font-heading text-[12px] font-bold text-white shadow-[0_10px_28px_rgba(186,29,130,0.17)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#9F176D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
              >
                Plan Your Visit

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRightIcon />
                </span>
              </Link>

              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-11 items-center justify-center gap-2.5 rounded-lg border border-brand-dark/15 bg-white px-5 py-3 font-heading text-[12px] font-bold text-brand-dark transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-primary/45 hover:text-brand-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
              >
                Open in Maps

                <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRightIcon />
                </span>
              </a>
            </motion.div>
          </motion.div>

          {/* RIGHT: CORRECT ICCB MAP */}
          <div className="min-w-0 lg:col-span-6">
            <VenueMap reducedMotion={reducedMotion} />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
