import Image from "next/image";
import type { PostPhoto } from "@/lib/content";

// Column count is driven by how many photos there actually are, so a post with
// two photos gets two wide ones rather than two thirds of a three-up row.
function columnsFor(count: number) {
  if (count === 1) return "";
  if (count === 2) return "sm:grid-cols-2";
  if (count === 4) return "sm:grid-cols-2";
  return "sm:grid-cols-2 lg:grid-cols-3";
}

export default function PostGallery({ photos }: { photos: PostPhoto[] }) {
  if (photos.length === 0) return null;

  const single = photos.length === 1;

  return (
    <div className={`grid gap-px bg-brand-900/10 ${columnsFor(photos.length)}`}>
      {photos.map((photo, i) => (
        <figure key={`${photo.src}-${i}`}>
          <div
            className={`relative overflow-hidden bg-slate-100 ${
              single ? "aspect-[16/9]" : "aspect-[4/3]"
            }`}
          >
            <Image
              src={photo.src}
              alt={photo.caption ?? ""}
              fill
              sizes={single ? "(min-width: 640px) 768px, 100vw" : "(min-width: 640px) 50vw, 100vw"}
              className="object-cover"
            />
          </div>
          {photo.caption && (
            <figcaption className="bg-brand-900 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-white/80">
              {photo.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}
