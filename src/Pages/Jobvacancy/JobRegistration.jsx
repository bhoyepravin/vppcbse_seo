// // src/pages/JobRegistration.jsx
// import { useState, useEffect } from "react";
// import {
//   posts,
//   genders,
//   maritalStatus,
//   religions,
//   qualifications,
//   postCategories,
//   teachingSubjects,
// } from "../../constant/Home/formOptions";
// import axiosInstance from "../../services/api"; // Update this import path based on your project structure

// const JobRegistration = () => {
//   const [form, setForm] = useState({
//     name: "",
//     mobile: "",
//     email: "",
//     dob: "",
//     age: "",
//     gender: "",
//     maritalStatus: "",
//     religion: "",
//     address: "",
//     post: "",
//     qualification: ""
//   });
//   const [selectedSubjects, setSelectedSubjects] = useState([]);
//   const [fileError, setFileError] = useState("");
//   const [fileName, setFileName] = useState("");
//   const [file, setFile] = useState(null);
//   const [ageError, setAgeError] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitError, setSubmitError] = useState("");
//   const [submitSuccess, setSubmitSuccess] = useState(false);

//   // Debug: Log the imported data
//   useEffect(() => {
//     console.log("Teaching Subjects imported:", teachingSubjects);
//     console.log("Post Categories:", postCategories);
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
    
//     // Validation for name (only letters and spaces)
//     if (name === "name") {
//       const nameRegex = /^[A-Za-z\s]*$/;
//       if (!nameRegex.test(value) && value !== "") {
//         return;
//       }
//     }
    
//     // Validation for mobile (only digits, max 10)
//     if (name === "mobile") {
//       const mobileRegex = /^\d*$/;
//       if (!mobileRegex.test(value) && value !== "") {
//         return;
//       }
//       if (value.length > 10) {
//         return;
//       }
//     }

//     setForm({ ...form, [name]: value });
//   };

//   // FIXED: Using subject_id (string values like 'physics', 'math')
//   const handleSubjectChange = (subjectId) => {
//     setSelectedSubjects(prev => {
//       if (prev.includes(subjectId)) {
//         return prev.filter(id => id !== subjectId);
//       } else {
//         return [...prev, subjectId];
//       }
//     });
//   };

//   const calculateAge = (dob) => {
//     if (!dob) return "";
    
//     const today = new Date();
//     const birthDate = new Date(dob);
//     let age = today.getFullYear() - birthDate.getFullYear();
//     const monthDiff = today.getMonth() - birthDate.getMonth();
    
//     if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
//       age--;
//     }
    
//     return age >= 0 ? age : 0;
//   };

//   const handleDateChange = (e) => {
//     const dob = e.target.value;
//     setForm({ ...form, dob: dob });
    
//     if (dob) {
//       const age = calculateAge(dob);
//       setForm(prev => ({ ...prev, age: age.toString() }));
//       setAgeError("");
//     }
//   };

//   const handleAgeChange = (e) => {
//     const value = e.target.value;
//     const ageRegex = /^\d{0,3}$/;
//     if (!ageRegex.test(value)) {
//       return;
//     }
    
//     if (value && (parseInt(value) < 0 || parseInt(value) > 120)) {
//       setAgeError("Age must be between 0 and 120 years");
//     } else {
//       setAgeError("");
//     }
    
//     setForm({ ...form, age: value });
//   };

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFileError("");
    
//     if (selectedFile) {
//       const maxSize = 5 * 1024 * 1024; // 5MB
//       if (selectedFile.size > maxSize) {
//         setFileError("File size exceeds 5MB. Please upload a smaller file.");
//         e.target.value = null;
//         setFileName("");
//         setFile(null);
//         return;
//       }
      
//       const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'application/pdf'];
//       if (!allowedTypes.includes(selectedFile.type)) {
//         setFileError("Please upload only image files (JPEG, PNG, GIF) or PDF format.");
//         e.target.value = null;
//         setFileName("");
//         setFile(null);
//         return;
//       }
      
//       setFileName(selectedFile.name);
//       setFile(selectedFile);
//     }
//   };

