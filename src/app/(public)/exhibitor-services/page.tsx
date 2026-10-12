import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ExhibitorServicesClientView } from "@/components/exhibit/ExhibitorServicesClientView";

export const metadata: Metadata = {
  title: "Exhibitor Services & Operational Manual | Bangladesh Buildcon 2026",
  description:
    "Essential guidance for international and domestic exhibitors — visa assistance, official invitation letters, stand fabrication, freight logistics, and on-site support at ICCB Exhibition Hall, Dhaka.",
  alternates: { canonical: "/exhibitor-services" },
};

export default function ExhibitorServicesPage() {
  return (
    <main className="min-h-screen bg-[#fafbfd] selection:bg-brand-blue selection:text-white">
      <PageHero
        title="Exhibitor Services & Logistics"
        intro="Comprehensive operational guidelines, technical specifications, and logistics support to ensure a seamless exhibition experience at ICCB Exhibition Hall, Dhaka."
        image={{
          src: "/images/sectors/construction-crane-bangladesh.jpg",
          alt: "Engineer reviewing technical exhibition specifications",
        }}
      />

      <ExhibitorServicesClientView />
    </main>
  );
}
