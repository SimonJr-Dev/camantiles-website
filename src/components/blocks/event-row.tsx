import { pending, SHOW_PENDING } from "@/components/ui/pending"
import type { Event } from "@/content/types"
import type { PageContext } from "@/lib/context"
import { monthAndDay } from "@/lib/dates"

/** Calendar badge plus title and host, for event lists. */
function EventRow({ item, ctx }: { item: Event; ctx: PageContext }) {
  const { locale, dict } = ctx
  const badge = item.date
    ? monthAndDay(item.date, locale)
    : SHOW_PENDING
      ? { month: pending(dict.pending.month), day: "00" }
      : null

  return (
    <div className="flex items-center gap-3.5">
      {badge ? (
        <div className="flex h-16 w-[60px] shrink-0 flex-col items-center justify-center rounded-inner bg-background">
          <span className="text-[11px] font-extrabold text-link uppercase">{badge.month}</span>
          <span className="text-[22px] leading-tight font-extrabold tracking-[-0.03em]">
            {badge.day}
          </span>
        </div>
      ) : null}
      <div>
        <div className="text-[15px] font-bold">{item.title[locale]}</div>
        <div className="text-[13px] text-muted-foreground">{item.host[locale]}</div>
      </div>
    </div>
  )
}

export { EventRow }
