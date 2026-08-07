import BeforeAfterSlider from "./BeforeAfterSlider";
import type { ThuyilumIllamSite } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

export default function ThuyilumIllamGallery({
  sites,
  locale = "en",
}: {
  sites: ThuyilumIllamSite[];
  locale?: Locale;
}) {
  return (
    <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2">
      {sites.map((site) => (
        <div key={site.id}>
          <BeforeAfterSlider
            before={site.before}
            after={site.after}
            name={site.name}
            locale={locale}
          />
          <h3 className="mt-4 text-base font-semibold text-brand-900">
            {site.name}
          </h3>
        </div>
      ))}
    </div>
  );
}
