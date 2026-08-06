import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PhotoGallery from "@/components/PhotoGallery";
import { getGalleryPhotos } from "@/lib/content";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos from IDCTE's advocacy meetings with Members of Parliament, the European Parliament, and international institutions.",
};

export default function GalleryPage() {
  const photos = getGalleryPhotos();

  return (
    <>
      <PageHero
        title="Gallery"
        subtitle="Moments from our meetings with parliamentarians, diplomats, and institutions across Europe."
      />
      <section className="py-16 sm:py-20">
        <PhotoGallery photos={photos} />
      </section>
    </>
  );
}
