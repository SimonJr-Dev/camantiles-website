import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

import { pending, SHOW_PENDING } from "./pending"

/** Striped stand-in for a photo that has not been supplied yet. The label shows in development only. */
function PhotoPlaceholder({
  className,
  label,
  ...props
}: Omit<ComponentProps<"div">, "children"> & { label: string }) {
  return (
    <div
      data-slot="photo-placeholder"
      aria-hidden
      className={cn(
        "flex items-center justify-center bg-[repeating-linear-gradient(135deg,var(--placeholder)_0_10px,var(--placeholder-stripe)_10px_20px)] p-3 text-center text-[13px] font-semibold text-placeholder-foreground",
        className
      )}
      {...props}
    >
      {SHOW_PENDING ? pending(label) : null}
    </div>
  )
}

export { PhotoPlaceholder }
