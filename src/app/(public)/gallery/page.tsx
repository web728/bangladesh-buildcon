import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { getPublishedGalleryItems } from "@/lib/data/gallery";

// MongoDB-backed — must reflect admin publish/unpublish immediately.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos from Bangladesh Buildcon International Expo — venue, show preparations and exhibitors.",
  alternates: { canonical: "/gallery" },
};

export default async function GalleryPage() {
  const items = await getPublishedGalleryItems();

  return (
    <>
      <PageHero title="Gallery" intro="Photos and video from Bangladesh Buildcon International Expo." />

      <section className="bg-white py-20 sm:py-24">
        <Container>
          {items.length === 0 ? (
            <EmptyState
              title="Gallery Coming Soon"
              body="Photos from show preparations, the venue and participating exhibitors will appear here as they become available."
            />
          ) : (
            <GalleryGrid items={items} />
          )}
        </Container>
      </section>
    </>
  );
}
