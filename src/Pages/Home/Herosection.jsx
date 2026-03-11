import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";
import axiosInstance from "../../services/api"; // Update this import path based on your project structure

function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [heroData, setHeroData] = useState({
    images: {},
    content: {
      schoolName: "Vidya Prabodhini Prashala - CBSE",
      welcomeText: "Towards a more Holistic Education",
      buttons: [
        { id: "academics", text: "Explore Academics", link: "/curriculum", type: "primary" },
        { id: "virtual-tour", text: "Virtual Tour", link: "/virtual-tour", type: "secondary" }
      ]
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHeroSection();
  }, []);

  const fetchHeroSection = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/hero-section');
      
      if (response.data.success) {
        setHeroData(response.data.data);
        setError(null);
      }
    } catch (err) {
      console.error('Error fetching hero section:', err);
      setError('Failed to load hero section');
    } finally {
      setLoading(false);
    }
  };

  // Process images: filter out null values and fix escaped slashes in URLs
  const images = Object.values(heroData.images)
    .filter(img => img !== null)
    .map(img => {
      // Fix escaped forward slashes (\/ -> /)
      return img.replace(/\\\//g, '/');
    });

  // Fixed content - using the data from API or defaults (doesn't change with images)
  const { welcomeText, schoolName, buttons } = heroData.content;

  // Auto-sliding effect for images only
  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [images.length]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Find button links from API data or use defaults
  const academicsButton = buttons?.find(btn => btn.id === "academics") || { link: "/curriculum", text: "Explore Academics" };
  const virtualTourButton = buttons?.find(btn => btn.id === "virtual-tour") || { link: "/virtual-tour", text: "Virtual Tour" };

  // Loading state
  if (loading) {
    return (
      <section className="relative min-h-[65vh] lg:h-[70vh] overflow-hidden bg-[#194369] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading hero section...</p>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="relative min-h-[65vh] lg:h-[70vh] overflow-hidden bg-[#194369] flex items-center justify-center">
        <div className="text-center text-white">
          <p className="text-xl mb-4">⚠️ {error}</p>
          <button 
            onClick={fetchHeroSection}
            className="px-6 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-[65vh] lg:h-[70vh] overflow-hidden bg-[#194369]">
      {/* Background Image with Gradient Overlay - Auto sliding images */}
      {images.length > 0 && images[currentImageIndex] ? (
        <div className="absolute inset-0">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="School Background"
              className={`w-full h-full object-cover transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ position: 'absolute', top: 0, left: 0 }}
              onError={(e) => {
                console.error('Image failed to load:', img);
                e.target.style.display = 'none';
              }}
            />
          ))}
          <div className="absolute inset-0 
bg-gradient-to-r 
from-[#194369]/85 via-[#194369]/40 to-[#194369]/0 
md:bg-gradient-to-r 
md:from-[#194369]/80 md:via-[#194369]/40 md:to-transparent"></div>
        </div>
      ) : (
        // Fallback background color when no images are available
        <div className="absolute inset-0 bg-gradient-to-r from-[#194369] to-[#2a5a8c]"></div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 h-full flex items-center justify-center">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-12 items-center justify-center w-full py-8 lg:py-8">
          {/* Left Column - Fixed Text (Doesn't change with images) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4 sm:space-y-6 text-center lg:text-left order-1 w-full"
          >
            {/* School name with DM Serif Text - Fixed */}
            <div className="mb-8">
              <h1 className="font-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                {schoolName || "Vidya Prabodhini Prashala - CBSE"}
              </h1>
            </div>

            {/* Welcome text with Urbanist - Fixed */}
            <p className="text-white text-sm sm:text-base md:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {welcomeText || "Towards a more Holistic Education"}
            </p>

            {/* CTA Buttons with Poppins - Fixed */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <button
                onClick={() => (window.location.href = academicsButton.link)}
                className="font-secondary px-8 py-3.5 gradient-navy text-white rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                {academicsButton.text || "Explore Academics"}
              </button>

              <button
                onClick={() => (window.location.href = virtualTourButton.link)}
                className="font-secondary px-8 py-3.5 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold text-sm sm:text-base border-2 border-white/30 hover:bg-white/20 transition-all duration-300"
              >
                {virtualTourButton.text || "Virtual Tour"}
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Navigation Arrows - Only show if more than 1 image */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="font-secondary absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full gradient-navy flex items-center justify-center text-white border border-white/20 hover:shadow-lg hover:scale-110 transition-all duration-300 cursor-pointer z-20 hidden lg:flex"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={nextImage}
            className="font-secondary absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full gradient-navy flex items-center justify-center text-white border border-white/20 hover:shadow-lg hover:scale-110 transition-all duration-300 cursor-pointer z-20 hidden lg:flex"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Dots Indicator - Only show if more than 1 image */}
      {images.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? "bg-white w-8"
                  : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default HeroSection;

// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { ChevronRight, ChevronLeft } from "lucide-react";
// import axiosInstance from "../../services/api"; // Update this import path based on your project structure

// function HeroSection() {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [heroData, setHeroData] = useState({
//     images: {},
//     content: {
//       schoolName: "Vidya Prabodhini Prashala - CBSE",
//       welcomeText: "Towards a more Holistic Education",
//       buttons: [
//         { id: "academics", text: "Explore Academics", link: "/curriculum", type: "primary" },
//         { id: "virtual-tour", text: "Virtual Tour", link: "/virtual-tour", type: "secondary" }
//       ]
//     }
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchHeroSection();
//   }, []);

//   const fetchHeroSection = async () => {
//     try {
//       setLoading(true);
//       const response = await axiosInstance.get('/hero-section');
      
//       if (response.data.success) {
//         setHeroData(response.data.data);
//         setError(null);
//       }
//     } catch (err) {
//       console.error('Error fetching hero section:', err);
//       setError('Failed to load hero section');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Process images: filter out null values and fix escaped slashes in URLs
//   const images = Object.values(heroData.images)
//     .filter(img => img !== null)
//     .map(img => {
//       // Fix escaped forward slashes (\/ -> /)
//       return img.replace(/\\\//g, '/');
//     });

//   const { welcomeText, schoolName, buttons } = heroData.content;

//   useEffect(() => {
//     if (images.length > 1) {
//       const interval = setInterval(() => {
//         setCurrentImageIndex((prev) => (prev + 1) % images.length);
//       }, 5000);
//       return () => clearInterval(interval);
//     }
//   }, [images.length]);

//   const nextImage = () => {
//     setCurrentImageIndex((prev) => (prev + 1) % images.length);
//   };

//   const prevImage = () => {
//     setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
//   };

//   // Find button links from API data or use defaults
//   const academicsButton = buttons?.find(btn => btn.id === "academics") || { link: "/curriculum", text: "Explore Academics" };
//   const virtualTourButton = buttons?.find(btn => btn.id === "virtual-tour") || { link: "/virtual-tour", text: "Virtual Tour" };

//   // Loading state
//   if (loading) {
//     return (
//       <section className="relative min-h-[65vh] lg:h-[70vh] overflow-hidden bg-[#194369] flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-white text-lg">Loading hero section...</p>
//         </div>
//       </section>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <section className="relative min-h-[65vh] lg:h-[70vh] overflow-hidden bg-[#194369] flex items-center justify-center">
//         <div className="text-center text-white">
//           <p className="text-xl mb-4">⚠️ {error}</p>
//           <button 
//             onClick={fetchHeroSection}
//             className="px-6 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
//           >
//             Retry
//           </button>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="relative min-h-[65vh] lg:h-[70vh] overflow-hidden bg-[#194369]">
//       {/* Background Image with Gradient Overlay */}
//       {images.length > 0 && images[currentImageIndex] ? (
//         <div className="absolute inset-0">
//           <img
//             src={images[currentImageIndex]}
//             alt="School Background"
//             className="w-full h-full object-cover"
//             onError={(e) => {
//               console.error('Image failed to load:', images[currentImageIndex]);
//               e.target.style.display = 'none';
//             }}
//           />
//           <div className="absolute inset-0 
// bg-gradient-to-r 
// from-[#194369]/85 via-[#194369]/40 to-[#194369]/0 
// md:bg-gradient-to-r 
// md:from-[#194369]/80 md:via-[#194369]/40 md:to-transparent"></div>
//         </div>
//       ) : (
//         // Fallback background color when no images are available
//         <div className="absolute inset-0 bg-gradient-to-r from-[#194369] to-[#2a5a8c]"></div>
//       )}

//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 h-full flex items-center justify-center">
//         <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-12 items-center justify-center w-full py-8 lg:py-8">
//           {/* Left Column - Text */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="space-y-4 sm:space-y-6 text-center lg:text-left order-1 w-full"
//           >
//             {/* School name with DM Serif Text */}
//             <div className="mb-8">
//               <h1 className="font-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
//                 {schoolName || "Vidya Prabodhini Prashala - CBSE"}
//               </h1>
//             </div>

//             {/* Welcome text with Urbanist */}
//             <p className="text-white text-sm sm:text-base md:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
//               {welcomeText || "Towards a more Holistic Education"}
//             </p>

//             {/* CTA Buttons with Poppins */}
//             <div className="flex flex-col sm:flex-row gap-4 pt-8">
//               <button
//                 onClick={() => (window.location.href = academicsButton.link)}
//                 className="font-secondary px-8 py-3.5 gradient-navy text-white rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
//               >
//                 {academicsButton.text || "Explore Academics"}
//               </button>

//               <button
//                 onClick={() => (window.location.href = virtualTourButton.link)}
//                 className="font-secondary px-8 py-3.5 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold text-sm sm:text-base border-2 border-white/30 hover:bg-white/20 transition-all duration-300"
//               >
//                 {virtualTourButton.text || "Virtual Tour"}
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       </div>

//       {/* Navigation Arrows - Only show if more than 1 image */}
//       {images.length > 1 && (
//         <>
//           <button
//             onClick={prevImage}
//             className="font-secondary absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full gradient-navy flex items-center justify-center text-white border border-white/20 hover:shadow-lg hover:scale-110 transition-all duration-300 cursor-pointer z-20 hidden lg:flex"
//             aria-label="Previous slide"
//           >
//             <ChevronLeft className="h-6 w-6" />
//           </button>

//           <button
//             onClick={nextImage}
//             className="font-secondary absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full gradient-navy flex items-center justify-center text-white border border-white/20 hover:shadow-lg hover:scale-110 transition-all duration-300 cursor-pointer z-20 hidden lg:flex"
//             aria-label="Next slide"
//           >
//             <ChevronRight className="h-6 w-6" />
//           </button>
//         </>
//       )}

//       {/* Dots Indicator - Only show if more than 1 image */}
//       {images.length > 1 && (
//         <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
//           {images.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentImageIndex(index)}
//               className={`w-2 h-2 rounded-full transition-all duration-300 ${
//                 index === currentImageIndex
//                   ? "bg-white w-8"
//                   : "bg-white/50 hover:bg-white/80"
//               }`}
//               aria-label={`Go to slide ${index + 1}`}
//             />
//           ))}
//         </div>
//       )}
//     </section>
//   );
// }

// export default HeroSection;

// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { ChevronRight, ChevronLeft } from "lucide-react";
// import { heroData } from "../../constant/Home/heroData";

// function HeroSection() {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const images = Object.values(heroData.images);
//   const { welcomeText } = heroData;

//   useEffect(() => {
//     if (images.length > 1) {
//       const interval = setInterval(() => {
//         setCurrentImageIndex((prev) => (prev + 1) % images.length);
//       }, 5000);
//       return () => clearInterval(interval);
//     }
//   }, [images.length]);

//   const nextImage = () => {
//     setCurrentImageIndex((prev) => (prev + 1) % images.length);
//   };

//   const prevImage = () => {
//     setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
//   };

//   return (
//     <section className="relative   min-h-[65vh] lg:h-[70vh] overflow-hidden bg-[#194369]">
//       {/* Background Image with Gradient Overlay */}
//       {images.length > 0 && (
//         <div className="absolute inset-0">
//           <img
//             src={images[currentImageIndex]}
//             alt="School Background"
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 
// bg-gradient-to-r 
// from-[#194369]/85 via-[#194369]/40 to-[#194369]/0 
// md:bg-gradient-to-r 
// md:from-[#194369]/80 md:via-[#194369]/40 md:to-transparent"></div>
//         </div>
//       )}

//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 h-full flex items-center justify-center">
//         <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-12 items-center justify-center w-full py-8 lg:py-8">
//           {/* Left Column - Text */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="space-y-4 sm:space-y-6 text-center lg:text-left order-1 w-full"
//           >
//             {/* School name with DM Serif Text */}
//             <div className="mb-8">
//               <h1 className="font-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
//                 Vidya Prabodhini Prashala - CBSE
//               </h1>
//             </div>

//             {/* Welcome text with Urbanist */}
//             <p className="text-white text-sm sm:text-base md:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
//               {welcomeText}
//             </p>

            

//             {/* CTA Buttons with Poppins */}
//             <div className="flex flex-col sm:flex-row gap-4 pt-8">
//               <button
//                 onClick={() => (window.location.href = "/curriculum")}
//                 className="font-secondary px-8 py-3.5 gradient-navy text-white rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
//               >
//                 Explore Academics
//               </button>

//               <button
//                 onClick={() => (window.location.href = "/virtual-tour")}
//                 className="font-secondary px-8 py-3.5 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold text-sm sm:text-base border-2 border-white/30 hover:bg-white/20 transition-all duration-300"
//               >
//                 Virtual Tour
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       </div>

//       {/* Navigation Arrows */}
//       {images.length > 1 && (
//         <>
//           <button
//             onClick={prevImage}
//             className="font-secondary absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full gradient-navy flex items-center justify-center text-white border border-white/20 hover:shadow-lg hover:scale-110 transition-all duration-300 cursor-pointer z-20 hidden lg:flex"
//             aria-label="Previous slide"
//           >
//             <ChevronLeft className="h-6 w-6" />
//           </button>

//           <button
//             onClick={nextImage}
//             className="font-secondary absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full gradient-navy flex items-center justify-center text-white border border-white/20 hover:shadow-lg hover:scale-110 transition-all duration-300 cursor-pointer z-20 hidden lg:flex"
//             aria-label="Next slide"
//           >
//             <ChevronRight className="h-6 w-6" />
//           </button>
//         </>
//       )}

//       {/* Dots Indicator */}
//       {images.length > 1 && (
//         <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
//           {images.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentImageIndex(index)}
//               className={`w-2 h-2 rounded-full transition-all duration-300 ${
//                 index === currentImageIndex
//                   ? "bg-white w-8"
//                   : "bg-white/50 hover:bg-white/80"
//               }`}
//               aria-label={`Go to slide ${index + 1}`}
//             />
//           ))}
//         </div>
//       )}
//     </section>
//   );
// }

// export default HeroSection;
