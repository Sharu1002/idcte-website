import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import LearnMoreCard from "@/components/LearnMoreCard";
import { getAllLearnMore } from "@/lib/content";
import { getLocale } from "@/lib/locale-server";

export const metadata: Metadata = {
  title: "Learn More",
  description:
    "Learn more about the Eelam Tamil nation, the conflict, self-determination, and the Tamil genocide.",
};

const copy = {
  en: {
    title: "Learn More",
    subtitle:
      "Background on the Eelam Tamil nation, the conflict, and the case for justice and self-determination.",
  },
  ta: {
    title: "மேலும் அறிய",
    subtitle:
      "ஈழத் தமிழ் தேசம், மோதல் மற்றும் நீதி மற்றும் தன்னாட்சிக்கான வழக்கு குறித்த பின்னணி.",
  },
} as const;

export default async function LearnMorePage() {
  const locale = await getLocale();
  const topics = getAllLearnMore(locale);
  const c = copy[locale];

  return (
    <>
      <PageHero title={c.title} subtitle={c.subtitle} />
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2">
          {topics.map((topic) => (
            <LearnMoreCard key={topic.slug} topic={topic} />
          ))}
        </div>
      </section>
    </>
  );
}
