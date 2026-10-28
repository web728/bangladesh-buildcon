
import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";

import "./globals.css";

import { event } from "@/config/event";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { Analytics } from "@/components/ui/Analytics";
import { InitialSiteLoader } from "@/components/ui/InitialSiteLoader";

/* =========================================
   FONTS
========================================= */

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/* =========================================
   WEBSITE CONFIGURATION
========================================= */

const siteUrl = "https://bangladeshbuildcon.com";

const officialEventName =
  "11th Bangladesh Buildcon International Expo 2027";

const ogImage = "/images/og/og-default.jpg";

const siteLogo =
  "/logos/bangladesh-buildcon-international-expo-2027-logo.png";

const siteTitle =
  "11th Bangladesh Buildcon International Expo 2027 | Dhaka";

const siteDescription =
  "Explore Bangladesh's building and construction industry " +
  "at the 11th Bangladesh Buildcon International Expo 2027. " +
  "11–13 November 2027 at ICCB Expo Village, Dhaka. " +
  "Discover building materials, construction machinery, " +
  "equipment and technologies.";

/* =========================================
   GLOBAL SEO METADATA
========================================= */

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  applicationName: officialEventName,

  title: {
    default: siteTitle,
    template: `%s | ${officialEventName}`,
  },

  description: siteDescription,

  // Homepage canonical.
  // Other pages should define their own canonicals.
  alternates: {
    canonical: "/",
  },

  /* Google Search Console */
  verification: {
    google:
      "I9EqUpeShH-pX_LtstXh1uRmKIYnDilMgaaduU2VeoM",
  },

  /* Search Engine Indexing */
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  /* Relevant Search Keywords */
  keywords: [
    "11th Bangladesh Buildcon International Expo 2027",
    "Bangladesh Buildcon International Expo",
    "Bangladesh Buildcon 2027",
    "Bangladesh construction exhibition",
    "Building and construction exhibition Bangladesh",
    "Building materials exhibition Bangladesh",
    "Construction machinery exhibition Bangladesh",
    "Construction equipment exhibition Bangladesh",
    "Building technology exhibition",
    "Construction trade show Dhaka",
    "B2B construction exhibition Bangladesh",
    "ICCB Expo Village Dhaka",
  ],

  /* Open Graph */
  openGraph: {
    type: "website",
    locale: "en_BD",
    siteName: officialEventName,
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    images: [
      {
        url: ogImage,
        width: 1711,
        height: 1143,
        alt: officialEventName,
      },
    ],
  },

  /* Social Sharing */
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [ogImage],
  },

  /* Website Icons */
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },

  category: "business",
};

/* =========================================
   VIEWPORT
========================================= */

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#BA1D82",
};

/* =========================================
   STRUCTURED DATA
========================================= */

const jsonLd = {
  "@context": "https://schema.org",

  "@graph": [
    /* Organisation */
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: officialEventName,
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}${siteLogo}`,
      },
    },

    /* Website */
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: officialEventName,
      url: siteUrl,
      inLanguage: "en-BD",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
    },

    /* Homepage */
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      name: siteTitle,
      url: siteUrl,
      description: siteDescription,
      inLanguage: "en-BD",
      isPartOf: {
        "@id": `${siteUrl}/#website`,
      },
      about: {
        "@id": `${siteUrl}/#event`,
      },
    },

    /* Exhibition Event */
    {
      "@type": "ExhibitionEvent",
      "@id": `${siteUrl}/#event`,

      name: officialEventName,

      description:
        "An international B2B trade exhibition for the " +
        "building and construction industry, bringing together " +
        "manufacturers, suppliers, buyers, contractors, " +
        "architects, engineers and industry professionals.",

      url: siteUrl,

      image: `${siteUrl}${ogImage}`,

      startDate: "2027-11-11T10:00:00+06:00",
      endDate: "2027-11-13T18:00:00+06:00",

      eventStatus:
        "https://schema.org/EventScheduled",

      eventAttendanceMode:
        "https://schema.org/OfflineEventAttendanceMode",

      isAccessibleForFree: true,

      location: {
        "@type": "Place",
        name: "ICCB Expo Village",
        address: {
          "@type": "PostalAddress",
          streetAddress: "ICCB Expo Village",
          addressLocality: "Dhaka",
          addressCountry: "BD",
        },
      },

      organizer: event.organisers.map((organizer) => ({
        "@type": "Organization",
        name: organizer.name,
        url: organizer.url,
      })),
    },
  ],
};

/* =========================================
   ROOT LAYOUT
========================================= */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col overflow-x-clip bg-white font-sans text-brand-dark">

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(
              /</g,
              "\\u003c"
            ),
          }}
        />

        {/* Initial Website Loader */}
        <InitialSiteLoader />

        {/* Website Content */}
        {children}

        {/* Cookie Consent */}
        <CookieConsent />

        {/* Analytics */}
        <Analytics />

      </body>
    </html>
  );
}
