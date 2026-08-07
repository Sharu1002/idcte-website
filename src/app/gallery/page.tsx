import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PhotoGallery from "@/components/PhotoGallery";
import { getGalleryPhotos } from "@/lib/content";
import { getLocale } from "@/lib/locale-server";
import { t } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos from IDCTE's advocacy meetings with Members of Parliament, the European Parliament, and international institutions.",
};

export default async function GalleryPage() {
  const locale = await getLocale();
  const photos = getGalleryPhotos(locale);

  return (
    <>
      <PageHero
        title={t(locale, "gallery_title")}
        subtitle={t(locale, "gallery_subtitle")}
      />
      <section className="py-16 sm:py-20">
        <PhotoGallery photos={photos} />
      </section>
    </>
  );
}
