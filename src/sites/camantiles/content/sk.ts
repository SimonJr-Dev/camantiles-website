import type { SkContent } from "@/content/sections";

// Sangguniang Kabataan page.
// Sample items from the design (docs/ui-source). Fields set to null are still
// to be supplied by the barangay.
export const sk: SkContent = {
  "hero": {
    "titleLine1": {
      "en": "Built by the youth,",
      "fil": "Binuo ng kabataan,"
    },
    "titleLine2": {
      "en": "for Camantiles.",
      "fil": "para sa Camantiles."
    },
    "lead": {
      "en": "Programs, sports, scholarships and opportunities from the Sangguniang Kabataan ng Camantiles.",
      "fil": "Mga programa, palakasan, scholarship at oportunidad mula sa Sangguniang Kabataan ng Camantiles."
    }
  },
  "facebook": null,
  "programs": [
    {
      "id": "sports-league",
      "label": {
        "en": "SPORTS",
        "fil": "PALAKASAN"
      },
      "title": {
        "en": "Inter-Purok Sports League",
        "fil": "Inter-Purok Sports League"
      },
      "text": {
        "en": "Basketball and volleyball leagues that bring every purok together.",
        "fil": "Mga liga ng basketball at volleyball na nagbubuklod sa bawat purok."
      }
    },
    {
      "id": "scholarship",
      "label": {
        "en": "EDUCATION",
        "fil": "EDUKASYON"
      },
      "title": {
        "en": "Scholarship & School Support",
        "fil": "Scholarship at Suporta sa Pag-aaral"
      },
      "text": {
        "en": "Educational assistance and school supplies for qualified youth.",
        "fil": "Tulong pang-edukasyon at gamit pang-eskwela para sa mga kwalipikadong kabataan."
      }
    },
    {
      "id": "leadership",
      "label": {
        "en": "LEADERSHIP",
        "fil": "PAMUNUAN"
      },
      "title": {
        "en": "Youth Leadership Seminars",
        "fil": "Mga Seminar sa Pamumuno ng Kabataan"
      },
      "text": {
        "en": "Workshops on leadership, public service and community work.",
        "fil": "Mga workshop tungkol sa pamumuno, serbisyo publiko at gawaing pangkomunidad."
      }
    },
    {
      "id": "clean-green",
      "label": {
        "en": "ENVIRONMENT",
        "fil": "KALIKASAN"
      },
      "title": {
        "en": "Clean & Green Camantiles",
        "fil": "Malinis at Luntiang Camantiles"
      },
      "text": {
        "en": "Clean-up drives and tree planting led by SK volunteers.",
        "fil": "Mga clean-up drive at pagtatanim ng puno na pinangungunahan ng mga SK volunteer."
      }
    }
  ],
  "updates": [
    {
      "id": "league-registration",
      "date": null,
      "title": {
        "en": "League registration is now open",
        "fil": "Bukas na ang pagpaparehistro sa liga"
      },
      "text": {
        "en": "Submit your team line-up at the SK office before [Deadline].",
        "fil": "Ipasa ang line-up ng inyong koponan sa opisina ng SK bago ang [Deadline]."
      }
    },
    {
      "id": "scholarship-requirements",
      "date": null,
      "title": {
        "en": "Scholarship application requirements",
        "fil": "Mga kailangan sa aplikasyon sa scholarship"
      },
      "text": {
        "en": "Requirements and deadline for the upcoming educational assistance.",
        "fil": "Mga kailangan at deadline para sa paparating na tulong pang-edukasyon."
      }
    },
    {
      "id": "thank-you-volunteers",
      "date": null,
      "title": {
        "en": "Thank you, volunteers!",
        "fil": "Salamat, mga volunteer!"
      },
      "text": {
        "en": "Photos and highlights from the recent clean-up drive.",
        "fil": "Mga larawan at tampok mula sa nakaraang clean-up drive."
      }
    }
  ],
  "documents": [
    {
      "id": "abyip",
      "title": {
        "en": "Annual Barangay Youth Investment Program",
        "fil": "Annual Barangay Youth Investment Program"
      },
      "file": null,
      "format": "PDF"
    },
    {
      "id": "budget-reports",
      "title": {
        "en": "SK Budget and Project Reports",
        "fil": "Ulat sa Badyet at Proyekto ng SK"
      },
      "file": null,
      "format": "PDF"
    },
    {
      "id": "resolutions",
      "title": {
        "en": "Resolutions and Minutes",
        "fil": "Mga Resolusyon at Katitikan"
      },
      "file": null,
      "format": "PDF"
    }
  ],
  "council": [
    {
      "id": "sk-chairperson",
      "name": null,
      "role": {
        "en": "SK Chairperson",
        "fil": "SK Chairperson"
      }
    },
    {
      "id": "sk-kagawad-1",
      "name": null,
      "role": {
        "en": "SK Kagawad",
        "fil": "SK Kagawad"
      }
    },
    {
      "id": "sk-kagawad-2",
      "name": null,
      "role": {
        "en": "SK Kagawad",
        "fil": "SK Kagawad"
      }
    },
    {
      "id": "sk-kagawad-3",
      "name": null,
      "role": {
        "en": "SK Kagawad",
        "fil": "SK Kagawad"
      }
    },
    {
      "id": "sk-secretary",
      "name": null,
      "role": {
        "en": "SK Secretary",
        "fil": "SK Secretary"
      }
    },
    {
      "id": "sk-treasurer",
      "name": null,
      "role": {
        "en": "SK Treasurer",
        "fil": "SK Treasurer"
      }
    }
  ]
};
