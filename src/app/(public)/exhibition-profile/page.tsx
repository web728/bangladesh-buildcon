import type { Metadata } from "next";

import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { ExhibitionProfileExplorer } from "@/components/exhibit/ExhibitionProfileExplorer";
import { exhibitionSectors } from "@/data/exhibitionProfile";

/* ==========================================
   PAGE SEO
========================================== */

const PAGE_PATH = "/exhibition-profile";

const PAGE_TITLE =
  "Exhibitor Profile Building Materials & Construction Products | Bangladesh Buildcon 2027";

const PAGE_DESCRIPTION =
  `Explore ${exhibitionSectors.length} main exhibitor profile categories ` +
  `at the 11th Bangladesh Buildcon International Expo 2027. ` +
  `Discover construction machinery, building materials, electrical ` +
  `engineering, interiors, landscaping and safety products. ` +
  `11-13 November 2027, ICCB Expo Village, Dhaka.`;

const PAGE_IMAGE = "/images/sectors/construction-crane-bangladesh.jpg";

export const metadata: Metadata = {
  title: {
    absolute: PAGE_TITLE,
  },

  description: PAGE_DESCRIPTION,

  alternates: {
    canonical: PAGE_PATH,
  },

  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_PATH,
    type: "website",
    siteName: event.name,
    locale: "en_US",
    images: [
      {
        url: PAGE_IMAGE,
        alt: "Construction machinery and building materials featured in Bangladesh Buildcon 2027",
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
      "max-snippet": -1,
    },
  },
};

/* ==========================================
   PAGE COMPONENT
========================================== */

export default function ExhibitionProfilePage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  let pageUrl: string | null = null;

  if (siteUrl) {
    try {
      const parsedUrl = new URL(siteUrl);

      if (parsedUrl.protocol === "https:" || parsedUrl.protocol === "http:") {
        pageUrl = new URL(PAGE_PATH, parsedUrl.origin).toString();
      }
    } catch {
      pageUrl = null;
    }
  }

  /* Only use actual exported sector data */
  const jsonLd = pageUrl
    ? {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: PAGE_TITLE,
        description: PAGE_DESCRIPTION,
        url: pageUrl,
        mainEntity: {
          "@type": "ItemList",
          name: `${event.name} Exhibitor Profile`,
          numberOfItems: exhibitionSectors.length,
          itemListElement: exhibitionSectors.map((sector, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: sector.name,
            url: `${pageUrl}#${encodeURIComponent(sector.slug)}`,
          })),
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
        title="Explore the"
        highlightTitle="Exhibitor Profile"
        badgeText={`11th Edition · ${exhibitionSectors.length} Main Categories`}
        intro={`Explore the construction machinery, building materials, electrical engineering, interiors and safety product categories from the official exhibition brochure. ${event.dates.display} · ${event.venue.name}, ${event.venue.city}.`}
        image={{
          src: PAGE_IMAGE,
          alt: "Construction machinery representing the Bangladesh Buildcon International Expo 2027 exhibitor profile",
        }}
      />

      <section
        aria-labelledby="exhibition-profile-heading"
        className="relative overflow-hidden border-t border-brand-border bg-brand-light py-10 sm:py-14 lg:py-16"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(5,7,9,0.018)_1px,transparent_1px),linear-gradient(to_bottom,rgba(5,7,9,0.018)_1px,transparent_1px)] bg-[size:64px_64px]"
        />

        <Container className="relative z-10">
          <ExhibitionProfileExplorer />
        </Container>
      </section>
    </main>
  );
}
