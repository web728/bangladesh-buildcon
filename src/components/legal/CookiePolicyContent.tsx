
"use client";

import type { ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";

const EASE = [0.22, 1, 0.36, 1] as const;

const reveal: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: EASE,
    },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
    },
  },
};

const COOKIE_CATEGORIES = [
  {
    number: "01",
    title: "Essential Cookies",
    badge: "Core Functionality",
    description:
      "Essential cookies and similar technologies may support website security, session management and necessary preferences. Blocking these technologies can affect features that depend on them.",
    purpose:
      "Security, session handling and essential website functionality",
  },
  {
    number: "02",
    title: "Analytics Cookies",
    badge: "Where Enabled",
    description:
      "Where analytics services are enabled, they may help measure website visits, understand how pages are used and identify opportunities to improve the visitor experience. Their use depends on the services actually configured and applicable consent requirements.",
    purpose:
      "Website usage and performance measurement",
  },
  {
    number: "03",
    title: "Marketing Cookies",
    badge: "Where Enabled",
    description:
      "Where advertising or campaign measurement services are enabled, cookies and similar technologies may support campaign attribution and relevant communications. Any such processing should reflect the services installed and the choices available to visitors.",
    purpose:
      "Campaign measurement and advertising-related functionality",
  },
] as const;

