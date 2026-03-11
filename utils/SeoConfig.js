// utils/SeoConfig.js
// Master SEO Configuration — Vidya Prabodhini Prashala CBSE School
// Single source of truth for all SEO metadata, structured data, and schema generators.
// Used by hooks/useSEO.js to dynamically update meta tags on client-side navigation.

// ─── 1. SITE-WIDE CONFIG ────────────────────────────────────────────
export const schoolSeoConfig = {
  siteName: "Vidya Prabodhini Prashala CBSE",
  societyName: "The Central Hindu Military Education Society (CHME'S)",
  shortName: "VPP CBSE",
  defaultTitle: "Vidya Prabodhini Prashala CBSE | Best School in Nashik",
  defaultDescription:
    "Vidya Prabodhini Prashala CBSE — Premier CBSE affiliated school in Nashik. Quality education from Pre-Primary to Class X under The Central Hindu Military Education Society. CBSE Affiliation No. 1130258.",
  baseUrl: "https://www.vppcbse.bhonsala.in",
  twitterHandle: "@vppcbse",
  address: "Dr. B. S. Moonje Marg, Rambhoomi, Nashik, Maharashtra 422005",
  streetAddress: "Dr. B. S. Moonje Marg, Rambhoomi",
  addressLocality: "Nashik",
  addressRegion: "Maharashtra",
  postalCode: "422005",
  addressCountry: "IN",
  phone: "+91 7507546666",
  email: "info@vppcbse.bhonsala.in",
  affiliationNo: "1130258",
  foundedYear: "1936",
  defaultOgImage: "/logo_chmes.png",
  geo: {
    latitude: "20.0000",
    longitude: "73.7898",
  },
  socialMedia: {
    facebook: "https://facebook.com/vppcbse",
    instagram: "https://instagram.com/vppcbse",
    youtube: "https://youtube.com/vppcbse",
  },
  openingHours: [
    "Mo-Fr 08:00-14:00",
    "Sa 08:00-11:00",
  ],
};

