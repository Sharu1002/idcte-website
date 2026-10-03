import type { AdvocacyReach } from "@/lib/content";

export default function AdvocacyReachList({ items }: { items: AdvocacyReach[] }) {
  return (
    // Single column: this sits in the right-hand half of a two-column section,
    // so a nested grid would squeeze each entry into an awkward measure.
    <ul className="space-y-5">
      {items.map((item) => (
        <li key={item.label} className="flex gap-3 border-b border-brand-900/10 pb-5 last:border-b-0 last:pb-0">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
          <div>
            <div className="font-semibold text-brand-900">{item.label}</div>
            <div className="mt-1 text-sm leading-relaxed text-slate-600">{item.note}</div>
          </div>
        </li>
      ))}
    </ul>
  );
}
