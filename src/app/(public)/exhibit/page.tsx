
import type { Metadata } from "next";

import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { ExhibitClientView } from "@/components/exhibit/ExhibitClientView";

const PAGE_TITLE =
  "Why Exhibit at Bangladesh Buildcon 2026 | Construction Trade Expo";

const PAGE_DESCRIPTION =
  "Discover why to exhibit at the 10th Bangladesh Buildcon " +
  "International Expo, 17–19 September 2026 at ICCB Exhibition " +
  "Hall, Dhaka. Explore construction market opportunities, " +
  "exhibitor sectors and B2B industry networking.";

const PAGE_IMAGE =
  "/images/sectors/construction-crane-bangladesh.jpg";

export const metadata: Metadata = {
  title: {
    absolute: PAGE_TITLE,
  },

  description: PAGE_DESCRIPTION,

  alternates: {
    canonical: "/exhibit",
  },

  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: "/exhibit",
    type: "website",
    siteName: event.name,
    locale: "en_US",
    images: [
      {
        url: PAGE_IMAGE,
        alt: "Building and construction industry at Bangladesh Buildcon 2026",
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

export default function ExhibitPage() {
  return (
    <main className="min-h-screen bg-brand-light text-brand-dark selection:bg-brand-primary selection:text-white">
      <PageHero
        title="Why Exhibit at"
        highlightTitle="Bangladesh Buildcon?"
        badgeText="10th International Edition · 2026"
        intro={`Explore construction industry opportunities and connect with the building and infrastructure sector at ${event.venue.name}, ${event.venue.city}, ${event.dates.display}.`}
        image={{
          src: PAGE_IMAGE,
          alt: "Construction machinery representing the exhibitor profile of Bangladesh Buildcon International Expo 2026",
        }}
      />

      <ExhibitClientView />
    </main>
  );
}
