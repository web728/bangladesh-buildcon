
"use client";

import Link from "next/link";
import {
  useRef,
  type PointerEvent,
} from "react";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";

import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";

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
      duration: 0.65,
      ease: EASE,
    },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.05,
    },
  },
};

/* ==========================================
   SVG ICONS
========================================== */

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

function NetworkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
      aria-hidden="true"
    >
      <circle cx="12" cy="4.5" r="2" />
      <circle cx="5" cy="18" r="2" />
      <circle cx="19" cy="18" r="2" />
      <path d="m11 6.5-5 9.5m7-9.5 5 9.5M7 18h10" />
    </svg>
  );
}

function InnovationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
      aria-hidden="true"
    >
      <path d="M9 18h6m-5 4h4" />
      <path d="M8 14a7 7 0 1 1 8 0c-1 .9-1.5 1.7-1.5 4h-5C9.5 15.7 9 14.9 8 14Z" />
      <path d="M12 6v4m-2 0h4" />
    </svg>
  );
}

function QuoteIcon() {
  return (
    <svg
      viewBox="0 0 40 32"
      fill="currentColor"
      className="h-7 w-9 text-brand-primary sm:h-8 sm:w-10"
      aria-hidden="true"
    >
      <path d="M0 32V16C0 6 6 0 17 0v7C11 7 8 10 8 16h9v16H0Zm22 0V16C22 6 28 0 39 0v7c-6 0-9 3-9 9h9v16H22Z" />
    </svg>
  );
}

/* ==========================================
   PREMIUM INTERACTIVE QUOTE CARD

   Refined from original design:
   - very subtle 3D tilt
   - no infinite rotation
   - no magenta glow
   - reduced-motion support
========================================== */

