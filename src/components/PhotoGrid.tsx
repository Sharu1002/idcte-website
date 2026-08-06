import Image from "next/image";

type Photo = { src: string; alt: string; caption: string; featured?: boolean };

export default function PhotoGrid({ photos }: { photos: Photo[] }) {
  const [first, ...rest] = photos;

  return (
    <div className="grid gap-px bg-brand-900/10 sm:grid-cols-3">
      {first && (
        <figure className="group relative sm:col-span-2">
          <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 sm:aspect-[16/10]">
            <Image
              src={first.src}
              alt={first.alt}
              fill
              sizes="(min-width: 640px) 66vw, 100vw"
              className="object-cover"
            />
          </div>
          <figcaption className="bg-brand-900 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-white/80">
            {first.caption}
          </figcaption>
        </figure>
      )}

      <div className="grid gap-px sm:grid-rows-2">
        {rest.map((photo) => (
          <figure key={photo.src} className="group relative">
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 sm:aspect-auto sm:h-full">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="photo-mono object-cover"
              />
            </div>
            <figcaption className="bg-brand-900 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-white/80">
              {photo.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
