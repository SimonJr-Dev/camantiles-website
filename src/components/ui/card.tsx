import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

/** White surface with the soft card shadow. */
function Card({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn("rounded-card bg-card text-card-foreground shadow-card", className)}
      {...props}
    />
  )
}

const panelTones = {
  primary: "bg-primary text-primary-foreground",
  accent: "bg-accent text-accent-foreground",
  inverse: "bg-inverse text-inverse-foreground",
  card: "bg-card text-card-foreground shadow-card",
} as const

/** The large coloured blocks: hero, next-event, footer. */
function Panel({
  className,
  tone = "primary",
  ...props
}: ComponentProps<"div"> & { tone?: keyof typeof panelTones }) {
  return (
    <div
      data-slot="panel"
      className={cn("rounded-panel", panelTones[tone], className)}
      {...props}
    />
  )
}

export { Card, Panel }
