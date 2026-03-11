import {
  ChevronLeft,
  ChevronRight,
  Newspaper,
  Clock,
  Calendar,
} from "lucide-react";
import { motion } from "framer-motion";
import { vppLatestNewsData as defaultVppLatestNewsData } from "../../constant/Home/vppLatestNewsData";
import { useRef, useState, useEffect } from "react";
import axiosInstance from "../../services/api";

function VppLatestNews() {
  const [newsData, setNewsData] = useState({
    latestNews: {
      header: {
        title: defaultVppLatestNewsData.title || "Latest News",
        description: defaultVppLatestNewsData.description || "Stay updated with the latest news, events, and announcements from our school"
      },
      items: defaultVppLatestNewsData.items || [],
      ctaButton: {
        text: defaultVppLatestNewsData.ctaButton?.text || "View All News & Updates",
        link: defaultVppLatestNewsData.ctaButton?.link || "/blog"
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
  
  const cardsRef = useRef(null);

  useEffect(() => {
    fetchLatestNews();
  }, []);

  const fetchLatestNews = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/latest-news');
      
      if (response.data.success) {
        const apiData = response.data.data;
        
        const processedData = {
          latestNews: {
            header: {
              title: apiData.latestNews?.header?.title || "Latest News",
              description: apiData.latestNews?.header?.description || "Stay updated with the latest news, events, and announcements from our school"
            },
            items: apiData.latestNews?.items?.length > 0 
              ? apiData.latestNews.items.map(item => ({
                  ...item,
                  image: item.image?.replace(/\\\//g, '/') || item.image,
                  alt: item.alt || "Latest News",
                  title: item.title || "Latest Update",
                  description: item.description || "",
                  category: item.category || "Announcement",
                  link: item.link || "#",
                  date: item.date || "",
                  readTime: item.readTime || "3 min read"
                }))
              : defaultVppLatestNewsData.items || [],
            ctaButton: {
              text: apiData.latestNews?.ctaButton?.text || "View All News & Updates",
              link: apiData.latestNews?.ctaButton?.link || "/blog"
            }
          }
        };
        
        setNewsData(processedData);
        
        const itemsCount = apiData.latestNews?.items?.length || 0;
        setHasMoreCards(itemsCount > 3);
        
        setError(null);
      }
    } catch (err) {
      console.error('Error fetching latest news:', err);
      setError('Failed to load latest news');
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
    if (autoPlay && hasMoreCards && newsData.latestNews.items.length > 3) {
      autoPlayRef.current = setInterval(() => {
        if (isMobile) {
          // Mobile: one card at a time
          const totalCards = newsData.latestNews.items.length;
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
  }, [isMobile, autoPlay, hasMoreCards, newsData.latestNews.items.length]);

  // Scroll to current index for mobile
  useEffect(() => {
    if (isMobile && cardsRef.current && hasMoreCards && newsData.latestNews.items.length > 3) {
      const cardWidth = cardsRef.current.children[0]?.offsetWidth || 0;
      const gap = 12; // gap-3 = 12px
      const scrollPosition = currentIndex * (cardWidth + gap);
      
      cardsRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, [currentIndex, isMobile, hasMoreCards, newsData.latestNews.items.length]);

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
        const totalCards = newsData.latestNews.items.length;
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

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });
    } catch (e) {
      return dateString;
    }
  };

  const { header, items, ctaButton } = newsData.latestNews;

  // Loading state
  if (loading) {
    return (
      <section className="py-10 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden min-h-[400px] flex items-center justify-center">
        <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-navy-500/10 to-blue-500/10 rounded-full -translate-x-24 -translate-y-24 sm:-translate-x-32 sm:-translate-y-32 md:-translate-x-40 md:-translate-y-40 lg:-translate-x-48 lg:-translate-y-48"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-to-tl from-blue-500/10 to-navy-500/10 rounded-full translate-x-24 translate-y-24 sm:translate-x-32 sm:translate-y-32 md:translate-x-40 md:translate-y-40 lg:translate-x-48 lg:translate-y-48"></div>
        
        <div className="text-center relative z-10">
          <div className="w-16 h-16 border-4 border-navy-200 border-t-navy-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading latest news...</p>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-10 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden min-h-[400px] flex items-center justify-center">
        <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-navy-500/10 to-blue-500/10 rounded-full -translate-x-24 -translate-y-24 sm:-translate-x-32 sm:-translate-y-32 md:-translate-x-40 md:-translate-y-40 lg:-translate-x-48 lg:-translate-y-48"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-to-tl from-blue-500/10 to-navy-500/10 rounded-full translate-x-24 translate-y-24 sm:translate-x-32 sm:translate-y-32 md:translate-x-40 md:translate-y-40 lg:translate-x-48 lg:translate-y-48"></div>
        
        <div className="text-center relative z-10">
          <p className="text-red-600 text-xl mb-4">⚠️ {error}</p>
          <button 
            onClick={fetchLatestNews}
            className="px-6 py-2 gradient-navy text-white rounded-lg hover:opacity-90 transition-colors"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-navy-500/10 to-blue-500/10 rounded-full -translate-x-24 -translate-y-24 sm:-translate-x-32 sm:-translate-y-32 md:-translate-x-40 md:-translate-y-40 lg:-translate-x-48 lg:-translate-y-48"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-to-tl from-blue-500/10 to-navy-500/10 rounded-full translate-x-24 translate-y-24 sm:translate-x-32 sm:translate-y-32 md:translate-x-40 md:translate-y-40 lg:translate-x-48 lg:translate-y-48"></div>

      {/* Newspaper icons */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <Newspaper
            key={i}
            className="absolute w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 text-navy-400/10"
            style={{
              left: `${10 + i * 30}%`,
              top: `${20 + i * 15}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-10 sm:mb-12 md:mb-14 lg:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5 md:mb-6">
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-navy-500/20 to-blue-500/20 rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center">
              <Newspaper className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-navy-600" />
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-navy-600 via-navy-700 to-navy-800 bg-clip-text text-transparent">
              {header?.title || "Latest News"}
            </h2>
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500/20 to-navy-500/20 rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-navy-600" />
            </div>
          </div>

          <motion.div
            className="h-1 sm:h-1.5 w-16 sm:w-20 md:w-24 gradient-navy mx-auto mb-6 sm:mb-7 md:mb-8 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: "4rem" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          />
          <p className="text-gray-700 max-w-2xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl px-2 sm:px-4">
            {header?.description || "Stay updated with the latest news, events, and announcements from our school"}
          </p>
        </motion.div>

        {/* News Cards Container */}
        <div className="relative">
          {/* Desktop Left Arrow - Only show when more than 3 cards */}
          {hasMoreCards && (
            <motion.button
              onClick={scrollLeft}
              className="hidden lg:flex absolute -left-4 xl:-left-16 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full gradient-navy text-white items-center justify-center transition-all duration-300 hover:scale-110 z-20 backdrop-blur-sm border border-white/20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
            </motion.button>
          )}

          {/* Mobile Navigation Buttons - Only show when more than 3 cards */}
          {hasMoreCards && isMobile && (
            <div className="flex lg:hidden justify-between absolute top-1/2 -translate-y-1/2 w-full px-2 z-20">
              <motion.button
                onClick={scrollLeft}
                className="w-8 h-8 rounded-xl bg-gradient-to-r from-navy-600 to-blue-600 text-white shadow-lg flex items-center justify-center hover:opacity-90 transition-all duration-300"
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft className="w-4 h-4" />
              </motion.button>
              <motion.button
                onClick={scrollRight}
                className="w-8 h-8 rounded-xl gradient-navy text-white shadow-lg flex items-center justify-center hover:opacity-90 transition-all duration-300"
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          )}

          {/* News Cards */}
          <div
            ref={cardsRef}
            className={`
              flex
              gap-3 sm:gap-4 md:gap-5 lg:gap-8
              overflow-x-auto scroll-smooth
              ${hasMoreCards ? 'snap-x snap-mandatory' : ''}
              pb-4 sm:pb-6 lg:pb-0
              no-scrollbar
              scroll-pl-4 scroll-pr-4
            `}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {items.map((item, index) => (
              <motion.div
                key={item.id || index}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={!isMobile ? { scale: 1.02, y: -5 } : {}}
                className={`
                  flex-shrink-0
                  ${isMobile ? 'w-[85vw]' : 'lg:w-[calc(33.333%-1.5rem)]'}
                  ${!isMobile && !hasMoreCards ? 'w-full' : ''}
                  bg-gradient-to-br from-white to-white/90
                  rounded-xl sm:rounded-2xl
                  overflow-hidden
                  shadow-lg sm:shadow-xl hover:shadow-2xl
                  transition-all duration-500
                  ${hasMoreCards ? 'snap-center' : ''}
                  border border-navy-100/50 backdrop-blur-sm
                  group
                `}
              >
                {/* Image */}
                <div className="
                  relative
                  w-full
                  h-48 sm:h-56 md:h-60 lg:h-64
                  overflow-hidden
                  bg-gradient-to-br from-navy-500/10 to-blue-500/10
                ">
                  <img
                    src={item.image}
                    alt={item.alt || "Latest News"}
                    className="
                      w-full h-full
                      object-cover
                      transition-transform duration-700
                      group-hover:scale-105 lg:group-hover:scale-110
                    "
                    loading={index < 2 ? "eager" : "lazy"}
                    onError={(e) => {
                      e.target.style.backgroundColor = '#e2e8f0';
                      e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' text-anchor='middle' fill='%23999'%3ENo Image%3C/text%3E%3C/svg%3E";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 md:p-6 lg:p-8">
                  {/* Meta info */}
                  <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3 flex-shrink-0" />
                      <span>{item.date ? formatDate(item.date) : (item.readTime || "3 min read")}</span>
                    </div>
                    <div className="
                      px-2 py-0.5
                      bg-gradient-to-r from-navy-100 to-blue-100 
                      text-navy-700 text-xs
                      font-semibold rounded-full
                      whitespace-nowrap
                    ">
                      {item.category || "Announcement"}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="
                    text-base sm:text-lg md:text-xl
                    font-bold text-gray-800 
                    mb-2
                    group-hover:text-navy-700 
                    transition-colors duration-300 
                    line-clamp-2
                  ">
                    {item.title || "Latest Update"}
                  </h3>

                  {/* Description - Full content */}
                  <p className="
                    text-xs sm:text-sm
                    text-gray-600 
                    leading-relaxed 
                    mb-4
                  ">
                    {item.description}
                  </p>

                  {/* Read more link */}
                  <a
                    href={item.link || "#"}
                    className="
                      inline-flex items-center 
                      text-navy-600 hover:text-navy-800 
                      font-semibold 
                      text-xs sm:text-sm 
                      group/link
                    "
                  >
                    <span>Read Full Story</span>
                    <ChevronRight className="
                      w-3 h-3 sm:w-4 sm:h-4 
                      ml-1
                      group-hover/link:translate-x-1
                      transition-transform duration-300
                    " />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Desktop Right Arrow - Only show when more than 3 cards */}
          {hasMoreCards && (
            <motion.button
              onClick={scrollRight}
              className="hidden lg:flex absolute -right-4 xl:-right-16 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full gradient-navy text-white shadow-xl md:shadow-2xl items-center justify-center transition-all duration-300 hover:scale-110 z-20 backdrop-blur-sm border border-white/20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
            </motion.button>
          )}
        </div>

        {/* Slider Dots - Mobile only when more than 3 cards */}
        {isMobile && hasMoreCards && items.length > 3 && (
          <div className="flex justify-center gap-2 mt-6">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-gradient-to-r from-navy-600 to-blue-600 w-6"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Mobile scroll indicator - Only when 3 or fewer cards */}
        {isMobile && !hasMoreCards && (
          <div className="block lg:hidden text-center mt-6">
            <p className="text-gray-500 text-xs sm:text-sm">
              <span>Viewing all {items.length} news</span>
            </p>
          </div>
        )}

        {/* View All News Button */}
        <motion.div
          className="flex justify-center mt-10 sm:mt-12 md:mt-14 lg:mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <a
            href={ctaButton?.link || "/blog"}
            className="group px-6 py-3 sm:px-8 sm:py-3.5 md:px-10 md:py-4 gradient-navy text-white rounded-lg sm:rounded-xl font-semibold transition-all duration-300 shadow-lg sm:shadow-xl hover:shadow-2xl lg:hover:shadow-3xl hover:-translate-y-1 transform flex items-center gap-2 sm:gap-3 text-sm sm:text-base"
          >
            <span>{ctaButton?.text || "View All News & Updates"}</span>
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-transform" />
          </a>
        </motion.div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

export default VppLatestNews;


// import {
//   ChevronLeft,
//   ChevronRight,
//   Newspaper,
//   Clock,
//   Calendar,
// } from "lucide-react";
// import { motion } from "framer-motion";
// import { vppLatestNewsData } from "../../constant/Home/vppLatestNewsData";
// import { useRef } from "react";

// function VppLatestNews() {
//   const cardsRef = useRef(null);

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
//     <section className="py-10 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden">
//       {/* Background decorative elements - responsive sizes */}
//       <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-navy-500/10 to-blue-500/10 rounded-full -translate-x-24 -translate-y-24 sm:-translate-x-32 sm:-translate-y-32 md:-translate-x-40 md:-translate-y-40 lg:-translate-x-48 lg:-translate-y-48"></div>
//       <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-to-tl from-blue-500/10 to-navy-500/10 rounded-full translate-x-24 translate-y-24 sm:translate-x-32 sm:translate-y-32 md:translate-x-40 md:translate-y-40 lg:translate-x-48 lg:translate-y-48"></div>

//       {/* Newspaper icons - responsive sizes */}
//       <div className="absolute inset-0">
//         {[...Array(3)].map((_, i) => (
//           <Newspaper
//             key={i}
//             className="absolute w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 text-navy-400/10"
//             style={{
//               left: `${10 + i * 30}%`,
//               top: `${20 + i * 15}%`,
//             }}
//           />
//         ))}
//       </div>

//       <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
//         {/* Enhanced Header - responsive typography */}
//         <motion.div
//           className="text-center mb-10 sm:mb-12 md:mb-14 lg:mb-16"
//           initial={{ opacity: 0, y: -20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//         >
//           <div className="inline-flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5 md:mb-6">
//             <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-navy-500/20 to-blue-500/20 rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center">
//               <Newspaper className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-navy-600" />
//             </div>
//             <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-navy-600 via-navy-700 to-navy-800 bg-clip-text text-transparent">
//               {vppLatestNewsData.title}
//             </h2>
//             <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500/20 to-navy-500/20 rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center">
//               <Calendar className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-navy-600" />
//             </div>
//           </div>

//           <motion.div
//             className="h-1 sm:h-1.5 w-16 sm:w-20 md:w-24 gradient-navy mx-auto mb-6 sm:mb-7 md:mb-8 rounded-full"
//             initial={{ width: 0 }}
//             whileInView={{ width: "4rem" }}
//             transition={{ duration: 0.8, delay: 0.3 }}
//             viewport={{ once: true }}
//           />
//           <p className="text-gray-700 max-w-2xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl px-2 sm:px-4">
//             Stay updated with the latest news, events, and announcements from
//             our school
//           </p>
//         </motion.div>

//         {/* News Cards Container */}
//         <div className="relative">
//           {/* Desktop Left Arrow */}
//           <motion.button
//             onClick={scrollLeft}
//             className="hidden lg:flex absolute -left-4 xl:-left-16 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full gradient-navy text-white shadow-xl md:shadow-2xl items-center justify-center transition-all duration-300 hover:scale-110 z-20 backdrop-blur-sm border border-white/20"
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
//           </motion.button>

//           {/* News Cards - responsive layout */}
//           <div
//   ref={cardsRef}
//   className="
//     flex lg:grid
//     lg:grid-cols-3
//     gap-3 sm:gap-4 md:gap-5 lg:gap-8

//     overflow-x-auto lg:overflow-visible
//     snap-x snap-mandatory

//     pb-4 sm:pb-6 lg:pb-0
//     no-scrollbar

//     scroll-pl-4 scroll-pr-4
//   "
//   style={{
//     scrollbarWidth: 'none',
//     msOverflowStyle: 'none'
//   }}
// >
//   {vppLatestNewsData.items.map((item, index) => (
//     <motion.div
//       key={item.id}
//       initial={{ opacity: 0, y: 40, scale: 0.9 }}
//       whileInView={{ opacity: 1, y: 0, scale: 1 }}
//       transition={{ duration: 0.6, delay: index * 0.1 }}
//       viewport={{ once: true }}
//       whileHover={{ scale: 1.02, y: -5 }}
//       className="
//         flex-shrink-0
//         w-[80vw] xs:w-[75vw] sm:w-[45vw] md:w-[30vw] lg:w-full
//         bg-gradient-to-br from-white to-white/90
//         rounded-xl sm:rounded-2xl
//         overflow-hidden
//         shadow-lg sm:shadow-xl hover:shadow-2xl
//         transition-all duration-500
//         snap-start
//         border border-navy-100/50 backdrop-blur-sm
//         group
//       "
//     >
//       {/* Image - responsive with aspect ratio */}
//       <div className="
//         relative
//         w-full
//         aspect-[4/3]
//         overflow-hidden
//         bg-gradient-to-br from-navy-500/10 to-blue-500/10
//       ">
//         <img
//           src={item.image}
//           alt="Latest News"
//           className="
//             w-full h-full
//             object-cover
//             transition-transform duration-700
//             group-hover:scale-105 lg:group-hover:scale-110
//           "
//           loading={index < 2 ? "eager" : "lazy"}
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
//       </div>

//       {/* Content - optimized padding */}
//       <div className="p-3 sm:p-4 md:p-5 lg:p-6">
//         {/* Meta info - responsive */}
//         <div className="flex flex-wrap items-center gap-2 mb-2 sm:mb-3">
//           <div className="flex items-center gap-1 text-xs text-gray-500">
//             <Clock className="w-3 h-3 flex-shrink-0" />
//             <span>{item.readTime || "3 min read"}</span>
//           </div>
//           <div className="
//             px-2 py-0.5
//             bg-gradient-to-r from-navy-100 to-blue-100 
//             text-navy-700 text-xs
//             font-semibold rounded-full
//             whitespace-nowrap
//           ">
//             {item.category || "Announcement"}
//           </div>
//         </div>

//         {/* Title - responsive */}
//         <h3 className="
//           text-sm sm:text-base md:text-lg
//           font-bold text-gray-800 
//           mb-2
//           group-hover:text-navy-700 
//           transition-colors duration-300 
//           line-clamp-2
//         ">
//           {item.title || "Latest Update"}
//         </h3>

//         {/* Description */}
//         <p className="
//           text-xs sm:text-sm
//           text-gray-600 
//           leading-relaxed 
//           mb-3
//           line-clamp-2
//         ">
//           {item.description}
//         </p>

//         {/* Read more link */}
//         <a
//           href={item.link}
//           className="
//             inline-flex items-center 
//             text-navy-600 hover:text-navy-800 
//             font-semibold 
//             text-xs sm:text-sm 
//             group/link
//           "
//         >
//           <span>Read Full Story</span>
//           <ChevronRight className="
//             w-3 h-3 sm:w-4 sm:h-4 
//             ml-1
//             group-hover/link:translate-x-1
//             transition-transform duration-300
//           " />
//         </a>
//       </div>
//     </motion.div>
//   ))}
// </div>

//           {/* Desktop Right Arrow */}
//           <motion.button
//             onClick={scrollRight}
//             className="hidden lg:flex absolute -right-4 xl:-right-16 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full gradient-navy text-white shadow-xl md:shadow-2xl items-center justify-center transition-all duration-300 hover:scale-110 z-20 backdrop-blur-sm border border-white/20"
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
//           </motion.button>
//         </div>

//         {/* Mobile scroll indicator */}
//         <div className="block lg:hidden text-center mt-6">
//           <p className="text-gray-500 text-xs sm:text-sm flex items-center justify-center gap-1">
//             <ChevronLeft className="w-4 h-4" />
//             <span>Swipe to see more</span>
//             <ChevronRight className="w-4 h-4" />
//           </p>
//         </div>

//         {/* View All News Button - responsive */}
//         <motion.div
//           className="flex justify-center mt-10 sm:mt-12 md:mt-14 lg:mt-16"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.3 }}
//           viewport={{ once: true }}
//         >
//           <a
//             href="/blog"
//             className="group px-6 py-3 sm:px-8 sm:py-3.5 md:px-10 md:py-4 gradient-navy text-white rounded-lg sm:rounded-xl font-semibold transition-all duration-300 shadow-lg sm:shadow-xl hover:shadow-2xl lg:hover:shadow-3xl hover:-translate-y-1 transform flex items-center gap-2 sm:gap-3 text-sm sm:text-base"
//           >
//             <span>View All News & Updates</span>
//             <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-transform" />
//           </a>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// export default VppLatestNews;