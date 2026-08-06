import Image from "next/image";
import type { GalleryPhoto } from "@/lib/content";

export default function PhotoGallery({
  photos,
}: {
  photos: GalleryPhoto[];
}) {
  return (
    <div className="grid grid-cols-1 gap-px bg-brand-900/10 sm:grid-cols-2 lg:grid-cols-3">
      {photos.map((photo) => (
        <figure key={photo.src} className="group relative bg-white">
          <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
            <Image
              src={photo.src}
              alt={photo.caption}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="photo-mono object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <figcaption className="bg-brand-900 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-white/80">
            {photo.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
