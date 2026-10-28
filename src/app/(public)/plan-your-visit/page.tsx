import type { Metadata } from "next";

import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { PlanYourVisitClientView } from "@/components/visit/PlanYourVisitClientView";

const PAGE_PATH = "/plan-your-visit";

const PAGE_TITLE =
  "Plan Your Visit | Venue & Visitor Guide | Bangladesh Buildcon 2027";

const PAGE_DESCRIPTION =
  "Plan your visit to the 11th Bangladesh Buildcon " +
  "International Expo 2027, 11-13 November at " +
  "ICCB Expo Village, Dhaka. Find venue directions, " +
  "visitor information, travel guidance and organiser contacts.";

const PAGE_IMAGE = "/images/venue/iccb-exhibition-hall.jpg";

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
        alt: "ICCB Expo Village in Dhaka, venue for Bangladesh Buildcon 2027",
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

export default function PlanYourVisitPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  let pageUrl: string | null = null;

  if (siteUrl) {
    try {
      const origin = new URL(siteUrl);

      if (origin.protocol === "https:" || origin.protocol === "http:") {
        pageUrl = new URL(PAGE_PATH, origin.origin).toString();
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
        about: {
          "@type": "Event",
          name: "11th Bangladesh Buildcon International Expo 2027",
          startDate: "2027-09-17",
          endDate: "2027-09-19",
          location: {
            "@type": "Place",
            name: "ICCB Expo Village",
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
        },
      }
    : null;

  return (
    <main className="min-h-screen bg-brand-light text-brand-dark selection:bg-brand-primary selection:text-white">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      )}

      <PageHero
        title="Plan Your"
        highlightTitle="Visit to Buildcon"
        badgeText="Visitor Information · 2027"
        intro={`Visit the 11th Bangladesh Buildcon International Expo at ${event.venue.name}, ${event.venue.city}, from ${event.dates.display}. Find event details, venue directions and visitor guidance.`}
        image={{
          src: PAGE_IMAGE,
          alt: "ICCB Expo Village, Dhaka, Bangladesh — exhibition venue",
        }}
      />

      <PlanYourVisitClientView />
    </main>
  );
}
