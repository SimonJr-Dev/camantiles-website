import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import type { CSSProperties } from "react";

import { SiteFooter } from "@/components/shell/site-footer";
import { SiteHeader } from "@/components/shell/site-header";
import { getDictionary } from "@/i18n";
import { getSite, hasLocale, type Site } from "@/sites";

import "../globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

type Props = LayoutProps<"/[lang]">;

export function generateStaticParams() {
  return (getSite()?.locales ?? []).map((lang) => ({ lang }));
}

/**
 * An unknown language falls back to the default here so the shell can still
 * render around the not-found page that the route itself triggers.
 */
async function resolve(params: Props["params"]) {
  const { lang } = await params;
  const site = getSite()!;
  const locale = hasLocale(site, lang) ? lang : site.defaultLocale;
  return { site, locale, dict: await getDictionary(site, locale) };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { site, dict } = await resolve(params);
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? site.url),
    title: { default: site.name, template: `%s — ${site.name}` },
    description: dict.site.meta.description,
    icons: { icon: site.seal.icon, apple: site.seal.icon },
  };
}

/** A barangay's brand colours override the defaults in globals.css. */
function themeVars(site: Site): CSSProperties {
  const { primary, link, accent } = site.theme ?? {};
  return {
    ...(primary && { "--primary": primary }),
    ...(link && { "--link": link, "--ring": link }),
    ...(accent && { "--accent": accent }),
  } as CSSProperties;
}

export default async function RootLayout({ children, params }: Props) {
  const ctx = await resolve(params);
  const { site, locale, dict } = ctx;

  return (
    <html lang={locale} data-site={site.slug} className={jakarta.variable} style={themeVars(site)}>
      <body className="min-h-screen">
        <a
          href="#content"
          className="sr-only rounded-full bg-card px-4 py-2 font-bold focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50"
        >
          {dict.header.skipToContent}
        </a>
        <SiteHeader ctx={ctx} />
        <main
          id="content"
          className="site-container flex flex-col gap-5 pt-2 pb-6"
        >
          {children}
        </main>
        <SiteFooter ctx={ctx} />
      </body>
    </html>
  );
}
