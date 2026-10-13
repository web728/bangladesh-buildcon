
import type { Metadata } from "next";

import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { VenueClientView } from "@/components/about/VenueClientView";

/* ==========================================
   ADVANCED SEO
========================================== */

const PAGE_PATH = "/venue";

const PAGE_TITLE =
  "ICCB Exhibition Hall, Dhaka | Bangladesh Buildcon 2026 Venue";

const PAGE_DESCRIPTION =
  "Explore ICCB Exhibition Hall in Dhaka, the official " +
  "venue for the 10th Bangladesh Buildcon International " +
  "Expo 2026, 17–19 September. Find venue information, " +
  "Google Maps directions and visitor planning resources.";

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
    siteName: event.name,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: PAGE_IMAGE,
        alt: "ICCB Exhibition Hall in Dhaka, venue of Bangladesh Buildcon 2026",
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
   VENUE PAGE
========================================== */

export default function VenuePage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  let pageUrl: string | null = null;

  if (siteUrl) {
    try {
      const parsed = new URL(siteUrl);

      if (
        parsed.protocol === "https:" ||
        parsed.protocol === "http:"
      ) {
        pageUrl = new URL(
          PAGE_PATH,
          parsed.origin
        ).toString();
      }
    } catch {
      pageUrl = null;
    }
  }

  const jsonLd = pageUrl
    ? {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: PAGE_TITLE,
        description: PAGE_DESCRIPTION,
        url: pageUrl,
        mainEntity: {
          "@type": "Place",
          name: event.venue.name,
          address: {
            "@type": "PostalAddress",
            addressLocality: event.venue.city,
            addressCountry: "BD",
          },
          subjectOf: {
            "@type": "Event",
            name: event.name,
            startDate: "2026-09-17",
            endDate: "2026-09-19",
            location: {
              "@type": "Place",
              name: event.venue.name,
              address: {
                "@type": "PostalAddress",
                addressLocality: event.venue.city,
                addressCountry: "BD",
              },
            },
          },
        },
      }
    : null;

  return (
    <main className="min-h-screen bg-brand-light text-brand-dark selection:bg-brand-primary selection:text-white">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(
              /</g,
              "\\u003c"
            ),
          }}
        />
      )}

      <PageHero
        title="Discover Our"
        highlightTitle="Exhibition Venue"
        badgeText="ICCB Exhibition Hall · Dhaka"
        intro={`Visit ${event.name} from ${event.dates.display} at ${event.venue.name}, ${event.venue.city}, Bangladesh. Explore the exhibition location and plan your visit.`}
        image={{
          src: PAGE_IMAGE,
          alt: "ICCB Exhibition Hall, Dhaka, official Bangladesh Buildcon International Expo 2026 venue",
        }}
      />

      <VenueClientView />
    </main>
  );
}
