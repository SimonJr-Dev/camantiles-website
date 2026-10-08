# Content Model

The shapes of data each page needs, derived from the `renderVals()` data in [ui-source/](ui-source/). These become TypeScript types in `src/sites/types.ts` and `src/content/`.

Text that visitors read is stored per locale. `Localized` below means `{ en: string; fil: string }`.

## Site config — `src/sites/camantiles/site.ts`

| Field | Example | Notes |
| --- | --- | --- |
| `slug` | `camantiles` | URL and folder name |
| `name` | Barangay Camantiles | |
| `shortName` | Camantiles | used in "About Camantiles", hero copy |
| `city`, `province` | Urdaneta City, Pangasinan | |
| `seal` | `/sites/camantiles/seal.png` | logo, favicon, Open Graph |
| `locales`, `defaultLocale` | `['en','fil']`, `en` | |
| `modules` | `['hall','health','sk','seniors','schools']` | drives nav, quick links, footer |
| `schools` | 4 slugs | drives the Schools dropdown |
| `contact` | address, office hours, email | placeholder today |
| `hotlines` | label and number pairs | Barangay Hall, Tanod, Health Center, City Disaster Office |
| `social` | Facebook URL | placeholder today |
| `theme` | `primary`, `link`, `accent` | optional overrides |
| `credits` | CRWD Philippines | footer |

## Shared types

| Type | Fields | Used on |
| --- | --- | --- |
| `Announcement` | `slug`, `category` (`hall` \| `sk` \| `seniors` \| `schools` \| `health`), `date`, `title`, `summary`, `body?`, `image?`, `featured?` | Home, Barangay Hall, SK, Health, School |
| `Event` | `slug`, `date`, `time?`, `title`, `host`, `location?` | Home (next event, upcoming list) |
| `Advisory` | `level`, `text`, `href?`, `expires?` | Home advisory pill, Schools class suspension |
| `Person` | `name`, `role`, `photo?`, `group` | officials, council, SK, health workers, faculty |
| `Service` | `slug`, `name`, `requirements?`, `fee?`, `processingTime?` | Home services card |
| `Download` | `title`, `file`, `size?` | Barangay Hall forms |
| `ScheduleRow` | `day`, `service`, `time`, `notes?` | Health clinic days, Seniors payouts |

### Fields every editable record carries

These exist so roles and approval can be added without reshaping content. See [user-roles.md](user-roles.md).

| Field | Values | Purpose |
| --- | --- | --- |
| `site` | `camantiles` | which barangay owns it |
| `scope` | a module (`hall`, `health`, `sk`, `seniors`) or a school slug | which editors may change it |
| `status` | `draft` \| `review` \| `published` \| `archived` | public pages show `published` only |
| `author`, `publishedBy` | user id, or `system` for file content | activity log |
| `createdAt`, `updatedAt`, `publishedAt`, `expiresAt?` | ISO timestamps | ordering, auto-expiry |

While content is files in the repo, these are filled with fixed values (`status: 'published'`, `author: 'system'`).

Users and access, added in M11:

| Type | Fields |
| --- | --- |
| `User` | `id`, `name`, `email`, `active`, `twoStepEnabled` |
| `Assignment` | `userId`, `role`, `site?`, `scope?`, `canPublish`, `endsAt?` |
| `ActivityEntry` | `userId`, `action`, `resource`, `site`, `at` |

`date` is an ISO date string. The design shows `[MON] 00` badges; format per locale at render time.

## Per page

**Home** — `advisory?`, `nextEvent`, `quickLinks` (generated from `modules`), `news` (latest 4 announcements across categories), `events` (next 4), `services` (4), `officials` (5).

**About** — `facts` (4 chips), `chapters[]` each with `id`, `title`, `body` (rich text), optional pull-quote and photo, `earlyAdministrators[]`, closing statement. This is long-form copy; store as one MDX or structured file per locale.

**Barangay Hall** — `featured` announcement, `announcements[]` with category filter, `council[]` (Sangguniang Barangay), `forms[]` downloads.

**Health** — `clinicHours`, `services[]` (title, description, icon), `schedule[]`, `bring[]`, `updates[]`, `team[]`, `emergency` (numbers).

**SK** — `programs[]` (kind, title, description), `updates[]`, `transparency[]` (documents or figures), `council[]`.

**Senior Citizens** — `president` (Person), `payouts[]` (benefit, schedule, venue), `health[]`, `activities[]`, `reqs[]` (registration requirements).

**Schools index** — `schools[]` summary cards, `suspensionAdvisory?`.

**School** — one record per school:

| Field | Notes |
| --- | --- |
| `slug`, `name`, `level` | level is the eyebrow, such as "Kindergarten to Grade 6" |
| `facts[]` | label and value chips |
| `about` | rich text |
| `levels[]` | grade levels offered |
| `news[]` | announcements |
| `faculty[]` | Person |
| `sections?` | by grade: section name and adviser. Absent for Day Care |
| `alumni?` | homecoming description, activities, photos by year. Absent for Day Care |
| `gallery[]`, `galleryTitle` | |
| `enrollTitle`, `reqs[]` | enrollment |
| `contact` | address, phone, email |

"Other schools" is computed from the site's school list, not stored.

## Placeholders

The source is full of `[Name]`, `[Date]`, `[Number]` and `[Photo]`. Keep them as explicit `null` values in content files, and have components render a visible placeholder in development and hide the element in production. That way a missing phone number never ships as the literal text "[Number]". The list of what the barangay still has to supply is tracked in [milestones.md](milestones.md) under M8.
