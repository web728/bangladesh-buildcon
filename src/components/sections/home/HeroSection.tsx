
"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { event } from "@/config/event";

/* ==========================================
   ANIMATION
========================================== */

const EASE = [0.22, 1, 0.36, 1] as const;

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const reveal: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: EASE,
    },
  },
};

/* ==========================================
   ICONS
========================================== */

type IconName =
  | "arrow"
  | "external"
  | "calendar"
  | "location"
  | "building"
  | "network";

function Icon({
  name,
  className = "size-5",
}: {
  name: IconName;
  className?: string;
}) {
  const paths: Record<IconName, ReactNode> = {
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    external: <path d="M7 17 17 7M8 7h9v9" />,
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
    building: (
      <>
        <path d="M3 21h18M5 21V5h10v16M15 10h5v11" />
        <path d="M8 9h4M8 13h4M8 17h4" />
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
  };

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
      {paths[name]}
    </svg>
  );
}

/* ==========================================
   ARCHITECTURAL SVG BACKGROUND
========================================== */

function HeroBackground({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_15%,rgba(237,28,36,0.055),transparent_48%)]" />

      <svg
        viewBox="0 0 1440 760"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 size-full"
      >
        <defs>
          <pattern
            id="home-architectural-grid"
            width="58"
            height="58"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M58 0H0V58"
              stroke="#050709"
              strokeOpacity="0.055"
              strokeWidth="0.8"
            />
          </pattern>

          <linearGradient
            id="home-construction-line"
            x1="280"
            y1="80"
            x2="1260"
            y2="660"
            gradientUnits="userSpaceOnUse"
          >
            <stop
              offset="0"
              stopColor="#ED1C24"
              stopOpacity="0"
            />
            <stop
              offset="0.5"
              stopColor="#ED1C24"
              stopOpacity="0.28"
            />
            <stop
              offset="1"
              stopColor="#ED1C24"
              stopOpacity="0"
            />
          </linearGradient>
        </defs>

        <rect
          width="1440"
          height="760"
          fill="url(#home-architectural-grid)"
        />

        {/* Technical perspective lines */}
        {[0, 1, 2, 3, 4].map((index) => (
          <motion.path
            key={index}
            d={`M ${760 + index * 85} 760 L ${
              1070 + index * 85
            } 0`}
            stroke="url(#home-construction-line)"
            strokeWidth="1.2"
            initial={
              reducedMotion
                ? false
                : {
                    pathLength: 0,
                    opacity: 0,
                  }
            }
            animate={{
              pathLength: 1,
              opacity: 1,
            }}
            transition={{
              duration: reducedMotion ? 0 : 1.5,
              delay: reducedMotion
                ? 0
                : 0.25 + index * 0.1,
              ease: EASE,
            }}
          />
        ))}

        {/* Blueprint geometry */}
        <motion.g
          initial={
            reducedMotion
              ? false
              : { opacity: 0, x: 24 }
          }
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: reducedMotion ? 0 : 1.2,
            ease: EASE,
          }}
        >
          <path
            d="M1030 110h310v310h-310z"
            stroke="#ED1C24"
            strokeOpacity="0.11"
            strokeWidth="1.5"
          />
          <path
            d="M1080 160h210v210h-210z"
            stroke="#304090"
            strokeOpacity="0.11"
          />
          <path
            d="M1030 265h310M1185 110v310"
            stroke="#050709"
            strokeOpacity="0.08"
            strokeDasharray="6 8"
          />
          <circle
            cx="1185"
            cy="265"
            r="100"
            stroke="#ED1C24"
            strokeOpacity="0.12"
          />
          <circle
            cx="1185"
            cy="265"
            r="150"
            stroke="#ED1C24"
            strokeOpacity="0.07"
            strokeDasharray="7 12"
          />
        </motion.g>

        {/* Construction crane silhouette */}
        <g
          stroke="#050709"
          strokeOpacity="0.065"
          strokeWidth="1.6"
          strokeLinejoin="round"
        >
          <path d="M875 620V120M860 620h30" />
          <path d="M830 120h430M875 120l80-42" />
          <path d="M875 120 830 170M955 120l-80 90" />
          <path d="m875 160 45 45-45 45 45 45-45 45" />
          <path d="M1170 120v180m-14 0h28m-14 0v36" />
        </g>
      </svg>
    </div>
  );
}

