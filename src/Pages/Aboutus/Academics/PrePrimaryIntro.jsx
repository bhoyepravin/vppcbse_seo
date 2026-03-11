import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Sparkles, Star, Heart, Brain, BookOpen, Target, Users, Award } from "lucide-react";
import axiosInstance from "../../../services/api";

function PrePrimaryIntro() {
  const [sectionData, setSectionData] = useState({
    title: "Pre - Primary",
    subtitle: "Your section subtitle or description",
    ageGroup: "2-5 Years",
    icon: BookOpen,
    content: {
      title: "Pre - Primary 2-5 Years",
      passage: [
        "At the Pre-Primary level, we believe that the early years are the cornerstone of a child's lifelong learning journey. Our academic program is thoughtfully designed to nurture curiosity, creativity, and confidence through joyful, hands-on experiences. Every classroom is a vibrant world of exploration where play transforms into meaningful learning and discovery. Through activity-based teaching, phonics, storytelling, art, music, and thematic learning, children develop essential language, motor, and social skills. Our trained and caring educators create an environment that fosters imagination, teamwork, and independent thinking. We aim to make every child confident, happy, and eager to learn — laying a strong foundation for academic excellence and holistic growth."
      ]
    }
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Map icon strings to actual components
  const iconMap = {
    BookOpen: BookOpen,
    Target: Target,
    Users: Users,
    Award: Award,
    Brain: Brain,
    Heart: Heart,
    Sparkles: Sparkles,
    Star: Star
  };

  useEffect(() => {
    fetchPrePrimaryData();
  }, []);

  const fetchPrePrimaryData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/pre-primary');
      
      if (response.data.success) {
        const apiData = response.data.data;
        
        // Get the appropriate icon component
        const IconComponent = iconMap[apiData.prePrimary?.icon] || BookOpen;
        
        // Process the data
        const processedData = {
          title: apiData.prePrimary?.title || "Pre - Primary",
          subtitle: apiData.prePrimary?.subtitle || "Your section subtitle or description",
          ageGroup: apiData.prePrimary?.ageGroup || "2-5 Years",
          icon: IconComponent,
          content: {
            title: apiData.prePrimary?.content?.title || "Pre - Primary 2-5 Years",
            passage: apiData.prePrimary?.content?.passage?.length > 0 
              ? apiData.prePrimary.content.passage 
              : [
                  "At the Pre-Primary level, we believe that the early years are the cornerstone of a child's lifelong learning journey. Our academic program is thoughtfully designed to nurture curiosity, creativity, and confidence through joyful, hands-on experiences. Every classroom is a vibrant world of exploration where play transforms into meaningful learning and discovery. Through activity-based teaching, phonics, storytelling, art, music, and thematic learning, children develop essential language, motor, and social skills. Our trained and caring educators create an environment that fosters imagination, teamwork, and independent thinking. We aim to make every child confident, happy, and eager to learn — laying a strong foundation for academic excellence and holistic growth."
                ]
          }
        };
        
        setSectionData(processedData);
        setError(null);
      }
    } catch (err) {
      console.error('Error fetching pre-primary data:', err);
      setError('Failed to load pre-primary section');
    } finally {
      setLoading(false);
    }
  };

  const SectionIcon = sectionData.icon;

  // Loading state
  if (loading) {
    return (
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden bg-gradient-to-b from-white to-navy-50/30 min-h-[400px] flex items-center justify-center">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-navy-100/20 to-blue-100/10 rounded-full -translate-x-24 -translate-y-24"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-tl from-blue-100/10 to-navy-100/20 rounded-full translate-x-24 translate-y-24"></div>
        
        <div className="text-center relative z-10">
          <div className="w-16 h-16 border-4 border-navy-200 border-t-navy-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading pre-primary section...</p>
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
            onClick={fetchPrePrimaryData}
            className="px-6 py-2 bg-gradient-to-r from-navy-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition-colors"
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

      {/* Creative decorative elements */}
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
              {sectionData.title}
            </h2>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-500"></div>
          </div>
          
          {/* Age Group / Category with Creative Elements */}
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
                {sectionData.ageGroup}
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
            {sectionData.subtitle}
          </p>
        </motion.div>

        {/* ================= Content Section ================= */}
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
                  <SectionIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-navy-800">
                  {sectionData.content.title}
                </h3>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-4 sm:p-5 md:p-6 lg:p-8">
              <div className="bg-gradient-to-br from-navy-50/30 to-blue-50/30 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 shadow-sm">
                <div className="space-y-3 sm:space-y-4 text-gray-700 text-justify">
                  {sectionData.content.passage.map((text, i) => (
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

        {/* ================= Optional Additional Sections ================= */}
        {/* You can add more sections here following the same pattern */}
        
      </div>
    </section>
  );
}

export default PrePrimaryIntro;