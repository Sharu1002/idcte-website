import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import BlogGrid from "@/components/BlogGrid";
import { getAllBlogPosts } from "@/lib/content";
import { getLocale } from "@/lib/locale-server";
import { formatPostDate } from "@/lib/format";
import { t } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Analysis and commentary from IDCTE on structural genocide, self-determination, and international advocacy for Eelam Tamils.",
};

const copy = {
  en: {
    title: "Blog",
    subtitle: "Analysis and commentary from the IDCTE team — beyond our official statements.",
  },
  ta: {
    title: "வலைப்பதிவு",
    subtitle: "எங்கள் உத்தியோகபூர்வ அறிக்கைகளுக்கு அப்பால் — IDCTE குழுவிடமிருந்து பகுப்பாய்வும் கருத்தும்.",
  },
} as const;

export default async function BlogPage() {
  const locale = await getLocale();
  const posts = getAllBlogPosts(locale);
  const c = copy[locale];

  return (
    <>
      <PageHero title={c.title} subtitle={c.subtitle} />
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={t(locale, "from_the_team")}
            title={t(locale, "latest_posts")}
          />
          <div className="mt-12">
            <BlogGrid
              locale={locale}
              posts={posts.map((post) => ({
                slug: post.slug,
                title: post.title,
                published: formatPostDate(post.date, locale),
                image:
                  post.image ?? "/images/photos/IDCTE-speaking-at-conference.jpg",
                pressRelease: post.pressRelease,
              }))}
            />
          </div>
        </div>
      </section>
    </>
  );
}
