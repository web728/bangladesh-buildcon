import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { VisitClientView } from "@/components/visit/VisitClientView";

export const metadata: Metadata = {
  title: "Why Visit | Bangladesh Buildcon 2026",
  description:
    "Source products directly from global manufacturers, compare building suppliers, and develop business partnerships at Bangladesh Buildcon International Expo 2026 in Dhaka.",
  alternates: { canonical: "/visit" },
};

export default function VisitPage() {
  return (
    <main className="min-h-screen bg-[#fafbfd] selection:bg-brand-blue selection:text-white">
      <PageHero
        title="Source Products. Meet Suppliers. Develop Business."
        intro="Three focused exhibition days connecting architects, contractors, developers, and trade buyers directly with leading international and regional building material manufacturers."
        image={{
          src: "/images/gallery/bangladesh-buildcon-05.jpg",
          alt: "Trade visitors and buyers sourcing building materials",
        }}
      />

      <VisitClientView />
    </main>
  );
}
