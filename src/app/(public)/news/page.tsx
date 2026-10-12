import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { NewsCard } from "@/components/ui/NewsCard";
import { getPublishedNews } from "@/lib/data/news";

// MongoDB-backed — must reflect admin publish/unpublish immediately.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "News",
  description: "Exhibitor news, show updates, industry updates and partner news from Bangladesh Buildcon International Expo.",
  alternates: { canonical: "/news" },
};

export default async function NewsPage() {
  const news = await getPublishedNews();

  return (
    <>
      <PageHero
        title="News & Updates"
        intro="Exhibitor announcements, show updates and industry news for Bangladesh Buildcon International Expo."
      />

      <section className="bg-white py-20 sm:py-24">
        <Container>
          {news.length === 0 ? (
            <EmptyState
              title="News Coming Soon"
              body="Show updates, exhibitor announcements and industry news will be published here as the event approaches."
            />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {news.map((item) => (
                <NewsCard key={item._id} item={item} />
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