//   // Check if selected post requires subject selection
//   const requiresSubjects = () => {
//     const result = form.post === "Primary Teacher" || form.post === "Secondary Teacher";
//     console.log("Requires subjects?", result, "Post:", form.post);
//     return result;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validation
//     if (requiresSubjects() && selectedSubjects.length === 0) {
//       alert("Please select at least one teaching subject");
//       return;
//     }
    
//     if (form.age && (parseInt(form.age) < 0 || parseInt(form.age) > 120)) {
//       alert("Please enter a valid age between 0 and 120");
//       return;
//     }
    
//     if (fileError) {
//       alert(fileError);
//       return;
//     }

//     if (!file) {
//       alert("Please upload your resume");
//       return;
//     }

//     setIsSubmitting(true);
//     setSubmitError("");
//     setSubmitSuccess(false);

//     try {
//       // Create FormData object for file upload
//       const formData = new FormData();
      
//       // Add all form fields
//       formData.append('name', form.name || '');
//       formData.append('mobile', form.mobile || '');
//       formData.append('email', form.email || '');
//       formData.append('dob', form.dob || '');
//       formData.append('age', form.age || '');
//       formData.append('gender', form.gender || '');
//       formData.append('maritalStatus', form.maritalStatus || '');
//       formData.append('religion', form.religion || '');
//       formData.append('address', form.address || '');
//       formData.append('post', form.post || '');
//       formData.append('qualification', form.qualification || '');
      
//       // FIXED: Add selected subjects as array using subject_id (string values)
//       // This sends values like 'physics', 'math', 'history' etc. which match your database
//       if (selectedSubjects.length > 0) {
//         selectedSubjects.forEach(subjectId => {
//           formData.append('selectedSubjects[]', subjectId);
//         });
//         console.log("Selected subjects being sent:", selectedSubjects);
//       }
      
//       // Add resume file
//       formData.append('resume', file);

//       const response = await axiosInstance.post('/job-apply', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (response.data.success) {
//         console.log("Application submitted successfully:", response.data);
//         setSubmitSuccess(true);
        
//         // Reset form
//         setForm({
//           name: "",
//           mobile: "",
//           email: "",
//           dob: "",
//           age: "",
//           gender: "",
//           maritalStatus: "",
//           religion: "",
//           address: "",
//           post: "",
//           qualification: ""
//         });
//         setSelectedSubjects([]);
//         setFileName("");
//         setFile(null);
//         setFileError("");
//         setAgeError("");
        
//         alert("Application submitted successfully!");
//       } else {
//         throw new Error(response.data.message || "Failed to submit application");
//       }
//     } catch (error) {
//       console.error("Submission error:", error);
      
//       // Handle validation errors
//       if (error.response?.data?.errors) {
//         const errorMessages = Object.values(error.response.data.errors).flat().join('\n');
//         setSubmitError(errorMessages);
//         alert(`Validation errors:\n${errorMessages}`);
//       } else {
//         const errorMessage = error.response?.data?.message || error.message || "An error occurred. Please try again.";
//         setSubmitError(errorMessage);
//         alert(errorMessage);
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex justify-center items-center py-10 px-4">
//       <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl p-8 md:p-10">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h2 className="font-title text-3xl md:text-4xl font-bold text-gradient-navy">
//             Job Application Form
//           </h2>
          
//           <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
//             <p className="text-blue-800">
//               Already registered?{' '}
//               <span className="font-semibold underline cursor-pointer hover:text-blue-600 transition-colors">
//                 Click here to check status
//               </span>
//             </p>
//           </div>

//           {submitSuccess && (
//             <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
//               <p className="text-green-700 font-medium">✓ Application submitted successfully!</p>
//             </div>
//           )}

//           {submitError && (
//             <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
//               <p className="text-red-600 text-sm whitespace-pre-line">{submitError}</p>
//             </div>
//           )}
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-8">
//           {/* Applying Post */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Applying for Post *
//             </label>
//             <select 
//               name="post" 
//               onChange={handleChange} 
//               value={form.post || ""}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
//               required
//             >
//               <option value="">Select a post</option>
              
