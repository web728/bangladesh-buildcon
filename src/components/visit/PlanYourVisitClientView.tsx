
"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import {
  AnimatePresence,
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
      staggerChildren: 0.085,
      delayChildren: 0.04,
    },
  },
};

/* ==========================================
   EVENT INFORMATION
========================================== */

const EVENT_DETAILS = [
  {
    label: "Event",
    value: "11th Bangladesh Buildcon",
    description: "International Expo 2027",
    icon: "event",
  },
  {
    label: "Exhibition Dates",
    value: event.dates.display,
    description: "Three exhibition days",
    icon: "calendar",
  },
  {
    label: "Official Venue",
    value: event.venue.name,
    description: `${event.venue.city}, Bangladesh`,
    icon: "building",
  },
  {
    label: "Visitor Information",
    value: "Visitor Registration",
    description: "Review the registration process",
    icon: "ticket",
  },
] as const;

/* ==========================================
   VISITOR FAQS

   Unconfirmed admission fees, opening hours
   and visitor arrangements are not invented.
========================================== */

const FAQS = [
  {
    question: "When and where is Bangladesh Buildcon 2027?",
    answer:
      "The 11th Bangladesh Buildcon International Expo 2027 is scheduled for 17–19 November 2027 at ICCB Exhibition Hall, Dhaka, Bangladesh.",
    tag: "Event Details",
  },
  {
    question: "Who is the exhibition intended for?",
    answer:
      "The official brochure identifies architects, civil engineers, consultants, builders, real estate developers, contractors, importers, distributors, construction machinery dealers, interior designers and government-related organisations among the visitor profiles.",
    tag: "Visitor Profile",
  },
  {
    question: "How can I register as a visitor?",
    answer:
      "Use the official visitor registration link to review the current process. Admission requirements, badge arrangements and any applicable charges should be confirmed through the official registration information.",
    tag: "Registration",
  },
  {
    question: "What are the daily exhibition opening hours?",
    answer:
      "Daily opening and closing times are not specified in the referenced brochure. Please confirm the latest visitor entry hours with the organising team before travelling.",
    tag: "Opening Hours",
  },
  {
    question: "Where can I find venue directions?",
    answer:
      "Use the venue map and directions link on this page to locate the exhibition venue in Dhaka. Check your route and current traffic conditions before departure.",
    tag: "Directions",
  },
  {
    question: "What should international visitors check?",
    answer:
      "International visitors should verify applicable passport, visa and entry requirements through official government or consular sources. Requirements can vary by nationality and purpose of visit.",
    tag: "International Visitors",
  },
] as const;

/* ==========================================
   SVG ICON SYSTEM
========================================== */

type IconName =
  | "event"
  | "calendar"
  | "building"
  | "ticket"
  | "pin"
  | "arrow"
  | "phone"
  | "mail"
  | "help"
  | "chevron"
  | "external";

