// constant/Admission/admissionProcessData.js
export const admissionProcessData = {
  title: "Admission Process",
  subtitle: "Simple Step-by-Step Journey",
  description:
    "Your choice of your child's educational institution is one of the most important decisions of your life. We understand that finding the right school assures you of your child's development and future. Our simple step-by-step process helps us to learn about each other and set expectations to prepare your child for a better tomorrow.",
  welcomeMessage: "You are welcome.",

  // Horizontal Procedure Steps
  horizontalSteps: [
    {
      id: 1,
      title: "Apply Through\nEnquiry Form",
      icon: "file-text",
      description: "Start your journey by filling our online enquiry form",
    },
    {
      id: 2,
      title: "Connect With\nAdmin Office",
      icon: "headphones",
      description: "Get personalized guidance from our admin team",
    },
    {
      id: 3,
      title: "School Visit",
      icon: "school",
      description: "Experience our campus and facilities firsthand",
    },
    {
      id: 4,
      title: "Application\nInvite",
      icon: "mail",
      description: "Receive formal application invitation",
    },
    {
      id: 5,
      title: "Parents Child\nInteraction",
      icon: "message-circle-question",
      description: "Assessment and interaction session",
    },
    {
      id: 6,
      title: "Admission\nDecision",
      icon: "check-circle",
      description: "Final admission confirmation",
    },
  ],

  // Age Criteria
  ageCriteria: {
    title: "Minimum Age Criteria for Admission",
    academicYear: "2026-2027",
    admissionStatus: "OPEN",
    classes: [
      {
        id: 1,
        className: "Nursery",
        age: "3 Years",
        //asOfDate: "as of 31st March 2026",
      },
      {
        id: 2,
        className: "Junior KG",
        age: "4 Years",
        //asOfDate: "as of 31st March 2026",
      },
      {
        id: 3,
        className: "Senior KG",
        age: "5 Years",
        //asOfDate: "as of 31st March 2026",
      },
      {
        id: 4,
        className: "Grade 1",
        age: "6 Years",
        //asOfDate: "as of 31st March 2026",
      },
    ],
  },

  // Admission Open Banner
  admissionOpen: {
    academicYear: "2026-2027",
    status: "OPEN",
    buttonText: "Admission Open for Academic Year 2026-27",
    notificationText:
      "Admissions are now open for the academic year 2026-2027. Limited seats available. Apply now to secure your child's future.",
    applyLink: "/admissionform",
    enquiryLink: "/enquiry",
  },

  
};
