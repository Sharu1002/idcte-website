import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import NewsCard from "@/components/NewsCard";
import { getAllNews } from "@/lib/content";

export const metadata: Metadata = {
  title: "News & Press",
  description: "Statements and press releases from IDCTE.",
};

export default function NewsPage() {
  const news = getAllNews();

  return (
    <>
      <PageHero
        title="News & Press"
        subtitle="Statements and press releases from IDCTE."
      />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((item) => (
            <NewsCard key={item.slug} item={item} />
          ))}
        </div>
      </section>
    </>
  );
}
