"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useId, useRef, useState } from "react"
import {
  CalendarDays,
  ExternalLink,
  FileText,
  FolderOpen,
  History,
  LayoutDashboard,
  LogOut,
  Megaphone,
  Menu,
  UserCog,
  Users,
  X,
  type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

import { signOut } from "./actions"
import type { AdminIcon, AdminNavGroup } from "./nav"

const ICONS: Record<AdminIcon, LucideIcon> = {
  dashboard: LayoutDashboard,
  announcements: Megaphone,
  events: CalendarDays,
  pages: FileText,
  people: Users,
  files: FolderOpen,
  users: UserCog,
  activity: History,
}

type Props = {
  groups: AdminNavGroup[]
  site: { name: string; seal: string }
  user: { name: string; email: string; role: string }
}

const row =
  "flex min-h-11 items-center gap-3 rounded-2xl px-3 text-[15px] font-semibold no-underline transition-colors"

function Links({ groups, onNavigate }: { groups: AdminNavGroup[]; onNavigate?: () => void }) {
  const pathname = usePathname()
  const isCurrent = (href: string) =>
    href === "/admin" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`)

  return (
    <nav aria-label="Staff area" className="flex flex-col gap-5">
      {groups.map((group) => (
        <div key={group.label} className="flex flex-col gap-1">
          <span className="px-3 pb-1 text-xs font-bold tracking-[0.08em] text-muted-foreground uppercase">
            {group.label}
          </span>
          {group.items.map((item) => {
            const Icon = ICONS[item.icon]
            // Not built yet: shown so staff know it is planned, but not a link.
            if (item.soon) {
              return (
                <span key={item.href} className={cn(row, "text-muted-foreground")}>
                  <Icon aria-hidden className="size-5 shrink-0" strokeWidth={1.8} />
                  {item.label}
                  <span className="ml-auto rounded-full bg-muted px-2 py-0.5 text-[11px] font-bold">
                    Soon
                  </span>
                </span>
              )
            }
            const current = isCurrent(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                aria-current={current ? "page" : undefined}
                className={cn(
                  row,
                  current
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                )}
              >
                <Icon aria-hidden className="size-5 shrink-0" strokeWidth={1.8} />
                {item.label}
              </Link>
            )
          })}
        </div>
      ))}
    </nav>
  )
}

function Brand({ site }: Pick<Props, "site">) {
  return (
    <Link href="/admin" className="flex items-center gap-3 text-foreground no-underline">
      <Image
        src={site.seal}
        alt=""
        width={44}
        height={44}
        className="size-11 shrink-0 rounded-full object-contain"
      />
      <span className="flex min-w-0 flex-col">
        <span className="truncate text-[15px] leading-tight font-extrabold tracking-[-0.02em]">
          {site.name}
        </span>
        <span className="text-xs font-semibold text-muted-foreground">Staff area</span>
      </span>
    </Link>
  )
}

function Account({ user }: Pick<Props, "user">) {
  return (
    <div className="flex flex-col gap-3 border-t pt-4">
      <div className="flex flex-col px-3">
        <span className="truncate text-[15px] font-bold">{user.name}</span>
        <span className="truncate text-[13px] text-muted-foreground">{user.role}</span>
      </div>
      <div className="flex flex-col gap-1">
        <a href="/" target="_blank" rel="noopener" className={cn(row, "text-foreground hover:bg-muted")}>
          <ExternalLink aria-hidden className="size-5 shrink-0" strokeWidth={1.8} />
          View the website
        </a>
        <form action={signOut}>
          <button
            type="submit"
            className={cn(row, "w-full cursor-pointer text-foreground hover:bg-muted")}
          >
            <LogOut aria-hidden className="size-5 shrink-0" strokeWidth={1.8} />
            Sign out
          </button>
        </form>
      </div>
    </div>
  )
}

/**
 * Staff-area navigation: a fixed sidebar on wide screens, and a top bar with a
 * slide-in menu on narrow ones.
 */
function AdminNav({ groups, site, user }: Props) {
  const [open, setOpen] = useState(false)
  const drawerId = useId()
  const toggle = useRef<HTMLButtonElement>(null)
  const drawer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    drawer.current?.querySelector<HTMLElement>("a, button")?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return
      setOpen(false)
      toggle.current?.focus()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <>
      <aside className="sticky top-0 hidden h-screen w-[272px] shrink-0 flex-col gap-6 overflow-y-auto border-r bg-card p-4 lg:flex">
        <div className="px-1 pt-1">
          <Brand site={site} />
        </div>
        <div className="grow">
          <Links groups={groups} />
        </div>
        <Account user={user} />
      </aside>

      <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b bg-card px-4 py-2.5 lg:hidden">
        <Brand site={site} />
        <button
          ref={toggle}
          type="button"
          aria-expanded={open}
          aria-controls={drawerId}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
          className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-background text-foreground"
        >
          {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
        </button>
      </header>

      {open ? (
        <div
          aria-hidden
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-inverse/40 lg:hidden"
        />
      ) : null}
      <div
        ref={drawer}
        id={drawerId}
        hidden={!open}
        className="fixed inset-y-0 right-0 z-40 flex w-[min(320px,88vw)] flex-col gap-6 overflow-y-auto bg-card p-4 shadow-popover lg:hidden"
      >
        <div className="flex items-center justify-between gap-3">
          <span className="px-3 text-[17px] font-extrabold">Menu</span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => {
              setOpen(false)
              toggle.current?.focus()
            }}
            className="flex size-11 cursor-pointer items-center justify-center rounded-full bg-background text-foreground"
          >
            <X aria-hidden className="size-5" />
          </button>
        </div>
        <div className="grow">
          <Links groups={groups} onNavigate={() => setOpen(false)} />
        </div>
        <Account user={user} />
      </div>
    </>
  )
}

export { AdminNav }
