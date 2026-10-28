
import type { Metadata } from "next";

import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { WhyBangladeshClientView } from "@/components/about/WhyBangladeshClientView";

/* ==========================================
   ADVANCED SEO
========================================== */

const PAGE_PATH = "/why-bangladesh";

const PAGE_TITLE =
  "Why Bangladesh? | Building Materials & Construction Market Buildcon 2027";

const PAGE_DESCRIPTION =
  "Explore Bangladesh's Building & construction market, urban " +
  "development and opportunities across building materials, " +
  "machinery, engineering and construction technologies. " +
  "Discover Bangladesh Buildcon International Expo 2027, " +
  "17–19 November at ICCB Exhibition Hall, Dhaka.";

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
    type: "website",
    siteName: event.name,
    locale: "en_US",
    images: [
      {
        url: PAGE_IMAGE,
        alt: "Building and construction industry in Bangladesh",
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

export default function WhyBangladeshPage() {
  let pageUrl: string | null = null;

  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL;

  if (configuredUrl) {
    try {
      const site = new URL(configuredUrl);

      if (
        site.protocol === "https:" ||
        site.protocol === "http:"
      ) {
        pageUrl = new URL(
          PAGE_PATH,
          site.origin
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
        about: [
          {
            "@type": "Place",
            name: "Bangladesh",
            address: {
              "@type": "PostalAddress",
              addressCountry: "BD",
            },
          },
          {
            "@type": "Event",
            name: event.name,
            startDate: "2027-09-17",
            endDate: "2027-09-19",
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
        ],
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
        title="Why"
        highlightTitle="Bangladesh?"
        badgeText="Building Materials & Construction Industry · Market Perspective"
        intro={`Explore the Building & construction-related business opportunities and industry sectors addressed by ${event.name}. ${event.dates.display} · ${event.venue.name}, ${event.venue.city}.`}
        image={{
          src: PAGE_IMAGE,
          alt: "Bangladesh Building & construction and infrastructure industry",
        }}
      />

      <WhyBangladeshClientView />
    </main>
  );
}
