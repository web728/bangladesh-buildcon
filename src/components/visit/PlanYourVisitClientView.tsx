
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
      staggerChildren: 0.085,
      delayChildren: 0.04,
    },
  },
};

/* ==========================================
   VERIFIED EVENT INFORMATION
========================================== */

const EVENT_DETAILS = [
  {
    label: "Event",
    value: "10th Bangladesh Buildcon",
    description: "International Expo 2026",
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
    description: event.venue.city + ", Bangladesh",
    icon: "building",
  },
  {
    label: "Visitor Information",
    value: "Visitor Registration",
    description: "See the visitor registration page",
    icon: "ticket",
  },
] as const;

/*
 * Guidance below avoids presenting unverified
 * admission fees, opening times or services
 * as confirmed event arrangements.
 */

const FAQS = [
  {
    question: "When and where is Bangladesh Buildcon 2026?",
    answer:
      "The 10th Bangladesh Buildcon International Expo 2026 is scheduled for 17–19 September 2026 at ICCB Exhibition Hall, Dhaka, Bangladesh.",
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
      "Use the visitor registration link on this page to review the current registration process. Admission requirements, badge arrangements and any applicable charges should be confirmed through the official registration information.",
    tag: "Registration",
  },
  {
    question: "What are the daily exhibition opening hours?",
    answer:
      "The official brochure confirms the three event dates but does not specify daily opening or closing times. Please confirm the latest visitor entry hours with the organising team before travelling.",
    tag: "Opening Hours",
  },
  {
    question: "Where can I find venue directions?",
    answer:
      "Use the venue map and directions link below to locate ICCB Exhibition Hall in Dhaka. Check your route and current traffic conditions before departure.",
    tag: "Directions",
  },
  {
    question: "What should international visitors check?",
    answer:
      "International visitors should verify applicable passport, visa and entry requirements through official government or consular sources. Travel documentation requirements can vary by nationality and purpose of visit.",
    tag: "International Visitors",
  },
] as const;

