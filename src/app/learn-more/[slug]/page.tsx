import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MarkdownBody from "@/components/MarkdownBody";
import LearnMoreCard from "@/components/LearnMoreCard";
import { getAllLearnMore, getLearnMoreBySlug } from "@/lib/content";

export function generateStaticParams() {
  return getAllLearnMore().map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const topic = getLearnMoreBySlug(slug);
  return { title: topic?.title ?? "Learn More" };
}

export default async function LearnMoreDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const topic = getLearnMoreBySlug(slug);
  if (!topic) notFound();

  const all = getAllLearnMore();
  const others = all.filter((t) => t.slug !== topic.slug).slice(0, 2);

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <Link
        href="/learn-more"
        className="text-sm font-semibold text-brand-600 hover:underline"
      >
        &larr; Back to Learn More
      </Link>

      <h1 className="mt-6 text-3xl font-semibold text-brand-900 sm:text-4xl">
        {topic.title}
      </h1>

      <div className="mt-8">
        <MarkdownBody content={topic.content} />
      </div>

      {others.length > 0 && (
        <div className="mt-16 border-t border-slate-200 pt-10">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-brand-600">
            Continue Learning
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {others.map((t) => (
              <LearnMoreCard key={t.slug} topic={t} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
