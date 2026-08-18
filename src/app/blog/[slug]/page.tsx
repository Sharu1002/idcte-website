import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import MarkdownBody from "@/components/MarkdownBody";
import PostGallery from "@/components/PostGallery";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/content";
import { getLocale } from "@/lib/locale-server";
import { formatPostDate } from "@/lib/format";
import { t } from "@/lib/i18n";

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const post = getBlogPostBySlug(slug, locale);
  return { title: post?.title ?? "Blog" };
}


export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = await getLocale();
  const post = getBlogPostBySlug(slug, locale);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <Link href="/blog" className="text-sm font-semibold text-brand-600 hover:underline">
        &larr; {t(locale, "back_to_blog")}
      </Link>

      <h1 className="mt-6 text-3xl font-semibold text-brand-900 sm:text-4xl">
        {post.title}
      </h1>

      {formatPostDate(post.date, locale) && (
        <div className="mt-4 text-sm text-slate-500">
          <span>{formatPostDate(post.date, locale)}</span>
        </div>
      )}

      {post.image && (
        <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden bg-slate-100">
          <Image
            src={post.image}
            alt=""
            fill
            sizes="(min-width: 640px) 768px, 100vw"
            className="photo-mono object-cover"
          />
        </div>
      )}

      {post.photos.length > 0 && (
        <div className="mt-8">
          <PostGallery photos={post.photos} />
        </div>
      )}

      <div className="mt-8">
        <MarkdownBody content={post.content} />
      </div>
    </article>
  );
}
