
"use client";

import Link from "next/link";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/forms/ContactForm";

const EASE = [0.22, 1, 0.36, 1] as const;

const staggerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.06,
    },
  },
};

const revealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 26,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: EASE,
    },
  },
};

const CONTACT_PERSONS = [
  {
    company: "Futurex Group",
    location: "New Delhi",
    person: event.contact.futurex,
  },
  {
    company: "ASK Trade & Exhibitions Pvt. Ltd.",
    location: "Dhaka",
    person: event.contact.askTrade,
  },
];

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

function CalendarIcon() {
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
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M7 3v4M17 3v4M3 10h18" />
    </svg>
  );
}

function LocationIcon() {
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
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
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
      className="size-5"
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
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-6"
      aria-hidden="true"
    >
      <path d="M20 11.5a8.5 8.5 0 0 1-8.5 8.5 9 9 0 0 1-4-.9L3 21l1.9-4.5a9 9 0 0 1-.9-4A8.5 8.5 0 1 1 20 11.5Z" />
      <path d="M8 11h8M8 14h5" />
    </svg>
  );
}

/* ============================================
   PREMIUM DIRECT CONTACT CARD
============================================ */

function ContactCard({
  item,
  index,
  reducedMotion,
}: {
  item: (typeof CONTACT_PERSONS)[number];
  index: number;
  reducedMotion: boolean;
}) {
  const cleanPhone = item.person.phone.replace(
    /[^0-9+]/g,
    ""
  );

  return (
    <motion.article
      variants={revealVariants}
      initial="rest"
      whileHover={reducedMotion ? undefined : "hover"}
      className="h-full min-w-0"
    >
      <motion.div
        variants={{
          rest: {
            y: 0,
            boxShadow: "0 8px 26px rgba(5,7,9,0.04)",
          },
          hover: {
            y: -7,
            boxShadow: "0 24px 55px rgba(5,7,9,0.12)",
          },
        }}
        transition={{ duration: 0.35, ease: EASE }}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-brand-dark/10 bg-white p-6 transition-colors duration-300 hover:border-brand-primary/40 sm:p-7"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-20 size-52 rounded-full bg-brand-primary/[0.07] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        />

        <div className="relative z-10 flex items-start justify-between gap-3">
          <div className="flex size-12 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary transition-all duration-300 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-brand-primary group-hover:text-white">
            <PhoneIcon />
          </div>

          <span className="font-heading text-[12px] font-bold tracking-[0.12em] text-brand-dark/25">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

      

        <div className="relative z-10 mt-6 space-y-3 border-t border-brand-dark/10 pt-5">
          <a
            href={`tel:${cleanPhone}`}
            className="group/link flex min-w-0 items-center gap-3 rounded-xl border border-brand-dark/10 bg-[#FAFAFC] px-4 py-3 transition-all duration-300 hover:border-brand-primary/30 hover:bg-brand-primary/[0.04] focus-visible:outline-2 focus-visible:outline-brand-primary"
          >
            <span className="shrink-0 text-brand-primary">
              <PhoneIcon />
            </span>

            <span className="min-w-0 break-words text-[12px] font-semibold tabular-nums text-[#4A5260] transition-colors group-hover/link:text-brand-primary sm:text-[13px]">
              {item.person.phone}
            </span>
          </a>

          <a
            href={`mailto:${item.person.email}`}
            className="group/link flex min-w-0 items-center gap-3 rounded-xl border border-brand-dark/10 bg-[#FAFAFC] px-4 py-3 transition-all duration-300 hover:border-brand-primary/30 hover:bg-brand-primary/[0.04] focus-visible:outline-2 focus-visible:outline-brand-primary"
          >
            <span className="shrink-0 text-brand-primary">
              <MailIcon />
            </span>

            <span className="min-w-0 break-all text-[12px] font-semibold text-[#4A5260] transition-colors group-hover/link:text-brand-primary sm:text-[13px]">
              {item.person.email}
            </span>
          </a>
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-brand-primary transition-transform duration-500 group-hover:scale-x-100"
        />
      </motion.div>
    </motion.article>
  );
}

