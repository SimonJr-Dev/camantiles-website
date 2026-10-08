"use client"

import { useRef, type ReactNode } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * A row that scrolls sideways, by swipe or with the arrow buttons. Children
 * should be fixed-width items with `snap-start`.
 */
function Carousel({
  children,
  labels,
  arrowClassName = "bg-primary",
  step = 472,
}: {
  children: ReactNode
  labels: { hint: string; previous: string; next: string }
  /** Background of the arrow buttons, to match the section colour. */
  arrowClassName?: string
  /** Pixels to move per click; two 220px cards plus gaps by default. */
  step?: number
}) {
  const track = useRef<HTMLDivElement>(null)
  const move = (direction: 1 | -1) =>
    track.current?.scrollBy({ left: direction * step, behavior: "smooth" })

  const arrow = cn(
    "flex size-12 cursor-pointer items-center justify-center rounded-full text-white transition-colors hover:bg-inverse",
    arrowClassName
  )

  return (
    <>
      <div
        ref={track}
        tabIndex={0}
        role="group"
        aria-label={labels.hint}
        className="-mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pt-1 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-muted-foreground">{labels.hint}</span>
        <div className="flex gap-2">
          <button type="button" aria-label={labels.previous} onClick={() => move(-1)} className={arrow}>
            <ChevronLeft aria-hidden className="size-5" strokeWidth={2.2} />
          </button>
          <button type="button" aria-label={labels.next} onClick={() => move(1)} className={arrow}>
            <ChevronRight aria-hidden className="size-5" strokeWidth={2.2} />
          </button>
        </div>
      </div>
    </>
  )
}

export { Carousel }
