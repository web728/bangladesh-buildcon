
import type { Metadata } from "next";

import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { PartnerLogo } from "@/components/ui/PartnerLogo";
import { PartnerEnquiryForm } from "@/components/forms/PartnerEnquiryForm";
import {
  getActivePartners,
  type PartnerSummary,
} from "@/lib/data/partners";
import { PartnersReveal } from "@/components/partners/PartnersReveal";

/* ==========================================
   LIVE DATABASE CONTENT
========================================== */

export const dynamic = "force-dynamic";

/* ==========================================
   ADVANCED SEO
========================================== */

const PAGE_PATH = "/partners";

const PAGE_TITLE =
  "Industry & Media Partners | Bangladesh Buildcon 2027";

const PAGE_DESCRIPTION =
  "Explore published industry, association and media partners " +
  "of the 11th Bangladesh Buildcon International Expo 2027. " +
  "Enquire about partnership opportunities for the exhibition " +
  "at ICCB Exhibition Hall, Dhaka, 17–19 September 2027.";

const PAGE_IMAGE =
  "/images/sectors/construction-crane-bangladesh.jpg";

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
        alt: "Bangladesh Buildcon International Expo 2027 industry and media partnerships",
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
    },
  },
};

/* ==========================================
   PARTNER CATEGORIES

   Preserve existing database categories.
========================================== */

const CATEGORIES = [
  "Supporting Organisation",
  "Association Partner",
  "Industry Partner",
  "Media Partner",
] as const;

/* ==========================================
   SVG ICONS
========================================== */

