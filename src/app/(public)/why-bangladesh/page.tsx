import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { WhyBangladeshClientView } from "@/components/about/WhyBangladeshClientView";

export const metadata: Metadata = {
  title: "Why Bangladesh | Market Opportunity & Growth Overview",
  description:
    "Explore Bangladesh's building and construction market growth, infrastructure projects, and Dhaka's trade dominance driving demand at Bangladesh Buildcon 2026.",
  alternates: { canonical: "/why-bangladesh" },
};

export default function WhyBangladeshPage() {
  return (
    <main className="min-h-screen bg-[#fafbfd] selection:bg-brand-blue selection:text-white">
      <PageHero
        title="Bangladesh — A Construction Market on the Move"
        intro="Economic expansion, urban development, and infrastructure activity are supporting demand for building materials and machinery across Bangladesh."
        image={{
          src: "/images/home/bangladesh-buildcon-hero.jpg",
          alt: "Dhaka Skyline and Infrastructure",
        }}
      />

      <WhyBangladeshClientView />
    </main>
  );
}
