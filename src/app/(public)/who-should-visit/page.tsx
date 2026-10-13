
import type { Metadata } from "next";

import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { WhoShouldVisitClientView } from "@/components/visit/WhoShouldVisitClientView";

const PAGE_PATH = "/who-should-visit";

const PAGE_TITLE =
  "Who Should Visit Bangladesh Buildcon 2026 | Trade Visitor Profile";

const PAGE_DESCRIPTION =
  "Explore the trade visitor profile for the 10th " +
  "Bangladesh Buildcon International Expo 2026. " +
  "Architects, civil engineers, consultants, builders, " +
  "government professionals, importers and distributors. " +
  "17–19 September, ICCB Exhibition Hall, Dhaka.";

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
        alt: "Construction industry professionals and trade visitors at Bangladesh Buildcon",
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

export default function WhoShouldVisitPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  let pageUrl: string | null = null;

  if (siteUrl) {
    try {
      const origin = new URL(siteUrl);

      if (
        origin.protocol === "https:" ||
        origin.protocol === "http:"
      ) {
        pageUrl = new URL(
          PAGE_PATH,
          origin.origin
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
        about: {
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
            __html: JSON.stringify(jsonLd).replace(
              /</g,
              "\\u003c"
            ),
          }}
        />
      )}

      <PageHero
        title="Who Should"
        highlightTitle="Visit Buildcon?"
        badgeText="Trade Visitor Profile · 10th Edition"
        intro={`Discover the professionals involved in designing, building, sourcing and supplying construction projects at ${event.name}. ${event.dates.display} · ${event.venue.name}, ${event.venue.city}.`}
        image={{
          src: PAGE_IMAGE,
          alt: "Trade visitors and construction industry professionals at Bangladesh Buildcon",
        }}
      />

      <WhoShouldVisitClientView />
    </main>
  );
}
