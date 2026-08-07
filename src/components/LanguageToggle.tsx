"use client";

import { LOCALE_COOKIE, type Locale } from "@/lib/i18n";

export default function LanguageToggle({
  locale,
  className = "",
}: {
  locale: Locale;
  className?: string;
}) {
  function toggle() {
    const next: Locale = locale === "ta" ? "en" : "ta";
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=${60 * 60 * 24 * 365}`;
    window.location.reload();
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={locale === "ta" ? "Switch to English" : "தமிழில் படிக்க"}
      className={`inline-flex items-center justify-center rounded-full border border-brand-900/20 px-4 py-2 text-sm font-semibold text-brand-900 transition-colors hover:border-brand-500 hover:text-brand-600 ${className}`}
    >
      {locale === "ta" ? "English" : "தமிழ்"}
    </button>
  );
}
