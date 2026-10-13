
import type { Metadata } from "next";

import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { AboutClientView } from "@/components/about/AboutClientView";

const pageTitle =
  "About Bangladesh Buildcon 2026 | International Construction Expo";

const pageDescription =
  `Discover ${event.name}, an international B2B construction exhibition ` +
  `connecting building material manufacturers, machinery suppliers, ` +
  `technology providers and trade buyers in Bangladesh. ` +
  `Dates: ${event.dates.display}. Venue: ${event.venue.fullLocation}.`;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,

  alternates: {
    canonical: "/about",
  },

  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "/about",
    type: "website",
    images: [
      {
        url: "/images/sectors/construction-crane-bangladesh.jpg",
        alt: "Bangladesh Buildcon International Construction Exhibition",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [
      "/images/sectors/construction-crane-bangladesh.jpg",
    ],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F8F9FB] selection:bg-brand-primary selection:text-white">
      <PageHero
        title="Connecting Global Manufacturers"
        highlightTitle="With Construction Markets"
        badgeText="About Bangladesh Buildcon 2026"
        intro="An international B2B platform bringing building materials, construction machinery and advanced technologies closer to trade buyers in Bangladesh."
        image={{
          src: "/images/sectors/construction-crane-bangladesh.jpg",
          alt: "Construction crane representing the building and infrastructure sector at Bangladesh Buildcon 2026",
        }}
      />

      <AboutClientView />
    </main>
  );
}
