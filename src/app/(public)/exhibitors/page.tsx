
import type { Metadata } from "next";

import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { ExhibitorDirectory } from "@/components/sections/ExhibitorDirectory";
import { ExhibitorDirectoryWrapper } from "@/components/exhibit/ExhibitorDirectoryWrapper";
import { getPublishedExhibitors } from "@/lib/data/exhibitors";

export const dynamic = "force-dynamic";

const PAGE_TITLE =
  "Exhibitor Directory | Bangladesh Buildcon International Expo 2027";

const PAGE_DESCRIPTION =
  `Explore published exhibitors at ${event.name}, ` +
  `${event.dates.display}, ICCB Exhibition Hall, Dhaka. ` +
  `Discover companies across construction machinery, building ` +
  `materials, electrical engineering, interior and exterior ` +
  `solutions, and safety technologies.`;

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,

  alternates: {
    canonical: "/exhibitors",
  },

  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: "/exhibitors",
    siteName: event.name,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/sectors/construction-crane-bangladesh.jpg",
        alt: "Bangladesh Buildcon 2027 exhibition directory",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [
      "/images/sectors/construction-crane-bangladesh.jpg",
    ],
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

/*
  Original category headings from brochure page 3.
  These are exhibition scope categories,
  NOT a list of confirmed 2027 exhibitors.
*/
const BROCHURE_CATEGORIES = [
  {
    title: "Building & Construction Machinery and Equipment",
    examples:
      "Construction equipment, cranes, loaders, trucks, building tools, welding equipment, power tools and HVAC.",
  },
  {
    title: "Building & Materials",
    examples:
      "Prefabricated structures, roofing, insulation, waterproofing, wall materials and finishing materials.",
  },
  {
    title: "Building & Construction",
    examples:
      "Urban development, architecture, restoration, roads, construction automation and resource-saving technologies.",
  },
  {
    title: "Country Housing Landscaping",
    examples:
      "Wooden houses, log buildings, wooden-frame houses, garden houses and landscape design.",
  },
  {
    title: "Electricity and Electrical Engineering in Building & Construction",
    examples:
      "Distribution systems, transformer stations, high- and low-voltage equipment, automation and energy-saving systems.",
  },
  {
    title: "Interior & Exterior",
    examples:
      "Interior and exterior design, roofing, furniture, glass, paints, doors and related services.",
  },
  {
    title: "Safety & Security",
    examples:
      "Electrical safety, emergency alarms, emergency signage, rescue equipment, security systems and sensors.",
  },
] as const;

export default async function ExhibitorsPage() {
  const exhibitors = await getPublishedExhibitors();

  // Only publish structured data for actual public
  // exhibitor records when a valid site URL exists.
  let directoryUrl: string | null = null;

  if (process.env.NEXT_PUBLIC_SITE_URL) {
    try {
      directoryUrl = new URL(
        "/exhibitors",
        process.env.NEXT_PUBLIC_SITE_URL
      ).toString();
    } catch {
      directoryUrl = null;
    }
  }

  const structuredData =
    directoryUrl && exhibitors.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: PAGE_TITLE,
          description: PAGE_DESCRIPTION,
          url: directoryUrl,
          mainEntity: {
            "@type": "ItemList",
            name: "Published Bangladesh Buildcon Exhibitors",
            numberOfItems: exhibitors.length,
            itemListElement: exhibitors.map(
              (exhibitor, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: exhibitor.companyName,
                url: new URL(
                  `/exhibitors/${encodeURIComponent(
                    exhibitor.slug
                  )}`,
                  directoryUrl
                ).toString(),
              })
            ),
          },
        }
      : null;

  return (
    <main className="min-h-screen bg-brand-light selection:bg-brand-primary selection:text-white">
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              structuredData
            ).replace(/</g, "\\u003c"),
          }}
        />
      )}

      <PageHero
        title="Meet the"
        highlightTitle="Exhibitors & Brands"
        badgeText="11th Bangladesh Buildcon · 2027"
        intro={`Explore published exhibitor profiles for ${event.dates.display} at ${event.venue.name}, ${event.venue.city}.`}
        image={{
          src: "/images/sectors/construction-crane-bangladesh.jpg",
          alt: "Construction machinery representing the Bangladesh Buildcon exhibitor profile",
        }}
      />

      <section
        aria-labelledby="directory-heading"
        className="relative overflow-hidden bg-brand-light py-10 sm:py-14 lg:py-16"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.45] bg-[linear-gradient(to_right,rgba(5,7,9,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(5,7,9,0.025)_1px,transparent_1px)] bg-[size:64px_64px]"
        />

        <Container className="relative z-10">
          <header className="mb-7 flex flex-col gap-4 border-b border-black/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2.5">
                <span className="h-[2px] w-7 bg-brand-primary" />

                <p className="font-heading text-[10px] font-extrabold uppercase tracking-[0.16em] text-brand-primary-dark">
                  Official Exhibition Directory
                </p>
              </div>

              <h2
                id="directory-heading"
                className="mt-3 font-heading text-[clamp(1.5rem,2.7vw,2.15rem)] font-extrabold leading-tight tracking-[-0.04em] text-brand-dark"
              >
                Discover Participating{" "}
                <span className="text-brand-primary-dark">
                  Companies
                </span>
              </h2>

              <p className="mt-3 text-[13px] leading-[1.85] text-[#404650] sm:text-sm">
                Browse the published company directory
                to explore participating manufacturers,
                suppliers and construction-industry brands.
              </p>
            </div>

           
          </header>

          {exhibitors.length > 0 ? (
            <ExhibitorDirectoryWrapper>
              <ExhibitorDirectory
                exhibitors={exhibitors}
              />
            </ExhibitorDirectoryWrapper>
          ) : (
            <div className="space-y-8">
              <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-[0_8px_28px_rgba(5,7,9,0.035)] sm:p-7">
                <EmptyState
                  title="Exhibitor Directory Coming Soon"
                  body="No exhibitor profiles are published yet. Company listings will appear here as they become available."
                />
              </div>

              <section
                aria-labelledby="exhibition-scope-heading"
                className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_8px_28px_rgba(5,7,9,0.035)]"
              >
                <div className="border-b border-black/10 p-5 sm:p-7">
                  <p className="font-heading text-[10px] font-bold uppercase tracking-[0.16em] text-brand-primary-dark">
                    From the Official 2027 Brochure
                  </p>

                  <h3
                    id="exhibition-scope-heading"
                    className="mt-2 font-heading text-xl font-extrabold tracking-tight text-brand-dark sm:text-2xl"
                  >
                    Exhibitor{" "}
                    <span className="text-brand-primary-dark">
                      Profile
                    </span>
                  </h3>

                  <p className="mt-2 text-[13px] leading-[1.8] text-[#404650]">
                    The brochure outlines these seven
                    broad product and industry groups.
                    These categories describe the event
                    scope, not confirmed companies.
                  </p>
                </div>

                <div className="grid gap-3 p-5 sm:grid-cols-2 sm:p-7">
                  {BROCHURE_CATEGORIES.map(
                    (category, index) => (
                      <article
                        key={category.title}
                        className="flex gap-3 rounded-xl border border-black/10 bg-brand-light p-4"
                      >
                      

                        <div>
                          <h4 className="font-heading text-[13px] font-extrabold leading-[1.5] text-brand-dark">
                            {category.title}
                          </h4>

                          <p className="mt-1 text-[12px] leading-[1.8] text-[#404650]">
                            {category.examples}
                          </p>
                        </div>
                      </article>
                    )
                  )}
                </div>
              </section>
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}
