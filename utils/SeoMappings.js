// utils/SeoMappings.js
// Maps URL path slugs → schoolPageSEO keys (from utils/SeoConfig.js).
// The useSEO hook strips leading/trailing slashes, then looks up:
//   1. Full path  (e.g. "academics/middle")
//   2. First segment only (e.g. "academics")
//   3. Falls back to "home"

export const schoolSlugToSeoKeyMap = {
  // ── Home ──────────────────────────────────────────────────────────
  "":                                          "home",
  "/":                                         "home",

  // ── About ─────────────────────────────────────────────────────────
  "about":                                     "about",
  "aboutchmes":                                "aboutchmes",
  "infrastructure":                            "infrastructure",
  "faculty":                                   "faculty",
  "management":                                "management",
  "teachers":                                  "teachers",

  // ── Academics ─────────────────────────────────────────────────────
  "curriculum":                                "curriculum",
  "pre-primary":                               "pre-primary",
  "primary":                                   "primary",
  "secondary":                                 "secondary",
  "academics/middle":                          "academics-middle",
  "academics/result":                          "academics-result",
  "holidays":                                  "holidays",
  "co-curricular":                             "co-curricular",

  // ── Admission ─────────────────────────────────────────────────────
  "admission":                                 "admissionform",
  "admissionprocess":                          "admissionprocess",
  "guidelines":                                "guidelines",
  "enquiry":                                   "enquiry",
  "admissionform":                             "admissionform",

  // ── Info Corner ───────────────────────────────────────────────────
  "cbse-affiliation":                          "cbse-affiliation",
  "affiliation-certificate":                   "affiliation-certificate",
  "circulars":                                 "circulars",
  "book-list":                                 "book-list",
  "reports":                                   "reports",
  "studentscouncil":                           "studentscouncil",
  "disclosure":                                "disclosure",

  // ── Calendar ──────────────────────────────────────────────────────
  "academiccalendar":                          "academiccalendar",
  "class-wise-strength":                       "class-wise-strength",
  "table-table":                               "table-table",

  // ── Gallery ───────────────────────────────────────────────────────
  "images":                                    "images",
  "videos":                                    "videos",
  "sportsimages":                              "sportsimages",
  "sportsvideos":                              "sportsvideos",

  // ── Sports ────────────────────────────────────────────────────────
  "sports/national-international-participants": "sports-national",

  // ── Other Pages ───────────────────────────────────────────────────
  "contact":                                   "contact",
  "social-connect":                            "social-connect",
  "careers":                                   "careers",
  "blog":                                      "blog",
  "virtual-tour":                              "virtual-tour",
  "student-journey":                           "student-journey",
  "privacy":                                   "privacy",
  "terms":                                     "terms",
};
