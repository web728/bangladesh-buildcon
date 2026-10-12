"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { event } from "@/config/event";

export function InitialSiteLoader() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if loader has already run in current tab session
    const hasSeenLoader = sessionStorage.getItem("bangladesh_buildcon_intro_shown");

    if (hasSeenLoader) {
      return;
    }

    const startFrame = requestAnimationFrame(() => setLoading(true));

    const duration = 1400; // 1.4s
    const interval = 20;
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setLoading(false);
            sessionStorage.setItem("bangladesh_buildcon_intro_shown", "true");
          }, 250);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => {
      cancelAnimationFrame(startFrame);
      clearInterval(timer);
    };
  }, []);

  if (!loading) return null;

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="site-intro-curtain"
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: {
              duration: 0.7,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden bg-[#201820] text-white select-none"
        >
          {/* Ambient Glows */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[380px] w-[380px] rounded-full bg-brand-blue/20 blur-[130px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[260px] w-[260px] rounded-full bg-brand-green/15 blur-[100px]" />

            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
                backgroundSize: "36px 36px",
              }}
            />
          </div>

          {/* Capsule Display */}
          <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-sm w-full">
            {/* Animated Rings */}
            <div className="relative flex h-20 w-20 items-center justify-center mb-5">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-dashed border-brand-blue/40"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 rounded-full border border-brand-green/40 border-t-transparent"
              />
              <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.05] border border-white/10 backdrop-blur-xl shadow-lg">
                <span className="text-xs font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-green">
                  BD
                </span>
              </div>
            </div>

            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-300">
                {event.brandLines?.main || "Connecting Markets"}
              </span>
            </div>

            <h1 className="mt-3.5 text-lg sm:text-xl font-extrabold tracking-[-0.02em] text-white">
              Bangladesh <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-green">Buildcon</span> 2026
            </h1>

            <p className="mt-1 text-[11px] text-slate-400 font-medium tracking-wide">
              {event.dates?.display} &bull; {event.venue?.city}
            </p>

            {/* Progress Bar */}
            <div className="mt-7 w-full">
              <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-white/10">
                <div
                  style={{ width: `${progress}%` }}
                  className="h-full bg-gradient-to-r from-brand-blue via-brand-purple to-brand-green rounded-full shadow-[0_0_12px_rgba(200,32,40,0.8)] transition-all duration-75 ease-out"
                />
              </div>

              <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="tracking-wider uppercase text-[9px] font-sans font-bold text-slate-500">
                  Loading Experience
                </span>
                <span className="tabular-nums font-semibold text-slate-200">
                  {Math.round(progress)}%
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Default export fallback
export default InitialSiteLoader;
