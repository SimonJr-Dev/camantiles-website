import Link from "next/link"

import { Eyebrow } from "@/components/ui/eyebrow"
import type { PageContext } from "@/lib/context"
import { siteHref } from "@/lib/href"
import { cn } from "@/lib/utils"

/** "Home / Section / Page" pill for the top of a hero panel. The last item is the current page. */
function Breadcrumb({
  ctx,
  trail,
  className,
}: {
  ctx: PageContext
  trail: { label: string; path?: string }[]
  className?: string
}) {
  const { site, locale, dict } = ctx
  const items = [{ label: dict.nav.home, path: "/" }, ...trail]

  return (
    <nav aria-label={dict.nav.breadcrumb} className={cn("self-start", className)}>
      <Eyebrow dot={false} className="gap-1.5">
        {items.map((item, index) => (
          <span key={item.label} className="contents">
            {index > 0 ? <span aria-hidden>/</span> : null}
            {item.path && index < items.length - 1 ? (
              <Link
                href={siteHref(site, locale, item.path)}
                className="text-inherit no-underline hover:underline"
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </span>
        ))}
      </Eyebrow>
    </nav>
  )
}

export { Breadcrumb }
