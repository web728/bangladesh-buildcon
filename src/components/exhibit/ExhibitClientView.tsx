
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

const VISITOR_PROFILES = [
  {
    title: "Building Consultants & Civil Engineers",
    percentage: 36,
  },
  {
    title: "Architects & Interior Designers",
    percentage: 25,
  },
  {
    title: "Government Departments & Agencies",
    percentage: 19,
  },
  {
    title: "Builders & Real Estate Developers",
    percentage: 11,
  },
  {
    title: "Importers, Dealers & Distributors",
    percentage: 8,
  },
] as const;




const BENEFITS = [
  {
    title: "Connect with Potential Buyers",
    description:
      "Meet buyers, contractors, developers, and procurement professionals looking for building materials, construction equipment, and related products.",
    label: "Buyer Connections",
    icon: "buyers",
  },
  {
    title: "Expand Your Distribution Network",
    description:
      "Connect with importers, dealers, and distributors interested in sourcing new building and construction products for their markets.",
    label: "Distribution Opportunities",
    icon: "network",
  },
  {
    title: "Enter the Bangladesh Market",
    description:
      "Introduce your products to Bangladesh's building and construction industry and develop connections with local businesses and potential partners.",
    label: "Market Opportunities",
    icon: "market",
  },
  {
    title: "Generate Business Enquiries",
    description:
      "Discuss product requirements with potential customers and explore sales opportunities for building materials, machinery, and construction solutions.",
    label: "Business Enquiries",
    icon: "enquiries",
  },
  {
    title: "Meet Industry Professionals",
    description:
      "Connect with architects, engineers, builders, and consultants involved in residential, commercial, and infrastructure projects.",
    label: "Industry Networking",
    icon: "professionals",
  },
  {
    title: "Showcase Your Products",
    description:
      "Present your building materials, machinery, and construction technologies through product displays and demonstrations.",
    label: "Product Showcase",
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

type IconName =
  | "products"
  | "innovation"
  | "network"
  | "partners"
  | "building"
  | "arrow"
  | "calendar"
  | "location"
  | "check"
  | "external";

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
    innovation: (
      <>
        <path d="M9 18h6M10 22h4" />
        <path d="M8 14a7 7 0 1 1 8 0c-1 .8-1.5 1.5-1.5 4h-5C9.5 15.5 9 14.8 8 14Z" />
        <path d="M12 6v4m-2 0h4" />
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
    arrow: (
      <path d="M5 12h14m-6-6 6 6-6 6" />
    ),
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
    check: (
      <path d="m5 12 4 4L19 6" />
    ),
    external: (
      <path d="M7 17 17 7M8 7h9v9" />
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


function PercentageBar({
  percentage,
  reducedMotion,
  height = "h-1.5",
}: {
  percentage: number;
  reducedMotion: boolean;
  height?: string;
}) {
  return (
    <div
      className={`w-full overflow-hidden rounded-full bg-[#F3E6F0] ${height}`}
      role="meter"
      aria-valuenow={percentage}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <motion.div
        initial={
          reducedMotion
            ? false
            : { width: 0 }
        }
        whileInView={{
          width: `${percentage}%`,
        }}
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
        Why Exhibit?
      </Eyebrow>

      <h2
        id="exhibitor-benefits-heading"
        className="mt-4 max-w-[610px] font-heading text-[clamp(1.75rem,3vw,2.65rem)] font-extrabold leading-[1.15] tracking-[-0.045em] text-brand-dark"
      >
        Showcase Your Products.{" "}
        <span className="text-brand-primary">
          Connect with Potential Buyers.
        </span>
      </h2>

      <p className="mt-4 max-w-[560px] text-[13px] leading-[1.85] text-[#62606B] sm:text-[14px]">
        The 11th Bangladesh Buildcon International Expo 2027
        provides an opportunity for manufacturers and suppliers
        to showcase building materials, construction machinery,
        equipment, and modern building solutions while
        connecting with buyers and industry professionals.
      </p>

      {/* Industry Sector Tags */}
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

      {/* Exhibition CTA */}
      <Link
        href={event.cta.bookStand}
        className="group mt-6 inline-flex min-h-11 w-fit items-center justify-center gap-2.5 rounded-lg bg-brand-primary px-5 py-3 font-heading text-[12px] font-bold text-white shadow-[0_8px_20px_rgba(186,29,130,0.16)] transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-brand-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary motion-reduce:transform-none"
      >
        Enquire About Stand Space

        <span className="transition-transform duration-300 group-hover:translate-x-1">
          <ArrowIcon />
        </span>
      </Link>
    </div>

    {/* Architectural Illustration */}
    <div className="relative flex min-w-0 items-center justify-center overflow-hidden rounded-xl border border-[#F0E8EF] bg-[#FCF8FB] p-4 sm:p-6">
      <ArchitecturalIllustration
        reducedMotion={reducedMotion}
      />
    </div>
  </motion.div>

  {/* Benefits Introduction */}
  <motion.div
    {...scrollProps}
    variants={reveal}
    className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
  >
    <div>
      <Eyebrow>
        Exhibitor Benefits
      </Eyebrow>

      <h3 className="mt-2 font-heading text-[clamp(1.35rem,2.2vw,1.8rem)] font-extrabold tracking-[-0.035em] text-brand-dark">
        Opportunities to{" "}
        <span className="text-brand-primary">
          Grow Your Business
        </span>
      </h3>
    </div>
  </motion.div>

  {/* Exhibitor Benefits Grid */}
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
              highlight="Building & Construction Industry"
              description="Explore relevant manufacturers, suppliers, distributors and technology businesses across the building & construction sector."
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


        
<motion.section
  {...scrollProps}
  variants={reveal}
  aria-labelledby="visitor-profile-heading"
  className="mt-12 overflow-hidden rounded-2xl border border-[#E9E4EB] bg-white sm:mt-16"
>
  {/* Section Header */}
  <div className="border-b border-[#EDE7ED] p-5 sm:p-7">
    <Eyebrow>Previous Edition Visitor Profile</Eyebrow>

    <h2
      id="visitor-profile-heading"
      className="mt-3 font-heading text-[clamp(1.4rem,2.5vw,2rem)] font-extrabold leading-[1.2] tracking-[-0.04em] text-brand-dark"
    >
      Building & Construction{" "}
      <span className="text-brand-primary">
        Industry Visitors
      </span>
    </h2>

    <p className="mt-3 max-w-[730px] text-[13px] leading-[1.75] text-[#66616C]">
      An overview of the professionals and businesses
      represented at the previous edition, including
      engineers, architects, developers, government
      agencies, and trade distributors.
    </p>
  </div>

  {/* Visitor Profile Content */}
  <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-8">

    {/* Visitor Distribution */}
    <div className="min-w-0 space-y-5">
      {VISITOR_PROFILES.map((profile) => (
        <div key={profile.title}>
          <div className="mb-2.5 flex items-center justify-between gap-3">
            <h3 className="text-[12px] font-semibold leading-[1.5] text-brand-dark sm:text-[13px]">
              {profile.title}
            </h3>

            <span className="font-heading text-[15px] font-extrabold tabular-nums text-brand-primary">
              {profile.percentage}%
            </span>
          </div>

          <PercentageBar
            percentage={profile.percentage}
            reducedMotion={reducedMotion}
            height="h-2"
          />
        </div>
      ))}
    </div>

    {/* Industry Audience Information */}
    <div className="relative flex min-w-0 flex-col justify-center overflow-hidden rounded-xl bg-[#18151C] p-5 text-white sm:p-6">

      <span className="flex size-11 items-center justify-center rounded-lg border border-brand-primary/40 bg-brand-primary/20 text-[#EAA7D3]">
        <Icon name="network" className="size-6" />
      </span>

      <h3 className="mt-4 max-w-[390px] font-heading text-[18px] font-extrabold leading-[1.35] tracking-[-0.035em]">
        Connecting with{" "}
        <span className="text-[#EAA7D3]">
          Industry Professionals
        </span>
      </h3>

      <p className="mt-3 text-[13px] leading-[1.75] text-white/70">
        The exhibition brings together architects,
        engineers, contractors, developers, consultants,
        and trade professionals involved in building
        and construction projects.
      </p>

      {/* Data Note */}
      <div className="mt-5 border-t border-white/15 pt-4">
        <p className="text-[11px] leading-[1.7] text-white/55">
          Visitor profile percentages are based on
          previous edition data and may vary for 2027.
          Figures are rounded.
        </p>
      </div>

      {/* Architectural Illustration */}
      <svg
        viewBox="0 0 270 110"
        fill="none"
        aria-hidden="true"
        className="pointer-events-none mt-4 h-auto w-full max-w-[270px] opacity-65"
      >
        <path
          d="M10 100H260"
          stroke="#FFFFFF"
          strokeOpacity=".3"
        />

        <path
          d="M28 100V42h64v58M106 100V16h72v84M192 100V55h53v45"
          stroke="#BA1D82"
          strokeWidth="2"
        />

        <path
          d="M28 65h64M28 84h64M106 44h72M106 71h72M192 78h53"
          stroke="#FFFFFF"
          strokeOpacity=".35"
        />

        <motion.circle
          cx="142"
          cy="16"
          r="4"
          fill="#BA1D82"
          animate={
            reducedMotion
              ? undefined
              : { opacity: [0.4, 1, 0.4] }
          }
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>
    </div>
  </div>
</motion.section>

       


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
  {/* Architectural Background */}
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

  <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
    <div className="min-w-0 max-w-[720px]">
      <div className="flex items-center gap-2.5">
        <span className="h-[2px] w-7 shrink-0 bg-brand-primary" />

        <span className="font-heading text-[10px] font-bold uppercase tracking-[0.15em] text-[#EBA9D4]">
          Exhibitor Participation
        </span>
      </div>

      <h2
        id="exhibitor-cta-heading"
        className="mt-3 font-heading text-[clamp(1.4rem,2.4vw,2rem)] font-extrabold leading-[1.3] tracking-[-0.035em]"
      >
        Exhibit at the{" "}
        <span className="text-[#EBA9D4]">
          11th Bangladesh Buildcon International Expo 2027
        </span>
      </h2>

      <p className="mt-3 max-w-[620px] text-[13px] leading-[1.75] text-white/70">
        Showcase your products and connect with potential
        buyers and industry professionals. Contact our
        team for stand availability and participation details.
      </p>

      
    </div>

    {/* Stand Booking CTA */}
    <Link
      href={event.cta.bookStand}
      className="group inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-brand-primary px-5 py-3 font-heading text-[12px] font-bold text-white transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-brand-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary motion-reduce:transform-none sm:w-fit"
    >
      Enquire About Stand Space

      <span className="transition-transform duration-300 group-hover:translate-x-1">
        <ArrowIcon />
      </span>
    </Link>
  </div>

  
</motion.section>

      </Container>
    </div>
  );
}
