import type { ReactNode } from "react"

import { PhotoPlaceholder } from "@/components/ui/photo-placeholder"
import { format } from "@/i18n/format"
import type { PageContext } from "@/lib/context"
import { cn } from "@/lib/utils"

import { Breadcrumb } from "./breadcrumb"

const tones = {
  health: { panel: "bg-health-foreground", ring: "border-white/8" },
  sk: { panel: "bg-sk-deep", ring: "border-accent/14" },
  seniors: { panel: "bg-seniors-deep", ring: "border-accent/14" },
} as const

/**
 * The opening block of a section page: a coloured panel with the heading and
 * actions, beside a photo and one info card.
 */
function SectionHero({
  ctx,
  tone,
  crumb,
  titleLines,
  lead,
  leadClassName,
  large,
  actions,
  photoSubject,
  aside,
}: {
  ctx: PageContext
  tone: keyof typeof tones
  crumb: string
  titleLines: [string, string]
  lead: string
  leadClassName?: string
  /** Slightly larger breadcrumb, for pages set in bigger type. */
  large?: boolean
  actions: ReactNode
  photoSubject: string
  aside: ReactNode
}) {
  const { dict } = ctx

  return (
    <div className="flex flex-wrap gap-5">
      <div
        className={cn(
          "relative flex flex-[2_1_560px] flex-col justify-between gap-8 overflow-hidden rounded-panel p-7 text-white sm:min-h-[460px] sm:gap-10 sm:p-12",
          tones[tone].panel
        )}
      >
        <div
          aria-hidden
          className={cn(
            "absolute -right-[120px] -bottom-[160px] box-content size-[420px] rounded-full border-[64px]",
            tones[tone].ring
          )}
        />
        <Breadcrumb
          ctx={ctx}
          trail={[{ label: crumb }]}
          className={cn(
            "relative [&>span]:bg-white/12",
            large && "[&>span]:px-4 [&>span]:py-2 [&>span]:text-sm"
          )}
        />
        <div className="relative flex flex-col gap-[18px]">
          <h1 className="text-h1 leading-[0.98] tracking-[-0.045em]">
            {titleLines[0]}
            <br />
            {titleLines[1]}
          </h1>
          <p className={cn("max-w-[520px] text-lg leading-[1.6] text-white/80", leadClassName)}>
            {lead}
          </p>
        </div>
        <div className="relative flex flex-wrap gap-3">{actions}</div>
      </div>
      <div className="flex flex-[1_1_340px] flex-col gap-5">
        <PhotoPlaceholder
          label={format(dict.pending.photoOf, { subject: photoSubject })}
          className="min-h-[220px] flex-[1_1_220px] rounded-panel"
        />
        {aside}
      </div>
    </div>
  )
}

export { SectionHero }