//               {/* Teaching Staff Group */}
//               <optgroup label="Teaching Staff" className="font-semibold">
//                 {postCategories.teaching.map((p) => (
//                   <option key={p} value={p}>{p}</option>
//                 ))}
//               </optgroup>
              
//               {/* Non Teaching Staff Group */}
//               <optgroup label="Non Teaching Staff" className="font-semibold">
//                 {postCategories.nonTeaching.map((p) => (
//                   <option key={p} value={p}>{p}</option>
//                 ))}
//               </optgroup>
//             </select>
            
//             {form.post && (
//               <p className="mt-2 text-sm text-gray-500">
//                 Selected: {postCategories.teaching.includes(form.post) ? 'Teaching Staff' : 
//                           postCategories.nonTeaching.includes(form.post) ? 'Non Teaching Staff' : ''}
//               </p>
//             )}
//           </div>

//           {/* TEACHING SUBJECTS - Conditional for Primary and Secondary Teachers */}
//           {requiresSubjects() && (
//             <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
//               <label className="block text-sm font-semibold text-gray-700 mb-4">
//                 TEACHING SUBJECTS <span className="text-red-500">*</span>
//               </label>
//               <p className="text-sm text-gray-600 mb-4">Select all subjects you can teach (you can select multiple):</p>
              
//               {/* Check if teachingSubjects exists and has items */}
//               {teachingSubjects && teachingSubjects.length > 0 ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {teachingSubjects.map((subject) => {
//                     // FIXED: Use subject_id for the value (string like 'physics', 'math')
//                     const subjectId = subject.subject_id || subject.id;
//                     // Create a unique ID for the checkbox to prevent all checkboxes from being linked
//                     const checkboxId = `subject-${subjectId}`;
                    
//                     return (
//                       <div key={checkboxId} className="flex items-start space-x-3 p-3 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-blue-200">
//                         <input
//                           type="checkbox"
//                           id={checkboxId}
//                           checked={selectedSubjects.includes(subjectId)}
//                           onChange={() => handleSubjectChange(subjectId)}
//                           className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
//                         />
//                         <label htmlFor={checkboxId} className="text-sm text-gray-700 cursor-pointer flex-1">
//                           <span className="font-medium">{subject.label}</span>
//                           {subject.details && (
//                             <span className="text-xs text-gray-500 block mt-1">{subject.details}</span>
//                           )}
//                         </label>
//                       </div>
//                     );
//                   })}
//                 </div>
//               ) : (
//                 <p className="text-red-500">No teaching subjects available</p>
//               )}

//               {/* Selected subjects summary */}
//               <div className="mt-4 p-4 bg-white rounded-lg border border-blue-100">
//                 <p className="text-sm font-medium text-gray-700">
//                   Selected Subjects: <span className="text-blue-600 font-bold">{selectedSubjects.length}</span>
//                 </p>
//                 {selectedSubjects.length > 0 ? (
//                   <div className="mt-3 flex flex-wrap gap-2">
//                     {selectedSubjects.map(subjectId => {
//                       // FIXED: Find subject by subject_id
//                       const subject = teachingSubjects.find(s => 
//                         (s.subject_id || s.id) === subjectId
//                       );
//                       return subject && (
//                         <span 
//                           key={subjectId} 
//                           className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200"
//                         >
//                           {subject.label}
//                           <button
//                             type="button"
//                             onClick={() => handleSubjectChange(subjectId)}
//                             className="ml-2 text-blue-600 hover:text-blue-800 font-bold"
//                           >
//                             ×
//                           </button>
//                         </span>
//                       );
//                     })}
//                   </div>
//                 ) : (
//                   <p className="text-xs text-red-500 mt-2">Please select at least one subject</p>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Name */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Full Name (as per Aadhaar) *
//             </label>
//             <input 
//               name="name" 
//               value={form.name || ""}
//               onChange={handleChange}
//               placeholder="Enter your full name"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
//               required
//             />
//           </div>

//           {/* Contact Information */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Mobile Number *
//               </label>
//               <input 
//                 name="mobile" 
//                 value={form.mobile || ""}
//                 onChange={handleChange}
//                 placeholder="Enter 10-digit mobile number"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
//                 type="tel"
//                 required
//                 maxLength="10"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Email Address *
//               </label>
//               <input 
//                 name="email" 
//                 value={form.email || ""}
//                 onChange={handleChange}
//                 placeholder="Enter your email"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
//                 type="email"
//                 required
//               />
//             </div>
//           </div>

