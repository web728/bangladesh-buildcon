
"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type Variants,
} from "framer-motion";

import { Container } from "@/components/ui/Container";
import {
  marketFacts,
  opportunityCategories,
  type MarketFact,
} from "@/data/marketFacts";

/* ==========================================
   ANIMATION
========================================== */

const EASE = [0.22, 1, 0.36, 1] as const;

const reveal: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.04,
    },
  },
};

/* ==========================================
   ICONS
========================================== */

function ArrowIcon() {
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

function TrendIcon() {
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
      <path d="m3 17 6-6 4 4 8-8" />
      <path d="M15 7h6v6" />
    </svg>
  );
}

/* ==========================================
   ANIMATED COUNTER
========================================== */

function AnimatedCounter({
  value,
}: {
  value: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  const inView = useInView(ref, {
    once: true,
    amount: 0.5,
  });

  const reducedMotion = !!useReducedMotion();

  const match = value.match(/\d[\d,]*(?:\.\d+)?/);

  const numericValue = match
    ? Number(match[0].replace(/,/g, ""))
    : null;

  const prefix = match
    ? value.slice(0, match.index ?? 0)
    : "";

  const suffix = match
    ? value.slice((match.index ?? 0) + match[0].length)
    : "";

  const decimalPlaces = match?.[0].includes(".")
    ? match[0].split(".")[1].length
    : 0;

  const count = useMotionValue(0);

  const displayed = useTransform(count, (latest) => {
    const formatted = latest.toLocaleString("en-US", {
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
    });

    return `${prefix}${formatted}${suffix}`;
  });

  useEffect(() => {
    if (!inView || numericValue === null) return;

    if (reducedMotion) {
      count.set(numericValue);
      return;
    }

    const controls = animate(count, numericValue, {
      duration: 1.55,
      ease: EASE,
    });

    return () => controls.stop();
  }, [count, inView, numericValue, reducedMotion]);

  if (numericValue === null) {
    return <span>{value}</span>;
  }

  return (
    <span ref={ref} className="tabular-nums">
      <span className="sr-only">{value}</span>
      <motion.span aria-hidden="true">{displayed}</motion.span>
    </span>
  );
}

/* ==========================================
   ORIGINAL FULL-SIZE BUILDCON SVG

   Original 800 × 800 geometry preserved.
   Brand colors refined to red / dark red /
   charcoal / silver.

   Desktop visual remains large.
========================================== */

function BuildconGraphic({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  return (
    <motion.div
      aria-hidden="true"
      initial={
        reducedMotion
          ? false
          : {
              opacity: 0,
              x: 50,
              scale: 0.96,
            }
      }
      whileInView={{
        opacity: 1,
        x: 0,
        scale: 1,
      }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: reducedMotion ? 0 : 1.2,
        ease: EASE,
      }}
      className="pointer-events-none absolute -right-[30%] top-1/2 z-0 hidden h-[650px] w-[650px] -translate-y-1/2 select-none sm:block sm:-right-[20%] sm:h-[780px] sm:w-[780px] lg:-right-[13%] xl:-right-[7%] 2xl:-right-[4%]"
    >
      <svg
        viewBox="0 0 800 800"
        xmlns="http://www.w3.org/2000/svg"
        className="size-full overflow-visible"
        fill="none"
      >
        <defs>
          <radialGradient id="buildcon-core-glow">
            <stop
              offset="0"
              stopColor="#ED1C24"
              stopOpacity="0.18"
            />
            <stop
              offset="0.65"
              stopColor="#ED1C24"
              stopOpacity="0.045"
            />
            <stop
              offset="1"
              stopColor="#ED1C24"
              stopOpacity="0"
            />
          </radialGradient>

          <linearGradient
            id="buildcon-red-sector"
            x1="255"
            y1="80"
            x2="525"
            y2="530"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#FF454B" />
            <stop offset="0.55" stopColor="#ED1C24" />
            <stop offset="1" stopColor="#AE121C" />
          </linearGradient>

          <linearGradient
            id="buildcon-dark-sector"
            x1="420"
            y1="110"
            x2="700"
            y2="600"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#343942" />
            <stop offset="1" stopColor="#14181F" />
          </linearGradient>

          <linearGradient
            id="buildcon-silver-sector"
            x1="100"
            y1="460"
            x2="420"
            y2="710"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#B8BEC8" />
            <stop offset="1" stopColor="#545D69" />
          </linearGradient>
        </defs>

        {/* Large atmospheric background */}
        <circle
          cx="400"
          cy="400"
          r="380"
          fill="url(#buildcon-core-glow)"
        />

        {/* Original orbital group */}
        <motion.g
          animate={
            reducedMotion ? undefined : { rotate: 360 }
          }
          transition={{
            duration: 90,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            transformOrigin: "400px 400px",
          }}
        >
          <circle
            cx="400"
            cy="400"
            r="335"
            stroke="#FFFFFF"
            strokeOpacity="0.13"
            strokeWidth="1"
            strokeDasharray="5 12"
          />

          <path
            d="M180,210 A320,320 0 0,1 620,210"
            stroke="#FFFFFF"
            strokeOpacity="0.2"
            strokeWidth="1.2"
          />

          <path
            d="M130,340 A320,320 0 0,1 360,90"
            stroke="#ED1C24"
            strokeOpacity="0.4"
            strokeWidth="1.2"
          />

          <path
            d="M480,680 A320,320 0 0,0 710,510"
            stroke="#FFFFFF"
            strokeOpacity="0.23"
            strokeWidth="1.2"
          />

          <circle
            cx="280"
            cy="140"
            r="6"
            fill="#ED1C24"
          />

          <circle
            cx="580"
            cy="170"
            r="8"
            fill="#FF6469"
          />

          <circle
            cx="160"
            cy="270"
            r="9"
            fill="#BBC0C9"
          />

          <circle
            cx="165"
            cy="400"
            r="8"
            fill="#ED1C24"
          />

          <circle
            cx="560"
            cy="620"
            r="8"
            fill="#858E9D"
          />
        </motion.g>

        {/* Original top fan sector */}
        <motion.path
          d="M400,400 L275,100 A340,340 0 0,1 525,100 Z"
          fill="url(#buildcon-red-sector)"
          opacity="0.95"
          animate={
            reducedMotion
              ? undefined
              : { scale: [1, 1.018, 1] }
          }
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: "400px 400px" }}
        />

        {/* Original right sector */}
        <motion.polygon
          points="465,370 655,80 655,470"
          fill="url(#buildcon-dark-sector)"
          stroke="#B9C0CB"
          strokeOpacity="0.3"
          strokeWidth="1.5"
          animate={
            reducedMotion
              ? undefined
              : { scale: [1, 1.014, 1] }
          }
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: "400px 400px" }}
        />

        {/* Original bottom-left sector */}
        <motion.path
          d="M400,400 L95,475 A330,330 0 0,0 270,710 Z"
          fill="url(#buildcon-silver-sector)"
          opacity="0.88"
          animate={
            reducedMotion
              ? undefined
              : { scale: [1, 1.016, 1] }
          }
          transition={{
            duration: 7.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: "400px 400px" }}
        />

        {/* Original nested sectors */}
        <path
          d="M400,400 L210,340 A205,205 0 0,0 280,560 Z"
          fill="#99141D"
          opacity="0.88"
        />

        <path
          d="M400,400 L510,480 A205,205 0 0,1 465,565 Z"
          fill="#717987"
          opacity="0.9"
        />

        {/* Secondary construction arcs */}
        <path
          d="M130 390a270 270 0 0 1 540 0"
          stroke="#FFFFFF"
          strokeOpacity="0.13"
          strokeWidth="1.3"
          strokeDasharray="8 12"
        />

        <path
          d="M190 590a270 270 0 0 0 420 0"
          stroke="#ED1C24"
          strokeOpacity="0.32"
          strokeWidth="1.4"
        />

        {/* Original central rings */}
        <circle
          cx="400"
          cy="400"
          r="140"
          stroke="#FFFFFF"
          strokeOpacity="0.28"
          strokeWidth="1.5"
        />

        <circle
          cx="400"
          cy="400"
          r="125"
          stroke="#FFFFFF"
          strokeOpacity="0.78"
          strokeWidth="3"
        />

        {/* Original center pulse */}
        <motion.circle
          cx="400"
          cy="400"
          r="105"
          fill="#D51923"
          animate={
            reducedMotion
              ? undefined
              : {
                  r: [105, 109, 105],
                  fill: [
                    "#D51923",
                    "#BD1620",
                    "#D51923",
                  ],
                }
          }
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Premium central detail */}
        <circle
          cx="400"
          cy="400"
          r="72"
          stroke="#FFFFFF"
          strokeOpacity="0.18"
          strokeWidth="1"
        />

        <circle
          cx="400"
          cy="400"
          r="9"
          fill="#FFFFFF"
          fillOpacity="0.9"
        />

        <path
          d="M400 335v-36m0 202v-36M335 400h-36m202 0h-36"
          stroke="#FFFFFF"
          strokeOpacity="0.28"
          strokeWidth="1.5"
        />
      </svg>
    </motion.div>
  );
}