/* ==========================================
   SVG ICONS
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
  | "help";

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
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
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
        <path d="M9.5 9a2.5 2.5 0 0 1 5 1c0 1.7-2.5 2.1-2.5 4" />
        <path d="M12 17h.01" />
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

function Eyebrow({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="h-[2px] w-7 bg-brand-primary" />
      <span className="font-heading text-[10px] font-extrabold uppercase tracking-[0.16em] text-brand-primary-dark">
        {children}
      </span>
    </div>
  );
}

/* ==========================================
   MAIN COMPONENT
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

  const organiserContacts = [
    {
      label: "Futurex Trade Fair & Events Pvt. Ltd.",
      phone: event.contact.futurex.phone,
      email: event.contact.futurex.email,
    },
    {
      label: "ASK Trade & Exhibitions Pvt. Ltd.",
      phone: event.contact.askTrade.phone,
      email: event.contact.askTrade.email,
    },
  ];

  return (
    <div className="relative overflow-hidden bg-brand-light py-12 text-brand-dark sm:py-16">
      {/* Architectural background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(5,7,9,0.018)_1px,transparent_1px),linear-gradient(to_bottom,rgba(5,7,9,0.018)_1px,transparent_1px)] bg-[size:64px_64px]"
      />

      <Container className="relative z-10">
        {/* ====================================
            01 — EVENT INFORMATION
        ===================================== */}

        <section aria-labelledby="visit-details-heading">
          <motion.div
            {...scrollProps}
            variants={reveal}
            className="flex flex-col gap-5 border-b border-brand-border pb-6 sm:flex-row sm:items-end sm:justify-between"
          >
            <div className="max-w-[740px]">
              <Eyebrow>Visitor Information</Eyebrow>

              <h2
                id="visit-details-heading"
                className="mt-3 font-heading text-[clamp(1.55rem,2.8vw,2.2rem)] font-extrabold leading-[1.2] tracking-[-0.04em] text-brand-dark"
              >
                Essential Event{" "}
                <span className="text-brand-primary-dark">
                  Details
                </span>
              </h2>

              <p className="mt-3 max-w-[680px] text-[13px] leading-[1.85] text-brand-body sm:text-sm">
                Find the dates, venue and visitor
                information for the 10th Bangladesh
                Buildcon International Expo 2026.
              </p>
            </div>

            <Link
              href={event.cta.registerVisit}
              className="group inline-flex min-h-11 w-fit shrink-0 items-center justify-center gap-2 rounded-lg bg-brand-primary px-5 py-3 font-heading text-[12px] font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
            >
              Visitor Registration
              <span className="transition-transform group-hover:translate-x-1">
                <Icon name="arrow" className="size-4" />
              </span>
            </Link>
          </motion.div>

          <motion.div
            variants={stagger}
            initial={reducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.06 }}
            className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {EVENT_DETAILS.map((detail, index) => (
              <motion.article
                key={detail.label}
                variants={reveal}
                whileHover={
                  reducedMotion ? undefined : { y: -4 }
                }
                transition={{
                  duration: 0.28,
                  ease: EASE,
                }}
                className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-brand-border bg-white p-5 shadow-[0_5px_22px_rgba(5,7,9,0.035)] transition-[border-color,box-shadow] duration-300 hover:border-brand-primary/35 hover:shadow-[0_15px_35px_rgba(5,7,9,0.075)]"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-brand-primary transition-transform duration-300 group-hover:scale-x-100"
                />

                <div className="flex items-start justify-between gap-3">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-brand-primary-soft text-brand-primary-dark transition-colors duration-300 group-hover:bg-brand-primary group-hover:text-white">
                    <Icon name={detail.icon} />
                  </span>

                  <span className="font-heading text-[11px] font-bold text-brand-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <p className="mt-5 font-heading text-[10px] font-extrabold uppercase tracking-[0.12em] text-brand-muted">
                  {detail.label}
                </p>

                <h3 className="mt-2 font-heading text-[15px] font-extrabold leading-[1.45] tracking-[-0.025em] text-brand-dark">
                  {detail.value}
                </h3>

                <p className="mt-2 text-[12px] leading-[1.75] text-brand-body">
                  {detail.description}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </section>

        {/* ====================================
            02 — VENUE MAP
        ===================================== */}

        <motion.section
          {...scrollProps}
          variants={reveal}
          aria-labelledby="visit-map-heading"
          className="mt-12 overflow-hidden rounded-2xl border border-brand-border bg-white shadow-[0_10px_34px_rgba(5,7,9,0.04)] sm:mt-16"
        >
          <div className="flex flex-col gap-5 border-b border-brand-border p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <div className="max-w-[680px]">
              <Eyebrow>Venue & Directions</Eyebrow>

              <h2
                id="visit-map-heading"
                className="mt-3 font-heading text-[21px] font-extrabold leading-[1.3] tracking-[-0.035em] text-brand-dark sm:text-[25px]"
              >
                Locate{" "}
                <span className="text-brand-primary-dark">
                  ICCB Exhibition Hall
                </span>
              </h2>

              <p className="mt-2 flex items-start gap-2 text-[13px] leading-[1.8] text-brand-body">
                <span className="mt-0.5 shrink-0 text-brand-primary-dark">
                  <Icon name="pin" className="size-4" />
                </span>
                {event.venue.fullLocation}
              </p>
            </div>

            <a
              href={event.venue.mapLinkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg border border-brand-primary/25 bg-brand-primary-soft px-5 py-3 font-heading text-[12px] font-bold text-brand-primary-dark transition-colors hover:border-brand-primary hover:bg-brand-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
            >
              Open Directions
              <span className="transition-transform group-hover:translate-x-1">
                <Icon name="arrow" className="size-4" />
              </span>
            </a>
          </div>

          <div className="p-3 sm:p-5">
            <div className="overflow-hidden rounded-xl border border-brand-border bg-brand-light">
              <iframe
                title={`Map of ${event.venue.name}, ${event.venue.city}`}
                src={event.venue.mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[320px] w-full border-0 sm:h-[420px]"
              />
            </div>
          </div>
        </motion.section>

        {/* ====================================
            03 — VISITOR FAQs
        ===================================== */}

        <section
          aria-labelledby="visit-faq-heading"
          className="mt-12 sm:mt-16"
        >
          <motion.div
            {...scrollProps}
            variants={reveal}
            className="border-b border-brand-border pb-6"
          >
            <Eyebrow>Visitor Guidance</Eyebrow>

            <h2
              id="visit-faq-heading"
              className="mt-3 font-heading text-[clamp(1.5rem,2.7vw,2.1rem)] font-extrabold tracking-[-0.04em] text-brand-dark"
            >
              Frequently Asked{" "}
              <span className="text-brand-primary-dark">
                Questions
              </span>
            </h2>

            <p className="mt-3 text-[13px] leading-[1.85] text-brand-body">
              Answers based on the published event
              information, with unconfirmed arrangements
              clearly identified.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial={reducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.06 }}
            className="mt-6 grid items-stretch gap-4 md:grid-cols-2"
          >
            {FAQS.map((faq) => (
              <motion.article
                key={faq.question}
                variants={reveal}
                whileHover={
                  reducedMotion ? undefined : { y: -3 }
                }
                className="group rounded-2xl border border-brand-border bg-white p-5 shadow-[0_4px_20px_rgba(5,7,9,0.03)] transition-[border-color,box-shadow] duration-300 hover:border-brand-primary/30 hover:shadow-[0_12px_30px_rgba(5,7,9,0.06)] sm:p-6"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-lg border border-brand-primary/15 bg-brand-primary-soft px-3 py-1.5 font-heading text-[10px] font-bold text-brand-primary-dark">
                    {faq.tag}
                  </span>

                  <span className="text-brand-primary-dark">
                    <Icon name="help" className="size-5" />
                  </span>
                </div>

                <h3 className="mt-4 font-heading text-[15px] font-extrabold leading-[1.5] text-brand-dark">
                  {faq.question}
                </h3>

                <p className="mt-3 text-[13px] leading-[1.85] text-brand-body">
                  {faq.answer}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </section>

        {/* ====================================
            04 — ORGANISER HELP DESK
        ===================================== */}

        <motion.section
          {...scrollProps}
          variants={reveal}
          aria-labelledby="visitor-contact-heading"
          className="mt-12 overflow-hidden rounded-2xl border border-brand-border bg-white p-5 shadow-[0_8px_30px_rgba(5,7,9,0.035)] sm:mt-16 sm:p-7"
        >
          <Eyebrow>Official Organisers</Eyebrow>

          <h2
            id="visitor-contact-heading"
            className="mt-3 font-heading text-[21px] font-extrabold tracking-[-0.035em] text-brand-dark sm:text-[25px]"
          >
            Visitor{" "}
            <span className="text-brand-primary-dark">
              Assistance
            </span>
          </h2>

          <p className="mt-2 max-w-[730px] text-[13px] leading-[1.85] text-brand-body">
            For further visitor, event information
            or travel-related enquiries, contact
            the organising team.
          </p>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {organiserContacts.map((contact) => {
              const phoneHref = contact.phone.replace(
                /[^0-9+]/g,
                ""
              );

              return (
                <div
                  key={contact.label}
                  className="min-w-0 rounded-xl border border-brand-border bg-brand-light p-4 sm:p-5"
                >
                  <h3 className="font-heading text-[14px] font-extrabold leading-[1.5] text-brand-dark">
                    {contact.label}
                  </h3>

                  <div className="mt-4 space-y-2.5">
                    <a
                      href={`tel:${phoneHref}`}
                      className="flex min-h-11 items-center gap-3 rounded-lg border border-brand-border bg-white px-3.5 py-2.5 text-[12px] font-semibold text-brand-body transition-colors hover:border-brand-primary/35 hover:text-brand-primary-dark"
                    >
                      <span className="text-brand-primary-dark">
                        <Icon name="phone" className="size-4" />
                      </span>
                      <span className="min-w-0 break-words">
                        {contact.phone}
                      </span>
                    </a>

                    <a
                      href={`mailto:${contact.email}`}
                      className="flex min-h-11 items-center gap-3 rounded-lg border border-brand-border bg-white px-3.5 py-2.5 text-[12px] font-semibold text-brand-body transition-colors hover:border-brand-primary/35 hover:text-brand-primary-dark"
                    >
                      <span className="text-brand-primary-dark">
                        <Icon name="mail" className="size-4" />
                      </span>
                      <span className="min-w-0 break-all">
                        {contact.email}
                      </span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* ====================================
            FINAL VISITOR CTA
        ===================================== */}

        <motion.div
          {...scrollProps}
          variants={reveal}
          className="mt-6 flex flex-col gap-5 rounded-2xl border border-brand-primary/20 bg-brand-primary-soft p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
        >
          <div>
            <h2 className="font-heading text-[17px] font-extrabold leading-[1.4] text-brand-dark">
              Planning to Visit Bangladesh Buildcon 2026?
            </h2>

            <p className="mt-2 text-[12px] leading-[1.85] text-brand-body">
              {event.dates.display} · {event.venue.name},{" "}
              {event.venue.city}. Review the visitor
              registration information before your visit.
            </p>
          </div>

          <Link
            href={event.cta.registerVisit}
            className="group inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-brand-primary px-6 py-3 font-heading text-[12px] font-bold text-white transition-colors hover:bg-brand-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
          >
            Visitor Registration
            <span className="transition-transform group-hover:translate-x-1">
              <Icon name="arrow" className="size-4" />
            </span>
          </Link>
        </motion.div>
      </Container>
    </div>
  );
}
