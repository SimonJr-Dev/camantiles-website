@AGENTS.md

# Barangay Camantiles website

Planning docs live in `docs/`. Read the relevant one before starting work:

- `docs/architecture.md` — structure, routing, languages, content layer
- `docs/design-system.md` — tokens and component list
- `docs/content-model.md` — data shapes per page
- `docs/user-roles.md` — roles, scopes, permissions and the publishing flow
- `docs/multi-site-plan.md` — how this fits more barangays and the city site
- `docs/milestones.md` — progress tracker; tick items and update the status table as work is finished and verified
- `docs/decisions.md` — open questions and the decision log
- `docs/ui-source/` — the original HTML design; the visual reference for every page

Rules that hold across the codebase:

- No barangay-specific text, colours or contact details in components. They come from `src/sites/<slug>/`.
- Internal links go through `siteHref()`.
- User-facing strings come from dictionaries, in both `en` and `fil`.
- Run with `npm run dev`, which also starts the local PostgreSQL database. This is a Node app; it is not served by XAMPP's Apache.
- Every admin save calls `authorize()` from `src/auth/session.ts`. Never check permissions only in the UI.
- After changing `src/db/schema.ts`, run `npm run db:generate` and commit the new file in `drizzle/`.
- Checks: `npm run lint`, `npm run typecheck`, `npm run test:unit`, `npm test` (browser tests on a production build).
