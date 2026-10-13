
import type { Metadata } from "next";

import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { AboutClientView } from "@/components/about/AboutClientView";

const TITLE =
  "About Bangladesh Buildcon 2026 | 10th International Construction Expo";

const DESCRIPTION =
  "Discover the 10th Bangladesh Buildcon International Expo, " +
  "17–19 September 2026 at ICCB Exhibition Hall, Dhaka. " +
  "Explore construction machinery, building materials, electrical " +
  "engineering, interiors, safety technologies and B2B networking.";

const IMAGE =
  "/images/sectors/construction-crane-bangladesh.jpg";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,

  alternates: {
    canonical: "/about",
  },

  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: "/about",
    siteName: event.name,
    locale: "en_US",
    images: [
      {
        url: IMAGE,
        alt: "Bangladesh Buildcon International Expo 2026",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [IMAGE],
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

export default function AboutPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  let canonicalUrl: string | null = null;

  if (siteUrl) {
    try {
      canonicalUrl = new URL("/about", siteUrl).toString();
    } catch {
      canonicalUrl = null;
    }
  }

  const eventSchema = canonicalUrl
    ? {
        "@context": "https://schema.org",
        "@type": "ExhibitionEvent",
        name: "10th Bangladesh Buildcon International Expo 2026",
        description:
          "A B2B exhibition covering building, construction and infrastructure products and technologies.",
        startDate: "2026-09-17",
        endDate: "2026-09-19",
        eventAttendanceMode:
          "https://schema.org/OfflineEventAttendanceMode",
        location: {
          "@type": "Place",
          name: "ICCB Exhibition Hall",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Dhaka",
            addressCountry: "BD",
          },
        },
        organizer: [
          {
            "@type": "Organization",
            name: "Futurex Trade Fair & Events Pvt. Ltd.",
          },
          {
            "@type": "Organization",
            name: "ASK Trade & Exhibitions Pvt. Ltd.",
          },
        ],
        url: canonicalUrl.replace(/\/about\/?$/, "/"),
      }
    : null;

  return (
    <main className="min-h-screen bg-brand-light text-brand-dark selection:bg-brand-primary selection:text-white">
      {eventSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(eventSchema).replace(
              /</g,
              "\\u003c"
            ),
          }}
        />
      )}

      <PageHero
        title="About Bangladesh"
        highlightTitle="Buildcon 2026"
        badgeText="10th International Edition"
        intro={`The international B2B exhibition for the building and construction industry. ${event.dates.display} · ${event.venue.name}, ${event.venue.city}.`}
        image={{
          src: IMAGE,
          alt: "Construction machinery representing the Bangladesh Buildcon 2026 exhibitor profile",
        }}
      />

      <AboutClientView />
    </main>
  );
}
