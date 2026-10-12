import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ExhibitClientView } from "@/components/exhibit/ExhibitClientView";

export const metadata: Metadata = {
  title: "Why Exhibit | Bangladesh Buildcon 2026",
  description:
    "Present products directly to contractors, developers, importers, and specifiers at Bangladesh Buildcon International Expo 2026 at ICCB Exhibition Hall, Dhaka.",
  alternates: { canonical: "/exhibit" },
};

export default function ExhibitPage() {
  return (
    <main className="min-h-screen bg-[#fafbfd] selection:bg-brand-blue selection:text-white">
      <PageHero
        title="Take Your Business to the Bangladeshi Construction Market"
        intro="Three focused business days connecting manufacturers, exporters, and suppliers with the key professionals responsible for buying, specifying, and distributing building products across South Asia."
        image={{
          src: "/images/sectors/construction-crane-bangladesh.jpg",
          alt: "Engineer reviewing construction blueprints on site",
        }}
      />

      <ExhibitClientView />
    </main>
  );
}
