
"use client";

import Image from "next/image";
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
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

/* ==========================================
   ORGANISER CONTENT

   Source: Bangladesh Buildcon 2026
   official brochure, page 6.
========================================== */

const ORGANISERS = [
  {
    id: "futurex",
    name: "Futurex Trade Fair & Events Pvt. Ltd.",
    shortName: "Futurex",
    logo: "/logos/futurex-logo.png",
    website: "https://www.futurextrade.com/",
    location: "Based in Delhi, India",
    overview:
      "Futurex Trade Fair & Events Pvt. Ltd. is an international exhibition and corporate event organiser based in Delhi, with branch offices in Mumbai, Colombo, Kathmandu and Dhaka.",
    description:
      "The organiser's portfolio includes more than 220 international trade exhibitions and conferences across a diverse range of industries. Its activities bring manufacturers and potential buyers together through exhibitions, seminars, corporate events and networking gatherings.",
    sectors: [
      "Building & Construction",
      "Infrastructure",
      "Electrical, Power & Lighting",
      "Metal & Mining",
      "Wood & Woodworking",
      "Agriculture",
      "Packaging",
      "Textiles & Garments",
    ],
    metric: {
      value: "220+",
      label: "International exhibitions & conferences",
    },
  },
  {
    id: "ask-trade",
    name: "ASK Trade & Exhibitions Pvt. Ltd.",
    shortName: "ASK Trade",
    logo: "/logos/ask-trade-logo.png",
    website: null,
    location: "Bangladesh Buildcon Organiser",
    overview:
      "ASK Trade & Exhibitions Pvt. Ltd. creates B2B trade show platforms where industry stakeholders can interact and engage.",
    description:
      "The organiser focuses on connecting global technology with local industry participants. Its industry expertise includes yarn, fabrics, garment machinery, wood and woodworking, building and construction, electrical products and machinery, printing, and leather and footwear machinery.",
    sectors: [
      "Yarn & Fabrics",
      "Garment Machinery",
      "Wood & Woodworking",
      "Building & Construction",
      "Electrical Products & Machinery",
      "Printing",
      "Leather & Footwear Machinery",
    ],
    metric: null,
  },
] as const;

const CONTACT_DESKS = [
  {
    name: "Futurex Trade Fair & Events Pvt. Ltd.",
    contact: event.contact.futurex,
  },
  {
    name: "ASK Trade & Exhibitions Pvt. Ltd.",
    contact: event.contact.askTrade,
  },
];

/* ==========================================
   SVG ICONS
========================================== */

