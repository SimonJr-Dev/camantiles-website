import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Breadcrumb } from "@/components/blocks/breadcrumb"
import { buttonVariants } from "@/components/ui/button"
import { valueOrPending } from "@/components/ui/pending"
import { PhotoPlaceholder } from "@/components/ui/photo-placeholder"
import { Tag } from "@/components/ui/tag"
import type { Announcement } from "@/content"
import type { PageContext } from "@/lib/context"
import { formatDate } from "@/lib/dates"
import { siteHref } from "@/lib/href"
import { MODULES } from "@/sites/modules"

// Not in the original design, which only has announcement cards. Built from
// the same tokens and components as the Barangay Hall page.
function AnnouncementScreen({ ctx, item }: { ctx: PageContext; item: Announcement }) {
  const { site, locale, dict } = ctx
  const date = valueOrPending(item.date && formatDate(item.date, locale), dict.pending.date)
  const hallHref = siteHref(site, locale, MODULES.hall.path)

  return (
    <article className="flex flex-col gap-7 rounded-card bg-card p-7 shadow-card sm:p-12">
      <Breadcrumb
        ctx={ctx}
        trail={[{ label: dict.sections.hall, path: MODULES.hall.path }, { label: item.title[locale] }]}
        className="[&>span]:bg-background [&>span]:text-subtle-foreground"
      />
      <header className="flex max-w-[760px] flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2.5">
          <Tag tone={item.category}>{dict.tags[item.category]}</Tag>
          {date ? <span className="text-sm font-medium text-muted-foreground">{date}</span> : null}
        </div>
        <h1 className="text-h2 leading-[1.05]">{item.title[locale]}</h1>
        <p className="text-xl leading-[1.5] font-semibold tracking-[-0.01em]">
          {item.summary[locale]}
        </p>
      </header>
      <PhotoPlaceholder label={dict.pending.photo} className="aspect-[16/7] max-w-[760px] rounded-card" />
      {item.body ? (
        <p className="max-w-[760px] text-lg leading-[1.75] text-prose">{item.body[locale]}</p>
      ) : null}
      <Link href={hallHref} className={buttonVariants({ variant: "white", className: "self-start bg-background" })}>
        <ArrowLeft aria-hidden />
        {dict.hall.backToAnnouncements}
      </Link>
    </article>
  )
}

export { AnnouncementScreen }
