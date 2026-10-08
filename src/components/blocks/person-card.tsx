import { Card } from "@/components/ui/card"
import { valueOrPending } from "@/components/ui/pending"
import { PhotoPlaceholder } from "@/components/ui/photo-placeholder"
import type { Person } from "@/content/types"
import type { PageContext } from "@/lib/context"

function PersonCard({ person, ctx }: { person: Person; ctx: PageContext }) {
  const { locale, dict } = ctx
  const name = valueOrPending(person.name, dict.pending.name)

  return (
    <Card className="flex flex-col gap-3.5 px-3 pt-3 pb-5">
      <PhotoPlaceholder label={dict.pending.photo} className="h-[190px] rounded-inner" />
      <div className="flex flex-col gap-0.5 px-2">
        {name ? <strong className="text-base">{name}</strong> : null}
        <span className="text-[13px] text-muted-foreground">{person.role[locale]}</span>
      </div>
    </Card>
  )
}

export { PersonCard }
