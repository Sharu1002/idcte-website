import Link from "next/link";
import Image from "next/image";
import type { SiteConfig } from "@/lib/content";

function SocialIcon({ kind }: { kind: "twitter" | "instagram" | "facebook" }) {
  const paths: Record<string, React.ReactNode> = {
    twitter: (
      <path d="M18.9 3H21.6l-5.8 6.6L22.6 21h-5.3l-4.2-5.5L8.2 21H5.5l6.2-7.1L5.4 3h5.4l3.8 5 4.3-5Zm-.9 16.2h1.5L7.1 4.7H5.5l12.5 14.5Z" />
    ),
    instagram: (
      <path d="M12 2.2c2.7 0 3 0 4.1.06 1.1.05 1.8.22 2.2.37.55.2.95.45 1.37.87.42.42.67.82.87 1.37.15.4.32 1.1.37 2.2.06 1.1.06 1.4.06 4.1s0 3-.06 4.1c-.05 1.1-.22 1.8-.37 2.2-.2.55-.45.95-.87 1.37-.42.42-.82.67-1.37.87-.4.15-1.1.32-2.2.37-1.1.06-1.4.06-4.1.06s-3 0-4.1-.06c-1.1-.05-1.8-.22-2.2-.37a3.7 3.7 0 0 1-1.37-.87 3.7 3.7 0 0 1-.87-1.37c-.15-.4-.32-1.1-.37-2.2C2.2 15 2.2 14.7 2.2 12s0-3 .06-4.1c.05-1.1.22-1.8.37-2.2.2-.55.45-.95.87-1.37.42-.42.82-.67 1.37-.87.4-.15 1.1-.32 2.2-.37C8.1 3.2 8.4 3.2 11 3.2Zm0 1.7c-2.6 0-2.9 0-4 .06-.9.04-1.4.18-1.7.3-.43.17-.74.37-1.06.7-.32.32-.52.63-.7 1.06-.12.3-.26.8-.3 1.7-.05 1-.06 1.3-.06 4s0 2.9.06 4c.04.9.18 1.4.3 1.7.17.43.37.74.7 1.06.32.32.63.52 1.06.7.3.12.8.26 1.7.3 1 .05 1.3.06 4 .06s2.9 0 4-.06c.9-.04 1.4-.18 1.7-.3.43-.17.74-.37 1.06-.7.32-.32.52-.63.7-1.06.12-.3.26-.8.3-1.7.05-1 .06-1.3.06-4s0-2.9-.06-4c-.04-.9-.18-1.4-.3-1.7a2.9 2.9 0 0 0-.7-1.06 2.9 2.9 0 0 0-1.06-.7c-.3-.12-.8-.26-1.7-.3-1-.05-1.3-.06-4-.06ZM12 7.4a4.6 4.6 0 1 1 0 9.2 4.6 4.6 0 0 1 0-9.2Zm0 1.7a2.9 2.9 0 1 0 0 5.8 2.9 2.9 0 0 0 0-5.8Zm4.8-1.9a1.08 1.08 0 1 1 0 2.16 1.08 1.08 0 0 1 0-2.16Z" />
    ),
    facebook: (
      <path d="M13.5 21v-7.5h2.5l.4-3H13.5V8.4c0-.87.24-1.46 1.5-1.46h1.6V4.3c-.28-.04-1.22-.12-2.32-.12-2.3 0-3.88 1.4-3.88 3.98V10.5H8v3h2.4V21h3.1Z" />
    ),
  };
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
      {paths[kind]}
    </svg>
  );
}

export default function Footer({ site }: { site: SiteConfig }) {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-brand-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src="/images/brand/idcte-logo-white.png"
              alt={site.orgName}
              width={220}
              height={47}
              className="h-10 w-auto"
            />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
              {site.tagline}.
            </p>
            <div className="mt-5 flex gap-4 text-white/70">
              <a href={site.social.twitter} target="_blank" rel="noreferrer" aria-label="Twitter / X" className="hover:text-white">
                <SocialIcon kind="twitter" />
              </a>
              <a href={site.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-white">
                <SocialIcon kind="instagram" />
              </a>
              <a href={site.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:text-white">
                <SocialIcon kind="facebook" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-200">
              Explore
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/80">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/gallery" className="hover:text-white">
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-200">
              Get Involved
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/80">
              <li>
                <Link href="/donate" className="hover:text-white">
                  Donate
                </Link>
              </li>
              <li>
                <Link href="/get-involved" className="hover:text-white">
                  Volunteer &amp; Support
                </Link>
              </li>
              <li>
                <Link href="/learn-more" className="hover:text-white">
                  Learn More
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-white">
                  News &amp; Press
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-200">
              Contact
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/80">
              <li>
                <a href={`mailto:${site.email}`} className="hover:text-white">
                  {site.email}
                </a>
              </li>
              <li className="max-w-[220px]">{site.address}</li>
              <li className="text-white/50">{site.cvr}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {site.orgName}. All rights reserved.
          </p>
          <p>{site.founded}</p>
        </div>
      </div>
    </footer>
  );
}
