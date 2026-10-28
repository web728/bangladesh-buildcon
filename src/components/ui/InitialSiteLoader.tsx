
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

const STORAGE_KEY = "bangladesh_buildcon_intro_shown";
const LOADER_DURATION = 1800;

const EASE = [0.22, 1, 0.36, 1] as const;

/* =========================================
   INITIAL SITE LOADER
========================================= */

export function InitialSiteLoader() {
  const reducedMotion = !!useReducedMotion();

  const [visible, setVisible] = useState(false);

  /* Show once per browser session */
  useEffect(() => {
    let alreadyShown = false;

    try {
      alreadyShown =
        sessionStorage.getItem(STORAGE_KEY) === "true";
    } catch {
      // Continue if browser storage is unavailable.
    }

    if (alreadyShown || reducedMotion) return;

    const frame = requestAnimationFrame(() => {
      setVisible(true);
    });

    const finishTimer = window.setTimeout(() => {
      try {
        sessionStorage.setItem(STORAGE_KEY, "true");
      } catch {
        // Loader can close without session storage.
      }

      setVisible(false);
    }, LOADER_DURATION);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(finishTimer);
    };
  }, [reducedMotion]);

  return (
    <AnimatePresence initial={false}>
      {visible && (
        <motion.div
          key="buildcon-site-loader"
          role="status"
          aria-label="Loading exhibition website"
          aria-live="off"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.45,
              ease: "easeInOut",
            },
          }}
          className="fixed inset-0 z-[99999] isolate flex items-center justify-center overflow-hidden bg-[#0D0D12] px-5 text-white"
        >
          {/* Background */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            {/* Central ambient light */}
            <div className="absolute left-1/2 top-1/2 size-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-primary/[0.10] blur-[100px] sm:size-[500px]" />

            {/* Architectural grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

            {/* Top brand accent */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-primary/70 to-transparent" />

            {/* Corner accents */}
            <div className="absolute left-6 top-6 size-9 border-l border-t border-white/10 sm:left-10 sm:top-10" />

            <div className="absolute bottom-6 right-6 size-9 border-b border-r border-white/10 sm:bottom-10 sm:right-10" />
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex w-full max-w-[350px] flex-col items-center text-center">

            {/* Small heading */}
            <motion.div
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.55,
                ease: EASE,
              }}
              className="mb-5 flex items-center gap-3"
            >
              <span className="h-px w-5 bg-brand-primary/70" />

              <span className="font-heading text-[9px] font-bold uppercase tracking-[0.18em] text-[#EFA3D1]">
                International B2B Exhibition
              </span>

              <span className="h-px w-5 bg-brand-primary/70" />
            </motion.div>

            {/* Brand Logo */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.96,
                y: 10,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              transition={{
                duration: 0.85,
                ease: EASE,
                delay: 0.08,
              }}
              className="relative flex w-full max-w-[235px] items-center justify-center overflow-hidden rounded-xl border border-white/[0.08] bg-white px-3 py-3 shadow-[0_15px_45px_rgba(0,0,0,0.22)] sm:max-w-[260px]"
            >
              <Image
                src="/logos/bangla.png"
                alt="11th Bangladesh Buildcon International Expo 2027"
                width={1560}
                height={468}
                priority
                sizes="(max-width: 640px) 235px, 260px"
                className="h-auto w-full object-contain"
              />
            </motion.div>

            {/* Exhibition Information */}
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
                duration: 0.65,
                delay: 0.22,
                ease: EASE,
              }}
              className="mt-6 flex flex-col items-center"
            >
              <h2 className="max-w-[320px] font-heading text-[15px] font-bold leading-[1.45] tracking-[-0.025em] text-white sm:text-[17px]">
                11th Bangladesh Buildcon
                International Expo{" "}
                <span className="text-[#EFA3D1]">
                  2027
                </span>
              </h2>

              <p className="mt-2 text-[11px] font-medium tracking-[0.02em] text-white/55">
                {event.dates.display}
                <span className="mx-2 text-[#EFA3D1]">
                  •
                </span>
                {event.venue.city}
              </p>
            </motion.div>

            {/* Smooth Progress Indicator */}
            <motion.div
              initial={{
                opacity: 0,
                y: 6,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
                delay: 0.3,
                ease: EASE,
              }}
              className="mt-7 w-full max-w-[230px]"
            >
              <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: LOADER_DURATION / 1000,
                    ease: "linear",
                  }}
                  style={{
                    transformOrigin: "left",
                  }}
                  className="h-full w-full bg-gradient-to-r from-[#BA1D82] via-[#DD4BA9] to-[#EFA3D1]"
                />
              </div>

              <p className="mt-3 font-heading text-[9px] font-semibold uppercase tracking-[0.16em] text-white/40">
                Preparing Your Experience
              </p>
            </motion.div>
          </div>

          {/* Bottom Detail */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.7,
              delay: 0.45,
            }}
            className="pointer-events-none absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-3 sm:flex"
          >
            <span className="h-px w-5 bg-white/15" />

            <span className="whitespace-nowrap font-heading text-[9px] font-medium uppercase tracking-[0.16em] text-white/30">
              Building & Construction Industry
            </span>

            <span className="h-px w-5 bg-white/15" />
          </motion.div>

          {/* Bottom Accent */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-brand-primary to-transparent"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default InitialSiteLoader;
