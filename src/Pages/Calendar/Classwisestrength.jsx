import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Download, 
  Users, 
  X, 
  ZoomIn, 
  ChevronLeft, 
  ChevronRight as RightIcon 
} from "lucide-react";
import { classStrengthData } from "../../constant/Calendar/classStrengthData";

const Classwisestrength = () => {
  const [selectedYear, setSelectedYear] = useState("2025-26");
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  
  // Refs for zoom and drag functionality
  const imageContainerRef = useRef(null);
  const imageRef = useRef(null);

  const handleImageClick = (imagePath, index) => {
    setSelectedImage(imagePath);
    setCurrentImageIndex(index);
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
  };

  const nextImage = () => {
    const selectedData = classStrengthData.find(item => item.year === selectedYear);
    if (selectedData?.images && currentImageIndex < selectedData.images.length - 1) {
      const newIndex = currentImageIndex + 1;
      setCurrentImageIndex(newIndex);
      setSelectedImage(selectedData.images[newIndex]);
      setZoomLevel(1);
      setImagePosition({ x: 0, y: 0 });
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      const selectedData = classStrengthData.find(item => item.year === selectedYear);
      const newIndex = currentImageIndex - 1;
      setCurrentImageIndex(newIndex);
      setSelectedImage(selectedData.images[newIndex]);
      setZoomLevel(1);
      setImagePosition({ x: 0, y: 0 });
    }
  };

  const handleWheelZoom = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoomLevel(prev => Math.max(0.5, Math.min(3, prev + delta)));
  };

  const selectedStrength = classStrengthData.find(
    (item) => item.year === selectedYear
  );

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full -translate-x-48 -translate-y-48"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-500/10 to-purple-500/10 rounded-full translate-x-48 translate-y-48"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-purple-500"></div>
            <h2 className="text-center text-2xl text-[#800000] md:text-4xl font-serif font-semibold text- mb-4">
              Class Wise Strength
            </h2>
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          </div>

          <motion.div
            className="h-1.5 w-24 bg-gradient-to-r from-[#800000] via-[#800000] to-[#800000] mx-auto mb-8 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: "6rem" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          />
          <p className="text-gray-700 max-w-2xl mx-auto text-lg md:text-xl">
            View and explore student strength details by academic year
          </p>
        </motion.div>

        {/* Images */}
       {/* Images */}
{selectedStrength?.images?.length ? (
  <div className="grid grid-cols-1 place-items-center gap-6">
    {selectedStrength.images.map((img, index) => (
      <motion.div
        key={index}
        whileHover={{ scale: 1.03 }}
        onClick={() => setSelectedImage(img)}
        className="cursor-pointer bg-white shadow-md rounded-xl p-4 w-full max-w-4xl"
      >
        <img
          src={img}
          alt="Strength Chart"
          className="w-full h-60 md:h-80 object-contain mx-auto"
        />
      </motion.div>
    ))}
  </div>
) : (
  <p className="text-center text-gray-500">
    No data available for {selectedYear}
  </p>
)}
</div>

      {/* IMAGE MODAL */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 p-2 rounded-full"
              onClick={() => setSelectedImage(null)}
            >
              <X className="text-white" />
            </button>

            {/* Image */}
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selectedImage}
              alt="Full View"
              className="max-w-[95vw] max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Classwisestrength;