import type { Metadata } from "next";
import { Inter, Anton, Noto_Sans_Tamil } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";
import { getSiteConfig } from "@/lib/content";
import { getLocale } from "@/lib/locale-server";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

const notoSansTamil = Noto_Sans_Tamil({
  variable: "--font-tamil",
  subsets: ["tamil"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "IDCTE — International Diplomatic Council of Tamil Eelam",
    template: "%s | IDCTE",
  },
  description:
    "IDCTE advocates for the rights, self-determination, and justice of Eelam Tamils through international advocacy and knowledge mobilization.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const site = getSiteConfig(locale);
  return (
    <html
      lang={locale}
      className={`${inter.variable} ${anton.variable} ${notoSansTamil.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiteChrome site={site} locale={locale}>
          {children}
        </SiteChrome>
      </body>
    </html>
  );
}
