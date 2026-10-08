import type { Metadata } from "next";

import { getAbout } from "@/content";
import { AboutScreen } from "@/features/about/about-screen";
import { format } from "@/i18n/format";
import { getPageContext } from "@/lib/context";
import { pageMetadata } from "@/lib/metadata";
import { ABOUT_PATH } from "@/sites/modules";

type Props = PageProps<"/[lang]/about">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const ctx = await getPageContext(params);
  const about = await getAbout(ctx.site);
  return pageMetadata(ctx, ABOUT_PATH, {
    title: format(ctx.dict.nav.about, { shortName: ctx.site.shortName }),
    description: about.hero.lead[ctx.locale],
  });
}

export default async function Page({ params }: Props) {
  return <AboutScreen ctx={await getPageContext(params)} />;
}
