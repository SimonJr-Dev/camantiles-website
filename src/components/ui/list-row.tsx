import Link from "next/link"
import type { ComponentProps } from "react"
import { ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"

/** Inset row link with a trailing arrow (services, downloads). */
function ListRow({ className, children, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
      data-slot="list-row"
      className={cn(
        "flex items-center justify-between gap-3 rounded-2xl bg-background px-[18px] py-4 text-[15px] font-semibold text-foreground no-underline transition-colors hover:bg-muted",
        className
      )}
      {...props}
    >
      <span>{children}</span>
      <ArrowUpRight aria-hidden className="size-[18px] shrink-0" strokeWidth={2.2} />
    </Link>
  )
}

/** Circular arrow badge that sits on tiles and cards. */
function ArrowBadge({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="arrow-badge"
      aria-hidden
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-full bg-background text-foreground",
        className
      )}
      {...props}
    >
      <ArrowUpRight className="size-4" strokeWidth={2.2} />
    </span>
  )
}

export { ListRow, ArrowBadge }
