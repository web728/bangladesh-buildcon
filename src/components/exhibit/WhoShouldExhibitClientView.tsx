
"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { Container } from "@/components/ui/Container";
import { event } from "@/config/event";
import { exhibitionSectors } from "@/data/exhibitionProfile";

/* ==========================================
   MOTION SETTINGS
========================================== */

const EASE = [0.22, 1, 0.36, 1] as const;

const reveal: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
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
      staggerChildren: 0.075,
      delayChildren: 0.05,
    },
  },
};

/* ==========================================
   EXHIBITOR PROFILES
========================================== */

const EXHIBITOR_PROFILES = [
  {
    title: "Manufacturers",
    badge: "Manufacturing",
    description:
      "Manufacturers of construction materials, structural systems, finishing products and related building components.",
    icon: "factory",
  },
  {
    title: "Exporters",
    badge: "International Trade",
    description:
      "Export-oriented businesses supplying building materials, machinery, equipment and construction-related products.",
    icon: "globe",
  },
  {
    title: "International Suppliers",
    badge: "Global Supply",
    description:
      "Suppliers introducing construction technologies, machinery, materials and engineering products to the Bangladesh market.",
    icon: "network",
  },
  {
    title: "Bangladeshi Manufacturers",
    badge: "Domestic Industry",
    description:
      "Local manufacturers showcasing construction materials, components, equipment and building solutions.",
    icon: "building",
  },
  {
    title: "Importers & Distributors",
    badge: "Distribution",
    description:
      "Importers, dealers and trading businesses handling building materials, electrical products, tools and equipment.",
    icon: "package",
  },
  {
    title: "Construction Machinery Companies",
    badge: "Machinery",
    description:
      "Companies offering cranes, lifting systems, construction machinery, formwork, power tools and site equipment.",
    icon: "machinery",
  },
  {
    title: "Building Material Companies",
    badge: "Materials",
    description:
      "Suppliers of roofing, insulation, waterproofing, façade materials, finishes and prefabricated products.",
    icon: "layers",
  },
  {
    title: "Engineering Product Manufacturers",
    badge: "Engineering",
    description:
      "Manufacturers of electrical engineering products, distribution equipment, automation and technical components.",
    icon: "settings",
  },
  {
    title: "Equipment Suppliers",
    badge: "Tools & Equipment",
    description:
      "Suppliers of construction tools, welding equipment, hydraulic systems, lifting products and site-use equipment.",
    icon: "tool",
  },
  {
    title: "Building Technology Companies",
    badge: "Technology",
    description:
      "Businesses providing construction automation, energy-related engineering and modern building technologies.",
    icon: "technology",
  },
  {
    title: "Construction Product & System Providers",
    badge: "Building Systems",
    description:
      "Providers of building envelopes, roofing systems, interior and exterior products, safety and technical solutions.",
    icon: "shield",
  },
] as const;

const EVENT_FEATURES = [
  "International exhibitors and country pavilions",
  "Live demonstrations and product launches",
  "B2B matchmaking opportunities",
  "Industry conferences and technical seminars",
] as const;

/* ==========================================
   SVG ICON SYSTEM
========================================== */

