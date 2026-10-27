
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { event } from "@/config/event";

const EASE = [0.22, 1, 0.36, 1] as const;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.15,
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
      duration: 0.75,
      ease: EASE,
    },
  },
};

function ArrowIcon() {
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
      className="size-4 shrink-0"
      aria-hidden="true"
    >
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

/* -----------------------------------------
   MINIMAL BACKGROUND SVG
------------------------------------------ */

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
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_5%_85%,rgba(186,29,130,0.055),transparent_45%)]" />

      <svg
        viewBox="0 0 1440 700"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 size-full"
      >
        <defs>
          <linearGradient
            id="buildcon-hero-line"
            x1="0"
            y1="0"
            x2="1440"
            y2="700"
            gradientUnits="userSpaceOnUse"
          >
            <stop
              offset="0"
              stopColor="#BA1D82"
              stopOpacity="0"
            />
            <stop
              offset="0.45"
              stopColor="#BA1D82"
              stopOpacity="0.3"
            />
            <stop
              offset="1"
              stopColor="#BA1D82"
              stopOpacity="0"
            />
          </linearGradient>
        </defs>

        {[0, 1, 2, 3].map((index) => (
          <motion.path
            key={index}
            d={`
              M -100 ${550 + index * 23}
              C 260 ${405 + index * 15},
                480 ${660 + index * 9},
                810 ${505 + index * 18}
              S 1240 ${400 + index * 16},
                1540 ${510 + index * 20}
            `}
            stroke="url(#buildcon-hero-line)"
            strokeWidth="1.4"
            initial={
              reducedMotion
                ? false
                : { pathLength: 0, opacity: 0 }
            }
            animate={{
              pathLength: 1,
              opacity: 1,
            }}
            transition={{
              duration: 1.7,
              delay: 0.25 + index * 0.2,
              ease: EASE,
            }}
          />
        ))}

        <motion.circle
          cx="1390"
          cy="110"
          r="255"
          stroke="#BA1D82"
          strokeOpacity="0.12"
          strokeDasharray="6 12"
          animate={
            reducedMotion
              ? undefined
              : { rotate: 360 }
          }
          style={{
            transformOrigin: "1390px 110px",
          }}
          transition={{
            duration: 80,
            ease: "linear",
            repeat: Infinity,
          }}
        />

        <circle
          cx="1390"
          cy="110"
          r="340"
          stroke="#304090"
          strokeOpacity="0.07"
        />
      </svg>
    </div>
  );
}

/* -----------------------------------------
   HERO SECTION
------------------------------------------ */

