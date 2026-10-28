
import type { Metadata } from "next";

import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";

import { getPublishedDownloads } from "@/lib/data/downloads";
import { BrochureDownloadForm } from "@/components/forms/BrochureDownloadForm";
import { DownloadReveal } from "@/components/downloads/DownloadReveal";

export const dynamic = "force-dynamic";

/* ==========================================
   SEO
========================================== */

const PAGE_TITLE =
  "Exhibition Brochure & Downloads | Bangladesh Buildcon 2027";

const PAGE_DESCRIPTION =
  "Access the exhibition brochure and published event resources " +
  "for the 11th Bangladesh Buildcon International Expo 2027, " +
  "17–19 November 2027 at ICCB Exhibition Hall, Dhaka.";

const PAGE_IMAGE =
  "/images/home/bangladesh-buildcon-hero.jpg";

export const metadata: Metadata = {
  title: {
    absolute: PAGE_TITLE,
  },
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/downloads",
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: "/downloads",
    type: "website",
    siteName: event.name,
    locale: "en_US",
    images: [
      {
        url: PAGE_IMAGE,
        alt: "Bangladesh Buildcon International Expo 2027",
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
   SVG ICONS
========================================== */

function DownloadIcon({
  className = "size-5",
}: {
  className?: string;
}) {
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
      <path d="M12 3v12m-5-5 5 5 5-5M5 17v3h14v-3" />
    </svg>
  );
}

function FileIcon() {
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
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z" />
      <path d="M13 2v7h7M8 13h8m-8 4h6" />
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
      className="size-4 shrink-0"
      aria-hidden="true"
    >
      <path d="M5 12h14m-6-6 6 6-6 6" />
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
      className="size-4"
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
      className="size-4"
      aria-hidden="true"
    >
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function CheckIcon() {
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
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

/* ==========================================
   DECORATIVE BROCHURE SVG

   Pure SVG line drawing.
   No gradients or external images.
========================================== */

function BrochureArtwork() {
  return (
    <svg
      viewBox="0 0 440 350"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-auto w-full max-w-[420px]"
      aria-hidden="true"
    >
      {/* Rear documents */}
      <rect
        x="99"
        y="49"
        width="220"
        height="271"
        rx="12"
        transform="rotate(-8 99 49)"
        fill="#F2E6EF"
        stroke="#DBBDD1"
        strokeWidth="1.5"
      />

      <rect
        x="122"
        y="32"
        width="223"
        height="277"
        rx="12"
        transform="rotate(5 122 32)"
        fill="#F9F5F8"
        stroke="#E6D7E1"
        strokeWidth="1.5"
      />

      {/* Front brochure */}
      <rect
        x="97"
        y="31"
        width="220"
        height="280"
        rx="12"
        fill="white"
        stroke="#BA1D82"
        strokeWidth="2"
      />

      <rect
        x="112"
        y="46"
        width="190"
        height="8"
        rx="2"
        fill="#BA1D82"
      />

      <path
        d="M123 222V150l33-18 33 18v72"
        stroke="#BA1D82"
        strokeWidth="2"
      />
      <path
        d="M164 222V121l40-24 40 24v101"
        stroke="#BA1D82"
        strokeWidth="2"
      />
      <path
        d="M215 222V160l36-18 36 18v62"
        stroke="#304090"
        strokeWidth="2"
      />
      <path
        d="M118 223H293M164 151h80M164 185h80"
        stroke="#BA1D82"
        strokeOpacity=".45"
      />

      <path
        d="M119 240h176M119 252h142M119 264h164"
        stroke="#D8C6D3"
        strokeWidth="3"
        strokeLinecap="round"
      />

      <rect
        x="119"
        y="278"
        width="90"
        height="15"
        rx="4"
        fill="#F7E8F2"
      />

      {/* Document attachment corner */}
      <path
        d="M267 31v27h50"
        stroke="#BA1D82"
        strokeOpacity=".5"
      />

      {/* Floating download indicator */}
      <circle
        cx="336"
        cy="252"
        r="37"
        fill="#BA1D82"
      />
      <path
        d="M336 230v27m-11-10 11 11 11-11M321 266h30"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Technical registration marks */}
      <circle
        cx="68"
        cy="79"
        r="5"
        fill="#BA1D82"
      />
      <path
        d="M68 90v70M58 125h20"
        stroke="#BA1D82"
        strokeOpacity=".35"
        strokeDasharray="4 6"
      />
    </svg>
  );
}

/* ==========================================
   PAGE
========================================== */

export default async function DownloadsPage() {
  const downloads = await getPublishedDownloads();

  return (
    <main className="min-h-screen bg-[#F8F8FA] text-brand-dark selection:bg-brand-primary selection:text-white">
      {/* ===================================
          EXISTING PAGE HERO
      ==================================== */}

      <PageHero
        title="Exhibition Brochure"
        highlightTitle="& Downloads"
        badgeText="Bangladesh Buildcon · 2027"
        intro={`Access the exhibition brochure and published resources for ${event.dates.display} at ${event.venue.name}, ${event.venue.city}.`}
        image={{
          src: PAGE_IMAGE,
          alt: "Bangladesh Buildcon International Expo 2027 building & construction exhibition",
        }}
      />

      {/* ===================================
          CONTENT
      ==================================== */}

      <div className="py-12 sm:py-16">
        <Container>
          {/* ===================================
              01. BROCHURE INTRODUCTION
          ==================================== */}

          <section aria-labelledby="brochure-heading">
            <DownloadReveal>
              <div className="grid items-center gap-6 overflow-hidden rounded-2xl border border-[#E9E4EB] bg-white p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:p-8">
                <div className="min-w-0">
                  <div className="flex items-center gap-2.5">
                    <span className="h-[2px] w-7 bg-brand-primary" />

                    <span className="font-heading text-[10px] font-extrabold uppercase tracking-[0.15em] text-brand-primary">
                      Official Event Resources
                    </span>
                  </div>

                  <h2
                    id="brochure-heading"
                    className="mt-4 max-w-[620px] font-heading text-[clamp(1.75rem,3vw,2.55rem)] font-extrabold leading-[1.15] tracking-[-0.045em] text-brand-dark"
                  >
                    Explore the Official{" "}
                    <span className="text-brand-primary">
                      Exhibition Brochure.
                    </span>
                  </h2>

                  <p className="mt-4 max-w-[590px] text-[13px] leading-[1.85] text-[#66616C] sm:text-[14px]">
                    Find information about the
                    Bangladesh Buildcon International
                    Expo 2027, including building materials & construction
                    industry product categories,
                    exhibitor profiles and event
                    highlights.
                  </p>

                  <div className="mt-5 space-y-3">
                    {[
                      "Exhibition and product sectors",
                      "Exhibitor and visitor profiles",
                      "Event highlights and features",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2.5 text-[12px] font-semibold text-[#554E59]"
                      >
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-[#F9ECF5] text-brand-primary">
                          <CheckIcon />
                        </span>

                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-2 rounded-md border border-[#E9E4EB] bg-[#FCFAFC] px-3 py-2 font-heading text-[11px] font-semibold text-[#5C5560]">
                      <span className="text-brand-primary">
                        <CalendarIcon />
                      </span>
                      {event.dates.display}
                    </span>

                    <span className="inline-flex items-center gap-2 rounded-md border border-[#E9E4EB] bg-[#FCFAFC] px-3 py-2 font-heading text-[11px] font-semibold text-[#5C5560]">
                      <span className="text-brand-primary">
                        <LocationIcon />
                      </span>
                      {event.venue.city}, Bangladesh
                    </span>
                  </div>

                  <a
                    href="#brochure-form"
                    className="group mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-brand-primary px-5 py-3 font-heading text-[12px] font-bold text-white transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-brand-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary motion-reduce:transform-none"
                  >
                    Get the Brochure
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      <DownloadIcon className="size-4" />
                    </span>
                  </a>
                </div>

                <div className="relative flex min-w-0 items-center justify-center overflow-hidden rounded-xl border border-[#F0E7EE] bg-[#FCF8FB] p-4 sm:p-6">
                  <BrochureArtwork />
 
                </div>
              </div>
            </DownloadReveal>

            {/* ===================================
                02. BROCHURE REQUEST FORM
            ==================================== */}

            <DownloadReveal
              delay={0.08}
              className="mx-auto mt-8 w-full max-w-[1000px] scroll-mt-24 sm:mt-10"
            >
              <div
                id="brochure-form"
                className="scroll-mt-24 overflow-hidden rounded-2xl border border-[#E9E4EB] bg-white shadow-[0_14px_42px_rgba(5,7,9,0.045)]"
              >
                <div className="h-[3px] bg-brand-primary" />

                <div className="border-b border-[#ECE7ED] bg-[#FCFAFC] p-5 sm:p-7 lg:px-9">
                  <div className="flex items-start gap-3">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-brand-primary/15 bg-[#F9ECF5] text-brand-primary">
                      <DownloadIcon className="size-6" />
                    </span>

                    <div className="min-w-0">
                      <span className="font-heading text-[10px] font-extrabold uppercase tracking-[0.12em] text-brand-primary">
                        Brochure Access
                      </span>

                      <h2 className="mt-2 font-heading text-[clamp(1.4rem,2.4vw,1.95rem)] font-extrabold leading-[1.25] tracking-[-0.035em] text-brand-dark">
                        Request Your{" "}
                        <span className="text-brand-primary">
                          Exhibition Brochure
                        </span>
                      </h2>

                      <p className="mt-2 max-w-[650px] text-[12px] leading-[1.8] text-[#66616C] sm:text-[13px]">
                        Submit your details through
                        the form below to access
                        the brochure, subject to
                        the existing form process.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Existing functionality unchanged */}
                <div className="p-5 sm:p-7 lg:px-9 lg:py-8">
                  <BrochureDownloadForm />
                </div>
              </div>
            </DownloadReveal>
          </section>

          {/* ===================================
              03. PUBLISHED DOWNLOADS
          ==================================== */}

          <section
            aria-labelledby="additional-downloads-heading"
            className="mt-12 sm:mt-16"
          >
            <DownloadReveal>
              <div className="flex flex-col gap-4 border-b border-[#E9E4EB] pb-6 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-[700px]">
                  <div className="flex items-center gap-2.5">
                    <span className="h-[2px] w-7 bg-brand-primary" />

                    <span className="font-heading text-[10px] font-extrabold uppercase tracking-[0.15em] text-brand-primary">
                      Event Documents
                    </span>
                  </div>

                  <h2
                    id="additional-downloads-heading"
                    className="mt-3 font-heading text-[clamp(1.45rem,2.5vw,2rem)] font-extrabold leading-[1.2] tracking-[-0.04em] text-brand-dark"
                  >
                    Additional{" "}
                    <span className="text-brand-primary">
                      Downloads
                    </span>
                  </h2>

                  <p className="mt-3 text-[12px] leading-[1.85] text-[#66616C] sm:text-[13px]">
                    Browse documents and event
                    resources published by
                    the organising team.
                  </p>
                </div>

              
              </div>
            </DownloadReveal>

            {downloads.length === 0 ? (
              <DownloadReveal
                delay={0.08}
                className="mt-6"
              >
                <div className="rounded-xl border border-[#E9E4EB] bg-white p-5 sm:p-7">
                  <EmptyState
                    title="More Downloads Coming Soon"
                    body="Additional exhibition resources will appear here once they are published."
                  />
                </div>
              </DownloadReveal>
            ) : (
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {downloads.map((download, index) => (
                  <DownloadReveal
                    key={String(download._id)}
                    delay={Math.min(index, 6) * 0.055}
                    className="h-full"
                  >
                    <a
                      href={download.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${download.title} in a new tab`}
                      className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-[#E9E4EB] bg-white p-5 shadow-[0_4px_18px_rgba(5,7,9,0.025)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-brand-primary/35 hover:shadow-[0_14px_30px_rgba(5,7,9,0.065)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary motion-reduce:transform-none"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-brand-primary transition-transform duration-300 group-hover:scale-x-100"
                      />

                      <div className="flex items-start justify-between gap-3">
                        <span className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-brand-primary/15 bg-[#F9ECF5] text-brand-primary transition-colors group-hover:bg-brand-primary group-hover:text-white">
                          <FileIcon />
                        </span>

                      
                      </div>

                      <div className="mt-5 flex-1">
                        <h3 className="font-heading text-[15px] font-extrabold leading-[1.5] tracking-[-0.02em] text-brand-dark transition-colors group-hover:text-brand-primary">
                          {download.title}
                        </h3>

                        {download.description && (
                          <p className="mt-2 text-[12px] leading-[1.8] text-[#66616C]">
                            {download.description}
                          </p>
                        )}
                      </div>

                      <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#F0EBF0] pt-4">
                        <span className="font-heading text-[11px] font-bold text-brand-primary">
                          Open Document
                        </span>

                        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-brand-primary/20 bg-[#F9ECF5] text-brand-primary transition-[background-color,color,transform] duration-300 group-hover:translate-x-0.5 group-hover:bg-brand-primary group-hover:text-white">
                          <ArrowIcon />
                        </span>
                      </div>
                    </a>
                  </DownloadReveal>
                ))}
              </div>
            )}
          </section>
        </Container>
      </div>
    </main>
  );
}
