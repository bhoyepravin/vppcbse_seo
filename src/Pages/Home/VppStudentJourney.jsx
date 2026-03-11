import {
  ChevronLeft,
  ChevronRight,
  Users,
  Calendar,
  Award,
  BookOpen,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { vppStudentJourneyData as defaultVppStudentJourneyData } from "../../constant/Home/vppStudentJourneyData";
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import axiosInstance from "../../services/api";

function VppStudentJourney() {
  const [vppData, setVppData] = useState({
    vppStudentJourney: {
      header: {
        title: defaultVppStudentJourneyData.title,
        description: defaultVppStudentJourneyData.description
      },
      items: defaultVppStudentJourneyData.items,
      button: {
        text: defaultVppStudentJourneyData.buttonText,
        link: "/images",
        icon: "ChevronRight"
      },
      settings: {
        showScrollIndicator: true,
        scrollIndicatorText: "Swipe to see more"
      }
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const autoPlayRef = useRef(null);
  const [hasMoreCards, setHasMoreCards] = useState(false);
  
  const navigate = useNavigate();
  const cardsRef = useRef(null);

  useEffect(() => {
    fetchVppStudentJourney();
  }, []);

  const fetchVppStudentJourney = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/vpp-student-journey');
      
      if (response.data.success) {
        const processedData = {
          ...response.data.data,
          vppStudentJourney: {
            ...response.data.data.vppStudentJourney,
            items: response.data.data.vppStudentJourney.items.map(item => ({
              ...item,
              image: item.image?.replace(/\\\//g, '/') || item.image,
              path: item.path || `/${item.id}`
            }))
          }
        };
        setVppData(processedData);
        
        const itemsCount = response.data.data.vppStudentJourney.items.length;
        setHasMoreCards(itemsCount > 4);
        
        setError(null);
      }
    } catch (err) {
      console.error('Error fetching VPP student journey:', err);
      setError('Failed to load student journey');
    } finally {
      setLoading(false);
    }
  };

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay && hasMoreCards && vppData.vppStudentJourney.items.length > 4) {
      autoPlayRef.current = setInterval(() => {
        if (isMobile) {
          // Mobile: one card at a time
          const totalCards = vppData.vppStudentJourney.items.length;
          setCurrentIndex((prev) => (prev + 1) % totalCards);
        } else {
          // Desktop: scroll in groups
          if (cardsRef.current) {
            const cardWidth = cardsRef.current.children[0]?.offsetWidth || 0;
            const gap = 32; // lg:gap-8 = 32px
            const currentScroll = cardsRef.current.scrollLeft;
            const maxScroll = cardsRef.current.scrollWidth - cardsRef.current.clientWidth;
            
            let newScroll = currentScroll + (cardWidth + gap);
            if (newScroll > maxScroll) {
              newScroll = 0;
            }
            
            cardsRef.current.scrollTo({
              left: newScroll,
              behavior: 'smooth'
            });
          }
        }
      }, 4000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isMobile, autoPlay, hasMoreCards, vppData.vppStudentJourney.items.length]);

  // Scroll to current index for mobile
  useEffect(() => {
    if (isMobile && cardsRef.current && hasMoreCards && vppData.vppStudentJourney.items.length > 4) {
      const cardWidth = cardsRef.current.children[0]?.offsetWidth || 0;
      const gap = 12; // gap-3 = 12px
      const scrollPosition = currentIndex * (cardWidth + gap);
      
      cardsRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, [currentIndex, isMobile, hasMoreCards, vppData.vppStudentJourney.items.length]);

  const scrollLeft = () => {
    if (!hasMoreCards) return;
    
    setAutoPlay(false);
    
    if (cardsRef.current) {
      const cardWidth = cardsRef.current.children[0]?.offsetWidth || 0;
      const gap = isMobile ? 12 : 32;
      const currentScroll = cardsRef.current.scrollLeft;
      const newScroll = currentScroll - (cardWidth + gap);
      
      cardsRef.current.scrollTo({
        left: Math.max(0, newScroll),
        behavior: 'smooth'
      });
      
      if (isMobile && hasMoreCards) {
        setCurrentIndex((prev) => Math.max(0, prev - 1));
      }
    }
    
    setTimeout(() => setAutoPlay(true), 5000);
  };

  const scrollRight = () => {
    if (!hasMoreCards) return;
    
    setAutoPlay(false);
    
    if (cardsRef.current) {
      const cardWidth = cardsRef.current.children[0]?.offsetWidth || 0;
      const gap = isMobile ? 12 : 32;
      const currentScroll = cardsRef.current.scrollLeft;
      const maxScroll = cardsRef.current.scrollWidth - cardsRef.current.clientWidth;
      const newScroll = currentScroll + (cardWidth + gap);
      
      cardsRef.current.scrollTo({
        left: Math.min(maxScroll, newScroll),
        behavior: 'smooth'
      });
      
      if (isMobile && hasMoreCards) {
        const totalCards = vppData.vppStudentJourney.items.length;
        setCurrentIndex((prev) => Math.min(totalCards - 1, prev + 1));
      }
    }
    
    setTimeout(() => setAutoPlay(true), 5000);
  };

  const goToSlide = (index) => {
    if (!hasMoreCards) return;
    
    setAutoPlay(false);
    
    if (cardsRef.current) {
      const cardWidth = cardsRef.current.children[0]?.offsetWidth || 0;
      const gap = isMobile ? 12 : 32;
      const scrollPosition = index * (cardWidth + gap);
      
      cardsRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
      
      if (isMobile) {
        setCurrentIndex(index);
      }
    }
    
    setTimeout(() => setAutoPlay(true), 5000);
  };

  const handleViewDetails = (path) => {
    navigate(path || "/primary");
  };

  const icons = [Users, Calendar, Award, BookOpen];

  // Loading state
  if (loading) {
    return (
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 relative overflow-hidden min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/30 to-purple-50/20"></div>
        <div className="text-center relative z-10">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading student journey...</p>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 relative overflow-hidden min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/30 to-purple-50/20"></div>
        <div className="text-center relative z-10">
          <p className="text-red-600 text-xl mb-4">⚠️ {error}</p>
          <button 
            onClick={fetchVppStudentJourney}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  const { header, items, button, settings } = vppData.vppStudentJourney;

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-x-1/4 -translate-y-1/4 sm:-translate-x-32 sm:-translate-y-32 md:-translate-x-40 md:-translate-y-40 lg:-translate-x-48 lg:-translate-y-48"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 bg-gradient-to-tl from-purple-500/10 to-blue-500/10 rounded-full translate-x-1/4 translate-y-1/4 sm:translate-x-32 sm:translate-y-32 md:translate-x-40 md:translate-y-40 lg:translate-x-48 lg:translate-y-48"></div>

      {/* Main gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/30 to-purple-50/20"></div>

      {/* Floating icons */}
      <div className="absolute inset-0 pointer-events-none hidden sm:block">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-md sm:rounded-lg"
            style={{
              left: `${15 + i * 15}%`,
              top: `${30 + i * 10}%`,
              transform: `rotate(${i * 15}deg)`,
            }}
          />
        ))}
      </div>

      {/* Floating stars */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 bg-gradient-to-r from-blue-400/40 to-purple-400/40 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: Math.random() * 0.5 + 0.3,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-14"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-5">
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center border border-blue-100/50">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-500"></div>
            </div>
            <h2 className="font-title text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gradient-navy">
              {header?.title || defaultVppStudentJourneyData.title}
            </h2>
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center border border-purple-100/50">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-500"></div>
            </div>
          </div>

          <motion.div
            className="h-0.5 sm:h-1 w-12 sm:w-16 md:w-20 lg:w-24 gradient-navy mx-auto mb-4 sm:mb-5 md:mb-6 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: "3rem" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          />
          <p className="text-gray-700 max-w-2xl mx-auto text-xs sm:text-sm md:text-base px-2 sm:px-4">
            {header?.description || defaultVppStudentJourneyData.description}
          </p>
        </motion.div>

        {/* Cards Container */}
        <div className="relative">
          {/* Desktop Left Arrow - Only show when more than 4 cards */}
          {hasMoreCards && (
            <motion.button
              onClick={scrollLeft}
              className="hidden lg:flex absolute -left-4 xl:-left-12 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full gradient-navy text-white shadow-lg hover:shadow-2xl items-center justify-center hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-110 z-20 backdrop-blur-sm border border-white/20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
            </motion.button>
          )}

          {/* Mobile Navigation Buttons - Only show when more than 4 cards */}
          {hasMoreCards && isMobile && (
            <div className="flex lg:hidden justify-between absolute top-1/2 -translate-y-1/2 w-full px-2 z-20">
              <motion.button
                onClick={scrollLeft}
                className="w-8 h-8 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg flex items-center justify-center hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft className="w-4 h-4" />
              </motion.button>
              <motion.button
                onClick={scrollRight}
                className="w-8 h-8 rounded-xl gradient-navy text-white shadow-lg flex items-center justify-center hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          )}

          {/* Cards Wrapper */}
          <div
            ref={cardsRef}
            className={`
              flex
              gap-3 sm:gap-4 md:gap-6 lg:gap-8
              overflow-x-auto scroll-smooth
              ${hasMoreCards ? 'snap-x snap-mandatory' : ''}
              pb-4 sm:pb-6 lg:pb-0
              no-scrollbar
              px-2 lg:px-0
              scroll-pl-4 scroll-pr-4
            `}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {items.map((item, index) => {
              const Icon = icons[index % icons.length];
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={!isMobile ? { scale: 1.02, y: -5 } : {}}
                  className={`
                    flex-shrink-0 
                    ${isMobile ? 'w-[85vw]' : 'lg:w-[calc(25%-1.5rem)]'}
                    ${!isMobile && !hasMoreCards ? 'w-full' : ''}
                    bg-gradient-to-br from-white to-white/90 rounded-xl sm:rounded-2xl overflow-hidden
                    ${hasMoreCards ? 'snap-center' : ''}
                    transition-all duration-500 hover:shadow-xl md:hover:shadow-2xl
                    border border-white/50 backdrop-blur-sm
                    group
                    shadow-md
                  `}
                >
                  {/* Image */}
                  <div className="relative w-full aspect-[4/3] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
                    <img
                      src={item.image}
                      alt={item.imageAlt || item.title}
                      className="w-full h-full object-cover group-hover:scale-105 lg:group-hover:scale-110 transition-transform duration-700"
                      loading={index < 2 ? "eager" : "lazy"}
                      onError={(e) => {
                        console.error('Image failed to load:', item.image);
                        e.target.style.backgroundColor = '#e2e8f0';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                    
                    {/* Corner accent */}
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 text-white/80" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-3 sm:p-4 md:p-5 lg:p-6">
                    {/* Icon and Title Row */}
                    <div className="flex items-start gap-3 mb-2 sm:mb-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg gradient-navy flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-800 transition-colors duration-500 group-hover:text-navy-600 flex-1">
                        {item.title}
                      </h3>
                    </div>
                    
                    {/* Description */}
                    <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed">
                      {item.description}
                    </p>

                    {/* Additional details for desktop */}
                    {!isMobile && item.details && item.details.length > 0 && (
                      <div className="mt-3 sm:mt-4">
                        <ul className="space-y-1">
                          {item.details.slice(0, 3).map((detail, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
                              <div className="w-1 h-1 rounded-full bg-navy-500 mt-1.5"></div>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* View details */}
                    <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
                      <button 
                        onClick={() => handleViewDetails(item.path)}
                        className="text-navy-600 hover:text-navy-800 font-medium text-xs sm:text-sm flex items-center gap-1 sm:gap-2 group/link transition-all duration-300 hover:gap-3"
                      >
                        <span>View Details</span>
                        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover/link:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Desktop Right Arrow - Only show when more than 4 cards */}
          {hasMoreCards && (
            <motion.button
              onClick={scrollRight}
              className="hidden lg:flex absolute -right-4 xl:-right-12 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full gradient-navy text-white shadow-lg hover:shadow-2xl items-center justify-center hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:scale-110 z-20 backdrop-blur-sm border border-white/20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
            </motion.button>
          )}
        </div>

        {/* Slider Dots - Mobile only when more than 4 cards */}
        {isMobile && hasMoreCards && items.length > 4 && (
          <div className="flex justify-center gap-2 mt-6">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 w-6"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* CTA Button */}
        <motion.div
          className="flex justify-center mt-8 sm:mt-10 md:mt-12 lg:mt-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <button
            className="group px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-3.5 gradient-navy text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform flex items-center gap-2 text-sm sm:text-base"
            onClick={() => navigate(button?.link || "/images")}
          >
            <span>{button?.text || defaultVppStudentJourneyData.buttonText}</span>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* Mobile scroll indicator - Only when 4 or fewer cards */}
      {isMobile && !hasMoreCards && settings?.showScrollIndicator && (
        <div className="block lg:hidden text-center mt-4">
          <p className="text-gray-500 text-xs sm:text-sm">
            <span>Viewing all {items.length} journeys</span>
          </p>
        </div>
      )}

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

export default VppStudentJourney;


// import {
//   ChevronLeft,
//   ChevronRight,
//   Users,
//   Calendar,
//   Award,
//   BookOpen,
//   ArrowUpRight,
// } from "lucide-react";
// import { motion } from "framer-motion";
// import { vppStudentJourneyData } from "../../constant/Home/vppStudentJourneyData";
// import { useNavigate } from "react-router-dom";
// import { useRef, useState, useEffect } from "react";

// function VppStudentJourney() {
//   const navigate = useNavigate();
//   const cardsRef = useRef(null);
//   const [showViewAll, setShowViewAll] = useState(false);
//   const [isDesktop, setIsDesktop] = useState(false);

//   // Check if cards overflow to show view all button
//   useEffect(() => {
//     const checkOverflow = () => {
//       const el = cardsRef.current;
//       if (!el) return;
//       setShowViewAll(el.scrollWidth > el.clientWidth);
//     };
    
//     checkOverflow();
//     window.addEventListener("resize", checkOverflow);
//     return () => window.removeEventListener("resize", checkOverflow);
//   }, []);

//   // Check for desktop view
//   useEffect(() => {
//     const checkDesktop = () => {
//       setIsDesktop(window.innerWidth >= 1024); // lg breakpoint
//     };
    
//     checkDesktop();
//     window.addEventListener("resize", checkDesktop);
//     return () => window.removeEventListener("resize", checkDesktop);
//   }, []);

//   const scrollLeft = () => {
//     if (cardsRef.current) {
//       const scrollAmount = window.innerWidth < 640 ? -300 : -400;
//       cardsRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
//     }
//   };

//   const scrollRight = () => {
//     if (cardsRef.current) {
//       const scrollAmount = window.innerWidth < 640 ? 300 : 400;
//       cardsRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
//     }
//   };

//   const handleViewDetails = (itemId) => {
//     // Navigate to specific item details page or show modal
//     navigate(`${itemId}`);
//   };

//   const icons = [Users, Calendar, Award, BookOpen];

//   return (
//     <section className="py-8 sm:py-12 md:py-16 lg:py-20 relative overflow-hidden">
//       {/* Background decorative elements - better mobile sizing */}
//       <div className="absolute top-0 left-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-x-1/4 -translate-y-1/4 sm:-translate-x-32 sm:-translate-y-32 md:-translate-x-40 md:-translate-y-40 lg:-translate-x-48 lg:-translate-y-48"></div>
//       <div className="absolute bottom-0 right-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 bg-gradient-to-tl from-purple-500/10 to-blue-500/10 rounded-full translate-x-1/4 translate-y-1/4 sm:translate-x-32 sm:translate-y-32 md:translate-x-40 md:translate-y-40 lg:translate-x-48 lg:translate-y-48"></div>

//       {/* Main gradient background */}
//       <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/30 to-purple-50/20"></div>

//       {/* Floating icons - hide on smallest mobile */}
//       <div className="absolute inset-0 pointer-events-none hidden sm:block">
//         {[...Array(6)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-md sm:rounded-lg"
//             style={{
//               left: `${15 + i * 15}%`,
//               top: `${30 + i * 10}%`,
//               transform: `rotate(${i * 15}deg)`,
//             }}
//           />
//         ))}
//       </div>

//       {/* Floating stars */}
//       <div className="absolute inset-0 pointer-events-none">
//         {[...Array(15)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 bg-gradient-to-r from-blue-400/40 to-purple-400/40 rounded-full animate-pulse"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animationDelay: `${Math.random() * 2}s`,
//               opacity: Math.random() * 0.5 + 0.3,
//             }}
//           />
//         ))}
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         {/* Enhanced Header - better mobile spacing */}
//         <motion.div
//           className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-14"
//           initial={{ opacity: 0, y: -20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//         >
//           <div className="inline-flex items-center gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-5">
//             <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center border border-blue-100/50">
//               <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-500"></div>
//             </div>
//             <h2 className="font-title text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gradient-navy">
//               {vppStudentJourneyData.title}
//             </h2>
//             <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center border border-purple-100/50">
//               <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-500"></div>
//             </div>
//           </div>

//           <motion.div
//             className="h-0.5 sm:h-1 w-12 sm:w-16 md:w-20 lg:w-24 gradient-navy mx-auto mb-4 sm:mb-5 md:mb-6 rounded-full"
//             initial={{ width: 0 }}
//             whileInView={{ width: "3rem" }}
//             transition={{ duration: 0.8, delay: 0.3 }}
//             viewport={{ once: true }}
//           />
//           <p className="text-gray-700 max-w-2xl mx-auto text-xs sm:text-sm md:text-base px-2 sm:px-4">
//             Explore the journey of our students through various activities and
//             achievements.
//           </p>
//         </motion.div>

//         {/* Cards Container */}
//         <div className="relative">
//           {/* Desktop Navigation Arrows */}
//           <motion.button
//             onClick={scrollLeft}
//             className="hidden lg:flex absolute -left-4 xl:-left-12 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full gradient-navy text-white shadow-lg hover:shadow-2xl items-center justify-center hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-110 z-20 backdrop-blur-sm border border-white/20"
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
//           </motion.button>

//           {/* Mobile Navigation Buttons */}
//           <div className="flex lg:hidden justify-center gap-2 mb-4">
//             <motion.button
//               onClick={scrollLeft}
//               className="hidden w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg flex items-center justify-center hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
//               whileTap={{ scale: 0.95 }}
//             >
//               <ChevronLeft className="w-4 h-4" />
//             </motion.button>
//             <motion.button
//               onClick={scrollRight}
//               className="hidden w-10 h-10 rounded-xl gradient-navy text-white shadow-lg flex items-center justify-center hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
//               whileTap={{ scale: 0.95 }}
//             >
//               <ChevronRight className="w-4 h-4" />
//             </motion.button>
//           </div>

//           {/* Cards Wrapper */}
//           <div
//             ref={cardsRef}
//             className="
//               flex lg:grid
//               lg:grid-cols-4
//               gap-3 sm:gap-4 md:gap-6 lg:gap-8
              
//               overflow-x-auto lg:overflow-visible
//               snap-x snap-mandatory
              
//               pb-4 sm:pb-6 lg:pb-0
//               no-scrollbar
              
//               px-2 lg:px-0
//               scroll-pl-4 scroll-pr-4
//             "
//             style={{
//               scrollbarWidth: 'none',
//               msOverflowStyle: 'none'
//             }}
//           >
//             {vppStudentJourneyData.items.map((item, index) => {
//               const Icon = icons[index % icons.length];
//               return (
//                 <motion.div
//                   key={item.id}
//                   initial={{ opacity: 0, y: 40, scale: 0.9 }}
//                   whileInView={{ opacity: 1, y: 0, scale: 1 }}
//                   transition={{ duration: 0.6, delay: index * 0.1 }}
//                   viewport={{ once: true }}
//                   whileHover={{ scale: 1.02, y: -5 }}
//                   className="
//                     flex-shrink-0 w-[85vw] sm:w-[45vw] md:w-[30vw] lg:w-full
//                     bg-gradient-to-br from-white to-white/90 rounded-xl sm:rounded-2xl overflow-hidden
//                     snap-center
//                     transition-all duration-500 hover:shadow-xl md:hover:shadow-2xl
//                     border border-white/50 backdrop-blur-sm
//                     group
//                     shadow-md
//                     mx-1
//                   "
//                 >
//                   {/* Image */}
//                   <div className="relative w-full aspect-[4/3] overflow-hidden">
//                     <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
//                     <img
//                       src={item.image}
//                       alt={item.title}
//                       className="w-full h-full object-cover group-hover:scale-105 lg:group-hover:scale-110 transition-transform duration-700"
//                       loading={index < 2 ? "eager" : "lazy"}
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                    
//                     {/* Corner accent */}
//                     <div className="absolute top-2 right-2 sm:top-3 sm:right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
//                       <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 text-white/80" />
//                     </div>
//                   </div>

//                   {/* Content */}
//                   <div className="p-3 sm:p-4 md:p-5 lg:p-6">
//                     {/* Icon and Title Row */}
//                     <div className="flex items-start gap-3 mb-2 sm:mb-3">
//                       <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg gradient-navy flex items-center justify-center flex-shrink-0">
//                         <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//                       </div>
//                       <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-800 transition-colors duration-500 group-hover:text-navy-600 flex-1">
//                         {item.title}
//                       </h3>
//                     </div>
                    
//                     {/* Full description on desktop, truncated on mobile */}
//                     <p className={`text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed ${
//                       isDesktop ? '' : 'line-clamp-2'
//                     }`}>
//                       {item.description}
//                     </p>

//                     {/* Additional details for desktop */}
//                     {isDesktop && item.details && (
//                       <div className="mt-3 sm:mt-4">
//                         <ul className="space-y-1">
//                           {item.details.slice(0, 3).map((detail, idx) => (
//                             <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
//                               <div className="w-1 h-1 rounded-full bg-navy-500 mt-1.5"></div>
//                               <span>{detail}</span>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     )}

//                     {/* View details - Now active on desktop */}
//                     <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
//                       <button 
//                         onClick={() => handleViewDetails(item.path)}
//                         className="text-navy-600 hover:text-navy-800 font-medium text-xs sm:text-sm flex items-center gap-1 sm:gap-2 group/link transition-all duration-300 hover:gap-3"
//                       >
//                         <span>View Details</span>
//                         <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover/link:translate-x-1 transition-transform" />
//                       </button>
//                     </div>
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </div>

//           {/* Desktop Right Arrow */}
//           <motion.button
//             onClick={scrollRight}
//             className="hidden lg:flex absolute -right-4 xl:-right-12 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full gradient-navy text-white shadow-lg hover:shadow-2xl items-center justify-center hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:scale-110 z-20 backdrop-blur-sm border border-white/20"
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
//           </motion.button>
//         </div>

//         {/* CTA Button - responsive styling */}
//         <motion.div
//           className="flex justify-center mt-8 sm:mt-10 md:mt-12 lg:mt-14"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.3 }}
//           viewport={{ once: true }}
//         >
//           <button
//             className="group px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-3.5 gradient-navy text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform flex items-center gap-2 text-sm sm:text-base"
//             onClick={() => navigate("/images")}
//           >
//             <span>{vppStudentJourneyData.buttonText}</span>
//             <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
//           </button>
//         </motion.div>
//       </div>

//       {/* Mobile scroll indicator */}
//       <div className="block lg:hidden text-center mt-4">
//         <p className="text-gray-500 text-xs sm:text-sm flex items-center justify-center gap-1">
//           <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
//           <span>Swipe to see more</span>
//           <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
//         </p>
//       </div>

//       <style jsx>{`
//         .no-scrollbar::-webkit-scrollbar {
//           display: none;
//         }
//       `}</style>
//     </section>
//   );
// }

// export default VppStudentJourney;