
"use client";

import { useEffect, useRef } from "react";

import {
  motion,
  useInView,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

import {
  marketFacts,
  opportunityCategories,
  type MarketFact,
} from "@/data/marketFacts";

/* ==========================================
   BRAND COLORS
========================================== */

const COLORS = {
  primary: "#BA1D82",
  primaryDark: "#981469",
  pinkLight: "#DE76B9",
  blue: "#304090",
  blueDark: "#243273",
  background: "#151418",
  card: "#1D1B21",
  white: "#FFFFFF",
};

const EASE = [0.22, 1, 0.36, 1] as const;

/* ==========================================
   ORIGINAL STAGGER ANIMATIONS
========================================== */

const containerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: EASE,
    },
  },
};

/* ==========================================
   SVG ICONS
========================================== */

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

function GrowthIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-[17px]"
      aria-hidden="true"
    >
      <path d="M13 7h8m0 0v8m0-8-8 8-4-4-6 6" />
    </svg>
  );
}

/* ==========================================
   SPRING ANIMATED COUNTER
========================================== */

function AnimatedCounter({
  value,
}: {
  value: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  const reducedMotion = !!useReducedMotion();

  const inView = useInView(ref, {
    once: true,
    margin: "-30px",
  });

  const numericMatch = value.match(/[\d,.]+/);

  const number = numericMatch
    ? Number(numericMatch[0].replace(/,/g, ""))
    : 0;

  const start = numericMatch?.index ?? 0;

  const prefix = numericMatch
    ? value.slice(0, start)
    : "";

  const suffix = numericMatch
    ? value.slice(start + numericMatch[0].length)
    : "";

  const decimals = numericMatch?.[0].includes(".")
    ? numericMatch[0].split(".")[1].length
    : 0;

  const spring = useSpring(0, {
    stiffness: 45,
    damping: 18,
    restDelta: 0.01,
  });

  const displayValue = useTransform(
    spring,
    (latest) => {
      const formatted = latest.toLocaleString(
        "en-US",
        {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }
      );

      return `${prefix}${formatted}${suffix}`;
    }
  );

  useEffect(() => {
    if (inView) {
      spring.set(number);
    }
  }, [inView, number, spring]);

  if (!numericMatch) {
    return <span>{value}</span>;
  }

  return (
    <span
      ref={ref}
      className="tabular-nums"
    >
      {reducedMotion ? (
        value
      ) : inView ? (
        <motion.span>
          {displayValue}
        </motion.span>
      ) : (
        `${prefix}${(0).toFixed(decimals)}${suffix}`
      )}
    </span>
  );
}

/* ==========================================
   LARGE ORIGINAL ANIMATED FAN SVG

   - Original 800x800 viewBox
   - 75s rotating orbit
   - 3 breathing sectors
   - Pulsing central node
   - Solid brand colors only
   - NO GRADIENTS
========================================== */

function BangladeshMarketGraphic() {
  const reducedMotion = !!useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none absolute
        -right-[24%] top-1/2 z-0
        h-[650px] w-[650px]
        -translate-y-1/2
        select-none opacity-40
        sm:-right-[17%]
        sm:h-[780px] sm:w-[780px]
        md:-right-[12%]
        md:opacity-50
        lg:-right-[5%]
        xl:-right-[3%]
      "
    >
      <svg
        viewBox="0 0 800 800"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        fill="none"
      >
        {/* Static architectural outer rings */}
        <circle
          cx="400"
          cy="400"
          r="348"
          stroke={COLORS.white}
          strokeWidth="1"
          strokeOpacity="0.07"
        />

        <circle
          cx="400"
          cy="400"
          r="290"
          stroke={COLORS.primary}
          strokeWidth="1"
          strokeOpacity="0.2"
          strokeDasharray="3 12"
        />

        {/* ORIGINAL ROTATING ORBIT */}
        <motion.g
          animate={
            reducedMotion
              ? undefined
              : { rotate: 360 }
          }
          transition={{
            duration: 75,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            transformOrigin: "400px 400px",
          }}
        >
          <path
            d="M180 210 A320 320 0 0 1 620 210"
            stroke={COLORS.white}
            strokeOpacity="0.28"
            strokeWidth="1.2"
          />

          <circle
            cx="280"
            cy="140"
            r="6"
            fill={COLORS.primary}
          />

          <circle
            cx="580"
            cy="170"
            r="8"
            fill={COLORS.pinkLight}
          />

          <path
            d="M130 340 A320 320 0 0 1 360 90"
            stroke={COLORS.white}
            strokeOpacity="0.22"
            strokeWidth="1"
          />

          <circle
            cx="160"
            cy="270"
            r="9"
            fill={COLORS.pinkLight}
          />

          <circle
            cx="165"
            cy="400"
            r="8"
            fill={COLORS.primary}
          />

          <path
            d="M480 680 A320 320 0 0 0 710 510"
            stroke={COLORS.white}
            strokeOpacity="0.25"
            strokeWidth="1"
          />

          <circle
            cx="560"
            cy="620"
            r="8"
            fill={COLORS.blue}
          />
        </motion.g>

        {/* TOP FAN — PRIMARY PINK */}
        <motion.path
          d="M400 400 L275 100 A340 340 0 0 1 525 100 Z"
          fill={COLORS.primary}
          opacity="0.94"
          animate={
            reducedMotion
              ? undefined
              : {
                  scale: [1, 1.018, 1],
                }
          }
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            transformOrigin: "400px 400px",
          }}
        />

        {/* RIGHT STRUCTURAL SECTOR */}
        <motion.polygon
          points="465,370 655,80 655,470"
          fill={COLORS.blue}
          opacity="0.85"
          animate={
            reducedMotion
              ? undefined
              : {
                  scale: [1, 1.015, 1],
                }
          }
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.4,
          }}
          style={{
            transformOrigin: "400px 400px",
          }}
        />

        {/* BOTTOM-LEFT FAN — DARK PINK */}
        <motion.path
          d="M400 400 L95 475 A330 330 0 0 0 270 710 Z"
          fill={COLORS.primaryDark}
          opacity="0.95"
          animate={
            reducedMotion
              ? undefined
              : {
                  scale: [1, 1.02, 1],
                }
          }
          transition={{
            duration: 6.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2,
          }}
          style={{
            transformOrigin: "400px 400px",
          }}
        />

        {/* Inner nested sectors */}
        <path
          d="M400 400 L210 340 A205 205 0 0 0 280 560 Z"
          fill={COLORS.blueDark}
          opacity="0.88"
        />

        <path
          d="M400 400 L510 480 A205 205 0 0 1 465 565 Z"
          fill={COLORS.primary}
          opacity="0.75"
        />

        {/* Central rings */}
        <circle
          cx="400"
          cy="400"
          r="140"
          stroke={COLORS.white}
          strokeOpacity="0.3"
          strokeWidth="1.5"
        />

        <circle
          cx="400"
          cy="400"
          r="125"
          stroke={COLORS.white}
          strokeWidth="3.5"
        />

        {/* OUTER PULSING RING */}
        <motion.circle
          cx="400"
          cy="400"
          r="118"
          stroke={COLORS.pinkLight}
          strokeWidth="2"
          strokeOpacity="0.3"
          animate={
            reducedMotion
              ? undefined
              : {
                  opacity: [0.25, 0.65, 0.25],
                  scale: [1, 1.06, 1],
                }
          }
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            transformOrigin: "400px 400px",
          }}
        />

        {/* ORIGINAL CENTRAL PULSE */}
        <motion.circle
          cx="400"
          cy="400"
          r="105"
          fill={COLORS.primary}
          animate={
            reducedMotion
              ? undefined
              : {
                  r: [105, 109, 105],
                  fill: [
                    COLORS.primary,
                    COLORS.primaryDark,
                    COLORS.primary,
                  ],
                }
          }
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>
    </div>
  );
}

