import Image from "next/image"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { format } from "@/i18n/format"
import type { PageContext } from "@/lib/context"
import { siteHref } from "@/lib/href"
import { ABOUT_PATH, MODULES, schoolPath } from "@/sites/modules"

import { LanguageSwitch } from "./language-switch"
import { MainNav, type NavItem } from "./main-nav"

function navItems({ site, locale, dict }: PageContext): NavItem[] {
  const href = (path: string) => siteHref(site, locale, path)

  return [
    { href: href("/"), label: dict.nav.home, exact: true },
    { href: href(ABOUT_PATH), label: format(dict.nav.about, { shortName: site.shortName }) },
    ...site.modules.map((module): NavItem => {
      const item = { href: href(MODULES[module].path), label: dict.nav[module] }
      if (module !== "schools" || site.schools.length === 0) return item
      return {
        ...item,
        children: [
          ...site.schools.map((school) => ({
            href: href(schoolPath(school.slug)),
            label: school.navLabel[locale],
            hint: school.level[locale],
          })),
          { href: item.href, label: dict.nav.allSchools, hint: dict.nav.allSchoolsHint },
        ],
      }
    }),
  ]
}

function SiteHeader({ ctx }: { ctx: PageContext }) {
  const { site, locale, dict } = ctx

  return (
    <header className="sticky top-0 z-20 bg-background/85 backdrop-blur-[14px]">
      <div className="site-container flex flex-wrap items-center justify-between gap-3.5 py-3.5">
        <Link
          href={siteHref(site, locale)}
          className="flex items-center gap-3 text-foreground no-underline"
        >
          <Image
            src={site.seal.src}
            alt={format(dict.header.sealAlt, { name: site.name })}
            width={54}
            height={54}
            priority
            className="size-[54px] shrink-0 rounded-full object-contain"
          />
          <span className="flex flex-col">
            <span className="text-[17px] leading-[1.15] font-extrabold tracking-[-0.02em]">
              {site.name}
            </span>
            <span className="text-xs font-medium text-muted-foreground">
              {site.city[locale]}, {site.province}
            </span>
          </span>
        </Link>

        <MainNav label={dict.nav.label} items={navItems(ctx)} />

        <div className="flex items-center gap-2.5">
          <LanguageSwitch
            label={dict.header.language}
            current={locale}
            options={site.locales.map((option) => ({
              locale: option,
              name: dict.languages[option],
            }))}
          />
          <a href="#contact" className={buttonVariants({ variant: "dark", size: "sm" })}>
            <span aria-hidden className="size-2 rounded-full bg-destructive" />
            {dict.header.hotlines}
          </a>
        </div>
      </div>
    </header>
  )
}

export { SiteHeader }
