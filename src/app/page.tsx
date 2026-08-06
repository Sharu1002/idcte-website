import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import StatStrip from "@/components/StatStrip";
import PillarFeatures from "@/components/PillarFeatures";
import NewsCard from "@/components/NewsCard";
import PhotoGallery from "@/components/PhotoGallery";
import Button from "@/components/Button";
import { getPage, getPillars, getAllNews, getGalleryPhotos } from "@/lib/content";

export default function HomePage() {
  const page = getPage("home");
  const pillars = getPillars();
  const news = getAllNews().slice(0, 3);
  const galleryPreview = getGalleryPhotos().slice(0, 6);

  return (
    <>
      <Hero
        eyebrow={page.data.heroEyebrow}
        title={page.data.heroTitle}
        subtitle={page.data.heroSubtitle}
        image={page.data.heroImage}
      />

      <div className="relative z-10 bg-white">
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Who We Are" title="A Voice for the Eelam Tamil Nation" />
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
            {page.content.trim()}
          </p>
          <div className="mt-9">
            <Button href="/about" variant="outline">
              Read Our Story
            </Button>
          </div>
        </div>
      </section>

      <section className="border-y border-brand-900/15 bg-brand-50/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StatStrip
            stats={[
              { value: page.data.stat1Value, label: page.data.stat1Label },
              { value: page.data.stat2Value, label: page.data.stat2Label },
              { value: page.data.stat3Value, label: page.data.stat3Label },
            ]}
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="How We Work"
          title="Two Pillars, One Goal"
          subtitle="Everything IDCTE does falls under advocacy and knowledge mobilization."
        />
        <div className="mt-16">
          <PillarFeatures pillars={pillars} />
        </div>
        <div className="mt-12 text-center">
          <Button href="/our-work" variant="outline">
            More About Our Work
          </Button>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="On the Ground" title="Our Advocacy in the Field" />
        </div>
        <div className="mt-12">
          <PhotoGallery photos={galleryPreview} />
        </div>
        <div className="mt-10 text-center">
          <Button href="/gallery" variant="outline">
            View Full Gallery
          </Button>
        </div>
      </section>

      <section className="bg-brand-50/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="News & Press" title="Stay Up To Date" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((item) => (
              <NewsCard key={item.slug} item={item} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button href="/news" variant="outline">
              View All News
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-brand-900 py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-4xl uppercase leading-[0.95] text-white sm:text-5xl">
            Your Voice Can Make a Difference
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/80">
            Join our cause and become part of the change for Tamileelam.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Button href="/donate" variant="primary">
              Donate
            </Button>
            <Button href="/get-involved" variant="ghost-light">
              Get Involved
            </Button>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