/* ============================================
   MAIN CONTACT VIEW
============================================ */

export function ContactClientView() {
  const reducedMotion = !!useReducedMotion();

  return (
    <section
      aria-labelledby="contact-directory-heading"
      className="relative isolate overflow-hidden bg-[#FAFAFC] py-16 text-brand-dark sm:py-20 lg:py-24"
    >
      {/* Background magenta ambient light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_85%_0%,rgba(186,29,130,0.065),transparent_45%)]"
      />

      {/* Subtle architectural grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(5,7,9,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(5,7,9,0.025)_1px,transparent_1px)] bg-[size:76px_76px]"
      />

      <Container className="relative z-10">
        {/* SECTION HEADER */}
        <motion.div
          variants={staggerVariants}
          initial={reducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col gap-6 border-b border-brand-dark/10 pb-9 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-[750px]">
            <motion.div
              variants={revealVariants}
              className="mb-5 flex items-center gap-3"
            >
              <span className="h-[2px] w-9 bg-brand-primary" />

              <span className="font-heading text-[11px] font-bold uppercase tracking-[0.17em] text-brand-primary">
                Contact Directory
              </span>
            </motion.div>

            <motion.h2
              id="contact-directory-heading"
              variants={revealVariants}
              className="font-heading text-[clamp(2rem,3.4vw,2.95rem)] leading-[1.16] font-extrabold tracking-[-0.045em]"
            >
              Connect with Our{" "}
              <span className="text-brand-primary">
                Team
              </span>
            </motion.h2>

            <motion.p
              variants={revealVariants}
              className="mt-5 max-w-[620px] text-[14px] leading-[1.85] text-[#626A77] sm:text-[15px]"
            >
              For exhibition space bookings, sponsorship
              opportunities, international participation,
              or general event enquiries.
            </motion.p>
          </div>

          {/* Schedule card */}
          <motion.div
            variants={revealVariants}
            className="w-full rounded-xl border border-brand-dark/10 bg-white p-5 shadow-[0_8px_28px_rgba(5,7,9,0.04)] sm:w-auto sm:min-w-[285px]"
          >
            <div className="mb-3 flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
                <CalendarIcon />
              </span>

              <span className="font-heading text-[11px] font-bold uppercase tracking-[0.12em] text-[#8B929E]">
                Event Schedule
              </span>
            </div>

            <p className="font-heading text-[14px] font-extrabold text-brand-dark">
              {event.dates.display}
            </p>

            <p className="mt-1.5 text-[12px] leading-relaxed text-[#727A87]">
              {event.venue.fullLocation}
            </p>
          </motion.div>
        </motion.div>

        {/* MAIN CONTACT FORM */}
        <motion.div
          initial={
            reducedMotion
              ? false
              : {
                  opacity: 0,
                  y: 34,
                  scale: 0.985,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{
            duration: 0.85,
            ease: EASE,
          }}
          className="relative mx-auto mt-12 max-w-[940px] overflow-hidden rounded-[24px] border border-brand-dark/10 bg-white shadow-[0_24px_75px_rgba(5,7,9,0.075)] sm:mt-14 sm:rounded-[28px]"
        >
          {/* Top gradient accent */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-brand-primary via-[#E75CB5] to-brand-primary"
          />

          {/* Form header */}
          <div className="relative overflow-hidden border-b border-brand-dark/10 bg-[#FCFAFD] px-6 pb-7 pt-8 sm:px-10 sm:pb-9 sm:pt-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-28 size-72 rounded-full bg-brand-primary/[0.06] blur-[85px]"
            />

            <div className="relative z-10 flex items-start gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                <MessageIcon />
              </div>

              <div className="min-w-0">
                <span className="font-heading text-[10px] font-bold uppercase tracking-[0.15em] text-brand-primary">
                  Exhibition Enquiries
                </span>

                <h3 className="mt-2 font-heading text-[clamp(1.45rem,2.6vw,2rem)] font-extrabold tracking-[-0.04em] text-brand-dark">
                  Send Us a Message
                </h3>

                <p className="mt-3 max-w-[620px] text-[13px] leading-[1.8] text-[#69717E] sm:text-[14px]">
                  Share your enquiry using the form
                  below. Our organising team will
                  review your message and respond
                  through the contact details provided.
                </p>
              </div>
            </div>
          </div>

          {/* Existing form, unchanged */}
          <div className="relative px-6 py-8 sm:px-10 sm:py-10 lg:px-12">
            <ContactForm />
          </div>
        </motion.div>

        {/* DIRECT ASSISTANCE HEADING */}
        <motion.div
          variants={staggerVariants}
          initial={reducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="mx-auto mt-16 max-w-[650px] text-center sm:mt-20"
        >
          <motion.div
            variants={revealVariants}
            className="mb-4 flex items-center justify-center gap-3"
          >
            <span className="h-[2px] w-7 bg-brand-primary" />

            <span className="font-heading text-[11px] font-bold uppercase tracking-[0.16em] text-brand-primary">
              Direct Assistance
            </span>

            <span className="h-[2px] w-7 bg-brand-primary" />
          </motion.div>

          <motion.h3
            variants={revealVariants}
            className="font-heading text-[clamp(1.45rem,2.8vw,2.1rem)] font-extrabold leading-[1.25] tracking-[-0.04em] text-brand-dark"
          >
            Speak Directly with Our{" "}
            <span className="text-brand-primary">
              Organising Team
            </span>
          </motion.h3>

          <motion.p
            variants={revealVariants}
            className="mt-3 text-[13px] leading-[1.8] text-[#727A87] sm:text-[14px]"
          >
            Contact the relevant organiser directly
            using the details below.
          </motion.p>
        </motion.div>

        {/* DIRECT CONTACT CARDS */}
        <motion.div
          variants={staggerVariants}
          initial={reducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mx-auto mt-8 grid max-w-[940px] auto-rows-fr gap-5 md:grid-cols-2"
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

        {/* PREMIUM BOTTOM CTA */}
        <motion.div
          initial={
            reducedMotion
              ? false
              : { opacity: 0, y: 28 }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative mt-14 overflow-hidden rounded-2xl bg-brand-dark px-6 py-8 text-white sm:px-9 sm:py-10"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-24 size-80 rounded-full bg-brand-primary/20 blur-[90px]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 right-28 size-52 rounded-full border border-white/10"
          />

          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-[650px]">
              <div className="mb-3 flex items-center gap-2.5">
                <span className="size-2 rounded-full bg-brand-primary" />

                <span className="font-heading text-[10px] font-bold uppercase tracking-[0.16em] text-[#F2A8D8]">
                  Exhibition Participation
                </span>
              </div>

              <h3 className="font-heading text-[18px] font-bold leading-[1.4] tracking-tight text-white sm:text-[21px]">
                Planning to participate as an exhibitor
                or trade delegate?
              </h3>

              <p className="mt-2 text-[13px] leading-relaxed text-white/60">
                {event.dates.display} ·{" "}
                {event.venue.name},{" "}
                {event.venue.city}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href={event.cta.bookStand}
                className="group inline-flex min-h-11 items-center justify-center gap-3 rounded-lg bg-brand-primary px-6 py-3 font-heading text-[12px] font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#9F176D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Book Stand Space

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowIcon />
                </span>
              </Link>

              <Link
                href={event.cta.registerVisit}
                className="group inline-flex min-h-11 items-center justify-center gap-3 rounded-lg border border-white/20 bg-white/[0.07] px-6 py-3 font-heading text-[12px] font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-primary/60 hover:bg-white/[0.12] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Visitor Pass

                <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowIcon diagonal />
                </span>
              </Link>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-[3px] bg-brand-primary"
          />
        </motion.div>
      </Container>
    </section>
  );
}