//           {/* Gender & Marital Status */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Gender *
//               </label>
//               <select 
//                 name="gender" 
//                 onChange={handleChange} 
//                 value={form.gender || ""}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
//                 required
//               >
//                 <option value="">Select gender</option>
//                 {genders.map((g) => (
//                   <option key={g} value={g}>{g}</option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Marital Status *
//               </label>
//               <select 
//                 name="maritalStatus" 
//                 onChange={handleChange} 
//                 value={form.maritalStatus || ""}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
//                 required
//               >
//                 <option value="">Select status</option>
//                 {maritalStatus.map((m) => (
//                   <option key={m} value={m}>{m}</option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* Date of Birth & Age */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Date of Birth *
//               </label>
//               <input 
//                 type="date" 
//                 name="dob" 
//                 value={form.dob || ""}
//                 onChange={handleDateChange}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Age *
//               </label>
//               <input 
//                 name="age" 
//                 value={form.age || ""}
//                 onChange={handleAgeChange}
//                 placeholder="Age will auto-calculate from DOB"
//                 className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
//                   ageError ? 'border-red-500' : 'border-gray-300'
//                 }`}
//                 type="text"
//                 inputMode="numeric"
//                 required
//                 readOnly={!!form.dob}
//               />
//               {ageError && <p className="text-xs text-red-500 mt-1">{ageError}</p>}
//             </div>
//           </div>

//           {/* Religion */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Religion *
//             </label>
//             <select 
//               name="religion" 
//               onChange={handleChange} 
//               value={form.religion || ""}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
//               required
//             >
//               <option value="">Select religion</option>
//               {religions.map((r) => (
//                 <option key={r} value={r}>{r}</option>
//               ))}
//             </select>
//           </div>

//           {/* Address */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Permanent / Correspondence Address *
//             </label>
//             <textarea 
//               name="address" 
//               value={form.address || ""}
//               onChange={handleChange}
//               placeholder="Enter your complete address"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all h-32 resize-none"
//               required
//             />
//           </div>

//           {/* Qualification */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Highest Qualification *
//             </label>
//             <select 
//               name="qualification" 
//               onChange={handleChange} 
//               value={form.qualification || ""}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
//               required
//             >
//               <option value="">Select qualification</option>
//               {qualifications.map((q) => (
//                 <option key={q} value={q}>{q}</option>
//               ))}
//             </select>
//           </div>

//           {/* File Upload */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Upload CV / Resume *
//             </label>
//             <div className="mt-2 flex items-center justify-center w-full">
//               <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors ${
//                 fileError ? 'border-red-300' : 'border-gray-300'
//               }`}>
//                 <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                   <svg className="w-8 h-8 mb-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
//                   </svg>
//                   <p className="mb-2 text-sm text-gray-500">
//                     <span className="font-semibold">Click to upload</span> or drag and drop
//                   </p>
//                   <p className="text-xs text-gray-500">Images (JPEG, PNG, GIF) or PDF (MAX. 5MB)</p>
//                   {fileName && <p className="text-xs text-green-600 mt-1">Selected: {fileName}</p>}
//                 </div>
//                 <input 
//                   type="file" 
//                   className="hidden" 
//                   accept=".jpg,.jpeg,.png,.gif,.pdf"
//                   onChange={handleFileChange}
//                   required
//                 />
//               </label>
//             </div>
//             {fileError && <p className="text-xs text-red-500 mt-2">{fileError}</p>}
//           </div>

//           {/* Submit Button */}
//           <div className="mt-10">
//             <button 
//               type="submit"
//               disabled={isSubmitting}
//               className={`w-full py-4 font-semibold text-white rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
//                 isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'
//               }`}
//               style={{ backgroundColor: '#194369' }}
//             >
//               {isSubmitting ? (
//                 <span className="flex items-center justify-center gap-2">
//                   <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Submitting...
//                 </span>
//               ) : (
//                 'Submit Application'
//               )}
//             </button>
            
