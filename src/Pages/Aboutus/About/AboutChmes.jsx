import React, { useState, useEffect } from "react";
import { ABOUT_CHMES_DATA as defaultAboutChmesData } from "../../../constant/Aboutus/aboutChmesData";
import { motion } from "framer-motion";
import axiosInstance from "../../../services/api"; // Update this import path based on your project structure

const AboutPage = () => {
  useSEO("about"); // Custom hook to set SEO metadata for the About page
  return <AboutChmes />;
};

const AboutChmes = () => {
  const [chmesData, setChmesData] = useState({
    aboutChmes: {
      id: "about-chmes-section",
      title: defaultAboutChmesData.title,
      topImage: {
        src: defaultAboutChmesData.topImage.src,
        alt: defaultAboutChmesData.topImage.alt
      },
      subtitle: defaultAboutChmesData.subtitle,
      paragraphs: defaultAboutChmesData.paragraphs,
      founder: defaultAboutChmesData.founder
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAboutChmes();
  }, []);

  const fetchAboutChmes = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/about-chmes');
      
      if (response.data.success) {
        const apiData = response.data.data;
        
        // Process the API data
        const processedData = {
          aboutChmes: {
            id: apiData.aboutChmes?.id || "about-chmes-section",
            title: apiData.aboutChmes?.title || defaultAboutChmesData.title,
            topImage: {
              src: apiData.aboutChmes?.topImage?.src?.replace(/\\\//g, '/') || defaultAboutChmesData.topImage.src,
              alt: apiData.aboutChmes?.topImage?.alt || defaultAboutChmesData.topImage.alt
            },
            subtitle: apiData.aboutChmes?.subtitle || defaultAboutChmesData.subtitle,
            paragraphs: apiData.aboutChmes?.paragraphs?.length > 0 
              ? apiData.aboutChmes.paragraphs 
              : defaultAboutChmesData.paragraphs,
            founder: apiData.aboutChmes?.founder || defaultAboutChmesData.founder
          }
        };
        
        setChmesData(processedData);
        setError(null);
      }
    } catch (err) {
      console.error('Error fetching about CHMES:', err);
      setError('Failed to load about CHMES');
    } finally {
      setLoading(false);
    }
  };

  const { title, topImage, subtitle, paragraphs, founder } = chmesData.aboutChmes;

  // Loading state
  if (loading) {
    return (
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden bg-gradient-to-b from-white to-blue-50/30 min-h-[400px] flex items-center justify-center">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-blue-100/20 to-navy-100/10 rounded-full -translate-x-24 -translate-y-24"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-tl from-navy-100/10 to-blue-100/20 rounded-full translate-x-24 translate-y-24"></div>
        
        <div className="text-center relative z-10">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading about CHMES...</p>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden bg-gradient-to-b from-white to-blue-50/30 min-h-[400px] flex items-center justify-center">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-blue-100/20 to-navy-100/10 rounded-full -translate-x-24 -translate-y-24"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-tl from-navy-100/10 to-blue-100/20 rounded-full translate-x-24 translate-y-24"></div>
        
        <div className="text-center relative z-10">
          <p className="text-red-600 text-xl mb-4">⚠️ {error}</p>
          <button 
            onClick={fetchAboutChmes}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-navy-600 text-white rounded-lg hover:opacity-90 transition-colors"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden bg-gradient-to-b from-white to-blue-50/30">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-blue-100/20 to-navy-100/10 rounded-full -translate-x-24 -translate-y-24"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-tl from-navy-100/10 to-blue-100/20 rounded-full translate-x-24 translate-y-24"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ================= Main Heading ================= */}
        <motion.div
          className="text-center mb-8 sm:mb-10 md:mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-600"></div>
            <h2 className="font-title text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gradient-navy">
              {title}
            </h2>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-600"></div>
          </div>

          <motion.div
            className="h-1.5 sm:h-2 w-24 sm:w-32 md:w-40 bg-gradient-to-r from-blue-500 to-navy-600 mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: "6rem" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          />
        </motion.div>

        {/* ================= Top Image ================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-10 sm:mb-12 md:mb-14"
        >
          <div className="relative group max-w-md mx-auto">
            <img
              src={topImage.src}
              alt={topImage.alt}
              className="
                w-40 sm:w-50 md:w-80
                mx-auto
                h-auto
                rounded-xl sm:rounded-2xl
                shadow-xl
                object-cover
                transform transition-transform duration-700
                group-hover:scale-[1.02]
              "
              onError={(e) => {
                console.error('Image failed to load:', topImage.src);
                e.target.src = defaultAboutChmesData.topImage.src; // Fallback to default
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-xl sm:rounded-2xl opacity-0 transition-opacity duration-500"></div>
          </div>
        </motion.div>

        {/* ================= Subtitle ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-10 md:mb-12 text-center"
        >
          <div className="inline-block relative">
            <h2 className="font-title text-lg sm:text-xl md:text-2xl font-bold text-navy-700 mb-1">
              {subtitle}
            </h2>
            <div className="h-1 w-20 sm:w-24 md:w-28 bg-gradient-to-r from-blue-400 to-navy-500 mx-auto rounded-full"></div>
          </div>
        </motion.div>

        {/* ================= Content Paragraphs ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="space-y-8 sm:space-y-10 md:space-y-12 max-w-5xl mx-auto"
        >
          {paragraphs.map((text, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xl border border-blue-100 hover:shadow-2xl transition-shadow duration-500">
                <div className="flex items-start gap-4">
                  {/* Text Content */}
                  <div className="flex-1">
                    <p className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed sm:leading-loose text-justify">
                      {text}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ================= Optional Founder Section ================= */}
        {founder && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-12 sm:mt-16 md:mt-20 lg:mt-24 bg-gradient-to-r from-blue-50 to-navy-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 border border-blue-200 max-w-3xl mx-auto"
          >
            <div className="text-center">
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <h3 className="font-title text-lg sm:text-xl md:text-2xl font-semibold text-navy-800">
                  Founder
                </h3>
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              </div>
              
              <h4 className="font-title text-xl sm:text-2xl md:text-3xl font-bold text-navy-900 mb-1">
                {founder.name}
              </h4>
              
              <p className="text-blue-700 font-medium text-sm sm:text-base mb-2">
                {founder.designation}
              </p>
              
              <p className="text-navy-600 text-sm sm:text-base mb-3">
                {founder.years}
              </p>
              
              <div className="h-1 w-16 sm:w-20 bg-gradient-to-r from-blue-400 to-navy-500 mx-auto rounded-full mb-3"></div>
              
              <p className="text-gray-600 text-sm sm:text-base italic">
                {founder.description}
              </p>
            </div>
          </motion.div>
        )}

        {/* ================= Decorative Bottom Element ================= */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 md:mt-20 text-center"
        >
          <div className="inline-flex items-center gap-4">
            <div className="w-8 h-1 sm:w-12 sm:h-1.5 bg-gradient-to-r from-blue-400 to-transparent rounded-full"></div>
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-blue-500"></div>
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-navy-500"></div>
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-blue-500"></div>
            <div className="w-8 h-1 sm:w-12 sm:h-1.5 bg-gradient-to-l from-navy-400 to-transparent rounded-full"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutChmes;


// import React from "react";
// import { ABOUT_CHMES_DATA } from "../../../constant/Aboutus/aboutChmesData";
// import { motion } from "framer-motion";

// const AboutChmes = () => {
//   const { title, topImage, subtitle, paragraphs } = ABOUT_CHMES_DATA;

//   return (
//     <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden bg-gradient-to-b from-white to-blue-50/30">
//       {/* Background decorative elements */}
//       <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-blue-100/20 to-navy-100/10 rounded-full -translate-x-24 -translate-y-24"></div>
//       <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-tl from-navy-100/10 to-blue-100/20 rounded-full translate-x-24 translate-y-24"></div>

//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         {/* ================= Main Heading ================= */}
//         <motion.div
//           className="text-center mb-8 sm:mb-10 md:mb-12"
//           initial={{ opacity: 0, y: -20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//         >
//           <div className="inline-flex items-center gap-3 mb-4">
//             <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-600"></div>
//             <h2 className="font-title text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gradient-navy">
//               {title}
//             </h2>
//             <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-600"></div>
//           </div>

//           <motion.div
//             className="h-1.5 sm:h-2 w-24 sm:w-32 md:w-40 bg-gradient-to-r from-blue-500 to-navy-600 mx-auto rounded-full"
//             initial={{ width: 0 }}
//             whileInView={{ width: "6rem" }}
//             transition={{ duration: 0.8, delay: 0.3 }}
//             viewport={{ once: true }}
//           />
//         </motion.div>

//         {/* ================= Top Image ================= */}
//         <motion.div
//                   initial={{ opacity: 0, scale: 0.95 }}
//                   whileInView={{ opacity: 1, scale: 1 }}
//                   transition={{ duration: 0.7 }}
//                   viewport={{ once: true }}
//                   className="mb-10 sm:mb-12 md:mb-14"
//                 >
//                   <div className="relative group max-w-md mx-auto">
//                     <img
//   src={topImage.src}
//   alt={topImage.alt}
//   className="
//     w-40 sm:w-50 md:w-80
//     mx-auto
//     h-auto
//     rounded-xl sm:rounded-2xl
//     shadow-xl
//     object-cover
//     transform transition-transform duration-700
//     group-hover:scale-[1.02]
//   "
// />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-xl sm:rounded-2xl opacity-0  transition-opacity duration-500"></div>
//                   </div>
//                 </motion.div>

//         {/* ================= Subtitle ================= */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7, delay: 0.2 }}
//           viewport={{ once: true }}
//           className="mb-8 sm:mb-10 md:mb-12 text-center"
//         >
//           <div className="inline-block relative">
//             <h2 className="font-title text-lg sm:text-xl md:text-2xl font-bold text-navy-700 mb-1">
//               {subtitle}
//             </h2>
//             <div className="h-1 w-20 sm:w-24 md:w-28 bg-gradient-to-r from-blue-400 to-navy-500 mx-auto rounded-full"></div>
//           </div>
//         </motion.div>

//         {/* ================= Content Paragraphs ================= */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7, delay: 0.3 }}
//           viewport={{ once: true }}
//           className="space-y-8 sm:space-y-10 md:space-y-12 max-w-5xl mx-auto"
//         >
//           {paragraphs.map((text, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.7, delay: index * 0.1 }}
//               viewport={{ once: true }}
//             >
//               <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xl border border-blue-100 hover:shadow-2xl transition-shadow duration-500">
//                 <div className="flex items-start gap-4">
                  
                  
//                   {/* Text Content */}
//                   <div className="flex-1">
//                     <p className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed sm:leading-loose text-justify">
//                       {text}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>

//         {/* ================= Optional Founder Section ================= */}
//         {ABOUT_CHMES_DATA.founder && (
//           <motion.div
//             initial={{ opacity: 0, y: 40 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.5 }}
//             viewport={{ once: true }}
//             className="mt-12 sm:mt-16 md:mt-20 lg:mt-24 bg-gradient-to-r from-blue-50 to-navy-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 border border-blue-200 max-w-3xl mx-auto"
//           >
//             <div className="text-center">
//               <div className="inline-flex items-center gap-2 mb-4">
//                 <div className="w-2 h-2 rounded-full bg-blue-500"></div>
//                 <h3 className="font-title text-lg sm:text-xl md:text-2xl font-semibold text-navy-800">
//                   Founder
//                 </h3>
//                 <div className="w-2 h-2 rounded-full bg-blue-500"></div>
//               </div>
              
//               <h4 className="font-title text-xl sm:text-2xl md:text-3xl font-bold text-navy-900 mb-1">
//                 {ABOUT_CHMES_DATA.founder.name}
//               </h4>
              
//               <p className="text-blue-700 font-medium text-sm sm:text-base mb-2">
//                 {ABOUT_CHMES_DATA.founder.designation}
//               </p>
              
//               <p className="text-navy-600 text-sm sm:text-base mb-3">
//                 {ABOUT_CHMES_DATA.founder.years}
//               </p>
              
//               <div className="h-1 w-16 sm:w-20 bg-gradient-to-r from-blue-400 to-navy-500 mx-auto rounded-full mb-3"></div>
              
//               <p className="text-gray-600 text-sm sm:text-base italic">
//                 {ABOUT_CHMES_DATA.founder.description}
//               </p>
//             </div>
//           </motion.div>
//         )}

//         {/* ================= Decorative Bottom Element ================= */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ duration: 1, delay: 0.8 }}
//           viewport={{ once: true }}
//           className="mt-12 sm:mt-16 md:mt-20 text-center"
//         >
//           <div className="inline-flex items-center gap-4">
//             <div className="w-8 h-1 sm:w-12 sm:h-1.5 bg-gradient-to-r from-blue-400 to-transparent rounded-full"></div>
//             <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-blue-500"></div>
//             <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-navy-500"></div>
//             <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-blue-500"></div>
//             <div className="w-8 h-1 sm:w-12 sm:h-1.5 bg-gradient-to-l from-navy-400 to-transparent rounded-full"></div>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default AboutChmes;