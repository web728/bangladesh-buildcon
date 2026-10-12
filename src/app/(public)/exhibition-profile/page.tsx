import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { ExhibitionProfileExplorer } from "@/components/exhibit/ExhibitionProfileExplorer";

export const metadata: Metadata = {
  title: "Exhibition Profile | 15 Specialized Exhibit Sectors",
  description:
    "Explore 15 specialized construction, machinery, building materials and interior technology exhibit sectors at Bangladesh Buildcon International Expo 2026.",
  alternates: { canonical: "/exhibition-profile" },
};

export default function ExhibitionProfilePage() {
  return (
    <main className="min-h-screen bg-[#fafbfd] selection:bg-brand-blue selection:text-white">
      <PageHero
        title="Products, Machinery & Materials"
        intro="Fifteen specialized exhibit sectors covering the complete building and infrastructure supply chain across South Asia."
        image={{
          src: "/images/sectors/construction-crane-bangladesh.jpg",
          alt: "Bangladesh Buildcon Construction Machinery",
        }}
      />

      <section className="relative py-16 lg:py-24 border-t border-slate-200/80">
        <Container>
          <ExhibitionProfileExplorer />
        </Container>
      </section>
    </main>
  );
}