import type { Metadata } from "next";

import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { TermsContent } from "@/components/legal/TermsContent";

/* ==========================================
   ADVANCED SEO CONFIGURATION
========================================== */

const PAGE_PATH = "/terms-and-conditions";

const PAGE_TITLE =
  "Terms and Conditions | Bangladesh Buildcon International Expo 2027";

const PAGE_DESCRIPTION =
  `Read the Terms and Conditions for ${event.name}. ` +
  `Understand website usage, exhibitor enquiries, visitor ` +
  `registration, intellectual property, event information ` +
  `and participation-related conditions.`;

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
  },

  twitter: {
    card: "summary",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
    },
  },
};

/* ==========================================
   TERMS PAGE
========================================== */

export default function TermsPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  let pageUrl: string | null = null;

  if (siteUrl) {
    try {
      const parsed = new URL(siteUrl);

      if (parsed.protocol === "https:" || parsed.protocol === "http:") {
        pageUrl = new URL(PAGE_PATH, parsed.origin).toString();
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
        isPartOf: {
          "@type": "WebSite",
          name: event.name,
          url: new URL("/", pageUrl).toString(),
        },
        about: {
          "@type": "Event",
          name: event.name,
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
        title="Terms &"
        highlightTitle="Conditions"
        badgeText="Website Terms · Bangladesh Buildcon"
        intro={`Review the website usage and participation-related terms for ${event.name}, scheduled for ${event.dates.display} at ${event.venue.name}, ${event.venue.city}.`}
      />

      <TermsContent />
    </main>
  );
}
