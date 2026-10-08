import type { SchoolsContent } from "@/content/schools";

// The Schools index and the four school pages.
// Sample items from the design (docs/ui-source). Fields set to null are still
// to be supplied by each school.
export const schools: SchoolsContent = {
  "index": {
    "titleLine1": {
      "en": "Learning starts",
      "fil": "Dito nagsisimula"
    },
    "titleLine2": {
      "en": "in Camantiles.",
      "fil": "ang pagkatuto sa Camantiles."
    },
    "lead": {
      "en": "Four schools, one place for parents. Choose a school to see its announcements, enrollment and achievements.",
      "fil": "Apat na paaralan, iisang lugar para sa mga magulang. Pumili ng paaralan upang makita ang mga anunsyo, enrollment at tagumpay nito."
    }
  },
  "items": [
    {
      "slug": "day-care-center",
      "short": {
        "en": "Day Care Center",
        "fil": "Day Care Center"
      },
      "level": {
        "en": "EARLY CHILDHOOD",
        "fil": "MAAGANG PAGKABATA"
      },
      "summary": {
        "en": "Early childhood care and learning, run with the support of the barangay.",
        "fil": "Pangangalaga at pag-aaral sa maagang pagkabata, sa suporta ng barangay."
      },
      "tagline": {
        "en": "A safe, caring first classroom for the youngest learners of Barangay Camantiles.",
        "fil": "Isang ligtas at mapagkalingang unang silid-aralan para sa pinakabatang mag-aaral ng Barangay Camantiles."
      },
      "enrollTitle": {
        "en": "Register your child",
        "fil": "Iparehistro ang iyong anak"
      },
      "facts": [
        {
          "label": {
            "en": "AGES SERVED",
            "fil": "EDAD NG MGA BATA"
          },
          "value": null,
          "pending": {
            "en": "Age range",
            "fil": "Saklaw ng edad"
          }
        },
        {
          "label": {
            "en": "CLASS SESSIONS",
            "fil": "MGA SESYON NG KLASE"
          },
          "value": null,
          "pending": {
            "en": "Morning / afternoon",
            "fil": "Umaga / hapon"
          }
        },
        {
          "label": {
            "en": "DAY CARE WORKER",
            "fil": "DAY CARE WORKER"
          },
          "value": null,
          "pending": {
            "en": "Name",
            "fil": "Pangalan"
          }
        }
      ],
      "about": {
        "en": "The Day Care Center provides early childhood care and development for the children of Camantiles, supported by the barangay. Children learn through play, songs, stories and simple activities that prepare them for kindergarten.",
        "fil": "Nagbibigay ang Day Care Center ng pangangalaga at paghubog sa maagang pagkabata para sa mga bata ng Camantiles, sa suporta ng barangay. Natututo ang mga bata sa pamamagitan ng laro, awit, kuwento at mga simpleng gawain na naghahanda sa kanila para sa kindergarten."
      },
      "levels": [
        {
          "en": "Play-based learning",
          "fil": "Pag-aaral sa pamamagitan ng laro"
        },
        {
          "en": "Supplementary feeding",
          "fil": "Supplementary feeding"
        },
        {
          "en": "Values formation",
          "fil": "Paghubog ng pagpapahalaga"
        },
        {
          "en": "Kinder readiness",
          "fil": "Kahandaan sa Kinder"
        }
      ],
      "news": [
        {
          "id": "news-1",
          "date": null,
          "title": {
            "en": "Registration for new learners",
            "fil": "Pagpaparehistro ng mga bagong mag-aaral"
          },
          "text": {
            "en": "Parents may register their children at the Day Care Center on [Dates].",
            "fil": "Maaaring iparehistro ng mga magulang ang kanilang mga anak sa Day Care Center sa [Mga Petsa]."
          }
        },
        {
          "id": "news-2",
          "date": null,
          "title": {
            "en": "Parents orientation",
            "fil": "Oryentasyon ng mga magulang"
          },
          "text": {
            "en": "Orientation for parents and guardians of new learners at [Time].",
            "fil": "Oryentasyon para sa mga magulang at tagapag-alaga ng mga bagong mag-aaral sa [Oras]."
          }
        },
        {
          "id": "news-3",
          "date": null,
          "title": {
            "en": "Supplementary feeding program",
            "fil": "Supplementary feeding program"
          },
          "text": {
            "en": "Schedule and menu for this month’s feeding program.",
            "fil": "Iskedyul at menu ng feeding program ngayong buwan."
          }
        }
      ],
      "facultyLead": {
        "en": "Meet the people who care for and teach our children every day.",
        "fil": "Kilalanin ang mga nag-aalaga at nagtuturo sa ating mga anak araw-araw."
      },
      "faculty": [
        {
          "id": "staff-1",
          "name": null,
          "role": {
            "en": "Day Care Worker",
            "fil": "Day Care Worker"
          },
          "focus": {
            "en": "Morning session",
            "fil": "Sesyon sa umaga"
          }
        },
        {
          "id": "staff-2",
          "name": null,
          "role": {
            "en": "Day Care Worker",
            "fil": "Day Care Worker"
          },
          "focus": {
            "en": "Afternoon session",
            "fil": "Sesyon sa hapon"
          }
        },
        {
          "id": "staff-3",
          "name": null,
          "role": {
            "en": "Child Development Assistant",
            "fil": "Child Development Assistant"
          },
          "focus": {
            "en": "Support",
            "fil": "Suporta"
          }
        },
        {
          "id": "staff-4",
          "name": null,
          "role": {
            "en": "Feeding Program Coordinator",
            "fil": "Feeding Program Coordinator"
          },
          "focus": {
            "en": "Nutrition",
            "fil": "Nutrisyon"
          }
        }
      ],
      "galleryTitle": {
        "en": "Moments from class",
        "fil": "Mga sandali sa klase"
      },
      "gallery": [
        {
          "en": "Story time",
          "fil": "Story time"
        },
        {
          "en": "Arts and crafts",
          "fil": "Arts and crafts"
        },
        {
          "en": "Moving-up day",
          "fil": "Moving-up day"
        }
      ],
      "requirements": [
        {
          "en": "PSA birth certificate (photocopy)",
          "fil": "PSA birth certificate (photocopy)"
        },
        {
          "en": "Immunization record",
          "fil": "Talaan ng bakuna"
        },
        {
          "en": "2 pcs 1x1 ID photos",
          "fil": "2 pirasong 1x1 ID na larawan"
        },
        {
          "en": "Proof of residency",
          "fil": "Patunay ng paninirahan"
        }
      ],
      "head": {
        "role": {
          "en": "DAY CARE WORKER",
          "fil": "DAY CARE WORKER"
        },
        "name": null,
        "phone": null,
        "email": null,
        "address": null
      }
    },
    {
      "slug": "elementary-school",
      "short": {
        "en": "Elementary School",
        "fil": "Elementary School"
      },
      "level": {
        "en": "KINDERGARTEN TO GRADE 6",
        "fil": "KINDERGARTEN HANGGANG BAITANG 6"
      },
      "summary": {
        "en": "Public elementary education for the children of Camantiles.",
        "fil": "Pampublikong edukasyong elementarya para sa mga bata ng Camantiles."
      },
      "tagline": {
        "en": "Building strong foundations in reading, math and good values for the children of Camantiles.",
        "fil": "Matibay na pundasyon sa pagbasa, matematika at mabuting asal para sa mga bata ng Camantiles."
      },
      "enrollTitle": {
        "en": "Early registration is open",
        "fil": "Bukas na ang maagang pagpaparehistro"
      },
      "facts": [
        {
          "label": {
            "en": "GRADE LEVELS",
            "fil": "MGA BAITANG"
          },
          "value": {
            "en": "Kinder to Grade 6 · 15 sections",
            "fil": "Kinder hanggang Baitang 6 · 15 seksyon"
          },
          "pending": {
            "en": "Grade levels",
            "fil": "Grade levels"
          }
        },
        {
          "label": {
            "en": "SCHOOL HOURS",
            "fil": "ORAS NG KLASE"
          },
          "value": null,
          "pending": {
            "en": "Class hours",
            "fil": "Oras ng klase"
          }
        },
        {
          "label": {
            "en": "SCHOOL HEAD",
            "fil": "PUNONG-GURO"
          },
          "value": null,
          "pending": {
            "en": "Name",
            "fil": "Pangalan"
          }
        }
      ],
      "about": {
        "en": "Camantiles Elementary School provides public elementary education for the children of Camantiles and nearby communities, working closely with parents and the barangay to support every learner.",
        "fil": "Nagbibigay ang Camantiles Elementary School ng pampublikong edukasyong elementarya para sa mga bata ng Camantiles at mga kalapit na komunidad, katuwang ang mga magulang at ang barangay sa pagsuporta sa bawat mag-aaral."
      },
      "levels": [
        {
          "en": "Kindergarten",
          "fil": "Kindergarten"
        },
        {
          "en": "Grade 1",
          "fil": "Baitang 1"
        },
        {
          "en": "Grade 2",
          "fil": "Baitang 2"
        },
        {
          "en": "Grade 3",
          "fil": "Baitang 3"
        },
        {
          "en": "Grade 4",
          "fil": "Baitang 4"
        },
        {
          "en": "Grade 5",
          "fil": "Baitang 5"
        },
        {
          "en": "Grade 6",
          "fil": "Baitang 6"
        }
      ],
      "news": [
        {
          "id": "news-1",
          "date": null,
          "title": {
            "en": "Early registration for the next school year",
            "fil": "Maagang pagpaparehistro para sa susunod na taong-aralan"
          },
          "text": {
            "en": "Early registration runs from [Dates]. Bring the listed requirements.",
            "fil": "Ang maagang pagpaparehistro ay mula [Mga Petsa]. Dalhin ang mga nakalistang kailangan."
          }
        },
        {
          "id": "news-2",
          "date": null,
          "title": {
            "en": "Parent-Teacher Meeting",
            "fil": "Pulong ng mga Magulang at Guro"
          },
          "text": {
            "en": "Quarterly meeting with parents and guardians on [Date].",
            "fil": "Pulong kada tatlong buwan kasama ang mga magulang at tagapag-alaga sa [Petsa]."
          }
        },
        {
          "id": "news-3",
          "date": null,
          "title": {
            "en": "Brigada Eskwela volunteers needed",
            "fil": "Kailangan ng mga volunteer para sa Brigada Eskwela"
          },
          "text": {
            "en": "Help prepare classrooms for the new school year.",
            "fil": "Tumulong sa paghahanda ng mga silid-aralan para sa bagong taong-aralan."
          }
        }
      ],
      "facultyLead": {
        "en": "Meet the teachers and staff guiding our learners from Kindergarten to Grade 6.",
        "fil": "Kilalanin ang mga guro at kawaning gumagabay sa ating mga mag-aaral mula Kindergarten hanggang Baitang 6."
      },
      "faculty": [
        {
          "id": "staff-1",
          "name": null,
          "role": {
            "en": "School Head",
            "fil": "Punong-guro"
          },
          "focus": {
            "en": "Administration",
            "fil": "Administrasyon"
          }
        },
        {
          "id": "staff-2",
          "name": null,
          "role": {
            "en": "Master Teacher",
            "fil": "Master Teacher"
          },
          "focus": {
            "en": "Instruction",
            "fil": "Pagtuturo"
          }
        },
        {
          "id": "staff-3",
          "name": null,
          "role": {
            "en": "Guidance Teacher",
            "fil": "Guidance Teacher"
          },
          "focus": {
            "en": "Student Services",
            "fil": "Serbisyo sa Mag-aaral"
          }
        },
        {
          "id": "staff-4",
          "name": null,
          "role": {
            "en": "Administrative Officer",
            "fil": "Administrative Officer"
          },
          "focus": {
            "en": "Administration",
            "fil": "Administrasyon"
          }
        }
      ],
      "grades": [
        {
          "name": {
            "en": "Kindergarten",
            "fil": "Kindergarten"
          },
          "sections": [
            {
              "id": "kindergarten-a",
              "label": {
                "en": "Section A",
                "fil": "Seksyon A"
              },
              "adviser": null
            },
            {
              "id": "kindergarten-b",
              "label": {
                "en": "Section B",
                "fil": "Seksyon B"
              },
              "adviser": null
            }
          ]
        },
        {
          "name": {
            "en": "Grade 1",
            "fil": "Baitang 1"
          },
          "sections": [
            {
              "id": "grade-1-a",
              "label": {
                "en": "Section A",
                "fil": "Seksyon A"
              },
              "adviser": null
            },
            {
              "id": "grade-1-b",
              "label": {
                "en": "Section B",
                "fil": "Seksyon B"
              },
              "adviser": null
            }
          ]
        },
        {
          "name": {
            "en": "Grade 2",
            "fil": "Baitang 2"
          },
          "sections": [
            {
              "id": "grade-2-a",
              "label": {
                "en": "Section A",
                "fil": "Seksyon A"
              },
              "adviser": null
            },
            {
              "id": "grade-2-b",
              "label": {
                "en": "Section B",
                "fil": "Seksyon B"
              },
              "adviser": null
            }
          ]
        },
        {
          "name": {
            "en": "Grade 3",
            "fil": "Baitang 3"
          },
          "sections": [
            {
              "id": "grade-3-a",
              "label": {
                "en": "Section A",
                "fil": "Seksyon A"
              },
              "adviser": null
            },
            {
              "id": "grade-3-b",
              "label": {
                "en": "Section B",
                "fil": "Seksyon B"
              },
              "adviser": null
            }
          ]
        },
        {
          "name": {
            "en": "Grade 4",
            "fil": "Baitang 4"
          },
          "sections": [
            {
              "id": "grade-4-a",
              "label": {
                "en": "Section A",
                "fil": "Seksyon A"
              },
              "adviser": null
            },
            {
              "id": "grade-4-b",
              "label": {
                "en": "Section B",
                "fil": "Seksyon B"
              },
              "adviser": null
            }
          ]
        },
        {
          "name": {
            "en": "Grade 5",
            "fil": "Baitang 5"
          },
          "sections": [
            {
              "id": "grade-5-a",
              "label": {
                "en": "Section A",
                "fil": "Seksyon A"
              },
              "adviser": null
            },
            {
              "id": "grade-5-b",
              "label": {
                "en": "Section B",
                "fil": "Seksyon B"
              },
              "adviser": null
            },
            {
              "id": "grade-5-c",
              "label": {
                "en": "Section C",
                "fil": "Seksyon C"
              },
              "adviser": null
            }
          ]
        },
        {
          "name": {
            "en": "Grade 6",
            "fil": "Baitang 6"
          },
          "sections": [
            {
              "id": "grade-6-a",
              "label": {
                "en": "Section A",
                "fil": "Seksyon A"
              },
              "adviser": null
            },
            {
              "id": "grade-6-b",
              "label": {
                "en": "Section B",
                "fil": "Seksyon B"
              },
              "adviser": null
            }
          ]
        }
      ],
      "alumni": {
        "homecoming": {
          "date": null,
          "venue": null,
          "hostBatch": null,
          "theme": null
        },
        "years": [
          "2025",
          "2024",
          "2023"
        ]
      },
      "galleryTitle": {
        "en": "Achievements and events",
        "fil": "Mga tagumpay at kaganapan"
      },
      "gallery": [
        {
          "en": "Recognition day",
          "fil": "Araw ng Pagkilala"
        },
        {
          "en": "Contest winners",
          "fil": "Contest winners"
        },
        {
          "en": "Brigada Eskwela",
          "fil": "Brigada Eskwela"
        }
      ],
      "requirements": [
        {
          "en": "PSA birth certificate",
          "fil": "PSA birth certificate"
        },
        {
          "en": "Report card (Form 138) for transferees",
          "fil": "Report card (Form 138) para sa mga transferee"
        },
        {
          "en": "Certificate of good moral character",
          "fil": "Certificate of good moral character"
        },
        {
          "en": "Completed enrollment form",
          "fil": "Nasagutang enrollment form"
        }
      ],
      "head": {
        "role": {
          "en": "SCHOOL HEAD",
          "fil": "PUNONG-GURO"
        },
        "name": null,
        "phone": null,
        "email": null,
        "address": null
      }
    },
    {
      "slug": "trinidad-perez-elementary-school",
      "short": {
        "en": "Trinidad Perez ES",
        "fil": "Trinidad Perez ES"
      },
      "level": {
        "en": "KINDERGARTEN TO GRADE 6",
        "fil": "KINDERGARTEN HANGGANG BAITANG 6"
      },
      "summary": {
        "en": "Public elementary education serving families in Camantiles.",
        "fil": "Pampublikong edukasyong elementarya para sa mga pamilya sa Camantiles."
      },
      "tagline": {
        "en": "Nurturing young learners with strong foundations in reading, math and good values.",
        "fil": "Hinuhubog ang mga batang mag-aaral sa matibay na pundasyon sa pagbasa, matematika at mabuting asal."
      },
      "enrollTitle": {
        "en": "Early registration is open",
        "fil": "Bukas na ang maagang pagpaparehistro"
      },
      "facts": [
        {
          "label": {
            "en": "GRADE LEVELS",
            "fil": "MGA BAITANG"
          },
          "value": {
            "en": "Kinder to Grade 6 · 7 sections",
            "fil": "Kinder hanggang Baitang 6 · 7 seksyon"
          },
          "pending": {
            "en": "Grade levels",
            "fil": "Grade levels"
          }
        },
        {
          "label": {
            "en": "SCHOOL HOURS",
            "fil": "ORAS NG KLASE"
          },
          "value": null,
          "pending": {
            "en": "Class hours",
            "fil": "Oras ng klase"
          }
        },
        {
          "label": {
            "en": "SCHOOL HEAD",
            "fil": "PUNONG-GURO"
          },
          "value": null,
          "pending": {
            "en": "Name",
            "fil": "Pangalan"
          }
        }
      ],
      "about": null,
      "levels": [
        {
          "en": "Kindergarten",
          "fil": "Kindergarten"
        },
        {
          "en": "Grade 1",
          "fil": "Baitang 1"
        },
        {
          "en": "Grade 2",
          "fil": "Baitang 2"
        },
        {
          "en": "Grade 3",
          "fil": "Baitang 3"
        },
        {
          "en": "Grade 4",
          "fil": "Baitang 4"
        },
        {
          "en": "Grade 5",
          "fil": "Baitang 5"
        },
        {
          "en": "Grade 6",
          "fil": "Baitang 6"
        }
      ],
      "news": [
        {
          "id": "news-1",
          "date": null,
          "title": {
            "en": "Early registration for the next school year",
            "fil": "Maagang pagpaparehistro para sa susunod na taong-aralan"
          },
          "text": {
            "en": "Early registration runs from [Dates]. Bring the listed requirements.",
            "fil": "Ang maagang pagpaparehistro ay mula [Mga Petsa]. Dalhin ang mga nakalistang kailangan."
          }
        },
        {
          "id": "news-2",
          "date": null,
          "title": {
            "en": "Parent-Teacher Meeting",
            "fil": "Pulong ng mga Magulang at Guro"
          },
          "text": {
            "en": "Quarterly meeting with parents and guardians on [Date].",
            "fil": "Pulong kada tatlong buwan kasama ang mga magulang at tagapag-alaga sa [Petsa]."
          }
        },
        {
          "id": "news-3",
          "date": null,
          "title": {
            "en": "Brigada Eskwela volunteers needed",
            "fil": "Kailangan ng mga volunteer para sa Brigada Eskwela"
          },
          "text": {
            "en": "Help prepare classrooms for the new school year.",
            "fil": "Tumulong sa paghahanda ng mga silid-aralan para sa bagong taong-aralan."
          }
        }
      ],
      "facultyLead": {
        "en": "Meet the teachers and staff guiding our learners from Kindergarten to Grade 6.",
        "fil": "Kilalanin ang mga guro at kawaning gumagabay sa ating mga mag-aaral mula Kindergarten hanggang Baitang 6."
      },
      "faculty": [
        {
          "id": "staff-1",
          "name": null,
          "role": {
            "en": "School Head",
            "fil": "Punong-guro"
          },
          "focus": {
            "en": "Administration",
            "fil": "Administrasyon"
          }
        },
        {
          "id": "staff-2",
          "name": null,
          "role": {
            "en": "Master Teacher",
            "fil": "Master Teacher"
          },
          "focus": {
            "en": "Instruction",
            "fil": "Pagtuturo"
          }
        },
        {
          "id": "staff-3",
          "name": null,
          "role": {
            "en": "Guidance Teacher",
            "fil": "Guidance Teacher"
          },
          "focus": {
            "en": "Student Services",
            "fil": "Serbisyo sa Mag-aaral"
          }
        },
        {
          "id": "staff-4",
          "name": null,
          "role": {
            "en": "Administrative Officer",
            "fil": "Administrative Officer"
          },
          "focus": {
            "en": "Administration",
            "fil": "Administrasyon"
          }
        }
      ],
      "grades": [
        {
          "name": {
            "en": "Kindergarten",
            "fil": "Kindergarten"
          },
          "sections": [
            {
              "id": "kindergarten-a",
              "label": {
                "en": "Section A",
                "fil": "Seksyon A"
              },
              "adviser": null
            }
          ]
        },
        {
          "name": {
            "en": "Grade 1",
            "fil": "Baitang 1"
          },
          "sections": [
            {
              "id": "grade-1-a",
              "label": {
                "en": "Section A",
                "fil": "Seksyon A"
              },
              "adviser": null
            }
          ]
        },
        {
          "name": {
            "en": "Grade 2",
            "fil": "Baitang 2"
          },
          "sections": [
            {
              "id": "grade-2-a",
              "label": {
                "en": "Section A",
                "fil": "Seksyon A"
              },
              "adviser": null
            }
          ]
        },
        {
          "name": {
            "en": "Grade 3",
            "fil": "Baitang 3"
          },
          "sections": [
            {
              "id": "grade-3-a",
              "label": {
                "en": "Section A",
                "fil": "Seksyon A"
              },
              "adviser": null
            }
          ]
        },
        {
          "name": {
            "en": "Grade 4",
            "fil": "Baitang 4"
          },
          "sections": [
            {
              "id": "grade-4-a",
              "label": {
                "en": "Section A",
                "fil": "Seksyon A"
              },
              "adviser": null
            }
          ]
        },
        {
          "name": {
            "en": "Grade 5",
            "fil": "Baitang 5"
          },
          "sections": [
            {
              "id": "grade-5-a",
              "label": {
                "en": "Section A",
                "fil": "Seksyon A"
              },
              "adviser": null
            }
          ]
        },
        {
          "name": {
            "en": "Grade 6",
            "fil": "Baitang 6"
          },
          "sections": [
            {
              "id": "grade-6-a",
              "label": {
                "en": "Section A",
                "fil": "Seksyon A"
              },
              "adviser": null
            }
          ]
        }
      ],
      "alumni": {
        "homecoming": {
          "date": null,
          "venue": null,
          "hostBatch": null,
          "theme": null
        },
        "years": [
          "2025",
          "2024",
          "2023"
        ]
      },
      "galleryTitle": {
        "en": "Achievements and events",
        "fil": "Mga tagumpay at kaganapan"
      },
      "gallery": [
        {
          "en": "Recognition day",
          "fil": "Araw ng Pagkilala"
        },
        {
          "en": "Contest winners",
          "fil": "Contest winners"
        },
        {
          "en": "School program",
          "fil": "School program"
        }
      ],
      "requirements": [
        {
          "en": "PSA birth certificate",
          "fil": "PSA birth certificate"
        },
        {
          "en": "Report card (Form 138) for transferees",
          "fil": "Report card (Form 138) para sa mga transferee"
        },
        {
          "en": "Certificate of good moral character",
          "fil": "Certificate of good moral character"
        },
        {
          "en": "Completed enrollment form",
          "fil": "Nasagutang enrollment form"
        }
      ],
      "head": {
        "role": {
          "en": "SCHOOL HEAD",
          "fil": "PUNONG-GURO"
        },
        "name": null,
        "phone": null,
        "email": null,
        "address": null
      }
    },
    {
      "slug": "high-school",
      "short": {
        "en": "High School",
        "fil": "High School"
      },
      "level": {
        "en": "JUNIOR / SENIOR HIGH SCHOOL",
        "fil": "JUNIOR / SENIOR HIGH SCHOOL"
      },
      "summary": {
        "en": "Secondary education preparing our youth for college and careers.",
        "fil": "Sekundaryang edukasyong naghahanda sa ating kabataan para sa kolehiyo at karera."
      },
      "tagline": {
        "en": "Preparing the youth of Camantiles for college, technical work and meaningful careers.",
        "fil": "Inihahanda ang kabataan ng Camantiles para sa kolehiyo, teknikal na hanapbuhay at makabuluhang karera."
      },
      "enrollTitle": {
        "en": "Enrollment for incoming students",
        "fil": "Enrollment para sa mga papasok na mag-aaral"
      },
      "facts": [
        {
          "label": {
            "en": "GRADE LEVELS",
            "fil": "MGA BAITANG"
          },
          "value": {
            "en": "Grades 7 to 12 · 12 sections",
            "fil": "Baitang 7 hanggang 12 · 12 seksyon"
          },
          "pending": {
            "en": "Grade levels",
            "fil": "Grade levels"
          }
        },
        {
          "label": {
            "en": "SHS STRANDS",
            "fil": "MGA SHS STRAND"
          },
          "value": null,
          "pending": {
            "en": "Strands offered",
            "fil": "Mga strand na iniaalok"
          }
        },
        {
          "label": {
            "en": "PRINCIPAL",
            "fil": "PRINCIPAL"
          },
          "value": null,
          "pending": {
            "en": "Name",
            "fil": "Pangalan"
          }
        }
      ],
      "about": {
        "en": "Camantiles High School provides secondary education for the youth of Camantiles, with programs that prepare students for higher education, technical-vocational work and active citizenship.",
        "fil": "Nagbibigay ang Camantiles High School ng sekundaryang edukasyon para sa kabataan ng Camantiles, na may mga programang naghahanda sa mga mag-aaral para sa kolehiyo, technical-vocational na hanapbuhay at aktibong pagkamamamayan."
      },
      "levels": [
        {
          "en": "Junior High School",
          "fil": "Junior High School"
        },
        {
          "en": "Senior High School",
          "fil": "Senior High School"
        },
        {
          "en": "Clubs & organizations",
          "fil": "Mga club at organisasyon"
        },
        {
          "en": "Sports",
          "fil": "Palakasan"
        }
      ],
      "news": [
        {
          "id": "news-1",
          "date": null,
          "title": {
            "en": "Enrollment for incoming students",
            "fil": "Enrollment para sa mga papasok na mag-aaral"
          },
          "text": {
            "en": "Enrollment schedule by grade level from [Dates].",
            "fil": "Iskedyul ng enrollment ayon sa baitang mula [Mga Petsa]."
          }
        },
        {
          "id": "news-2",
          "date": null,
          "title": {
            "en": "Recognition day",
            "fil": "Araw ng Pagkilala"
          },
          "text": {
            "en": "Congratulations to our honor students. Program details on [Date].",
            "fil": "Pagbati sa ating mga honor student. Detalye ng programa sa [Petsa]."
          }
        },
        {
          "id": "news-3",
          "date": null,
          "title": {
            "en": "Career guidance seminar",
            "fil": "Career guidance seminar"
          },
          "text": {
            "en": "Senior High students are invited to a career orientation on [Date].",
            "fil": "Inaanyayahan ang mga Senior High student sa isang career orientation sa [Petsa]."
          }
        }
      ],
      "facultyLead": {
        "en": "Meet the school leaders and department heads of Camantiles High School.",
        "fil": "Kilalanin ang mga pinuno ng paaralan at department head ng Camantiles High School."
      },
      "faculty": [
        {
          "id": "staff-1",
          "name": null,
          "role": {
            "en": "Principal",
            "fil": "Principal"
          },
          "focus": {
            "en": "Administration",
            "fil": "Administrasyon"
          }
        },
        {
          "id": "staff-2",
          "name": null,
          "role": {
            "en": "Senior High Coordinator",
            "fil": "Senior High Coordinator"
          },
          "focus": {
            "en": "Senior High",
            "fil": "Senior High"
          }
        },
        {
          "id": "staff-3",
          "name": null,
          "role": {
            "en": "Department Head",
            "fil": "Department Head"
          },
          "focus": {
            "en": "English",
            "fil": "English"
          }
        },
        {
          "id": "staff-4",
          "name": null,
          "role": {
            "en": "Department Head",
            "fil": "Department Head"
          },
          "focus": {
            "en": "Mathematics",
            "fil": "Matematika"
          }
        },
        {
          "id": "staff-5",
          "name": null,
          "role": {
            "en": "Department Head",
            "fil": "Department Head"
          },
          "focus": {
            "en": "Science",
            "fil": "Science"
          }
        },
        {
          "id": "staff-6",
          "name": null,
          "role": {
            "en": "Department Head",
            "fil": "Department Head"
          },
          "focus": {
            "en": "Filipino",
            "fil": "Filipino"
          }
        },
        {
          "id": "staff-7",
          "name": null,
          "role": {
            "en": "Department Head",
            "fil": "Department Head"
          },
          "focus": {
            "en": "Araling Panlipunan",
            "fil": "Araling Panlipunan"
          }
        },
        {
          "id": "staff-8",
          "name": null,
          "role": {
            "en": "Guidance Counselor",
            "fil": "Guidance Counselor"
          },
          "focus": {
            "en": "Student Services",
            "fil": "Serbisyo sa Mag-aaral"
          }
        }
      ],
      "grades": [
        {
          "name": {
            "en": "Grade 7",
            "fil": "Baitang 7"
          },
          "sections": [
            {
              "id": "grade-7-a",
              "label": {
                "en": "Section A",
                "fil": "Seksyon A"
              },
              "adviser": null
            },
            {
              "id": "grade-7-b",
              "label": {
                "en": "Section B",
                "fil": "Seksyon B"
              },
              "adviser": null
            }
          ]
        },
        {
          "name": {
            "en": "Grade 8",
            "fil": "Baitang 8"
          },
          "sections": [
            {
              "id": "grade-8-a",
              "label": {
                "en": "Section A",
                "fil": "Seksyon A"
              },
              "adviser": null
            },
            {
              "id": "grade-8-b",
              "label": {
                "en": "Section B",
                "fil": "Seksyon B"
              },
              "adviser": null
            }
          ]
        },
        {
          "name": {
            "en": "Grade 9",
            "fil": "Baitang 9"
          },
          "sections": [
            {
              "id": "grade-9-a",
              "label": {
                "en": "Section A",
                "fil": "Seksyon A"
              },
              "adviser": null
            },
            {
              "id": "grade-9-b",
              "label": {
                "en": "Section B",
                "fil": "Seksyon B"
              },
              "adviser": null
            }
          ]
        },
        {
          "name": {
            "en": "Grade 10",
            "fil": "Baitang 10"
          },
          "sections": [
            {
              "id": "grade-10-a",
              "label": {
                "en": "Section A",
                "fil": "Seksyon A"
              },
              "adviser": null
            },
            {
              "id": "grade-10-b",
              "label": {
                "en": "Section B",
                "fil": "Seksyon B"
              },
              "adviser": null
            }
          ]
        },
        {
          "name": {
            "en": "Grade 11",
            "fil": "Baitang 11"
          },
          "sections": [
            {
              "id": "grade-11-a",
              "label": {
                "en": "Section A",
                "fil": "Seksyon A"
              },
              "adviser": null
            },
            {
              "id": "grade-11-b",
              "label": {
                "en": "Section B",
                "fil": "Seksyon B"
              },
              "adviser": null
            }
          ]
        },
        {
          "name": {
            "en": "Grade 12",
            "fil": "Baitang 12"
          },
          "sections": [
            {
              "id": "grade-12-a",
              "label": {
                "en": "Section A",
                "fil": "Seksyon A"
              },
              "adviser": null
            },
            {
              "id": "grade-12-b",
              "label": {
                "en": "Section B",
                "fil": "Seksyon B"
              },
              "adviser": null
            }
          ]
        }
      ],
      "alumni": {
        "homecoming": {
          "date": null,
          "venue": null,
          "hostBatch": null,
          "theme": null
        },
        "years": [
          "2025",
          "2024",
          "2023"
        ]
      },
      "galleryTitle": {
        "en": "Achievements and events",
        "fil": "Mga tagumpay at kaganapan"
      },
      "gallery": [
        {
          "en": "Recognition day",
          "fil": "Araw ng Pagkilala"
        },
        {
          "en": "Sports fest",
          "fil": "Sports fest"
        },
        {
          "en": "Science fair",
          "fil": "Science fair"
        }
      ],
      "requirements": [
        {
          "en": "PSA birth certificate",
          "fil": "PSA birth certificate"
        },
        {
          "en": "Report card (Form 138)",
          "fil": "Report card (Form 138)"
        },
        {
          "en": "Certificate of completion",
          "fil": "Certificate of completion"
        },
        {
          "en": "Completed enrollment form",
          "fil": "Nasagutang enrollment form"
        }
      ],
      "head": {
        "role": {
          "en": "PRINCIPAL",
          "fil": "PRINCIPAL"
        },
        "name": null,
        "phone": null,
        "email": null,
        "address": null
      }
    }
  ]
};
