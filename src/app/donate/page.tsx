import type { Metadata } from "next";
import { Suspense } from "react";
import PageHero from "@/components/PageHero";
import MarkdownBody from "@/components/MarkdownBody";
import DonateForm from "@/components/DonateForm";
import { getPage } from "@/lib/content";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Support IDCTE's advocacy and knowledge mobilization work with a one-time or monthly donation.",
};

export default function DonatePage() {
  const page = getPage("donate");

  return (
    <>
      <PageHero title={page.data.heroTitle} subtitle={page.data.heroSubtitle} />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <MarkdownBody content={page.content} />

        <div className="mt-12 border-t border-brand-900/15 pt-12">
          <Suspense fallback={null}>
            <DonateForm />
          </Suspense>
        </div>
      </section>
    </>
  );
}
