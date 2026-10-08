import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"

import { Panel } from "@/components/ui/card"
import { pending, SHOW_PENDING } from "@/components/ui/pending"
import { format } from "@/i18n/format"
import type { PageContext } from "@/lib/context"
import { siteHref } from "@/lib/href"
import { cn } from "@/lib/utils"
import { ABOUT_PATH, MODULES } from "@/sites/modules"
import { currentYear } from "@/lib/year"

function Column({
  title,
  highlight,
  children,
}: {
  title: string
  highlight?: boolean
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <h2
        className={cn(
          "text-xs font-bold tracking-widest uppercase",
          highlight ? "text-accent" : "text-inverse-muted"
        )}
      >
        {title}
      </h2>
      {children}
    </div>
  )
}

const linkClass = "text-inverse-foreground underline underline-offset-2 hover:text-white"

async function SiteFooter({ ctx }: { ctx: PageContext }) {
  const { site, locale, dict } = ctx
  const { contact, social } = site
  const year = await currentYear()

  const street = contact.street?.[locale] ?? (SHOW_PENDING ? pending(dict.pending.street) : null)
  const address = [street, site.shortName, site.city[locale], site.province]
    .filter(Boolean)
    .join(", ")
  const hours = contact.hours?.[locale] ?? (SHOW_PENDING ? pending(dict.pending.hours) : null)

  const hotlines = site.hotlines.filter((hotline) => hotline.number || SHOW_PENDING)

  const explore = [
    { path: ABOUT_PATH, label: format(dict.nav.about, { shortName: site.shortName }) },
    ...site.modules.map((module) => ({
      path: MODULES[module].path,
      label: dict.sections[module],
    })),
  ]

  return (
    <footer id="contact" className="scroll-mt-28 px-4 pt-2 pb-6 sm:px-6">
      <Panel
        tone="inverse"
        className="mx-auto flex max-w-site flex-col gap-11 px-6 pt-12 pb-7 sm:px-10"
      >
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-8 text-sm leading-[1.7]">
          <Column title={dict.footer.hall}>
            <span>{address}</span>
            {hours ? <span>{hours}</span> : null}
            {contact.email ? (
              <a href={`mailto:${contact.email}`} className={linkClass}>
                {contact.email}
              </a>
            ) : SHOW_PENDING ? (
              <span>{pending(dict.pending.email)}</span>
            ) : null}
          </Column>

          {hotlines.length > 0 ? (
            <Column title={dict.footer.hotlines} highlight>
              {hotlines.map((hotline) => (
                <span key={hotline.id}>
                  {hotline.label[locale]} ·{" "}
                  {hotline.number ? (
                    <a href={`tel:${hotline.number.replace(/[^\d+]/g, "")}`} className={linkClass}>
                      {hotline.number}
                    </a>
                  ) : (
                    pending(dict.pending.number)
                  )}
                </span>
              ))}
            </Column>
          ) : null}

          <Column title={dict.footer.explore}>
            {explore.map((item) => (
              <Link
                key={item.path}
                href={siteHref(site, locale, item.path)}
                className={linkClass}
              >
                {item.label}
              </Link>
            ))}
          </Column>

          {social.facebook || SHOW_PENDING ? (
            <Column title={dict.footer.follow}>
              <span>
                {dict.footer.facebook} ·{" "}
                {social.facebook ? (
                  <a href={social.facebook.url} rel="noopener" className={linkClass}>
                    {social.facebook.label}
                  </a>
                ) : (
                  pending(format(dict.pending.facebook, { name: site.name }))
                )}
              </span>
            </Column>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-7">
          <Image
            src={site.seal.src}
            alt=""
            width={150}
            height={150}
            className="size-[150px] shrink-0 rounded-full object-contain"
          />
          <p className="text-wordmark text-white">
            Barangay
            <br />
            {site.shortName}.
          </p>
        </div>

        <div className="flex flex-wrap justify-between gap-2 border-t border-inverse-border pt-5 text-[13px] text-inverse-muted">
          <span>
            © {year} {site.name} · {dict.footer.republic} ·{" "}
            {format(dict.footer.province, { province: site.province })}
          </span>
          <span>{format(dict.footer.credits, { credits: site.credits })}</span>
        </div>
      </Panel>
    </footer>
  )
}

export { SiteFooter }