// ─── 2. PAGE-LEVEL SEO ──────────────────────────────────────────────
// Each key matches a route slug (see SeoMappings.js for the route → key mapping).
// Fields: title, description, keywords, canonical, ogImage
export const schoolPageSEO = {

  // ── HOME ──────────────────────────────────────────────────────────
  home: {
    title: "Vidya Prabodhini Prashala CBSE | Best School in Nashik",
    description:
      "Vidya Prabodhini Prashala CBSE — Top CBSE school in Nashik under The Central Hindu Military Education Society. Quality education from Pre-Primary to Class X, expert faculty, modern infrastructure, and holistic development.",
    keywords:
      "best cbse school nashik, vidya prabodhini prashala, vpp cbse, bhonsala school nashik, top school nashik, chme society school, cbse school nashik road",
    canonical: "/",
    ogImage: "/logo_chmes.png",
  },

  // ── ABOUT ─────────────────────────────────────────────────────────
  aboutchmes: {
    title: "About CHME Society | The Central Hindu Military Education Society",
    description:
      "Learn about The Central Hindu Military Education Society (CHME'S), founded by Dr. B.S. Moonje in 1936. The managing body behind Vidya Prabodhini Prashala CBSE, committed to military-inspired, value-based education.",
    keywords:
      "chme society, central hindu military education society, dr bs moonje, education society nashik, school managing body, bhonsala education society",
    canonical: "/aboutchmes",
    ogImage: "/logo_chmes.png",
  },
  about: {
    title: "About Vidya Prabodhini Prashala | Vision, Mission & Values",
    description:
      "Discover the legacy, vision, and mission of Vidya Prabodhini Prashala CBSE. Committed to academic excellence, discipline, and holistic student development since 1936 under CHME'S.",
    keywords:
      "about vpp cbse, school history nashik, vision mission school, school philosophy, value based education nashik, holistic development school",
    canonical: "/about",
    ogImage: "/logo_chmes.png",
  },
  infrastructure: {
    title: "School Infrastructure | Modern Facilities | Vidya Prabodhini Prashala CBSE",
    description:
      "Explore world-class infrastructure at Vidya Prabodhini Prashala CBSE: smart classrooms, science labs, computer labs, library, sports grounds, and virtual school tour. State-of-the-art learning environment in Nashik.",
    keywords:
      "school infrastructure nashik, smart classrooms, science lab school, computer lab nashik, school library, sports facilities school, virtual tour school",
    canonical: "/infrastructure",
    ogImage: "/logo_chmes.png",
  },
  faculty: {
    title: "Our Faculty | Experienced Educators | Vidya Prabodhini Prashala CBSE",
    description:
      "Meet our highly qualified faculty at Vidya Prabodhini Prashala CBSE. Experienced educators blending innovation, compassion, and expertise to nurture curiosity, confidence, and creativity in every student.",
    keywords:
      "school faculty nashik, experienced teachers cbse, teaching staff vpp, educators nashik, best teachers nashik, qualified faculty school",
    canonical: "/faculty",
    ogImage: "/logo_chmes.png",
  },
  management: {
    title: "Management Committee | Vidya Prabodhini Prashala CBSE",
    description:
      "Meet the management committee of Vidya Prabodhini Prashala CBSE under The Central Hindu Military Education Society. Leadership guiding academic excellence and school governance.",
    keywords:
      "school management committee, school governance nashik, school administration, chme management, school board members",
    canonical: "/management",
    ogImage: "/logo_chmes.png",
  },
  teachers: {
    title: "Teaching Staff | Subject Experts | Vidya Prabodhini Prashala CBSE",
    description:
      "Our dedicated teaching staff at Vidya Prabodhini Prashala CBSE are highly qualified, skilled educators committed to quality education from Pre-Primary to Class X, following structured pedagogical practices aligned with CBSE guidelines.",
    keywords:
      "school teachers nashik, class teachers cbse, subject teachers vpp, educator profiles, teaching staff cbse school",
    canonical: "/teachers",
    ogImage: "/logo_chmes.png",
  },

  // ── ACADEMICS ─────────────────────────────────────────────────────
  curriculum: {
    title: "CBSE Curriculum | Academic Programs | Vidya Prabodhini Prashala",
    description:
      "Comprehensive CBSE curriculum at Vidya Prabodhini Prashala across four stages: Foundational (3–8 yrs), Preparatory (8–11 yrs), Middle (11–14 yrs), and Secondary (14–18 yrs). Play-based to critical-thinking progression.",
    keywords:
      "cbse curriculum nashik, ncert syllabus, academic programs vpp, foundational stage, preparatory stage, middle stage, secondary stage cbse",
    canonical: "/curriculum",
    ogImage: "/logo_chmes.png",
  },
  "pre-primary": {
    title: "Pre-Primary School | Nursery, LKG & UKG | Vidya Prabodhini Prashala CBSE",
    description:
      "Quality pre-primary education at Vidya Prabodhini Prashala CBSE for children aged 2–5. Play-based learning, phonics, storytelling, art, and music foster language, motor, and social skills in a nurturing environment.",
    keywords:
      "pre-primary school nashik, nursery admission nashik, lkg ukg school, kindergarten nashik, playschool cbse, early childhood education nashik, pre-primary admission 2026",
    canonical: "/pre-primary",
    ogImage: "/logo_chmes.png",
  },
  primary: {
    title: "Primary School (Class I–V) | Foundation Education | Vidya Prabodhini Prashala",
    description:
      "Strong academic foundation at Vidya Prabodhini Prashala CBSE primary section for ages 6–10. Activity-based learning, character building, and holistic development for classes I–V with subjects including English, Maths, Science, EVS, Computer.",
    keywords:
      "primary school nashik, class 1 to 5 cbse, elementary education nashik, cbse primary school, foundation education, primary section vpp",
    canonical: "/primary",
    ogImage: "/logo_chmes.png",
  },
  "academics-middle": {
    title: "Middle School (Class VI–VIII) | Vidya Prabodhini Prashala CBSE",
    description:
      "The Middle Section at Vidya Prabodhini Prashala CBSE bridges foundational and higher academics for ages 11–13. Analytical thinking, research, and collaborative learning across English, Maths, Science, Social Studies, Computer, and more.",
    keywords:
      "middle school nashik, class 6 7 8 cbse, middle section vpp, junior high school nashik, middle stage education",
    canonical: "/academics/middle",
    ogImage: "/logo_chmes.png",
  },
  secondary: {
    title: "Secondary School (Class IX–X) | CBSE Board Prep | Vidya Prabodhini Prashala",
    description:
      "Comprehensive secondary education at Vidya Prabodhini Prashala CBSE for ages 14–15 (Classes IX–X). Board exam preparation, critical thinking, technology-integrated learning, remedial support, and holistic development.",
    keywords:
      "secondary school nashik, class 9 10 cbse, cbse board preparation nashik, ssc preparation, secondary education vpp, board exam school nashik",
    canonical: "/secondary",
    ogImage: "/logo_chmes.png",
  },
  "academics-result": {
    title: "Academic Results | Achievements | Vidya Prabodhini Prashala CBSE",
    description:
      "View academic results and achievements of students at Vidya Prabodhini Prashala CBSE. Consistent CBSE board performance reflecting our commitment to academic excellence.",
    keywords:
      "school results nashik, cbse results vpp, academic achievements school, board exam results nashik, school toppers",
    canonical: "/academics/result",
    ogImage: "/logo_chmes.png",
  },
  holidays: {
    title: "School Holidays & Vacations 2025-26 | Vidya Prabodhini Prashala CBSE",
    description:
      "Check the complete school holiday and vacation schedule for Vidya Prabodhini Prashala CBSE. Plan your academic year with our holiday list, term dates, and important dates for 2025-26.",
    keywords:
      "school holidays nashik, cbse school vacation, academic year holidays, holiday list vpp, summer vacation school nashik",
    canonical: "/holidays",
    ogImage: "/logo_chmes.png",
  },
  "co-curricular": {
    title: "Co-Curricular Activities | Sports & Cultural Programs | Vidya Prabodhini Prashala",
    description:
      "Explore diverse co-curricular activities at Vidya Prabodhini Prashala CBSE: sports, performing arts, debates, quizzes, cultural programs, and personality development for holistic student growth.",
    keywords:
      "co-curricular activities school, extracurricular nashik, school sports cultural, student activities vpp, personality development school",
    canonical: "/co-curricular",
    ogImage: "/logo_chmes.png",
  },

  // ── ADMISSION ─────────────────────────────────────────────────────
  admissionprocess: {
    title: "Admission Process 2026-27 | Step-by-Step Guide | Vidya Prabodhini Prashala",
    description:
      "Step-by-step guide to admission at Vidya Prabodhini Prashala CBSE for 2026-27. Age criteria: Nursery (3 yrs), Junior KG (4 yrs), Senior KG (5 yrs), Grade 1 (6 yrs). Registration, documents, and key dates.",
    keywords:
      "admission process 2026 nashik, school admission vpp cbse, how to apply vpp, cbse admission nashik 2026, nursery admission nashik, age criteria school admission",
    canonical: "/admissionprocess",
    ogImage: "/logo_chmes.png",
  },
  guidelines: {
    title: "Admission Guidelines | Eligibility & Documents | Vidya Prabodhini Prashala",
    description:
      "Complete admission guidelines for Vidya Prabodhini Prashala CBSE. Check eligibility criteria, age requirements, document checklist, and admission rules for Nursery to Class IX.",
    keywords:
      "admission guidelines nashik, eligibility criteria cbse, school admission documents, age criteria vpp, admission rules school",
    canonical: "/guidelines",
    ogImage: "/logo_chmes.png",
  },
  enquiry: {
    title: "Admission Enquiry | Online Inquiry Form | Vidya Prabodhini Prashala CBSE",
    description:
      "Submit your admission enquiry online at Vidya Prabodhini Prashala CBSE. Get information about admissions, fees, and school facilities. Quick response guaranteed. Call: +91 7507546666.",
    keywords:
      "admission enquiry nashik, school enquiry form, online inquiry vpp, school admission info nashik, enquiry cbse school",
    canonical: "/enquiry",
    ogImage: "/logo_chmes.png",
  },
  admissionform: {
    title: "Apply Online | Admission Form 2026-27 | Vidya Prabodhini Prashala CBSE",
    description:
      "Apply online for admission to Vidya Prabodhini Prashala CBSE for 2026-27. Fill the admission form for Nursery to Class IX and secure your child's seat at our premier CBSE school in Nashik.",
    keywords:
      "apply online school nashik, admission form vpp cbse, online application school, school registration nashik, admission open 2026",
    canonical: "/admissionform",
    ogImage: "/logo_chmes.png",
  },

  // ── INFO CORNER ───────────────────────────────────────────────────
  "cbse-affiliation": {
    title: "CBSE Affiliation No. 1130258 | School Details | Vidya Prabodhini Prashala",
    description:
      "Vidya Prabodhini Prashala CBSE is affiliated to Central Board of Secondary Education, New Delhi. Affiliation No. 1130258. View affiliation certificates, fire safety, and compliance documents.",
    keywords:
      "cbse affiliation nashik, school affiliation number 1130258, cbse school code, cbse affiliated school nashik, affiliation certificate school",
    canonical: "/cbse-affiliation",
    ogImage: "/logo_chmes.png",
  },
  "affiliation-certificate": {
    title: "Affiliation Certificate | CBSE Documents | Vidya Prabodhini Prashala",
    description:
      "View and download official affiliation certificates of Vidya Prabodhini Prashala CBSE including extension of affiliation, fire safety certificate, and Sr. Secondary affiliation as per CBSE norms.",
    keywords:
      "affiliation certificate cbse, school documents nashik, cbse certificate download, fire safety certificate school, affiliation extension",
    canonical: "/affiliation-certificate",
    ogImage: "/logo_chmes.png",
  },
  circulars: {
    title: "School Circulars | Notices & Announcements | Vidya Prabodhini Prashala",
    description:
      "Access all official circulars, notices, and announcements from Vidya Prabodhini Prashala CBSE. Stay updated with important information for parents and students. Linked with CBSE Portal.",
    keywords:
      "school circulars nashik, parent notices vpp, school announcements cbse, cbse portal circulars, school notifications nashik",
    canonical: "/circulars",
    ogImage: "/logo_chmes.png",
  },
  "book-list": {
    title: "Book List | Class-wise Booklist | Vidya Prabodhini Prashala CBSE",
    description:
      "Download the year-wise, class-wise book list for Vidya Prabodhini Prashala CBSE. Prescribed textbooks for Nursery, UKG, LKG and Classes I to X as per CBSE and NCERT guidelines.",
    keywords:
      "school book list nashik, cbse book list, prescribed books vpp, class wise books nashik, ncert books school, textbook list cbse school",
    canonical: "/book-list",
    ogImage: "/logo_chmes.png",
  },
  reports: {
    title: "School Reports | Annual Reports & Documents | Vidya Prabodhini Prashala",
    description:
      "Download annual reports, academic reports, and official documents from Vidya Prabodhini Prashala CBSE. Transparent reporting as per CBSE mandatory disclosure requirements.",
    keywords:
      "school reports nashik, annual report school, cbse reports vpp, school documents download, mandatory reports school",
    canonical: "/reports",
    ogImage: "/logo_chmes.png",
  },
  studentscouncil: {
    title: "Students Council | Leadership & Service | Vidya Prabodhini Prashala CBSE",
    description:
      "Meet the Students Council at Vidya Prabodhini Prashala CBSE. Head Boy, Head Girl, and council members fostering leadership, service, integrity, and democratic participation among students.",
    keywords:
      "students council nashik, head boy head girl vpp, student leadership school, student government nashik, school council members",
    canonical: "/studentscouncil",
    ogImage: "/logo_chmes.png",
  },
  academiccalendar: {
    title: "Academic Calendar 2025-26 | Important Dates | Vidya Prabodhini Prashala",
    description:
      "Download the academic calendar for Vidya Prabodhini Prashala CBSE 2025-26. View exam dates, holidays, school events, and important activities for the academic year.",
    keywords:
      "academic calendar 2025 nashik, school calendar vpp, term dates cbse, exam schedule school nashik, important dates school",
    canonical: "/academiccalendar",
    ogImage: "/logo_chmes.png",
  },
  "class-wise-strength": {
    title: "Class-wise Student Strength | Enrolment Data | Vidya Prabodhini Prashala",
    description:
      "View class-wise student strength and enrolment data at Vidya Prabodhini Prashala CBSE. Transparent display of school enrolment figures as per CBSE disclosure requirements.",
    keywords:
      "class wise strength school, student enrolment nashik, cbse disclosure strength, school strength data vpp",
    canonical: "/class-wise-strength",
    ogImage: "/logo_chmes.png",
  },
  "table-table": {
    title: "Class Timetable | Time-Table | Vidya Prabodhini Prashala CBSE",
    description:
      "View the class-wise timetable at Vidya Prabodhini Prashala CBSE. Structured time-table ensuring balanced learning across all subjects and activities.",
    keywords:
      "school timetable nashik, class timetable vpp, cbse school schedule, subject timetable school",
    canonical: "/table-table",
    ogImage: "/logo_chmes.png",
  },
  disclosure: {
    title: "Mandatory Disclosure | CBSE Compliance | Vidya Prabodhini Prashala",
    description:
      "View mandatory disclosure documents for Vidya Prabodhini Prashala CBSE as per CBSE requirements. School information, infrastructure details, faculty credentials, and compliance records.",
    keywords:
      "mandatory disclosure cbse, school disclosure nashik, cbse compliance vpp, school information disclosure, saras portal cbse",
    canonical: "/disclosure",
    ogImage: "/logo_chmes.png",
  },

  // ── GALLERY ───────────────────────────────────────────────────────
  images: {
    title: "Photo Gallery | Events & Campus Life | Vidya Prabodhini Prashala CBSE",
    description:
      "Browse our photo gallery showcasing school events, celebrations, sports meets, cultural programs, and campus life at Vidya Prabodhini Prashala CBSE Nashik.",
    keywords:
      "school photo gallery nashik, vpp cbse photos, school events photos, campus photos nashik, cultural events school photos",
    canonical: "/images",
    ogImage: "/logo_chmes.png",
  },
  videos: {
    title: "Video Gallery | School Events & Programs | Vidya Prabodhini Prashala CBSE",
    description:
      "Watch videos of school events, cultural programs, sports activities, and academic achievements at Vidya Prabodhini Prashala CBSE Nashik.",
    keywords:
      "school video gallery nashik, vpp cbse videos, school event videos, cultural program videos, school activities videos",
    canonical: "/videos",
    ogImage: "/logo_chmes.png",
  },
  sportsimages: {
    title: "Sports Gallery | Sports Events & Achievements | Vidya Prabodhini Prashala",
    description:
      "View photos from sports events, athletic meets, and sporting achievements at Vidya Prabodhini Prashala CBSE. Celebrating our champions and sportsmanship.",
    keywords:
      "sports gallery school nashik, sports photos vpp, athletic meet nashik, sports achievements school, school sports events photos",
    canonical: "/sportsimages",
    ogImage: "/logo_chmes.png",
  },
  sportsvideos: {
    title: "Sports Videos | Sports Events | Vidya Prabodhini Prashala CBSE",
    description:
      "Watch sports event videos and athletic achievements from Vidya Prabodhini Prashala CBSE. Celebrating sporting excellence and physical development.",
    keywords:
      "sports videos school nashik, sports event videos vpp, athletic videos school, sports achievements video",
    canonical: "/sportsvideos",
    ogImage: "/logo_chmes.png",
  },
  "sports-national": {
    title: "National & International Sports Participants | Vidya Prabodhini Prashala",
    description:
      "Celebrating students of Vidya Prabodhini Prashala CBSE who have represented at national and international sports events. Our pride and sporting champions.",
    keywords:
      "national sports participants school, international sports school nashik, vpp sports champions, national level sports students",
    canonical: "/sports/national-international-participants",
    ogImage: "/logo_chmes.png",
  },

  // ── CONTACT & QUICK LINKS ─────────────────────────────────────────
  contact: {
    title: "Contact Us | Vidya Prabodhini Prashala CBSE Nashik",
    description:
      "Contact Vidya Prabodhini Prashala CBSE. Address: Dr. B. S. Moonje Marg, Rambhoomi, Nashik 422005. Phone: +91 7507546666. Email: info@vppcbse.bhonsala.in. Mon–Fri: 8am–2pm, Sat: 8am–11am.",
    keywords:
      "contact vpp cbse nashik, school contact nashik, school address nashik, school phone email nashik, reach vidya prabodhini prashala",
    canonical: "/contact",
    ogImage: "/logo_chmes.png",
  },
  "social-connect": {
    title: "Social Connect | Follow Vidya Prabodhini Prashala CBSE",
    description:
      "Follow Vidya Prabodhini Prashala CBSE on social media. Stay connected on Facebook, Instagram, and YouTube for school news, events, and updates.",
    keywords:
      "vpp cbse social media, follow school nashik, school facebook instagram youtube, school updates social",
    canonical: "/social-connect",
    ogImage: "/logo_chmes.png",
  },
  careers: {
    title: "Careers | Teaching & Non-Teaching Jobs | Vidya Prabodhini Prashala CBSE",
    description:
      "Explore career opportunities at Vidya Prabodhini Prashala CBSE Nashik. Current openings for teaching and non-teaching positions. Join our team of dedicated educators.",
    keywords:
      "teacher jobs nashik, teaching jobs cbse school, school careers nashik, faculty positions vpp, non-teaching jobs school nashik",
    canonical: "/careers",
    ogImage: "/logo_chmes.png",
  },
  blog: {
    title: "Educational Blog | School News & Parenting Tips | Vidya Prabodhini Prashala",
    description:
      "Read our educational blog for parenting tips, study strategies, school news, and insights into modern education at Vidya Prabodhini Prashala CBSE Nashik.",
    keywords:
      "education blog nashik, school news vpp, parenting tips school, study tips cbse, educational insights nashik",
    canonical: "/blog",
    ogImage: "/logo_chmes.png",
  },
  "virtual-tour": {
    title: "Virtual School Tour | Explore Our Campus | Vidya Prabodhini Prashala CBSE",
    description:
      "Take a virtual tour of Vidya Prabodhini Prashala CBSE campus. Explore classrooms, labs, sports facilities, and infrastructure from the comfort of your home.",
    keywords:
      "virtual school tour nashik, school campus tour, online school visit nashik, 360 school tour vpp, explore campus vpp",
    canonical: "/virtual-tour",
    ogImage: "/logo_chmes.png",
  },
  "student-journey": {
    title: "Student Journey | Life at VPP CBSE | Vidya Prabodhini Prashala",
    description:
      "Explore the student journey at Vidya Prabodhini Prashala CBSE. From pre-primary to secondary, discover how VPP shapes confident, disciplined, and creative learners.",
    keywords:
      "student journey vpp, school life nashik, student experience cbse, life at vpp school nashik",
    canonical: "/student-journey",
    ogImage: "/logo_chmes.png",
  },
  privacy: {
    title: "Privacy Policy | Vidya Prabodhini Prashala CBSE",
    description:
      "Read the privacy policy of Vidya Prabodhini Prashala CBSE. Learn how we collect, use, and protect your personal information on our school website.",
    keywords:
      "privacy policy school, vpp cbse privacy, data protection school website",
    canonical: "/privacy",
    ogImage: "/logo_chmes.png",
  },
  terms: {
    title: "Terms & Conditions | Vidya Prabodhini Prashala CBSE",
    description:
      "Read the terms and conditions of using the Vidya Prabodhini Prashala CBSE website. Guidelines for accessing school information and services online.",
    keywords:
      "terms conditions school, vpp cbse terms, website terms of use school",
    canonical: "/terms",
    ogImage: "/logo_chmes.png",
  },

  // ── 404 ───────────────────────────────────────────────────────────
  notFound: {
    title: "Page Not Found | Vidya Prabodhini Prashala CBSE",
    description:
      "The page you're looking for doesn't exist. Return to Vidya Prabodhini Prashala CBSE homepage for information about our premier CBSE school in Nashik.",
    keywords: "page not found vpp, 404 school website",
    canonical: "/404",
    ogImage: "/logo_chmes.png",
  },
};

