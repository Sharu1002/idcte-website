import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { Blog8 } from "@/components/blocks/blog8";
import { getAllBlogPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Analysis and commentary from IDCTE on structural genocide, self-determination, and international advocacy for Eelam Tamils.",
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <>
      <PageHero
        title="Blog"
        subtitle="Analysis and commentary from the IDCTE team — beyond our official statements."
      />
      <Blog8
        eyebrow="From the Team"
        heading="Latest Posts"
        posts={posts.map((post) => ({
          id: post.slug,
          title: post.title,
          summary: post.summary,
          author: post.author,
          published: new Date(post.date + "T00:00:00").toLocaleDateString(
            "en-GB",
            { day: "numeric", month: "long", year: "numeric" }
          ),
          url: `/blog/${post.slug}`,
          image: post.image ?? "/images/photos/IDCTE-speaking-at-conference.jpg",
          tags: post.tags,
        }))}
      />
    </>
  );
}
