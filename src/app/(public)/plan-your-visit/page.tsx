import type { Metadata } from "next";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { PlanYourVisitClientView } from "@/components/visit/PlanYourVisitClientView";

export const metadata: Metadata = {
  title: "Plan Your Visit | Bangladesh Buildcon 2026",
  description: `Essential travel, venue navigation, and visitor guidance for attending ${event.name} from ${event.dates.display} at ${event.venue.fullLocation}.`,
  alternates: { canonical: "/plan-your-visit" },
};

export default function PlanYourVisitPage() {
  return (
    <main className="min-h-screen bg-[#fafbfd] selection:bg-brand-blue selection:text-white">
      <PageHero
        title="Plan Your Visit to Dhaka"
        intro="Practical visitor information, venue access, entry parameters, and travel essentials for Bangladesh Buildcon International Expo 2026."
        image={{
          src: "/images/venue/iccb-exhibition-hall.jpg",
          alt: "ICCB Exhibition Hall, Dhaka",
        }}
      />

      <PlanYourVisitClientView />
    </main>
  );
}