export function HeroSection() {
  const reducedMotion = !!useReducedMotion();

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-[#FAF9FB] text-brand-dark"
    >
      <HeroBackground reducedMotion={reducedMotion} />

      <div
        className="
          relative z-10
          mx-auto grid
          w-full max-w-[1320px]
          grid-cols-1 items-center
          gap-9 px-5 py-10
          sm:px-8 sm:py-12
          lg:min-h-[min(600px,calc(100svh-80px))]
          lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]
          lg:gap-12 lg:px-10 lg:py-10
          xl:gap-16 xl:px-14
        "
      >
        {/* LEFT CONTENT */}
        <motion.div
          variants={containerVariants}
          initial={reducedMotion ? false : "hidden"}
          animate="visible"
          className="relative z-10 min-w-0"
        >
          {/* Eyebrow */}
          <motion.div
            variants={revealVariants}
            className="mb-5 flex items-center gap-3"
          >
            <span
              aria-hidden="true"
              className="h-[2px] w-8 bg-brand-primary"
            />

            <span className="font-heading text-[11px] font-bold uppercase tracking-[0.16em] text-brand-primary">
              {event.shortName}
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            id="hero-heading"
            variants={revealVariants}
            className="
              max-w-[550px]
              font-heading
              text-[clamp(2rem,3.5vw,3rem)]
              leading-[1.12]
              font-extrabold
              tracking-[-0.045em]
              text-brand-dark
            "
          >
            {event.name}
          </motion.h1>

          {/* Event Date */}
          <motion.div
            variants={revealVariants}
            className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2"
          >
            <span className="font-heading text-[clamp(1.3rem,2.1vw,1.85rem)] font-extrabold tracking-[-0.04em] text-brand-primary">
              {event.dates.display}
            </span>

            <span
              aria-hidden="true"
              className="hidden h-6 w-px bg-brand-dark/15 sm:block"
            />

            <span className="text-xs font-semibold text-brand-dark/60 sm:text-sm">
              {event.venue.city}, Bangladesh
            </span>
          </motion.div>

          {/* Animated Brand Line */}
          <motion.div
            variants={revealVariants}
            aria-hidden="true"
            className="mt-6 h-[3px] w-24 overflow-hidden rounded-full bg-brand-primary/10"
          >
            <motion.div
              className="h-full w-full origin-left bg-brand-primary"
              initial={
                reducedMotion
                  ? false
                  : { scaleX: 0 }
              }
              animate={{ scaleX: 1 }}
              transition={{
                duration: 0.9,
                delay: 0.65,
                ease: EASE,
              }}
            />
          </motion.div>

          {/* Verified Event Description */}
          <motion.p
            variants={revealVariants}
            className="mt-5 max-w-[490px] text-[14px] leading-[1.8] text-[#59606B] sm:text-[15px]"
          >
            {event.descriptor}
          </motion.p>

          {/* Event Venue */}
          <motion.div
            variants={revealVariants}
            className="mt-5 flex items-center gap-2.5 text-brand-dark/75"
          >
            <span className="text-brand-primary">
              <LocationIcon />
            </span>

            <span className="text-[13px] font-semibold">
              {event.venue.name}, {event.venue.city}
            </span>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={revealVariants}
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            <motion.div
              whileHover={
                reducedMotion ? undefined : { y: -3 }
              }
              whileTap={
                reducedMotion
                  ? undefined
                  : { scale: 0.97 }
              }
            >
              <Link
                href={event.cta.bookStand}
                className="
                  group inline-flex min-h-11
                  items-center justify-center gap-3
                  rounded-lg bg-brand-primary
                  px-6 py-3
                  font-heading text-[13px] font-bold
                  text-white
                  shadow-[0_10px_25px_rgba(186,29,130,0.20)]
                  transition-colors duration-300
                  hover:bg-brand-primary-dark
                "
              >
                Book a Stand

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowUpRightIcon />
                </span>
              </Link>
            </motion.div>

            <motion.div
              whileHover={
                reducedMotion ? undefined : { y: -3 }
              }
              whileTap={
                reducedMotion
                  ? undefined
                  : { scale: 0.97 }
              }
            >
              <Link
                href={event.cta.registerVisit}
                className="
                  group inline-flex min-h-11
                  items-center justify-center gap-3
                  rounded-lg border border-brand-dark/15
                  bg-white px-6 py-3
                  font-heading text-[13px] font-bold
                  text-brand-dark
                  transition-colors duration-300
                  hover:border-brand-primary
                  hover:text-brand-primary
                "
              >
                Register to Visit

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowIcon />
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* RIGHT IMAGE SHOWCASE */}
        <motion.div
          initial={
            reducedMotion
              ? false
              : {
                  opacity: 0,
                  x: 38,
                  scale: 0.97,
                }
          }
          animate={{
            opacity: 1,
            x: 0,
            scale: 1,
          }}
          transition={{
            duration: 1,
            delay: 0.2,
            ease: EASE,
          }}
          className="relative min-w-0"
        >
          <div className="group relative overflow-hidden rounded-2xl bg-brand-dark shadow-[0_22px_60px_rgba(5,7,9,0.13)]">

            {/* Image */}
            <div className="relative h-[300px] overflow-hidden sm:h-[380px] lg:h-[450px]">
              <motion.div
                className="absolute inset-0"
                initial={
                  reducedMotion
                    ? false
                    : { scale: 1.08 }
                }
                animate={{
                  scale: 1,
                }}
                transition={{
                  duration: 1.8,
                  delay: 0.2,
                  ease: EASE,
                }}
              >
                <Image
                  src="/images/home/bangladesh-buildcon-hero.jpg"
                  alt="Bangladesh Buildcon International Expo"
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.035]"
                />
              </motion.div>

            

              {/* Image bottom gradient */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-t from-[#050709]/95 via-[#050709]/40 to-transparent" />

             
            </div>
          </div>

          {/* Decorative brand corner */}
          <div
            aria-hidden="true"
            className="absolute -bottom-2 -right-2 -z-10 h-20 w-20 rounded-br-2xl border-b-2 border-r-2 border-brand-primary/45"
          />
        </motion.div>
      </div>
    </section>
  );
}
