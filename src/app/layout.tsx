import type { Metadata } from "next";
import { Inter, Anton } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";
import { getSiteConfig } from "@/lib/content";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "IDCTE — International Diplomatic Council of Tamil Eelam",
    template: "%s | IDCTE",
  },
  description:
    "IDCTE advocates for the rights, self-determination, and justice of Eelam Tamils through international advocacy and knowledge mobilization.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const site = getSiteConfig();
  return (
    <html
      lang="en"
      className={`${inter.variable} ${anton.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiteChrome site={site}>{children}</SiteChrome>
      </body>
    </html>
  );
}
