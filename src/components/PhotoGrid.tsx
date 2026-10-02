import Image from "next/image";

export type GridPhoto = {
  src: string;
  caption: string;
  alt?: string;
};

export default function PhotoGrid({ photos }: { photos: GridPhoto[] }) {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {photos.map((photo) => (
        <figure key={photo.src}>
          <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
            <Image
              src={photo.src}
              alt={photo.alt ?? photo.caption}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              // Biased above centre: these are group photographs, and a centred
              // crop on the portrait-orientation ones cuts faces at the chin.
              className="object-cover object-[center_30%] transition-transform duration-500 hover:scale-[1.03]"
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