function Icon({
  name,
  className = "size-4",
}: {
  name: "arrow" | "phone" | "mail" | "globe" | "building";
  className?: string;
}) {
  const paths: Record<string, ReactNode> = {
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    phone: (
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 3.1 5.2 2 2 0 0 1 5.1-2.2h3a2 2 0 0 1 2 1.7l.5 2.8a2 2 0 0 1-.6 1.7L8.1 11a16 16 0 0 0 4.8 4.8l1.9-1.9a2 2 0 0 1 1.7-.6l2.8.5a2 2 0 0 1 1.7 2Z" />
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    globe: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c-3 3-3 15 0 18M12 3c3 3 3 15 0 18" />
      </>
    ),
    building: (
      <>
        <path d="M3 21h18M5 21V5h10v16M15 10h5v11" />
        <path d="M8 9h4M8 13h4M8 17h4" />
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

export function OrganisersClientView() {
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
    <div className="relative overflow-hidden bg-brand-light py-12 text-brand-dark sm:py-16">
      {/* Subtle architectural grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(5,7,9,0.018)_1px,transparent_1px),linear-gradient(to_bottom,rgba(5,7,9,0.018)_1px,transparent_1px)] bg-[size:64px_64px]"
      />

      <Container className="relative z-10">
        {/* PAGE INTRO */}
        <motion.header
          {...scrollProps}
          variants={reveal}
          className="mb-7 border-b border-brand-border pb-6"
        >
          <Eyebrow>Official Event Organisers</Eyebrow>

          <h2 className="mt-3 font-heading text-[clamp(1.55rem,2.8vw,2.2rem)] font-extrabold leading-[1.22] tracking-[-0.04em] text-brand-dark">
            Organising{" "}
            <span className="text-brand-primary-dark">
              Bangladesh Buildcon 2026
            </span>
          </h2>

          <p className="mt-4 max-w-[790px] text-[13px] leading-[1.9] text-brand-body sm:text-sm">
            The 10th Bangladesh Buildcon International
            Expo 2026 is organised by Futurex Trade
            Fair & Events Pvt. Ltd. and ASK Trade &
            Exhibitions Pvt. Ltd. Both companies
            are presented as event organisers in the
            official exhibition brochure.
          </p>
        </motion.header>

        {/* ORGANISER PROFILES */}
        <section aria-label="Official organiser profiles">
          <motion.div
            variants={stagger}
            initial={reducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.07 }}
            className="grid items-stretch gap-5 lg:grid-cols-2"
          >
            {ORGANISERS.map((organiser, index) => (
              <motion.article
                key={organiser.id}
                variants={reveal}
                whileHover={
                  reducedMotion
                    ? undefined
                    : { y: -4 }
                }
                transition={{
                  duration: 0.28,
                  ease: EASE,
                }}
                className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-brand-border bg-white shadow-[0_6px_26px_rgba(5,7,9,0.035)] transition-[border-color,box-shadow] duration-300 hover:border-brand-primary/35 hover:shadow-[0_16px_40px_rgba(5,7,9,0.08)]"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-[3px] bg-brand-primary"
                />

                {/* Logo */}
                <div className="flex items-center justify-between gap-4 border-b border-brand-border px-5 py-5 sm:px-7">
                  <div className="relative h-[65px] w-[190px] max-w-[70%] sm:h-[72px] sm:w-[210px]">
                    <Image
                      src={organiser.logo}
                      alt={`${organiser.name} logo`}
                      fill
                      sizes="210px"
                      className="object-contain object-left"
                    />
                  </div>

                  <span className="font-heading text-[11px] font-extrabold tabular-nums text-brand-muted">
                    0{index + 1}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-7">
                  <span className="inline-flex w-fit rounded-lg border border-brand-primary/15 bg-brand-primary-soft px-3 py-1.5 font-heading text-[10px] font-bold uppercase tracking-[0.08em] text-brand-primary-dark">
                    Official Organiser
                  </span>

                  <h3 className="mt-4 font-heading text-[18px] font-extrabold leading-[1.4] tracking-[-0.035em] text-brand-dark sm:text-[20px]">
                    {organiser.name}
                  </h3>

                  <p className="mt-2 inline-flex items-center gap-2 text-[12px] font-medium text-brand-muted">
                    <span className="text-brand-primary-dark">
                      <Icon name="building" />
                    </span>

                    {organiser.location}
                  </p>

                  <p className="mt-5 text-[13px] leading-[1.85] text-brand-body">
                    {organiser.overview}
                  </p>

                  <p className="mt-3 text-[13px] leading-[1.85] text-brand-body">
                    {organiser.description}
                  </p>

                  {/* Industry coverage */}
                  <div className="mt-6">
                    <h4 className="font-heading text-[11px] font-extrabold uppercase tracking-[0.1em] text-brand-dark">
                      Industry Expertise
                    </h4>

                    <ul className="mt-3 flex flex-wrap gap-2">
                      {organiser.sectors.map((sector) => (
                        <li key={sector}>
                          <span className="inline-flex rounded-lg border border-brand-border bg-brand-light px-2.5 py-1.5 text-[11px] font-medium leading-[1.5] text-brand-body">
                            {sector}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {organiser.metric && (
                    <div className="mt-6 flex items-center gap-4 rounded-xl border border-brand-primary/15 bg-brand-primary-soft p-4">
                      <span className="font-heading text-[26px] font-extrabold tracking-[-0.045em] text-brand-primary-dark">
                        {organiser.metric.value}
                      </span>

                      <span className="max-w-[170px] text-[11px] font-semibold leading-[1.6] text-brand-body">
                        {organiser.metric.label}
                      </span>
                    </div>
                  )}

                  {/* Bottom link */}
                  <div className="mt-auto border-t border-brand-border pt-5">
                    {organiser.website ? (
                      <a
                        href={organiser.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link inline-flex min-h-10 items-center gap-2 font-heading text-[12px] font-bold text-brand-primary-dark transition-colors hover:text-brand-primary hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-brand-primary"
                      >
                        <Icon name="globe" />
                        Visit Futurex Website

                        <span className="transition-transform group-hover/link:translate-x-1">
                          <Icon name="arrow" />
                        </span>
                      </a>
                    ) : (
                      <Link
                        href="/contact"
                        className="group/link inline-flex min-h-10 items-center gap-2 font-heading text-[12px] font-bold text-brand-primary-dark transition-colors hover:text-brand-primary hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-brand-primary"
                      >
                        Contact ASK Trade

                        <span className="transition-transform group-hover/link:translate-x-1">
                          <Icon name="arrow" />
                        </span>
                      </Link>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </section>

        {/* CONTACT DIRECTORY */}
        <motion.section
          {...scrollProps}
          variants={reveal}
          aria-labelledby="organiser-contact-heading"
          className="mt-12 overflow-hidden rounded-2xl border border-brand-border bg-white shadow-[0_8px_30px_rgba(5,7,9,0.035)] sm:mt-16"
        >
          <div className="border-b border-brand-border px-5 py-6 sm:px-7">
            <Eyebrow>Organising Secretariat</Eyebrow>

            <h2
              id="organiser-contact-heading"
              className="mt-3 font-heading text-[21px] font-extrabold tracking-[-0.035em] text-brand-dark sm:text-[25px]"
            >
              Contact the{" "}
              <span className="text-brand-primary-dark">
                Organisers
              </span>
            </h2>

            <p className="mt-2 text-[13px] leading-[1.8] text-brand-body">
              For questions about exhibition
              participation, contact the relevant
              organising team using the details below.
            </p>
          </div>

          <div className="grid gap-4 p-5 md:grid-cols-2 sm:p-7">
            {CONTACT_DESKS.map((desk) => (
              <div
                key={desk.name}
                className="min-w-0 rounded-xl border border-brand-border bg-brand-light p-4 sm:p-5"
              >
                <h3 className="font-heading text-[15px] font-extrabold leading-[1.5] text-brand-dark">
                  {desk.name}
                </h3>

                {desk.contact.name && (
                  <p className="mt-2 text-[12px] font-medium text-brand-body">
                    {desk.contact.name}
                  </p>
                )}

                <div className="mt-4 space-y-2.5">
                  {desk.contact.phone && (
                    <a
                      href={`tel:${desk.contact.phone.replace(
                        /[^0-9+]/g,
                        ""
                      )}`}
                      className="flex min-h-11 items-center gap-3 rounded-lg border border-brand-border bg-white px-3.5 py-2.5 text-[12px] font-semibold text-brand-body transition-colors hover:border-brand-primary/40 hover:text-brand-primary-dark"
                    >
                      <span className="text-brand-primary-dark">
                        <Icon name="phone" />
                      </span>

                      <span className="min-w-0 break-words">
                        {desk.contact.phone}
                      </span>
                    </a>
                  )}

                  {desk.contact.email && (
                    <a
                      href={`mailto:${desk.contact.email}`}
                      className="flex min-h-11 items-center gap-3 rounded-lg border border-brand-border bg-white px-3.5 py-2.5 text-[12px] font-semibold text-brand-body transition-colors hover:border-brand-primary/40 hover:text-brand-primary-dark"
                    >
                      <span className="text-brand-primary-dark">
                        <Icon name="mail" />
                      </span>

                      <span className="min-w-0 break-all">
                        {desk.contact.email}
                      </span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      </Container>
    </div>
  );
}
