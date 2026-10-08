import type { Metadata } from "next";

import { HomeScreen } from "@/features/home/home-screen";
import { getPageContext } from "@/lib/context";
import { pageMetadata } from "@/lib/metadata";

type Props = PageProps<"/[lang]">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const ctx = await getPageContext(params);
  return pageMetadata(ctx, "/", { description: ctx.dict.site.meta.description });
}

export default async function Page({ params }: Props) {
  return <HomeScreen ctx={await getPageContext(params)} />;
}
