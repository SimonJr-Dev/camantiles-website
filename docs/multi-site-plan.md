# Multi-Site Plan

The Camantiles site is the first of several barangay sites, and all of them will eventually live inside a larger Urdaneta City website. This is the plan for getting there in three stages without rebuilding.

## Stage A — one barangay (now)

Single app, single site. The seams are built in from the start (see [architecture.md](architecture.md)):

- all barangay-specific values in `src/sites/camantiles/`
- pages assembled from the modules a site enables
- every internal link through `siteHref()`
- route files thin, screens in `src/features/`

`getSite()` returns Camantiles. URLs are `/en/schools`.

## Stage B — more barangays, no city site yet

Add `src/sites/<slug>/` with its config, content, dictionaries and seal. No component changes.

How a request finds its site:

| Option | URL | Trade-off |
| --- | --- | --- |
| **B1. One deployment, site in the path** (recommended) | `/en/barangays/camantiles/schools` | One build, one deploy, one place to fix bugs. Routes move under `app/[lang]/barangays/[barangay]/`. |
| B2. One deployment, site by hostname | `camantiles.urdaneta.gov.ph/en/schools` | Friendlier addresses; `proxy.ts` maps hostname to site. Needs DNS and certificates per barangay. |
| B3. One deployment per barangay | separate domains | Simplest mentally, but every fix is redeployed N times. Avoid past 3 or 4 sites. |

B1 and B2 can coexist: the path form is canonical, hostnames rewrite to it.

The move from A to B1 is: relocate the route folders one level down, change `getSite()` to read the route param, and update `siteHref()`. Screens, components and content do not change. Milestone M9 does a dry run of this with a dummy second barangay to prove it.

## Stage C — inside the city website

Target shape:

```
urdaneta.gov.ph/                          city home, departments, city services
urdaneta.gov.ph/barangays                 directory of all barangays
urdaneta.gov.ph/barangays/camantiles/…    this site
urdaneta.gov.ph/barangays/<other>/…
```

Two ways to combine them:

**C1. One Next.js app** (recommended to start). City pages and barangay pages are route groups in the same app, sharing layout pieces, tokens and components. Navigation between city and barangay is instant. Best when one team builds both.

**C2. Multi-Zones.** City and barangays are separate Next.js apps served under one domain. The barangay app sets an `assetPrefix`; the city app rewrites `/barangays/*` to it. Each deploys independently. Costs: navigation between zones is a full page load, cross-zone links must be plain `<a>` tags, and shared code must be a package. Choose this only if different teams or vendors own the city and barangay sites, or release schedules diverge.

Either way the repo becomes a small monorepo when the city project starts:

```
apps/
  city/            city site (C2), or the single combined app (C1)
  barangays/       this codebase (C2 only)
packages/
  ui/              tokens, primitives, blocks
  content/         content types and loaders
  i18n/            shared dictionaries
```

Because Stage A already separates `components/`, `content/`, `i18n/` and `sites/`, this is moving folders, not untangling code.

## What the city layer adds to a barangay page

Plan the slots now, fill them later:

- a slim city bar above the barangay header ("City of Urdaneta" with a link up)
- breadcrumb: City › Barangays › Camantiles
- city-wide advisories (typhoon, class suspension) shown on every barangay site, above the barangay's own
- shared emergency hotlines from the city, merged with the barangay's
- city search covering barangay content

`SiteHeader` and `AdvisoryBar` accept optional parent-site props from M1 so these can be switched on without redesign.

## What varies between barangays

| Varies | Where it lives |
| --- | --- |
| Name, seal, contact, hotlines, social | `site.ts` |
| Three brand colours | `site.ts` → CSS variables |
| Which sections exist | `modules` |
| Which schools, and whether they have sections or alumni | `schools` and each school record |
| All copy and translations | site dictionaries and content |
| Languages offered | `locales` |

What does not vary: layout, components, typography, section colours, URL structure. If a barangay needs a section no one else has, it is added as a new module available to all, not as a one-off.

## Who manages what across sites

Roles are scoped so each barangay runs its own site and the city oversees without doing their work. Detail in [user-roles.md](user-roles.md).

| Level | Roles | Reach |
| --- | --- | --- |
| Platform | Super Admin | all sites, settings, code |
| City | City Admin, City Editor | city pages, city-wide advisories, creating barangay sites and their first admin, emergency unpublish |
| Barangay | Barangay Admin, Barangay Editor, Approver | one barangay |
| Section / School | Section Editor, School Editor | one section or one school of one barangay |

Adding a barangay in Stage B therefore has two parts: the site folder (config, content, seal), and a City Admin creating its Barangay Admin, who then invites their own staff.

## Decisions this plan rests on

Tracked in [decisions.md](decisions.md): URL scheme (path or hostname), who owns the city site, the content system, and the domain.
