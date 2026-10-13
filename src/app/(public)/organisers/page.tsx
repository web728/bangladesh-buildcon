
import type { Metadata } from "next";

import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { OrganisersClientView } from "@/components/about/OrganisersClientView";

/* ==========================================
   SEO CONFIGURATION
========================================== */

const PAGE_TITLE =
  "Official Organisers | Futurex & ASK Trade | Bangladesh Buildcon 2026";

const PAGE_DESCRIPTION =
  `Meet the official organisers of ${event.name}: ` +
  `Futurex Trade Fair & Events Pvt. Ltd. and ` +
  `ASK Trade & Exhibitions Pvt. Ltd. ` +
  `Explore their exhibition expertise and contact ` +
  `the organising teams for ${event.dates.display} ` +
  `at ${event.venue.fullLocation}.`;

const OG_IMAGE =
  "/images/sectors/construction-crane-bangladesh.jpg";

export const metadata: Metadata = {
  title: PAGE_TITLE,

  description: PAGE_DESCRIPTION,

  keywords: [
    "Bangladesh Buildcon 2026 organisers",
    "Bangladesh Buildcon official organisers",
    "Futurex Trade Fair & Events",
    "ASK Trade & Exhibitions",
    "Bangladesh construction exhibition",
    "Buildcon 2026 Dhaka",
    "construction trade fair organisers Bangladesh",
    "international exhibition organisers",
  ],

  alternates: {
    canonical: "/organisers",
  },

  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: "/organisers",
    type: "website",
    siteName: event.name,
    locale: "en_US",
    images: [
      {
        url: OG_IMAGE,
        alt: "Bangladesh Buildcon 2026 official exhibition organisers",
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
  },
};

/* ==========================================
   ORGANISERS PAGE
========================================== */

export default function OrganisersPage() {
  return (
    <main className="min-h-screen bg-[#F8F9FB] selection:bg-brand-primary selection:text-white">
      <PageHero
        title="The People Behind"
        highlightTitle="Bangladesh Buildcon 2026"
        badgeText="Official Exhibition Organisers"
        intro="Discover the international exhibition expertise and local industry networks of Futurex Trade Fair & Events and ASK Trade & Exhibitions."
        image={{
          src: "/images/sectors/construction-crane-bangladesh.jpg",
          alt: "Construction and infrastructure industry in Bangladesh",
        }}
      />

      <OrganisersClientView />
    </main>
  );
}
