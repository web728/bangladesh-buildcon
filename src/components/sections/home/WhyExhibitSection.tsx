
"use client";

import { useState } from "react";
import Link from "next/link";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { Container } from "@/components/ui/Container";
import { event } from "@/config/event";

const EASE = [0.22, 1, 0.36, 1] as const;

type TabType = "reasons" | "who";

/* ========================================
   SCROLL ANIMATION
======================================== */

const staggerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.06,
    },
  },
};

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

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.62,
      ease: EASE,
    },
  },
};

/* ========================================
   ORIGINAL EXHIBITION PILLARS
   Content and SVG paths preserved
======================================== */

const EXHIBIT_PILLARS = [
  {
    num: "01",
    title: "Access New Buyers",
    desc: "Present products directly to companies involved in construction, procurement, and major distribution.",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
  },
  {
    num: "02",
    title: "Develop Distribution",
    desc: "Meet potential importers, distributors, wholesalers, dealers, and regional trade representatives.",
    icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  {
    num: "03",
    title: "Enter the Bangladeshi Market",
    desc: "Introduce your brand to an expanding construction audience and establish direct relationships.",
    icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    num: "04",
    title: "Generate Business Enquiries",
    desc: "Connect with contractors, developers, and corporate buyers searching for direct material suppliers.",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
  },
  {
    num: "05",
    title: "Reach Specifiers",
    desc: "Engage architects, civil engineers, and consultants who influence specification & product selection.",
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
];

/* ========================================
   ORIGINAL EXHIBITOR PROFILES
======================================== */

const EXHIBITOR_PROFILES = [
  "Manufacturers & Exporters",
  "International Suppliers",
  "Construction Machinery Companies",
  "Building Material Suppliers",
  "Engineering Product Manufacturers",
  "Building Technology Providers",
];

/* ========================================
   ICONS
======================================== */

function ArrowIcon({
  diagonal = false,
}: {
  diagonal?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4 shrink-0"
      aria-hidden="true"
    >
      {diagonal ? (
        <path d="M7 17 17 7M8 7h9v9" />
      ) : (
        <path d="M5 12h14m-6-6 6 6-6 6" />
      )}
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      aria-hidden="true"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

/* ========================================
   PREMIUM EXHIBITION PILLAR CARD
======================================== */

function PillarCard({
  item,
  reducedMotion,
}: {
  item: (typeof EXHIBIT_PILLARS)[number];
  reducedMotion: boolean;
}) {
  return (
    <motion.article
      variants={cardVariants}
      className="h-full min-w-0"
    >
      <motion.div
        initial="rest"
        whileHover={
          reducedMotion ? undefined : "hover"
        }
        variants={{
          rest: {
            y: 0,
            scale: 1,
            boxShadow:
              "0 10px 28px rgba(5,7,9,0.04)",
          },
          hover: {
            y: -8,
            scale: 1.012,
            boxShadow:
              "0 26px 54px rgba(186,29,130,0.13)",
          },
        }}
        transition={{
          duration: 0.4,
          ease: EASE,
        }}
        className="group relative flex h-full min-h-[275px] flex-col overflow-hidden rounded-2xl border border-brand-dark/10 bg-white p-5 transition-colors duration-300 hover:border-brand-primary/40 sm:p-6"
      >
        {/* Hover glow */}
        <motion.div
          aria-hidden="true"
          variants={{
            rest: { opacity: 0 },
            hover: { opacity: 1 },
          }}
          transition={{
            duration: 0.4,
          }}
          className="pointer-events-none absolute -right-16 -top-20 size-56 rounded-full bg-brand-primary/10 blur-3xl"
        />

        {/* Icon + pillar number */}
        <div className="relative z-10 flex items-start justify-between gap-3">
          <motion.div
            variants={{
              rest: {
                scale: 1,
                rotate: 0,
                color: "#BA1D82",
                backgroundColor:
                  "rgba(186,29,130,0.09)",
              },
              hover: {
                scale: 1.09,
                rotate: -6,
                color: "#FFFFFF",
                backgroundColor: "#BA1D82",
              },
            }}
            transition={{
              duration: 0.4,
              ease: EASE,
            }}
            className="flex size-12 shrink-0 items-center justify-center rounded-xl"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.65"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-6"
              aria-hidden="true"
            >
              <path d={item.icon} />
            </svg>
          </motion.div>

          <span className="font-heading text-[10px] font-bold tracking-[0.13em] text-brand-dark/35">
            {item.num}
          </span>
        </div>

        {/* Card content */}
        <div className="relative z-10 mt-6 flex-1">
          <h3 className="font-heading text-[16px] font-bold leading-[1.35] tracking-[-0.025em] text-brand-dark transition-colors duration-300 group-hover:text-brand-primary">
            {item.title}
          </h3>

          <p className="mt-3 text-[12px] leading-[1.85] text-[#646C79]">
            {item.desc}
          </p>
        </div>

        {/* Footer action */}
        <div className="relative z-10 mt-6 flex items-center justify-between border-t border-brand-dark/10 pt-4">
          <Link
            href="/exhibit"
            className="inline-flex items-center gap-2 rounded-sm font-heading text-[11px] font-bold text-brand-primary underline-offset-4 transition-colors hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary"
          >
            Read Guide
            <ArrowIcon diagonal />
          </Link>

          <motion.span
            aria-hidden="true"
            variants={{
              rest: {
                opacity: 0.35,
                x: 0,
              },
              hover: {
                opacity: 1,
                x: 4,
              },
            }}
            className="text-brand-primary"
          >
            <ArrowIcon />
          </motion.span>
        </div>

        {/* Bottom animated accent */}
        <motion.div
          aria-hidden="true"
          variants={{
            rest: { scaleX: 0.16 },
            hover: { scaleX: 1 },
          }}
          transition={{
            duration: 0.55,
            ease: EASE,
          }}
          className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-brand-primary"
        />
      </motion.div>
    </motion.article>
  );
}

/* ========================================
   PREMIUM EXHIBITOR PROFILE CARD
======================================== */

function ProfileCard({
  profile,
  index,
  reducedMotion,
}: {
  profile: string;
  index: number;
  reducedMotion: boolean;
}) {
  return (
    <motion.article
      variants={cardVariants}
      className="min-w-0"
    >
      <motion.div
        initial="rest"
        whileHover={
          reducedMotion ? undefined : "hover"
        }
        variants={{
          rest: {
            y: 0,
            scale: 1,
            boxShadow:
              "0 8px 25px rgba(5,7,9,0.03)",
          },
          hover: {
            y: -6,
            scale: 1.01,
            boxShadow:
              "0 20px 45px rgba(186,29,130,0.11)",
          },
        }}
        transition={{
          duration: 0.35,
          ease: EASE,
        }}
        className="group relative flex h-full min-h-[125px] items-center gap-4 overflow-hidden rounded-xl border border-brand-dark/10 bg-white p-5 transition-colors duration-300 hover:border-brand-primary/40 sm:p-6"
      >
        {/* Number icon */}
        <motion.span
          variants={{
            rest: {
              backgroundColor:
                "rgba(186,29,130,0.09)",
              color: "#BA1D82",
              scale: 1,
            },
            hover: {
              backgroundColor: "#BA1D82",
              color: "#FFFFFF",
              scale: 1.08,
            },
          }}
          transition={{
            duration: 0.35,
            ease: EASE,
          }}
          className="flex size-12 shrink-0 items-center justify-center rounded-xl font-heading text-[13px] font-extrabold"
        >
          {String(index + 1).padStart(2, "0")}
        </motion.span>

        {/* Text */}
        <div className="relative z-10 min-w-0">
          <h3 className="font-heading text-[14px] font-bold leading-snug text-brand-dark transition-colors duration-300 group-hover:text-brand-primary sm:text-[15px]">
            {profile}
          </h3>

          <p className="mt-1.5 text-[12px] leading-relaxed text-[#687080]">
            Connect directly with South Asia&apos;s
            building & construction procurement decision-makers.
          </p>
        </div>

        {/* Hover line */}
        <motion.div
          aria-hidden="true"
          variants={{
            rest: { scaleX: 0.12 },
            hover: { scaleX: 1 },
          }}
          transition={{
            duration: 0.5,
            ease: EASE,
          }}
          className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-brand-primary"
        />
      </motion.div>
    </motion.article>
  );
}

/* ========================================
   MAIN SECTION
======================================== */

export function WhyExhibitSection() {
  const reducedMotion = !!useReducedMotion();

  const [activeTab, setActiveTab] =
    useState<TabType>("reasons");

  return (
    <section
      aria-labelledby="why-exhibit-heading"
      className="relative isolate overflow-hidden border-b border-brand-dark/10 bg-[#FAFAFC] py-16 text-brand-dark sm:py-20 lg:py-24"
    >
      {/* Soft magenta ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_88%_10%,rgba(186,29,130,0.065),transparent_45%)]"
      />

      {/* Architectural grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(5,7,9,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(5,7,9,0.025)_1px,transparent_1px)] bg-[size:76px_76px]"
      />

      <Container className="relative z-10">
        {/* HEADER */}
        <motion.div
          variants={staggerVariants}
          initial={
            reducedMotion ? false : "hidden"
          }
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.25,
          }}
          className="flex flex-col gap-7 border-b border-brand-dark/10 pb-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-[690px]">
            {/* Eyebrow */}
            <motion.div
              variants={revealVariants}
              className="mb-5 flex items-center gap-3"
            >
              <span className="h-[2px] w-9 bg-brand-primary" />

              <span className="font-heading text-[11px] font-bold uppercase tracking-[0.16em] text-brand-primary">
                Exhibitor Intelligence
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              id="why-exhibit-heading"
              variants={revealVariants}
              className="font-heading text-[clamp(1.95rem,3.1vw,2.8rem)] leading-[1.16] font-extrabold tracking-[-0.045em] text-brand-dark"
            >
              Expand Your Reach in{" "}
              <span className="text-brand-primary">
                South Asia&apos;s Building & Construction Hub
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={revealVariants}
              className="mt-5 max-w-[620px] text-[14px] leading-[1.85] text-[#606A77] sm:text-[15px]"
            >
              Connect directly with qualified contractors,
              developers, specifiers, and procurement
              leaders across Bangladesh and neighboring
              trade corridors.
            </motion.p>
          </div>

          {/* CTA */}
          <motion.div
            variants={revealVariants}
            className="shrink-0"
          >
            <Link
              href={event.cta.bookStand}
              className="group inline-flex min-h-11 items-center justify-center gap-3 rounded-lg bg-brand-primary px-6 py-3 font-heading text-[12px] font-bold text-white shadow-[0_10px_26px_rgba(186,29,130,0.19)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-primary-dark"
            >
              Book a Stand

              <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowIcon diagonal />
              </span>
            </Link>
          </motion.div>
        </motion.div>

        {/* INTERACTIVE TABS */}
        <motion.div
          initial={
            reducedMotion
              ? false
              : { opacity: 0, y: 16 }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.65,
            delay: 0.1,
            ease: EASE,
          }}
          className="mt-8"
        >
          <div
            role="tablist"
            aria-label="Exhibitor information"
            className="inline-flex max-w-full gap-1 overflow-x-auto rounded-xl border border-brand-dark/10 bg-white p-1.5 shadow-[0_4px_20px_rgba(5,7,9,0.035)]"
          >
            {(
              [
                {
                  id: "reasons",
                  label: "Core Pillars",
                },
                {
                  id: "who",
                  label: "Who Should Exhibit?",
                },
              ] as const
            ).map((tab) => {
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  id={`exhibit-tab-${tab.id}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="exhibit-tab-panel"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() =>
                    setActiveTab(tab.id)
                  }
                  onKeyDown={(event) => {
                    if (
                      event.key !== "ArrowLeft" &&
                      event.key !== "ArrowRight" &&
                      event.key !== "Home" &&
                      event.key !== "End"
                    ) {
                      return;
                    }

                    event.preventDefault();

                    const next: TabType =
                      activeTab === "reasons"
                        ? "who"
                        : "reasons";

                    setActiveTab(next);

                    document
                      .getElementById(
                        `exhibit-tab-${next}`
                      )
                      ?.focus();
                  }}
                  className={
                    "relative flex min-h-10 shrink-0 items-center justify-center overflow-hidden rounded-lg px-4 py-2.5 font-heading text-[12px] font-bold whitespace-nowrap transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-brand-primary sm:px-5 " +
                    (isActive
                      ? "text-white"
                      : "text-brand-dark/65 hover:text-brand-primary")
                  }
                >
                  {/* Sliding active tab background */}
                  {isActive && (
                    <motion.span
                      layoutId="exhibit-active-tab-bg"
                      className="absolute inset-0 rounded-lg bg-brand-dark"
                      transition={{
                        type: "spring",
                        stiffness: 360,
                        damping: 30,
                      }}
                      aria-hidden="true"
                    />
                  )}

                  <span className="relative z-10">
                    {tab.label}
                  </span>

                  {isActive && (
                    <motion.span
                      layoutId="exhibit-active-tab-line"
                      className="absolute inset-x-3 bottom-0 z-10 h-[2px] rounded-full bg-brand-primary"
                      transition={{
                        type: "spring",
                        stiffness: 360,
                        damping: 30,
                      }}
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ANIMATED TAB CONTENT */}
        <div
          id="exhibit-tab-panel"
          role="tabpanel"
          aria-labelledby={`exhibit-tab-${activeTab}`}
          className="mt-8 min-h-[300px]"
        >
          <AnimatePresence
            mode="wait"
            initial={false}
          >
            {activeTab === "reasons" ? (
              <motion.div
                key="reasons"
                variants={staggerVariants}
                initial={
                  reducedMotion
                    ? false
                    : "hidden"
                }
                animate="visible"
                exit={
                  reducedMotion
                    ? { opacity: 1 }
                    : {
                        opacity: 0,
                        y: -12,
                        transition: {
                          duration: 0.2,
                        },
                      }
                }
                className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
              >
                {EXHIBIT_PILLARS.map((item) => (
                  <PillarCard
                    key={item.num}
                    item={item}
                    reducedMotion={reducedMotion}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="who"
                variants={staggerVariants}
                initial={
                  reducedMotion
                    ? false
                    : "hidden"
                }
                animate="visible"
                exit={
                  reducedMotion
                    ? { opacity: 1 }
                    : {
                        opacity: 0,
                        y: -12,
                        transition: {
                          duration: 0.2,
                        },
                      }
                }
                className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                {EXHIBITOR_PROFILES.map(
                  (profile, index) => (
                    <ProfileCard
                      key={profile}
                      profile={profile}
                      index={index}
                      reducedMotion={reducedMotion}
                    />
                  )
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* BOTTOM PARTICIPATION CTA */}
        <motion.div
          initial={
            reducedMotion
              ? false
              : { opacity: 0, y: 24 }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.75,
            ease: EASE,
          }}
          className="relative mt-10 overflow-hidden rounded-2xl bg-brand-dark p-6 text-white sm:p-8"
        >
          {/* Decorative glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-brand-primary/20 blur-[85px]"
          />

          <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2.5">
                <span className="size-2 rounded-full bg-brand-primary" />

                <span className="font-heading text-[10px] font-bold uppercase tracking-[0.16em] text-[#F2A8D8]">
                  Exhibitor Participation
                </span>
              </div>

              <p className="max-w-[630px] font-heading text-[17px] font-semibold leading-[1.5] tracking-tight text-white sm:text-[20px]">
                Explore opportunities to showcase your
                products at Bangladesh Buildcon.
              </p>
            </div>

            <Link
              href={event.cta.bookStand}
              className="group inline-flex min-h-11 shrink-0 items-center justify-center gap-3 self-start rounded-lg bg-brand-primary px-6 py-3 font-heading text-[12px] font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-primary-dark sm:self-auto"
            >
              Book a Stand

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <ArrowIcon />
              </span>
            </Link>
          </div>

          {/* Bottom brand accent */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-[3px] bg-brand-primary"
          />
        </motion.div>
      </Container>
    </section>
  );
}
