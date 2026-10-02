import {
  Landmark,
  Globe,
  Star,
  Building2,
  FileText,
  type LucideIcon,
} from "lucide-react";
import type { Achievement } from "@/lib/content";

const ICONS: Record<string, LucideIcon> = {
  landmark: Landmark,
  globe: Globe,
  star: Star,
  building: Building2,
  "file-text": FileText,
};

export default function AchievementGrid({ items }: { items: Achievement[] }) {
  return (
    // Bordered cards with real gaps, rather than the gap-px-over-a-tinted-
    // parent trick: with five items in a three-column grid that technique
    // leaves the empty sixth slot showing the parent colour as a grey block.
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        const Icon = (item.icon && ICONS[item.icon]) || Star;
        return (
          <div
            key={item.title}
            className="flex flex-col border-2 border-brand-900/20 p-7 transition-colors hover:border-brand-500"
          >
            <div className="flex size-11 items-center justify-center rounded-full bg-brand-500">
              <Icon className="size-5 text-white" strokeWidth={1.75} />
            </div>
            <h3 className="mt-5 text-base font-semibold text-brand-900">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {item.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