//             <p className="text-center text-gray-600 text-sm mt-4">
//               By submitting, you agree to our terms and conditions
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default JobRegistration;


// src/pages/JobRegistration.jsx
// src/pages/JobRegistration.jsx

import { useState, useEffect } from "react";
import {
  posts,
  genders,
  marital_status,
  religions,
  qualifications,
  postCategories,
  teachingSubjects,
} from "../../constant/Home/formOptions";
import axiosInstance from "../../services/api";

const JobRegistration = () => {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    dob: "",
    age: "",
    gender: "",
    marital_status: "",
    religion: "",
    address: "",
    post: "",
    qualification: ""
  });
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [fileError, setFileError] = useState("");
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const [ageError, setAgeError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [applicationData, setApplicationData] = useState(null);

  // Debug: Log the imported data
  useEffect(() => {
    console.log("Teaching Subjects imported:", teachingSubjects);
    console.log("Post Categories:", postCategories);
    console.log("Marital Status options:", marital_status);
  }, []);

  // Monitor file state changes
  useEffect(() => {
    console.log("File state updated:", file ? file.name : "No file");
  }, [file]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Validation for name (only letters and spaces)
    if (name === "name") {
      const nameRegex = /^[A-Za-z\s]*$/;
      if (!nameRegex.test(value) && value !== "") {
        return;
      }
    }
    
    // Validation for mobile (only digits, max 10)
    if (name === "mobile") {
      const mobileRegex = /^\d*$/;
      if (!mobileRegex.test(value) && value !== "") {
        return;
      }
      if (value.length > 10) {
        return;
      }
    }

    console.log(`Changing ${name} to:`, value);
    setForm({ ...form, [name]: value });
  };

  const handleSubjectChange = (subjectId) => {
    setSelectedSubjects(prev => {
      if (prev.includes(subjectId)) {
        return prev.filter(id => id !== subjectId);
      } else {
        return [...prev, subjectId];
      }
    });
  };

  const calculateAge = (dob) => {
    if (!dob) return "";
    
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age >= 0 ? age : 0;
  };

  const handleDateChange = (e) => {
    const dob = e.target.value;
    setForm({ ...form, dob: dob });
    
    if (dob) {
      const age = calculateAge(dob);
      setForm(prev => ({ ...prev, age: age.toString() }));
      setAgeError("");
    }
  };

  const handleAgeChange = (e) => {
    const value = e.target.value;
    const ageRegex = /^\d{0,3}$/;
    if (!ageRegex.test(value)) {
      return;
    }
    
    if (value && (parseInt(value) < 0 || parseInt(value) > 120)) {
      setAgeError("Age must be between 0 and 120 years");
    } else {
      setAgeError("");
    }
    
    setForm({ ...form, age: value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFileError("");
    
    if (selectedFile) {
      console.log("File selected:", {
        name: selectedFile.name,
        type: selectedFile.type,
        size: selectedFile.size,
        isValid: selectedFile instanceof File
      });
      
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (selectedFile.size > maxSize) {
        setFileError("File size exceeds 5MB. Please upload a smaller file.");
        e.target.value = null;
        setFileName("");
        setFile(null);
        return;
      }
      
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'application/pdf'];
      if (!allowedTypes.includes(selectedFile.type)) {
        setFileError("Please upload only image files (JPEG, PNG, GIF) or PDF format.");
        e.target.value = null;
        setFileName("");
        setFile(null);
        return;
      }
      
      setFileName(selectedFile.name);
      setFile(selectedFile);
      
      // Force a re-render to update UI
      setTimeout(() => {
        console.log("File state after selection:", file);
      }, 100);
    }
  };

  const requiresSubjects = () => {
    const result = form.post === "Primary Teacher" || form.post === "Secondary Teacher";
    console.log("Requires subjects?", result, "Post:", form.post);
    return result;
  };

  const closeThankYou = () => {
    setShowThankYou(false);
    setApplicationData(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation for age
    if (form.age && (parseInt(form.age) < 0 || parseInt(form.age) > 120)) {
      alert("Please enter a valid age between 0 and 120");
      return;
    }
    
    if (fileError) {
      alert(fileError);
      return;
    }

    if (!file) {
      alert("Please upload your resume");
      return;
    }

    // Check if marital_status has a value
    if (!form.marital_status || form.marital_status.trim() === "") {
      alert("Please select your marital status");
      return;
    }

    // Show warning but don't block submission if subjects are required but not selected
    if (requiresSubjects() && selectedSubjects.length === 0) {
      const confirmSubmit = window.confirm(
        "You haven't selected any teaching subjects. Are you sure you want to continue?"
      );
      if (!confirmSubmit) {
        return;
      }
    }

    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess(false);

    try {
      console.log("===== SUBMITTING FORM =====");
      console.log("Current form state:", form);
      console.log("marital_status value:", form.marital_status);
      console.log("File being submitted:", file ? file.name : "No file");
      
      const formData = new FormData();
      
      // Add all form fields
      formData.append('name', form.name || '');
      formData.append('mobile', form.mobile || '');
      formData.append('email', form.email || '');
      formData.append('dob', form.dob || '');
      formData.append('age', form.age || '');
      formData.append('gender', form.gender || '');
      formData.append('marital_status', form.marital_status);
      formData.append('religion', form.religion || '');
      formData.append('address', form.address || '');
      formData.append('post', form.post || '');
      formData.append('qualification', form.qualification || '');
      
      // For subjects - always send, even if empty
      if (selectedSubjects.length > 0) {
        formData.append('selected_subjects', JSON.stringify(selectedSubjects));
        console.log("Selected subjects:", selectedSubjects);
      } else {
        formData.append('selected_subjects', JSON.stringify([]));
        console.log("No subjects selected");
      }
      
      // Add resume file with validation - THIS WORKS IN BOTH CASES
      if (file && file instanceof File) {
        formData.append('resume', file);
        console.log("File appended:", file.name, file.type, file.size);
      } else {
        console.error("Invalid file object:", file);
        alert("Please select a valid resume file");
        setIsSubmitting(false);
        return;
      }

      // Log FormData entries
      console.log("FormData entries:");
      for (let pair of formData.entries()) {
        if (pair[0] === 'resume') {
          console.log(pair[0] + ':', pair[1].name);
        } else if (pair[0] === 'selected_subjects') {
          console.log(pair[0] + ':', JSON.parse(pair[1]));
        } else {
          console.log(pair[0] + ':', pair[1]);
        }
      }
      console.log("===== END FORM DATA =====");

      const response = await axiosInstance.post('/job-apply', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 30000,
      });

      if (response.data.success) {
        console.log("Application submitted successfully:", response.data);
        setSubmitSuccess(true);
        setApplicationData(response.data.data);
        setShowThankYou(true);
        
        // Reset form
        setForm({
          name: "",
          mobile: "",
          email: "",
          dob: "",
          age: "",
          gender: "",
          marital_status: "",
          religion: "",
          address: "",
          post: "",
          qualification: ""
        });
        setSelectedSubjects([]);
        setFileName("");
        setFile(null);
        setFileError("");
        setAgeError("");
        
      } else {
        throw new Error(response.data.message || "Failed to submit application");
      }
    } catch (error) {
      console.error("Submission error:", error);
      
      if (error.response?.data?.errors) {
        const errorMessages = Object.values(error.response.data.errors).flat().join('\n');
        setSubmitError(errorMessages);
        alert(`Validation errors:\n${errorMessages}`);
      } else if (error.code === 'ECONNABORTED') {
        alert("Request timed out. Please try again.");
      } else if (error.response?.status === 413) {
        alert("File too large. Please upload a smaller file (max 5MB).");
      } else {
        const errorMessage = error.response?.data?.message || error.message || "An error occurred. Please try again.";
        setSubmitError(errorMessage);
        alert(errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Debug function to check current state
  const debugState = () => {
    console.log("Current state:", {
      file: file,
      fileName: fileName,
      fileType: file?.type,
      fileSize: file?.size,
      selectedSubjects: selectedSubjects,
      form: form
    });
    alert(`File selected: ${fileName ? fileName : 'No file'}\nSubjects selected: ${selectedSubjects.length}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex justify-center items-center py-10 px-4">
      {/* Thank You Popup Modal */}
      {showThankYou && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform animate-fadeIn">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                <svg className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
              <p className="text-gray-600 mb-4">Your application has been submitted successfully.</p>
              
              {applicationData && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                  <p className="text-sm text-gray-700 mb-2">
                    <span className="font-semibold">Application ID:</span> #{applicationData.id}
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    <span className="font-semibold">Name:</span> {applicationData.name}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Status:</span> 
                    <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                      {applicationData.status}
                    </span>
                  </p>
                </div>
              )}
              
              <p className="text-sm text-gray-500 mb-6">
                We will review your application and contact you soon.
              </p>
              
              <button
                onClick={closeThankYou}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl p-8 md:p-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="font-title text-3xl md:text-4xl font-bold text-gradient-navy">
            Job Application Form
          </h2>
          
          {/* <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800">
              Already registered?{' '}
              <span className="font-semibold underline cursor-pointer hover:text-blue-600 transition-colors">
                Click here to check status
              </span>
            </p>
          </div> */}

          {submitSuccess && !showThankYou && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 font-medium">✓ Application submitted successfully!</p>
            </div>
          )}

          {submitError && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm whitespace-pre-line">{submitError}</p>
            </div>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Applying Post */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Applying for Post *
            </label>
            <select 
              name="post" 
              onChange={handleChange} 
              value={form.post || ""}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              required
            >
              <option value="">Select a post</option>
              
              {/* Teaching Staff Group */}
              <optgroup label="Teaching Staff" className="font-semibold">
                {postCategories.teaching.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </optgroup>
              
              {/* Non Teaching Staff Group */}
              <optgroup label="Non Teaching Staff" className="font-semibold">
                {postCategories.nonTeaching.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </optgroup>
            </select>
            
            {form.post && (
              <p className="mt-2 text-sm text-gray-500">
                Selected: {postCategories.teaching.includes(form.post) ? 'Teaching Staff' : 
                          postCategories.nonTeaching.includes(form.post) ? 'Non Teaching Staff' : ''}
              </p>
            )}
          </div>

          {/* TEACHING SUBJECTS - Conditional for Primary and Secondary Teachers */}
          {requiresSubjects() && (
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                TEACHING SUBJECTS <span className="text-gray-500 text-sm font-normal ml-2">(Optional - you can skip if not applicable)</span>
              </label>
              <p className="text-sm text-gray-600 mb-4">Select all subjects you can teach (you can select multiple):</p>
              
              {/* Check if teachingSubjects exists and has items */}
              {teachingSubjects && teachingSubjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {teachingSubjects.map((subject) => {
                    const subjectId = subject.subject_id || subject.id;
                    const checkboxId = `subject-${subjectId}`;
                    
                    return (
                      <div key={checkboxId} className="flex items-start space-x-3 p-3 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-blue-200">
                        <input
                          type="checkbox"
                          id={checkboxId}
                          checked={selectedSubjects.includes(subjectId)}
                          onChange={() => handleSubjectChange(subjectId)}
                          className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                        />
                        <label htmlFor={checkboxId} className="text-sm text-gray-700 cursor-pointer flex-1">
                          <span className="font-medium">{subject.label}</span>
                          {subject.details && (
                            <span className="text-xs text-gray-500 block mt-1">{subject.details}</span>
                          )}
                        </label>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-red-500">No teaching subjects available</p>
              )}

              {/* Selected subjects summary */}
              <div className="mt-4 p-4 bg-white rounded-lg border border-blue-100">
                <p className="text-sm font-medium text-gray-700">
                  Selected Subjects: <span className="text-blue-600 font-bold">{selectedSubjects.length}</span>
                </p>
                {selectedSubjects.length > 0 ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedSubjects.map(subjectId => {
                      const subject = teachingSubjects.find(s => 
                        (s.subject_id || s.id) === subjectId
                      );
                      return subject && (
                        <span 
                          key={subjectId} 
                          className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200"
                        >
                          {subject.label}
                          <button
                            type="button"
                            onClick={() => handleSubjectChange(subjectId)}
                            className="ml-2 text-blue-600 hover:text-blue-800 font-bold"
                          >
                            ×
                          </button>
                        </span>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-xs text-amber-600 mt-2">No subjects selected. You can continue without selecting subjects.</p>
                )}
              </div>
            </div>
          )}

          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name (as per Aadhaar) *
            </label>
            <input 
              name="name" 
              value={form.name || ""}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              required
            />
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mobile Number *
              </label>
              <input 
                name="mobile" 
                value={form.mobile || ""}
                onChange={handleChange}
                placeholder="Enter 10-digit mobile number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                type="tel"
                required
                maxLength="10"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address *
              </label>
              <input 
                name="email" 
                value={form.email || ""}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                type="email"
                required
              />
            </div>
          </div>

          {/* Gender & Marital Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Gender *
              </label>
              <select 
                name="gender" 
                onChange={handleChange} 
                value={form.gender || ""}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                required
              >
                <option value="">Select gender</option>
                {genders.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Marital Status *
              </label>
              <select 
                name="marital_status" 
                onChange={handleChange} 
                value={form.marital_status || ""}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                required
              >
                <option value="">Select status</option>
                {marital_status.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Date of Birth & Age */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Date of Birth *
              </label>
              <input 
                type="date" 
                name="dob" 
                value={form.dob || ""}
                onChange={handleDateChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Age *
              </label>
              <input 
                name="age" 
                value={form.age || ""}
                onChange={handleAgeChange}
                placeholder="Age will auto-calculate from DOB"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                  ageError ? 'border-red-500' : 'border-gray-300'
                }`}
                type="text"
                inputMode="numeric"
                required
                readOnly={!!form.dob}
              />
              {ageError && <p className="text-xs text-red-500 mt-1">{ageError}</p>}
            </div>
          </div>

          {/* Religion */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Religion *
            </label>
            <select 
              name="religion" 
              onChange={handleChange} 
              value={form.religion || ""}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              required
            >
              <option value="">Select religion</option>
              {religions.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Permanent / Correspondence Address *
            </label>
            <textarea 
              name="address" 
              value={form.address || ""}
              onChange={handleChange}
              placeholder="Enter your complete address"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all h-32 resize-none"
              required
            />
          </div>

          {/* Qualification */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Highest Qualification *
            </label>
            <select 
              name="qualification" 
              onChange={handleChange} 
              value={form.qualification || ""}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              required
            >
              <option value="">Select qualification</option>
              {qualifications.map((q) => (
                <option key={q} value={q}>{q}</option>
              ))}
            </select>
          </div>

          {/* File Upload - IMPROVED UI with better feedback */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Upload CV / Resume *
            </label>
            <div className="mt-2 flex items-center justify-center w-full">
              <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors ${
                fileError ? 'border-red-300' : 
                fileName ? 'border-green-500 bg-green-50' : 
                'border-gray-300'
              }`}>
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {fileName ? (
                    // Show file icon when file is selected
                    <svg className="w-8 h-8 mb-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                  ) : (
                    // Show upload icon when no file
                    <svg className="w-8 h-8 mb-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                  )}
                  
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">Images (JPEG, PNG, GIF) or PDF (MAX. 5MB)</p>
                  
                  {fileName ? (
                    <div className="mt-2 text-center">
                      <p className="text-xs text-green-600 font-semibold flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Selected: {fileName}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {(file?.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  ) : (
                    <p className="text-xs text-amber-500 mt-1 font-medium">⚠️ No file selected</p>
                  )}
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  accept=".jpg,.jpeg,.png,.gif,.pdf"
                  onChange={handleFileChange}
                  required
                />
              </label>
            </div>
            {fileError && <p className="text-xs text-red-500 mt-2">{fileError}</p>}
          </div>

          

          {/* Submit Button */}
          <div className="mt-10">
            <button 
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 font-semibold text-white rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'
              }`}
              style={{ backgroundColor: '#194369' }}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Submit Application'
              )}
            </button>
            
            <p className="text-center text-gray-600 text-sm mt-4">
              By submitting, you agree to our terms and conditions
            </p>
          </div>
        </form>
      </div>

      {/* Add this style for the fade-in animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default JobRegistration;