function ArrowIcon() {
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
      <path d="M5 12h14m-6-6 6 6-6 6" />
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

function SectionHeading({
  number,
  id,
  children,
}: {
  number: string;
  id: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-primary-soft font-heading text-[11px] font-extrabold text-brand-primary-dark">
        {number}
      </span>

      <h2
        id={id}
        className="font-heading text-[18px] font-extrabold leading-[1.4] tracking-[-0.035em] text-brand-dark sm:text-[20px]"
      >
        {children}
      </h2>
    </div>
  );
}

export function CookiePolicyContent() {
  const reducedMotion = !!useReducedMotion();

  const scrollReveal = {
    initial: reducedMotion ? false : "hidden",
    whileInView: "visible" as const,
    viewport: {
      once: true,
      amount: 0.08,
    },
  };

  return (
    <section
      aria-label="Cookie policy information"
      className="relative overflow-hidden bg-brand-light py-10 text-brand-dark sm:py-14 lg:py-16"
    >
      {/* Subtle architectural background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(5,7,9,0.018)_1px,transparent_1px),linear-gradient(to_bottom,rgba(5,7,9,0.018)_1px,transparent_1px)] bg-[size:64px_64px]"
      />

      <Container className="relative z-10">
        <div className="mx-auto w-full max-w-[900px]">
          {/* INTRODUCTION */}
          <motion.header
            {...scrollReveal}
            variants={reveal}
            className="mb-7 border-b border-brand-border pb-6"
          >
            <div className="flex items-center gap-2.5">
              <span className="h-[2px] w-7 bg-brand-primary" />

              <span className="font-heading text-[10px] font-extrabold uppercase tracking-[0.16em] text-brand-primary-dark">
                Privacy & Website Technologies
              </span>
            </div>

            <h2 className="mt-3 font-heading text-[clamp(1.5rem,2.6vw,2rem)] font-extrabold leading-[1.2] tracking-[-0.04em] text-brand-dark">
              Understanding{" "}
              <span className="text-brand-primary-dark">
                Cookies & Tracking
              </span>
            </h2>

            <p className="mt-3 max-w-[760px] text-[13px] leading-[1.9] text-brand-body sm:text-[14px]">
              This policy explains cookies and related
              technologies, their potential purposes,
              and how you can manage browser
              preferences when using the{" "}
              {event.name} website.
            </p>
          </motion.header>

          {/* MAIN POLICY */}
          <motion.article
            {...scrollReveal}
            variants={reveal}
            className="overflow-hidden rounded-2xl border border-brand-border bg-white shadow-[0_12px_40px_rgba(5,7,9,0.045)]"
          >
            <div
              aria-hidden="true"
              className="h-[3px] bg-brand-primary"
            />

            <div className="space-y-8 p-5 sm:p-8 lg:p-9">
              {/* 01 */}
              <section aria-labelledby="cookie-overview">
                <SectionHeading
                  id="cookie-overview"
                  number="01"
                >
                  What Are Cookies?
                </SectionHeading>

                <p className="mt-4 text-[13px] leading-[1.95] text-brand-body sm:text-[14px]">
                  Cookies are small pieces of data
                  stored by a browser when you visit a
                  website. They can support functions
                  such as remembering preferences,
                  managing sessions and maintaining
                  website functionality.
                </p>

                <p className="mt-3 text-[13px] leading-[1.95] text-brand-body">
                  Other technologies, including browser
                  storage and third-party scripts, may
                  perform related functions. This
                  policy concerns the website at{" "}
                  <strong className="font-semibold text-brand-dark">
                    {event.websiteDisplay}
                  </strong>
                  .
                </p>
              </section>

              <div className="h-px bg-brand-border" />

              {/* 02 */}
              <section aria-labelledby="cookie-categories">
                <SectionHeading
                  id="cookie-categories"
                  number="02"
                >
                  Cookie Categories
                </SectionHeading>

                <p className="mt-4 text-[13px] leading-[1.85] text-brand-body">
                  Cookies are commonly classified
                  according to their purpose. The
                  categories below describe possible
                  uses; they do not confirm that every
                  type is currently active on this
                  website.
                </p>

                <motion.div
                  variants={stagger}
                  initial={
                    reducedMotion ? false : "hidden"
                  }
                  whileInView="visible"
                  viewport={{
                    once: true,
                    amount: 0.08,
                  }}
                  className="mt-5 space-y-3"
                >
                  {COOKIE_CATEGORIES.map((category) => (
                    <motion.div
                      key={category.number}
                      variants={reveal}
                      whileHover={
                        reducedMotion
                          ? undefined
                          : { y: -2 }
                      }
                      transition={{
                        duration: 0.25,
                        ease: EASE,
                      }}
                      className="group rounded-xl border border-brand-border bg-brand-light p-4 transition-[border-color,background-color] duration-300 hover:border-brand-primary/35 hover:bg-white sm:p-5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-primary-soft font-heading text-[11px] font-extrabold text-brand-primary-dark">
                            {category.number}
                          </span>

                          <h3 className="font-heading text-[14px] font-extrabold leading-[1.45] text-brand-dark sm:text-[15px]">
                            {category.title}
                          </h3>
                        </div>

                        <span className="rounded-md border border-brand-primary/15 bg-white px-2.5 py-1 font-heading text-[10px] font-bold text-brand-primary-dark">
                          {category.badge}
                        </span>
                      </div>

                      <p className="mt-3 text-[13px] leading-[1.9] text-brand-body">
                        {category.description}
                      </p>

                      <p className="mt-4 border-t border-brand-border pt-3 text-[11px] leading-[1.75] text-brand-body">
                        <strong className="font-bold text-brand-dark">
                          Typical purpose:{" "}
                        </strong>
                        {category.purpose}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              </section>

              <div className="h-px bg-brand-border" />

              {/* 03 */}
              <section aria-labelledby="cookie-preferences">
                <SectionHeading
                  id="cookie-preferences"
                  number="03"
                >
                  Managing Your Preferences
                </SectionHeading>

                <p className="mt-4 text-[13px] leading-[1.95] text-brand-body sm:text-[14px]">
                  Most browsers let you inspect,
                  block or delete cookies through
                  privacy and site-data settings.
                  You can also configure cookie
                  permissions for individual websites.
                </p>

                <p className="mt-3 text-[13px] leading-[1.95] text-brand-body">
                  Blocking certain cookies may affect
                  website features. Where optional
                  tracking is implemented, the
                  available consent controls and their
                  behaviour should reflect applicable
                  requirements.
                </p>
              </section>

              <div className="h-px bg-brand-border" />

              {/* 04 */}
              <section aria-labelledby="third-party-services">
                <SectionHeading
                  id="third-party-services"
                  number="04"
                >
                  Third-Party Services
                </SectionHeading>

                <p className="mt-4 text-[13px] leading-[1.95] text-brand-body sm:text-[14px]">
                  Some website functions may rely on
                  third-party services. Depending on
                  their configuration, these services
                  may store information in your
                  browser or process certain technical
                  data.
                </p>

                <p className="mt-3 text-[13px] leading-[1.95] text-brand-body">
                  Such providers may maintain their
                  own privacy notices. The applicable
                  disclosures should identify the
                  services actually used by this
                  website.
                </p>
              </section>

              <div className="h-px bg-brand-border" />

              {/* 05 */}
              <section aria-labelledby="cookie-duration">
                <SectionHeading
                  id="cookie-duration"
                  number="05"
                >
                  Cookie Duration & Retention
                </SectionHeading>

                <p className="mt-4 text-[13px] leading-[1.95] text-brand-body sm:text-[14px]">
                  Session cookies are generally
                  temporary. Persistent cookies can
                  remain until their configured expiry
                  date or until you delete them.
                  Retention periods differ depending
                  on the specific technology and
                  provider.
                </p>

                <p className="mt-3 text-[13px] leading-[1.95] text-brand-body">
                  Exact cookie names, providers and
                  expiration periods need to be
                  checked against the live website
                  configuration before they are
                  published as definitive details.
                </p>
              </section>
            </div>
          </motion.article>

          {/* PRIVACY CONTACT */}
          <motion.section
            {...scrollReveal}
            variants={reveal}
            aria-labelledby="cookie-contact"
            className="mt-6 rounded-2xl border border-brand-border bg-white p-5 shadow-[0_6px_24px_rgba(5,7,9,0.03)] sm:p-7"
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-[470px]">
                <div className="flex items-center gap-2.5">
                  <span className="h-[2px] w-7 bg-brand-primary" />

                  <span className="font-heading text-[10px] font-extrabold uppercase tracking-[0.16em] text-brand-primary-dark">
                    Privacy Enquiries
                  </span>
                </div>

                <h2
                  id="cookie-contact"
                  className="mt-3 font-heading text-[18px] font-extrabold tracking-[-0.03em] text-brand-dark sm:text-[20px]"
                >
                  Questions About{" "}
                  <span className="text-brand-primary-dark">
                    This Policy?
                  </span>
                </h2>

                <p className="mt-2 text-[13px] leading-[1.85] text-brand-body">
                  Contact the official organising team
                  for questions about the website
                  and its privacy information.
                </p>
              </div>

              <div className="flex w-full flex-col gap-2 sm:w-auto">
                <a
                  href={`mailto:${event.contact.futurex.email}`}
                  className="group inline-flex min-h-11 items-center justify-between gap-3 rounded-lg border border-brand-border bg-brand-light px-4 py-2.5 font-heading text-[12px] font-bold text-brand-dark transition-colors hover:border-brand-primary/40 hover:text-brand-primary-dark"
                >
                  <MailIcon />
                  Contact Futurex
                  <span className="transition-transform group-hover:translate-x-1">
                    <ArrowIcon />
                  </span>
                </a>

                <a
                  href={`mailto:${event.contact.askTrade.email}`}
                  className="group inline-flex min-h-11 items-center justify-between gap-3 rounded-lg border border-brand-border bg-brand-light px-4 py-2.5 font-heading text-[12px] font-bold text-brand-dark transition-colors hover:border-brand-primary/40 hover:text-brand-primary-dark"
                >
                  <MailIcon />
                  Contact ASK Trade
                  <span className="transition-transform group-hover:translate-x-1">
                    <ArrowIcon />
                  </span>
                </a>
              </div>
            </div>
          </motion.section>
        </div>
      </Container>
    </section>
  );
}
