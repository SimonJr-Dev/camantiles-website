import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"

import { EventRow } from "@/components/blocks/event-row"
import { NewsCard } from "@/components/blocks/news-card"
import { PersonCard } from "@/components/blocks/person-card"
import { SectionIcon } from "@/components/blocks/section-icon"
import { buttonVariants } from "@/components/ui/button"
import { Card, Panel } from "@/components/ui/card"
import { Eyebrow, Overline } from "@/components/ui/eyebrow"
import { ArrowBadge, ListRow } from "@/components/ui/list-row"
import { valueOrPending } from "@/components/ui/pending"
import { PhotoPlaceholder } from "@/components/ui/photo-placeholder"
import { SectionHeading } from "@/components/ui/section-heading"
import { IconTile, Tag } from "@/components/ui/tag"
import { getAdvisory, getAnnouncements, getEvents, getPeople, getServices } from "@/content"
import { format } from "@/i18n/format"
import type { PageContext } from "@/lib/context"
import { formatDate } from "@/lib/dates"
import { siteHref } from "@/lib/href"
import { cn } from "@/lib/utils"
import { MODULES } from "@/sites/modules"
import type { SiteModule } from "@/sites/types"

async function HomeScreen({ ctx }: { ctx: PageContext }) {
  const { site, locale, dict } = ctx
  const home = dict.home
  const copy = dict.site.home
  const hallHref = siteHref(site, locale, MODULES.hall.path)

  const [advisory, news, events, services, officials] = await Promise.all([
    getAdvisory(site),
    getAnnouncements(site, { limit: 4, exclude: "advisory" }),
    getEvents(site, { limit: 4 }),
    getServices(site),
    getPeople(site, "barangay", { limit: 5 }),
  ])

  const advisoryText = valueOrPending(advisory?.text[locale], dict.pending.advisory)
  const nextEvent = events[0]
  const quickCopy: Partial<Record<SiteModule, string>> = copy.quick

  return (
    <>
      {advisoryText ? (
        <Link
          href={hallHref}
          className="inline-flex flex-wrap items-center gap-3 self-start rounded-[28px] bg-card py-1.5 pr-[18px] pl-1.5 text-sm font-medium text-foreground no-underline shadow-[0_1px_2px_rgb(11_23_18/0.06)]"
        >
          <Tag tone="advisory" className="px-3 py-1.5">
            {home.advisory}
          </Tag>
          <span>{advisoryText}</span>
          <ArrowRight aria-hidden className="size-4" />
        </Link>
      ) : null}

      <div className="flex flex-wrap gap-5">
        <Panel className="relative flex min-h-[500px] flex-[2_1_560px] flex-col justify-between gap-12 overflow-hidden p-7 sm:p-12">
          <div
            aria-hidden
            className="absolute -right-[120px] -bottom-[160px] box-content size-[420px] rounded-full border-[64px] border-accent/12"
          />
          <Eyebrow className="relative text-[#E6EFEA]">
            {home.official} · {site.city[locale]}
          </Eyebrow>
          <div className="relative flex flex-col gap-5">
            <h1 className="text-display">
              {copy.heroLine1}
              <br />
              {copy.heroLine2}
            </h1>
            <p className="max-w-[500px] text-lg leading-[1.6] text-primary-soft-foreground">
              {copy.lead}
            </p>
          </div>
          <div className="relative flex flex-wrap gap-3">
            <Link href={hallHref} className={buttonVariants({ variant: "accent" })}>
              {home.ctaAnnouncements}
              <ArrowUpRight aria-hidden strokeWidth={2.2} />
            </Link>
            <a href="#services" className={buttonVariants({ variant: "on-dark" })}>
              {home.ctaServices}
            </a>
          </div>
        </Panel>

        <div className="flex flex-[1_1_340px] flex-col gap-5">
          <PhotoPlaceholder
            label={format(dict.pending.photoOf, { subject: dict.sections.hall })}
            className="min-h-[220px] flex-[1_1_220px] rounded-panel"
          />
          {nextEvent ? (
            <Panel tone="accent" className="flex flex-col gap-3.5 p-7">
              <span className="text-xs font-extrabold tracking-widest uppercase">
                {home.nextEvent}
              </span>
              <div className="text-[28px] leading-[1.1] font-extrabold tracking-[-0.03em]">
                {nextEvent.title[locale]}
              </div>
              <div className="flex items-center justify-between gap-3 text-sm font-semibold">
                <span>
                  {[
                    valueOrPending(
                      nextEvent.date && formatDate(nextEvent.date, locale),
                      dict.pending.date
                    ),
                    valueOrPending(nextEvent.time, dict.pending.time),
                    nextEvent.location?.[locale],
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </span>
                <Link
                  href={hallHref}
                  aria-label={home.viewEvent}
                  className={buttonVariants({ variant: "dark", size: "icon" })}
                >
                  <ArrowUpRight aria-hidden strokeWidth={2.2} />
                </Link>
              </div>
            </Panel>
          ) : null}
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-5">
        {site.homeQuickLinks.map((module) => (
          <Link
            key={module}
            href={siteHref(site, locale, MODULES[module].path)}
            className="text-foreground no-underline transition-transform duration-200 hover:-translate-y-1"
          >
            <Card className="flex h-full flex-col justify-between gap-12 p-6">
              <div className="flex items-start justify-between">
                <IconTile tone={MODULES[module].tone}>
                  <SectionIcon module={module} />
                </IconTile>
                <ArrowBadge />
              </div>
              <div className="flex flex-col gap-1.5">
                <strong className="text-[21px] tracking-[-0.02em]">
                  {module === "schools" ? copy.schoolsTitle : dict.sections[module]}
                </strong>
                <span className="text-sm leading-normal text-muted-foreground">
                  {quickCopy[module]}
                </span>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <section className="flex flex-col gap-6 pt-12">
        <SectionHeading
          overline={home.newsOverline}
          title={home.newsTitle}
          action={
            <Link href={hallHref} className={buttonVariants({ variant: "white" })}>
              {home.allAnnouncements}
            </Link>
          }
        />
        <div className="flex flex-wrap gap-5">
          <div className="grid min-w-0 flex-[999_1_600px] grid-cols-[repeat(auto-fit,minmax(270px,1fr))] gap-5">
            {news.map((item) => (
              <NewsCard key={item.slug} item={item} ctx={ctx} />
            ))}
          </div>
          <Card
            className={cn(
              "flex flex-[1_1_320px] flex-col gap-[18px] self-start p-7",
              events.length === 0 && "hidden"
            )}
          >
            <h2 className="text-2xl font-extrabold">{home.eventsTitle}</h2>
            {events.map((item) => (
              <EventRow key={item.slug} item={item} ctx={ctx} />
            ))}
            <Link href={hallHref} className={cn(buttonVariants(), "mt-1")}>
              {home.openCalendar}
            </Link>
          </Card>
        </div>
      </section>

      <section id="services" className="scroll-mt-28 pt-12">
        <Card className="flex flex-wrap gap-10 p-7 sm:p-10">
          <div className="flex flex-[1_1_300px] flex-col gap-3">
            <Overline>{home.servicesOverline}</Overline>
            <h2 className="text-[clamp(1.75rem,3.3vw,2.5rem)] leading-[1.02] font-extrabold">{home.servicesTitle}</h2>
            <p className="leading-[1.6] text-muted-foreground">{home.servicesBody}</p>
          </div>
          <div className="grid flex-[2_1_460px] grid-cols-[repeat(auto-fit,minmax(230px,1fr))] content-start gap-3">
            {services.map((service) => (
              <ListRow key={service.slug} href={hallHref}>
                {service.name[locale]}
              </ListRow>
            ))}
          </div>
        </Card>
      </section>

      <section className="flex flex-col gap-6 pt-12 pb-8">
        <SectionHeading
          overline={home.officialsOverline}
          title={home.officialsTitle}
          action={
            <Link href={`${hallHref}#council`} className={buttonVariants({ variant: "white" })}>
              {home.directory}
            </Link>
          }
        />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-5">
          {officials.map((person) => (
            <PersonCard key={person.id} person={person} ctx={ctx} />
          ))}
        </div>
      </section>
    </>
  )
}

export { HomeScreen }
