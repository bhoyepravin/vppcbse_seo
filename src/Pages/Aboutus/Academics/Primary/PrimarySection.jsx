import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, BookOpen, Users, Target, Globe, Calculator, Palette, Music, Microscope, Star, Brain, Heart, Sparkles, GraduationCap } from "lucide-react";
import {
  primarySectionIntro,
  primarySectionSubjects,
} from "../../../../constant/Aboutus/Academics/Primary/primarySectionData";

const PrimarySection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const iconMap = {
    book: <BookOpen className="h-5 w-5 sm:h-6 sm:w-6" />,
    users: <Users className="h-5 w-5 sm:h-6 sm:w-6" />,
    target: <Target className="h-5 w-5 sm:h-6 sm:w-6" />,
    globe: <Globe className="h-5 w-5 sm:h-6 sm:w-6" />,
    calculator: <Calculator className="h-5 w-5 sm:h-6 sm:w-6" />,
    palette: <Palette className="h-5 w-5 sm:h-6 sm:w-6" />,
    music: <Music className="h-5 w-5 sm:h-6 sm:w-6" />,
    microscope: <Microscope className="h-5 w-5 sm:h-6 sm:w-6" />,
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden bg-gradient-to-b from-white to-navy-50/30">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-navy-100/20 to-blue-100/10 rounded-full -translate-x-24 -translate-y-24"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-tl from-blue-100/10 to-navy-100/20 rounded-full translate-x-24 translate-y-24"></div>

      {/* Creative decorative elements for primary section */}
      <div className="absolute top-1/4 left-4 sm:left-10 opacity-20">
        <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-navy-400" />
      </div>
      <div className="absolute bottom-1/4 right-4 sm:right-10 opacity-20">
        <Star className="w-8 h-8 sm:w-10 sm:h-10 text-navy-400" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ================= Header Section ================= */}
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
              Primary Section
            </h2>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-500"></div>
          </div>
          
          {/* Age Group with Creative Elements */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-4 sm:mb-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-navy-50 to-blue-50 rounded-full border border-navy-100 shadow-sm">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-navy-600" />
              <span className="text-base sm:text-lg md:text-xl font-semibold text-navy-700">
                6 to 10 Years
              </span>
              <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-navy-600" />
            </div>
          </motion.div>
          
          <motion.div
            className="h-1 sm:h-1.5 w-16 sm:w-20 md:w-24 gradient-navy mx-auto mb-6 sm:mb-8 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: "4rem" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          />
          <p className="text-gray-700 max-w-2xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl px-2 sm:px-4">
            A comprehensive and balanced curriculum designed for holistic development
          </p>
        </motion.div>

        {/* ================= Introduction Section ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-12 md:mb-16"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-navy-100 overflow-hidden">
            {/* Section Header */}
            <div className="p-5 sm:p-6 md:p-8 bg-gradient-to-r from-navy-50 to-blue-50 border-b border-navy-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-navy-600 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-navy-800">
                  {primarySectionIntro.title}
                </h3>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-4 sm:p-5 md:p-6 lg:p-8">
              <div className="bg-gradient-to-br from-navy-50/30 to-blue-50/30 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 shadow-sm">
                <div className="space-y-3 sm:space-y-4 text-gray-700 text-justify">
                  {primarySectionIntro.passage.map((text, i) => (
                    <p 
                      key={i} 
                      className="text-sm sm:text-base md:text-lg leading-relaxed"
                    >
                      {text}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ================= Feature Cards ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-12 md:mb-16"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-navy-100 overflow-hidden">
            {/* Feature Cards Header */}
            <div className="p-5 sm:p-6 md:p-8 bg-gradient-to-r from-navy-50 to-blue-50 border-b border-navy-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-navy-600 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                  <Star className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-navy-800">
                  Key Features
                </h3>
              </div>
            </div>
            
            {/* Cards Grid */}
            <div className="p-4 sm:p-5 md:p-6 lg:p-8">
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                {primarySectionIntro.cards.map((card, index) => (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true, margin: "-30px" }}
                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                    className="bg-gradient-to-br from-white to-white/90 rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-navy-100 p-3 sm:p-4 md:p-5 text-center group"
                  >
                    {/* Creative Icon Container */}
                    <div className="relative mb-3 sm:mb-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 mx-auto bg-gradient-to-br from-navy-600 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                        <div className="text-base sm:text-lg md:text-xl">{card.icon}</div>
                      </div>
                      <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                        <Star className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white" />
                      </div>
                    </div>
                    
                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-navy-800 mb-1 sm:mb-2">
                      {card.title}
                    </h3>
                    
                    <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-tight sm:leading-normal">
                      {card.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ================= Academic Curriculum ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-30px" }}
          className="max-w-full lg:max-w-5xl mx-auto"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-navy-100 overflow-hidden">
            {/* Curriculum Header */}
            <div className="p-5 sm:p-6 md:p-8 bg-gradient-to-r from-navy-50 to-blue-50 border-b border-navy-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-navy-600 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-navy-800">
                    Academic Curriculum
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg text-gray-700 mt-1">
                    A comprehensive and balanced curriculum designed for holistic development
                  </p>
                </div>
              </div>
            </div>
            
            {/* Curriculum Subjects */}
            <div className="p-4 sm:p-5 md:p-6 lg:p-8">
              <div className="space-y-3 sm:space-y-4">
                {primarySectionSubjects.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    viewport={{ once: true, margin: "-20px" }}
                    className="bg-gradient-to-br from-white to-white/90 rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-navy-100 overflow-hidden"
                  >
                    <button
                      onClick={() => toggle(index)}
                      className="w-full flex items-center justify-between p-3 sm:p-4 md:p-5 text-left hover:bg-navy-50/30 transition-colors duration-200"
                    >
                      <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-1 min-w-0">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-navy-100 to-blue-100 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                          {iconMap[item.icon] || <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-navy-600" />}
                        </div>
                        <div className="text-left overflow-hidden flex-1 min-w-0">
                          <h4 className="text-sm sm:text-base md:text-lg font-semibold text-navy-800 truncate sm:whitespace-normal">
                            {item.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1 hidden sm:block truncate">
                            Click to view details
                          </p>
                        </div>
                      </div>
                      
                      <ChevronDown
                        className={`w-4 h-4 sm:w-5 sm:h-5 text-navy-600 transition-transform duration-300 flex-shrink-0 ${
                          openIndex === index ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {openIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-3 sm:px-4 md:px-5 pb-3 sm:pb-4 md:pb-5 pt-1 sm:pt-2 border-t border-navy-100"
                      >
                        <div className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                          {item.content}
                        </div>
                        
                        {item.features && (
                          <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-navy-100">
                            <h5 className="text-sm sm:text-base font-semibold text-navy-700 mb-1.5 sm:mb-2 flex items-center gap-2">
                              <Sparkles className="w-4 h-4" />
                              Key Features:
                            </h5>
                            <ul className="space-y-1.5 sm:space-y-2">
                              {item.features.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-gray-600">
                                  <div className="w-1.5 h-1.5 rounded-full bg-navy-400 mt-1.5 flex-shrink-0"></div>
                                  <span className="text-xs sm:text-sm md:text-base flex-1">{feature}</span>
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
              
              {/* Curriculum Footer */}
              <div className="flex items-center justify-center mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-navy-100">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-navy-600">
                  <div className="w-2 h-2 rounded-full bg-navy-400"></div>
                  <span>{primarySectionSubjects.length} Subjects for Holistic Development</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ================= Bottom decorative element ================= */}
        <motion.div
          className="flex justify-center mt-10 sm:mt-12 md:mt-16"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4 text-navy-600">
            <div className="w-8 h-px sm:w-12 md:w-16 bg-gradient-to-r from-transparent via-navy-400 to-transparent"></div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-xs sm:text-sm font-medium">Fun Learning Journey</span>
              <Star className="w-4 h-4 text-yellow-500" />
            </div>
            <div className="w-8 h-px sm:w-12 md:w-16 bg-gradient-to-r from-transparent via-navy-400 to-transparent"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PrimarySection;