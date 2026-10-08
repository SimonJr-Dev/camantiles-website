import Link from "next/link"

import { Breadcrumb } from "@/components/blocks/breadcrumb"
import { DocumentRow } from "@/components/blocks/document-row"
import { buttonVariants } from "@/components/ui/button"
import { Card, Panel } from "@/components/ui/card"
import { Eyebrow } from "@/components/ui/eyebrow"
import { pending, SHOW_PENDING, valueOrPending } from "@/components/ui/pending"
import { PhotoPlaceholder } from "@/components/ui/photo-placeholder"
import { getAnnouncements, getDownloads, getPeople } from "@/content"
import type { PageContext } from "@/lib/context"
import { formatDate } from "@/lib/dates"
import { siteHref } from "@/lib/href"
import { announcementPath, type SectionTone } from "@/sites/modules"

import { AnnouncementList, type AnnouncementRow } from "./announcement-list"

/** Order of the filter chips; only categories that have announcements are shown. */
const FILTER_ORDER: SectionTone[] = ["hall", "advisory", "sk", "seniors", "schools", "health"]

function HeroFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 rounded-[20px] bg-white/8 px-5 py-4">
      <span className="text-xs font-semibold text-primary-soft-foreground uppercase">{label}</span>
      <strong className="text-[15px]">{value}</strong>
    </div>
  )
}

async function HallScreen({ ctx }: { ctx: PageContext }) {
  const { site, locale, dict } = ctx
  const hall = dict.hall

  const [announcements, council, downloads] = await Promise.all([
    getAnnouncements(site),
    getPeople(site, "barangay"),
    getDownloads(site),
  ])

  const featured = announcements.find((item) => item.pinned)
  const rest = announcements.filter((item) => item !== featured)
  const href = (slug: string) => siteHref(site, locale, announcementPath(slug))

  const rows: AnnouncementRow[] = rest.map((item) => ({
    slug: item.slug,
    href: href(item.slug),
    category: item.category,
    tag: dict.tags[item.category],
    date: valueOrPending(item.date && formatDate(item.date, locale), dict.pending.date),
    title: item.title[locale],
    summary: item.summary[locale],
  }))
  const filters = FILTER_ORDER.filter((category) =>
    rest.some((item) => item.category === category)
  ).map((category) => ({ category, label: dict.tags[category] }))

  const hours = valueOrPending(site.contact.hours?.[locale], dict.pending.weekdayHours)
  const phone = valueOrPending(
    site.hotlines.find((item) => item.id === "hall")?.number,
    dict.pending.hallNumber
  )
  const files = downloads.filter((item) => item.file || SHOW_PENDING)

  return (
    <>
      <Panel className="relative flex flex-wrap items-end justify-between gap-8 overflow-hidden p-7 sm:p-12">
        <div
          aria-hidden
          className="absolute -top-[140px] -right-[100px] box-content size-[380px] rounded-full border-[56px] border-accent/12"
        />
        <div className="relative flex flex-[1_1_480px] flex-col gap-[18px]">
          <Breadcrumb
            ctx={ctx}
            trail={[{ label: dict.sections.hall }]}
            className="text-[#E6EFEA]"
          />
          <h1 className="text-[clamp(2.25rem,5vw,3.75rem)] leading-[0.98] font-extrabold tracking-[-0.045em]">
            {dict.sections.hall}
          </h1>
          <p className="max-w-[560px] text-[17px] leading-[1.6] text-primary-soft-foreground">
            {hall.lead}
          </p>
        </div>
        {hours || phone ? (
          <div className="relative flex flex-wrap gap-3">
            {hours ? <HeroFact label={hall.officeHours} value={hours} /> : null}
            {phone ? <HeroFact label={hall.call} value={phone} /> : null}
          </div>
        ) : null}
      </Panel>

      <div className="flex flex-wrap gap-5 pt-3">
        <div className="flex min-w-0 flex-[999_1_600px] flex-col gap-[18px]">
          {featured ? (
            <article className="flex flex-wrap overflow-hidden rounded-card bg-card shadow-card">
              <PhotoPlaceholder
                label={dict.pending.featuredPhoto}
                className="min-h-[260px] flex-[1_1_280px]"
              />
              <div className="flex flex-[1_1_320px] flex-col justify-center gap-3.5 p-8">
                <Eyebrow
                  dot={false}
                  className="bg-accent-soft text-xs font-bold text-accent-soft-foreground"
                >
                  {hall.pinned}
                </Eyebrow>
                <h2 className="text-[30px] leading-[1.05] font-extrabold">
                  {featured.title[locale]}
                </h2>
                <p className="text-[15px] leading-[1.6] text-muted-foreground">
                  {featured.date
                    ? `${formatDate(featured.date, locale)}. `
                    : SHOW_PENDING
                      ? `${pending(dict.pending.dateTimeVenue)}. `
                      : null}
                  {(featured.body ?? featured.summary)[locale]}
                </p>
                <Link
                  href={href(featured.slug)}
                  prefetch
                  className={buttonVariants({ className: "self-start" })}
                >
                  {hall.readAnnouncement}
                </Link>
              </div>
            </article>
          ) : null}

          {announcements.length === 0 ? (
            <Card className="p-8 text-muted-foreground">{hall.empty}</Card>
          ) : null}

          {rows.length > 0 ? (
            <AnnouncementList
              rows={rows}
              filters={filters}
              labels={{
                group: hall.filterLabel,
                all: hall.filterAll,
                readMore: hall.readMore,
                photo: dict.pending.photo,
                none: hall.noneInCategory,
              }}
            />
          ) : null}
        </div>

        <aside className="flex flex-[1_1_320px] flex-col gap-5">
          {council.length > 0 ? (
            <Card id="council" className="flex scroll-mt-28 flex-col gap-4 p-7">
              <h2 className="text-[22px] font-extrabold">{hall.council}</h2>
              {council.map((person) => {
                const name = valueOrPending(person.name, dict.pending.name)
                return (
                  <div key={person.id} className="flex items-center gap-3.5">
                    <PhotoPlaceholder
                      label={dict.pending.photo}
                      className="size-12 shrink-0 rounded-2xl p-0 text-[9px]"
                    />
                    <div>
                      {name ? <div className="text-[15px] font-bold">{name}</div> : null}
                      <div className="text-[13px] text-muted-foreground">{person.role[locale]}</div>
                    </div>
                  </div>
                )
              })}
            </Card>
          ) : null}

          {files.length > 0 ? (
            <Card className="flex flex-col gap-3 p-7">
              <h2 className="text-[22px] font-extrabold">{hall.forms}</h2>
              {files.map((item) => (
                <DocumentRow
                  key={item.slug}
                  title={item.title[locale]}
                  file={item.file}
                  format={item.format}
                  pendingLabel={dict.pending.file}
                />
              ))}
            </Card>
          ) : null}
        </aside>
      </div>
    </>
  )
}

export { HallScreen }
