import Image from "next/image";

export default function PageHero({
  title,
  subtitle,
  image,
}: {
  title: string;
  subtitle?: string;
  image?: string;
}) {
  if (!image) {
    return (
      <section className="bg-brand-900">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <h1 className="max-w-3xl font-display text-4xl uppercase leading-[0.95] text-white sm:text-6xl">
            {title}
          </h1>
          <div className="mt-5 h-1 w-16 bg-brand-500" />
          {subtitle && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
              {subtitle}
            </p>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-[46vh] min-h-[320px] w-full sm:h-[52vh]">
      <Image
        src={image}
        alt=""
        fill
        priority
        className="photo-mono object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/55" />
      <div className="absolute inset-0 flex items-end">
        <div className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 sm:pb-12 lg:px-8">
          <h1 className="max-w-3xl font-display text-4xl uppercase leading-[0.95] text-white sm:text-6xl">
            {title}
          </h1>
          <div className="mt-5 h-1 w-16 bg-brand-500" />
          {subtitle && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
