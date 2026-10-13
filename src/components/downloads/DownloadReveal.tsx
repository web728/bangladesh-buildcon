
"use client";

import type { ReactNode } from "react";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

interface DownloadRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
}

const EASE = [0.22, 1, 0.36, 1] as const;

export function DownloadReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  distance = 22,
}: DownloadRevealProps) {
  const reducedMotion = !!useReducedMotion();

  const offset = {
    up: { x: 0, y: distance },
    down: { x: 0, y: -distance },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
  }[direction];

  return (
    <motion.div
      initial={
        reducedMotion
          ? false
          : {
              opacity: 0,
              x: offset.x,
              y: offset.y,
            }
      }
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.08,
        margin: "0px 0px -32px 0px",
      }}
      transition={{
        duration: reducedMotion ? 0 : 0.7,
        delay: reducedMotion ? 0 : delay,
        ease: EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
