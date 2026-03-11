import React, { useState, useEffect } from "react";
import { VISION_MISSION_DATA as defaultVisionMissionData } from "../../../constant/Aboutus/visionMissionData";
import { motion } from "framer-motion";
import { Target, Eye, Heart } from "lucide-react";
import axiosInstance from "../../../services/api"; // Update this import path based on your project structure

const VisionMission = () => {
  const [visionData, setVisionData] = useState({
    visionMission: {
      id: "vision-mission-section",
      title: defaultVisionMissionData.title,
      leftColumn: defaultVisionMissionData.leftColumn,
      rightColumn: defaultVisionMissionData.rightColumn
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVisionMission();
  }, []);

  const fetchVisionMission = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/vision-mission');
      
      if (response.data.success) {
        const apiData = response.data.data;
        
        // Process the API data
        const processedData = {
          visionMission: {
            id: apiData.visionMission?.id || "vision-mission-section",
            title: apiData.visionMission?.title || defaultVisionMissionData.title,
            leftColumn: apiData.visionMission?.leftColumn?.length > 0 
              ? apiData.visionMission.leftColumn 
              : defaultVisionMissionData.leftColumn,
            rightColumn: apiData.visionMission?.rightColumn || defaultVisionMissionData.rightColumn
          }
        };
        
        setVisionData(processedData);
        setError(null);
      }
    } catch (err) {
      console.error('Error fetching vision mission:', err);
      setError('Failed to load vision and mission');
    } finally {
      setLoading(false);
    }
  };

  const { title, leftColumn, rightColumn } = visionData.visionMission;

  const getIcon = (heading) => {
    if (heading.toLowerCase().includes("vision")) return <Eye className="w-5 h-5 sm:w-6 sm:h-6" />;
    if (heading.toLowerCase().includes("mission")) return <Target className="w-5 h-5 sm:w-6 sm:h-6" />;
    return <Heart className="w-5 h-5 sm:w-6 sm:h-6" />;
  };

  // Loading state
  if (loading) {
    return (
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden bg-gradient-to-b from-white to-navy-50/30 min-h-[400px] flex items-center justify-center">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-bl from-navy-100/20 to-blue-100/10 rounded-full translate-x-24 -translate-y-24"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-tr from-blue-100/10 to-navy-100/20 rounded-full -translate-x-24 translate-y-24"></div>
        
        <div className="text-center relative z-10">
          <div className="w-16 h-16 border-4 border-navy-200 border-t-navy-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading vision & mission...</p>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden bg-gradient-to-b from-white to-navy-50/30 min-h-[400px] flex items-center justify-center">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-bl from-navy-100/20 to-blue-100/10 rounded-full translate-x-24 -translate-y-24"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-tr from-blue-100/10 to-navy-100/20 rounded-full -translate-x-24 translate-y-24"></div>
        
        <div className="text-center relative z-10">
          <p className="text-red-600 text-xl mb-4">⚠️ {error}</p>
          <button 
            onClick={fetchVisionMission}
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
      <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-bl from-navy-100/20 to-blue-100/10 rounded-full translate-x-24 -translate-y-24"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-tr from-blue-100/10 to-navy-100/20 rounded-full -translate-x-24 translate-y-24"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <motion.div
          className="text-center mb-10 sm:mb-12 md:mb-16"
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
            className="h-1 sm:h-1.5 w-16 sm:w-20 md:w-24 gradient-navy mx-auto mb-6 sm:mb-8 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: "4rem" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          />
        </motion.div>

        {/* Two Column Layout - Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {/* Left Column – Vision & Mission */}
          <div className="space-y-6 sm:space-y-8">
            {leftColumn.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-7 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-navy-100 group hover:-translate-y-1"
              >
                <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="p-2 sm:p-3 bg-gradient-to-br from-navy-50 to-blue-50 rounded-lg sm:rounded-xl text-navy-600 group-hover:scale-110 transition-transform duration-500">
                    {getIcon(item.heading)}
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-navy-800 group-hover:text-navy-700 transition-colors duration-300">
                    {item.heading}
                  </h3>
                </div>
                <p className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed pl-0 sm:pl-2 md:pl-3">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Right Column – Our Purpose */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-navy-600 to-navy-800 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-7 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 group hover:-translate-y-1"
          >
            <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-5 md:mb-6">
              <div className="p-2 sm:p-3 bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl text-white">
                <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                {rightColumn.heading}
              </h3>
            </div>
            <p className="text-white/90 text-sm sm:text-base lg:text-lg leading-relaxed pl-0 sm:pl-2 md:pl-3">
              {rightColumn.description}
            </p>
            
            {/* Decorative elements */}
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/20">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-white/80">
                <span className="w-2 h-2 rounded-full bg-white/60"></span>
                <span>Guiding generations towards excellence</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom decorative element */}
        <motion.div
          className="flex justify-center mt-10 sm:mt-12 md:mt-16"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4 text-navy-600">
            <div className="w-8 h-px sm:w-12 md:w-16 bg-gradient-to-r from-transparent via-navy-400 to-transparent"></div>
            <span className="text-xs sm:text-sm font-medium">Our Core Values</span>
            <div className="w-8 h-px sm:w-12 md:w-16 bg-gradient-to-r from-transparent via-navy-400 to-transparent"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VisionMission;



// import React from "react";
// import { VISION_MISSION_DATA } from "../../../constant/Aboutus/visionMissionData";
// import { motion } from "framer-motion";
// import { Target, Eye, Heart } from "lucide-react";

// const VisionMission = () => {
//   const { title, leftColumn, rightColumn } = VISION_MISSION_DATA;

//   const getIcon = (heading) => {
//     if (heading.toLowerCase().includes("vision")) return <Eye className="w-5 h-5 sm:w-6 sm:h-6" />;
//     if (heading.toLowerCase().includes("mission")) return <Target className="w-5 h-5 sm:w-6 sm:h-6" />;
//     return <Heart className="w-5 h-5 sm:w-6 sm:h-6" />;
//   };

//   return (
//     <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden bg-gradient-to-b from-white to-navy-50/30">
//       {/* Background decorative elements */}
//       <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-bl from-navy-100/20 to-blue-100/10 rounded-full translate-x-24 -translate-y-24"></div>
//       <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-tr from-blue-100/10 to-navy-100/20 rounded-full -translate-x-24 translate-y-24"></div>

//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         {/* Section Title */}
//         <motion.div
//           className="text-center mb-10 sm:mb-12 md:mb-16"
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
//             className="h-1 sm:h-1.5 w-16 sm:w-20 md:w-24 gradient-navy mx-auto mb-6 sm:mb-8 rounded-full"
//             initial={{ width: 0 }}
//             whileInView={{ width: "4rem" }}
//             transition={{ duration: 0.8, delay: 0.3 }}
//             viewport={{ once: true }}
//           />
//         </motion.div>

//         {/* Two Column Layout - Responsive */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
//           {/* Left Column – Vision & Mission */}
//           <div className="space-y-6 sm:space-y-8">
//             {leftColumn.map((item, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, x: -30 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.6, delay: index * 0.1 }}
//                 viewport={{ once: true }}
//                 className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-7 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-navy-100 group hover:-translate-y-1"
//               >
//                 <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
//                   <div className="p-2 sm:p-3 bg-gradient-to-br from-navy-50 to-blue-50 rounded-lg sm:rounded-xl text-navy-600 group-hover:scale-110 transition-transform duration-500">
//                     {getIcon(item.heading)}
//                   </div>
//                   <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-navy-800 group-hover:text-navy-700 transition-colors duration-300">
//                     {item.heading}
//                   </h3>
//                 </div>
//                 <p className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed pl-0 sm:pl-2 md:pl-3">
//                   {item.description}
//                 </p>
//               </motion.div>
//             ))}
//           </div>

//           {/* Right Column – Our Purpose */}
//           <motion.div
//             initial={{ opacity: 0, x: 30 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6, delay: 0.3 }}
//             viewport={{ once: true }}
//             className="bg-gradient-to-br from-navy-600 to-navy-800 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-7 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 group hover:-translate-y-1"
//           >
//             <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-5 md:mb-6">
//               <div className="p-2 sm:p-3 bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl text-white">
//                 <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
//               </div>
//               <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
//                 {rightColumn.heading}
//               </h3>
//             </div>
//             <p className="text-white/90 text-sm sm:text-base lg:text-lg leading-relaxed pl-0 sm:pl-2 md:pl-3">
//               {rightColumn.description}
//             </p>
            
//             {/* Decorative elements */}
//             <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/20">
//               <div className="flex items-center gap-2 text-xs sm:text-sm text-white/80">
//                 <span className="w-2 h-2 rounded-full bg-white/60"></span>
//                 <span>Guiding generations towards excellence</span>
//               </div>
//             </div>
//           </motion.div>
//         </div>

//         {/* Bottom decorative element */}
//         <motion.div
//           className="flex justify-center mt-10 sm:mt-12 md:mt-16"
//           initial={{ opacity: 0, scale: 0 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.6, delay: 0.5 }}
//           viewport={{ once: true }}
//         >
//           <div className="flex items-center gap-4 text-navy-600">
//             <div className="w-8 h-px sm:w-12 md:w-16 bg-gradient-to-r from-transparent via-navy-400 to-transparent"></div>
//             <span className="text-xs sm:text-sm font-medium">Our Core Values</span>
//             <div className="w-8 h-px sm:w-12 md:w-16 bg-gradient-to-r from-transparent via-navy-400 to-transparent"></div>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default VisionMission;