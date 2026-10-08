# Architecture

How the Barangay Camantiles website is built, and how it is shaped so it can later sit inside the Urdaneta City website next to other barangay sites.

Related: [ui-analysis.md](ui-analysis.md) · [design-system.md](design-system.md) · [content-model.md](content-model.md) · [multi-site-plan.md](multi-site-plan.md) · [milestones.md](milestones.md) · [decisions.md](decisions.md)

## Goals

1. Rebuild the 11 designed pages faithfully, in English and Filipino, working on phones.
2. Let barangay staff's content (announcements, officials, schedules) change without touching layout code.
3. Make "Camantiles" a piece of data. A second barangay should be a new folder of config and content, not a copy of the codebase.
4. Keep the door open to living under the city site without a rewrite.

Not goals for the first release: logins, an admin dashboard, resident accounts, online document requests or payments. Staff roles and the admin arrive in M11; they are designed now in [user-roles.md](user-roles.md) so the first release does not block them. See [decisions.md](decisions.md).

## Stack

Already installed in this repo:

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16.4, App Router, React 19.3, TypeScript |
| Styling | Tailwind CSS v4 (tokens in `src/app/globals.css`) |
| Components | shadcn (`base-nova` style, Base UI primitives), lucide icons |
| Config | `cacheComponents: true`, Turbopack |

Next.js 16 differs from older versions in ways that matter here. Read `node_modules/next/dist/docs/` before writing code, as [AGENTS.md](../AGENTS.md) requires. Two that this design relies on:

- Middleware is now **Proxy** (`src/proxy.ts`, one per project).
- `params` is a Promise and is typed with the global `PageProps<'/route'>` and `LayoutProps<'/route'>` helpers.

## The one structural idea: a Site

Everything specific to a barangay lives in one place and is passed down. Components never contain the word "Camantiles".

```
src/
  sites/
    types.ts                 Site, SiteModule, Locale types
    index.ts                 registry: getSite(slug), listSites()
    camantiles/
      site.ts                name, city, province, seal, locales, enabled modules,
                             nav order, contact, hotlines, social, theme overrides
      content/               typed content for this barangay (see content-model.md)
      dictionaries/
        en.json              page copy, keyed
        fil.json
  i18n/
    dictionaries/en.json     shared interface copy (nav labels, buttons, footer headings)
    dictionaries/fil.json
    index.ts                 getDictionary(site, locale), hasLocale()
  content/
    index.ts                 the only way pages read content: getAnnouncements(site, …) etc.
  features/                  one folder per page; the actual screens
    home/  about/  barangay-hall/  health/  sk/  senior-citizens/  schools/
  components/
    shell/                   SiteHeader, MainNav, MobileNav, LanguageSwitch, SiteFooter
    ui/                      primitives (Button, Card, Tag, Chip, …)
    blocks/                  composites (PageHero, NewsCard, Carousel, …)
  lib/
    href.ts                  siteHref(site, locale, path) — every internal link goes through this
    utils.ts
  app/
    [lang]/
      layout.tsx             <html lang>, font, site theme, header, footer
      page.tsx               → features/home
      about/page.tsx
      barangay-hall/page.tsx
      health/page.tsx
      sk/page.tsx
      senior-citizens/page.tsx
      schools/page.tsx
      schools/[school]/page.tsx
      not-found.tsx
    globals.css
  proxy.ts                   redirects / to the visitor's locale
```

Three rules make the later move into the city site cheap:

1. **Route files are thin.** Each `page.tsx` resolves the site and locale, then renders a screen from `features/`. Moving the routes under a new URL segment later is a file move, not a refactor.
2. **Links go through `siteHref()`.** No hand-written `/schools` strings. When the site later lives at `/barangays/camantiles`, one function changes.
3. **Pages are assembled from modules.** `site.ts` lists which modules a barangay has (`hall`, `health`, `sk`, `seniors`, `schools`) and which schools. Navigation, the home quick links and the footer are generated from that list. A barangay with no high school simply does not list one.

For now `getSite()` returns Camantiles from a constant. See [multi-site-plan.md](multi-site-plan.md) for how that changes.

## Routes

| URL | Screen | Source file |
| --- | --- | --- |
| `/` | redirect to `/en` or `/fil` | — |
| `/[lang]` | Home | `index.html` |
| `/[lang]/about` | About | `about-camantiles.html` |
| `/[lang]/barangay-hall` | Barangay Hall | `barangay-hall.html` |
| `/[lang]/health` | Health Center | `health-care.html` |
| `/[lang]/sk` | Sangguniang Kabataan | `sk.html` |
| `/[lang]/senior-citizens` | Senior Citizens | `senior-citizens.html` |
| `/[lang]/schools` | Schools index | `schools.html` |
| `/[lang]/schools/[school]` | School detail, one template | the four school files |

`[lang]` is `en` or `fil`. `[school]` values come from the site's school list. Both are enumerated with `generateStaticParams`, so every page is prerendered at build time; unknown values return the 404 page.

Not designed, added later only if wanted: `/[lang]/barangay-hall/announcements/[slug]` for full announcement pages.

## Languages

The source swaps text in the browser using a dictionary keyed by English sentences. That is replaced with real per-locale pages, following the Next.js internationalization guide:

- Each language has its own URL, so Filipino pages are indexable and shareable, and `<html lang>` is correct on first load.
- Copy is looked up by key (`home.hero.title`), not by English sentence, so editing English cannot orphan a translation.
- The language switch is a plain link to the same page in the other locale. No client JavaScript, no `localStorage`.
- `src/proxy.ts` only handles the bare `/`: it reads `Accept-Language` and redirects.
- Dictionaries load on the server only. Client components receive the few strings they need as props.

