import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"
import type { SectionTone } from "@/sites/modules"

export const toneClasses: Record<SectionTone, string> = {
  hall: "bg-hall text-hall-foreground",
  sk: "bg-sk text-sk-foreground",
  seniors: "bg-seniors text-seniors-foreground",
  schools: "bg-schools text-schools-foreground",
  health: "bg-health text-health-foreground",
  advisory: "bg-advisory text-advisory-foreground",
}

/** Small section-coloured label on cards and advisories. */
function Tag({
  className,
  tone,
  ...props
}: ComponentProps<"span"> & { tone: SectionTone }) {
  return (
    <span
      data-slot="tag"
      className={cn(
        "inline-flex items-center rounded-full px-[11px] py-[5px] text-xs font-bold",
        toneClasses[tone],
        className
      )}
      {...props}
    />
  )
}

/** Rounded square holding a section icon. */
function IconTile({
  className,
  tone,
  ...props
}: ComponentProps<"div"> & { tone: SectionTone }) {
  return (
    <div
      data-slot="icon-tile"
      className={cn(
        "flex size-[52px] shrink-0 items-center justify-center rounded-2xl [&_svg]:size-[26px] [&_svg]:stroke-[1.8]",
        toneClasses[tone],
        className
      )}
      {...props}
    />
  )
}

export { Tag, IconTile }
