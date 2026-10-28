import type { Metadata } from "next";

import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { WhoShouldExhibitClientView } from "@/components/exhibit/WhoShouldExhibitClientView";
import { exhibitionSectors } from "@/data/exhibitionProfile";

/* ==========================================
   PAGE SEO
========================================== */

const PAGE_PATH = "/who-should-exhibit";

const PAGE_TITLE =
  "Who Should Exhibit | Bangladesh Buildcon International Expo 2027";

const PAGE_DESCRIPTION =
  "Explore exhibitor opportunities for manufacturers, " +
  "exporters, machinery suppliers, building material companies, " +
  "engineering businesses and construction technology providers " +
  "at Bangladesh Buildcon 2027, 11-13 November, ICCB Expo Village, Dhaka.";

const PAGE_IMAGE = "/images/sectors/construction-crane-bangladesh.jpg";

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
        alt: "Construction machinery and equipment representing the Bangladesh Buildcon 2027 exhibitor profile",
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
   PAGE
========================================== */

export default function WhoShouldExhibitPage() {
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
          name: event.name,
          startDate: "2027-09-11",
          endDate: "2027-09-13",
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
        mainEntity: {
          "@type": "ItemList",
          name: "Bangladesh Buildcon Exhibitor Sectors",
          numberOfItems: exhibitionSectors.length,
          itemListElement: exhibitionSectors.map((sector, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: sector.name,
            url: new URL(
              `/exhibition-profile#${sector.slug}`,
              pageUrl,
            ).toString(),
          })),
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
        title="Who Should"
        highlightTitle="Exhibit at Buildcon?"
        badgeText="11th Edition · Exhibitor Opportunities"
        intro={`Explore business profiles and product categories relevant to exhibiting at ${event.name}. ${event.dates.display} · ${event.venue.name}, ${event.venue.city}.`}
        image={{
          src: PAGE_IMAGE,
          alt: "Construction equipment and industrial machinery representing Bangladesh Buildcon exhibitors",
        }}
      />

      <WhoShouldExhibitClientView />
    </main>
  );
}