function Icon({
  name,
  className = "size-5",
}: {
  name: IconName;
  className?: string;
}) {
  const paths: Record<IconName, ReactNode> = {
    event: (
      <>
        <path d="M3 21h18M5 21V8l7-5 7 5v13" />
        <path d="M9 21v-7h6v7M9 10h1m5 0h1" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M7 3v4M17 3v4M3 10h18" />
        <path d="m9 15 2 2 4-4" />
      </>
    ),
    building: (
      <>
        <path d="M3 21h18M5 21V5h10v16M15 10h5v11" />
        <path d="M8 9h4M8 13h4M8 17h4" />
      </>
    ),
    ticket: (
      <>
        <path d="M3 8a2 2 0 0 0 2-2h14a2 2 0 0 0 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 0-2 2H5a2 2 0 0 0-2-2v-3a2 2 0 0 0 0-4Z" />
        <path d="M12 6v2m0 3v2m0 3v2" />
      </>
    ),
    pin: (
      <>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    arrow: (
      <path d="M5 12h14m-6-6 6 6-6 6" />
    ),
    phone: (
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 3.1 5.2 2 2 0 0 1 5.1 3h3a2 2 0 0 1 2 1.7l.5 2.8a2 2 0 0 1-.6 1.7L8.1 11a16 16 0 0 0 4.8 4.8l1.9-1.9a2 2 0 0 1 1.7-.6l2.8.5a2 2 0 0 1 1.7 2Z" />
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    help: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9.5 9a2.5 2.5 0 0 1 5 1c0 1.7-2.5 2.1-2.5 4M12 17h.01" />
      </>
    ),
    chevron: (
      <path d="m6 9 6 6 6-6" />
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
   ANIMATED VENUE ILLUSTRATION

   Stylised exhibition-hall drawing,
   not an architectural site plan.
========================================== */

function VenueIllustration({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  return (
    <svg
      viewBox="0 0 500 310"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-auto w-full max-w-[500px]"
      aria-hidden="true"
    >
      {/* Ground lines */}
      <path
        d="M20 269H480"
        stroke="#D7C5D2"
        strokeWidth="1.5"
      />
      <path
        d="M35 284H465"
        stroke="#E7DDE5"
        strokeDasharray="5 8"
      />

      {/* Exhibition architecture */}
      <motion.g
        initial={
          reducedMotion
            ? false
            : { opacity: 0, y: 12 }
        }
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.85,
          ease: EASE,
        }}
      >
        <path
          d="M63 269V118L250 48L437 118V269"
          stroke="#BA1D82"
          strokeWidth="2.4"
        />

        <path
          d="M80 269V131L250 68L420 131V269"
          stroke="#BA1D82"
          strokeOpacity=".4"
        />

        <path
          d="M63 118H437"
          stroke="#BA1D82"
          strokeWidth="1.5"
        />

        <path
          d="M63 158H437M63 209H437"
          stroke="#D5A6C7"
        />

        {/* Hall divisions */}
        {[100, 175, 250, 325, 400].map((x) => (
          <path
            key={x}
            d={`M${x} 158V269`}
            stroke="#BA1D82"
            strokeOpacity=".34"
          />
        ))}

        {/* Main entrance */}
        <rect
          x="203"
          y="183"
          width="94"
          height="86"
          stroke="#304090"
          strokeWidth="2.2"
        />

        <path
          d="M250 183v86M212 199h76"
          stroke="#304090"
          strokeOpacity=".65"
        />

        {/* Entrance canopy */}
        <path
          d="M188 183h124l-12-16h-100l-12 16Z"
          fill="#F9EAF4"
          stroke="#BA1D82"
          strokeWidth="1.6"
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
          transformOrigin: "69px 64px",
        }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <circle
          cx="69"
          cy="64"
          r="31"
          stroke="#BA1D82"
          strokeOpacity=".5"
          strokeDasharray="5 9"
        />

        <circle
          cx="69"
          cy="33"
          r="4.5"
          fill="#BA1D82"
        />
      </motion.g>

      {/* Pulsing roof point */}
      <motion.circle
        cx="250"
        cy="48"
        r="5"
        fill="#BA1D82"
        animate={
          reducedMotion
            ? undefined
            : {
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.25, 1],
              }
        }
        style={{
          transformOrigin: "250px 48px",
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Moving location marker */}
      <motion.g
        animate={
          reducedMotion
            ? undefined
            : { y: [0, -7, 0] }
        }
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <path
          d="M398 41c0 18-17 36-17 36s-17-18-17-36a17 17 0 1 1 34 0Z"
          stroke="#BA1D82"
          strokeWidth="2"
          fill="#F9EAF4"
        />

        <circle
          cx="381"
          cy="41"
          r="5"
          fill="#BA1D82"
        />
      </motion.g>

      {/* Dimension marks */}
      <path
        d="M41 118h12M41 269h12M47 118v151"
        stroke="#BA1D82"
        strokeOpacity=".4"
        strokeDasharray="4 6"
      />
    </svg>
  );
}

/* ==========================================
   SHARED HEADING
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
   ANIMATED FAQ ACCORDION
========================================== */

function VisitorFaqs({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  const [openIndex, setOpenIndex] =
    useState<number | null>(0);

  return (
    <motion.div
      variants={stagger}
      initial={reducedMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
      className="mt-6 grid items-start gap-3 md:grid-cols-2"
    >
      {FAQS.map((faq, index) => {
        const expanded = openIndex === index;

        return (
          <motion.div
            key={faq.question}
            variants={reveal}
            className="overflow-hidden rounded-xl border border-[#E9E4EB] bg-white transition-[border-color,box-shadow] duration-300 hover:border-brand-primary/30"
          >
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls={`visitor-faq-${index}`}
              onClick={() => {
                setOpenIndex(
                  expanded ? null : index
                );
              }}
              className="flex w-full items-start justify-between gap-4 px-4 py-4 text-left focus-visible:outline-2 focus-visible:outline-brand-primary sm:px-5"
            >
              <span className="min-w-0">
                <span className="block font-heading text-[10px] font-bold uppercase tracking-[0.08em] text-brand-primary">
                  {faq.tag}
                </span>

                <span className="mt-2 block font-heading text-[13px] font-bold leading-[1.55] text-brand-dark sm:text-[14px]">
                  {faq.question}
                </span>
              </span>

              <span
                className={`flex size-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                  expanded
                    ? "bg-brand-primary text-white"
                    : "bg-[#F9EDF5] text-brand-primary"
                }`}
              >
                <motion.span
                  animate={{
                    rotate: expanded ? 180 : 0,
                  }}
                  transition={{
                    duration: reducedMotion
                      ? 0
                      : 0.25,
                  }}
                >
                  <Icon
                    name="chevron"
                    className="size-4"
                  />
                </motion.span>
              </span>
            </button>

            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  id={`visitor-faq-${index}`}
                  initial={
                    reducedMotion
                      ? false
                      : { height: 0, opacity: 0 }
                  }
                  animate={{
                    height: "auto",
                    opacity: 1,
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                  }}
                  transition={{
                    duration: reducedMotion
                      ? 0
                      : 0.3,
                    ease: EASE,
                  }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-[#F0EBF0] px-4 pb-5 pt-3 sm:px-5">
                    <p className="text-[12px] leading-[1.85] text-[#66616C] sm:text-[13px]">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

/* ==========================================
   MAIN VISITOR PAGE
========================================== */

export function PlanYourVisitClientView() {
  const reducedMotion = !!useReducedMotion();

  const scrollProps = {
    initial: reducedMotion ? false : "hidden",
    whileInView: "visible" as const,
    viewport: {
      once: true,
      amount: 0.08,
    },
  };


const organiserContacts = event.contact.people.map((person) => ({
  id: person.id,
  label: person.name,
  phone: person.phone,
  phoneHref: person.phoneHref,
  email: person.email,
}));


  return (
    <div className="relative overflow-hidden bg-[#F8F8FA] py-12 text-brand-dark selection:bg-brand-primary selection:text-white sm:py-16">
      <Container>
        {/* ===================================
            01. VISITOR INTRO
        ==================================== */}

        <section aria-labelledby="visit-details-heading">
          <motion.div
            {...scrollProps}
            variants={reveal}
            className="grid items-center gap-6 overflow-hidden rounded-2xl border border-[#E9E4EB] bg-white p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:p-8"
          >
            <div className="min-w-0">
              <Eyebrow>
                Visitor Information
              </Eyebrow>

              <h1
                id="visit-details-heading"
                className="mt-4 max-w-[650px] font-heading text-[clamp(1.75rem,3vw,2.6rem)] font-extrabold leading-[1.15] tracking-[-0.045em] text-brand-dark"
              >
                Plan Your Visit to{" "}
                <span className="text-brand-primary">
                  Bangladesh Buildcon.
                </span>
              </h1>

              <p className="mt-4 max-w-[610px] text-[13px] leading-[1.85] text-[#66616C] sm:text-[14px]">
                Prepare for the 11th Bangladesh
                Buildcon International Expo 2027.
                Explore essential dates, venue
                information, directions and useful
                visitor guidance.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 rounded-md border border-[#E9E4EB] bg-[#FBFAFC] px-3 py-2 text-[11px] font-semibold text-[#5F5863]">
                  <Icon
                    name="calendar"
                    className="size-4 text-brand-primary"
                  />
                  {event.dates.display}
                </span>

                <span className="inline-flex items-center gap-2 rounded-md border border-[#E9E4EB] bg-[#FBFAFC] px-3 py-2 text-[11px] font-semibold text-[#5F5863]">
                  <Icon
                    name="pin"
                    className="size-4 text-brand-primary"
                  />
                  {event.venue.city}, Bangladesh
                </span>
              </div>

              <div className="mt-6 flex flex-wrap gap-2.5">
                <Link
                  href={event.cta.registerVisit}
                  className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-brand-primary px-5 py-3 font-heading text-[12px] font-bold text-white transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-brand-primary-dark motion-reduce:transform-none"
                >
                  Visitor Registration

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    <Icon name="arrow" className="size-4" />
                  </span>
                </Link>

                <a
                  href="#visit-map"
                  className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#E8E1E9] bg-white px-5 py-3 font-heading text-[12px] font-bold text-brand-dark transition-colors hover:border-brand-primary/35 hover:text-brand-primary"
                >
                  View Venue Map

                  <Icon name="pin" className="size-4" />
                </a>
              </div>
            </div>

            <div className="relative flex min-w-0 items-center justify-center overflow-hidden rounded-xl border border-[#F0E7EE] bg-[#FCF8FB] p-4 sm:p-6">
              <VenueIllustration
                reducedMotion={reducedMotion}
              />

             
            </div>
          </motion.div>

          {/* Event information cards */}
          <motion.div
            variants={stagger}
            initial={reducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
            className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {EVENT_DETAILS.map((detail, index) => (
              <motion.article
                key={detail.label}
                variants={reveal}
                whileHover={
                  reducedMotion
                    ? undefined
                    : { y: -4 }
                }
                className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-[#E9E4EB] bg-white p-5 transition-[border-color,box-shadow] duration-300 hover:border-brand-primary/35 hover:shadow-[0_12px_28px_rgba(5,7,9,0.055)]"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-brand-primary transition-transform duration-300 group-hover:scale-x-100"
                />

                <div className="flex items-start justify-between gap-3">
                  <span className="flex size-11 items-center justify-center rounded-lg border border-brand-primary/15 bg-[#F9ECF5] text-brand-primary transition-colors group-hover:bg-brand-primary group-hover:text-white">
                    <Icon name={detail.icon} />
                  </span>

                   
                </div>

                <p className="mt-5 font-heading text-[10px] font-bold uppercase tracking-[0.09em] text-[#807985]">
                  {detail.label}
                </p>

                <h3 className="mt-2 font-heading text-[14px] font-extrabold leading-[1.5] text-brand-dark">
                  {detail.value}
                </h3>

                <p className="mt-2 text-[12px] leading-[1.7] text-[#68616D]">
                  {detail.description}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </section>

        {/* ===================================
            02. VENUE MAP
        ==================================== */}

        <motion.section
          id="visit-map"
          {...scrollProps}
          variants={reveal}
          aria-labelledby="visit-map-heading"
          className="mt-12 scroll-mt-24 overflow-hidden rounded-2xl border border-[#E9E4EB] bg-white sm:mt-16"
        >
          <div className="flex flex-col gap-5 border-b border-[#EDE7ED] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <div className="max-w-[690px]">
              <Eyebrow>
                Venue & Directions
              </Eyebrow>

              <h2
                id="visit-map-heading"
                className="mt-3 font-heading text-[clamp(1.35rem,2.3vw,1.85rem)] font-extrabold leading-[1.25] tracking-[-0.035em] text-brand-dark"
              >
                Find the{" "}
                <span className="text-brand-primary">
                  Exhibition Venue
                </span>
              </h2>

              <p className="mt-3 flex items-start gap-2 text-[12px] leading-[1.8] text-[#66616C] sm:text-[13px]">
                <span className="mt-0.5 shrink-0 text-brand-primary">
                  <Icon name="pin" className="size-4" />
                </span>

                {event.venue.fullLocation}
              </p>
            </div>

            <a
              href={event.venue.mapLinkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-11 w-fit shrink-0 items-center justify-center gap-2 rounded-lg border border-brand-primary/25 bg-[#F9EDF5] px-5 py-3 font-heading text-[12px] font-bold text-brand-primary transition-colors hover:border-brand-primary hover:bg-brand-primary hover:text-white"
            >
              Open Directions

              <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <Icon name="external" className="size-4" />
              </span>
            </a>
          </div>

          <div className="p-3 sm:p-5">
            <div className="overflow-hidden rounded-xl border border-[#E9E4EB] bg-[#F8F8FA]">
              <iframe
                title={`Map of ${event.venue.name}, ${event.venue.city}`}
                src={event.venue.mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[310px] w-full border-0 sm:h-[400px]"
              />
            </div>
          </div>
        </motion.section>

        {/* ===================================
            03. VISITOR FAQS
        ==================================== */}

        <section
          aria-labelledby="visit-faq-heading"
          className="mt-12 sm:mt-16"
        >
          <motion.div
            {...scrollProps}
            variants={reveal}
            className="flex flex-col gap-4 border-b border-[#E9E4EB] pb-6 sm:flex-row sm:items-end sm:justify-between"
          >
            <div className="max-w-[650px]">
              <Eyebrow>
                Visitor Guidance
              </Eyebrow>

              <h2
                id="visit-faq-heading"
                className="mt-3 font-heading text-[clamp(1.4rem,2.5vw,2rem)] font-extrabold leading-[1.2] tracking-[-0.04em] text-brand-dark"
              >
                Frequently Asked{" "}
                <span className="text-brand-primary">
                  Questions
                </span>
              </h2>
            </div>

            <p className="max-w-[390px] text-[12px] leading-[1.8] text-[#66616C] sm:text-[13px]">
              Practical answers based on event
              information, with unconfirmed
              arrangements clearly identified.
            </p>
          </motion.div>

          <VisitorFaqs
            reducedMotion={reducedMotion}
          />
        </section>

        {/* ===================================
            04. ORGANISER CONTACTS
        ==================================== */}

        <motion.section
          {...scrollProps}
          variants={reveal}
          aria-labelledby="visitor-contact-heading"
          className="mt-12 overflow-hidden rounded-2xl border border-[#E9E4EB] bg-white sm:mt-16"
        >
          <div className="grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            {/* Editorial panel */}
            <div className="relative overflow-hidden bg-[#18151C] p-6 text-white sm:p-8">
              <div className="flex items-center gap-2.5">
                <span className="h-[2px] w-7 bg-brand-primary" />

                <span className="font-heading text-[10px] font-bold uppercase tracking-[0.15em] text-[#E7A4D0]">
                  Official Organisers
                </span>
              </div>

              <h2
                id="visitor-contact-heading"
                className="mt-4 max-w-[420px] font-heading text-[clamp(1.35rem,2.2vw,1.95rem)] font-extrabold leading-[1.25] tracking-[-0.035em]"
              >
                Need Help Planning{" "}
                <span className="text-[#E7A4D0]">
                  Your Visit?
                </span>
              </h2>

              <p className="mt-4 max-w-[430px] text-[12px] leading-[1.85] text-white/65 sm:text-[13px]">
                Contact the joint organising team
                for visitor, venue or event
                information.
              </p>

              {/* Animated decorative SVG */}
              <svg
                viewBox="0 0 330 130"
                fill="none"
                aria-hidden="true"
                className="mt-5 h-auto w-full max-w-[330px] opacity-80"
              >
                <path
                  d="M15 114H315"
                  stroke="#FFFFFF"
                  strokeOpacity=".25"
                />

                <path
                  d="M34 114V47h82v67M129 114V22h94v92M237 114V63h60v51"
                  stroke="#BA1D82"
                  strokeWidth="2"
                />

                <path
                  d="M34 70h82M34 92h82M129 48h94M129 75h94M129 97h94M237 88h60"
                  stroke="#FFFFFF"
                  strokeOpacity=".3"
                />

                <motion.circle
                  cx="176"
                  cy="22"
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
                    transformOrigin: "176px 22px",
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </svg>
            </div>

            {/* Contact cards */}
            <div className="min-w-0 p-5 sm:p-7">
              <p className="font-heading text-[10px] font-bold uppercase tracking-[0.12em] text-brand-primary">
                Visitor Assistance
              </p>

              <h3 className="mt-2 font-heading text-[18px] font-extrabold tracking-[-0.03em] text-brand-dark">
                Contact the Organisers
              </h3>


<div className="mt-4 overflow-hidden rounded-xl border border-[#EAE5EB] bg-white">
  <div className="divide-y divide-[#EEE9EF]">
    {organiserContacts.map((contact) => (
      <div
        key={contact.id}
        className="group min-w-0 px-4 py-3 transition-colors duration-300 hover:bg-[#FCF6FA] sm:px-5 sm:py-3.5"
      >
        {/* Contact person name */}
        <h4 className="font-heading text-[13px] font-bold leading-[1.4] tracking-[-0.015em] text-brand-dark sm:text-[14px]">
          {contact.label}
        </h4>

        {/* Phone and email */}
        <div className="mt-1.5 flex min-w-0 flex-col gap-1">
          <a
            href={`tel:${contact.phoneHref}`}
            aria-label={`Call ${contact.label}`}
            className="group/link flex w-fit max-w-full min-w-0 items-start gap-2 text-[12px] font-medium leading-[1.5] tracking-normal text-[#625B67] transition-colors duration-200 hover:text-brand-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary sm:text-[12.5px]"
          >
            <span className="mt-[2px] flex size-4 shrink-0 items-center justify-center text-brand-primary">
              <Icon name="phone" className="size-[15px]" />
            </span>

            <span className="min-w-0 break-words tabular-nums">
              {contact.phone}
            </span>
          </a>

          <a
            href={`mailto:${contact.email}`}
            aria-label={`Email ${contact.label}`}
            className="group/link flex w-fit max-w-full min-w-0 items-start gap-2 text-[12px] font-medium leading-[1.5] tracking-normal text-[#625B67] transition-colors duration-200 hover:text-brand-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary sm:text-[12.5px]"
          >
            <span className="mt-[2px] flex size-4 shrink-0 items-center justify-center text-brand-primary">
              <Icon name="mail" className="size-[15px]" />
            </span>

            <span className="min-w-0 break-all">
              {contact.email}
            </span>
          </a>
        </div>
      </div>
    ))}
  </div>
</div>



              <Link
                href="/contact"
                className="group mt-5 inline-flex min-h-9 items-center gap-2 font-heading text-[11px] font-bold text-brand-primary hover:text-brand-primary-dark"
              >
                General Enquiries

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <Icon name="arrow" className="size-4" />
                </span>
              </Link>
            </div>
          </div>
        </motion.section>

        {/* ===================================
            05. FINAL VISITOR CTA
        ==================================== */}

        <motion.section
          {...scrollProps}
          variants={reveal}
          aria-labelledby="visitor-final-cta-heading"
          className="mt-6 overflow-hidden rounded-2xl border border-brand-primary/20 bg-[#F8EDF5] p-5 sm:p-7"
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <Eyebrow>
                Plan Your Visit
              </Eyebrow>

              <h2
                id="visitor-final-cta-heading"
                className="mt-3 font-heading text-[17px] font-extrabold leading-[1.4] text-brand-dark sm:text-[19px]"
              >
                Planning to Visit{" "}
                <span className="text-brand-primary">
                  Bangladesh Buildcon 2027?
                </span>
              </h2>

              <p className="mt-2 text-[12px] leading-[1.8] text-[#66616C]">
                {event.dates.display} ·{" "}
                {event.venue.name},{" "}
                {event.venue.city}. Review
                registration information before
                your visit.
              </p>
            </div>

            <Link
              href={event.cta.registerVisit}
              className="group inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-brand-primary px-5 py-3 font-heading text-[12px] font-bold text-white transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-brand-primary-dark motion-reduce:transform-none sm:w-auto"
            >
              Visitor Registration

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <Icon
                  name="arrow"
                  className="size-4"
                />
              </span>
            </Link>
          </div>
        </motion.section>
      </Container>
    </div>
  );
}
