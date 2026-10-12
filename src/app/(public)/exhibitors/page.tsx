import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { ExhibitorDirectory } from "@/components/sections/ExhibitorDirectory";
import { getPublishedExhibitors } from "@/lib/data/exhibitors";
import { ExhibitorDirectoryWrapper } from "@/components/exhibit/ExhibitorDirectoryWrapper";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Exhibitor Directory | Bangladesh Buildcon 2026",
  description:
    "Explore participating manufacturers, heavy machinery producers, and building material suppliers exhibiting at Bangladesh Buildcon International Expo 2026.",
  alternates: { canonical: "/exhibitors" },
};

// 15 Sectors from Brochure Page 02 ("What's on Display?")
const BROCHURE_SECTORS = [
  "Building Materials",
  "Construction Machinery & Equipment",
  "Doors, Windows, Glass & Aluminium",
  "Tiles, Marble, Stone & Surfaces",
  "Interiors & Finishing Materials",
  "Electrical, Power & Lighting",
  "Water, Plumbing & Pumps",
  "Sanitaryware & Bathroom",
  "Steel, Metal & Structural Products",
  "Hardware, Tools & Fasteners",
  "HVAC & Building Services",
  "Solar, Energy & Power Solutions",
  "Paints, Coatings & Chemicals",
  "Prefab & Pre-Engineered Buildings",
  "Fire, Safety & Security",
];

export default async function ExhibitorsPage() {
  const exhibitors = await getPublishedExhibitors();

  return (
    <main className="min-h-screen bg-[#fafbfd] selection:bg-brand-blue selection:text-white">
      <PageHero
        title="Participating Exhibitors & Brands"
        intro="Browse confirmed international manufacturers, local suppliers, and technology innovators showcasing building and construction solutions at ICCB Exhibition Hall, Dhaka."
        image={{
          src: "/images/sectors/construction-crane-bangladesh.jpg",
          alt: "Bangladesh Buildcon Exhibition Floor",
        }}
      />

      <section className="relative overflow-hidden py-14 sm:py-20 border-b border-slate-200/80">
        {/* Background Architectural Vector Pattern */}
        <div className="pointer-events-none absolute inset-0 -z-10 select-none opacity-[0.035]">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dir-page-grid" width="36" height="36" patternUnits="userSpaceOnUse">
                <path d="M 36 0 L 0 0 0 36" fill="none" stroke="#201820" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dir-page-grid)" />
          </svg>
        </div>

        <Container className="relative z-10 w-full">
          {exhibitors.length === 0 ? (
            <div className="flex flex-col gap-10">
              <EmptyState
                title="Exhibitor Allocations Underway"
                body="Official directory listings and booth allocations are currently being verified and will be published live as participation agreements are finalized."
              />

              {/* Brochure What's on Display Snapshot */}
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between pb-5 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-blue">
                      Official Exhibition Scope
                    </span>
                    <h3 className="mt-1 text-base sm:text-lg font-bold tracking-tight text-brand-dark">
                      What&apos;s on Display?
                    </h3>
                  </div>
                  <span className="text-xs text-slate-400">Specialized Sectors</span>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {BROCHURE_SECTORS.map((sector) => (
                    <span
                      key={sector}
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-200/80 bg-slate-50/80 px-3.5 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-brand-blue/40 hover:bg-white hover:text-brand-dark"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
                      {sector}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <ExhibitorDirectoryWrapper>
              <ExhibitorDirectory exhibitors={exhibitors} />
            </ExhibitorDirectoryWrapper>
          )}
        </Container>
      </section>
    </main>
  );
}