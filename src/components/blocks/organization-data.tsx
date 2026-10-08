import type { PageContext } from "@/lib/context"
import { siteHref } from "@/lib/href"

/**
 * Machine-readable description of the barangay for search engines. Details the
 * barangay has not supplied yet are left out rather than sent as blanks.
 */
function OrganizationData({ ctx }: { ctx: PageContext }) {
  const { site, locale } = ctx
  const origin = (process.env.NEXT_PUBLIC_SITE_URL ?? site.url).replace(/\/$/, "")
  const phone = site.hotlines.find((item) => item.id === "hall")?.number

  const data = {
    "@context": "https://schema.org",
    "@type": "GovernmentOrganization",
    name: site.name,
    url: origin + siteHref(site, locale),
    logo: origin + site.seal.src,
    address: {
      "@type": "PostalAddress",
      ...(site.contact.street && { streetAddress: site.contact.street[locale] }),
      addressLocality: site.city.en,
      addressRegion: site.province,
      addressCountry: "PH",
    },
    ...(site.contact.email && { email: site.contact.email }),
    ...(phone && { telephone: phone }),
    ...(site.social.facebook && { sameAs: [site.social.facebook.url] }),
  }

  return (
    <script
      type="application/ld+json"
      // The value is our own config, serialised; "<" is escaped so it cannot close the tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  )
}

export { OrganizationData }
