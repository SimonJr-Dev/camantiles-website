import type { ReactNode } from "react"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const sizes = {
  default: { cell: "px-[22px] py-[18px] text-base", head: "text-xs", min: "min-w-[520px]" },
  // Larger text for the Senior Citizens page.
  large: { cell: "px-6 py-5 text-lg", head: "text-[13px]", min: "min-w-[640px]" },
} as const

/** A simple schedule table; the first column is the row heading. Scrolls sideways on narrow screens. */
function DataTable({
  columns,
  rows,
  size = "default",
  caption,
}: {
  columns: string[]
  rows: { id: string; cells: ReactNode[] }[]
  size?: keyof typeof sizes
  caption: string
}) {
  const s = sizes[size]

  return (
    <Card className="overflow-x-auto p-2">
      <table className={cn("w-full border-collapse text-left", s.min)}>
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                scope="col"
                className={cn(
                  s.cell,
                  s.head,
                  "font-bold tracking-[0.08em] text-muted-foreground uppercase"
                )}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {row.cells.map((cell, index) =>
                index === 0 ? (
                  <th key={index} scope="row" className={cn(s.cell, "border-t font-bold")}>
                    {cell}
                  </th>
                ) : (
                  <td key={index} className={cn(s.cell, "border-t")}>
                    {cell}
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  )
}

export { DataTable }
