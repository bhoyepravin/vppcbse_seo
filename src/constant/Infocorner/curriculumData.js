import { lecture1, lecture2, lecture4, personalized, smartclassroom, sportsdayaward2, studentsactivity4, studentsactivity5, teaching1 } from "../../assets";

export const curriculumData = [
  {
    id: 1,
    title: "Foundational Stage (3–8 Years)",
    images: {
      student: studentsactivity4,
      teacher: studentsactivity5,
    },
    passage: [
      "The Foundational Stage focuses on holistic growth across physical, cognitive, socio-emotional, ethical, language, and cultural development. Learning is centred on play-based experiences using concrete materials such as toys, puzzles, picture books, and children’s literature. Strong emphasis is placed on Foundational Literacy and Numeracy. Students learn two languages and achieve literacy in R1 by the end of this stage. Teaching fosters warm, nurturing relationships with a balance between individual exploration and group activities. Assessment is observation-based, with worksheets only in Grades 1 and 2 and no formal examinations.",
    ],
  },
  {
    id: 2,
    title: "Preparatory Stage (8–11 Years)",
    images: {
      student: smartclassroom,
      teacher: personalized,
    },
    passage: [
      "The Preparatory Stage builds strong academic and developmental foundations through a structured curriculum.Subjects include two languages, Mathematics, Art, Physical Education, and The World Around Us with integrated pre-vocational skills.Textbooks gain importance while hands-on learning, real-life experiences, and children’s literature remain central.Teaching is activity-based and gradually transitions students toward structured classroom engagement.Assessment includes continuous observation, written tasks, and periodic summative evaluations.",
    ],
  },
  {
    id: 3,
    title: "Middle Stage (11–14 Years)",
    images: {
      student: teaching1,
      teacher: lecture4,
    },
    passage: [
      "The Middle Stage marks a shift toward formal and abstract learning across three languages and core subjects.Subjects include Mathematics, Science, Social Science, Art, Physical Education, and Vocational Education.Well-defined Learning Standards deepen subject understanding and inquiry skills.Teaching blends direct instruction with inquiry-based learning.Assessments focus on conceptual clarity and higher-order thinking skills.",
    ],
  },
  {
    id: 4,
    title: "Secondary Stage (14–18 Years)",
    images: {
      student: lecture1,
      teacher: sportsdayaward2,
    },
    passage: [
      "The Secondary Stage supports learners aged 14 to 18, continuing the Middle Stage curriculum.Environmental Education is introduced as an interdisciplinary subject.Students develop reasoning, argumentation, and ethical understanding.Learning Standards are clearly defined for all subjects.Students apply knowledge to real-world and environmental challenges.",
    ],
  },
];
