import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Award, Users, Calendar, MapPin, BookOpen } from "lucide-react";
import { heroImg } from "../../assets";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../services/api"; // Update this import path based on your project structure

const AboutHero = () => {
  const [aboutData, setAboutData] = useState({
    badge: { text: "About Our Institution" },
    title: { prefix: "Shaping Futures Since", highlightedText: "2011-12" },
    description: {
      text: "Vidya Prabodhini Prashala has been a beacon of academic excellence, nurturing young minds with values-based education and holistic development for over eight decades."
    },
    buttons: [
      { id: "legacy", text: "Discover Our Legacy", link: "/about", type: "primary" },
      { id: "virtual-tour", text: "Virtual Campus Tour", link: "/virtual-tour", type: "secondary" }
    ],
    stats: [
      { id: "established", icon: "Calendar", value: "2007", label: "Established", suffix: "" },
      { id: "students", icon: "Users", value: "1300+", label: "Students", suffix: "" },
      { id: "faculty", icon: "Award", value: "150+", label: "Faculty", suffix: "" },
      { id: "excellence", icon: "BookOpen", value: "18+", label: "Years of Excellence", suffix: "" },
      { id: "campus", icon: "MapPin", value: "4", label: "Acres Campus", suffix: "" }
    ],
    background: { image: null },
    scrollIndicator: { enabled: true }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Map icon strings to actual components
  const getIcon = (iconName) => {
    const icons = {
      Calendar: <Calendar size={20} />,
      Users: <Users size={20} />,
      Award: <Award size={20} />,
      BookOpen: <BookOpen size={20} />,
      MapPin: <MapPin size={20} />
    };
    return icons[iconName] || <Calendar size={20} />;
  };

  useEffect(() => {
    fetchAboutHero();
  }, []);

  const fetchAboutHero = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/about-hero');
      
      if (response.data.success) {
        setAboutData(response.data.data);
        setError(null);
      }
    } catch (err) {
      console.error('Error fetching about hero:', err);
      setError('Failed to load about section');
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate();

  // Transform stats from API to include icon components
  const stats = aboutData.stats?.map(stat => ({
    ...stat,
    icon: getIcon(stat.icon)
  })) || [];

  // Loading state
  if (loading) {
    return (
      <section className="relative py-12 md:py-20 lg:py-28 xl:py-32 overflow-hidden bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 relative z-10 min-h-[400px] flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-white/20 border-t-gold-400 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white text-lg">Loading about section...</p>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="relative py-12 md:py-20 lg:py-28 xl:py-32 overflow-hidden bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 relative z-10 min-h-[400px] flex items-center justify-center">
          <div className="text-center text-white">
            <p className="text-xl mb-4">⚠️ {error}</p>
            <button 
              onClick={fetchAboutHero}
              className="px-6 py-2 bg-gold-400 text-navy-900 rounded-lg hover:bg-gold-500 transition-colors font-semibold"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-12 md:py-20 lg:py-28 xl:py-32 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 -z-20">
        <img
          src={aboutData.background?.image || heroImg}
          alt="Campus Background"
          className="absolute top-0 left-0 w-full h-full object-cover"
          onError={(e) => {
            e.target.src = heroImg; // Fallback to default image if API image fails
          }}
        />
        {/* Optimized Overlay for different screen sizes */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/90 via-navy-800/75 to-navy-900/90 
                       md:from-navy-900/85 md:via-navy-800/65 md:to-navy-900/85
                       lg:from-navy-900/80 lg:via-navy-800/70 lg:to-navy-900/80"></div>
        {/* Additional gradient for depth - responsive opacity */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900/50 via-transparent to-navy-800/40 
                       md:from-navy-900/40 md:via-transparent md:to-navy-800/30"></div>
      </div>

      {/* Background Pattern - responsive sizes and positioning */}
      <div className="absolute inset-0 opacity-5 md:opacity-10">
        <div className="absolute top-4 left-4 w-40 h-40 bg-blue-300 rounded-full mix-blend-soft-light filter blur-3xl 
                       md:top-10 md:left-10 md:w-60 md:h-60
                       lg:w-72 lg:h-72"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-navy-300 rounded-full mix-blend-soft-light filter blur-3xl
                       md:bottom-10 md:right-10 md:w-60 md:h-60
                       lg:w-72 lg:h-72"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12 xl:gap-16">
          {/* Left Column - Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white w-full lg:w-1/2 mb-10 lg:mb-0"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-white/10 rounded-full backdrop-blur-sm mb-4 md:mb-6">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gold-400 rounded-full animate-pulse"></span>
              <span className="text-xs md:text-sm font-secondary font-medium">
                {aboutData.badge?.text || "About Our Institution"}
              </span>
            </div>

            <h1 className="font-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 leading-snug md:leading-tight">
              {aboutData.title?.prefix || "Shaping Futures Since"}{" "}
              <span className="text-gold-400 relative inline-block">
                {aboutData.title?.highlightedText || "2011-12"}
                <span className="absolute -bottom-1 left-0 w-full h-0.5 md:h-1 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full"></span>
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-6 md:mb-8 leading-relaxed backdrop-blur-sm bg-white/5 p-3 md:p-4 rounded-lg md:rounded-xl">
              {aboutData.description?.text || "Vidya Prabodhini Prashala has been a beacon of academic excellence, nurturing young minds with values-based education and holistic development for over eight decades."}
            </p>

            {/* Button Group - responsive layout */}
            <div className="grid grid-cols-2 gap-3 sm:flex sm:gap-4">
              {aboutData.buttons?.map((button) => (
                <button
                  key={button.id}
                  onClick={() => navigate(button.link)}
                  className={`px-4 py-3 md:px-6 lg:px-8 md:py-3.5 text-xs sm:text-sm ${
                    button.type === "primary" 
                      ? "gradient-navy text-white shadow-lg shadow-navy-600/30" 
                      : "bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20"
                  } text-white rounded-lg font-secondary font-semibold hover:shadow-xl hover:-translate-y-1 transition-all duration-300 active:scale-95`}
                >
                  {button.text}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-4 md:gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl md:rounded-2xl p-4 md:p-6 hover:bg-white/15 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                    <div className="p-2 md:p-3 bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg md:rounded-xl shadow-lg">
                      <div className="text-white w-4 h-4 md:w-5 md:h-5 flex items-center justify-center">
                        {stat.icon}
                      </div>
                    </div>
                  </div>
                  <div className="font-title text-xl sm:text-2xl md:text-3xl font-bold text-white mb-0.5 md:mb-1">
                    {stat.value}
                    {/* <span className="text-gold-400">{stat.suffix}</span> */}
                  </div>
                  <div className="text-white/90 text-xs sm:text-sm font-secondary font-medium leading-tight md:leading-normal">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator - hidden on mobile, visible on larger screens */}
      {aboutData.scrollIndicator?.enabled && (
        <motion.div
          className="hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center backdrop-blur-sm">
            <div className="w-1 h-3 bg-gold-400 rounded-full mt-2"></div>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default AboutHero;

// import React from "react";
// import { motion } from "framer-motion";
// import { Award, Users, Calendar, MapPin, BookOpen } from "lucide-react";
// import { heroImg } from "../../assets";
// import { useNavigate } from "react-router-dom";



// const AboutHero = () => {
  
//   const stats = [
//     { icon: <Calendar size={20} />, value: "2007", label: "Established", suffix: "" },
//     { icon: <Users size={20} />, value: "1300+", label: "Students", suffix: "" },
//     { icon: <Award size={20} />, value: "150+", label: "Faculty", suffix: "" },
//     {
//       icon: <BookOpen size={20} />,
//       value: "18+",
//       label: "Years of Excellence",
//       suffix: "",
//     },
//     { icon: <MapPin size={20} />, value: "4", label: "Acres Campus", suffix: "" },
//   ];
  
//   const navigate = useNavigate();
//   return (
//     <section className="relative py-12 md:py-20 lg:py-28 xl:py-32 overflow-hidden">
//       {/* Background Image with Overlay */}
//       <div className="absolute inset-0 -z-20">
//         <img
//           src={heroImg}
//           alt="Campus Background"
//           className="absolute top-0 left-0 w-full h-full object-cover"
//         />
//         {/* Optimized Overlay for different screen sizes */}
//         <div className="absolute inset-0 bg-gradient-to-b from-navy-900/90 via-navy-800/75 to-navy-900/90 
//                        md:from-navy-900/85 md:via-navy-800/65 md:to-navy-900/85
//                        lg:from-navy-900/80 lg:via-navy-800/70 lg:to-navy-900/80"></div>
//         {/* Additional gradient for depth - responsive opacity */}
//         <div className="absolute inset-0 bg-gradient-to-br from-navy-900/50 via-transparent to-navy-800/40 
//                        md:from-navy-900/40 md:via-transparent md:to-navy-800/30"></div>
//       </div>

//       {/* Background Pattern - responsive sizes and positioning */}
//       <div className="absolute inset-0 opacity-5 md:opacity-10">
//         <div className="absolute top-4 left-4 w-40 h-40 bg-blue-300 rounded-full mix-blend-soft-light filter blur-3xl 
//                        md:top-10 md:left-10 md:w-60 md:h-60
//                        lg:w-72 lg:h-72"></div>
//         <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-navy-300 rounded-full mix-blend-soft-light filter blur-3xl
//                        md:bottom-10 md:right-10 md:w-60 md:h-60
//                        lg:w-72 lg:h-72"></div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 relative z-10">
//         <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12 xl:gap-16">
//           {/* Left Column - Text */}
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}
//             className="text-white w-full lg:w-1/2 mb-10 lg:mb-0"
//           >
//             <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-white/10 rounded-full backdrop-blur-sm mb-4 md:mb-6">
//               <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gold-400 rounded-full animate-pulse"></span>
//               <span className="text-xs md:text-sm font-secondary font-medium">
//                 About Our Institution
//               </span>
//             </div>

//             <h1 className="font-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 leading-snug md:leading-tight">
//               Shaping Futures Since{" "}
//               <span className="text-gold-400 relative inline-block">
//                 2011-12
//                 <span className="absolute -bottom-1 left-0 w-full h-0.5 md:h-1 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full"></span>
//               </span>
//             </h1>

//             <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-6 md:mb-8 leading-relaxed backdrop-blur-sm bg-white/5 p-3 md:p-4 rounded-lg md:rounded-xl">
//               Vidya Prabodhini Prashala has been a beacon of academic
//               excellence, nurturing young minds with values-based education and
//               holistic development for over eight decades.
//             </p>

//             {/* Button Group - responsive layout */}
//             <div className="grid grid-cols-2 gap-3 sm:flex sm:gap-4">
//   <button
//   onClick={()=> navigate("/about")} 
//   className="px-4 py-3 md:px-6 lg:px-8 md:py-3.5 text-xs sm:text-sm gradient-navy text-white rounded-lg font-secondary font-semibold hover:shadow-xl hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-navy-600/30 active:scale-95">
//     Discover Our Legacy
//   </button>
//   <button 
//   onClick={()=> navigate("/virtual-tour")}
//   className="px-4 py-3 md:px-6 lg:px-8 md:py-3.5 bg-white/10 backdrop-blur-sm text-xs sm:text-sm text-white rounded-lg font-secondary font-semibold border border-white/30 hover:bg-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-white/10 active:scale-95">
//     Virtual Campus Tour
//   </button>
// </div>
//           </motion.div>

//           {/* Right Column - Stats Grid */}
//           <motion.div
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="w-full lg:w-1/2"
//           >
//             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-4 md:gap-6">
//               {stats.map((stat, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: index * 0.1 }}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.98 }}
//                   className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl md:rounded-2xl p-4 md:p-6 hover:bg-white/15 transition-all duration-300 shadow-lg hover:shadow-xl"
//                 >
//                   <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
//                     <div className="p-2 md:p-3 bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg md:rounded-xl shadow-lg">
//                       <div className="text-white w-4 h-1 md:w-5 md:h-5 flex items-center justify-center">
//                         {stat.icon}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="font-title text-xl sm:text-2xl md:text-3xl font-bold text-white mb-0.5 md:mb-1">
//                     {stat.value}
//                     <span className="text-gold-400">{stat.suffix}</span>
//                   </div>
//                   <div className="text-white/90 text-xs sm:text-sm font-secondary font-medium leading-tight md:leading-normal">
//                     {stat.label}
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>
//         </div>
//       </div>

//       {/* Scroll Indicator - hidden on mobile, visible on larger screens */}
//       <motion.div
//         className="hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
//         animate={{ y: [0, 10, 0] }}
//         transition={{ repeat: Infinity, duration: 2 }}
//       >
//         <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center backdrop-blur-sm">
//           <div className="w-1 h-3 bg-gold-400 rounded-full mt-2"></div>
//         </div>
//       </motion.div>
//     </section>
//   );
// };

// export default AboutHero;