// ─── 3. SCHEMA GENERATORS ────────────────────────────────────────────
// Generates Schema.org structured data for rich search results.

/** Base School (EducationalOrganization) schema — injected on every page */
export const getSchoolSchema = (pageDescription = schoolSeoConfig.defaultDescription) => ({
  "@context": "https://schema.org",
  "@type": ["School", "EducationalOrganization"],
  name: schoolSeoConfig.siteName,
  alternateName: schoolSeoConfig.shortName,
  url: schoolSeoConfig.baseUrl,
  logo: {
    "@type": "ImageObject",
    url: `${schoolSeoConfig.baseUrl}/logo_chmes.png`,
    width: 200,
    height: 200,
  },
  image: `${schoolSeoConfig.baseUrl}/logo_chmes.png`,
  description: pageDescription,
  telephone: schoolSeoConfig.phone,
  email: schoolSeoConfig.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: schoolSeoConfig.streetAddress,
    addressLocality: schoolSeoConfig.addressLocality,
    addressRegion: schoolSeoConfig.addressRegion,
    postalCode: schoolSeoConfig.postalCode,
    addressCountry: schoolSeoConfig.addressCountry,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: schoolSeoConfig.geo.latitude,
    longitude: schoolSeoConfig.geo.longitude,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "14:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "08:00",
      closes: "11:00",
    },
  ],
  sameAs: Object.values(schoolSeoConfig.socialMedia),
  foundingDate: schoolSeoConfig.foundedYear,
  numberOfStudents: { "@type": "QuantitativeValue" },
  educationalLevel: ["PreSchool", "PrimarySchool", "MiddleSchool", "SecondarySchool"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Academic Programs",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "EducationalOccupationalProgram", name: "Pre-Primary (Nursery, LKG, UKG)", educationalLevel: "PreSchool" } },
      { "@type": "Offer", itemOffered: { "@type": "EducationalOccupationalProgram", name: "Primary (Class I–V)", educationalLevel: "PrimarySchool" } },
      { "@type": "Offer", itemOffered: { "@type": "EducationalOccupationalProgram", name: "Middle (Class VI–VIII)", educationalLevel: "MiddleSchool" } },
      { "@type": "Offer", itemOffered: { "@type": "EducationalOccupationalProgram", name: "Secondary (Class IX–X)", educationalLevel: "SecondarySchool" } },
    ],
  },
  parentOrganization: {
    "@type": "Organization",
    name: schoolSeoConfig.societyName,
    url: schoolSeoConfig.baseUrl,
  },
  areaServed: "Nashik Metropolitan Region",
  curriculumAlignment: {
    "@type": "AlignmentObject",
    alignmentType: "educationalFramework",
    targetName: "CBSE – Central Board of Secondary Education",
    targetUrl: "https://cbse.gov.in",
  },
});

