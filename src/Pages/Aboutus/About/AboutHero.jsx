import React, { useState, useEffect } from "react";
import { ABOUT_VPP_DATA as defaultAboutVppData } from "../../../constant/Aboutus/aboutVppData";
import { motion } from "framer-motion";
import axiosInstance from "../../../services/api"; // Update this import path based on your project structure

const AboutHero = () => {
  const [vppData, setVppData] = useState({
    aboutVpp: {
      id: "about-vpp-section",
      title: defaultAboutVppData.title,
      dividerColor: defaultAboutVppData.dividerColor,
      topImage: {
        src: defaultAboutVppData.topImage.src,
        alt: defaultAboutVppData.topImage.alt
      },
      paragraphs: defaultAboutVppData.paragraphs,
      founder: defaultAboutVppData.founder
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAboutVpp();
  }, []);

  const fetchAboutVpp = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/about-vpp');
      
      if (response.data.success) {
        const apiData = response.data.data;
        
        // Process the API data
        const processedData = {
          aboutVpp: {
            id: apiData.aboutVpp?.id || "about-vpp-section",
            title: apiData.aboutVpp?.title || defaultAboutVppData.title,
            dividerColor: apiData.aboutVpp?.dividerColor || defaultAboutVppData.dividerColor,
            topImage: {
              src: apiData.aboutVpp?.topImage?.src?.replace(/\\\//g, '/') || defaultAboutVppData.topImage.src,
              alt: apiData.aboutVpp?.topImage?.alt || defaultAboutVppData.topImage.alt
            },
            paragraphs: apiData.aboutVpp?.paragraphs?.length > 0 
              ? apiData.aboutVpp.paragraphs 
              : defaultAboutVppData.paragraphs,
            founder: {
              name: apiData.aboutVpp?.founder?.name || defaultAboutVppData.founder.name,
              years: apiData.aboutVpp?.founder?.years || defaultAboutVppData.founder.years,
              description: apiData.aboutVpp?.founder?.description || defaultAboutVppData.founder.description
            }
          }
        };
        
        setVppData(processedData);
        setError(null);
      }
    } catch (err) {
      console.error('Error fetching about VPP:', err);
      setError('Failed to load about VPP');
    } finally {
      setLoading(false);
    }
  };

  const { title, dividerColor, topImage, paragraphs, founder } = vppData.aboutVpp;

  // Loading state
  if (loading) {
    return (
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden bg-gradient-to-b from-white to-navy-50/30 min-h-[400px] flex items-center justify-center">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-navy-100/20 to-blue-100/10 rounded-full -translate-x-24 -translate-y-24"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-tl from-blue-100/10 to-navy-100/20 rounded-full translate-x-24 translate-y-24"></div>
        
        <div className="text-center relative z-10">
          <div className="w-16 h-16 border-4 border-navy-200 border-t-navy-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading about VPP...</p>
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
            onClick={fetchAboutVpp}
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
              {title}
            </h2>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-500"></div>
          </div>

          <motion.div
            className={`h-1 sm:h-1.5 w-16 sm:w-20 md:w-24 ${dividerColor || 'gradient-navy'} mx-auto rounded-full`}
            initial={{ width: 0 }}
            whileInView={{ width: "4rem" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          />
        </motion.div>

        {/* ================= Images ================= */}
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
                e.target.src = defaultAboutVppData.topImage.src; // Fallback to default
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-xl sm:rounded-2xl opacity-0 transition-opacity duration-500"></div>
          </div>
        </motion.div>

        {/* ================= Dynamic Founder Section ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-10 p-6 sm:mt-12 md:mt-16 text-center"
        >
          <div className="inline-block">
            <h3 className="font-title text-lg sm:text-xl md:text-2xl font-bold text-navy-700 mb-1">
              {founder.name}
            </h3>
            <p className="text-navy-600 text-sm sm:text-base mb-2">
              {founder.years}
            </p>
            <div className="h-1 w-16 sm:w-20 gradient-navy mx-auto rounded-full mb-2"></div>
            <p className="text-gray-600 text-sm sm:text-base italic">
              {founder.description}
            </p>
          </div>
        </motion.div>

        {/* ================= Content ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl border border-navy-100 max-w-4xl mx-auto"
        >
          <div className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed space-y-4 lg:space-y-6">
            {paragraphs.map((text, index) => (
              <p key={index} className="text-justify">
                {text}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHero;

// import React from "react";
// import { ABOUT_VPP_DATA } from "../../../constant/Aboutus/aboutVppData";
// import { motion } from "framer-motion";

// const AboutHero = () => {
//   const { title, dividerColor, topImage, paragraphs, founder } =
//     ABOUT_VPP_DATA;

//   return (
//     <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden bg-gradient-to-b from-white to-navy-50/30">
//       {/* Background decorative elements */}
//       <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-navy-100/20 to-blue-100/10 rounded-full -translate-x-24 -translate-y-24"></div>
//       <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-tl from-blue-100/10 to-navy-100/20 rounded-full translate-x-24 translate-y-24"></div>

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
//               {title}
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

//         {/* ================= Images ================= */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.7 }}
//           viewport={{ once: true }}
//           className="mb-10 sm:mb-12 md:mb-14"
//         >
//           <div className="relative group max-w-md mx-auto">
//             <img
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
//             <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-xl sm:rounded-2xl opacity-0  transition-opacity duration-500"></div>
//           </div>
//         </motion.div>

//          {/* ================= Dynamic Founder Section ================= */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7, delay: 0.3 }}
//           viewport={{ once: true }}
//           className="mt-10 p-6 sm:mt-12 md:mt-16 text-center"
//         >
//           <div className="inline-block">
//             <h3 className="font-title text-lg sm:text-xl md:text-2xl font-bold text-navy-700 mb-1">
//               {founder.name}
//             </h3>
//             <p className="text-navy-600 text-sm sm:text-base mb-2">
//               {founder.years}
//             </p>
//             <div className="h-1 w-16 sm:w-20 gradient-navy mx-auto rounded-full mb-2"></div>
//             <p className="text-gray-600 text-sm sm:text-base italic">
//               {founder.description}
//             </p>
//           </div>
//         </motion.div>

//         {/* ================= Content ================= */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7, delay: 0.2 }}
//           viewport={{ once: true }}
//           className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl border border-navy-100 max-w-4xl mx-auto"
//         >
//           <div className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed space-y-4 lg:space-y-6">
//             {paragraphs.map((text, index) => (
//               <p key={index} className="text-justify">
//                 {text}
//               </p>
//             ))}
//           </div>
//         </motion.div>

        
//       </div>
//     </section>
//   );
// };

// export default AboutHero;
