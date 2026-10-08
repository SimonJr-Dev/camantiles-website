import type { Metadata } from "next";

import { getSchoolsIndex } from "@/content";
import { SchoolsScreen } from "@/features/schools/schools-screen";
import { getPageContext } from "@/lib/context";
import { pageMetadata } from "@/lib/metadata";
import { MODULES } from "@/sites/modules";

type Props = PageProps<"/[lang]/schools">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const ctx = await getPageContext(params);
  const index = await getSchoolsIndex(ctx.site);
  return pageMetadata(ctx, MODULES.schools.path, {
    title: ctx.dict.sections.schools,
    description: index.lead[ctx.locale],
  });
}

export default async function Page({ params }: Props) {
  return <SchoolsScreen ctx={await getPageContext(params)} />;
}
