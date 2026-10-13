
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";

/* ==========================================
   DESIGN SYSTEM
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
      duration: 0.7,
      ease: EASE,
    },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.06,
    },
  },
};

/* ==========================================
   ORIGINAL ORGANISER DATA
========================================== */

const ORGANISERS_DATA = [
  {
    name: "FUTUREX TRADE FAIR & EVENTS PVT. LTD.",
    shortBadge: "Futurex Group",
    hq: "New Delhi, India",
    established: "International Exhibition Organiser",
    url: "https://www.futurextrade.com/",
    logo: "/logos/futurex-logo.png",
    paragraphs: [
      "Futurex Trade Fair & Events Pvt. Ltd. is an international exhibition and corporate-events organiser based in Delhi, with branch offices in Mumbai, Colombo, Kathmandu, and Dhaka.",
      "Its portfolio spans more than 220 international trade exhibitions and conferences across building and construction, infrastructure, power, electrical, lighting, metal and mining, agriculture, packaging, textiles, and other industrial sectors.",
    ],
    stats: [
      { label: "Trade Exhibitions", val: "220+" },
      { label: "Branch Offices", val: "5" },
      { label: "Industry Verticals", val: "16+" },
      { label: "Operating Reach", val: "Global" },
    ],
  },
  {
    name: "ASK TRADE & EXHIBITIONS PVT. LTD.",
    shortBadge: "ASK Trade & Exhibitions",
    hq: "Dhaka, Bangladesh",
    established: "B2B Trade Show Specialist",
    url: "https://www.asktradex.com/",
    logo: "/logos/ask-trade-logo.png",
    paragraphs: [
      "ASK Trade & Exhibitions Pvt. Ltd. creates B2B platforms where industry stakeholders can interact, evaluate technology, and develop commercial relationships.",
      "Its industry experience includes yarn and fabrics, garment machinery, wood and woodworking, building and construction, electrical products and machinery, printing, and leather and footwear machinery.",
    ],
    stats: [
      { label: "Platform", val: "B2B" },
      { label: "Local Market", val: "Bangladesh" },
      { label: "Core Sector", val: "Buildcon" },
      { label: "Regional Reach", val: "South Asia" },
    ],
  },
] as const;

const CONTACT_DESKS = [
  {
    company: "Futurex Group",
    location: "New Delhi Secretariat",
    name: event.contact.futurex.name,
    phone: event.contact.futurex.phone,
    email: event.contact.futurex.email,
  },
  {
    company: "ASK Trade & Exhibitions Pvt. Ltd.",
    location: "Dhaka Event Desk",
    name: event.contact.askTrade.name,
    phone: event.contact.askTrade.phone,
    email: event.contact.askTrade.email,
  },
];

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

