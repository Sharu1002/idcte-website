import BeforeAfterSlider from "./BeforeAfterSlider";
import type { ThuyilumIllamSite } from "@/lib/content";

export default function ThuyilumIllamGallery({
  sites,
}: {
  sites: ThuyilumIllamSite[];
}) {
  return (
    <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2">
      {sites.map((site) => (
        <div key={site.id}>
          <BeforeAfterSlider
            before={site.before}
            after={site.after}
            name={site.name}
          />
          <h3 className="mt-4 text-base font-semibold text-brand-900">
            {site.name}
          </h3>
        </div>
      ))}
    </div>
  );
}
