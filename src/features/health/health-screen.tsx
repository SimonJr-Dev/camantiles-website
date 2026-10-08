import {
  ArrowUpRight,
  ChartLine,
  Check,
  Heart,
  Pill,
  Stethoscope,
  Syringe,
  Users,
  type LucideIcon,
} from "lucide-react"

import { Carousel } from "@/components/blocks/carousel"
import { DataTable } from "@/components/blocks/data-table"
import { SectionHero } from "@/components/blocks/section-hero"
import { StaffCard } from "@/components/blocks/staff-card"
import { buttonVariants } from "@/components/ui/button"
import { Card, Panel } from "@/components/ui/card"
import { Overline } from "@/components/ui/eyebrow"
import { valueOrPending } from "@/components/ui/pending"
import { PhotoPlaceholder } from "@/components/ui/photo-placeholder"
import { SectionHeading } from "@/components/ui/section-heading"
import { IconTile, Tag } from "@/components/ui/tag"
import { getHealth, type HealthIcon } from "@/content"
import type { PageContext } from "@/lib/context"
import { formatDate } from "@/lib/dates"
import { cn } from "@/lib/utils"
import type { SectionTone } from "@/sites/modules"

const icons: Record<HealthIcon, LucideIcon> = {
  stethoscope: Stethoscope,
  heart: Heart,
  syringe: Syringe,
  users: Users,
  pill: Pill,
  chart: ChartLine,
}

const updateTones: Record<"advisory" | "program" | "event", SectionTone> = {
  advisory: "advisory",
  program: "health",
  event: "hall",
}

const overline = "text-health-foreground"

function telHref(number: string) {
  return `tel:${number.replace(/[^\d+]/g, "")}`
}

function EmergencyLine({
  label,
  number,
  primary,
}: {
  label: string
  number: string
  primary?: boolean
}) {
  const className = cn(
    "flex items-center justify-between gap-4 rounded-inner px-5 py-4 font-bold text-white no-underline",
    primary ? "bg-destructive" : "bg-white/8"
  )
  const content = (
    <>
      <span>{label}</span>
      <span>{number}</span>
    </>
  )
  // A placeholder number is shown but must not be a dialable link.
  return number.startsWith("[") ? (
    <div className={className}>{content}</div>
  ) : (
    <a href={telHref(number)} className={className}>
      {content}
    </a>
  )
}

