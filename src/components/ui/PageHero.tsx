
"use client";

import Image from "next/image";
import { useId, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { Container } from "@/components/ui/Container";

/* =========================================
   TYPES — EXISTING API PRESERVED
========================================= */

interface PageHeroProps {
  title: string;
  highlightTitle?: string;
  intro?: string;
  badgeText?: string;
  image?: {
    src: string;
    alt: string;
  };
  children?: ReactNode;
}

/* =========================================
   MOTION SETTINGS
========================================= */

const EASE = [0.22, 1, 0.36, 1] as const;

const contentVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.12,
    },
  },
};

const textReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: EASE,
    },
  },
};

/* =========================================
   SMALL SVG ICONS
========================================= */

function ArrowDownRightIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      aria-hidden="true"
    >
      <path d="M7 7l10 10M8 17h9V8" />
    </svg>
  );
}

/* =========================================
   ARCHITECTURAL PHOTO PANEL
========================================= */

function HeroImagePanel({
  image,
  reducedMotion,
}: {
  image?: PageHeroProps["image"];
  reducedMotion: boolean;
}) {
  const src =
    image?.src ??
    "/images/home/bangladesh-buildcon-hero.jpg";

  const alt =
    image?.alt ?? "Bangladesh Buildcon Expo";

  return (
    <div className="relative h-[290px] overflow-hidden sm:h-[370px] lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-[50%] xl:w-[52%]">
      {/* Image reveal */}
      <motion.div
        initial={
          reducedMotion
            ? false
            : {
                opacity: 0,
                scale: 1.08,
              }
        }
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1.4,
          ease: EASE,
        }}
        className="absolute inset-0"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(max-width: 1023px) 100vw, 52vw"
          className="object-cover"
          style={{
            objectPosition: "center center",
          }}
        />
      </motion.div>

      {/* Light darkening for cinematic consistency */}
      <div className="pointer-events-none absolute inset-0 bg-[#08090C]/20" />

      {/* Desktop transition into the text panel */}
      <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-[#08090C] via-[#08090C]/30 to-transparent lg:block" />

      {/* Mobile transition */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#08090C] via-transparent to-[#08090C]/30 lg:hidden" />

      {/* Architectural corner markers */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-5 top-5 size-12 border-r-2 border-t-2 border-white/55 sm:right-8 sm:top-8"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-5 right-5 size-12 border-b-2 border-r-2 border-white/55 sm:bottom-8 sm:right-8"
      />

      {/* Image-side label */}
      <motion.div
        initial={
          reducedMotion
            ? false
            : { opacity: 0, x: 20 }
        }
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 0.8,
          delay: 0.7,
          ease: EASE,
        }}
        className="absolute bottom-8 right-8 hidden items-center gap-2.5 lg:flex"
      >
        <span className="h-px w-9 bg-white/70" />

        <span className="font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-white/90">
          Bangladesh Buildcon
        </span>
      </motion.div>
    </div>
  );
}

/* =========================================
   SUBTLE TECHNICAL BACKGROUND
========================================= */

function TechnicalOverlay({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  const id = useId().replace(/:/g, "");
  const gradientId = `hero-lines-${id}`;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Restrained structural grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_right,black,transparent_65%)]" />

      {/* Original ribbon geometry, much more subtle */}
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        className="absolute inset-0 h-full w-full opacity-30"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id={gradientId}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop
              offset="0%"
              stopColor="#BA1D82"
              stopOpacity="0"
            />
            <stop
              offset="50%"
              stopColor="#BA1D82"
              stopOpacity="0.65"
            />
            <stop
              offset="100%"
              stopColor="#BA1D82"
              stopOpacity="0"
            />
          </linearGradient>
        </defs>

        {Array.from({ length: 10 }).map(
          (_, i) => (
            <motion.path
              key={i}
              d={`M-100,${520 + i * 16} C${
                240 + i * 14
              },${400 + i * 10} ${
                580 - i * 10
              },${680 - i * 8} ${
                920 + i * 8
              },${520 + i * 6} C${
                1200 - i * 8
              },${400 + i * 10} 1360,${
                610 - i * 6
              } 1600,${500 + i * 8}`}
              stroke={`url(#${gradientId})`}
              strokeWidth={
                i % 3 === 0 ? 1.3 : 0.8
              }
              strokeOpacity={
                0.2 + (i / 10) * 0.35
              }
              initial={
                reducedMotion
                  ? false
                  : {
                      opacity: 0,
                      pathLength: 0,
                    }
              }
              animate={{
                opacity: 1,
                pathLength: 1,
              }}
              transition={{
                duration: 2.1,
                delay: i * 0.065,
                ease: EASE,
              }}
            />
          )
        )}

        {/* Original left radar geometry */}
        <g opacity="0.32">
          <circle
            cx="80"
            cy="620"
            r="150"
            stroke="#BA1D82"
            strokeDasharray="5 7"
          />
          <circle
            cx="80"
            cy="620"
            r="230"
            stroke="#FFFFFF"
            strokeOpacity="0.22"
          />
          <circle
            cx="80"
            cy="620"
            r="320"
            stroke="#BA1D82"
            strokeDasharray="8 12"
          />
        </g>

        {/* Original right radar geometry */}
        <g opacity="0.22">
          <circle
            cx="1360"
            cy="620"
            r="160"
            stroke="#BA1D82"
            strokeDasharray="6 8"
          />
          <circle
            cx="1360"
            cy="620"
            r="250"
            stroke="#FFFFFF"
            strokeOpacity="0.2"
          />
          <circle
            cx="1360"
            cy="620"
            r="340"
            stroke="#BA1D82"
            strokeDasharray="10 14"
          />
        </g>
      </svg>

      {/* Restrained left glow */}
      <div className="absolute -bottom-48 -left-52 size-[470px] rounded-full bg-brand-primary/[0.07] blur-[115px]" />
    </div>
  );
}

