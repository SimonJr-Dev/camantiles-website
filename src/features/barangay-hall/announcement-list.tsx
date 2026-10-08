"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowUpRight } from "lucide-react"

import { Card } from "@/components/ui/card"
import { Chip } from "@/components/ui/chip"
import { PhotoPlaceholder } from "@/components/ui/photo-placeholder"
import { Tag } from "@/components/ui/tag"
import type { SectionTone } from "@/sites/modules"

export type AnnouncementRow = {
  slug: string
  href: string
  category: SectionTone
  tag: string
  date: string | null
  title: string
  summary: string
}

/**
 * Every announcement is rendered; the chips only hide the ones outside the
 * chosen category, so the full list is in the page without JavaScript.
 */
function AnnouncementList({
  rows,
  filters,
  labels,
}: {
  rows: AnnouncementRow[]
  filters: { category: SectionTone; label: string }[]
  labels: { group: string; all: string; readMore: string; photo: string; none: string }
}) {
  const [selected, setSelected] = useState<SectionTone | null>(null)
  const visible = rows.filter((row) => !selected || row.category === selected)

  return (
    <>
      <div
        role="group"
        aria-label={labels.group}
        className="flex flex-wrap gap-1.5 self-start rounded-[28px] bg-card p-1.5 shadow-[0_1px_2px_rgb(11_23_18/0.06)]"
      >
        <Chip aria-pressed={selected === null} onClick={() => setSelected(null)}>
          {labels.all}
        </Chip>
        {filters.map((filter) => (
          <Chip
            key={filter.category}
            aria-pressed={selected === filter.category}
            onClick={() => setSelected(filter.category)}
          >
            {filter.label}
          </Chip>
        ))}
      </div>

      {rows.map((row) => (
        <Card
          key={row.slug}
          hidden={selected !== null && row.category !== selected}
          className="flex flex-wrap items-center gap-5 p-3.5 [&[hidden]]:hidden"
        >
          <PhotoPlaceholder label={labels.photo} className="h-[110px] w-[150px] shrink-0 rounded-2xl" />
          <div className="flex min-w-0 flex-[1_1_260px] flex-col gap-2 pr-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <Tag tone={row.category}>{row.tag}</Tag>
              {row.date ? (
                <span className="text-[13px] font-medium text-muted-foreground">{row.date}</span>
              ) : null}
            </div>
            <h3 className="text-[19px] leading-[1.3] font-bold">{row.title}</h3>
            <p className="text-sm leading-[1.55] text-muted-foreground">{row.summary}</p>
          </div>
          <Link
            href={row.href}
            prefetch
            aria-label={`${labels.readMore}: ${row.title}`}
            className="mr-2 flex size-11 shrink-0 items-center justify-center rounded-full bg-background text-foreground transition-colors hover:bg-muted"
          >
            <ArrowUpRight aria-hidden className="size-[18px]" strokeWidth={2.2} />
          </Link>
        </Card>
      ))}

      {visible.length === 0 ? (
        <p role="status" className="px-2 text-sm text-muted-foreground">
          {labels.none}
        </p>
      ) : null}
    </>
  )
}

export { AnnouncementList }
