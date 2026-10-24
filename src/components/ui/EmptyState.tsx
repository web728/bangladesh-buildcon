
"use client";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { event } from "@/config/event";

/* ==========================================
   ANIMATION
========================================== */

const EASE = [0.22, 1, 0.36, 1] as const;

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.05,
    },
  },
};

const reveal: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: EASE,
    },
  },
};

/* ==========================================
   ICONS
========================================== */

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-[16px] shrink-0"
      aria-hidden="true"
    >
      <path d="M3 5a2 2 0 0 1 2-2h3.28a1 1 0 0 1 .948.684l1.498 4.493a1 1 0 0 1-.502 1.21l-2.257 1.13a11.042 11.042 0 0 0 5.516 5.516l1.13-2.257a1 1 0 0 1 1.21-.502l4.493 1.498a1 1 0 0 1 .684.949V19a2 2 0 0 1-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-[16px] shrink-0"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
      />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-[15px] shrink-0"
      aria-hidden="true"
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

/* ==========================================
   DECORATIVE ANIMATED SVG
========================================== */

function EmptyStateDecoration({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  return (
    <svg
      viewBox="0 0 650 220"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      className="pointer-events-none absolute -right-16 -top-10 h-[210px] w-[480px] opacity-[0.12] sm:w-[600px]"
    >
      <motion.path
        d="M15 170C165 40 255 210 410 92S585 25 690 -25"
        stroke="#BA1D82"
        strokeWidth="1.8"
        strokeLinecap="round"
        initial={
          reducedMotion
            ? false
            : { pathLength: 0 }
        }
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 1.8,
          ease: EASE,
        }}
      />

      <motion.path
        d="M35 205C190 85 280 240 435 130S610 65 715 10"
        stroke="#304090"
        strokeOpacity="0.65"
        strokeWidth="1"
        strokeLinecap="round"
        initial={
          reducedMotion
            ? false
            : { pathLength: 0 }
        }
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 2.1,
          delay: 0.12,
          ease: EASE,
        }}
      />
    </svg>
  );
}

/* ==========================================
   CONTACT PERSON
========================================== */

type ContactPerson =
  (typeof event.contact.people)[number];

function ContactPersonRow({
  person,
  index,
  reducedMotion,
}: {
  person: ContactPerson;
  index: number;
  reducedMotion: boolean;
}) {
  return (
    <motion.article
      variants={reveal}
      whileHover={
        reducedMotion ? undefined : { y: -3 }
      }
      transition={{
        duration: 0.25,
        ease: EASE,
      }}
      className="group relative flex min-w-0 items-start gap-3 px-4 py-4 transition-colors duration-300 hover:bg-[#FCF8FB] sm:px-5"
    >
      {/* Number */}
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#F7EAF2] font-heading text-[11px] font-bold tabular-nums text-brand-primary transition-colors duration-300 group-hover:bg-brand-primary group-hover:text-white">
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Contact details */}
      <div className="min-w-0 flex-1">
        <h5 className="font-heading text-[13px] font-bold leading-[1.45] tracking-[-0.02em] text-[#18141D] sm:text-[14px]">
          {person.name}
        </h5>

        {/* Phone */}
        <a
          href={`tel:${person.phoneHref}`}
          aria-label={`Call ${person.name}`}
          className="group/link mt-2 flex w-fit max-w-full items-start gap-2 text-[12px] font-medium leading-[1.6] tracking-normal text-[#655E69] transition-colors duration-200 hover:text-brand-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
        >
          <span className="mt-0.5 text-brand-primary">
            <PhoneIcon />
          </span>

          <span className="min-w-0 tabular-nums">
            {person.phone}
          </span>
        </a>

        {/* Email */}
        <a
          href={`mailto:${person.email}`}
          aria-label={`Email ${person.name}`}
          className="group/link mt-1.5 flex w-fit max-w-full items-start gap-2 text-[12px] font-medium leading-[1.6] tracking-normal text-[#655E69] transition-colors duration-200 hover:text-brand-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
        >
          <span className="mt-0.5 text-brand-primary">
            <MailIcon />
          </span>

          <span className="min-w-0 break-all">
            {person.email}
          </span>
        </a>
      </div>

      {/* Hover arrow */}
      <span className="absolute right-3 top-4 text-brand-primary opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-x-0.5 group-hover:opacity-100">
        <ArrowIcon />
      </span>
    </motion.article>
  );
}

/* ==========================================
   MAIN EMPTY STATE
========================================== */

type EmptyStateProps = {
  title: string;
  body: string;
};

export function EmptyState({
  title,
  body,
}: EmptyStateProps) {
  const reducedMotion = !!useReducedMotion();

  return (
    <motion.section
      variants={stagger}
      initial={reducedMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.12,
      }}
      className="relative isolate overflow-hidden rounded-2xl border border-[#E8E2EA] bg-white px-5 py-7 text-center shadow-[0_10px_35px_rgba(20,12,25,0.045)] sm:px-8 sm:py-9"
    >
      {/* Background decoration */}
      <EmptyStateDecoration
        reducedMotion={reducedMotion}
      />

      {/* Accent */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-[3px] w-20 -translate-x-1/2 bg-brand-primary"
      />

      {/* Status badge */}
      <motion.div
        variants={reveal}
        className="relative z-10 inline-flex items-center gap-2 rounded-full border border-brand-primary/15 bg-[#F9EDF5] px-3 py-1.5"
      >
        <span className="size-1.5 rounded-full bg-brand-primary motion-safe:animate-pulse" />

        <span className="font-heading text-[10px] font-bold uppercase leading-[1.5] tracking-[0.09em] text-brand-primary">
          Event Assistance
        </span>
      </motion.div>

      {/* Heading */}
      <motion.h3
        variants={reveal}
        className="relative z-10 mx-auto mt-4 max-w-xl font-heading text-[clamp(1.2rem,2.5vw,1.65rem)] font-extrabold leading-[1.25] tracking-[-0.035em] text-[#17141C]"
      >
        {title}
      </motion.h3>

      {/* Description */}
      <motion.p
        variants={reveal}
        className="relative z-10 mx-auto mt-2 max-w-lg text-[13px] leading-[1.75] tracking-normal text-[#6F6874] sm:text-[14px]"
      >
        {body}
      </motion.p>

      {/* Contact directory */}
      <motion.div
        variants={reveal}
        className="relative z-10 mx-auto mt-6 max-w-5xl overflow-hidden rounded-xl border border-[#EAE4EC] bg-[#FAF9FB] text-left"
      >
        {/* Directory heading */}
        <div className="flex items-center justify-between gap-3 border-b border-[#EAE4EC] px-4 py-3 sm:px-5">
          <div className="flex items-center gap-2.5">
            <span className="h-[2px] w-5 bg-brand-primary" />

            <h4 className="font-heading text-[11px] font-bold uppercase leading-[1.5] tracking-[0.1em] text-[#514855]">
              Event Contacts
            </h4>
          </div>

       
        </div>

        {/* Three responsive contacts */}
        <div className="grid grid-cols-1 divide-y divide-[#EAE4EC] md:grid-cols-3 md:divide-x md:divide-y-0">
          {event.contact.people.map((person, index) => (
            <ContactPersonRow
              key={person.id}
              person={person}
              index={index}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}
