# UI Source Analysis

What the design handoff contains, how it works, and what it does not cover.
Source: `barangay-camantiles-website.zip`, copied unchanged to [ui-source/](ui-source/). Open any file there in a browser to see the reference.

## What we received

12 standalone HTML files and one image. No build step, no shared CSS or JS file, no backend.

| File | Page | Becomes route |
| --- | --- | --- |
| `index.html` | Home | `/` |
| `about-camantiles.html` | History and story of the barangay (7 chapters) | `/about` |
| `barangay-hall.html` | Announcements, council, downloadable forms | `/barangay-hall` |
| `health-care.html` | Barangay Health Center | `/health` |
| `sk.html` | Sangguniang Kabataan | `/sk` |
| `senior-citizens.html` | Federation of Senior Citizens | `/senior-citizens` |
| `schools.html` | Schools index | `/schools` |
| `day-care-center.html` | School detail | `/schools/day-care-center` |
| `elementary-school.html` | School detail | `/schools/elementary-school` |
| `trinidad-perez-elementary-school.html` | School detail | `/schools/trinidad-perez-elementary-school` |
| `high-school.html` | School detail | `/schools/high-school` |
| `mobile-preview.html` | 390px mock of the home page only | not a route, reference only |
| `seal.png` | Barangay seal, 512×512, used as logo and favicon | `public/` asset |

## How each file is built

Every page repeats the same four parts inline:

1. **Styles.** About 25 lines of class CSS (`.nav`, `.card`, `.btn`, `.eyebrow`, `.tile`, `.row`, `.ph`, `.dd`, `.chip`, `.arrow`, `.lang-switch`). Everything else, roughly 35 to 100 elements per page, is styled with inline `style="…"` attributes.
2. **A `<template id="tpl">`** holding the page markup with `{{value}}` placeholders and two custom tags: `<sc-for list as>` (loop) and `<sc-if value>` (conditional).
3. **A ~80 line runtime** (`DCLogic`, `__mount`) that clones the template, fills placeholders, wires `onClick`, and re-renders on `setState`. Identical on every page.
4. **A page script**: a `Component` class whose `renderVals()` returns the page's data arrays and click handlers.

This maps cleanly to React: the template is JSX, `renderVals()` is the data layer, `setState` is `useState`, `sc-for` is `.map()`. None of the runtime is carried over.

## Language switching

- An EN / FIL toggle sits in the header of every page.
- One dictionary, `window.__FIL`, is embedded identically in all 12 files: about 477 exact-match strings plus 6 regex patterns.
- It is keyed by the **English sentence**. On toggle, a script walks every text node, looks the English text up, and swaps it in place. It also translates `aria-label`, `alt`, and the page title, and stores the choice in `localStorage` under `camantiles-lang`.
- Consequence: Filipino never exists in the HTML the server sends, so search engines and link previews only ever see English, and any copy edit silently breaks its translation.

The 477 translations are real and reusable. See [architecture.md](architecture.md#languages) for how they are migrated.

## Shared shell

Identical on all 11 desktop pages:

- **Header**, sticky with a blurred background: seal and name, pill-shaped nav (Home, About Camantiles, Barangay Hall, Health Care, SK, Seniors, Schools with a 4-item dropdown), language toggle, black "Hotlines" button that jumps to the footer.
- **Footer**, a dark rounded panel: Barangay Hall address and hours, emergency hotlines, explore links, Facebook, a very large "Barangay Camantiles." wordmark with the seal, copyright, and "Designed and developed by CRWD Philippines".

## Page inventory

| Page | Sections | Interactive parts |
| --- | --- | --- |
| Home | Advisory pill, hero, photo and "Next event" card, 4 quick-link tiles, news grid with upcoming-events sidebar, services card, officials grid | none |
| About | Hero with 4 fact chips (Jan 8, 1858 · Kamantilis · 1987 · 6,500+ residents), 7 chapters with a sticky table of contents, closing statement | table-of-contents anchors |
| Barangay Hall | Hero, featured announcement, filterable announcement list, Sangguniang Barangay council, downloadable forms sidebar | category filter chips |
| Health Care | Hero with clinic hours, services grid, weekly schedule table, what to bring, advisories, health-worker carousel, emergency block | carousel arrows |
| SK | Hero, programs, latest updates, transparency board, council, "want to help" call to action | none |
| Senior Citizens | Hero with federation president, pension and benefits table, health and wellness, activities, how to register, family call to action | none |
| Schools | Hero, 3 school cards, class-suspension advisories | none |
| School detail | Hero and fact chips, about, grade levels, announcements, faculty carousel, class sections by grade, alumni homecoming with year picker, gallery, enrollment, requirements, contact, other schools | carousel arrows, grade tabs, year chips |

The four school pages are one template. Elementary and Trinidad Perez differ in 32 lines (names and data). High School differs in data only. Day Care is the same template without the class-sections and alumni blocks.

## What is real and what is placeholder

Real copy: the About page history, all headings and descriptions, service names, role titles, the Filipino translations, the seal.

Placeholder, still needed from the barangay: every `[Name]`, `[Date]`, `[Number]`, `[Photo]`, street address, office hours, email, hotline numbers, Facebook page, announcement content, schedules, fees, and downloadable form files. All photos are striped placeholder boxes.

## Gaps the build must close

These are not designed or not functional in the source. Each has a milestone in [milestones.md](milestones.md).

1. **No mobile design beyond the home page.** There are zero `@media` rules; pages rely on flex-wrap. The pill nav wraps into several rows on a phone. The mobile mock shows a menu button but no open menu.
2. **Fixed type sizes.** Headings are set at 44 to 68px with no scaling, and 12px text is the single most-used size (114 uses). Both need a responsive scale and a readability pass.
3. **Dropdown is hover-only.** It opens on hover and keyboard focus but has no tap behaviour for touch screens.
4. **No detail pages.** Announcements, events, programs and officials are cards that link back to a section page. There is nothing to click through to.
5. **No forms.** There are no inputs anywhere. "How to register", "Want to help", "Open calendar" and "Downloadable forms" are buttons with no destination.
6. **No real contact links.** No `tel:`, `mailto:` or external links, so hotlines cannot be tapped to call.
7. **No 404, search, loading or empty states.**
8. **Tenant values are hard-coded.** "Camantiles", "Urdaneta City", the seal and the colours are typed directly into markup on every page. This is the main thing the architecture changes, because more barangays are coming.
