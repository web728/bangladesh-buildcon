
"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";

import { Container } from "@/components/ui/Container";

/* ----------------------------------------
   STATS DATA
   Keep values aligned with official brochure
---------------------------------------- */

interface StatItem {
  numericValue: number;
  suffix?: string;
  label: string;
}

const stats: StatItem[] = [
  {
    numericValue: 200,
    suffix: "+",
    label: "Exhibiting Companies",
  },
  {
    numericValue: 7000,
    suffix: "+",
    label: "Trade Visitors",
  },
  {
    numericValue: 10,
    suffix: "+",
    label: "Participating Countries",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

/* ----------------------------------------
   SMOOTH ANIMATED COUNTER
---------------------------------------- */

function AnimatedCounter({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, {
    once: true,
    amount: 0.5,
  });

  const reducedMotion = useReducedMotion();

  const count = useMotionValue(reducedMotion ? value : 0);

  const rounded = useTransform(count, (latest) =>
    Math.floor(latest).toLocaleString("en-US")
  );

  useEffect(() => {
    if (!inView) return;

    if (reducedMotion) {
      count.set(value);
      return;
    }

    const controls = animate(count, value, {
      duration: 1.8,
      ease: EASE,
    });

    return () => controls.stop();
  }, [inView, value, reducedMotion, count]);

  return (
    <span
      ref={ref}
      className="inline-flex items-baseline tabular-nums"
      aria-label={`${value.toLocaleString("en-US")}${suffix}`}
    >
      <motion.span aria-hidden="true">
        {rounded}
      </motion.span>

      {suffix && (
        <span
          aria-hidden="true"
          className="ml-0.5 text-brand-primary"
        >
          {suffix}
        </span>
      )}
    </span>
  );
}

/* ----------------------------------------
   STATS SECTION
---------------------------------------- */

export function HeroStatsSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      aria-label="Bangladesh Buildcon Exhibition Statistics"
      className="relative isolate overflow-hidden bg-brand-dark text-white"
    >
      {/* Top brand accent */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-white/10"
      />

      {/* Subtle ambient magenta glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-1/2 h-48 w-72 -translate-y-1/2 rounded-full bg-brand-primary/10 blur-[90px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/2 h-48 w-72 -translate-y-1/2 rounded-full bg-brand-blue/10 blur-[90px]"
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 divide-y divide-white/10 py-3 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:py-5">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
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
              viewport={{
                once: true,
                amount: 0.3,
              }}
              transition={{
                duration: 0.7,
                delay: index * 0.12,
                ease: EASE,
              }}
              className="group relative flex flex-col items-center justify-center px-4 py-5 text-center sm:px-6 sm:py-6"
            >
              {/* Hover accent line */}
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-brand-primary transition-all duration-500 group-hover:w-16 sm:bottom-[-20px]"
              />

              {/* Number */}
              <div className="font-heading text-[clamp(2rem,3vw,3rem)] leading-none font-extrabold tracking-[-0.055em] text-white">
                <AnimatedCounter
                  value={stat.numericValue}
                  suffix={stat.suffix}
                />
              </div>

              {/* Label */}
              <p className="mt-3 font-heading text-[11px] font-semibold uppercase tracking-[0.13em] text-white/60 sm:text-xs">
                {stat.label}
              </p>
 
            </motion.div>
          ))}
        </div>
      </Container>

      {/* Bottom border */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-white/10"
      />
    </section>
  );
}
