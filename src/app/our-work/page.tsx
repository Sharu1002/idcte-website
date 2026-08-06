import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import MarkdownBody from "@/components/MarkdownBody";
import Button from "@/components/Button";
import { getPage, getPillars, getAchievements } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "IDCTE's work rests on two pillars: advocacy and knowledge mobilization.",
};

export default function OurWorkPage() {
  const page = getPage("our-work");
  const pillars = getPillars();
  const achievements = getAchievements();

  return (
    <>
      <PageHero
        title={page.data.heroTitle}
        subtitle={page.data.heroSubtitle}
        image={page.data.heroImage}
      />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <MarkdownBody content={page.content} />
      </section>

      <section className="bg-brand-900 py-20">
        <div className="mx-auto max-w-4xl space-y-14 px-4 sm:px-6 lg:px-8">
          {pillars.map((pillar, i) => (
            <div key={pillar.id} className="grid gap-4 border-t border-white/15 pt-10 first:border-t-0 first:pt-0 sm:grid-cols-[auto_1fr]">
              <span className="font-display text-4xl font-semibold text-brand-400">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="text-2xl font-semibold text-white">
                  {pillar.title}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-white/75">
                  {pillar.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Impact" title={page.data.achievementsTitle} align="center" />
        <div className="mt-12 grid gap-px bg-brand-900/15 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((item) => (
            <div key={item.title} className="bg-white p-7">
              <h3 className="text-base font-semibold text-brand-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-brand-900 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">
            Want to be part of this work?
          </h2>
          <div className="mt-8">
            <Button href="/get-involved" variant="primary">
              Get Involved
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
