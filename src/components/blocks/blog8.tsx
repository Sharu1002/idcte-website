import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Card } from "@/components/ui/card";
import SectionHeading from "@/components/SectionHeading";
import { t, type Locale } from "@/lib/i18n";

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  published: string;
  url: string;
  image: string;
}

interface Blog8Props {
  eyebrow?: string;
  heading?: string;
  description?: string;
  posts: BlogPost[];
  locale?: Locale;
}

const Blog8 = ({ eyebrow, heading, description, posts, locale = "en" }: Blog8Props) => {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-16 px-4 sm:px-6 lg:px-8">
        {heading && (
          <SectionHeading eyebrow={eyebrow} title={heading} subtitle={description} />
        )}

        <div className="grid w-full gap-y-10 sm:gap-y-14">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="rounded-none border-0 border-t border-brand-900/15 bg-transparent pt-10 first:border-t-0 first:pt-0"
            >
              <div className="grid gap-y-6 sm:grid-cols-10 sm:gap-x-8 md:items-center lg:gap-x-12">
                <div className="sm:col-span-6">
                  <h3 className="text-xl font-semibold leading-tight text-brand-900 md:text-2xl">
                    <Link href={post.url} className="hover:text-brand-600">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600 md:mt-5">
                    {post.summary}
                  </p>
                  <div className="mt-6 text-sm text-slate-500 md:mt-7">
                    <span>{post.published}</span>
                  </div>
                  <Link
                    href={post.url}
                    className="group mt-6 inline-flex items-center gap-1 text-sm font-semibold uppercase tracking-wide text-brand-600 md:mt-7"
                  >
                    {t(locale, "read_more")}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>

                <div className="order-first sm:order-last sm:col-span-4">
                  <Link href={post.url} className="block">
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(min-width: 640px) 40vw, 100vw"
                        className="photo-mono object-cover"
                      />
                    </div>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Blog8 };
