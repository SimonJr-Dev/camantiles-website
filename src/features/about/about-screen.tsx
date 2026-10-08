import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { Breadcrumb } from "@/components/blocks/breadcrumb"
import { buttonVariants } from "@/components/ui/button"
import { Card, Panel } from "@/components/ui/card"
import { PhotoPlaceholder } from "@/components/ui/photo-placeholder"
import { getAbout, type AboutBlock } from "@/content"
import { format } from "@/i18n/format"
import type { PageContext } from "@/lib/context"
import { siteHref } from "@/lib/href"
import { cn } from "@/lib/utils"

import { RichText } from "./rich-text"

const goldLabel = "text-xs font-extrabold tracking-widest text-accent-strong uppercase"
const paragraph = "text-lg leading-[1.75] text-prose"

function Block({ block, ctx }: { block: AboutBlock; ctx: PageContext }) {
  const { site, locale } = ctx

  switch (block.type) {
    case "paragraph":
      return (
        <p className={paragraph}>
          <RichText value={block.text} locale={locale} />
        </p>
      )
    case "beat":
      return (
        <p className="text-[22px] leading-[1.45] font-semibold tracking-[-0.01em]">
          <RichText value={block.text} locale={locale} />
        </p>
      )
    case "quote":
      return (
        <blockquote className="rounded-card bg-primary px-9 py-8 text-[26px] leading-[1.35] font-bold tracking-[-0.02em] text-primary-foreground">
          <RichText value={block.text} locale={locale} />
        </blockquote>
      )
    case "callout":
      return (
        <div className="flex flex-wrap items-center gap-5 rounded-card bg-accent-soft p-6">
          <Image
            src={site.seal.src}
            alt=""
            width={120}
            height={120}
            className="size-[120px] shrink-0 rounded-full object-contain"
          />
          <div className="flex flex-[1_1_260px] flex-col gap-1.5">
            <span className="text-xs font-extrabold tracking-widest text-accent-soft-foreground">
              <RichText value={block.label} locale={locale} />
            </span>
            <p className="leading-[1.6] text-accent-ink">
              <RichText value={block.text} locale={locale} />
            </p>
          </div>
        </div>
      )
    case "photo":
      return <PhotoPlaceholder label={block.label[locale]} className="h-[300px] rounded-card" />
    case "names":
      return (
        <Card className="flex flex-col gap-3.5 p-6">
          <span className={goldLabel}>{block.label[locale]}</span>
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3">
            {block.names.map((name) => (
              <li key={name} className="rounded-2xl bg-background p-4 font-bold">
                {name}
              </li>
            ))}
          </ul>
        </Card>
      )
    case "questions":
      return (
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3">
          {block.items.map((item) => (
            <li
              key={item.en}
              className="rounded-card bg-card p-5 text-[17px] leading-[1.4] font-bold shadow-card"
            >
              {item[locale]}
            </li>
          ))}
        </ul>
      )
    case "link":
      return (
        <Link
          href={siteHref(site, locale, block.path)}
          className={cn(
            buttonVariants(),
            "self-start bg-schools-foreground hover:bg-schools-foreground/90"
          )}
        >
          {block.label[locale]}
          <ArrowUpRight aria-hidden strokeWidth={2.2} />
        </Link>
      )
  }
}

