import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { LearnMoreTopic } from "@/lib/content";
import { t, type Locale } from "@/lib/i18n";

// These topics are a primer meant to be read in order — the content files
// carry an explicit `order`, running from who the Eelam Tamils are through to
// the destroyed memorial sites. The numbering and the wider opening card are
// there to show that sequence and its entry point, not as decoration.
function num(i: number) {
  return String(i + 1).padStart(2, "0");
}

export default function LearnMoreGrid({
  topics,
  locale = "en",
}: {
  topics: LearnMoreTopic[];
  locale?: Locale;
}) {
  const [first, ...rest] = topics;
  if (!first) return null;

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Link
        href={`/learn-more/${first.slug}`}
        className="group flex flex-col justify-between bg-brand-900 p-8 transition-colors hover:bg-brand-800 sm:p-10 lg:col-span-2"
      >
        <div>
          <div className="flex items-baseline gap-4">
            <span className="font-display text-3xl leading-none text-brand-400">
              {num(0)}
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-300">
              {t(locale, "start_here")}
            </span>
          </div>
          <h3 className="mt-6 font-display text-3xl uppercase leading-[0.95] text-white sm:text-4xl">
            {first.title}
          </h3>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75">
            {first.teaser}
          </p>
        </div>
        <ArrowRight className="mt-8 size-6 text-brand-400 transition-transform group-hover:translate-x-1" />
      </Link>

      {rest.map((topic, i) => (
        <Link
          key={topic.slug}
          href={`/learn-more/${topic.slug}`}
          className="group flex flex-col border-2 border-brand-900/20 p-7 transition-colors hover:border-brand-500"
        >
          <span className="font-display text-2xl leading-none text-brand-400">
            {num(i + 1)}
          </span>
          <h3 className="mt-4 text-lg font-semibold leading-snug text-brand-900 group-hover:text-brand-600">
            {topic.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            {topic.teaser}
          </p>
          <ArrowRight className="mt-5 size-5 shrink-0 text-brand-400 transition-transform group-hover:translate-x-1" />
        </Link>
      ))}
    </div>
  );
}
