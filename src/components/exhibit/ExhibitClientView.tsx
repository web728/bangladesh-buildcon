
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
   BRAND & ANIMATION
========================================== */
const EASE = [0.22, 1, 0.36, 1] as const;
const reveal: Variants = {
  hidden: { opacity: 0, y: 22 },
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
      delayChildren: 0.06,
    },
  },
};
/* ==========================================
   EXHIBITOR ADVANTAGES
   Aligned with brochure:
   Why Exhibit, Event Overview and Key Features
========================================== */
const BENEFITS = [
  {
    title: "Connect with Buyers",
    description:
      "Present building materials, machinery and construction solutions to buyers, contractors, developers and procurement professionals.",
    label: "Business Connections",
    icon: "buyers",
  },
  {
    title: "Expand Distribution",
    description:
      "Meet importers, dealers, distributors and trading companies exploring construction products and equipment suppliers.",
    label: "Trade Network",
    icon: "network",
  },
  {
    title: "Explore Bangladesh",
    description:
      "Introduce your brand to Bangladesh's construction market and build relationships with local industry professionals.",
    label: "Market Access",
    icon: "market",
  },
  {
    title: "Generate Enquiries",
    description:
      "Discuss product requirements with visitors sourcing construction materials, equipment and technical solutions.",
    label: "Product Sourcing",
    icon: "enquiries",
  },
  {
    title: "Meet Industry Professionals",
    description:
      "Engage architects, civil engineers, builders, consultants and other professionals involved in construction projects.",
    label: "Industry Engagement",
    icon: "professionals",
  },
  {
    title: "Showcase Your Products",
    description:
      "Present innovations and discuss suitable opportunities for machinery displays, product launches and live demonstrations.",
    label: "Product Visibility",
    icon: "showcase",
  },
] as const;
const EXHIBITOR_PROFILES = [
  {
    title: "Building Material Companies",
    description: "Roofing, insulation, waterproofing, façades, finishes and construction components.",
  },
  {
    title: "Construction Machinery Companies",
    description: "Lifting systems, construction machinery, formwork, power tools and site equipment.",
  },
  {
    title: "Engineering Product Manufacturers",
    description: "Electrical products, distribution equipment, automation and technical components.",
  },
  {
    title: "Equipment Suppliers",
    description: "Construction tools, welding equipment, hydraulics and site-use systems.",
  },
  {
    title: "Building Technology Companies",
    description: "Building automation, modern construction technologies and energy-related solutions.",
  },
  {
    title: "Construction Product & System Providers",
    description: "Building envelopes, prefabricated systems, interiors and safety solutions.",
  },
  {
    title: "Importers & Distributors",
    description: "Dealers and trading businesses representing building materials and equipment.",
  },
  {
    title: "Bangladeshi Manufacturers",
    description: "Local producers presenting materials, components and building solutions.",
  },
] as const;
const EXHIBITOR_TYPES = [
  "Manufacturers",
  "Exporters",
  "International Suppliers",
  "Distributors",
  "Technology Providers",
] as const;
const EXHIBITION_SECTORS = [
  "Construction Machinery and Equipment",
  "Construction Materials",
  "Construction",
  "Country Housing & Landscaping",
  "Electricity & Electrical Engineering in Construction",
  "Interior & Exterior",
  "Safety & Security",
] as const;
const PROGRAMME_HIGHLIGHTS = [
  "International exhibitors and country pavilions",
  "Product launches and live demonstrations",
  "Business networking and B2B matchmaking",
  "Industry conferences and technical seminars",
] as const;
const SECTOR_TAGS = [
  "Construction Machinery",
  "Construction Materials",
  "Electrical Engineering",
  "Interior & Exterior",
  "Safety & Security",
] as const;
const PARTICIPATION_OPTIONS = [
  {
    title: "Shell Scheme Space",
    tag: "Standard Exhibition Stand",
    description:
      "A conventional exhibition stand format with fixtures and fittings subject to the confirmed exhibitor package.",
    icon: "shell",
  },
  {
    title: "Raw Bare Space",
    tag: "Custom Stand Design",
    description:
      "Unfurnished exhibition space for companies planning their own stand design, construction and branding.",
    icon: "bare",
  },
  {
    title: "International Pavilions",
    tag: "Group Participation",
    description:
      "Coordinated exhibition participation for trade bodies, export organisations and international delegations.",
    icon: "pavilion",
  },
  {
    title: "Machinery & Heavy Displays",
    tag: "Equipment Showcase",
    description:
      "Discuss suitable arrangements for machinery and equipment displays, subject to venue specifications and organiser approval.",
    icon: "machinery",
  },
] as const;
/* ==========================================
   ICONS
========================================== */
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
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4 shrink-0"
      aria-hidden="true"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}
