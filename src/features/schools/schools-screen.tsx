import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { Breadcrumb } from "@/components/blocks/breadcrumb"
import { buttonVariants } from "@/components/ui/button"
import { Card, Panel } from "@/components/ui/card"
import { SHOW_PENDING } from "@/components/ui/pending"
import { PhotoPlaceholder } from "@/components/ui/photo-placeholder"
import { getSchools, getSchoolsIndex } from "@/content"
import { format } from "@/i18n/format"
import type { PageContext } from "@/lib/context"
import { siteHref } from "@/lib/href"
import { MODULES, schoolPath } from "@/sites/modules"

async function SchoolsScreen({ ctx }: { ctx: PageContext }) {
  const { site, locale, dict } = ctx
  const t = dict.schools
  const [index, schools] = await Promise.all([getSchoolsIndex(site), getSchools(site)])
  const names = new Map(site.schools.map((ref) => [ref.slug, ref.name[locale]]))

  return (
    <>
      <Panel className="relative flex flex-col gap-[18px] overflow-hidden bg-schools-deep p-7 text-white sm:p-12">
        <div
          aria-hidden
          className="absolute -top-[140px] -right-[100px] box-content size-[380px] rounded-full border-[56px] border-accent/14"
        />
        <Breadcrumb
          ctx={ctx}
          trail={[{ label: dict.nav.schools }]}
          className="relative [&>span]:bg-white/12"
        />
        <h1 className="relative text-[clamp(2.25rem,5.3vw,4rem)] leading-[0.98] font-extrabold tracking-[-0.045em]">
          {index.titleLine1[locale]}
          <br />
          {index.titleLine2[locale]}
        </h1>
        <p className="relative max-w-[620px] text-lg leading-[1.6] text-white/80">
          {index.lead[locale]}
        </p>
      </Panel>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5 pt-3">
        {schools.map((school) => (
          <Link
            key={school.slug}
            href={siteHref(site, locale, schoolPath(school.slug))}
            prefetch
            className="text-foreground no-underline transition-transform duration-200 hover:-translate-y-1"
          >
            <Card className="flex h-full flex-col gap-5 px-3 pt-3 pb-7">
              <PhotoPlaceholder
                label={format(dict.pending.photoOf, { subject: school.short[locale] })}
                className="h-[230px] rounded-inner"
              />
              <div className="flex grow flex-col gap-2.5 px-3">
                <span className="text-xs font-extrabold tracking-[0.08em] text-schools-foreground uppercase">
                  {school.level[locale]}
                </span>
                <h2 className="text-[26px] leading-[1.1] font-extrabold">
                  {names.get(school.slug)}
                </h2>
                <p className="text-[15px] leading-[1.55] text-muted-foreground">
                  {school.summary[locale]}
                </p>
                <div className="mt-auto flex items-center justify-between gap-3 pt-2">
                  {SHOW_PENDING ? (
                    <span className="rounded-full bg-accent-soft px-3 py-1.5 text-[13px] font-bold text-accent-soft-foreground">
                      {t.enrollmentPending}
                    </span>
                  ) : (
                    <span />
                  )}
                  <span
                    aria-hidden
                    className="flex size-11 shrink-0 items-center justify-center rounded-full bg-schools-deep text-white"
                  >
                    <ArrowUpRight className="size-[18px]" strokeWidth={2.2} />
                  </span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <section className="pt-11 pb-2">
        <Panel
          tone="accent"
          className="flex flex-wrap items-center justify-between gap-6 p-7 sm:p-11"
        >
          <div className="flex flex-[1_1_420px] flex-col gap-2.5">
            <h2 className="text-[clamp(1.75rem,3.2vw,2.375rem)] leading-[1.05] font-extrabold">
              {t.suspensionTitle}
            </h2>
            <p className="text-[17px] text-accent-ink">{t.suspensionBody}</p>
          </div>
          <Link
            href={siteHref(site, locale, MODULES.hall.path)}
            className={buttonVariants({ variant: "dark" })}
          >
            {t.suspensionAction}
          </Link>
        </Panel>
      </section>
    </>
  )
}

export { SchoolsScreen }
