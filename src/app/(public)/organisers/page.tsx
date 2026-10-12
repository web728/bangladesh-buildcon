import type { Metadata } from "next";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { OrganisersClientView } from "@/components/about/OrganisersClientView";

export const metadata: Metadata = {
  title: "Official Event Organisers | Futurex & ASK Trade & Exhibitions Pvt. Ltd.",
  description: `${event.name} is jointly organised by Futurex Trade Fair & Events Pvt. Ltd. and ASK Trade & Exhibitions Pvt. Ltd..`,
  alternates: { canonical: "/organisers" },
};

export default function OrganisersPage() {
  return (
    <main className="min-h-screen bg-[#fafbfd] selection:bg-brand-blue selection:text-white">
      <PageHero
        title="Jointly Organised By"
        intro="Brought together by international exhibition leaders with proven expertise across Asia and South Asia, delivering high-impact B2B trade platforms for the building and infrastructure industry."
        image={{
          src: "/images/sectors/construction-crane-bangladesh.jpg",
          alt: "Bangladesh Buildcon International Expo Organisers",
        }}
      />

      <OrganisersClientView />
    </main>
  );
}