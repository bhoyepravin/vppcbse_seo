import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Images as ImagesIcon, 
  X, 
  Calendar, 
  ChevronDown, 
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Star,
  Sparkles,
  Cloud,
  Heart,
  Search,
  Filter,
  Home,
  ArrowUp,
  Eye,
  Clock,
  Building,
  Shield
} from "lucide-react";
import axiosInstance from "../../services/api"; // Update this import path based on your project structure

const Images = () => {
  const navigate = useNavigate();
  const [galleryData, setGalleryData] = useState({ categories: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Show More/Less state
  const [visibleImagesCount, setVisibleImagesCount] = useState(12);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Lazy loading state
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [visibleImages, setVisibleImages] = useState(new Set());
  const observerRef = useRef(null);

  useEffect(() => {
    fetchGalleryData();
  }, []);

  // Handle body scroll and hide everything when modal opens/closes
  useEffect(() => {
    if (selectedImage) {
      // Disable body scroll and hide all page content
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
      document.body.style.top = '0';
      document.body.style.left = '0';
      
      // Add class to hide all page content except modal
      document.body.classList.add('modal-open');
      
      // Find and hide the navbar/header specifically
      const header = document.querySelector('header');
      const navbar = document.querySelector('nav');
      const mainContent = document.querySelector('main');
      
      if (header) header.style.display = 'none';
      if (navbar) navbar.style.display = 'none';
      if (mainContent) mainContent.style.opacity = '0';
      
    } else {
      // Restore everything
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
      document.body.style.top = '';
      document.body.style.left = '';
      
      document.body.classList.remove('modal-open');
      
      // Restore navbar/header
      const header = document.querySelector('header');
      const navbar = document.querySelector('nav');
      const mainContent = document.querySelector('main');
      
      if (header) header.style.display = '';
      if (navbar) navbar.style.display = '';
      if (mainContent) mainContent.style.opacity = '';
    }
    
    return () => {
      // Cleanup
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
      document.body.style.top = '';
      document.body.style.left = '';
      
      document.body.classList.remove('modal-open');
      
      const header = document.querySelector('header');
      const navbar = document.querySelector('nav');
      const mainContent = document.querySelector('main');
      
      if (header) header.style.display = '';
      if (navbar) navbar.style.display = '';
      if (mainContent) mainContent.style.opacity = '';
    };
  }, [selectedImage]);

  const fetchGalleryData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/gallery');
      
      if (response.data.success) {
        const apiData = response.data.data;
        
        // Process the API data - fix image URLs
        const processedData = {
          header: {
            title: apiData.gallery?.header?.title || "School Gallery",
            description: apiData.gallery?.header?.description || "Explore photos from our school events, activities, celebrations, and daily campus life",
            quickStats: apiData.gallery?.header?.quickStats || { show: true },
            decorations: {
              dots: apiData.gallery?.header?.decorations?.dots || [
                { color: "bg-navy-500" },
                { color: "bg-navy-500" }
              ],
              lineColor: apiData.gallery?.header?.decorations?.lineColor || "from-navy-600 via-blue-600 to-navy-600"
            }
          },
          categories: apiData.gallery?.categories?.map(category => ({
            ...category,
            id: category.id || `category-${Math.random()}`,
            subcategories: category.subcategories?.map(subcategory => ({
              ...subcategory,
              id: subcategory.id || `subcategory-${Math.random()}`,
              items: subcategory.items?.map(item => ({
                ...item,
                image: item.image?.replace(/\\\//g, '/') || item.image
              })) || []
            })) || []
          })) || [],
          footer: {
            text: apiData.gallery?.footer?.text || "School Memories & Events",
            backToTop: apiData.gallery?.footer?.backToTop || "Back to Top",
            decorations: {
              lineColor: apiData.gallery?.footer?.decorations?.lineColor || "from-transparent via-navy-400 to-transparent",
              icons: {
                left: apiData.gallery?.footer?.decorations?.icons?.left || "Star",
                right: apiData.gallery?.footer?.decorations?.icons?.right || "Star",
                color: apiData.gallery?.footer?.decorations?.icons?.color || "text-yellow-500"
              }
            }
          }
        };
        
        setGalleryData(processedData);

        if (processedData.categories.length > 0) {
          const firstCategory = processedData.categories[0];
          setSelectedCategory(firstCategory);

          if (firstCategory.subcategories?.length > 0) {
            const firstSubCategory = firstCategory.subcategories[0];
            setSelectedSubCategory(firstSubCategory);
          }
        }

        setVisibleImagesCount(getInitialCount());
        setError(null);
      }
    } catch (err) {
      console.error('Error fetching gallery:', err);
      setError('Failed to load gallery');
    } finally {
      setLoading(false);
      setIsLoadingData(false);
    }
  };

  // Responsive initial count
  const getInitialCount = () => {
    if (window.innerWidth < 640) return 6;   // Mobile
    if (window.innerWidth < 768) return 9;   // Small tablet
    if (window.innerWidth < 1024) return 12; // Tablet
    return 15; // Desktop
  };

  // Memoized calculations
  const visibleItems = useMemo(() => {
    if (!selectedSubCategory || !selectedSubCategory.items) return [];
    return selectedSubCategory.items.slice(0, visibleImagesCount);
  }, [selectedSubCategory, visibleImagesCount]);

  const hasMoreItems = useMemo(() => {
    return selectedSubCategory && selectedSubCategory.items &&
      visibleImagesCount < selectedSubCategory.items.length;
  }, [selectedSubCategory, visibleImagesCount]);

  const isViewAllActive = useMemo(() => {
    return selectedSubCategory && selectedSubCategory.items &&
      visibleImagesCount >= (selectedSubCategory.items.length || 0);
  }, [selectedSubCategory, visibleImagesCount]);

  // Handle resize for responsive initial count
  useEffect(() => {
    const handleResize = () => {
      if (!selectedSubCategory) return;
      const newInitialCount = getInitialCount();
      if (visibleImagesCount === newInitialCount ||
        visibleImagesCount < newInitialCount && !isViewAllActive) {
        setVisibleImagesCount(newInitialCount);
      }
    };

    const debouncedResize = debounce(handleResize, 250);
    window.addEventListener('resize', debouncedResize);
    return () => window.removeEventListener('resize', debouncedResize);
  }, [visibleImagesCount, isViewAllActive, selectedSubCategory]);

  // Lazy loading with Intersection Observer
  useEffect(() => {
    if (!selectedSubCategory || visibleItems.length === 0) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const imageId = entry.target.dataset.imageId;
            if (imageId) {
              setVisibleImages(prev => new Set(prev).add(imageId));

              setTimeout(() => {
                setLoadedImages(prev => {
                  const newSet = new Set(prev);
                  newSet.add(imageId);
                  return newSet;
                });
              }, Math.random() * 200);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '100px',
        threshold: 0.01
      }
    );

    const imageElements = document.querySelectorAll('[data-image-id]');
    imageElements.forEach(el => {
      if (observerRef.current) {
        observerRef.current.observe(el);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [selectedSubCategory, visibleImagesCount]);

  // Auto-load more when scrolling near bottom
  useEffect(() => {
    const handleScroll = () => {
      if (!hasMoreItems || isLoadingMore) return;

      const scrollPosition = window.innerHeight + window.scrollY;
      const pageHeight = document.documentElement.scrollHeight;
      const threshold = 800; // Start loading 800px before bottom

      if (scrollPosition >= pageHeight - threshold) {
        loadMoreImages();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMoreItems, isLoadingMore, selectedSubCategory]);

  // Load more images function
  const loadMoreImages = useCallback(() => {
    if (!selectedSubCategory || !hasMoreItems || isLoadingMore) return;

    setIsLoadingMore(true);

    const totalImages = selectedSubCategory.items.length;
    const increment = getInitialCount();
    const newCount = Math.min(visibleImagesCount + increment, totalImages);

    // Simulate network delay
    setTimeout(() => {
      setVisibleImagesCount(newCount);
      setIsLoadingMore(false);
    }, 300);
  }, [selectedSubCategory, hasMoreItems, visibleImagesCount, isLoadingMore]);

  // Show all images
  const showAllImages = useCallback(() => {
    if (!selectedSubCategory) return;

    setIsLoadingMore(true);
    const totalImages = selectedSubCategory.items.length;

    setTimeout(() => {
      setVisibleImagesCount(totalImages);
      setIsLoadingMore(false);
    }, 300);
  }, [selectedSubCategory]);

  // Show less images
  const showLessImages = useCallback(() => {
    setIsLoadingMore(true);

    setTimeout(() => {
      setVisibleImagesCount(getInitialCount());
      setIsLoadingMore(false);

      // Scroll to top when showing less
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
  }, []);

  // Image loading handlers
  const handleImageLoad = useCallback((imageId) => {
    setLoadedImages(prev => new Set(prev).add(imageId));
  }, []);

  const handleImageError = useCallback((e, imageId) => {
    // e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' text-anchor='middle' fill='%23999'%3EImage%3C/text%3E%3C/svg%3E";
    handleImageLoad(imageId);
  }, [handleImageLoad]);

  // Category handlers
  const handleCategoryClick = useCallback((category) => {
    setSelectedCategory(category);
    if (category.subcategories?.length > 0) {
      setSelectedSubCategory(category.subcategories[0]);
    }
    setVisibleImagesCount(getInitialCount());
    setLoadedImages(new Set());
    setVisibleImages(new Set());
  }, []);

  const handleSubCategoryClick = useCallback((subcategory) => {
    setSelectedSubCategory(subcategory);
    setVisibleImagesCount(getInitialCount());
    setLoadedImages(new Set());
    setVisibleImages(new Set());
  }, []);

  // Debounce utility
  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };

  // Handle escape key press
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && selectedImage) {
        setSelectedImage(null);
      }
    };
    
    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [selectedImage]);

  // Loading skeleton
  const ImageSkeleton = ({ count = 1 }) => (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden border border-navy-100">
          <div className="relative aspect-square bg-gradient-to-r from-gray-100 via-navy-50/30 to-gray-100">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          </div>
          <div className="p-4">
            <div className="h-4 bg-gradient-to-r from-gray-100 to-navy-50/30 rounded w-3/4 mb-3">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
            </div>
            <div className="h-4 bg-gradient-to-r from-gray-100 to-navy-50/30 rounded w-1/4" />
          </div>
        </div>
      ))}
    </>
  );

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-navy-50/30 py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-600"></div>
            <p className="font-primary text-gray-600 mt-4">Loading gallery...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-navy-50/30 py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden flex items-center justify-center">
        <div className="text-center relative z-10">
          <p className="text-red-600 text-xl mb-4">⚠️ {error}</p>
          <button 
            onClick={fetchGalleryData}
            className="px-6 py-2 bg-gradient-to-r from-navy-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // No data state
  if (!galleryData.categories || galleryData.categories.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-navy-50/30 py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center py-12">
            <ImagesIcon className="w-16 h-16 text-navy-400 mx-auto mb-4" />
            <h3 className="font-primary text-xl font-semibold text-gray-600 mb-2">
              No Gallery Data Available
            </h3>
          </div>
        </div>
      </div>
    );
  }

  const { header, footer } = galleryData;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-navy-50/30 py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-navy-100/20 to-blue-100/10 rounded-full -translate-x-24 -translate-y-24"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-tl from-blue-100/10 to-navy-100/20 rounded-full translate-x-24 translate-y-24"></div>

      {/* Creative decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-5 sm:top-20 sm:left-10 opacity-20 animate-bounce">
          <Cloud className="w-8 h-8 sm:w-10 sm:h-10 text-navy-400" />
        </div>
        <div className="absolute top-20 right-8 sm:top-32 sm:right-16 opacity-20 animate-pulse">
          <Star className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-400" />
        </div>
        <div className="absolute bottom-20 left-10 sm:bottom-32 sm:left-20 opacity-20 animate-bounce">
          <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-pink-400" />
        </div>
        <div className="absolute top-1/3 left-1/4 opacity-15">
          <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-navy-300" />
        </div>
        <div className="absolute bottom-1/3 right-1/4 opacity-15">
          <ImagesIcon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-300" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ================= HEADER ================= */}
        <motion.div
          className="text-center mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${header?.decorations?.dots?.[0]?.color || 'bg-navy-500'}`}></div>
            <h1 className="font-title text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gradient-navy">
              {header?.title || "School Gallery"}
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
            {header?.description || "Explore photos from our school events, activities, celebrations, and daily campus life"}
          </p>

          {/* Quick Stats */}
          {header?.quickStats?.show && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-6"
            >
              <div className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-gradient-to-br from-navy-50 to-blue-50 rounded-full border border-navy-100">
                <ImagesIcon className="h-3 w-3 sm:h-4 sm:w-4 text-navy-600" />
                <span className="text-xs sm:text-sm font-medium text-navy-700">
                  {galleryData.categories.reduce((total, cat) => 
                    total + (cat.subcategories?.reduce((subTotal, sub) => 
                      subTotal + (sub.items?.length || 0), 0) || 0), 0)} Photos
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-gradient-to-br from-navy-50 to-blue-50 rounded-full border border-navy-100">
                <Building className="h-3 w-3 sm:h-4 sm:w-4 text-navy-600" />
                <span className="text-xs sm:text-sm font-medium text-navy-700">
                  {galleryData.categories.length} Categories
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-gradient-to-br from-navy-50 to-blue-50 rounded-full border border-navy-100">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-navy-600" />
                <span className="text-xs sm:text-sm font-medium text-navy-700">
                  Updated Regularly
                </span>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Breadcrumb */}
        <motion.div
          className="font-primary flex items-center gap-2 mb-6 text-sm text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <button
            onClick={() => navigate("/")}
            className="text-gray-600 hover:text-navy-700 transition-colors font-medium flex items-center gap-1"
          >
            <Home className="w-3 h-3" />
            <span>Home</span>
          </button>
          <span>/</span>
          <span className="font-medium text-navy-700">Gallery</span>
        </motion.div>

        {/* Category Selection */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-navy-100 p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-navy-600 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <Filter className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                  <Star className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-white" />
                </div>
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-navy-800">
                Select Category
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {galleryData.categories.map((category) => (
                <motion.button
                  key={category.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCategoryClick(category)}
                  className={`font-primary px-4 py-2 rounded-full font-medium transition-all ${selectedCategory?.id === category.id
                      ? "bg-gradient-to-r from-navy-600 to-blue-600 text-white shadow-lg scale-105"
                      : "bg-gradient-to-br from-white to-gray-50 text-gray-700 hover:bg-navy-50 border border-navy-100"
                    }`}
                >
                  {category.icon} {category.title}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Sub-Category Selection */}
        {selectedCategory?.subcategories?.length > 0 && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-navy-100 p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-navy-600 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <ImagesIcon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                </div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-navy-800">
                  Select Album
                </h2>
              </div>

              <div className="flex flex-wrap gap-2">
                {selectedCategory.subcategories.map((subcategory) => (
                  <motion.button
                    key={subcategory.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSubCategoryClick(subcategory)}
                    className={`font-primary px-3 py-1.5 rounded-md text-sm font-medium transition-all ${selectedSubCategory?.id === subcategory.id
                        ? "bg-gradient-to-r from-navy-600 to-blue-600 text-white"
                        : "bg-gradient-to-br from-white to-gray-50 text-gray-700 hover:bg-navy-50 border border-navy-100"
                      }`}
                  >
                    {subcategory.icon} {subcategory.title}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Gallery Content */}
        {selectedSubCategory ? (
          <>
            {/* Section Header */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-navy-100 p-4 sm:p-5 md:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <h2 className="font-title text-2xl sm:text-3xl font-bold text-navy-800 mb-2">
                      {selectedSubCategory.title}
                    </h2>
                    <p className="font-primary text-gray-600">
                      Showing {Math.min(visibleImagesCount, visibleItems.length)} of {selectedSubCategory.items?.length || 0} photos
                    </p>
                  </div>

                  {/* Quick View Toggle (Mobile) */}
                  <div className="sm:hidden">
                    <button
                      onClick={isViewAllActive ? showLessImages : showAllImages}
                      className="font-primary inline-flex items-center gap-1 text-sm text-navy-600 font-medium hover:underline"
                    >
                      {isViewAllActive ? "Show Less" : "View All"}
                      {isViewAllActive ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                {hasMoreItems && !isViewAllActive && (
                  <div className="mt-4">
                    <div className="w-full h-2 bg-gradient-to-r from-gray-100 to-navy-50/30 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-navy-600 to-blue-600 transition-all duration-300"
                        style={{
                          width: `${(visibleImagesCount / selectedSubCategory.items.length) * 100}%`
                        }}
                      />
                    </div>
                    <p className="font-primary text-gray-600 text-sm mt-2 text-center">
                      {visibleImagesCount} of {selectedSubCategory.items.length} photos loaded
                    </p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-8">
              {visibleItems.length === 0 ? (
                <ImageSkeleton count={getInitialCount()} />
              ) : (
                visibleItems.map((item, index) => {
                  const imageId = `${selectedSubCategory.id}-${item.id}`;
                  const isLoaded = loadedImages.has(imageId);
                  const shouldLoad = isLoaded || index < 4;

                  return (
                    <motion.div
                      key={imageId}
                      data-image-id={imageId}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      whileHover={{ y: -5 }}
                      className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden cursor-pointer border border-navy-100"
                      onClick={() => setSelectedImage(item)}
                    >
                      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-navy-50/30">
                        {!isLoaded && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-navy-600"></div>
                          </div>
                        )}

                        <img
                          src={shouldLoad ? item.image : ""}
                          alt={item.alt || item.title}
                          className={`w-full h-full object-cover transition-transform duration-700 ${isLoaded ? 'group-hover:scale-110 opacity-100' : 'opacity-0'
                            }`}
                          loading={index < 4 ? "eager" : "lazy"}
                          onLoad={() => handleImageLoad(imageId)}
                          onError={(e) => handleImageError(e, imageId)}
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-3 left-3 right-3">
                            <div className="flex items-center justify-between">
                              <span className="font-primary text-white text-xs font-medium bg-black/50 px-2 py-1 rounded-full">
                                View
                              </span>
                              <Eye className="w-4 h-4 text-white/80" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-4">
                        <h3 className="font-primary font-semibold text-navy-800 line-clamp-2 mb-2">
                          {item.title}
                        </h3>
                        {item.date && (
                          <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(item.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric"
                              })}
                            </span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Load More / Show Less Controls */}
            {selectedSubCategory.items && selectedSubCategory.items.length > getInitialCount() && (
              <motion.div
                className="flex flex-col items-center gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Show More/Less Button */}
                <button
                  onClick={isViewAllActive ? showLessImages : showAllImages}
                  disabled={isLoadingMore}
                  className={`font-primary inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed ${isViewAllActive
                      ? "bg-gradient-to-br from-white to-gray-50 text-gray-700 hover:bg-navy-50 border border-navy-100"
                      : "bg-gradient-to-r from-navy-600 to-blue-600 text-white"
                    }`}
                >
                  {isLoadingMore ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
                      Loading...
                    </>
                  ) : (
                    <>
                      {isViewAllActive ? "Show Less Images" : `View All ${selectedSubCategory.items.length} Images`}
                      {isViewAllActive ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </>
                  )}
                </button>

                {/* Incremental Load More Button (Alternative) */}
                {hasMoreItems && !isViewAllActive && (
                  <button
                    onClick={loadMoreImages}
                    disabled={isLoadingMore}
                    className="font-primary text-sm text-navy-600 font-medium hover:underline flex items-center gap-1"
                  >
                    Load {Math.min(getInitialCount(), selectedSubCategory.items.length - visibleImagesCount)} more
                    <ChevronDown className="w-4 h-4" />
                  </button>
                )}
              </motion.div>
            )}

            {/* Loading More Indicator */}
            {isLoadingMore && (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-navy-600"></div>
                <p className="font-primary text-gray-600 ml-3">Loading more photos...</p>
              </div>
            )}

            {/* Image Count Summary */}
            <motion.div
              className="mt-8 pt-6 border-t border-navy-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-primary text-gray-600 text-sm text-center">
                {isViewAllActive ? (
                  <>
                    Showing all{" "}
                    <span className="font-semibold text-navy-700">
                      {selectedSubCategory.items.length}
                    </span>{" "}
                    photos from {selectedSubCategory.title}
                  </>
                ) : (
                  <>
                    Showing{" "}
                    <span className="font-semibold text-navy-700">
                      {visibleImagesCount}
                    </span>{" "}
                    of {selectedSubCategory.items.length} photos
                    {" • "}
                    <button
                      onClick={showAllImages}
                      className="text-navy-600 hover:underline font-medium"
                    >
                      View all
                    </button>
                  </>
                )}
              </p>
            </motion.div>
          </>
        ) : (
          <motion.div
            className="text-center py-12 bg-gradient-to-br from-white to-navy-50/50 rounded-2xl border border-navy-100 shadow-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-navy-50 to-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-navy-100">
              <ImagesIcon className="w-8 h-8 text-navy-400" />
            </div>
            <h3 className="font-primary text-xl font-semibold text-gray-600 mb-2">
              Select a category to view photos
            </h3>
          </motion.div>
        )}

        {/* Image Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[99999] bg-blue/95 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative max-w-4xl w-full bg-white rounded-xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 z-10 bg-black/70 text-white p-2 rounded-full hover:bg-black/90 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="max-h-[70vh] overflow-hidden">
                  <img
                    src={selectedImage.image}
                    alt={selectedImage.alt || selectedImage.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="p-6">
                  <h3 className="font-title text-2xl font-bold text-navy-800 mb-2">
                    {selectedImage.title}
                  </h3>
                  {selectedImage.description && (
                    <p className="font-primary text-gray-600 mb-4">
                      {selectedImage.description}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-navy-200">
                    {selectedImage.date && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-5 h-5" />
                        <span className="font-primary">
                          {new Date(selectedImage.date).toLocaleDateString("en-US", {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                            year: "numeric"
                          })}
                        </span>
                      </div>
                    )}

                    <span className="font-primary px-3 py-1 bg-gradient-to-r from-navy-600 to-blue-600 text-white rounded-full text-sm">
                      {selectedSubCategory?.title || "Gallery"}
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Back to Top Button */}
        <motion.div
          className="flex justify-center mt-8 sm:mt-12"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-primary px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-navy-600 to-blue-600 text-white rounded-full text-xs sm:text-sm font-medium hover:shadow-lg transition-all duration-300 flex items-center gap-1 sm:gap-2"
          >
            <ArrowUp className="w-3 h-3 sm:w-4 sm:h-4" />
            {footer?.backToTop || "Back to Top"}
          </button>
        </motion.div>

        {/* ================= BOTTOM DECORATIVE ELEMENT ================= */}
        <motion.div
          className="flex justify-center mt-8 sm:mt-12"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 sm:gap-4 text-navy-600">
            <div className={`w-6 h-px sm:w-8 md:w-12 bg-gradient-to-r ${footer?.decorations?.lineColor || 'from-transparent via-navy-400 to-transparent'}`}></div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              {footer?.decorations?.icons?.left === "Star" && (
                <Star className={`w-3 h-3 sm:w-4 sm:h-4 ${footer?.decorations?.icons?.color || 'text-yellow-500'}`} />
              )}
              <span className="text-xs sm:text-sm font-medium">{footer?.text || "School Memories & Events"}</span>
              {footer?.decorations?.icons?.right === "Star" && (
                <Star className={`w-3 h-3 sm:w-4 sm:h-4 ${footer?.decorations?.icons?.color || 'text-yellow-500'}`} />
              )}
            </div>
            <div className={`w-6 h-px sm:w-8 md:w-12 bg-gradient-to-r ${footer?.decorations?.lineColor || 'from-transparent via-navy-400 to-transparent'}`}></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Images;


// import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//   Images as ImagesIcon, 
//   X, 
//   Calendar, 
//   ChevronDown, 
//   ChevronUp,
//   ChevronLeft,
//   ChevronRight,
//   Star,
//   Sparkles,
//   Cloud,
//   Heart,
//   Search,
//   Filter,
//   Home,
//   ArrowUp,
//   Eye,
//   Clock,
//   Building
// } from "lucide-react";
// import kgGalleryData from "../../constant/GalleryData/kgGalleryData";
// import primarySecondaryGalleryData from "../../constant/GalleryData/primarySecondaryGalleryData";

// const Images = () => {
//   const navigate = useNavigate();
//   const [galleryData, setGalleryData] = useState({ categories: [] });
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedSubCategory, setSelectedSubCategory] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   // Show More/Less state
//   const [visibleImagesCount, setVisibleImagesCount] = useState(12);
//   const [isLoadingMore, setIsLoadingMore] = useState(false);

//   // Lazy loading state
//   const [loadedImages, setLoadedImages] = useState(new Set());
//   const [visibleImages, setVisibleImages] = useState(new Set());
//   const observerRef = useRef(null);

//   // Responsive initial count
//   const getInitialCount = () => {
//     if (window.innerWidth < 640) return 6;   // Mobile
//     if (window.innerWidth < 768) return 9;   // Small tablet
//     if (window.innerWidth < 1024) return 12; // Tablet
//     return 15; // Desktop
//   };

//   // Memoized calculations
//   const visibleItems = useMemo(() => {
//     if (!selectedSubCategory || !selectedSubCategory.items) return [];
//     return selectedSubCategory.items.slice(0, visibleImagesCount);
//   }, [selectedSubCategory, visibleImagesCount]);

//   const hasMoreItems = useMemo(() => {
//     return selectedSubCategory && selectedSubCategory.items &&
//       visibleImagesCount < selectedSubCategory.items.length;
//   }, [selectedSubCategory, visibleImagesCount]);

//   const isViewAllActive = useMemo(() => {
//     return selectedSubCategory && selectedSubCategory.items &&
//       visibleImagesCount >= (selectedSubCategory.items.length || 0);
//   }, [selectedSubCategory, visibleImagesCount]);

//   // Load gallery data
//   useEffect(() => {
//     const loadGalleryData = () => {
//       try {
//         const combinedData = {
//           categories: []
//         };

//         if (kgGalleryData?.subcategories?.length > 0) {
//           combinedData.categories.push(kgGalleryData);
//         }

//         if (primarySecondaryGalleryData?.subcategories?.length > 0) {
//           combinedData.categories.push(primarySecondaryGalleryData);
//         }

//         setGalleryData(combinedData);

//         if (combinedData.categories.length > 0) {
//           const firstCategory = combinedData.categories[0];
//           setSelectedCategory(firstCategory);

//           if (firstCategory.subcategories?.length > 0) {
//             const firstSubCategory = firstCategory.subcategories[0];
//             setSelectedSubCategory(firstSubCategory);
//           }
//         }

//         setVisibleImagesCount(getInitialCount());

//       } catch (error) {
//         console.error("Error loading gallery data:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadGalleryData();
//   }, []);

//   // Handle resize for responsive initial count
//   useEffect(() => {
//     const handleResize = () => {
//       if (!selectedSubCategory) return;
//       const newInitialCount = getInitialCount();
//       if (visibleImagesCount === newInitialCount ||
//         visibleImagesCount < newInitialCount && !isViewAllActive) {
//         setVisibleImagesCount(newInitialCount);
//       }
//     };

//     const debouncedResize = debounce(handleResize, 250);
//     window.addEventListener('resize', debouncedResize);
//     return () => window.removeEventListener('resize', debouncedResize);
//   }, [visibleImagesCount, isViewAllActive, selectedSubCategory]);

//   // Lazy loading with Intersection Observer
//   useEffect(() => {
//     if (!selectedSubCategory || visibleItems.length === 0) return;

//     if (observerRef.current) {
//       observerRef.current.disconnect();
//     }

//     observerRef.current = new IntersectionObserver(
//       (entries) => {
//         entries.forEach(entry => {
//           if (entry.isIntersecting) {
//             const imageId = entry.target.dataset.imageId;
//             if (imageId) {
//               setVisibleImages(prev => new Set(prev).add(imageId));

//               setTimeout(() => {
//                 setLoadedImages(prev => {
//                   const newSet = new Set(prev);
//                   newSet.add(imageId);
//                   return newSet;
//                 });
//               }, Math.random() * 200);
//             }
//           }
//         });
//       },
//       {
//         root: null,
//         rootMargin: '100px',
//         threshold: 0.01
//       }
//     );

//     const imageElements = document.querySelectorAll('[data-image-id]');
//     imageElements.forEach(el => {
//       if (observerRef.current) {
//         observerRef.current.observe(el);
//       }
//     });

//     return () => {
//       if (observerRef.current) {
//         observerRef.current.disconnect();
//       }
//     };
//   }, [selectedSubCategory, visibleImagesCount]);

//   // Auto-load more when scrolling near bottom
//   useEffect(() => {
//     const handleScroll = () => {
//       if (!hasMoreItems || isLoadingMore) return;

//       const scrollPosition = window.innerHeight + window.scrollY;
//       const pageHeight = document.documentElement.scrollHeight;
//       const threshold = 800; // Start loading 800px before bottom

//       if (scrollPosition >= pageHeight - threshold) {
//         loadMoreImages();
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [hasMoreItems, isLoadingMore, selectedSubCategory]);

//   // Load more images function
//   const loadMoreImages = useCallback(() => {
//     if (!selectedSubCategory || !hasMoreItems || isLoadingMore) return;

//     setIsLoadingMore(true);

//     const totalImages = selectedSubCategory.items.length;
//     const increment = getInitialCount();
//     const newCount = Math.min(visibleImagesCount + increment, totalImages);

//     // Simulate network delay
//     setTimeout(() => {
//       setVisibleImagesCount(newCount);
//       setIsLoadingMore(false);
//     }, 300);
//   }, [selectedSubCategory, hasMoreItems, visibleImagesCount, isLoadingMore]);

//   // Show all images
//   const showAllImages = useCallback(() => {
//     if (!selectedSubCategory) return;

//     setIsLoadingMore(true);
//     const totalImages = selectedSubCategory.items.length;

//     setTimeout(() => {
//       setVisibleImagesCount(totalImages);
//       setIsLoadingMore(false);
//     }, 300);
//   }, [selectedSubCategory]);

//   // Show less images
//   const showLessImages = useCallback(() => {
//     setIsLoadingMore(true);

//     setTimeout(() => {
//       setVisibleImagesCount(getInitialCount());
//       setIsLoadingMore(false);

//       // Scroll to top when showing less
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }, 300);
//   }, []);

//   // Image loading handlers
//   const handleImageLoad = useCallback((imageId) => {
//     setLoadedImages(prev => new Set(prev).add(imageId));
//   }, []);

//   const handleImageError = useCallback((e, imageId) => {
//     e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' text-anchor='middle' fill='%23999'%3EImage%3C/text%3E%3C/svg%3E";
//     handleImageLoad(imageId);
//   }, [handleImageLoad]);

//   // Category handlers
//   const handleCategoryClick = useCallback((category) => {
//     setSelectedCategory(category);
//     if (category.subcategories?.length > 0) {
//       setSelectedSubCategory(category.subcategories[0]);
//     }
//     setVisibleImagesCount(getInitialCount());
//     setLoadedImages(new Set());
//     setVisibleImages(new Set());
//   }, []);

//   const handleSubCategoryClick = useCallback((subcategory) => {
//     setSelectedSubCategory(subcategory);
//     setVisibleImagesCount(getInitialCount());
//     setLoadedImages(new Set());
//     setVisibleImages(new Set());
//   }, []);

//   // Debounce utility
//   const debounce = (func, wait) => {
//     let timeout;
//     return (...args) => {
//       clearTimeout(timeout);
//       timeout = setTimeout(() => func.apply(this, args), wait);
//     };
//   };

//   // Loading skeleton
//   const ImageSkeleton = ({ count = 1 }) => (
//     <>
//       {Array.from({ length: count }).map((_, index) => (
//         <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden border border-navy-100">
//           <div className="relative aspect-square bg-gradient-to-r from-gray-100 via-navy-50/30 to-gray-100">
//             <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
//           </div>
//           <div className="p-4">
//             <div className="h-4 bg-gradient-to-r from-gray-100 to-navy-50/30 rounded w-3/4 mb-3">
//               <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
//             </div>
//             <div className="h-4 bg-gradient-to-r from-gray-100 to-navy-50/30 rounded w-1/4" />
//           </div>
//         </div>
//       ))}
//     </>
//   );

//   // Loading state
//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-white to-navy-50/30 py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
//         <div className="max-w-7xl mx-auto relative z-10">
//           <div className="flex flex-col items-center justify-center min-h-[60vh]">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-600"></div>
//             <p className="font-primary text-gray-600 mt-4">Loading gallery...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // No data state
//   if (!galleryData.categories || galleryData.categories.length === 0) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-white to-navy-50/30 py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
//         <div className="max-w-7xl mx-auto relative z-10">
//           <div className="text-center py-12">
//             <ImagesIcon className="w-16 h-16 text-navy-400 mx-auto mb-4" />
//             <h3 className="font-primary text-xl font-semibold text-gray-600 mb-2">
//               No Gallery Data Available
//             </h3>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white to-navy-50/30 py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
//       {/* Background decorative elements */}
//       <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-navy-100/20 to-blue-100/10 rounded-full -translate-x-24 -translate-y-24"></div>
//       <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-tl from-blue-100/10 to-navy-100/20 rounded-full translate-x-24 translate-y-24"></div>

//       {/* Creative decorative elements */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute top-10 left-5 sm:top-20 sm:left-10 opacity-20 animate-bounce">
//           <Cloud className="w-8 h-8 sm:w-10 sm:h-10 text-navy-400" />
//         </div>
//         <div className="absolute top-20 right-8 sm:top-32 sm:right-16 opacity-20 animate-pulse">
//           <Star className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-400" />
//         </div>
//         <div className="absolute bottom-20 left-10 sm:bottom-32 sm:left-20 opacity-20 animate-bounce">
//           <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-pink-400" />
//         </div>
//         <div className="absolute top-1/3 left-1/4 opacity-15">
//           <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-navy-300" />
//         </div>
//         <div className="absolute bottom-1/3 right-1/4 opacity-15">
//           <ImagesIcon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-300" />
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto relative z-10">
//         {/* ================= HEADER ================= */}
//         <motion.div
//           className="text-center mb-8 sm:mb-12 md:mb-16"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           <div className="inline-flex items-center gap-3 mb-4">
//             <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-500"></div>
//             <h1 className="font-title text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gradient-navy">
            
//               School Gallery
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
//             Explore photos from our school events, activities, celebrations, and daily campus life
//           </p>

//           {/* Quick Stats */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.4 }}
//             className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-6"
//           >
//             <div className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-gradient-to-br from-navy-50 to-blue-50 rounded-full border border-navy-100">
//               <ImagesIcon className="h-3 w-3 sm:h-4 sm:w-4 text-navy-600" />
//               <span className="text-xs sm:text-sm font-medium text-navy-700">
//                 {galleryData.categories.reduce((total, cat) => 
//                   total + (cat.subcategories?.reduce((subTotal, sub) => 
//                     subTotal + (sub.items?.length || 0), 0) || 0), 0)} Photos
//               </span>
//             </div>
//             <div className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-gradient-to-br from-navy-50 to-blue-50 rounded-full border border-navy-100">
//               <Building className="h-3 w-3 sm:h-4 sm:w-4 text-navy-600" />
//               <span className="text-xs sm:text-sm font-medium text-navy-700">
//                 {galleryData.categories.length} Categories
//               </span>
//             </div>
//             <div className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-gradient-to-br from-navy-50 to-blue-50 rounded-full border border-navy-100">
//               <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-navy-600" />
//               <span className="text-xs sm:text-sm font-medium text-navy-700">
//                 Updated Regularly
//               </span>
//             </div>
//           </motion.div>
//         </motion.div>

//         {/* Breadcrumb */}
//         <motion.div
//           className="font-primary flex items-center gap-2 mb-6 text-sm text-gray-600"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.6 }}
//         >
//           <button
//             onClick={() => navigate("/")}
//             className="text-gray-600 hover:text-navy-700 transition-colors font-medium flex items-center gap-1"
//           >
//             <Home className="w-3 h-3" />
//             <span>Home</span>
//           </button>
//           <span>/</span>
//           <span className="font-medium text-navy-700">Gallery</span>
//         </motion.div>

//         {/* Category Selection */}
//         <motion.div
//           className="mb-8"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-navy-100 p-4 sm:p-6">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="relative">
//                 <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-navy-600 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center">
//                   <Filter className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
//                 </div>
//                 <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
//                   <Star className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-white" />
//                 </div>
//               </div>
//               <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-navy-800">
//                 Select Category
//               </h2>
//             </div>

//             <div className="flex flex-wrap gap-2">
//               {galleryData.categories.map((category) => (
//                 <motion.button
//                   key={category.id}
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ duration: 0.3 }}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => handleCategoryClick(category)}
//                   className={`font-primary px-4 py-2 rounded-full font-medium transition-all ${selectedCategory?.id === category.id
//                       ? "bg-gradient-to-r from-navy-600 to-blue-600 text-white shadow-lg scale-105"
//                       : "bg-gradient-to-br from-white to-gray-50 text-gray-700 hover:bg-navy-50 border border-navy-100"
//                     }`}
//                 >
//                   {category.icon} {category.title}
//                 </motion.button>
//               ))}
//             </div>
//           </div>
//         </motion.div>

//         {/* Sub-Category Selection */}
//         {selectedCategory?.subcategories?.length > 0 && (
//           <motion.div
//             className="mb-8"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.1 }}
//           >
//             <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-navy-100 p-4 sm:p-6">
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="relative">
//                   <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-navy-600 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center">
//                     <ImagesIcon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
//                   </div>
//                 </div>
//                 <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-navy-800">
//                   Select Album
//                 </h2>
//               </div>

//               <div className="flex flex-wrap gap-2">
//                 {selectedCategory.subcategories.map((subcategory) => (
//                   <motion.button
//                     key={subcategory.id}
//                     initial={{ opacity: 0, scale: 0.9 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ duration: 0.3 }}
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={() => handleSubCategoryClick(subcategory)}
//                     className={`font-primary px-3 py-1.5 rounded-md text-sm font-medium transition-all ${selectedSubCategory?.id === subcategory.id
//                         ? "bg-gradient-to-r from-navy-600 to-blue-600 text-white"
//                         : "bg-gradient-to-br from-white to-gray-50 text-gray-700 hover:bg-navy-50 border border-navy-100"
//                       }`}
//                   >
//                     {subcategory.icon} {subcategory.title}
//                   </motion.button>
//                 ))}
//               </div>
//             </div>
//           </motion.div>
//         )}

//         {/* Gallery Content */}
//         {selectedSubCategory ? (
//           <>
//             {/* Section Header */}
//             <motion.div
//               className="mb-6"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//             >
//               <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-navy-100 p-4 sm:p-5 md:p-6">
//                 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
//                   <div>
//                     <h2 className="font-title text-2xl sm:text-3xl font-bold text-navy-800 mb-2">
//                       {selectedSubCategory.title}
//                     </h2>
//                     <p className="font-primary text-gray-600">
//                       Showing {Math.min(visibleImagesCount, visibleItems.length)} of {selectedSubCategory.items?.length || 0} photos
//                     </p>
//                   </div>

//                   {/* Quick View Toggle (Mobile) */}
//                   <div className="sm:hidden">
//                     <button
//                       onClick={isViewAllActive ? showLessImages : showAllImages}
//                       className="font-primary inline-flex items-center gap-1 text-sm text-navy-600 font-medium hover:underline"
//                     >
//                       {isViewAllActive ? "Show Less" : "View All"}
//                       {isViewAllActive ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
//                     </button>
//                   </div>
//                 </div>

//                 {/* Progress Bar */}
//                 {hasMoreItems && !isViewAllActive && (
//                   <div className="mt-4">
//                     <div className="w-full h-2 bg-gradient-to-r from-gray-100 to-navy-50/30 rounded-full overflow-hidden">
//                       <div
//                         className="h-full bg-gradient-to-r from-navy-600 to-blue-600 transition-all duration-300"
//                         style={{
//                           width: `${(visibleImagesCount / selectedSubCategory.items.length) * 100}%`
//                         }}
//                       />
//                     </div>
//                     <p className="font-primary text-gray-600 text-sm mt-2 text-center">
//                       {visibleImagesCount} of {selectedSubCategory.items.length} photos loaded
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </motion.div>

//             {/* Gallery Grid */}
//             <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-8">
//               {visibleItems.length === 0 ? (
//                 <ImageSkeleton count={getInitialCount()} />
//               ) : (
//                 visibleItems.map((item, index) => {
//                   const imageId = `${selectedSubCategory.id}-${item.id}`;
//                   const isLoaded = loadedImages.has(imageId);
//                   const shouldLoad = isLoaded || index < 4;

//                   return (
//                     <motion.div
//                       key={imageId}
//                       data-image-id={imageId}
//                       initial={{ opacity: 0, scale: 0.9 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       transition={{ duration: 0.4, delay: index * 0.05 }}
//                       whileHover={{ y: -5 }}
//                       className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden cursor-pointer border border-navy-100"
//                       onClick={() => setSelectedImage(item)}
//                     >
//                       <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-navy-50/30">
//                         {!isLoaded && (
//                           <div className="absolute inset-0 flex items-center justify-center">
//                             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-navy-600"></div>
//                           </div>
//                         )}

//                         <img
//                           src={shouldLoad ? item.image : ""}
//                           alt={item.alt || item.title}
//                           className={`w-full h-full object-cover transition-transform duration-700 ${isLoaded ? 'group-hover:scale-110 opacity-100' : 'opacity-0'
//                             }`}
//                           loading={index < 4 ? "eager" : "lazy"}
//                           onLoad={() => handleImageLoad(imageId)}
//                           onError={(e) => handleImageError(e, imageId)}
//                         />

//                         <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                           <div className="absolute bottom-3 left-3 right-3">
//                             <div className="flex items-center justify-between">
//                               <span className="font-primary text-white text-xs font-medium bg-black/50 px-2 py-1 rounded-full">
//                                 View
//                               </span>
//                               <Eye className="w-4 h-4 text-white/80" />
//                             </div>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="p-4">
//                         <h3 className="font-primary font-semibold text-navy-800 line-clamp-2 mb-2">
//                           {item.title}
//                         </h3>
//                         {item.date && (
//                           <div className="flex items-center gap-2 text-gray-500 text-sm">
//                             <Calendar className="w-4 h-4" />
//                             <span>
//                               {new Date(item.date).toLocaleDateString("en-US", {
//                                 month: "short",
//                                 day: "numeric",
//                                 year: "numeric"
//                               })}
//                             </span>
//                           </div>
//                         )}
//                       </div>
//                     </motion.div>
//                   );
//                 })
//               )}
//             </div>

//             {/* Load More / Show Less Controls */}
//             {selectedSubCategory.items && selectedSubCategory.items.length > getInitialCount() && (
//               <motion.div
//                 className="flex flex-col items-center gap-4 mb-8"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6 }}
//               >
//                 {/* Show More/Less Button */}
//                 <button
//                   onClick={isViewAllActive ? showLessImages : showAllImages}
//                   disabled={isLoadingMore}
//                   className={`font-primary inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed ${isViewAllActive
//                       ? "bg-gradient-to-br from-white to-gray-50 text-gray-700 hover:bg-navy-50 border border-navy-100"
//                       : "bg-gradient-to-r from-navy-600 to-blue-600 text-white"
//                     }`}
//                 >
//                   {isLoadingMore ? (
//                     <>
//                       <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
//                       Loading...
//                     </>
//                   ) : (
//                     <>
//                       {isViewAllActive ? "Show Less Images" : `View All ${selectedSubCategory.items.length} Images`}
//                       {isViewAllActive ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
//                     </>
//                   )}
//                 </button>

//                 {/* Incremental Load More Button (Alternative) */}
//                 {hasMoreItems && !isViewAllActive && (
//                   <button
//                     onClick={loadMoreImages}
//                     disabled={isLoadingMore}
//                     className="font-primary text-sm text-navy-600 font-medium hover:underline flex items-center gap-1"
//                   >
//                     Load {Math.min(getInitialCount(), selectedSubCategory.items.length - visibleImagesCount)} more
//                     <ChevronDown className="w-4 h-4" />
//                   </button>
//                 )}
//               </motion.div>
//             )}

//             {/* Loading More Indicator */}
//             {isLoadingMore && (
//               <div className="flex justify-center items-center py-8">
//                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-navy-600"></div>
//                 <p className="font-primary text-gray-600 ml-3">Loading more photos...</p>
//               </div>
//             )}

//             {/* Image Count Summary */}
//             <motion.div
//               className="mt-8 pt-6 border-t border-navy-200"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.6 }}
//             >
//               <p className="font-primary text-gray-600 text-sm text-center">
//                 {isViewAllActive ? (
//                   <>
//                     Showing all{" "}
//                     <span className="font-semibold text-navy-700">
//                       {selectedSubCategory.items.length}
//                     </span>{" "}
//                     photos from {selectedSubCategory.title}
//                   </>
//                 ) : (
//                   <>
//                     Showing{" "}
//                     <span className="font-semibold text-navy-700">
//                       {visibleImagesCount}
//                     </span>{" "}
//                     of {selectedSubCategory.items.length} photos
//                     {" • "}
//                     <button
//                       onClick={showAllImages}
//                       className="text-navy-600 hover:underline font-medium"
//                     >
//                       View all
//                     </button>
//                   </>
//                 )}
//               </p>
//             </motion.div>
//           </>
//         ) : (
//           <motion.div
//             className="text-center py-12 bg-gradient-to-br from-white to-navy-50/50 rounded-2xl border border-navy-100 shadow-sm"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.6 }}
//           >
//             <div className="w-16 h-16 bg-gradient-to-br from-navy-50 to-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-navy-100">
//               <ImagesIcon className="w-8 h-8 text-navy-400" />
//             </div>
//             <h3 className="font-primary text-xl font-semibold text-gray-600 mb-2">
//               Select a category to view photos
//             </h3>
//           </motion.div>
//         )}

//         {/* Image Modal */}
//         <AnimatePresence>
//           {selectedImage && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
//               onClick={() => setSelectedImage(null)}
//             >
//               <div className="relative max-w-4xl w-full bg-white rounded-xl overflow-hidden shadow-2xl">
//                 <button
//                   onClick={() => setSelectedImage(null)}
//                   className="absolute top-4 right-4 z-10 bg-black/70 text-white p-2 rounded-full hover:bg-black/90 transition-colors"
//                 >
//                   <X className="w-6 h-6" />
//                 </button>

//                 <div className="max-h-[70vh] overflow-hidden">
//                   <img
//                     src={selectedImage.image}
//                     alt={selectedImage.alt || selectedImage.title}
//                     className="w-full h-full object-contain"
//                   />
//                 </div>

//                 <div className="p-6">
//                   <h3 className="font-title text-2xl font-bold text-navy-800 mb-2">
//                     {selectedImage.title}
//                   </h3>
//                   {selectedImage.description && (
//                     <p className="font-primary text-gray-600 mb-4">
//                       {selectedImage.description}
//                     </p>
//                   )}

//                   <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-navy-200">
//                     {selectedImage.date && (
//                       <div className="flex items-center gap-2 text-gray-600">
//                         <Calendar className="w-5 h-5" />
//                         <span className="font-primary">
//                           {new Date(selectedImage.date).toLocaleDateString("en-US", {
//                             weekday: "long",
//                             month: "long",
//                             day: "numeric",
//                             year: "numeric"
//                           })}
//                         </span>
//                       </div>
//                     )}

//                     <span className="font-primary px-3 py-1 bg-gradient-to-r from-navy-600 to-blue-600 text-white rounded-full text-sm">
//                       {selectedSubCategory?.title || "Gallery"}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

        

//         {/* Back to Top Button */}
//         <motion.div
//           className="flex justify-center mt-8 sm:mt-12"
//           initial={{ opacity: 0, scale: 0 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.6, delay: 0.5 }}
//           viewport={{ once: true }}
//         >
//           <button
//             onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//             className="font-primary px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-navy-600 to-blue-600 text-white rounded-full text-xs sm:text-sm font-medium hover:shadow-lg transition-all duration-300 flex items-center gap-1 sm:gap-2"
//           >
//             <ArrowUp className="w-3 h-3 sm:w-4 sm:h-4" />
//             Back to Top
//           </button>
//         </motion.div>

//         {/* ================= BOTTOM DECORATIVE ELEMENT ================= */}
//         <motion.div
//           className="flex justify-center mt-8 sm:mt-12"
//           initial={{ opacity: 0, scale: 0 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.6, delay: 0.5 }}
//           viewport={{ once: true }}
//         >
//           <div className="flex items-center gap-3 sm:gap-4 text-navy-600">
//             <div className="w-6 h-px sm:w-8 md:w-12 bg-gradient-to-r from-transparent via-navy-400 to-transparent"></div>
//             <div className="flex items-center gap-1.5 sm:gap-2">
//               <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
//               <span className="text-xs sm:text-sm font-medium">School Memories & Events</span>
//               <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
//             </div>
//             <div className="w-6 h-px sm:w-8 md:w-12 bg-gradient-to-r from-transparent via-navy-400 to-transparent"></div>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Images;
