
import type { Metadata } from "next";

import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { BookStandPageContent } from "@/components/exhibit/BookStandPageContent";

/* ==========================================
   SEO METADATA
========================================== */

const PAGE_TITLE =
  "Book an Exhibition Stand | 11th Bangladesh Buildcon 2027";

const PAGE_DESCRIPTION =
  `Enquire about exhibition stand participation at ` +
  `the 11th Bangladesh Buildcon International Expo 2027, ` +
  `17–19 November 2027 at ICCB Exhibition Hall, Dhaka. ` +
  `Showcase construction machinery, building materials, ` +
  `electrical systems and building technologies.`;

const PAGE_IMAGE =
  "/images/venue/iccb-exhibition-hall.jpg";

export const metadata: Metadata = {
  title: {
    absolute: PAGE_TITLE,
  },

  description: PAGE_DESCRIPTION,

  alternates: {
    canonical: "/book-a-stand",
  },

  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: "/book-a-stand",
    type: "website",
    siteName: event.name,
    locale: "en_US",
    images: [
      {
        url: PAGE_IMAGE,
        alt: "ICCB Exhibition Hall, Dhaka — Bangladesh Buildcon International Expo 2027",
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

/* ==========================================
   PAGE
========================================== */

export default function BookAStandPage() {
  return (
    <main className="min-h-screen bg-brand-light text-brand-dark selection:bg-brand-primary selection:text-white">
      <PageHero
        title="Book Your"
        highlightTitle="Exhibition Stand"
        badgeText="11th Bangladesh Buildcon · 2027"
        intro={`Enquire about stand participation at Bangladesh Buildcon International Expo, ${event.dates.display}, ${event.venue.name}, ${event.venue.city}.`}
        image={{
          src: PAGE_IMAGE,
          alt: "ICCB Exhibition Hall in Dhaka, the venue for Bangladesh Buildcon 2027",
        }}
      />

      <BookStandPageContent />
    </main>
  );
}
