
"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/forms/ContactForm";

const EASE = [0.22, 1, 0.36, 1] as const;

const reveal: Variants = {
  hidden: { opacity: 0, y: 20 },
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
      staggerChildren: 0.1,
      delayChildren: 0.04,
    },
  },
};

const ORGANISERS = [
  {
    name: "Futurex Trade Fair & Events Pvt. Ltd.",
    location: "New Delhi, India",
    contact: event.contact.futurex,
  },
  {
    name: "ASK Trade & Exhibitions Pvt. Ltd.",
    location: "Dhaka, Bangladesh",
    contact: event.contact.askTrade,
  },
];

function Icon({
  name,
}: {
  name: "phone" | "mail" | "arrow" | "message";
}) {
  const paths = {
    phone: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.09 5.18 2 2 0 0 1 5.08-2.18h3a2 2 0 0 1 2 1.72l.5 2.81a2 2 0 0 1-.57 1.73L8.1 11.17a16 16 0 0 0 4.73 4.73l1.91-1.91a2 2 0 0 1 1.73-.57l2.81.5A2 2 0 0 1 22 16.92Z" />
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    message: (
      <>
        <path d="M20 11.5a8.5 8.5 0 0 1-8.5 8.5 9 9 0 0 1-4-.9L3 21l1.9-4.5a9 9 0 0 1-.9-4A8.5 8.5 0 1 1 20 11.5Z" />
        <path d="M8 11h8m-8 3h5" />
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
      className="size-[18px] shrink-0"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

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
      aria-labelledby="contact-form-heading"
      className="relative overflow-hidden bg-brand-light py-10 text-brand-dark sm:py-14 lg:py-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(5,7,9,0.018)_1px,transparent_1px),linear-gradient(to_bottom,rgba(5,7,9,0.018)_1px,transparent_1px)] bg-[size:64px_64px]"
      />

      <Container className="relative z-10">
        <div className="mx-auto w-full max-w-[920px]">
          {/* CONTACT FORM */}
          <motion.div
            {...scrollProps}
            variants={reveal}
            className="overflow-hidden rounded-2xl border border-brand-border bg-white shadow-[0_14px_44px_rgba(5,7,9,0.055)]"
          >
            <div
              aria-hidden="true"
              className="h-[3px] bg-brand-primary"
            />

            <div className="border-b border-brand-border px-5 py-6 text-center sm:px-9 sm:py-7">
              <p className="font-heading text-[10px] font-extrabold uppercase tracking-[0.16em] text-brand-primary-dark">
                Official Exhibition Enquiries
              </p>

              <h2
                id="contact-form-heading"
                className="mt-3 font-heading text-[clamp(1.5rem,2.7vw,2rem)] font-extrabold leading-[1.25] tracking-[-0.04em] text-brand-dark"
              >
                Send Us{" "}
                <span className="text-brand-primary-dark">
                  a Message
                </span>
              </h2>

              <p className="mx-auto mt-3 max-w-[590px] text-[13px] leading-[1.85] text-brand-body sm:text-sm">
                Send your enquiry to the Bangladesh Buildcon
                organising team. Please include the details
                needed to help us understand your request.
              </p>
            </div>

            {/* Existing form logic remains unchanged */}
            <div className="px-5 py-7 sm:px-9 sm:py-9">
              <ContactForm />
            </div>
          </motion.div>

          {/* ORGANISER CONTACT DETAILS */}
          <motion.div
            {...scrollProps}
            variants={reveal}
            className="mt-11 border-b border-brand-border pb-5 sm:mt-14"
          >
            <div className="flex items-center gap-2.5">
              <span className="h-[2px] w-7 bg-brand-primary" />

              <span className="font-heading text-[10px] font-extrabold uppercase tracking-[0.16em] text-brand-primary-dark">
                Organising Secretariat
              </span>
            </div>

            <h2 className="mt-3 font-heading text-[clamp(1.4rem,2.4vw,1.9rem)] font-extrabold tracking-[-0.04em] text-brand-dark">
              Official{" "}
              <span className="text-brand-primary-dark">
                Contact Details
              </span>
            </h2>

            <p className="mt-2 text-[13px] leading-[1.8] text-brand-body">
              Bangladesh Buildcon 2026 is organised by
              Futurex Trade Fair & Events Pvt. Ltd. and
              ASK Trade & Exhibitions Pvt. Ltd.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial={reducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
            className="mt-5 grid gap-4 md:grid-cols-2"
          >
            {ORGANISERS.map((organiser, index) => {
              const phoneHref = organiser.contact.phone.replace(
                /[^0-9+]/g,
                ""
              );

              return (
                <motion.article
                  key={organiser.name}
                  variants={reveal}
                  whileHover={
                    reducedMotion ? undefined : { y: -4 }
                  }
                  transition={{
                    duration: 0.28,
                    ease: EASE,
                  }}
                  className="group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-brand-border bg-white p-5 shadow-[0_6px_24px_rgba(5,7,9,0.035)] transition-[border-color,box-shadow] duration-300 hover:border-brand-primary/35 hover:shadow-[0_14px_32px_rgba(5,7,9,0.075)] sm:p-6"
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-[3px] bg-brand-primary"
                  />

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="font-heading text-[10px] font-bold uppercase tracking-[0.1em] text-brand-primary-dark">
                        Official Organiser
                      </span>

                      <h3 className="mt-2 font-heading text-[16px] font-extrabold leading-[1.45] tracking-[-0.025em] text-brand-dark">
                        {organiser.name}
                      </h3>

                      <p className="mt-1 text-[12px] font-medium text-brand-body">
                        {organiser.location}
                      </p>
                    </div>

                    <span className="font-heading text-[11px] font-bold text-brand-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {organiser.contact.name && (
                    <p className="mt-5 text-[13px] font-bold text-brand-dark">
                      {organiser.contact.name}
                    </p>
                  )}

                  <div className="mt-auto space-y-2.5 pt-5">
                    <a
                      href={`tel:${phoneHref}`}
                      className="flex min-h-11 items-center gap-3 rounded-lg border border-brand-border bg-brand-light px-3.5 py-2.5 text-[12px] font-semibold text-brand-body transition-colors hover:border-brand-primary/40 hover:bg-brand-primary-soft hover:text-brand-primary-dark"
                    >
                      <span className="text-brand-primary-dark">
                        <Icon name="phone" />
                      </span>

                      <span className="min-w-0 break-words">
                        {organiser.contact.phone}
                      </span>
                    </a>

                    <a
                      href={`mailto:${organiser.contact.email}`}
                      className="flex min-h-11 items-center gap-3 rounded-lg border border-brand-border bg-brand-light px-3.5 py-2.5 text-[12px] font-semibold text-brand-body transition-colors hover:border-brand-primary/40 hover:bg-brand-primary-soft hover:text-brand-primary-dark"
                    >
                      <span className="text-brand-primary-dark">
                        <Icon name="mail" />
                      </span>

                      <span className="min-w-0 break-all">
                        {organiser.contact.email}
                      </span>
                    </a>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
