
import type { Metadata } from "next";
import { event } from "@/config/event";

import { HeroSection } from "@/components/sections/home/HeroSection";
import { HeroStatsSection } from "@/components/sections/home/HeroStatsSection";
import { IntroSection } from "@/components/sections/home/IntroSection";
import { WhyBangladeshSection } from "@/components/sections/home/WhyBangladeshSection";
import { ExhibitionProfileSection } from "@/components/sections/home/ExhibitionProfileSection";
import { WhyExhibitSection } from "@/components/sections/home/WhyExhibitSection";
import { WhoWillYouMeetSection } from "@/components/sections/home/WhoWillYouMeetSection";
import { ExhibitorDirectoryPreviewSection } from "@/components/sections/home/ExhibitorDirectoryPreviewSection";
import { VenueSection } from "@/components/sections/home/VenueSection";
import { PartnersSection } from "@/components/sections/home/PartnersSection";
import { NewsSection } from "@/components/sections/home/NewsSection";
import { FinalCtaSection } from "@/components/sections/home/FinalCtaSection";

const siteUrl = "https://bangladeshbuildcon.com/";
const ogImage = "/images/og/og-default.jpg";

const pageTitle =
  `${event.name} | Building & Construction Exhibition in Bangladesh`;

const pageDescription =
  `${event.descriptor}. ${event.dates.display} at ` +
  `${event.venue.fullLocation}. ${event.brandLines.main}`;

export const metadata: Metadata = {
  title: {
    absolute: pageTitle,
  },

  description: pageDescription,

  alternates: {
    canonical: siteUrl,
  },

  openGraph: {
    type: "website",
    locale: "en_BD",
    siteName: event.name,
    title: pageTitle,
    description: pageDescription,
    url: siteUrl,
    images: [
      {
        url: ogImage,
        width: 1711,
        height: 1143,
        alt: event.name,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [ogImage],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HeroStatsSection />
      <IntroSection />
      <WhyBangladeshSection />
      <ExhibitionProfileSection />
      <WhyExhibitSection />
      <WhoWillYouMeetSection />
      {/* <ExhibitorDirectoryPreviewSection /> */}
      <VenueSection />
      <PartnersSection />
      <NewsSection />
      <FinalCtaSection />
    </>
  );
}
