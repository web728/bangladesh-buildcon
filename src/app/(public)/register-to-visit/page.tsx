
import type { Metadata } from "next";

import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { VisitorRegistrationForm } from "@/components/forms/VisitorRegistrationForm";
import { VisitorRegistrationReveal } from "@/components/visit/VisitorRegistrationReveal";

/* ==========================================
   ADVANCED SEO
========================================== */

const PAGE_PATH = "/register-to-visit";

const PAGE_TITLE =
  "Visitor Registration | Bangladesh Buildcon International Expo 2026";

const PAGE_DESCRIPTION =
  "Register your interest as a trade visitor for the " +
  "10th Bangladesh Buildcon International Expo 2026, " +
  "17–19 September at ICCB Exhibition Hall, Dhaka. " +
  "Explore construction materials, machinery, building " +
  "technologies and industry networking opportunities.";

const PAGE_IMAGE =
  "/images/venue/iccb-exhibition-hall.jpg";

export const metadata: Metadata = {
  title: {
    absolute: PAGE_TITLE,
  },

  description: PAGE_DESCRIPTION,

  alternates: {
    canonical: PAGE_PATH,
  },

  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_PATH,
    type: "website",
    siteName: event.name,
    locale: "en_US",
    images: [
      {
        url: PAGE_IMAGE,
        alt: "ICCB Exhibition Hall in Dhaka, venue for Bangladesh Buildcon 2026",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [PAGE_IMAGE],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

/* ==========================================
   SVG ICONS
========================================== */

function VisitorBadgeIcon() {
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
      <rect x="4" y="5" width="16" height="16" rx="2" />
      <path d="M9 5V3h6v2" />
      <circle cx="12" cy="11" r="2" />
      <path d="M8 17c.8-2 2.1-3 4-3s3.2 1 4 3" />
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
      className="size-4 shrink-0"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M7 3v4M17 3v4M3 10h18" />
      <path d="m9 15 2 2 4-4" />
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
      className="size-4 shrink-0"
      aria-hidden="true"
    >
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

/* ==========================================
   REGISTRATION PAGE
========================================== */

export default function RegisterToVisitPage() {
  return (
    <main className="min-h-screen bg-brand-light text-brand-dark selection:bg-brand-primary selection:text-white">
      <PageHero
        title="Register to"
        highlightTitle="Visit Buildcon 2026"
        badgeText="Trade Visitor Registration"
        intro={`Register your interest in visiting ${event.name}, taking place from ${event.dates.display} at ${event.venue.name}, ${event.venue.city}.`}
        image={{
          src: PAGE_IMAGE,
          alt: "ICCB Exhibition Hall, Dhaka — venue for the 10th Bangladesh Buildcon International Expo 2026",
        }}
      />

      <section
        aria-labelledby="visitor-registration-heading"
        className="relative overflow-hidden bg-brand-light py-10 sm:py-14 lg:py-16"
      >
        {/* Subtle architectural grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(5,7,9,0.018)_1px,transparent_1px),linear-gradient(to_bottom,rgba(5,7,9,0.018)_1px,transparent_1px)] bg-[size:64px_64px]"
        />

        <Container className="relative z-10">
          <VisitorRegistrationReveal className="mx-auto w-full max-w-[850px]">
            <div className="overflow-hidden rounded-2xl border border-brand-border bg-white shadow-[0_14px_45px_rgba(5,7,9,0.055)]">
              {/* Brand accent */}
              <div
                aria-hidden="true"
                className="h-[3px] bg-brand-primary"
              />

              {/* Form header */}
              <div className="border-b border-brand-border px-5 py-7 text-center sm:px-9 sm:py-8">
                <span className="inline-flex items-center gap-2 rounded-lg border border-brand-primary/15 bg-brand-primary-soft px-3 py-2 font-heading text-[10px] font-extrabold uppercase tracking-[0.12em] text-brand-primary-dark">
                  <VisitorBadgeIcon />
                  Visitor Registration
                </span>

                <h2
                  id="visitor-registration-heading"
                  className="mt-4 font-heading text-[clamp(1.55rem,2.7vw,2.1rem)] font-extrabold leading-[1.2] tracking-[-0.04em] text-brand-dark"
                >
                  Register Your{" "}
                  <span className="text-brand-primary-dark">
                    Visit
                  </span>
                </h2>

                <p className="mx-auto mt-3 max-w-[580px] text-[13px] leading-[1.85] text-brand-body sm:text-sm">
                  Complete the registration form to
                  share your visitor details for
                  Bangladesh Buildcon International
                  Expo 2026. Explore building
                  materials, construction machinery
                  and technologies, product
                  demonstrations and B2B networking
                  opportunities.
                </p>

                {/* Verified event details */}
                <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] font-semibold text-brand-body">
                  <span className="inline-flex items-center gap-2">
                    <span className="text-brand-primary-dark">
                      <CalendarIcon />
                    </span>

                    {event.dates.display}
                  </span>

                  <span className="inline-flex items-center gap-2">
                    <span className="text-brand-primary-dark">
                      <LocationIcon />
                    </span>

                    {event.venue.name},{" "}
                    {event.venue.city}
                  </span>
                </div>
              </div>

              {/* Existing functional registration form */}
              <div className="px-5 py-7 sm:px-9 sm:py-9">
                <VisitorRegistrationForm />
              </div>
            </div>
          </VisitorRegistrationReveal>

          <VisitorRegistrationReveal className="mx-auto mt-5 max-w-[850px]">
            <p className="text-center text-[11px] leading-[1.8] text-brand-muted">
              Registration submissions are subject
              to the event&apos;s applicable
              confirmation and admission
              arrangements. For visitor enquiries,
              contact the official organising team.
            </p>
          </VisitorRegistrationReveal>
        </Container>
      </section>
    </main>
  );
}
