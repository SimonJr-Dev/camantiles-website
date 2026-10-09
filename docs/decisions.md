# Decisions

## Still needed from you

Facts only you can supply. None of them blocks building; each is needed by the milestone shown.

| Item | Needed by |
| --- | --- |
| Hosting provider (any Node.js host with PostgreSQL: Vercel plus a managed database, a VPS, or similar) | M8 |
| A mail provider for invitation and password-reset emails | M11 stage C |
| Where uploaded photos and PDFs are stored (depends on the host) | M11 stage C |
| Domain name | M8 |
| Name and email of the Barangay Secretary, for the first admin account | M11 |
| Who builds the city site, if that turns out not to be this team | M10 |

## Decided

Numbers 1 to 11 are the original open questions, settled on 2026-10-08 by accepting the proposed defaults. Any of them can be reopened; change the row and note the date.

| # | Date | Decision | Reason |
| --- | --- | --- | --- |
| 1 | 2026-10-08 | **Node.js hosting.** Develop with `npm run dev`; the site is not served by XAMPP's Apache. Provider to be chosen by M8. | Next.js does not run on Apache and PHP hosting. |
| 2 | 2026-10-08 | **Content is files in the repo at launch;** the content admin follows in M11. | Fastest route to a live site. Move M11 ahead of M8 if staff must post from day one. |
| 3 | 2026-10-08 | **Language follows the visitor's browser,** falling back to English. | Serves both audiences without a forced choice. |
| 4 | 2026-10-08 | **Announcements get their own detail pages,** built in M3. | Long announcements and shared links need a page; the design only has cards. |
| 5 | 2026-10-08 | **No online forms at launch.** Register, join and request buttons lead to requirements and contact details. | Collecting personal data needs a backend and Data Privacy Act compliance. |
| 6 | 2026-10-08 | **Placeholder domain** in metadata and sitemap until the real one is supplied. | Not known yet. |
| 7 | 2026-10-08 | **Barangays sit under a path** in the city site: `/barangays/camantiles`. | One deployment, no DNS or certificates per barangay. Hostnames can be added on top later. |
| 8 | 2026-10-08 | **City and barangay sites are one app,** assuming the same team builds both. | Shared components and instant navigation. Multi-Zones remains the fallback if a different vendor builds the city site. |
| 9 | 2026-10-08 | **Posts need approval.** Editors submit; the Barangay Admin or an Approver publishes. Advisories publish immediately. The Barangay Admin can grant an editor publish rights. | Sign-off for official posts, speed for emergencies, flexibility for small teams. |
| 10 | 2026-10-08 | **Each section and school gets its own login:** one editor each for SK, health, seniors and each of the four schools, limited to their own content. | Each office owns its content; the activity log shows who posted what. |
| 11 | 2026-10-08 | **The Barangay Secretary is the Barangay Admin** for Camantiles. | Already the barangay's record keeper; invites everyone else. |
| — | 2026-10-08 | Rebuild in Next.js 16 with React components; do not carry over the source's template runtime. | The runtime exists only to make static HTML dynamic. React does this natively. |
| — | 2026-10-08 | Barangay-specific values live in a site config, never in components. | More barangay sites are planned. |
| — | 2026-10-08 | Each language gets its own URL (`/en`, `/fil`) with keyed dictionaries, replacing the in-browser text swap. | Filipino pages become indexable and shareable; translations stop depending on exact English wording. |
| — | 2026-10-08 | Content is read through functions in `src/content/`, backed by files for now. | A CMS can replace the files later without touching pages. |
| — | 2026-10-08 | The four school pages are one template driven by data. | They differ only in data; Day Care omits two sections. |
| — | 2026-10-08 | Design source kept in `docs/ui-source/` as the visual reference. | Parity checks need it in the repo, not in a Downloads folder. |
| — | 2026-10-08 | Access is a role at a scope (platform, city, barangay, section, school); the public site stays login-free. Roles defined in [user-roles.md](user-roles.md). | Each office owns its own content; the city oversees many barangays. |
| — | 2026-10-08 | Content records carry site, scope, status and author from the start, even while content is files. | Lets logins and approval be added in M11 without reshaping content. |
| — | 2026-10-08 | The second-barangay dry run (M9) waits until after the city site. | No other barangay site is planned before the city site is built. |
| — | 2026-10-08 | The backend is our own database and admin screens: PostgreSQL through Drizzle, sign-in by better-auth. | No monthly CMS fee; the role and scope model fits exactly; the same system serves the city site later. PostgreSQL runs on every hosting option still open. |
| — | 2026-10-08 | The staff area is in English only for now. | Fewer screens to translate while they are still changing; Filipino can be added later. |

Add a row whenever a new choice is made.
