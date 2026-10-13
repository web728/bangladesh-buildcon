
"use client";

import type { ReactNode } from "react";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

interface PartnersRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const EASE = [0.22, 1, 0.36, 1] as const;

export function PartnersReveal({
  children,
  className,
  delay = 0,
}: PartnersRevealProps) {
  const reducedMotion = !!useReducedMotion();

  return (
    <motion.div
      initial={
        reducedMotion
          ? false
          : {
              opacity: 0,
              y: 18,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.08,
        margin: "0px 0px -24px 0px",
      }}
      transition={{
        duration: reducedMotion ? 0 : 0.6,
        delay: reducedMotion ? 0 : delay,
        ease: EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
