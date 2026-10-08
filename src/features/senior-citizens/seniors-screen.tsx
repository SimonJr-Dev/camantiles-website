import { Activity, Check, HeartPulse, Pill, type LucideIcon } from "lucide-react"

import { DataTable } from "@/components/blocks/data-table"
import { SectionHero } from "@/components/blocks/section-hero"
import { buttonVariants } from "@/components/ui/button"
import { Card, Panel } from "@/components/ui/card"
import { SHOW_PENDING, valueOrPending } from "@/components/ui/pending"
import { PhotoPlaceholder } from "@/components/ui/photo-placeholder"
import { SectionHeading } from "@/components/ui/section-heading"
import { IconTile } from "@/components/ui/tag"
import { getSeniors, type SeniorsIcon } from "@/content"
import { format } from "@/i18n/format"
import type { PageContext } from "@/lib/context"
import { formatDate } from "@/lib/dates"

const icons: Record<SeniorsIcon, LucideIcon> = {
  pulse: HeartPulse,
  pill: Pill,
  activity: Activity,
}

// Text on this page is set larger than elsewhere, for older readers.
const overline = "text-sm text-seniors-foreground"

async function SeniorsScreen({ ctx }: { ctx: PageContext }) {
  const { site, locale, dict } = ctx
  const t = dict.seniors
  const seniors = await getSeniors(site)
  const { president } = seniors

  const presidentName = valueOrPending(president.name, dict.pending.name)
  const presidentPhone = valueOrPending(president.phone, dict.pending.contactNumber)

  return (
    <>
      <SectionHero
        ctx={ctx}
        tone="seniors"
        crumb={dict.sections.seniors}
        titleLines={[seniors.hero.titleLine1[locale], seniors.hero.titleLine2[locale]]}
        lead={seniors.hero.lead?.[locale] ?? ""}
        leadClassName="text-xl leading-[1.6]"
        large
        photoSubject={t.photoSubject}
        actions={
          <>
            <a href="#payout" className={buttonVariants({ variant: "accent", size: "lg" })}>
              {t.ctaPayout}
            </a>
            <a href="#register" className={buttonVariants({ variant: "on-dark", size: "lg" })}>
              {t.ctaRegister}
            </a>
          </>
        }
        aside={
          presidentName || presidentPhone ? (
            <div className="flex flex-col gap-1.5 rounded-panel bg-card p-7 shadow-[0_1px_2px_rgb(11_23_18/0.05)]">
              <span className="text-[13px] font-extrabold tracking-[0.08em] text-seniors-foreground uppercase">
                {t.president}
              </span>
              {presidentName ? <strong className="text-[22px]">{presidentName}</strong> : null}
              {presidentPhone ? (
                president.phone ? (
                  <a
                    href={`tel:${president.phone.replace(/[^\d+]/g, "")}`}
                    className="text-[17px]"
                  >
                    {presidentPhone}
                  </a>
                ) : (
                  <span className="text-[17px] text-muted-foreground">{presidentPhone}</span>
                )
              ) : null}
            </div>
          ) : null
        }
      />

      <section id="payout" className="flex scroll-mt-28 flex-col gap-6 pt-11">
        <SectionHeading
          overline={t.benefitsOverline}
          title={t.benefitsTitle}
          description={t.benefitsBody}
          overlineClassName={overline}
        />
        <DataTable
          size="large"
          caption={t.benefitsTitle}
          columns={[t.colBenefit, t.colDate, t.colTime, t.colVenue]}
          rows={seniors.payouts.map((row) => ({
            id: row.id,
            cells: [
              row.benefit[locale],
              valueOrPending(row.date && formatDate(row.date, locale), dict.pending.date),
              valueOrPending(row.time, dict.pending.time),
              valueOrPending(row.venue?.[locale], dict.pending.venue),
            ],
          }))}
        />
      </section>

      <section className="flex flex-col gap-6 pt-11">
        <SectionHeading
          overline={t.healthOverline}
          title={t.healthTitle}
          overlineClassName={overline}
        />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(270px,1fr))] gap-5">
          {seniors.health.map((item) => {
            const Icon = icons[item.icon]
            // The design's placeholder here is a whole phrase, shown as-is while developing.
            const schedule =
              item.schedule?.[locale] ?? (SHOW_PENDING ? dict.pending.everyDayTime : null)
            return (
              <Card key={item.title.en} className="flex flex-col gap-3.5 p-[30px]">
                <IconTile tone="seniors" className="size-14 rounded-inner">
                  <Icon aria-hidden />
                </IconTile>
                <h3 className="text-[23px] font-bold">{item.title[locale]}</h3>
                <p className="text-lg leading-[1.55] text-prose">{item.text[locale]}</p>
                {schedule ? (
                  <span className="self-start rounded-full bg-seniors px-3.5 py-2 font-bold text-seniors-deep">
                    {schedule}
                  </span>
                ) : null}
              </Card>
            )
          })}
        </div>
      </section>

      <section className="flex flex-wrap gap-5 pt-11">
        <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-5">
          <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] font-extrabold">{t.activitiesTitle}</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
            {seniors.activities.map((subject) => (
              <PhotoPlaceholder
                key={subject.en}
                label={format(dict.pending.photoOf, { subject: subject[locale] })}
                className="h-[200px] rounded-card"
              />
            ))}
          </div>
        </div>
        <Card id="register" className="flex flex-[1_1_340px] scroll-mt-28 flex-col gap-4 self-start p-8">
          <h2 className="text-[28px] font-extrabold">{t.registerTitle}</h2>
          <p className="text-lg leading-normal text-prose">{t.registerBody}</p>
          <ul className="flex flex-col gap-4">
            {seniors.requirements.map((item) => (
              <li
                key={item.en}
                className="flex items-center gap-3.5 rounded-2xl bg-seniors/40 px-3.5 py-3 text-lg"
              >
                <span className="flex size-[30px] shrink-0 items-center justify-center rounded-full bg-seniors-deep text-white">
                  <Check aria-hidden className="size-4" strokeWidth={3} />
                </span>
                {item[locale]}
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <section className="pt-11 pb-2">
        <Panel
          tone="accent"
          className="flex flex-wrap items-center justify-between gap-6 p-7 sm:p-11"
        >
          <div className="flex flex-[1_1_420px] flex-col gap-2.5">
            <h2 className="text-[clamp(1.75rem,3.2vw,2.375rem)] leading-[1.05] font-extrabold">
              {t.familyTitle}
            </h2>
            <p className="text-lg text-accent-ink">{t.familyBody}</p>
          </div>
          <a href="#payout" className={buttonVariants({ variant: "dark", size: "lg" })}>
            {t.familyAction}
          </a>
        </Panel>
      </section>
    </>
  )
}

export { SeniorsScreen }
