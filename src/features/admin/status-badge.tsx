import { Archive, CircleCheck, Clock, PencilLine, type LucideIcon } from "lucide-react"

import type { ContentStatus } from "@/content/types"
import { cn } from "@/lib/utils"

// Each status has its own icon and word as well as a colour, so it reads
// without relying on colour alone.
const STATUS: Record<ContentStatus, { label: string; icon: LucideIcon; className: string }> = {
  draft: { label: "Draft", icon: PencilLine, className: "bg-muted text-subtle-foreground" },
  review: { label: "In review", icon: Clock, className: "bg-accent-soft text-accent-soft-foreground" },
  published: { label: "Published", icon: CircleCheck, className: "bg-hall text-hall-foreground" },
  archived: { label: "Archived", icon: Archive, className: "bg-background text-muted-foreground" },
}

function StatusBadge({ status, className }: { status: ContentStatus; className?: string }) {
  const { label, icon: Icon, className: tone } = STATUS[status]

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[13px] font-bold whitespace-nowrap",
        tone,
        className
      )}
    >
      <Icon aria-hidden className="size-3.5" strokeWidth={2.4} />
      {label}
    </span>
  )
}

export { StatusBadge, STATUS }