/* =========================================
   MAIN PAGE HERO
========================================= */

export function PageHero({
  title,
  highlightTitle,
  intro,
  badgeText = "Bangladesh Buildcon 2026",
  image,
  children,
}: PageHeroProps) {
  const reducedMotion = !!useReducedMotion();

  return (
    <section
      aria-label={title}
      className="relative isolate overflow-hidden bg-[#08090C] text-white selection:bg-brand-primary selection:text-white"
    >
      {/* Main photo — desktop right / mobile below */}
      <HeroImagePanel
        image={image}
        reducedMotion={reducedMotion}
      />

      {/* Subtle architectural detail */}
      <TechnicalOverlay
        reducedMotion={reducedMotion}
      />

      {/* Content */}
      <Container className="relative z-10">
        <div className="flex min-h-[390px] items-center pb-12 pt-32 sm:min-h-[460px] sm:pb-16 sm:pt-36 lg:min-h-[540px] lg:pb-20 lg:pt-40">
          <motion.div
            variants={contentVariants}
            initial={
              reducedMotion
                ? false
                : "hidden"
            }
            animate="visible"
            className="relative w-full max-w-[810px] lg:max-w-[64%]"
          >
            {/* Editorial label */}
            <motion.div
              variants={textReveal}
              className="mb-7 flex items-center gap-3"
            >
              <motion.span
                initial={
                  reducedMotion
                    ? false
                    : { scaleX: 0 }
                }
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 0.8,
                  ease: EASE,
                }}
                className="h-[2px] w-9 origin-left bg-brand-primary"
              />

              <span className="font-heading text-[10px] font-bold uppercase leading-relaxed tracking-[0.18em] text-[#EFA3D1] sm:text-[11px]">
                {badgeText}
              </span>
            </motion.div>

            {/* Main heading */}
            <h1 className="font-heading text-[clamp(2.55rem,5.7vw,5.5rem)] font-extrabold leading-[1.04] tracking-[-0.065em] text-white">
              <motion.span
                variants={textReveal}
                className="block"
              >
                {title}
              </motion.span>

              {highlightTitle && (
                <motion.span
                  variants={textReveal}
                  className="mt-1 block text-[#EFA3D1]"
                >
                  {highlightTitle}
                </motion.span>
              )}
            </h1>

            {/* Underline accent */}
            <motion.div
              variants={{
                hidden: { scaleX: 0 },
                visible: {
                  scaleX: 1,
                  transition: {
                    duration: 0.85,
                    ease: EASE,
                  },
                },
              }}
              aria-hidden="true"
              className="mt-7 h-[3px] w-16 origin-left rounded-full bg-brand-primary"
            />

            {/* Supporting intro */}
            {intro && (
              <motion.p
                variants={textReveal}
                className="mt-6 max-w-[570px] text-[14px] leading-[1.9] text-white/70 sm:text-[16px]"
              >
                {intro}
              </motion.p>
            )}

            {/* Existing optional CTAs */}
            {children && (
              <motion.div
                variants={textReveal}
                className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4"
              >
                {children}
              </motion.div>
            )}
          </motion.div>
        </div>
      </Container>

      {/* Bottom editorial information strip */}
      <div className="relative z-10 border-t border-white/10 bg-[#0B0C11]/90 backdrop-blur-md">
        <Container>
          <div className="flex min-h-15 flex-wrap items-center justify-between gap-3 py-4">
            <motion.div
              initial={
                reducedMotion
                  ? false
                  : { opacity: 0, y: 10 }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.55,
                ease: EASE,
              }}
              className="flex items-center gap-3"
            >
              <span className="size-1.5 rounded-full bg-brand-primary" />

              <span className="font-heading text-[10px] font-bold uppercase tracking-[0.14em] text-white/50 sm:text-[11px]">
                International Construction Exhibition
              </span>
            </motion.div>

            <motion.div
              initial={
                reducedMotion
                  ? false
                  : { opacity: 0, x: -10 }
              }
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.7,
                ease: EASE,
              }}
              className="flex items-center gap-2 text-[#EFA3D1]"
            >
              <span className="font-heading text-[10px] font-bold uppercase tracking-[0.17em]">
                Explore
              </span>

              <ArrowDownRightIcon />
            </motion.div>
          </div>
        </Container>
      </div>

      {/* Fine magenta lower border */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 z-20 h-[2px] bg-gradient-to-r from-transparent via-brand-primary/75 to-transparent"
      />
    </section>
  );
}
