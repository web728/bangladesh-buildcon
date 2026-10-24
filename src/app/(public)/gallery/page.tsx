
import type { Metadata } from "next";

import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { getPublishedGalleryItems } from "@/lib/data/gallery";

/* ==========================================
   DYNAMIC MONGODB CONTENT
========================================== */

export const dynamic = "force-dynamic";

/* ==========================================
   ADVANCED SEO
========================================== */

const PAGE_PATH = "/gallery";

const PAGE_TITLE =
  "Exhibition Photo Gallery | Bangladesh Buildcon International Expo";

const PAGE_DESCRIPTION =
  "Explore published photographs from Bangladesh Buildcon " +
  "International Expo. View exhibition moments and industry " +
  "highlights, including the previous-edition context featured " +
  "in the official 2027 brochure.";

const PAGE_IMAGE =
  "/images/home/bangladesh-buildcon-hero.jpg";

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
    siteName: event.name,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: PAGE_IMAGE,
        alt: "Bangladesh Buildcon International Expo exhibition gallery",
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
   PAGE
========================================== */

export default async function GalleryPage() {
  const items = await getPublishedGalleryItems();

  return (
    <main className="min-h-screen bg-brand-light text-brand-dark selection:bg-brand-primary selection:text-white">
      <PageHero
        title="Exhibition"
        highlightTitle="Photo Gallery"
        badgeText="Bangladesh Buildcon · Gallery"
        intro="Explore published exhibition photographs and moments from Bangladesh Buildcon. The official 2027 brochure also features glimpses of the previous edition held in 2025."
        image={{
          src: PAGE_IMAGE,
          alt: "Bangladesh Buildcon International Expo building and construction exhibition",
        }}
      />

      <section
        aria-labelledby="gallery-heading"
        className="relative overflow-hidden bg-brand-light py-10 sm:py-14 lg:py-16"
      >
        {/* Subtle architectural background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(5,7,9,0.018)_1px,transparent_1px),linear-gradient(to_bottom,rgba(5,7,9,0.018)_1px,transparent_1px)] bg-[size:64px_64px]"
        />

        <Container className="relative z-10">
          <div className="mb-7 flex flex-col gap-4 border-b border-brand-border pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="h-[2px] w-7 bg-brand-primary" />

                <span className="font-heading text-[10px] font-extrabold uppercase tracking-[0.16em] text-brand-primary-dark">
                  Exhibition Moments
                </span>
              </div>

              <h2
                id="gallery-heading"
                className="mt-3 font-heading text-[clamp(1.5rem,2.7vw,2.1rem)] font-extrabold leading-[1.2] tracking-[-0.04em] text-brand-dark"
              >
                Bangladesh Buildcon{" "}
                <span className="text-brand-primary-dark">
                  Gallery
                </span>
              </h2>

              <p className="mt-3 max-w-[700px] text-[13px] leading-[1.85] text-brand-body sm:text-sm">
                Browse photographs published by the
                exhibition team. Select an image to
                view it in full size.
              </p>
            </div>

            
          </div>

          {items.length === 0 ? (
            <div className="mx-auto max-w-[850px] rounded-2xl border border-brand-border bg-white p-6 shadow-[0_10px_32px_rgba(5,7,9,0.035)] sm:p-9">
              <EmptyState
                title="Gallery Coming Soon"
                body="Exhibition photographs will appear here when they are published by the organising team."
              />
            </div>
          ) : (
            <GalleryGrid items={items} />
          )}
        </Container>
      </section>
    </main>
  );
}
