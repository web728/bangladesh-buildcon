import type { Metadata } from "next";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { VenueClientView } from "@/components/about/VenueClientView";

export const metadata: Metadata = {
  title: "Venue & Location | ICCB Exhibition Hall, Dhaka",
  description: `${event.venue.fullLocation} hosts Bangladesh Buildcon International Expo 2026 from ${event.dates.display}. Explore floor access, venue parameters, and city connectivity.`,
  alternates: { canonical: "/venue" },
};

export default function VenuePage() {
  return (
    <main className="min-h-screen bg-[#fafbfd] selection:bg-brand-blue selection:text-white">
      <PageHero
        title="Official Exhibition Venue"
        intro={`${event.venue.name} · ${event.venue.city}, Bangladesh · ${event.dates.display}`}
        image={{
          src: "/images/venue/iccb-exhibition-hall.jpg",
          alt: `${event.venue.name} Exhibition Facility`,
        }}
      />

      <VenueClientView/>
    </main>
  );
}