import { fileMeta } from "@/content/meta";
import type { Person, SiteContent } from "@/content/types";

import { about } from "./about";
import { health } from "./health";
import { schools } from "./schools";
import { seniors } from "./seniors";
import { sk } from "./sk";

const SITE = "camantiles";
const same = (text: string) => ({ en: text, fil: text });

const official = (id: string, role: string, scope = "hall"): Person => ({
  ...fileMeta(SITE, scope),
  id,
  name: null,
  role: same(role),
  group: "barangay",
});

// Sample items from the design. Dates, names and the advisory text are null
// until the barangay supplies them, and some sample sentences still contain
// bracketed blanks; `npm run content:check` lists them (docs/milestones.md, M8).
export const content: SiteContent = {
  advisory: null,

  announcements: [
    {
      ...fileMeta(SITE, "hall"),
      slug: "general-barangay-assembly",
      category: "hall",
      date: null,
      pinned: true,
      title: { en: "General Barangay Assembly", fil: "Pangkalahatang Asembleya ng Barangay" },
      summary: {
        en: "All residents are invited to the assembly at the covered court.",
        fil: "Inaanyayahan ang lahat ng residente sa asembleya sa covered court.",
      },
      body: {
        en: "All residents are encouraged to attend. The agenda includes the barangay development plan and project updates.",
        fil: "Hinihikayat ang lahat ng residente na dumalo. Kasama sa agenda ang plano sa pagpapaunlad ng barangay at mga update sa proyekto.",
      },
    },
    {
      ...fileMeta(SITE, "sk"),
      slug: "inter-purok-basketball-league-registration",
      category: "sk",
      date: null,
      title: {
        en: "Inter-Purok Basketball League registration",
        fil: "Pagpaparehistro sa Inter-Purok Basketball League",
      },
      summary: {
        en: "Team registration is now open for youth residents.",
        fil: "Bukas na ang pagpaparehistro ng koponan para sa mga kabataang residente.",
      },
    },
    {
      ...fileMeta(SITE, "seniors"),
      slug: "social-pension-payout-schedule",
      category: "seniors",
      date: null,
      title: {
        en: "Social pension payout schedule",
        fil: "Iskedyul ng payout ng social pension",
      },
      summary: {
        en: "Schedule, venue and requirements for registered seniors.",
        fil: "Iskedyul, lugar at kailangan para sa mga rehistradong senior.",
      },
    },
    {
      ...fileMeta(SITE, "schools"),
      slug: "early-enrollment-next-school-year",
      category: "schools",
      date: null,
      title: {
        en: "Early enrollment for next school year",
        fil: "Maagang enrollment para sa susunod na taong-aralan",
      },
      summary: {
        en: "Registration dates and requirements for all three schools.",
        fil: "Mga petsa ng pagpaparehistro at kailangan para sa lahat ng paaralan.",
      },
    },
    {
      ...fileMeta(SITE, "hall"),
      slug: "weather-advisory-and-evacuation-reminders",
      category: "advisory",
      date: null,
      title: {
        en: "Weather advisory and evacuation reminders",
        fil: "Abiso sa panahon at paalala sa paglikas",
      },
      summary: {
        en: "Residents in low-lying puroks are advised to prepare go-bags. Evacuation center: [Venue].",
        fil: "Pinapayuhan ang mga residente sa mabababang purok na maghanda ng go-bag. Evacuation center: [Lugar].",
      },
    },
    {
      ...fileMeta(SITE, "hall"),
      slug: "schedule-of-barangay-clearance-release",
      category: "hall",
      date: null,
      title: {
        en: "Schedule of barangay clearance release",
        fil: "Iskedyul ng paglabas ng barangay clearance",
      },
      summary: {
        en: "Clearances requested this week can be claimed from [Time]. Bring a valid ID.",
        fil: "Maaaring kunin ang mga clearance na hiniling ngayong linggo simula [Oras]. Magdala ng valid ID.",
      },
    },
    {
      ...fileMeta(SITE, "hall"),
      slug: "barangay-clean-up-drive",
      category: "hall",
      date: null,
      title: same("Barangay clean-up drive"),
      summary: {
        en: "Join the community clean-up across all puroks. Assembly at [Time].",
        fil: "Makiisa sa paglilinis ng komunidad sa lahat ng purok. Pagtitipon sa [Oras].",
      },
    },
  ],

  events: [
    {
      ...fileMeta(SITE, "hall"),
      slug: "barangay-clean-up-drive",
      date: null,
      time: null,
      title: same("Barangay Clean-Up Drive"),
      host: same("Barangay Hall"),
      location: { en: "All puroks", fil: "Lahat ng purok" },
    },
    {
      ...fileMeta(SITE, "sk"),
      slug: "youth-leadership-seminar",
      date: null,
      time: null,
      title: { en: "Youth Leadership Seminar", fil: "Seminar sa Pamumuno ng Kabataan" },
      host: same("Sangguniang Kabataan"),
    },
    {
      ...fileMeta(SITE, "seniors"),
      slug: "free-blood-pressure-check",
      date: null,
      time: null,
      title: { en: "Free Blood Pressure Check", fil: "Libreng Pagkuha ng Blood Pressure" },
      host: same("Senior Citizens"),
    },
    {
      ...fileMeta(SITE, "elementary-school"),
      slug: "parent-teacher-meeting",
      date: null,
      time: null,
      title: { en: "Parent-Teacher Meeting", fil: "Pulong ng mga Magulang at Guro" },
      host: same("Elementary School"),
    },
  ],

  services: [
    { ...fileMeta(SITE, "hall"), slug: "barangay-clearance", name: same("Barangay Clearance") },
    {
      ...fileMeta(SITE, "hall"),
      slug: "certificate-of-residency",
      name: same("Certificate of Residency"),
    },
    {
      ...fileMeta(SITE, "hall"),
      slug: "certificate-of-indigency",
      name: same("Certificate of Indigency"),
    },
    { ...fileMeta(SITE, "hall"), slug: "business-clearance", name: same("Business Clearance") },
  ],

  downloads: [
    {
      ...fileMeta(SITE, "hall"),
      slug: "barangay-clearance-request",
      title: {
        en: "Barangay Clearance Request",
        fil: "Kahilingan para sa Barangay Clearance",
      },
      file: null,
      format: "PDF",
    },
    {
      ...fileMeta(SITE, "hall"),
      slug: "certificate-of-residency",
      title: same("Certificate of Residency"),
      file: null,
      format: "PDF",
    },
    {
      ...fileMeta(SITE, "hall"),
      slug: "certificate-of-indigency",
      title: same("Certificate of Indigency"),
      file: null,
      format: "PDF",
    },
    {
      ...fileMeta(SITE, "hall"),
      slug: "business-clearance-application",
      title: {
        en: "Business Clearance Application",
        fil: "Aplikasyon para sa Business Clearance",
      },
      file: null,
      format: "PDF",
    },
  ],

  // In order of rank: the home page shows the first five.
  people: [
    official("punong-barangay", "Punong Barangay"),
    official("kagawad-1", "Barangay Kagawad"),
    official("kagawad-2", "Barangay Kagawad"),
    official("sk-chairperson", "SK Chairperson", "sk"),
    official("barangay-secretary", "Barangay Secretary"),
    official("barangay-treasurer", "Barangay Treasurer"),
  ],

  about,
  health,
  sk,
  seniors,
  schools,
};
