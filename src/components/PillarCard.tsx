import Link from "next/link";
import type { Pillar } from "@/lib/content";

export default function PillarCard({
  pillar,
  index,
  href,
}: {
  pillar: Pillar;
  index: number;
  href?: string;
}) {
  const content = (
    <div className="group grid gap-3 border-t border-brand-900/15 py-8 sm:grid-cols-[80px_1fr_auto] sm:items-start sm:gap-8">
      <span className="font-display text-2xl font-semibold text-brand-400">
        {String(index).padStart(2, "0")}
      </span>
      <div>
        <h3 className="text-xl font-semibold text-brand-900">
          {pillar.title}
        </h3>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600">
          {pillar.summary}
        </p>
      </div>
      {href && (
        <span className="inline-flex items-center gap-1 text-sm font-semibold uppercase tracking-wide text-brand-600 sm:mt-1">
          Read more
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 transition-transform group-hover:translate-x-1">
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L13.586 10H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      )}
    </div>
  );

  if (!href) return content;
  return (
    <Link href={href} className="block">
      {content}
    </Link>
  );
}
