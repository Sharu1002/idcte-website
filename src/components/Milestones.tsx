import type { Milestone } from "@/lib/content";

export default function Milestones({ items }: { items: Milestone[] }) {
  return (
    <div className="grid gap-0 sm:grid-cols-4">
      {items.map((item, i) => (
        <div
          key={item.year}
          className={`border-t-2 border-brand-500 px-0 py-6 sm:px-6 sm:py-2 ${
            i > 0 ? "sm:border-l sm:border-l-brand-900/15" : ""
          }`}
        >
          <p className="font-display text-2xl font-semibold text-brand-900">
            {item.year}
          </p>
          <h3 className="mt-3 text-sm font-semibold uppercase tracking-wide text-brand-600">
            {item.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}
