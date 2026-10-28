import type { Metadata } from "next";

import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { ContactClientView } from "@/components/sections/ContactClientView";

const PAGE_TITLE =
  "Contact Bangladesh Buildcon 2027 | Exhibitor & Visitor Enquiries";

const PAGE_DESCRIPTION =
  `Contact the organisers of the 11th Bangladesh Buildcon ` +
  `International Expo 2027, Futurex Trade Fair & Events ` +
  `Pvt. Ltd. and ASK Trade & Exhibitions Pvt. Ltd. ` +
  `Enquire about participation at ICCB Expo Village, ` +
  `Dhaka, 11-13 November 2027.`;

const PAGE_IMAGE = "/images/venue/iccb-exhibition-hall.jpg";

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
        alt: "ICCB Expo Village, Dhaka — Bangladesh Buildcon 2027",
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
        process.env.NEXT_PUBLIC_SITE_URL,
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
          name: "11th Bangladesh Buildcon International Expo 2027",
          startDate: "2027-09-11",
          endDate: "2027-09-13",
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
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      )}

      <PageHero
        title="Contact the"
        highlightTitle="Organising Team"
        badgeText="11th Bangladesh Buildcon · 2027"
        intro={`For exhibition and visitor enquiries, contact the official organising team.`}
        image={{
          src: PAGE_IMAGE,
          alt: "ICCB Expo Village in Dhaka, venue of Bangladesh Buildcon International Expo 2027",
        }}
      />

      <ContactClientView />
    </main>
  );
}
