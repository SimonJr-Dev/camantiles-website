import type { HealthContent } from "@/content/sections";

// Barangay Health Center page.
// Sample items from the design (docs/ui-source). Fields set to null are still
// to be supplied by the barangay.
export const health: HealthContent = {
  "hero": {
    "titleLine1": {
      "en": "Healthy families,",
      "fil": "Malulusog na pamilya,"
    },
    "titleLine2": {
      "en": "stronger Camantiles.",
      "fil": "mas matatag na Camantiles."
    }
  },
  "clinic": {
    "hours": null,
    "emergency": null
  },
  "services": [
    {
      "icon": "stethoscope",
      "title": {
        "en": "Consultation and check-ups",
        "fil": "Konsultasyon at check-up"
      },
      "text": {
        "en": "Free basic consultation, blood pressure monitoring and referrals to the city health office.",
        "fil": "Libreng pangunahing konsultasyon, pagsubaybay sa blood pressure at referral sa city health office."
      },
      "tag": {
        "en": "Walk-in",
        "fil": "Walk-in"
      }
    },
    {
      "icon": "heart",
      "title": {
        "en": "Prenatal and maternal care",
        "fil": "Prenatal at pangangalaga sa ina"
      },
      "text": {
        "en": "Regular check-ups for expectant mothers, plus post-natal care for mother and baby.",
        "fil": "Regular na check-up para sa mga buntis, at post-natal na pangangalaga para sa ina at sanggol."
      },
      "tag": {
        "en": "By schedule",
        "fil": "Ayon sa iskedyul"
      }
    },
    {
      "icon": "syringe",
      "title": {
        "en": "Child immunization",
        "fil": "Bakuna para sa mga bata"
      },
      "text": {
        "en": "Routine vaccines for infants and children, following the national immunization program.",
        "fil": "Mga regular na bakuna para sa mga sanggol at bata, ayon sa pambansang programa sa pagbabakuna."
      },
      "tag": {
        "en": "By schedule",
        "fil": "Ayon sa iskedyul"
      }
    },
    {
      "icon": "users",
      "title": {
        "en": "Family planning",
        "fil": "Family planning"
      },
      "text": {
        "en": "Counseling and access to family planning methods for couples and individuals.",
        "fil": "Pagpapayo at access sa mga paraan ng family planning para sa mag-asawa at indibidwal."
      },
      "tag": {
        "en": "Private consultation",
        "fil": "Pribadong konsultasyon"
      }
    },
    {
      "icon": "pill",
      "title": {
        "en": "Free medicines",
        "fil": "Libreng gamot"
      },
      "text": {
        "en": "Available maintenance and basic medicines for registered residents, while supplies last.",
        "fil": "Mga available na maintenance at pangunahing gamot para sa mga rehistradong residente, habang may suplay."
      },
      "tag": {
        "en": "With prescription",
        "fil": "May reseta"
      }
    },
    {
      "icon": "chart",
      "title": {
        "en": "Nutrition program",
        "fil": "Programa sa nutrisyon"
      },
      "text": {
        "en": "Growth monitoring and feeding support for infants and young children.",
        "fil": "Pagsubaybay sa paglaki at feeding support para sa mga sanggol at batang paslit."
      },
      "tag": {
        "en": "Monthly",
        "fil": "Buwan-buwan"
      }
    }
  ],
  "schedule": [
    {
      "day": {
        "en": "Monday",
        "fil": "Lunes"
      },
      "service": {
        "en": "General consultation",
        "fil": "Pangkalahatang konsultasyon"
      },
      "time": null
    },
    {
      "day": {
        "en": "Tuesday",
        "fil": "Martes"
      },
      "service": {
        "en": "Prenatal and maternal check-up",
        "fil": "Prenatal at maternal check-up"
      },
      "time": null
    },
    {
      "day": {
        "en": "Wednesday",
        "fil": "Miyerkules"
      },
      "service": {
        "en": "Child immunization",
        "fil": "Bakuna para sa mga bata"
      },
      "time": null
    },
    {
      "day": {
        "en": "Thursday",
        "fil": "Huwebes"
      },
      "service": {
        "en": "Family planning counseling",
        "fil": "Pagpapayo sa family planning"
      },
      "time": null
    },
    {
      "day": {
        "en": "Friday",
        "fil": "Biyernes"
      },
      "service": {
        "en": "Senior citizens blood pressure check",
        "fil": "Pagkuha ng blood pressure ng mga senior citizen"
      },
      "time": null
    }
  ],
  "bring": [
    {
      "en": "Barangay ID or any valid ID",
      "fil": "Barangay ID o anumang valid ID"
    },
    {
      "en": "Health record booklet, if any",
      "fil": "Health record booklet, kung mayroon"
    },
    {
      "en": "Baby book for immunization",
      "fil": "Baby book para sa bakuna"
    },
    {
      "en": "List of current medicines",
      "fil": "Listahan ng kasalukuyang iniinom na gamot"
    }
  ],
  "updates": [
    {
      "id": "dengue-prevention",
      "kind": "advisory",
      "date": null,
      "title": {
        "en": "Dengue prevention reminder",
        "fil": "Paalala laban sa dengue"
      },
      "text": {
        "en": "Search and destroy mosquito breeding sites. Report fever cases early to the Health Center.",
        "fil": "Hanapin at sirain ang mga pinamumugaran ng lamok. Agad na iulat ang mga kaso ng lagnat sa Health Center."
      }
    },
    {
      "id": "vaccination-drive",
      "kind": "program",
      "date": null,
      "title": {
        "en": "Free vaccination drive",
        "fil": "Libreng pagbabakuna"
      },
      "text": {
        "en": "Catch-up vaccines for children at the Health Center on [Date].",
        "fil": "Mga catch-up na bakuna para sa mga bata sa Health Center sa [Petsa]."
      }
    },
    {
      "id": "medical-mission",
      "kind": "event",
      "date": null,
      "title": {
        "en": "Barangay medical mission",
        "fil": "Medical mission ng barangay"
      },
      "text": {
        "en": "Free check-ups, dental services and medicines at the covered court on [Date].",
        "fil": "Libreng check-up, serbisyong dental at gamot sa covered court sa [Petsa]."
      }
    }
  ],
  "team": [
    {
      "id": "midwife",
      "name": null,
      "role": {
        "en": "Rural Health Midwife",
        "fil": "Rural Health Midwife"
      },
      "focus": {
        "en": "Maternal care",
        "fil": "Pangangalaga sa ina"
      }
    },
    {
      "id": "bhw-1",
      "name": null,
      "role": {
        "en": "Barangay Health Worker",
        "fil": "Barangay Health Worker"
      },
      "focus": {
        "en": "Purok coverage",
        "fil": "Sakop na purok"
      }
    },
    {
      "id": "bhw-2",
      "name": null,
      "role": {
        "en": "Barangay Health Worker",
        "fil": "Barangay Health Worker"
      },
      "focus": {
        "en": "Immunization",
        "fil": "Bakuna"
      }
    },
    {
      "id": "bns",
      "name": null,
      "role": {
        "en": "Barangay Nutrition Scholar",
        "fil": "Barangay Nutrition Scholar"
      },
      "focus": {
        "en": "Nutrition",
        "fil": "Nutrisyon"
      }
    },
    {
      "id": "bhw-3",
      "name": null,
      "role": {
        "en": "Barangay Health Worker",
        "fil": "Barangay Health Worker"
      },
      "focus": {
        "en": "Senior care",
        "fil": "Pangangalaga sa senior"
      }
    }
  ]
};
