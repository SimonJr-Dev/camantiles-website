import { ArrowUpRight } from "lucide-react"

import { DocumentRow } from "@/components/blocks/document-row"
import { SectionHero } from "@/components/blocks/section-hero"
import { StaffCard } from "@/components/blocks/staff-card"
import { buttonVariants } from "@/components/ui/button"
import { Card, Panel } from "@/components/ui/card"
import { pending, SHOW_PENDING, valueOrPending } from "@/components/ui/pending"
import { PhotoPlaceholder } from "@/components/ui/photo-placeholder"
import { SectionHeading } from "@/components/ui/section-heading"
import { getSk } from "@/content"
import type { PageContext } from "@/lib/context"
import { formatDate } from "@/lib/dates"

const overline = "text-sk-foreground"

async function SkScreen({ ctx }: { ctx: PageContext }) {
  const { site, locale, dict } = ctx
  const t = dict.sk
  const sk = await getSk(site)

  const documents = sk.documents.filter((item) => item.file || SHOW_PENDING)
  const showFacebook = sk.facebook || SHOW_PENDING

  return (
    <>
      <SectionHero
        ctx={ctx}
        tone="sk"
        crumb={dict.sections.sk}
        titleLines={[sk.hero.titleLine1[locale], sk.hero.titleLine2[locale]]}
        lead={sk.hero.lead?.[locale] ?? ""}
        photoSubject={t.photoSubject}
        actions={
          <>
            <a href="#join" className={buttonVariants({ variant: "accent" })}>
              {t.ctaVolunteer}
              <ArrowUpRight aria-hidden strokeWidth={2.2} />
            </a>
            <a href="#programs" className={buttonVariants({ variant: "on-dark" })}>
              {t.ctaPrograms}
            </a>
          </>
        }
        aside={
          <div className="flex items-center gap-4 rounded-panel bg-card p-6 shadow-[0_1px_2px_rgb(11_23_18/0.05)]">
            {/* Stand-in until the SK logo is supplied. */}
            <div
              aria-hidden
              className="flex size-16 shrink-0 items-center justify-center rounded-[20px] bg-sk-deep text-[10px] font-extrabold text-white"
            >
              {SHOW_PENDING ? t.logo : "SK"}
            </div>
            <div className="flex flex-col gap-0.5">
              <strong className="text-[17px]">{dict.sections.sk}</strong>
              {showFacebook ? (
                <span className="text-sm text-muted-foreground">
                  {dict.footer.facebook} ·{" "}
                  {sk.facebook ? (
                    <a href={sk.facebook.url} rel="noopener">
                      {sk.facebook.label}
                    </a>
                  ) : (
                    pending(dict.pending.skPage)
                  )}
                </span>
              ) : null}
            </div>
          </div>
        }
      />

      <section id="programs" className="flex scroll-mt-28 flex-col gap-6 pt-11">
        <SectionHeading
          overline={t.programsOverline}
          title={t.programsTitle}
          overlineClassName={overline}
        />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5">
          {sk.programs.map((program) => (
            <article
              key={program.id}
              className="flex flex-col gap-4 rounded-card bg-card px-3 pt-3 pb-6 shadow-card transition-transform duration-200 hover:-translate-y-1"
            >
              <PhotoPlaceholder label={t.programPhoto} className="h-[170px] rounded-inner" />
              <div className="flex flex-col gap-2 px-2.5">
                <span className="text-xs font-extrabold tracking-[0.08em] text-sk-foreground uppercase">
                  {program.label[locale]}
                </span>
                <h3 className="text-xl font-bold">{program.title[locale]}</h3>
                <p className="text-sm leading-[1.55] text-muted-foreground">
                  {program.text[locale]}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="flex flex-wrap gap-5 pt-11">
        <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-4">
          <h2 className="text-[32px] font-extrabold">{t.updatesTitle}</h2>
          {sk.updates.map((update) => {
            const date = valueOrPending(
              update.date && formatDate(update.date, locale),
              dict.pending.date
            )
            return (
              <article
                key={update.id}
                className="flex flex-col gap-1.5 rounded-card bg-card px-7 py-6 shadow-card"
              >
                {date ? (
                  <span className="text-[13px] font-medium text-muted-foreground">{date}</span>
                ) : null}
                <h3 className="text-[19px] font-bold">{update.title[locale]}</h3>
                <p className="text-sm leading-normal text-muted-foreground">{update.text[locale]}</p>
              </article>
            )
          })}
        </div>
        {documents.length > 0 ? (
          <Card className="flex flex-[1_1_320px] flex-col gap-3 self-start p-7">
            <h2 className="text-[22px] font-extrabold">{t.transparencyTitle}</h2>
            <p className="text-sm leading-normal text-muted-foreground">{t.transparencyBody}</p>
            {documents.map((item) => (
              <DocumentRow
                key={item.id}
                title={item.title[locale]}
                file={item.file}
                format={item.format}
                pendingLabel={dict.pending.file}
                badgeClassName="bg-sk-deep"
              />
            ))}
          </Card>
        ) : null}
      </section>

      {sk.council.length > 0 ? (
        <section className="flex flex-col gap-6 pt-11">
          <SectionHeading
            overline={t.councilOverline}
            title={t.councilTitle}
            overlineClassName={overline}
          />
          <div className="grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-5">
            {sk.council.map((member) => (
              <StaffCard key={member.id} member={member} ctx={ctx} />
            ))}
          </div>
        </section>
      ) : null}

      <section id="join" className="scroll-mt-28 pt-11 pb-2">
        <Panel
          tone="accent"
          className="flex flex-wrap items-center justify-between gap-6 p-7 sm:p-11"
        >
          <div className="flex flex-[1_1_420px] flex-col gap-2.5">
            <h2 className="text-[clamp(1.75rem,3.3vw,2.5rem)] leading-none font-extrabold">
              {t.joinTitle}
            </h2>
            <p className="text-[17px] text-accent-ink">{t.joinBody}</p>
          </div>
          <a href="#contact" className={buttonVariants({ variant: "dark" })}>
            {t.joinAction}
            <ArrowUpRight aria-hidden strokeWidth={2.2} />
          </a>
        </Panel>
      </section>
    </>
  )
}

export { SkScreen }
