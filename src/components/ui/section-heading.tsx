import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

import { Overline } from "./eyebrow"

/** Overline, H2 and an optional action aligned to the right. */
function SectionHeading({
  overline,
  title,
  description,
  action,
  className,
  overlineClassName,
  titleClassName,
}: {
  overline?: string
  title: string
  description?: string
  action?: ReactNode
  className?: string
  /** Section colour for the overline; defaults to the link green. */
  overlineClassName?: string
  titleClassName?: string
}) {
  return (
    <div className={cn("flex flex-wrap items-end justify-between gap-4", className)}>
      <div className="flex flex-col gap-2">
        {overline ? <Overline className={overlineClassName}>{overline}</Overline> : null}
        <h2 className={cn("text-h2", titleClassName)}>{title}</h2>
        {description ? <p className="text-lg text-muted-foreground">{description}</p> : null}
      </div>
      {action}
    </div>
  )
}

export { SectionHeading }
