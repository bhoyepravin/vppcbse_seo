import React, { useState, useEffect } from "react";
import { facultyData as defaultFacultyData } from "../../../constant/Aboutus/FacultyData/facultyData";
import { motion } from "framer-motion";
import axiosInstance from "../../../services/api"; // Update this import path based on your project structure

const FacultyPage = () => {
  const [facultyData, setFacultyData] = useState({
    faculty: {
      id: "faculty-section",
      title: defaultFacultyData.content?.title || "Our Faculty",
      topImage: {
        src: defaultFacultyData.topImage?.src || "",
        alt: defaultFacultyData.topImage?.alt || "Faculty members"
      },
      content: {
        title: defaultFacultyData.content?.title || "Our Faculty",
        paragraphs: defaultFacultyData.content?.paragraphs || [
          "Our faculty represents a perfect blend of experience, expertise, and empathy. As leaders in learning, they bring innovation into every classroom, transforming education with vision and values. Empowered by technology and inspired by purpose, our teachers cultivate curiosity, confidence, and creativity in each student. They go beyond academics, instilling discipline, empathy, and integrity as lifelong virtues. Through their dedication and mentorship, they continue to build a brighter and more meaningful future for all learners."
        ]
      }
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    fetchFacultyData();
  }, []);

  const fetchFacultyData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/faculty');
      
      if (response.data.success) {
        const apiData = response.data.data;
        
        // Process the API data
        const processedData = {
          faculty: {
            id: apiData.faculty?.id || "faculty-section",
            title: apiData.faculty?.title || apiData.faculty?.content?.title || defaultFacultyData.content?.title || "Our Faculty",
            topImage: {
              src: apiData.faculty?.topImage?.src?.replace(/\\\//g, '/') || defaultFacultyData.topImage?.src || "",
              alt: apiData.faculty?.topImage?.alt || defaultFacultyData.topImage?.alt || "Faculty members"
            },
            content: {
              title: apiData.faculty?.content?.title || apiData.faculty?.title || defaultFacultyData.content?.title || "Our Faculty",
              paragraphs: apiData.faculty?.content?.paragraphs?.length > 0 
                ? apiData.faculty.content.paragraphs 
                : defaultFacultyData.content?.paragraphs || [
                    "Our faculty represents a perfect blend of experience, expertise, and empathy. As leaders in learning, they bring innovation into every classroom, transforming education with vision and values. Empowered by technology and inspired by purpose, our teachers cultivate curiosity, confidence, and creativity in each student. They go beyond academics, instilling discipline, empathy, and integrity as lifelong virtues. Through their dedication and mentorship, they continue to build a brighter and more meaningful future for all learners."
                  ]
            }
          }
        };
        
        setFacultyData(processedData);
        setError(null);
      }
    } catch (err) {
      console.error('Error fetching faculty data:', err);
      setError('Failed to load faculty information');
    } finally {
      setLoading(false);
    }
  };

  const { content, topImage } = facultyData.faculty;

  // Loading state
  if (loading) {
    return (
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden bg-gradient-to-b from-white to-navy-50/30 min-h-[400px] flex items-center justify-center">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-navy-100/20 to-blue-100/10 rounded-full -translate-x-24 -translate-y-24"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-tl from-blue-100/10 to-navy-100/20 rounded-full translate-x-24 translate-y-24"></div>
        
        <div className="text-center relative z-10">
          <div className="w-16 h-16 border-4 border-navy-200 border-t-navy-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading faculty information...</p>
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
            onClick={fetchFacultyData}
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

      {/* ================= Heading & Content Wrapper ================= */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ================= Heading ================= */}
        <motion.div
          className="text-center mb-10 sm:mb-12 md:mb-14"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-500"></div>
            <h2 className="font-title text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gradient-navy">
              {content.title || "Our Faculty"}
            </h2>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-500"></div>
          </div>

          <motion.div
            className="h-1 sm:h-1.5 w-16 sm:w-20 md:w-24 gradient-navy mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: "4rem" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          />
        </motion.div>
      </div>

      {/* ================= FULL WIDTH IMAGE ================= */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="mb-10 sm:mb-12 md:mb-14 px-4 sm:px-6 lg:px-8"
      >
        <div className="relative group w-full">
          {/* Image loading container */}
          <div className="relative w-full h-[240px] sm:h-[320px] md:h-[420px] lg:h-[520px] overflow-hidden rounded-xl sm:rounded-2xl shadow-xl">
            {/* Loading placeholder */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-xl sm:rounded-2xl"></div>
            )}
            
            {/* Main image */}
            <img
              src={topImage.src}
              alt={topImage.alt}
              className={`
                w-full h-full object-contain object-center
                transition-all duration-700
                ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}
                group-hover:scale-[1.02]
              `}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              onError={(e) => {
                console.error("Failed to load image:", topImage.src);
                e.target.style.display = 'none';
                setImageLoaded(true);
              }}
            />
          </div>
          
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        </div>
      </motion.div>

      {/* ================= Content Wrapper ================= */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ================= Content ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl border border-navy-100 max-w-4xl mx-auto"
        >
          <div className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed space-y-4 lg:space-y-6">
            {content.paragraphs.map((text, index) => (
              <p key={index} className="text-justify">
                {text}
              </p>
            ))}
          </div>
        </motion.div>

        {/* ================= Bottom decorative element ================= */}
        <motion.div
          className="flex justify-center mt-10 sm:mt-12 md:mt-14"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4 text-navy-600">
            <div className="w-8 h-px sm:w-12 md:w-16 bg-gradient-to-r from-transparent via-navy-400 to-transparent"></div>
            <span className="text-xs sm:text-sm font-medium">
              Our Dedicated Faculty
            </span>
            <div className="w-8 h-px sm:w-12 md:w-16 bg-gradient-to-r from-transparent via-navy-400 to-transparent"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FacultyPage;


// import React, { useState, useEffect } from "react";
// import { facultyData } from "../../../constant/Aboutus/FacultyData/facultyData";
// import { motion } from "framer-motion";

// const FacultyPage = () => {
//   const { content, topImage } = facultyData;
//   const [imageLoaded, setImageLoaded] = useState(false);

//   return (
//     <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden bg-gradient-to-b from-white to-navy-50/30">
//       {/* Background decorative elements */}
//       <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-navy-100/20 to-blue-100/10 rounded-full -translate-x-24 -translate-y-24"></div>
//       <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-tl from-blue-100/10 to-navy-100/20 rounded-full translate-x-24 translate-y-24"></div>

//       {/* ================= Heading & Content Wrapper ================= */}
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         {/* ================= Heading ================= */}
//         <motion.div
//           className="text-center mb-10 sm:mb-12 md:mb-14"
//           initial={{ opacity: 0, y: -20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//         >
//           <div className="inline-flex items-center gap-3 mb-4">
//             <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-500"></div>
//             <h2 className="font-title text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gradient-navy">
//               {content.title}
//             </h2>
//             <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-500"></div>
//           </div>

//           <motion.div
//             className="h-1 sm:h-1.5 w-16 sm:w-20 md:w-24 gradient-navy mx-auto rounded-full"
//             initial={{ width: 0 }}
//             whileInView={{ width: "4rem" }}
//             transition={{ duration: 0.8, delay: 0.3 }}
//             viewport={{ once: true }}
//           />
//         </motion.div>
//       </div>

//       {/* ================= FULL WIDTH IMAGE ================= */}
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         whileInView={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.7 }}
//         viewport={{ once: true }}
//         className="mb-10 sm:mb-12 md:mb-14 px-4 sm:px-6 lg:px-8"
//       >
//         <div className="relative group w-full">
//           {/* Image loading container */}
//           <div className="relative w-full h-[240px] sm:h-[320px] md:h-[420px] lg:h-[520px] overflow-hidden rounded-xl sm:rounded-2xl shadow-xl">
//             {/* Loading placeholder */}
//             {!imageLoaded && (
//               <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-xl sm:rounded-2xl"></div>
//             )}
            
//             {/* Main image */}
//             <img
//               src={topImage.src}
//               alt={topImage.alt}
//               className={`
//                 w-full h-full object-contain object-center
//                 transition-all duration-700
//                 ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}
//                 group-hover:scale-[1.02]
//               `}
//               loading="lazy"
//               onLoad={() => setImageLoaded(true)}
//               onError={(e) => {
//                 console.error("Failed to load image:", topImage.src);
//                 e.target.style.display = 'none';
//                 setImageLoaded(true);
//               }}
//             />
//           </div>
          
//           {/* Hover overlay */}
//           <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
//         </div>
//       </motion.div>

//       {/* ================= Content Wrapper ================= */}
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         {/* ================= Content ================= */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7, delay: 0.2 }}
//           viewport={{ once: true }}
//           className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl border border-navy-100 max-w-4xl mx-auto"
//         >
//           <div className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed space-y-4 lg:space-y-6">
//             {content.paragraphs.map((text, index) => (
//               <p key={index} className="text-justify">
//                 {text}
//               </p>
//             ))}
//           </div>
//         </motion.div>

//         {/* ================= Bottom decorative element ================= */}
//         <motion.div
//           className="flex justify-center mt-10 sm:mt-12 md:mt-14"
//           initial={{ opacity: 0, scale: 0 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.6, delay: 0.4 }}
//           viewport={{ once: true }}
//         >
//           <div className="flex items-center gap-4 text-navy-600">
//             <div className="w-8 h-px sm:w-12 md:w-16 bg-gradient-to-r from-transparent via-navy-400 to-transparent"></div>
//             <span className="text-xs sm:text-sm font-medium">
//               Our Dedicated Faculty
//             </span>
//             <div className="w-8 h-px sm:w-12 md:w-16 bg-gradient-to-r from-transparent via-navy-400 to-transparent"></div>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default FacultyPage;