Migration: `scripts/extract-source-translations.mjs` saves the source dictionary to `docs/ui-source/translations.json`. Keys are written by hand as each page is built, with the Filipino text looked up there. `npm run i18n:check` fails if any language is missing a key.

Split: interface copy that every barangay shares goes in `src/i18n/dictionaries/`; copy that belongs to Camantiles (its history, its hero lines) goes in `src/sites/camantiles/dictionaries/`.

Locales are listed per site, so a barangay could add Pangasinan or Ilocano later without code changes.

## Content

Pages never import content files directly. They call functions in `src/content/`:

```ts
getAnnouncements(site, { locale, category?, limit? })
getEvents(site, { locale, limit? })
getOfficials(site, group)           // 'barangay' | 'sk' | 'health' | 'seniors'
getSchool(site, slug, locale)
```

First implementation: typed TypeScript files under `src/sites/camantiles/content/`, validated at build time. Updating an announcement means editing a file and redeploying.

That is deliberately the simplest thing that works. When the barangay needs to post without a developer, a CMS or database is plugged in behind the same functions, and no page changes. The specific CMS or database is chosen at the start of M11. Shapes are defined in [content-model.md](content-model.md).

## Rendering

- **Server Components by default.** All pages are static content and prerender fully. There is no per-request data in the first release.
- **Client Components only for interaction**, kept small and leaf-level:

| Component | Why it needs the client |
| --- | --- |
| `MobileNav` | open and close |
| `MainNav` Schools dropdown | tap and keyboard behaviour |
| `AnnouncementFilter` | category chips |
| `Carousel` | faculty, health workers, class sections |
| `GradeTabs`, `AlumniYearPicker` | switch visible group |
| `TableOfContents` | highlight current chapter |

Each receives its full data as props from the server and only toggles what is visible, so the content is in the HTML either way.

- **Detail pages load inside a boundary.** A school or announcement page finds out which record to show from the URL. Next.js 16 requires that read to sit inside `<Suspense>`, even when every address is prerendered, so the page outline can appear the moment a link is clicked. Both pages wrap their content in a boundary with `PageSkeleton` as the fallback, and links to them use `prefetch` so the finished page is usually ready before the click.
- **Later, with a CMS:** content functions are marked with `'use cache'` and tagged, and publishing calls revalidation. `cacheComponents` is already on for this.

## Users and roles

Full definition in [user-roles.md](user-roles.md). The architectural consequences:

- **The public site has no login.** Everything under `app/[lang]/` is anonymous and static. Roles never affect what a visitor sees.
- **Access is a role at a scope.** Roles: Visitor, Section or School Editor, Barangay Editor, Approver, Barangay Admin, City Editor, City Admin, Super Admin. Scopes: platform, city, barangay, section, school. Scopes line up exactly with what already exists in the site config: a barangay is a `Site`, a section is a `SiteModule`, a school is an entry in `schools`.
- **Content records are role-ready from M1.** Each record carries `site`, `scope` (module or school slug), `status` (`draft` | `review` | `published` | `archived`), `author` and timestamps. File-based content sets `status: 'published'`; the content functions already filter on it, so adding drafts later changes no page.
- **The admin is a separate area.** When built (M11) it lives at `app/admin/`, outside `[lang]`, never prerendered, with its own layout. `proxy.ts` may redirect signed-out users away from it as a convenience, but every read and write checks role and scope on the server, in one `can(user, action, resource)` function that all Server Actions and content writes go through.
- **Auth and storage are chosen with the CMS,** at the start of M11. Either a hosted CMS that provides users, roles and workflow, or a database with an auth library and the admin built here. The role model in [user-roles.md](user-roles.md) is the requirement either choice must meet, in particular per-site and per-section scoping.

```
src/
  auth/
    roles.ts        Role, Scope, Assignment types
    can.ts          can(user, action, resource) — the single permission check
  app/
    admin/          added in M11
```

## Theming

`globals.css` defines the tokens in [design-system.md](design-system.md). The root layout sets `data-site="camantiles"` on `<html>` and applies that site's overrides (primary, link, accent) as CSS variables. A new barangay changes three colours and a seal, not a stylesheet.

## Images and files

- Seal and photos go in `public/sites/camantiles/`, referenced through the site config, rendered with `next/image`.
- Until real photos arrive, `PhotoPlaceholder` reproduces the striped box from the design, so layouts are testable.
- Downloadable forms (PDF) go in `public/sites/camantiles/forms/`.

## SEO and sharing

`generateMetadata` per page from the dictionary and site config: title, description, canonical URL, `hreflang` alternates for `en` and `fil`, Open Graph image using the seal. Plus `sitemap.ts`, `robots.ts`, and `GovernmentOrganization` structured data on the home page.

## Quality gates

Every milestone ends with: `npm run lint`, `npx tsc --noEmit`, `npm run build`, and a side-by-side check against the matching file in `docs/ui-source/` at 1440px. From M7 on: Playwright smoke tests for every route in both languages, an automated accessibility scan, and Lighthouse on a mid-range phone profile.

## Hosting

Node.js hosting (decisions #1); the provider is chosen by M8. This repo sits in `C:\xampp\htdocs`, which is an Apache and PHP folder. A Next.js app does not run under Apache and PHP; it needs Node.js hosting (Vercel, a VPS, or any Node-capable host), and locally it runs with `npm run dev`, not through XAMPP.
