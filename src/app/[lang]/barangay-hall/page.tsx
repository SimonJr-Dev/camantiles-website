import type { Metadata } from "next";

import { HallScreen } from "@/features/barangay-hall/hall-screen";
import { getPageContext } from "@/lib/context";
import { pageMetadata } from "@/lib/metadata";
import { MODULES } from "@/sites/modules";

type Props = PageProps<"/[lang]/barangay-hall">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const ctx = await getPageContext(params);
  return pageMetadata(ctx, MODULES.hall.path, {
    title: ctx.dict.hall.pageTitle,
    description: ctx.dict.hall.lead,
  });
}

export default async function Page({ params }: Props) {
  return <HallScreen ctx={await getPageContext(params)} />;
}
