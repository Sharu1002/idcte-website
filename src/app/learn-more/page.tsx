import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import LearnMoreCard from "@/components/LearnMoreCard";
import { getAllLearnMore } from "@/lib/content";

export const metadata: Metadata = {
  title: "Learn More",
  description:
    "Learn more about the Eelam Tamil nation, the conflict, self-determination, and the Tamil genocide.",
};

export default function LearnMorePage() {
  const topics = getAllLearnMore();

  return (
    <>
      <PageHero
        title="Learn More"
        subtitle="Background on the Eelam Tamil nation, the conflict, and the case for justice and self-determination."
      />
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
