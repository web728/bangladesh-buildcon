
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

const EASE = [0.22, 1, 0.36, 1] as const;

/* ---------------------------------------
   SCROLL ANIMATIONS
---------------------------------------- */

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
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

/* ---------------------------------------
   ICONS
---------------------------------------- */

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

/* ---------------------------------------
   NUMBER COUNT-UP
---------------------------------------- */

function AnimatedCounter({
  value,
}: {
  value: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-25px",
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
    ? value.slice(
        (match.index ?? 0) + match[0].length
      )
    : "";

  const decimalPlaces = match?.[0].includes(".")
    ? match[0].split(".")[1].length
    : 0;

  const count = useMotionValue(0);

  const formatted = useTransform(count, (latest) => {
    const number = latest.toLocaleString("en-US", {
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
    });

    return `${prefix}${number}${suffix}`;
  });

  useEffect(() => {
    if (!inView || numericValue === null) return;

    if (reducedMotion) {
      count.set(numericValue);
      return;
    }

    count.set(0);

    const controls = animate(count, numericValue, {
      duration: 2,
      ease: EASE,
    });

    return () => controls.stop();
  }, [inView, numericValue, reducedMotion, count]);

  if (numericValue === null) {
    return <span>{value}</span>;
  }

  return (
    <span
      ref={ref}
      className="inline-block tabular-nums"
      aria-label={value}
    >
      <motion.span aria-hidden="true">
        {formatted}
      </motion.span>
    </span>
  );
}

/* ---------------------------------------
   ORIGINAL BUILDCON SVG
   Original geometry & colors preserved
---------------------------------------- */

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
          : { opacity: 0, x: 35, scale: 0.96 }
      }
      whileInView={{
        opacity: 1,
        x: 0,
        scale: 1,
      }}
      viewport={{ once: true }}
      transition={{
        duration: 1.1,
        ease: EASE,
      }}
      className="pointer-events-none absolute -right-[15%] top-1/2 z-0 h-[650px] w-[650px] -translate-y-1/2 select-none opacity-30 sm:h-[780px] sm:w-[780px] md:-right-[8%] md:opacity-45 lg:-right-[4%]"
    >
      <svg
        viewBox="0 0 800 800"
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Original backlit glow */}
        <circle
          cx="400"
          cy="400"
          r="260"
          fill="#C82028"
          opacity="0.08"
          filter="blur(60px)"
        />

        <circle
          cx="400"
          cy="400"
          r="190"
          fill="#304090"
          opacity="0.06"
          filter="blur(50px)"
        />

        {/* Original rotating orbit group */}
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
            d="M180,210 A320,320 0 0,1 620,210"
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.2"
            strokeWidth="1.2"
          />

          <circle
            cx="280"
            cy="140"
            r="6"
            fill="#C82028"
          />

          <circle
            cx="580"
            cy="170"
            r="8"
            fill="#E07878"
          />

          <path
            d="M130,340 A320,320 0 0,1 360,90"
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.25"
            strokeWidth="1"
          />

          <circle
            cx="160"
            cy="270"
            r="9"
            fill="#E07878"
          />

          <circle
            cx="165"
            cy="400"
            r="8"
            fill="#C82028"
          />

          <path
            d="M480,680 A320,320 0 0,0 710,510"
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.22"
            strokeWidth="1"
          />

          <circle
            cx="560"
            cy="620"
            r="8"
            fill="#304090"
          />
        </motion.g>

        {/* Original top fan sector */}
        <motion.path
          d="M400,400 L275,100 A340,340 0 0,1 525,100 Z"
          fill="#C82028"
          opacity="0.9"
          animate={
            reducedMotion
              ? undefined
              : { scale: [1, 1.018, 1] }
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

        {/* Original right sector */}
        <motion.polygon
          points="465,370 655,80 655,470"
          fill="#304090"
          opacity="0.95"
          animate={
            reducedMotion
              ? undefined
              : { scale: [1, 1.015, 1] }
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

        {/* Original bottom-left sector */}
        <motion.path
          d="M400,400 L95,475 A330,330 0 0,0 270,710 Z"
          fill="#304090"
          opacity="0.88"
          animate={
            reducedMotion
              ? undefined
              : { scale: [1, 1.02, 1] }
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

        {/* Original nested inner sectors */}
        <path
          d="M400,400 L210,340 A205,205 0 0,0 280,560 Z"
          fill="#243273"
          opacity="0.8"
        />

        <path
          d="M400,400 L510,480 A205,205 0 0,1 465,565 Z"
          fill="#304090"
          opacity="0.85"
        />

        {/* Original center rings */}
        <circle
          cx="400"
          cy="400"
          r="140"
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.3"
          strokeWidth="1.5"
        />

        <circle
          cx="400"
          cy="400"
          r="125"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3.5"
        />

        {/* Original central pulsing node */}
        <motion.circle
          cx="400"
          cy="400"
          r="105"
          fill="#C82028"
          animate={
            reducedMotion
              ? undefined
              : {
                  r: [105, 109, 105],
                  fill: [
                    "#C82028",
                    "#A91620",
                    "#C82028",
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
    </motion.div>
  );
}

/* ---------------------------------------
   PREMIUM ANIMATED FACT CARD
---------------------------------------- */

function MarketFactCard({
  fact,
  reducedMotion,
}: {
  fact: MarketFact;
  reducedMotion: boolean;
}) {
  return (
    <motion.article
      variants={itemVariants}
      className="min-w-0"
    >
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
              "0 8px 28px rgba(0,0,0,0.10)",
          },
          hover: {
            y: -8,
            scale: 1.015,
            boxShadow:
              "0 24px 55px rgba(0,0,0,0.28)",
          },
        }}
        transition={{
          duration: 0.4,
          ease: EASE,
        }}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#17141B]/90 p-5 backdrop-blur-md transition-colors duration-300 hover:border-brand-primary/55 hover:bg-[#211723] sm:p-6"
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
          className="pointer-events-none absolute -right-14 -top-16 size-52 rounded-full bg-brand-primary/15 blur-[70px]"
        />

        {/* Top bar */}
        <div className="relative z-10 flex items-center justify-between gap-3 border-b border-white/10 pb-4">
          <span className="rounded-md border border-brand-primary/25 bg-brand-primary/10 px-3 py-1 font-heading text-[10px] font-semibold tracking-[0.08em] text-[#F4AAD9]">
            {fact.period || "Market Metric"}
          </span>

          <motion.div
            aria-hidden="true"
            variants={{
              rest: {
                rotate: 0,
                scale: 1,
                color: "#9995A0",
              },
              hover: {
                rotate: -10,
                scale: 1.15,
                color: "#E85DB8",
              },
            }}
            transition={{
              duration: 0.35,
              ease: EASE,
            }}
          >
            <TrendIcon />
          </motion.div>
        </div>

        {/* Animated number */}
        <div className="relative z-10 mt-5 font-heading text-[clamp(2rem,3vw,2.8rem)] leading-none font-extrabold tracking-[-0.055em] text-white">
          <AnimatedCounter value={fact.value} />
        </div>

        {/* Metric title */}
        <h3 className="relative z-10 mt-3 font-heading text-[14px] font-bold leading-snug text-[#F2A8D8] sm:text-[15px]">
          {fact.label}
        </h3>

        {/* Description */}
        {fact.detail && (
          <p className="relative z-10 mt-3 flex-1 text-[12px] leading-[1.75] text-white/65 sm:text-[13px]">
            {fact.detail}
          </p>
        )}

        {/* Source */}
        <div className="relative z-10 mt-6 border-t border-white/10 pt-4">
          <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/40">
            Source
          </p>

          {fact.sourceUrl ? (
            <a
              href={fact.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 break-all text-[11px] font-medium text-white/70 underline decoration-white/20 underline-offset-4 transition-colors hover:text-[#F2A8D8]"
            >
              {fact.sourceName}
              <ArrowIcon />
            </a>
          ) : (
            <span className="text-[11px] font-medium text-white/70">
              {fact.sourceName}
            </span>
          )}
        </div>

        {/* Animated bottom line */}
        <motion.div
          aria-hidden="true"
          variants={{
            rest: { scaleX: 0.15 },
            hover: { scaleX: 1 },
          }}
          transition={{
            duration: 0.5,
            ease: EASE,
          }}
          className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-brand-primary"
        />
      </motion.div>
    </motion.article>
  );
}

/* ---------------------------------------
   FOCUS AREAS MARQUEE
---------------------------------------- */

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
          : { opacity: 0, y: 20 }
      }
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.7,
        ease: EASE,
      }}
      className="relative mt-9 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]"
    >
      <div className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:gap-0 lg:p-0">
        {/* Fixed label */}
        <div className="relative z-10 flex shrink-0 items-center gap-3 lg:min-h-[74px] lg:border-r lg:border-white/10 lg:bg-[#17141B] lg:px-6">
          <span className="size-2 rounded-full bg-brand-primary" />

          <span className="font-heading text-[11px] font-bold uppercase tracking-[0.16em] text-white">
            Key Focus Areas
          </span>
        </div>

        {/* Marquee */}
        <div className="min-w-0 flex-1 overflow-hidden lg:[mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]">
          {reducedMotion ? (
            <div className="flex flex-wrap gap-4 lg:px-6">
              {opportunityCategories.map((category) => (
                <span
                  key={category}
                  className="inline-flex items-center gap-2 whitespace-nowrap text-xs font-medium text-white/70"
                >
                  <span className="size-1.5 rounded-full bg-brand-primary" />
                  {category}
                </span>
              ))}
            </div>
          ) : (
            <motion.div
              animate={{
                x: ["0%", "-50%"],
              }}
              transition={{
                duration: 30,
                ease: "linear",
                repeat: Infinity,
              }}
              className="flex w-max items-center"
            >
              {[0, 1].map((copy) => (
                <div
                  key={copy}
                  aria-hidden={copy === 1}
                  className="flex shrink-0 items-center gap-8 pr-8"
                >
                  {opportunityCategories.map(
                    (category) => (
                      <span
                        key={`${copy}-${category}`}
                        className="inline-flex shrink-0 items-center gap-3 whitespace-nowrap text-[12px] font-medium text-white/75 sm:text-[13px]"
                      >
                        <span className="size-1.5 rounded-full bg-brand-primary" />
                        {category}
                      </span>
                    )
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ---------------------------------------
   MAIN SECTION
---------------------------------------- */

export function WhyBangladeshSection() {
  const reducedMotion = !!useReducedMotion();

  return (
    <section
      aria-labelledby="why-bangladesh-heading"
      className="relative isolate overflow-hidden border-b border-white/10 bg-[#100F14] py-16 text-white sm:py-20 lg:py-24"
    >
      {/* Original SVG preserved */}
      <BuildconGraphic reducedMotion={reducedMotion} />

      {/* Blueprint background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px]"
      />

      {/* Subtle lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-52 top-0 size-[480px] rounded-full bg-brand-primary/[0.06] blur-[120px]"
      />

      <Container className="relative z-10">
        {/* HEADER */}
        <motion.div
          variants={containerVariants}
          initial={
            reducedMotion ? false : "hidden"
          }
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.25,
          }}
          className="flex flex-col gap-7 border-b border-white/10 pb-9 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-[730px]">
            {/* Eyebrow */}
            <motion.div
              variants={itemVariants}
              className="mb-5 flex items-center gap-3"
            >
              <span className="h-[2px] w-9 bg-brand-primary" />

              <span className="font-heading text-[11px] font-bold uppercase tracking-[0.16em] text-[#F2A8D8]">
                Strategic Market Overview
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              id="why-bangladesh-heading"
              variants={itemVariants}
              className="font-heading text-[clamp(1.95rem,3.2vw,2.8rem)] leading-[1.16] font-extrabold tracking-[-0.045em] text-white"
            >
              Bangladesh — A Construction Market{" "}
              <span className="text-[#EA65BB]">
                On The Move
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="mt-5 max-w-[640px] text-[14px] leading-[1.85] text-white/65 sm:text-[15px]"
            >
              Economic growth, urban development,
              and infrastructure activity are
              supporting demand for building materials,
              machinery, and construction technology.
            </motion.p>
          </div>

          {/* CTA */}
          <motion.div variants={itemVariants}>
            <Link
              href="/why-bangladesh"
              className="group inline-flex min-h-11 items-center justify-center gap-3 rounded-lg border border-white/20 bg-white/[0.07] px-5 py-3 font-heading text-xs font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-primary/50 hover:bg-brand-primary sm:px-6 sm:text-[13px]"
            >
              Explore Full Market Report

              <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowIcon />
              </span>
            </Link>
          </motion.div>
        </motion.div>

        {/* FACT CARDS */}
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
          className="mt-8 grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
        >
          {marketFacts.map((fact: MarketFact) => (
            <MarketFactCard
              key={fact.id}
              fact={fact}
              reducedMotion={reducedMotion}
            />
          ))}
        </motion.div>

        {/* ANIMATED FOCUS AREAS */}
        <FocusAreas reducedMotion={reducedMotion} />
      </Container>
    </section>
  );
}