function MailIcon() {
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
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function MapPinIcon() {
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
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

/* ==========================================
   SMALL REUSABLE ELEMENTS
========================================== */

function Eyebrow({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="h-[2px] w-7 bg-brand-primary" />

      <span className="font-heading text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#981568]">
        {children}
      </span>
    </div>
  );
}

function OrganiserCard({
  organisation,
  index,
  reducedMotion,
}: {
  organisation: (typeof ORGANISERS_DATA)[number];
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
      transition={{
        duration: 0.3,
        ease: EASE,
      }}
      className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-[#DDE1E8] bg-white shadow-[0_8px_30px_rgba(5,7,9,0.035)] transition-[border-color,box-shadow] duration-300 hover:border-brand-primary/30 hover:shadow-[0_18px_45px_rgba(5,7,9,0.09)]"
    >
      {/* Top accent */}
      <div className="absolute inset-x-0 top-0 h-[3px] bg-brand-primary" />

      {/* Logo and website */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#EAECF1] px-5 py-5 sm:px-7">
        <a
          href={organisation.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${organisation.name} official website`}
          className="relative block h-[64px] w-[185px] shrink-0 transition-transform duration-300 group-hover:scale-[1.025] sm:h-[70px] sm:w-[210px]"
        >
          <Image
            src={organisation.logo}
            alt={`${organisation.name} logo`}
            fill
            sizes="210px"
            className="object-contain object-left"
          />
        </a>

        <a
          href={organisation.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-[#DCE0E7] bg-[#F8F9FB] px-3 text-[11px] font-bold text-[#333B48] transition-colors hover:border-brand-primary/40 hover:bg-brand-primary/[0.05] hover:text-[#981568]"
        >
          Official Website
          <ArrowIcon diagonal />
        </a>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-7">
        {/* Index and category */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="rounded-md bg-brand-primary/[0.08] px-3 py-1.5 font-heading text-[10px] font-bold uppercase tracking-[0.09em] text-[#981568]">
            {organisation.shortBadge}
          </span>

          <span className="font-heading text-[11px] font-bold text-[#747C89]">
            ORGANISER 0{index + 1}
          </span>
        </div>

        {/* Company identity */}
        <h3 className="mt-5 font-heading text-[17px] font-extrabold leading-[1.45] tracking-[-0.035em] text-[#171B24] sm:text-[19px]">
          {organisation.name}
        </h3>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] font-semibold text-[#4F5967]">
          <span className="inline-flex items-center gap-1.5">
            <span className="text-brand-primary">
              <MapPinIcon />
            </span>
            {organisation.hq}
          </span>

          <span className="text-[#707987]">
            {organisation.established}
          </span>
        </div>

        {/* Company overview */}
        <div className="mt-5 space-y-3">
          {organisation.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="text-[13px] leading-[1.85] text-[#424B58]"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Metrics */}
        <div className="mt-auto pt-7">
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {organisation.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-[#E5E7ED] bg-[#F8F9FB] p-3 text-center transition-colors duration-300 group-hover:bg-[#FBF5F9]"
              >
                <p className="font-heading text-[15px] font-extrabold tracking-[-0.025em] text-[#981568] sm:text-[17px]">
                  {stat.val}
                </p>

                <p className="mt-1 text-[9px] font-semibold uppercase leading-[1.5] tracking-[0.02em] text-[#535D6A]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Card footer */}
      <div className="flex items-center justify-between border-t border-[#EAECF1] bg-[#FCFCFD] px-5 py-3.5 sm:px-7">
        <span className="text-[11px] font-bold text-[#505968]">
          Official Exhibition Organiser
        </span>

        <span className="text-[#981568] transition-transform duration-300 group-hover:translate-x-1">
          <ArrowIcon />
        </span>
      </div>
    </motion.article>
  );
}

function ContactDeskCard({
  desk,
  index,
  reducedMotion,
}: {
  desk: (typeof CONTACT_DESKS)[number];
  index: number;
  reducedMotion: boolean;
}) {
  const cleanPhone = desk.phone.replace(
    /[^0-9+]/g,
    ""
  );

  return (
    <motion.article
      variants={reveal}
      whileHover={
        reducedMotion
          ? undefined
          : { y: -4 }
      }
      transition={{
        duration: 0.3,
        ease: EASE,
      }}
      className="group flex min-w-0 flex-col rounded-xl border border-[#E1E4EA] bg-[#FAFAFC] p-5 transition-[border-color,background-color,box-shadow] duration-300 hover:border-brand-primary/35 hover:bg-white hover:shadow-[0_12px_28px_rgba(5,7,9,0.06)]"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="font-heading text-[10px] font-bold uppercase tracking-[0.1em] text-[#981568]">
          Contact Desk 0{index + 1}
        </span>

        <span className="text-[#737C89]">
          <MapPinIcon />
        </span>
      </div>

      <p className="mt-4 text-[11px] font-semibold text-[#596371]">
        {desk.company}
      </p>

      <h4 className="mt-1 font-heading text-[17px] font-extrabold tracking-[-0.025em] text-[#171B24]">
        {desk.name}
      </h4>

      <p className="mt-1 text-[12px] font-medium text-[#555F6D]">
        {desk.location}
      </p>

      <div className="mt-auto space-y-2 pt-5">
        <a
          href={`tel:${cleanPhone}`}
          className="flex min-h-11 items-center gap-3 rounded-lg border border-[#E1E4EA] bg-white px-3.5 text-[12px] font-semibold text-[#303946] transition-colors hover:border-brand-primary/40 hover:text-[#981568]"
        >
          <span className="text-brand-primary">
            <PhoneIcon />
          </span>

          <span className="min-w-0 break-words tabular-nums">
            {desk.phone}
          </span>
        </a>

        <a
          href={`mailto:${desk.email}`}
          className="flex min-h-11 items-center gap-3 rounded-lg border border-[#E1E4EA] bg-white px-3.5 text-[12px] font-semibold text-[#303946] transition-colors hover:border-brand-primary/40 hover:text-[#981568]"
        >
          <span className="text-brand-primary">
            <MailIcon />
          </span>

          <span className="min-w-0 break-all">
            {desk.email}
          </span>
        </a>
      </div>
    </motion.article>
  );
}

/* ==========================================
   MAIN ORGANISERS VIEW
========================================== */

export function OrganisersClientView() {
  const reducedMotion = !!useReducedMotion();

  const scrollReveal = {
    initial: reducedMotion ? false : "hidden",
    whileInView: "visible" as const,
    viewport: {
      once: true,
      amount: 0.1,
    },
  };

  return (
    <div className="relative overflow-hidden bg-[#F8F9FB] py-12 text-[#171B24] selection:bg-brand-primary selection:text-white sm:py-16">
      {/* Subtle structural grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(5,7,9,0.018)_1px,transparent_1px),linear-gradient(to_bottom,rgba(5,7,9,0.018)_1px,transparent_1px)] bg-[size:68px_68px]"
      />

      <Container className="relative z-10">
        {/* ======================================
            HEADER
        ======================================= */}

        <motion.header
          {...scrollReveal}
          variants={reveal}
          className="flex flex-col gap-5 border-b border-[#E0E4EB] pb-7 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-[790px]">
            <Eyebrow>Joint Exhibition Organisers</Eyebrow>

            <h2 className="mt-3 font-heading text-[clamp(1.55rem,2.8vw,2.35rem)] font-extrabold leading-[1.2] tracking-[-0.045em] text-[#171B24]">
              The Expertise Behind{" "}
              <span className="text-[#981568]">
                Bangladesh Buildcon
              </span>
            </h2>

            <p className="mt-4 max-w-[760px] text-[13px] leading-[1.9] text-[#424B58] sm:text-[14px]">
              {event.name} is jointly organised by
              Futurex Trade Fair &amp; Events and ASK
              Trade &amp; Exhibitions Pvt. Ltd.,
              combining international exhibition
              experience with industry connections
              across Bangladesh and South Asia.
            </p>
          </div>

          <Link
            href={event.cta.bookStand}
            className="group inline-flex min-h-11 w-fit shrink-0 items-center justify-center gap-2 rounded-lg bg-brand-primary px-5 py-3 font-heading text-[12px] font-bold text-white shadow-[0_9px_25px_rgba(186,29,130,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#981568]"
          >
            Book Exhibition Stand

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              <ArrowIcon />
            </span>
          </Link>
        </motion.header>

        {/* ======================================
            ORGANISER PROFILES
        ======================================= */}

        <section
          aria-label="Joint organiser profiles"
          className="pt-7 sm:pt-9"
        >
          <motion.div
            {...scrollReveal}
            variants={stagger}
            className="grid items-stretch gap-5 lg:grid-cols-2"
          >
            {ORGANISERS_DATA.map(
              (organisation, index) => (
                <OrganiserCard
                  key={organisation.name}
                  organisation={organisation}
                  index={index}
                  reducedMotion={reducedMotion}
                />
              )
            )}
          </motion.div>
        </section>

        {/* ======================================
            SECRETARIAT CONTACT DIRECTORY
        ======================================= */}

        <section
          aria-labelledby="organiser-contact-heading"
          className="mt-12 sm:mt-16"
        >
          <motion.div
            {...scrollReveal}
            variants={reveal}
            className="overflow-hidden rounded-2xl border border-[#DFE3EA] bg-white shadow-[0_10px_38px_rgba(5,7,9,0.035)]"
          >
            <div className="flex flex-col gap-3 border-b border-[#E6E8EE] px-5 py-6 sm:flex-row sm:items-end sm:justify-between sm:px-7">
              <div>
                <Eyebrow>Official Contact Directory</Eyebrow>

                <h2
                  id="organiser-contact-heading"
                  className="mt-3 font-heading text-[21px] font-extrabold tracking-[-0.035em] text-[#171B24] sm:text-[25px]"
                >
                  Reach the{" "}
                  <span className="text-[#981568]">
                    Organising Secretariat
                  </span>
                </h2>
              </div>

              <p className="max-w-[330px] text-[12px] leading-[1.8] text-[#454F5D]">
                Contact the India and Bangladesh
                desks for exhibition bookings,
                partnerships and participation
                enquiries.
              </p>
            </div>

            <motion.div
              variants={stagger}
              initial={reducedMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.12 }}
              className="grid items-stretch gap-4 p-4 md:grid-cols-3 sm:p-6"
            >
              {CONTACT_DESKS.map((desk, index) => (
                <ContactDeskCard
                  key={desk.company}
                  desk={desk}
                  index={index}
                  reducedMotion={reducedMotion}
                />
              ))}

              {/* Stand booking card */}
              <motion.article
                variants={reveal}
                whileHover={
                  reducedMotion
                    ? undefined
                    : { y: -4 }
                }
                transition={{
                  duration: 0.3,
                  ease: EASE,
                }}
                className="relative flex min-h-[245px] flex-col overflow-hidden rounded-xl border border-[#29232F] bg-[#17131D] p-5 text-white"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-12 -top-12 size-48 rounded-full bg-brand-primary/25 blur-[65px]"
                />

                <div className="relative z-10">
                  <span className="font-heading text-[10px] font-bold uppercase tracking-[0.14em] text-[#F2A8D8]">
                    Exhibitor Enquiries
                  </span>

                  <h3 className="mt-5 font-heading text-[19px] font-extrabold leading-[1.3] tracking-[-0.035em] text-[#F5F0F4]">
                    Secure Your Exhibition Presence
                  </h3>

                  <p className="mt-3 text-[12px] leading-[1.8] text-[#E2D8E1]">
                    Enquire about stand space and
                    exhibition participation at
                    Bangladesh Buildcon 2027.
                  </p>
                </div>

                <div className="relative z-10 mt-auto space-y-2 pt-5">
                  <Link
                    href={event.cta.bookStand}
                    className="group flex min-h-11 items-center justify-center gap-2 rounded-lg bg-brand-primary px-4 text-[12px] font-bold text-white transition-colors hover:bg-[#A51974]"
                  >
                    Book Stand Space

                    <span className="transition-transform group-hover:translate-x-1">
                      <ArrowIcon />
                    </span>
                  </Link>

                  <Link
                    href="/contact"
                    className="flex min-h-11 items-center justify-center rounded-lg border border-white/25 bg-white/[0.07] px-4 text-[12px] font-bold text-white transition-colors hover:bg-white/[0.13]"
                  >
                    General Helpdesk
                  </Link>
                </div>
              </motion.article>
            </motion.div>
          </motion.div>
        </section>

        {/* ======================================
            BOTTOM BOOKING RIBBON
        ======================================= */}

        <motion.div
          {...scrollReveal}
          variants={reveal}
          className="mt-6 flex flex-col gap-4 rounded-xl border border-brand-primary/20 bg-[#F5EDF3] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6"
        >
          <div className="flex items-start gap-3">
            <span className="mt-1.5 size-2 shrink-0 rounded-full bg-brand-primary" />

            <p className="text-[12px] font-semibold leading-[1.8] text-[#333B48]">
              Official joint representation in India
              and Bangladesh for the 2027 exhibition
              at {event.venue.name}.
            </p>
          </div>

          <Link
            href={event.cta.bookStand}
            className="group inline-flex min-h-10 w-fit shrink-0 items-center justify-center gap-2 rounded-lg border border-brand-primary bg-white px-5 py-2.5 font-heading text-[11px] font-bold text-[#981568] transition-all duration-300 hover:bg-brand-primary hover:text-white"
          >
            Enquire for Space

            <span className="transition-transform group-hover:translate-x-1">
              <ArrowIcon />
            </span>
          </Link>
        </motion.div>
      </Container>
    </div>
  );
}
