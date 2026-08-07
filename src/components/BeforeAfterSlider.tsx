"use client";

import { useState } from "react";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";
import { t, type Locale } from "@/lib/i18n";

export default function BeforeAfterSlider({
  before,
  after,
  name,
  locale = "en",
}: {
  before: string;
  after: string;
  name: string;
  locale?: Locale;
}) {
  const [position, setPosition] = useState(50);

  return (
    <div className="relative aspect-[3/2] w-full select-none overflow-hidden bg-slate-100">
      <Image
        src={after}
        alt={`${name} — present day, site cleared`}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover"
        draggable={false}
      />
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={before}
          alt={`${name} — before the occupation`}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
          draggable={false}
        />
      </div>

      <div className="pointer-events-none absolute left-3 top-3 bg-brand-900 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white">
        {t(locale, "before_label")}
      </div>
      <div className="pointer-events-none absolute right-3 top-3 bg-brand-900 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white">
        {t(locale, "now_label")}
      </div>

      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_0_1px_rgba(4,42,71,0.2)]"
        style={{ left: `calc(${position}% - 1px)` }}
      >
        <div className="absolute left-1/2 top-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand-500 text-white shadow-lg">
          <MoveHorizontal className="size-4" />
        </div>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        step={0.1}
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        aria-label={`Drag to compare ${name} before and after`}
        className="absolute inset-0 h-full w-full cursor-ew-resize appearance-none bg-transparent opacity-0"
      />
    </div>
  );
}
