import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import MarkdownBody from "@/components/MarkdownBody";
import Image from "next/image";
import AdvocacyReachList from "@/components/AdvocacyReach";
import Button from "@/components/Button";
import { getPage, getAdvocacyReach } from "@/lib/content";
import { getLocale } from "@/lib/locale-server";
import { t } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "About",
  description:
    "IDCTE is a human rights organization founded by Eelam Tamil youth in Copenhagen, advocating for justice, accountability, and self-determination.",
};

const copy = {
  en: {
    whyEyebrow: "Why We Exist",
    reachTitle: "Where we've engaged",
    fieldEyebrow: "In the Field",
    fieldTitle: "Meeting policymakers where decisions are made",
  },
  ta: {
    whyEyebrow: "நாங்கள் ஏன் இருக்கிறோம்",
    reachTitle: "நாங்கள் ஈடுபட்டுள்ள இடங்கள்",
    fieldEyebrow: "களப் பணியில்",
    fieldTitle: "முடிவுகள் எடுக்கப்படும் இடங்களில் கொள்கை வகுப்பாளர்களைச் சந்தித்தல்",
  },
} as const;

export default async function AboutPage() {
  const locale = await getLocale();
  const page = getPage("about", locale);
  const reach = getAdvocacyReach(locale);
  const c = copy[locale];

  return (
    <>
      <PageHero
        title={page.data.heroTitle}
        subtitle={page.data.heroSubtitle}
        image={page.data.heroImage}
      />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <MarkdownBody content={page.content} />

        <div className="mt-12 border-l-2 border-brand-500 py-1 pl-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-700">
            {page.data.regTitle}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            {page.data.regBody}
          </p>
        </div>
      </section>

      <section className="border-t border-brand-900/15 bg-brand-900 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-300">
            {c.whyEyebrow}
          </p>
          <p className="mt-4 text-2xl font-medium leading-snug text-white sm:text-3xl">
            {page.data.whyWeExist}
          </p>
        </div>
      </section>

      <section className="border-t border-brand-900/15 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow={c.fieldEyebrow} title={c.fieldTitle} />

          <div className="mt-12 grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Captions are dropped in this pairing: at half width in a 2x2 the
                photos are evidence for the list beside them, and four captions
                would compete with the four points for the same attention. The
                full captioned set stays on the gallery page. */}
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  src: "/images/photos/With-MEP.jpg",
                  alt: "IDCTE representatives with a Member of the European Parliament",
                },
                {
                  src: "/images/photos/IDCTE-speaking-conference.jpg",
                  alt: "IDCTE speaking at an international conference",
                },
                {
                  src: "/images/photos/IDCTE-austria-mfa.JPG",
                  alt: "IDCTE at the Austrian Federal Ministry for European and International Affairs",
                },
                {
                  src: "/images/photos/IDCTE-Brussels.jpg",
                  alt: "IDCTE delegation in Brussels",
                },
              ].map((photo) => (
                <div
                  key={photo.src}
                  className="relative aspect-[4/3] overflow-hidden bg-slate-100"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover object-[center_30%]"
                  />
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                {c.reachTitle}
              </h3>
              <div className="mt-6">
                <AdvocacyReachList items={reach} />
              </div>
              <div className="mt-10">
                <Button href="/gallery" variant="outline">
                  {t(locale, "view_full_gallery")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
