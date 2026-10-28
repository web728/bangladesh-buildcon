
"use client";

import Image from "next/image";
import { useId, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { Container } from "@/components/ui/Container";

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

const EASE = [0.22, 1, 0.36, 1] as const;

const contentVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

const revealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: EASE,
    },
  },
};

function ArrowDownRightIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-3.5"
      aria-hidden="true"
    >
      <path d="m7 7 10 10M8 17h9V8" />
    </svg>
  );
}

/* =========================================
   COMPACT IMAGE PANEL
========================================= */

function HeroImage({
  image,
  reducedMotion,
}: {
  image?: PageHeroProps["image"];
  reducedMotion: boolean;
}) {
  return (
    <div className="relative h-[180px] overflow-hidden sm:h-[220px] lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-[51%]">
      <motion.div
        initial={
          reducedMotion
            ? false
            : { scale: 1.055, opacity: 0.65 }
        }
        animate={{
          scale: 1,
          opacity: 1,
        }}
        transition={{
          duration: 1.15,
          ease: EASE,
        }}
        className="absolute inset-0"
      >
        <Image
          src={
            image?.src ??
            "/images/home/bangladesh-buildcon-hero.jpg"
          }
          alt={
            image?.alt ??
            "Bangladesh Buildcon Expo"
          }
          fill
          priority
          sizes="(max-width: 1023px) 100vw, 51vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Photo remains clearly visible */}
      <div className="pointer-events-none absolute inset-0 bg-[#08090D]/15" />

      {/* Seamless desktop transition */}
      <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-[#08090D] via-[#08090D]/25 to-transparent lg:block" />

      {/* Mobile transition */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#08090D]/45 to-transparent lg:hidden" />

      {/* Architectural photo corners */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-5 top-5 size-8 border-r border-t border-white/65"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-5 right-5 size-8 border-b border-r border-white/65"
      />

      {/* Fine vertical photo marker */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-7 top-1/2 hidden h-12 w-px -translate-y-1/2 bg-white/40 lg:block"
      />
    </div>
  );
}

/* =========================================
   MINIMAL ARCHITECTURAL DETAIL
========================================= */

function TechnicalDetails({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  const id = useId().replace(/:/g, "");
  const gradientId = `compact-page-wave-${id}`;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Fine technical grid on text area */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.026)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.026)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:linear-gradient(to_right,black,transparent_55%)]" />

      {/* Preserve original flowing ribbon geometry */}
      <svg
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 h-full w-full opacity-25"
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
              stopColor="#DA54AC"
              stopOpacity="0.65"
            />
            <stop
              offset="100%"
              stopColor="#BA1D82"
              stopOpacity="0"
            />
          </linearGradient>
        </defs>

        {/* Subtle original radar rings */}
        <g opacity="0.24">
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
            strokeOpacity="0.3"
          />
          <circle
            cx="80"
            cy="620"
            r="320"
            stroke="#BA1D82"
            strokeDasharray="8 12"
          />

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
            strokeOpacity="0.3"
          />
          <circle
            cx="1360"
            cy="620"
            r="340"
            stroke="#BA1D82"
            strokeDasharray="10 14"
          />
        </g>

        {Array.from({ length: 10 }).map((_, i) => (
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
            strokeWidth={i % 3 === 0 ? 1.2 : 0.8}
            strokeOpacity={0.2 + i * 0.035}
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
              duration: 1.6,
              delay: i * 0.045,
              ease: EASE,
            }}
          />
        ))}
      </svg>
    </div>
  );
}

/* =========================================
   COMPACT PREMIUM PAGE HERO
========================================= */

