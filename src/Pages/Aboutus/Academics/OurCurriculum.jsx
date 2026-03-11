import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  BookOpen,
  Target,
  Users,
  Award,
  Brain,
  BarChart3,
  ChevronRight,
  ChevronLeft,
  Star,
  Heart,
  Sparkles,
  Cloud,
  Sun,
  Moon,
} from "lucide-react";
import { curriculumData as defaultCurriculumData } from "../../../constant/Aboutus/Academics/curriculumData";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../services/api"; // Update this import path based on your project structure

const CurriculumCard = ({ item, index }) => {
  const navigate = useNavigate();
  
  const iconMap = {
    book: <BookOpen className="h-6 w-6 sm:h-8 sm:w-8" />,
    target: <Target className="h-6 w-6 sm:h-8 sm:w-8" />,
    users: <Users className="h-6 w-6 sm:h-8 sm:w-8" />,
    award: <Award className="h-6 w-6 sm:h-8 sm:w-8" />,
    brain: <Brain className="h-6 w-6 sm:h-8 sm:w-8" />,
    chart: <BarChart3 className="h-6 w-6 sm:h-8 sm:w-8" />,
  };

  // Function to handle Learn More click - navigate to /curriculum
  const handleLearnMore = () => {
    navigate('/curriculum', { 
      state: { 
        activeTab: index,
        title: item.title,
        data: item 
      } 
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      className="group bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-navy-100 p-4 sm:p-6 md:p-8 hover:-translate-y-1 h-full"
    >
      <div className="flex items-start justify-between mb-4 sm:mb-6">
        <div className="relative">
          <div className="p-3 sm:p-4 bg-gradient-to-br from-navy-600 to-blue-600 rounded-lg sm:rounded-xl text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
            {iconMap[item.icon] || <BookOpen className="h-6 w-6 sm:h-8 sm:w-8" />}
          </div>
          {/* Doodle decoration */}
          <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
            <Star className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white" />
          </div>
        </div>
        <div className="text-lg sm:text-xl md:text-2xl text-navy-300 font-bold">0{index + 1}</div>
      </div>

      <h3 className="text-base sm:text-lg md:text-xl font-bold text-navy-800 mb-3 sm:mb-4 group-hover:text-navy-700 transition-colors duration-300">
        {item.title}
      </h3>

      <div className="flex items-center gap-1 sm:gap-1.5 mb-3 sm:mb-4">
        <div className="h-1 w-6 sm:w-8 bg-navy-500 rounded-full"></div>
        <div className="h-1 w-3 sm:w-4 bg-blue-500 rounded-full"></div>
        <div className="h-1 w-2 sm:w-2 bg-navy-400 rounded-full"></div>
      </div>

      <p className="text-gray-700 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">{item.description}</p>

      {item.features && (
        <div className="pt-4 sm:pt-6 border-t border-navy-100">
          <ul className="space-y-2 sm:space-y-3">
            {item.features.slice(0, 3).map((feature, idx) => (
              <li key={idx} className="flex items-center gap-2 sm:gap-3 text-gray-700">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-400 flex-shrink-0"></div>
                <span className="text-xs sm:text-sm font-medium">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-navy-100">
        <button 
          onClick={handleLearnMore}
          className="group w-full inline-flex items-center justify-center gap-2 gradient-navy text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base active:scale-95"
        >
          <span>Learn More</span>
          <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div>
    </motion.div>
  );
};

const OurCurriculum = () => {
  const [curriculumData, setCurriculumData] = useState({
    curriculum: {
      id: "curriculum-section",
      header: {
        title: defaultCurriculumData.header?.title || "Our Comprehensive Curriculum",
        description: defaultCurriculumData.header?.description || "A balanced and innovative educational approach designed to nurture every student's potential and prepare them for future challenges",
        decorations: {
          dots: [
            { color: "bg-navy-500" },
            { color: "bg-navy-500" }
          ]
        }
      },
      cards: defaultCurriculumData.cards || [],
      footer: {
        text: defaultCurriculumData.footer?.text || "Fun Learning Activities",
        decorations: {
          lineColor: defaultCurriculumData.footer?.decorations?.lineColor || "from-transparent via-navy-400 to-transparent",
          icons: {
            left: defaultCurriculumData.footer?.decorations?.icons?.left || "Star",
            right: defaultCurriculumData.footer?.decorations?.icons?.right || "Star",
            color: defaultCurriculumData.footer?.decorations?.icons?.color || "text-yellow-500"
          }
        }
      }
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCurriculumCards();
  }, []);

  const fetchCurriculumCards = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/curriculum-cards');
      
      if (response.data.success) {
        const apiData = response.data.data;
        
        // Process the API data
        const processedData = {
          curriculum: {
            id: apiData.curriculum?.id || "curriculum-section",
            header: {
              title: apiData.curriculum?.header?.title || "Our Comprehensive Curriculum",
              description: apiData.curriculum?.header?.description || "A balanced and innovative educational approach designed to nurture every student's potential and prepare them for future challenges",
              decorations: {
                dots: apiData.curriculum?.header?.decorations?.dots || [
                  { color: "bg-navy-500" },
                  { color: "bg-navy-500" }
                ]
              }
            },
            cards: apiData.curriculum?.cards?.length > 0 
              ? apiData.curriculum.cards 
              : defaultCurriculumData.cards || [],
            footer: {
              text: apiData.curriculum?.footer?.text || "Fun Learning Activities",
              decorations: {
                lineColor: apiData.curriculum?.footer?.decorations?.lineColor || "from-transparent via-navy-400 to-transparent",
                icons: {
                  left: apiData.curriculum?.footer?.decorations?.icons?.left || "Star",
                  right: apiData.curriculum?.footer?.decorations?.icons?.right || "Star",
                  color: apiData.curriculum?.footer?.decorations?.icons?.color || "text-yellow-500"
                }
              }
            }
          }
        };
        
        setCurriculumData(processedData);
        setError(null);
      }
    } catch (err) {
      console.error('Error fetching curriculum cards:', err);
      setError('Failed to load curriculum information');
    } finally {
      setLoading(false);
    }
  };

  const { header, cards, footer } = curriculumData.curriculum;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % cards.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + cards.length) % cards.length
    );
  };

  // Function to handle Learn More click for mobile - navigate to /curriculum
  const handleMobileLearnMore = (itemId, itemTitle, index) => {
    const clickedItem = cards.find(item => item.id === itemId);
    navigate('/curriculum', { 
      state: { 
        activeTab: index,
        title: itemTitle,
        data: clickedItem 
      } 
    });
  };

  // Auto slide for mobile
  useEffect(() => {
    if (window.innerWidth < 768 && cards.length > 0) {
      const interval = setInterval(() => {
        nextSlide();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [currentSlide, cards.length]);

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
            onClick={fetchCurriculumCards}
            className="px-6 py-2 gradient-navy text-white rounded-lg hover:opacity-90 transition-colors"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden bg-gradient-to-b from-white to-navy-50/30" id="curriculum">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-navy-100/20 to-blue-100/10 rounded-full -translate-x-24 -translate-y-24"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-tl from-blue-100/10 to-navy-100/20 rounded-full translate-x-24 translate-y-24"></div>

      {/* Creative Doodles for Pre-Primary Section */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating doodles */}
        <div className="absolute top-10 left-5 sm:top-20 sm:left-10 opacity-20 animate-bounce">
          <Cloud className="w-8 h-8 sm:w-10 sm:h-10 text-navy-400" />
        </div>
        <div className="absolute top-20 right-8 sm:top-32 sm:right-16 opacity-20 animate-pulse">
          <Sun className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-400" />
        </div>
        <div className="absolute bottom-20 left-10 sm:bottom-32 sm:left-20 opacity-20 animate-bounce">
          <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-pink-400" />
        </div>
        <div className="absolute bottom-10 right-5 sm:bottom-20 sm:right-10 opacity-20 animate-pulse">
          <Moon className="w-8 h-8 sm:w-10 sm:h-10 text-blue-300" />
        </div>
        <div className="absolute top-1/3 left-1/4 opacity-15">
          <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-navy-300" />
        </div>
        <div className="absolute bottom-1/3 right-1/4 opacity-15">
          <Star className="w-6 h-6 sm:w-8 sm:h-8 text-navy-300" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ================= Section Header ================= */}
        <motion.div
          className="text-center mb-10 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${header?.decorations?.dots?.[0]?.color || 'bg-navy-500'}`}></div>
            <h2 className="font-title text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gradient-navy">
              {header?.title || "Our Comprehensive Curriculum"}
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
            {header?.description || "A balanced and innovative educational approach designed to nurture every student's potential and prepare them for future challenges"}
          </p>
        </motion.div>

        {/* ================= Curriculum Cards ================= */}
        {cards.length > 0 && (
          <div className="relative">
            {/* Desktop Grid View */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {cards.map((item, index) => (
                <CurriculumCard key={item.id || index} item={item} index={index} />
              ))}
            </div>

            {/* Mobile Slider View */}
            <div className="md:hidden">
              <div className="relative overflow-hidden">
                {/* Slider Container */}
                <div
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {cards.map((item, index) => (
                    <div key={item.id || index} className="w-full flex-shrink-0 px-2 sm:px-4">
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-navy-100 p-4 sm:p-6"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="relative">
                            <div className="p-3 bg-gradient-to-br from-navy-600 to-blue-600 rounded-lg text-white shadow-md">
                              {iconMap[item.icon] || <BookOpen className="h-5 w-5" />}
                            </div>
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                              <Star className="w-1.5 h-1.5 text-white" />
                            </div>
                          </div>
                          <div className="text-base text-navy-300 font-bold">0{index + 1}</div>
                        </div>

                        <h3 className="text-base font-bold text-navy-800 mb-2">
                          {item.title}
                        </h3>

                        <div className="flex items-center gap-1 mb-2">
                          <div className="h-1 w-6 bg-navy-500 rounded-full"></div>
                          <div className="h-1 w-3 bg-blue-500 rounded-full"></div>
                          <div className="h-1 w-2 bg-navy-400 rounded-full"></div>
                        </div>

                        <p className="text-gray-700 text-xs sm:text-sm mb-3 leading-relaxed line-clamp-3">
                          {item.description}
                        </p>

                        {item.features && (
                          <div className="pt-3 border-t border-navy-100 mb-3">
                            <ul className="space-y-1">
                              {item.features.slice(0, 2).map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-gray-700">
                                  <div className="w-1.5 h-1.5 rounded-full bg-navy-400"></div>
                                  <span className="text-xs">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <button 
                          onClick={() => handleMobileLearnMore(item.id, item.title, index)}
                          className="group w-full inline-flex items-center justify-center gap-2 gradient-navy text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-xs sm:text-sm active:scale-95"
                        >
                          <span>Learn More</span>
                          <ChevronRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </motion.div>
                    </div>
                  ))}
                </div>

                {/* Slider Navigation */}
                <div className="flex justify-between items-center mt-6 sm:mt-8">
                  <button
                    onClick={prevSlide}
                    className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full gradient-navy text-white shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                    disabled={currentSlide === 0}
                  >
                    <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>

                  {/* Dots Indicator */}
                  <div className="flex gap-1.5 sm:gap-2">
                    {cards.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                          index === currentSlide
                            ? "gradient-navy w-4 sm:w-6"
                            : "bg-navy-300"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={nextSlide}
                    className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full gradient-navy text-white shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                    disabled={currentSlide === cards.length - 1}
                  >
                    <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= Bottom decorative element ================= */}
        <motion.div
          className="flex justify-center mt-10 sm:mt-12 md:mt-16"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4 text-navy-600">
            <div className={`w-8 h-px sm:w-12 md:w-16 bg-gradient-to-r ${footer?.decorations?.lineColor || 'from-transparent via-navy-400 to-transparent'}`}></div>
            <div className="flex items-center gap-2">
              {footer?.decorations?.icons?.left === "Star" && (
                <Star className={`w-3 h-3 sm:w-4 sm:h-4 ${footer?.decorations?.icons?.color || 'text-yellow-500'}`} />
              )}
              <span className="text-xs sm:text-sm font-medium">{footer?.text || "Fun Learning Activities"}</span>
              {footer?.decorations?.icons?.right === "Star" && (
                <Star className={`w-3 h-3 sm:w-4 sm:h-4 ${footer?.decorations?.icons?.color || 'text-yellow-500'}`} />
              )}
            </div>
            <div className={`w-8 h-px sm:w-12 md:w-16 bg-gradient-to-r ${footer?.decorations?.lineColor || 'from-transparent via-navy-400 to-transparent'}`}></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Icon map for mobile view
const iconMap = {
  book: <BookOpen className="h-5 w-5" />,
  target: <Target className="h-5 w-5" />,
  users: <Users className="h-5 w-5" />,
  award: <Award className="h-5 w-5" />,
  brain: <Brain className="h-5 w-5" />,
  chart: <BarChart3 className="h-5 w-5" />,
};

export default OurCurriculum;

// import { motion } from "framer-motion";
// import { useState, useEffect } from "react";
// import {
//   BookOpen,
//   Target,
//   Users,
//   Award,
//   Brain,
//   BarChart3,
//   ChevronRight,
//   ChevronLeft,
//   Star,
//   Heart,
//   Sparkles,
//   Cloud,
//   Sun,
//   Moon,
// } from "lucide-react";
// import { curriculumData } from "../../../constant/Aboutus/Academics/curriculumData";
// import { useNavigate } from "react-router-dom"; // Added import

// const CurriculumCard = ({ item, index }) => {
//   const navigate = useNavigate(); // Added navigate hook
  
//   const iconMap = {
//     book: <BookOpen className="h-6 w-6 sm:h-8 sm:w-8" />,
//     target: <Target className="h-6 w-6 sm:h-8 sm:w-8" />,
//     users: <Users className="h-6 w-6 sm:h-8 sm:w-8" />,
//     award: <Award className="h-6 w-6 sm:h-8 sm:w-8" />,
//     brain: <Brain className="h-6 w-6 sm:h-8 sm:w-8" />,
//     chart: <BarChart3 className="h-6 w-6 sm:h-8 sm:w-8" />,
//   };

//   // Function to handle Learn More click - navigate to /curriculum
//   const handleLearnMore = () => {
//     navigate('/curriculum', { 
//       state: { 
//         activeTab: index, // Optional: to highlight which curriculum item was clicked
//         title: item.title,
//         data: item 
//       } 
//     });
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ delay: index * 0.1, duration: 0.5 }}
//       viewport={{ once: true }}
//       className="group bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-navy-100 p-4 sm:p-6 md:p-8 hover:-translate-y-1 h-full"
//     >
//       <div className="flex items-start justify-between mb-4 sm:mb-6">
//         <div className="relative">
//           <div className="p-3 sm:p-4 bg-gradient-to-br from-navy-600 to-blue-600 rounded-lg sm:rounded-xl text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
//             {iconMap[item.icon] || <BookOpen className="h-6 w-6 sm:h-8 sm:w-8" />}
//           </div>
//           {/* Doodle decoration */}
//           <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
//             <Star className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white" />
//           </div>
//         </div>
//         <div className="text-lg sm:text-xl md:text-2xl text-navy-300 font-bold">0{index + 1}</div>
//       </div>

//       <h3 className="text-base sm:text-lg md:text-xl font-bold text-navy-800 mb-3 sm:mb-4 group-hover:text-navy-700 transition-colors duration-300">
//         {item.title}
//       </h3>

//       <div className="flex items-center gap-1 sm:gap-1.5 mb-3 sm:mb-4">
//         <div className="h-1 w-6 sm:w-8 bg-navy-500 rounded-full"></div>
//         <div className="h-1 w-3 sm:w-4 bg-blue-500 rounded-full"></div>
//         <div className="h-1 w-2 sm:w-2 bg-navy-400 rounded-full"></div>
//       </div>

//       <p className="text-gray-700 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">{item.description}</p>

//       {item.features && (
//         <div className="pt-4 sm:pt-6 border-t border-navy-100">
//           <ul className="space-y-2 sm:space-y-3">
//             {item.features.slice(0, 3).map((feature, idx) => (
//               <li key={idx} className="flex items-center gap-2 sm:gap-3 text-gray-700">
//                 <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-400 flex-shrink-0"></div>
//                 <span className="text-xs sm:text-sm font-medium">{feature}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       <div className="pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-navy-100">
//         <button 
//           onClick={handleLearnMore} // Activated click handler - navigates to /curriculum
//           className="group w-full inline-flex items-center justify-center gap-2 gradient-navy text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base active:scale-95"
//         >
//           <span>Learn More</span>
//           <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform duration-300" />
//         </button>
//       </div>
//     </motion.div>
//   );
// };

// const OurCurriculum = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const navigate = useNavigate(); // Added navigate hook for mobile view

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % curriculumData.length);
//   };

//   const prevSlide = () => {
//     setCurrentSlide(
//       (prev) => (prev - 1 + curriculumData.length) % curriculumData.length
//     );
//   };

//   // Function to handle Learn More click for mobile - navigate to /curriculum
//   const handleMobileLearnMore = (itemId, itemTitle, index) => {
//     const clickedItem = curriculumData.find(item => item.id === itemId);
//     navigate('/curriculum', { 
//       state: { 
//         activeTab: index, // Optional: to highlight which curriculum item was clicked
//         title: itemTitle,
//         data: clickedItem 
//       } 
//     });
//   };

//   // Auto slide for mobile
//   useEffect(() => {
//     if (window.innerWidth < 768) {
//       const interval = setInterval(() => {
//         nextSlide();
//       }, 5000);
//       return () => clearInterval(interval);
//     }
//   }, [currentSlide]);

//   return (
//     <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden bg-gradient-to-b from-white to-navy-50/30" id="curriculum">
//       {/* Background decorative elements */}
//       <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-navy-100/20 to-blue-100/10 rounded-full -translate-x-24 -translate-y-24"></div>
//       <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-tl from-blue-100/10 to-navy-100/20 rounded-full translate-x-24 translate-y-24"></div>

//       {/* Creative Doodles for Pre-Primary Section */}
//       <div className="absolute inset-0 pointer-events-none">
//         {/* Floating doodles */}
//         <div className="absolute top-10 left-5 sm:top-20 sm:left-10 opacity-20 animate-bounce">
//           <Cloud className="w-8 h-8 sm:w-10 sm:h-10 text-navy-400" />
//         </div>
//         <div className="absolute top-20 right-8 sm:top-32 sm:right-16 opacity-20 animate-pulse">
//           <Sun className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-400" />
//         </div>
//         <div className="absolute bottom-20 left-10 sm:bottom-32 sm:left-20 opacity-20 animate-bounce">
//           <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-pink-400" />
//         </div>
//         <div className="absolute bottom-10 right-5 sm:bottom-20 sm:right-10 opacity-20 animate-pulse">
//           <Moon className="w-8 h-8 sm:w-10 sm:h-10 text-blue-300" />
//         </div>
//         <div className="absolute top-1/3 left-1/4 opacity-15">
//           <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-navy-300" />
//         </div>
//         <div className="absolute bottom-1/3 right-1/4 opacity-15">
//           <Star className="w-6 h-6 sm:w-8 sm:h-8 text-navy-300" />
//         </div>
//       </div>

//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         {/* ================= Section Header ================= */}
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
//               Our Comprehensive Curriculum
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
//             A balanced and innovative educational approach designed to nurture 
//             every student's potential and prepare them for future challenges
//           </p>
//         </motion.div>

//         {/* ================= Curriculum Cards ================= */}
//         <div className="relative">
//           {/* Desktop Grid View */}
//           <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
//             {curriculumData.map((item, index) => (
//               <CurriculumCard key={item.id} item={item} index={index} />
//             ))}
//           </div>

//           {/* Mobile Slider View */}
//           <div className="md:hidden">
//             <div className="relative overflow-hidden">
//               {/* Slider Container */}
//               <div
//                 className="flex transition-transform duration-300 ease-in-out"
//                 style={{ transform: `translateX(-${currentSlide * 100}%)` }}
//               >
//                 {curriculumData.map((item, index) => (
//                   <div key={item.id} className="w-full flex-shrink-0 px-2 sm:px-4">
//                     <motion.div
//                       initial={{ opacity: 0, y: 30 }}
//                       whileInView={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.5 }}
//                       viewport={{ once: true }}
//                       className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-navy-100 p-4 sm:p-6"
//                     >
//                       <div className="flex items-start justify-between mb-4">
//                         <div className="relative">
//                           <div className="p-3 bg-gradient-to-br from-navy-600 to-blue-600 rounded-lg text-white shadow-md">
//                             {iconMap[item.icon] || <BookOpen className="h-5 w-5" />}
//                           </div>
//                           <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
//                             <Star className="w-1.5 h-1.5 text-white" />
//                           </div>
//                         </div>
//                         <div className="text-base text-navy-300 font-bold">0{index + 1}</div>
//                       </div>

//                       <h3 className="text-base font-bold text-navy-800 mb-2">
//                         {item.title}
//                       </h3>

//                       <div className="flex items-center gap-1 mb-2">
//                         <div className="h-1 w-6 bg-navy-500 rounded-full"></div>
//                         <div className="h-1 w-3 bg-blue-500 rounded-full"></div>
//                         <div className="h-1 w-2 bg-navy-400 rounded-full"></div>
//                       </div>

//                       <p className="text-gray-700 text-xs sm:text-sm mb-3 leading-relaxed line-clamp-3">
//                         {item.description}
//                       </p>

//                       {item.features && (
//                         <div className="pt-3 border-t border-navy-100 mb-3">
//                           <ul className="space-y-1">
//                             {item.features.slice(0, 2).map((feature, idx) => (
//                               <li key={idx} className="flex items-center gap-2 text-gray-700">
//                                 <div className="w-1.5 h-1.5 rounded-full bg-navy-400"></div>
//                                 <span className="text-xs">{feature}</span>
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       )}

//                       <button 
//                         onClick={() => handleMobileLearnMore(item.id, item.title, index)} // Activated for mobile - navigate to /curriculum
//                         className="group w-full inline-flex items-center justify-center gap-2 gradient-navy text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-xs sm:text-sm active:scale-95"
//                       >
//                         <span>Learn More</span>
//                         <ChevronRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
//                       </button>
//                     </motion.div>
//                   </div>
//                 ))}
//               </div>

//               {/* Slider Navigation */}
//               <div className="flex justify-between items-center mt-6 sm:mt-8">
//                 <button
//                   onClick={prevSlide}
//                   className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full gradient-navy text-white shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
//                   disabled={currentSlide === 0}
//                 >
//                   <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
//                 </button>

//                 {/* Dots Indicator */}
//                 <div className="flex gap-1.5 sm:gap-2">
//                   {curriculumData.map((_, index) => (
//                     <button
//                       key={index}
//                       onClick={() => setCurrentSlide(index)}
//                       className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
//                         index === currentSlide
//                           ? "gradient-navy w-4 sm:w-6"
//                           : "bg-navy-300"
//                       }`}
//                     />
//                   ))}
//                 </div>

//                 <button
//                   onClick={nextSlide}
//                   className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full gradient-navy text-white shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
//                   disabled={currentSlide === curriculumData.length - 1}
//                 >
//                   <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ================= Bottom decorative element ================= */}
//         <motion.div
//           className="flex justify-center mt-10 sm:mt-12 md:mt-16"
//           initial={{ opacity: 0, scale: 0 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.6, delay: 0.5 }}
//           viewport={{ once: true }}
//         >
//           <div className="flex items-center gap-4 text-navy-600">
//             <div className="w-8 h-px sm:w-12 md:w-16 bg-gradient-to-r from-transparent via-navy-400 to-transparent"></div>
//             <div className="flex items-center gap-2">
//               <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
//               <span className="text-xs sm:text-sm font-medium">Fun Learning Activities</span>
//               <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
//             </div>
//             <div className="w-8 h-px sm:w-12 md:w-16 bg-gradient-to-r from-transparent via-navy-400 to-transparent"></div>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// // Icon map for mobile view
// const iconMap = {
//   book: <BookOpen className="h-5 w-5" />,
//   target: <Target className="h-5 w-5" />,
//   users: <Users className="h-5 w-5" />,
//   award: <Award className="h-5 w-5" />,
//   brain: <Brain className="h-5 w-5" />,
//   chart: <BarChart3 className="h-5 w-5" />,
// };

// export default OurCurriculum;