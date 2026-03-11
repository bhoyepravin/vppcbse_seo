import React, { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { motion } from "framer-motion";
import { studentJourney as defaultStudentJourney } from "../../constant/Home/studentJourney";
import { capandbook, testtube5 } from "../../assets";
import axiosInstance from "../../services/api"; // Update this import path based on your project structure

const StudentJourney = () => {
  const [journeyData, setJourneyData] = useState({
    studentJourney: {
      header: {
        title: "Key Highlights of Our School",
        description: "Discover the exceptional features and facilities that make Vidya Prabodhini Prashala a premier educational institution.",
        decorations: {
          leftImage: { src: capandbook, alt: "Left decorative doodle showing graduation cap and book" },
          rightImage: { src: testtube5, alt: "Right decorative doodle showing science test tube" },
          stars: {
            left: { icon: "Star", alt: "Decorative star" },
            right: { icon: "Star", alt: "Decorative star" }
          }
        }
      },
      content: {
        title: "A Glimpse into a VPP Student's Journey",
        buttonText: "EXPLORE THE VPP JOURNEY",
        items: defaultStudentJourney.items
      }
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sliderRef = useRef(null);
  const [showButtons, setShowButtons] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    fetchStudentJourney();
  }, []);

  const fetchStudentJourney = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/student-journey');
      
      if (response.data.success) {
        // Merge API data with default images for decorations
        const apiData = response.data.data;
        
        // Use API images if available, otherwise use default assets
        if (apiData.studentJourney.header.decorations.leftImage?.src) {
          apiData.studentJourney.header.decorations.leftImage.src = 
            apiData.studentJourney.header.decorations.leftImage.src.replace(/\\\//g, '/');
        } else {
          apiData.studentJourney.header.decorations.leftImage = {
            src: capandbook,
            alt: "Left decorative doodle showing graduation cap and book"
          };
        }

        if (apiData.studentJourney.header.decorations.rightImage?.src) {
          apiData.studentJourney.header.decorations.rightImage.src = 
            apiData.studentJourney.header.decorations.rightImage.src.replace(/\\\//g, '/');
        } else {
          apiData.studentJourney.header.decorations.rightImage = {
            src: testtube5,
            alt: "Right decorative doodle showing science test tube"
          };
        }

        // Process item images to fix escaped slashes
        if (apiData.studentJourney.content.items) {
          apiData.studentJourney.content.items = apiData.studentJourney.content.items.map(item => ({
            ...item,
            image: {
              ...item.image,
              src: item.image?.src?.replace(/\\\//g, '/') || item.image?.src
            }
          }));
        }

        setJourneyData(apiData);
        setError(null);
      }
    } catch (err) {
      console.error('Error fetching student journey:', err);
      setError('Failed to load student journey');
    } finally {
      setLoading(false);
    }
  };

  // Check if content overflows and update button visibility
  useEffect(() => {
    const checkOverflow = () => {
      if (sliderRef.current) {
        const container = sliderRef.current;
        const canScroll = container.scrollWidth > container.clientWidth + 5; // Added buffer
        setIsScrollable(canScroll);
        
        // Show buttons on lg and larger screens when scrollable
        if (window.innerWidth >= 1024) {
          setShowButtons(canScroll);
        } else {
          setShowButtons(false);
        }
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [journeyData]); // Re-run when data changes

  // Handle scroll events to update current slide
  useEffect(() => {
    const handleScroll = () => {
      if (sliderRef.current) {
        const container = sliderRef.current;
        const scrollLeft = container.scrollLeft;
        const cardWidth = getCardWidth();
        const slide = Math.round(scrollLeft / (cardWidth + getGap()));
        setCurrentSlide(slide);
      }
    };

    if (sliderRef.current) {
      sliderRef.current.addEventListener("scroll", handleScroll);
      return () => {
        if (sliderRef.current) {
          sliderRef.current.removeEventListener("scroll", handleScroll);
        }
      };
    }
  }, [journeyData]);

  const getCardWidth = () => {
    if (window.innerWidth >= 1024) return 384; // w-96
    if (window.innerWidth >= 768) return 320; // w-80
    if (window.innerWidth >= 640) return 288; // w-72
    return 280; // w-[280px]
  };

  const getGap = () => {
    if (window.innerWidth >= 1024) return 32; // gap-8
    if (window.innerWidth >= 768) return 24; // gap-6
    return 16; // gap-4
  };

  const scroll = (direction) => {
    if (sliderRef.current) {
      const container = sliderRef.current;
      const scrollAmount = getCardWidth() + getGap();
      const maxScroll = container.scrollWidth - container.clientWidth;
      
      if (direction === "left") {
        const newScroll = Math.max(container.scrollLeft - scrollAmount, 0);
        container.scrollTo({ left: newScroll, behavior: "smooth" });
      } else {
        const newScroll = Math.min(container.scrollLeft + scrollAmount, maxScroll);
        container.scrollTo({ left: newScroll, behavior: "smooth" });
      }
    }
  };

  const goToSlide = (index) => {
    if (sliderRef.current) {
      const container = sliderRef.current;
      const scrollTo = index * (getCardWidth() + getGap());
      container.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  // Loading state
  if (loading) {
    return (
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden bg-gradient-to-b from-white to-navy-50/50 min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-navy-200 border-t-navy-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-navy-600 text-lg">Loading student journey...</p>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden bg-gradient-to-b from-white to-navy-50/50 min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-xl mb-4">⚠️ {error}</p>
          <button 
            onClick={fetchStudentJourney}
            className="px-6 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  const { header, content } = journeyData.studentJourney;
  const items = content.items || [];

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden bg-gradient-to-b from-white to-navy-50/50">
      {/* Background decorative elements - responsive sizes */}
      <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-gradient-to-br from-navy-100/30 via-blue-100/20 to-transparent rounded-full -translate-x-24 -translate-y-24 sm:-translate-x-32 sm:-translate-y-32 md:-translate-x-48 md:-translate-y-48"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-gradient-to-tl from-blue-100/20 via-navy-100/30 to-transparent rounded-full translate-x-24 translate-y-24 sm:translate-x-32 sm:translate-y-32 md:translate-x-48 md:translate-y-48"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header - responsive typography */}
        <motion.div
          className="text-center mb-10 sm:mb-12 md:mb-14 lg:mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Heading Row */}
          <div className="relative flex justify-center items-center mb-3 sm:mb-4">

            {/* Left Doodle */}
            <img
              src={header.decorations?.leftImage?.src || capandbook}
              alt={header.decorations?.leftImage?.alt || "Left Doodle"}
              className="sm:block absolute left-6 -translate-x-full 
                         w-12 sm:w-16 md:w-20 lg:w-24 xl:w-28 
                         opacity-80"
              onError={(e) => {
                e.target.src = capandbook; // Fallback to default if API image fails
              }}
            />

            {/* Center Content */}
            <div className="inline-flex items-center gap-2 sm:gap-3 px-6">
              <Star className="w-5 h-5 sm:w-6 sm:h-6 text-navy-600 fill-navy-600" />
              <h2 className="font-title text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gradient-navy">
                {header.title || "Key Highlights of Our School"}
              </h2>
              <Star className="w-5 h-5 sm:w-6 sm:h-6 text-navy-600 fill-navy-600" />
            </div>

            {/* Right Doodle */}
            <img
              src={header.decorations?.rightImage?.src || testtube5}
              alt={header.decorations?.rightImage?.alt || "Right Doodle"}
              className="sm:block absolute right-6 translate-x-full 
                         w-12 sm:w-16 md:w-20 lg:w-24 xl:w-28 
                         opacity-80"
              onError={(e) => {
                e.target.src = testtube5; // Fallback to default if API image fails
              }}
            />
          </div>

          {/* Divider */}
          <motion.div
            className="h-1 w-16 sm:w-20 md:w-24 gradient-navy mx-auto mb-4 sm:mb-6 md:mb-8 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "4rem" }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />

          {/* Description */}
          <p className="text-navy-700 max-w-2xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl px-2 sm:px-4 md:px-0">
            {header.description || "Discover the exceptional features and facilities that make Vidya Prabodhini Prashala a premier educational institution."}
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Left Navigation Button - Show only on lg+ when scrollable */}
          {showButtons && isScrollable && (
            <motion.button
              onClick={() => scroll("left")}
              className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 p-2.5 md:p-3 gradient-navy text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 border border-white/20"
              aria-label="Previous highlights"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </motion.button>
          )}

          {/* Carousel Container */}
          <div className="relative overflow-hidden px-1 sm:px-0">
            <div
              ref={sliderRef}
              className="flex py-6 sm:py-8 md:py-10 overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar gap-4 sm:gap-5 md:gap-6 lg:gap-8"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {items.map((item, index) => (
                <motion.div
                  key={item.id || index}
                  className=" flex-none w-[280px] xs:w-[300px] sm:w-[320px] md:w-[352px] lg:w-96 bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-sm sm:shadow-md lg:shadow-lg overflow-hidden hover:shadow-lg lg:hover:shadow-xl transition-all duration-500 snap-start group hover:-translate-y-1 lg:hover:-translate-y-2 backdrop-blur-sm border border-navy-100/50"
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{
                    scale: window.innerWidth >= 1024 ? 1.02 : 1.01,
                  }}
                >
                  <div className="relative h-40 xs:h-44 sm:h-48 md:h-52 lg:h-64 bg-gradient-to-br from-navy-50 to-blue-50 overflow-hidden">
                    <img
                      src={item.image?.src || item.image}
                      alt={item.image?.alt || item.title || "Student journey"}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                      onError={(e) => {
                        console.error('Image failed to load:', item.image?.src);
                        e.target.style.backgroundColor = '#e2e8f0';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/20 to-transparent"></div>
                  </div>
                  
                  <div className="p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8">
                    <div className="mb-3 md:mb-4">
                      <h3 className="font-title text-base sm:text-lg md:text-xl lg:text-xl font-bold text-navy-800 group-hover:text-navy-700 transition-colors duration-300">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-navy-600 text-xs sm:text-sm md:text-base leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Navigation Button - Show only on lg+ when scrollable */}
          {showButtons && isScrollable && (
            <motion.button
              onClick={() => scroll("right")}
              className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20 p-2.5 md:p-3 gradient-navy text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 border border-white/20"
              aria-label="Next highlights"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </motion.button>
          )}
        </div>

        {/* Navigation Dots - Show on mobile/tablet or when buttons are hidden */}
        {(!showButtons || window.innerWidth < 1024) && isScrollable && (
          <div className="flex justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8">
            {Array.from({
              length: Math.ceil(
                items.length /
                (window.innerWidth >= 1024 ? 3 : 
                 window.innerWidth >= 768 ? 2 : 1)
              )
            }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-navy-600 w-6"
                    : "bg-navy-300 hover:bg-navy-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Scroll hint for mobile */}
        {!showButtons && isScrollable && (
          <motion.div
            className="text-center mt-4 sm:mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-navy-500 text-xs sm:text-sm inline-flex items-center gap-1">
              <span className="hidden sm:inline">Swipe</span>
              <span className="sm:hidden">Scroll</span>
              <ChevronLeft className="w-4 h-4 rotate-180" />
              to explore more
              <ChevronRight className="w-4 h-4" />
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default StudentJourney;

// import React, { useRef, useEffect, useState } from "react";
// import { ChevronLeft, ChevronRight, Star } from "lucide-react";
// import { motion } from "framer-motion";
// import { studentJourney } from "../../constant/Home/studentJourney";
// import { book1, book2, capandbook, rocket2, testtube1, testtube2, testtube4, testtube5 } from "../../assets";

// const StudentJourney = () => {
//   const sliderRef = useRef(null);
//   const [showButtons, setShowButtons] = useState(false);
//   const [isScrollable, setIsScrollable] = useState(false);
//   const [currentSlide, setCurrentSlide] = useState(0);

//   // Check if content overflows and update button visibility
//   useEffect(() => {
//     const checkOverflow = () => {
//       if (sliderRef.current) {
//         const container = sliderRef.current;
//         const canScroll = container.scrollWidth > container.clientWidth + 5; // Added buffer
//         setIsScrollable(canScroll);
        
//         // Show buttons on lg and larger screens when scrollable
//         if (window.innerWidth >= 1024) {
//           setShowButtons(canScroll);
//         } else {
//           setShowButtons(false);
//         }
//       }
//     };

//     checkOverflow();
//     window.addEventListener("resize", checkOverflow);
//     return () => window.removeEventListener("resize", checkOverflow);
//   }, []);

//   // Handle scroll events to update current slide
//   useEffect(() => {
//     const handleScroll = () => {
//       if (sliderRef.current) {
//         const container = sliderRef.current;
//         const scrollLeft = container.scrollLeft;
//         const cardWidth = getCardWidth();
//         const slide = Math.round(scrollLeft / (cardWidth + getGap()));
//         setCurrentSlide(slide);
//       }
//     };

//     if (sliderRef.current) {
//       sliderRef.current.addEventListener("scroll", handleScroll);
//       return () => {
//         if (sliderRef.current) {
//           sliderRef.current.removeEventListener("scroll", handleScroll);
//         }
//       };
//     }
//   }, []);

//   const getCardWidth = () => {
//     if (window.innerWidth >= 1024) return 384; // w-96
//     if (window.innerWidth >= 768) return 320; // w-80
//     if (window.innerWidth >= 640) return 288; // w-72
//     return 280; // w-[280px]
//   };

//   const getGap = () => {
//     if (window.innerWidth >= 1024) return 32; // gap-8
//     if (window.innerWidth >= 768) return 24; // gap-6
//     return 16; // gap-4
//   };

//   const scroll = (direction) => {
//     if (sliderRef.current) {
//       const container = sliderRef.current;
//       const scrollAmount = getCardWidth() + getGap();
//       const maxScroll = container.scrollWidth - container.clientWidth;
      
//       if (direction === "left") {
//         const newScroll = Math.max(container.scrollLeft - scrollAmount, 0);
//         container.scrollTo({ left: newScroll, behavior: "smooth" });
//       } else {
//         const newScroll = Math.min(container.scrollLeft + scrollAmount, maxScroll);
//         container.scrollTo({ left: newScroll, behavior: "smooth" });
//       }
//     }
//   };

//   const goToSlide = (index) => {
//     if (sliderRef.current) {
//       const container = sliderRef.current;
//       const scrollTo = index * (getCardWidth() + getGap());
//       container.scrollTo({ left: scrollTo, behavior: "smooth" });
//     }
//   };

//   return (
//     <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden bg-gradient-to-b from-white to-navy-50/50">
//       {/* Background decorative elements - responsive sizes */}
//       <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-gradient-to-br from-navy-100/30 via-blue-100/20 to-transparent rounded-full -translate-x-24 -translate-y-24 sm:-translate-x-32 sm:-translate-y-32 md:-translate-x-48 md:-translate-y-48"></div>
//       <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-gradient-to-tl from-blue-100/20 via-navy-100/30 to-transparent rounded-full translate-x-24 translate-y-24 sm:translate-x-32 sm:translate-y-32 md:translate-x-48 md:translate-y-48"></div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         {/* Header - responsive typography */}

//         <motion.div
//   className="text-center mb-10 sm:mb-12 md:mb-14 lg:mb-16"
//   initial={{ opacity: 0, y: -20 }}
//   animate={{ opacity: 1, y: 0 }}
//   transition={{ duration: 0.8 }}
// >
//   {/* Heading Row */}
//   <div className="relative flex justify-center items-center mb-3 sm:mb-4">

//   {/* Left Doodle */}
//   <img
//     src={capandbook}
//     alt="Left Doodle"
//     className="sm:block absolute left-6 -translate-x-full 
//                w-12 sm:w-16 md:w-20 lg:w-24 xl:w-28 
//                opacity-80"
//   />

//   {/* Center Content */}
//   <div className="inline-flex items-center gap-2 sm:gap-3 px-6">
//     <Star className="w-5 h-5 sm:w-6 sm:h-6 text-navy-600 fill-navy-600" />

//     <h2 className="font-title text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gradient-navy">
//       Key Highlights of Our School
//     </h2>

//     <Star className="w-5 h-5 sm:w-6 sm:h-6 text-navy-600 fill-navy-600" />
//   </div>

//   {/* Right Doodle */}
//   <img
//     src={testtube5}
//     alt="Right Doodle"
//     className="sm:block absolute right-6 translate-x-full 
//                w-12 sm:w-16 md:w-20 lg:w-24 xl:w-28 
//                opacity-80"
//   />
// </div>


//   {/* Divider */}
//   <motion.div
//     className="h-1 w-16 sm:w-20 md:w-24 gradient-navy mx-auto mb-4 sm:mb-6 md:mb-8 rounded-full"
//     initial={{ width: 0 }}
//     animate={{ width: "4rem" }}
//     transition={{ duration: 0.8, delay: 0.3 }}
//   />

//   {/* Description */}
//   <p className="text-navy-700 max-w-2xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl px-2 sm:px-4 md:px-0">
//     Discover the exceptional features and facilities that make Vidya
//     Prabodhini Prashala a premier educational institution.
//   </p>
// </motion.div>


//         {/* <motion.div
//           className="text-center mb-10 sm:mb-12 md:mb-14 lg:mb-16"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           <div className="inline-flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
//             <Star className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6 text-navy-600 fill-navy-600" />
//             <h2 className="font-title text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gradient-navy">
//               Key Highlights of Our School
//             </h2>
//             <Star className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6 text-navy-600 fill-navy-600" />
//           </div>
          
          
//           <motion.div
//             className="h-1 w-16 sm:w-20 md:w-24 gradient-navy mx-auto mb-4 sm:mb-6 md:mb-8 rounded-full"
//             initial={{ width: 0 }}
//             animate={{ width: "4rem" }}
//             transition={{ duration: 0.8, delay: 0.3 }}
//           />
          
//           <p className="text-navy-700 max-w-2xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl px-2 sm:px-4 md:px-0">
//             Discover the exceptional features and facilities that make Vidya
//             Prabodhini Prashala a premier educational institution.
//           </p>
//         </motion.div> */}

//         {/* Carousel Container */}
//         <div className="relative">
//           {/* Left Navigation Button - Show only on lg+ when scrollable */}
//           {showButtons && isScrollable && (
//             <motion.button
//               onClick={() => scroll("left")}
//               className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 p-2.5 md:p-3 gradient-navy text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 border border-white/20"
//               aria-label="Previous highlights"
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.95 }}
//               initial={{ opacity: 0, x: -10 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.3 }}
//             >
//               <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
//             </motion.button>
//           )}

//           {/* Carousel Container */}
//           <div className="relative overflow-hidden px-1 sm:px-0">
//             <div
//               ref={sliderRef}
//               className="flex py-6 sm:py-8 md:py-10 overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar gap-4 sm:gap-5 md:gap-6 lg:gap-8"
//               style={{
//                 scrollbarWidth: "none",
//                 msOverflowStyle: "none",
//               }}
//             >
//               {studentJourney.items.map((item, index) => (
//                 <motion.div
//                   key={item.id}
//                   className=" flex-none w-[280px] xs:w-[300px] sm:w-[320px] md:w-[352px] lg:w-96 bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-sm sm:shadow-md lg:shadow-lg overflow-hidden hover:shadow-lg lg:hover:shadow-xl transition-all duration-500 snap-start group hover:-translate-y-1 lg:hover:-translate-y-2 backdrop-blur-sm border border-navy-100/50"
//                   initial={{ opacity: 0, y: 30, scale: 0.95 }}
//                   animate={{ opacity: 1, y: 0, scale: 1 }}
//                   transition={{ duration: 0.6, delay: index * 0.1 }}
//                   whileHover={{
//                     scale: window.innerWidth >= 1024 ? 1.02 : 1.01,
//                   }}
//                 >
//                   <div className="relative h-40 xs:h-44 sm:h-48 md:h-52 lg:h-64 bg-gradient-to-br from-navy-50 to-blue-50 overflow-hidden">
//                     <img
//                       src={item.image}
//                       alt={item.title}
//                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
//                       loading="lazy"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-navy-900/20 to-transparent"></div>
//                   </div>
                  
//                   <div className="p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8">
//                     <div className="mb-3 md:mb-4">
//                       <h3 className="font-title text-base sm:text-lg md:text-xl lg:text-xl font-bold text-navy-800 group-hover:text-navy-700 transition-colors duration-300">
//                         {item.title}
//                       </h3>
//                     </div>
//                     <p className="text-navy-600 text-xs sm:text-sm md:text-base leading-relaxed">
//                       {item.description}
//                     </p>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>

//           {/* Right Navigation Button - Show only on lg+ when scrollable */}
//           {showButtons && isScrollable && (
//             <motion.button
//               onClick={() => scroll("right")}
//               className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20 p-2.5 md:p-3 gradient-navy text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 border border-white/20"
//               aria-label="Next highlights"
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.95 }}
//               initial={{ opacity: 0, x: 10 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.3 }}
//             >
//               <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
//             </motion.button>
//           )}
//         </div>

//         {/* Navigation Dots - Show on mobile/tablet or when buttons are hidden */}
//         {(!showButtons || window.innerWidth < 1024) && isScrollable && (
//           <div className="flex justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8">
//             {Array.from({
//               length: Math.ceil(
//                 studentJourney.items.length /
//                 (window.innerWidth >= 1024 ? 3 : 
//                  window.innerWidth >= 768 ? 2 : 1)
//               )
//             }).map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => goToSlide(index)}
//                 className={`w-2 h-2 rounded-full transition-all duration-300 ${
//                   index === currentSlide
//                     ? "bg-navy-600 w-6"
//                     : "bg-navy-300 hover:bg-navy-400"
//                 }`}
//                 aria-label={`Go to slide ${index + 1}`}
//               />
//             ))}
//           </div>
//         )}

//         {/* Scroll hint for mobile */}
//         {!showButtons && isScrollable && (
//           <motion.div
//             className="text-center mt-4 sm:mt-6"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.5 }}
//           >
//             <p className="text-navy-500 text-xs sm:text-sm inline-flex items-center gap-1">
//               <span className="hidden sm:inline">Swipe</span>
//               <span className="sm:hidden">Scroll</span>
//               <ChevronLeft className="w-4 h-4 rotate-180" />
//               to explore more
//               <ChevronRight className="w-4 h-4" />
//             </p>
//           </motion.div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default StudentJourney;

// import React, { useRef, useEffect, useState } from "react";
// import { ChevronLeft, ChevronRight, Star } from "lucide-react";
// import { motion } from "framer-motion";
// import { studentJourney } from "../../constant/Home/studentJourney";

// const StudentJourney = () => {
//   const sliderRef = useRef(null);
//   const [showButtons, setShowButtons] = useState(true);
//   const [isScrollable, setIsScrollable] = useState(false);

//   // Check if content overflows and update button visibility
//   useEffect(() => {
//     const checkOverflow = () => {
//       if (sliderRef.current) {
//         const container = sliderRef.current;
//         const canScroll = container.scrollWidth > container.clientWidth;
//         setIsScrollable(canScroll);

//         // Show buttons on md and larger screens when scrollable
//         if (window.innerWidth >= 768) {
//           setShowButtons(canScroll);
//         } else {
//           setShowButtons(false);
//         }
//       }
//     };

//     checkOverflow();
//     window.addEventListener("resize", checkOverflow);
//     return () => window.removeEventListener("resize", checkOverflow);
//   }, []);

//   const scroll = (direction) => {
//     if (sliderRef.current) {
//       const container = sliderRef.current;
//       let scrollAmount;

//       // Adjust scroll amount based on screen size
//       if (window.innerWidth >= 1024) {
//         scrollAmount = 416; // 384px (w-96) + 32px gap
//       } else if (window.innerWidth >= 768) {
//         scrollAmount = 382; // 350px + 32px gap
//       } else if (window.innerWidth >= 640) {
//         scrollAmount = 352; // 320px + 32px gap
//       } else {
//         scrollAmount = 312; // 280px + 32px gap
//       }

//       if (direction === "left") {
//         container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
//       } else {
//         container.scrollBy({ left: scrollAmount, behavior: "smooth" });
//       }
//     }
//   };

//   return (
//     <section className="py-20 md:py-8 relative overflow-hidden gradient-light">
//       {/* Background decorative elements */}
//       <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-navy-100/30 via-blue-100/20 to-transparent rounded-full -translate-x-48 -translate-y-48"></div>
//       <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-100/20 via-navy-100/30 to-transparent rounded-full translate-x-48 translate-y-48"></div>

//       <div className="max-w-[1440px] mx-auto gradient-light px-4 sm:px-6 relative z-10">
//         {/* Header */}
//         <motion.div
//           className="text-center mb-12 md:mb-16"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           <div className="inline-flex items-center gap-3 mb-4">
//             <Star className="w-6 h-6 text-navy-600 fill-navy-600" />
//             <h2 className="font-title  text-xl md:text-4xl font-bold text-gradient-navy">
//               Key Highlights of Our School
//             </h2>
//             <Star className="w-6 h-6 text-navy-600 fill-navy-600" />
//           </div>
//           <motion.div
//             className="h-1.5 w-24 gradient-navy mx-auto mb-6 md:mb-8 rounded-full"
//             initial={{ width: 0 }}
//             animate={{ width: "6rem" }}
//             transition={{ duration: 0.8, delay: 0.3 }}
//           />
//           <p className="text-navy-700 max-w-2xl mx-auto text-base md:text-lg lg:text-xl px-4">
//             Discover the exceptional features and facilities that make Vidya
//             Prabodhini Prashala a premier educational institution.
//           </p>
//         </motion.div>

//         {/* Single Responsive Carousel Container */}
//         <div className="relative flex items-center">
//           {/* Left Navigation Button - Show on md and larger */}
//           {showButtons && isScrollable && (
//             <motion.button
//               onClick={() => scroll("left")}
//               className="absolute md:relative md:flex md:mr-4 xl:mr-6 z-10 p-3 gradient-navy text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/20 flex-shrink-0"
//               aria-label="Previous highlights"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               initial={{ opacity: 0, x: -10 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.3 }}
//             >
//               <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
//             </motion.button>
//           )}

//           {/* Carousel Container with centered content */}
//           <div className="flex-1 overflow-hidden">
//             <div
//               ref={sliderRef}
//               className="flex py-10 gap-4 md:gap-6 lg:gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar px-2 md:px-0"
//               style={{
//                 scrollbarWidth: "none",
//                 msOverflowStyle: "none",
//               }}
//             >
//               {studentJourney.items.map((item, index) => (
//                 <motion.div
//                   key={item.id}
//                   className="flex-none w-[280px] sm:w-[320px] md:w-[320px] lg:w-96 bg-white rounded-2xl lg:rounded-3xl shadow-md lg:shadow-lg overflow-hidden hover:shadow-lg lg:hover:shadow-xl transition-all duration-500 snap-start group hover:-translate-y-1 lg:hover:-translate-y-2 backdrop-blur-sm border border-navy-100"
//                   initial={{ opacity: 0, y: 30, scale: 0.95 }}
//                   animate={{ opacity: 1, y: 0, scale: 1 }}
//                   transition={{ duration: 0.6, delay: index * 0.1 }}
//                   whileHover={{
//                     scale: window.innerWidth >= 1024 ? 1.02 : 1.01,
//                   }}
//                 >
//                   <div className="relative h-48 sm:h-56 md:h-60 lg:h-64 bg-gradient-to-br from-navy-50 to-blue-50 overflow-hidden">
//                     <img
//                       src={item.image}
//                       alt={item.title}
//                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                       loading="lazy"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-navy-900/20 to-transparent"></div>
//                   </div>
//                   <div className="p-5 sm:p-6 md:p-7 lg:p-8">
//                     <div className="flex items-center gap-3 mb-3 md:mb-4">
//                       <h3 className="font-title text-lg sm:text-xl md:text-xl font-bold text-navy-800 group-hover:text-navy-700 transition-colors duration-300">
//                         {item.title}
//                       </h3>
//                     </div>
//                     <p className="text-navy-600 text-sm sm:text-base leading-relaxed">
//                       {item.description}
//                     </p>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>

//           {/* Right Navigation Button - Show on md and larger */}
//           {showButtons && isScrollable && (
//             <motion.button
//               onClick={() => scroll("right")}
//               className="absolute md:relative md:flex md:ml-4 xl:ml-6 z-10 p-3 gradient-navy text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/20 flex-shrink-0"
//               aria-label="Next highlights"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               initial={{ opacity: 0, x: 10 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.3 }}
//             >
//               <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
//             </motion.button>
//           )}
//         </div>

//         {/* Mobile Navigation Dots - Only show on small screens */}
//         {!showButtons && (
//           <div className="flex justify-center gap-2 mt-6 md:hidden">
//             {studentJourney.items.map((_, index) => (
//               <button
//                 key={index}
//                 className="w-2 h-2 rounded-full bg-navy-300 hover:bg-navy-500 transition-colors"
//                 aria-label={`Go to slide ${index + 1}`}
//                 onClick={() => {
//                   if (sliderRef.current) {
//                     let cardWidth;
//                     if (window.innerWidth >= 640) {
//                       cardWidth = 320;
//                     } else {
//                       cardWidth = 280;
//                     }
//                     sliderRef.current.scrollTo({
//                       left: index * (cardWidth + 16),
//                       behavior: "smooth",
//                     });
//                   }
//                 }}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default StudentJourney;

