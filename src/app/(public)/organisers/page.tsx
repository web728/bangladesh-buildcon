
import type { Metadata } from "next";

import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { OrganisersClientView } from "@/components/about/OrganisersClientView";

const PAGE_PATH = "/organisers";

const PAGE_TITLE =
  "Official Organisers | Futurex & ASK Trade | Bangladesh Buildcon 2027";

const PAGE_DESCRIPTION =
  "Meet Futurex Trade Fair & Events Pvt. Ltd. and " +
  "ASK Trade & Exhibitions Pvt. Ltd., organisers of the " +
  "11th Bangladesh Buildcon International Expo 2027. " +
  "17–19 November 2027 at ICCB Exhibition Hall, Dhaka.";

const PAGE_IMAGE =
  "/images/sectors/construction-crane-bangladesh.jpg";

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
        alt: "Bangladesh Buildcon 2027 official exhibition organisers",
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
    },
  },
};

export default function OrganisersPage() {
  let pageUrl: string | null = null;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

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
        "@type": "AboutPage",
        name: PAGE_TITLE,
        description: PAGE_DESCRIPTION,
        url: pageUrl,
        mainEntity: {
          "@type": "ItemList",
          name: "Bangladesh Buildcon 2027 Organisers",
          numberOfItems: 2,
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              item: {
                "@type": "Organization",
                name: "Futurex Trade Fair & Events Pvt. Ltd.",
                url: "https://www.futurextrade.com/",
              },
            },
            {
              "@type": "ListItem",
              position: 2,
              item: {
                "@type": "Organization",
                name: "ASK Trade & Exhibitions Pvt. Ltd.",
              },
            },
          ],
        },
        about: {
          "@type": "ExhibitionEvent",
          name: "11th Bangladesh Buildcon International Expo 2027",
          startDate: "2027-09-17",
          endDate: "2027-09-19",
          location: {
            "@type": "Place",
            name: "ICCB Exhibition Hall",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Dhaka",
              addressCountry: "BD",
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
        title="Meet the Official"
        highlightTitle="Exhibition Organisers"
        badgeText="11th Bangladesh Buildcon · 2027"
        intro={`Futurex Trade Fair & Events Pvt. Ltd. and ASK Trade & Exhibitions Pvt. Ltd. organise Bangladesh Buildcon International Expo. ${event.dates.display} · ${event.venue.name}, ${event.venue.city}.`}
        image={{
          src: PAGE_IMAGE,
          alt: "Construction and infrastructure industry representing Bangladesh Buildcon 2027",
        }}
      />

      <OrganisersClientView />
    </main>
  );
}
