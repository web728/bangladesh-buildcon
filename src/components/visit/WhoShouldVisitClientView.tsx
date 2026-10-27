
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
import { visitorGroups } from "@/data/visitorProfile";

/* ==========================================
   ANIMATION
========================================== */

const EASE = [0.22, 1, 0.36, 1] as const;

const reveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.62,
      ease: EASE,
    },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.075,
      delayChildren: 0.05,
    },
  },
};

/* ==========================================
   OFFICIAL BROCHURE DATA
========================================== */

const BROCHURE_PROFILES = [
  { name: "Consultants & Civil Engineers", percentage: 36 },
  { name: "Architects & Interior Designers", percentage: 25 },
  { name: "Government", percentage: 19 },
  { name: "Builders & Real Estate", percentage: 11 },
  { name: "Importers, Dealers & Distributors", percentage: 8 },
] as const;

const VISITOR_MOTIVATIONS = [
  { title: "Discover New Products & Services", percentage: 39 },
  { title: "Explore Innovations", percentage: 28 },
  { title: "Professional Networking", percentage: 20 },
  { title: "Find Channel Partners", percentage: 12 },
  { title: "Other Reasons", percentage: 1 },
] as const;

const VISITOR_OPPORTUNITIES = [
  {
    title: "Explore Construction Products",
    description:
      "Discover construction machinery, building materials, interiors, electrical and safety product categories.",
    icon: "products",
  },
  {
    title: "Review New Technologies",
    description:
      "Explore construction equipment, modern building systems and technical solutions relevant to the industry.",
    icon: "technology",
  },
  {
    title: "Meet Industry Suppliers",
    description:
      "Explore opportunities to engage with manufacturers, suppliers and distributors participating in the exhibition.",
    icon: "network",
  },
  {
    title: "Explore Channel Partnerships",
    description:
      "Investigate potential distribution, dealership and construction-product supply relationships.",
    icon: "partners",
  },
  {
    title: "Discover Product Applications",
    description:
      "Explore product launches, live demonstrations and technical knowledge exchange highlighted in the event brochure.",
    icon: "building",
  },
  {
    title: "Build Professional Connections",
    description:
      "Engage with professionals involved in engineering, architecture, construction, procurement and distribution.",
    icon: "people",
  },
] as const;

/* ==========================================
   CUSTOM SVG ICONS
========================================== */

type IconName =
  | "products"
  | "technology"
  | "network"
  | "partners"
  | "building"
  | "people"
  | "arrow"
  | "calendar"
  | "location";

