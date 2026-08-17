import type { AdvocacyReach } from "@/lib/content";

export default function AdvocacyReachList({ items }: { items: AdvocacyReach[] }) {
  return (
    <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item.label} className="flex gap-3 border-b border-brand-900/10 pb-4">
          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
          <div>
            <div className="font-semibold text-brand-900">{item.label}</div>
            <div className="text-sm text-slate-600">{item.note}</div>
          </div>
        </li>
      ))}
    </ul>
  );
}
