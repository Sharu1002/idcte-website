import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type SiteConfig = {
  orgName: string;
  shortName: string;
  tagline: string;
  email: string;
  address: string;
  cvr: string;
  founded: string;
  social: { twitter: string; instagram: string; facebook: string };
  nav: { label: string; href: string }[];
};

export function getSiteConfig(): SiteConfig {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, "site.json"), "utf8");
  return JSON.parse(raw);
}

export type Pillar = {
  id: string;
  icon?: string;
  title: string;
  summary: string;
  body: string;
};

export function getPillars(): Pillar[] {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, "pillars.json"), "utf8");
  return JSON.parse(raw).items;
}

export type Achievement = {
  title: string;
  description: string;
};

export function getAchievements(): Achievement[] {
  const raw = fs.readFileSync(
    path.join(CONTENT_DIR, "achievements.json"),
    "utf8"
  );
  return JSON.parse(raw).items;
}

export type Milestone = {
  year: string;
  title: string;
  description: string;
};

export function getMilestones(): Milestone[] {
  const raw = fs.readFileSync(
    path.join(CONTENT_DIR, "milestones.json"),
    "utf8"
  );
  return JSON.parse(raw).items;
}

export type WaysToHelp = {
  title: string;
  description: string;
};

export function getWaysToHelp(): WaysToHelp[] {
  const raw = fs.readFileSync(
    path.join(CONTENT_DIR, "ways-to-help.json"),
    "utf8"
  );
  return JSON.parse(raw).items;
}

export type GalleryPhoto = {
  src: string;
  caption: string;
};

export function getGalleryPhotos(): GalleryPhoto[] {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, "gallery.json"), "utf8");
  return JSON.parse(raw).items;
}

export type PageContent = {
  slug: string;
  data: Record<string, string>;
  content: string;
};

export function getPage(slug: string): PageContent {
  const file = path.join(CONTENT_DIR, "pages", `${slug}.md`);
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return { slug, data: data as Record<string, string>, content };
}

export type NewsItem = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  pdf?: string;
  image?: string;
  content: string;
};

function readCollection(dirName: string) {
  const dir = path.join(CONTENT_DIR, dirName);
  const files = fs.existsSync(dir)
    ? fs.readdirSync(dir).filter((f) => f.endsWith(".md"))
    : [];
  return files.map((filename) => {
    const raw = fs.readFileSync(path.join(dir, filename), "utf8");
    const { data, content } = matter(raw);
    return {
      slug: filename.replace(/\.md$/, ""),
      data,
      content,
    };
  });
}

export function getAllNews(): NewsItem[] {
  return readCollection("news")
    .map((item) => ({
      slug: item.slug,
      title: item.data.title as string,
      date: item.data.date as string,
      summary: item.data.summary as string,
      pdf: item.data.pdf as string | undefined,
      image: item.data.image as string | undefined,
      content: item.content,
    }))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getNewsBySlug(slug: string): NewsItem | undefined {
  return getAllNews().find((n) => n.slug === slug);
}

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  author: string;
  tags: string[];
  image?: string;
  content: string;
};

export function getAllBlogPosts(): BlogPost[] {
  return readCollection("blog")
    .map((item) => ({
      slug: item.slug,
      title: item.data.title as string,
      date: item.data.date as string,
      summary: item.data.summary as string,
      author: item.data.author as string,
      tags: (item.data.tags as string[] | undefined) ?? [],
      image: item.data.image as string | undefined,
      content: item.content,
    }))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return getAllBlogPosts().find((p) => p.slug === slug);
}

export type LearnMoreTopic = {
  slug: string;
  title: string;
  teaser: string;
  order: number;
  content: string;
};

export function getAllLearnMore(): LearnMoreTopic[] {
  return readCollection("learn-more")
    .map((item) => ({
      slug: item.slug,
      title: item.data.title as string,
      teaser: item.data.teaser as string,
      order: Number(item.data.order ?? 999),
      content: item.content,
    }))
    .sort((a, b) => a.order - b.order);
}

export function getLearnMoreBySlug(slug: string): LearnMoreTopic | undefined {
  return getAllLearnMore().find((t) => t.slug === slug);
}
