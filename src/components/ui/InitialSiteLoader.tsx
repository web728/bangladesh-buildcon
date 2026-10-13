
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

import { event } from "@/config/event";

/* =========================================
   CONFIGURATION
========================================= */

const STORAGE_KEY =
  "bangladesh_buildcon_intro_shown";

const LOADER_DURATION = 1550;
const PROGRESS_INTERVAL = 35;

const EASE = [0.22, 1, 0.36, 1] as const;

/* =========================================
   MAIN INITIAL SITE LOADER
========================================= */

export function InitialSiteLoader() {
  const reducedMotion = !!useReducedMotion();

  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  /* ---------------------------------------
     FIRST-VISIT SESSION LOGIC
  ---------------------------------------- */

  useEffect(() => {
    let seen = false;

    try {
      seen =
        sessionStorage.getItem(STORAGE_KEY) ===
        "true";
    } catch {
      // Storage may be restricted in some browsers.
    }

    if (seen) return;

    if (reducedMotion) {
      try {
        sessionStorage.setItem(STORAGE_KEY, "true");
      } catch {
        // Continue without session persistence.
      }

      return;
    }

    const startedAt = performance.now();

    const startFrame = requestAnimationFrame(() => {
      setProgress(0);
      setVisible(true);
    });

    const progressTimer = window.setInterval(() => {
      const elapsed =
        performance.now() - startedAt;

      const percentage = Math.min(
        100,
        (elapsed / LOADER_DURATION) * 100
      );

      setProgress(Math.round(percentage));
    }, PROGRESS_INTERVAL);

    const finishTimer = window.setTimeout(() => {
      setProgress(100);

      try {
        sessionStorage.setItem(
          STORAGE_KEY,
          "true"
        );
      } catch {
        // Loader still closes if storage is unavailable.
      }

      setVisible(false);
    }, LOADER_DURATION);

    return () => {
      cancelAnimationFrame(startFrame);
      window.clearInterval(progressTimer);
      window.clearTimeout(finishTimer);
    };
  }, [reducedMotion]);

  return (
    <AnimatePresence initial={false}>
      {visible && (
        <motion.div
          key="bangladesh-buildcon-intro"
          role="status"
          aria-label="Loading Bangladesh Buildcon"
          aria-live="off"
          initial={{
            opacity: 1,
            y: 0,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            y: "-100%",
            transition: {
              duration: 0.68,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
          className="fixed inset-0 z-[99999] isolate flex items-center justify-center overflow-hidden bg-[#08090D] px-5 text-white"
        >
          {/* ===================================
              BACKGROUND
          ==================================== */}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            {/* Soft magenta light */}
            <div className="absolute left-1/2 top-1/2 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-primary/[0.10] blur-[110px] sm:size-[560px]" />

            {/* Architectural grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:70px_70px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />

            {/* Technical corner lines */}
            <div className="absolute left-6 top-6 size-12 border-l border-t border-white/15 sm:left-10 sm:top-10" />

            <div className="absolute bottom-6 right-6 size-12 border-b border-r border-white/15 sm:bottom-10 sm:right-10" />

            {/* Thin magenta top accent */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-brand-primary to-transparent" />
          </div>

          {/* ===================================
              CENTER BRAND PRESENTATION
          ==================================== */}

          <div className="relative z-10 flex w-full max-w-[400px] flex-col items-center text-center">
            {/* Small overline */}
            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                ease: EASE,
              }}
              className="mb-7 flex items-center gap-3"
            >
              <span className="h-px w-7 bg-brand-primary" />

              <span className="font-heading text-[10px] font-bold uppercase tracking-[0.22em] text-[#EFA3D1]">
                International Trade Exhibition
              </span>

              <span className="h-px w-7 bg-brand-primary" />
            </motion.div>

            {/* Actual event brand logo */}
            <motion.div
              initial={{
                opacity: 0,
                y: 18,
                scale: 0.94,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.8,
                ease: EASE,
                delay: 0.1,
              }}
              className="relative flex w-full max-w-[305px] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white px-5 py-5 shadow-[0_20px_65px_rgba(0,0,0,0.24)] sm:max-w-[335px]"
            >
              <Image
                src="/logos/bangladesh-buildcon-logo.png"
                alt="Bangladesh Buildcon"
                width={1560}
                height={468}
                sizes="(max-width: 640px) 265px, 295px"
                className="h-auto w-full object-contain"
              />
            </motion.div>

            {/* Elegant brand text */}
            <motion.div
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.28,
                ease: EASE,
              }}
              className="mt-7"
            >
              <h2 className="font-heading text-[17px] font-extrabold tracking-[-0.035em] text-white sm:text-[20px]">
                Bangladesh{" "}
                <span className="text-[#EFA3D1]">
                  Buildcon
                </span>{" "}
                2027
              </h2>

              <p className="mt-2 text-[11px] font-medium tracking-[0.045em] text-white/50 sm:text-[12px]">
                {event.dates.display}
                <span className="mx-2 text-brand-primary">
                  •
                </span>
                {event.venue.city}
              </p>
            </motion.div>

            {/* ===================================
                PROGRESS INDICATOR
            ==================================== */}

            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.38,
                ease: EASE,
              }}
              className="mt-9 w-full max-w-[290px]"
            >
              <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#BA1D82] via-[#E75CB5] to-[#F2A8D8] transition-[width] duration-75 ease-linear"
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>

              <div className="mt-3 flex items-center justify-between gap-4">
                <span className="font-heading text-[10px] font-semibold uppercase tracking-[0.13em] text-white/40">
                  Preparing Experience
                </span>

                <span className="font-heading text-[11px] font-bold tabular-nums text-[#EFA3D1]">
                  {progress}%
                </span>
              </div>
            </motion.div>
          </div>

          {/* ===================================
              BOTTOM DETAIL
          ==================================== */}

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.7,
              delay: 0.45,
            }}
            className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-3 sm:flex"
          >
            <span className="h-px w-6 bg-white/15" />

            <span className="font-heading text-[9px] font-semibold uppercase tracking-[0.22em] text-white/30">
              {event.brandLines.main}
            </span>

            <span className="h-px w-6 bg-white/15" />
          </motion.div>

          {/* Exit accent */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-[3px] bg-brand-primary"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default InitialSiteLoader;
