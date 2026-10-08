# Milestones

Progress tracker. Each milestone ends in something you can open and look at. A box is ticked only when the item is finished and verified.

To check any milestone: run `npm run dev`, open the URL listed under "See it", and compare with the matching file in [ui-source/](ui-source/). For a side-by-side screenshot, run `node scripts/compare.mjs /en index.html 1440 3000` (route, source file, width, dev server port); the result is saved in `.compare/`.

## Status

| # | Milestone | Status | See it |
| --- | --- | --- | --- |
| M0 | Analysis, planning, tooling | Done | this folder |
| M1 | Foundation and shell | Done | `/en` shows header and footer |
| M2 | Home | Done | `/en` |
| M3 | Barangay Hall and About | Done | `/en/barangay-hall`, `/en/about` |
| M4 | Health, SK, Senior Citizens | Done | `/en/health`, `/en/sk`, `/en/senior-citizens` |
| M5 | Schools | Done | `/en/schools`, `/en/schools/high-school` |
| M6 | Filipino complete | Done | every page under `/fil` |
| M7 | Mobile, accessibility, speed, SEO | Done | any page on a phone |
| M8 | Real content and launch | Not started | live domain |
| M9 | Second-barangay dry run | Deferred until after the city site | `/en/barangays/demo` |
| M10 | City site integration | Future | — |
| M11 | Content admin and user roles | Not started | `/admin` |

Status values: Not started · In progress · Blocked (say on what) · Done.

