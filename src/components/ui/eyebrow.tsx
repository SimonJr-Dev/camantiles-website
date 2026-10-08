import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

/** Pill used above hero headings, with a leading dot unless `dot` is off. */
function Eyebrow({
  className,
  children,
  dot = true,
  ...props
}: ComponentProps<"span"> & { dot?: boolean }) {
  return (
    <span
      data-slot="eyebrow"
      className={cn(
        "inline-flex items-center gap-2 self-start rounded-full bg-white/10 px-3.5 py-[7px] text-[13px] font-semibold",
        className
      )}
      {...props}
    >
      {dot ? <span aria-hidden className="size-[7px] rounded-full bg-accent" /> : null}
      {children}
    </span>
  )
}

/** Small uppercase label above section headings and footer columns. */
function Overline({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="overline"
      className={cn(
        "text-[13px] font-bold tracking-[0.08em] text-link uppercase",
        className
      )}
      {...props}
    />
  )
}

export { Eyebrow, Overline }
