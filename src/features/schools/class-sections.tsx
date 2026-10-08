"use client"

import { useState } from "react"

import { Carousel } from "@/components/blocks/carousel"
import { Card } from "@/components/ui/card"
import { Chip } from "@/components/ui/chip"
import { PhotoPlaceholder } from "@/components/ui/photo-placeholder"

export type GradeGroup = {
  key: string
  name: string
  sections: { id: string; label: string; adviser: string | null }[]
}

/** Class sections in a carousel, narrowed to one grade with the chips. */
function ClassSections({
  grades,
  labels,
}: {
  grades: GradeGroup[]
  labels: {
    filter: string
    all: string
    hint: string
    previous: string
    next: string
    classPhoto: string
    photo: string
  }
}) {
  const [selected, setSelected] = useState<string | null>(null)
  const shown = grades.filter((grade) => !selected || grade.key === selected)
  const chip =
    "bg-card px-4 shadow-[0_1px_2px_rgb(11_23_18/0.1)] aria-pressed:bg-schools-deep aria-pressed:text-white"

  return (
    <>
      <div role="group" aria-label={labels.filter} className="flex flex-wrap gap-1.5">
        <Chip className={chip} aria-pressed={selected === null} onClick={() => setSelected(null)}>
          {labels.all}
        </Chip>
        {grades.map((grade) => (
          <Chip
            key={grade.key}
            className={chip}
            aria-pressed={selected === grade.key}
            onClick={() => setSelected(grade.key)}
          >
            {grade.name}
          </Chip>
        ))}
      </div>
      {/* Keyed by the selection so the row starts from the left again after a change. */}
      <Carousel
        key={selected ?? "all"}
        step={552}
        arrowClassName="bg-schools-deep"
        labels={{ hint: labels.hint, previous: labels.previous, next: labels.next }}
      >
        {shown.flatMap((grade) =>
          grade.sections.map((section) => (
            <Card
              key={section.id}
              className="flex w-[280px] shrink-0 snap-start flex-col gap-3 px-2.5 pt-2.5 pb-[18px]"
            >
              <PhotoPlaceholder label={labels.classPhoto} className="h-[200px] rounded-2xl" />
              <span className="mx-1.5 self-start rounded-full bg-schools px-2.5 py-1 text-xs font-bold text-schools-foreground">
                {grade.name}
              </span>
              <div className="flex items-center gap-2.5 px-1.5">
                <PhotoPlaceholder
                  label={labels.photo}
                  className="size-11 shrink-0 rounded-full p-0 text-[8px]"
                />
                <div className="flex flex-col gap-0.5">
                  <span className="font-bold">{section.label}</span>
                  {section.adviser ? (
                    <span className="text-[13px] text-muted-foreground">{section.adviser}</span>
                  ) : null}
                </div>
              </div>
            </Card>
          ))
        )}
      </Carousel>
    </>
  )
}

export { ClassSections }
