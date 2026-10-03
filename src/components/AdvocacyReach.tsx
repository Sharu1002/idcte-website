import type { AdvocacyReach } from "@/lib/content";

export default function AdvocacyReachList({ items }: { items: AdvocacyReach[] }) {
  return (
    // Labels only. With no description beneath, each entry is a single line,
    // so the rules carry the separation and the type can sit larger.
    <ul className="divide-y divide-brand-900/10 border-y border-brand-900/10">
      {items.map((item) => (
        <li key={item.label} className="flex items-center gap-3 py-4">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
          <span className="text-lg font-semibold text-brand-900">{item.label}</span>
        </li>
      ))}
    </ul>
  );
}
