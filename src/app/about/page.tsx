import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import MarkdownBody from "@/components/MarkdownBody";
import PhotoGrid from "@/components/PhotoGrid";
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
    reachEyebrow: "Our Advocacy",
    reachTitle: "Where we've engaged",
    fieldEyebrow: "In the Field",
    fieldTitle: "Meeting policymakers where decisions are made",
    captionMep: "With a Member of the European Parliament",
    captionConference: "Speaking at an international conference",
    captionBrussels: "IDCTE delegation — Brussels",
  },
  ta: {
    whyEyebrow: "நாங்கள் ஏன் இருக்கிறோம்",
    reachEyebrow: "எங்கள் வக்காலத்து",
    reachTitle: "நாங்கள் ஈடுபட்டுள்ள இடங்கள்",
    fieldEyebrow: "களப் பணியில்",
    fieldTitle: "முடிவுகள் எடுக்கப்படும் இடங்களில் கொள்கை வகுப்பாளர்களைச் சந்தித்தல்",
    captionMep: "ஐரோப்பிய பாராளுமன்ற உறுப்பினர் ஒருவருடன்",
    captionConference: "சர்வதேச மாநாட்டில் உரையாற்றுதல்",
    captionBrussels: "IDCTE குழு — பிரஸ்ஸல்ஸ்",
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
          <SectionHeading eyebrow={c.reachEyebrow} title={c.reachTitle} />
          <div className="mt-12">
            <AdvocacyReachList items={reach} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={c.fieldEyebrow} title={c.fieldTitle} />
        <div className="mt-10">
          <PhotoGrid
            photos={[
              {
                src: "/images/photos/With-MEP.jpg",
                alt: "IDCTE representatives with a Member of the European Parliament",
                caption: c.captionMep,
              },
              {
                src: "/images/photos/IDCTE-speaking-conference.jpg",
                alt: "IDCTE speaking at an international conference",
                caption: c.captionConference,
              },
              {
                src: "/images/photos/IDCTE-Brussels.jpg",
                alt: "IDCTE delegation in Brussels",
                caption: c.captionBrussels,
              },
            ]}
          />
        </div>
        <div className="mt-10 text-center">
          <Button href="/gallery" variant="outline">
            {t(locale, "view_full_gallery")}
          </Button>
        </div>
      </section>
    </>
  );
}
