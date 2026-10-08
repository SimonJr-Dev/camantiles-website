import type { Site } from "../types";

export const camantiles: Site = {
  slug: "camantiles",
  // Placeholder until the real domain is known (docs/decisions.md, #6).
  url: "https://camantiles.example",
  name: "Barangay Camantiles",
  shortName: "Camantiles",
  city: { en: "Urdaneta City", fil: "Lungsod ng Urdaneta" },
  province: "Pangasinan",
  seal: {
    src: "/sites/camantiles/seal.png",
    icon: "/sites/camantiles/seal-192.png",
  },
  locales: ["en", "fil"],
  defaultLocale: "en",
  modules: ["hall", "health", "sk", "seniors", "schools"],
  schools: [
    {
      slug: "day-care-center",
      name: { en: "Camantiles Day Care Center", fil: "Camantiles Day Care Center" },
      navLabel: { en: "Day Care Center", fil: "Day Care Center" },
      level: { en: "Early childhood learning", fil: "Pag-aaral sa maagang pagkabata" },
    },
    {
      slug: "elementary-school",
      name: { en: "Camantiles Elementary School", fil: "Camantiles Elementary School" },
      navLabel: { en: "Elementary School", fil: "Elementary School" },
      level: { en: "Kindergarten to Grade 6", fil: "Kindergarten hanggang Baitang 6" },
    },
    {
      slug: "trinidad-perez-elementary-school",
      name: {
        en: "Trinidad Perez Elementary School",
        fil: "Trinidad Perez Elementary School",
      },
      navLabel: {
        en: "Trinidad Perez Elementary School",
        fil: "Trinidad Perez Elementary School",
      },
      level: { en: "Kindergarten to Grade 6", fil: "Kindergarten hanggang Baitang 6" },
    },
    {
      slug: "high-school",
      name: { en: "Camantiles High School", fil: "Camantiles High School" },
      navLabel: { en: "High School", fil: "High School" },
      level: { en: "Junior and Senior High", fil: "Junior at Senior High" },
    },
  ],
  homeQuickLinks: ["hall", "sk", "seniors", "schools"],
  // Still to be supplied by the barangay (docs/milestones.md, M8).
  contact: { street: null, hours: null, email: null },
  hotlines: [
    { id: "hall", label: { en: "Barangay Hall", fil: "Barangay Hall" }, number: null },
    { id: "tanod", label: { en: "Barangay Tanod", fil: "Barangay Tanod" }, number: null },
    { id: "health", label: { en: "Health Center", fil: "Health Center" }, number: null },
    {
      id: "city",
      label: { en: "City Disaster Office", fil: "City Disaster Office" },
      number: null,
    },
  ],
  social: { facebook: null },
  credits: "CRWD Philippines",
};
