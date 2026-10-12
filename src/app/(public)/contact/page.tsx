
import type { Metadata } from "next";

import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { ContactClientView } from "@/components/sections/ContactClientView";

export const metadata: Metadata = {
  title:
    "Contact Us | Exhibition Enquiries & Support | Bangladesh Buildcon 2026",

  description: `Get in touch with the ${event.name} team for booth bookings, exhibitor enquiries, international participation, sponsorship opportunities, and visitor assistance.`,

  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFC] selection:bg-brand-primary selection:text-white">
      <PageHero
        title="Let’s Connect & Build Together"
        intro="Reach our exhibition team in India and Bangladesh for booth bookings, partnerships, sponsorships, international participation, and visitor enquiries."
        image={{
          src: "/images/venue/iccb-exhibition-hall.jpg",
          alt: "Bangladesh Buildcon Secretariat Contact Desk",
        }}
      />

      <ContactClientView />
    </main>
  );
}