function QuoteCard({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const springConfig = {
    stiffness: 110,
    damping: 24,
    mass: 0.7,
  };

  const smoothX = useSpring(pointerX, springConfig);
  const smoothY = useSpring(pointerY, springConfig);

  const rotateX = useTransform(
    smoothY,
    [-0.5, 0.5],
    [2.5, -2.5]
  );

  const rotateY = useTransform(
    smoothX,
    [-0.5, 0.5],
    [-3, 3]
  );

  function handlePointerMove(
    event: PointerEvent<HTMLDivElement>
  ) {
    if (
      reducedMotion ||
      event.pointerType !== "mouse"
    ) {
      return;
    }

    const rect =
      event.currentTarget.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) /
        rect.width -
      0.5;

    const y =
      (event.clientY - rect.top) /
        rect.height -
      0.5;

    pointerX.set(x);
    pointerY.set(y);
  }

  function handlePointerLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <div
      ref={cardRef}
      className="h-full"
      style={{ perspective: "1100px" }}
    >
      <motion.div
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{
          rotateX: reducedMotion ? 0 : rotateX,
          rotateY: reducedMotion ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        className="group relative flex h-full min-h-[300px] flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-brand-dark p-6 text-white shadow-[0_16px_45px_rgba(5,7,9,0.15)] sm:min-h-[330px] sm:p-8 lg:p-9"
      >
        {/* Subtle technical grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:42px_42px]"
        />

        {/* Architectural line illustration */}
        <svg
          viewBox="0 0 480 380"
          fill="none"
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -bottom-8 h-[85%] w-[85%] opacity-50"
        >
          <path
            d="M145 350V110L250 45l105 65v240"
            stroke="#FFFFFF"
            strokeOpacity="0.10"
            strokeWidth="1.3"
          />

          <path
            d="M180 350V130l70-43 70 43v220"
            stroke="#ED1C24"
            strokeOpacity="0.32"
            strokeWidth="1.3"
          />

          <path
            d="M145 170h210M145 230h210M145 290h210"
            stroke="#FFFFFF"
            strokeOpacity="0.09"
          />

          <path
            d="M250 45v305M145 110l210 240M355 110 145 350"
            stroke="#ED1C24"
            strokeOpacity="0.14"
            strokeDasharray="5 8"
          />

          <circle
            cx="250"
            cy="190"
            r="125"
            stroke="#ED1C24"
            strokeOpacity="0.15"
            strokeDasharray="7 10"
          />
        </svg>

        {/* Top content */}
        <div className="relative z-10">
          <div className="mb-7 flex items-center justify-between gap-3">
            <span className="h-[3px] w-12 bg-brand-primary" />

            <span className="font-heading text-[10px] font-bold uppercase tracking-[0.15em] text-white/45">
              Bangladesh Buildcon 2026
            </span>
          </div>

          <QuoteIcon />

          <p className="mt-5 max-w-[400px] font-heading text-[clamp(1.25rem,2.1vw,1.8rem)] font-semibold leading-[1.46] tracking-[-0.035em] text-white">
            Connecting construction{" "}
            <span className="text-red-300">
              products, technology
            </span>{" "}
            and people in one industry-focused
            exhibition.
          </p>
        </div>

        {/* Bottom information */}
        <div className="relative z-10 mt-8 flex flex-wrap items-end justify-between gap-4 border-t border-white/15 pt-5">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45">
              Exhibition Venue
            </p>

            <p className="mt-1.5 font-heading text-[12px] font-bold text-white/90 sm:text-[13px]">
              {event.venue.name}
            </p>

            <p className="mt-1 text-[11px] text-white/55">
              {event.venue.city}, Bangladesh
            </p>
          </div>

          <span
            aria-hidden="true"
            className="flex size-10 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-red-300"
          >
            <ArrowIcon diagonal />
          </span>
        </div>

        {/* Refined bottom line */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[3px] bg-brand-primary"
        />
      </motion.div>
    </div>
  );
}

/* ==========================================
   FEATURE CARD
========================================== */

function FeatureCard({
  icon,
  title,
  description,
  reducedMotion,
}: {
  icon: "network" | "innovation";
  title: string;
  description: string;
  reducedMotion: boolean;
}) {
  return (
    <motion.div
      whileHover={
        reducedMotion
          ? undefined
          : { y: -3 }
      }
      transition={{
        duration: 0.25,
        ease: EASE,
      }}
      className="group flex min-w-0 items-start gap-3.5 rounded-xl border border-brand-border bg-brand-light p-4 transition-[border-color,box-shadow] duration-300 hover:border-brand-primary/30 hover:shadow-[0_8px_25px_rgba(5,7,9,0.045)]"
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-brand-primary/10 bg-brand-primary-soft text-brand-primary-dark transition-colors group-hover:bg-brand-primary group-hover:text-white">
        {icon === "network" ? (
          <NetworkIcon />
        ) : (
          <InnovationIcon />
        )}
      </span>

      <div className="min-w-0">
        <h3 className="font-heading text-[13px] font-bold leading-[1.45] text-brand-dark">
          {title}
        </h3>

        <p className="mt-1.5 text-[12px] leading-[1.7] text-brand-body">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

/* ==========================================
   MAIN INTRO SECTION
========================================== */

export function IntroSection() {
  const reducedMotion = !!useReducedMotion();

  const scrollProps = {
    initial: reducedMotion ? false : "hidden",
    whileInView: "visible" as const,
    viewport: {
      once: true,
      amount: 0.1,
    },
  };

  return (
    <section
      aria-labelledby="intro-heading"
      className="relative isolate overflow-hidden bg-white py-14 text-brand-dark sm:py-16 lg:py-[76px]"
    >
      {/* Very subtle background accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-brand-primary/[0.025] blur-[90px]"
      />

      <Container className="relative z-10">
        {/* Header */}
        <motion.div
          {...scrollProps}
          variants={stagger}
          className="mb-8 max-w-[790px] sm:mb-9"
        >
          <motion.div
            variants={reveal}
            className="flex items-center gap-2.5"
          >
            <span className="h-[2px] w-8 bg-brand-primary" />

            <span className="font-heading text-[10px] font-extrabold uppercase tracking-[0.17em] text-brand-primary-dark">
              About the Exhibition
            </span>
          </motion.div>

          <motion.h2
            id="intro-heading"
            variants={reveal}
            className="mt-3 font-heading text-[clamp(1.8rem,3vw,2.6rem)] font-extrabold leading-[1.18] tracking-[-0.045em] text-brand-dark"
          >
            Where the{" "}
            <span className="text-brand-primary-dark">
              Building &amp; Construction
            </span>{" "}
            Industry Connects
          </motion.h2>

          <motion.p
            variants={reveal}
            className="mt-3 max-w-[690px] text-[13px] leading-[1.85] text-brand-body sm:text-[14px]"
          >
            Discover an international exhibition
            focused on construction machinery,
            building materials, engineering
            technologies and industry connections.
          </motion.p>
        </motion.div>

        {/* Main two-column layout */}
        <motion.div
          {...scrollProps}
          variants={stagger}
          className="grid items-stretch gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-9"
        >
          {/* LEFT — DARK EDITORIAL CARD */}
          <motion.div variants={reveal}>
            <QuoteCard
              reducedMotion={reducedMotion}
            />
          </motion.div>

          {/* RIGHT — EVENT INTRO */}
          <motion.div
            variants={reveal}
            className="flex min-w-0 flex-col justify-between py-1"
          >
            <div>
              <div className="flex items-center gap-2.5">
                <span className="inline-flex rounded-md bg-brand-primary-soft px-2.5 py-1.5 font-heading text-[10px] font-extrabold uppercase tracking-[0.1em] text-brand-primary-dark">
                  10th Edition
                </span>

                <span className="text-[11px] font-medium text-brand-muted">
                  17–19 September 2026
                </span>
              </div>

              <h3 className="mt-4 font-heading text-[clamp(1.25rem,2vw,1.7rem)] font-extrabold leading-[1.35] tracking-[-0.035em] text-brand-dark">
                Discover Bangladesh&apos;s
                Building &amp; Construction
                Exhibition
              </h3>

              <p className="mt-3 text-[13px] leading-[1.85] text-brand-body sm:text-[14px]">
                <strong className="font-semibold text-brand-dark">
                  {event.name}
                </strong>{" "}
                is scheduled for{" "}
                <strong className="font-semibold text-brand-dark">
                  {event.dates.display}
                </strong>{" "}
                at{" "}
                <strong className="font-semibold text-brand-dark">
                  {event.venue.fullLocation}
                </strong>
                .
              </p>

              <p className="mt-3 text-[13px] leading-[1.85] text-brand-body sm:text-[14px]">
                The exhibition brings together
                construction product manufacturers,
                suppliers, distributors and industry
                professionals, with a focus on
                product discovery and business
                interaction.
              </p>

              {/* Supporting features */}
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <FeatureCard
                  icon="network"
                  title="Industry Networking"
                  description="International exhibitors, country pavilions and B2B matchmaking."
                  reducedMotion={reducedMotion}
                />

                <FeatureCard
                  icon="innovation"
                  title="Product Discovery"
                  description="Live demonstrations, product launches and technical seminars."
                  reducedMotion={reducedMotion}
                />
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/about"
                className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-brand-primary px-5 py-3 font-heading text-[12px] font-bold text-white transition-colors hover:bg-brand-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
              >
                Explore Event Details

                <span className="transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  <ArrowIcon diagonal />
                </span>
              </Link>

              <Link
                href={event.cta.bookStand}
                className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-brand-border bg-white px-5 py-3 font-heading text-[12px] font-bold text-brand-dark transition-colors hover:border-brand-primary/40 hover:text-brand-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
              >
                Book a Stand

                <span className="transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  <ArrowIcon />
                </span>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
