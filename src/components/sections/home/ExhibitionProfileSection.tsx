
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

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: EASE,
    },
  },
};

const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.06,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 25,
    scale: 0.975,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.58,
      ease: EASE,
    },
  },
};

/* ----------------------------------------
   EXHIBITION SECTOR DATA
---------------------------------------- */

type Sector = {
  title: string;
  items: string;
  icon: string;
};

type SectorTab = {
  id: string;
  label: string;
  sectors: Sector[];
};

const sectorTabs: SectorTab[] = [
  {
    id: "structural",
    label: "Structural & Heavy",
    sectors: [
      {
        title: "Building Materials",
        items:
          "Cement, Concrete Blocks, Gypsum Boards, Roofing & Cladding",
        icon:
          "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
      },
      {
        title: "Construction Machinery",
        items:
          "Earthmoving, Excavators, Concrete Batching, Cranes & Scaffolding",
        icon:
          "M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
      },
      {
        title: "Steel & Structural Metal",
        items:
          "Reinforcement Steel, Pipes, Tubes, Profiles & Fabricated Units",
        icon: "M4 6h16M4 10h16M4 14h16M4 18h16",
      },
      {
        title: "Prefab & Precast",
        items:
          "Modular Buildings, Precast Concrete, Structural Prefab Systems",
        icon:
          "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
      },
    ],
  },
  {
    id: "architectural",
    label: "Doors, Glass & Surfaces",
    sectors: [
      {
        title: "Doors, Windows & Glass",
        items:
          "Aluminium Profiles, uPVC Systems, Architectural Facades & Hardware",
        icon:
          "M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 12h16M12 4v16",
      },
      {
        title: "Tiles, Marble & Stone",
        items:
          "Ceramic & Porcelain, Granite, Natural Stone & Surface Finishes",
        icon:
          "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z",
      },
      {
        title: "Interiors & Finishing",
        items:
          "Ceilings, Wall Panels, Decorative Laminates & Wood Products",
        icon:
          "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
      },
      {
        title: "Paints & Chemicals",
        items:
          "Decorative Paints, Waterproofing, Sealants & Concrete Admixtures",
        icon:
          "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z",
      },
    ],
  },
  {
    id: "mep",
    label: "MEP, Plumbing & Bath",
    sectors: [
      {
        title: "Water & Plumbing Pumps",
        items:
          "Pipes & Fittings, Water Pumps, Storage Tanks & Treatment Systems",
        icon:
          "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z",
      },
      {
        title: "Sanitaryware & Bath",
        items:
          "Faucets, Showers, Bathroom Fixtures & Sanitary Ceramics",
        icon:
          "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
      },
      {
        title: "HVAC & Mechanical",
        items:
          "Air Conditioning, Ventilation, Refrigeration & Building Services",
        icon:
          "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
      },
      {
        title: "Hardware & Tools",
        items:
          "Power Tools, Fasteners, Drilling Equipment & Workshop Gear",
        icon:
          "M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z",
      },
    ],
  },
  {
    id: "energy",
    label: "Electrical & Energy",
    sectors: [
      {
        title: "Electrical & Lighting",
        items:
          "Cables, Transformers, Switchgear, Industrial LED & Panels",
        icon: "M13 10V3L4 14h7v7l9-11h-7z",
      },
      {
        title: "Solar & Energy Solutions",
        items:
          "Solar PV Panels, Inverters, Backup Power & Clean Energy",
        icon:
          "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z",
      },
      {
        title: "Fire, Safety & Security",
        items:
          "Fire Protection, Site Safety, Access Control & Surveillance",
        icon:
          "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
      },
    ],
  },
];

/* ----------------------------------------
   ICONS
---------------------------------------- */

function ArrowUpRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      aria-hidden="true"
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      aria-hidden="true"
    >
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

/* ----------------------------------------
   PREMIUM SECTOR CARD
---------------------------------------- */