/** WebSite schema — enables sitelinks searchbox in Google */
export const getWebSiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: schoolSeoConfig.siteName,
  url: schoolSeoConfig.baseUrl,
  potentialAction: {
    "@type": "SearchAction",
    target: `${schoolSeoConfig.baseUrl}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
});

/** BreadcrumbList schema — for any page with breadcrumbs */
export const getBreadcrumbSchema = (crumbs = []) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((crumb, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: crumb.name,
    item: `${schoolSeoConfig.baseUrl}${crumb.path}`,
  })),
});

/** FAQPage schema — pass array of { question, answer } */
export const getFAQSchema = (faqs = []) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: {
      "@type": "Answer",
      text: answer,
    },
  })),
});

/** Article / Blog Post schema */
export const getArticleSchema = ({ headline, description, datePublished, dateModified, image, authorName }) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline,
  description,
  image: image ? `${schoolSeoConfig.baseUrl}${image}` : `${schoolSeoConfig.baseUrl}/logo_chmes.png`,
  datePublished,
  dateModified: dateModified || datePublished,
  author: {
    "@type": "Organization",
    name: authorName || schoolSeoConfig.siteName,
    url: schoolSeoConfig.baseUrl,
  },
  publisher: {
    "@type": "Organization",
    name: schoolSeoConfig.siteName,
    logo: {
      "@type": "ImageObject",
      url: `${schoolSeoConfig.baseUrl}/logo_chmes.png`,
    },
  },
});

/** Build composite structured data for a specific page type */
export const buildPageSchema = (seoKey, pageData) => {
  const schemas = [];

  // Always include School schema
  schemas.push(getSchoolSchema(pageData.description));

  // Add page-specific schemas
  if (seoKey === "home") {
    schemas.push(getWebSiteSchema());
  }

  if (seoKey.includes("admission")) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      name: schoolSeoConfig.siteName,
      url: schoolSeoConfig.baseUrl,
      description: pageData.description,
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "School Admissions 2026-27",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "EducationalOccupationalProgram", name: "Nursery Admission", description: "Age: 3 years" } },
          { "@type": "Offer", itemOffered: { "@type": "EducationalOccupationalProgram", name: "Junior KG Admission", description: "Age: 4 years" } },
          { "@type": "Offer", itemOffered: { "@type": "EducationalOccupationalProgram", name: "Senior KG Admission", description: "Age: 5 years" } },
          { "@type": "Offer", itemOffered: { "@type": "EducationalOccupationalProgram", name: "Grade 1 Admission", description: "Age: 6 years" } },
        ],
      },
    });
  }

  if (seoKey === "contact") {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Contact Vidya Prabodhini Prashala CBSE",
      url: `${schoolSeoConfig.baseUrl}/contact`,
      description: pageData.description,
    });
  }

  if (seoKey === "blog") {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Blog",
      name: `${schoolSeoConfig.siteName} — Blog`,
      url: `${schoolSeoConfig.baseUrl}/blog`,
      description: pageData.description,
      publisher: {
        "@type": "Organization",
        name: schoolSeoConfig.siteName,
        logo: { "@type": "ImageObject", url: `${schoolSeoConfig.baseUrl}/logo_chmes.png` },
      },
    });
  }

  // Wrap multiple schemas in a @graph if there are more than one
  if (schemas.length === 1) return schemas[0];
  return { "@context": "https://schema.org", "@graph": schemas.map(s => { const { "@context": _, ...rest } = s; return rest; }) };
};

// ─── 4. METADATA BUILDER (utility) ───────────────────────────────────
// Use this if you ever add SSR or prerendering support.
export const buildMetadata = (seoKey) => {
  const pageData = schoolPageSEO[seoKey] || schoolPageSEO.home;
  const ogImageUrl = pageData.ogImage
    ? `${schoolSeoConfig.baseUrl}${pageData.ogImage}`
    : `${schoolSeoConfig.baseUrl}/logo_chmes.png`;

  return {
    title: pageData.title,
    description: pageData.description,
    keywords: pageData.keywords,
    canonical: `${schoolSeoConfig.baseUrl}${pageData.canonical}`,
    openGraph: {
      title: pageData.title,
      description: pageData.description,
      url: `${schoolSeoConfig.baseUrl}${pageData.canonical}`,
      siteName: schoolSeoConfig.siteName,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: pageData.title }],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageData.title,
      description: pageData.description,
      images: [ogImageUrl],
      site: schoolSeoConfig.twitterHandle,
    },
  };
};
