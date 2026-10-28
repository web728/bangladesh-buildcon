
"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";

/* ==========================================
   MOTION CONFIG
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
      staggerChildren: 0.09,
      delayChildren: 0.06,
    },
  },
};

/* ==========================================
   BROCHURE VISITOR MOTIVATIONS

   Published percentages, not 2027 forecasts.
========================================== */

const VISIT_REASONS = [
  {
    title: "Discover New Products & Services",
    description:
      "Explore building & construction materials, machinery, equipment and building solutions relevant to your projects.",
    percentage: 39,
    icon: "products",
  },
  {
    title: "Explore Industry Innovations",
    description:
      "Learn about modern building & construction technologies, engineering products and new industry developments.",
    percentage: 28,
    icon: "innovation",
  },
  {
    title: "Build Professional Networks",
    description:
      "Connect with manufacturers, suppliers, contractors, consultants, builders and construction-industry professionals.",
    percentage: 20,
    icon: "network",
  },
  {
    title: "Identify Channel Partners",
    description:
      "Explore potential trade relationships with manufacturers, importers, distributors and dealers.",
    percentage: 12,
    icon: "partners",
  },
  {
    title: "Other Business Interests",
    description:
      "Discover additional technical, commercial and professional opportunities within the industry.",
    percentage: 1,
    icon: "building",
  },
] as const;






/* ==========================================
   BROCHURE VISITOR BUSINESS PROFILE
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


/* ==========================================
   EXHIBITOR PRODUCT AREAS
========================================== */

const PRODUCT_AREAS = [
  "Construction Machinery and Equipment",
  "Construction Materials",
  "Construction",
  "Country Housing Landscaping",
  "Electricity and Electrical Engineering in Construction",
  "Interior & Exterior",
  "Safety & Security",
] as const;

/* ==========================================
   BROCHURE EVENT FEATURES
========================================== */

const FEATURES = [
  "International exhibitors and country pavilions",
  "Live demonstrations and product launches",
  "B2B matchmaking opportunities",
  "Industry conferences and technical seminars",
] as const;

/* ==========================================
   SVG ICONS
========================================== */

