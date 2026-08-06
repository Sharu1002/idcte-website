import Link from "next/link";
import type { LearnMoreTopic } from "@/lib/content";

export default function LearnMoreCard({ topic }: { topic: LearnMoreTopic }) {
  return (
    <Link
      href={`/learn-more/${topic.slug}`}
      className="group flex items-start justify-between gap-4 border border-brand-900/15 p-6 transition-colors hover:border-brand-500"
    >
      <div>
        <h3 className="text-lg font-semibold text-brand-900 group-hover:text-brand-600">
          {topic.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          {topic.teaser}
        </p>
      </div>
      <svg
        viewBox="0 0 20 20"
        fill="currentColor"
        className="mt-1 h-5 w-5 shrink-0 text-brand-400 transition-transform group-hover:translate-x-1"
      >
        <path
          fillRule="evenodd"
          d="M10.293 3.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L13.586 10H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </Link>
  );
}
