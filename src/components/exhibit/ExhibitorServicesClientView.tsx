
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
   MOTION CONFIGURATION
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
      staggerChildren: 0.085,
      delayChildren: 0.05,
    },
  },
};

/* ==========================================
   EXHIBITOR SERVICES
   Original operational descriptions retained.
========================================== */

const SERVICES = [
  {
    id: "visa",
    number: "01",
    tag: "Travel Guidance",
    title: "Visa Information & Entry Requirements",
    body:
      "International exhibitors and delegates should confirm visa and entry requirements for their nationality and purpose of travel before making arrangements. The Government of Bangladesh provides official visa application information and forms online.",
    status: "Guidance Available",
    state: "available",
    icon: "passport",
    link: {
      label: "Bangladesh Visa Portal",
      href: "https://visa.gov.bd/",
      external: true,
    },
  },
  {
    id: "invitation-letter",
    number: "02",
    tag: "Delegation Support",
    title: "Official Visa Invitation Letters",
    body:
      "Exhibitors who require a supporting invitation letter for their visa application can contact the organising secretariat. Eligibility, documentation and letter issuance are subject to organiser confirmation and applicable consular requirements.",
    status: "Enquiries Open",
    state: "enquiry",
    icon: "document",
    link: {
      label: "Enquire About Invitation Letters",
      href: "/contact",
      external: false,
    },
  },
  {
    id: "stand-construction",
    number: "03",
    tag: "Stand Planning",
    title: "Stand Construction & Space Options",
    body:
      "Explore shell scheme and raw space participation formats for product presentations, custom stand concepts and equipment displays. Package inclusions, construction requirements and technical approvals will be confirmed by the exhibition team.",
    status: "Options Available",
    state: "available",
    icon: "stand",
    link: {
      label: "Explore Stand Options",
      href: "/exhibit",
      external: false,
    },
  },
  {
    id: "freight-logistics",
    number: "04",
    tag: "Freight & Customs",
    title: "Customs Clearance & Freight Logistics",
    body:
      "Exhibitors planning to ship products, samples or equipment should confirm customs documentation, transport procedures and material-handling arrangements. Event-specific freight guidance will be communicated when operational details are finalised.",
    status: "Details Pending",
    state: "pending",
    icon: "freight",
    link: null,
  },
  {
    id: "hotels",
    number: "05",
    tag: "Accommodation",
    title: "Hotels & Travel Arrangements",
    body:
      "Exhibitors travelling to Dhaka should plan accommodation and transport according to their schedules. Any official hotel partnerships, special rates or transport arrangements will be announced once confirmed.",
    status: "Details Pending",
    state: "pending",
    icon: "hotel",
    link: null,
  },
  {
    id: "exhibitor-manual",
    number: "06",
    tag: "Event Operations",
    title: "Technical Exhibitor Manual",
    body:
      "The exhibitor manual is expected to cover setup and dismantling procedures, operating schedules, technical requirements and event rules. Confirmed participants should rely on the latest version issued by the organising team.",
    status: "Publication Pending",
    state: "pending",
    icon: "manual",
    link: null,
  },
  {
    id: "on-site-services",
    number: "07",
    tag: "Venue Facilities",
    title: "On-Site Hall Services & Utilities",
    body:
      "Exhibitors requiring electrical connections, internet access, material handling or other technical services should share their requirements in advance. Availability, specifications and applicable charges require venue and organiser confirmation.",
    status: "Confirmation Required",
    state: "confirmation",
    icon: "utilities",
    link: null,
  },
] as const;

/* ==========================================
   ICON SYSTEM
========================================== */

type ServiceIconName =
  (typeof SERVICES)[number]["icon"];