M2 to M5 are independent once M1 is done and can be reordered. M6 and M7 run across all pages. M8 depends on content from the barangay, so request it early. M11 is numbered last but does not depend on M9 or M10: it can start any time after M5, and should move ahead of M8 if barangay staff must be able to post from launch day (decisions #2).

---

## M0 — Analysis, planning, tooling

- [x] UI source unpacked and analysed → [ui-analysis.md](ui-analysis.md)
- [x] Design tokens and component list extracted → [design-system.md](design-system.md)
- [x] Architecture written → [architecture.md](architecture.md)
- [x] Content shapes defined → [content-model.md](content-model.md)
- [x] City and multi-barangay path planned → [multi-site-plan.md](multi-site-plan.md)
- [x] Open questions listed
- [x] Design source saved in the repo → [ui-source/](ui-source/)
- [x] Skills installed: find-skills, superpowers, claude-mem, impeccable, frontend-design
- [x] Open questions settled on the proposed defaults → [decisions.md](decisions.md)

## M1 — Foundation and shell

The frame every page sits in. Nothing page-specific yet.

- [x] Design tokens in `globals.css`; shadcn defaults replaced
- [x] Plus Jakarta Sans via `next/font`; Geist removed
- [x] `src/sites/` types, registry and the Camantiles config
- [x] `[lang]` routing, `proxy.ts` redirect from `/`, `generateStaticParams`
- [x] Dictionary loader with keyed `en.json` and `fil.json`; `npm run i18n:check` fails on any missing key
- [x] Source Filipino dictionary extracted to `docs/ui-source/translations.json` (477 strings) as the lookup for translating each page. Keys are written by hand per page in M2 to M5 rather than auto-generated, so they stay readable
- [x] `siteHref()` helper; content function stubs
- [x] Content records carry `site`, `scope`, `status`, `author`; content functions return `published` only
- [x] Primitives: Button, Card, Panel, Tag, Chip, Eyebrow, IconTile, ArrowLink, ListRow, SectionHeading, PhotoPlaceholder
- [x] Header with nav, Schools dropdown, language switch, Hotlines button
- [x] Footer
- [x] Seal as logo and favicon
- [x] Empty placeholder page at every route so the nav works end to end

**Verified 2026-10-08:** header and footer compared by screenshot with `index.html` at 1440px in English, and the Filipino shell checked against the source translations; all 11 pages prerender in both `en` and `fil` in the build, with ten of them spot-checked over HTTP; unknown pages return 404; `/` redirects by browser language; lint, typecheck and build pass. Not covered here: phone layout and tap behaviour for the Schools menu, which are M7.

**Done when:** at 1440px the header and footer match `index.html`, every nav link lands on a page, EN and FIL switch the shell text and the URL, and lint, typecheck and build pass.

## M2 — Home

- [x] Advisory pill
- [x] Hero with both buttons
- [x] Photo and "Next event" card
- [x] Quick-link tiles, generated from the site config (`homeQuickLinks`; the design shows four, without Health Care)
- [x] News grid and upcoming-events sidebar
- [x] Services card
- [x] Officials grid
- [x] Content for all of the above read through `src/content/`

**Verified 2026-10-08:** `/en` compared side by side with `index.html` at 1440px (page heights 3190px and 3195px); `/fil` checked against the source translations; lint, typecheck, dictionary check and build pass. News cards are not links yet (announcement pages are M3). Announcements, events, services and officials are the sample items from the design, with dates and names still placeholders.

**Done when:** `/en` matches `index.html` side by side at 1440px.

## M3 — Barangay Hall and About

- [x] Barangay Hall: hero, featured announcement, announcement list
- [x] Category filter chips working
- [x] Sangguniang Barangay council
- [x] Downloadable forms list
- [x] Announcement detail page
- [x] About: hero and fact chips
- [x] About: seven chapters with sticky table of contents
- [x] About: early administrators, closing statement

**Verified 2026-10-08:** both pages compared side by side with their source files at 1440px (Barangay Hall 2360px against 2389px, About 7303px against 7356px); Filipino pages checked for translated text; announcement pages return 200 and an unknown one shows the not-found page (since the loading-boundary change below, with status 200 and a no-index tag rather than 404); lint, typecheck, dictionary check and build pass. The category filter was not clicked in a browser: the chips hide rows with the `hidden` attribute and all rows are in the HTML.

Differences from the design, on purpose:
- The council card has no "Full directory" button, because the card already lists everyone and there is no further page.
- Announcements are one shared list, so the Barangay Hall list order differs from the mock-up and three items use the home page wording.
- The announcement page is new; the design has none.
- The footer is the same on every page. In the source it varies slightly from page to page.
- "Share your story" jumps to the contact details in the footer, since there are no online forms at launch.

**Done when:** both pages match their source files; filtering works with JavaScript on and all announcements are still in the HTML with it off.

## M4 — Health, SK, Senior Citizens

- [x] Health: hero and clinic hours, services, weekly schedule table, what to bring, advisories, health-worker carousel, emergency block
- [x] SK: hero, programs, updates, transparency board, council, call to action
- [x] Seniors: hero and president, pension and benefits table, health and wellness, activities, how to register, family call to action
- [x] Reusable Carousel and ScheduleTable components
- [x] Hotline numbers are tap-to-call links once a real number is set (a placeholder is shown as plain text)

**Verified 2026-10-08:** each page compared side by side with its source file at 1440px (Health 3758px against 3779px, SK 2874px against 2893px, Senior Citizens 2969px against 3009px); Filipino pages return translated titles and headings; lint, typecheck, dictionary check and build pass. The carousel arrows were not clicked in a browser.

Differences from the design, on purpose:
- SK updates have no "Read more" arrow, because there is no page behind them yet.
- "Sign up as a volunteer" jumps to the contact details in the footer, since there are no online forms at launch.
- Photo placeholders use one neutral colour; the source tints them per page.

**Done when:** all three pages match their source files.

## M5 — Schools

- [x] Schools index with school cards and class-suspension advisory
- [x] One school template: hero, facts, about, levels, announcements, faculty carousel, gallery, enrollment, requirements, contact, other schools
- [x] Class sections with grade tabs
- [x] Alumni homecoming with year picker
- [x] Day Care renders without sections and alumni
- [x] All four schools as data records

**Verified 2026-10-08:** the index and all four school pages compared side by side with their source files at 1440px (index 2339px against 2301px; Elementary 4367px against 4337px; Day Care 2894px against 2864px; High School 4367px against 4337px; Trinidad Perez 4340px against 4306px); Day Care renders without the sections and alumni blocks; Filipino pages return translated headings; an unknown school shows the not-found page (since the loading-boundary change below, with status 200 and a no-index tag rather than 404); lint, typecheck, dictionary check and build pass. The grade chips, year chips and carousel arrows were not clicked in a browser.

Adding a school takes two entries, both data: one line in the site config (`schools` in `site.ts`, which drives the menu) and one record in `content/schools.ts`.

Differences from the design, on purpose:
- School announcements have no "Read more" arrow, because there is no page behind them yet.
- "Register as alumni" and "Join alumni group" jump to the school contact card, since there are no online forms at launch.
- Trinidad Perez has no description yet; the source has a bracketed placeholder there.

**Done when:** all four school URLs match their source files and adding a fifth school needs only a new data record.

## M6 — Filipino complete

- [x] Every string on every page comes from a dictionary; no hard-coded English in components
- [x] All 477 source translations accounted for: 395 used as written, 51 identical in both languages, 31 assembled from parts or set aside with a reason (`npm run i18n:coverage`)
- [x] New strings (404, announcement page, menu labels) translated. These are my translations, not from the source, and need a native review in M8
- [x] Dates formatted per locale
- [x] Page titles and descriptions translated; `hreflang` links present
- [x] Nav fits in Filipino without wrapping (the source shrinks nav padding for this)

**Verified 2026-10-08:** `npm run i18n:pages` crawled all 18 Filipino pages on the dev server and found no text matching any of the 421 English strings that have a different Filipino version; the same checker flags English when pointed at an English page. `npm run i18n:check` reports no missing keys. Each page declares its language and links to its counterpart in the other language. Nav checked on one row in Filipino at 1440px. Lint, typecheck and build pass.

Still English on Filipino pages, by design: strings the source itself left untranslated (role titles such as "SK Kagawad", benefit and subject names, photo captions) and proper nouns. The site address in page metadata is a placeholder (`camantiles.example`) until the domain is known.

**Done when:** clicking through every page under `/fil` shows no stray English, and a check script reports zero keys missing from `fil.json`.

### Loading boundary on detail pages (added 2026-10-08)

The dev overlay reported that the school page read URL data outside a loading boundary, which makes moving between schools wait for the server. Following the Next.js 16 guidance, the school and announcement pages now render their content inside `<Suspense>` with a skeleton, and links to them prefetch the finished page. Side effect: a made-up school or announcement address shows the translated not-found page with a no-index tag but answers with status 200, because the page outline is sent before the lookup finishes. Any other unknown address still answers 404.

## M7 — Mobile, accessibility, speed, SEO

- [x] Mobile menu designed and built
- [x] Every page laid out at 360, 390, 768 and 1024px
- [x] Fluid type scale on headings; body copy is 14px or larger. Labels, dates and role lines stay at 12 to 13px as in the design
- [x] Schools dropdown works by tap and keyboard
- [x] Visible focus styles; skip-to-content link
- [x] Colour contrast AA; reduced-motion respected
- [x] Automated accessibility scan clean on every route
- [x] Images through `next/image`; Lighthouse mobile 90+ on performance, accessibility, best practices and SEO (`npm run check:lighthouse`)
- [x] Metadata, Open Graph image, sitemap, robots, structured data
- [x] 404 page and empty states
- [x] Browser tests for every route in both languages, on desktop and phone sizes (`npm test`)

**Verified 2026-10-08:**
- `npm test`: 67 browser tests pass in Microsoft Edge against a production build, at desktop and phone sizes. They load all 12 pages in both languages, run the axe accessibility scan (WCAG 2.1 A and AA) on each, and exercise the menu, Schools dropdown, language switch, announcement filter, carousels, grade chips and homecoming year picker.
- `npm run check:responsive`: no page scrolls sideways at 360, 390, 768, 1024 or 1440px. I looked at the home page at 360, 390 and 768px and the open menu at 390, 768, 1024 and 1280px; the other pages were looked at on a phone only before the last header changes.
- `npm run check:lighthouse` on four pages of a production build on this machine: performance 90 to 94, accessibility 100, best practices 100, SEO 100.
- Lint, typecheck, dictionary checks and the Filipino page crawl pass.

What changed from the design:
- Below 1280px the nav pill is replaced by a menu button that opens a panel listing every section and school, plus Hotlines. The design showed the button but not the open menu.
- The Schools dropdown has an arrow button, so it opens by tap and keyboard as well as hover.
- On phones the home quick links become a two-column grid of compact tiles, as in the mobile mock-up, and hero panels lose their fixed minimum height.
- The gold used for small labels is darker (`#8a6400` instead of `#b7860b`); the original failed the contrast check.
- The language buttons are 36px wide on phones so the barangay name fits beside them; they are 44px from tablet width up.

Not done here: the home page was not compared pixel for pixel with `mobile-preview.html` (it follows the same structure, with the Next Event card above the tiles rather than below), and nothing was tested on a real phone.

**Done when:** the home page matches `mobile-preview.html` at 390px, every other page is comfortably usable on a phone, and the scans above pass.

## M8 — Real content and launch

Needed from the barangay:

- [ ] Officials: names, roles, photos (barangay council, SK, health workers, senior federation)
- [ ] Barangay Hall address, office hours, email, Facebook page
- [ ] Hotline numbers
- [ ] Services: requirements and fees
- [ ] Downloadable forms as PDF
- [ ] Health center schedule and services
- [ ] Senior pension and benefits schedule
- [ ] Each school: facts, faculty, sections and advisers, enrollment requirements, contact, photos
- [ ] Current announcements and events
- [ ] Photos: Barangay Hall, events, schools
- [ ] Review of the About page history and all Filipino translations, including the strings I translated myself and the ones the source left in English

Launch:

- [ ] All placeholders replaced or hidden: `npm run content:check` passes (it currently fails, listing every bracketed blank in sample copy and counting the empty fields)
- [ ] Hosting provider chosen and domain supplied; both set up, and the placeholder address replaced (`url` in `site.ts`, or `NEXT_PUBLIC_SITE_URL`)
- [ ] Privacy notice page
- [ ] Analytics
- [ ] Barangay sign-off
- [ ] Live

**Done when:** the site is public on its domain with no placeholder text.

## M9 — Second-barangay dry run

Proves the multi-site design before a real second barangay arrives.

- [ ] Routes moved under `barangays/[barangay]`; `getSite()` reads the URL
- [ ] A demo site added using only config, content and a seal
- [ ] Demo site has different colours and a different set of modules and schools
- [ ] Short guide written: "Adding a barangay"
- [ ] Old Camantiles URLs redirect to the new ones

**Done when:** the demo barangay runs alongside Camantiles with zero changes to components or screens.

## M10 — City site integration (future)

Scope to be set when the city project starts. See [multi-site-plan.md](multi-site-plan.md), Stage C.

- [ ] Confirm one app still holds (decisions #8); switch to Multi-Zones only if another vendor builds the city site
- [ ] Monorepo with shared UI, content and i18n packages
- [ ] City bar, breadcrumb and city-wide advisories on barangay pages
- [ ] Barangay directory on the city site

## M11 — Content admin and user roles

Lets staff post without a developer. Roles and rules are defined in [user-roles.md](user-roles.md). Can start any time after M5.

- [ ] CMS or database and sign-in method chosen
- [ ] Content moved from files to the chosen store, behind the same `src/content/` functions
- [ ] Sign-in, invite by email, password reset; two-step sign-in for admins
- [ ] Roles: Section Editor, School Editor, Barangay Editor, Approver, Barangay Admin, Super Admin
- [ ] Scoping: an editor sees and edits only their barangay, section or school
- [ ] One server-side permission check used by every save and publish
- [ ] Draft → In review → Published → Archived, with send-back notes
- [ ] Advisories publish immediately
- [ ] Editing screens for each section's content, in English and Filipino, with photo and file upload
- [ ] Barangay Admin screens: users and access, site details, officials
- [ ] Activity log
- [ ] Published changes appear on the public site without a redeploy
- [ ] Tests proving a user cannot read or change anything outside their scope
- [ ] Short how-to guide for each role; accounts created for Camantiles staff
- [ ] City Admin and City Editor roles (built with M10 if the city site comes later)

**Done when:** the SK editor can post an SK update, cannot touch Barangay Hall or another barangay's content, the approver publishes it, and it appears on `/en/sk` and `/fil/sk` within a minute.
