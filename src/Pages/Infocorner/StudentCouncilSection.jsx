import React, { useState, useEffect } from "react";
import { studentCouncilData as defaultStudentCouncilData } from "../../constant/Infocorner/studentCouncilData";
import {
  Users,
  Award,
  Star,
  Sparkles,
  Cloud,
  Sun,
  Heart,
  Target,
  BookOpen,
  ChevronRight,
  MessageCircle,
  Users2,
  Trophy,
  Flag,
} from "lucide-react";
import { motion } from "framer-motion";
import axiosInstance from "../../services/api"; // Update this import path based on your project structure

const StudentCouncilSection = () => {
  const [councilData, setCouncilData] = useState({
    studentCouncil: {
      id: "student-council-section",
      title: defaultStudentCouncilData.title || "Student Council",
      header: {
        title: defaultStudentCouncilData.header?.title || "Student Council",
        features: defaultStudentCouncilData.header?.features || [
          {
            icon: "Users2",
            text: "Student Leadership"
          },
          {
            icon: "Award",
            text: "Leadership Development"
          },
          {
            icon: "MessageCircle",
            text: "Student Voice"
          }
        ],
        decorations: {
          dots: [
            { color: "bg-navy-500" },
            { color: "bg-navy-500" }
          ],
          lineColor: defaultStudentCouncilData.header?.decorations?.lineColor || "from-navy-600 via-blue-600 to-navy-600"
        }
      },
      images: defaultStudentCouncilData.images || [],
      content: {
        title: defaultStudentCouncilData.content?.title || "About Our Student Council",
        passage: defaultStudentCouncilData.passage || [
          "The Student Council of Vidya Prabodhini Prashala School embodies the spirit of leadership, service, and academic excellence. It empowers students to voice their ideas, take initiative, and lead with integrity and compassion. Through teamwork, discipline, and dedication, council members learn the essence of responsibility and democratic participation. They bridge the gap between students and administration, fostering unity, respect, and positive change. Every activity of the council reflects our school's core values — honesty, service, and pursuit of excellence. By learning to lead and leading to learn, our students become confident, responsible, and visionary citizens of tomorrow."
        ]
      },
      keyPoints: defaultStudentCouncilData.keyPoints || [
        {
          icon: "Target",
          title: "Leadership Development",
          description: "Developing responsible leaders through practical experience",
          color: "from-navy-600 to-blue-600"
        },
        {
          icon: "Users",
          title: "Student Representation",
          description: "Voice of students in school decision-making processes",
          color: "from-blue-600 to-navy-600"
        },
        {
          icon: "Award",
          title: "Skill Development",
          description: "Enhancing communication and organizational skills",
          color: "from-navy-600 to-blue-600"
        }
      ],
      footer: {
        text: defaultStudentCouncilData.footer?.text || "Developing Tomorrow's Leaders",
        decorations: {
          lineColor: defaultStudentCouncilData.footer?.decorations?.lineColor || "from-transparent via-navy-400 to-transparent",
          icons: {
            left: defaultStudentCouncilData.footer?.decorations?.icons?.left || "Star",
            right: defaultStudentCouncilData.footer?.decorations?.icons?.right || "Star",
            color: defaultStudentCouncilData.footer?.decorations?.icons?.color || "text-yellow-500"
          }
        }
      }
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStudentCouncil();
  }, []);

  const fetchStudentCouncil = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/student-council');
      
      if (response.data.success) {
        const apiData = response.data.data;
        
        // Process the API data - fix image URLs
        const processedData = {
          studentCouncil: {
            id: apiData.studentCouncil?.id || "student-council-section",
            title: apiData.studentCouncil?.title || apiData.studentCouncil?.header?.title || "Student Council",
            header: {
              title: apiData.studentCouncil?.header?.title || "Student Council",
              features: apiData.studentCouncil?.header?.features?.length > 0 
                ? apiData.studentCouncil.header.features 
                : defaultStudentCouncilData.header?.features || [
                    {
                      icon: "Users2",
                      text: "Student Leadership"
                    },
                    {
                      icon: "Award",
                      text: "Leadership Development"
                    },
                    {
                      icon: "MessageCircle",
                      text: "Student Voice"
                    }
                  ],
              decorations: {
                dots: apiData.studentCouncil?.header?.decorations?.dots || [
                  { color: "bg-navy-500" },
                  { color: "bg-navy-500" }
                ],
                lineColor: apiData.studentCouncil?.header?.decorations?.lineColor || "from-navy-600 via-blue-600 to-navy-600"
              }
            },
            images: apiData.studentCouncil?.images?.length > 0 
              ? apiData.studentCouncil.images.map(img => ({
                  ...img,
                  src: img.src?.replace(/\\\//g, '/') || img.src
                }))
              : defaultStudentCouncilData.images || [],
            content: {
              title: apiData.studentCouncil?.content?.title || "About Our Student Council",
              passage: apiData.studentCouncil?.content?.passage?.length > 0 
                ? apiData.studentCouncil.content.passage 
                : defaultStudentCouncilData.passage || [
                    "The Student Council of Vidya Prabodhini Prashala School embodies the spirit of leadership, service, and academic excellence. It empowers students to voice their ideas, take initiative, and lead with integrity and compassion. Through teamwork, discipline, and dedication, council members learn the essence of responsibility and democratic participation. They bridge the gap between students and administration, fostering unity, respect, and positive change. Every activity of the council reflects our school's core values — honesty, service, and pursuit of excellence. By learning to lead and leading to learn, our students become confident, responsible, and visionary citizens of tomorrow."
                  ]
            },
            keyPoints: apiData.studentCouncil?.keyPoints?.length > 0 
              ? apiData.studentCouncil.keyPoints 
              : defaultStudentCouncilData.keyPoints || [
                  {
                    icon: "Target",
                    title: "Leadership Development",
                    description: "Developing responsible leaders through practical experience",
                    color: "from-navy-600 to-blue-600"
                  },
                  {
                    icon: "Users",
                    title: "Student Representation",
                    description: "Voice of students in school decision-making processes",
                    color: "from-blue-600 to-navy-600"
                  },
                  {
                    icon: "Award",
                    title: "Skill Development",
                    description: "Enhancing communication and organizational skills",
                    color: "from-navy-600 to-blue-600"
                  }
                ],
            footer: {
              text: apiData.studentCouncil?.footer?.text || "Developing Tomorrow's Leaders",
              decorations: {
                lineColor: apiData.studentCouncil?.footer?.decorations?.lineColor || "from-transparent via-navy-400 to-transparent",
                icons: {
                  left: apiData.studentCouncil?.footer?.decorations?.icons?.left || "Star",
                  right: apiData.studentCouncil?.footer?.decorations?.icons?.right || "Star",
                  color: apiData.studentCouncil?.footer?.decorations?.icons?.color || "text-yellow-500"
                }
              }
            }
          }
        };
        
        setCouncilData(processedData);
        setError(null);
      }
    } catch (err) {
      console.error('Error fetching student council:', err);
      setError('Failed to load student council information');
    } finally {
      setLoading(false);
    }
  };

  // Icon mapping for features
  const featureIconMap = {
    Users2: <Users2 className="h-3 w-3 sm:h-4 sm:w-4 text-navy-600" />,
    Award: <Award className="h-3 w-3 sm:h-4 sm:w-4 text-navy-600" />,
    MessageCircle: <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 text-navy-600" />
  };

  // Icon mapping for key points
  const keyPointIconMap = {
    Target: <Target className="h-5 w-5 sm:h-6 sm:w-6 text-white" />,
    Users: <Users className="h-5 w-5 sm:h-6 sm:w-6 text-white" />,
    Award: <Award className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
  };

  const { title, header, images, content, keyPoints, footer } = councilData.studentCouncil;

  // Loading state
  if (loading) {
    return (
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-navy-50/30 relative overflow-hidden min-h-[400px] flex items-center justify-center">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-navy-100/20 to-blue-100/10 rounded-full -translate-x-24 -translate-y-24"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-tl from-blue-100/10 to-navy-100/20 rounded-full translate-x-24 translate-y-24"></div>
        
        <div className="text-center relative z-10">
          <div className="w-16 h-16 border-4 border-navy-200 border-t-navy-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading student council...</p>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-navy-50/30 relative overflow-hidden min-h-[400px] flex items-center justify-center">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-navy-100/20 to-blue-100/10 rounded-full -translate-x-24 -translate-y-24"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-tl from-blue-100/10 to-navy-100/20 rounded-full translate-x-24 translate-y-24"></div>
        
        <div className="text-center relative z-10">
          <p className="text-red-600 text-xl mb-4">⚠️ {error}</p>
          <button 
            onClick={fetchStudentCouncil}
            className="px-6 py-2 bg-gradient-to-r from-navy-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition-colors"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-navy-50/30 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-navy-100/20 to-blue-100/10 rounded-full -translate-x-24 -translate-y-24"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-tl from-blue-100/10 to-navy-100/20 rounded-full translate-x-24 translate-y-24"></div>

      {/* Creative decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-5 sm:top-20 sm:left-10 opacity-20 animate-bounce">
          <Cloud className="w-8 h-8 sm:w-10 sm:h-10 text-navy-400" />
        </div>
        <div className="absolute top-20 right-8 sm:top-32 sm:right-16 opacity-20 animate-pulse">
          <Sun className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-400" />
        </div>
        <div className="absolute bottom-20 left-10 sm:bottom-32 sm:left-20 opacity-20 animate-bounce">
          <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-pink-400" />
        </div>
        <div className="absolute top-1/3 left-1/4 opacity-15">
          <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-navy-300" />
        </div>
        <div className="absolute bottom-1/3 right-1/4 opacity-15">
          <Star className="w-6 h-6 sm:w-8 sm:h-8 text-navy-300" />
        </div>
        <div className="absolute top-1/2 right-10 opacity-10">
          <Trophy className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-300" />
        </div>
        <div className="absolute bottom-1/4 left-10 opacity-10">
          <Flag className="w-10 h-10 sm:w-12 sm:h-12 text-red-300" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ================= TITLE ================= */}
        <motion.div
          className="text-center mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${header?.decorations?.dots?.[0]?.color || 'bg-navy-500'}`}></div>
            <h2 className="font-title text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gradient-navy">
              {title || "Student Council"}
            </h2>
            <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${header?.decorations?.dots?.[1]?.color || 'bg-navy-500'}`}></div>
          </div>

          <motion.div
            className={`h-1 sm:h-1.5 w-16 sm:w-20 md:w-24 bg-gradient-to-r ${header?.decorations?.lineColor || 'from-navy-600 via-blue-600 to-navy-600'} mx-auto mb-6 sm:mb-8 rounded-full`}
            initial={{ width: 0 }}
            whileInView={{ width: "4rem" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          />

          {/* Key Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-6"
          >
            {header?.features?.map((feature, index) => (
              <div key={index} className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-gradient-to-br from-navy-50 to-blue-50 rounded-full border border-navy-100">
                {featureIconMap[feature.icon] || <Users2 className="h-3 w-3 sm:h-4 sm:w-4 text-navy-600" />}
                <span className="text-xs sm:text-sm font-medium text-navy-700">
                  {feature.text}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ================= FULL WIDTH IMAGES ================= */}
        {images.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12"
          >
            {images.map((img, index) => (
              <motion.div
                key={img.id || index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group overflow-hidden rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500"
              >
                <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.alt || `Student Council ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      console.error('Image failed to load:', img.src);
                      e.target.style.backgroundColor = '#e2e8f0';
                    }}
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                  
                  {/* Decorative element */}
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                      <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                    </div>
                  </div>
                </div>
                
                {/* Image label */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <Users className="w-3 h-3 sm:w-4 sm:h-4 text-navy-600" />
                    <span className="text-xs sm:text-sm font-medium text-navy-800">
                      {img.label || `Student Council ${index === 0 ? "Activities" : "Members"}`}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* ================= PASSAGE SECTION ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-navy-100 overflow-hidden">
            {/* Passage Header */}
            <div className="p-4 sm:p-5 md:p-6 bg-gradient-to-r from-navy-50 to-blue-50 border-b border-navy-100">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="relative">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-navy-600 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center text-white">
                    <BookOpen className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                    <Star className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-navy-800">
                    {content?.title || "About Our Student Council"}
                  </h3>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="h-1 w-4 sm:w-6 bg-navy-500 rounded-full"></div>
                    <div className="h-1 w-2 sm:w-3 bg-blue-500 rounded-full"></div>
                    <div className="h-1 w-1 sm:w-2 bg-navy-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Passage Content */}
            <div className="p-4 sm:p-5 md:p-6 lg:p-8">
              <div className="bg-gradient-to-br from-navy-50/30 to-blue-50/30 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 shadow-sm">
                <div className="space-y-3 sm:space-y-4 text-gray-700 text-justify">
                  {content?.passage?.map((text, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="text-sm sm:text-base md:text-lg leading-relaxed sm:leading-relaxed"
                    >
                      {text}
                    </motion.p>
                  ))}
                </div>
              </div>

              {/* Key Points Section */}
              {keyPoints?.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="mt-6 sm:mt-8"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {keyPoints.map((point, index) => (
                      <div
                        key={index}
                        className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-navy-100 shadow-sm hover:shadow-md transition-all duration-300"
                      >
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${point.color || 'from-navy-600 to-blue-600'} rounded-lg sm:rounded-xl flex items-center justify-center mb-3`}>
                          {keyPointIconMap[point.icon] || <Target className="h-5 w-5 sm:h-6 sm:w-6 text-white" />}
                        </div>
                        <h4 className="font-semibold text-navy-800 text-sm sm:text-base mb-2">{point.title}</h4>
                        <p className="text-gray-600 text-xs sm:text-sm">{point.description}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* ================= BOTTOM DECORATIVE ELEMENT ================= */}
        <motion.div
          className="flex justify-center mt-8 sm:mt-12"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 sm:gap-4 text-navy-600">
            <div className={`w-6 h-px sm:w-8 md:w-12 bg-gradient-to-r ${footer?.decorations?.lineColor || 'from-transparent via-navy-400 to-transparent'}`}></div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              {footer?.decorations?.icons?.left === "Star" && (
                <Star className={`w-3 h-3 sm:w-4 sm:h-4 ${footer?.decorations?.icons?.color || 'text-yellow-500'}`} />
              )}
              <span className="text-xs sm:text-sm font-medium">{footer?.text || "Developing Tomorrow's Leaders"}</span>
              {footer?.decorations?.icons?.right === "Star" && (
                <Star className={`w-3 h-3 sm:w-4 sm:h-4 ${footer?.decorations?.icons?.color || 'text-yellow-500'}`} />
              )}
            </div>
            <div className={`w-6 h-px sm:w-8 md:w-12 bg-gradient-to-r ${footer?.decorations?.lineColor || 'from-transparent via-navy-400 to-transparent'}`}></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StudentCouncilSection;

// import React from "react";
// import { studentCouncilData } from "../../constant/Infocorner/studentCouncilData";
// import {
//   Users,
//   Award,
//   Star,
//   Sparkles,
//   Cloud,
//   Sun,
//   Heart,
//   Target,
//   BookOpen,
//   ChevronRight,
//   MessageCircle,
//   Users2,
//   Trophy,
//   Flag,
// } from "lucide-react";
// import { motion } from "framer-motion";

// const StudentCouncilSection = () => {
//   return (
//     <section className="py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-navy-50/30 relative overflow-hidden">
//       {/* Background decorative elements */}
//       <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-navy-100/20 to-blue-100/10 rounded-full -translate-x-24 -translate-y-24"></div>
//       <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-tl from-blue-100/10 to-navy-100/20 rounded-full translate-x-24 translate-y-24"></div>

//       {/* Creative decorative elements */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute top-10 left-5 sm:top-20 sm:left-10 opacity-20 animate-bounce">
//           <Cloud className="w-8 h-8 sm:w-10 sm:h-10 text-navy-400" />
//         </div>
//         <div className="absolute top-20 right-8 sm:top-32 sm:right-16 opacity-20 animate-pulse">
//           <Sun className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-400" />
//         </div>
//         <div className="absolute bottom-20 left-10 sm:bottom-32 sm:left-20 opacity-20 animate-bounce">
//           <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-pink-400" />
//         </div>
//         <div className="absolute top-1/3 left-1/4 opacity-15">
//           <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-navy-300" />
//         </div>
//         <div className="absolute bottom-1/3 right-1/4 opacity-15">
//           <Star className="w-6 h-6 sm:w-8 sm:h-8 text-navy-300" />
//         </div>
//         <div className="absolute top-1/2 right-10 opacity-10">
//           <Trophy className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-300" />
//         </div>
//         <div className="absolute bottom-1/4 left-10 opacity-10">
//           <Flag className="w-10 h-10 sm:w-12 sm:h-12 text-red-300" />
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto relative z-10">
//         {/* ================= TITLE ================= */}
//         <motion.div
//           className="text-center mb-8 sm:mb-12 md:mb-16"
//           initial={{ opacity: 0, y: -20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//         >
//           <div className="inline-flex items-center gap-3 mb-4">
//             <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-500"></div>
//             <h2 className="font-title text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gradient-navy">
//               {studentCouncilData.title}
//             </h2>
//             <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-500"></div>
//           </div>

//           <motion.div
//             className="h-1 sm:h-1.5 w-16 sm:w-20 md:w-24 bg-gradient-to-r from-navy-600 via-blue-600 to-navy-600 mx-auto mb-6 sm:mb-8 rounded-full"
//             initial={{ width: 0 }}
//             whileInView={{ width: "4rem" }}
//             transition={{ duration: 0.8, delay: 0.3 }}
//             viewport={{ once: true }}
//           />

//           {/* Key Features */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.4 }}
//             viewport={{ once: true }}
//             className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-6"
//           >
//             <div className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-gradient-to-br from-navy-50 to-blue-50 rounded-full border border-navy-100">
//               <Users2 className="h-3 w-3 sm:h-4 sm:w-4 text-navy-600" />
//               <span className="text-xs sm:text-sm font-medium text-navy-700">
//                 Student Leadership
//               </span>
//             </div>
//             <div className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-gradient-to-br from-navy-50 to-blue-50 rounded-full border border-navy-100">
//               <Award className="h-3 w-3 sm:h-4 sm:w-4 text-navy-600" />
//               <span className="text-xs sm:text-sm font-medium text-navy-700">
//                 Leadership Development
//               </span>
//             </div>
//             <div className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-gradient-to-br from-navy-50 to-blue-50 rounded-full border border-navy-100">
//               <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 text-navy-600" />
//               <span className="text-xs sm:text-sm font-medium text-navy-700">
//                 Student Voice
//               </span>
//             </div>
//           </motion.div>
//         </motion.div>

//         {/* ================= FULL WIDTH IMAGES ================= */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12"
//         >
//           {studentCouncilData.images.map((img, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, scale: 0.9 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               viewport={{ once: true }}
//               className="relative group overflow-hidden rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500"
//             >
//               <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 overflow-hidden">
//                 <img
//                   src={img}
//                   alt={`Student Council ${index + 1}`}
//                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                 />
//                 {/* Overlay gradient */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                
//                 {/* Decorative element */}
//                 <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
//                   <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
//                     <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
//                   </div>
//                 </div>
//               </div>
              
//               {/* Image label */}
//               <div className="absolute bottom-4 left-4 right-4">
//                 <div className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
//                   <Users className="w-3 h-3 sm:w-4 sm:h-4 text-navy-600" />
//                   <span className="text-xs sm:text-sm font-medium text-navy-800">
//                     Student Council {index === 0 ? "Activities" : "Members"}
//                   </span>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>

//         {/* ================= PASSAGE SECTION ================= */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className="max-w-5xl mx-auto"
//         >
//           <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-navy-100 overflow-hidden">
//             {/* Passage Header */}
//             <div className="p-4 sm:p-5 md:p-6 bg-gradient-to-r from-navy-50 to-blue-50 border-b border-navy-100">
//               <div className="flex items-center gap-3 sm:gap-4">
//                 <div className="relative">
//                   <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-navy-600 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center text-white">
//                     <BookOpen className="h-5 w-5 sm:h-6 sm:w-6" />
//                   </div>
//                   <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
//                     <Star className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-white" />
//                   </div>
//                 </div>
//                 <div>
//                   <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-navy-800">
//                     About Our Student Council
//                   </h3>
//                   <div className="flex items-center gap-1 mt-1">
//                     <div className="h-1 w-4 sm:w-6 bg-navy-500 rounded-full"></div>
//                     <div className="h-1 w-2 sm:w-3 bg-blue-500 rounded-full"></div>
//                     <div className="h-1 w-1 sm:w-2 bg-navy-400 rounded-full"></div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Passage Content */}
//             <div className="p-4 sm:p-5 md:p-6 lg:p-8">
//               <div className="bg-gradient-to-br from-navy-50/30 to-blue-50/30 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 shadow-sm">
//                 <div className="space-y-3 sm:space-y-4 text-gray-700 text-justify">
//                   {studentCouncilData.passage.map((text, index) => (
//                     <motion.p
//                       key={index}
//                       initial={{ opacity: 0, x: -10 }}
//                       whileInView={{ opacity: 1, x: 0 }}
//                       transition={{ duration: 0.4, delay: index * 0.1 }}
//                       viewport={{ once: true }}
//                       className="text-sm sm:text-base md:text-lg leading-relaxed sm:leading-relaxed"
//                     >
//                       {text}
//                     </motion.p>
//                   ))}
//                 </div>
//               </div>

//               {/* Key Points Section */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: 0.3 }}
//                 viewport={{ once: true }}
//                 className="mt-6 sm:mt-8"
//               >
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//                   {[
//                     {
//                       icon: <Target className="h-5 w-5 sm:h-6 sm:w-6 text-white" />,
//                       title: "Leadership Development",
//                       description: "Developing responsible leaders through practical experience",
//                       color: "from-navy-600 to-blue-600"
//                     },
//                     {
//                       icon: <Users className="h-5 w-5 sm:h-6 sm:w-6 text-white" />,
//                       title: "Student Representation",
//                       description: "Voice of students in school decision-making processes",
//                       color: "from-blue-600 to-navy-600"
//                     },
//                     {
//                       icon: <Award className="h-5 w-5 sm:h-6 sm:w-6 text-white" />,
//                       title: "Skill Development",
//                       description: "Enhancing communication and organizational skills",
//                       color: "from-navy-600 to-blue-600"
//                     }
//                   ].map((point, index) => (
//                     <div
//                       key={index}
//                       className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-navy-100 shadow-sm hover:shadow-md transition-all duration-300"
//                     >
//                       <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${point.color} rounded-lg sm:rounded-xl flex items-center justify-center mb-3`}>
//                         {point.icon}
//                       </div>
//                       <h4 className="font-semibold text-navy-800 text-sm sm:text-base mb-2">{point.title}</h4>
//                       <p className="text-gray-600 text-xs sm:text-sm">{point.description}</p>
//                     </div>
//                   ))}
//                 </div>
//               </motion.div>
//             </div>
//           </div>
//         </motion.div>

        

//         {/* ================= BOTTOM DECORATIVE ELEMENT ================= */}
//         <motion.div
//           className="flex justify-center mt-8 sm:mt-12"
//           initial={{ opacity: 0, scale: 0 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.6, delay: 0.5 }}
//           viewport={{ once: true }}
//         >
//           <div className="flex items-center gap-3 sm:gap-4 text-navy-600">
//             <div className="w-6 h-px sm:w-8 md:w-12 bg-gradient-to-r from-transparent via-navy-400 to-transparent"></div>
//             <div className="flex items-center gap-1.5 sm:gap-2">
//               <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
//               <span className="text-xs sm:text-sm font-medium">Developing Tomorrow's Leaders</span>
//               <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
//             </div>
//             <div className="w-6 h-px sm:w-8 md:w-12 bg-gradient-to-r from-transparent via-navy-400 to-transparent"></div>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default StudentCouncilSection;