function Icon({
  name,
  className = "size-5",
}: {
  name: IconName;
  className?: string;
}) {
  const paths: Record<IconName, ReactNode> = {
    products: (
      <>
        <path d="m12 3 9 5-9 5-9-5 9-5Z" />
        <path d="m3 12 9 5 9-5M3 16l9 5 9-5" />
      </>
    ),
    technology: (
      <>
        <rect x="3" y="4" width="18" height="14" rx="2" />
        <path d="M8 22h8M12 18v4m-5-9 3-3 2 2 5-5" />
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
    partners: (
      <>
        <path d="m3 12 5-4 4 2 4-2 5 4" />
        <path d="m7 13 5 5a2 2 0 0 0 3-1l2-2" />
        <path d="M3 15l3 3m12 0 3-3" />
      </>
    ),
    building: (
      <>
        <path d="M3 21h18M5 21V5h10v16M15 10h5v11" />
        <path d="M8 9h4M8 13h4M8 17h4" />
      </>
    ),
    people: (
      <>
        <circle cx="12" cy="8" r="3" />
        <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
        <path d="M4 9a2 2 0 1 0 0 4m16-4a2 2 0 1 1 0 4" />
      </>
    ),
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M7 3v4M17 3v4M3 10h18" />
      </>
    ),
    location: (
      <>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
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

function VisitorGroupIcon({ index }: { index: number }) {
  const icons: IconName[] = [
    "building",
    "products",
    "people",
    "technology",
    "network",
  ];

  return <Icon name={icons[index % icons.length]} />;
}

/* ==========================================
   PREMIUM ARCHITECTURAL SVG
   No gradients.
========================================== */

function VisitorIllustration({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  return (
    <svg
      viewBox="0 0 500 315"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-auto w-full max-w-[500px]"
      aria-hidden="true"
    >
      <path d="M20 278H480" stroke="#D9C9D5" strokeWidth="1.5" />
      <path d="M30 293H470" stroke="#E9DDE7" strokeDasharray="5 8" />

      {/* Main exhibition building */}
      <motion.g
        initial={reducedMotion ? false : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.85, ease: EASE }}
      >
        <path
          d="M80 278V112L218 44L356 112V278"
          stroke="#BA1D82"
          strokeWidth="2.4"
        />
        <path
          d="M96 278V125L218 65L340 125V278"
          stroke="#BA1D82"
          strokeOpacity=".38"
        />
        <path
          d="M80 155H356M80 208H356"
          stroke="#D8ABC9"
        />

        {[113, 175, 237, 299].map((x) => (
          <g key={x}>
            <rect
              x={x}
              y="169"
              width="36"
              height="34"
              stroke="#BA1D82"
              strokeOpacity=".55"
            />
            <rect
              x={x}
              y="220"
              width="36"
              height="39"
              stroke="#BA1D82"
              strokeOpacity=".55"
            />
          </g>
        ))}

        <path
          d="M190 278V224h56v54M218 224v54"
          stroke="#304090"
          strokeWidth="2"
        />
      </motion.g>

      {/* Side structure */}
      <motion.g
        initial={reducedMotion ? false : { opacity: 0, x: 15 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.85, delay: 0.15, ease: EASE }}
      >
        <path
          d="M364 278V164H461V278"
          stroke="#304090"
          strokeWidth="2"
        />
        <path
          d="M364 164L413 135L461 164M375 193h75M375 226h75"
          stroke="#304090"
          strokeOpacity=".55"
        />
      </motion.g>

      {/* Rotating orbit */}
      <motion.g
        animate={reducedMotion ? undefined : { rotate: 360 }}
        style={{ transformOrigin: "60px 72px" }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <circle
          cx="60"
          cy="72"
          r="31"
          stroke="#BA1D82"
          strokeOpacity=".5"
          strokeDasharray="5 9"
        />
        <circle cx="60" cy="41" r="4" fill="#BA1D82" />
      </motion.g>

      {/* Floating location indicator */}
      <motion.g
        animate={reducedMotion ? undefined : { y: [0, -8, 0] }}
        transition={{
          duration: 4.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <path
          d="M440 47c0 18-17 36-17 36s-17-18-17-36a17 17 0 1 1 34 0Z"
          fill="#F9EAF4"
          stroke="#BA1D82"
          strokeWidth="2"
        />
        <circle cx="423" cy="47" r="5" fill="#BA1D82" />
      </motion.g>

      {/* Roof pulse */}
      <motion.circle
        cx="218"
        cy="44"
        r="5"
        fill="#BA1D82"
        animate={
          reducedMotion
            ? undefined
            : { opacity: [0.5, 1, 0.5], scale: [1, 1.25, 1] }
        }
        style={{ transformOrigin: "218px 44px" }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <path
        d="M58 112H70M58 278H70M64 112v166"
        stroke="#BA1D82"
        strokeOpacity=".35"
        strokeDasharray="4 6"
      />
    </svg>
  );
}

/* ==========================================
   SHARED UI
========================================== */

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        aria-hidden="true"
        className="h-[2px] w-7 shrink-0 bg-brand-primary"
      />
      <span className="font-heading text-[10px] font-extrabold uppercase tracking-[0.15em] text-brand-primary">
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
  description: string;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-[#E9E4EB] pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-[700px]">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2
          id={id}
          className="mt-3 font-heading text-[clamp(1.45rem,2.5vw,2rem)] font-extrabold leading-[1.2] tracking-[-0.04em] text-brand-dark"
        >
          {title}{" "}
          <span className="text-brand-primary">{highlight}</span>
        </h2>
      </div>

      
    </div>
  );
}

/* ==========================================
   ANIMATED BAR
========================================== */

function PercentageBar({
  percentage,
  reducedMotion,
}: {
  percentage: number;
  reducedMotion: boolean;
}) {
  return (
    <div
      role="meter"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percentage}
      className="h-2 overflow-hidden rounded-full bg-[#F3E6F0]"
    >
      <motion.div
        initial={reducedMotion ? false : { width: 0 }}
        whileInView={{ width: `${percentage}%` }}
        viewport={{ once: true }}
        transition={{
          duration: reducedMotion ? 0 : 0.9,
          ease: EASE,
        }}
        className="h-full rounded-full bg-brand-primary"
      />
    </div>
  );
}

/* ==========================================
   MAIN COMPONENT
========================================== */

export function WhoShouldVisitClientView() {
  const reducedMotion = !!useReducedMotion();

  const scrollProps = {
    initial: reducedMotion ? false : "hidden",
    whileInView: "visible" as const,
    viewport: { once: true, amount: 0.08 },
  };

  return (
    <div className="relative overflow-hidden bg-[#F8F8FA] py-12 text-brand-dark selection:bg-brand-primary selection:text-white sm:py-16">
      <Container>
        {/* ===================================
            01. INTRO + SVG
        ==================================== */}

        <section aria-labelledby="visitor-groups-heading">
          <motion.header
            {...scrollProps}
            variants={reveal}
            className="grid items-center gap-6 overflow-hidden rounded-2xl border border-[#E9E4EB] bg-white p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:p-8"
          >
            <div className="min-w-0">
              <Eyebrow>Professional Visitor Audience</Eyebrow>

              <h1
                id="visitor-groups-heading"
                className="mt-4 max-w-[650px] font-heading text-[clamp(1.75rem,3vw,2.65rem)] font-extrabold leading-[1.15] tracking-[-0.045em] text-brand-dark"
              >
                Professionals Who{" "}
                <span className="text-brand-primary">
                  Buy, Build &amp; Specify.
                </span>
              </h1>

              <p className="mt-4 max-w-[610px] text-[13px] leading-[1.85] text-[#66616C] sm:text-[14px]">
                Bangladesh Buildcon brings focus to the
                professionals working across construction,
                architecture, engineering, procurement,
                project development and the building
                materials supply chain.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  "Architects & Engineers",
                  "Contractors",
                  "Developers",
                  "Trade Distributors",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-[#EAE4EC] bg-[#FBFAFC] px-3 py-1.5 font-heading text-[10px] font-semibold text-[#625B67]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                href={event.cta.registerVisit}
                className="group mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-brand-primary px-5 py-3 font-heading text-[12px] font-bold text-white transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-brand-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary motion-reduce:transform-none"
              >
                Register to Visit
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <Icon name="arrow" className="size-4" />
                </span>
              </Link>
            </div>

            <div className="relative flex min-w-0 items-center justify-center overflow-hidden rounded-xl border border-[#F0E7EE] bg-[#FCF8FB] p-4 sm:p-6">
              <VisitorIllustration reducedMotion={reducedMotion} />
             
            </div>
          </motion.header>

          {/* Dynamic professional visitor groups */}
          <motion.div
            {...scrollProps}
            variants={reveal}
            className="mt-10 sm:mt-12"
          >
            <SectionHeading
              id="professional-groups-heading"
              eyebrow="Who Should Visit?"
              title="Explore Professional"
              highlight="Visitor Groups"
              description="Industry roles across design, engineering, development, construction and trading that are relevant to the event."
            />
          </motion.div>

          <motion.div
            variants={stagger}
            initial={reducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.06 }}
            className="mt-6 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {visitorGroups.map((group, index) => (
              <motion.article
                key={group.slug}
                variants={reveal}
                whileHover={
                  reducedMotion ? undefined : { y: -4 }
                }
                className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-[#E9E4EB] bg-white p-5 shadow-[0_4px_18px_rgba(5,7,9,0.025)] transition-[border-color,box-shadow] duration-300 hover:border-brand-primary/35 hover:shadow-[0_14px_30px_rgba(5,7,9,0.07)]"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-brand-primary transition-transform duration-300 group-hover:scale-x-100"
                />

                <div className="flex items-start justify-between gap-3">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-brand-primary/15 bg-[#F9ECF5] text-brand-primary transition-colors group-hover:bg-brand-primary group-hover:text-white">
                    <VisitorGroupIcon index={index} />
                  </span>

              
                </div>

                <h3 className="mt-5 font-heading text-[15px] font-extrabold leading-[1.45] tracking-[-0.025em] text-brand-dark">
                  {group.name}
                </h3>

                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.roles.map((role) => (
                    <li key={role}>
                      <span className="inline-flex items-center gap-2 rounded-md border border-[#ECE7ED] bg-[#FBFAFC] px-2.5 py-1.5 text-[11px] font-medium leading-[1.5] text-[#66616C]">
                        <span
                          aria-hidden="true"
                          className="size-1.5 shrink-0 rounded-full bg-brand-primary"
                        />
                        {role}
                      </span>
                    </li>
                  ))}
                </ul>

          
              </motion.article>
            ))}
          </motion.div>

      
        </section>

        {/* ===================================
            02. BROCHURE BUSINESS PROFILE
        ==================================== */}

        <motion.section
          {...scrollProps}
          variants={reveal}
          aria-labelledby="visitor-profile-heading"
          className="mt-12 overflow-hidden rounded-2xl border border-[#E9E4EB] bg-white sm:mt-16"
        >
          <div className="border-b border-[#EDE7ED] p-5 sm:p-7">
            <Eyebrow>
              Official Brochure · Visitor Business Profile
            </Eyebrow>

            <h2
              id="visitor-profile-heading"
              className="mt-3 font-heading text-[clamp(1.4rem,2.5vw,2rem)] font-extrabold leading-[1.2] tracking-[-0.04em] text-brand-dark"
            >
              Visitor{" "}
              <span className="text-brand-primary">
                Business Profile
              </span>
            </h2>

            <p className="mt-3 max-w-[730px] text-[12px] leading-[1.85] text-[#66616C] sm:text-[13px]">
              The official brochure presents this
              distribution of professional visitor
              business categories.
            </p>
          </div>

          <div className="grid gap-7 p-5 sm:p-7 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
            <div className="space-y-5">
              {BROCHURE_PROFILES.map((profile) => (
                <div key={profile.name}>
                  <div className="mb-2.5 flex items-center justify-between gap-3">
                    <h3 className="text-[12px] font-semibold leading-[1.5] text-brand-dark sm:text-[13px]">
                      {profile.name}
                    </h3>
                    <span className="font-heading text-[15px] font-extrabold tabular-nums text-brand-primary">
                      {profile.percentage}%
                    </span>
                  </div>

                  <PercentageBar
                    percentage={profile.percentage}
                    reducedMotion={reducedMotion}
                  />
                </div>
              ))}
            </div>

            <div className="flex min-w-0 flex-col justify-center rounded-xl bg-[#18151C] p-6 text-white">
              <span className="flex size-11 items-center justify-center rounded-lg border border-brand-primary/40 bg-brand-primary/20 text-[#E9A5D3]">
                <Icon name="people" className="size-6" />
              </span>

              <h3 className="mt-5 font-heading text-[18px] font-extrabold leading-[1.35] tracking-[-0.03em]">
                A Cross-Section of the{" "}
                <span className="text-[#E9A5D3]">
                  Construction Industry
                </span>
              </h3>

              <p className="mt-3 text-[12px] leading-[1.85] text-white/65 sm:text-[13px]">
                The brochure highlights consultants,
                engineers, architects, designers,
                government organisations, developers
                and construction trade businesses.
              </p>

              <p className="mt-5 border-t border-white/15 pt-4 text-[11px] leading-[1.8] text-white/50">
                Published percentages total 99%
                due to rounding. They do not
                represent confirmed 2027 attendance.
              </p>
            </div>
          </div>
        </motion.section>

        {/* ===================================
            03. VISITOR MOTIVATIONS
        ==================================== */}

        <section
          aria-labelledby="visitor-motivations-heading"
          className="mt-12 sm:mt-16"
        >
          <motion.div {...scrollProps} variants={reveal}>
            <SectionHeading
              id="visitor-motivations-heading"
              eyebrow="Brochure · Reasons to Attend"
              title="What Brings Visitors"
              highlight="to the Exhibition?"
              description="Published visitor motivations highlight product discovery, innovation, networking and channel development."
            />
          </motion.div>

          <motion.div
            variants={stagger}
            initial={reducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
            className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
          >
            {VISITOR_MOTIVATIONS.map((motivation, index) => (
              <motion.article
                key={motivation.title}
                variants={reveal}
                whileHover={
                  reducedMotion ? undefined : { y: -3 }
                }
                className="group rounded-xl border border-[#E9E4EB] bg-white p-4 transition-[border-color,box-shadow] duration-300 hover:border-brand-primary/35 hover:shadow-[0_10px_25px_rgba(5,7,9,0.05)] sm:p-5"
              >
             

                <p className="mt-3 font-heading text-[28px] font-extrabold tabular-nums tracking-[-0.05em] text-brand-primary">
                  {motivation.percentage}%
                </p>

                <h3 className="mt-2 min-h-11 text-[12px] font-semibold leading-[1.6] text-brand-dark">
                  {motivation.title}
                </h3>

                <div className="mt-4">
                  <PercentageBar
                    percentage={motivation.percentage}
                    reducedMotion={reducedMotion}
                  />
                </div>
              </motion.article>
            ))}
          </motion.div>
 
        </section>

        {/* ===================================
            04. VISITOR OPPORTUNITIES
        ==================================== */}

        <section
          aria-labelledby="visitor-opportunities-heading"
          className="mt-12 sm:mt-16"
        >
          <motion.div {...scrollProps} variants={reveal}>
            <SectionHeading
              id="visitor-opportunities-heading"
              eyebrow="Visitor Opportunities"
              title="Explore Products, Technology"
              highlight="&amp; Business Connections"
              description="Practical areas of interest drawn from the exhibition's product scope and brochure features."
            />
          </motion.div>

          <motion.div
            variants={stagger}
            initial={reducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.06 }}
            className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {VISITOR_OPPORTUNITIES.map((opportunity, index) => (
              <motion.article
                key={opportunity.title}
                variants={reveal}
                whileHover={
                  reducedMotion ? undefined : { y: -4 }
                }
                className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-[#E9E4EB] bg-white p-5 transition-[border-color,box-shadow] duration-300 hover:border-brand-primary/35 hover:shadow-[0_14px_28px_rgba(5,7,9,0.06)]"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-brand-primary transition-transform duration-300 group-hover:scale-x-100"
                />

                <div className="flex items-start justify-between gap-3">
                  <span className="flex size-11 items-center justify-center rounded-lg border border-brand-primary/15 bg-[#F9ECF5] text-brand-primary transition-colors group-hover:bg-brand-primary group-hover:text-white">
                    <Icon name={opportunity.icon} />
                  </span>

                  
                </div>

                <h3 className="mt-5 font-heading text-[15px] font-extrabold leading-[1.45] text-brand-dark">
                  {opportunity.title}
                </h3>

                <p className="mt-3 text-[12px] leading-[1.85] text-[#66616C] sm:text-[13px]">
                  {opportunity.description}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </section>

        {/* ===================================
            05. FINAL REGISTRATION CTA
        ==================================== */}

        <motion.section
          {...scrollProps}
          variants={reveal}
          aria-labelledby="visitor-cta-heading"
          className="mt-12 overflow-hidden rounded-2xl border border-brand-primary/20 bg-[#F8EDF5] p-5 sm:p-7"
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-[680px]">
              <Eyebrow>Visitor Registration</Eyebrow>

              <h2
                id="visitor-cta-heading"
                className="mt-3 font-heading text-[17px] font-extrabold leading-[1.4] text-brand-dark sm:text-[19px]"
              >
                Planning to Visit{" "}
                <span className="text-brand-primary">
                  Bangladesh Buildcon 2027?
                </span>
              </h2>

              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[12px] font-medium text-[#635C67]">
                <span className="inline-flex items-center gap-2">
                  <Icon
                    name="calendar"
                    className="size-4 text-brand-primary"
                  />
                  {event.dates.display}
                </span>

                <span className="inline-flex items-center gap-2">
                  <Icon
                    name="location"
                    className="size-4 text-brand-primary"
                  />
                  {event.venue.name},{" "}
                  {event.venue.city}
                </span>
              </div>

              <p className="mt-3 text-[12px] leading-[1.8] text-[#66616C]">
                Review visitor registration details
                and submit your interest using
                the official event registration form.
                Registration and admission remain
                subject to organiser confirmation.
              </p>
            </div>

            <Link
              href={event.cta.registerVisit}
              className="group inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-brand-primary px-5 py-3 font-heading text-[12px] font-bold text-white transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-brand-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary motion-reduce:transform-none sm:w-auto"
            >
              Register to Visit
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <Icon name="arrow" className="size-4" />
              </span>
            </Link>
          </div>
        </motion.section>
      </Container>
    </div>
  );
}
