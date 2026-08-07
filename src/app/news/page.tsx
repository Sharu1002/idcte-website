import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import NewsCard from "@/components/NewsCard";
import { getAllNews } from "@/lib/content";
import { getLocale } from "@/lib/locale-server";
import { t } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "News & Press",
  description: "Statements and press releases from IDCTE.",
};

export default async function NewsPage() {
  const locale = await getLocale();
  const news = getAllNews(locale);

  return (
    <>
      <PageHero
        title={t(locale, "news_press_heading")}
        subtitle={t(locale, "news_press_subtitle")}
      />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((item) => (
            <NewsCard key={item.slug} item={item} locale={locale} />
          ))}
        </div>
      </section>
    </>
  );
}
