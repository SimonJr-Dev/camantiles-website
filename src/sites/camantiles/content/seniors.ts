import type { SeniorsContent } from "@/content/sections";

// Federation of Senior Citizens page.
// Sample items from the design (docs/ui-source). Fields set to null are still
// to be supplied by the barangay.
export const seniors: SeniorsContent = {
  "hero": {
    "titleLine1": {
      "en": "Caring for our",
      "fil": "Pag-aalaga sa ating mga"
    },
    "titleLine2": {
      "en": "lolo and lola.",
      "fil": "lolo at lola."
    },
    "lead": {
      "en": "Pension schedules, health programs and activities from the Federation of Senior Citizens, in large, easy-to-read text.",
      "fil": "Iskedyul ng pensyon, mga programang pangkalusugan at gawain mula sa Federation of Senior Citizens, sa malaki at madaling basahing teksto."
    }
  },
  "president": {
    "name": null,
    "phone": null
  },
  "payouts": [
    {
      "id": "social-pension",
      "benefit": {
        "en": "Social Pension",
        "fil": "Social Pension"
      },
      "date": null,
      "time": null,
      "venue": null
    },
    {
      "id": "city-cash-assistance",
      "benefit": {
        "en": "City Cash Assistance",
        "fil": "Tulong-pinansyal mula sa Lungsod"
      },
      "date": null,
      "time": null,
      "venue": null
    },
    {
      "id": "birthday-cash-gift",
      "benefit": {
        "en": "Birthday Cash Gift",
        "fil": "Birthday Cash Gift"
      },
      "date": null,
      "time": null,
      "venue": null
    }
  ],
  "health": [
    {
      "icon": "pulse",
      "title": {
        "en": "Free blood pressure check",
        "fil": "Libreng pagkuha ng blood pressure"
      },
      "text": {
        "en": "Monitoring at the Barangay Health Center with our health workers.",
        "fil": "Pagsubaybay sa Barangay Health Center kasama ang ating mga health worker."
      },
      "schedule": null
    },
    {
      "icon": "pill",
      "title": {
        "en": "Maintenance medicines",
        "fil": "Maintenance na gamot"
      },
      "text": {
        "en": "Distribution of available maintenance medicines for members.",
        "fil": "Pamamahagi ng mga available na maintenance na gamot para sa mga miyembro."
      },
      "schedule": null
    },
    {
      "icon": "activity",
      "title": {
        "en": "Wellness exercise",
        "fil": "Ehersisyo para sa kalusugan"
      },
      "text": {
        "en": "Light exercise and stretching at the covered court.",
        "fil": "Magaan na ehersisyo at stretching sa covered court."
      },
      "schedule": null
    }
  ],
  "activities": [
    {
      "en": "Elderly week celebration",
      "fil": "Elderly week celebration"
    },
    {
      "en": "Exercise session",
      "fil": "Exercise session"
    },
    {
      "en": "Monthly federation meeting",
      "fil": "Monthly federation meeting"
    },
    {
      "en": "Birthday celebrants",
      "fil": "Birthday celebrants"
    }
  ],
  "requirements": [
    {
      "en": "Birth certificate or valid ID showing age",
      "fil": "Birth certificate o valid ID na nagpapakita ng edad"
    },
    {
      "en": "Proof of residency in Camantiles",
      "fil": "Patunay ng paninirahan sa Camantiles"
    },
    {
      "en": "2 pcs 1x1 ID photos",
      "fil": "2 pirasong 1x1 ID na larawan"
    },
    {
      "en": "Completed registration form",
      "fil": "Nasagutang registration form"
    }
  ]
};
