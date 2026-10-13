
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

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

/* ==========================================
   SVG ICONS
========================================== */

function ShieldIcon() {
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
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
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
      className="size-4"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

/* ==========================================
   REUSABLE POLICY SECTION
========================================== */

function PolicySection({
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
      className="scroll-mt-28"
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

const policyLinkClass =
  "font-semibold text-brand-primary-dark underline " +
  "decoration-brand-primary/35 underline-offset-4 " +
  "transition-colors hover:text-brand-primary " +
  "focus-visible:rounded-sm focus-visible:outline-2 " +
  "focus-visible:outline-offset-2 focus-visible:outline-brand-primary";

/* ==========================================
   MAIN POLICY COMPONENT
========================================== */

export function PrivacyPolicyContent() {
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
      aria-label="Bangladesh Buildcon privacy policy"
      className="relative overflow-hidden bg-brand-light py-10 text-brand-dark sm:py-14 lg:py-16"
    >
      {/* Architectural grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(5,7,9,0.018)_1px,transparent_1px),linear-gradient(to_bottom,rgba(5,7,9,0.018)_1px,transparent_1px)] bg-[size:64px_64px]"
      />

      <Container className="relative z-10">
        <div className="mx-auto w-full max-w-[900px]">
          {/* INTRO */}
          <motion.header
            {...scrollProps}
            variants={reveal}
            className="mb-7 border-b border-brand-border pb-6"
          >
            <div className="flex items-center gap-2.5">
              <span className="h-[2px] w-7 bg-brand-primary" />

              <span className="font-heading text-[10px] font-extrabold uppercase tracking-[0.16em] text-brand-primary-dark">
                Website Privacy Information
              </span>
            </div>

            <h2 className="mt-3 font-heading text-[clamp(1.5rem,2.6vw,2rem)] font-extrabold leading-[1.2] tracking-[-0.04em] text-brand-dark">
              How We Handle{" "}
              <span className="text-brand-primary-dark">
                Personal Information
              </span>
            </h2>

            <p className="mt-3 max-w-[760px] text-[13px] leading-[1.9] text-brand-body sm:text-[14px]">
              This policy describes personal
              information collected through the{" "}
              <strong className="font-semibold text-brand-dark">
                {event.name}
              </strong>{" "}
              website, the purposes of processing,
              and the ways visitors can contact
              the organising team about privacy.
            </p>
          </motion.header>

          {/* POLICY DOCUMENT */}
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
                <ShieldIcon />
              </span>

              <div className="min-w-0">
                <p className="font-heading text-[10px] font-extrabold uppercase tracking-[0.13em] text-brand-primary-dark">
                  Official Event Website
                </p>

                <h2 className="mt-1 font-heading text-[16px] font-extrabold leading-[1.4] text-brand-dark sm:text-[18px]">
                  Bangladesh Buildcon Privacy Policy
                </h2>

                <p className="mt-2 text-[12px] leading-[1.8] text-brand-body">
                  Applies to information submitted
                  through the event website at{" "}
                  <strong className="font-semibold text-brand-dark">
                    {event.websiteDisplay}
                  </strong>
                  .
                </p>
              </div>
            </div>

            <motion.div
              variants={stagger}
              initial={reducedMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.04 }}
              className="divide-y divide-brand-border px-5 sm:px-8 lg:px-10"
            >
              {/* 01 — ORGANISERS */}
              <motion.div
                variants={reveal}
                className="py-7 sm:py-8"
              >
                <PolicySection
                  number="01"
                  id="privacy-overview"
                  title="Overview & Organising Entities"
                >
                  <p>
                    This Privacy Policy concerns the
                    website associated with{" "}
                    <strong className="font-semibold text-brand-dark">
                      {event.name}
                    </strong>
                    .
                  </p>

                  <p>
                    The official exhibition organisers
                    are{" "}
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
                    The website provides ways for
                    exhibitors, visitors and other
                    interested organisations to
                    submit enquiries or registration
                    information relating to the
                    exhibition.
                  </p>
                </PolicySection>
              </motion.div>

              {/* 02 — COLLECTION */}
              <motion.div
                variants={reveal}
                className="py-7 sm:py-8"
              >
                <PolicySection
                  number="02"
                  id="privacy-collection"
                  title="Information We Collect"
                >
                  <p>
                    When you complete a website
                    form, the information collected
                    depends on the form and the
                    fields you submit. This may
                    include:
                  </p>

                  <ul className="list-disc space-y-1.5 pl-5 marker:text-brand-primary">
                    <li>
                      Name, designation and company
                      or organisation
                    </li>
                    <li>
                      Country and contact information
                    </li>
                    <li>
                      Email address, mobile number
                      or WhatsApp number
                    </li>
                    <li>
                      Exhibition participation,
                      visitor or partnership
                      enquiry details
                    </li>
                    <li>
                      Other information you choose
                      to provide in a message
                    </li>
                  </ul>

                  <p>
                    Depending on the website
                    configuration, technical data
                    such as IP address, browser
                    information and campaign
                    parameters may also be processed
                    for security, troubleshooting,
                    analytics or attribution.
                  </p>
                </PolicySection>
              </motion.div>

              {/* 03 — USE */}
              <motion.div
                variants={reveal}
                className="py-7 sm:py-8"
              >
                <PolicySection
                  number="03"
                  id="privacy-use"
                  title="How Information Is Used"
                >
                  <p>
                    Information provided through
                    the website may be processed
                    for purposes connected with
                    the exhibition, including:
                  </p>

                  <ul className="list-disc space-y-1.5 pl-5 marker:text-brand-primary">
                    <li>
                      Reviewing and responding
                      to submitted enquiries
                    </li>
                    <li>
                      Processing exhibitor,
                      visitor and partnership
                      registration requests
                    </li>
                    <li>
                      Sending relevant event
                      confirmations or
                      operational communications
                    </li>
                    <li>
                      Maintaining administrative
                      and participation records
                    </li>
                    <li>
                      Supporting website security
                      and technical functionality
                    </li>
                  </ul>

                  <p>
                    Website analytics and marketing
                    measurement, where implemented,
                    depend on the technologies
                    configured and the applicable
                    privacy and consent
                    requirements.
                  </p>
                </PolicySection>
              </motion.div>

              {/* 04 — STORAGE */}
              <motion.div
                variants={reveal}
                className="py-7 sm:py-8"
              >
                <PolicySection
                  number="04"
                  id="privacy-storage"
                  title="Data Storage & Sharing"
                >
                  <p>
                    Information submitted through
                    website forms may be stored
                    in the systems used to
                    process enquiries and manage
                    exhibition participation.
                  </p>

                  <p>
                    Where operational database,
                    spreadsheet, email or other
                    service integrations are
                    enabled, information may be
                    processed through those
                    services for event
                    administration.
                  </p>

                  <p>
                    Access to personal information
                    should be limited to authorised
                    personnel and service providers
                    with a legitimate operational
                    need. The specific providers,
                    storage locations and retention
                    arrangements should reflect
                    the actual website setup.
                  </p>
                </PolicySection>
              </motion.div>

              {/* 05 — COOKIES */}
              <motion.div
                variants={reveal}
                className="py-7 sm:py-8"
              >
                <PolicySection
                  number="05"
                  id="privacy-cookies"
                  title="Cookies & Similar Technologies"
                >
                  <p>
                    Cookies and related technologies
                    may support website functionality,
                    security, preferences and
                    measurement. Optional analytics
                    or marketing technologies
                    may also be used where enabled.
                  </p>

                  <p>
                    For an explanation of cookie
                    categories and browser controls,
                    see our{" "}
                    <Link
                      href="/cookie-policy"
                      className={policyLinkClass}
                    >
                      Cookie Policy
                    </Link>
                    .
                  </p>
                </PolicySection>
              </motion.div>

              {/* 06 — RETENTION */}
              <motion.div
                variants={reveal}
                className="py-7 sm:py-8"
              >
                <PolicySection
                  number="06"
                  id="privacy-retention"
                  title="Data Retention & Protection"
                >
                  <p>
                    Personal information should
                    be retained only for as
                    long as needed for the
                    relevant operational purpose
                    or applicable legal
                    requirements.
                  </p>

                  <p>
                    Suitable technical and
                    organisational measures
                    should be maintained to
                    protect information from
                    unauthorised access,
                    alteration or disclosure.
                    No online system can
                    guarantee absolute security.
                  </p>

                  <p>
                    Specific retention periods
                    depend on the records,
                    processing systems and
                    applicable obligations.
                  </p>
                </PolicySection>
              </motion.div>

              {/* 07 — RIGHTS */}
              <motion.div
                variants={reveal}
                className="py-7 sm:py-8"
              >
                <PolicySection
                  number="07"
                  id="privacy-rights"
                  title="Your Privacy Requests"
                >
                  <p>
                    You may contact the
                    organising team to ask
                    about personal information
                    you have submitted through
                    the website.
                  </p>

                  <p>
                    Depending on applicable
                    law and the circumstances,
                    you may be able to
                    request access, correction
                    or deletion of your
                    personal information,
                    or raise an objection
                    to certain processing.
                  </p>

                  <p>
                    The organising team may
                    need to verify your
                    identity before acting
                    on a request.
                  </p>
                </PolicySection>
              </motion.div>

              {/* 08 — CHANGES */}
              <motion.div
                variants={reveal}
                className="py-7 sm:py-8"
              >
                <PolicySection
                  number="08"
                  id="privacy-updates"
                  title="Updates to This Policy"
                >
                  <p>
                    This policy may be revised
                    to reflect changes in
                    website functionality,
                    information-processing
                    arrangements or
                    applicable requirements.
                  </p>

                  <p>
                    Any revised version
                    should be made available
                    on this page with an
                    accurate revision date.
                  </p>
                </PolicySection>
              </motion.div>
            </motion.div>
          </motion.article>

          {/* CONTACT SECTION */}
          <motion.section
            {...scrollProps}
            variants={reveal}
            aria-labelledby="privacy-contact-heading"
            className="mt-6 overflow-hidden rounded-2xl border border-brand-border bg-white p-5 shadow-[0_8px_28px_rgba(5,7,9,0.035)] sm:p-7"
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-[540px]">
                <div className="flex items-center gap-2.5">
                  <span className="h-[2px] w-7 bg-brand-primary" />

                  <span className="font-heading text-[10px] font-extrabold uppercase tracking-[0.16em] text-brand-primary-dark">
                    Privacy Contact
                  </span>
                </div>

                <h2
                  id="privacy-contact-heading"
                  className="mt-3 font-heading text-[19px] font-extrabold tracking-[-0.035em] text-brand-dark sm:text-[21px]"
                >
                  Questions About{" "}
                  <span className="text-brand-primary-dark">
                    Your Information?
                  </span>
                </h2>

                <p className="mt-2 text-[13px] leading-[1.85] text-brand-body">
                  Contact the Bangladesh Buildcon
                  organising team regarding privacy
                  questions or information requests.
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
            Official exhibition organisers: Futurex
            Trade Fair &amp; Events Pvt. Ltd. and
            ASK Trade &amp; Exhibitions Pvt. Ltd.
          </p>
        </div>
      </Container>
    </section>
  );
}
