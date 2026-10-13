
import type { Metadata } from "next";

import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { VisitClientView } from "@/components/visit/VisitClientView";

/* ==========================================
   ADVANCED SEO
========================================== */

const PAGE_PATH = "/visit";

const PAGE_TITLE =
  "Why Visit Bangladesh Buildcon 2026 | Construction Trade Expo Dhaka";

const PAGE_DESCRIPTION =
  "Discover why construction professionals visit the " +
  "10th Bangladesh Buildcon International Expo 2026. " +
  "Explore building materials, machinery, product innovations " +
  "and B2B networking opportunities, 17–19 September at " +
  "ICCB Exhibition Hall, Dhaka.";

const PAGE_IMAGE =
  "/images/gallery/bangladesh-buildcon-05.jpg";

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
        alt: "Visitors exploring building and construction products at Bangladesh Buildcon",
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

export default function VisitPage() {
  return (
    <main className="min-h-screen bg-brand-light text-brand-dark selection:bg-brand-primary selection:text-white">
      <PageHero
        title="Discover Why"
        highlightTitle="Visit Buildcon 2026"
        badgeText="Visitor Opportunities · 10th Edition"
        intro={`Explore construction materials, machinery, technologies and industry connections at ${event.name}, ${event.dates.display}, ${event.venue.name}, ${event.venue.city}.`}
        image={{
          src: PAGE_IMAGE,
          alt: "Building and construction industry visitors at Bangladesh Buildcon exhibition",
        }}
      />

      <VisitClientView />
    </main>
  );
}
