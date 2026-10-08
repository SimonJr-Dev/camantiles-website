"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

export type NavItem = {
  href: string
  label: string
  /** Home matches only its own URL; sections also match their sub-pages. */
  exact?: boolean
  children?: { href: string; label: string; hint: string }[]
}

// Filipino labels are longer; the tighter padding keeps the pill on one row.
const linkClass =
  "rounded-full px-3.5 py-[9px] text-sm font-semibold text-subtle-foreground no-underline transition-colors hover:bg-muted hover:text-foreground aria-[current=page]:bg-primary aria-[current=page]:text-primary-foreground [html[lang=fil]_&]:px-[9px] [html[lang=fil]_&]:text-[13.5px]"

function MainNav({ label, items }: { label: string; items: NavItem[] }) {
  const pathname = usePathname()
  const isCurrent = (item: NavItem) =>
    pathname === item.href || (!item.exact && pathname.startsWith(`${item.href}/`))

  return (
    <nav
      aria-label={label}
      className="flex flex-wrap gap-0.5 rounded-[28px] bg-card p-[5px] shadow-pill"
    >
      {items.map((item) =>
        item.children ? (
          <div key={item.href} className="group relative flex">
            <Link
              href={item.href}
              aria-haspopup="true"
              aria-current={isCurrent(item) ? "page" : undefined}
              className={cn(linkClass, "inline-flex items-center gap-1")}
            >
              {item.label}
              <ChevronDown aria-hidden className="size-3.5" strokeWidth={2.4} />
            </Link>
            {/* before: bridges the gap so the menu stays open while the pointer travels to it */}
            <div className="absolute top-[calc(100%+10px)] left-1/2 z-30 hidden w-[270px] -translate-x-1/2 flex-col gap-0.5 rounded-[20px] bg-popover p-2 shadow-popover group-focus-within:flex group-hover:flex before:absolute before:inset-x-0 before:-top-3.5 before:h-3.5">
              {item.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  prefetch
                  aria-current={pathname === child.href ? "page" : undefined}
                  className="flex flex-col gap-0.5 rounded-[14px] px-3.5 py-3 text-sm font-bold text-foreground no-underline transition-colors hover:bg-background aria-[current=page]:bg-schools"
                >
                  {child.label}
                  <small className="text-xs font-medium text-muted-foreground">
                    {child.hint}
                  </small>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isCurrent(item) ? "page" : undefined}
            className={linkClass}
          >
            {item.label}
          </Link>
        )
      )}
    </nav>
  )
}

export { MainNav }
