
import type { Metadata } from "next";

import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { ExhibitorServicesClientView } from "@/components/exhibit/ExhibitorServicesClientView";

const PAGE_TITLE =
  "Exhibitor Services & Participation Guidance | Bangladesh Buildcon 2026";

const PAGE_DESCRIPTION =
  "Find exhibitor participation and operational guidance for the " +
  "10th Bangladesh Buildcon International Expo 2026, " +
  "17–19 September at ICCB Exhibition Hall, Dhaka. " +
  "Enquire about stand requirements, travel, freight and event documents.";

const PAGE_IMAGE =
  "/images/sectors/construction-crane-bangladesh.jpg";

export const metadata: Metadata = {
  title: {
    absolute: PAGE_TITLE,
  },

  description: PAGE_DESCRIPTION,

  alternates: {
    canonical: "/exhibitor-services",
  },

  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: "/exhibitor-services",
    siteName: event.name,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: PAGE_IMAGE,
        alt: "Construction equipment representing the Bangladesh Buildcon exhibitor profile",
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

export default function ExhibitorServicesPage() {
  return (
    <main className="min-h-screen bg-brand-light text-brand-dark selection:bg-brand-primary selection:text-white">
      <PageHero
        title="Exhibitor Services"
        highlightTitle="& Participation"
        badgeText="10th Bangladesh Buildcon · 2026"
        intro={`Plan your exhibition participation at ${event.name}. ${event.dates.display} · ${event.venue.name}, ${event.venue.city}.`}
        image={{
          src: PAGE_IMAGE,
          alt: "Construction machinery and equipment representing Bangladesh Buildcon 2026",
        }}
      />

      <ExhibitorServicesClientView />
    </main>
  );
}
