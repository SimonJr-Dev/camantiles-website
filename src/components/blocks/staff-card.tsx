import { Card } from "@/components/ui/card"
import { valueOrPending } from "@/components/ui/pending"
import { PhotoPlaceholder } from "@/components/ui/photo-placeholder"
import type { StaffMember } from "@/content"
import type { PageContext } from "@/lib/context"
import { cn } from "@/lib/utils"

/** Photo, name and role of a council member or worker, with an optional focus tag. */
function StaffCard({
  member,
  ctx,
  className,
  photoClassName = "h-[170px]",
  tagClassName,
}: {
  member: StaffMember
  ctx: PageContext
  className?: string
  photoClassName?: string
  tagClassName?: string
}) {
  const { locale, dict } = ctx
  const name = valueOrPending(member.name, dict.pending.name)

  return (
    <Card className={cn("flex flex-col gap-3 px-3 pt-3 pb-[18px]", className)}>
      <PhotoPlaceholder label={dict.pending.photo} className={cn("rounded-inner", photoClassName)} />
      <div className="flex flex-col gap-1 px-2">
        {name ? <strong className="text-[15px]">{name}</strong> : null}
        <span className="text-[13px] text-muted-foreground">{member.role[locale]}</span>
        {member.focus ? (
          <span
            className={cn(
              "mt-1 self-start rounded-full px-2.5 py-1 text-xs font-bold",
              tagClassName
            )}
          >
            {member.focus[locale]}
          </span>
        ) : null}
      </div>
    </Card>
  )
}

export { StaffCard }