type BenefitIconName =
  (typeof BENEFITS)[number]["icon"];
function BenefitIcon({
  name,
}: {
  name: BenefitIconName;
}) {
  let paths: ReactNode;
  switch (name) {
    case "buyers":
      paths = (
        <>
          <circle cx="9" cy="8" r="3" />
          <path d="M3 20v-2a6 6 0 0 1 12 0v2" />
          <path d="M17 7h5m-2.5-2.5v5M16 14h6m-6 4h4" />
        </>
      );
      break;
    case "network":
      paths = (
        <>
          <rect x="2" y="4" width="7" height="6" rx="1" />
          <rect x="15" y="4" width="7" height="6" rx="1" />
          <rect x="8.5" y="16" width="7" height="6" rx="1" />
          <path d="M5.5 10v3h13v-3M12 13v3" />
        </>
      );
      break;
    case "market":
      paths = (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c3 3 4 6 4 9s-1 6-4 9M12 3c-3 3-4 6-4 9s1 6 4 9" />
        </>
      );
      break;
    case "enquiries":
      paths = (
        <>
          <path d="M4 5h16v11H9l-5 4V5Z" />
          <path d="M8 9h8M8 12h5" />
        </>
      );
      break;
    case "professionals":
      paths = (
        <>
          <path d="M3 21V7l9-4 9 4v14M9 21v-7h6v7" />
          <path d="M7 10h2m6 0h2" />
        </>
      );
      break;
    case "showcase":
      paths = (
        <>
          <rect x="3" y="4" width="18" height="13" rx="2" />
          <path d="M8 21h8M12 17v4M9 8l7 2-7 3V8Z" />
        </>
      );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-6"
      aria-hidden="true"
    >
      {paths}
    </svg>
  );
}
type StandIconName =
  (typeof PARTICIPATION_OPTIONS)[number]["icon"];