export function PageHero({
  title,
  highlightTitle,
  intro,
  badgeText = "Bangladesh Buildcon 2027",
  image,
  children,
}: PageHeroProps) {
  const reducedMotion = !!useReducedMotion();

  return (
    <section
      aria-label={title}
      className="relative isolate overflow-hidden bg-[#08090D] text-white selection:bg-brand-primary selection:text-white"
    >
      {/* Main content */}
      <div className="relative">
        {/* Right-side image on desktop */}
        <div className="hidden lg:block">
          <HeroImage
            image={image}
            reducedMotion={reducedMotion}
          />
        </div>

        <TechnicalDetails
          reducedMotion={reducedMotion}
        />

        <Container className="relative z-10">
          <div className="flex min-h-[275px] items-center pb-9 pt-28 sm:min-h-[305px] sm:pb-10 sm:pt-30 lg:min-h-[350px] lg:pb-11 lg:pt-28">
            <motion.div
              variants={contentVariants}
              initial={
                reducedMotion ? false : "hidden"
              }
              animate="visible"
              className="w-full max-w-[650px] lg:max-w-[59%]"
            >
              {/* Small premium eyebrow */}
              <motion.div
                variants={revealVariants}
                className="mb-4 flex items-center gap-2.5"
              >
                <span className="h-[2px] w-6 shrink-0 bg-brand-primary" />

                <span className="font-heading text-[10px] font-bold uppercase leading-relaxed tracking-[0.15em] text-[#F1A1D1] sm:text-[11px]">
                  {badgeText}
                </span>
              </motion.div>

              {/* Compact typography */}
              <h1 className="font-heading text-[clamp(1.9rem,3.25vw,2.85rem)] font-extrabold leading-[1.15] tracking-[-0.045em] text-white">
                <motion.span
                  variants={revealVariants}
                  className="block"
                >
                  {title}
                </motion.span>

                {highlightTitle && (
                  <motion.span
                    variants={revealVariants}
                    className="mt-0.5 block text-[#F1A1D1]"
                  >
                    {highlightTitle}
                  </motion.span>
                )}
              </h1>

              {/* Short accent rule */}
              <motion.div
                variants={{
                  hidden: { scaleX: 0 },
                  visible: {
                    scaleX: 1,
                    transition: {
                      duration: 0.7,
                      ease: EASE,
                    },
                  },
                }}
                className="mt-5 h-[2px] w-12 origin-left bg-brand-primary"
                aria-hidden="true"
              />

              {/* Intro */}
              {intro && (
                <motion.p
                  variants={revealVariants}
                  className="mt-4 max-w-[510px] text-[12px] leading-[1.85] text-white/65 sm:text-[13px] lg:text-[14px]"
                >
                  {intro}
                </motion.p>
              )}

              {/* Optional CTA slot */}
              {children && (
                <motion.div
                  variants={revealVariants}
                  className="mt-5 flex flex-wrap items-center gap-3"
                >
                  {children}
                </motion.div>
              )}
            </motion.div>
          </div>
        </Container>
      </div>

      {/* Image below content on mobile/tablet */}
      <div className="relative lg:hidden">
        <HeroImage
          image={image}
          reducedMotion={reducedMotion}
        />
      </div>

      {/* Compact footer strip */}
      <div className="relative z-10 border-t border-white/10 bg-[#0C0D12]">
        <Container>
          <div className="flex min-h-11 items-center justify-between gap-3 py-2.5">
            <div className="flex min-w-0 items-center gap-2.5">
              <span className="size-1.5 shrink-0 rounded-full bg-brand-primary" />

              <span className="font-heading text-[9px] font-semibold uppercase leading-relaxed tracking-[0.12em] text-white/50 sm:text-[10px]">
                International Building & Construction Exhibition
              </span>
            </div>

            <div className="flex shrink-0 items-center gap-1.5 text-[#F1A1D1]">
              <span className="font-heading text-[9px] font-bold uppercase tracking-[0.13em]">
                Explore
              </span>

              <ArrowDownRightIcon />
            </div>
          </div>
        </Container>
      </div>

      {/* Finishing accent */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 z-20 h-[2px] bg-gradient-to-r from-transparent via-brand-primary/70 to-transparent"
      />
    </section>
  );
}
