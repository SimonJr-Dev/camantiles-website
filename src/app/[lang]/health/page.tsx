import type { Metadata } from "next";

import { HealthScreen } from "@/features/health/health-screen";
import { getPageContext } from "@/lib/context";
import { pageMetadata } from "@/lib/metadata";
import { MODULES } from "@/sites/modules";

type Props = PageProps<"/[lang]/health">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const ctx = await getPageContext(params);
  return pageMetadata(ctx, MODULES.health.path, {
    title: ctx.dict.nav.health,
    description: ctx.dict.health.lead,
  });
}

export default async function Page({ params }: Props) {
  return <HealthScreen ctx={await getPageContext(params)} />;
}