type IconName =
  | (typeof EXHIBITOR_PROFILES)[number]["icon"]
  | "arrow"
  | "check"
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
    factory: (
      <>
        <path d="M3 21h18M4 21V10l5 3V9l5 4V5h5v16" />
        <path d="M7 17h2m4 0h2m2-7h.01" />
      </>
    ),
    globe: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c-3 3-3 15 0 18M12 3c3 3 3 15 0 18" />
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
        <path d="M3 21h18M5 21V5h10v16M15 10h5v11" />
        <path d="M8 9h4M8 13h4M8 17h4" />
      </>
    ),
    package: (
      <>
        <path d="m12 3 9 5-9 5-9-5 9-5Z" />
        <path d="M3 8v9l9 5 9-5V8M12 13v9" />
      </>
    ),
    machinery: (
      <>
        <path d="M3 20h18M5 20v-6h6l4 6" />
        <path d="M7 14V5h8l4 4v5" />
        <path d="M7 8h8m4 6h2" />
      </>
    ),
    layers: (
      <>
        <path d="m12 3 9 5-9 5-9-5 9-5Z" />
        <path d="m3 12 9 5 9-5M3 16l9 5 9-5" />
      </>
    ),
    settings: (
      <>
        <rect x="5" y="5" width="14" height="14" rx="2" />
        <path d="M9 9h6v6H9zM9 2v3m6-3v3M9 19v3m6-3v3M2 9h3m-3 6h3m14-6h3m-3 6h3" />
      </>
    ),
    tool: (
      <path d="M14 6a5 5 0 0 0-6 6l-5 5a3 3 0 0 0 4 4l5-5a5 5 0 0 0 6-6l-3 3-3-3 3-4Z" />
    ),
    technology: (
      <>
        <rect x="3" y="4" width="18" height="14" rx="2" />
        <path d="M8 22h8M12 18v4m-5-9 3-3 2 2 5-5" />
      </>
    ),
    shield: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    arrow: (
      <path d="M5 12h14m-6-6 6 6-6 6" />
    ),
    check: (
      <path d="m5 12 4 4L19 6" />
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M7 3v4M17 3v4M3 10h18" />
      </>
    ),
    location: (
      <>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
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

/* ==========================================
   ANIMATED CONSTRUCTION ILLUSTRATION

   Solid pink and blue strokes.
   No gradients.
========================================== */

function ConstructionIllustration({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  return (
    <svg
      viewBox="0 0 500 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-auto w-full max-w-[500px]"
      aria-hidden="true"
    >
      {/* Ground */}
      <path
        d="M24 303H480"
        stroke="#DED5DF"
        strokeWidth="1.5"
      />
      <path
        d="M24 316H480"
        stroke="#EAE3EA"
        strokeDasharray="5 8"
      />

      {/* Main building */}
      <motion.g
        initial={reducedMotion ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.8,
          ease: EASE,
        }}
      >
        <path
          d="M102 303V112H270V303"
          stroke="#BA1D82"
          strokeWidth="2.3"
        />
        <path
          d="M116 303V126H256V303"
          stroke="#BA1D82"
          strokeOpacity=".4"
        />
        <path
          d="M102 112L186 63L270 112"
          stroke="#BA1D82"
          strokeWidth="2.3"
        />
        <path
          d="M116 126L186 87L256 126"
          stroke="#BA1D82"
          strokeOpacity=".4"
        />
        <path
          d="M102 161H270M102 211H270M102 261H270"
          stroke="#D7ADCA"
        />

        {[127, 181, 235].map((x) =>
          [138, 188, 238].map((y) => (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width="21"
              height="20"
              stroke="#BA1D82"
              strokeOpacity=".65"
            />
          ))
        )}
      </motion.g>

      {/* Secondary building */}
      <motion.g
        initial={reducedMotion ? false : { opacity: 0, x: 14 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          ease: EASE,
        }}
      >
        <path
          d="M291 303V160H410V303"
          stroke="#304090"
          strokeWidth="2"
        />
        <path
          d="M291 160L350 133L410 160"
          stroke="#304090"
          strokeWidth="2"
        />
        <path
          d="M303 187H398M303 231H398M303 274H398"
          stroke="#304090"
          strokeOpacity=".35"
        />
        <path
          d="M333 303v-43h34v43"
          stroke="#304090"
          strokeOpacity=".7"
        />
      </motion.g>

      {/* Crane drawing */}
      <motion.path
        d="M381 303V43H478M381 43H310M326 43l55-29 55 29M459 43v120"
        stroke="#BA1D82"
        strokeWidth="2"
        strokeLinecap="round"
        initial={
          reducedMotion
            ? false
            : { pathLength: 0 }
        }
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: reducedMotion ? 0 : 2.2,
          ease: EASE,
        }}
      />

      {/* Crane hook */}
      <motion.g
        animate={
          reducedMotion
            ? undefined
            : { y: [0, 8, 0] }
        }
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <path
          d="M451 163h16v9h-16zM459 172v11c0 8 10 9 10 0"
          stroke="#BA1D82"
          strokeWidth="2"
        />
      </motion.g>

      {/* Rotating technical indicator */}
      <motion.g
        animate={
          reducedMotion
            ? undefined
            : { rotate: 360 }
        }
        style={{
          transformOrigin: "72px 90px",
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <circle
          cx="72"
          cy="90"
          r="32"
          stroke="#BA1D82"
          strokeOpacity=".45"
          strokeDasharray="5 9"
        />
        <circle
          cx="72"
          cy="58"
          r="4"
          fill="#BA1D82"
        />
      </motion.g>

      {/* Animated node */}
      <motion.circle
        cx="186"
        cy="63"
        r="5"
        fill="#BA1D82"
        animate={
          reducedMotion
            ? undefined
            : {
                scale: [1, 1.25, 1],
                opacity: [0.5, 1, 0.5],
              }
        }
        style={{
          transformOrigin: "186px 63px",
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Blueprint dimension lines */}
      <path
        d="M78 112H92M78 303H92M84 112v191"
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

function Eyebrow({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        aria-hidden="true"
        className="h-[2px] w-7 bg-brand-primary"
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
          className="mt-3 font-heading text-[clamp(1.4rem,2.5vw,2rem)] font-extrabold leading-[1.2] tracking-[-0.04em] text-brand-dark"
        >
          {title}{" "}
          <span className="text-brand-primary">
            {highlight}
          </span>
        </h2>
      </div>

      <p className="max-w-[370px] text-[12px] leading-[1.8] text-[#66616C] sm:text-[13px]">
        {description}
      </p>
    </div>
  );
}

/* ==========================================
   EXHIBITOR PROFILE CARD
========================================== */

function ProfileCard({
  profile,
  index,
  reducedMotion,
}: {
  profile: (typeof EXHIBITOR_PROFILES)[number];
  index: number;
  reducedMotion: boolean;
}) {
  return (
    <motion.article
      variants={reveal}
      whileHover={
        reducedMotion ? undefined : { y: -4 }
      }
      transition={{
        duration: 0.3,
        ease: EASE,
      }}
      className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-[#E9E4EB] bg-white p-5 shadow-[0_4px_20px_rgba(5,7,9,0.025)] transition-[border-color,box-shadow,background-color] duration-300 hover:border-brand-primary/35 hover:bg-[#FFFCFE] hover:shadow-[0_14px_32px_rgba(5,7,9,0.07)]"
    >
      {/* Animated top highlight */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-brand-primary transition-transform duration-300 group-hover:scale-x-100"
      />

      {/* Icon and index */}
      <div className="flex items-start justify-between gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-brand-primary/15 bg-[#F9ECF5] text-brand-primary transition-[background-color,color] duration-300 group-hover:bg-brand-primary group-hover:text-white">
          <Icon name={profile.icon} className="size-[22px]" />
        </span>

        <span className="font-heading text-[11px] font-bold tabular-nums text-[#AAA4AE]">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Badge */}
      <span className="mt-4 inline-flex w-fit rounded-md border border-brand-primary/15 bg-[#FBF2F8] px-2.5 py-1 font-heading text-[10px] font-bold text-brand-primary">
        {profile.badge}
      </span>

      {/* Title */}
      <h3 className="mt-3 font-heading text-[15px] font-extrabold leading-[1.4] tracking-[-0.025em] text-brand-dark">
        {profile.title}
      </h3>

      {/* Description */}
      <p className="mt-2 flex-1 text-[12px] leading-[1.8] text-[#66616C]">
        {profile.description}
      </p>

      {/* Action */}
      <div className="mt-5 border-t border-[#F0EBF0] pt-3">
        <Link
          href={event.cta.bookStand}
          aria-label={`Enquire about exhibiting as ${profile.title}`}
          className="group/link inline-flex min-h-8 items-center gap-2 font-heading text-[11px] font-bold text-brand-primary transition-colors hover:text-brand-primary-dark"
        >
          Explore Participation

          <span className="transition-transform duration-300 group-hover/link:translate-x-1">
            <Icon name="arrow" className="size-4" />
          </span>
        </Link>
      </div>
    </motion.article>
  );
}

/* ==========================================
   MAIN PAGE CONTENT
========================================== */

export function WhoShouldExhibitClientView() {
  const reducedMotion = !!useReducedMotion();

  const scrollProps = {
    initial: reducedMotion ? false : "hidden",
    whileInView: "visible" as const,
    viewport: {
      once: true,
      amount: 0.08,
    },
  };

  return (
    <div className="relative overflow-hidden bg-[#F8F8FA] py-12 text-brand-dark selection:bg-brand-primary selection:text-white sm:py-16">
      <Container>
        {/* ===================================
            01. HERO INTRODUCTION
        ==================================== */}

        <motion.header
          {...scrollProps}
          variants={reveal}
          className="grid items-center gap-6 overflow-hidden rounded-2xl border border-[#E9E4EB] bg-white p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:p-8"
        >
          {/* Left content */}
          <div className="min-w-0">
            <Eyebrow>
              Exhibitor Business Profiles
            </Eyebrow>

            <h1 className="mt-4 max-w-[650px] font-heading text-[clamp(1.75rem,3vw,2.65rem)] font-extrabold leading-[1.15] tracking-[-0.045em] text-brand-dark">
              Is Your Business Ready for{" "}
              <span className="text-brand-primary">
                Bangladesh Buildcon?
              </span>
            </h1>

            <p className="mt-4 max-w-[600px] text-[13px] leading-[1.85] text-[#66616C] sm:text-[14px]">
              From construction materials and machinery
              to engineering products and building
              technologies, explore the business
              profiles relevant to Bangladesh
              Buildcon International Expo 2026.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="rounded-md border border-[#EAE4EC] bg-[#FBFAFC] px-3 py-1.5 text-[10px] font-semibold text-[#625B67]">
                Manufacturers
              </span>

              <span className="rounded-md border border-[#EAE4EC] bg-[#FBFAFC] px-3 py-1.5 text-[10px] font-semibold text-[#625B67]">
                Suppliers
              </span>

              <span className="rounded-md border border-[#EAE4EC] bg-[#FBFAFC] px-3 py-1.5 text-[10px] font-semibold text-[#625B67]">
                Distributors
              </span>

              <span className="rounded-md border border-[#EAE4EC] bg-[#FBFAFC] px-3 py-1.5 text-[10px] font-semibold text-[#625B67]">
                Technology Providers
              </span>
            </div>

            <div className="mt-6 flex flex-wrap gap-2.5">
              <Link
                href={event.cta.bookStand}
                className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-brand-primary px-5 py-3 font-heading text-[11px] font-bold text-white transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-brand-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary motion-reduce:transform-none"
              >
                Enquire for Stand Space

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <Icon name="arrow" className="size-4" />
                </span>
              </Link>

              <Link
                href="/exhibition-profile"
                className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#E4DEE6] bg-white px-5 py-3 font-heading text-[11px] font-bold text-brand-dark transition-colors duration-300 hover:border-brand-primary/35 hover:text-brand-primary"
              >
                Explore Exhibition Sectors

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <Icon name="arrow" className="size-4" />
                </span>
              </Link>
            </div>
          </div>

          {/* Animated building illustration */}
          <div className="relative flex min-w-0 items-center justify-center overflow-hidden rounded-xl border border-[#F0E7EE] bg-[#FCF8FB] p-4 sm:p-6">
            <ConstructionIllustration
              reducedMotion={reducedMotion}
            />

            <span className="absolute bottom-3 right-4 font-heading text-[9px] font-bold uppercase tracking-[0.11em] text-brand-primary/70">
              Industry Connections
            </span>
          </div>
        </motion.header>

        {/* ===================================
            02. BUSINESS PROFILE CARDS
        ==================================== */}

        <section
          aria-labelledby="exhibitor-profiles-heading"
          className="mt-12 sm:mt-14"
        >
          <motion.div
            {...scrollProps}
            variants={reveal}
          >
            <SectionHeading
              id="exhibitor-profiles-heading"
              eyebrow="Who Should Exhibit?"
              title="Explore Relevant"
              highlight="Business Profiles"
              description="Identify the manufacturer, supplier, distributor and technology business categories relevant to the exhibition."
            />
          </motion.div>

          <motion.div
            variants={stagger}
            initial={reducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.06,
            }}
            className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {EXHIBITOR_PROFILES.map(
              (profile, index) => (
                <ProfileCard
                  key={profile.title}
                  profile={profile}
                  index={index}
                  reducedMotion={reducedMotion}
                />
              )
            )}
          </motion.div>

          <motion.p
            {...scrollProps}
            variants={reveal}
            className="mt-5 text-[11px] leading-[1.8] text-[#77717D]"
          >
            These profiles describe prospective
            exhibitors whose products or services
            may be relevant to the exhibition.
            Listing a category does not indicate
            confirmed participation or automatic
            eligibility.
          </motion.p>
        </section>

        {/* ===================================
            03. OFFICIAL EXHIBITOR SECTORS
        ==================================== */}

        <section
          aria-labelledby="exhibitor-sectors-heading"
          className="mt-12 sm:mt-16"
        >
          <motion.div
            {...scrollProps}
            variants={reveal}
          >
            <SectionHeading
              id="exhibitor-sectors-heading"
              eyebrow="Official Exhibition Profile"
              title="Discover the"
              highlight="Seven Exhibition Sectors"
              description="Explore the main construction-industry categories represented in the Bangladesh Buildcon exhibitor profile."
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
            className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          >
            {exhibitionSectors.map(
              (sector, index) => (
                <motion.div
                  key={sector.slug}
                  variants={reveal}
                  whileHover={
                    reducedMotion
                      ? undefined
                      : { y: -3 }
                  }
                >
                  <Link
                    href={`/exhibition-profile#${sector.slug}`}
                    className="group flex min-h-[78px] h-full items-center gap-3 rounded-xl border border-[#E9E4EB] bg-white p-4 transition-[border-color,background-color,box-shadow] duration-300 hover:border-brand-primary/35 hover:bg-[#FFFCFE] hover:shadow-[0_8px_22px_rgba(5,7,9,0.045)]"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#F9ECF5] font-heading text-[11px] font-extrabold tabular-nums text-brand-primary transition-colors duration-300 group-hover:bg-brand-primary group-hover:text-white">
                      {String(index + 1).padStart(
                        2,
                        "0"
                      )}
                    </span>

                    <span className="min-w-0 flex-1 font-heading text-[12px] font-bold leading-[1.6] text-brand-dark">
                      {sector.name}
                    </span>

                    <span className="shrink-0 text-brand-primary transition-transform duration-300 group-hover:translate-x-1">
                      <Icon
                        name="arrow"
                        className="size-4"
                      />
                    </span>
                  </Link>
                </motion.div>
              )
            )}
          </motion.div>

          <motion.div
            {...scrollProps}
            variants={reveal}
            className="mt-5 flex justify-end"
          >
            <Link
              href="/exhibition-profile"
              className="group inline-flex min-h-10 items-center gap-2 font-heading text-[11px] font-bold text-brand-primary transition-colors hover:text-brand-primary-dark"
            >
              View Full Exhibition Profile

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <Icon name="arrow" className="size-4" />
              </span>
            </Link>
          </motion.div>
        </section>

        {/* ===================================
            04. EXHIBITION FEATURES
        ==================================== */}

        <motion.section
          {...scrollProps}
          variants={reveal}
          aria-labelledby="exhibitor-features-heading"
          className="mt-12 overflow-hidden rounded-2xl border border-[#E9E4EB] bg-white sm:mt-16"
        >
          <div className="grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            {/* Left content */}
            <div className="relative overflow-hidden bg-[#18151C] p-6 text-white sm:p-8">
              <Eyebrow>
                Exhibition Programme
              </Eyebrow>

              <h2
                id="exhibitor-features-heading"
                className="mt-4 max-w-[410px] font-heading text-[clamp(1.4rem,2.2vw,1.95rem)] font-extrabold leading-[1.25] tracking-[-0.035em]"
              >
                More Than an{" "}
                <span className="text-[#E7A3D0]">
                  Exhibition Floor.
                </span>
              </h2>

              <p className="mt-4 max-w-[430px] text-[12px] leading-[1.85] text-white/65 sm:text-[13px]">
                The official brochure highlights
                product discovery, international
                participation, business networking
                and technical knowledge exchange.
              </p>

              {/* Simple technical SVG */}
              <svg
                viewBox="0 0 340 135"
                fill="none"
                aria-hidden="true"
                className="mt-5 h-auto w-full max-w-[340px] opacity-75"
              >
                <path
                  d="M12 123H328"
                  stroke="#FFFFFF"
                  strokeOpacity=".25"
                />
                <path
                  d="M25 123V48h90v75M128 123V20h90v103M231 123V64h77v59"
                  stroke="#BA1D82"
                  strokeWidth="2"
                />
                <path
                  d="M25 74h90M25 98h90M128 50h90M128 76h90M128 102h90M231 89h77"
                  stroke="#FFFFFF"
                  strokeOpacity=".3"
                />
                <path
                  d="M165 20V5h100M265 5v50"
                  stroke="#BA1D82"
                  strokeWidth="2"
                />
                <circle
                  cx="265"
                  cy="55"
                  r="4"
                  fill="#BA1D82"
                />
              </svg>
            </div>

            {/* Right feature list */}
            <motion.div
              variants={stagger}
              initial={reducedMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.15,
              }}
              className="grid gap-3 p-5 sm:grid-cols-2 sm:p-7"
            >
              {EVENT_FEATURES.map(
                (feature, index) => (
                  <motion.div
                    key={feature}
                    variants={reveal}
                    whileHover={
                      reducedMotion
                        ? undefined
                        : { x: 3 }
                    }
                    className="group flex min-h-[108px] flex-col justify-between gap-4 rounded-xl border border-[#ECE6EC] bg-[#FCFAFC] p-4 transition-[border-color,background-color] duration-300 hover:border-brand-primary/30 hover:bg-[#FBF2F8]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#F9ECF5] text-brand-primary">
                        <Icon
                          name="check"
                          className="size-4"
                        />
                      </span>

                      <span className="font-heading text-[10px] font-bold tabular-nums text-[#AAA4AE]">
                        0{index + 1}
                      </span>
                    </div>

                    <p className="font-heading text-[12px] font-bold leading-[1.65] text-brand-dark sm:text-[13px]">
                      {feature}
                    </p>
                  </motion.div>
                )
              )}
            </motion.div>
          </div>
        </motion.section>

        {/* ===================================
            05. FINAL CTA
        ==================================== */}

        <motion.section
          {...scrollProps}
          variants={reveal}
          aria-labelledby="exhibitor-cta-heading"
          className="mt-6 overflow-hidden rounded-2xl border border-brand-primary/20 bg-[#F8EDF5] p-5 sm:p-7"
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-[720px]">
              <Eyebrow>
                Exhibitor Enquiries
              </Eyebrow>

              <h2
                id="exhibitor-cta-heading"
                className="mt-3 font-heading text-[clamp(1.2rem,2vw,1.55rem)] font-extrabold leading-[1.35] tracking-[-0.03em] text-brand-dark"
              >
                Interested in Exhibiting at{" "}
                <span className="text-brand-primary">
                  Bangladesh Buildcon 2026?
                </span>
              </h2>

              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[12px] font-medium text-[#635A66]">
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

              <p className="mt-3 max-w-[650px] text-[12px] leading-[1.8] text-[#66616C]">
                Contact the exhibition team to
                discuss your products, stand space
                requirements and participation
                arrangements. Stand allocation
                is subject to confirmation.
              </p>
            </div>

            <Link
              href={event.cta.bookStand}
              className="group inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-brand-primary px-5 py-3 font-heading text-[12px] font-bold text-white transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-brand-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary motion-reduce:transform-none sm:w-auto"
            >
              Enquire for Stand Space

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
