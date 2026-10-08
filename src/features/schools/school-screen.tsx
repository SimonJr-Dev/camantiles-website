import { Check, HandHeart, PartyPopper, Trophy, Users, type LucideIcon } from "lucide-react"

import { Breadcrumb } from "@/components/blocks/breadcrumb"
import { Carousel } from "@/components/blocks/carousel"
import { StaffCard } from "@/components/blocks/staff-card"
import { buttonVariants } from "@/components/ui/button"
import { Card, Panel } from "@/components/ui/card"
import { ListRow } from "@/components/ui/list-row"
import { pending, SHOW_PENDING, valueOrPending } from "@/components/ui/pending"
import { PhotoPlaceholder } from "@/components/ui/photo-placeholder"
import type { SchoolContent } from "@/content"
import { format } from "@/i18n/format"
import type { PageContext } from "@/lib/context"
import { formatDate } from "@/lib/dates"
import { siteHref } from "@/lib/href"
import { cn } from "@/lib/utils"
import { MODULES, schoolPath } from "@/sites/modules"
import type { SchoolRef } from "@/sites/types"

import { AlumniGallery } from "./alumni-gallery"
import { ClassSections, type GradeGroup } from "./class-sections"

const h2 = "text-[28px] font-extrabold"

async function SchoolScreen({
  ctx,
  school,
  content,
}: {
  ctx: PageContext
  school: SchoolRef
  content: SchoolContent
}) {
  const { site, locale, dict } = ctx
  const t = dict.school
  const name = school.name[locale]
  const photoOf = (subject: string) => format(dict.pending.photoOf, { subject })
  const { head, alumni } = content

  const grades: GradeGroup[] = (content.grades ?? []).map((grade) => ({
    key: grade.name.en,
    name: grade.name[locale],
    sections: grade.sections.map((section) => {
      const adviser = valueOrPending(section.adviser, dict.pending.name)
      return {
        id: section.id,
        label: section.label[locale],
        adviser: adviser ? format(t.adviser, { name: adviser }) : null,
      }
    }),
  }))
  const sectionCount = grades.reduce((total, grade) => total + grade.sections.length, 0)

  const acts: { icon: LucideIcon; title: string; text: string }[] = [
    { icon: PartyPopper, title: t.actHomecomingTitle, text: t.actHomecomingText },
    { icon: Users, title: t.actReunionsTitle, text: t.actReunionsText },
    { icon: Trophy, title: t.actSportsTitle, text: t.actSportsText },
    { icon: HandHeart, title: t.actGivingTitle, text: t.actGivingText },
  ]

  const homecoming = alumni?.homecoming
  const homecomingWhen = homecoming
    ? [
        valueOrPending(
          homecoming.date && formatDate(homecoming.date, locale),
          dict.pending.date
        ),
        valueOrPending(homecoming.venue?.[locale], dict.pending.venue),
      ]
        .filter(Boolean)
        .join(" · ")
    : ""
  // The design's placeholder for these two is a whole phrase, shown as-is while developing.
  const homecomingDetails =
    homecoming?.hostBatch || homecoming?.theme
      ? [homecoming.hostBatch, homecoming.theme?.[locale]].filter(Boolean).join(" · ")
      : SHOW_PENDING
        ? t.homecomingDetailsPending
        : null

  const contactLine = [
    valueOrPending(head.phone, dict.pending.contactNumber),
    valueOrPending(head.email, t.emailPending),
  ]
    .filter(Boolean)
    .join(" · ")
  const address = [valueOrPending(head.address?.[locale], t.addressPending), site.shortName]
    .filter(Boolean)
    .join(", ")
  const headName = valueOrPending(head.name, dict.pending.name)
  const about =
    content.about?.[locale] ?? (SHOW_PENDING ? pending(format(t.aboutPending, { school: name })) : null)
  const others = site.schools.filter((item) => item.slug !== school.slug)

  return (
    <>
      <Panel className="relative flex flex-wrap gap-4 overflow-hidden bg-schools-deep p-4 text-white">
        <div
          aria-hidden
          className="absolute -bottom-[180px] -left-[120px] box-content size-[400px] rounded-full border-[60px] border-accent/12"
        />
        <div className="relative flex flex-[1_1_524px] flex-col justify-between gap-8 p-4 sm:p-8">
          <Breadcrumb
            ctx={ctx}
            trail={[
              { label: dict.nav.schools, path: MODULES.schools.path },
              { label: content.short[locale] },
            ]}
            className="[&>span]:bg-white/12"
          />
          <div className="flex flex-col gap-4">
            <span className="text-[13px] font-extrabold tracking-widest text-accent uppercase">
              {content.level[locale]}
            </span>
            <h1 className="text-[clamp(2.25rem,4.8vw,3.625rem)] leading-[0.98] font-extrabold tracking-[-0.045em]">
              {name}
            </h1>
            <p className="max-w-[520px] text-lg leading-[1.6] text-white/80">
              {content.tagline[locale]}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="#enroll" className={buttonVariants({ variant: "accent" })}>
              {content.enrollTitle[locale]}
            </a>
            <a href="#contact-school" className={buttonVariants({ variant: "on-dark" })}>
              {t.contact}
            </a>
          </div>
        </div>
        <PhotoPlaceholder
          label={photoOf(content.short[locale])}
          className="relative min-h-[220px] flex-[1_1_380px] rounded-card sm:min-h-[380px]"
        />
      </Panel>

      <ul className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-5">
        {content.facts.map((fact) => {
          const value = valueOrPending(fact.value?.[locale], fact.pending[locale])
          return value ? (
            <li
              key={fact.label.en}
              className="flex flex-col gap-1 rounded-card bg-card px-6 py-[22px] shadow-card"
            >
              <span className="text-xs font-bold tracking-[0.08em] text-muted-foreground uppercase">
                {fact.label[locale]}
              </span>
              <strong className="text-[19px]">{value}</strong>
            </li>
          ) : null
        })}
      </ul>

      <div className="flex flex-wrap gap-5 pt-7">
        <div className="flex min-w-0 flex-[999_1_600px] flex-col gap-5">
          <Card className="flex flex-col gap-3.5 p-8">
            <h2 className={h2}>{t.about}</h2>
            {about ? <p className="leading-[1.7] text-prose">{about}</p> : null}
            <ul className="flex flex-wrap gap-2 pt-1">
              {content.levels.map((level) => (
                <li
                  key={level.en}
                  className="rounded-full bg-schools px-3.5 py-2 text-sm font-bold text-schools-foreground"
                >
                  {level[locale]}
                </li>
              ))}
            </ul>
          </Card>

          <h2 className={cn(h2, "pt-3")}>{t.announcements}</h2>
          {content.news.map((item) => {
            const date = valueOrPending(
              item.date && formatDate(item.date, locale),
              dict.pending.date
            )
            return (
              <article
                key={item.id}
                className="flex flex-col gap-1.5 rounded-card bg-card px-7 py-6 shadow-card"
              >
                {date ? (
                  <span className="text-[13px] font-medium text-muted-foreground">{date}</span>
                ) : null}
                <h3 className="text-[19px] font-bold">{item.title[locale]}</h3>
                <p className="text-sm leading-normal text-muted-foreground">{item.text[locale]}</p>
              </article>
            )
          })}

          {content.faculty.length > 0 ? (
            <>
              <div id="faculty" className="flex scroll-mt-28 flex-col gap-1.5 pt-3">
                <h2 className={h2}>{t.faculty}</h2>
                <p className="text-[15px] text-muted-foreground">{content.facultyLead[locale]}</p>
              </div>
              <Carousel
                arrowClassName="bg-schools-deep"
                labels={{
                  hint: t.facultyHint,
                  previous: t.facultyPrevious,
                  next: t.facultyNext,
                }}
              >
                {content.faculty.map((member) => (
                  <StaffCard
                    key={member.id}
                    member={member}
                    ctx={ctx}
                    className="w-[244px] shrink-0 snap-start"
                    photoClassName="h-[210px]"
                    tagClassName="bg-schools text-schools-foreground"
                  />
                ))}
              </Carousel>
            </>
          ) : null}

          {grades.length > 0 ? (
            <>
              <div
                id="sections"
                className="flex scroll-mt-28 flex-wrap items-end justify-between gap-3 pt-3"
              >
                <div className="flex flex-col gap-1.5">
                  <h2 className={h2}>{t.sections}</h2>
                  <p className="text-[15px] text-muted-foreground">{t.sectionsLead}</p>
                </div>
                <span className="rounded-full bg-schools-deep px-3.5 py-2 text-[13px] font-bold text-white">
                  {format(t.totalSections, { count: sectionCount })}
                </span>
              </div>
              <ClassSections
                grades={grades}
                labels={{
                  filter: t.sectionsFilter,
                  all: t.allGrades,
                  hint: t.sectionsHint,
                  previous: t.sectionsPrevious,
                  next: t.sectionsNext,
                  classPhoto: t.classPhoto,
                  photo: dict.pending.photo,
                }}
              />
            </>
          ) : null}

          {alumni ? (
            <section id="alumni" className="flex scroll-mt-28 flex-col gap-4 pt-3">
              <div className="relative flex flex-col gap-[22px] overflow-hidden rounded-[28px] bg-inverse p-8 text-white">
                <div
                  aria-hidden
                  className="absolute -top-[120px] -right-[90px] box-content size-[320px] rounded-full border-[48px] border-accent/14"
                />
                <div className="relative flex flex-col gap-2.5">
                  <span className="text-xs font-extrabold tracking-[0.12em] text-accent uppercase">
                    {t.alumniOverline}
                  </span>
                  <h2 className="text-[34px] leading-[1.05] font-extrabold">
                    {t.alumniTitleLine1}
                    <br />
                    {t.alumniTitleLine2}
                  </h2>
                  <p className="max-w-[520px] text-[15px] leading-[1.6] text-inverse-foreground">
                    {format(t.alumniBody, { school: name })}
                  </p>
                </div>
                <div className="relative flex flex-wrap items-center justify-between gap-4 rounded-[22px] bg-accent p-6 text-accent-foreground">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-extrabold tracking-widest uppercase">
                      {t.homecoming}
                    </span>
                    {homecomingWhen ? (
                      <strong className="text-[22px] tracking-[-0.02em]">{homecomingWhen}</strong>
                    ) : null}
                    {homecomingDetails ? (
                      <span className="text-sm font-semibold">{homecomingDetails}</span>
                    ) : null}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <a href="#contact-school" className={buttonVariants({ variant: "dark" })}>
                      {t.alumniRegister}
                    </a>
                    <a
                      href="#contact-school"
                      className={cn(
                        buttonVariants({ variant: "dark" }),
                        "bg-inverse/10 text-accent-foreground hover:bg-inverse/20"
                      )}
                    >
                      {t.alumniJoin}
                    </a>
                  </div>
                </div>
              </div>
              <ul className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
                {acts.map(({ icon: Icon, title, text }) => (
                  <li
                    key={title}
                    className="flex flex-col gap-2.5 rounded-card bg-card p-[22px] shadow-card"
                  >
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-accent-soft text-accent-soft-foreground">
                      <Icon aria-hidden className="size-6" strokeWidth={1.8} />
                    </div>
                    <strong className="text-[17px]">{title}</strong>
                    <span className="text-sm leading-normal text-muted-foreground">{text}</span>
                  </li>
                ))}
              </ul>
              <AlumniGallery
                title={t.pastHomecomings}
                chooseLabel={t.chooseYear}
                years={alumni.years.map((year) => ({
                  year,
                  label: format(t.homecomingYear, { year }),
                  photos: [t.photoProgram, t.photoReunions, t.photoSports].map((subject) =>
                    photoOf(format(subject, { year }))
                  ),
                }))}
              />
            </section>
          ) : null}

          <h2 className={cn(h2, "pt-3")}>{content.galleryTitle[locale]}</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
            {content.gallery.map((subject) => (
              <PhotoPlaceholder
                key={subject.en}
                label={photoOf(subject[locale])}
                className="h-[180px] rounded-card"
              />
            ))}
          </div>
        </div>

        <aside className="flex flex-[1_1_320px] flex-col gap-5">
          <div
            id="enroll"
            className="flex scroll-mt-28 flex-col gap-3 rounded-[28px] bg-accent p-7 text-accent-foreground"
          >
            <span className="text-xs font-extrabold tracking-widest uppercase">{t.enrollment}</span>
            <h2 className="text-[26px] leading-[1.1] font-extrabold">
              {content.enrollTitle[locale]}
            </h2>
            {SHOW_PENDING ? (
              <span className="text-[15px] font-semibold">{t.enrollmentPending}</span>
            ) : null}
          </div>

          <Card className="flex flex-col gap-3 p-7">
            <h2 className="text-[22px] font-extrabold">{t.requirements}</h2>
            <ul className="flex flex-col gap-3">
              {content.requirements.map((item) => (
                <li
                  key={item.en}
                  className="flex items-center gap-3 rounded-[14px] bg-background px-3.5 py-3 text-[15px]"
                >
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-schools-deep text-white">
                    <Check aria-hidden className="size-[13px]" strokeWidth={3} />
                  </span>
                  {item[locale]}
                </li>
              ))}
            </ul>
          </Card>

          <Card id="contact-school" className="flex scroll-mt-28 flex-col gap-1.5 p-7">
            <h2 className="pb-1.5 text-[22px] font-extrabold">{t.contact}</h2>
            <span className="text-[13px] font-semibold text-muted-foreground uppercase">
              {head.role[locale]}
            </span>
            {headName ? <strong className="text-[17px]">{headName}</strong> : null}
            {contactLine ? <span className="text-[15px] text-prose">{contactLine}</span> : null}
            <span className="text-[15px] text-prose">{address}</span>
          </Card>

          {others.length > 0 ? (
            <Card className="flex flex-col gap-2.5 p-7">
              <h2 className="text-[22px] font-extrabold">{t.otherSchools}</h2>
              {others.map((item) => (
                <ListRow key={item.slug} href={siteHref(site, locale, schoolPath(item.slug))} prefetch>
                  {item.navLabel[locale]}
                </ListRow>
              ))}
            </Card>
          ) : null}
        </aside>
      </div>
    </>
  )
}

export { SchoolScreen }
