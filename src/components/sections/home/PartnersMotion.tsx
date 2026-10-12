
"use client";

import {
  Children,
  type ReactNode,
} from "react";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const revealVariants: Variants = {
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

const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.1,
    },
  },
};

/* ---------------------------------------
   SCROLL REVEAL WRAPPER
---------------------------------------- */

export function PartnerReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reducedMotion = !!useReducedMotion();

  return (
    <motion.div
      variants={revealVariants}
      initial={reducedMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        delay,
        duration: 0.75,
        ease: EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------------------------------------
   PREMIUM ORGANISER SPOTLIGHT
---------------------------------------- */

export function OrganiserSpotlight({
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
              y: 30,
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
          : {
              y: -5,
              boxShadow:
                "0 26px 65px rgba(5,7,9,0.10)",
            }
      }
      transition={{
        duration: 0.65,
        ease: EASE,
      }}
      className="group relative isolate mt-10 overflow-hidden rounded-2xl border border-brand-dark/10 bg-white p-6 shadow-[0_12px_40px_rgba(5,7,9,0.045)] sm:p-8 lg:p-10"
    >
      {/* Animated ambient lighting */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        whileHover={
          reducedMotion
            ? undefined
            : { opacity: 1 }
        }
        transition={{ duration: 0.5 }}
        className="pointer-events-none absolute -right-28 -top-36 size-[400px] rounded-full bg-brand-primary/[0.085] opacity-0 blur-[95px]"
      />

      {/* Architectural decorative rings */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-24 size-72 rounded-full border border-brand-primary/10 transition-transform duration-700 group-hover:scale-110"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -right-12 size-52 rounded-full border border-brand-primary/10 transition-transform duration-700 group-hover:scale-125"
      />

      <div className="relative z-10">
        {children}
      </div>

      {/* Bottom brand accent */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-[0.12] bg-brand-primary transition-transform duration-700 ease-out group-hover:scale-x-100"
      />
    </motion.div>
  );
}

/* ---------------------------------------
   ANIMATED PARTNER LOGO GRID
---------------------------------------- */

export function PartnerLogoGrid({
  children,
}: {
  children: ReactNode;
}) {
  const reducedMotion = !!useReducedMotion();

  const logos = Children.toArray(children);

  return (
    <motion.div
      variants={gridVariants}
      initial={reducedMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.1,
      }}
      className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6"
    >
      {logos.map((logo, index) => (
        <motion.div
          key={index}
          variants={revealVariants}
          whileHover={
            reducedMotion
              ? undefined
              : {
                  y: -6,
                  scale: 1.025,
                  boxShadow:
                    "0 18px 38px rgba(5,7,9,0.09)",
                }
          }
          transition={{
            duration: 0.35,
            ease: EASE,
          }}
          className="group relative flex min-h-[108px] min-w-0 items-center justify-center overflow-hidden rounded-xl border border-brand-dark/10 bg-white p-4 shadow-[0_5px_20px_rgba(5,7,9,0.025)] transition-colors duration-300 hover:border-brand-primary/35 sm:min-h-[126px]"
        >
          {/* Hover glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-12 -top-12 size-36 rounded-full bg-brand-primary/[0.065] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
          />

          {/* Actual original PartnerLogo */}
          <div className="relative z-10 flex w-full min-w-0 items-center justify-center">
            {logo}
          </div>

          {/* Animated bottom line */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-brand-primary transition-transform duration-500 group-hover:scale-x-100"
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
