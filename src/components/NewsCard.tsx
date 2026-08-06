import Link from "next/link";
import Image from "next/image";
import type { NewsItem } from "@/lib/content";

function formatDate(date: string) {
  return new Date(date + "T00:00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function NewsCard({ item }: { item: NewsItem }) {
  return (
    <Link
      href={`/news/${item.slug}`}
      className="group flex h-full flex-col border border-brand-900/15 transition-colors hover:border-brand-500"
    >
      {item.image && (
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
          <Image
            src={item.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="photo-mono object-cover"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-7">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
          {formatDate(item.date)}
        </p>
        <h3 className="mt-3 text-lg font-semibold text-brand-900 group-hover:text-brand-600">
          {item.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
          {item.summary}
        </p>
        <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-brand-600">
          Read statement
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 transition-transform group-hover:translate-x-1">
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L13.586 10H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
}
