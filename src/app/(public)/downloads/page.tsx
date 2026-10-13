
import type { Metadata } from "next";

import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { getPublishedDownloads } from "@/lib/data/downloads";
import { BrochureDownloadForm } from "@/components/forms/BrochureDownloadForm";
import { DownloadReveal } from "@/components/downloads/DownloadReveal";

export const dynamic = "force-dynamic";

/* ================================
   ADVANCED PAGE SEO
================================ */

const PAGE_TITLE =
  "Exhibition Brochure & Downloads | Bangladesh Buildcon 2026";

const PAGE_DESCRIPTION =
  `Access the exhibition brochure and published event resources for ` +
  `the 10th Bangladesh Buildcon International Expo 2026, ` +
  `17–19 September 2026 at ICCB Exhibition Hall, Dhaka.`;

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
        alt: "10th Bangladesh Buildcon International Expo 2026",
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

/* ================================
   ICONS
================================ */

function DownloadIcon() {
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
      className="size-5"
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
      className="size-4"
      aria-hidden="true"
    >
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

/* ================================
   DOWNLOADS PAGE
================================ */

export default async function DownloadsPage() {
  const downloads = await getPublishedDownloads();

  return (
    <main className="min-h-screen bg-brand-light text-brand-dark selection:bg-brand-primary selection:text-white">
      <PageHero
        title="Exhibition Brochure"
        highlightTitle="& Downloads"
        badgeText="10th Bangladesh Buildcon · 2026"
        intro={`Access the exhibition brochure and published resources for ${event.dates.display} at ${event.venue.name}, ${event.venue.city}.`}
        image={{
          src: PAGE_IMAGE,
          alt: "Bangladesh Buildcon International Expo 2026 construction exhibition",
        }}
      />

      <section
        aria-labelledby="brochure-heading"
        className="relative overflow-hidden bg-brand-light py-10 sm:py-14 lg:py-16"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(5,7,9,0.018)_1px,transparent_1px),linear-gradient(to_bottom,rgba(5,7,9,0.018)_1px,transparent_1px)] bg-[size:64px_64px]"
        />

        <Container className="relative z-10">
          {/* BROCHURE FORM */}
          <DownloadReveal className="mx-auto w-full max-w-[850px]">
            <div className="overflow-hidden rounded-2xl border border-brand-border bg-white shadow-[0_14px_45px_rgba(5,7,9,0.05)]">
              <div
                aria-hidden="true"
                className="h-[3px] bg-brand-primary"
              />

              <div className="border-b border-brand-border px-5 py-6 text-center sm:px-9 sm:py-7">
                <span className="inline-flex items-center gap-2 rounded-lg border border-brand-primary/15 bg-brand-primary-soft px-3 py-1.5 font-heading text-[10px] font-extrabold uppercase tracking-[0.1em] text-brand-primary-dark">
                  <DownloadIcon />
                  Exhibition Brochure
                </span>

                <h2
                  id="brochure-heading"
                  className="mt-4 font-heading text-[clamp(1.5rem,2.6vw,2rem)] font-extrabold leading-[1.2] tracking-[-0.04em] text-brand-dark"
                >
                  Get the{" "}
                  <span className="text-brand-primary-dark">
                    Official Brochure
                  </span>
                </h2>

                <p className="mx-auto mt-3 max-w-[550px] text-[13px] leading-[1.85] text-brand-body sm:text-sm">
                  Submit your details to access
                  the Bangladesh Buildcon International
                  Expo 2026 brochure.
                </p>

                <p className="mt-3 font-heading text-[11px] font-semibold text-brand-muted">
                  17–19 September 2026
                  <span
                    aria-hidden="true"
                    className="mx-2 text-brand-primary"
                  >
                    |
                  </span>
                  ICCB Exhibition Hall, Dhaka
                </p>
              </div>

              <div className="px-5 py-7 sm:px-9 sm:py-9">
                <BrochureDownloadForm />
              </div>
            </div>
          </DownloadReveal>

          {/* PUBLISHED DOWNLOADS */}
          <div className="mx-auto mt-12 w-full max-w-[850px] sm:mt-14">
            <DownloadReveal>
              <div className="mb-5 flex flex-col gap-3 border-b border-brand-border pb-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="h-[2px] w-7 bg-brand-primary" />

                    <span className="font-heading text-[10px] font-extrabold uppercase tracking-[0.16em] text-brand-primary-dark">
                      Event Documents
                    </span>
                  </div>

                  <h2 className="mt-3 font-heading text-[21px] font-extrabold tracking-[-0.035em] text-brand-dark sm:text-[25px]">
                    Additional{" "}
                    <span className="text-brand-primary-dark">
                      Downloads
                    </span>
                  </h2>

                  <p className="mt-2 text-[13px] leading-[1.85] text-brand-body">
                    Browse the published exhibition
                    documents and resources.
                  </p>
                </div>

                {downloads.length > 0 && (
                  <span className="inline-flex w-fit rounded-lg border border-brand-primary/15 bg-brand-primary-soft px-3 py-1.5 font-heading text-[11px] font-bold text-brand-primary-dark">
                    {downloads.length}{" "}
                    {downloads.length === 1
                      ? "Resource"
                      : "Resources"}
                  </span>
                )}
              </div>
            </DownloadReveal>

            {downloads.length === 0 ? (
              <DownloadReveal>
                <div className="rounded-2xl border border-brand-border bg-white p-5 shadow-[0_8px_28px_rgba(5,7,9,0.035)] sm:p-7">
                  <EmptyState
                    title="More Downloads Coming Soon"
                    body="Additional exhibition resources will appear here once they are published."
                  />
                </div>
              </DownloadReveal>
            ) : (
              <DownloadReveal>
                <div className="overflow-hidden rounded-2xl border border-brand-border bg-white shadow-[0_10px_32px_rgba(5,7,9,0.04)]">
                  <ul className="divide-y divide-brand-border">
                    {downloads.map((download) => (
                      <li key={String(download._id)}>
                        <a
                          href={download.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex min-w-0 items-center gap-3 px-4 py-5 transition-colors duration-300 hover:bg-brand-primary-soft sm:gap-4 sm:px-6"
                        >
                          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-brand-primary/15 bg-brand-primary-soft text-brand-primary-dark transition-colors duration-300 group-hover:bg-brand-primary group-hover:text-white">
                            <FileIcon />
                          </span>

                          <div className="min-w-0 flex-1">
                            <h3 className="font-heading text-[13px] font-extrabold leading-[1.5] text-brand-dark transition-colors group-hover:text-brand-primary-dark sm:text-sm">
                              {download.title}
                            </h3>

                            {download.description && (
                              <p className="mt-1 text-[12px] leading-[1.75] text-brand-body">
                                {download.description}
                              </p>
                            )}
                          </div>

                          <span className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-brand-border bg-white px-3 py-2.5 font-heading text-[11px] font-bold text-brand-primary-dark transition-colors group-hover:border-brand-primary group-hover:bg-brand-primary group-hover:text-white">
                            <span className="hidden sm:inline">
                              Open File
                            </span>

                            <ArrowIcon />
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </DownloadReveal>
            )}
          </div>
        </Container>
      </section>
    </main>
  );
}
