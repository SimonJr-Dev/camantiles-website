import { Suspense, type ReactNode } from "react";

import { ROLE_LABELS } from "@/auth/roles";
import { requireUser, type CurrentUser } from "@/auth/session";
import { AdminNav } from "@/features/admin/admin-nav";
import { navFor } from "@/features/admin/nav";
import { getSite } from "@/sites";

/** "Barangay Admin", or "Section Editor +1 more" for someone with several roles. */
function roleSummary(current: CurrentUser): string {
  const now = new Date();
  const live = current.assignments.filter((item) => !item.endsAt || item.endsAt > now);
  if (live.length === 0) return "No access yet";
  const first = ROLE_LABELS[live[0].role];
  return live.length > 1 ? `${first} +${live.length - 1} more` : first;
}

// Reads the session, so it runs per request behind the boundary below. Each
// page still checks the user itself: this gate is a convenience, not the protection.
async function SignedIn({ children }: { children: ReactNode }) {
  const current = await requireUser();
  const site = getSite();

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <AdminNav
        groups={navFor(current)}
        site={{ name: site?.name ?? "Admin", seal: site?.seal.src ?? "" }}
        user={{ name: current.name, email: current.email, role: roleSummary(current) }}
      />
      <main id="content" className="min-w-0 grow px-4 py-6 sm:px-8 lg:py-10">
        <div className="mx-auto flex max-w-[1040px] flex-col gap-6">{children}</div>
      </main>
    </div>
  );
}

function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center text-muted-foreground" role="status">
      Loading…
    </div>
  );
}

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <Suspense fallback={<Loading />}>
      <SignedIn>{children}</SignedIn>
    </Suspense>
  );
}
