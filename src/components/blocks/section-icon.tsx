import { GraduationCap, Heart, HeartPulse, House, Users, type LucideProps } from "lucide-react"

import type { SiteModule } from "@/sites/types"

const icons = {
  hall: House,
  health: HeartPulse,
  sk: Users,
  seniors: Heart,
  schools: GraduationCap,
} satisfies Record<SiteModule, unknown>

function SectionIcon({ module, ...props }: LucideProps & { module: SiteModule }) {
  const Icon = icons[module]
  return <Icon aria-hidden {...props} />
}

export { SectionIcon }