function ServiceIcon({
  name,
  className = "size-6",
}: {
  name: ServiceIconName;
  className?: string;
}) {
  const paths: Record<ServiceIconName, ReactNode> = {
    passport: (
      <>
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <circle cx="12" cy="11" r="4" />
        <path d="M8 11h8M12 7c-2 2-2 6 0 8M12 7c2 2 2 6 0 8M9 18h6" />
      </>
    ),
    document: (
      <>
        <path d="M6 2h9l5 5v15H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z" />
        <path d="M15 2v5h5M8 12h8M8 16h5" />
        <path d="m14 19 2 2 4-4" />
      </>
    ),
    stand: (
      <>
        <path d="M3 21V6h18v15M3 10h18M8 21V14h8v7" />
        <path d="M7 6V3h10v3M2 21h20" />
        <path d="M11 9h2" />
      </>
    ),
    freight: (
      <>
        <rect x="2" y="5" width="13" height="12" rx="1" />
        <path d="M15 9h4l3 4v4h-7M2 17h2m11 0h2" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="19" cy="18" r="2" />
        <path d="M5 9h7M5 12h5" />
      </>
    ),
    hotel: (
      <>
        <path d="M4 21V4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v17M2 21h20" />
        <path d="M8 7h2m4 0h2M8 11h2m4 0h2M8 15h2m4 0h2M10 21v-4h4v4" />
      </>
    ),
    manual: (
      <>
        <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v18H6.5A2.5 2.5 0 0 0 4 22V4.5Z" />
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M9 7h7M9 11h5" />
      </>
    ),
    utilities: (
      <>
        <path d="M13 2 5 13h6l-1 9 9-12h-6V2Z" />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
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

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4 shrink-0"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.09 5.18 2 2 0 0 1 5.08 3h3a2 2 0 0 1 2 1.72l.5 2.81a2 2 0 0 1-.57 1.73L8.1 11.17a16 16 0 0 0 4.73 4.73l1.91-1.91a2 2 0 0 1 1.73-.57l2.81.5A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function HelpIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M9.8 9a2.5 2.5 0 0 1 4.5 1.5c0 1.6-2.3 2.1-2.3 3.5M12 17h.01" />
    </svg>
  );
}

/* ==========================================
   ANIMATED OPERATIONS SVG

   Construction, transport and site planning.
   Solid brand colors. No gradients.
========================================== */

function OperationsIllustration({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  return (
    <svg
      viewBox="0 0 500 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-auto w-full max-w-[490px]"
      aria-hidden="true"
    >
      {/* Ground */}
      <path
        d="M22 286H480"
        stroke="#DCCED9"
        strokeWidth="1.5"
      />
      <path
        d="M22 300H480"
        stroke="#E9DFE8"
        strokeDasharray="5 8"
      />

      {/* Exhibition hall */}
      <motion.g
        initial={
          reducedMotion
            ? false
            : { opacity: 0, y: 12 }
        }
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.8,
          ease: EASE,
        }}
      >
        <path
          d="M88 286V125H344V286"
          stroke="#BA1D82"
          strokeWidth="2.4"
        />

        <path
          d="M88 125L216 65L344 125"
          stroke="#BA1D82"
          strokeWidth="2.4"
        />

        <path
          d="M103 286V137H329V286"
          stroke="#BA1D82"
          strokeOpacity="0.4"
        />

        <path
          d="M103 137L216 84L329 137"
          stroke="#BA1D82"
          strokeOpacity="0.4"
        />

        <path
          d="M88 168H344M88 226H344"
          stroke="#D5A9C9"
        />

        {/* Loading entrances */}
        {[126, 204, 282].map((x) => (
          <g key={x}>
            <rect
              x={x}
              y="188"
              width="53"
              height="98"
              stroke="#BA1D82"
              strokeOpacity="0.75"
            />
            <path
              d={`M${x + 8} 208h37M${x + 8} 229h37M${x + 8} 250h37`}
              stroke="#BA1D82"
              strokeOpacity="0.25"
            />
          </g>
        ))}
      </motion.g>

      {/* Crane */}
      <motion.path
        d="M383 286V42H475M383 42H305M322 42l61-31 61 31M457 42v100"
        stroke="#304090"
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

      {/* Moving crane hook */}
      <motion.g
        animate={
          reducedMotion
            ? undefined
            : { y: [0, 9, 0] }
        }
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <path
          d="M449 142h16v9h-16zM457 151v13c0 7 10 8 10 0"
          stroke="#304090"
          strokeWidth="2"
        />
      </motion.g>

      {/* Freight vehicle */}
      <motion.g
        animate={
          reducedMotion
            ? undefined
            : { x: [-8, 8, -8] }
        }
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <rect
          x="37"
          y="239"
          width="74"
          height="34"
          rx="2"
          fill="#F8EAF3"
          stroke="#BA1D82"
          strokeWidth="2"
        />
        <path
          d="M111 250h24l14 15v8h-38"
          stroke="#BA1D82"
          strokeWidth="2"
        />
        <circle
          cx="59"
          cy="275"
          r="9"
          fill="#FFFFFF"
          stroke="#BA1D82"
          strokeWidth="2"
        />
        <circle
          cx="125"
          cy="275"
          r="9"
          fill="#FFFFFF"
          stroke="#BA1D82"
          strokeWidth="2"
        />
        <path
          d="M50 250h46M50 258h31"
          stroke="#BA1D82"
          strokeOpacity="0.45"
        />
      </motion.g>

      {/* Rotating planning indicator */}
      <motion.g
        animate={
          reducedMotion
            ? undefined
            : { rotate: 360 }
        }
        style={{
          transformOrigin: "56px 91px",
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <circle
          cx="56"
          cy="91"
          r="29"
          stroke="#BA1D82"
          strokeOpacity="0.5"
          strokeDasharray="5 8"
        />

        <circle
          cx="56"
          cy="62"
          r="4"
          fill="#BA1D82"
        />
      </motion.g>

      {/* Site node pulse */}
      <motion.circle
        cx="216"
        cy="65"
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
          transformOrigin: "216px 65px",
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Dimension marks */}
      <path
        d="M66 125h13M66 286h13M72 125v161"
        stroke="#BA1D82"
        strokeOpacity="0.35"
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

/* ==========================================
   SERVICE CARD
========================================== */

function ServiceCard({
  service,
  reducedMotion,
}: {
  service: (typeof SERVICES)[number];
  reducedMotion: boolean;
}) {
  const hasLink = service.link !== null;

  return (
    <motion.article
      id={service.id}
      variants={reveal}
      whileHover={
        reducedMotion
          ? undefined
          : { y: -4 }
      }
      className="group relative flex h-full min-w-0 scroll-mt-24 flex-col overflow-hidden rounded-xl border border-[#E9E4EB] bg-white p-5 shadow-[0_4px_18px_rgba(5,7,9,0.025)] transition-[border-color,box-shadow] duration-300 hover:border-brand-primary/35 hover:shadow-[0_14px_32px_rgba(5,7,9,0.07)] sm:p-6"
    >
      {/* Animated top line */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-brand-primary transition-transform duration-300 group-hover:scale-x-100"
      />

      {/* Icon + number */}
      <div className="flex items-start justify-between gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-brand-primary/15 bg-[#F9ECF5] text-brand-primary transition-colors duration-300 group-hover:bg-brand-primary group-hover:text-white">
          <ServiceIcon name={service.icon} />
        </span>

        <span className="font-heading text-[11px] font-bold tabular-nums text-[#AAA4AE]">
          {service.number}
        </span>
      </div>

      {/* Category */}
      <span className="mt-4 inline-flex w-fit rounded-md border border-brand-primary/15 bg-[#FBF2F8] px-2.5 py-1 font-heading text-[10px] font-bold text-brand-primary">
        {service.tag}
      </span>

      {/* Title */}
      <h3 className="mt-3 font-heading text-[16px] font-extrabold leading-[1.4] tracking-[-0.025em] text-brand-dark">
        {service.title}
      </h3>

      {/* Content */}
      <p className="mt-3 flex-1 text-[12px] leading-[1.85] text-[#66616C] sm:text-[13px]">
        {service.body}
      </p>

      {/* Status and CTA */}
      <div className="mt-5 border-t border-[#F0EBF0] pt-4">
        <div className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className={
              hasLink
                ? "size-1.5 rounded-full bg-brand-primary"
                : "size-1.5 rounded-full bg-[#9B97A0]"
            }
          />

          <span
            className={
              hasLink
                ? "font-heading text-[10px] font-bold text-brand-primary"
                : "font-heading text-[10px] font-bold text-[#77717D]"
            }
          >
            {service.status}
          </span>
        </div>

        {service.link ? (
          service.link.external ? (
            <a
              href={service.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link mt-3 inline-flex min-h-8 items-center gap-2 font-heading text-[11px] font-bold text-brand-primary transition-colors hover:text-brand-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
            >
              {service.link.label}

              <span className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
                <ArrowIcon diagonal />
              </span>
            </a>
          ) : (
            <Link
              href={service.link.href}
              className="group/link mt-3 inline-flex min-h-8 items-center gap-2 font-heading text-[11px] font-bold text-brand-primary transition-colors hover:text-brand-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
            >
              {service.link.label}

              <span className="transition-transform duration-300 group-hover/link:translate-x-1">
                <ArrowIcon />
              </span>
            </Link>
          )
        ) : (
          <p className="mt-3 text-[11px] leading-[1.7] text-[#88828D]">
            Contact the organising team for
            the latest available information.
          </p>
        )}
      </div>
    </motion.article>
  );
}

/* ==========================================
   MAIN EXHIBITOR SERVICES PAGE
========================================== */

export function ExhibitorServicesClientView() {
  const reducedMotion = !!useReducedMotion();

  const scrollProps = {
    initial: reducedMotion ? false : "hidden",
    whileInView: "visible" as const,
    viewport: {
      once: true,
      amount: 0.08,
    },
  };

  const contactDesks = [
    {
      label: "Futurex Trade Fair & Events",
      phone: event.contact.futurex.phone,
    },
    {
      label: "ASK Trade & Exhibitions",
      phone: event.contact.askTrade.phone,
    },
  ];

  return (
    <div className="relative overflow-hidden bg-[#F8F8FA] py-12 text-brand-dark selection:bg-brand-primary selection:text-white sm:py-16">
      <Container>
        {/* ===================================
            01. OPERATIONS INTRODUCTION
        ==================================== */}

        <motion.header
          {...scrollProps}
          variants={reveal}
          className="grid items-center gap-6 overflow-hidden rounded-2xl border border-[#E9E4EB] bg-white p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:p-8"
        >
          {/* Intro text */}
          <div className="min-w-0">
            <Eyebrow>
              Exhibitor Operations & Guidance
            </Eyebrow>

            <h1 className="mt-4 max-w-[650px] font-heading text-[clamp(1.7rem,3vw,2.55rem)] font-extrabold leading-[1.15] tracking-[-0.045em] text-brand-dark">
              Everything You Need to{" "}
              <span className="text-brand-primary">
                Plan Your Participation.
              </span>
            </h1>

            <p className="mt-4 max-w-[590px] text-[13px] leading-[1.85] text-[#66616C] sm:text-[14px]">
              Explore visa guidance, stand planning,
              freight logistics, accommodation and
              other exhibitor operational topics
              for {event.name}.
            </p>

            {/* Service shortcuts */}
            <div className="mt-5 flex flex-wrap gap-2">
              {[
                { label: "Visa", href: "#visa" },
                {
                  label: "Stand Planning",
                  href: "#stand-construction",
                },
                {
                  label: "Freight",
                  href: "#freight-logistics",
                },
                {
                  label: "Technical Manual",
                  href: "#exhibitor-manual",
                },
              ].map((shortcut) => (
                <a
                  key={shortcut.href}
                  href={shortcut.href}
                  className="rounded-md border border-[#E9E3EA] bg-[#FBFAFC] px-3 py-1.5 font-heading text-[10px] font-semibold text-[#5E5662] transition-colors hover:border-brand-primary/30 hover:bg-[#F9EDF5] hover:text-brand-primary"
                >
                  {shortcut.label}
                </a>
              ))}
            </div>

            <Link
              href={event.cta.bookStand}
              className="group mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-brand-primary px-5 py-3 font-heading text-[11px] font-bold text-white transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-brand-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary motion-reduce:transform-none"
            >
              Enquire for Stand Space

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <ArrowIcon />
              </span>
            </Link>
          </div>

          {/* Animated illustration */}
          <div className="relative flex min-w-0 items-center justify-center overflow-hidden rounded-xl border border-[#F0E7EE] bg-[#FCF8FB] p-4 sm:p-6">
            <OperationsIllustration
              reducedMotion={reducedMotion}
            />

            <span className="absolute bottom-3 right-4 font-heading text-[9px] font-bold uppercase tracking-[0.11em] text-brand-primary/70">
              Exhibitor Operations
            </span>
          </div>
        </motion.header>

        {/* ===================================
            02. SUPPORT SERVICES
        ==================================== */}

        <section
          aria-labelledby="services-heading"
          className="mt-12 sm:mt-14"
        >
          <motion.div
            {...scrollProps}
            variants={reveal}
            className="flex flex-col gap-4 border-b border-[#E9E4EB] pb-6 sm:flex-row sm:items-end sm:justify-between"
          >
            <div className="max-w-[690px]">
              <Eyebrow>
                Planning Resources
              </Eyebrow>

              <h2
                id="services-heading"
                className="mt-3 font-heading text-[clamp(1.4rem,2.5vw,1.95rem)] font-extrabold leading-[1.2] tracking-[-0.04em] text-brand-dark"
              >
                Exhibitor Support{" "}
                <span className="text-brand-primary">
                  &amp; Services
                </span>
              </h2>
            </div>

            <p className="max-w-[370px] text-[12px] leading-[1.8] text-[#66616C] sm:text-[13px]">
              Review the available guidance
              and request confirmation of
              event-specific arrangements
              before making commitments.
            </p>
          </motion.div>

          {/* Animated service cards */}
          <motion.div
            variants={stagger}
            initial={reducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            className="mt-6 grid items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            {SERVICES.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                reducedMotion={reducedMotion}
              />
            ))}
          </motion.div>

          {/* Operational disclaimer */}
          <motion.p
            {...scrollProps}
            variants={reveal}
            className="mt-5 text-[11px] leading-[1.8] text-[#77717D]"
          >
            Operational guidance, service
            availability, package inclusions
            and technical arrangements may
            change. Refer to the latest
            information issued by the
            organising team.
          </motion.p>
        </section>

        {/* ===================================
            03. ORGANISER HELPDESK
        ==================================== */}

        <motion.section
          {...scrollProps}
          variants={reveal}
          aria-labelledby="operations-helpdesk-heading"
          className="mt-12 overflow-hidden rounded-2xl border border-[#E9E4EB] bg-white sm:mt-16"
        >
          <div className="grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            {/* Dark editorial panel */}
            <div className="relative overflow-hidden bg-[#18151C] p-6 text-white sm:p-8">
              <div className="flex items-center gap-2.5">
                <span className="h-[2px] w-7 bg-brand-primary" />

                <span className="font-heading text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#E6A1CE]">
                  Organiser Support
                </span>
              </div>

              <h2
                id="operations-helpdesk-heading"
                className="mt-4 max-w-[390px] font-heading text-[clamp(1.4rem,2.2vw,1.95rem)] font-extrabold leading-[1.25] tracking-[-0.035em]"
              >
                Need Assistance{" "}
                <span className="text-[#E6A1CE]">
                  With Exhibition Planning?
                </span>
              </h2>

              <p className="mt-4 max-w-[410px] text-[12px] leading-[1.85] text-white/65 sm:text-[13px]">
                Contact the joint organisers
                regarding stand requirements,
                equipment displays, event
                operations or exhibitor enquiries.
              </p>

              {/* Decorative technical SVG */}
              <svg
                viewBox="0 0 330 115"
                fill="none"
                aria-hidden="true"
                className="mt-6 h-auto w-full max-w-[330px] opacity-80"
              >
                <path
                  d="M12 103H318"
                  stroke="#FFFFFF"
                  strokeOpacity=".25"
                />

                <path
                  d="M25 103V38h76v65M116 103V16h93v87M225 103V52h74v51"
                  stroke="#BA1D82"
                  strokeWidth="2"
                />

                <path
                  d="M25 65h76M25 83h76M116 42h93M116 66h93M116 89h93M225 77h74"
                  stroke="#FFFFFF"
                  strokeOpacity=".3"
                />

                <path
                  d="M158 16V4h102M260 4v52"
                  stroke="#BA1D82"
                  strokeWidth="2"
                />

                <motion.circle
                  cx="260"
                  cy="56"
                  r="4"
                  fill="#BA1D82"
                  animate={
                    reducedMotion
                      ? undefined
                      : {
                          opacity: [0.4, 1, 0.4],
                        }
                  }
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </svg>
            </div>

            {/* Contact desk cards */}
            <div className="flex min-w-0 flex-col justify-center p-5 sm:p-7">
              <span className="font-heading text-[10px] font-bold uppercase tracking-[0.12em] text-brand-primary">
                Direct Organiser Contacts
              </span>

              <h3 className="mt-2 font-heading text-[18px] font-extrabold tracking-[-0.035em] text-brand-dark">
                Speak with Our Team
              </h3>

              <p className="mt-2 text-[12px] leading-[1.8] text-[#66616C]">
                For current exhibitor support
                information, contact either
                organising office.
              </p>

              <div className="mt-5 grid gap-3">
                {contactDesks.map((desk) => (
                  <a
                    key={desk.label}
                    href={`tel:${desk.phone.replace(
                      /[^0-9+]/g,
                      ""
                    )}`}
                    className="group flex min-w-0 items-center gap-3 rounded-xl border border-[#E9E4EB] bg-[#FCFAFC] p-4 transition-[border-color,background-color] duration-300 hover:border-brand-primary/35 hover:bg-[#FBF2F8]"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#F9ECF5] text-brand-primary">
                      <PhoneIcon />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block font-heading text-[11px] font-semibold leading-[1.5] text-[#716A75]">
                        {desk.label}
                      </span>

                      <span className="mt-1 block break-words font-heading text-[13px] font-extrabold tabular-nums text-brand-dark transition-colors group-hover:text-brand-primary">
                        {desk.phone}
                      </span>
                    </span>

                    <span className="shrink-0 text-brand-primary">
                      <ArrowIcon diagonal />
                    </span>
                  </a>
                ))}
              </div>

              <Link
                href="/contact"
                className="group mt-5 inline-flex min-h-9 w-fit items-center gap-2 font-heading text-[11px] font-bold text-brand-primary transition-colors hover:text-brand-primary-dark"
              >
                Contact the Organisers

                <span className="transition-transform group-hover:translate-x-1">
                  <ArrowIcon />
                </span>
              </Link>
            </div>
          </div>
        </motion.section>

        {/* ===================================
            04. FINAL CTA
        ==================================== */}

        <motion.section
          {...scrollProps}
          variants={reveal}
          aria-labelledby="services-cta-heading"
          className="mt-6 overflow-hidden rounded-2xl border border-brand-primary/20 bg-[#F8EDF5] p-5 sm:p-7"
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-start gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white text-brand-primary">
                <HelpIcon />
              </span>

              <div>
                <h2
                  id="services-cta-heading"
                  className="font-heading text-[17px] font-extrabold leading-[1.35] tracking-[-0.03em] text-brand-dark sm:text-[19px]"
                >
                  Planning to Exhibit in{" "}
                  <span className="text-brand-primary">
                    Dhaka?
                  </span>
                </h2>

                <p className="mt-2 max-w-[670px] text-[12px] leading-[1.8] text-[#66616C]">
                  {event.dates.display} ·{" "}
                  {event.venue.name},{" "}
                  {event.venue.city}. Submit your
                  stand enquiry to discuss
                  requirements and participation
                  arrangements.
                </p>
              </div>
            </div>

            <Link
              href={event.cta.bookStand}
              className="group inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-brand-primary px-5 py-3 font-heading text-[12px] font-bold text-white transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-brand-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary motion-reduce:transform-none sm:w-auto"
            >
              Book Exhibition Space

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
