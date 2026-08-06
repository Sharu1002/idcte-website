import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import MarkdownBody from "@/components/MarkdownBody";
import { getPage, getSiteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with IDCTE.",
};

export default function ContactPage() {
  const page = getPage("contact");
  const site = getSiteConfig();

  return (
    <>
      <PageHero title={page.data.heroTitle} subtitle={page.data.heroSubtitle} />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <MarkdownBody content={page.content} />

            <div className="mt-10 space-y-6 border-t border-slate-200 pt-8">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-600">
                  Email
                </h3>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-1 block text-brand-900 hover:underline"
                >
                  {site.email}
                </a>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-600">
                  Address
                </h3>
                <p className="mt-1 text-slate-700">{site.address}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-600">
                  Registration
                </h3>
                <p className="mt-1 text-slate-700">{site.cvr}</p>
              </div>
            </div>
          </div>

          <div className="border border-brand-900/15 bg-white p-8">
            <ContactForm email={site.email} />
          </div>
        </div>
      </section>
    </>
  );
}