type IconName =
  | "products"
  | "technology"
  | "innovation"
  | "network"
  | "partners"
  | "building"
  | "arrow"
  | "calendar"
  | "location"
  | "check"
  | "external"
  | "people";

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
     people: (
      <>
        <circle cx="12" cy="8" r="3" />
        <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
        <path d="M4 9a2 2 0 1 0 0 4m16-4a2 2 0 1 1 0 4" />
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

/* ==========================================
   ANIMATED CONSTRUCTION ILLUSTRATION

   Solid pink and blue.
   No gradients.
========================================== */


const VISITOR_MOTIVATIONS = [
  { title: "Discover New Products & Services", percentage: 39 },
  { title: "Explore Innovations", percentage: 28 },
  { title: "Professional Networking", percentage: 20 },
  { title: "Find Channel Partners", percentage: 12 },
  { title: "Other Reasons", percentage: 1 },
] as const;


const VISITOR_OPPORTUNITIES = [
  {
    title: "Explore Building & Construction Products",
    description:
      "Discover building materials, construction machinery, electrical systems, interior and exterior products, and safety solutions.",
    icon: "products",
  },
  {
    title: "Discover New Technologies",
    description:
      "Learn about modern construction equipment, building technologies, and solutions designed for different construction projects.",
    icon: "technology",
  },
  {
    title: "Meet Manufacturers & Suppliers",
    description:
      "Connect with participating manufacturers, suppliers, and distributors to explore products and discuss your requirements.",
    icon: "network",
  },
  {
    title: "Explore Business Partnerships",
    description:
      "Meet potential distribution partners, dealers, and suppliers to discuss new business and sourcing opportunities.",
    icon: "partners",
  },
  {
    title: "Experience Product Demonstrations",
    description:
      "See construction products and equipment in action through planned demonstrations and learn about their applications.",
    icon: "building",
  },
  {
    title: "Connect with Industry Professionals",
    description:
      "Meet architects, engineers, contractors, developers, and other professionals working across the building and construction industry.",
    icon: "people",
  },
] as const;


const VISITOR_FAQS = [
  {
    question: "Who can visit the exhibition?",
    answer:
      "The 11th Bangladesh Buildcon International Expo 2027 welcomes trade professionals and the general public interested in building materials, construction machinery, equipment, and related technologies.",
  },
  {
    question: "What can I expect at the exhibition?",
    answer:
      "Visitors can explore building materials, construction machinery, equipment, electrical systems, interior and exterior products, and modern construction solutions from participating exhibitors.",
  },
  {
    question: "When and where will the exhibition take place?",
    answer:
      "The 11th Bangladesh Buildcon International Expo 2027 will take place from 11–13 November 2027 at ICCB Expo Village, Dhaka, Bangladesh.",
  },
  {
    question: "What are the exhibition opening hours?",
    answer:
      "The exhibition will be open from 10:00 AM to 6:00 PM on all three days, 11–13 November 2027.",
  },
  {
    question: "Is entry to the exhibition free?",
    answer:
      "Yes, entry to the exhibition is free for all visitors.",
  },
  {
    question: "How can I register to visit?",
    answer:
      "You can register through the official exhibition website using the Register to Visit option. Onsite registration will also be available at the venue.",
  },
  {
    question: "Can I register directly at the venue?",
    answer:
      "Yes, onsite registration will be available at ICCB Expo Village during exhibition hours.",
  },
  {
    question: "Is the exhibition open to the general public?",
    answer:
      "Yes, the exhibition is open to both trade visitors and the general public interested in the building and construction industry.",
  },
  {
    question: "Can I meet manufacturers and suppliers?",
    answer:
      "Yes, visitors can meet participating manufacturers, suppliers, exporters, and distributors to explore products, discuss requirements, and make business connections.",
  },
  {
    question: "Will international exhibitors participate?",
    answer:
      "The exhibition welcomes companies from Bangladesh and international markets. Details of confirmed exhibitors will be available closer to the event.",
  },
  {
    question: "Will there be product demonstrations?",
    answer:
      "The exhibition is planned to feature product displays and demonstrations, giving visitors an opportunity to learn about construction materials, machinery, equipment, and technologies.",
  },
  {
    question: "How can I reach the exhibition venue?",
    answer:
      "The exhibition will be held at ICCB Expo Village, Dhaka, Bangladesh. Visitors can find the venue location and Google Maps directions on the Exhibition Venue page.",
  },
] as const;

function VisitorFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      aria-labelledby="visitor-faq-heading"
      className="mt-12 sm:mt-16"
    >
      {/* FAQ Heading */}
      <div className="mb-6 border-b border-[#E5E7ED] pb-5">
        <Eyebrow>Visitor Information</Eyebrow>

        <h2
          id="visitor-faq-heading"
          className="mt-3 font-heading text-[clamp(1.5rem,2.7vw,2.2rem)] font-extrabold leading-[1.2] tracking-[-0.04em] text-brand-dark"
        >
          Frequently Asked{" "}
          <span className="text-brand-primary">
            Questions
          </span>
        </h2>

        <p className="mt-3 max-w-[620px] text-[13px] leading-[1.75] text-[#62606B] sm:text-[14px]">
          Find answers to common questions about visiting,
          registration, exhibition timings, and event details.
        </p>
      </div>

      {/* FAQ Accordion */}
      <div className="overflow-hidden rounded-2xl border border-[#E7E3E9] bg-white">
        {VISITOR_FAQS.map((faq, index) => {
          const isOpen = openIndex === index;
          const answerId = `visitor-faq-answer-${index}`;
          const questionId = `visitor-faq-question-${index}`;

          return (
            <div
              key={faq.question}
              className={
                index !== VISITOR_FAQS.length - 1
                  ? "border-b border-[#EBE7ED]"
                  : ""
              }
            >
              <h3>
                <button
                  type="button"
                  id={questionId}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                  className="group flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors duration-200 hover:bg-[#FCF9FC] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-primary sm:px-6"
                >
                  <span className="flex min-w-0 items-start gap-3">
                    <span className="mt-0.5 shrink-0 font-heading text-[11px] font-bold tabular-nums text-brand-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span
                      className={`font-heading text-[13px] font-bold leading-[1.6] transition-colors sm:text-[14px] ${
                        isOpen
                          ? "text-brand-primary"
                          : "text-brand-dark group-hover:text-brand-primary"
                      }`}
                    >
                      {faq.question}
                    </span>
                  </span>

                  <span
                    aria-hidden="true"
                    className={`flex size-8 shrink-0 items-center justify-center rounded-lg border transition-all duration-200 ${
                      isOpen
                        ? "border-brand-primary bg-brand-primary text-white"
                        : "border-[#E6E1E8] bg-[#FAF8FB] text-[#60606B]"
                    }`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      className="size-4"
                    >
                      <path d="M5 12h14" />
                      {!isOpen && <path d="M12 5v14" />}
                    </svg>
                  </span>
                </button>
              </h3>

              <div
                id={answerId}
                role="region"
                aria-labelledby={questionId}
                hidden={!isOpen}
              >
                <div className="px-5 pb-5 pl-12 sm:px-6 sm:pl-[54px]">
                  <p className="max-w-[850px] text-[13px] leading-[1.85] text-[#62606B] sm:text-[14px]">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}



function VisitIllustration({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  return (
    <svg
      viewBox="0 0 500 325"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-auto w-full max-w-[500px]"
      aria-hidden="true"
    >
      {/* Ground */}
      <path
        d="M22 285H477"
        stroke="#DCCBD9"
        strokeWidth="1.5"
      />

      <path
        d="M30 301H470"
        stroke="#EEE3ED"
        strokeDasharray="5 8"
      />

      {/* Main building */}
      <motion.g
        initial={
          reducedMotion
            ? false
            : {
                opacity: 0,
                y: 12,
              }
        }
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{ once: true }}
        transition={{
          duration: 0.85,
          ease: EASE,
        }}
      >
        <path
          d="M92 285V103H278V285"
          stroke="#BA1D82"
          strokeWidth="2.5"
        />

        <path
          d="M92 103L185 50L278 103"
          stroke="#BA1D82"
          strokeWidth="2.5"
        />

        <path
          d="M107 285V117H263V285"
          stroke="#BA1D82"
          strokeOpacity="0.4"
        />

        <path
          d="M107 117L185 72L263 117"
          stroke="#BA1D82"
          strokeOpacity="0.4"
        />

        <path
          d="M92 151H278M92 197H278M92 244H278"
          stroke="#D9A8C9"
        />

        {[122, 174, 226].map((x) =>
          [131, 177, 224].map((y) => (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width="20"
              height="19"
              stroke="#BA1D82"
              strokeOpacity=".65"
            />
          ))
        )}
      </motion.g>

      {/* Secondary building */}
      <motion.g
        initial={
          reducedMotion
            ? false
            : {
                opacity: 0,
                x: 14,
              }
        }
        whileInView={{
          opacity: 1,
          x: 0,
        }}
        viewport={{ once: true }}
        transition={{
          duration: 0.85,
          delay: reducedMotion ? 0 : 0.2,
          ease: EASE,
        }}
      >
        <path
          d="M290 285V154H412V285"
          stroke="#304090"
          strokeWidth="2"
        />

        <path
          d="M290 154L351 128L412 154"
          stroke="#304090"
          strokeWidth="2"
        />

        <path
          d="M303 183H398M303 220H398M303 257H398"
          stroke="#304090"
          strokeOpacity=".35"
        />

        <path
          d="M333 285v-42h36v42"
          stroke="#304090"
          strokeOpacity=".7"
        />
      </motion.g>

      {/* Crane */}
      <motion.path
        d="M386 285V40H479M386 40H315M330 40l56-27 55 27M459 40v113"
        stroke="#BA1D82"
        strokeWidth="2"
        strokeLinecap="round"
        initial={
          reducedMotion
            ? false
            : { pathLength: 0 }
        }
        whileInView={{
          pathLength: 1,
        }}
        viewport={{ once: true }}
        transition={{
          duration: reducedMotion ? 0 : 2,
          ease: EASE,
        }}
      />

      {/* Moving hook */}
      <motion.g
        animate={
          reducedMotion
            ? undefined
            : { y: [0, 8, 0] }
        }
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <path
          d="M451 153h16v9h-16zM459 162v12c0 8 10 9 10 0"
          stroke="#BA1D82"
          strokeWidth="2"
        />
      </motion.g>

      {/* Technical orbit */}
      <motion.g
        animate={
          reducedMotion
            ? undefined
            : { rotate: 360 }
        }
        style={{
          transformOrigin: "62px 84px",
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <circle
          cx="62"
          cy="84"
          r="31"
          stroke="#BA1D82"
          strokeOpacity=".5"
          strokeDasharray="5 9"
        />

        <circle
          cx="62"
          cy="53"
          r="4"
          fill="#BA1D82"
        />
      </motion.g>

      {/* Animated top node */}
      <motion.circle
        cx="185"
        cy="50"
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
          transformOrigin: "185px 50px",
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Dimension guides */}
      <path
        d="M68 103H82M68 285H82M74 103v182"
        stroke="#BA1D82"
        strokeOpacity=".4"
        strokeDasharray="4 6"
      />
    </svg>
  );
}

/* ==========================================
   COMMON ELEMENTS
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
          className="mt-3 font-heading text-[clamp(1.45rem,2.5vw,2rem)] font-extrabold leading-[1.2] tracking-[-0.04em] text-brand-dark"
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
   ANIMATED PERCENTAGE BAR
========================================== */

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
   VISITOR REASON CARD
========================================== */

function ReasonCard({
  reason,
  index,
  reducedMotion,
}: {
  reason: (typeof VISIT_REASONS)[number];
  index: number;
  reducedMotion: boolean;
}) {
  return (
    <motion.article
      variants={reveal}
      whileHover={
        reducedMotion
          ? undefined
          : { y: -4 }
      }
      className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-[#E9E4EB] bg-white p-5 shadow-[0_4px_18px_rgba(5,7,9,0.025)] transition-[border-color,box-shadow] duration-300 hover:border-brand-primary/35 hover:shadow-[0_14px_30px_rgba(5,7,9,0.07)]"
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-brand-primary transition-transform duration-300 group-hover:scale-x-100"
      />

      {/* Icon and index */}
      <div className="flex items-start justify-between gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-brand-primary/15 bg-[#F9ECF5] text-brand-primary transition-colors duration-300 group-hover:bg-brand-primary group-hover:text-white">
          <Icon
            name={reason.icon}
            className="size-[22px]"
          />
        </span>

      
      </div>

      <h3 className="mt-5 font-heading text-[15px] font-extrabold leading-[1.4] tracking-[-0.025em] text-brand-dark">
        {reason.title}
      </h3>

      <p className="mt-3 flex-1 text-[12px] leading-[1.8] text-[#66616C] sm:text-[13px]">
        {reason.description}
      </p>

      {/* Brochure percentage */}
      <div className="mt-5 border-t border-[#F0EBF0] pt-4">
        <div className="mb-3 flex items-end justify-between gap-3">
          <span className="text-[10px] font-semibold text-[#807985]">
            Brochure Visitor Reason
          </span>

          <span className="font-heading text-[23px] font-extrabold tabular-nums tracking-[-0.045em] text-brand-primary">
            {reason.percentage}%
          </span>
        </div>

        <PercentageBar
          percentage={reason.percentage}
          reducedMotion={reducedMotion}
        />
      </div>
    </motion.article>
  );
}

/* ==========================================
   MAIN VISIT PAGE
========================================== */

export function VisitClientView() {
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
            01. PREMIUM VISITOR INTRO
        ==================================== */}

   
<section aria-labelledby="why-visit-heading">
  <motion.div
    {...scrollProps}
    variants={reveal}
    className="grid items-center gap-6 overflow-hidden rounded-2xl border border-[#E9E4EB] bg-white p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:p-8"
  >
    <div className="min-w-0">
      <Eyebrow>
        Visitor Experience
      </Eyebrow>

      <h2
        id="why-visit-heading"
        className="mt-4 max-w-[650px] font-heading text-[clamp(1.75rem,3vw,2.65rem)] font-extrabold leading-[1.15] tracking-[-0.045em] text-brand-dark"
      >
        Explore Products & Technologies{" "}
        <span className="text-brand-primary">
          for Building &amp; Construction
        </span>
      </h2>

      <p className="mt-4 max-w-[610px] text-[13px] leading-[1.85] text-[#66616C] sm:text-[14px]">
        The 11th Bangladesh Buildcon International Expo 2027
        brings together manufacturers and suppliers showcasing
        building materials, construction machinery, equipment,
        and modern building solutions. Discover new products,
        meet suppliers, and connect with industry professionals.
      </p>

      {/* Visitor Highlights */}
      <div className="mt-5 flex flex-wrap gap-2">
        {[
          "Discover New Products",
          "Explore Technologies",
          "Meet Suppliers",
          "Industry Networking",
        ].map((tag) => (
          <span
            key={tag}
            className="rounded-md border border-[#EAE4EC] bg-[#FBFAFC] px-3 py-1.5 font-heading text-[10px] font-semibold text-[#625B67]"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Visitor Actions */}
      <div className="mt-6 flex flex-wrap gap-2.5">
        <Link
          href={event.cta.registerVisit}
          className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-brand-primary px-5 py-3 font-heading text-[12px] font-bold text-white transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-brand-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary motion-reduce:transform-none"
        >
          Register to Visit

          <span className="transition-transform duration-300 group-hover:translate-x-1">
            <Icon name="arrow" className="size-4" />
          </span>
        </Link>

        <Link
          href="/exhibition-profile"
          className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#E6DFE8] bg-white px-5 py-3 font-heading text-[12px] font-bold text-brand-dark transition-colors hover:border-brand-primary/35 hover:text-brand-primary"
        >
          Explore Exhibition Profile

          <Icon
            name="external"
            className="size-4"
          />
        </Link>
      </div>
    </div>

    {/* Construction Illustration */}
    <div className="relative flex min-w-0 items-center justify-center overflow-hidden rounded-xl border border-[#F0E7EE] bg-[#FCF8FB] p-4 sm:p-6">
      <VisitIllustration reducedMotion={reducedMotion} />
    </div>
  </motion.div>
</section>


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
            03. EXHIBITION PRODUCT AREAS
        ==================================== */}

        <section
          aria-labelledby="visit-products-heading"
          className="mt-12 sm:mt-16"
        >
          <motion.div
            {...scrollProps}
            variants={reveal}
          >
            <SectionHeading
              id="visit-products-heading"
              eyebrow="Official Exhibitor Profile"
              title="Explore the"
              highlight="Exhibition Categories"
              description="Seven construction-industry product and technology areas listed in the official Bangladesh Buildcon brochure."
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
            {PRODUCT_AREAS.map((area, index) => (
              <motion.div
                key={area}
                variants={reveal}
                whileHover={
                  reducedMotion
                    ? undefined
                    : { y: -3 }
                }
                className="group flex min-h-[80px] min-w-0 items-center gap-3 rounded-xl border border-[#E9E4EB] bg-white p-4 transition-[border-color,background-color,box-shadow] duration-300 hover:border-brand-primary/35 hover:bg-[#FFFCFE] hover:shadow-[0_10px_25px_rgba(5,7,9,0.045)]"
              >
               

                <h3 className="min-w-0 font-heading text-[12px] font-bold leading-[1.55] text-brand-dark sm:text-[13px]">
                  {area}
                </h3>
              </motion.div>
            ))}
          </motion.div>

          <Link
            href="/exhibition-profile"
            className="group mt-5 inline-flex min-h-10 items-center gap-2 font-heading text-[11px] font-bold text-brand-primary transition-colors hover:text-brand-primary-dark"
          >
            View Complete Exhibition Profile

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              <Icon name="arrow" className="size-4" />
            </span>
          </Link>
        </section>

        {/* ===================================
            04. EVENT FEATURES
        ==================================== */}

        <motion.section
          {...scrollProps}
          variants={reveal}
          aria-labelledby="visit-features-heading"
          className="mt-12 overflow-hidden rounded-2xl border border-[#E9E4EB] bg-white sm:mt-16"
        >
          <div className="grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            {/* Dark editorial panel */}
            <div className="relative overflow-hidden bg-[#18151C] p-6 text-white sm:p-8">
              <div className="flex items-center gap-2.5">
                <span className="h-[2px] w-7 bg-brand-primary" />

                <span className="font-heading text-[10px] font-bold uppercase tracking-[0.15em] text-[#EAA7D3]">
                  Exhibition Experience
                </span>
              </div>

              <h2
                id="visit-features-heading"
                className="mt-4 max-w-[400px] font-heading text-[clamp(1.4rem,2.2vw,1.95rem)] font-extrabold leading-[1.25] tracking-[-0.035em]"
              >
                More Than{" "}
                <span className="text-[#EAA7D3]">
                  Product Discovery.
                </span>
              </h2>

              <p className="mt-4 max-w-[420px] text-[12px] leading-[1.85] text-white/65 sm:text-[13px]">
                Discover the broader exhibition
                experience through product launches,
                international exhibitors, business
                networking and industry knowledge
                exchange.
              </p>

              {/* Architectural detail */}
              <svg
                viewBox="0 0 300 125"
                fill="none"
                aria-hidden="true"
                className="mt-6 h-auto w-full max-w-[300px] opacity-75"
              >
                <path
                  d="M10 113H290"
                  stroke="#FFFFFF"
                  strokeOpacity=".3"
                />

                <path
                  d="M20 113V44h72v69M105 113V20h89v93M208 113V58h72v55"
                  stroke="#BA1D82"
                  strokeWidth="2"
                />

                <path
                  d="M20 69h72M20 90h72M105 46h89M105 76h89M208 83h72"
                  stroke="#FFFFFF"
                  strokeOpacity=".35"
                />
              </svg>
            </div>

            {/* Animated feature cards */}
            <motion.div
              variants={stagger}
              initial={reducedMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.12,
              }}
              className="grid gap-3 p-5 sm:grid-cols-2 sm:p-7"
            >
              {FEATURES.map((feature, index) => (
                <motion.div
                  key={feature}
                  variants={reveal}
                  whileHover={
                    reducedMotion
                      ? undefined
                      : { x: 3 }
                  }
                  className="group flex min-h-[115px] flex-col justify-between gap-3 rounded-xl border border-[#ECE5EC] bg-[#FCFAFC] p-4 transition-[border-color,background-color] duration-300 hover:border-brand-primary/30 hover:bg-[#FBF2F8]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex size-9 items-center justify-center rounded-lg bg-[#F9ECF5] text-brand-primary">
                      <Icon name="check" className="size-4" />
                    </span>

                  
                  </div>

                  <p className="font-heading text-[12px] font-bold leading-[1.65] text-brand-dark sm:text-[13px]">
                    {feature}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

<VisitorFAQSection />


        {/* ===================================
            05. VISITOR CTA
        ==================================== */}

        <motion.section
          {...scrollProps}
          variants={reveal}
          aria-labelledby="visit-cta-heading"
          className="mt-6 overflow-hidden rounded-2xl border border-brand-primary/20 bg-[#F8EDF5] p-5 sm:p-7"
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <Eyebrow>
                Visitor Registration
              </Eyebrow>

              <h2
                id="visit-cta-heading"
                className="mt-3 font-heading text-[17px] font-extrabold leading-[1.4] tracking-[-0.025em] text-brand-dark sm:text-[19px]"
              >
                Planning to Visit{" "}
                <span className="text-brand-primary">
                  Bangladesh Buildcon 2027?
                </span>
              </h2>

              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[12px] font-medium text-[#625B66]">
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
                Review the visitor registration
                information and submit your details
                using the official registration form.
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