async function HealthScreen({ ctx }: { ctx: PageContext }) {
  const { site, locale, dict } = ctx
  const t = dict.health
  const health = await getHealth(site)

  const hours = valueOrPending(health.clinic.hours?.[locale], dict.pending.hours)
  const hotline = (id: string) => site.hotlines.find((item) => item.id === id)?.number
  const emergency = valueOrPending(
    health.clinic.emergency ?? hotline("health"),
    dict.pending.number
  )
  const street = valueOrPending(site.contact.street?.[locale], dict.pending.street)
  const cityNumber = valueOrPending(hotline("city"), dict.pending.number)
  const clinicRows = [
    { label: t.weekdays, value: hours },
    { label: t.emergencyNumber, value: emergency },
    { label: t.location, value: [street, site.shortName].filter(Boolean).join(", ") },
  ].filter((row) => row.value)

  const kinds = { advisory: t.kindAdvisory, program: t.kindProgram, event: t.kindEvent }

  return (
    <>
      <SectionHero
        ctx={ctx}
        tone="health"
        crumb={dict.nav.health}
        titleLines={[health.hero.titleLine1[locale], health.hero.titleLine2[locale]]}
        lead={health.hero.lead?.[locale] ?? t.lead}
        photoSubject={t.center}
        actions={
          <>
            <a
              href="#schedule"
              className={cn(buttonVariants({ variant: "white" }), "text-health-foreground")}
            >
              {t.ctaSchedule}
              <ArrowUpRight aria-hidden strokeWidth={2.2} />
            </a>
            <a href="#services" className={buttonVariants({ variant: "on-dark" })}>
              {t.ctaServices}
            </a>
          </>
        }
        aside={
          <Panel tone="inverse" className="flex flex-col gap-3.5 p-[26px] text-white">
            <span className="text-xs font-extrabold tracking-widest text-accent uppercase">
              {t.clinicHours}
            </span>
            {clinicRows.map((row) => (
              <div key={row.label} className="flex justify-between gap-3 text-[15px]">
                <span className="text-inverse-foreground">{row.label}</span>
                <strong className="text-right">{row.value}</strong>
              </div>
            ))}
          </Panel>
        }
      />

      <section id="services" className="flex scroll-mt-28 flex-col gap-6 pt-11">
        <SectionHeading
          overline={t.servicesOverline}
          title={t.servicesTitle}
          overlineClassName={overline}
        />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5">
          {health.services.map((service) => {
            const Icon = icons[service.icon]
            return (
              <Card
                key={service.title.en}
                className="flex flex-col gap-3 p-[26px] transition-transform duration-200 hover:-translate-y-1"
              >
                <IconTile tone="health">
                  <Icon aria-hidden />
                </IconTile>
                <h3 className="text-xl font-bold">{service.title[locale]}</h3>
                <p className="text-[15px] leading-[1.55] text-muted-foreground">
                  {service.text[locale]}
                </p>
                <span className="self-start rounded-full bg-background px-3 py-1.5 text-[13px] font-bold text-subtle-foreground">
                  {service.tag[locale]}
                </span>
              </Card>
            )
          })}
        </div>
      </section>

      <section id="schedule" className="flex scroll-mt-28 flex-wrap gap-5 pt-11">
        <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-5">
          <SectionHeading
            overline={t.scheduleOverline}
            title={t.scheduleTitle}
            overlineClassName={overline}
            titleClassName="text-[clamp(1.75rem,3vw,2.25rem)]"
          />
          <DataTable
            caption={t.scheduleTitle}
            columns={[t.colDay, t.colService, t.colTime]}
            rows={health.schedule.map((row) => ({
              id: row.day.en,
              cells: [
                row.day[locale],
                row.service[locale],
                valueOrPending(row.time, dict.pending.time),
              ],
            }))}
          />
        </div>
        <aside className="flex flex-[1_1_320px] flex-col gap-5 pt-1">
          <div className="flex flex-col gap-3 rounded-[28px] bg-health p-7">
            <span className="text-xs font-extrabold tracking-widest text-health-foreground uppercase">
              {t.bringTitle}
            </span>
            <ul className="flex flex-col gap-3">
              {health.bring.map((item) => (
                <li
                  key={item.en}
                  className="flex items-center gap-3 rounded-[14px] bg-card px-3.5 py-3 text-[15px]"
                >
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-health-foreground text-white">
                    <Check aria-hidden className="size-[13px]" strokeWidth={3} />
                  </span>
                  {item[locale]}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      <section className="flex flex-col gap-6 pt-11">
        <SectionHeading
          overline={t.updatesOverline}
          title={t.updatesTitle}
          overlineClassName={overline}
        />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(270px,1fr))] gap-5">
          {health.updates.map((update) => {
            const date = valueOrPending(
              update.date && formatDate(update.date, locale),
              dict.pending.date
            )
            return (
              <article
                key={update.id}
                className="flex flex-col overflow-hidden rounded-card bg-card shadow-card"
              >
                <PhotoPlaceholder label={dict.pending.photo} className="h-[170px]" />
                <div className="flex flex-col gap-2.5 p-[22px]">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <Tag tone={updateTones[update.kind]}>{kinds[update.kind]}</Tag>
                    {date ? (
                      <span className="text-[13px] font-medium text-muted-foreground">{date}</span>
                    ) : null}
                  </div>
                  <h3 className="text-[19px] leading-[1.3] font-bold">{update.title[locale]}</h3>
                  <p className="text-sm leading-[1.55] text-muted-foreground">
                    {update.text[locale]}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      {health.team.length > 0 ? (
        <section className="flex flex-col gap-5 pt-11">
          <SectionHeading
            overline={t.teamOverline}
            title={t.teamTitle}
            overlineClassName={overline}
          />
          <Carousel
            arrowClassName="bg-health-foreground"
            labels={{ hint: t.teamHint, previous: t.teamPrevious, next: t.teamNext }}
          >
            {health.team.map((member) => (
              <StaffCard
                key={member.id}
                member={member}
                ctx={ctx}
                className="w-[244px] shrink-0 snap-start"
                photoClassName="h-[210px]"
                tagClassName="bg-health text-health-foreground"
              />
            ))}
          </Carousel>
        </section>
      ) : null}

      {emergency || cityNumber ? (
        <section className="pt-11 pb-2">
          <Panel
            tone="inverse"
            className="relative flex flex-wrap items-center justify-between gap-7 overflow-hidden p-7 text-white sm:p-10"
          >
            <div
              aria-hidden
              className="absolute -top-[140px] -left-[100px] box-content size-[340px] rounded-full border-[52px] border-destructive/14"
            />
            <div className="relative flex flex-[1_1_380px] flex-col gap-2.5">
              <Overline className="text-xs font-extrabold tracking-widest text-[#F97066]">
                {t.emergencyOverline}
              </Overline>
              <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.05] font-extrabold">
                {t.emergencyTitle}
              </h2>
              <p className="text-inverse-foreground">{t.emergencyBody}</p>
            </div>
            <div className="relative flex flex-[1_1_300px] flex-col gap-2.5">
              {emergency ? <EmergencyLine label={t.center} number={emergency} primary /> : null}
              {cityNumber ? <EmergencyLine label={t.cityLine} number={cityNumber} /> : null}
            </div>
          </Panel>
        </section>
      ) : null}
    </>
  )
}

export { HealthScreen }
