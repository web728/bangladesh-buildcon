
"use client";

import type { ReactNode } from "react";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

/* ==========================================
   MOTION SYSTEM
========================================== */

const EASE = [0.22, 1, 0.36, 1] as const;

const reveal: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.48,
      ease: EASE,
    },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.045,
      delayChildren: 0.025,
    },
  },
};

/* ==========================================
   01 — FOOTER REVEAL

   Subtle and quick.
   No large slide distance.
========================================== */

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
      initial={
        reducedMotion
          ? false
          : {
              opacity: 0,
              y: 12,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.05,
      }}
      transition={{
        duration: reducedMotion ? 0 : 0.48,
        ease: EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ==========================================
   02 — MINIMAL FOOTER BACKGROUND

   No orbit.
   No dots.
   No architectural lines.
   No gradients.

   Completely decorative;
   never affects layout height.
========================================== */

export function FooterBackground() {
  const reducedMotion = !!useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Delicate brand accent at the top */}
      <motion.span
        className="absolute left-[5%] top-0 h-[2px] w-24 bg-brand-primary"
        initial={
          reducedMotion
            ? false
            : {
                opacity: 0,
                scaleX: 0,
              }
        }
        whileInView={{
          opacity: 1,
          scaleX: 1,
        }}
        viewport={{ once: true }}
        transition={{
          duration: reducedMotion ? 0 : 0.7,
          ease: EASE,
        }}
        style={{
          transformOrigin: "left center",
        }}
      />
    </div>
  );
}

/* ==========================================
   03 — CONTACT CARD

   Compact typography and panel spacing.
========================================== */

export function FooterContactCard({
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
              y: 12,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.08,
      }}
      whileHover={
        reducedMotion
          ? undefined
          : {
              y: -2,
            }
      }
      transition={{
        duration: reducedMotion ? 0 : 0.35,
        ease: EASE,
      }}
      className="
        group relative flex h-full min-w-0
        flex-col rounded-lg
        border border-white/10
        bg-[#15151B]
        p-4
        transition-[border-color,background-color]
        duration-300
        hover:border-brand-primary/35
        hover:bg-[#1A1820]
      "
    >
      <div className="relative flex h-full min-w-0 flex-col">
        {children}
      </div>
    </motion.div>
  );
}

/* ==========================================
   04 — RESPONSIVE NAV GRID

   No extra vertical padding or margins.
   Parent footer owns section spacing.
========================================== */

export function FooterNavGrid({
  children,
}: {
  children: ReactNode;
}) {
  const reducedMotion = !!useReducedMotion();

  return (
    <motion.div
      variants={stagger}
      initial={reducedMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.05,
      }}
      className="
        grid min-w-0
        grid-cols-2
        gap-x-4 gap-y-5
        sm:grid-cols-3
        lg:grid-cols-3
        2xl:grid-cols-5
      "
    >
      {children}
    </motion.div>
  );
}

/* ==========================================
   05 — NAV COLUMN

   Short entrance animation.
========================================== */

export function FooterNavColumn({
  children,
}: {
  children: ReactNode;
}) {
  const reducedMotion = !!useReducedMotion();

  return (
    <motion.div
      variants={reducedMotion ? undefined : reveal}
      className="min-w-0"
    >
      {children}
    </motion.div>
  );
}

/* ==========================================
   06 — ORGANISER PANEL

   Compact, restrained and clean.
========================================== */

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
              y: 12,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.08,
      }}
      transition={{
        duration: reducedMotion ? 0 : 0.5,
        ease: EASE,
      }}
      className="
        relative overflow-hidden
        rounded-xl
        border border-white/10
        bg-[#15151B]
        p-4 sm:p-5
      "
    >
      {children}
    </motion.div>
  );
}
