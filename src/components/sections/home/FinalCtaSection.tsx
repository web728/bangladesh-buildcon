
"use client";

import Link from "next/link";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";

/* ========================================
   ANIMATION CONFIGURATION
======================================== */

const EASE = [0.22, 1, 0.36, 1] as const;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.12,
    },
  },
};

const revealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: EASE,
    },
  },
};

/* ========================================
   SVG ICONS
======================================== */

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

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-[18px] shrink-0"
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
      className="size-[18px] shrink-0"
      aria-hidden="true"
    >
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

/* ========================================
   ANIMATED ARCHITECTURAL GRAPHIC
======================================== */

function CtaBackgroundGraphic({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
    >
      {/* Main magenta ambient light */}
      <div className="absolute -right-36 -top-48 size-[600px] rounded-full bg-brand-primary/20 blur-[130px]" />

      {/* Subtle left glow */}
      <div className="absolute -bottom-48 -left-32 size-[450px] rounded-full bg-brand-primary/[0.08] blur-[115px]" />

      {/* Architectural grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_left,black,transparent_85%)]" />

      {/* Technical orbit graphic */}
      <svg
        viewBox="0 0 700 700"
        fill="none"
        className="absolute -right-48 top-1/2 h-[600px] w-[600px] -translate-y-1/2 opacity-65 sm:-right-36"
      >
        <motion.g
          animate={
            reducedMotion
              ? undefined
              : { rotate: 360 }
          }
          transition={{
            duration: 90,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            transformOrigin: "350px 350px",
          }}
        >
          <circle
            cx="350"
            cy="350"
            r="275"
            stroke="#BA1D82"
            strokeOpacity="0.5"
            strokeDasharray="3 13"
          />

          <circle
            cx="350"
            cy="75"
            r="6"
            fill="#EA65BB"
          />

          <circle
            cx="350"
            cy="625"
            r="4"
            fill="#FFFFFF"
            fillOpacity="0.5"
          />
        </motion.g>

        <circle
          cx="350"
          cy="350"
          r="218"
          stroke="#FFFFFF"
          strokeOpacity="0.13"
        />

        <circle
          cx="350"
          cy="350"
          r="166"
          stroke="#BA1D82"
          strokeOpacity="0.28"
        />

        <motion.path
          d="M350 132A218 218 0 0 1 568 350"
          stroke="#EA65BB"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={
            reducedMotion
              ? false
              : { pathLength: 0 }
          }
          whileInView={{
            pathLength: 1,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 2,
            ease: EASE,
          }}
        />

        <motion.circle
          cx="350"
          cy="350"
          r="95"
          fill="#BA1D82"
          fillOpacity="0.08"
          animate={
            reducedMotion
              ? undefined
              : {
                  scale: [1, 1.08, 1],
                }
          }
          style={{
            transformOrigin: "350px 350px",
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <path
          d="M280 350h140M350 280v140"
          stroke="#FFFFFF"
          strokeOpacity="0.15"
        />

        <circle
          cx="350"
          cy="350"
          r="8"
          fill="#BA1D82"
        />
      </svg>

      {/* Top magenta line */}
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-brand-primary to-transparent" />
    </div>
  );
}

/* ========================================
   EVENT DETAIL CHIP
======================================== */

function EventDetail({
  icon,
  children,
  reducedMotion,
}: {
  icon: "calendar" | "location";
  children: React.ReactNode;
  reducedMotion: boolean;
}) {
  return (
    <motion.div
      variants={revealVariants}
      whileHover={
        reducedMotion
          ? undefined
          : {
              y: -3,
              backgroundColor:
                "rgba(255,255,255,0.10)",
            }
      }
      transition={{
        duration: 0.3,
        ease: EASE,
      }}
      className="inline-flex max-w-full items-center gap-3 rounded-lg border border-white/[0.11] bg-white/[0.055] px-4 py-3 backdrop-blur-md"
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-primary/15 text-[#F2A8D8]">
        {icon === "calendar" ? (
          <CalendarIcon />
        ) : (
          <LocationIcon />
        )}
      </span>

      <span className="text-[12px] font-semibold leading-[1.6] text-white/85 sm:text-[13px]">
        {children}
      </span>
    </motion.div>
  );
}

/* ========================================
   MAIN FINAL CTA SECTION
======================================== */

export function FinalCtaSection() {
  const reducedMotion = !!useReducedMotion();

  return (
    <section
      aria-labelledby="final-cta-heading"
      className="relative isolate overflow-hidden border-b border-brand-dark/10 bg-[#F9FAFC] py-16 sm:py-20 lg:py-24"
    >
      {/* Subtle exterior grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(5,7,9,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(5,7,9,0.025)_1px,transparent_1px)] bg-[size:76px_76px]"
      />

      <Container className="relative z-10">
        {/* Premium dark CTA panel */}
        <motion.div
          initial={
            reducedMotion
              ? false
              : {
                  opacity: 0,
                  y: 36,
                  scale: 0.97,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.9,
            ease: EASE,
          }}
          className="group relative isolate overflow-hidden rounded-[24px] border border-white/10 bg-[#090A0F] px-6 py-10 text-white shadow-[0_24px_70px_rgba(5,7,9,0.19)] sm:rounded-[28px] sm:px-10 sm:py-12 lg:px-14 lg:py-16"
        >
          <CtaBackgroundGraphic
            reducedMotion={reducedMotion}
          />

          {/* Content layer */}
          <motion.div
            variants={containerVariants}
            initial={
              reducedMotion ? false : "hidden"
            }
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            className="relative z-10 grid items-center gap-9 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12"
          >
            {/* LEFT CONTENT */}
            <div className="min-w-0 max-w-[760px]">
              {/* Eyebrow */}
              <motion.div
                variants={revealVariants}
                className="mb-6 flex items-center gap-3"
              >
                <span className="h-[2px] w-9 bg-brand-primary" />

                <span className="font-heading text-[10px] font-bold uppercase tracking-[0.17em] text-[#F2A8D8] sm:text-[11px]">
                  {event.brandLines.main}
                </span>
              </motion.div>

              {/* Headline */}
              <h2
                id="final-cta-heading"
                className="font-heading text-[clamp(2rem,3.5vw,3.2rem)] leading-[1.15] font-extrabold tracking-[-0.05em] text-white"
              >
                <motion.span
                  variants={revealVariants}
                  className="block"
                >
                  Shape South Asia&apos;s
                </motion.span>

                <motion.span
                  variants={revealVariants}
                  className="block text-[#EA65BB]"
                >
                  Construction Future
                </motion.span>
              </h2>

              {/* Description */}
              <motion.p
                variants={revealVariants}
                className="mt-5 max-w-[620px] text-[14px] leading-[1.85] text-white/65 sm:text-[15px]"
              >
                Connect with trade buyers,
                contractors, and decision-makers at{" "}
                <span className="font-semibold text-white/90">
                  {event.venue.name}
                </span>
                , {event.venue.city}.
              </motion.p>

              {/* Event details */}
              <div className="mt-8 flex flex-wrap gap-3">
                <EventDetail
                  icon="calendar"
                  reducedMotion={reducedMotion}
                >
                  {event.dates.display}
                </EventDetail>

                <EventDetail
                  icon="location"
                  reducedMotion={reducedMotion}
                >
                  {event.venue.fullLocation}
                </EventDetail>
              </div>
            </div>

            {/* RIGHT ACTIONS */}
            <motion.div
              variants={revealVariants}
              className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:min-w-[220px] lg:flex-col"
            >
              {/* Primary CTA */}
              <motion.div
                whileHover={
                  reducedMotion
                    ? undefined
                    : {
                        y: -4,
                        scale: 1.025,
                      }
                }
                whileTap={
                  reducedMotion
                    ? undefined
                    : { scale: 0.97 }
                }
                transition={{
                  duration: 0.3,
                  ease: EASE,
                }}
              >
                <Link
                  href={event.cta.bookStand}
                  className="group/button inline-flex min-h-[52px] w-full items-center justify-between gap-5 rounded-xl bg-brand-primary px-6 py-3.5 font-heading text-[13px] font-bold text-white shadow-[0_12px_30px_rgba(186,29,130,0.26)] transition-colors duration-300 hover:bg-[#A31773] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <span>Book a Stand</span>

                  <span className="transition-transform duration-300 group-hover/button:translate-x-1">
                    <ArrowRightIcon />
                  </span>
                </Link>
              </motion.div>

              {/* Secondary CTA */}
              <motion.div
                whileHover={
                  reducedMotion
                    ? undefined
                    : {
                        y: -4,
                        scale: 1.025,
                      }
                }
                whileTap={
                  reducedMotion
                    ? undefined
                    : { scale: 0.97 }
                }
                transition={{
                  duration: 0.3,
                  ease: EASE,
                }}
              >
                <Link
                  href={event.cta.registerVisit}
                  className="group/button inline-flex min-h-[52px] w-full items-center justify-between gap-5 rounded-xl border border-white/20 bg-white/[0.07] px-6 py-3.5 font-heading text-[13px] font-bold text-white backdrop-blur-md transition-colors duration-300 hover:border-brand-primary/60 hover:bg-white/[0.12] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <span>Register to Visit</span>

                  <span className="transition-transform duration-300 group-hover/button:translate-x-1 group-hover/button:-translate-y-1">
                    <ArrowUpRightIcon />
                  </span>
                </Link>
              </motion.div>

              {/* Supporting note */}
              <motion.p
                variants={revealVariants}
                className="pt-2 text-center text-[11px] font-medium leading-relaxed text-white/45 lg:text-left"
              >
                Explore exhibition participation
                and visitor registration.
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Bottom architectural detail */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-0 h-[3px] w-32 bg-brand-primary"
          />
        </motion.div>
      </Container>
    </section>
  );
}