function SectorCard({
  sector,
  index,
  reducedMotion,
}: {
  sector: Sector;
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
              "0 6px 24px rgba(5,7,9,0.03)",
          },
          hover: {
            y: -7,
            scale: 1.012,
            boxShadow:
              "0 24px 54px rgba(5,7,9,0.10)",
          },
        }}
        transition={{
          duration: 0.38,
          ease: EASE,
        }}
        className="group relative flex h-full min-h-[265px] flex-col overflow-hidden rounded-2xl border border-brand-dark/[0.09] bg-white p-6 transition-colors duration-300 hover:border-brand-primary/35 sm:p-7"
      >
        {/* Hover spotlight */}
        <motion.div
          aria-hidden="true"
          variants={{
            rest: { opacity: 0 },
            hover: { opacity: 1 },
          }}
          transition={{ duration: 0.4 }}
          className="pointer-events-none absolute -right-16 -top-20 size-56 rounded-full bg-brand-primary/[0.07] blur-3xl"
        />

        {/* Icon & number */}
        <div className="relative z-10 flex items-start justify-between gap-4">
          <motion.div
            variants={{
              rest: {
                scale: 1,
                rotate: 0,
                backgroundColor:
                  "rgba(186,29,130,0.08)",
                color: "#BA1D82",
              },
              hover: {
                scale: 1.08,
                rotate: -5,
                backgroundColor: "#BA1D82",
                color: "#FFFFFF",
              },
            }}
            transition={{
              duration: 0.35,
              ease: EASE,
            }}
            className="flex size-12 shrink-0 items-center justify-center rounded-xl"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-6"
              aria-hidden="true"
            >
              <path d={sector.icon} />
            </svg>
          </motion.div>

        
        </div>

        {/* Main information */}
        <div className="relative z-10 mt-6 flex-1">
          <h3 className="font-heading text-[17px] font-bold leading-snug tracking-[-0.025em] text-brand-dark transition-colors duration-300 group-hover:text-brand-primary">
            {sector.title}
          </h3>

          <p className="mt-3 text-[13px] leading-[1.75] text-[#657080]">
            {sector.items}
          </p>
        </div>

        {/* Animated bottom accent */}
        <div className="relative z-10 mt-6 flex items-center justify-between border-t border-brand-dark/10 pt-4">
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-dark/45">
            Exhibit Category
          </span>

          <motion.span
            aria-hidden="true"
            variants={{
              rest: {
                opacity: 0.5,
                x: 0,
              },
              hover: {
                opacity: 1,
                x: 4,
              },
            }}
            transition={{
              duration: 0.3,
            }}
            className="text-brand-primary"
          >
            <ArrowUpRight />
          </motion.span>
        </div>

        <motion.div
          aria-hidden="true"
          variants={{
            rest: { scaleX: 0.13 },
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

/* ----------------------------------------
   MAIN EXHIBITION PROFILE SECTION
---------------------------------------- */

export function ExhibitionProfileSection() {
  const reducedMotion = !!useReducedMotion();

  const [activeTab, setActiveTab] = useState(
    sectorTabs[0].id
  );

  const currentGroup =
    sectorTabs.find((tab) => tab.id === activeTab) ??
    sectorTabs[0];

  return (
    <section
      aria-labelledby="exhibition-profile-heading"
      className="relative isolate overflow-hidden border-b border-brand-dark/10 bg-[#FAFAFC] py-16 text-brand-dark sm:py-20 lg:py-24"
    >
      {/* Soft brand background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_85%_0%,rgba(186,29,130,0.055),transparent_45%)]"
      />

      {/* Subtle architectural grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(5,7,9,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(5,7,9,0.025)_1px,transparent_1px)] bg-[size:80px_80px]"
      />

      <Container className="relative z-10">
        {/* SECTION HEADING */}
        <motion.div
          initial={
            reducedMotion
              ? false
              : { opacity: 0, y: 24 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 0.8,
            ease: EASE,
          }}
          className="flex flex-col gap-6 border-b border-brand-dark/10 pb-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-[750px]">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-[2px] w-9 bg-brand-primary" />

              <span className="font-heading text-[11px] font-bold uppercase tracking-[0.16em] text-brand-primary">
                What&apos;s On Display • Industry Sectors
              </span>
            </div>

            <h2
              id="exhibition-profile-heading"
              className="font-heading text-[clamp(1.95rem,3.3vw,2.85rem)] leading-[1.17] font-extrabold tracking-[-0.045em] text-brand-dark"
            >
              Products, Machinery &amp;{" "}
              <span className="text-brand-primary">
                Materials on Display
              </span>
            </h2>

            <p className="mt-5 max-w-[650px] text-[14px] leading-[1.85] text-[#626A77] sm:text-[15px]">
              Covering the entire building supply chain
              across all official exhibit categories
              with live product showcases and working
              machinery displays.
            </p>
          </div>

          <Link
            href="/exhibition-profile"
            className="group inline-flex min-h-11 shrink-0 items-center justify-center gap-2.5 self-start rounded-lg border border-brand-dark/15 bg-white px-5 py-3 font-heading text-[12px] font-bold text-brand-dark transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-primary/40 hover:text-brand-primary lg:self-auto"
          >
            All Sectors Page
            <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight />
            </span>
          </Link>
        </motion.div>

        {/* INTERACTIVE CATEGORY TABS */}
        <motion.div
          initial={
            reducedMotion
              ? false
              : { opacity: 0, y: 16 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            delay: 0.1,
            ease: EASE,
          }}
          className="mt-8"
        >
          <div
            role="tablist"
            aria-label="Exhibition sector categories"
            className="flex gap-2 overflow-x-auto pb-3 sm:flex-wrap sm:overflow-visible sm:pb-0"
          >
            {sectorTabs.map((tab) => {
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  id={`sector-tab-${tab.id}`}
                  aria-selected={isActive}
                  aria-controls="sector-tab-panel"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveTab(tab.id)}
                  onKeyDown={(event) => {
                    const index = sectorTabs.findIndex(
                      (item) => item.id === activeTab
                    );

                    let nextIndex = index;

                    if (event.key === "ArrowRight") {
                      nextIndex =
                        (index + 1) % sectorTabs.length;
                    } else if (event.key === "ArrowLeft") {
                      nextIndex =
                        (index - 1 + sectorTabs.length) %
                        sectorTabs.length;
                    } else if (event.key === "Home") {
                      nextIndex = 0;
                    } else if (event.key === "End") {
                      nextIndex = sectorTabs.length - 1;
                    } else {
                      return;
                    }

                    event.preventDefault();

                    setActiveTab(sectorTabs[nextIndex].id);

                    document
                      .getElementById(
                        `sector-tab-${sectorTabs[nextIndex].id}`
                      )
                      ?.focus();
                  }}
                  className={
                    "relative inline-flex min-h-11 shrink-0 items-center gap-2.5 overflow-hidden rounded-lg px-4 py-3 font-heading text-[12px] font-bold whitespace-nowrap transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary sm:px-5 " +
                    (isActive
                      ? "bg-brand-dark text-white shadow-[0_8px_24px_rgba(5,7,9,0.10)]"
                      : "border border-brand-dark/10 bg-white text-brand-dark/70 hover:border-brand-primary/30 hover:text-brand-primary")
                  }
                >
                  <span className="relative z-10">
                    {tab.label}
                  </span>

                  

                  {/* Animated active indicator */}
                  {isActive && (
                    <motion.span
                      layoutId="sector-active-indicator"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                      className="absolute inset-x-0 bottom-0 h-[3px] bg-brand-primary"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ANIMATED CARDS GRID */}
        <div
          id="sector-tab-panel"
          role="tabpanel"
          aria-labelledby={`sector-tab-${activeTab}`}
          className="mt-7 min-h-[300px]"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeTab}
              variants={gridVariants}
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
              className="grid auto-rows-fr gap-5 md:grid-cols-2 xl:grid-cols-3"
            >
              {currentGroup.sectors.map(
                (sector, index) => (
                  <SectorCard
                    key={sector.title}
                    sector={sector}
                    index={index}
                    reducedMotion={reducedMotion}
                  />
                )
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* BOTTOM BOOKING BANNER */}
        <motion.div
          initial={
            reducedMotion
              ? false
              : { opacity: 0, y: 22 }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            ease: EASE,
          }}
          className="relative mt-10 overflow-hidden rounded-2xl bg-brand-dark p-6 text-white sm:p-8"
        >
          {/* Decorative magenta glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-28 size-72 rounded-full bg-brand-primary/20 blur-[85px]"
          />

          <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-[600px]">
              <div className="mb-2 flex items-center gap-2.5">
                <span className="size-2 rounded-full bg-brand-primary" />
                <span className="font-heading text-[10px] font-bold uppercase tracking-[0.16em] text-[#F2A8D8]">
                  Exhibition Participation
                </span>
              </div>

              <p className="font-heading text-[16px] font-semibold leading-[1.6] tracking-tight text-white sm:text-[18px]">
                Explore stand booking opportunities
                for manufacturers and suppliers.
              </p>
            </div>

            <Link
              href={event.cta.bookStand}
              className="group inline-flex min-h-11 shrink-0 items-center justify-center gap-3 self-start rounded-lg bg-brand-primary px-6 py-3 font-heading text-[12px] font-bold text-white shadow-[0_10px_26px_rgba(186,29,130,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-primary-dark sm:self-auto"
            >
              Reserve Your Space

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight />
              </span>
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
