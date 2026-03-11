import React, { useState, useEffect } from "react";
import { curriculumData as defaultCurriculumData } from "../../constant/Infocorner/curriculumData";
import { motion } from "framer-motion";
import { BookOpen, GraduationCap, Users, Target } from "lucide-react";
import axiosInstance from "../../services/api"; // Update this import path based on your project structure

const CurriculumSection = () => {
  const [curriculumData, setCurriculumData] = useState({
    curriculum: {
      id: "curriculum-section",
      header: {
        title: defaultCurriculumData.header?.title || "Curriculum Overview",
        description: defaultCurriculumData.header?.description || "A comprehensive educational journey designed for holistic development",
        decorations: {
          dots: [
            { color: "bg-navy-500" },
            { color: "bg-navy-500" }
          ]
        }
      },
      stages: defaultCurriculumData.stages || [],
      footer: {
        text: defaultCurriculumData.footer?.text || "Holistic Education Journey",
        decorations: {
          lineColor: defaultCurriculumData.footer?.decorations?.lineColor || "from-transparent via-navy-400 to-transparent"
        }
      }
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCurriculumData();
  }, []);

  const fetchCurriculumData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/curriculum');
      
      if (response.data.success) {
        const apiData = response.data.data;
        
        // Process the API data - fix image URLs and ensure structure
        const processedData = {
          curriculum: {
            id: apiData.curriculum?.id || "curriculum-section",
            header: {
              title: apiData.curriculum?.header?.title || "Curriculum Overview",
              description: apiData.curriculum?.header?.description || "A comprehensive educational journey designed for holistic development",
              decorations: {
                dots: apiData.curriculum?.header?.decorations?.dots || [
                  { color: "bg-navy-500" },
                  { color: "bg-navy-500" }
                ]
              }
            },
            stages: apiData.curriculum?.stages?.length > 0 
              ? apiData.curriculum.stages.map(stage => ({
                  ...stage,
                  images: {
                    student: {
                      src: stage.images?.student?.src?.replace(/\\\//g, '/') || stage.images?.student?.src || "",
                      alt: stage.images?.student?.alt || "Students engaged in learning activities"
                    },
                    teacher: {
                      src: stage.images?.teacher?.src?.replace(/\\\//g, '/') || stage.images?.teacher?.src || "",
                      alt: stage.images?.teacher?.alt || "Teacher guiding students"
                    }
                  },
                  passage: stage.passage || ["Information about this stage is being updated."]
                }))
              : defaultCurriculumData.stages || [],
            footer: {
              text: apiData.curriculum?.footer?.text || "Holistic Education Journey",
              decorations: {
                lineColor: apiData.curriculum?.footer?.decorations?.lineColor || "from-transparent via-navy-400 to-transparent"
              }
            }
          }
        };
        
        setCurriculumData(processedData);
        setError(null);
      }
    } catch (err) {
      console.error('Error fetching curriculum data:', err);
      setError('Failed to load curriculum information');
    } finally {
      setLoading(false);
    }
  };

  const stageIcons = [BookOpen, GraduationCap, Users, Target];
  const { header, stages, footer } = curriculumData.curriculum;

  // Loading state
  if (loading) {
    return (
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden bg-gradient-to-b from-white to-navy-50/30 min-h-[400px] flex items-center justify-center">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-navy-100/20 to-blue-100/10 rounded-full -translate-x-24 -translate-y-24"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-tl from-blue-100/10 to-navy-100/20 rounded-full translate-x-24 translate-y-24"></div>
        
        <div className="text-center relative z-10">
          <div className="w-16 h-16 border-4 border-navy-200 border-t-navy-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading curriculum...</p>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden bg-gradient-to-b from-white to-navy-50/30 min-h-[400px] flex items-center justify-center">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-navy-100/20 to-blue-100/10 rounded-full -translate-x-24 -translate-y-24"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-tl from-blue-100/10 to-navy-100/20 rounded-full translate-x-24 translate-y-24"></div>
        
        <div className="text-center relative z-10">
          <p className="text-red-600 text-xl mb-4">⚠️ {error}</p>
          <button 
            onClick={fetchCurriculumData}
            className="px-6 py-2 gradient-navy text-white rounded-lg hover:opacity-90 transition-colors"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden bg-gradient-to-b from-white to-navy-50/30">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-navy-100/20 to-blue-100/10 rounded-full -translate-x-24 -translate-y-24"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-tl from-blue-100/10 to-navy-100/20 rounded-full translate-x-24 translate-y-24"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ================= Header ================= */}
        <motion.div
          className="text-center mb-12 sm:mb-14 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${header?.decorations?.dots?.[0]?.color || 'bg-navy-500'}`}></div>
            <h2 className="font-title text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gradient-navy">
              {header?.title || "Curriculum Overview"}
            </h2>
            <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${header?.decorations?.dots?.[1]?.color || 'bg-navy-500'}`}></div>
          </div>

          <motion.div
            className="h-1 sm:h-1.5 w-16 sm:w-20 md:w-24 gradient-navy mx-auto mb-6 sm:mb-8 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: "4rem" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          />
          <p className="text-gray-700 max-w-2xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl px-2 sm:px-4">
            {header?.description || "A comprehensive educational journey designed for holistic development"}
          </p>
        </motion.div>

        {/* ================= Stages ================= */}
        <div className="space-y-14 sm:space-y-16 md:space-y-20">
          {stages.map((stage, index) => {
            const Icon = stageIcons[index % stageIcons.length];
            return (
              <motion.div
                key={stage.id || index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-navy-100 overflow-hidden"
              >
                {/* Stage Header */}
                <div className="p-5 sm:p-6 md:p-8 bg-gradient-to-r from-navy-50 to-blue-50 border-b border-navy-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-navy-600 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-navy-800">
                      {stage.title}
                    </h3>
                  </div>
                </div>

                {/* Content Container */}
                <div className="p-4 sm:p-5 md:p-6 lg:p-8">
                  {/* Images Grid */}
                  <div className="mb-6 sm:mb-8 md:mb-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                      {[
                        { src: stage.images?.student?.src, alt: stage.images?.student?.alt || "Student" },
                        { src: stage.images?.teacher?.src, alt: stage.images?.teacher?.alt || "Teacher" }
                      ].map((img, imgIndex) => (
                        <motion.div
                          key={imgIndex}
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: 0.1 + imgIndex * 0.1 }}
                          viewport={{ once: true }}
                          className="relative group"
                        >
                          <div className="absolute -inset-2 sm:-inset-3 bg-gradient-to-br from-navy-400 to-blue-400 rounded-lg sm:rounded-xl blur opacity-20 sm:opacity-30 group-hover:opacity-40 transition-opacity duration-500"></div>
                          
                          {img.src ? (
                            <img
                              src={img.src}
                              alt={img.alt}
                              className="relative w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover rounded-lg sm:rounded-xl shadow-lg transform transition-transform duration-700 group-hover:scale-[1.02] z-10"
                              onError={(e) => {
                                console.error('Image failed to load:', img.src);
                                e.target.style.backgroundColor = '#e2e8f0';
                                e.target.style.objectFit = 'contain';
                              }}
                            />
                          ) : (
                            <div className="relative w-full h-40 sm:h-48 md:h-56 lg:h-64 rounded-lg sm:rounded-xl shadow-lg bg-gray-200 flex items-center justify-center z-10">
                              <span className="text-gray-500 text-sm">Image not available</span>
                            </div>
                          )}
                          
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/40 to-transparent rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          
                          {/* Image Label */}
                          <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs sm:text-sm font-medium text-navy-700">
                            {img.alt}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Passage Content */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-navy-50/30 to-blue-50/30 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 shadow-sm"
                  >
                    <div className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed space-y-3 sm:space-y-4">
                      {stage.passage.map((text, textIndex) => (
                        <p key={textIndex} className="text-justify">
                          {text}
                        </p>
                      ))}
                    </div>
                  </motion.div>

                  {/* Stage Indicator */}
                  <div className="flex items-center justify-center mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-navy-100">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-navy-600">
                      <div className="w-2 h-2 rounded-full bg-navy-400"></div>
                      <span>Stage {index + 1} of {stages.length}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ================= Bottom decorative element ================= */}
        <motion.div
          className="flex justify-center mt-12 sm:mt-14 md:mt-16"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4 text-navy-600">
            <div className={`w-8 h-px sm:w-12 md:w-16 bg-gradient-to-r ${footer?.decorations?.lineColor || 'from-transparent via-navy-400 to-transparent'}`}></div>
            <span className="text-xs sm:text-sm font-medium">{footer?.text || "Holistic Education Journey"}</span>
            <div className={`w-8 h-px sm:w-12 md:w-16 bg-gradient-to-r ${footer?.decorations?.lineColor || 'from-transparent via-navy-400 to-transparent'}`}></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CurriculumSection;

// import React from "react";
// import { curriculumData } from "../../constant/Infocorner/curriculumData";
// import { motion } from "framer-motion";
// import { BookOpen, GraduationCap, Users, Target } from "lucide-react";

// const CurriculumSection = () => {
//   const stageIcons = [BookOpen, GraduationCap, Users, Target];

//   return (
//     <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden bg-gradient-to-b from-white to-navy-50/30">
//       {/* Background decorative elements */}
//       <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-navy-100/20 to-blue-100/10 rounded-full -translate-x-24 -translate-y-24"></div>
//       <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-tl from-blue-100/10 to-navy-100/20 rounded-full translate-x-24 translate-y-24"></div>

//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         {/* ================= Header ================= */}
//         <motion.div
//           className="text-center mb-12 sm:mb-14 md:mb-16"
//           initial={{ opacity: 0, y: -20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//         >
//           <div className="inline-flex items-center gap-3 mb-4">
//             <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-500"></div>
//             <h2 className="font-title text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gradient-navy">
//               Curriculum Overview
//             </h2>
//             <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-500"></div>
//           </div>

//           <motion.div
//             className="h-1 sm:h-1.5 w-16 sm:w-20 md:w-24 gradient-navy mx-auto mb-6 sm:mb-8 rounded-full"
//             initial={{ width: 0 }}
//             whileInView={{ width: "4rem" }}
//             transition={{ duration: 0.8, delay: 0.3 }}
//             viewport={{ once: true }}
//           />
//           <p className="text-gray-700 max-w-2xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl px-2 sm:px-4">
//             A comprehensive educational journey designed for holistic development
//           </p>
//         </motion.div>

//         {/* ================= Stages ================= */}
//         <div className="space-y-14 sm:space-y-16 md:space-y-20">
//           {curriculumData.map((stage, index) => {
//             const Icon = stageIcons[index % stageIcons.length];
//             return (
//               <motion.div
//                 key={stage.id}
//                 initial={{ opacity: 0, y: 40 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: index * 0.2 }}
//                 viewport={{ once: true }}
//                 className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-navy-100 overflow-hidden"
//               >
//                 {/* Stage Header */}
//                 <div className="p-5 sm:p-6 md:p-8 bg-gradient-to-r from-navy-50 to-blue-50 border-b border-navy-100">
//                   <div className="flex items-center gap-3 mb-2">
//                     <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-navy-600 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
//                       <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
//                     </div>
//                     <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-navy-800">
//                       {stage.title}
//                     </h3>
//                   </div>
//                 </div>

//                 {/* Content Container */}
//                 <div className="p-4 sm:p-5 md:p-6 lg:p-8">
//                   {/* Images Grid */}
//                   <div className="mb-6 sm:mb-8 md:mb-10">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
//                       {[
//                         { src: stage.images.student, alt: "Student" },
//                         { src: stage.images.teacher, alt: "Teacher" }
//                       ].map((img, imgIndex) => (
//                         <motion.div
//                           key={imgIndex}
//                           initial={{ opacity: 0, scale: 0.95 }}
//                           whileInView={{ opacity: 1, scale: 1 }}
//                           transition={{ duration: 0.5, delay: 0.1 + imgIndex * 0.1 }}
//                           viewport={{ once: true }}
//                           className="relative group"
//                         >
//                           <div className="absolute -inset-2 sm:-inset-3 bg-gradient-to-br from-navy-400 to-blue-400 rounded-lg sm:rounded-xl blur opacity-20 sm:opacity-30 group-hover:opacity-40 transition-opacity duration-500"></div>
//                           <img
//                             src={img.src}
//                             alt={img.alt}
//                             className="relative w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover rounded-lg sm:rounded-xl shadow-lg transform transition-transform duration-700 group-hover:scale-[1.02] z-10"
//                           />
//                           <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/40 to-transparent rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          
//                           {/* Image Label */}
//                           <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs sm:text-sm font-medium text-navy-700">
//                             {img.alt}
//                           </div>
//                         </motion.div>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Passage Content */}
//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.5, delay: 0.3 }}
//                     viewport={{ once: true }}
//                     className="bg-gradient-to-br from-navy-50/30 to-blue-50/30 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 shadow-sm"
//                   >
//                     <div className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed space-y-3 sm:space-y-4">
//                       {stage.passage.map((text, textIndex) => (
//                         <p key={textIndex} className="text-justify">
//                           {text}
//                         </p>
//                       ))}
//                     </div>
//                   </motion.div>

//                   {/* Stage Indicator */}
//                   <div className="flex items-center justify-center mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-navy-100">
//                     <div className="flex items-center gap-2 text-xs sm:text-sm text-navy-600">
//                       <div className="w-2 h-2 rounded-full bg-navy-400"></div>
//                       <span>Stage {index + 1} of {curriculumData.length}</span>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>

//         {/* ================= Bottom decorative element ================= */}
//         <motion.div
//           className="flex justify-center mt-12 sm:mt-14 md:mt-16"
//           initial={{ opacity: 0, scale: 0 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.6, delay: 0.5 }}
//           viewport={{ once: true }}
//         >
//           <div className="flex items-center gap-4 text-navy-600">
//             <div className="w-8 h-px sm:w-12 md:w-16 bg-gradient-to-r from-transparent via-navy-400 to-transparent"></div>
//             <span className="text-xs sm:text-sm font-medium">Holistic Education Journey</span>
//             <div className="w-8 h-px sm:w-12 md:w-16 bg-gradient-to-r from-transparent via-navy-400 to-transparent"></div>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default CurriculumSection;