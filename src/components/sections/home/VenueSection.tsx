"use client";

import Link from "next/link";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";

const VENUE_NAME =
  "International Convention City Bashundhara (ICCB)";

const VENUE_ADDRESS =
  "Next to 300 Feet Purbachal Express Highway, Dhaka 1229, Bangladesh";

const MAP_LABEL =
  "International Convention City Bashundhara (ICCB), Dhaka, Bangladesh";

const MAP_QUERY = encodeURIComponent(
  `${VENUE_NAME}, ${VENUE_ADDRESS}`
);

const GOOGLE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`;
const GOOGLE_MAPS_EMBED_URL = `https://www.google.com/maps?q=${MAP_QUERY}&z=16&output=embed`;

const EASE = [0.22, 1, 0.36, 1] as const;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.06,
    },
  },
};

const revealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.68,
      ease: EASE,
    },
  },
};

function ArrowRightIcon() {
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
      className="size-4"
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
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
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

function BuildingIcon() {
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
      <path d="M4 21V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16" />
      <path d="M2 21h20M8 7h2m4 0h2M8 11h2m4 0h2M8 15h2m4 0h2M10 21v-4h4v4" />
    </svg>
  );
}

function TinyInfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-brand-dark/10 bg-brand-light px-4 py-3">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#8C93A0]">
            {label}
          </p>
          <p className="mt-1 text-[12px] font-semibold leading-[1.6] text-brand-dark sm:text-[13px]">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

