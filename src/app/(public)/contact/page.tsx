
import type { Metadata } from "next";

import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { ContactClientView } from "@/components/sections/ContactClientView";

const PAGE_TITLE =
  "Contact Bangladesh Buildcon 2026 | Exhibitor & Visitor Enquiries";

const PAGE_DESCRIPTION =
  `Contact the organisers of the 10th Bangladesh Buildcon ` +
  `International Expo 2026, Futurex Trade Fair & Events ` +
  `Pvt. Ltd. and ASK Trade & Exhibitions Pvt. Ltd. ` +
  `Enquire about participation at ICCB Exhibition Hall, ` +
  `Dhaka, 17–19 September 2026.`;

const PAGE_IMAGE =
  "/images/venue/iccb-exhibition-hall.jpg";

export const metadata: Metadata = {
  title: {
    absolute: PAGE_TITLE,
  },
  description: PAGE_DESCRIPTION,

  alternates: {
    canonical: "/contact",
  },

  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: "/contact",
    type: "website",
    siteName: event.name,
    locale: "en_US",
    images: [
      {
        url: PAGE_IMAGE,
        alt: "ICCB Exhibition Hall, Dhaka — Bangladesh Buildcon 2026",
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

export default function ContactPage() {
  let pageUrl: string | null = null;

  if (process.env.NEXT_PUBLIC_SITE_URL) {
    try {
      pageUrl = new URL(
        "/contact",
        process.env.NEXT_PUBLIC_SITE_URL
      ).toString();
    } catch {
      pageUrl = null;
    }
  }

  const jsonLd = pageUrl
    ? {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: PAGE_TITLE,
        description: PAGE_DESCRIPTION,
        url: pageUrl,
        about: {
          "@type": "Event",
          name: "10th Bangladesh Buildcon International Expo 2026",
          startDate: "2026-09-17",
          endDate: "2026-09-19",
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
              email: event.contact.futurex.email,
              telephone: event.contact.futurex.phone,
            },
            {
              "@type": "Organization",
              name: "ASK Trade & Exhibitions Pvt. Ltd.",
              email: event.contact.askTrade.email,
              telephone: event.contact.askTrade.phone,
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
        title="Contact the"
        highlightTitle="Organising Team"
        badgeText="10th Bangladesh Buildcon · 2026"
        intro={`For exhibition and visitor enquiries, contact the official organising team. ${event.dates.display} · ${event.venue.name}, ${event.venue.city}.`}
        image={{
          src: PAGE_IMAGE,
          alt: "ICCB Exhibition Hall in Dhaka, venue of Bangladesh Buildcon International Expo 2026",
        }}
      />

      <ContactClientView />
    </main>
  );
}