/* ==========================================
   VERIFIED EXHIBITION FEATURES
========================================== */

const highlights = [
  {
    icon: "building",
    text: "Building & Construction Industry",
  },
  {
    icon: "network",
    text: "B2B Matchmaking",
  },
] as const;

/* ==========================================
   HOME HERO
========================================== */

export function HeroSection() {
  const reducedMotion = !!useReducedMotion();

  return (
    <section
      aria-labelledby="home-hero-heading"
      className="relative isolate overflow-hidden bg-white text-brand-dark"
    >
      <HeroBackground reducedMotion={reducedMotion} />

      <div className="relative z-10 mx-auto grid w-full max-w-[1320px] grid-cols-1 items-center gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:min-h-[640px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12 lg:px-10 lg:py-16 xl:gap-16 xl:px-14">
        {/* =====================================
            LEFT CONTENT
        ====================================== */}

        <motion.div
          variants={stagger}
          initial={reducedMotion ? false : "hidden"}
          animate="visible"
          className="relative z-10 min-w-0"
        >
          {/* Edition eyebrow */}
          <motion.div
            variants={reveal}
            className="mb-5 flex flex-wrap items-center gap-3"
          >
            <span
              aria-hidden="true"
              className="h-[2px] w-9 bg-brand-primary"
            />

            <span className="font-heading text-[11px] font-extrabold uppercase tracking-[0.16em] text-brand-primary-dark">
              10th International Edition · 2026
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            id="home-hero-heading"
            variants={reveal}
            className="max-w-[610px] font-heading text-[clamp(2.15rem,4vw,3.65rem)] font-extrabold leading-[1.08] tracking-[-0.05em] text-brand-dark"
          >
            Bangladesh{" "}
            <span className="text-brand-primary-dark">
              Buildcon
            </span>
            <span className="block">
              International Expo
            </span>
            <span className="mt-2 block text-[0.63em] font-bold leading-[1.3] tracking-[-0.035em] text-brand-body">
              Building & Construction Industry · 2026
            </span>
          </motion.h1>

          {/* Event schedule */}
          <motion.div
            variants={reveal}
            className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3"
          >
            <div className="inline-flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-lg bg-brand-primary-soft text-brand-primary-dark">
                <Icon
                  name="calendar"
                  className="size-4"
                />
              </span>

              <span className="font-heading text-[15px] font-extrabold tracking-[-0.02em] text-brand-dark sm:text-[17px]">
                {event.dates.display}
              </span>
            </div>

            <div className="inline-flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-lg bg-brand-primary-soft text-brand-primary-dark">
                <Icon
                  name="location"
                  className="size-4"
                />
              </span>

              <span className="text-[13px] font-bold text-brand-body sm:text-[14px]">
                {event.venue.name},{" "}
                {event.venue.city}
              </span>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={reveal}
            className="mt-6 max-w-[535px] text-[14px] leading-[1.9] text-brand-body sm:text-[15px]"
          >
            Discover construction machinery,
            building materials, engineering
            technologies, interior and exterior
            products, and safety solutions.
            Explore the exhibition programme
            featuring international exhibitors,
            product demonstrations, B2B
            matchmaking and technical seminars.
          </motion.p>

          {/* Brochure-aligned highlights */}
          <motion.div
            variants={reveal}
            className="mt-5 flex flex-wrap gap-2"
          >
            {highlights.map((highlight) => (
              <span
                key={highlight.text}
                className="inline-flex items-center gap-2 rounded-lg border border-brand-border bg-brand-light px-3 py-2 text-[11px] font-semibold text-brand-body"
              >
                <span className="text-brand-primary-dark">
                  <Icon
                    name={highlight.icon}
                    className="size-4"
                  />
                </span>

                {highlight.text}
              </span>
            ))}
          </motion.div>

          {/* Call-to-action buttons */}
          <motion.div
            variants={reveal}
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            <Link
              href={event.cta.bookStand}
              className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-brand-primary px-6 py-3 font-heading text-[13px] font-bold text-white shadow-[0_10px_25px_rgba(237,28,36,0.15)] transition-[background-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-brand-primary-dark hover:shadow-[0_14px_30px_rgba(237,28,36,0.23)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary motion-reduce:transform-none motion-reduce:transition-none"
            >
              Book a Stand

              <span className="transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                <Icon
                  name="external"
                  className="size-4"
                />
              </span>
            </Link>

            <Link
              href={event.cta.registerVisit}
              className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-lg border border-brand-border bg-white px-6 py-3 font-heading text-[13px] font-bold text-brand-dark transition-colors duration-300 hover:border-brand-primary/45 hover:text-brand-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
            >
              Register to Visit

              <span className="transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                <Icon
                  name="arrow"
                  className="size-4"
                />
              </span>
            </Link>
          </motion.div>

          {/* Informational footer */}
          <motion.p
            variants={reveal}
            className="mt-5 text-[11px] leading-[1.8] text-brand-muted"
          >
            Organised by Futurex Trade Fair &amp;
            Events Pvt. Ltd. and ASK Trade &amp;
            Exhibitions Pvt. Ltd.
          </motion.p>
        </motion.div>

        {/* =====================================
            RIGHT IMAGE SHOWCASE
        ====================================== */}

        <motion.div
          initial={
            reducedMotion
              ? false
              : {
                  opacity: 0,
                  x: 32,
                  scale: 0.97,
                }
          }
          animate={{
            opacity: 1,
            x: 0,
            scale: 1,
          }}
          transition={{
            duration: reducedMotion ? 0 : 0.95,
            delay: reducedMotion ? 0 : 0.12,
            ease: EASE,
          }}
          className="relative min-w-0"
        >
          <div className="group relative overflow-hidden rounded-2xl bg-brand-dark shadow-[0_24px_65px_rgba(5,7,9,0.15)]">
            {/* Red top accent */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 z-20 h-[4px] bg-brand-primary"
            />

            <div className="relative h-[340px] overflow-hidden sm:h-[445px] lg:h-[530px]">
              <motion.div
                className="absolute inset-0"
                initial={
                  reducedMotion
                    ? false
                    : { scale: 1.06 }
                }
                animate={{ scale: 1 }}
                transition={{
                  duration: reducedMotion ? 0 : 1.5,
                  ease: EASE,
                }}
              >
                <Image
                  src="/images/home/bangladesh-buildcon-hero.jpg"
                  alt="Construction and building industry visual for Bangladesh Buildcon International Expo 2026"
                  fill
                  priority
                  sizes="(min-width: 1024px) 48vw, (min-width: 640px) 85vw, 100vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.035] motion-reduce:transform-none motion-reduce:transition-none"
                />
              </motion.div>

              {/* Subtle black overlay */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/10 to-brand-dark/5"
              />

              {/* Small edition label */}
              <div className="absolute left-5 top-5 z-10">
                <span className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-brand-dark/75 px-3 py-2 font-heading text-[10px] font-extrabold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
                  <span className="size-1.5 rounded-full bg-brand-primary" />
                  10th Edition · 2026
                </span>
              </div>

              {/* Image caption */}
              <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-7">
                <motion.div
                  initial={
                    reducedMotion
                      ? false
                      : { opacity: 0, y: 16 }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: reducedMotion ? 0 : 0.7,
                    delay: reducedMotion ? 0 : 0.5,
                    ease: EASE,
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="mb-4 block h-[3px] w-10 bg-brand-primary"
                  />

                  <p className="font-heading text-[23px] font-extrabold leading-[1.25] tracking-[-0.035em] text-white sm:text-[29px]">
                    The Building &amp; Construction
                    Industry
                  </p>

                  <p className="mt-3 flex items-center gap-2 text-[12px] font-semibold text-white/85 sm:text-[13px]">
                    <Icon
                      name="location"
                      className="size-4 shrink-0 text-red-300"
                    />
                    ICCB Exhibition Hall, Dhaka
                  </p>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Decorative corner */}
          <div
            aria-hidden="true"
            className="absolute -bottom-2 -right-2 -z-10 size-20 rounded-br-2xl border-b-2 border-r-2 border-brand-primary/45"
          />
        </motion.div>
      </div>
    </section>
  );
}
