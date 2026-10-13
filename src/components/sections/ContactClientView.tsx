
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
import { ContactForm } from "@/components/forms/ContactForm";

/* ==========================================
   MOTION CONFIGURATION
========================================== */

const EASE = [0.22, 1, 0.36, 1] as const;

const revealVariants: Variants = {
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

const staggerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

/* ==========================================
   CONTACT DATA
========================================== */

const CONTACT_PERSONS = [
  {
    company: "Futurex Trade Fair & Events",
    location: "New Delhi, India",
    person: event.contact.futurex,
  },
  {
    company: "ASK Trade & Exhibitions Pvt. Ltd.",
    location: "Dhaka, Bangladesh",
    person: event.contact.askTrade,
  },
] as const;

/* ==========================================
   SVG ICONS
========================================== */

type IconName =
  | "arrow"
  | "external"
  | "calendar"
  | "location"
  | "phone"
  | "mail"
  | "message"
  | "building"
  | "check";

function Icon({
  name,
  className = "size-5",
}: {
  name: IconName;
  className?: string;
}) {
  const paths: Record<IconName, ReactNode> = {
    arrow: (
      <path d="M5 12h14m-6-6 6 6-6 6" />
    ),
    external: (
      <path d="M7 17 17 7M8 7h9v9" />
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
    phone: (
      <path d="M3 5a2 2 0 0 1 2-2h3.28a1 1 0 0 1 .948.684l1.498 4.493a1 1 0 0 1-.502 1.21l-2.257 1.13a11.042 11.042 0 0 0 5.516 5.516l1.13-2.257a1 1 0 0 1 1.21-.502l4.493 1.498a1 1 0 0 1 .684.949V19a2 2 0 0 1-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    message: (
      <>
        <path d="M20 11.5a8.5 8.5 0 0 1-8.5 8.5 9 9 0 0 1-4-.9L3 21l1.9-4.5a9 9 0 0 1-.9-4A8.5 8.5 0 1 1 20 11.5Z" />
        <path d="M8 11h8M8 14h5" />
      </>
    ),
    building: (
      <>
        <path d="M3 21h18M5 21V5h10v16M15 10h5v11" />
        <path d="M8 9h4M8 13h4M8 17h4" />
      </>
    ),
    check: (
      <path d="m5 12 4 4L19 6" />
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
   ANIMATED CONTACT SVG

   Architecture + communication network.
   No gradients.
========================================== */

function ContactIllustration({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  return (
    <svg
      viewBox="0 0 480 310"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-auto w-full max-w-[480px]"
      aria-hidden="true"
    >
      {/* Ground */}
      <path
        d="M20 278H460"
        stroke="#DBCBD8"
        strokeWidth="1.5"
      />

      <path
        d="M30 293H450"
        stroke="#EAE0E9"
        strokeDasharray="5 8"
      />

      {/* Main building */}
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
          d="M87 278V106H254V278"
          stroke="#BA1D82"
          strokeWidth="2.3"
        />

        <path
          d="M87 106L171 59L254 106"
          stroke="#BA1D82"
          strokeWidth="2.3"
        />

        <path
          d="M103 278V119H238V278"
          stroke="#BA1D82"
          strokeOpacity="0.4"
        />

        <path
          d="M103 119L171 82L238 119"
          stroke="#BA1D82"
          strokeOpacity="0.4"
        />

        <path
          d="M87 157H254M87 205H254M87 248H254"
          stroke="#D5A9C8"
        />

        {[116, 164, 212].map((x) =>
          [132, 180, 223].map((y) => (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width="19"
              height="19"
              stroke="#BA1D82"
              strokeOpacity="0.55"
            />
          ))
        )}
      </motion.g>

      {/* Secondary office structure */}
      <motion.g
        initial={
          reducedMotion
            ? false
            : { opacity: 0, x: 15 }
        }
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.85,
          delay: 0.18,
          ease: EASE,
        }}
      >
        <path
          d="M277 278V145H395V278"
          stroke="#304090"
          strokeWidth="2"
        />

        <path
          d="M277 145L335 117L395 145"
          stroke="#304090"
          strokeWidth="2"
        />

        <path
          d="M290 173H381M290 210H381M290 245H381"
          stroke="#304090"
          strokeOpacity="0.4"
        />

        <path
          d="M320 278v-41h31v41"
          stroke="#304090"
          strokeOpacity="0.65"
        />
      </motion.g>

      {/* Communication route */}
      <motion.path
        d="M172 59C216 5 309 8 345 66"
        stroke="#BA1D82"
        strokeWidth="1.8"
        strokeDasharray="5 7"
        strokeLinecap="round"
        initial={
          reducedMotion
            ? false
            : { pathLength: 0 }
        }
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: reducedMotion ? 0 : 1.8,
          ease: EASE,
        }}
      />

      {/* Left communication orbit */}
      <motion.g
        animate={
          reducedMotion
            ? undefined
            : { rotate: 360 }
        }
        style={{
          transformOrigin: "59px 84px",
        }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <circle
          cx="59"
          cy="84"
          r="29"
          stroke="#BA1D82"
          strokeOpacity="0.45"
          strokeDasharray="5 8"
        />

        <circle
          cx="59"
          cy="55"
          r="4"
          fill="#BA1D82"
        />
      </motion.g>

      {/* Floating communication symbol */}
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
        <rect
          x="334"
          y="45"
          width="87"
          height="61"
          rx="11"
          fill="#FCF6FA"
          stroke="#BA1D82"
          strokeWidth="2"
        />

        <path
          d="M348 65h57M348 76h42M348 87h30"
          stroke="#BA1D82"
          strokeOpacity="0.6"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <path
          d="M350 106l14 12v-12"
          fill="#FCF6FA"
          stroke="#BA1D82"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </motion.g>

      {/* Animated nodes */}
      <motion.circle
        cx="171"
        cy="59"
        r="5"
        fill="#BA1D82"
        animate={
          reducedMotion
            ? undefined
            : {
                opacity: [0.45, 1, 0.45],
                scale: [1, 1.25, 1],
              }
        }
        style={{
          transformOrigin: "171px 59px",
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Technical dimension line */}
      <path
        d="M65 106H76M65 278H76M70 106v172"
        stroke="#BA1D82"
        strokeOpacity="0.4"
        strokeDasharray="4 6"
      />
    </svg>
  );
}

/* ==========================================
   SHARED EYEBROW
========================================== */

function Eyebrow({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        aria-hidden="true"
        className="h-[2px] w-7 shrink-0 bg-brand-primary"
      />

      <span
        className={
          light
            ? "font-heading text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#EBA9D5]"
            : "font-heading text-[10px] font-extrabold uppercase tracking-[0.15em] text-brand-primary"
        }
      >
        {children}
      </span>
    </div>
  );
}

/* ==========================================
   DIRECT CONTACT CARD
========================================== */

function ContactCard({
  item,
  index,
  reducedMotion,
}: {
  item: (typeof CONTACT_PERSONS)[number];
  index: number;
  reducedMotion: boolean;
}) {
  const phoneHref = item.person.phone.replace(
    /[^0-9+]/g,
    ""
  );

  return (
    <motion.article
      variants={revealVariants}
      whileHover={
        reducedMotion
          ? undefined
          : { y: -5 }
      }
      className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-[#E9E4EB] bg-white p-5 shadow-[0_4px_18px_rgba(5,7,9,0.025)] transition-[border-color,box-shadow] duration-300 hover:border-brand-primary/35 hover:shadow-[0_14px_35px_rgba(5,7,9,0.07)] sm:p-6"
    >
      {/* Animated accent */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-brand-primary transition-transform duration-300 group-hover:scale-x-100"
      />

      {/* Organiser header */}
      <div className="flex items-start justify-between gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-brand-primary/15 bg-[#F9ECF5] text-brand-primary transition-colors duration-300 group-hover:bg-brand-primary group-hover:text-white">
          <Icon name="building" className="size-5" />
        </span>

        <span className="font-heading text-[11px] font-bold tabular-nums text-[#AAA4AE]">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <span className="mt-4 font-heading text-[10px] font-bold uppercase tracking-[0.12em] text-brand-primary">
        Joint Organiser
      </span>

      <h3 className="mt-2 font-heading text-[16px] font-extrabold leading-[1.45] tracking-[-0.025em] text-brand-dark">
        {item.company}
      </h3>

      <p className="mt-2 inline-flex items-center gap-2 text-[12px] font-medium text-[#77717D]">
        <Icon
          name="location"
          className="size-3.5 text-brand-primary"
        />

        {item.location}
      </p>

      {/* Contact details */}
      <div className="mt-5 space-y-2.5 border-t border-[#F0EBF0] pt-4">
        <a
          href={`tel:${phoneHref}`}
          className="group/link flex min-h-11 min-w-0 items-center gap-3 rounded-lg border border-[#EAE5EB] bg-[#FCFAFC] px-3.5 py-2.5 transition-colors duration-300 hover:border-brand-primary/30 hover:bg-[#FBF2F8]"
        >
          <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-[#F9ECF5] text-brand-primary">
            <Icon name="phone" className="size-4" />
          </span>

          <span className="min-w-0 flex-1 break-words font-heading text-[12px] font-bold tabular-nums text-[#514A55] transition-colors group-hover/link:text-brand-primary">
            {item.person.phone}
          </span>

          <span className="shrink-0 text-brand-primary">
            <Icon name="external" className="size-3.5" />
          </span>
        </a>

        <a
          href={`mailto:${item.person.email}`}
          className="group/link flex min-h-11 min-w-0 items-center gap-3 rounded-lg border border-[#EAE5EB] bg-[#FCFAFC] px-3.5 py-2.5 transition-colors duration-300 hover:border-brand-primary/30 hover:bg-[#FBF2F8]"
        >
          <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-[#F9ECF5] text-brand-primary">
            <Icon name="mail" className="size-4" />
          </span>

          <span className="min-w-0 flex-1 break-all font-heading text-[12px] font-bold text-[#514A55] transition-colors group-hover/link:text-brand-primary">
            {item.person.email}
          </span>

          <span className="shrink-0 text-brand-primary">
            <Icon name="external" className="size-3.5" />
          </span>
        </a>
      </div>

      <div className="mt-4 flex items-center gap-2 text-[10px] font-medium text-[#89818C]">
        <span className="size-1.5 rounded-full bg-brand-primary" />
        Exhibition enquiries
      </div>
    </motion.article>
  );
}

/* ==========================================
   MAIN CONTACT PAGE
========================================== */

export function ContactClientView() {
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
    <section
      aria-labelledby="contact-directory-heading"
      className="relative overflow-hidden bg-[#F8F8FA] py-12 text-brand-dark selection:bg-brand-primary selection:text-white sm:py-16"
    >
      <Container>
        {/* ===================================
            01. PREMIUM CONTACT INTRO
        ==================================== */}

        <motion.header
          {...scrollProps}
          variants={revealVariants}
          className="grid items-center gap-6 overflow-hidden rounded-2xl border border-[#E9E4EB] bg-white p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:p-8"
        >
          {/* Intro */}
          <div className="min-w-0">
            <Eyebrow>Contact Directory</Eyebrow>

            <h2
              id="contact-directory-heading"
              className="mt-4 max-w-[650px] font-heading text-[clamp(1.75rem,3vw,2.65rem)] font-extrabold leading-[1.15] tracking-[-0.045em] text-brand-dark"
            >
              Connect with Our{" "}
              <span className="text-brand-primary">
                Organising Team.
              </span>
            </h2>

            <p className="mt-4 max-w-[600px] text-[13px] leading-[1.85] text-[#66616C] sm:text-[14px]">
              Have a question about exhibition
              participation, sponsorship
              opportunities, stand space or
              general event information?
              Contact the Bangladesh Buildcon
              organising team.
            </p>

            {/* Info */}
            <div className="mt-5 space-y-3">
              <div className="flex items-start gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#F9ECF5] text-brand-primary">
                  <Icon
                    name="calendar"
                    className="size-4"
                  />
                </span>

                <div className="min-w-0">
                  <p className="font-heading text-[10px] font-bold uppercase tracking-[0.07em] text-[#89828D]">
                    Event Dates
                  </p>

                  <p className="mt-1 font-heading text-[12px] font-bold text-brand-dark sm:text-[13px]">
                    {event.dates.display}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#F9ECF5] text-brand-primary">
                  <Icon
                    name="location"
                    className="size-4"
                  />
                </span>

                <div className="min-w-0">
                  <p className="font-heading text-[10px] font-bold uppercase tracking-[0.07em] text-[#89828D]">
                    Exhibition Venue
                  </p>

                  <p className="mt-1 font-heading text-[12px] font-bold leading-[1.6] text-brand-dark sm:text-[13px]">
                    {event.venue.fullLocation}
                  </p>
                </div>
              </div>
            </div>

            <a
              href="#contact-form"
              className="group mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-brand-primary px-5 py-3 font-heading text-[12px] font-bold text-white transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-brand-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary motion-reduce:transform-none"
            >
              Send an Enquiry

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <Icon name="arrow" className="size-4" />
              </span>
            </a>
          </div>

          {/* Animated illustration */}
          <div className="relative flex min-w-0 items-center justify-center overflow-hidden rounded-xl border border-[#F0E7EE] bg-[#FCF8FB] p-4 sm:p-6">
            <ContactIllustration
              reducedMotion={reducedMotion}
            />

            <span className="absolute bottom-3 right-4 font-heading text-[9px] font-bold uppercase tracking-[0.11em] text-brand-primary/70">
              Let's Connect
            </span>
          </div>
        </motion.header>

        {/* ===================================
            02. CONTACT FORM
        ==================================== */}

        <motion.section
          id="contact-form"
          {...scrollProps}
          variants={revealVariants}
          aria-labelledby="contact-form-heading"
          className="mx-auto mt-10 max-w-[1000px] scroll-mt-24 overflow-hidden rounded-2xl border border-[#E9E4EB] bg-white shadow-[0_14px_42px_rgba(5,7,9,0.045)] sm:mt-12"
        >
          {/* Solid pink top accent */}
          <div
            aria-hidden="true"
            className="h-[3px] bg-brand-primary"
          />

          {/* Form heading */}
          <div className="border-b border-[#ECE7ED] bg-[#FCFAFC] p-5 sm:p-7 lg:px-9">
            <div className="flex items-start gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-brand-primary/15 bg-[#F9ECF5] text-brand-primary">
                <Icon
                  name="message"
                  className="size-6"
                />
              </span>

              <div className="min-w-0">
                <Eyebrow>
                  Exhibition Enquiries
                </Eyebrow>

                <h2
                  id="contact-form-heading"
                  className="mt-2 font-heading text-[clamp(1.4rem,2.4vw,1.95rem)] font-extrabold leading-[1.25] tracking-[-0.035em] text-brand-dark"
                >
                  Send Us a{" "}
                  <span className="text-brand-primary">
                    Message
                  </span>
                </h2>

                <p className="mt-2 max-w-[650px] text-[12px] leading-[1.8] text-[#66616C] sm:text-[13px]">
                  Share your enquiry below.
                  The organising team can review
                  your request and reply using
                  the contact information provided.
                </p>
              </div>
            </div>
          </div>

          {/* Existing working form — untouched */}
          <div className="p-5 sm:p-7 lg:px-9 lg:py-8">
            <ContactForm />
          </div>
        </motion.section>

        {/* ===================================
            03. DIRECT ORGANISER CONTACTS
        ==================================== */}

        <section
          aria-labelledby="direct-contact-heading"
          className="mt-12 sm:mt-16"
        >
          <motion.div
            {...scrollProps}
            variants={revealVariants}
            className="flex flex-col gap-4 border-b border-[#E9E4EB] pb-6 sm:flex-row sm:items-end sm:justify-between"
          >
            <div className="max-w-[690px]">
              <Eyebrow>Direct Assistance</Eyebrow>

              <h2
                id="direct-contact-heading"
                className="mt-3 font-heading text-[clamp(1.45rem,2.5vw,2rem)] font-extrabold leading-[1.2] tracking-[-0.04em] text-brand-dark"
              >
                Speak Directly with Our{" "}
                <span className="text-brand-primary">
                  Organisers
                </span>
              </h2>
            </div>

            <p className="max-w-[360px] text-[12px] leading-[1.85] text-[#66616C] sm:text-[13px]">
              Contact either organising office
              for exhibition-related enquiries.
            </p>
          </motion.div>

          <motion.div
            variants={staggerVariants}
            initial={
              reducedMotion ? false : "hidden"
            }
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
            className="mt-6 grid items-stretch gap-4 md:grid-cols-2"
          >
            {CONTACT_PERSONS.map((item, index) => (
              <ContactCard
                key={item.company}
                item={item}
                index={index}
                reducedMotion={reducedMotion}
              />
            ))}
          </motion.div>
        </section>

        {/* ===================================
            04. FINAL CONTACT CTA
        ==================================== */}

        <motion.section
          {...scrollProps}
          variants={revealVariants}
          aria-labelledby="contact-cta-heading"
          className="relative mt-12 overflow-hidden rounded-2xl bg-[#18151C] p-6 text-white sm:mt-16 sm:p-8"
        >
          {/* Architectural detail */}
          <svg
            viewBox="0 0 300 130"
            fill="none"
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 right-2 h-[130px] w-[300px] opacity-20 sm:right-8"
          >
            <path
              d="M12 125H290M24 125V52h75v73M112 125V25h95v100M221 125V68h59v57"
              stroke="#BA1D82"
              strokeWidth="2"
            />

            <path
              d="M24 78h75M24 101h75M112 52h95M112 80h95M221 96h59"
              stroke="#FFFFFF"
              strokeOpacity="0.6"
            />

            <motion.circle
              cx="159"
              cy="25"
              r="5"
              fill="#BA1D82"
              animate={
                reducedMotion
                  ? undefined
                  : {
                      opacity: [0.4, 1, 0.4],
                    }
              }
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </svg>

          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-[650px]">
              <Eyebrow light>
                Exhibition Participation
              </Eyebrow>

              <h2
                id="contact-cta-heading"
                className="mt-3 font-heading text-[clamp(1.35rem,2.3vw,1.85rem)] font-extrabold leading-[1.3] tracking-[-0.035em]"
              >
                Ready to Join{" "}
                <span className="text-[#EBA9D5]">
                  Bangladesh Buildcon?
                </span>
              </h2>

              <p className="mt-3 text-[12px] leading-[1.8] text-white/60 sm:text-[13px]">
                {event.dates.display} ·{" "}
                {event.venue.name},{" "}
                {event.venue.city}. Explore
                exhibiting or visitor
                registration options.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <Link
                href={event.cta.bookStand}
                className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-brand-primary px-5 py-3 font-heading text-[12px] font-bold text-white transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-brand-primary-dark motion-reduce:transform-none"
              >
                Book Stand Space

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <Icon name="arrow" className="size-4" />
                </span>
              </Link>

              <Link
                href={event.cta.registerVisit}
                className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/[0.07] px-5 py-3 font-heading text-[12px] font-bold text-white transition-colors duration-300 hover:border-white/40 hover:bg-white/[0.12]"
              >
                Visitor Registration

                <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <Icon name="external" className="size-4" />
                </span>
              </Link>
            </div>
          </div>
        </motion.section>
      </Container>
    </section>
  );
}
