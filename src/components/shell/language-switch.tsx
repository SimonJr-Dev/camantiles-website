"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { switchLocale } from "@/lib/href"
import type { Locale } from "@/sites/types"

/** Links to the current page in each language the site offers. */
function LanguageSwitch({
  label,
  current,
  options,
}: {
  label: string
  current: Locale
  options: { locale: Locale; name: string }[]
}) {
  const pathname = usePathname()

  return (
    <div
      role="group"
      aria-label={label}
      className="flex gap-0.5 rounded-full bg-card p-1 shadow-pill"
    >
      {options.map(({ locale, name }) => (
        <Link
          key={locale}
          href={switchLocale(pathname, current, locale)}
          hrefLang={locale}
          lang={locale}
          title={name}
          // The spoken name starts with the visible code so voice control ("click EN") works.
          aria-label={`${locale.toUpperCase()}, ${name}`}
          aria-current={locale === current ? "true" : undefined}
          className="flex min-h-9 min-w-9 items-center justify-center rounded-full px-2 text-[13px] font-bold text-subtle-foreground uppercase sm:min-w-11 sm:px-3 no-underline transition-colors hover:bg-muted aria-[current=true]:bg-accent aria-[current=true]:text-accent-foreground"
        >
          {locale}
        </Link>
      ))}
    </div>
  )
}

export { LanguageSwitch }
