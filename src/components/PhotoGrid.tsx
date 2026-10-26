import Image from "next/image";

export type GridPhoto = {
  src: string;
  caption: string;
  alt?: string;
  /**
   * CSS object-position for this photograph's crop, e.g. "center 55%".
   * Needed because these are documentary shots taken in whatever room was
   * available: a ministry portico puts the subjects low in the frame, a
   * seated meeting puts them high, and no single crop serves both.
   */
  focus?: string;
};

// Slightly above centre. Most of these are standing group shots, where the
// faces sit above the middle of the frame and the floor is dead space.
const DEFAULT_FOCUS = "center 42%";

export default function PhotoGrid({ photos }: { photos: GridPhoto[] }) {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {photos.map((photo) => (
        <figure key={photo.src}>
          <div className="relative aspect-[3/2] overflow-hidden bg-slate-100">
            <Image
              src={photo.src}
              alt={photo.alt ?? photo.caption}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              style={{ objectPosition: photo.focus ?? DEFAULT_FOCUS }}
              className="object-cover transition-transform duration-500 hover:scale-[1.03]"
            />
          </div>
          <figcaption className="mt-3 text-sm leading-relaxed text-slate-600">
            {photo.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
