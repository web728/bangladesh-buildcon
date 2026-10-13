
"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";

/* ==========================================
   FRAMER MOTION
========================================== */

const EASE = [0.22, 1, 0.36, 1] as const;

const reveal: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
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

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.04,
    },
  },
};

/* ==========================================
   BROCHURE PAGE 4 — WHY EXHIBIT?

   Wording adapted for readability while
   keeping the original brochure meaning.
========================================== */

const WHY_EXHIBIT = [
  {
    number: "01",
    title: "Booming Building & Construction Industry",
    description:
      "The brochure highlights the construction sector's contribution of over 8% to GDP and its demand for advanced construction machinery, equipment and building materials.",
    icon: "growth",
  },
  {
    number: "02",
    title: "Infrastructure Development Priorities",
    description:
      "Government initiatives, private-sector participation and international collaboration support opportunities in infrastructure development, sustainable construction and new technologies.",
    icon: "infrastructure",
  },
  {
    number: "03",
    title: "Rapid Urbanisation & Population Growth",
    description:
      "The brochure identifies population growth, urbanisation and expanding housing needs as important drivers of demand for modern construction technologies and materials.",
    icon: "city",
  },
  {
    number: "04",
    title: "Strategic Location & Regional Connectivity",
    description:
      "Bangladesh's position between South and Southeast Asia presents international manufacturers with opportunities to explore regional markets and industry partnerships.",
    icon: "network",
  },
  {
    number: "05",
    title: "High Infrastructure Development Demand",
    description:
      "Residential, commercial and industrial development creates opportunities for suppliers of building materials, construction equipment and related technologies.",
    icon: "building",
  },
  {
    number: "06",
    title: "Demand for Quality & Sustainable Materials",
    description:
      "Modern housing and infrastructure projects create interest in durable building products, sustainable materials and technologies that improve construction efficiency.",
    icon: "layers",
  },
  {
    number: "07",
    title: "Resilient Infrastructure & Industrial Growth",
    description:
      "The brochure highlights demand for disaster-resistant construction solutions, alongside development of economic zones, industrial facilities, warehouses and supporting infrastructure.",
    icon: "shield",
  },
] as const;

/* ==========================================
   BROCHURE PAGE 3 — EXHIBITOR PROFILE
========================================== */

const EXHIBITOR_CATEGORIES = [
  {
    title: "Construction Machinery and Equipment",
    examples:
      "Construction machinery, cranes, trailers, loaders, trucks, tools, welding equipment and HVAC.",
  },
  {
    title: "Construction Materials",
    examples:
      "Prefabricated structures, façade materials, roofing, insulation, waterproofing and finishing materials.",
  },
  {
    title: "Construction",
    examples:
      "Urban development, architecture, roads, reconstruction, automation and resource-saving construction technologies.",
  },
  {
    title: "Country Housing Landscaping",
    examples:
      "Wooden houses, log buildings, wooden-frame houses, garden houses and landscape design.",
  },
  {
    title:
      "Electricity and Electrical Engineering in Construction",
    examples:
      "Distribution systems, transformer stations, electrical equipment, instrumentation and energy-saving systems.",
  },
  {
    title: "Interior & Exterior",
    examples:
      "Interior and exterior design, roofing, furniture, glass, paints, doors and associated services.",
  },
  {
    title: "Safety & Security",
    examples:
      "Electrical safety, emergency alarms, emergency lighting, rescue equipment and security systems.",
  },
] as const;

/* ==========================================
   BROCHURE PAGE 4 — KEY FEATURES
========================================== */

const EVENT_FEATURES = [
  {
    title: "International Exhibitors & Country Pavilions",
    icon: "globe",
  },
  {
    title: "Live Demonstrations & Product Launches",
    icon: "presentation",
  },
  {
    title: "B2B Matchmaking Opportunities",
    icon: "network",
  },
  {
    title: "Industry Conferences & Technical Seminars",
    icon: "conference",
  },
] as const;

/* ==========================================
   ICON COMPONENTS
========================================== */

type IconName =
  | "growth"
  | "infrastructure"
  | "city"
  | "network"
  | "building"
  | "layers"
  | "shield"
  | "globe"
  | "presentation"
  | "conference";

