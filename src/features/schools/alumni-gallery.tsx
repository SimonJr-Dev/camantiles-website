"use client"

import { useState } from "react"

import { Card } from "@/components/ui/card"
import { Chip } from "@/components/ui/chip"
import { PhotoPlaceholder } from "@/components/ui/photo-placeholder"

/** Photos from past homecomings, one year at a time. */
function AlumniGallery({
  title,
  chooseLabel,
  years,
}: {
  title: string
  chooseLabel: string
  years: { year: string; label: string; photos: string[] }[]
}) {
  const [selected, setSelected] = useState(years[0]?.year)
  const current = years.find((item) => item.year === selected) ?? years[0]
  if (!current) return null

  return (
    <Card className="flex flex-col gap-4 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xl font-extrabold">{title}</h3>
        <div role="group" aria-label={chooseLabel} className="flex flex-wrap gap-1.5">
          {years.map((item) => (
            <Chip
              key={item.year}
              className="bg-background px-4 aria-pressed:bg-inverse aria-pressed:text-white"
              aria-pressed={item.year === current.year}
              onClick={() => setSelected(item.year)}
            >
              {item.label}
            </Chip>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3">
        {current.photos.map((photo) => (
          <PhotoPlaceholder key={photo} label={photo} className="h-[170px] rounded-inner" />
        ))}
      </div>
    </Card>
  )
}

export { AlumniGallery }