function PartnershipIcon() {
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
      <path d="m2 12 4-4 4 2 4-2 4 4" />
      <path d="m7 13 5 5a2 2 0 0 0 3-1l1-1" />
      <path d="m10 10 3-2 4 2 3-2 2 4-4 4-3-1" />
      <path d="m5 15 3 3m10-2 3-3" />
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

/* ==========================================
   PAGE
========================================== */

export default async function PartnersPage() {
  let partners: PartnerSummary[] = [];

  try {
    partners = await getActivePartners();
  } catch (error) {
    console.error(
      "Failed to load published exhibition partners:",
      error
    );
  }

  const byCategory = CATEGORIES.map((category) => ({
    category,
    items: partners.filter(
      (partner) => partner.category === category
    ),
  })).filter((group) => group.items.length > 0);

  return (
    <main className="min-h-screen bg-brand-light text-brand-dark selection:bg-brand-primary selection:text-white">
      <PageHero
        title="Industry & Media"
        highlightTitle="Partners"
        badgeText="11th Bangladesh Buildcon · 2027"
        intro={`Explore published exhibition partners and enquire about collaboration opportunities at ${event.name}. ${event.dates.display} · ${event.venue.name}, ${event.venue.city}.`}
        image={{
          src: PAGE_IMAGE,
          alt: "Building and construction industry representing Bangladesh Buildcon 2027 partnerships",
        }}
      />

      {/* =====================================
          PUBLISHED PARTNERS
      ====================================== */}

      <section
        aria-labelledby="partners-heading"
        className="relative overflow-hidden border-b border-brand-border bg-brand-light py-10 sm:py-14 lg:py-16"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(5,7,9,0.018)_1px,transparent_1px),linear-gradient(to_bottom,rgba(5,7,9,0.018)_1px,transparent_1px)] bg-[size:64px_64px]"
        />

        <Container className="relative z-10">
          <PartnersReveal>
            <div className="mb-7 flex flex-col gap-4 border-b border-brand-border pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-[760px]">
                <div className="flex items-center gap-2.5">
                  <span className="h-[2px] w-7 bg-brand-primary" />

                  <span className="font-heading text-[10px] font-extrabold uppercase tracking-[0.16em] text-brand-primary-dark">
                    Exhibition Collaborations
                  </span>
                </div>

                <h2
                  id="partners-heading"
                  className="mt-3 font-heading text-[clamp(1.5rem,2.7vw,2.1rem)] font-extrabold leading-[1.2] tracking-[-0.04em] text-brand-dark"
                >
                  Industry, Association{" "}
                  <span className="text-brand-primary-dark">
                    & Media Partners
                  </span>
                </h2>

                <p className="mt-3 max-w-[680px] text-[13px] leading-[1.85] text-brand-body sm:text-sm">
                  Browse the organisations currently
                  published by the exhibition team.
                  Partner information is displayed only
                  when available in the official
                  website directory.
                </p>
              </div>

              {partners.length > 0 && (
                <span className="inline-flex w-fit shrink-0 rounded-lg border border-brand-primary/15 bg-brand-primary-soft px-3 py-2 font-heading text-[11px] font-bold text-brand-primary-dark">
                  {partners.length}{" "}
                  {partners.length === 1
                    ? "Published Partner"
                    : "Published Partners"}
                </span>
              )}
            </div>
          </PartnersReveal>

          {byCategory.length === 0 ? (
            <PartnersReveal>
              <div className="mx-auto max-w-[900px] rounded-2xl border border-brand-border bg-white p-6 shadow-[0_8px_30px_rgba(5,7,9,0.04)] sm:p-9">
                <EmptyState
                  title="Partner Announcements Coming Soon"
                  body="Industry, association and media partners will appear here when their details are published by the organising team."
                />
              </div>
            </PartnersReveal>
          ) : (
            <div className="space-y-10 sm:space-y-12">
              {byCategory.map((group) => (
                <section
                  key={group.category}
                  aria-label={group.category}
                >
                  <PartnersReveal>
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-brand-border pb-4">
                      <div className="flex items-center gap-3">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-primary-soft text-brand-primary-dark">
                          <PartnershipIcon />
                        </span>

                        <h3 className="font-heading text-[16px] font-extrabold tracking-[-0.025em] text-brand-dark sm:text-[19px]">
                          {group.category}
                        </h3>
                      </div>

                      <span className="rounded-lg border border-brand-border bg-white px-3 py-1.5 font-heading text-[11px] font-semibold text-brand-body">
                        {group.items.length}{" "}
                        {group.items.length === 1
                          ? "Organisation"
                          : "Organisations"}
                      </span>
                    </div>
                  </PartnersReveal>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6">
                    {group.items.map((partner, index) => (
                      <PartnersReveal
                        key={String(
                          partner._id || partner.name
                        )}
                        delay={Math.min(index, 5) * 0.055}
                      >
                        <div className="group relative h-full min-w-0 overflow-hidden rounded-xl border border-brand-border bg-white p-3 shadow-[0_4px_18px_rgba(5,7,9,0.035)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-brand-primary/35 hover:shadow-[0_12px_28px_rgba(5,7,9,0.075)] sm:p-4">
                          <span
                            aria-hidden="true"
                            className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-brand-primary transition-transform duration-300 group-hover:scale-x-100"
                          />

                          <PartnerLogo partner={partner} />
                        </div>
                      </PartnersReveal>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* =====================================
          PARTNERSHIP ENQUIRY FORM
      ====================================== */}

      <section
        aria-labelledby="partner-enquiry-heading"
        className="relative overflow-hidden bg-brand-light py-12 sm:py-16"
      >
        <Container>
          <PartnersReveal className="mx-auto w-full max-w-[850px]">
            <div className="overflow-hidden rounded-2xl border border-brand-border bg-white shadow-[0_16px_48px_rgba(5,7,9,0.055)]">
              <div
                aria-hidden="true"
                className="h-[3px] bg-brand-primary"
              />

              <div className="border-b border-brand-border px-5 py-7 text-center sm:px-9 sm:py-8">
                <span className="inline-flex items-center gap-2 rounded-lg border border-brand-primary/15 bg-brand-primary-soft px-3 py-2 font-heading text-[10px] font-extrabold uppercase tracking-[0.12em] text-brand-primary-dark">
                  <PartnershipIcon />
                  Collaboration Enquiries
                </span>

                <h2
                  id="partner-enquiry-heading"
                  className="mt-4 font-heading text-[clamp(1.5rem,2.6vw,2rem)] font-extrabold leading-[1.2] tracking-[-0.04em] text-brand-dark"
                >
                  Partnership{" "}
                  <span className="text-brand-primary-dark">
                    Enquiry Form
                  </span>
                </h2>

                <p className="mx-auto mt-3 max-w-[590px] text-[13px] leading-[1.85] text-brand-body sm:text-sm">
                  Submit your organisation details
                  to enquire about industry,
                  association or media collaboration
                  opportunities with Bangladesh
                  Buildcon International Expo 2027.
                </p>

                <p className="mt-3 font-heading text-[11px] font-semibold text-brand-muted">
                  {event.dates.display}
                  <span
                    aria-hidden="true"
                    className="mx-2 text-brand-primary"
                  >
                    |
                  </span>
                  {event.venue.name},{" "}
                  {event.venue.city}
                </p>
              </div>

              {/* Existing functional form */}
              <div className="px-5 py-7 sm:px-9 sm:py-9">
                <PartnerEnquiryForm />
              </div>
            </div>
          </PartnersReveal>

          <PartnersReveal className="mx-auto mt-5 max-w-[850px]">
            <p className="text-center text-[11px] leading-[1.8] text-brand-muted">
              Submitting a partnership enquiry does
              not confirm an official partnership.
              Participation and collaboration terms
              are subject to organiser confirmation.
            </p>
          </PartnersReveal>
        </Container>
      </section>
    </main>
  );
}
