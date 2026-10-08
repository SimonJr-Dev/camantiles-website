import Image from "next/image"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { format } from "@/i18n/format"
import type { PageContext } from "@/lib/context"
import { siteHref } from "@/lib/href"
import { cn } from "@/lib/utils"
import { ABOUT_PATH, MODULES, schoolPath } from "@/sites/modules"

import { LanguageSwitch } from "./language-switch"
import { MainNav, type NavItem } from "./main-nav"
import { MobileNav } from "./mobile-nav"

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
  const items = navItems(ctx)

  return (
    <header className="sticky top-0 z-20 bg-background/85 backdrop-blur-[14px]">
      <div className="site-container flex items-center justify-between gap-2.5 py-3.5 sm:gap-3.5">
        <Link
          href={siteHref(site, locale)}
          className="flex min-w-0 items-center gap-2.5 text-foreground no-underline sm:gap-3"
        >
          <Image
            src={site.seal.src}
            alt={format(dict.header.sealAlt, { name: site.name })}
            width={54}
            height={54}
            priority
            className="size-[46px] shrink-0 rounded-full object-contain sm:size-[54px]"
          />
          <span className="flex min-w-0 flex-col">
            <span className="truncate text-[15px] leading-[1.15] font-extrabold tracking-[-0.02em] sm:text-[17px]">
              {site.name}
            </span>
            <span className="truncate text-xs font-medium text-muted-foreground">
              {site.city[locale]}, {site.province}
            </span>
          </span>
        </Link>

        {/* The nav pill needs about 1280px; narrower screens get the menu button instead. */}
        <MainNav
          label={dict.nav.label}
          items={items}
          submenuLabel={dict.nav.submenu}
          className="hidden xl:flex"
        />

        <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
          <LanguageSwitch
            label={dict.header.language}
            current={locale}
            options={site.locales.map((option) => ({
              locale: option,
              name: dict.languages[option],
            }))}
          />
          <a
            href="#contact"
            className={cn(buttonVariants({ variant: "dark", size: "sm" }), "hidden xl:inline-flex")}
          >
            <span aria-hidden className="size-2 rounded-full bg-destructive" />
            {dict.header.hotlines}
          </a>
          <div className="xl:hidden">
            <MobileNav
              items={items}
              labels={{
                open: dict.header.openMenu,
                close: dict.header.closeMenu,
                nav: dict.nav.menu,
              }}
              hotlines={{ label: dict.header.hotlines, href: "#contact" }}
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export { SiteHeader }
