
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
   MOTION
========================================== */

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
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
      staggerChildren: 0.085,
      delayChildren: 0.04,
    },
  },
};

/* ==========================================
   BROCHURE CONTENT

   Page 3: Exhibitor Profile
========================================== */

const EXHIBITOR_PROFILES = [
  {
    title: "Construction Machinery and Equipment",
    examples:
      "Construction equipment, cranes and trailers, loaders, trucks, system formwork, welding equipment, power tools and HVAC.",
  },
  {
    title: "Construction Materials",
    examples:
      "Prefabricated structures, façades, roofing, insulation, waterproofing, wall materials, fire-resistant materials and finishes.",
  },
  {
    title: "Construction",
    examples:
      "Urban development, architecture and design, roads, reconstruction, construction automation and resource-saving technologies.",
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
      "Distribution systems, transformer stations, high- and low-voltage equipment, automation and energy-saving systems.",
  },
  {
    title: "Interior & Exterior",
    examples:
      "Interior and exterior design, furniture, glass, paints, doors, roofing and related industry services.",
  },
  {
    title: "Safety & Security",
    examples:
      "Electrical safety, emergency alarms, warning systems, escape equipment, emergency lighting and security sensors.",
  },
];

/* ==========================================
   BROCHURE PAGE 3: VISITOR PROFILE
========================================== */

const VISITOR_PROFILES = [
  "Civil Engineering & Consulting Companies",
  "Landscaping Companies",
  "Ready Mix & Concrete Suppliers",
  "Architects & Builders",
  "Construction Machinery Traders & Distributors",
  "Retailers & Contractors",
  "Importers & Distributors",
  "Transport Companies",
  "Renting & Leasing Companies",
  "Property Development Companies",
  "Public Administration & Building Authorities",
  "Interior Designers",
  "Sports & Stadium Authorities",
  "Large Warehouse & Factory Builders",
  "Aerospace & Space Organisations",
];

/* ==========================================
   BROCHURE PAGES 2 & 4: EVENT FEATURES
========================================== */

const EVENT_FEATURES = [
  {
    title: "International Exhibitors & Country Pavilions",
    description:
      "The exhibition brings an international industry focus to its building and construction showcase.",
  },
  {
    title: "Live Demonstrations & Product Launches",
    description:
      "Explore product demonstrations, equipment and construction technology presentations.",
  },
  {
    title: "B2B Matchmaking Opportunities",
    description:
      "A platform for manufacturers, suppliers and trade professionals to connect and explore partnerships.",
  },
  {
    title: "Industry Conferences & Technical Seminars",
    description:
      "Discover the event's focus on industry knowledge, technical discussion and innovation.",
  },
];

/* ==========================================
   BROCHURE PAGE 2: 2025 HIGHLIGHTS

   Historical figures only.
========================================== */

const PREVIOUS_EDITION_STATS = [
  {
    value: "120",
    label: "Brands",
  },
  {
    value: "350",
    label: "Booths",
  },
  {
    value: "3",
    label: "Country Pavilions",
  },
  {
    value: "1",
    label: "Event",
  },
];

/* ==========================================
   SHARED ELEMENTS
========================================== */

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

function Eyebrow({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="h-[2px] w-7 shrink-0 bg-brand-primary" />

      <span className="font-heading text-[10px] font-extrabold uppercase tracking-[0.16em] text-brand-primary-dark">
        {children}
      </span>
    </div>
  );
}

function SectionHeading({
  id,
  eyebrow,
  title,
  highlight,
  description,
}: {
  id: string;
  eyebrow: string;
  title: string;
  highlight: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-brand-border pb-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>

        <h2
          id={id}
          className="mt-3 font-heading text-[clamp(1.45rem,2.5vw,2rem)] font-extrabold leading-[1.2] tracking-[-0.04em] text-brand-dark"
        >
          {title}{" "}
          <span className="text-brand-primary-dark">
            {highlight}
          </span>
        </h2>
      </div>

      {description && (
        <p className="max-w-[410px] text-[13px] leading-[1.85] text-brand-body">
          {description}
        </p>
      )}
    </div>
  );
}

/* ==========================================
   MAIN COMPONENT
========================================== */

