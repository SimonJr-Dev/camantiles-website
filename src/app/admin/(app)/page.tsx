import { ArrowRight, MapPin, ShieldCheck } from "lucide-react";

import { canSomewhere } from "@/auth/can";
import { ROLE_LABELS } from "@/auth/roles";
import { requireUser } from "@/auth/session";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/features/admin/status-badge";
import { MODULES } from "@/sites/modules";
import { getSite } from "@/sites";
import type { SiteModule } from "@/sites/types";

const SECTION_NAMES: Record<SiteModule, string> = {
  hall: "Barangay Hall",
  health: "Health Center",
  sk: "Sangguniang Kabataan",
  seniors: "Senior Citizens",
  schools: "Schools",
};

/** "Barangay Camantiles · Sangguniang Kabataan", in words staff use. */
function place(site: string | null, scope: string | null): string {
  if (!site) return "All sites";
  const found = getSite(site);
  if (!scope) return `${found?.name ?? site} · whole barangay`;
  const school = found?.schools.find((item) => item.slug === scope);
  const section = scope in MODULES ? SECTION_NAMES[scope as SiteModule] : scope;
  return `${found?.name ?? site} · ${school?.name.en ?? section}`;
}

const STEPS = [
  { status: "draft", text: "You write it. Only you and your approvers can see it." },
  { status: "review", text: "You send it for approval. It waits here until someone checks it." },
  { status: "published", text: "An approver publishes it. It appears on the website." },
  { status: "archived", text: "It is taken off the website but kept on record." },
] as const;

export default async function AdminHome() {
  const current = await requireUser();
  const now = new Date();
  const live = current.assignments.filter((item) => !item.endsAt || item.endsAt > now);
  const writes = canSomewhere(current, "content.edit");
  const approves = canSomewhere(current, "content.publish");

  return (
    <>
      <header className="flex flex-col gap-1.5">
        <h1 className="text-[clamp(1.75rem,3vw,2.25rem)] leading-tight font-extrabold">
          Welcome, {current.name}
        </h1>
        <p className="text-muted-foreground">
          {live.length === 0
            ? "Your account is ready, but it has no access yet."
            : writes && approves
              ? "You can write content and publish it."
              : writes
                ? "You can write content and send it for approval."
                : approves
                  ? "You approve and publish what others have written."
                  : "You can view the staff area."}
        </p>
      </header>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <Card className="flex flex-col gap-4 p-6 sm:p-7">
          <div className="flex items-center gap-2.5">
            <ShieldCheck aria-hidden className="size-5 text-link" strokeWidth={2} />
            <h2 className="text-xl font-extrabold">Your access</h2>
          </div>
          {live.length === 0 ? (
            <p className="rounded-2xl bg-background p-4 text-muted-foreground">
              Ask your Barangay Admin to give you a role. Until then there is nothing for you to
              edit.
            </p>
          ) : (
            <ul aria-label="Your access" className="flex flex-col gap-2.5">
              {live.map((item) => (
                <li
                  key={`${item.role}-${item.site}-${item.scope}`}
                  className="flex flex-col gap-1.5 rounded-2xl bg-background px-4 py-3.5"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold">{ROLE_LABELS[item.role]}</span>
                    {item.canPublish ? (
                      <span className="rounded-full bg-hall px-2.5 py-0.5 text-xs font-bold text-hall-foreground">
                        Can publish
                      </span>
                    ) : null}
                  </div>
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin aria-hidden className="size-4 shrink-0" strokeWidth={2} />
                    {place(item.site, item.scope)}
                  </span>
                </li>
              ))}
            </ul>
          )}
          <p className="text-sm text-muted-foreground">
            You only see and change what belongs to the places listed here.
          </p>
        </Card>

        <Card className="flex flex-col gap-4 p-6 sm:p-7">
          <h2 className="text-xl font-extrabold">How publishing works</h2>
          <ol className="flex flex-col gap-3.5">
            {STEPS.map((step, index) => (
              <li key={step.status} className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <StatusBadge status={step.status} />
                  {index < STEPS.length - 1 ? (
                    <ArrowRight aria-hidden className="size-4 text-muted-foreground" />
                  ) : null}
                </div>
                <span className="text-sm leading-normal text-muted-foreground">{step.text}</span>
              </li>
            ))}
          </ol>
          <p className="rounded-2xl bg-accent-soft p-3.5 text-sm font-semibold text-accent-ink">
            Advisories, such as typhoon or class-suspension notices, go live at once without
            waiting for approval.
          </p>
        </Card>
      </div>

      <Card className="flex flex-col gap-2 p-6 sm:p-7">
        <h2 className="text-xl font-extrabold">Editing screens are on the way</h2>
        <p className="max-w-[64ch] text-muted-foreground">
          The sections marked “Soon” in the menu are being built. Announcements come first. Until
          then, content on the website is updated by the development team.
        </p>
      </Card>
    </>
  );
}
