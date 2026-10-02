"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { t, type Locale } from "@/lib/i18n";

export type BlogGridPost = {
  slug: string;
  title: string;
  published: string;
  image: string;
  pressRelease: boolean;
};

type Filter = "all" | "press-release";

export default function BlogGrid({
  posts,
  locale = "en",
}: {
  posts: BlogGridPost[];
  locale?: Locale;
}) {
  const [filter, setFilter] = useState<Filter>("all");

  const visible =
    filter === "press-release" ? posts.filter((p) => p.pressRelease) : posts;

  // No point offering the filter when nothing is tagged as a press release yet.
  const hasPressReleases = posts.some((p) => p.pressRelease);

  const tabs: { id: Filter; label: string }[] = [
    { id: "all", label: t(locale, "view_all") },
    { id: "press-release", label: t(locale, "press_release") },
  ];

  return (
    <div>
      {hasPressReleases && (
        <div className="flex flex-wrap items-center gap-2 border-b border-brand-900/15 pb-6">
          {tabs.map((tab) => {
            const active = filter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                aria-pressed={active}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                  active
                    ? "bg-brand-600 text-white"
                    : "text-brand-900 hover:bg-brand-50 hover:text-brand-600"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      )}

      <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((post) => (
          <article key={post.slug} className="group flex flex-col">
            <Link href={`/blog/${post.slug}`} className="block">
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <Image
                  src={post.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Link>

            <h3 className="mt-5 text-lg font-semibold leading-snug text-brand-900">
              <Link href={`/blog/${post.slug}`} className="hover:text-brand-600">
                {post.title}
              </Link>
            </h3>

            <div className="mt-3 flex flex-wrap items-center gap-x-2 text-sm text-slate-500">
              {post.pressRelease && (
                <>
                  <span className="text-brand-600">{t(locale, "press_release")}</span>
                  <span aria-hidden>&middot;</span>
                </>
              )}
              {post.published && <span>{post.published}</span>}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
