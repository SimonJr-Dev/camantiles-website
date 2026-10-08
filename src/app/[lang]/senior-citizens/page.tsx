import type { Metadata } from "next";

import { getSeniors } from "@/content";
import { SeniorsScreen } from "@/features/senior-citizens/seniors-screen";
import { getPageContext } from "@/lib/context";
import { pageMetadata } from "@/lib/metadata";
import { MODULES } from "@/sites/modules";

type Props = PageProps<"/[lang]/senior-citizens">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const ctx = await getPageContext(params);
  const { hero } = await getSeniors(ctx.site);
  return pageMetadata(ctx, MODULES.seniors.path, {
    title: ctx.dict.sections.seniors,
    description: hero.lead?.[ctx.locale],
  });
}

export default async function Page({ params }: Props) {
  return <SeniorsScreen ctx={await getPageContext(params)} />;
}
