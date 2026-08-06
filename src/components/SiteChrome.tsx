"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import type { SiteConfig } from "@/lib/content";

export default function SiteChrome({
  site,
  children,
}: {
  site: SiteConfig;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  if (pathname === "/preview-login") return <>{children}</>;

  return (
    <>
      <Header site={site} />
      <main className="flex-1">{children}</main>
      <Footer site={site} />
    </>
  );
}
