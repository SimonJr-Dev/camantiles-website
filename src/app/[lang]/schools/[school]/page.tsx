import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { PageSkeleton } from "@/components/blocks/page-skeleton";
import { getSchool } from "@/content";
import { SchoolScreen } from "@/features/schools/school-screen";
import { getPageContext } from "@/lib/context";
import { pageMetadata } from "@/lib/metadata";
import { schoolPath } from "@/sites/modules";
import { getSite } from "@/sites";

type Props = PageProps<"/[lang]/schools/[school]">;

export function generateStaticParams() {
  return (getSite()?.schools ?? []).map((school) => ({ school: school.slug }));
}

async function resolve(params: Props["params"]) {
  const ctx = await getPageContext(params);
  const { school: slug } = await params;
  const school = ctx.site.schools.find((item) => item.slug === slug);
  const content = school ? await getSchool(ctx.site, slug) : null;
  if (!school || !content) notFound();
  return { ctx, school, content };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ctx, school, content } = await resolve(params);
  return pageMetadata(ctx, schoolPath(school.slug), {
    title: school.name[ctx.locale],
    description: content.tagline[ctx.locale],
  });
}

// Which school this is comes from the URL, so the content sits inside a loading
// boundary: moving between schools shows the outline at once instead of waiting.
async function School({ params }: Pick<Props, "params">) {
  return <SchoolScreen {...await resolve(params)} />;
}

export default function Page({ params }: Props) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <School params={params} />
    </Suspense>
  );
}
