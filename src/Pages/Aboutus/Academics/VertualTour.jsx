import { motion } from "framer-motion";
import { useState } from "react";
import {
  Play,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Users,
  BookOpen,
  Star,
  X,
  Eye,
} from "lucide-react";

const VirtualTour = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const tourImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1592066575517-58df903152f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Modern Classrooms",
      description: "Bright, colorful learning spaces",
      icon: <BookOpen className="h-4 w-4" />,
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Play Areas",
      description: "Safe and fun playgrounds",
      icon: <Users className="h-4 w-4" />,
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Activity Rooms",
      description: "Creative spaces for arts & crafts",
      icon: <Star className="h-4 w-4" />,
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Campus View",
      description: "Beautiful green campus",
      icon: <MapPin className="h-4 w-4" />,
    },
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % tourImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + tourImages.length) % tourImages.length
    );
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <section className="py-12 bg-gradient-to-b from-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-500"></div>
      <div className="absolute top-1/4 right-4 text-2xl opacity-10">🏫</div>
      <div className="absolute bottom-1/4 left-4 text-2xl opacity-10">🎨</div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mb-4">
            <Eye className="h-4 w-4 text-white" />
            <span className="text-white text-sm font-semibold">
              Virtual Experience
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Take a <span className="text-blue-600">Virtual Tour</span> 🎬
          </h2>
          <p className="text-gray-600 text-sm">
            Explore our campus from the comfort of your home
          </p>
        </motion.div>

        {/* Main Tour Container */}
        <div className="grid md:grid-cols-2 gap-6 items-center">
          {/* Left Column - Main Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white"
          >
            {/* Main Image */}
            <div className="aspect-video relative bg-gradient-to-br from-blue-100 to-purple-100">
              <img
                src={tourImages[currentImageIndex].src}
                alt={tourImages[currentImageIndex].title}
                className="w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

              {/* Image Info */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-2 text-white mb-2">
                  <div className="p-1.5 bg-blue-500 rounded-lg">
                    {tourImages[currentImageIndex].icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">
                      {tourImages[currentImageIndex].title}
                    </h3>
                    <p className="text-sm opacity-90">
                      {tourImages[currentImageIndex].description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Play Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-2xl"
              >
                <Play className="h-6 w-6 text-blue-600" fill="blue" />
              </motion.button>

              {/* Fullscreen Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm p-2 rounded-lg text-white"
              >
                <Maximize2 className="h-4 w-4" />
              </motion.button>

              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 backdrop-blur-sm p-2 rounded-full text-white hover:bg-black/70 transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 backdrop-blur-sm p-2 rounded-full text-white hover:bg-black/70 transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Image Dots */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1.5">
              {tourImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentImageIndex
                      ? "bg-white w-4"
                      : "bg-white/50 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Right Column - Info & Thumbnails */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {/* Info Card */}
            <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-2 text-lg">
                Experience Our Campus Virtually 🎉
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Take a guided tour through our facilities, classrooms, and play
                areas. See where your child will learn, play, and grow!
              </p>

              {/* Features */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: "📚", label: "Classrooms", count: "25+" },
                  { icon: "🎨", label: "Activity Areas", count: "15+" },
                  { icon: "⚽", label: "Play Zones", count: "10+" },
                  { icon: "🌳", label: "Green Space", count: "5 Acres" },
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="text-xl">{feature.icon}</div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">
                        {feature.label}
                      </div>
                      <div className="text-xs text-gray-500">
                        {feature.count}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Thumbnails Grid */}
            <div className="grid grid-cols-2 gap-3">
              {tourImages.map((image, index) => (
                <motion.button
                  key={image.id}
                  whileHover={{ y: -2 }}
                  onClick={() => goToImage(index)}
                  className={`relative rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                    index === currentImageIndex
                      ? "border-blue-500 ring-2 ring-blue-200"
                      : "border-transparent hover:border-blue-300"
                  }`}
                >
                  <div className="aspect-video">
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-1 left-1 right-1">
                    <p className="text-white text-xs font-semibold truncate">
                      {image.title}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black z-50 flex items-center justify-center p-4"
        >
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 text-white text-2xl"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="relative max-w-4xl w-full">
            <img
              src={tourImages[currentImageIndex].src}
              alt={tourImages[currentImageIndex].title}
              className="w-full h-auto rounded-lg"
            />

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
              <button
                onClick={prevImage}
                className="bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/30 transition-colors"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextImage}
                className="bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/30 transition-colors"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default VirtualTour;
