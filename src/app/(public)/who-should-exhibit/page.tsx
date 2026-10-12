import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { WhoShouldExhibitClientView } from "@/components/exhibit/WhoShouldExhibitClientView";

export const metadata: Metadata = {
  title: "Who Should Exhibit | Bangladesh Buildcon 2026",
  description:
    "Explore target exhibitor profiles — from international manufacturers and machinery suppliers to local Bangladeshi producers and technology providers.",
  alternates: { canonical: "/who-should-exhibit" },
};

export default function WhoShouldExhibitPage() {
  return (
    <main className="min-h-screen bg-[#fafbfd] selection:bg-brand-blue selection:text-white">
      <PageHero
        title="Who Should Exhibit at Bangladesh Buildcon"
        intro="Connecting the full commercial value chain — international manufacturers, regional equipment suppliers, and Bangladeshi producers meeting key buyers across South Asia."
        image={{
          src: "/images/sectors/construction-crane-bangladesh.jpg",
          alt: "Industrial machinery and construction equipment display",
        }}
      />

      <WhoShouldExhibitClientView />
    </main>
  );
}