function VenueMap() {
  const reducedMotion = !!useReducedMotion();

  return (
    <motion.div
      variants={revealVariants}
      className="overflow-hidden rounded-2xl border border-brand-dark/10 bg-white shadow-[0_12px_36px_rgba(5,7,9,0.05)]"
    >
      <div className="flex items-center justify-between gap-3 border-b border-brand-dark/10 px-4 py-3 sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
            <LocationIcon />
          </div>

          <div className="min-w-0">
            <p className="truncate text-[12px] font-bold text-brand-dark sm:text-[13px]">
              ICCB Exhibition Hall
            </p>
            <p className="truncate text-[11px] text-[#76808D]">
              Dhaka, Bangladesh
            </p>
          </div>
        </div>

        <a
          href={GOOGLE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-2 text-[11px] font-bold text-brand-primary transition-colors hover:bg-brand-primary/5"
        >
          Directions
          <ArrowUpRightIcon />
        </a>
      </div>

      <motion.div
        whileHover={
          reducedMotion
            ? undefined
            : { scale: 1.01 }
        }
        transition={{
          duration: 0.35,
          ease: EASE,
        }}
        className="relative h-[290px] w-full overflow-hidden sm:h-[340px] lg:h-[370px]"
      >
        <iframe
          title={`Map showing ${MAP_LABEL}`}
          src={GOOGLE_MAPS_EMBED_URL}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full border-0"
        />
      </motion.div>

      <div className="flex items-start justify-between gap-3 px-4 py-3 sm:px-5">
        <div className="min-w-0">
          <p className="text-[12px] font-bold text-brand-dark">
            {VENUE_NAME}
          </p>
          <p className="mt-1 text-[11px] leading-[1.7] text-[#6F7784] sm:text-[12px]">
            {VENUE_ADDRESS}
          </p>
        </div>

        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
          <LocationIcon />
        </span>
      </div>
    </motion.div>
  );
}

export function VenueSection() {
  const reducedMotion = !!useReducedMotion();

  return (
    <section
      aria-labelledby="venue-section-heading"
      className="relative overflow-hidden border-b border-brand-dark/10 bg-white py-12 text-brand-dark sm:py-14 lg:py-16"
    >
      {/* subtle premium background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -right-20 top-0 h-56 w-56 rounded-full bg-brand-primary/[0.05] blur-[90px]" />
        <div className="absolute -left-16 bottom-0 h-44 w-44 rounded-full bg-brand-primary/[0.04] blur-[75px]" />

        <svg
          viewBox="0 0 1200 500"
          fill="none"
          className="absolute inset-0 h-full w-full opacity-[0.12]"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M-50 330C160 260 300 380 520 300C720 228 850 110 1250 210"
            stroke="#BA1D82"
            strokeWidth="1.5"
            initial={reducedMotion ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: reducedMotion ? 0 : 1.8, ease: EASE }}
          />
          <motion.path
            d="M-60 380C190 320 340 420 580 342C810 268 970 155 1250 255"
            stroke="#BA1D82"
            strokeOpacity="0.45"
            strokeWidth="1"
            initial={reducedMotion ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: reducedMotion ? 0 : 2.15,
              delay: reducedMotion ? 0 : 0.12,
              ease: EASE,
            }}
          />
        </svg>
      </div>

      <Container className="relative z-10">
        <motion.div
          variants={containerVariants}
          initial={reducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
          className="mb-8 max-w-[680px] lg:mb-10"
        >
          <motion.div
            variants={revealVariants}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-primary/15 bg-brand-primary/[0.06] px-3 py-1.5"
          >
            <span className="size-2 rounded-full bg-brand-primary" />
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand-primary">
              Official Event Venue
            </span>
          </motion.div>

          <motion.h2
            id="venue-section-heading"
            variants={revealVariants}
            className="font-heading text-[clamp(1.7rem,3.2vw,2.45rem)] font-extrabold leading-[1.15] tracking-[-0.04em] text-brand-dark"
          >
            Venue &{" "}
            <span className="text-brand-primary">
              Location
            </span>
          </motion.h2>

          <motion.p
            variants={revealVariants}
            className="mt-3 max-w-[620px] text-[13px] leading-[1.85] text-[#626C79] sm:text-[14px]"
          >
            Bangladesh Buildcon 2026 will take place at{" "}
            {VENUE_NAME}, one of Dhaka’s leading
            exhibition venues. Explore the exact map
            location, venue address and visit details
            below.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial={reducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:gap-6"
        >
          {/* left panel */}
          <motion.div
            variants={revealVariants}
            className="rounded-2xl border border-brand-dark/10 bg-white p-5 shadow-[0_10px_30px_rgba(5,7,9,0.035)] sm:p-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/15 bg-brand-primary/[0.06] px-3 py-1.5">
              <span className="size-2 rounded-full bg-brand-primary" />
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand-primary">
                Venue Details
              </span>
            </div>

            <h3 className="mt-4 font-heading text-[1.45rem] font-extrabold leading-[1.2] tracking-[-0.03em] text-brand-dark sm:text-[1.7rem]">
              {VENUE_NAME}
            </h3>

            <div className="mt-3 flex items-center gap-2 text-brand-primary">
              <LocationIcon />
              <span className="text-[13px] font-semibold sm:text-[14px]">
                {event.venue.city}, {event.venue.country}
              </span>
            </div>

            <p className="mt-4 text-[13px] leading-[1.85] text-[#626C79] sm:text-[14px]">
              The official exhibition venue offers
              convenient access for exhibitors,
              visitors and trade delegates attending{" "}
              {event.name} on {event.dates.display}.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <TinyInfoCard
                icon={<CalendarIcon />}
                label="Event Dates"
                value={event.dates.display}
              />

              <TinyInfoCard
                icon={<BuildingIcon />}
                label="Venue Facility"
                value="ICCB Exhibition Halls"
              />
            </div>

            <div className="mt-6 rounded-xl border border-brand-dark/10 bg-brand-light px-4 py-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#8C93A0]">
                Full Address
              </p>
              <p className="mt-2 text-[12px] font-medium leading-[1.75] text-[#454D59] sm:text-[13px]">
                {VENUE_ADDRESS}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 border-t border-brand-dark/10 pt-5">
              <Link
                href="/plan-your-visit"
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-brand-primary px-5 py-2.5 text-[12px] font-bold text-white shadow-[0_10px_24px_rgba(186,29,130,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-primary-dark"
              >
                Plan Your Visit
                <ArrowRightIcon />
              </Link>

              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-brand-dark/15 bg-white px-5 py-2.5 text-[12px] font-bold text-brand-dark transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-primary/40 hover:text-brand-primary"
              >
                Open in Maps
                <ArrowUpRightIcon />
              </a>
            </div>
          </motion.div>

          {/* right map */}
          <VenueMap />
        </motion.div>
      </Container>
    </section>
  );
}