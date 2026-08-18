import type { Locale } from "./i18n";

// Returns "" rather than "Invalid Date" when a post has no usable date. Entries
// created before the CMS date field worked have no date at all, and a blank
// slot reads far better than the string "Invalid Date" on a live page.
export function formatPostDate(date: string | undefined, locale: Locale): string {
  if (!date) return "";
  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return "";
  return parsed.toLocaleDateString(locale === "ta" ? "ta" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
