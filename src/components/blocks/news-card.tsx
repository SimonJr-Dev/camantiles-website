import Link from "next/link"

import { valueOrPending } from "@/components/ui/pending"
import { PhotoPlaceholder } from "@/components/ui/photo-placeholder"
import { Tag } from "@/components/ui/tag"
import type { Announcement } from "@/content/types"
import type { PageContext } from "@/lib/context"
import { formatDate } from "@/lib/dates"
import { siteHref } from "@/lib/href"
import { announcementPath } from "@/sites/modules"

function NewsCard({ item, ctx }: { item: Announcement; ctx: PageContext }) {
  const { site, locale, dict } = ctx
  const date = valueOrPending(item.date && formatDate(item.date, locale), dict.pending.date)

  return (
    <article className="relative flex flex-col overflow-hidden rounded-card bg-card shadow-card transition-transform duration-200 hover:-translate-y-1">
      <PhotoPlaceholder label={dict.pending.photo} className="h-[170px]" />
      <div className="flex flex-col gap-2.5 p-[22px]">
        <div className="flex flex-wrap items-center gap-2.5">
          <Tag tone={item.category}>{dict.tags[item.category]}</Tag>
          {date ? (
            <span className="text-[13px] font-medium text-muted-foreground">{date}</span>
          ) : null}
        </div>
        <h3 className="text-[19px] leading-[1.3] font-bold">
          {/* after: stretches the link over the whole card */}
          <Link
            href={siteHref(site, locale, announcementPath(item.slug))}
            prefetch
            className="text-foreground no-underline after:absolute after:inset-0"
          >
            {item.title[locale]}
          </Link>
        </h3>
        <p className="text-sm leading-[1.55] text-muted-foreground">{item.summary[locale]}</p>
      </div>
    </article>
  )
}

export { NewsCard }
