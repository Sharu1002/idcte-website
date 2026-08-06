import { Megaphone, GraduationCap, type LucideIcon } from "lucide-react";
import type { Pillar } from "@/lib/content";

const ICONS: Record<string, LucideIcon> = {
  megaphone: Megaphone,
  "graduation-cap": GraduationCap,
};

export default function PillarFeatures({ pillars }: { pillars: Pillar[] }) {
  return (
    <div className="mx-auto grid max-w-3xl gap-12 sm:grid-cols-2 sm:gap-8">
      {pillars.map((pillar) => {
        const Icon = (pillar.icon && ICONS[pillar.icon]) || Megaphone;
        return (
          <div key={pillar.id} className="text-center">
            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-brand-500">
              <Icon className="size-7 text-white" strokeWidth={1.75} />
            </div>
            <h3 className="mt-5 text-lg font-semibold text-brand-900">
              {pillar.title}
            </h3>
            <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-slate-600">
              {pillar.summary}
            </p>
          </div>
        );
      })}
    </div>
  );
}
