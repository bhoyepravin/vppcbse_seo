import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, BookOpen, Users, Target, Globe, Calculator, Palette, Music, Microscope, Cpu,Languages, Flame } from "lucide-react";
import {
  middleSectionIntro,
  middleSectionSubjects,
} from "../../../../constant/Aboutus/Academics/Middle/middleSectionData";

const MiddleSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const iconMap = {
    book: <BookOpen className="h-8 w-8" />,
    users: <Users className="h-8 w-8" />,
    target: <Target className="h-8 w-8" />,
    globe: <Globe className="h-8 w-8" />,
    calculator: <Calculator className="h-8 w-8" />,
    palette: <Palette className="h-8 w-8" />,
    music: <Music className="h-8 w-8" />,
    microscope: <Microscope className="h-8 w-8" />,
    cpu: <Cpu className="h-8 w-8" />,
    language: <Languages className="h-8 w-8" />,
    flame: <Flame className="h-8 w-8" />,
  };

  return (
    <section className="py-10 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-full -translate-x-48 -translate-y-48"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-500/5 to-purple-500/5 rounded-full translate-x-48 translate-y-48"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Middle Section Title */}
          <div className="flex items-center justify-center gap-3 mb-3 sm:mb-4">
            <div className="w-2 h-2 rounded-full bg-purple-500"></div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#800000] via-[#800000] to-[#800000] bg-clip-text text-transparent">
              Middle Section
            </h2>
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          </div>
          
          {/* 11 to 13 Years - On its own line */}
          <div className="mb-4 sm:mb-6">
            <span className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-700">
              11 to 13 Years
            </span>
          </div>
          
          {/* Divider Line */}
          <motion.div
            className="h-1.5 w-24 bg-gradient-to-r from-[#800000] via-[#800000] to-[#800000] mx-auto mb-8 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: "6rem" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          />
        </motion.div>

        {/* Introduction Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8 md:mb-16"
        >
          <div className="bg-gradient-to-br from-white to-white/90 rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 lg:p-12 border border-white/50 backdrop-blur-sm">
            <div className="space-y-3 sm:space-y-4 text-gray-700 text-justify">
              {middleSectionIntro.passage.map((text, i) => (
                <p 
                  key={i} 
                  className="text-sm sm:text-base md:text-lg leading-relaxed sm:leading-relaxed md:leading-relaxed"
                >
                  {text}
                </p>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 md:mb-16">
          {middleSectionIntro.cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-30px" }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="bg-gradient-to-br from-white to-white/90 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-5 md:p-6 lg:p-8 border border-white/50 backdrop-blur-sm text-center"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 md:mb-5 lg:mb-6 bg-gradient-to-r from-[#194369] to-[#194369] rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center text-white">
                <div className="text-lg sm:text-xl md:text-2xl">{card.icon}</div>
              </div>
              
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                {card.title}
              </h3>
              
              <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-tight sm:leading-normal">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Academic Curriculum */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-30px" }}
          className="max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto px-2 sm:px-4"
        >
          <div className="text-center mb-6 sm:mb-8 md:mb-10">
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#800000] mb-2 sm:mb-3 md:mb-4">
              Academic Curriculum
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 px-2 sm:px-4">
              Specialized curriculum preparing students for higher academic challenges
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {middleSectionSubjects.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                viewport={{ once: true, margin: "-20px" }}
                className="bg-gradient-to-br from-white to-white/90 
                           rounded-lg sm:rounded-xl md:rounded-2xl 
                           shadow-md sm:shadow-lg md:shadow-xl 
                           border border-gray-100/50 backdrop-blur-sm 
                           overflow-hidden"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between 
                             p-3 sm:p-4 md:p-5 lg:p-6 
                             text-left hover:bg-gray-50/30 
                             transition-colors duration-200"
                >
                  <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 
                                  bg-gradient-to-r from-purple-500/10 to-blue-500/10 
                                  rounded-lg sm:rounded-xl flex items-center justify-center 
                                  flex-shrink-0">
                      {iconMap[item.icon] || <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-purple-600" />}
                    </div>
                    <div className="text-left overflow-hidden">
                      <h4 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 
                                   truncate sm:whitespace-normal">
                        {item.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1 
                                  hidden sm:block">
                        Click to view details
                      </p>
                    </div>
                  </div>
                  
                  <ChevronDown
                    className={`w-4 h-4 sm:w-5 sm:h-5 text-purple-600 
                               transition-transform duration-300 flex-shrink-0
                               ${openIndex === index ? "rotate-180" : ""}`}
                  />
                </button>

                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="px-3 sm:px-4 md:px-5 lg:px-6 
                               pb-3 sm:pb-4 md:pb-5 lg:pb-6 
                               pt-1 sm:pt-2 border-t border-gray-100"
                  >
                    <div className="text-xs sm:text-sm md:text-base text-gray-700 
                                  leading-relaxed sm:leading-relaxed">
                      {item.content}
                    </div>
                    
                    {item.features && (
                      <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
                        <h5 className="text-sm sm:text-base font-semibold text-gray-900 mb-1.5 sm:mb-2">
                          Key Features:
                        </h5>
                        <ul className="space-y-1.5 sm:space-y-2">
                          {item.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-gray-600">
                              <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1 flex-shrink-0"></div>
                              <span className="text-xs sm:text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

       
      </div>
    </section>
  );
};

export default MiddleSection;