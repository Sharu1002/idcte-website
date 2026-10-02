import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PhotoGrid from "@/components/PhotoGrid";
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
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <PhotoGrid photos={photos} />
      </section>
    </>
  );
}
