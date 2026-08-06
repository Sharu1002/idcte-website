import Image from "next/image";
import Button from "./Button";

export default function Hero({
  eyebrow,
  title,
  subtitle,
  image,
  imagePosition = "50% 50%",
}: {
  eyebrow?: string;
  title: string;
  subtitle: string;
  image: string;
  imagePosition?: string;
}) {
  return (
    <section className="relative h-[88vh] min-h-[560px] w-full sm:h-[92vh]">
      <Image
        src={image}
        alt=""
        fill
        priority
        className="photo-mono object-cover"
        style={{ objectPosition: imagePosition }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/25 to-black/70" />

      <div className="relative z-10 flex h-full flex-col justify-between px-4 py-8 sm:px-8 sm:py-12 lg:px-12">
        <div className="max-w-4xl">
          {eyebrow && (
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-brand-200">
              {eyebrow}
            </p>
          )}
          <h1 className="font-display text-4xl uppercase leading-[0.95] text-white sm:text-6xl lg:text-7xl">
            {title}
          </h1>
        </div>

        <div className="max-w-lg">
          <p className="text-lg leading-relaxed text-white/90 drop-shadow-sm">
            {subtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/donate" variant="primary">
              Donate
            </Button>
            <Button href="/learn-more" variant="secondary">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
