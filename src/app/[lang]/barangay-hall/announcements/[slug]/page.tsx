import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { PageSkeleton } from "@/components/blocks/page-skeleton";
import { getAnnouncement, getAnnouncements } from "@/content";
import { AnnouncementScreen } from "@/features/barangay-hall/announcement-screen";
import { getPageContext } from "@/lib/context";
import { pageMetadata } from "@/lib/metadata";
import { announcementPath } from "@/sites/modules";
import { getSite } from "@/sites";

type Props = PageProps<"/[lang]/barangay-hall/announcements/[slug]">;

export async function generateStaticParams() {
  const site = getSite();
  if (!site) return [];
  return (await getAnnouncements(site)).map((item) => ({ slug: item.slug }));
}

async function resolve(params: Props["params"]) {
  const ctx = await getPageContext(params);
  const { slug } = await params;
  const item = await getAnnouncement(ctx.site, slug);
  if (!item) notFound();
  return { ctx, item };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ctx, item } = await resolve(params);
  return pageMetadata(ctx, announcementPath(item.slug), {
    title: item.title[ctx.locale],
    description: item.summary[ctx.locale],
  });
}

// Which announcement this is comes from the URL, so the content sits inside a
// loading boundary and the page outline can show at once.
async function Announcement({ params }: Pick<Props, "params">) {
  const { ctx, item } = await resolve(params);
  return <AnnouncementScreen ctx={ctx} item={item} />;
}

export default function Page({ params }: Props) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Announcement params={params} />
    </Suspense>
  );
}
