import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { WhoShouldVisitClientView } from "@/components/visit/WhoShouldVisitClientView";

export const metadata: Metadata = {
  title: "Who Should Visit | Bangladesh Buildcon 2026",
  description:
    "Meet the people who buy, build, specify, and source — architects, civil contractors, developers, and wholesale importers at Bangladesh Buildcon International Expo 2026.",
  alternates: { canonical: "/who-should-visit" },
};

export default function WhoShouldVisitPage() {
  return (
    <main className="min-h-screen bg-[#fafbfd] selection:bg-brand-blue selection:text-white">
      <PageHero
        title="The People Who Buy, Build, Specify & Source"
        intro="Engineered specifically for professionals responsible for procurement, structural design, commercial distribution, and project specification across South Asia."
        image={{
          src: "/images/gallery/bangladesh-buildcon-05.jpg",
          alt: "Engineers and trade visitors at building expo",
        }}
      />

      <WhoShouldVisitClientView />
    </main>
  );
}
