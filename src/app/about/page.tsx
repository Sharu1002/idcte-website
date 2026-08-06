import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import MarkdownBody from "@/components/MarkdownBody";
import PhotoGrid from "@/components/PhotoGrid";
import Milestones from "@/components/Milestones";
import Button from "@/components/Button";
import { getPage, getMilestones } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "IDCTE is a human rights organization founded by Eelam Tamil youth in Copenhagen, advocating for justice, accountability, and self-determination.",
};

export default function AboutPage() {
  const page = getPage("about");
  const milestones = getMilestones();

  return (
    <>
      <PageHero
        title={page.data.heroTitle}
        subtitle={page.data.heroSubtitle}
        image={page.data.heroImage}
      />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <MarkdownBody content={page.content} />

        <div className="mt-12 border-l-2 border-brand-500 py-1 pl-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-700">
            {page.data.regTitle}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            {page.data.regBody}
          </p>
        </div>
      </section>

      <section className="border-t border-brand-900/15 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Our History" title="From Copenhagen to the world's diplomatic halls" />
          <div className="mt-12">
            <Milestones items={milestones} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="In the Field" title="Meeting policymakers where decisions are made" />
        <div className="mt-10">
          <PhotoGrid
            photos={[
              {
                src: "/images/photos/With-MEP.jpg",
                alt: "IDCTE representatives with a Member of the European Parliament",
                caption: "With a Member of the European Parliament",
              },
              {
                src: "/images/photos/IDCTE-speaking-conference.jpg",
                alt: "IDCTE speaking at an international conference",
                caption: "Speaking at an international conference",
              },
              {
                src: "/images/photos/IDCTE-Brussels.jpg",
                alt: "IDCTE delegation in Brussels",
                caption: "IDCTE delegation — Brussels",
              },
            ]}
          />
        </div>
        <div className="mt-10 text-center">
          <Button href="/gallery" variant="outline">
            View Full Gallery
          </Button>
        </div>
      </section>
    </>
  );
}
