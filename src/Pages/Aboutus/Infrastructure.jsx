import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import infrastructureData from "../../constant/Aboutus/infrastructureData";
import { 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Grid, 
  Sliders, 
  Home, 
  ArrowUp, 
  Circle, 
  Maximize2, 
  Eye,
  Star,
  Sparkles,
  Cloud,
  Heart,
  MapPin,
  Building,
  Users,
  Search,
  Filter,
  ZoomIn,
  ZoomOut,
  BookOpen,
  Calendar,
  Clock
} from "lucide-react";
import axiosInstance from "../../services/api";

// Custom LazyImage component
const LazyImage = ({ src, alt, className, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLoaded) {
            const img = new Image();
            img.src = src;
            img.onload = () => setIsLoaded(true);
            img.onerror = () => setIsError(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before entering viewport
        threshold: 0.1
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [src, isLoaded]);

  return (
    <div 
      ref={imgRef} 
      className={`relative overflow-hidden ${className}`}
      onClick={onClick}
    >
      {/* Loading Placeholder */}
      {!isLoaded && !isError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-navy-50/30">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-navy-600"></div>
        </div>
      )}

      {/* Error Placeholder */}
      {isError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-navy-50/30 p-4">
          <div className="text-navy-400 mb-2">
            <div className="w-8 h-8 bg-navy-200 rounded-full flex items-center justify-center">
              <span className="text-navy-500 text-xs">⚠️</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center">Failed to load image</p>
        </div>
      )}

      {/* Actual Image */}
      <img
        src={isLoaded ? src : ''}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${isError ? 'hidden' : ''}`}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
};

const InfrastructurePage = () => {
  const navigate = useNavigate();
  const [apiData, setApiData] = useState({
    infrastructure: {
      id: "infrastructure-section",
      header: {
        title: infrastructureData.header?.title || "Campus Infrastructure",
        description: infrastructureData.header?.description || "Explore our state-of-the-art campus facilities and modern learning environments",
        decorations: {
          dots: infrastructureData.header?.decorations?.dots || [
            { color: "bg-navy-500" },
            { color: "bg-navy-500" }
          ],
          lineColor: infrastructureData.header?.decorations?.lineColor || "from-navy-600 via-blue-600 to-navy-600"
        }
      },
      sections: infrastructureData.sections || [],
      footer: {
        text: infrastructureData.footer?.text || "Explore Our Campus",
        backToTop: infrastructureData.footer?.backToTop || "Back to Top",
        decorations: {
          lineColor: infrastructureData.footer?.decorations?.lineColor || "from-transparent via-navy-400 to-transparent"
        }
      }
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for selected section
  const [selectedSection, setSelectedSection] = useState(null);
  // State for modal
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State for mobile device detection
  const [isMobile, setIsMobile] = useState(false);
  // State for view mode (grid or slider) - MOBILE ONLY
  const [viewMode, setViewMode] = useState("grid");
  // State for slider current index
  const [sliderIndex, setSliderIndex] = useState(0);
  // Pagination state
  const [currentPage, setCurrentPage] = useState({});
  // Search state
  const [searchTerm, setSearchTerm] = useState("");
  // Filter state
  const [selectedCategory, setSelectedCategory] = useState("all");
  // View all state for each section
  const [viewAllSections, setViewAllSections] = useState({});

  useEffect(() => {
    fetchInfrastructure();
  }, []);

  const fetchInfrastructure = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/infrastructure');
      
      if (response.data.success) {
        const apiResponse = response.data.data;
        
        // Process the API data - fix image URLs
        const processedData = {
          infrastructure: {
            id: apiResponse.infrastructure?.id || "infrastructure-section",
            header: {
              title: apiResponse.infrastructure?.header?.title || "Campus Infrastructure",
              description: apiResponse.infrastructure?.header?.description || "Explore our state-of-the-art campus facilities and modern learning environments",
              decorations: {
                dots: apiResponse.infrastructure?.header?.decorations?.dots || [
                  { color: "bg-navy-500" },
                  { color: "bg-navy-500" }
                ],
                lineColor: apiResponse.infrastructure?.header?.decorations?.lineColor || "from-navy-600 via-blue-600 to-navy-600"
              }
            },
            sections: apiResponse.infrastructure?.sections?.length > 0 
              ? apiResponse.infrastructure.sections.map(section => ({
                  ...section,
                  id: section.id || `section-${Math.random()}`,
                  images: section.images?.map(img => ({
                    ...img,
                    id: img.id || Math.random(),
                    image: img.image?.replace(/\\\//g, '/') || img.image,
                    caption: img.caption || "School Facility",
                    alt: img.alt || "School facility",
                    description: img.description || "",
                    features: img.features || []
                  })) || []
                }))
              : infrastructureData.sections || [],
            footer: {
              text: apiResponse.infrastructure?.footer?.text || "Explore Our Campus",
              backToTop: apiResponse.infrastructure?.footer?.backToTop || "Back to Top",
              decorations: {
                lineColor: apiResponse.infrastructure?.footer?.decorations?.lineColor || "from-transparent via-navy-400 to-transparent"
              }
            }
          }
        };
        
        setApiData(processedData);
        
        // Set initial selected section
        if (processedData.infrastructure.sections.length > 0) {
          setSelectedSection(processedData.infrastructure.sections[0]);
        }
        
        setError(null);
      }
    } catch (err) {
      console.error('Error fetching infrastructure:', err);
      setError('Failed to load infrastructure');
    } finally {
      setLoading(false);
    }
  };

  const data = apiData.infrastructure;

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initialize states when data changes
  useEffect(() => {
    if (data.sections && data.sections.length > 0) {
      const initialPages = {};
      const initialViewAll = {};
      
      data.sections.forEach(section => {
        initialPages[section.id] = 1;
        initialViewAll[section.id] = false;
      });
      
      setCurrentPage(initialPages);
      setViewAllSections(initialViewAll);
      
      if (!selectedSection && data.sections.length > 0) {
        setSelectedSection(data.sections[0]);
      }
    }
  }, [data.sections]);

  // Pagination configuration
  const ITEMS_PER_PAGE = isMobile ? 6 : 8;

  // Get categories
  const categories = ["all", ...new Set(data.sections.map(section => section.category).filter(Boolean))];

  // Filter sections
  const filteredSections = data.sections.filter(section => {
    const matchesSearch = searchTerm === "" || 
      section.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.images?.some(img => 
        img.caption?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        img.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    const matchesCategory = selectedCategory === "all" || section.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Get paginated images for a section
  const getPaginatedImages = (section) => {
    const page = currentPage[section.id] || 1;
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    
    if (viewAllSections[section.id]) {
      return section.images;
    }
    
    return section.images.slice(startIndex, endIndex);
  };

  // Get total pages for a section
  const getTotalPages = (section) => {
    if (viewAllSections[section.id]) {
      return 1;
    }
    return Math.ceil(section.images.length / ITEMS_PER_PAGE);
  };

  // Handle page change
  const handlePageChange = (sectionId, page) => {
    setCurrentPage(prev => ({
      ...prev,
      [sectionId]: page
    }));
  };

  // Function to open modal
  const openModal = (image, section) => {
    setSelectedImage(image);
    setSelectedSection(section);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  // Modal navigation
  const nextImage = () => {
    const currentIndex = selectedSection.images.findIndex(
      (img) => img.id === selectedImage.id
    );
    const nextIndex = (currentIndex + 1) % selectedSection.images.length;
    setSelectedImage(selectedSection.images[nextIndex]);
  };

  const prevImage = () => {
    const currentIndex = selectedSection.images.findIndex(
      (img) => img.id === selectedImage.id
    );
    const prevIndex =
      (currentIndex - 1 + selectedSection.images.length) %
      selectedSection.images.length;
    setSelectedImage(selectedSection.images[prevIndex]);
  };

  // Toggle View All
  const toggleViewAll = (sectionId) => {
    setViewAllSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
    setCurrentPage(prev => ({
      ...prev,
      [sectionId]: 1
    }));
  };

  // Get slider images for mobile
  const getSliderImages = (section) => {
    const images = getPaginatedImages(section);
    const visibleImages = [];

    for (let i = sliderIndex; i < sliderIndex + 2 && i < images.length; i++) {
      visibleImages.push(images[i]);
    }

    if (visibleImages.length === 1 && images.length > 1) {
      visibleImages.push(images[0]);
    }

    return visibleImages;
  };

  // Slider navigation
  const nextSlider = () => {
    const images = getPaginatedImages(selectedSection);
    setSliderIndex((prev) => (prev + 2) % images.length);
  };

  const prevSlider = () => {
    const images = getPaginatedImages(selectedSection);
    setSliderIndex((prev) => (prev - 2 + images.length) % images.length);
  };

  const goToSlide = (index) => {
    setSliderIndex(index * 2);
  };

  // Check if section has more images
  const hasMoreImages = (section) => {
    return section.images.length > ITEMS_PER_PAGE;
  };

  // Scroll to section
  const scrollToSection = useCallback((section) => {
    setSelectedSection(section);
    setSliderIndex(0);

    setTimeout(() => {
      const element = document.getElementById(`section-${section.id}`);
      if (element) {
        const headerOffset = isMobile ? 100 : 150;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }, 100);
  }, [isMobile]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isModalOpen) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, selectedImage]);

  // Calculate slide groups
  const getSlideGroupsCount = (section) => {
    const images = getPaginatedImages(section);
    return Math.ceil(images.length / 2);
  };

  // Get current slide group
  const getCurrentSlideGroup = () => {
    return Math.floor(sliderIndex / 2) + 1;
  };

  // Pagination Component
  const Pagination = ({ section }) => {
    const totalPages = getTotalPages(section);
    const currentPageNum = currentPage[section.id] || 1;

    if (totalPages <= 1 || viewAllSections[section.id]) return null;

    return (
      <div className="mt-6 flex flex-col items-center gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(section.id, currentPageNum - 1)}
            disabled={currentPageNum === 1}
            className="p-2 rounded-lg border border-navy-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-navy-50 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-navy-600" />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: Math.min(5, totalPages) }).map((_, index) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = index + 1;
              } else if (currentPageNum <= 3) {
                pageNum = index + 1;
              } else if (currentPageNum >= totalPages - 2) {
                pageNum = totalPages - 4 + index;
              } else {
                pageNum = currentPageNum - 2 + index;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(section.id, pageNum)}
                  className={`w-8 h-8 rounded-lg font-medium transition-all ${
                    currentPageNum === pageNum
                      ? "bg-gradient-to-r from-navy-600 to-blue-600 text-white"
                      : "bg-gradient-to-br from-white to-gray-50 text-gray-700 hover:bg-navy-50 border border-navy-100"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => handlePageChange(section.id, currentPageNum + 1)}
            disabled={currentPageNum === totalPages}
            className="p-2 rounded-lg border border-navy-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-navy-50 transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-navy-600" />
          </button>
        </div>

        <div className="text-sm text-gray-600">
          Page {currentPageNum} of {totalPages} • Showing {getPaginatedImages(section).length} of {section.images.length} images
        </div>
      </div>
    );
  };

  // Mobile Views
  const MobileSliderView = ({ section }) => {
    const sliderImages = getSliderImages(section);
    const totalSlides = getSlideGroupsCount(section);
    const currentSlide = getCurrentSlideGroup();

    return (
      <div className="px-3 sm:px-4 mb-6 sm:mb-8">
        <div className="mb-4 sm:mb-6">
          <h2 className="font-title text-xl sm:text-2xl font-bold text-navy-800 mb-1">{section.title}</h2>
          {section.subtitle && (
            <h3 className="font-primary text-lg sm:text-xl text-navy-600 font-semibold mb-2 sm:mb-3">
              {section.subtitle}
            </h3>
          )}
          {section.description && (
            <p className="font-primary text-gray-600 text-xs sm:text-sm mt-1 sm:mt-2">{section.description}</p>
          )}
        </div>

        <div className="relative mb-4 sm:mb-6">
          <button
            onClick={prevSlider}
            className="absolute left-0 sm:left-1 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 shadow-lg rounded-full flex items-center justify-center hover:bg-white transition-colors -translate-x-1 sm:-translate-x-2"
            disabled={selectedSection.images.length <= 2}
          >
            <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 text-navy-700" />
          </button>

          <button
            onClick={nextSlider}
            className="absolute right-0 sm:right-1 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 shadow-lg rounded-full flex items-center justify-center hover:bg-white transition-colors translate-x-1 sm:translate-x-2"
            disabled={selectedSection.images.length <= 2}
          >
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-navy-700" />
          </button>

          <div className="flex gap-2 sm:gap-3 overflow-hidden px-0.5 sm:px-1">
            {sliderImages.map((image, idx) => (
              <div
                key={`${image.id}-${idx}`}
                className="flex-1 min-w-0"
              >
                <div
                  onClick={() => openModal(image, section)}
                  className="bg-white rounded-lg sm:rounded-xl shadow-md sm:shadow-lg overflow-hidden active:scale-[0.98] transition-transform border border-navy-100"
                >
                  <div className="relative h-36 sm:h-44 overflow-hidden">
                    <LazyImage
                      src={image.image}
                      alt={image.alt || image.caption}
                      className="w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                      <div className="p-2 sm:p-3 w-full">
                        <div className="flex items-center justify-between">
                          <span className="font-primary text-white text-xs font-medium bg-black/50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                            View
                          </span>
                          <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4 text-white/80" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-2 sm:p-3">
                    <h3 className="font-primary font-medium sm:font-semibold text-navy-800 text-xs sm:text-sm mb-0.5 sm:mb-1 truncate">
                      {image.caption}
                    </h3>
                    {image.features && image.features.length > 0 && (
                      <div className="flex flex-wrap gap-0.5 sm:gap-1">
                        {image.features.slice(0, 1).map((feature, idx) => (
                          <span key={idx} className="font-primary px-1.5 sm:px-2 py-0.5 bg-gradient-to-r from-navy-50 to-blue-50 text-navy-700 rounded-full text-xs border border-navy-100">
                            {feature}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-1 sm:gap-1.5 mt-4 sm:mt-6">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 ${Math.floor(sliderIndex / 2) === index ? "text-navy-600" : "text-gray-300"}`}
              >
                <Circle className={`w-2 h-2 sm:w-2.5 sm:h-2.5 ${Math.floor(sliderIndex / 2) === index ? "fill-current" : ""}`} />
              </button>
            ))}
          </div>

          <div className="text-center mt-2 sm:mt-3">
            <span className="font-primary text-xs sm:text-sm text-gray-600">
              {currentSlide} / {totalSlides}
            </span>
            <span className="font-primary text-xs text-gray-400 mx-1 sm:mx-2">•</span>
            <span className="font-primary text-xs text-gray-500">
              Showing 2 of {getPaginatedImages(section).length} images
            </span>
          </div>
        </div>

        {hasMoreImages(section) && !viewAllSections[section.id] && (
          <Pagination section={section} />
        )}

        {hasMoreImages(section) && (
          <div className="text-center">
            <button
              onClick={() => toggleViewAll(section.id)}
              className="font-primary inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-1.5 sm:py-2.5 bg-gradient-to-r from-navy-600 to-blue-600 text-white rounded-full text-xs sm:text-sm font-medium hover:shadow-md transition-all duration-300 active:scale-95"
            >
              {viewAllSections[section.id] ? "Show Less Images" : `View All ${section.images.length} Images`}
              <ChevronRight className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform ${viewAllSections[section.id] ? "rotate-180" : ""}`} />
            </button>
          </div>
        )}
      </div>
    );
  };

  const MobileGridView = ({ section }) => (
    <div className="px-3 sm:px-4 mb-6 sm:mb-8">
      <div className="mb-4 sm:mb-6">
        <h2 className="font-title text-xl sm:text-2xl font-bold text-navy-800 mb-1">{section.title}</h2>
        {section.subtitle && (
          <h3 className="font-primary text-lg sm:text-xl text-navy-600 font-semibold mb-2 sm:mb-3">
            {section.subtitle}
          </h3>
        )}
        {section.description && (
          <p className="font-primary text-gray-600 text-xs sm:text-sm mt-1 sm:mt-2">{section.description}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
        {getPaginatedImages(section).map((image) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            onClick={() => openModal(image, section)}
            className="bg-white rounded-lg shadow-sm sm:shadow-md overflow-hidden active:scale-[0.98] transition-transform border border-navy-100"
          >
            <div className="relative h-32 sm:h-36 overflow-hidden">
              <LazyImage
                src={image.image}
                alt={image.alt || image.caption}
                className="w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity">
                <div className="absolute bottom-1.5 sm:bottom-2 left-1.5 sm:left-2">
                  <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
              </div>
            </div>
            <div className="p-1.5 sm:p-2">
              <h3 className="font-primary font-medium text-navy-800 text-xs mb-0.5 sm:mb-1 truncate">
                {image.caption}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>

      {hasMoreImages(section) && !viewAllSections[section.id] && (
        <Pagination section={section} />
      )}

      {hasMoreImages(section) && (
        <div className="text-center">
          <button
            onClick={() => toggleViewAll(section.id)}
            className="font-primary inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-1.5 sm:py-2.5 bg-gradient-to-r from-navy-600 to-blue-600 text-white rounded-full text-xs sm:text-sm font-medium hover:shadow-md transition-all duration-300 active:scale-95"
          >
            {viewAllSections[section.id] ? "Show Less" : `View All ${section.images.length}`}
            <ChevronRight className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform ${viewAllSections[section.id] ? "rotate-180" : ""}`} />
          </button>
        </div>
      )}
    </div>
  );

  // Desktop Grid View Component
  const DesktopGridView = ({ section }) => (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {getPaginatedImages(section).map((image) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ y: -5 }}
            className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-md sm:shadow-lg hover:shadow-xl sm:hover:shadow-2xl transition-all duration-500 border border-navy-100 cursor-pointer"
            onClick={() => openModal(image, section)}
          >
            <div className="relative h-40 sm:h-48 md:h-56 lg:h-50 overflow-hidden">
              <LazyImage
                src={image.image}
                alt={image.alt || image.caption}
                className="w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 sm:from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                  <div className="flex items-center justify-between">
                    <span className="font-primary text-white text-xs sm:text-sm font-medium bg-black/50 px-2 sm:px-3 py-1 rounded-full">
                      #{image.id}
                    </span>
                    <span className="font-primary text-white/80 text-xs sm:text-sm">
                      {section.title}
                    </span>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-black/40 sm:bg-black/50 text-white p-1.5 sm:p-2 md:p-3 rounded-full">
                  <Eye className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                </div>
              </div>
            </div>

            <div className="p-3 sm:p-4 md:p-5">
              <h3 className="font-primary font-semibold text-navy-800 text-base sm:text-lg mb-1 sm:mb-2">
                {image.caption}
              </h3>
              {image.description && (
                <p className="font-primary text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2">
                  {image.description}
                </p>
              )}

              {image.features && image.features.length > 0 && (
                <div className="flex flex-wrap gap-1 sm:gap-2 mt-2 sm:mt-3">
                  {image.features.slice(0, 2).map((feature, idx) => (
                    <span
                      key={idx}
                      className="font-primary px-2 sm:px-3 py-0.5 sm:py-1 bg-gradient-to-r from-navy-50 to-blue-50 text-navy-700 rounded-full text-xs font-medium border border-navy-100"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              )}

              {image.icon && (
                <div className="flex items-center justify-between mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-navy-100">
                  <span className="text-xl sm:text-2xl">{image.icon}</span>
                  {image.duration && (
                    <span className="font-primary text-xs sm:text-sm text-gray-500 bg-gradient-to-br from-white to-gray-50 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border border-navy-100">
                      ⏱️ {image.duration}
                    </span>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {hasMoreImages(section) && !viewAllSections[section.id] && (
        <Pagination section={section} />
      )}

      {hasMoreImages(section) && (
        <div className="mt-6 sm:mt-8 flex justify-center">
          <button
            onClick={() => toggleViewAll(section.id)}
            className="font-primary inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-6 md:px-8 py-2 sm:py-3 bg-gradient-to-r from-navy-600 to-blue-600 text-white rounded-full text-sm sm:text-base font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-semibold">
              {viewAllSections[section.id] ? "Show Less Images" : `View All ${section.images.length} Images`}
            </span>
            <ChevronRight className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${viewAllSections[section.id] ? "rotate-180" : ""}`} />
          </button>
        </div>
      )}

      <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-navy-200">
        <p className="font-primary text-gray-600 text-xs sm:text-sm text-center">
          {viewAllSections[section.id] ? (
            <>
              Showing all{" "}
              <span className="font-semibold text-navy-700">
                {section.images.length}
              </span>{" "}
              images of {section.title}
            </>
          ) : (
            <>
              Showing{" "}
              <span className="font-semibold text-navy-700">
                {getPaginatedImages(section).length}
              </span>{" "}
              of {section.images.length} images
            </>
          )}
        </p>
      </div>
    </>
  );

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-navy-50/30 py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-navy-100/20 to-blue-100/10 rounded-full -translate-x-24 -translate-y-24"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-tl from-blue-100/10 to-navy-100/20 rounded-full translate-x-24 translate-y-24"></div>
        
        <div className="text-center relative z-10">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-navy-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading infrastructure...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-navy-50/30 py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-navy-100/20 to-blue-100/10 rounded-full -translate-x-24 -translate-y-24"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-tl from-blue-100/10 to-navy-100/20 rounded-full translate-x-24 translate-y-24"></div>
        
        <div className="text-center relative z-10">
          <p className="text-red-600 text-xl mb-4">⚠️ {error}</p>
          <button 
            onClick={fetchInfrastructure}
            className="px-6 py-2 bg-gradient-to-r from-navy-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const { header, footer } = data;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-navy-50/30 py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-navy-100/20 to-blue-100/10 rounded-full -translate-x-24 -translate-y-24"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-tl from-blue-100/10 to-navy-100/20 rounded-full translate-x-24 translate-y-24"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${header?.decorations?.dots?.[0]?.color || 'bg-navy-500'}`}></div>
            <h1 className="font-title text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gradient-navy">
              {header?.title || "Campus Infrastructure"}
            </h1>
            <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${header?.decorations?.dots?.[1]?.color || 'bg-navy-500'}`}></div>
          </div>

          <motion.div
            className={`h-1 sm:h-1.5 w-16 sm:w-20 md:w-24 bg-gradient-to-r ${header?.decorations?.lineColor || 'from-navy-600 via-blue-600 to-navy-600'} mx-auto mb-4 sm:mb-6 rounded-full`}
            initial={{ width: 0 }}
            animate={{ width: "4rem" }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          
          <p className="text-gray-700 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-2 sm:px-4">
            {header?.description || "Explore our state-of-the-art campus facilities and modern learning environments"}
          </p>
        </motion.div>

        {/* Desktop Sections */}
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 sm:mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-navy-600 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <Grid className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                  <Star className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-white" />
                </div>
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-navy-800">
                Explore Sections
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3">
              {filteredSections.map((section) => (
                <motion.button
                  key={section.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(section)}
                  className={`font-primary w-full md:w-50 px-3 sm:px-4 md:px-5 py-2 sm:py-3
                    rounded-lg text-xs sm:text-sm md:text-base font-medium
                    transition-all duration-300 hover:-translate-y-1
                    ${selectedSection?.id === section.id
                      ? "bg-gradient-to-r from-navy-600 to-blue-600 text-white shadow-lg scale-105"
                      : "bg-gradient-to-br from-white to-gray-50 text-gray-700 hover:bg-navy-50 border border-navy-100"
                    }`}
                >
                  <div className="flex items-center justify-center sm:justify-start gap-1 sm:gap-2">
                    <span className="truncate">{section.title}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Sections Display */}
        {filteredSections.length > 0 ? (
          filteredSections.map((section) => (
            <motion.div
              key={section.id}
              id={`section-${section.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-8 sm:mb-10 md:mb-12 scroll-mt-16 sm:scroll-mt-20 bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-navy-100 overflow-hidden"
            >
              {!isMobile && (
                <div className="p-4 sm:p-5 md:p-6 bg-gradient-to-r from-navy-50 to-blue-50 border-b border-navy-100">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="font-title text-xl sm:text-2xl md:text-3xl font-bold text-navy-800 mb-1 sm:mb-2">
                        {section.title}
                      </h2>
                      {section.subtitle && (
                        <h3 className="font-primary text-lg sm:text-xl text-navy-600 font-semibold mb-2 sm:mb-3">
                          {section.subtitle}
                        </h3>
                      )}
                      {section.description && (
                        <p className="font-primary text-gray-600 text-sm sm:text-base md:text-lg max-w-4xl leading-relaxed">
                          {section.description}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-br from-white to-gray-50 rounded-lg border border-navy-100">
                      <span className="text-xs sm:text-sm font-medium text-navy-700">
                        {section.images.length} Images
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="p-4 sm:p-5 md:p-6">
                {isMobile ? (
                  viewMode === "slider" ? (
                    <MobileSliderView section={section} />
                  ) : (
                    <MobileGridView section={section} />
                  )
                ) : (
                  <DesktopGridView section={section} />
                )}
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 bg-gradient-to-br from-white to-navy-50/50 rounded-2xl border border-navy-100 shadow-sm"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-navy-50 to-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-navy-100">
              <Search className="w-8 h-8 text-navy-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No facilities found
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        )}

        {/* Modal */}
        <AnimatePresence>
          {isModalOpen && selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4"
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative w-full max-w-5xl bg-white rounded-xl overflow-hidden shadow-2xl max-h-[90vh] sm:max-h-[85vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 bg-black/70 text-white p-1.5 sm:p-2 rounded-full hover:bg-black/90 transition-colors"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                </button>

                {/* Image Container */}
                <div className="flex-1 overflow-auto">
                  <div className="relative w-full min-h-[50vh] sm:min-h-[60vh] bg-gray-100">
                    <img
                      src={selectedImage.image}
                      alt={selectedImage.alt || selectedImage.caption}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' text-anchor='middle' fill='%23999'%3EImage Not Found%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  </div>

                  {/* Image Info */}
                  <div className="p-4 sm:p-5 md:p-6 bg-white">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-title text-lg sm:text-xl md:text-2xl font-bold text-navy-800 mb-1 sm:mb-2 break-words">
                          {selectedImage.caption}
                        </h3>
                        {selectedImage.description && (
                          <p className="font-primary text-gray-600 text-sm sm:text-base break-words">
                            {selectedImage.description}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="font-primary px-2 py-1 sm:px-3 sm:py-1 bg-gradient-to-r from-navy-600 to-blue-600 text-white rounded-full text-xs sm:text-sm whitespace-nowrap">
                          {selectedSection?.title}
                        </span>
                      </div>
                    </div>

                    {/* Image Metadata */}
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-navy-200">
                      <div className="flex items-center gap-2 text-gray-600 text-sm sm:text-base">
                        <span className="font-medium">Image ID:</span>
                        <span>#{selectedImage.id}</span>
                      </div>
                      {selectedImage.features && selectedImage.features.length > 0 && (
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          {selectedImage.features.map((feature, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-navy-50 text-navy-700 rounded-full text-xs"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Back to Top */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-8 sm:mt-10 flex justify-center"
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-primary px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-navy-600 to-blue-600 text-white rounded-full text-xs sm:text-sm font-medium hover:shadow-lg transition-all duration-300 flex items-center gap-1 sm:gap-2"
          >
            <ArrowUp className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
            {footer?.backToTop || "Back to Top"}
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default InfrastructurePage;


// import React, { useState, useEffect, useCallback, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import infrastructureData from "../../constant/Aboutus/infrastructureData";
// import { 
//   ChevronLeft, 
//   ChevronRight, 
//   X, 
//   Grid, 
//   Sliders, 
//   Home, 
//   ArrowUp, 
//   Circle, 
//   Maximize2, 
//   Eye,
//   Star,
//   Sparkles,
//   Cloud,
//   Heart,
//   MapPin,
//   Building,
//   Users,
//   Search,
//   Filter,
//   ZoomIn,
//   ZoomOut,
//   BookOpen,
//   Calendar,
//   Clock
// } from "lucide-react";

// // Custom LazyImage component
// const LazyImage = ({ src, alt, className, onClick }) => {
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [isError, setIsError] = useState(false);
//   const imgRef = useRef(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting && !isLoaded) {
//             const img = new Image();
//             img.src = src;
//             img.onload = () => setIsLoaded(true);
//             img.onerror = () => setIsError(true);
//             observer.disconnect();
//           }
//         });
//       },
//       {
//         rootMargin: '50px', // Start loading 50px before entering viewport
//         threshold: 0.1
//       }
//     );

//     if (imgRef.current) {
//       observer.observe(imgRef.current);
//     }

//     return () => {
//       if (imgRef.current) {
//         observer.unobserve(imgRef.current);
//       }
//     };
//   }, [src, isLoaded]);

//   return (
//     <div 
//       ref={imgRef} 
//       className={`relative overflow-hidden ${className}`}
//       onClick={onClick}
//     >
//       {/* Loading Placeholder */}
//       {!isLoaded && !isError && (
//         <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-navy-50/30">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-navy-600"></div>
//         </div>
//       )}

//       {/* Error Placeholder */}
//       {isError && (
//         <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-navy-50/30 p-4">
//           <div className="text-navy-400 mb-2">
//             <Image className="w-8 h-8" />
//           </div>
//           <p className="text-xs text-gray-500 text-center">Failed to load image</p>
//         </div>
//       )}

//       {/* Actual Image */}
//       <img
//         src={isLoaded ? src : ''}
//         alt={alt}
//         className={`w-full h-full object-cover transition-opacity duration-300 ${
//           isLoaded ? 'opacity-100' : 'opacity-0'
//         } ${isError ? 'hidden' : ''}`}
//         loading="lazy"
//         decoding="async"
//       />
//     </div>
//   );
// };

// const InfrastructurePage = () => {
//   const navigate = useNavigate();
//   const data = infrastructureData;

//   // State for selected section
//   const [selectedSection, setSelectedSection] = useState(data.sections[0]);
//   // State for modal
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   // State for mobile device detection
//   const [isMobile, setIsMobile] = useState(false);
//   // State for view mode (grid or slider) - MOBILE ONLY
//   const [viewMode, setViewMode] = useState("grid");
//   // State for slider current index
//   const [sliderIndex, setSliderIndex] = useState(0);
//   // Pagination state
//   const [currentPage, setCurrentPage] = useState({});
//   // Search state
//   const [searchTerm, setSearchTerm] = useState("");
//   // Filter state
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   // View all state for each section
//   const [viewAllSections, setViewAllSections] = useState({});

//   // Check if mobile on mount and resize
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   // Initialize states
//   useEffect(() => {
//     const initialPages = {};
//     const initialViewAll = {};
    
//     data.sections.forEach(section => {
//       initialPages[section.id] = 1;
//       initialViewAll[section.id] = false;
//     });
    
//     setCurrentPage(initialPages);
//     setViewAllSections(initialViewAll);
//   }, [data.sections]);

//   // Pagination configuration
//   const ITEMS_PER_PAGE = isMobile ? 6 : 8;

//   // Get categories
//   const categories = ["all", ...new Set(data.sections.map(section => section.category).filter(Boolean))];

//   // Filter sections
//   const filteredSections = data.sections.filter(section => {
//     const matchesSearch = searchTerm === "" || 
//       section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       section.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       section.images.some(img => 
//         img.caption.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         img.description?.toLowerCase().includes(searchTerm.toLowerCase())
//       );
    
//     const matchesCategory = selectedCategory === "all" || section.category === selectedCategory;
    
//     return matchesSearch && matchesCategory;
//   });

//   // Get paginated images for a section
//   const getPaginatedImages = (section) => {
//     const page = currentPage[section.id] || 1;
//     const startIndex = (page - 1) * ITEMS_PER_PAGE;
//     const endIndex = startIndex + ITEMS_PER_PAGE;
    
//     if (viewAllSections[section.id]) {
//       return section.images;
//     }
    
//     return section.images.slice(startIndex, endIndex);
//   };

//   // Get total pages for a section
//   const getTotalPages = (section) => {
//     if (viewAllSections[section.id]) {
//       return 1;
//     }
//     return Math.ceil(section.images.length / ITEMS_PER_PAGE);
//   };

//   // Handle page change
//   const handlePageChange = (sectionId, page) => {
//     setCurrentPage(prev => ({
//       ...prev,
//       [sectionId]: page
//     }));
//   };

//   // Function to open modal
//   const openModal = (image, section) => {
//     setSelectedImage(image);
//     setSelectedSection(section);
//     setIsModalOpen(true);
//     document.body.style.overflow = "hidden";
//   };

//   // Function to close modal
//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedImage(null);
//     document.body.style.overflow = "auto";
//   };

//   // Modal navigation
//   const nextImage = () => {
//     const currentIndex = selectedSection.images.findIndex(
//       (img) => img.id === selectedImage.id
//     );
//     const nextIndex = (currentIndex + 1) % selectedSection.images.length;
//     setSelectedImage(selectedSection.images[nextIndex]);
//   };

//   const prevImage = () => {
//     const currentIndex = selectedSection.images.findIndex(
//       (img) => img.id === selectedImage.id
//     );
//     const prevIndex =
//       (currentIndex - 1 + selectedSection.images.length) %
//       selectedSection.images.length;
//     setSelectedImage(selectedSection.images[prevIndex]);
//   };

//   // Toggle View All
//   const toggleViewAll = (sectionId) => {
//     setViewAllSections(prev => ({
//       ...prev,
//       [sectionId]: !prev[sectionId]
//     }));
//     setCurrentPage(prev => ({
//       ...prev,
//       [sectionId]: 1
//     }));
//   };

//   // Get slider images for mobile
//   const getSliderImages = (section) => {
//     const images = getPaginatedImages(section);
//     const visibleImages = [];

//     for (let i = sliderIndex; i < sliderIndex + 2 && i < images.length; i++) {
//       visibleImages.push(images[i]);
//     }

//     if (visibleImages.length === 1 && images.length > 1) {
//       visibleImages.push(images[0]);
//     }

//     return visibleImages;
//   };

//   // Slider navigation
//   const nextSlider = () => {
//     const images = getPaginatedImages(selectedSection);
//     setSliderIndex((prev) => (prev + 2) % images.length);
//   };

//   const prevSlider = () => {
//     const images = getPaginatedImages(selectedSection);
//     setSliderIndex((prev) => (prev - 2 + images.length) % images.length);
//   };

//   const goToSlide = (index) => {
//     setSliderIndex(index * 2);
//   };

//   // Check if section has more images
//   const hasMoreImages = (section) => {
//     return section.images.length > ITEMS_PER_PAGE;
//   };

//   // Scroll to section
//   const scrollToSection = useCallback((section) => {
//     setSelectedSection(section);
//     setSliderIndex(0);

//     setTimeout(() => {
//       const element = document.getElementById(`section-${section.id}`);
//       if (element) {
//         const headerOffset = isMobile ? 100 : 150;
//         const elementPosition = element.getBoundingClientRect().top;
//         const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

//         window.scrollTo({
//           top: offsetPosition,
//           behavior: "smooth"
//         });
//       }
//     }, 100);
//   }, [isMobile]);

//   // Keyboard navigation
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (!isModalOpen) return;
//       if (e.key === "Escape") closeModal();
//       if (e.key === "ArrowRight") nextImage();
//       if (e.key === "ArrowLeft") prevImage();
//     };
//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [isModalOpen, selectedImage]);

//   // Calculate slide groups
//   const getSlideGroupsCount = (section) => {
//     const images = getPaginatedImages(section);
//     return Math.ceil(images.length / 2);
//   };

//   // Get current slide group
//   const getCurrentSlideGroup = () => {
//     return Math.floor(sliderIndex / 2) + 1;
//   };

//   // Pagination Component
//   const Pagination = ({ section }) => {
//     const totalPages = getTotalPages(section);
//     const currentPageNum = currentPage[section.id] || 1;

//     if (totalPages <= 1 || viewAllSections[section.id]) return null;

//     return (
//       <div className="mt-6 flex flex-col items-center gap-4">
//         <div className="flex items-center gap-2">
//           <button
//             onClick={() => handlePageChange(section.id, currentPageNum - 1)}
//             disabled={currentPageNum === 1}
//             className="p-2 rounded-lg border border-navy-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-navy-50 transition-colors"
//           >
//             <ChevronLeft className="w-4 h-4 text-navy-600" />
//           </button>

//           <div className="flex items-center gap-2">
//             {Array.from({ length: Math.min(5, totalPages) }).map((_, index) => {
//               let pageNum;
//               if (totalPages <= 5) {
//                 pageNum = index + 1;
//               } else if (currentPageNum <= 3) {
//                 pageNum = index + 1;
//               } else if (currentPageNum >= totalPages - 2) {
//                 pageNum = totalPages - 4 + index;
//               } else {
//                 pageNum = currentPageNum - 2 + index;
//               }

//               return (
//                 <button
//                   key={pageNum}
//                   onClick={() => handlePageChange(section.id, pageNum)}
//                   className={`w-8 h-8 rounded-lg font-medium transition-all ${
//                     currentPageNum === pageNum
//                       ? "bg-gradient-to-r from-navy-600 to-blue-600 text-white"
//                       : "bg-gradient-to-br from-white to-gray-50 text-gray-700 hover:bg-navy-50 border border-navy-100"
//                   }`}
//                 >
//                   {pageNum}
//                 </button>
//               );
//             })}
//           </div>

//           <button
//             onClick={() => handlePageChange(section.id, currentPageNum + 1)}
//             disabled={currentPageNum === totalPages}
//             className="p-2 rounded-lg border border-navy-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-navy-50 transition-colors"
//           >
//             <ChevronRight className="w-4 h-4 text-navy-600" />
//           </button>
//         </div>

//         <div className="text-sm text-gray-600">
//           Page {currentPageNum} of {totalPages} • Showing {getPaginatedImages(section).length} of {section.images.length} images
//         </div>
//       </div>
//     );
//   };

//   // Mobile Views
//   const MobileSliderView = ({ section }) => {
//     const sliderImages = getSliderImages(section);
//     const totalSlides = getSlideGroupsCount(section);
//     const currentSlide = getCurrentSlideGroup();

//     return (
//       <div className="px-3 sm:px-4 mb-6 sm:mb-8">
//         <div className="mb-4 sm:mb-6">
//           <h2 className="font-title text-xl sm:text-2xl font-bold text-navy-800 mb-1">{section.title}</h2>
//           {section.subtitle && (
//             <h3 className="font-primary text-lg sm:text-xl text-navy-600 font-semibold mb-2 sm:mb-3">
//               {section.subtitle}
//             </h3>
//           )}
//           {section.description && (
//             <p className="font-primary text-gray-600 text-xs sm:text-sm mt-1 sm:mt-2">{section.description}</p>
//           )}
//         </div>

//         <div className="relative mb-4 sm:mb-6">
//           <button
//             onClick={prevSlider}
//             className="absolute left-0 sm:left-1 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 shadow-lg rounded-full flex items-center justify-center hover:bg-white transition-colors -translate-x-1 sm:-translate-x-2"
//             disabled={selectedSection.images.length <= 2}
//           >
//             <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 text-navy-700" />
//           </button>

//           <button
//             onClick={nextSlider}
//             className="absolute right-0 sm:right-1 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 shadow-lg rounded-full flex items-center justify-center hover:bg-white transition-colors translate-x-1 sm:translate-x-2"
//             disabled={selectedSection.images.length <= 2}
//           >
//             <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-navy-700" />
//           </button>

//           <div className="flex gap-2 sm:gap-3 overflow-hidden px-0.5 sm:px-1">
//             {sliderImages.map((image, idx) => (
//               <div
//                 key={`${image.id}-${idx}`}
//                 className="flex-1 min-w-0"
//               >
//                 <div
//                   onClick={() => openModal(image, section)}
//                   className="bg-white rounded-lg sm:rounded-xl shadow-md sm:shadow-lg overflow-hidden active:scale-[0.98] transition-transform border border-navy-100"
//                 >
//                   <div className="relative h-36 sm:h-44 overflow-hidden">
//                     <LazyImage
//                       src={image.image}
//                       alt={image.alt || image.caption}
//                       className="w-full h-full"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
//                       <div className="p-2 sm:p-3 w-full">
//                         <div className="flex items-center justify-between">
//                           <span className="font-primary text-white text-xs font-medium bg-black/50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
//                             View
//                           </span>
//                           <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4 text-white/80" />
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="p-2 sm:p-3">
//                     <h3 className="font-primary font-medium sm:font-semibold text-navy-800 text-xs sm:text-sm mb-0.5 sm:mb-1 truncate">
//                       {image.caption}
//                     </h3>
//                     {image.features && image.features.length > 0 && (
//                       <div className="flex flex-wrap gap-0.5 sm:gap-1">
//                         {image.features.slice(0, 1).map((feature, idx) => (
//                           <span key={idx} className="font-primary px-1.5 sm:px-2 py-0.5 bg-gradient-to-r from-navy-50 to-blue-50 text-navy-700 rounded-full text-xs border border-navy-100">
//                             {feature}
//                           </span>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="flex justify-center gap-1 sm:gap-1.5 mt-4 sm:mt-6">
//             {Array.from({ length: totalSlides }).map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => goToSlide(index)}
//                 className={`transition-all duration-300 ${Math.floor(sliderIndex / 2) === index ? "text-navy-600" : "text-gray-300"}`}
//               >
//                 <Circle className={`w-2 h-2 sm:w-2.5 sm:h-2.5 ${Math.floor(sliderIndex / 2) === index ? "fill-current" : ""}`} />
//               </button>
//             ))}
//           </div>

//           <div className="text-center mt-2 sm:mt-3">
//             <span className="font-primary text-xs sm:text-sm text-gray-600">
//               {currentSlide} / {totalSlides}
//             </span>
//             <span className="font-primary text-xs text-gray-400 mx-1 sm:mx-2">•</span>
//             <span className="font-primary text-xs text-gray-500">
//               Showing 2 of {getPaginatedImages(section).length} images
//             </span>
//           </div>
//         </div>

//         {hasMoreImages(section) && !viewAllSections[section.id] && (
//           <Pagination section={section} />
//         )}

//         {hasMoreImages(section) && (
//           <div className="text-center">
//             <button
//               onClick={() => toggleViewAll(section.id)}
//               className="font-primary inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-1.5 sm:py-2.5 bg-gradient-to-r from-navy-600 to-blue-600 text-white rounded-full text-xs sm:text-sm font-medium hover:shadow-md transition-all duration-300 active:scale-95"
//             >
//               {viewAllSections[section.id] ? "Show Less Images" : `View All ${section.images.length} Images`}
//               <ChevronRight className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform ${viewAllSections[section.id] ? "rotate-180" : ""}`} />
//             </button>
//           </div>
//         )}
//       </div>
//     );
//   };

//   const MobileGridView = ({ section }) => (
//     <div className="px-3 sm:px-4 mb-6 sm:mb-8">
//       <div className="mb-4 sm:mb-6">
//         <h2 className="font-title text-xl sm:text-2xl font-bold text-navy-800 mb-1">{section.title}</h2>
//         {section.subtitle && (
//           <h3 className="font-primary text-lg sm:text-xl text-navy-600 font-semibold mb-2 sm:mb-3">
//             {section.subtitle}
//           </h3>
//         )}
//         {section.description && (
//           <p className="font-primary text-gray-600 text-xs sm:text-sm mt-1 sm:mt-2">{section.description}</p>
//         )}
//       </div>

//       <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
//         {getPaginatedImages(section).map((image) => (
//           <motion.div
//             key={image.id}
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.3 }}
//             onClick={() => openModal(image, section)}
//             className="bg-white rounded-lg shadow-sm sm:shadow-md overflow-hidden active:scale-[0.98] transition-transform border border-navy-100"
//           >
//             <div className="relative h-32 sm:h-36 overflow-hidden">
//               <LazyImage
//                 src={image.image}
//                 alt={image.alt || image.caption}
//                 className="w-full h-full"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity">
//                 <div className="absolute bottom-1.5 sm:bottom-2 left-1.5 sm:left-2">
//                   <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
//                 </div>
//               </div>
//             </div>
//             <div className="p-1.5 sm:p-2">
//               <h3 className="font-primary font-medium text-navy-800 text-xs mb-0.5 sm:mb-1 truncate">
//                 {image.caption}
//               </h3>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {hasMoreImages(section) && !viewAllSections[section.id] && (
//         <Pagination section={section} />
//       )}

//       {hasMoreImages(section) && (
//         <div className="text-center">
//           <button
//             onClick={() => toggleViewAll(section.id)}
//             className="font-primary inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-1.5 sm:py-2.5 bg-gradient-to-r from-navy-600 to-blue-600 text-white rounded-full text-xs sm:text-sm font-medium hover:shadow-md transition-all duration-300 active:scale-95"
//           >
//             {viewAllSections[section.id] ? "Show Less" : `View All ${section.images.length}`}
//             <ChevronRight className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform ${viewAllSections[section.id] ? "rotate-180" : ""}`} />
//           </button>
//         </div>
//       )}
//     </div>
//   );

//   // Desktop Grid View Component
//   const DesktopGridView = ({ section }) => (
//     <>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
//         {getPaginatedImages(section).map((image) => (
//           <motion.div
//             key={image.id}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.4 }}
//             whileHover={{ y: -5 }}
//             className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-md sm:shadow-lg hover:shadow-xl sm:hover:shadow-2xl transition-all duration-500 border border-navy-100 cursor-pointer"
//             onClick={() => openModal(image, section)}
//           >
//             <div className="relative h-40 sm:h-48 md:h-56 lg:h-50 overflow-hidden">
//               <LazyImage
//                 src={image.image}
//                 alt={image.alt || image.caption}
//                 className="w-full h-full"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/60 sm:from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                 <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
//                   <div className="flex items-center justify-between">
//                     <span className="font-primary text-white text-xs sm:text-sm font-medium bg-black/50 px-2 sm:px-3 py-1 rounded-full">
//                       #{image.id}
//                     </span>
//                     <span className="font-primary text-white/80 text-xs sm:text-sm">
//                       {section.title}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//               <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                 <div className="bg-black/40 sm:bg-black/50 text-white p-1.5 sm:p-2 md:p-3 rounded-full">
//                   <Eye className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
//                 </div>
//               </div>
//             </div>

//             <div className="p-3 sm:p-4 md:p-5">
//               <h3 className="font-primary font-semibold text-navy-800 text-base sm:text-lg mb-1 sm:mb-2">
//                 {image.caption}
//               </h3>
//               {image.description && (
//                 <p className="font-primary text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2">
//                   {image.description}
//                 </p>
//               )}

//               {image.features && image.features.length > 0 && (
//                 <div className="flex flex-wrap gap-1 sm:gap-2 mt-2 sm:mt-3">
//                   {image.features.slice(0, 2).map((feature, idx) => (
//                     <span
//                       key={idx}
//                       className="font-primary px-2 sm:px-3 py-0.5 sm:py-1 bg-gradient-to-r from-navy-50 to-blue-50 text-navy-700 rounded-full text-xs font-medium border border-navy-100"
//                     >
//                       {feature}
//                     </span>
//                   ))}
//                 </div>
//               )}

//               {image.icon && (
//                 <div className="flex items-center justify-between mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-navy-100">
//                   <span className="text-xl sm:text-2xl">{image.icon}</span>
//                   {image.duration && (
//                     <span className="font-primary text-xs sm:text-sm text-gray-500 bg-gradient-to-br from-white to-gray-50 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border border-navy-100">
//                       ⏱️ {image.duration}
//                     </span>
//                   )}
//                 </div>
//               )}
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {hasMoreImages(section) && !viewAllSections[section.id] && (
//         <Pagination section={section} />
//       )}

//       {hasMoreImages(section) && (
//         <div className="mt-6 sm:mt-8 flex justify-center">
//           <button
//             onClick={() => toggleViewAll(section.id)}
//             className="font-primary inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-6 md:px-8 py-2 sm:py-3 bg-gradient-to-r from-navy-600 to-blue-600 text-white rounded-full text-sm sm:text-base font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
//           >
//             <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
//             <span className="font-semibold">
//               {viewAllSections[section.id] ? "Show Less Images" : `View All ${section.images.length} Images`}
//             </span>
//             <ChevronRight className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${viewAllSections[section.id] ? "rotate-180" : ""}`} />
//           </button>
//         </div>
//       )}

//       <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-navy-200">
//         <p className="font-primary text-gray-600 text-xs sm:text-sm text-center">
//           {viewAllSections[section.id] ? (
//             <>
//               Showing all{" "}
//               <span className="font-semibold text-navy-700">
//                 {section.images.length}
//               </span>{" "}
//               images of {section.title}
//             </>
//           ) : (
//             <>
//               Showing{" "}
//               <span className="font-semibold text-navy-700">
//                 {getPaginatedImages(section).length}
//               </span>{" "}
//               of {section.images.length} images
//             </>
//           )}
//         </p>
//       </div>
//     </>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white to-navy-50/30 py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
//       {/* Background elements */}
//       <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-navy-100/20 to-blue-100/10 rounded-full -translate-x-24 -translate-y-24"></div>
//       <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-tl from-blue-100/10 to-navy-100/20 rounded-full translate-x-24 translate-y-24"></div>

//       <div className="max-w-7xl mx-auto relative z-10">
//         {/* Header */}
//         <motion.div
//           className="text-center mb-8 sm:mb-12 md:mb-16"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           <div className="inline-flex items-center gap-3 mb-4">
//             <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-500"></div>
//             <h1 className="font-title text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gradient-navy">
//               Campus Infrastructure
//             </h1>
//             <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-500"></div>
//           </div>

//           <motion.div
//             className="h-1 sm:h-1.5 w-16 sm:w-20 md:w-24 bg-gradient-to-r from-navy-600 via-blue-600 to-navy-600 mx-auto mb-4 sm:mb-6 rounded-full"
//             initial={{ width: 0 }}
//             animate={{ width: "4rem" }}
//             transition={{ duration: 0.8, delay: 0.3 }}
//           />
          
//           <p className="text-gray-700 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-2 sm:px-4">
//             Explore our state-of-the-art campus facilities and modern learning environments
//           </p>
//         </motion.div>

       

//         {/* Desktop Sections */}
//         {!isMobile && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="mb-8 sm:mb-12"
//           >
//             <div className="flex items-center gap-3 mb-4">
//               <div className="relative">
//                 <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-navy-600 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center">
//                   <Grid className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
//                 </div>
//                 <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
//                   <Star className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-white" />
//                 </div>
//               </div>
//               <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-navy-800">
//                 Explore Sections
//               </h2>
//             </div>

//             <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3">
//               {filteredSections.map((section) => (
//                 <motion.button
//                   key={section.id}
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ duration: 0.3 }}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => scrollToSection(section)}
//                   className={`font-primary w-full md:w-50 px-3 sm:px-4 md:px-5 py-2 sm:py-3
//                     rounded-lg text-xs sm:text-sm md:text-base font-medium
//                     transition-all duration-300 hover:-translate-y-1
//                     ${selectedSection.id === section.id
//                       ? "bg-gradient-to-r from-navy-600 to-blue-600 text-white shadow-lg scale-105"
//                       : "bg-gradient-to-br from-white to-gray-50 text-gray-700 hover:bg-navy-50 border border-navy-100"
//                     }`}
//                 >
//                   <div className="flex items-center justify-center sm:justify-start gap-1 sm:gap-2">
//                     <span className="truncate">{section.title}</span>
//                   </div>
//                 </motion.button>
//               ))}
//             </div>
//           </motion.div>
//         )}

//         {/* Sections Display */}
//         {filteredSections.length > 0 ? (
//           filteredSections.map((section) => (
//             <motion.div
//               key={section.id}
//               id={`section-${section.id}`}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               viewport={{ once: true }}
//               className="mb-8 sm:mb-10 md:mb-12 scroll-mt-16 sm:scroll-mt-20 bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-navy-100 overflow-hidden"
//             >
//               {!isMobile && (
//                 <div className="p-4 sm:p-5 md:p-6 bg-gradient-to-r from-navy-50 to-blue-50 border-b border-navy-100">
//                   <div className="flex items-start justify-between gap-4">
//                     <div>
//                       <h2 className="font-title text-xl sm:text-2xl md:text-3xl font-bold text-navy-800 mb-1 sm:mb-2">
//                         {section.title}
//                       </h2>
//                       {section.subtitle && (
//                         <h3 className="font-primary text-lg sm:text-xl text-navy-600 font-semibold mb-2 sm:mb-3">
//                           {section.subtitle}
//                         </h3>
//                       )}
//                       {section.description && (
//                         <p className="font-primary text-gray-600 text-sm sm:text-base md:text-lg max-w-4xl leading-relaxed">
//                           {section.description}
//                         </p>
//                       )}
//                     </div>
//                     <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-br from-white to-gray-50 rounded-lg border border-navy-100">
//                       <span className="text-xs sm:text-sm font-medium text-navy-700">
//                         {section.images.length} Images
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               <div className="p-4 sm:p-5 md:p-6">
//                 {isMobile ? (
//                   viewMode === "slider" ? (
//                     <MobileSliderView section={section} />
//                   ) : (
//                     <MobileGridView section={section} />
//                   )
//                 ) : (
//                   <DesktopGridView section={section} />
//                 )}
//               </div>
//             </motion.div>
//           ))
//         ) : (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="text-center py-12 bg-gradient-to-br from-white to-navy-50/50 rounded-2xl border border-navy-100 shadow-sm"
//           >
//             <div className="w-16 h-16 bg-gradient-to-br from-navy-50 to-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-navy-100">
//               <Search className="w-8 h-8 text-navy-400" />
//             </div>
//             <h3 className="text-lg font-semibold text-gray-700 mb-2">
//               No facilities found
//             </h3>
//             <p className="text-gray-500 max-w-md mx-auto">
//               Try adjusting your search or filter criteria
//             </p>
//           </motion.div>
//         )}

//         {/* Modal */}
//         <AnimatePresence>
//           {isModalOpen && selectedImage && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
//               onClick={closeModal}
//             >
//               <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-black/90 to-black/80 backdrop-blur-sm border-b border-white/10 z-50 p-4">
//                 <div className="max-w-7xl mx-auto flex items-center justify-between">
//                   <div className="flex items-center gap-4">
//                     <button
//                       onClick={closeModal}
//                       className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors active:scale-95"
//                     >
//                       <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
//                     </button>

//                     <div className="text-white">
//                       <h3 className="font-semibold text-sm sm:text-base truncate max-w-[200px] sm:max-w-md">
//                         {selectedImage.caption}
//                       </h3>
//                       <p className="text-xs text-white/70">
//                         Image {selectedSection.images.findIndex(img => img.id === selectedImage.id) + 1} of {selectedSection.images.length} • {selectedSection.title}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-2">
//                     <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-lg p-1 border border-white/10">
//                       <button
//                         onClick={prevImage}
//                         disabled={selectedSection.images.findIndex(img => img.id === selectedImage.id) === 0}
//                         className={`p-2 rounded transition-colors ${selectedSection.images.findIndex(img => img.id === selectedImage.id) === 0 
//                             ? 'opacity-40 cursor-not-allowed' 
//                             : 'hover:bg-white/20 active:scale-95'
//                           }`}
//                       >
//                         <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//                       </button>
                      
//                       <div className="px-2 text-xs text-white/80 font-medium">
//                         {selectedSection.images.findIndex(img => img.id === selectedImage.id) + 1}/{selectedSection.images.length}
//                       </div>
                      
//                       <button
//                         onClick={nextImage}
//                         disabled={selectedSection.images.findIndex(img => img.id === selectedImage.id) === selectedSection.images.length - 1}
//                         className={`p-2 rounded transition-colors ${selectedSection.images.findIndex(img => img.id === selectedImage.id) === selectedSection.images.length - 1
//                             ? 'opacity-40 cursor-not-allowed' 
//                             : 'hover:bg-white/20 active:scale-95'
//                           }`}
//                       >
//                         <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="w-full h-full pt-16 flex items-center justify-center p-4">
//                 <div className="relative w-full max-w-5xl h-[85vh] bg-white rounded-xl overflow-hidden shadow-2xl border border-navy-200">
//                   <img
//                     src={selectedImage.image}
//                     alt={selectedImage.alt || selectedImage.caption}
//                     className="w-full h-full object-contain"
//                   />
                  
//                   <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
//                     <div className="max-w-4xl mx-auto">
//                       <h3 className="font-title text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">
//                         {selectedImage.caption}
//                       </h3>
//                       {selectedImage.description && (
//                         <p className="font-primary text-gray-300 text-sm sm:text-base md:text-lg">
//                           {selectedImage.description}
//                         </p>
//                       )}
                      
//                       {selectedImage.features &&
//                         selectedImage.features.length > 0 && (
//                           <div className="mt-2 sm:mt-3 pt-2 border-t border-gray-700">
//                             <div className="flex flex-wrap gap-1 sm:gap-2">
//                               {selectedImage.features.map((feature, idx) => (
//                                 <span
//                                   key={idx}
//                                   className="font-primary px-2 sm:px-3 py-0.5 sm:py-1 bg-gray-700 text-gray-200 rounded-full text-xs sm:text-sm"
//                                 >
//                                   {feature}
//                                 </span>
//                               ))}
//                             </div>
//                           </div>
//                         )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Back to Top */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.6, delay: 0.5 }}
//           viewport={{ once: true }}
//           className="mt-8 sm:mt-10 flex justify-center"
//         >
//           <button
//             onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//             className="font-primary px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-navy-600 to-blue-600 text-white rounded-full text-xs sm:text-sm font-medium hover:shadow-lg transition-all duration-300 flex items-center gap-1 sm:gap-2"
//           >
//             <ArrowUp className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
//             Back to Top
//           </button>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default InfrastructurePage;


// import React, { useState, useEffect, useCallback, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import infrastructureData from "../../constant/Aboutus/infrastructureData";
// import { Image } from "lucide-react"; // Add this to your imports
// import { 
//   ChevronLeft, 
//   ChevronRight, 
//   X, 
//   Grid, 
//   Sliders, 
//   Home, 
//   ArrowUp, 
//   Circle, 
//   Maximize2, 
//   Eye,
//   Star,
//   Sparkles,
//   Cloud,
//   Heart,
//   MapPin,
//   Building,
//   Users,
//   Search,
//   Filter,
//   ZoomIn,
//   ZoomOut,
//   BookOpen,
//   Calendar,
//   Clock
// } from "lucide-react";
// import axiosInstance from "../../services/api"; // Update this import path based on your project structure

// // Custom LazyImage component
// const LazyImage = ({ src, alt, className, onClick }) => {
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [isError, setIsError] = useState(false);
//   const imgRef = useRef(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting && !isLoaded) {
//             const img = new Image();
//             img.src = src;
//             img.onload = () => setIsLoaded(true);
//             img.onerror = () => setIsError(true);
//             observer.disconnect();
//           }
//         });
//       },
//       {
//         rootMargin: '50px', // Start loading 50px before entering viewport
//         threshold: 0.1
//       }
//     );

//     if (imgRef.current) {
//       observer.observe(imgRef.current);
//     }

//     return () => {
//       if (imgRef.current) {
//         observer.unobserve(imgRef.current);
//       }
//     };
//   }, [src, isLoaded]);

//   return (
//     <div 
//       ref={imgRef} 
//       className={`relative overflow-hidden ${className}`}
//       onClick={onClick}
//     >
//       {/* Loading Placeholder */}
//       {!isLoaded && !isError && (
//         <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-navy-50/30">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-navy-600"></div>
//         </div>
//       )}

//       {/* Error Placeholder */}
// {isError && (
//   <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-navy-50/30 p-4">
//     <div className="text-navy-400 mb-2">
//       <div className="w-8 h-8 bg-navy-200 rounded-full flex items-center justify-center">
//         <span className="text-navy-500 text-xs">⚠️</span>
//       </div>
//     </div>
//     <p className="text-xs text-gray-500 text-center">Failed to load image</p>
//   </div>
// )}

//       {/* Actual Image */}
//       <img
//         src={isLoaded ? src : ''}
//         alt={alt}
//         className={`w-full h-full object-cover transition-opacity duration-300 ${
//           isLoaded ? 'opacity-100' : 'opacity-0'
//         } ${isError ? 'hidden' : ''}`}
//         loading="lazy"
//         decoding="async"
//       />
//     </div>
//   );
// };

// const InfrastructurePage = () => {
//   const navigate = useNavigate();
//   const [apiData, setApiData] = useState({
//     infrastructure: {
//       id: "infrastructure-section",
//       header: {
//         title: infrastructureData.header?.title || "Campus Infrastructure",
//         description: infrastructureData.header?.description || "Explore our state-of-the-art campus facilities and modern learning environments",
//         decorations: {
//           dots: infrastructureData.header?.decorations?.dots || [
//             { color: "bg-navy-500" },
//             { color: "bg-navy-500" }
//           ],
//           lineColor: infrastructureData.header?.decorations?.lineColor || "from-navy-600 via-blue-600 to-navy-600"
//         }
//       },
//       sections: infrastructureData.sections || [],
//       footer: {
//         text: infrastructureData.footer?.text || "Explore Our Campus",
//         backToTop: infrastructureData.footer?.backToTop || "Back to Top",
//         decorations: {
//           lineColor: infrastructureData.footer?.decorations?.lineColor || "from-transparent via-navy-400 to-transparent"
//         }
//       }
//     }
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const data = apiData.infrastructure;

//   // State for selected section
//   const [selectedSection, setSelectedSection] = useState(data.sections[0] || {});
//   // State for modal
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   // State for mobile device detection
//   const [isMobile, setIsMobile] = useState(false);
//   // State for view mode (grid or slider) - MOBILE ONLY
//   const [viewMode, setViewMode] = useState("grid");
//   // State for slider current index
//   const [sliderIndex, setSliderIndex] = useState(0);
//   // Pagination state
//   const [currentPage, setCurrentPage] = useState({});
//   // Search state
//   const [searchTerm, setSearchTerm] = useState("");
//   // Filter state
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   // View all state for each section
//   const [viewAllSections, setViewAllSections] = useState({});

//   useEffect(() => {
//     fetchInfrastructure();
//   }, []);

//   const fetchInfrastructure = async () => {
//     try {
//       setLoading(true);
//       const response = await axiosInstance.get('/infrastructure');
      
//       if (response.data.success) {
//         const apiDataResponse = response.data.data;
        
//         // Process the API data - fix image URLs
//         const processedData = {
//           infrastructure: {
//             id: apiDataResponse.infrastructure?.id || "infrastructure-section",
//             header: {
//               title: apiDataResponse.infrastructure?.header?.title || "Campus Infrastructure",
//               description: apiDataResponse.infrastructure?.header?.description || "Explore our state-of-the-art campus facilities and modern learning environments",
//               decorations: {
//                 dots: apiDataResponse.infrastructure?.header?.decorations?.dots || [
//                   { color: "bg-navy-500" },
//                   { color: "bg-navy-500" }
//                 ],
//                 lineColor: apiDataResponse.infrastructure?.header?.decorations?.lineColor || "from-navy-600 via-blue-600 to-navy-600"
//               }
//             },
//             sections: apiDataResponse.infrastructure?.sections?.length > 0 
//               ? apiDataResponse.infrastructure.sections.map(section => ({
//                   ...section,
//                   images: section.images?.map(img => ({
//                     ...img,
//                     image: img.image?.replace(/\\\//g, '/') || img.image
//                   })) || []
//                 }))
//               : infrastructureData.sections || [],
//             footer: {
//               text: apiDataResponse.infrastructure?.footer?.text || "Explore Our Campus",
//               backToTop: apiDataResponse.infrastructure?.footer?.backToTop || "Back to Top",
//               decorations: {
//                 lineColor: apiDataResponse.infrastructure?.footer?.decorations?.lineColor || "from-transparent via-navy-400 to-transparent"
//               }
//             }
//           }
//         };
        
//         setApiData(processedData);
//         setSelectedSection(processedData.infrastructure.sections[0] || {});
//         setError(null);
//       }
//     } catch (err) {
//       console.error('Error fetching infrastructure:', err);
//       setError('Failed to load infrastructure information');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Check if mobile on mount and resize
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   // Initialize states
//   useEffect(() => {
//     if (data.sections && data.sections.length > 0) {
//       const initialPages = {};
//       const initialViewAll = {};
      
//       data.sections.forEach(section => {
//         initialPages[section.id || section.title] = 1;
//         initialViewAll[section.id || section.title] = false;
//       });
      
//       setCurrentPage(initialPages);
//       setViewAllSections(initialViewAll);
//       setSelectedSection(data.sections[0]);
//     }
//   }, [data.sections]);

//   // Pagination configuration
//   const ITEMS_PER_PAGE = isMobile ? 6 : 8;

//   // Get categories
//   const categories = ["all", ...new Set(data.sections.map(section => section.category).filter(Boolean))];

//   // Filter sections
//   const filteredSections = data.sections.filter(section => {
//     const matchesSearch = searchTerm === "" || 
//       section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       section.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       section.images.some(img => 
//         img.caption.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         img.description?.toLowerCase().includes(searchTerm.toLowerCase())
//       );
    
//     const matchesCategory = selectedCategory === "all" || section.category === selectedCategory;
    
//     return matchesSearch && matchesCategory;
//   });

//   // Get paginated images for a section
//   const getPaginatedImages = (section) => {
//     const page = currentPage[section.id || section.title] || 1;
//     const startIndex = (page - 1) * ITEMS_PER_PAGE;
//     const endIndex = startIndex + ITEMS_PER_PAGE;
    
//     if (viewAllSections[section.id || section.title]) {
//       return section.images;
//     }
    
//     return section.images.slice(startIndex, endIndex);
//   };

//   // Get total pages for a section
//   const getTotalPages = (section) => {
//     if (viewAllSections[section.id || section.title]) {
//       return 1;
//     }
//     return Math.ceil(section.images.length / ITEMS_PER_PAGE);
//   };

//   // Handle page change
//   const handlePageChange = (sectionId, page) => {
//     setCurrentPage(prev => ({
//       ...prev,
//       [sectionId]: page
//     }));
//   };

//   // Function to open modal
//   const openModal = (image, section) => {
//     setSelectedImage(image);
//     setSelectedSection(section);
//     setIsModalOpen(true);
//     document.body.style.overflow = "hidden";
//   };

//   // Function to close modal
//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedImage(null);
//     document.body.style.overflow = "auto";
//   };

//   // Modal navigation
//   const nextImage = () => {
//     const currentIndex = selectedSection.images.findIndex(
//       (img) => img.id === selectedImage.id
//     );
//     const nextIndex = (currentIndex + 1) % selectedSection.images.length;
//     setSelectedImage(selectedSection.images[nextIndex]);
//   };

//   const prevImage = () => {
//     const currentIndex = selectedSection.images.findIndex(
//       (img) => img.id === selectedImage.id
//     );
//     const prevIndex =
//       (currentIndex - 1 + selectedSection.images.length) %
//       selectedSection.images.length;
//     setSelectedImage(selectedSection.images[prevIndex]);
//   };

//   // Toggle View All
//   const toggleViewAll = (sectionId) => {
//     setViewAllSections(prev => ({
//       ...prev,
//       [sectionId]: !prev[sectionId]
//     }));
//     setCurrentPage(prev => ({
//       ...prev,
//       [sectionId]: 1
//     }));
//   };

//   // Get slider images for mobile
//   const getSliderImages = (section) => {
//     const images = getPaginatedImages(section);
//     const visibleImages = [];

//     for (let i = sliderIndex; i < sliderIndex + 2 && i < images.length; i++) {
//       visibleImages.push(images[i]);
//     }

//     if (visibleImages.length === 1 && images.length > 1) {
//       visibleImages.push(images[0]);
//     }

//     return visibleImages;
//   };

//   // Slider navigation
//   const nextSlider = () => {
//     const images = getPaginatedImages(selectedSection);
//     setSliderIndex((prev) => (prev + 2) % images.length);
//   };

//   const prevSlider = () => {
//     const images = getPaginatedImages(selectedSection);
//     setSliderIndex((prev) => (prev - 2 + images.length) % images.length);
//   };

//   const goToSlide = (index) => {
//     setSliderIndex(index * 2);
//   };

//   // Check if section has more images
//   const hasMoreImages = (section) => {
//     return section.images.length > ITEMS_PER_PAGE;
//   };

//   // Scroll to section
//   const scrollToSection = useCallback((section) => {
//     setSelectedSection(section);
//     setSliderIndex(0);

//     setTimeout(() => {
//       const element = document.getElementById(`section-${section.id || section.title}`);
//       if (element) {
//         const headerOffset = isMobile ? 100 : 150;
//         const elementPosition = element.getBoundingClientRect().top;
//         const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

//         window.scrollTo({
//           top: offsetPosition,
//           behavior: "smooth"
//         });
//       }
//     }, 100);
//   }, [isMobile]);

//   // Keyboard navigation
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (!isModalOpen) return;
//       if (e.key === "Escape") closeModal();
//       if (e.key === "ArrowRight") nextImage();
//       if (e.key === "ArrowLeft") prevImage();
//     };
//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [isModalOpen, selectedImage]);

//   // Calculate slide groups
//   const getSlideGroupsCount = (section) => {
//     const images = getPaginatedImages(section);
//     return Math.ceil(images.length / 2);
//   };

//   // Get current slide group
//   const getCurrentSlideGroup = () => {
//     return Math.floor(sliderIndex / 2) + 1;
//   };

//   // Pagination Component
//   const Pagination = ({ section }) => {
//     const totalPages = getTotalPages(section);
//     const currentPageNum = currentPage[section.id || section.title] || 1;

//     if (totalPages <= 1 || viewAllSections[section.id || section.title]) return null;

//     return (
//       <div className="mt-6 flex flex-col items-center gap-4">
//         <div className="flex items-center gap-2">
//           <button
//             onClick={() => handlePageChange(section.id || section.title, currentPageNum - 1)}
//             disabled={currentPageNum === 1}
//             className="p-2 rounded-lg border border-navy-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-navy-50 transition-colors"
//           >
//             <ChevronLeft className="w-4 h-4 text-navy-600" />
//           </button>

//           <div className="flex items-center gap-2">
//             {Array.from({ length: Math.min(5, totalPages) }).map((_, index) => {
//               let pageNum;
//               if (totalPages <= 5) {
//                 pageNum = index + 1;
//               } else if (currentPageNum <= 3) {
//                 pageNum = index + 1;
//               } else if (currentPageNum >= totalPages - 2) {
//                 pageNum = totalPages - 4 + index;
//               } else {
//                 pageNum = currentPageNum - 2 + index;
//               }

//               return (
//                 <button
//                   key={pageNum}
//                   onClick={() => handlePageChange(section.id || section.title, pageNum)}
//                   className={`w-8 h-8 rounded-lg font-medium transition-all ${
//                     currentPageNum === pageNum
//                       ? "bg-gradient-to-r from-navy-600 to-blue-600 text-white"
//                       : "bg-gradient-to-br from-white to-gray-50 text-gray-700 hover:bg-navy-50 border border-navy-100"
//                   }`}
//                 >
//                   {pageNum}
//                 </button>
//               );
//             })}
//           </div>

//           <button
//             onClick={() => handlePageChange(section.id || section.title, currentPageNum + 1)}
//             disabled={currentPageNum === totalPages}
//             className="p-2 rounded-lg border border-navy-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-navy-50 transition-colors"
//           >
//             <ChevronRight className="w-4 h-4 text-navy-600" />
//           </button>
//         </div>

//         <div className="text-sm text-gray-600">
//           Page {currentPageNum} of {totalPages} • Showing {getPaginatedImages(section).length} of {section.images.length} images
//         </div>
//       </div>
//     );
//   };

//   // Mobile Views
//   const MobileSliderView = ({ section }) => {
//     const sliderImages = getSliderImages(section);
//     const totalSlides = getSlideGroupsCount(section);
//     const currentSlide = getCurrentSlideGroup();

//     return (
//       <div className="px-3 sm:px-4 mb-6 sm:mb-8">
//         <div className="mb-4 sm:mb-6">
//           <h2 className="font-title text-xl sm:text-2xl font-bold text-navy-800 mb-1">{section.title}</h2>
//           {section.subtitle && (
//             <h3 className="font-primary text-lg sm:text-xl text-navy-600 font-semibold mb-2 sm:mb-3">
//               {section.subtitle}
//             </h3>
//           )}
//           {section.description && (
//             <p className="font-primary text-gray-600 text-xs sm:text-sm mt-1 sm:mt-2">{section.description}</p>
//           )}
//         </div>

//         <div className="relative mb-4 sm:mb-6">
//           <button
//             onClick={prevSlider}
//             className="absolute left-0 sm:left-1 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 shadow-lg rounded-full flex items-center justify-center hover:bg-white transition-colors -translate-x-1 sm:-translate-x-2"
//             disabled={selectedSection.images.length <= 2}
//           >
//             <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 text-navy-700" />
//           </button>

//           <button
//             onClick={nextSlider}
//             className="absolute right-0 sm:right-1 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 shadow-lg rounded-full flex items-center justify-center hover:bg-white transition-colors translate-x-1 sm:translate-x-2"
//             disabled={selectedSection.images.length <= 2}
//           >
//             <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-navy-700" />
//           </button>

//           <div className="flex gap-2 sm:gap-3 overflow-hidden px-0.5 sm:px-1">
//             {sliderImages.map((image, idx) => (
//               <div
//                 key={`${image.id}-${idx}`}
//                 className="flex-1 min-w-0"
//               >
//                 <div
//                   onClick={() => openModal(image, section)}
//                   className="bg-white rounded-lg sm:rounded-xl shadow-md sm:shadow-lg overflow-hidden active:scale-[0.98] transition-transform border border-navy-100"
//                 >
//                   <div className="relative h-36 sm:h-44 overflow-hidden">
//                     <LazyImage
//                       src={image.image}
//                       alt={image.alt || image.caption}
//                       className="w-full h-full"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
//                       <div className="p-2 sm:p-3 w-full">
//                         <div className="flex items-center justify-between">
//                           <span className="font-primary text-white text-xs font-medium bg-black/50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
//                             View
//                           </span>
//                           <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4 text-white/80" />
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="p-2 sm:p-3">
//                     <h3 className="font-primary font-medium sm:font-semibold text-navy-800 text-xs sm:text-sm mb-0.5 sm:mb-1 truncate">
//                       {image.caption}
//                     </h3>
//                     {image.features && image.features.length > 0 && (
//                       <div className="flex flex-wrap gap-0.5 sm:gap-1">
//                         {image.features.slice(0, 1).map((feature, idx) => (
//                           <span key={idx} className="font-primary px-1.5 sm:px-2 py-0.5 bg-gradient-to-r from-navy-50 to-blue-50 text-navy-700 rounded-full text-xs border border-navy-100">
//                             {feature}
//                           </span>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="flex justify-center gap-1 sm:gap-1.5 mt-4 sm:mt-6">
//             {Array.from({ length: totalSlides }).map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => goToSlide(index)}
//                 className={`transition-all duration-300 ${Math.floor(sliderIndex / 2) === index ? "text-navy-600" : "text-gray-300"}`}
//               >
//                 <Circle className={`w-2 h-2 sm:w-2.5 sm:h-2.5 ${Math.floor(sliderIndex / 2) === index ? "fill-current" : ""}`} />
//               </button>
//             ))}
//           </div>

//           <div className="text-center mt-2 sm:mt-3">
//             <span className="font-primary text-xs sm:text-sm text-gray-600">
//               {currentSlide} / {totalSlides}
//             </span>
//             <span className="font-primary text-xs text-gray-400 mx-1 sm:mx-2">•</span>
//             <span className="font-primary text-xs text-gray-500">
//               Showing 2 of {getPaginatedImages(section).length} images
//             </span>
//           </div>
//         </div>

//         {hasMoreImages(section) && !viewAllSections[section.id || section.title] && (
//           <Pagination section={section} />
//         )}

//         {hasMoreImages(section) && (
//           <div className="text-center">
//             <button
//               onClick={() => toggleViewAll(section.id || section.title)}
//               className="font-primary inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-1.5 sm:py-2.5 bg-gradient-to-r from-navy-600 to-blue-600 text-white rounded-full text-xs sm:text-sm font-medium hover:shadow-md transition-all duration-300 active:scale-95"
//             >
//               {viewAllSections[section.id || section.title] ? "Show Less Images" : `View All ${section.images.length} Images`}
//               <ChevronRight className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform ${viewAllSections[section.id || section.title] ? "rotate-180" : ""}`} />
//             </button>
//           </div>
//         )}
//       </div>
//     );
//   };

//   const MobileGridView = ({ section }) => (
//     <div className="px-3 sm:px-4 mb-6 sm:mb-8">
//       <div className="mb-4 sm:mb-6">
//         <h2 className="font-title text-xl sm:text-2xl font-bold text-navy-800 mb-1">{section.title}</h2>
//         {section.subtitle && (
//           <h3 className="font-primary text-lg sm:text-xl text-navy-600 font-semibold mb-2 sm:mb-3">
//             {section.subtitle}
//           </h3>
//         )}
//         {section.description && (
//           <p className="font-primary text-gray-600 text-xs sm:text-sm mt-1 sm:mt-2">{section.description}</p>
//         )}
//       </div>

//       <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
//         {getPaginatedImages(section).map((image) => (
//           <motion.div
//             key={image.id}
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.3 }}
//             onClick={() => openModal(image, section)}
//             className="bg-white rounded-lg shadow-sm sm:shadow-md overflow-hidden active:scale-[0.98] transition-transform border border-navy-100"
//           >
//             <div className="relative h-32 sm:h-36 overflow-hidden">
//               <LazyImage
//                 src={image.image}
//                 alt={image.alt || image.caption}
//                 className="w-full h-full"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity">
//                 <div className="absolute bottom-1.5 sm:bottom-2 left-1.5 sm:left-2">
//                   <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
//                 </div>
//               </div>
//             </div>
//             <div className="p-1.5 sm:p-2">
//               <h3 className="font-primary font-medium text-navy-800 text-xs mb-0.5 sm:mb-1 truncate">
//                 {image.caption}
//               </h3>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {hasMoreImages(section) && !viewAllSections[section.id || section.title] && (
//         <Pagination section={section} />
//       )}

//       {hasMoreImages(section) && (
//         <div className="text-center">
//           <button
//             onClick={() => toggleViewAll(section.id || section.title)}
//             className="font-primary inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-1.5 sm:py-2.5 bg-gradient-to-r from-navy-600 to-blue-600 text-white rounded-full text-xs sm:text-sm font-medium hover:shadow-md transition-all duration-300 active:scale-95"
//           >
//             {viewAllSections[section.id || section.title] ? "Show Less" : `View All ${section.images.length}`}
//             <ChevronRight className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform ${viewAllSections[section.id || section.title] ? "rotate-180" : ""}`} />
//           </button>
//         </div>
//       )}
//     </div>
//   );

//   // Desktop Grid View Component
//   const DesktopGridView = ({ section }) => (
//     <>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
//         {getPaginatedImages(section).map((image) => (
//           <motion.div
//             key={image.id}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.4 }}
//             whileHover={{ y: -5 }}
//             className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-md sm:shadow-lg hover:shadow-xl sm:hover:shadow-2xl transition-all duration-500 border border-navy-100 cursor-pointer"
//             onClick={() => openModal(image, section)}
//           >
//             <div className="relative h-40 sm:h-48 md:h-56 lg:h-50 overflow-hidden">
//               <LazyImage
//                 src={image.image}
//                 alt={image.alt || image.caption}
//                 className="w-full h-full"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/60 sm:from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                 <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
//                   <div className="flex items-center justify-between">
//                     <span className="font-primary text-white text-xs sm:text-sm font-medium bg-black/50 px-2 sm:px-3 py-1 rounded-full">
//                       #{image.id}
//                     </span>
//                     <span className="font-primary text-white/80 text-xs sm:text-sm">
//                       {section.title}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//               <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                 <div className="bg-black/40 sm:bg-black/50 text-white p-1.5 sm:p-2 md:p-3 rounded-full">
//                   <Eye className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
//                 </div>
//               </div>
//             </div>

//             <div className="p-3 sm:p-4 md:p-5">
//               <h3 className="font-primary font-semibold text-navy-800 text-base sm:text-lg mb-1 sm:mb-2">
//                 {image.caption}
//               </h3>
//               {image.description && (
//                 <p className="font-primary text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2">
//                   {image.description}
//                 </p>
//               )}

//               {image.features && image.features.length > 0 && (
//                 <div className="flex flex-wrap gap-1 sm:gap-2 mt-2 sm:mt-3">
//                   {image.features.slice(0, 2).map((feature, idx) => (
//                     <span
//                       key={idx}
//                       className="font-primary px-2 sm:px-3 py-0.5 sm:py-1 bg-gradient-to-r from-navy-50 to-blue-50 text-navy-700 rounded-full text-xs font-medium border border-navy-100"
//                     >
//                       {feature}
//                     </span>
//                   ))}
//                 </div>
//               )}

//               {image.icon && (
//                 <div className="flex items-center justify-between mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-navy-100">
//                   <span className="text-xl sm:text-2xl">{image.icon}</span>
//                   {image.duration && (
//                     <span className="font-primary text-xs sm:text-sm text-gray-500 bg-gradient-to-br from-white to-gray-50 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border border-navy-100">
//                       ⏱️ {image.duration}
//                     </span>
//                   )}
//                 </div>
//               )}
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {hasMoreImages(section) && !viewAllSections[section.id || section.title] && (
//         <Pagination section={section} />
//       )}

//       {hasMoreImages(section) && (
//         <div className="mt-6 sm:mt-8 flex justify-center">
//           <button
//             onClick={() => toggleViewAll(section.id || section.title)}
//             className="font-primary inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-6 md:px-8 py-2 sm:py-3 bg-gradient-to-r from-navy-600 to-blue-600 text-white rounded-full text-sm sm:text-base font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
//           >
//             <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
//             <span className="font-semibold">
//               {viewAllSections[section.id || section.title] ? "Show Less Images" : `View All ${section.images.length} Images`}
//             </span>
//             <ChevronRight className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${viewAllSections[section.id || section.title] ? "rotate-180" : ""}`} />
//           </button>
//         </div>
//       )}

//       <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-navy-200">
//         <p className="font-primary text-gray-600 text-xs sm:text-sm text-center">
//           {viewAllSections[section.id || section.title] ? (
//             <>
//               Showing all{" "}
//               <span className="font-semibold text-navy-700">
//                 {section.images.length}
//               </span>{" "}
//               images of {section.title}
//             </>
//           ) : (
//             <>
//               Showing{" "}
//               <span className="font-semibold text-navy-700">
//                 {getPaginatedImages(section).length}
//               </span>{" "}
//               of {section.images.length} images
//             </>
//           )}
//         </p>
//       </div>
//     </>
//   );

//   // Loading state
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-white to-navy-50/30 py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
//         {/* Background decorative elements */}
//         <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-navy-100/20 to-blue-100/10 rounded-full -translate-x-24 -translate-y-24"></div>
//         <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-tl from-blue-100/10 to-navy-100/20 rounded-full translate-x-24 translate-y-24"></div>
        
//         <div className="text-center relative z-10">
//           <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-navy-600 mx-auto mb-4"></div>
//           <p className="text-gray-600 text-lg">Loading infrastructure...</p>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-white to-navy-50/30 py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
//         {/* Background decorative elements */}
//         <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-navy-100/20 to-blue-100/10 rounded-full -translate-x-24 -translate-y-24"></div>
//         <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-tl from-blue-100/10 to-navy-100/20 rounded-full translate-x-24 translate-y-24"></div>
        
//         <div className="text-center relative z-10">
//           <p className="text-red-600 text-xl mb-4">⚠️ {error}</p>
//           <button 
//             onClick={fetchInfrastructure}
//             className="px-6 py-2 bg-gradient-to-r from-navy-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition-colors"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white to-navy-50/30 py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
//       {/* Background elements */}
//       <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-navy-100/20 to-blue-100/10 rounded-full -translate-x-24 -translate-y-24"></div>
//       <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-tl from-blue-100/10 to-navy-100/20 rounded-full translate-x-24 translate-y-24"></div>

//       <div className="max-w-7xl mx-auto relative z-10">
//         {/* Header */}
//         <motion.div
//           className="text-center mb-8 sm:mb-12 md:mb-16"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           <div className="inline-flex items-center gap-3 mb-4">
//             <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${data.header?.decorations?.dots?.[0]?.color || 'bg-navy-500'}`}></div>
//             <h1 className="font-title text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gradient-navy">
//               {data.header?.title || "Campus Infrastructure"}
//             </h1>
//             <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${data.header?.decorations?.dots?.[1]?.color || 'bg-navy-500'}`}></div>
//           </div>

//           <motion.div
//             className={`h-1 sm:h-1.5 w-16 sm:w-20 md:w-24 bg-gradient-to-r ${data.header?.decorations?.lineColor || 'from-navy-600 via-blue-600 to-navy-600'} mx-auto mb-4 sm:mb-6 rounded-full`}
//             initial={{ width: 0 }}
//             animate={{ width: "4rem" }}
//             transition={{ duration: 0.8, delay: 0.3 }}
//           />
          
//           <p className="text-gray-700 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-2 sm:px-4">
//             {data.header?.description || "Explore our state-of-the-art campus facilities and modern learning environments"}
//           </p>
//         </motion.div>

//         {/* Desktop Sections */}
//         {!isMobile && data.sections.length > 0 && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="mb-8 sm:mb-12"
//           >
//             <div className="flex items-center gap-3 mb-4">
//               <div className="relative">
//                 <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-navy-600 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center">
//                   <Grid className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
//                 </div>
//                 <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
//                   <Star className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-white" />
//                 </div>
//               </div>
//               <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-navy-800">
//                 Explore Sections
//               </h2>
//             </div>

//             <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3">
//               {filteredSections.map((section) => (
//                 <motion.button
//                   key={section.id || section.title}
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ duration: 0.3 }}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => scrollToSection(section)}
//                   className={`font-primary w-full md:w-50 px-3 sm:px-4 md:px-5 py-2 sm:py-3
//                     rounded-lg text-xs sm:text-sm md:text-base font-medium
//                     transition-all duration-300 hover:-translate-y-1
//                     ${selectedSection?.id === section.id
//                       ? "bg-gradient-to-r from-navy-600 to-blue-600 text-white shadow-lg scale-105"
//                       : "bg-gradient-to-br from-white to-gray-50 text-gray-700 hover:bg-navy-50 border border-navy-100"
//                     }`}
//                 >
//                   <div className="flex items-center justify-center sm:justify-start gap-1 sm:gap-2">
//                     <span className="truncate">{section.title}</span>
//                   </div>
//                 </motion.button>
//               ))}
//             </div>
//           </motion.div>
//         )}

//         {/* Sections Display */}
//         {filteredSections.length > 0 ? (
//           filteredSections.map((section) => (
//             <motion.div
//               key={section.id || section.title}
//               id={`section-${section.id || section.title}`}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               viewport={{ once: true }}
//               className="mb-8 sm:mb-10 md:mb-12 scroll-mt-16 sm:scroll-mt-20 bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-navy-100 overflow-hidden"
//             >
//               {!isMobile && (
//                 <div className="p-4 sm:p-5 md:p-6 bg-gradient-to-r from-navy-50 to-blue-50 border-b border-navy-100">
//                   <div className="flex items-start justify-between gap-4">
//                     <div>
//                       <h2 className="font-title text-xl sm:text-2xl md:text-3xl font-bold text-navy-800 mb-1 sm:mb-2">
//                         {section.title}
//                       </h2>
//                       {section.subtitle && (
//                         <h3 className="font-primary text-lg sm:text-xl text-navy-600 font-semibold mb-2 sm:mb-3">
//                           {section.subtitle}
//                         </h3>
//                       )}
//                       {section.description && (
//                         <p className="font-primary text-gray-600 text-sm sm:text-base md:text-lg max-w-4xl leading-relaxed">
//                           {section.description}
//                         </p>
//                       )}
//                     </div>
//                     <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-br from-white to-gray-50 rounded-lg border border-navy-100">
//                       <span className="text-xs sm:text-sm font-medium text-navy-700">
//                         {section.images.length} Images
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               <div className="p-4 sm:p-5 md:p-6">
//                 {isMobile ? (
//                   viewMode === "slider" ? (
//                     <MobileSliderView section={section} />
//                   ) : (
//                     <MobileGridView section={section} />
//                   )
//                 ) : (
//                   <DesktopGridView section={section} />
//                 )}
//               </div>
//             </motion.div>
//           ))
//         ) : (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="text-center py-12 bg-gradient-to-br from-white to-navy-50/50 rounded-2xl border border-navy-100 shadow-sm"
//           >
//             <div className="w-16 h-16 bg-gradient-to-br from-navy-50 to-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-navy-100">
//               <Search className="w-8 h-8 text-navy-400" />
//             </div>
//             <h3 className="text-lg font-semibold text-gray-700 mb-2">
//               No facilities found
//             </h3>
//             <p className="text-gray-500 max-w-md mx-auto">
//               Try adjusting your search or filter criteria
//             </p>
//           </motion.div>
//         )}

//         {/* Modal */}
//         <AnimatePresence>
//           {isModalOpen && selectedImage && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
//               onClick={closeModal}
//             >
//               <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-black/90 to-black/80 backdrop-blur-sm border-b border-white/10 z-50 p-4">
//                 <div className="max-w-7xl mx-auto flex items-center justify-between">
//                   <div className="flex items-center gap-4">
//                     <button
//                       onClick={closeModal}
//                       className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors active:scale-95"
//                     >
//                       <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
//                     </button>

//                     <div className="text-white">
//                       <h3 className="font-semibold text-sm sm:text-base truncate max-w-[200px] sm:max-w-md">
//                         {selectedImage.caption}
//                       </h3>
//                       <p className="text-xs text-white/70">
//                         Image {selectedSection.images.findIndex(img => img.id === selectedImage.id) + 1} of {selectedSection.images.length} • {selectedSection.title}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-2">
//                     <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-lg p-1 border border-white/10">
//                       <button
//                         onClick={prevImage}
//                         disabled={selectedSection.images.findIndex(img => img.id === selectedImage.id) === 0}
//                         className={`p-2 rounded transition-colors ${selectedSection.images.findIndex(img => img.id === selectedImage.id) === 0 
//                             ? 'opacity-40 cursor-not-allowed' 
//                             : 'hover:bg-white/20 active:scale-95'
//                           }`}
//                       >
//                         <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//                       </button>
                      
//                       <div className="px-2 text-xs text-white/80 font-medium">
//                         {selectedSection.images.findIndex(img => img.id === selectedImage.id) + 1}/{selectedSection.images.length}
//                       </div>
                      
//                       <button
//                         onClick={nextImage}
//                         disabled={selectedSection.images.findIndex(img => img.id === selectedImage.id) === selectedSection.images.length - 1}
//                         className={`p-2 rounded transition-colors ${selectedSection.images.findIndex(img => img.id === selectedImage.id) === selectedSection.images.length - 1
//                             ? 'opacity-40 cursor-not-allowed' 
//                             : 'hover:bg-white/20 active:scale-95'
//                           }`}
//                       >
//                         <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="w-full h-full pt-16 flex items-center justify-center p-4">
//                 <div className="relative w-full max-w-5xl h-[85vh] bg-white rounded-xl overflow-hidden shadow-2xl border border-navy-200">
//                   <img
//                     src={selectedImage.image}
//                     alt={selectedImage.alt || selectedImage.caption}
//                     className="w-full h-full object-contain"
//                   />
                  
//                   <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
//                     <div className="max-w-4xl mx-auto">
//                       <h3 className="font-title text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">
//                         {selectedImage.caption}
//                       </h3>
//                       {selectedImage.description && (
//                         <p className="font-primary text-gray-300 text-sm sm:text-base md:text-lg">
//                           {selectedImage.description}
//                         </p>
//                       )}
                      
//                       {selectedImage.features &&
//                         selectedImage.features.length > 0 && (
//                           <div className="mt-2 sm:mt-3 pt-2 border-t border-gray-700">
//                             <div className="flex flex-wrap gap-1 sm:gap-2">
//                               {selectedImage.features.map((feature, idx) => (
//                                 <span
//                                   key={idx}
//                                   className="font-primary px-2 sm:px-3 py-0.5 sm:py-1 bg-gray-700 text-gray-200 rounded-full text-xs sm:text-sm"
//                                 >
//                                   {feature}
//                                 </span>
//                               ))}
//                             </div>
//                           </div>
//                         )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Back to Top */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.6, delay: 0.5 }}
//           viewport={{ once: true }}
//           className="mt-8 sm:mt-10 flex justify-center"
//         >
//           <button
//             onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//             className="font-primary px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-navy-600 to-blue-600 text-white rounded-full text-xs sm:text-sm font-medium hover:shadow-lg transition-all duration-300 flex items-center gap-1 sm:gap-2"
//           >
//             <ArrowUp className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
//             {data.footer?.backToTop || "Back to Top"}
//           </button>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default InfrastructurePage;