/* ==========================================
   ANIMATED MARKET CARD
========================================== */

function MarketFactCard({
  fact,
}: {
  fact: MarketFact;
}) {
  const reducedMotion = !!useReducedMotion();

  return (
    <motion.article
      variants={itemVariants}
      whileHover={
        reducedMotion
          ? undefined
          : {
              y: -4,
            }
      }
      transition={{
        duration: 0.3,
        ease: EASE,
      }}
      className="
        group relative flex min-w-0
        flex-col justify-between
        overflow-hidden rounded-xl
        border border-white/10
        bg-[#1D1B21]/90 p-5
        shadow-[0_8px_26px_rgba(0,0,0,0.1)]
        backdrop-blur-md
        transition-[border-color,background-color,box-shadow]
        duration-300
        hover:border-brand-primary/45
        hover:bg-[#252028]
        hover:shadow-[0_16px_35px_rgba(0,0,0,0.18)]
      "
    >
      <div>
        

        {/* Animated number */}
        <div className="mt-4 font-heading text-[clamp(1.8rem,2.5vw,2.25rem)] font-extrabold leading-none tracking-[-0.045em] text-white">
          <AnimatedCounter value={fact.value} />
        </div>

        {/* Label */}
        <h3 className="mt-3 font-heading text-[12px] font-bold leading-[1.5] text-[#DFA0CA] sm:text-[13px]">
          {fact.label}
        </h3>

        {/* Supporting text */}
        {fact.detail && (
          <p className="mt-2 line-clamp-2 text-[11px] leading-[1.75] text-white/60 sm:text-[12px]">
            {fact.detail}
          </p>
        )}
      </div>
 

      {/* Animated bottom accent */}
      <span
        aria-hidden="true"
        className="
          pointer-events-none absolute
          inset-x-0 bottom-0 h-[2px]
          origin-left scale-x-0
          bg-brand-primary
          transition-transform duration-300
          group-hover:scale-x-100
          motion-reduce:transition-none
        "
      />
    </motion.article>
  );
}

/* ==========================================
   SEAMLESS CONTINUOUS MARQUEE
========================================== */

function FocusAreasMarquee() {
  const reducedMotion = !!useReducedMotion();

  return (
    <motion.div
      initial={
        reducedMotion
          ? false
          : {
              opacity: 0,
              y: 20,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true }}
      transition={{
        duration: reducedMotion ? 0 : 0.6,
        delay: reducedMotion ? 0 : 0.2,
        ease: EASE,
      }}
      className="
        relative mt-8 flex min-w-0
        items-center overflow-hidden
        rounded-xl border border-white/10
        bg-[#201C23]/90 py-3.5
        backdrop-blur-md
      "
    >
      {/* Fixed left title */}
      <div className="relative z-10 flex shrink-0 items-center gap-2 border-r border-white/15 bg-[#201C23] py-1 pl-4 pr-4">
        <span className="relative flex size-2">
          {!reducedMotion && (
            <span className="absolute inset-0 animate-ping rounded-full bg-brand-primary opacity-45" />
          )}

          <span className="relative size-2 rounded-full bg-brand-primary" />
        </span>

        <span className="whitespace-nowrap font-heading text-[10px] font-extrabold uppercase tracking-[0.12em] text-white/80 sm:text-[11px]">
          Key Focus Areas
        </span>
      </div>

      {/* Marquee viewport */}
      <div className="min-w-0 flex-1 overflow-hidden">
        <motion.div
          animate={
            reducedMotion
              ? undefined
              : {
                  x: ["0%", "-50%"],
                }
          }
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex w-max items-center"
        >
          {[0, 1].map((copy) => (
            <div
              key={copy}
              aria-hidden={copy === 1}
              className="flex shrink-0 items-center gap-6 pr-6"
            >
              {opportunityCategories.map(
                (
                  category: string,
                  index: number
                ) => (
                  <div
                    key={`${copy}-${index}`}
                    className="flex shrink-0 items-center gap-2 whitespace-nowrap text-[12px] font-medium text-white/75"
                  >
                    <span className="size-1.5 rounded-full bg-brand-primary" />

                    <span>{category}</span>

                    <span className="ml-4 text-white/20">
                      •
                    </span>
                  </div>
                )
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ==========================================
   MAIN WHY BANGLADESH SECTION
========================================== */

export function WhyBangladeshSection() {
  const reducedMotion = !!useReducedMotion();

  return (
    <section
      aria-labelledby="why-bangladesh-heading"
      className="
        relative isolate overflow-hidden
        border-b border-white/10
        bg-[#151418] py-14 text-white
        selection:bg-brand-primary
        selection:text-white
        sm:py-16
      "
    >
      {/* Original large animated SVG */}
      <BangladeshMarketGraphic />

      {/* Subtle flat blueprint texture */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          z-0 opacity-[0.03]
        "
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <Container className="relative z-10">
        {/* SECTION HEADER */}
        <div className="flex flex-col gap-5 border-b border-white/10 pb-7 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[710px]">
            <div className="inline-flex items-center gap-2.5 rounded-md border border-brand-primary/30 bg-brand-primary/10 px-3 py-1.5">
              <span className="relative flex size-2">
                {!reducedMotion && (
                  <span className="absolute inset-0 animate-ping rounded-full bg-brand-primary opacity-45" />
                )}

                <span className="relative size-2 rounded-full bg-brand-primary" />
              </span>

              <span className="font-heading text-[10px] font-bold uppercase tracking-[0.15em] text-[#E7A4D0]">
                Strategic Market Overview
              </span>
            </div>

            <h2
              id="why-bangladesh-heading"
              className="mt-4 max-w-[700px] font-heading text-[clamp(1.65rem,3vw,2.5rem)] font-extrabold leading-[1.16] tracking-[-0.04em] text-white"
            >
              Bangladesh — A Building & Construction Market{" "}
              <span className="text-[#E49BCB]">
                On The Move
              </span>
            </h2>

            <p className="mt-3 max-w-[650px] text-[12px] leading-[1.85] text-white/65 sm:text-[13px]">
              Economic growth, urban development,
              and infrastructure activity are
              supporting demand for building
              materials, machinery, and construction
              technology.
            </p>
          </div>

          <Button
            href="/why-bangladesh"
            className="
              group inline-flex min-h-11
              shrink-0 items-center justify-center
              gap-2.5 rounded-lg
              border border-brand-primary/40
              bg-brand-primary/15
              px-5 py-2.5
              font-heading text-[11px] font-bold
              text-white
              transition-[background-color,border-color,transform]
              duration-300
              hover:-translate-y-0.5
              hover:border-brand-primary
              hover:bg-brand-primary/30
              motion-reduce:transform-none
            "
          >
            Explore Full Market Report

            <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRightIcon />
            </span>
          </Button>
        </div>

        {/* ANIMATED MARKET FACTS */}
        <motion.div
          variants={containerVariants}
          initial={
            reducedMotion
              ? false
              : "hidden"
          }
          whileInView="visible"
          viewport={{
            once: true,
            margin: "-40px",
          }}
          className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {marketFacts.map((fact: MarketFact) => (
            <MarketFactCard
              key={fact.id}
              fact={fact}
            />
          ))}
        </motion.div>

        {/* ORIGINAL INFINITE MARQUEE */}
        {/* <FocusAreasMarquee /> */}
      </Container>
    </section>
  );
}
