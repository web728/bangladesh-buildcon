import type { Metadata } from "next";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { AboutClientView } from "@/components/about/AboutClientView";

export const metadata: Metadata = {
  title: "About the Expo | Bangladesh Buildcon 2026",
  description: `Bangladesh Buildcon International Expo 2026 is a B2B trade exhibition connecting manufacturers with construction buyers, held from ${event.dates.display} at ${event.venue.fullLocation}.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#fafbfd] selection:bg-brand-blue selection:text-white">
      <PageHero
        title="Connecting Global Manufacturers with South Asian Construction"
        intro="A focused international B2B platform connecting building material producers, equipment makers, and technology providers with trade buyers across Bangladesh."
        image={{
          src: "/images/sectors/construction-crane-bangladesh.jpg",
          alt: "Bangladesh Buildcon International Expo Overview",
        }}
      />

      <AboutClientView />
    </main>
  );
}