function StandIcon({
  name,
}: {
  name: StandIconName;
}) {
  const common =
    "stroke-current";
  return (
    <svg
      viewBox="0 0 80 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={common + " h-[64px] w-[80px]"}
      aria-hidden="true"
    >
      {name === "shell" && (
        <>
          <path d="M10 52V15h60v37M10 15l9-8h51l-9 8" />
          <path d="M19 15v37M61 15v37M19 26h42" />
          <path d="M29 52V35h22v17" />
          <path d="M14 57h52" />
          <path d="M36 19h8" />
        </>
      )}
      {name === "bare" && (
        <>
          <path d="m9 43 32-18 30 18-32 18L9 43Z" />
          <path d="M9 43v-7l32-18 30 18v7" />
          <path d="M41 18v7M9 36l32 18 30-18" />
          <path d="M20 39l21-12 20 12" />
        </>
      )}
      {name === "pavilion" && (
        <>
          <path d="M6 55h68M13 55V22l27-13 27 13v33" />
          <path d="M23 55V30h34v25M29 30v25M51 30v25" />
          <path d="M40 9v-6M40 3h12v9H40" />
          <path d="M35 39h10v16" />
        </>
      )}
      {name === "machinery" && (
        <>
          <path d="M10 49h58M18 46h39l6-13H29l-7 7H13v6h5Z" />
          <circle cx="25" cy="50" r="6" />
          <circle cx="56" cy="50" r="6" />
          <path d="M34 33V16h12l6 17M46 16l7-8h12" />
          <path d="M39 19v12M59 8v16" />
        </>
      )}
    </svg>
  );
}
/* ==========================================
   LARGE ARCHITECTURAL SVG
   Solid color only.
   Lines animate without gradients.
========================================== */
function ArchitecturalIllustration({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  return (
    <svg
      viewBox="0 0 460 290"
      fill="none"
      xmlns="http\://www\.w3.org/2000/svg"
      className="h-auto w-full max-w-[460px]"
      aria-hidden="true"
    >
      {/* Construction ground */}
      <path
        d="M24 249H435"
        stroke="#D8CAD5"
        strokeWidth="1.5"
      />
      <path
        d="M24 263H435"
        stroke="#EEE4EC"
        strokeWidth="1"
        strokeDasharray="5 8"
      />
      {/* Building structure */}
      <motion.g
        initial={reducedMotion ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <path
          d="M90 249V91H245V249"
          stroke="#BA1D82"
          strokeWidth="2.3"
        />
        <path
          d="M105 249V106H230V249"
          stroke="#BA1D82"
          strokeOpacity=".35"
        />
        <path
          d="M90 91L167 48L245 91"
          stroke="#BA1D82"
          strokeWidth="2.3"
        />
        <path
          d="M105 106L167 71L230 106"
          stroke="#BA1D82"
          strokeOpacity=".35"
        />
        <path
          d="M90 135H245M90 176H245M90 217H245"
          stroke="#D8B3CD"
        />
        {[113, 160, 207].map((x) =>
          [116, 157, 198].map((y) => (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width="20"
              height="18"
              stroke="#BA1D82"
              strokeOpacity=".6"
            />
          ))
        )}
      </motion.g>
      {/* Secondary structure */}
      <path
        d="M270 249V132H383V249"
        stroke="#304090"
        strokeWidth="2"
      />
      <path
        d="M270 132L326 107L383 132"
        stroke="#304090"
        strokeWidth="2"
      />
      <path
        d="M282 154H370M282 190H370M282 226H370"
        stroke="#304090"
        strokeOpacity=".3"
      />
      <path
        d="M310 249v-37h32v37"
        stroke="#304090"
        strokeOpacity=".7"
      />
      {/* Crane arm */}
      <motion.path
        d="M335 249V39H420M335 39H284M300 39l35-25 35 25M405 39v92"
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
          duration: reducedMotion ? 0 : 2,
          ease: EASE,
        }}
      />
      {/* Crane hook */}
      <motion.g
        animate={
          reducedMotion
            ? undefined
            : { y: [0, 7, 0] }
        }
        transition={{
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      >
        <path
          d="M397 131h16v8h-16zM405 139v10c0 7 10 8 10 0"
          stroke="#BA1D82"
          strokeWidth="2"
        />
      </motion.g>
      {/* Animated connection nodes */}
      <motion.circle
        cx="167"
        cy="48"
        r="5"
        fill="#BA1D82"
        animate={
          reducedMotion
            ? undefined
            : {
                opacity: [0.4, 1, 0.4],
                scale: [1, 1.2, 1],
              }
        }
        style={{
          transformOrigin: "167px 48px",
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <circle
        cx="326"
        cy="107"
        r="4"
        fill="#304090"
      />
      {/* Blueprint dimension marks */}
      <path
        d="M68 91H81M68 249H81M74 91v158"
        stroke="#BA1D82"
        strokeOpacity=".45"
        strokeDasharray="3 5"
      />
    </svg>
  );
}
/* ==========================================
   COMMON UI
========================================== */
function Eyebrow({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="h-[2px] w-7 bg-brand-primary" />
      <span className="font-heading text-[10px] font-extrabold uppercase tracking-[0.15em] text-brand-primary">
        {children}
      </span>
    </div>
  );
}
function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  id,
}: {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  id: string;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-[#E8E4E9] pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-[650px]">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2
          id={id}
          className="mt-3 font-heading text-[clamp(1.5rem,2.5vw,2rem)] font-extrabold leading-[1.2] tracking-[-0.04em] text-brand-dark"
        >
          {title}{" "}
          <span className="text-brand-primary">
            {highlight}
          </span>
        </h2>
      </div>
     
    </div>
  );
}
/* ==========================================
   BENEFIT CARD
========================================== */
function BenefitCard({
  benefit,
  index,
  reducedMotion,
}: {
  benefit: (typeof BENEFITS)[number];
  index: number;
  reducedMotion: boolean;
}) {
  return (
    <motion.article
      variants={reveal}
      whileHover={
        reducedMotion
          ? undefined
          : { y: -5 }
      }
      className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-[#E9E4E9] bg-white p-5 shadow-[0_4px_18px_rgba(5,7,9,0.025)] transition-[border-color,box-shadow] duration-300 hover:border-brand-primary/35 hover:shadow-[0_14px_32px_rgba(5,7,9,0.07)] sm:p-6"
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-brand-primary transition-transform duration-300 group-hover:scale-x-100"
      />
      <div className="flex items-start justify-between gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-brand-primary/15 bg-[#F9ECF5] text-brand-primary">
          <BenefitIcon name={benefit.icon} />
        </span>
      </div>
      <h3 className="mt-5 font-heading text-[15px] font-extrabold leading-[1.35] tracking-[-0.02em] text-brand-dark">
        {benefit.title}
      </h3>
      <p className="mt-3 flex-1 text-[12px] leading-[1.85] text-[#65636D] sm:text-[13px]">
        {benefit.description}
      </p>
      <div className="mt-5 border-t border-[#F0EBF0] pt-3">
        <span className="font-heading text-[10px] font-bold uppercase tracking-[0.06em] text-brand-primary">
          {benefit.label}
        </span>
      </div>
    </motion.article>
  );
}
/* ==========================================
   MAIN EXHIBITOR VIEW
========================================== */
export function ExhibitClientView() {
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
    <div className="overflow-hidden bg-[#F8F8FA] py-12 text-brand-dark selection:bg-brand-primary selection:text-white sm:py-16">
      <Container>
        {/* =====================================
            01 — BENEFITS HEADER
        ====================================== */}
        <section aria-labelledby="exhibitor-benefits-heading">
          <motion.div
            {...scrollProps}
            variants={reveal}
            className="grid items-center gap-6 rounded-2xl border border-[#E9E4E9] bg-white p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.82fr)] lg:p-8"
          >
            <div className="min-w-0">
              <Eyebrow>
                Why Exhibit at Buildcon?
              </Eyebrow>
              <h2
                id="exhibitor-benefits-heading"
                className="mt-4 max-w-[610px] font-heading text-[clamp(1.75rem,3vw,2.65rem)] font-extrabold leading-[1.15] tracking-[-0.045em] text-brand-dark"
              >
                Showcase Your Products.{" "}
                <span className="text-brand-primary">
                  Connect with Industry.
                </span>
              </h2>
              <p className="mt-4 max-w-[560px] text-[13px] leading-[1.85] text-[#62606B] sm:text-[14px]">
                Bangladesh Buildcon International Expo
                brings together manufacturers,
                suppliers and construction industry
                professionals to discover building
                materials, machinery and new solutions.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {SECTOR_TAGS.map((sector) => (
                  <span
                    key={sector}
                    className="rounded-md border border-[#E9E3EA] bg-[#FBFAFC] px-2.5 py-1.5 text-[10px] font-semibold text-[#55515B]"
                  >
                    {sector}
                  </span>
                ))}
              </div>
              <Link
                href={event.cta.bookStand}
                className="group mt-6 inline-flex min-h-11 w-fit items-center justify-center gap-2.5 rounded-lg bg-brand-primary px-5 py-3 font-heading text-[12px] font-bold text-white shadow-[0_8px_20px_rgba(186,29,130,0.16)] transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-brand-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary motion-reduce:transform-none"
              >
                Enquire for Stand Space
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowIcon />
                </span>
              </Link>
            </div>
            <div className="relative flex min-w-0 items-center justify-center overflow-hidden rounded-xl border border-[#F0E8EF] bg-[#FCF8FB] p-4 sm:p-6">
              <ArchitecturalIllustration
                reducedMotion={reducedMotion}
              />
             
            </div>
          </motion.div>
          {/* Benefits introduction */}
          <motion.div
            {...scrollProps}
            variants={reveal}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <Eyebrow>Exhibitor Advantages</Eyebrow>
              <h3 className="mt-2 font-heading text-[clamp(1.35rem,2.2vw,1.8rem)] font-extrabold tracking-[-0.035em] text-brand-dark">
                Opportunities to{" "}
                <span className="text-brand-primary">
                  Grow Your Business
                </span>
              </h3>
            </div>
            
          </motion.div>
          {/* Six animated advantages */}
          <motion.div
            variants={stagger}
            initial={reducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.07 }}
            className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {BENEFITS.map((benefit, index) => (
              <BenefitCard
                key={benefit.title}
                benefit={benefit}
                index={index}
                reducedMotion={reducedMotion}
              />
            ))}
          </motion.div>
        </section>
        {/* =====================================
            02 — EXHIBITOR PROFILES
        ====================================== */}
        <section
          aria-labelledby="exhibitor-profiles-heading"
          className="mt-12 sm:mt-16"
        >
          <motion.div
            {...scrollProps}
            variants={reveal}
          >
            <SectionHeading
              id="exhibitor-profiles-heading"
              eyebrow="Who Should Exhibit?"
              title="Built for the"
              highlight="Construction Industry"
              description="Explore relevant manufacturers, suppliers, distributors and technology businesses across the construction sector."
            />
          </motion.div>
          <div className="mt-5 flex flex-wrap gap-2" aria-label="Eligible business types">
            {EXHIBITOR_TYPES.map((type) => (
              <span
                key={type}
                className="rounded-md border border-[#E9E4E9] bg-white px-3 py-1.5 font-heading text-[11px] font-semibold leading-[1.5] text-[#5B5360]"
              >
                {type}
              </span>
            ))}
          </div>
          <motion.div
            variants={stagger}
            initial={reducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="mt-5 overflow-hidden rounded-xl border border-[#E9E4E9] bg-white"
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-4">
              {EXHIBITOR_PROFILES.map((profile) => (
                <motion.article
                  key={profile.title}
                  variants={reveal}
                  className="group min-w-0 border-b border-r border-[#F0EBF0] p-4 transition-colors duration-300 hover:bg-[#FCF5FA] sm:p-5"
                >
                  <h3 className="font-heading text-[13px] font-bold leading-[1.4] tracking-[-0.02em] text-brand-dark">
                    {profile.title}
                  </h3>
                  <p className="mt-2 text-[12px] leading-[1.7] tracking-normal text-[#65636D]">
                    {profile.description}
                  </p>
                </motion.article>
              ))}
            </div>
          </motion.div>
         
        </section>
        {/* =====================================
            EXHIBITION SECTORS & PROGRAMME
        ====================================== */}
        <section aria-labelledby="exhibition-sectors-heading" className="mt-12 sm:mt-16">
          <motion.div {...scrollProps} variants={reveal}>
            <SectionHeading
              id="exhibition-sectors-heading"
              eyebrow="Exhibition Profile"
              title="Explore the"
              highlight="Exhibition Sectors"
              description="Construction products, equipment and building technologies represented in the event's exhibition profile."
            />
          </motion.div>
          <motion.div
            variants={stagger}
            initial={reducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            className="mt-5 grid overflow-hidden rounded-xl border border-[#E9E4E9] bg-white sm:grid-cols-2 lg:grid-cols-3"
          >
            {EXHIBITION_SECTORS.map((sector) => (
              <motion.div
                key={sector}
                variants={reveal}
                className="flex min-w-0 items-start gap-2.5 border-b border-r border-[#F0EBF0] px-4 py-3.5 sm:px-5"
              >
                <span className="mt-0.5 shrink-0 text-brand-primary"><CheckIcon /></span>
                <span className="font-heading text-[12px] font-semibold leading-[1.55] tracking-normal text-brand-dark sm:text-[13px]">
                  {sector}
                </span>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            {...scrollProps}
            variants={reveal}
            className="mt-5 grid items-start gap-5 rounded-xl border border-[#E9E4E9] bg-[#FDFBFD] p-5 sm:p-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
          >
            <div>
              <Eyebrow>Exhibition Programme</Eyebrow>
              <h3 className="mt-2 font-heading text-[17px] font-extrabold leading-[1.35] tracking-[-0.025em] text-brand-dark sm:text-[19px]">
                More Than an Exhibition Floor
              </h3>
              <p className="mt-2 max-w-[390px] text-[12px] leading-[1.75] text-[#65636D] sm:text-[13px]">
                The exhibition programme highlights opportunities for product discovery, industry connections and knowledge exchange.
              </p>
            </div>
            <ul className="grid gap-x-5 gap-y-3 sm:grid-cols-2">
              {PROGRAMME_HIGHLIGHTS.map((highlight) => (
                <li key={highlight} className="flex items-start gap-2.5 text-[12px] leading-[1.65] text-[#554F5B]">
                  <span className="mt-0.5 shrink-0 text-brand-primary"><CheckIcon /></span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          
        </section>
        {/* =====================================
            03 — PARTICIPATION FORMATS
        ====================================== */}
        <section
          aria-labelledby="exhibition-formats-heading"
          className="mt-12 sm:mt-16"
        >
          <motion.div
            {...scrollProps}
            variants={reveal}
          >
            <SectionHeading
              id="exhibition-formats-heading"
              eyebrow="Exhibition Participation"
              title="Explore Your"
              highlight="Stand Options"
              description="Discuss exhibition space arrangements with the organising team and select a format suitable for your products."
            />
          </motion.div>
          <motion.div
            variants={stagger}
            initial={reducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
            className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {PARTICIPATION_OPTIONS.map(
              (option, index) => (
                <motion.article
                  key={option.title}
                  variants={reveal}
                  whileHover={
                    reducedMotion
                      ? undefined
                      : { y: -4 }
                  }
                  className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-[#E9E4E9] bg-white p-5 transition-[border-color,box-shadow] duration-300 hover:border-brand-primary/35 hover:shadow-[0_14px_30px_rgba(5,7,9,0.06)]"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-brand-primary">
                      <StandIcon name={option.icon} />
                    </span>
                  </div>
                  <div className="mt-3 h-px bg-[#EFE8EF]" />
                  <span className="mt-4 font-heading text-[10px] font-bold uppercase tracking-[0.07em] text-brand-primary">
                    {option.tag}
                  </span>
                  <h3 className="mt-2 font-heading text-[15px] font-extrabold leading-[1.4] tracking-[-0.025em] text-brand-dark">
                    {option.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[12px] leading-[1.8] text-[#65636D]">
                    {option.description}
                  </p>
                  <div className="mt-5 border-t border-[#EFE8EF] pt-4">
                    <Link
                      href={event.cta.bookStand}
                      aria-label={`Enquire about ${option.title}`}
                      className="group/link inline-flex items-center gap-2 font-heading text-[11px] font-bold text-brand-primary transition-colors hover:text-brand-primary-dark"
                    >
                      Enquire About Space
                      <span className="transition-transform duration-300 group-hover/link:translate-x-1">
                        <ArrowIcon />
                      </span>
                    </Link>
                  </div>
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-brand-primary transition-transform duration-300 group-hover:scale-x-100"
                  />
                </motion.article>
              )
            )}
          </motion.div>
        </section>
        {/* =====================================
            04 — FINAL EXHIBITOR CTA
        ====================================== */}
        <motion.section
          {...scrollProps}
          variants={reveal}
          aria-labelledby="exhibitor-cta-heading"
          className="relative mt-12 overflow-hidden rounded-2xl bg-[#17151B] p-6 text-white sm:mt-16 sm:p-8 lg:p-9"
        >
          {/* Solid-color architectural SVG */}
          <svg
            viewBox="0 0 270 180"
            fill="none"
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-7 right-0 h-[180px] w-[270px] opacity-20 sm:right-12"
          >
            <path
              d="M15 170V60h70v110M100 170V28h90v142M202 170V80h50v90"
              stroke="#BA1D82"
              strokeWidth="2"
            />
            <path
              d="M15 95h70M15 132h70M100 65h90M100 104h90M100 143h90M202 116h50"
              stroke="#FFFFFF"
              strokeOpacity=".5"
            />
            <path
              d="M125 28V5h118M243 5v80"
              stroke="#BA1D82"
              strokeWidth="2"
            />
            <circle cx="243" cy="85" r="5" fill="#BA1D82" />
          </svg>
          <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-[700px]">
              <div className="flex items-center gap-2.5">
                <span className="h-[2px] w-7 bg-brand-primary" />
                <span className="font-heading text-[10px] font-bold uppercase tracking-[0.15em] text-[#EBA9D4]">
                  Exhibitor Enquiries
                </span>
              </div>
              <h2
                id="exhibitor-cta-heading"
                className="mt-3 font-heading text-[clamp(1.4rem,2.4vw,2rem)] font-extrabold leading-[1.25] tracking-[-0.035em]"
              >
                Ready to Exhibit at{" "}
                <span className="text-[#EBA9D4]">
                  Bangladesh Buildcon?
                </span>
              </h2>
              <p className="mt-3 text-[12px] leading-[1.8] text-white/65 sm:text-[13px]">
                {event.dates.display} ·{" "}
                {event.venue.name},{" "}
                {event.venue.city}. Share your
                participation requirements with
                the organising team.
              </p>
            </div>
            <Link
              href={event.cta.bookStand}
              className="group inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-brand-primary px-5 py-3 font-heading text-[12px] font-bold text-white transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-brand-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary motion-reduce:transform-none sm:w-auto"
            >
              Book Exhibition Stand
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <ArrowIcon />
              </span>
            </Link>
          </div>
          <div className="relative z-10 mt-6 flex items-start gap-2 border-t border-white/15 pt-4">
            <span className="mt-0.5 shrink-0 text-[#EBA9D4]">
              <CheckIcon />
            </span>
            <p className="text-[11px] leading-[1.8] text-white/55">
              Submitting an enquiry does not
              automatically confirm stand allocation.
            </p>
          </div>
        </motion.section>
      </Container>
    </div>
  );
}