async function AboutScreen({ ctx }: { ctx: PageContext }) {
  const { site, locale, dict } = ctx
  const about = await getAbout(site)
  const { hero, closing } = about

  return (
    <>
      <Panel className="relative flex flex-wrap items-center gap-12 overflow-hidden px-7 py-10 sm:px-12 sm:py-14">
        <div
          aria-hidden
          className="absolute -bottom-[200px] -left-[140px] box-content size-[460px] rounded-full border-[70px] border-accent/10"
        />
        <div className="relative flex flex-[1_1_480px] flex-col gap-5">
          <Breadcrumb
            ctx={ctx}
            trail={[{ label: format(dict.nav.about, { shortName: site.shortName }) }]}
            className="text-[#E6EFEA]"
          />
          <h1 className="text-[clamp(3.25rem,9vw,6rem)] leading-[0.9] font-extrabold tracking-[-0.05em]">
            {site.shortName}
          </h1>
          <p className="text-2xl leading-[1.35] font-bold tracking-[-0.01em] text-accent">
            {hero.taglineLine1[locale]}
            <br />
            {hero.taglineLine2[locale]}
          </p>
          <p className="max-w-[520px] text-[17px] leading-[1.7] text-primary-soft-foreground">
            {hero.lead[locale]}
          </p>
        </div>
        <div className="relative flex flex-[0_1_360px] justify-center">
          <Image
            src={site.seal.src}
            alt={hero.sealAlt[locale]}
            width={340}
            height={340}
            priority
            className="aspect-square w-[340px] max-w-full rounded-full object-contain shadow-[0_30px_60px_-20px_rgb(0_0_0/0.5)]"
          />
        </div>
      </Panel>

      <ul className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
        {about.facts.map((fact) => (
          <li
            key={fact.label.en}
            className="flex flex-col gap-1.5 rounded-card bg-card px-6 py-[22px] shadow-card"
          >
            <span className={goldLabel}>{fact.label[locale]}</span>
            <strong className="leading-[1.35]">{fact.text[locale]}</strong>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap items-start gap-10 pt-5">
        <nav
          aria-label={about.tocLabel[locale]}
          className="flex max-w-[300px] flex-[1_1_240px] flex-col gap-1 lg:sticky lg:top-[110px]"
        >
          <span className="px-3 pb-2 text-xs font-extrabold tracking-[0.12em] text-muted-foreground uppercase">
            {about.tocLabel[locale]}
          </span>
          {about.chapters.map((chapter) => (
            <a
              key={chapter.id}
              href={`#${chapter.id}`}
              className="flex items-baseline gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-subtle-foreground no-underline transition-colors hover:bg-muted hover:text-foreground"
            >
              <span className="text-xs font-extrabold text-accent-strong">{chapter.number}</span>
              {(chapter.tocTitle ?? chapter.title)[locale]}
            </a>
          ))}
        </nav>

        <article className="flex max-w-[760px] min-w-0 flex-[999_1_560px] flex-col">
          {about.chapters.map((chapter, index) => (
            <section
              key={chapter.id}
              id={chapter.id}
              className={cn("flex scroll-mt-[110px] flex-col gap-[22px]", index > 0 && "pt-14")}
            >
              <span className="text-[13px] font-extrabold tracking-[0.12em] text-accent-strong">
                {chapter.number}
              </span>
              <h2 className="text-[clamp(1.75rem,3.3vw,2.5rem)] leading-[1.05] font-extrabold">
                {chapter.title[locale]}
              </h2>
              {chapter.blocks.map((block, blockIndex) => (
                <Block key={blockIndex} block={block} ctx={ctx} />
              ))}
            </section>
          ))}
        </article>
      </div>

      <section className="pt-14">
        <Panel
          tone="inverse"
          className="relative flex flex-wrap items-center gap-10 overflow-hidden px-7 py-10 text-white sm:px-12 sm:py-14"
        >
          <div
            aria-hidden
            className="absolute -top-[160px] -right-[120px] box-content size-[420px] rounded-full border-[64px] border-accent/12"
          />
          <div className="relative flex flex-[1_1_520px] flex-col gap-3.5">
            <p className="text-xl leading-[1.6] text-inverse-foreground">{closing.lead[locale]}</p>
            <h2 className="text-[clamp(2rem,4.4vw,3.25rem)] leading-none font-extrabold tracking-[-0.04em]">
              {closing.title[locale]}
            </h2>
            <p className="text-xl leading-[1.6] font-semibold text-accent">{closing.body[locale]}</p>
          </div>
          <div className="relative flex flex-[1_1_336px] flex-col gap-3 rounded-card bg-white/6 p-7">
            <strong className="text-xl">{closing.shareTitle[locale]}</strong>
            <span className="text-[15px] leading-[1.55] text-inverse-foreground">
              {closing.shareBody[locale]}
            </span>
            <a href="#contact" className={cn(buttonVariants({ variant: "accent" }), "mt-1.5")}>
              {closing.shareAction[locale]}
            </a>
          </div>
        </Panel>
      </section>
    </>
  )
}

export { AboutScreen }
