import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { Blog8 } from "@/components/blocks/blog8";
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
      <Blog8
        eyebrow={t(locale, "from_the_team")}
        heading={t(locale, "latest_posts")}
        locale={locale}
        posts={posts.map((post) => ({
          id: post.slug,
          title: post.title,
          summary: post.summary,
          published: formatPostDate(post.date, locale),
          url: `/blog/${post.slug}`,
          image: post.image ?? "/images/photos/IDCTE-speaking-at-conference.jpg",
        }))}
      />
    </>
  );
}
