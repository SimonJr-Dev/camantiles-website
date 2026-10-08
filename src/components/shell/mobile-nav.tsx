"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useId, useRef, useState } from "react"
import { Menu, X } from "lucide-react"

import { cn } from "@/lib/utils"

import type { NavItem } from "./main-nav"

/**
 * Menu button and drop-down panel for screens too narrow for the nav pill.
 * The panel hangs below the sticky header and closes on Escape, on a tap
 * outside it, or when a link is followed.
 */
function MobileNav({
  items,
  labels,
  hotlines,
}: {
  items: NavItem[]
  labels: { open: string; close: string; nav: string }
  hotlines: { label: string; href: string }
}) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const panelId = useId()
  const button = useRef<HTMLButtonElement>(null)
  const wrapper = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return
      setOpen(false)
      button.current?.focus()
    }
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

  const close = () => setOpen(false)
  const isCurrent = (item: NavItem) =>
    pathname === item.href || (!item.exact && pathname.startsWith(`${item.href}/`))
  const link =
    "flex min-h-12 items-center rounded-2xl px-4 text-base font-semibold text-foreground no-underline transition-colors hover:bg-muted aria-[current=page]:bg-primary aria-[current=page]:text-primary-foreground"

  return (
    <div ref={wrapper} className="contents">
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? labels.close : labels.open}
        onClick={() => setOpen((value) => !value)}
        className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-card text-foreground shadow-pill"
      >
        {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
      </button>

      <nav
        id={panelId}
        aria-label={labels.nav}
        hidden={!open}
        className="absolute inset-x-0 top-full px-4 pb-4 sm:px-6"
      >
        <div className="mx-auto flex max-h-[calc(100dvh-7rem)] max-w-site flex-col gap-1 overflow-y-auto rounded-card bg-card p-3 shadow-popover">
          {items.map((item) => (
            <div key={item.href} className="flex flex-col gap-1">
              <Link
                href={item.href}
                onClick={close}
                aria-current={isCurrent(item) && !item.children ? "page" : undefined}
                className={link}
              >
                {item.label}
              </Link>
              {item.children ? (
                <div className="ml-4 flex flex-col gap-1 border-l-2 border-muted pl-2">
                  {/* The last child repeats the parent link ("All schools"), so it is left out here. */}
                  {item.children.slice(0, -1).map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      prefetch
                      onClick={close}
                      aria-current={pathname === child.href ? "page" : undefined}
                      className={cn(link, "min-h-11 text-[15px] font-medium")}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
          <a
            href={hotlines.href}
            onClick={close}
            className="mt-2 flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-inverse px-4 text-base font-bold text-white no-underline"
          >
            <span aria-hidden className="size-2 rounded-full bg-destructive" />
            {hotlines.label}
          </a>
        </div>
      </nav>
    </div>
  )
}

export { MobileNav }
