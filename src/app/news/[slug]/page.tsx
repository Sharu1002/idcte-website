import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import MarkdownBody from "@/components/MarkdownBody";
import Button from "@/components/Button";
import { getAllNews, getNewsBySlug } from "@/lib/content";

export function generateStaticParams() {
  return getAllNews().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getNewsBySlug(slug);
  return { title: item?.title ?? "Statement" };
}

function formatDate(date: string) {
  return new Date(date + "T00:00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getNewsBySlug(slug);
  if (!item) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <Link href="/news" className="text-sm font-semibold text-brand-600 hover:underline">
        &larr; Back to News &amp; Press
      </Link>

      <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-brand-600">
        {formatDate(item.date)}
      </p>
      <h1 className="mt-3 text-3xl font-semibold text-brand-900 sm:text-4xl">
        {item.title}
      </h1>

      {item.image && (
        <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden bg-slate-100">
          <Image
            src={item.image}
            alt=""
            fill
            sizes="(min-width: 640px) 768px, 100vw"
            className="photo-mono object-cover"
          />
        </div>
      )}

      <div className="mt-8">
        <MarkdownBody content={item.content} />
      </div>

      {item.pdf && (
        <div className="mt-10">
          <Button href={item.pdf} variant="outline" target="_blank">
            Download official statement (PDF)
          </Button>
        </div>
      )}
    </article>
  );
}