/* ==========================================
   MARKET FACT CARD
========================================== */

function MarketFactCard({
  fact,
  index,
  reducedMotion,
}: {
  fact: MarketFact;
  index: number;
  reducedMotion: boolean;
}) {
  return (
    <motion.article
      variants={reveal}
      whileHover={
        reducedMotion ? undefined : { y: -4 }
      }
      transition={{
        duration: 0.28,
        ease: EASE,
      }}
      className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-white/[0.13] bg-[#15181D]/95 p-5 shadow-[0_12px_36px_rgba(0,0,0,0.15)] transition-[border-color,background-color,box-shadow] duration-300 hover:border-brand-primary/45 hover:bg-[#1C2026] hover:shadow-[0_20px_45px_rgba(0,0,0,0.2)] sm:p-6"
    >
      {/* Hover accent */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-brand-primary transition-transform duration-300 group-hover:scale-x-100"
      />

      {/* Top row */}
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-md border border-white/10 bg-white/[0.06] px-2.5 py-1.5 font-heading text-[10px] font-semibold text-white/65">
          {fact.period || "Market Indicator"}
        </span>

        <span className="flex items-center gap-2">
          <span className="font-heading text-[10px] font-semibold text-white/35">
            {String(index + 1).padStart(2, "0")}
          </span>

          <span className="text-[#FF6469]">
            <TrendIcon />
          </span>
        </span>
      </div>

      {/* Number */}
      <div className="mt-5 font-heading text-[clamp(1.9rem,2.8vw,2.65rem)] font-extrabold leading-none tracking-[-0.055em] text-white">
        <AnimatedCounter value={fact.value} />
      </div>

      {/* Label */}
      <h3 className="mt-3 font-heading text-[14px] font-bold leading-[1.5] text-[#FF8488] sm:text-[15px]">
        {fact.label}
      </h3>

      {/* Description */}
      {fact.detail && (
        <p className="mt-2 flex-1 text-[12px] leading-[1.8] text-white/60 sm:text-[13px]">
          {fact.detail}
        </p>
      )}

      {/* Source */}
      <div className="mt-auto border-t border-white/10 pt-4">
        <span className="font-heading text-[10px] font-semibold uppercase tracking-[0.11em] text-white/40">
          Source
        </span>

        <div className="mt-1.5">
          {fact.sourceUrl ? (
            <a
              href={fact.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[11px] font-medium leading-[1.6] text-white/70 underline decoration-white/20 underline-offset-4 transition-colors hover:text-[#FF8488] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span className="break-words">
                {fact.sourceName}
              </span>

              <ArrowIcon />
            </a>
          ) : (
            <span className="text-[11px] leading-[1.6] text-white/65">
              {fact.sourceName}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

/* ==========================================
   INDUSTRY OPPORTUNITIES
========================================== */

function FocusAreas({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  return (
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
        duration: reducedMotion ? 0 : 0.6,
        ease: EASE,
      }}
      className="mt-6 rounded-xl border border-white/10 bg-[#15181D]/95 p-4 sm:p-5"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="flex shrink-0 items-center gap-2.5 lg:border-r lg:border-white/15 lg:pr-5">
          <span className="size-2 rounded-full bg-brand-primary" />

          <h3 className="font-heading text-[11px] font-bold uppercase tracking-[0.12em] text-white">
            Industry Focus
          </h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {opportunityCategories.map((category) => (
            <span
              key={category}
              className="rounded-md border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[11px] font-medium leading-[1.5] text-white/75 transition-colors hover:border-brand-primary/40 hover:bg-brand-primary/10 hover:text-white"
            >
              {category}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ==========================================
   MAIN SECTION
========================================== */

export function WhyBangladeshSection() {
  const reducedMotion = !!useReducedMotion();

  const scrollProps = {
    initial: reducedMotion ? false : "hidden",
    whileInView: "visible" as const,
    viewport: {
      once: true,
      amount: 0.08,
    },
  };

  return (
    <section
      aria-labelledby="why-bangladesh-heading"
      className="relative isolate overflow-hidden bg-[#090B0F] py-14 text-white sm:py-16 lg:py-[76px]"
    >
      {/* Architectural grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:70px_70px]"
      />

      {/* Refined soft lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-48 top-0 size-[450px] rounded-full bg-brand-primary/[0.055] blur-[115px]"
      />

      {/* Full-size original-style SVG */}
      <BuildconGraphic reducedMotion={reducedMotion} />

      {/* Content */}
      <Container className="relative z-10">
        {/* Header */}
        <motion.div
          {...scrollProps}
          variants={stagger}
          className="flex flex-col gap-5 border-b border-white/10 pb-7 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-[730px]">
            <motion.div
              variants={reveal}
              className="flex items-center gap-2.5"
            >
              <span className="h-[2px] w-8 bg-brand-primary" />

              <span className="font-heading text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#FF8488]">
                Construction Market Perspective
              </span>
            </motion.div>

            <motion.h2
              id="why-bangladesh-heading"
              variants={reveal}
              className="mt-3 font-heading text-[clamp(1.75rem,3vw,2.6rem)] font-extrabold leading-[1.18] tracking-[-0.045em] text-white"
            >
              Bangladesh — A Construction Market{" "}
              <span className="text-[#FF6469]">
                Full of Opportunity
              </span>
            </motion.h2>

            <motion.p
              variants={reveal}
              className="mt-3 max-w-[640px] text-[13px] leading-[1.85] text-white/65 sm:text-[14px]"
            >
              Explore construction market
              indicators and business
              opportunities relevant to building
              materials, machinery, engineering
              products and construction technologies
              in Bangladesh.
            </motion.p>
          </div>

          <motion.div variants={reveal}>
            <Link
              href="/why-bangladesh"
              className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/[0.07] px-5 py-3 font-heading text-[12px] font-bold text-white transition-colors hover:border-brand-primary/50 hover:bg-brand-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Explore Market Insights

              <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none">
                <ArrowIcon />
              </span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Market facts */}
        {marketFacts.length > 0 ? (
          <motion.div
            variants={stagger}
            initial={reducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.08,
            }}
            className="mt-7 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {marketFacts.map((fact, index) => (
              <MarketFactCard
                key={fact.id}
                fact={fact}
                index={index}
                reducedMotion={reducedMotion}
              />
            ))}
          </motion.div>
        ) : (
          <div className="mt-7 rounded-xl border border-white/10 bg-[#15181D] p-5 text-[13px] text-white/65">
            Source-backed market information will
            appear here when available.
          </div>
        )}

        {/* Focus areas */}
        {opportunityCategories.length > 0 && (
          <FocusAreas reducedMotion={reducedMotion} />
        )}

        <p className="mt-5 text-[10px] leading-[1.8] text-white/40 sm:text-[11px]">
          Market statistics are sourced from the
          website&apos;s market data. Review the
          stated source and reporting period
          for each indicator. Historical figures
          are not confirmed 2026 exhibition results.
        </p>
      </Container>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-white/10"
      />
    </section>
  );
}