export function AboutClientView() {
  const reducedMotion = !!useReducedMotion();

  const motionProps = {
    initial: reducedMotion ? false : "hidden",
    whileInView: "visible" as const,
    viewport: {
      once: true,
      amount: 0.12,
    },
  };

  return (
    <div className="relative overflow-hidden bg-brand-light text-brand-dark">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(5,7,9,0.018)_1px,transparent_1px),linear-gradient(to_bottom,rgba(5,7,9,0.018)_1px,transparent_1px)] bg-[size:64px_64px]"
      />

      <Container className="relative z-10">
        {/* =====================================
            01 — EVENT OVERVIEW
        ====================================== */}

        <section
          aria-labelledby="about-event-heading"
          className="grid gap-7 border-b border-brand-border py-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-10 lg:py-16"
        >
          <motion.div
            {...motionProps}
            variants={fadeUp}
          >
            <Eyebrow>
              About the 10th Edition
            </Eyebrow>

            <h2
              id="about-event-heading"
              className="mt-4 font-heading text-[clamp(1.6rem,2.75vw,2.3rem)] font-extrabold leading-[1.23] tracking-[-0.045em] text-brand-dark"
            >
              A Decade of{" "}
              <span className="text-brand-primary-dark">
                Building Industry Connections
              </span>
            </h2>

            <p className="mt-5 text-[13px] leading-[1.95] text-brand-body sm:text-[14px]">
              The 10th Bangladesh Buildcon
              International Expo 2026 celebrates a
              decade of bringing the building and
              construction industry together under
              one roof. The exhibition connects
              manufacturers, suppliers and industry
              professionals from Bangladesh and
              international markets.
            </p>

            <p className="mt-3 text-[13px] leading-[1.95] text-brand-body sm:text-[14px]">
              Dedicated to the building, construction
              and infrastructure sectors, the expo
              showcases construction machinery,
              building materials, electrical systems,
              interior and exterior solutions and
              safety technologies. The programme
              highlights product discovery, supplier
              sourcing, technical learning and
              business networking.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/exhibition-profile"
                className="group inline-flex min-h-11 items-center gap-2 rounded-lg bg-brand-primary px-5 py-3 font-heading text-[12px] font-bold text-white transition-colors hover:bg-brand-primary-dark"
              >
                Exhibition Profile

                <span className="transition-transform group-hover:translate-x-1">
                  <ArrowIcon />
                </span>
              </Link>

              <Link
                href="/book-a-stand"
                className="inline-flex min-h-11 items-center rounded-lg border border-brand-border bg-white px-5 py-3 font-heading text-[12px] font-bold text-brand-dark transition-colors hover:border-brand-primary hover:text-brand-primary-dark"
              >
                Book a Stand
              </Link>
            </div>
          </motion.div>

          {/* Compact event identity panel */}
          <motion.aside
            {...motionProps}
            variants={fadeUp}
            className="relative overflow-hidden rounded-2xl border border-[#24262B] bg-brand-dark p-6 text-white shadow-[0_15px_45px_rgba(5,7,9,0.12)] sm:p-7"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-brand-primary/25 blur-[75px]"
            />

            <div className="relative z-10">
              <span className="font-heading text-[10px] font-bold uppercase tracking-[0.14em] text-[#FFBFC2]">
                Official Event Information
              </span>

              <div className="mt-5 inline-flex rounded-lg border border-white/15 bg-white/[0.07] px-3 py-2">
                <span className="font-heading text-[12px] font-extrabold text-white">
                  10th International Edition
                </span>
              </div>

              <h3 className="mt-5 font-heading text-[22px] font-extrabold leading-[1.3] tracking-[-0.04em] text-white sm:text-[25px]">
                Bangladesh{" "}
                <span className="text-[#FF858A]">
                  Buildcon 2026
                </span>
              </h3>

              <div className="mt-6 space-y-4 border-t border-white/15 pt-5">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#D8DCE3]">
                    Event Dates
                  </span>

                  <p className="mt-1 font-heading text-[14px] font-extrabold text-white">
                    {event.dates.display}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#D8DCE3]">
                    Exhibition Venue
                  </span>

                  <p className="mt-1 font-heading text-[14px] font-extrabold text-white">
                    {event.venue.name}
                  </p>

                  <p className="mt-1 text-[12px] text-[#E0E3EA]">
                    {event.venue.city}, Bangladesh
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#D8DCE3]">
                    Event Focus
                  </span>

                  <p className="mt-1 text-[12px] leading-[1.75] text-white">
                    Building, Construction &
                    Infrastructure
                  </p>
                </div>
              </div>

              <Link
                href="/venue"
                className="group mt-6 inline-flex items-center gap-2 border-t border-white/15 pt-5 font-heading text-[12px] font-bold text-[#FF9CA0] transition-colors hover:text-white"
              >
                Explore the Venue

                <span className="transition-transform group-hover:translate-x-1">
                  <ArrowIcon />
                </span>
              </Link>
            </div>

            <div
              aria-hidden="true"
              className="absolute inset-y-0 left-0 w-[3px] bg-brand-primary"
            />
          </motion.aside>
        </section>

        {/* =====================================
            02 — EVENT FEATURES
        ====================================== */}

        <section
          aria-labelledby="event-features-heading"
          className="py-12 lg:py-16"
        >
          <motion.div
            {...motionProps}
            variants={fadeUp}
          >
            <SectionHeading
              id="event-features-heading"
              eyebrow="Event Overview"
              title="A Platform for"
              highlight="Industry Exchange"
              description="The official brochure highlights these exhibition features for manufacturers, suppliers and trade professionals."
            />
          </motion.div>

          <motion.div
            variants={stagger}
            initial={reducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.08,
            }}
            className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {EVENT_FEATURES.map((feature, index) => (
              <motion.article
                key={feature.title}
                variants={fadeUp}
                whileHover={
                  reducedMotion
                    ? undefined
                    : { y: -4 }
                }
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-brand-border bg-white p-5 shadow-[0_4px_18px_rgba(5,7,9,0.03)] transition-[border-color,box-shadow] duration-300 hover:border-brand-primary/35 hover:shadow-[0_14px_32px_rgba(5,7,9,0.07)]"
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-brand-primary-soft font-heading text-[11px] font-extrabold text-brand-primary-dark">
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  <span className="h-[2px] w-6 bg-brand-primary/45" />
                </div>

                <h3 className="mt-5 font-heading text-[15px] font-extrabold leading-[1.5] text-brand-dark">
                  {feature.title}
                </h3>

                <p className="mt-3 text-[12px] leading-[1.9] text-brand-body">
                  {feature.description}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </section>

        {/* =====================================
            03 — EXHIBITOR PROFILE
        ====================================== */}

        <section
          aria-labelledby="exhibitor-profile-heading"
          className="pb-12 lg:pb-16"
        >
          <motion.div
            {...motionProps}
            variants={fadeUp}
          >
            <SectionHeading
              id="exhibitor-profile-heading"
              eyebrow="Brochure · Page 3"
              title="Exhibitor"
              highlight="Profile"
              description="Seven broad industry categories featured in the official exhibition brochure."
            />
          </motion.div>

          <motion.div
            variants={stagger}
            initial={reducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
            className="mt-6 grid gap-3 md:grid-cols-2"
          >
            {EXHIBITOR_PROFILES.map(
              (profile, index) => (
                <motion.article
                  key={profile.title}
                  variants={fadeUp}
                  className="flex min-w-0 items-start gap-4 rounded-xl border border-brand-border bg-white p-4 transition-colors hover:border-brand-primary/35 sm:p-5"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-primary-soft font-heading text-[11px] font-extrabold text-brand-primary-dark">
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  <div>
                    <h3 className="font-heading text-[14px] font-extrabold leading-[1.5] text-brand-dark">
                      {profile.title}
                    </h3>

                    <p className="mt-2 text-[12px] leading-[1.85] text-brand-body">
                      {profile.examples}
                    </p>
                  </div>
                </motion.article>
              )
            )}
          </motion.div>
        </section>

        {/* =====================================
            04 — VISITOR PROFILE
        ====================================== */}

        <section
          aria-labelledby="visitor-profile-heading"
          className="pb-12 lg:pb-16"
        >
          <motion.div
            {...motionProps}
            variants={fadeUp}
            className="overflow-hidden rounded-2xl border border-brand-border bg-white shadow-[0_7px_28px_rgba(5,7,9,0.035)]"
          >
            <div className="border-b border-brand-border p-5 sm:p-7">
              <Eyebrow>
                Brochure · Visitor Profile
              </Eyebrow>

              <h2
                id="visitor-profile-heading"
                className="mt-3 font-heading text-[21px] font-extrabold tracking-[-0.035em] text-brand-dark sm:text-[25px]"
              >
                Who Attends{" "}
                <span className="text-brand-primary-dark">
                  Bangladesh Buildcon?
                </span>
              </h2>

              <p className="mt-2 text-[13px] leading-[1.8] text-brand-body">
                The brochure identifies these
                professional groups within the
                exhibition&apos;s target visitor
                profile.
              </p>
            </div>

            <div className="grid gap-2.5 p-5 sm:grid-cols-2 sm:p-7 lg:grid-cols-3">
              {VISITOR_PROFILES.map((profile) => (
                <div
                  key={profile}
                  className="flex items-start gap-2.5 rounded-lg border border-brand-border bg-brand-light px-3.5 py-3"
                >
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-primary" />

                  <span className="text-[12px] font-semibold leading-[1.65] text-brand-dark">
                    {profile}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* =====================================
            05 — PREVIOUS EDITION
        ====================================== */}

        <section
          aria-labelledby="previous-edition-heading"
          className="pb-12 lg:pb-16"
        >
          <motion.div
            {...motionProps}
            variants={fadeUp}
            className="overflow-hidden rounded-2xl border border-brand-border bg-white shadow-[0_8px_30px_rgba(5,7,9,0.035)]"
          >
            <div className="flex flex-col gap-3 border-b border-brand-border p-5 sm:flex-row sm:items-end sm:justify-between sm:p-7">
              <div>
                <Eyebrow>
                  Historical Event Data
                </Eyebrow>

                <h2
                  id="previous-edition-heading"
                  className="mt-3 font-heading text-[21px] font-extrabold tracking-[-0.035em] text-brand-dark sm:text-[25px]"
                >
                  2025{" "}
                  <span className="text-brand-primary-dark">
                    Highlights
                  </span>
                </h2>
              </div>

              <p className="max-w-[355px] text-[12px] leading-[1.8] text-brand-body">
                Figures shown in the 2026 event
                brochure for the previous edition.
                They are not confirmed 2026 totals.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-px bg-brand-border lg:grid-cols-4">
              {PREVIOUS_EDITION_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white p-5 text-center sm:p-7"
                >
                  <p className="font-heading text-[clamp(1.55rem,2.8vw,2.3rem)] font-extrabold tracking-[-0.045em] text-brand-primary-dark">
                    {stat.value}
                  </p>

                  <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.08em] text-brand-body">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* =====================================
            06 — ORGANISERS & FINAL CTA
        ====================================== */}

        <motion.section
          {...motionProps}
          variants={fadeUp}
          aria-labelledby="about-organisers-heading"
          className="mb-12 overflow-hidden rounded-2xl border border-brand-primary/20 bg-brand-primary-soft p-5 sm:mb-16 sm:p-7"
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-[710px]">
              <Eyebrow>
                Official Organisers
              </Eyebrow>

              <h2
                id="about-organisers-heading"
                className="mt-3 font-heading text-[19px] font-extrabold leading-[1.4] tracking-[-0.035em] text-brand-dark sm:text-[22px]"
              >
                Organised by{" "}
                <span className="text-brand-primary-dark">
                  Futurex & ASK Trade
                </span>
              </h2>

              <p className="mt-2 text-[12px] leading-[1.85] text-brand-body sm:text-[13px]">
                Futurex Trade Fair & Events Pvt. Ltd.
                and ASK Trade & Exhibitions Pvt. Ltd.
                are the official organisers of
                Bangladesh Buildcon International
                Expo 2026.
              </p>
            </div>

            <Link
              href="/organisers"
              className="group inline-flex min-h-11 w-fit shrink-0 items-center justify-center gap-2 rounded-lg bg-brand-primary px-5 py-3 font-heading text-[12px] font-bold text-white transition-colors hover:bg-brand-primary-dark"
            >
              Meet the Organisers

              <span className="transition-transform group-hover:translate-x-1">
                <ArrowIcon />
              </span>
            </Link>
          </div>
        </motion.section>
      </Container>
    </div>
  );
}
