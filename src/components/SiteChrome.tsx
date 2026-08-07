"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import type { SiteConfig } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

export default function SiteChrome({
  site,
  locale,
  children,
}: {
  site: SiteConfig;
  locale: Locale;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  if (pathname === "/preview-login") return <>{children}</>;

  return (
    <>
      <Header site={site} locale={locale} />
      <main className="flex-1">{children}</main>
      <Footer site={site} locale={locale} />
    </>
  );
}
