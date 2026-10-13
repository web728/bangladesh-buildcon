
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
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: EASE,
    },
  },
};

/* ==========================================
   SVG ICONS
========================================== */

function DocumentIcon() {
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
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z" />
      <path d="M13 2v7h7M8 13h8M8 17h6" />
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
      className="size-4"
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

/* ==========================================
   REUSABLE SECTION
========================================== */

function TermsSection({
  number,
  id,
  title,
  children,
}: {
  number: string;
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      aria-labelledby={id}
      className="scroll-mt-28 py-7 sm:py-8"
    >
      <div className="flex items-start gap-3">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-primary-soft font-heading text-[11px] font-extrabold text-brand-primary-dark">
          {number}
        </span>

        <h2
          id={id}
          className="font-heading text-[18px] font-extrabold leading-[1.4] tracking-[-0.035em] text-brand-dark sm:text-[20px]"
        >
          {title}
        </h2>
      </div>

      <div className="mt-4 space-y-3 text-[13px] leading-[1.95] text-brand-body sm:text-[14px]">
        {children}
      </div>
    </section>
  );
}

const legalLinkClass =
  "font-semibold text-brand-primary-dark underline " +
  "decoration-brand-primary/35 underline-offset-4 " +
  "transition-colors hover:text-brand-primary " +
  "focus-visible:rounded-sm focus-visible:outline-2 " +
  "focus-visible:outline-offset-2 focus-visible:outline-brand-primary";

/* ==========================================
   MAIN TERMS CONTENT
========================================== */

export function TermsContent() {
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
      aria-label="Terms and conditions"
      className="relative overflow-hidden bg-brand-light py-10 text-brand-dark sm:py-14 lg:py-16"
    >
      {/* Subtle architectural grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(5,7,9,0.018)_1px,transparent_1px),linear-gradient(to_bottom,rgba(5,7,9,0.018)_1px,transparent_1px)] bg-[size:64px_64px]"
      />

      <Container className="relative z-10">
        <div className="mx-auto w-full max-w-[900px]">
          {/* =====================================
              INTRODUCTION
          ====================================== */}

          <motion.header
            {...scrollProps}
            variants={reveal}
            className="mb-7 border-b border-brand-border pb-6"
          >
            <div className="flex items-center gap-2.5">
              <span className="h-[2px] w-7 bg-brand-primary" />

              <span className="font-heading text-[10px] font-extrabold uppercase tracking-[0.16em] text-brand-primary-dark">
                Website Terms & Legal Information
              </span>
            </div>

            <h2 className="mt-3 font-heading text-[clamp(1.5rem,2.6vw,2rem)] font-extrabold leading-[1.2] tracking-[-0.04em] text-brand-dark">
              Understanding Our{" "}
              <span className="text-brand-primary-dark">
                Website Terms
              </span>
            </h2>

            <p className="mt-3 max-w-[760px] text-[13px] leading-[1.9] text-brand-body sm:text-[14px]">
              These Terms and Conditions explain
              the general conditions for using
              the {event.name} website, making
              event-related enquiries and
              submitting participation requests.
            </p>
          </motion.header>

          {/* =====================================
              DOCUMENT
          ====================================== */}

          <motion.article
            {...scrollProps}
            variants={reveal}
            className="overflow-hidden rounded-2xl border border-brand-border bg-white shadow-[0_12px_40px_rgba(5,7,9,0.045)]"
          >
            <div
              aria-hidden="true"
              className="h-[3px] bg-brand-primary"
            />

            {/* Document identity */}
            <div className="flex items-start gap-4 border-b border-brand-border bg-brand-light/50 px-5 py-6 sm:px-8">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-primary-soft text-brand-primary-dark">
                <DocumentIcon />
              </span>

              <div className="min-w-0">
                <p className="font-heading text-[10px] font-extrabold uppercase tracking-[0.13em] text-brand-primary-dark">
                  Official Event Website
                </p>

                <h2 className="mt-1 font-heading text-[16px] font-extrabold leading-[1.4] text-brand-dark sm:text-[18px]">
                  Terms & Conditions of Use
                </h2>

                <p className="mt-2 text-[12px] leading-[1.8] text-brand-body">
                  Applicable to the website{" "}
                  <strong className="font-semibold text-brand-dark">
                    {event.websiteDisplay}
                  </strong>{" "}
                  and its exhibition-related
                  online services.
                </p>
              </div>
            </div>

            <div className="divide-y divide-brand-border px-5 sm:px-8 lg:px-10">
              {/* 01 */}
              <TermsSection
                number="01"
                id="terms-introduction"
                title="Introduction & Organisers"
              >
                <p>
                  These Terms and Conditions relate
                  to the website for{" "}
                  <strong className="font-semibold text-brand-dark">
                    {event.name}
                  </strong>
                  .
                </p>

                <p>
                  The exhibition is jointly
                  organised by{" "}
                  <strong className="font-semibold text-brand-dark">
                    Futurex Trade Fair &amp; Events
                    Pvt. Ltd.
                  </strong>{" "}
                  and{" "}
                  <strong className="font-semibold text-brand-dark">
                    ASK Trade &amp; Exhibitions
                    Pvt. Ltd.
                  </strong>
                  .
                </p>

                <p>
                  The website provides information
                  about the exhibition and ways
                  to submit enquiries or
                  registrations relating to
                  participation.
                </p>
              </TermsSection>

              {/* 02 */}
              <TermsSection
                number="02"
                id="terms-website-use"
                title="Use of This Website"
              >
                <p>
                  This website provides information
                  relating to the 10th Bangladesh
                  Buildcon International Expo 2026,
                  scheduled for{" "}
                  <strong className="font-semibold text-brand-dark">
                    {event.dates.display}
                  </strong>{" "}
                  at{" "}
                  <strong className="font-semibold text-brand-dark">
                    {event.venue.fullLocation}
                  </strong>
                  .
                </p>

                <p>
                  Visitors are expected to use
                  the website lawfully and
                  responsibly, without interfering
                  with its availability, security
                  or operation.
                </p>

                <p>
                  You must not intentionally
                  submit misleading information,
                  attempt unauthorised access,
                  distribute malicious software
                  or use website functionality
                  to interfere with other users.
                </p>
              </TermsSection>

              {/* 03 */}
              <TermsSection
                number="03"
                id="terms-submissions"
                title="Exhibitor & Visitor Submissions"
              >
                <p>
                  Completing an exhibitor enquiry,
                  stand booking request, visitor
                  registration or partnership
                  enquiry form does not, by
                  itself, guarantee confirmation
                  of participation.
                </p>

                <p>
                  Stand availability, allocation,
                  admission arrangements and
                  participation conditions are
                  subject to confirmation by
                  the organising team.
                </p>

                <p>
                  Where applicable, exhibitors
                  may be required to complete
                  separate agreements or
                  documentation before their
                  participation is confirmed.
                </p>

                <p>
                  Applicants should provide
                  accurate contact information
                  and review any additional
                  instructions communicated
                  through official organiser
                  channels.
                </p>
              </TermsSection>

              {/* 04 */}
              <TermsSection
                number="04"
                id="terms-intellectual-property"
                title="Intellectual Property"
              >
                <p>
                  Website text, graphics,
                  photographs, exhibition
                  branding, logos and other
                  materials may be protected
                  by copyright, trademark
                  or other intellectual
                  property rights.
                </p>

                <p>
                  Such rights remain with
                  their respective owners
                  or authorised licensors.
                  The presence of third-party
                  logos or materials on this
                  website does not transfer
                  ownership of those rights.
                </p>

                <p>
                  You should obtain the
                  relevant rights holder&apos;s
                  permission before reproducing,
                  distributing or commercially
                  using protected website
                  materials, except where
                  applicable law permits
                  otherwise.
                </p>
              </TermsSection>

              {/* 05 */}
              <TermsSection
                number="05"
                id="terms-event-information"
                title="Event Information & Updates"
              >
                <p>
                  The published exhibition
                  details are{" "}
                  <strong className="font-semibold text-brand-dark">
                    17–19 September 2026
                  </strong>
                  , at{" "}
                  <strong className="font-semibold text-brand-dark">
                    ICCB Exhibition Hall,
                    Dhaka, Bangladesh
                  </strong>
                  .
                </p>

                <p>
                  Event information, participation
                  arrangements and website
                  content may be updated
                  when necessary.
                </p>

                <p>
                  Visitors and exhibitors
                  should check official
                  event communications for
                  the latest arrangements
                  before making travel,
                  shipping or other
                  participation commitments.
                </p>
              </TermsSection>

              {/* 06 */}
              <TermsSection
                number="06"
                id="terms-information-accuracy"
                title="Information Accuracy & Liability"
              >
                <p>
                  The organising team aims
                  to keep information on
                  the website useful and
                  accurate. Nevertheless,
                  some details may change
                  or require additional
                  confirmation.
                </p>

                <p>
                  Information about
                  exhibitors, event features,
                  participation services
                  and operational arrangements
                  should not be treated
                  as a guarantee of
                  availability or results.
                </p>

                <p>
                  Any limitation or exclusion
                  of liability is subject
                  to applicable law and
                  cannot exclude rights
                  or responsibilities
                  that the law does
                  not permit to be excluded.
                </p>
              </TermsSection>

              {/* 07 */}
              <TermsSection
                number="07"
                id="terms-external-links"
                title="External Websites & Services"
              >
                <p>
                  This website may contain
                  links to external
                  websites, including
                  organiser sites, venue
                  directions or other
                  information services.
                </p>

                <p>
                  External websites may
                  have their own terms,
                  privacy notices and
                  operational arrangements.
                  Review those policies
                  when using third-party
                  services.
                </p>
              </TermsSection>

              {/* 08 */}
              <TermsSection
                number="08"
                id="terms-privacy"
                title="Privacy & Personal Information"
              >
                <p>
                  Information submitted
                  through website forms
                  may be processed for
                  the purposes of
                  responding to enquiries
                  and administering
                  event-related requests.
                </p>

                <p>
                  Please review our{" "}
                  <Link
                    href="/privacy-policy"
                    className={legalLinkClass}
                  >
                    Privacy Policy
                  </Link>{" "}
                  for information about
                  personal data, and
                  our{" "}
                  <Link
                    href="/cookie-policy"
                    className={legalLinkClass}
                  >
                    Cookie Policy
                  </Link>{" "}
                  for general information
                  about cookies and
                  browser preferences.
                </p>
              </TermsSection>

              {/* 09 */}
              <TermsSection
                number="09"
                id="terms-changes"
                title="Changes to These Terms"
              >
                <p>
                  These Terms and Conditions
                  may be revised to reflect
                  changes in the website,
                  exhibition arrangements
                  or applicable requirements.
                </p>

                <p>
                  Updated terms should be
                  published on this page
                  with an accurate revision
                  date where appropriate.
                </p>
              </TermsSection>
            </div>
          </motion.article>

          {/* =====================================
              CONTACT SECTION
          ====================================== */}

          <motion.section
            {...scrollProps}
            variants={reveal}
            aria-labelledby="terms-contact-heading"
            className="mt-6 overflow-hidden rounded-2xl border border-brand-border bg-white p-5 shadow-[0_8px_28px_rgba(5,7,9,0.035)] sm:p-7"
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-[540px]">
                <div className="flex items-center gap-2.5">
                  <span className="h-[2px] w-7 bg-brand-primary" />

                  <span className="font-heading text-[10px] font-extrabold uppercase tracking-[0.16em] text-brand-primary-dark">
                    Legal & General Enquiries
                  </span>
                </div>

                <h2
                  id="terms-contact-heading"
                  className="mt-3 font-heading text-[19px] font-extrabold tracking-[-0.035em] text-brand-dark sm:text-[21px]"
                >
                  Questions About{" "}
                  <span className="text-brand-primary-dark">
                    These Terms?
                  </span>
                </h2>

                <p className="mt-2 text-[13px] leading-[1.85] text-brand-body">
                  Contact the official organising
                  team for questions about
                  website terms, registration
                  or exhibition participation.
                </p>
              </div>

              <div className="flex w-full flex-col gap-2 sm:w-auto">
                <a
                  href={`mailto:${event.contact.futurex.email}`}
                  className="group inline-flex min-h-11 items-center justify-between gap-3 rounded-lg border border-brand-border bg-brand-light px-4 py-2.5 font-heading text-[12px] font-bold text-brand-dark transition-colors hover:border-brand-primary/40 hover:text-brand-primary-dark"
                >
                  <MailIcon />
                  Email Futurex

                  <span className="transition-transform group-hover:translate-x-1">
                    <ArrowIcon />
                  </span>
                </a>

                <a
                  href={`mailto:${event.contact.askTrade.email}`}
                  className="group inline-flex min-h-11 items-center justify-between gap-3 rounded-lg border border-brand-border bg-brand-light px-4 py-2.5 font-heading text-[12px] font-bold text-brand-dark transition-colors hover:border-brand-primary/40 hover:text-brand-primary-dark"
                >
                  <MailIcon />
                  Email ASK Trade

                  <span className="transition-transform group-hover:translate-x-1">
                    <ArrowIcon />
                  </span>
                </a>

                <Link
                  href="/contact"
                  className="group inline-flex min-h-11 items-center justify-between gap-3 rounded-lg bg-brand-primary px-4 py-2.5 font-heading text-[12px] font-bold text-white transition-colors hover:bg-brand-primary-dark"
                >
                  Contact Page

                  <span className="transition-transform group-hover:translate-x-1">
                    <ArrowIcon />
                  </span>
                </Link>
              </div>
            </div>
          </motion.section>

          <p className="mt-5 text-center text-[11px] leading-[1.8] text-brand-muted">
            Official exhibition organisers:
            Futurex Trade Fair &amp; Events Pvt. Ltd.
            and ASK Trade &amp; Exhibitions Pvt. Ltd.
          </p>
        </div>
      </Container>
    </section>
  );
}
