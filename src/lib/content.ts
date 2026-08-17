import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Locale } from "./i18n";

const CONTENT_DIR = path.join(process.cwd(), "content");

function readJson(baseName: string, locale: Locale = "en"): { items: unknown[] } {
  const taFile = path.join(CONTENT_DIR, `${baseName}.ta.json`);
  const enFile = path.join(CONTENT_DIR, `${baseName}.json`);
  const file = locale === "ta" && fs.existsSync(taFile) ? taFile : enFile;
  const raw = fs.readFileSync(file, "utf8");
  return JSON.parse(raw);
}

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

export function getSiteConfig(locale: Locale = "en"): SiteConfig {
  const taFile = path.join(CONTENT_DIR, "site.ta.json");
  const enFile = path.join(CONTENT_DIR, "site.json");
  const file = locale === "ta" && fs.existsSync(taFile) ? taFile : enFile;
  const raw = fs.readFileSync(file, "utf8");
  return JSON.parse(raw);
}

export type Pillar = {
  id: string;
  icon?: string;
  title: string;
  summary: string;
  body: string;
};

export function getPillars(locale: Locale = "en"): Pillar[] {
  return readJson("pillars", locale).items as Pillar[];
}

export type Achievement = {
  title: string;
  description: string;
};

export function getAchievements(locale: Locale = "en"): Achievement[] {
  return readJson("achievements", locale).items as Achievement[];
}

export type Milestone = {
  year: string;
  title: string;
  description: string;
};

export function getMilestones(locale: Locale = "en"): Milestone[] {
  return readJson("milestones", locale).items as Milestone[];
}

export type AdvocacyReach = {
  label: string;
  note: string;
};

export function getAdvocacyReach(locale: Locale = "en"): AdvocacyReach[] {
  return readJson("advocacy-reach", locale).items as AdvocacyReach[];
}

export type WaysToHelp = {
  title: string;
  description: string;
};

export function getWaysToHelp(locale: Locale = "en"): WaysToHelp[] {
  return readJson("ways-to-help", locale).items as WaysToHelp[];
}

export type GalleryPhoto = {
  src: string;
  caption: string;
};

export function getGalleryPhotos(locale: Locale = "en"): GalleryPhoto[] {
  return readJson("gallery", locale).items as GalleryPhoto[];
}

export type ThuyilumIllamSite = {
  id: string;
  name: string;
  before: string;
  after: string;
};

export function getThuyilumIllamSites(
  locale: Locale = "en"
): ThuyilumIllamSite[] {
  return readJson("thuyilum-illam", locale).items as ThuyilumIllamSite[];
}

export type PageContent = {
  slug: string;
  data: Record<string, string>;
  content: string;
};

export function getPage(slug: string, locale: Locale = "en"): PageContent {
  const taFile = path.join(CONTENT_DIR, "pages", `${slug}.ta.md`);
  const enFile = path.join(CONTENT_DIR, "pages", `${slug}.md`);
  const file = locale === "ta" && fs.existsSync(taFile) ? taFile : enFile;
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

function readCollection(dirName: string, locale: Locale = "en") {
  const dir = path.join(CONTENT_DIR, dirName);
  const files = fs.existsSync(dir)
    ? fs.readdirSync(dir).filter((f) => f.endsWith(".md") && !f.endsWith(".ta.md"))
    : [];
  return files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const taPath = path.join(dir, `${slug}.ta.md`);
    const useFile =
      locale === "ta" && fs.existsSync(taPath) ? taPath : path.join(dir, filename);
    const raw = fs.readFileSync(useFile, "utf8");
    const { data, content } = matter(raw);
    return { slug, data, content };
  });
}

export function getAllNews(locale: Locale = "en"): NewsItem[] {
  return readCollection("news", locale)
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

export function getNewsBySlug(
  slug: string,
  locale: Locale = "en"
): NewsItem | undefined {
  return getAllNews(locale).find((n) => n.slug === slug);
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

export function getAllBlogPosts(locale: Locale = "en"): BlogPost[] {
  return readCollection("blog", locale)
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

export function getBlogPostBySlug(
  slug: string,
  locale: Locale = "en"
): BlogPost | undefined {
  return getAllBlogPosts(locale).find((p) => p.slug === slug);
}

export type LearnMoreTopic = {
  slug: string;
  title: string;
  teaser: string;
  order: number;
  content: string;
};

export function getAllLearnMore(locale: Locale = "en"): LearnMoreTopic[] {
  return readCollection("learn-more", locale)
    .map((item) => ({
      slug: item.slug,
      title: item.data.title as string,
      teaser: item.data.teaser as string,
      order: Number(item.data.order ?? 999),
      content: item.content,
    }))
    .sort((a, b) => a.order - b.order);
}

export function getLearnMoreBySlug(
  slug: string,
  locale: Locale = "en"
): LearnMoreTopic | undefined {
  return getAllLearnMore(locale).find((t) => t.slug === slug);
}
