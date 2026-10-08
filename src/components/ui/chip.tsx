import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

/** Filter or tab pill. Pass `aria-pressed` for the selected one. */
function Chip({ className, type = "button", ...props }: ComponentProps<"button">) {
  return (
    <button
      data-slot="chip"
      type={type}
      className={cn(
        "inline-flex min-h-11 cursor-pointer items-center rounded-full px-[18px] text-sm font-semibold text-subtle-foreground transition-colors hover:bg-muted aria-pressed:bg-primary aria-pressed:text-primary-foreground",
        className
      )}
      {...props}
    />
  )
}

export { Chip }
