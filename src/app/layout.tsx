
import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";

import "./globals.css";

import { event } from "@/config/event";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { Analytics } from "@/components/ui/Analytics";
import { InitialSiteLoader } from "@/components/ui/InitialSiteLoader";

// Fonts
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

// Website configuration
const siteUrl = "https://bangladeshbuildcon.com";
const ogImage = "/images/og/og-default.jpg";

const siteTitle =
  `${event.name} | ${event.dates.display}, ${event.venue.fullLocation}`;

const siteDescription =
  `${event.descriptor}. ${event.dates.display} at ` +
  `${event.venue.fullLocation}. ${event.brandLines.main}`;

// Global SEO
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  applicationName: event.name,

  title: {
    default: siteTitle,
    template: `%s | ${event.shortName}`,
  },

  description: siteDescription,

  verification: {
    google: "fvgeKPlfhI9tgn9H1afLFZdKbjHXd16CoEX6JlIv4ik",
  },

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

  keywords: [
    "Bangladesh Buildcon",
    "Bangladesh Buildcon International Expo",
    "Bangladesh construction exhibition",
    "Building materials exhibition Bangladesh",
    "Construction machinery exhibition Bangladesh",
    "Dhaka construction expo",
  ],

  openGraph: {
    type: "website",
    siteName: event.name,
    locale: "en_BD",
    title: siteTitle,
    description: siteDescription,
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
    title: siteTitle,
    description: siteDescription,
    images: [ogImage],
  },

  category: "events",
};

// Viewport
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#BA1D82",
};

// Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: event.name,
      url: siteUrl,
      logo: `${siteUrl}/logos/bangladesh-buildcon-logo.png`,
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: event.name,
      url: siteUrl,
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
      inLanguage: "en-BD",
    },
    {
      "@type": "ExhibitionEvent",
      "@id": `${siteUrl}/#event`,
      name: event.name,
      alternateName: event.shortName,
      description: event.descriptor,
      startDate: event.dates.start,
      endDate: event.dates.end,
      eventAttendanceMode:
        "https://schema.org/OfflineEventAttendanceMode",
      url: siteUrl,
      image: `${siteUrl}${ogImage}`,
      location: {
        "@type": "Place",
        name: event.venue.name,
        address: {
          "@type": "PostalAddress",
          streetAddress: event.venue.name,
          addressLocality: event.venue.city,
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

// Root Layout
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(
              /</g,
              "\\u003c"
            ),
          }}
        />

        <InitialSiteLoader />

        {children}

        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
