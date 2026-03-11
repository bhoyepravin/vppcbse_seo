import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { achievementsData as defaultAchievementsData } from "../../constant/Home/achievementsData";
import { awardsdoodle1, awardsdoodle3 } from "../../assets";
import axiosInstance from "../../services/api";

function OurAchievements() {
  const [achievementsData, setAchievementsData] = useState({
    title: defaultAchievementsData.title,
    subtitle: defaultAchievementsData.subtitle,
    items: defaultAchievementsData.items
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cardsRef = useRef(null);
  const [showArrows, setShowArrows] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const autoPlayRef = useRef(null);
  const [hasMoreCards, setHasMoreCards] = useState(false);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/achievements');
      
      if (response.data.success) {
        const apiData = response.data.data;
        
        const processedData = {
          title: apiData.title || defaultAchievementsData.title,
          subtitle: apiData.subtitle || defaultAchievementsData.subtitle,
          items: apiData.items?.map(item => ({
            ...item,
            image: item.image?.replace(/\\\//g, '/') || item.image
          })) || defaultAchievementsData.items
        };
        
        setAchievementsData(processedData);
        
        const itemsCount = apiData.items?.length || 0;
        setHasMoreCards(itemsCount > 4);
        setShowArrows(itemsCount > 4);
        
        setError(null);
      }
    } catch (err) {
      console.error('Error fetching achievements:', err);
      setError('Failed to load achievements');
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

  // Auto-play functionality for slider (only when there are more than 4 cards total)
  useEffect(() => {
    if (autoPlay && hasMoreCards && achievementsData.items.length > 4) {
      autoPlayRef.current = setInterval(() => {
        if (isMobile) {
          // For mobile: show one card at a time
          const totalCards = achievementsData.items.length;
          setCurrentIndex((prev) => (prev + 1) % totalCards);
        } else {
          // For desktop, scroll the container
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
      }, 3000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isMobile, autoPlay, hasMoreCards, achievementsData.items.length]);

  // Scroll to current index for mobile slider (showing one card at a time)
  useEffect(() => {
    if (isMobile && cardsRef.current && hasMoreCards && achievementsData.items.length > 4) {
      const cardWidth = cardsRef.current.children[0]?.offsetWidth || 0;
      const gap = 16; // gap-4 = 16px
      const scrollPosition = currentIndex * (cardWidth + gap);
      
      cardsRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, [currentIndex, isMobile, hasMoreCards, achievementsData.items.length]);

  const scrollLeft = () => {
    if (!hasMoreCards) return;
    
    setAutoPlay(false);
    
    if (cardsRef.current) {
      const cardWidth = cardsRef.current.children[0]?.offsetWidth || 0;
      const gap = isMobile ? 16 : 32;
      const currentScroll = cardsRef.current.scrollLeft;
      const newScroll = currentScroll - (cardWidth + gap);
      
      cardsRef.current.scrollTo({
        left: Math.max(0, newScroll),
        behavior: 'smooth'
      });
      
      // Update current index for mobile (one card at a time)
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
      const gap = isMobile ? 16 : 32;
      const currentScroll = cardsRef.current.scrollLeft;
      const maxScroll = cardsRef.current.scrollWidth - cardsRef.current.clientWidth;
      const newScroll = currentScroll + (cardWidth + gap);
      
      cardsRef.current.scrollTo({
        left: Math.min(maxScroll, newScroll),
        behavior: 'smooth'
      });
      
      // Update current index for mobile (one card at a time)
      if (isMobile && hasMoreCards) {
        const totalCards = achievementsData.items.length;
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
      const gap = isMobile ? 16 : 32;
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

  // Loading state
  if (loading) {
    return (
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-navy-200 border-t-navy-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-navy-600 text-lg">Loading achievements...</p>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-xl mb-4">⚠️ {error}</p>
          <button 
            onClick={fetchAchievements}
            className="px-6 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-navy-300 to-navy-500/10 rounded-full -translate-x-24 -translate-y-24 sm:-translate-x-32 sm:-translate-y-32 md:-translate-x-40 md:-translate-y-40 lg:-translate-x-48 lg:-translate-y-48"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-to-tl from-pink-500/10 to-purple-500/10 rounded-full translate-x-24 translate-y-24 sm:translate-x-32 sm:translate-y-32 md:translate-x-40 md:translate-y-40 lg:translate-x-48 lg:translate-y-48"></div>

      {/* Trophy icons floating */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <Trophy
            key={i}
            className="absolute w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-purple-400/10"
            style={{
              left: `${20 + i * 25}%`,
              top: `${15 + i * 20}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-10 sm:mb-12 md:mb-14 lg:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Heading Row with Doodles */}
          <div className="relative flex justify-center items-center mb-4 sm:mb-5 md:mb-6">
            <img
              src={awardsdoodle1}
              alt="Left Doodle"
              className="hidden sm:block absolute left-6 -translate-x-full w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 opacity-80"
            />

            <div className="inline-flex items-center gap-2 sm:gap-3 md:gap-4 px-8">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-500"></div>
              </div>

              <h2 className="font-title text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gradient-navy">
                {achievementsData.title}
              </h2>

              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-500"></div>
              </div>
            </div>

            <img
              src={awardsdoodle3}
              alt="Right Doodle"
              className="hidden sm:block absolute right-6 translate-x-full w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 opacity-80"
            />
          </div>

          {/* Divider */}
          <motion.div
            className="h-1 sm:h-1.5 w-16 sm:w-20 md:w-24 gradient-navy mx-auto mb-6 sm:mb-7 md:mb-8 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: "4rem" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          />

          {/* Subtitle */}
          <p className="text-gray-700 max-w-2xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl px-2 sm:px-4">
            {achievementsData.subtitle}
          </p>
        </motion.div>

        {/* Cards Container */}
        <div className="relative">
          {/* Left Arrow - Only show on desktop when there are more than 4 cards */}
          {showArrows && (
            <motion.button
              onClick={scrollLeft}
              className="absolute -left-4 xl:-left-16 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full gradient-navy text-white shadow-xl md:shadow-2xl items-center justify-center hover:from-[#194369] hover:to-[#194369] transition-all duration-300 hover:scale-110 z-20 backdrop-blur-sm border border-white/20 hidden lg:flex"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
            </motion.button>
          )}

          {/* Cards Wrapper */}
          <div
            ref={cardsRef}
            className={`
              flex
              gap-4 sm:gap-5 md:gap-6 lg:gap-8
              overflow-x-auto scroll-smooth
              snap-x snap-mandatory
              pb-6 sm:pb-8 lg:pb-0
              no-scrollbar
              scroll-pl-4
              px-1 sm:px-2
            `}
          >
            {achievementsData.items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={!isMobile ? { scale: 1.02, y: -5 } : {}}
                className={`
                  flex-shrink-0 
                  ${isMobile ? 'w-[85%]' : 'lg:w-[calc(25%-1.5rem)]'}
                  ${!isMobile && !hasMoreCards ? 'w-full' : ''}
                  bg-gradient-to-br from-white to-white/90 rounded-2xl sm:rounded-3xl overflow-hidden
                  snap-center
                  transition-all duration-500 hover:shadow-xl md:hover:shadow-2xl lg:hover:shadow-3xl
                  border border-white/50 backdrop-blur-sm
                  group
                `}
              >
                {/* Image with overlay */}
                <div className="relative w-full h-48 sm:h-56 md:h-60 lg:h-64 bg-gradient-to-br from-purple-500/20 to-pink-500/20 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title || "Achievement"}
                    className="w-full h-full object-cover 
                       transition-transform duration-700
                       active:scale-105
                       lg:group-hover:scale-110"
                    onError={(e) => {
                      e.target.style.backgroundColor = '#e2e8f0';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 md:p-6 lg:p-8">
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                      <Trophy className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-yellow-500" />
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Arrow - Only show on desktop when there are more than 4 cards */}
          {showArrows && (
            <motion.button
              onClick={scrollRight}
              className="absolute -right-4 xl:-right-16 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-r gradient-navy text-white shadow-xl md:shadow-2xl items-center justify-center hover:from-[#194369] hover:to-[#194369] transition-all duration-300 hover:scale-110 z-20 backdrop-blur-sm border border-white/20 hidden lg:flex"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
            </motion.button>
          )}
        </div>

        {/* Slider Dots Indicator - Only for mobile when more than 4 cards total */}
        {isMobile && hasMoreCards && achievementsData.items.length > 4 && (
          <div className="flex justify-center gap-2 mt-6">
            {achievementsData.items.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-gradient-to-r from-navy-600 to-blue-600 w-6"
                    : "bg-navy-300 hover:bg-navy-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Mobile scroll indicator - Only when 4 or fewer cards total */}
        {isMobile && !hasMoreCards && (
          <div className="block lg:hidden text-center mt-6">
            <p className="text-gray-500 text-xs sm:text-sm">
              <span>Viewing all {achievementsData.items.length} achievements</span>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default OurAchievements;

// ------------------------------

// import { useEffect, useRef, useState } from "react";
// import { ChevronLeft, ChevronRight, Trophy, Star } from "lucide-react";
// import { motion } from "framer-motion";
// import { achievementsData } from "../../constant/Home/achievementsData";
// import { awardsdoodle1, awardsdoodle3 } from "../../assets";

// function OurAchievements() {
//   const cardsRef = useRef(null);
//   const [showViewAll, setShowViewAll] = useState(false);

//   useEffect(() => {
//     const checkOverflow = () => {
//       const el = cardsRef.current;
//       if (!el) return;
//       setShowViewAll(el.scrollWidth > el.clientWidth);
//     };
//     checkOverflow();
//     window.addEventListener("resize", checkOverflow);
//     return () => window.removeEventListener("resize", checkOverflow);
//   }, [achievementsData.items.length]);

//   const scrollLeft = () => {
//     if (cardsRef.current) {
//       const scrollAmount = window.innerWidth < 640 ? 300 : 400;
//       cardsRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
//     }
//   };

//   const scrollRight = () => {
//     if (cardsRef.current) {
//       const scrollAmount = window.innerWidth < 640 ? 300 : 400;
//       cardsRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
//     }
//   };

//   return (
//     <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden">
//       {/* Background decorative elements - responsive sizes */}
//       <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-navy-300 to-navy-500/10 rounded-full -translate-x-24 -translate-y-24 sm:-translate-x-32 sm:-translate-y-32 md:-translate-x-40 md:-translate-y-40 lg:-translate-x-48 lg:-translate-y-48"></div>
//       <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-to-tl from-pink-500/10 to-purple-500/10 rounded-full translate-x-24 translate-y-24 sm:translate-x-32 sm:translate-y-32 md:translate-x-40 md:translate-y-40 lg:translate-x-48 lg:translate-y-48"></div>

//       {/* Trophy icons floating - responsive sizes */}
//       <div className="absolute inset-0">
//         {[...Array(3)].map((_, i) => (
//           <Trophy
//             key={i}
//             className="absolute w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-purple-400/10"
//             style={{
//               left: `${20 + i * 25}%`,
//               top: `${15 + i * 20}%`,
//             }}
//           />
//         ))}
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         {/* Enhanced Header - responsive typography */}
//         <motion.div
//           className="text-center mb-10 sm:mb-12 md:mb-14 lg:mb-16"
//           initial={{ opacity: 0, y: -20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//         >
//           {/* Heading Row with Doodles */}
//           <div className="relative flex justify-center items-center mb-4 sm:mb-5 md:mb-6">
//             {/* Left Doodle */}
//             <img
//               src={awardsdoodle1}
//               alt="Left Doodle"
//               className="
//         hidden sm:block
//         absolute left-6 -translate-x-full
//         w-12 h-12
//         sm:w-16 sm:h-16
//         md:w-24 md:h-24
//         lg:w-28 lg:h-28
//         xl:w-32 xl:h-32
//         opacity-80
//       "
//             />

//             {/* Original Heading Content (UNCHANGED) */}
//             <div className="inline-flex items-center gap-2 sm:gap-3 md:gap-4 px-8">
//               <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center">
//                 <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-500"></div>
//               </div>

//               <h2 className="font-title text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gradient-navy">
//                 {achievementsData.title}
//               </h2>

//               <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center">
//                 <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-500"></div>
//               </div>
//             </div>

//             {/* Right Doodle */}
//             <img
//               src={awardsdoodle3}
//               alt="Right Doodle"
//               className="
//         hidden sm:block
//         absolute right-6 translate-x-full
//         w-12 h-12
//         sm:w-16 sm:h-16
//         md:w-24 md:h-24
//         lg:w-28 lg:h-28
//         xl:w-32 xl:h-32
//         opacity-80
//       "
//             />
//           </div>

//           {/* Divider (UNCHANGED) */}
//           <motion.div
//             className="h-1 sm:h-1.5 w-16 sm:w-20 md:w-24 gradient-navy mx-auto mb-6 sm:mb-7 md:mb-8 rounded-full"
//             initial={{ width: 0 }}
//             whileInView={{ width: "4rem" }}
//             transition={{ duration: 0.8, delay: 0.3 }}
//             viewport={{ once: true }}
//           />

//           {/* Subtitle (UNCHANGED) */}
//           <p className="text-gray-700 max-w-2xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl px-2 sm:px-4">
//             {achievementsData.subtitle}
//           </p>
//         </motion.div>

//         {/* Cards Container */}
//         <div className="relative">
//           {/* Desktop Left Arrow */}
//           <motion.button
//             onClick={scrollLeft}
//             className="hidden lg:flex absolute -left-4 xl:-left-16 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full gradient-navy text-white shadow-xl md:shadow-2xl items-center justify-center hover:from-[#194369] hover:to-[#194369] transition-all duration-300 hover:scale-110 z-20 backdrop-blur-sm border border-white/20"
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
//           </motion.button>

//           {/* Cards Wrapper */}
//           <div
//             ref={cardsRef}
//             className="
//               flex lg:grid
//               lg:grid-cols-4
//               gap-4 sm:gap-5 md:gap-6 lg:gap-8
//               overflow-x-auto lg:overflow-visible
//               snap-x snap-mandatory
//               pb-6 sm:pb-8 lg:pb-0
//               no-scrollbar
//               scroll-pl-4
//               px-1 sm:px-2
//             "
//           >
//             {achievementsData.items.map((item, index) => (
//               <motion.div
//                 key={item.id}
//                 initial={{ opacity: 0, y: 40, scale: 0.9 }}
//                 whileInView={{ opacity: 1, y: 0, scale: 1 }}
//                 transition={{ duration: 0.6, delay: index * 0.1 }}
//                 viewport={{ once: true }}
//                 whileHover={{ scale: 1.02, y: -5 }}
//                 className="
//                   flex-shrink-0 w-[85%] xs:w-[75%] sm:w-[45%] md:w-[48%] lg:w-auto
//                   bg-gradient-to-br from-white to-white/90 rounded-2xl sm:rounded-3xl overflow-hidden
//                   snap-center
//                   transition-all duration-500 hover:shadow-xl md:hover:shadow-2xl lg:hover:shadow-3xl
//                   border border-white/50 backdrop-blur-sm
//                   group
//                 "
//               >
//                 {/* Image with overlay - responsive height */}
//                 <div className="relative w-full h-48 sm:h-56 md:h-60 lg:h-64 bg-gradient-to-br from-purple-500/20 to-pink-500/20 overflow-hidden">
//                   <img
//                     src={item.image}
//                     alt="Achievement"
//                     className="w-full h-full object-cover 
//        transition-transform duration-700
//        active:scale-105
//        lg:group-hover:scale-110"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
//                 </div>

//                 {/* Content - responsive padding */}
//                 <div className="p-4 sm:p-5 md:p-6 lg:p-8">
//                   <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
//                     <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
//                       <Trophy className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-yellow-500" />
//                     </div>
//                     <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800">
//                       {item.title}
//                     </h3>
//                   </div>
//                   <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed">
//                     {item.description}
//                   </p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           {/* Desktop Right Arrow */}
//           <motion.button
//             onClick={scrollRight}
//             className="hidden lg:flex absolute -right-4 xl:-right-16 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-r gradient-navy text-white shadow-xl md:shadow-2xl items-center justify-center hover:from-[#194369] hover:to-[#194369] transition-all duration-300 hover:scale-110 z-20 backdrop-blur-sm border border-white/20"
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
//           </motion.button>
//         </div>

//         {/* CTA Button - responsive */}
//         {showViewAll && (
//           <motion.div
//             className="flex justify-center mt-10 sm:mt-12 md:mt-14 lg:mt-16"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.3 }}
//             viewport={{ once: true }}
//           >
//             <button className="group px-6 py-3 sm:px-8 sm:py-3.5 md:px-10 md:py-4 bg-gradient-to-r from-[#0A2343] to-[#0A2343] text-white rounded-lg sm:rounded-xl font-semibold hover:from-[#0A2343] hover:to-#0A2343 transition-all duration-300 shadow-lg sm:shadow-xl md:shadow-2xl hover:shadow-xl md:hover:shadow-3xl hover:-translate-y-1 transform flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
//               <span>View All Achievements</span>
//               <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-transform" />
//             </button>
//           </motion.div>
//         )}
//       </div>

//       {/* Mobile scroll indicator */}
//       <div className="block lg:hidden text-center mt-6">
//         <p className="text-gray-500 text-xs sm:text-sm flex items-center justify-center gap-1">
//           <ChevronLeft className="w-4 h-4" />
//           <span>Swipe to see more</span>
//           <ChevronRight className="w-4 h-4" />
//         </p>
//       </div>
//     </section>
//   );
// }

// export default OurAchievements;
