# Design System

Tokens and components extracted from [ui-source/](ui-source/). The source uses raw hex values and inline styles; this file gives them names so they can live in `src/app/globals.css` and be overridden per barangay.

## Character

Soft, rounded, card-based. Off-white page, white cards with very soft shadows, one deep green hero panel, gold as the single loud accent, near-black footer. Tight heading tracking, heavy weights. Pills everywhere: nav, buttons, tags, chips.

## Colour

### Core, themable per site

| Token | Value | Used for |
| --- | --- | --- |
| `--background` | `#F4F5F1` | page background |
| `--foreground` | `#0B1712` | text, dark buttons, footer panel |
| `--card` | `#FFFFFF` | cards, nav pill |
| `--muted` | `#EEF1EC` | hover fills, inset rows |
| `--muted-foreground` | `#5A6660` | secondary text |
| `--subtle-foreground` | `#3E4A44` | nav links |
| `--primary` | `#0F3D2E` | hero panel, active nav item, primary button |
| `--primary-foreground` | `#FFFFFF` | text on primary |
| `--primary-soft-foreground` | `#C6D9CF` | body text on primary |
| `--link` | `#0F5A3F` | links, eyebrow labels |
| `--accent` | `#F2B705` | gold: CTA button, next-event card, active language |
| `--accent-foreground` | `#0B1712` | text on gold |
| `--destructive` | `#F04438` | hotline dot |
| `--inverse-foreground` | `#C9D3CE` | footer text |
| `--inverse-muted` | `#7F8C86` | footer labels |
| `--inverse-border` | `#24302B` | footer divider |

`--primary`, `--link` and `--accent` are the three values another barangay is most likely to change. They come from the seal: dark green ring, gold border.

### Section colours, fixed across all sites

Each section has a tinted background and a strong foreground, used for tags, icon tiles and highlights.

| Section | Soft | Strong |
| --- | --- | --- |
| Barangay Hall | `#E3F1E9` | `#0F5A3F` |
| SK | `#E3E9FD` | `#1E40AF` |
| Senior Citizens | `#FDEEE0` | `#9A4508` |
| Schools | `#DFF2F5` | `#0B5563` |
| Advisory / alert | `#FEE4E2` | `#B42318` |
| Health Care | `#FDE7EC` | `#9F1239` |

Name them `--section-hall`, `--section-hall-foreground`, and so on.

## Typography

- **Family:** Plus Jakarta Sans, weights 400 to 800, italic 400 and 600 on the About page only. Load with `next/font/google`; it replaces the Geist fonts in the starter layout.
- **Headings:** weight 800, letter-spacing −0.03em (−0.045em on the hero), line-height about 1.
- **Eyebrow labels:** 12 to 13px, weight 700 to 800, uppercase, letter-spacing 0.08 to 0.1em.

The source sizes are fixed pixels. Proposed scale, fluid so one definition serves phone and desktop:

| Role | Source | Proposed |
| --- | --- | --- |
| Display (home hero) | 68px | `clamp(40px, 6vw, 68px)` |
| H1 (section pages) | 58 to 64px | `clamp(36px, 5.2vw, 62px)` |
| H2 | 40 to 44px | `clamp(28px, 3.6vw, 44px)` |
| H3 / card title | 19 to 28px | 20 / 24 / 28px |
| Lead | 18px | 18px |
| Body | 15 to 16px | 16px |
| Small | 13 to 14px | 14px |
| Caption / eyebrow | 12px | 12px, labels only |
| Footer wordmark | `clamp(44px, 8vw, 112px)` | keep |

Source body copy at 12 to 13px moves up to 14px. Seniors are a core audience.

## Shape, depth, layout

| Token | Value | Used for |
| --- | --- | --- |
| `--radius-pill` | 999px | nav, buttons, tags, chips |
| `--radius-panel` | 32px | hero, footer, large panels |
| `--radius-card` | 24px | cards |
| `--radius-inner` | 14 to 20px | icon tiles, photos inside cards, list rows |
| `--shadow-card` | `0 1px 2px rgb(11 23 18 / .05), 0 16px 40px -20px rgb(11 23 18 / .18)` | cards |
| `--shadow-pill` | `0 1px 2px rgb(11 23 18 / .06), 0 8px 24px -14px rgb(11 23 18 / .25)` | nav, language toggle |
| `--shadow-popover` | `0 1px 2px rgb(11 23 18 / .06), 0 24px 48px -16px rgb(11 23 18 / .3)` | dropdown |

- Content width 1240px, 24px side padding (16px on phones).
- 20px gap between cards and panels; 44 to 48px above each section.
- Grids are `repeat(auto-fit, minmax(190–270px, 1fr))`. Keep this approach; it is why the design mostly survives narrow screens.
- Only motion in the source: tiles lift 4px on hover over 0.2s. Respect `prefers-reduced-motion`.

## Components to build

Shell
- `SiteHeader`, `MainNav` (with Schools dropdown), `MobileNav` (not designed, see below), `LanguageSwitch`, `HotlinesButton`, `SiteFooter`

Primitives
- `Button` (variants: primary green, accent gold, dark, white, ghost-on-dark; all pill)
- `Card`, `Panel` (the 32px coloured blocks), `Tag` (section-coloured), `Eyebrow`, `Chip` (filter and tab), `IconTile`, `ArrowLink` (the diagonal-arrow circle), `ListRow`, `SectionHeading` (eyebrow, H2, optional action), `PhotoPlaceholder` / `Photo`, `DateBadge`, `FactChip`

Composites
- `PageHero`, `AdvisoryBar`, `QuickLinkTile`, `NewsCard`, `EventList`, `PersonCard`, `Carousel`, `ScheduleTable`, `RequirementList`, `DownloadList`, `TableOfContents`, `ChapterSection`, `SchoolCard`, `EmergencyBlock`, `CallToActionPanel`

The repo already has shadcn set up (`base-nova` style on Base UI, lucide icons). Use it for behaviour-heavy pieces: navigation menu, sheet for the mobile menu, tabs. Restyle to the tokens above; do not import the default shadcn look.

Icons in the source are hand-written SVG paths. Replace with the nearest lucide icon.

## Rules

- No raw hex in components. Use tokens.
- No "Camantiles" or "Urdaneta" in components. Names, seal and contact details come from the site config.
- Every component works at 360px wide.
- Tap targets at least 44px. The source already does this for the language toggle and arrow buttons.
- Text contrast meets WCAG AA. Check `--inverse-muted` on the footer and any 12px muted text during M7.

## Not in the handoff, to be designed during the build

Mobile menu, tablet layouts for every page except home, announcement detail page, 404 page, empty states (no announcements, no events), focus styles, and tap behaviour for the Schools dropdown. Use the `impeccable` and `frontend-design` skills for these, held to the tokens above.
