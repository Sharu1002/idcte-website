import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import MarkdownBody from "@/components/MarkdownBody";
import Button from "@/components/Button";
import { getPage, getWaysToHelp } from "@/lib/content";

export const metadata: Metadata = {
  title: "Get Involved",
  description: "Join IDCTE as a volunteer, advocate, or partner organization.",
};

export default function GetInvolvedPage() {
  const page = getPage("get-involved");
  const ways = getWaysToHelp();

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

      <section className="border-t border-brand-900/15 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Ways to Help" title="How you can get involved" />
          <div className="mt-10 grid gap-px bg-brand-900/15 sm:grid-cols-2">
            {ways.map((way) => (
              <div key={way.title} className="bg-white p-7">
                <h3 className="text-lg font-semibold text-brand-900">
                  {way.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {way.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-brand-900 sm:text-3xl">
            Ready to join us?
          </h2>
          <p className="mt-4 text-slate-600">
            Reach out and let us know how you&apos;d like to help — we&apos;ll get back to you.
          </p>
          <div className="mt-8">
            <Button href="/contact" variant="primary">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
