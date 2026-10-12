
"use client";

import type { ReactNode } from "react";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const revealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 25,
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

const staggerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.06,
    },
  },
};

/* ---------------------------------------
   GENERIC SCROLL REVEAL
---------------------------------------- */

export function FooterReveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reducedMotion = !!useReducedMotion();

  return (
    <motion.div
      variants={revealVariants}
      initial={reducedMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.12,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------------------------------------
   ANIMATED FOOTER BACKGROUND
   Original circular motif retained
---------------------------------------- */

export function FooterBackground() {
  const reducedMotion = !!useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Ambient lighting */}
      <div className="absolute -right-36 -top-40 size-[540px] rounded-full bg-brand-primary/[0.09] blur-[130px]" />

      <div className="absolute -bottom-48 -left-36 size-[440px] rounded-full bg-brand-primary/[0.055] blur-[120px]" />

      {/* Architectural background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:76px_76px] [mask-image:linear-gradient(to_bottom,transparent,black_35%,black_85%,transparent)]" />

      {/* Original orbit-style visual, now animated */}
      <svg
        viewBox="0 0 800 800"
        fill="none"
        className="absolute -bottom-48 -right-48 size-[680px] opacity-35 lg:-bottom-52 lg:-right-32 lg:size-[820px]"
      >
        <motion.g
          animate={
            reducedMotion
              ? undefined
              : { rotate: 360 }
          }
          transition={{
            duration: 100,
            ease: "linear",
            repeat: Infinity,
          }}
          style={{
            transformOrigin: "400px 400px",
          }}
        >
          <circle
            cx="400"
            cy="400"
            r="320"
            stroke="#BA1D82"
            strokeOpacity="0.65"
            strokeDasharray="6 12"
          />

          <circle
            cx="400"
            cy="80"
            r="6"
            fill="#EA65BB"
          />

          <circle
            cx="400"
            cy="720"
            r="5"
            fill="#FFFFFF"
            fillOpacity="0.5"
          />
        </motion.g>

        <circle
          cx="400"
          cy="400"
          r="220"
          stroke="#304090"
          strokeWidth="1.2"
          strokeOpacity="0.7"
        />

        <circle
          cx="400"
          cy="400"
          r="140"
          fill="#BA1D82"
          fillOpacity="0.12"
        />

        <motion.circle
          cx="400"
          cy="400"
          r="105"
          stroke="#BA1D82"
          strokeOpacity="0.3"
          animate={
            reducedMotion
              ? undefined
              : {
                  scale: [1, 1.09, 1],
                  opacity: [0.4, 0.75, 0.4],
                }
          }
          style={{
            transformOrigin: "400px 400px",
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.path
          d="M400 180A220 220 0 0 1 620 400"
          stroke="#EA65BB"
          strokeWidth="3"
          strokeLinecap="round"
          initial={
            reducedMotion
              ? false
              : { pathLength: 0 }
          }
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 2,
            ease: EASE,
          }}
        />
      </svg>

      {/* Top brand border */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-brand-primary to-transparent" />
    </div>
  );
}

/* ---------------------------------------
   ANIMATED CONTACT CARD
---------------------------------------- */

export function FooterContactCard({
  children,
}: {
  children: ReactNode;
}) {
  const reducedMotion = !!useReducedMotion();

  return (
    <motion.div
      variants={revealVariants}
      initial={reducedMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={
        reducedMotion
          ? undefined
          : {
              y: -5,
              boxShadow:
                "0 20px 42px rgba(0,0,0,0.20)",
            }
      }
      transition={{
        duration: 0.35,
        ease: EASE,
      }}
      className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.045] p-5 backdrop-blur-md transition-colors duration-300 hover:border-brand-primary/40 hover:bg-white/[0.07]"
    >
      {/* Hover glow */}
      <div className="pointer-events-none absolute -right-14 -top-14 size-40 rounded-full bg-brand-primary/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative z-10 flex h-full flex-col">
        {children}
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-brand-primary transition-transform duration-500 group-hover:scale-x-100"
      />
    </motion.div>
  );
}

/* ---------------------------------------
   ANIMATED NAVIGATION GROUPS
---------------------------------------- */

export function FooterNavGrid({
  children,
}: {
  children: ReactNode;
}) {
  const reducedMotion = !!useReducedMotion();

  return (
    <motion.div
      variants={staggerVariants}
      initial={reducedMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.08,
      }}
      className="grid grid-cols-2 gap-x-6 gap-y-10 border-b border-white/10 py-12 sm:grid-cols-3 lg:grid-cols-5 lg:gap-8 lg:py-14"
    >
      {children}
    </motion.div>
  );
}

export function FooterNavColumn({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <motion.div
      variants={revealVariants}
      className="min-w-0"
    >
      {children}
    </motion.div>
  );
}

/* ---------------------------------------
   ORGANISER SPOTLIGHT
---------------------------------------- */

export function FooterOrganisers({
  children,
}: {
  children: ReactNode;
}) {
  const reducedMotion = !!useReducedMotion();

  return (
    <motion.div
      initial={
        reducedMotion
          ? false
          : {
              opacity: 0,
              y: 24,
              scale: 0.985,
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
      whileHover={
        reducedMotion
          ? undefined
          : { y: -4 }
      }
      transition={{
        duration: 0.75,
        ease: EASE,
      }}
      className="relative mt-12 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-md sm:p-8"
    >
      <div className="pointer-events-none absolute -right-28 -top-36 size-80 rounded-full bg-brand-primary/[0.09] blur-[90px]" />

      <div className="relative z-10">
        {children}
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-brand-primary/70 to-transparent"
      />
    </motion.div>
  );
}