function IndustryIcon({
  name,
  className = "size-5",
}: {
  name: IconName;
  className?: string;
}) {
  const paths: Record<IconName, ReactNode> = {
    growth: (
      <>
        <path d="M3 17 9 11l4 4 8-9" />
        <path d="M15 6h6v6" />
        <path d="M3 21h18" />
      </>
    ),
    infrastructure: (
      <>
        <path d="M3 21h18M6 21V9l6-5 6 5v12" />
        <path d="M9 12h6M9 16h6" />
        <path d="M12 4v17" />
      </>
    ),
    city: (
      <>
        <path d="M3 21V10h7v11M10 21V4h8v17M18 21v-9h3v9" />
        <path d="M6 13h1M6 17h1M13 8h2M13 12h2M13 16h2" />
      </>
    ),
    network: (
      <>
        <circle cx="12" cy="5" r="2" />
        <circle cx="5" cy="18" r="2" />
        <circle cx="19" cy="18" r="2" />
        <path d="m11 7-5 9m7-9 5 9M7 18h10" />
      </>
    ),
    building: (
      <>
        <path d="M4 21V5h11v16M15 10h5v11M2 21h20" />
        <path d="M8 9h3M8 13h3M8 17h3M18 14h1M18 18h1" />
      </>
    ),
    layers: (
      <>
        <path d="m12 3 9 5-9 5-9-5 9-5Z" />
        <path d="m3 12 9 5 9-5M3 16l9 5 9-5" />
      </>
    ),
    shield: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    globe: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c-3 3-3 15 0 18M12 3c3 3 3 15 0 18" />
      </>
    ),
    presentation: (
      <>
        <rect x="3" y="3" width="18" height="13" rx="2" />
        <path d="M12 16v5M8 21h8m-8-9 3-3 3 2 3-4" />
      </>
    ),
    conference: (
      <>
        <rect x="3" y="3" width="18" height="12" rx="2" />
        <path d="M8 21h8M12 15v6M7 9h10M7 12h6" />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

function ArrowIcon() {
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
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="h-[2px] w-7 bg-brand-primary" />

      <span className="font-heading text-[10px] font-extrabold uppercase tracking-[0.16em] text-brand-primary-dark">
        {children}
      </span>
    </div>
  );
}

function SectionHeading({
  id,
  eyebrow,
  first,
  highlight,
  description,
}: {
  id: string;
  eyebrow: string;
  first: string;
  highlight: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-brand-border pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-[690px]">
        <Eyebrow>{eyebrow}</Eyebrow>

        <h2
          id={id}
          className="mt-3 font-heading text-[clamp(1.5rem,2.6vw,2.1rem)] font-extrabold leading-[1.2] tracking-[-0.04em] text-brand-dark"
        >
          {first}{" "}
          <span className="text-brand-primary-dark">
            {highlight}
          </span>
        </h2>
      </div>

      {description && (
        <p className="max-w-[390px] text-[13px] leading-[1.85] text-brand-body">
          {description}
        </p>
      )}
    </div>
  );
}

/* ==========================================
   MAIN COMPONENT
========================================== */

export function ExhibitClientView() {
  const reducedMotion = !!useReducedMotion();

  const motionProps = {
    initial: reducedMotion ? false : "hidden",
    whileInView: "visible" as const,
    viewport: {
      once: true,
      amount: 0.08,
    },
  };

  return (
    <div className="relative overflow-hidden bg-brand-light py-12 text-brand-dark sm:py-16">
      {/* Architectural grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(5,7,9,0.018)_1px,transparent_1px),linear-gradient(to_bottom,rgba(5,7,9,0.018)_1px,transparent_1px)] bg-[size:64px_64px]"
      />

      <Container className="relative z-10">
        {/* =====================================
            01 — WHY EXHIBIT
        ====================================== */}

        <section aria-labelledby="why-exhibit-heading">
          <motion.div {...motionProps} variants={reveal}>
            <SectionHeading
              id="why-exhibit-heading"
              eyebrow="Official Brochure · Why Exhibit?"
              first="Why Exhibit at"
              highlight="Bangladesh Buildcon?"
              description="Explore the seven market and industry factors highlighted in the official 2026 exhibition brochure."
            />
          </motion.div>

          <motion.div
            variants={stagger}
            initial={reducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.06 }}
            className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {WHY_EXHIBIT.map((item) => (
              <motion.article
                key={item.number}
                variants={reveal}
                whileHover={
                  reducedMotion ? undefined : { y: -4 }
                }
                transition={{
                  duration: 0.28,
                  ease: EASE,
                }}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-brand-border bg-white p-5 shadow-[0_5px_22px_rgba(5,7,9,0.035)] transition-[border-color,box-shadow] duration-300 hover:border-brand-primary/35 hover:shadow-[0_15px_35px_rgba(5,7,9,0.075)] sm:p-6"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-brand-primary transition-transform duration-300 group-hover:scale-x-100"
                />

                <div className="flex items-start justify-between">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-brand-primary-soft text-brand-primary-dark transition-colors duration-300 group-hover:bg-brand-primary group-hover:text-white">
                    <IndustryIcon name={item.icon} />
                  </span>

                  <span className="font-heading text-[11px] font-extrabold tabular-nums text-brand-muted">
                    {item.number}
                  </span>
                </div>

                <h3 className="mt-5 font-heading text-[15px] font-extrabold leading-[1.45] tracking-[-0.025em] text-brand-dark sm:text-[16px]">
                  {item.title}
                </h3>

                <p className="mt-3 text-[13px] leading-[1.85] text-brand-body">
                  {item.description}
                </p>
              </motion.article>
            ))}
          </motion.div>

          <p className="mt-4 text-[11px] leading-[1.75] text-brand-muted">
            Market statements above reflect the
            exhibition brochure and should not be
            interpreted as guaranteed commercial results.
          </p>
        </section>

        {/* =====================================
            02 — EXHIBITOR PROFILE
        ====================================== */}

        <section
          aria-labelledby="who-should-exhibit-heading"
          className="mt-12 sm:mt-16"
        >
          <motion.div
            {...motionProps}
            variants={reveal}
            className="overflow-hidden rounded-2xl border border-brand-border bg-white shadow-[0_8px_30px_rgba(5,7,9,0.035)]"
          >
            <div className="border-b border-brand-border px-5 py-6 sm:px-7">
              <Eyebrow>Brochure · Exhibitor Profile</Eyebrow>

              <h2
                id="who-should-exhibit-heading"
                className="mt-3 font-heading text-[21px] font-extrabold tracking-[-0.04em] text-brand-dark sm:text-[25px]"
              >
                Who Should{" "}
                <span className="text-brand-primary-dark">
                  Exhibit?
                </span>
              </h2>

              <p className="mt-2 text-[13px] leading-[1.8] text-brand-body">
                Seven broad industry categories from
                the official exhibition profile.
              </p>
            </div>

            <motion.div
              variants={stagger}
              initial={reducedMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.08 }}
              className="grid gap-3 p-5 sm:grid-cols-2 sm:p-7"
            >
              {EXHIBITOR_CATEGORIES.map((item, index) => (
                <motion.article
                  key={item.title}
                  variants={reveal}
                  className="flex items-start gap-3 rounded-xl border border-brand-border bg-brand-light p-4 transition-colors duration-300 hover:border-brand-primary/30 hover:bg-brand-primary-soft"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white font-heading text-[11px] font-extrabold text-brand-primary-dark">
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  <div>
                    <h3 className="font-heading text-[13px] font-extrabold leading-[1.5] text-brand-dark sm:text-[14px]">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-[12px] leading-[1.8] text-brand-body">
                      {item.examples}
                    </p>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* =====================================
            03 — KEY FEATURES
        ====================================== */}

        <section
          aria-labelledby="exhibitor-features-heading"
          className="mt-12 sm:mt-16"
        >
          <motion.div {...motionProps} variants={reveal}>
            <SectionHeading
              id="exhibitor-features-heading"
              eyebrow="Official Exhibition Features"
              first="Connect, Discover"
              highlight="& Exchange"
              description="Key event features highlighted in the official Bangladesh Buildcon 2026 brochure."
            />
          </motion.div>

          <motion.div
            variants={stagger}
            initial={reducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
            className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {EVENT_FEATURES.map((feature) => (
              <motion.article
                key={feature.title}
                variants={reveal}
                whileHover={
                  reducedMotion ? undefined : { y: -3 }
                }
                className="flex h-full items-start gap-3 rounded-xl border border-brand-border bg-white p-4 shadow-[0_4px_16px_rgba(5,7,9,0.025)] transition-colors hover:border-brand-primary/35 sm:flex-col sm:p-5"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-primary-soft text-brand-primary-dark">
                  <IndustryIcon name={feature.icon} />
                </span>

                <h3 className="font-heading text-[13px] font-extrabold leading-[1.55] text-brand-dark">
                  {feature.title}
                </h3>
              </motion.article>
            ))}
          </motion.div>
        </section>

        {/* =====================================
            04 — EXHIBITOR CTA
        ====================================== */}

        <motion.section
          {...motionProps}
          variants={reveal}
          aria-labelledby="exhibit-cta-heading"
          className="mt-12 overflow-hidden rounded-2xl border border-brand-primary/20 bg-brand-primary-soft p-5 sm:mt-16 sm:p-7"
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-[700px]">
              <Eyebrow>Exhibition Participation</Eyebrow>

              <h2
                id="exhibit-cta-heading"
                className="mt-3 font-heading text-[19px] font-extrabold leading-[1.35] tracking-[-0.035em] text-brand-dark sm:text-[23px]"
              >
                Exhibit at{" "}
                <span className="text-brand-primary-dark">
                  Bangladesh Buildcon 2026
                </span>
              </h2>

              <p className="mt-2 text-[13px] leading-[1.85] text-brand-body">
                17–19 September 2026 · ICCB Exhibition
                Hall, Dhaka. Submit your enquiry to
                discuss exhibition participation with
                the organising team.
              </p>
            </div>

            <Link
              href={event.cta.bookStand}
              className="group inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-brand-primary px-6 py-3 font-heading text-[12px] font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary sm:w-auto"
            >
              Book Exhibition Stand

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <ArrowIcon />
              </span>
            </Link>
          </div>

          <p className="mt-4 border-t border-brand-primary/15 pt-4 text-[11px] leading-[1.75] text-brand-body">
            Stand availability, specifications and
            participation terms are subject to
            organiser confirmation.
          </p>
        </motion.section>
      </Container>
    </div>
  );
}
