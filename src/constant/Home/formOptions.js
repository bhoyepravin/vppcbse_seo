// src/data/formOptions.js

// Teaching Subjects array with proper structure
export const teachingSubjects = [
  { id: "science", label: "SCIENCE / EVS", details: "(PHYSICS, CHEMISTRY, BIOLOGY)" },
  { id: "mathematics", label: "MATHEMATICS", details: "" },
  { id: "sst", label: "SST", details: "(HISTORY, GEOGRAPHY, CIVICS, ECONOMICS)" },
  { id: "marathi", label: "Marathi", details: "" },
  { id: "hindi", label: "HINDI", details: "" },
  { id: "sanskrit", label: "SANSKRIT", details: "" },
  { id: "english", label: "ENGLISH", details: "" },
];

// Posts array for the applying post dropdown
export const posts = [
  // Teaching Staff
  "Pre-Primary Teacher",
  "Primary Teacher", 
  "Secondary Teacher",
  "Computer Teacher",
  "Sports Teacher",
  "PT/Yoga Teacher",
  "Art Teacher",
  "Dance Teacher",
  // Non Teaching Staff
  "Accountant",
  "Office Admin",
  "Clerk",
  "Office Assistant",
  "IT Technician",
  "Librarian",
  "Peon",
];

// Post categories for grouping in dropdown
export const postCategories = {
  teaching: [
    "Pre-Primary Teacher",
    "Primary Teacher",
    "Secondary Teacher",
    "Computer Teacher",
    "Sports Teacher",
    "PT/Yoga Teacher",
    "Art Teacher",
    "Dance Teacher",
  ],
  nonTeaching: [
    "Accountant",
    "Office Admin",
    "Clerk",
    "Office Assistant",
    "IT Technician",
    "Librarian",
    "Peon",
  ]
};

// Gender options
export const genders = ["Male", "Female", "Other"];

// Marital status options
export const marital_status = ["Unmarried", "Married"];

// Religion options
export const religions = [
  "Hindu",
  "Muslim",
  "Christian",
  "Sikh",
  "Buddhist",
  "Other",
];

// Qualification options
export const qualifications = [
  "10th Pass",
  "12th Pass",
  "Diploma",
  "Graduate",
  "Post Graduate",
];

// Note: Caste section has been removed as per requirements

// Export all options as default object as well (optional)
const formOptions = {
  posts,
  teachingSubjects,
  postCategories,
  genders,
  marital_status,
  religions,
  qualifications,
};

export default formOptions;