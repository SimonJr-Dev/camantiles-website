import type { Metadata } from "next";

import { getSk } from "@/content";
import { SkScreen } from "@/features/sk/sk-screen";
import { getPageContext } from "@/lib/context";
import { pageMetadata } from "@/lib/metadata";
import { MODULES } from "@/sites/modules";

type Props = PageProps<"/[lang]/sk">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const ctx = await getPageContext(params);
  const { hero } = await getSk(ctx.site);
  return pageMetadata(ctx, MODULES.sk.path, {
    title: ctx.dict.sections.sk,
    description: hero.lead?.[ctx.locale],
  });
}

export default async function Page({ params }: Props) {
  return <SkScreen ctx={await getPageContext(params)} />;
}
