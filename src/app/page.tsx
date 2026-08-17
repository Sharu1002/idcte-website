import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import StatStrip from "@/components/StatStrip";
import PillarFeatures from "@/components/PillarFeatures";
import NewsCard from "@/components/NewsCard";
import PhotoGallery from "@/components/PhotoGallery";
import Button from "@/components/Button";
import { getPage, getPillars, getAllNews, getGalleryPhotos } from "@/lib/content";
import { getLocale } from "@/lib/locale-server";
import { t } from "@/lib/i18n";

export default async function HomePage() {
  const locale = await getLocale();
  const page = getPage("home", locale);
  const pillars = getPillars(locale);
  const news = getAllNews(locale).slice(0, 3);
  const galleryPreview = getGalleryPhotos(locale).slice(0, 6);

  return (
    <>
      <Hero
        eyebrow={page.data.heroEyebrow}
        title={page.data.heroTitle}
        subtitle={page.data.heroSubtitle}
        image={page.data.heroImage}
        locale={locale}
      />

      <div className="relative z-10 bg-white">
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <SectionHeading eyebrow={t(locale, "who_we_are")} title={t(locale, "a_voice_for_the_nation")} />
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
            {page.content.trim()}
          </p>
          <div className="mt-9">
            <Button href="/about" variant="outline">
              {t(locale, "read_our_story")}
            </Button>
          </div>
        </div>
      </section>

      <section className="border-y border-brand-900/15 bg-brand-50/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StatStrip
            stats={[
              { value: page.data.stat1Value, label: page.data.stat1Label },
              { value: page.data.stat2Value, label: page.data.stat2Label },
            ]}
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t(locale, "how_we_work")}
          title={t(locale, "two_pillars_one_goal")}
          subtitle={t(locale, "two_pillars_subtitle")}
        />
        <div className="mt-16">
          <PillarFeatures pillars={pillars} />
        </div>
        <div className="mt-12 text-center">
          <Button href="/our-work" variant="outline">
            {t(locale, "more_about_our_work")}
          </Button>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow={t(locale, "on_the_ground")} title={t(locale, "our_advocacy_in_field")} />
        </div>
        <div className="mt-12">
          <PhotoGallery photos={galleryPreview} />
        </div>
        <div className="mt-10 text-center">
          <Button href="/gallery" variant="outline">
            {t(locale, "view_full_gallery")}
          </Button>
        </div>
      </section>

      <section className="bg-brand-50/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow={t(locale, "news_press")} title={t(locale, "stay_up_to_date")} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((item) => (
              <NewsCard key={item.slug} item={item} locale={locale} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button href="/news" variant="outline">
              {t(locale, "view_all_news")}
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-brand-900 py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-4xl uppercase leading-[0.95] text-white sm:text-5xl">
            {t(locale, "voice_can_make_difference")}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/80">
            {t(locale, "cta_join_cause")}
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Button href="/donate" variant="primary">
              {t(locale, "donate")}
            </Button>
            <Button href="/get-involved" variant="ghost-light">
              {t(locale, "get_involved")}
            </Button>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
