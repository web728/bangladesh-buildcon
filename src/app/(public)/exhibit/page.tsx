
import type { Metadata } from "next";

import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { ExhibitClientView } from "@/components/exhibit/ExhibitClientView";

const PAGE_TITLE =
  "Why Exhibit at Bangladesh Buildcon 2027 | Exhibitor Benefits";

const PAGE_DESCRIPTION =
  `Explore the benefits of exhibiting at ${event.name}. ` +
  `Connect with construction buyers, contractors, distributors ` +
  `and industry specifiers in Dhaka. Discover exhibitor ` +
  `categories and stand participation options for ${event.dates.display}.`;

const OG_IMAGE =
  "/images/sectors/construction-crane-bangladesh.jpg";

export const metadata: Metadata = {
  title: {
    absolute: PAGE_TITLE,
  },

  description: PAGE_DESCRIPTION,

  alternates: {
    canonical: "/exhibit",
  },

  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: "/exhibit",
    siteName: event.name,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: OG_IMAGE,
        alt: "Bangladesh Buildcon 2027 construction exhibition",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [OG_IMAGE],
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

export default function ExhibitPage() {
  return (
    <main className="min-h-screen bg-[#F8F9FB] selection:bg-brand-primary selection:text-white">
      <PageHero
        title="Grow Your Business"
        highlightTitle="Exhibit at Buildcon 2027"
        badgeText="Exhibitor Opportunities"
        intro="Meet construction buyers, distributors, contractors and industry specifiers at Bangladesh Buildcon International Expo in Dhaka."
        image={{
          src: "/images/sectors/construction-crane-bangladesh.jpg",
          alt: "Construction machinery and building industry infrastructure representing exhibitor opportunities at Bangladesh Buildcon 2027",
        }}
      />

      <ExhibitClientView />
    </main>
  );
}
