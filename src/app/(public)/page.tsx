import type { Metadata } from "next";

import { event } from "@/config/event";

import { HeroSection } from "@/components/sections/home/HeroSection";
import { HeroStatsSection } from "@/components/sections/home/HeroStatsSection";
import { IntroSection } from "@/components/sections/home/IntroSection";
import { WhyBangladeshSection } from "@/components/sections/home/WhyBangladeshSection";
import { ExhibitionProfileSection } from "@/components/sections/home/ExhibitionProfileSection";
import { WhyExhibitSection } from "@/components/sections/home/WhyExhibitSection";
import { WhoWillYouMeetSection } from "@/components/sections/home/WhoWillYouMeetSection";
import { VenueSection } from "@/components/sections/home/VenueSection";
import { PartnersSection } from "@/components/sections/home/PartnersSection";
import { NewsSection } from "@/components/sections/home/NewsSection";
import { FinalCtaSection } from "@/components/sections/home/FinalCtaSection";

/* ==========================================
   HOMEPAGE SEO
========================================== */

const SITE_URL = "https://bangladeshbuildcon.com/";

const PAGE_TITLE = "11th Bangladesh Buildcon International Expo 2027 | Dhaka";

const PAGE_DESCRIPTION =
  "Explore the 11th Bangladesh Buildcon International " +
  "Expo 2027, the building and construction industry " +
  "trade exhibition taking place 11-13 November 2027 " +
  "at ICCB Expo Village, Dhaka, Bangladesh. " +
  "Discover construction machinery, materials, " +
  "engineering, interiors and B2B networking opportunities.";

const OG_IMAGE = "/images/og/og-default.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    absolute: PAGE_TITLE,
  },

  description: PAGE_DESCRIPTION,

  applicationName: event.name,

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_BD",
    siteName: event.name,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: SITE_URL,
    images: [
      {
        url: OG_IMAGE,
        alt: "11th Bangladesh Buildcon International Expo 2027",
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
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
};

/* ==========================================
   VERIFIED EVENT STRUCTURED DATA
========================================== */

const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
      name: event.name,
      url: SITE_URL,
      inLanguage: "en-BD",
      description: PAGE_DESCRIPTION,
    },
    {
      "@type": "ExhibitionEvent",
      "@id": `${SITE_URL}#event-2027`,
      name: "11th Bangladesh Buildcon International Expo 2027",
      description: PAGE_DESCRIPTION,
      startDate: "2027-09-11",
      endDate: "2027-09-13",
      eventStatus: "https://schema.org/EventScheduled",
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
          url: "https://www.futurextrade.com/",
        },
        {
          "@type": "Organization",
          name: "ASK Trade & Exhibitions Pvt. Ltd.",
        },
      ],
      image: [
        new URL(
          "/images/home/bangladesh-buildcon-hero.jpg",
          SITE_URL,
        ).toString(),
      ],
      url: SITE_URL,
    },
  ],
};

/* ==========================================
   HOMEPAGE
========================================== */

export default function HomePage() {
  return (
    <main className="min-h-screen bg-brand-light text-brand-dark selection:bg-brand-primary selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homeStructuredData).replace(/</g, "\\u003c"),
        }}
      />

      {/* Main visual introduction */}
      <HeroSection />

      {/* Historical exhibition highlights */}
      <HeroStatsSection />

      {/* Official event introduction */}
      <IntroSection />

      {/* Bangladesh construction market perspective */}
      <WhyBangladeshSection />

      {/* Seven official brochure exhibitor sectors */}
      {/* <ExhibitionProfileSection /> */}

      {/* Exhibitor participation information */}
      {/* <WhyExhibitSection /> */}

      {/* Professional visitor audience */}
      {/* <WhoWillYouMeetSection /> */}

      {/* Official event venue */}
      {/* <VenueSection /> */}

      {/* Published industry and media partners */}
      {/* <PartnersSection /> */}

      {/* Published news and announcements */}
      {/* <NewsSection /> */}

      {/* Final registration and enquiry actions */}
      {/* <FinalCtaSection /> */}
    </main>
  );
}
