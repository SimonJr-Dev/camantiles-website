"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
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
const pill =
  "rounded-full text-sm font-semibold text-subtle-foreground transition-colors hover:bg-muted hover:text-foreground [html[lang=fil]_&]:text-[13.5px]"
const padding = "px-3.5 py-[9px] [html[lang=fil]_&]:px-[9px]"
const current = "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"

/**
 * A section link with a menu of sub-pages. The menu opens on hover and on
 * keyboard focus, and the arrow button opens it by tap for touch screens.
 */
function Submenu({
  item,
  isCurrent,
  pathname,
  toggleLabel,
}: {
  item: NavItem
  isCurrent: boolean
  pathname: string
  toggleLabel: string
}) {
  const [open, setOpen] = useState(false)
  const wrapper = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false)
    const onPointer = (event: PointerEvent) => {
      if (!wrapper.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener("keydown", onKey)
    document.addEventListener("pointerdown", onPointer)
    return () => {
      document.removeEventListener("keydown", onKey)
      document.removeEventListener("pointerdown", onPointer)
    }
  }, [open])

  return (
    <div ref={wrapper} className={cn("group relative flex items-center", pill, isCurrent && current)}>
      <Link
        href={item.href}
        aria-current={isCurrent ? "page" : undefined}
        className={cn(padding, "pr-1 text-inherit no-underline [html[lang=fil]_&]:pr-0.5")}
      >
        {item.label}
      </Link>
      <button
        type="button"
        aria-expanded={open}
        aria-label={toggleLabel}
        onClick={() => setOpen((value) => !value)}
        className="flex h-full cursor-pointer items-center rounded-full pr-3 pl-0.5 text-inherit"
      >
        <ChevronDown
          aria-hidden
          className={cn("size-3.5 transition-transform", open && "rotate-180")}
          strokeWidth={2.4}
        />
      </button>
      {/* before: bridges the gap so the menu stays open while the pointer travels to it */}
      <div
        className={cn(
          "absolute top-[calc(100%+10px)] left-1/2 z-30 w-[270px] -translate-x-1/2 flex-col gap-0.5 rounded-[20px] bg-popover p-2 shadow-popover group-focus-within:flex group-hover:flex before:absolute before:inset-x-0 before:-top-3.5 before:h-3.5",
          open ? "flex" : "hidden"
        )}
      >
        {item.children?.map((child) => (
          <Link
            key={child.href}
            href={child.href}
            prefetch
            onClick={() => setOpen(false)}
            aria-current={pathname === child.href ? "page" : undefined}
            className="flex flex-col gap-0.5 rounded-[14px] px-3.5 py-3 text-sm font-bold text-foreground no-underline transition-colors hover:bg-background aria-[current=page]:bg-schools"
          >
            {child.label}
            <small className="text-xs font-medium text-muted-foreground">{child.hint}</small>
          </Link>
        ))}
      </div>
    </div>
  )
}

function MainNav({
  label,
  items,
  submenuLabel,
  className,
}: {
  label: string
  items: NavItem[]
  /** Label for a submenu's arrow button, with a {label} slot. */
  submenuLabel: string
  className?: string
}) {
  const pathname = usePathname()
  const isCurrent = (item: NavItem) =>
    pathname === item.href || (!item.exact && pathname.startsWith(`${item.href}/`))

  return (
    <nav
      aria-label={label}
      className={cn("flex flex-wrap gap-0.5 rounded-[28px] bg-card p-[5px] shadow-pill", className)}
    >
      {items.map((item) =>
        item.children ? (
          <Submenu
            key={item.href}
            item={item}
            isCurrent={isCurrent(item)}
            pathname={pathname}
            toggleLabel={submenuLabel.replace("{label}", item.label)}
          />
        ) : (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isCurrent(item) ? "page" : undefined}
            className={cn(pill, padding, "no-underline", isCurrent(item) && current)}
          >
            {item.label}
          </Link>
        )
      )}
    </nav>
  )
}

export { MainNav }
