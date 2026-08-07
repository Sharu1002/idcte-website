import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MarkdownBody from "@/components/MarkdownBody";
import LearnMoreCard from "@/components/LearnMoreCard";
import ThuyilumIllamGallery from "@/components/ThuyilumIllamGallery";
import {
  getAllLearnMore,
  getLearnMoreBySlug,
  getThuyilumIllamSites,
} from "@/lib/content";
import { getLocale } from "@/lib/locale-server";
import { t } from "@/lib/i18n";

export function generateStaticParams() {
  return getAllLearnMore().map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const topic = getLearnMoreBySlug(slug, locale);
  return { title: topic?.title ?? "Learn More" };
}

export default async function LearnMoreDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = await getLocale();
  const topic = getLearnMoreBySlug(slug, locale);
  if (!topic) notFound();

  const all = getAllLearnMore(locale);
  const others = all.filter((t) => t.slug !== topic.slug).slice(0, 2);
  const sites = topic.slug === "thuyilum-illam" ? getThuyilumIllamSites(locale) : [];

  return (
    <article className="py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/learn-more"
          className="text-sm font-semibold text-brand-600 hover:underline"
        >
          &larr; {t(locale, "back_to_learn_more")}
        </Link>

        <h1 className="mt-6 text-3xl font-semibold text-brand-900 sm:text-4xl">
          {topic.title}
        </h1>

        <div className="mt-8">
          <MarkdownBody content={topic.content} />
        </div>
      </div>

      {sites.length > 0 && (
        <div className="mx-auto mt-12 max-w-6xl px-4 sm:px-6 lg:px-8">
          <ThuyilumIllamGallery sites={sites} locale={locale} />
        </div>
      )}

      {others.length > 0 && (
        <div className="mx-auto mt-16 max-w-3xl border-t border-slate-200 px-4 pt-10 sm:px-6 lg:px-8">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-brand-600">
            {t(locale, "continue_learning")}
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {others.map((topicItem) => (
              <LearnMoreCard key={topicItem.slug} topic={topicItem} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
