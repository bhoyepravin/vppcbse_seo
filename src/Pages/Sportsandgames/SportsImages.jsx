import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import sportsData from "../../constant/SportsData/sportsData";
import { 
  Trophy, 
  X, 
  Calendar, 
  Users, 
  MapPin, 
  PlayCircle,
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
  Target,
  Medal,
  Activity,
  Award,
  ChevronRight,
  ChevronLeft,
  Grid,
  List,
  Maximize2,
  Shield,
  TrendingUp,
  ChevronDown,
  Menu,
  ChevronUp
} from "lucide-react";
import axiosInstance from "../../services/api"; // Update this import path based on your project structure

const SportsImages = () => {
  const navigate = useNavigate();
  const [apiData, setApiData] = useState({
    sportsGallery: {
      id: "sports-gallery-section",
      header: {
        title: sportsData.header?.title || "Sports Gallery",
        description: sportsData.header?.description || "Action shots, team photos, and memorable moments from our school's sports events, tournaments, and athletic achievements.",
        decorations: {
          dots: sportsData.header?.decorations?.dots || [
            { color: "bg-navy-500" },
            { color: "bg-navy-500" }
          ],
          lineColor: sportsData.header?.decorations?.lineColor || "from-navy-600 via-blue-600 to-navy-600"
        }
      },
      quickStats: sportsData.quickStats || [
        {
          icon: "Trophy",
          label: "Photos",
          value: 9,
          color: "text-navy-600"
        },
        {
          icon: "Activity",
          label: "Sports",
          value: 3,
          color: "text-navy-600"
        },
        {
          icon: "Award",
          label: "Awards",
          value: "50+",
          color: "text-navy-600"
        }
      ],
      categories: sportsData.categories || [],
      years: sportsData.years || ["2023", "2022", "2021"],
      messages: sportsData.messages || {
        noPhotos: "No Photos Found",
        noPhotosDescription: "Try adjusting your search or filter criteria",
        loading: "Loading...",
        loadMore: "Load More Photos",
        viewAll: "View All {count} Photos",
        showLess: "Show Less"
      },
      footer: {
        text: sportsData.footer?.text || "Champions in Action",
        backToTop: sportsData.footer?.backToTop || "Back to Top",
        decorations: {
          lineColor: sportsData.footer?.decorations?.lineColor || "from-transparent via-navy-400 to-transparent",
          icons: {
            left: sportsData.footer?.decorations?.icons?.left || "Star",
            right: sportsData.footer?.decorations?.icons?.right || "Star",
            color: sportsData.footer?.decorations?.icons?.color || "text-yellow-500"
          }
        }
      }
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleImagesCount, setVisibleImagesCount] = useState(12);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [selectedYear, setSelectedYear] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const observerRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    fetchSportsGallery();
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

  const fetchSportsGallery = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/sports-gallery');
      
      if (response.data.success) {
        const apiResponse = response.data.data;
        
        // Process the API data - fix image URLs
        const processedData = {
          sportsGallery: {
            id: apiResponse.sportsGallery?.id || "sports-gallery-section",
            header: {
              title: apiResponse.sportsGallery?.header?.title || "Sports Gallery",
              description: apiResponse.sportsGallery?.header?.description || "Action shots, team photos, and memorable moments from our school's sports events, tournaments, and athletic achievements.",
              decorations: {
                dots: apiResponse.sportsGallery?.header?.decorations?.dots || [
                  { color: "bg-navy-500" },
                  { color: "bg-navy-500" }
                ],
                lineColor: apiResponse.sportsGallery?.header?.decorations?.lineColor || "from-navy-600 via-blue-600 to-navy-600"
              }
            },
            quickStats: apiResponse.sportsGallery?.quickStats?.length > 0 
              ? apiResponse.sportsGallery.quickStats 
              : apiData.sportsGallery.quickStats,
            categories: apiResponse.sportsGallery?.categories?.map(category => ({
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
            years: apiResponse.sportsGallery?.years ? 
              (typeof apiResponse.sportsGallery.years === 'string' ? 
                JSON.parse(apiResponse.sportsGallery.years) : 
                apiResponse.sportsGallery.years) 
              : ["2023", "2022", "2021"],
            messages: apiResponse.sportsGallery?.messages || {
              noPhotos: "No Photos Found",
              noPhotosDescription: "Try adjusting your search or filter criteria",
              loading: "Loading...",
              loadMore: "Load More Photos",
              viewAll: "View All {count} Photos",
              showLess: "Show Less"
            },
            footer: {
              text: apiResponse.sportsGallery?.footer?.text || "Champions in Action",
              backToTop: apiResponse.sportsGallery?.footer?.backToTop || "Back to Top",
              decorations: {
                lineColor: apiResponse.sportsGallery?.footer?.decorations?.lineColor || "from-transparent via-navy-400 to-transparent",
                icons: {
                  left: apiResponse.sportsGallery?.footer?.decorations?.icons?.left || "Star",
                  right: apiResponse.sportsGallery?.footer?.decorations?.icons?.right || "Star",
                  color: apiResponse.sportsGallery?.footer?.decorations?.icons?.color || "text-yellow-500"
                }
              }
            }
          }
        };
        
        setApiData(processedData);

        if (processedData.sportsGallery.categories.length > 0) {
          const firstCategory = processedData.sportsGallery.categories[0];
          setSelectedCategory(firstCategory);

          if (firstCategory.subcategories?.length > 0) {
            setSelectedSubCategory(firstCategory.subcategories[0]);
          }
        }

        setError(null);
      }
    } catch (err) {
      console.error('Error fetching sports gallery:', err);
      setError('Failed to load sports gallery');
    } finally {
      setLoading(false);
    }
  };

  const data = apiData.sportsGallery;

  // Check device type
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Get initial count based on screen size
  const getInitialCount = useCallback(() => {
    const width = window.innerWidth;
    if (width < 480) return 4;
    if (width < 640) return 6;
    if (width < 768) return 8;
    if (width < 1024) return 9;
    if (width < 1280) return 12;
    return 15;
  }, []);

  // Initialize visible images count
  useEffect(() => {
    setVisibleImagesCount(getInitialCount());
  }, [getInitialCount]);

  // Get available years from data
  const years = useMemo(() => {
    const allYears = new Set(["all"]);
    data.categories?.forEach(category => {
      category.subcategories?.forEach(subcategory => {
        subcategory.items?.forEach(item => {
          if (item.year) allYears.add(item.year);
        });
      });
    });
    return Array.from(allYears).sort((a, b) => b - a);
  }, [data.categories]);

  // Calculate total photos
  const totalPhotos = useMemo(() => data.categories?.reduce(
    (total, category) =>
      total +
      (category.subcategories?.reduce(
        (subTotal, subcategory) => subTotal + (subcategory.items?.length || 0),
        0
      ) || 0),
    0
  ) || 0, [data.categories]);

  // Filter images based on search and year
  const filteredItems = useMemo(() => {
    if (!selectedSubCategory?.items) return [];

    return selectedSubCategory.items.filter(item => {
      const matchesSearch = searchTerm === "" || 
        item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.venue && item.venue.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesYear = selectedYear === "all" || item.year === selectedYear;

      return matchesSearch && matchesYear;
    });
  }, [selectedSubCategory, searchTerm, selectedYear]);

  // Get visible items based on pagination
  const visibleItems = useMemo(() => {
    return filteredItems.slice(0, visibleImagesCount);
  }, [filteredItems, visibleImagesCount]);

  // Check if there are more items to load
  const hasMoreItems = useMemo(() => {
    return visibleImagesCount < filteredItems.length;
  }, [visibleImagesCount, filteredItems.length]);

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

  // Load more images
  const loadMoreImages = useCallback(() => {
    if (!selectedSubCategory || !hasMoreItems || isLoadingMore) return;

    setIsLoadingMore(true);
    const increment = getInitialCount();
    const newCount = Math.min(visibleImagesCount + increment, filteredItems.length);

    setTimeout(() => {
      setVisibleImagesCount(newCount);
      setIsLoadingMore(false);
      // Scroll to show new content on mobile
      if (isMobile && containerRef.current) {
        const element = containerRef.current;
        const scrollPosition = element.scrollHeight - window.innerHeight;
        window.scrollTo({
          top: scrollPosition - 100,
          behavior: 'smooth'
        });
      }
    }, 300);
  }, [selectedSubCategory, hasMoreItems, visibleImagesCount, isLoadingMore, filteredItems.length, getInitialCount, isMobile]);

  // Show all images
  const showAllImages = useCallback(() => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleImagesCount(filteredItems.length);
      setIsLoadingMore(false);
    }, 300);
  }, [filteredItems.length]);

  // Show less images
  const showLessImages = useCallback(() => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleImagesCount(getInitialCount());
      setIsLoadingMore(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
  }, [getInitialCount]);

  // Handle image load
  const handleImageLoad = useCallback((imageId) => {
    setLoadedImages(prev => new Set(prev).add(imageId));
  }, []);

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
      <div className="min-h-screen bg-gradient-to-b from-white to-navy-50/30 py-4 sm:py-8 md:py-12 px-3 sm:px-4 md:px-6 lg:px-8 relative overflow-hidden flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading sports gallery...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-navy-50/30 py-4 sm:py-8 md:py-12 px-3 sm:px-4 md:px-6 lg:px-8 relative overflow-hidden flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-xl mb-4">⚠️ {error}</p>
          <button 
            onClick={fetchSportsGallery}
            className="px-6 py-2 bg-gradient-to-r from-navy-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const { header, quickStats, messages, footer } = data;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-navy-50/30 py-4 sm:py-8 md:py-12 px-3 sm:px-4 md:px-6 lg:px-8 relative overflow-hidden" ref={containerRef}>
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-gradient-to-br from-navy-100/20 to-blue-100/10 rounded-full -translate-x-16 sm:-translate-x-24 -translate-y-16 sm:-translate-y-24"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-gradient-to-tl from-blue-100/10 to-navy-100/20 rounded-full translate-x-16 sm:translate-x-24 translate-y-16 sm:translate-y-24"></div>

      {/* Creative decorative elements - Reduced on mobile */}
      <div className="absolute inset-0 pointer-events-none">
        {!isMobile && (
          <>
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
              <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-blue-300" />
            </div>
          </>
        )}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ================= HEADER ================= */}
        <motion.div
          className="text-center mb-6 sm:mb-8 md:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${header?.decorations?.dots?.[0]?.color || 'bg-navy-500'}`}></div>
            <h1 className="font-title text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gradient-navy">
              {header?.title || "Sports Gallery"}
            </h1>
            <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${header?.decorations?.dots?.[1]?.color || 'bg-navy-500'}`}></div>
          </div>

          <motion.div
            className={`h-1 sm:h-1.5 w-12 sm:w-16 md:w-20 lg:w-24 bg-gradient-to-r ${header?.decorations?.lineColor || 'from-navy-600 via-blue-600 to-navy-600'} mx-auto mb-3 sm:mb-4 md:mb-6 rounded-full`}
            initial={{ width: 0 }}
            animate={{ width: isMobile ? "3rem" : "4rem" }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          
          <p className="text-gray-700 max-w-2xl mx-auto text-xs sm:text-sm md:text-base lg:text-lg px-2 sm:px-4">
            {header?.description || "Action shots, team photos, and memorable moments from our school's sports events, tournaments, and athletic achievements."}
          </p>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-1.5 sm:gap-2 md:gap-3 mt-4 sm:mt-6"
          >
            {quickStats?.map((stat, index) => (
              <div key={index} className="flex items-center gap-1 px-2 py-1 sm:px-2.5 sm:py-1.5 md:px-3 md:py-1.5 bg-gradient-to-br from-navy-50 to-blue-50 rounded-full border border-navy-100">
                {stat.icon === "Trophy" && <Trophy className={`h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 ${stat.color || 'text-navy-600'}`} />}
                {stat.icon === "Activity" && <Activity className={`h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 ${stat.color || 'text-navy-600'}`} />}
                {stat.icon === "Award" && <Award className={`h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 ${stat.color || 'text-navy-600'}`} />}
                <span className="text-xs sm:text-sm font-medium text-navy-700">
                  {stat.value} {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Breadcrumb */}
        <motion.div
          className="font-primary flex items-center gap-1.5 sm:gap-2 mb-4 sm:mb-6 text-xs sm:text-sm text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <button
            onClick={() => navigate("/")}
            className="text-gray-600 hover:text-navy-700 transition-colors font-medium flex items-center gap-1"
          >
            <Home className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden xs:inline">Home</span>
          </button>
          <span>/</span>
          <span className="font-medium text-navy-700 truncate">Sports Gallery</span>
        </motion.div>

        {/* ================= MOBILE CONTROLS ================= */}
        {isMobile && (
          <div className="flex gap-2 mb-4">
            {/* Mobile Search Button */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white rounded-lg border border-navy-100 text-navy-700 font-medium"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white rounded-lg border border-navy-100 text-navy-700 font-medium"
            >
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        )}

        {/* Mobile Filter Panel */}
        {isMobile && isFilterOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4"
          >
            <div className="bg-white rounded-lg border border-navy-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-navy-700">Filter by Year</h3>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {years.slice(0, 6).map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${selectedYear === year
                        ? "bg-gradient-to-r from-navy-600 to-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                  >
                    {year === "all" ? "All" : year}
                  </button>
                ))}
              </div>
              {years.length > 6 && (
                <div className="mt-3 text-center">
                  <button className="text-sm text-navy-600 font-medium">
                    View All {years.length} Years
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* ================= SPORTS CATEGORIES ================= */}
        <motion.div
          className="mb-6 sm:mb-8 md:mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-navy-100 p-3 sm:p-4 md:p-5 lg:p-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="relative">
                <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-gradient-to-br from-navy-600 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <Activity className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-white" />
                </div>
              </div>
              <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-navy-800">
                Select Sport
              </h2>
            </div>

            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {data.categories?.map((category) => {
                const categoryPhotos = category.subcategories?.reduce(
                  (total, sub) => total + (sub.items?.length || 0),
                  0
                ) || 0;
                
                return (
                  <motion.button
                    key={category.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setSelectedCategory(category);
                      setSelectedSubCategory(category.subcategories?.[0]);
                      setVisibleImagesCount(getInitialCount());
                      // Scroll to gallery on mobile
                      if (isMobile) {
                        setTimeout(() => {
                          document.getElementById('gallery-section')?.scrollIntoView({ 
                            behavior: 'smooth' 
                          });
                        }, 100);
                      }
                    }}
                    className={`font-primary px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg font-medium transition-all flex items-center gap-1.5 sm:gap-2 ${selectedCategory?.id === category.id
                        ? "bg-gradient-to-r from-navy-600 to-blue-600 text-white shadow-lg"
                        : "bg-gradient-to-br from-white to-gray-50 text-gray-700 hover:bg-navy-50 border border-navy-100"
                      }`}
                  >
                    <span className="text-base sm:text-lg">{category.icon}</span>
                    <span className="text-xs sm:text-sm">{category.title}</span>
                    <span className="text-xs opacity-80 bg-white/20 px-1.5 sm:px-2 py-0.5 rounded-full">
                      {categoryPhotos}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* ================= SELECTED SPORT DETAILS ================= */}
        {selectedCategory && (
          <motion.div
            className="mb-6 sm:mb-8 md:mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-gradient-to-r from-navy-50/80 to-blue-50/80 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-navy-100 p-3 sm:p-4 md:p-5 lg:p-6">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 sm:gap-5 md:gap-6">
                <div className="flex-1">
                  <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-navy-50 to-blue-50 flex items-center justify-center border border-navy-100 flex-shrink-0">
                      <span className="text-xl sm:text-2xl text-navy-600">{selectedCategory.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="font-title text-lg sm:text-xl md:text-2xl font-bold text-navy-800 truncate">
                        {selectedCategory.title}
                      </h2>
                      <p className="font-primary text-gray-600 mt-1 text-xs sm:text-sm md:text-base">
                        {selectedCategory.description}
                      </p>
                    </div>
                  </div>

                  {/* Sub-Category Selection */}
                  {selectedCategory.subcategories && (
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-4">
                      {selectedCategory.subcategories.map((subcategory) => (
                        <button
                          key={subcategory.id}
                          onClick={() => {
                            setSelectedSubCategory(subcategory);
                            // Scroll to gallery on mobile
                            if (isMobile) {
                              setTimeout(() => {
                                document.getElementById('gallery-section')?.scrollIntoView({ 
                                  behavior: 'smooth' 
                                });
                              }, 100);
                            }
                          }}
                          className={`font-primary px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all ${selectedSubCategory?.id === subcategory.id
                              ? "bg-gradient-to-r from-navy-600 to-blue-600 text-white"
                              : "bg-gradient-to-br from-white to-gray-50 text-gray-700 hover:bg-navy-50 border border-navy-100"
                            }`}
                        >
                          <span className="mr-1">{subcategory.icon}</span>
                          <span>{subcategory.title}</span>
                          <span className="ml-1.5 text-xs opacity-80">
                            ({subcategory.items?.length || 0})
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex-shrink-0 mt-4 md:mt-0">
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <div className="bg-white/80 rounded-lg p-3 text-center border border-navy-100 min-w-[100px]">
                      <div className="text-lg sm:text-xl md:text-2xl font-bold text-navy-700 mb-1">
                        {selectedCategory.subcategories?.reduce((total, sub) => total + (sub.items?.length || 0), 0) || 0}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600">Photos</div>
                    </div>
                    <div className="bg-white/80 rounded-lg p-3 text-center border border-navy-100 min-w-[100px]">
                      <div className="text-lg sm:text-xl md:text-2xl font-bold text-navy-700 mb-1">
                        {selectedCategory.subcategories?.length || 0}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600">Events</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ================= GALLERY SECTION ================= */}
        {selectedSubCategory && (
          <motion.div
            id="gallery-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-6 sm:mb-8 md:mb-10 lg:mb-12"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-navy-100 p-3 sm:p-4 md:p-5 lg:p-6">
              {/* Section Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-5 md:mb-6">
                <div className="flex-1 min-w-0">
                  <h2 className="font-title text-lg sm:text-xl md:text-2xl font-bold text-navy-800 mb-1 truncate">
                    {selectedSubCategory.title}
                  </h2>
                  <p className="font-primary text-gray-600 text-xs sm:text-sm">
                    Showing {Math.min(visibleImagesCount, visibleItems.length)} of {filteredItems.length} photos
                  </p>
                </div>

                {/* View Mode Toggle - Desktop */}
                {!isMobile && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded-lg ${viewMode === "grid"
                          ? "bg-gradient-to-r from-navy-600 to-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                      <Grid className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded-lg ${viewMode === "list"
                          ? "bg-gradient-to-r from-navy-600 to-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                      <List className="w-5 h-5" />
                    </button>
                  </div>
                )}

                {/* Load More Controls */}
                {filteredItems.length > getInitialCount() && !isMobile && (
                  <div className="flex items-center gap-2">
                    {hasMoreItems ? (
                      <button
                        onClick={showAllImages}
                        className="font-primary inline-flex items-center gap-1 text-sm text-navy-600 font-medium hover:underline whitespace-nowrap"
                      >
                        View All {filteredItems.length}
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={showLessImages}
                        className="font-primary inline-flex items-center gap-1 text-sm text-navy-600 font-medium hover:underline whitespace-nowrap"
                      >
                        Show Less
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Mobile View Mode Toggle */}
              {isMobile && (
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium ${viewMode === "grid"
                          ? "bg-gradient-to-r from-navy-600 to-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                      <Grid className="w-4 h-4 inline mr-1" />
                      Grid
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium ${viewMode === "list"
                          ? "bg-gradient-to-r from-navy-600 to-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                      <List className="w-4 h-4 inline mr-1" />
                      List
                    </button>
                  </div>
                  
                  {filteredItems.length > getInitialCount() && (
                    <div className="text-right">
                      <button
                        onClick={hasMoreItems ? showAllImages : showLessImages}
                        className="text-xs sm:text-sm text-navy-600 font-medium hover:underline"
                      >
                        {hasMoreItems ? `View All ${filteredItems.length}` : "Show Less"}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Progress Bar */}
              {hasMoreItems && (
                <div className="mb-4 sm:mb-6">
                  <div className="w-full h-1.5 sm:h-2 bg-gradient-to-r from-gray-100 to-navy-50/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-navy-600 to-blue-600 transition-all duration-300"
                      style={{
                        width: `${(visibleImagesCount / filteredItems.length) * 100}%`
                      }}
                    />
                  </div>
                  <p className="font-primary text-gray-600 text-xs sm:text-sm mt-1.5 sm:mt-2 text-center">
                    {visibleImagesCount} of {filteredItems.length} photos loaded
                  </p>
                </div>
              )}

              {/* Gallery Content */}
              {visibleItems.length === 0 ? (
                <div className="text-center py-8 sm:py-12">
                  <Trophy className="w-12 h-12 sm:w-16 sm:h-16 text-navy-400 mx-auto mb-3 sm:mb-4" />
                  <h3 className="font-primary text-base sm:text-lg md:text-xl font-semibold text-gray-600 mb-2">
                    {messages?.noPhotos || "No Photos Found"}
                  </h3>
                  <p className="font-primary text-gray-500 text-sm sm:text-base">
                    {messages?.noPhotosDescription || "Try adjusting your search or filter criteria"}
                  </p>
                </div>
              ) : viewMode === "grid" ? (
                // Grid View
                <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'} gap-3 sm:gap-4 md:gap-5 lg:gap-6`}>
                  {visibleItems.map((item, index) => {
                    const imageId = `${selectedSubCategory.id}-${item.id}`;
                    const isLoaded = loadedImages.has(imageId);
                    const shouldLoad = isLoaded || index < (isMobile ? 2 : 4);

                    return (
                      <motion.div
                        key={imageId}
                        data-image-id={imageId}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        whileHover={{ y: -3 }}
                        className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden cursor-pointer border border-navy-100"
                        onClick={() => setSelectedImage(item)}
                      >
                        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-navy-50/30">
                          {!isLoaded && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-navy-600"></div>
                            </div>
                          )}

                          <img
                            src={shouldLoad ? item.image : ""}
                            alt={item.alt || item.title}
                            className={`w-full h-full object-cover transition-transform duration-700 ${isLoaded ? 'group-hover:scale-110 opacity-100' : 'opacity-0'
                              }`}
                            loading={index < (isMobile ? 2 : 4) ? "eager" : "lazy"}
                            onLoad={() => handleImageLoad(imageId)}
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3">
                              <div className="flex items-center justify-between">
                                <span className="font-primary text-white text-xs font-medium bg-black/50 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full">
                                  View
                                </span>
                                <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4 text-white/80" />
                              </div>
                            </div>
                          </div>

                          {/* Sport Badge */}
                          <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                            <span className="font-primary text-white text-xs font-medium bg-black/50 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full truncate max-w-[80px]">
                              {selectedCategory.title}
                            </span>
                          </div>

                          {/* Year Badge */}
                          {item.year && (
                            <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                              <span className="font-primary text-white text-xs font-medium bg-black/50 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full">
                                {item.year}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="p-3 sm:p-4">
                          <h3 className="font-primary font-semibold text-navy-800 text-sm sm:text-base line-clamp-1 mb-1.5 sm:mb-2">
                            {item.title}
                          </h3>
                          {item.description && (
                            <p className="font-primary text-gray-600 text-xs sm:text-sm line-clamp-2 mb-2 sm:mb-3">
                              {item.description}
                            </p>
                          )}
                          <div className="flex flex-wrap items-center justify-between gap-1 sm:gap-2">
                            {item.date && (
                              <div className="flex items-center gap-1 text-gray-500 text-xs sm:text-sm">
                                <Calendar className="w-3 h-3" />
                                <span>
                                  {new Date(item.date).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })}
                                </span>
                              </div>
                            )}
                            {item.venue && (
                              <div className="flex items-center gap-1 text-gray-500 text-xs sm:text-sm">
                                <MapPin className="w-3 h-3" />
                                <span className="truncate max-w-[80px] sm:max-w-[100px]">{item.venue}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                // List View
                <div className="space-y-3 sm:space-y-4">
                  {visibleItems.map((item, index) => {
                    const imageId = `${selectedSubCategory.id}-${item.id}`;
                    const isLoaded = loadedImages.has(imageId);

                    return (
                      <motion.div
                        key={imageId}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        whileHover={{ x: 5 }}
                        className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border border-navy-100"
                        onClick={() => setSelectedImage(item)}
                      >
                        <div className="flex flex-col sm:flex-row">
                          <div className="w-full sm:w-32 md:w-48 h-48 sm:h-32 md:h-48 flex-shrink-0 relative overflow-hidden bg-gradient-to-br from-gray-100 to-navy-50/30">
                            {!isLoaded && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-navy-600"></div>
                              </div>
                            )}
                            <img
                              src={item.image}
                              alt={item.alt || item.title}
                              className={`w-full h-full object-cover transition-transform duration-700 ${isLoaded ? 'group-hover:scale-110 opacity-100' : 'opacity-0'
                                }`}
                              onLoad={() => handleImageLoad(imageId)}
                            />
                          </div>
                          <div className="flex-1 p-3 sm:p-4 md:p-6">
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2">
                              <h3 className="font-primary font-bold text-navy-800 text-base sm:text-lg mb-1 sm:mb-0">
                                {item.title}
                              </h3>
                              <span className="font-primary px-2 py-1 bg-gradient-to-r from-navy-50 to-blue-50 text-navy-700 rounded-full text-xs sm:text-sm whitespace-nowrap">
                                {selectedCategory.title}
                              </span>
                            </div>
                            {item.description && (
                              <p className="font-primary text-gray-600 text-sm sm:text-base mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3">
                                {item.description}
                              </p>
                            )}
                            <div className="font-primary flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-gray-500 text-xs sm:text-sm">
                              {item.date && (
                                <div className="flex items-center gap-1.5 sm:gap-2">
                                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                                  <span>
                                    {new Date(item.date).toLocaleDateString("en-US", {
                                      month: "short",
                                      day: "numeric",
                                      year: "numeric",
                                    })}
                                  </span>
                                </div>
                              )}
                              {item.venue && (
                                <div className="flex items-center gap-1.5 sm:gap-2">
                                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                                  <span className="truncate">{item.venue}</span>
                                </div>
                              )}
                              {item.year && (
                                <div className="flex items-center gap-1.5 sm:gap-2">
                                  <Trophy className="w-3 h-3 sm:w-4 sm:h-4" />
                                  <span>{item.year}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}

              {/* Load More Button */}
              {hasMoreItems && (
                <div className="mt-6 sm:mt-8 text-center">
                  <button
                    onClick={loadMoreImages}
                    disabled={isLoadingMore}
                    className="font-primary inline-flex items-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-navy-600 to-blue-600 text-white rounded-full text-sm sm:text-base font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed w-full sm:w-auto justify-center"
                  >
                    {isLoadingMore ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
                        <span>{messages?.loading || "Loading..."}</span>
                      </>
                    ) : (
                      <>
                        <span>{messages?.loadMore || "Load More Photos"}</span>
                        <ChevronDown className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <p className="font-primary text-gray-600 text-xs sm:text-sm mt-2">
                    {visibleImagesCount} of {filteredItems.length} photos loaded
                  </p>
                </div>
              )}

              {/* Mobile View All Button */}
              {isMobile && hasMoreItems && filteredItems.length > 30 && (
                <div className="mt-4 text-center">
                  <button
                    onClick={showAllImages}
                    className="text-sm text-navy-600 font-medium hover:underline"
                  >
                    {messages?.viewAll?.replace("{count}", filteredItems.length) || `View All ${filteredItems.length} Photos`}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* ================= IMAGE MODAL ================= */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative max-w-4xl w-full bg-white rounded-xl overflow-hidden shadow-2xl max-h-[90vh] sm:max-h-[85vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 bg-black/70 text-white p-1.5 sm:p-2 rounded-full hover:bg-black/90 transition-colors"
                >
                  <X className="w-4 h-4 sm:w-6 sm:h-6" />
                </button>

                <div className="flex-1 overflow-auto">
                  <img
                    src={selectedImage.image}
                    alt={selectedImage.alt || selectedImage.title}
                    className="w-full h-auto object-contain max-h-[50vh] sm:max-h-[60vh]"
                    onError={(e) => {
                      e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' text-anchor='middle' fill='%23999'%3EImage Not Found%3C/text%3E%3C/svg%3E";
                    }}
                  />

                  <div className="p-3 sm:p-4 md:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-title text-lg sm:text-xl md:text-2xl font-bold text-navy-800 mb-1 sm:mb-2 break-words">
                          {selectedImage.title}
                        </h3>
                        {selectedImage.description && (
                          <p className="font-primary text-gray-600 text-sm sm:text-base break-words">
                            {selectedImage.description}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-xl sm:text-2xl">{selectedCategory?.icon}</span>
                        <span className="font-primary px-2 py-1 sm:px-3 sm:py-1 bg-gradient-to-r from-navy-600 to-blue-600 text-white rounded-full text-xs sm:text-sm whitespace-nowrap">
                          {selectedCategory?.title}
                        </span>
                      </div>
                    </div>

                    <div className="font-primary flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center justify-between gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-navy-200">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                        {selectedImage.date && (
                          <div className="flex items-center gap-1.5 sm:gap-2 text-gray-600 text-sm sm:text-base">
                            <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span>
                              {new Date(selectedImage.date).toLocaleDateString(
                                "en-US",
                                {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </span>
                          </div>
                        )}
                        {selectedImage.venue && (
                          <div className="flex items-center gap-1.5 sm:gap-2 text-gray-600 text-sm sm:text-base">
                            <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="break-words">{selectedImage.venue}</span>
                          </div>
                        )}
                        {selectedImage.year && (
                          <div className="flex items-center gap-1.5 sm:gap-2 text-gray-600 text-sm sm:text-base">
                            <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span>{selectedImage.year}</span>
                          </div>
                        )}
                      </div>
                      <span className="px-2 py-1 sm:px-3 sm:py-1 bg-gradient-to-br from-white to-gray-50 text-gray-700 rounded-full text-xs sm:text-sm border border-navy-100 whitespace-nowrap">
                        {selectedSubCategory?.title}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ================= BACK TO TOP ================= */}
        <motion.div
          className="flex justify-center mt-6 sm:mt-8 md:mt-10"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-primary px-3 sm:px-4 py-1.5 sm:py-2.5 bg-gradient-to-r from-navy-600 to-blue-600 text-white rounded-full text-xs sm:text-sm font-medium hover:shadow-lg transition-all duration-300 flex items-center gap-1 sm:gap-2"
          >
            <ArrowUp className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>{footer?.backToTop || "Back to Top"}</span>
          </button>
        </motion.div>

        {/* ================= BOTTOM DECORATIVE ELEMENT ================= */}
        <motion.div
          className="flex justify-center mt-6 sm:mt-8 md:mt-10"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 text-navy-600">
            <div className={`w-4 h-px sm:w-6 md:w-8 lg:w-12 bg-gradient-to-r ${footer?.decorations?.lineColor || 'from-transparent via-navy-400 to-transparent'}`}></div>
            <div className="flex items-center gap-1 sm:gap-2">
              {footer?.decorations?.icons?.left === "Star" && (
                <Star className={`w-3 h-3 sm:w-4 sm:h-4 ${footer?.decorations?.icons?.color || 'text-yellow-500'}`} />
              )}
              <span className="text-xs sm:text-sm font-medium">{footer?.text || "Champions in Action"}</span>
              {footer?.decorations?.icons?.right === "Star" && (
                <Star className={`w-3 h-3 sm:w-4 sm:h-4 ${footer?.decorations?.icons?.color || 'text-yellow-500'}`} />
              )}
            </div>
            <div className={`w-4 h-px sm:w-6 md:w-8 lg:w-12 bg-gradient-to-r ${footer?.decorations?.lineColor || 'from-transparent via-navy-400 to-transparent'}`}></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SportsImages;



// import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import sportsData from "../../constant/SportsData/sportsData";
// import { 
//   Trophy, 
//   X, 
//   Calendar, 
//   Users, 
//   MapPin, 
//   PlayCircle,
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
//   Target,
//   Medal,
//   Activity,
//   Award,
//   ChevronRight,
//   ChevronLeft,
//   Grid,
//   List,
//   Maximize2,
//   Shield,
//   TrendingUp,
//   ChevronDown,
//   Menu,
//   ChevronUp
// } from "lucide-react";

// const SportsImages = () => {
//   const navigate = useNavigate();
//   const data = sportsData;

//   const [selectedImage, setSelectedImage] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState(data.categories[0]);
//   const [selectedSubCategory, setSelectedSubCategory] = useState(
//     data.categories[0].subcategories[0]
//   );
//   const [viewMode, setViewMode] = useState("grid");
//   const [isMobile, setIsMobile] = useState(false);
//   const [isTablet, setIsTablet] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [visibleImagesCount, setVisibleImagesCount] = useState(12);
//   const [isLoadingMore, setIsLoadingMore] = useState(false);
//   const [loadedImages, setLoadedImages] = useState(new Set());
//   const [selectedYear, setSelectedYear] = useState("all");
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const observerRef = useRef(null);
//   const containerRef = useRef(null);

//   // Check device type
//   useEffect(() => {
//     const checkDevice = () => {
//       const width = window.innerWidth;
//       setIsMobile(width < 768);
//       setIsTablet(width >= 768 && width < 1024);
//     };
    
//     checkDevice();
//     window.addEventListener('resize', checkDevice);
//     return () => window.removeEventListener('resize', checkDevice);
//   }, []);

//   // Get initial count based on screen size
//   const getInitialCount = useCallback(() => {
//     const width = window.innerWidth;
//     if (width < 480) return 4;
//     if (width < 640) return 6;
//     if (width < 768) return 8;
//     if (width < 1024) return 9;
//     if (width < 1280) return 12;
//     return 15;
//   }, []);

//   // Initialize visible images count
//   useEffect(() => {
//     setVisibleImagesCount(getInitialCount());
//   }, [getInitialCount]);

//   // Get available years from data
//   const years = useMemo(() => {
//     const allYears = new Set(["all"]);
//     data.categories.forEach(category => {
//       category.subcategories.forEach(subcategory => {
//         subcategory.items.forEach(item => {
//           if (item.year) allYears.add(item.year);
//         });
//       });
//     });
//     return Array.from(allYears).sort((a, b) => b - a);
//   }, [data.categories]);

//   // Calculate total photos
//   const totalPhotos = useMemo(() => data.categories.reduce(
//     (total, category) =>
//       total +
//       category.subcategories.reduce(
//         (subTotal, subcategory) => subTotal + subcategory.items.length,
//         0
//       ),
//     0
//   ), [data.categories]);

//   // Filter images based on search and year
//   const filteredItems = useMemo(() => {
//     if (!selectedSubCategory?.items) return [];

//     return selectedSubCategory.items.filter(item => {
//       const matchesSearch = searchTerm === "" || 
//         item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
//         (item.venue && item.venue.toLowerCase().includes(searchTerm.toLowerCase()));

//       const matchesYear = selectedYear === "all" || item.year === selectedYear;

//       return matchesSearch && matchesYear;
//     });
//   }, [selectedSubCategory, searchTerm, selectedYear]);

//   // Get visible items based on pagination
//   const visibleItems = useMemo(() => {
//     return filteredItems.slice(0, visibleImagesCount);
//   }, [filteredItems, visibleImagesCount]);

//   // Check if there are more items to load
//   const hasMoreItems = useMemo(() => {
//     return visibleImagesCount < filteredItems.length;
//   }, [visibleImagesCount, filteredItems.length]);

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

//   // Load more images
//   const loadMoreImages = useCallback(() => {
//     if (!selectedSubCategory || !hasMoreItems || isLoadingMore) return;

//     setIsLoadingMore(true);
//     const increment = getInitialCount();
//     const newCount = Math.min(visibleImagesCount + increment, filteredItems.length);

//     setTimeout(() => {
//       setVisibleImagesCount(newCount);
//       setIsLoadingMore(false);
//       // Scroll to show new content on mobile
//       if (isMobile && containerRef.current) {
//         const element = containerRef.current;
//         const scrollPosition = element.scrollHeight - window.innerHeight;
//         window.scrollTo({
//           top: scrollPosition - 100,
//           behavior: 'smooth'
//         });
//       }
//     }, 300);
//   }, [selectedSubCategory, hasMoreItems, visibleImagesCount, isLoadingMore, filteredItems.length, getInitialCount, isMobile]);

//   // Show all images
//   const showAllImages = useCallback(() => {
//     setIsLoadingMore(true);
//     setTimeout(() => {
//       setVisibleImagesCount(filteredItems.length);
//       setIsLoadingMore(false);
//     }, 300);
//   }, [filteredItems.length]);

//   // Show less images
//   const showLessImages = useCallback(() => {
//     setIsLoadingMore(true);
//     setTimeout(() => {
//       setVisibleImagesCount(getInitialCount());
//       setIsLoadingMore(false);
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }, 300);
//   }, [getInitialCount]);

//   // Handle image load
//   const handleImageLoad = useCallback((imageId) => {
//     setLoadedImages(prev => new Set(prev).add(imageId));
//   }, []);

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

//   // Responsive grid columns
//   const getGridColumns = () => {
//     if (isMobile) return "grid-cols-2";
//     if (isTablet) return "grid-cols-2 lg:grid-cols-3";
//     return "grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white to-navy-50/30 py-4 sm:py-8 md:py-12 px-3 sm:px-4 md:px-6 lg:px-8 relative overflow-hidden" ref={containerRef}>
//       {/* Background decorative elements */}
//       <div className="absolute top-0 left-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-gradient-to-br from-navy-100/20 to-blue-100/10 rounded-full -translate-x-16 sm:-translate-x-24 -translate-y-16 sm:-translate-y-24"></div>
//       <div className="absolute bottom-0 right-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-gradient-to-tl from-blue-100/10 to-navy-100/20 rounded-full translate-x-16 sm:translate-x-24 translate-y-16 sm:translate-y-24"></div>

//       {/* Creative decorative elements - Reduced on mobile */}
//       <div className="absolute inset-0 pointer-events-none">
//         {!isMobile && (
//           <>
//             <div className="absolute top-10 left-5 sm:top-20 sm:left-10 opacity-20 animate-bounce">
//               <Cloud className="w-8 h-8 sm:w-10 sm:h-10 text-navy-400" />
//             </div>
//             <div className="absolute top-20 right-8 sm:top-32 sm:right-16 opacity-20 animate-pulse">
//               <Star className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-400" />
//             </div>
//             <div className="absolute bottom-20 left-10 sm:bottom-32 sm:left-20 opacity-20 animate-bounce">
//               <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-pink-400" />
//             </div>
//             <div className="absolute top-1/3 left-1/4 opacity-15">
//               <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-navy-300" />
//             </div>
//             <div className="absolute bottom-1/3 right-1/4 opacity-15">
//               <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-blue-300" />
//             </div>
//           </>
//         )}
//       </div>

//       <div className="max-w-7xl mx-auto relative z-10">
//         {/* ================= HEADER ================= */}
//         <motion.div
//           className="text-center mb-6 sm:mb-8 md:mb-12"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           <div className="inline-flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
//             <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-500"></div>
//             <h1 className="font-title text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gradient-navy">
//               Sports Gallery
//             </h1>
//             <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-500"></div>
//           </div>

//           <motion.div
//             className="h-1 sm:h-1.5 w-12 sm:w-16 md:w-20 lg:w-24 bg-gradient-to-r from-navy-600 via-blue-600 to-navy-600 mx-auto mb-3 sm:mb-4 md:mb-6 rounded-full"
//             initial={{ width: 0 }}
//             animate={{ width: isMobile ? "3rem" : "4rem" }}
//             transition={{ duration: 0.8, delay: 0.3 }}
//           />
          
//           <p className="text-gray-700 max-w-2xl mx-auto text-xs sm:text-sm md:text-base lg:text-lg px-2 sm:px-4">
//             Action shots, team photos, and memorable moments from our school's sports events, tournaments, and athletic achievements.
//           </p>

//           {/* Quick Stats */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.4 }}
//             className="flex flex-wrap justify-center gap-1.5 sm:gap-2 md:gap-3 mt-4 sm:mt-6"
//           >
//             <div className="flex items-center gap-1 px-2 py-1 sm:px-2.5 sm:py-1.5 md:px-3 md:py-1.5 bg-gradient-to-br from-navy-50 to-blue-50 rounded-full border border-navy-100">
//               <Trophy className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-navy-600" />
//               <span className="text-xs sm:text-sm font-medium text-navy-700">
//                 {totalPhotos} Photos
//               </span>
//             </div>
//             <div className="flex items-center gap-1 px-2 py-1 sm:px-2.5 sm:py-1.5 md:px-3 md:py-1.5 bg-gradient-to-br from-navy-50 to-blue-50 rounded-full border border-navy-100">
//               <Activity className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-navy-600" />
//               <span className="text-xs sm:text-sm font-medium text-navy-700">
//                 {data.categories.length} Sports
//               </span>
//             </div>
//             <div className="flex items-center gap-1 px-2 py-1 sm:px-2.5 sm:py-1.5 md:px-3 md:py-1.5 bg-gradient-to-br from-navy-50 to-blue-50 rounded-full border border-navy-100">
//               <Award className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-navy-600" />
//               <span className="text-xs sm:text-sm font-medium text-navy-700">
//                 50+ Awards
//               </span>
//             </div>
//           </motion.div>
//         </motion.div>

//         {/* Breadcrumb */}
//         <motion.div
//           className="font-primary flex items-center gap-1.5 sm:gap-2 mb-4 sm:mb-6 text-xs sm:text-sm text-gray-600"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.6 }}
//         >
//           <button
//             onClick={() => navigate("/")}
//             className="text-gray-600 hover:text-navy-700 transition-colors font-medium flex items-center gap-1"
//           >
//             <Home className="w-3 h-3 sm:w-4 sm:h-4" />
//             <span className="hidden xs:inline">Home</span>
//           </button>
//           <span>/</span>
//           <span className="font-medium text-navy-700 truncate">Sports Gallery</span>
//         </motion.div>

//         {/* ================= MOBILE CONTROLS ================= */}
//         {isMobile && (
//           <div className="flex gap-2 mb-4">
//             {/* Mobile Search Button */}
//             <button
//               onClick={() => setIsSearchOpen(!isSearchOpen)}
//               className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white rounded-lg border border-navy-100 text-navy-700 font-medium"
//             >
//               <Search className="w-4 h-4" />
//               <span>Search</span>
//             </button>

//             {/* Mobile Filter Button */}
//             <button
//               onClick={() => setIsFilterOpen(!isFilterOpen)}
//               className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white rounded-lg border border-navy-100 text-navy-700 font-medium"
//             >
//               <Filter className="w-4 h-4" />
//               <span>Filter</span>
//             </button>
//           </div>
//         )}
//         {/* Mobile Filter Panel */}
//         {isMobile && isFilterOpen && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: 'auto' }}
//             exit={{ opacity: 0, height: 0 }}
//             className="mb-4"
//           >
//             <div className="bg-white rounded-lg border border-navy-200 p-4">
//               <div className="flex items-center justify-between mb-3">
//                 <h3 className="font-medium text-navy-700">Filter by Year</h3>
//                 <button
//                   onClick={() => setIsFilterOpen(false)}
//                   className="text-gray-500 hover:text-gray-700"
//                 >
//                   <X className="w-4 h-4" />
//                 </button>
//               </div>
//               <div className="grid grid-cols-3 gap-2">
//                 {years.slice(0, 6).map((year) => (
//                   <button
//                     key={year}
//                     onClick={() => setSelectedYear(year)}
//                     className={`px-3 py-2 rounded-md text-sm font-medium ${selectedYear === year
//                         ? "bg-gradient-to-r from-navy-600 to-blue-600 text-white"
//                         : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                       }`}
//                   >
//                     {year === "all" ? "All" : year}
//                   </button>
//                 ))}
//               </div>
//               {years.length > 6 && (
//                 <div className="mt-3 text-center">
//                   <button className="text-sm text-navy-600 font-medium">
//                     View All {years.length} Years
//                   </button>
//                 </div>
//               )}
//             </div>
//           </motion.div>
//         )}

      

//         {/* ================= SPORTS CATEGORIES ================= */}
//         <motion.div
//           className="mb-6 sm:mb-8 md:mb-10"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.1 }}
//         >
//           <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-navy-100 p-3 sm:p-4 md:p-5 lg:p-6">
//             <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
//               <div className="relative">
//                 <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-gradient-to-br from-navy-600 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center">
//                   <Activity className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-white" />
//                 </div>
//               </div>
//               <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-navy-800">
//                 Select Sport
//               </h2>
//             </div>

//             <div className="flex flex-wrap gap-1.5 sm:gap-2">
//               {data.categories.map((category) => {
//                 const categoryPhotos = category.subcategories.reduce(
//                   (total, sub) => total + sub.items.length,
//                   0
//                 );
                
//                 return (
//                   <motion.button
//                     key={category.id}
//                     initial={{ opacity: 0, scale: 0.9 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ duration: 0.3 }}
//                     whileHover={{ scale: 1.03 }}
//                     whileTap={{ scale: 0.97 }}
//                     onClick={() => {
//                       setSelectedCategory(category);
//                       setSelectedSubCategory(category.subcategories[0]);
//                       setVisibleImagesCount(getInitialCount());
//                       // Scroll to gallery on mobile
//                       if (isMobile) {
//                         setTimeout(() => {
//                           document.getElementById('gallery-section')?.scrollIntoView({ 
//                             behavior: 'smooth' 
//                           });
//                         }, 100);
//                       }
//                     }}
//                     className={`font-primary px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg font-medium transition-all flex items-center gap-1.5 sm:gap-2 ${selectedCategory.id === category.id
//                         ? "bg-gradient-to-r from-navy-600 to-blue-600 text-white shadow-lg"
//                         : "bg-gradient-to-br from-white to-gray-50 text-gray-700 hover:bg-navy-50 border border-navy-100"
//                       }`}
//                   >
//                     <span className="text-base sm:text-lg">{category.icon}</span>
//                     <span className="text-xs sm:text-sm">{category.title}</span>
//                     <span className="text-xs opacity-80 bg-white/20 px-1.5 sm:px-2 py-0.5 rounded-full">
//                       {categoryPhotos}
//                     </span>
//                   </motion.button>
//                 );
//               })}
//             </div>
//           </div>
//         </motion.div>

//         {/* ================= SELECTED SPORT DETAILS ================= */}
//         <motion.div
//           className="mb-6 sm:mb-8 md:mb-10"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//         >
//           <div className="bg-gradient-to-r from-navy-50/80 to-blue-50/80 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-navy-100 p-3 sm:p-4 md:p-5 lg:p-6">
//             <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 sm:gap-5 md:gap-6">
//               <div className="flex-1">
//                 <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
//                   <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-navy-50 to-blue-50 flex items-center justify-center border border-navy-100 flex-shrink-0">
//                     <span className="text-xl sm:text-2xl text-navy-600">{selectedCategory.icon}</span>
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <h2 className="font-title text-lg sm:text-xl md:text-2xl font-bold text-navy-800 truncate">
//                       {selectedCategory.title}
//                     </h2>
//                     <p className="font-primary text-gray-600 mt-1 text-xs sm:text-sm md:text-base">
//                       {selectedCategory.description}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Sub-Category Selection */}
//                 <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-4">
//                   {selectedCategory.subcategories.map((subcategory) => (
//                     <button
//                       key={subcategory.id}
//                       onClick={() => {
//                         setSelectedSubCategory(subcategory);
//                         // Scroll to gallery on mobile
//                         if (isMobile) {
//                           setTimeout(() => {
//                             document.getElementById('gallery-section')?.scrollIntoView({ 
//                               behavior: 'smooth' 
//                             });
//                           }, 100);
//                         }
//                       }}
//                       className={`font-primary px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all ${selectedSubCategory?.id === subcategory.id
//                           ? "bg-gradient-to-r from-navy-600 to-blue-600 text-white"
//                           : "bg-gradient-to-br from-white to-gray-50 text-gray-700 hover:bg-navy-50 border border-navy-100"
//                         }`}
//                     >
//                       <span className="mr-1">{subcategory.icon}</span>
//                       <span>{subcategory.title}</span>
//                       <span className="ml-1.5 text-xs opacity-80">
//                         ({subcategory.items.length})
//                       </span>
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <div className="flex-shrink-0 mt-4 md:mt-0">
//                 <div className="grid grid-cols-2 gap-2 sm:gap-3">
//                   <div className="bg-white/80 rounded-lg p-3 text-center border border-navy-100 min-w-[100px]">
//                     <div className="text-lg sm:text-xl md:text-2xl font-bold text-navy-700 mb-1">
//                       {selectedCategory.subcategories.reduce((total, sub) => total + sub.items.length, 0)}
//                     </div>
//                     <div className="text-xs sm:text-sm text-gray-600">Photos</div>
//                   </div>
//                   <div className="bg-white/80 rounded-lg p-3 text-center border border-navy-100 min-w-[100px]">
//                     <div className="text-lg sm:text-xl md:text-2xl font-bold text-navy-700 mb-1">
//                       {selectedCategory.subcategories.length}
//                     </div>
//                     <div className="text-xs sm:text-sm text-gray-600">Events</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* ================= GALLERY SECTION ================= */}
//         {selectedSubCategory && (
//           <motion.div
//             id="gallery-section"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.3 }}
//             className="mb-6 sm:mb-8 md:mb-10 lg:mb-12"
//           >
//             <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-navy-100 p-3 sm:p-4 md:p-5 lg:p-6">
//               {/* Section Header */}
//               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-5 md:mb-6">
//                 <div className="flex-1 min-w-0">
//                   <h2 className="font-title text-lg sm:text-xl md:text-2xl font-bold text-navy-800 mb-1 truncate">
//                     {selectedSubCategory.title}
//                   </h2>
//                   <p className="font-primary text-gray-600 text-xs sm:text-sm">
//                     Showing {Math.min(visibleImagesCount, visibleItems.length)} of {filteredItems.length} photos
//                   </p>
//                 </div>

//                 {/* View Mode Toggle - Desktop */}
//                 {!isMobile && (
//                   <div className="flex items-center gap-2">
//                     <button
//                       onClick={() => setViewMode("grid")}
//                       className={`p-2 rounded-lg ${viewMode === "grid"
//                           ? "bg-gradient-to-r from-navy-600 to-blue-600 text-white"
//                           : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                         }`}
//                     >
//                       <Grid className="w-5 h-5" />
//                     </button>
//                     <button
//                       onClick={() => setViewMode("list")}
//                       className={`p-2 rounded-lg ${viewMode === "list"
//                           ? "bg-gradient-to-r from-navy-600 to-blue-600 text-white"
//                           : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                         }`}
//                     >
//                       <List className="w-5 h-5" />
//                     </button>
//                   </div>
//                 )}

//                 {/* Load More Controls */}
//                 {filteredItems.length > getInitialCount() && !isMobile && (
//                   <div className="flex items-center gap-2">
//                     {hasMoreItems ? (
//                       <button
//                         onClick={showAllImages}
//                         className="font-primary inline-flex items-center gap-1 text-sm text-navy-600 font-medium hover:underline whitespace-nowrap"
//                       >
//                         View All {filteredItems.length}
//                         <ChevronRight className="w-4 h-4" />
//                       </button>
//                     ) : (
//                       <button
//                         onClick={showLessImages}
//                         className="font-primary inline-flex items-center gap-1 text-sm text-navy-600 font-medium hover:underline whitespace-nowrap"
//                       >
//                         Show Less
//                         <ChevronLeft className="w-4 h-4" />
//                       </button>
//                     )}
//                   </div>
//                 )}
//               </div>

//               {/* Mobile View Mode Toggle */}
//               {isMobile && (
//                 <div className="flex items-center justify-between mb-4">
//                   <div className="flex items-center gap-2">
//                     <button
//                       onClick={() => setViewMode("grid")}
//                       className={`px-3 py-1.5 rounded-md text-sm font-medium ${viewMode === "grid"
//                           ? "bg-gradient-to-r from-navy-600 to-blue-600 text-white"
//                           : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                         }`}
//                     >
//                       <Grid className="w-4 h-4 inline mr-1" />
//                       Grid
//                     </button>
//                     <button
//                       onClick={() => setViewMode("list")}
//                       className={`px-3 py-1.5 rounded-md text-sm font-medium ${viewMode === "list"
//                           ? "bg-gradient-to-r from-navy-600 to-blue-600 text-white"
//                           : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                         }`}
//                     >
//                       <List className="w-4 h-4 inline mr-1" />
//                       List
//                     </button>
//                   </div>
                  
//                   {filteredItems.length > getInitialCount() && (
//                     <div className="text-right">
//                       <button
//                         onClick={hasMoreItems ? showAllImages : showLessImages}
//                         className="text-xs sm:text-sm text-navy-600 font-medium hover:underline"
//                       >
//                         {hasMoreItems ? `View All ${filteredItems.length}` : "Show Less"}
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               )}

//               {/* Progress Bar */}
//               {hasMoreItems && (
//                 <div className="mb-4 sm:mb-6">
//                   <div className="w-full h-1.5 sm:h-2 bg-gradient-to-r from-gray-100 to-navy-50/30 rounded-full overflow-hidden">
//                     <div
//                       className="h-full bg-gradient-to-r from-navy-600 to-blue-600 transition-all duration-300"
//                       style={{
//                         width: `${(visibleImagesCount / filteredItems.length) * 100}%`
//                       }}
//                     />
//                   </div>
//                   <p className="font-primary text-gray-600 text-xs sm:text-sm mt-1.5 sm:mt-2 text-center">
//                     {visibleImagesCount} of {filteredItems.length} photos loaded
//                   </p>
//                 </div>
//               )}

//               {/* Gallery Content */}
//               {visibleItems.length === 0 ? (
//                 <div className="text-center py-8 sm:py-12">
//                   <Trophy className="w-12 h-12 sm:w-16 sm:h-16 text-navy-400 mx-auto mb-3 sm:mb-4" />
//                   <h3 className="font-primary text-base sm:text-lg md:text-xl font-semibold text-gray-600 mb-2">
//                     No Photos Found
//                   </h3>
//                   <p className="font-primary text-gray-500 text-sm sm:text-base">
//                     Try adjusting your search or filter criteria
//                   </p>
//                 </div>
//               ) : viewMode === "grid" ? (
//                 // Grid View
//                 <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'} gap-3 sm:gap-4 md:gap-5 lg:gap-6`}>
//                   {visibleItems.map((item, index) => {
//                     const imageId = `${selectedSubCategory.id}-${item.id}`;
//                     const isLoaded = loadedImages.has(imageId);
//                     const shouldLoad = isLoaded || index < (isMobile ? 2 : 4);

//                     return (
//                       <motion.div
//                         key={imageId}
//                         data-image-id={imageId}
//                         initial={{ opacity: 0, scale: 0.9 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         transition={{ duration: 0.4, delay: index * 0.05 }}
//                         whileHover={{ y: -3 }}
//                         className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden cursor-pointer border border-navy-100"
//                         onClick={() => setSelectedImage(item)}
//                       >
//                         <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-navy-50/30">
//                           {!isLoaded && (
//                             <div className="absolute inset-0 flex items-center justify-center">
//                               <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-navy-600"></div>
//                             </div>
//                           )}

//                           <img
//                             src={shouldLoad ? item.image : ""}
//                             alt={item.alt || item.title}
//                             className={`w-full h-full object-cover transition-transform duration-700 ${isLoaded ? 'group-hover:scale-110 opacity-100' : 'opacity-0'
//                               }`}
//                             loading={index < (isMobile ? 2 : 4) ? "eager" : "lazy"}
//                             onLoad={() => handleImageLoad(imageId)}
//                           />

//                           <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                             <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3">
//                               <div className="flex items-center justify-between">
//                                 <span className="font-primary text-white text-xs font-medium bg-black/50 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full">
//                                   View
//                                 </span>
//                                 <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4 text-white/80" />
//                               </div>
//                             </div>
//                           </div>

//                           {/* Sport Badge */}
//                           <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
//                             <span className="font-primary text-white text-xs font-medium bg-black/50 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full truncate max-w-[80px]">
//                               {selectedCategory.title}
//                             </span>
//                           </div>

//                           {/* Year Badge */}
//                           {item.year && (
//                             <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
//                               <span className="font-primary text-white text-xs font-medium bg-black/50 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full">
//                                 {item.year}
//                               </span>
//                             </div>
//                           )}
//                         </div>

//                         <div className="p-3 sm:p-4">
//                           <h3 className="font-primary font-semibold text-navy-800 text-sm sm:text-base line-clamp-1 mb-1.5 sm:mb-2">
//                             {item.title}
//                           </h3>
//                           {item.description && (
//                             <p className="font-primary text-gray-600 text-xs sm:text-sm line-clamp-2 mb-2 sm:mb-3">
//                               {item.description}
//                             </p>
//                           )}
//                           <div className="flex flex-wrap items-center justify-between gap-1 sm:gap-2">
//                             {item.date && (
//                               <div className="flex items-center gap-1 text-gray-500 text-xs sm:text-sm">
//                                 <Calendar className="w-3 h-3" />
//                                 <span>
//                                   {new Date(item.date).toLocaleDateString("en-US", {
//                                     month: "short",
//                                     day: "numeric",
//                                     year: "numeric",
//                                   })}
//                                 </span>
//                               </div>
//                             )}
//                             {item.venue && (
//                               <div className="flex items-center gap-1 text-gray-500 text-xs sm:text-sm">
//                                 <MapPin className="w-3 h-3" />
//                                 <span className="truncate max-w-[80px] sm:max-w-[100px]">{item.venue}</span>
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       </motion.div>
//                     );
//                   })}
//                 </div>
//               ) : (
//                 // List View
//                 <div className="space-y-3 sm:space-y-4">
//                   {visibleItems.map((item, index) => {
//                     const imageId = `${selectedSubCategory.id}-${item.id}`;
//                     const isLoaded = loadedImages.has(imageId);

//                     return (
//                       <motion.div
//                         key={imageId}
//                         initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ duration: 0.4, delay: index * 0.05 }}
//                         whileHover={{ x: 5 }}
//                         className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border border-navy-100"
//                         onClick={() => setSelectedImage(item)}
//                       >
//                         <div className="flex flex-col sm:flex-row">
//                           <div className="w-full sm:w-32 md:w-48 h-48 sm:h-32 md:h-48 flex-shrink-0 relative overflow-hidden bg-gradient-to-br from-gray-100 to-navy-50/30">
//                             {!isLoaded && (
//                               <div className="absolute inset-0 flex items-center justify-center">
//                                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-navy-600"></div>
//                               </div>
//                             )}
//                             <img
//                               src={item.image}
//                               alt={item.alt || item.title}
//                               className={`w-full h-full object-cover transition-transform duration-700 ${isLoaded ? 'group-hover:scale-110 opacity-100' : 'opacity-0'
//                                 }`}
//                               onLoad={() => handleImageLoad(imageId)}
//                             />
//                           </div>
//                           <div className="flex-1 p-3 sm:p-4 md:p-6">
//                             <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2">
//                               <h3 className="font-primary font-bold text-navy-800 text-base sm:text-lg mb-1 sm:mb-0">
//                                 {item.title}
//                               </h3>
//                               <span className="font-primary px-2 py-1 bg-gradient-to-r from-navy-50 to-blue-50 text-navy-700 rounded-full text-xs sm:text-sm whitespace-nowrap">
//                                 {selectedCategory.title}
//                               </span>
//                             </div>
//                             {item.description && (
//                               <p className="font-primary text-gray-600 text-sm sm:text-base mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3">
//                                 {item.description}
//                               </p>
//                             )}
//                             <div className="font-primary flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-gray-500 text-xs sm:text-sm">
//                               {item.date && (
//                                 <div className="flex items-center gap-1.5 sm:gap-2">
//                                   <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
//                                   <span>
//                                     {new Date(item.date).toLocaleDateString("en-US", {
//                                       month: "short",
//                                       day: "numeric",
//                                       year: "numeric",
//                                     })}
//                                   </span>
//                                 </div>
//                               )}
//                               {item.venue && (
//                                 <div className="flex items-center gap-1.5 sm:gap-2">
//                                   <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
//                                   <span className="truncate">{item.venue}</span>
//                                 </div>
//                               )}
//                               {item.year && (
//                                 <div className="flex items-center gap-1.5 sm:gap-2">
//                                   <Trophy className="w-3 h-3 sm:w-4 sm:h-4" />
//                                   <span>{item.year}</span>
//                                 </div>
//                               )}
//                             </div>
//                           </div>
//                         </div>
//                       </motion.div>
//                     );
//                   })}
//                 </div>
//               )}

//               {/* Load More Button */}
//               {hasMoreItems && (
//                 <div className="mt-6 sm:mt-8 text-center">
//                   <button
//                     onClick={loadMoreImages}
//                     disabled={isLoadingMore}
//                     className="font-primary inline-flex items-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-navy-600 to-blue-600 text-white rounded-full text-sm sm:text-base font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed w-full sm:w-auto justify-center"
//                   >
//                     {isLoadingMore ? (
//                       <>
//                         <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
//                         <span>Loading...</span>
//                       </>
//                     ) : (
//                       <>
//                         <span>Load More Photos</span>
//                         <ChevronDown className="w-4 h-4" />
//                       </>
//                     )}
//                   </button>
//                   <p className="font-primary text-gray-600 text-xs sm:text-sm mt-2">
//                     {visibleImagesCount} of {filteredItems.length} photos loaded
//                   </p>
//                 </div>
//               )}

//               {/* Mobile View All Button */}
//               {isMobile && hasMoreItems && filteredItems.length > 30 && (
//                 <div className="mt-4 text-center">
//                   <button
//                     onClick={showAllImages}
//                     className="text-sm text-navy-600 font-medium hover:underline"
//                   >
//                     View All {filteredItems.length} Photos
//                   </button>
//                 </div>
//               )}
//             </div>
//           </motion.div>
//         )}

//         {/* ================= IMAGE MODAL ================= */}
//         <AnimatePresence>
//           {selectedImage && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4"
//               onClick={() => setSelectedImage(null)}
//             >
//               <motion.div
//                 initial={{ scale: 0.9, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.9, opacity: 0 }}
//                 transition={{ duration: 0.3 }}
//                 className="relative max-w-4xl w-full bg-white rounded-xl overflow-hidden shadow-2xl max-h-[90vh] sm:max-h-[85vh] flex flex-col"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <button
//                   onClick={() => setSelectedImage(null)}
//                   className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 bg-black/70 text-white p-1.5 sm:p-2 rounded-full hover:bg-black/90 transition"
//                 >
//                   <X className="w-4 h-4 sm:w-6 sm:h-6" />
//                 </button>

//                 <div className="flex-1 overflow-auto">
//                   <img
//                     src={selectedImage.image}
//                     alt={selectedImage.alt || selectedImage.title}
//                     className="w-full h-auto object-contain max-h-[50vh] sm:max-h-[60vh]"
//                   />

//                   <div className="p-3 sm:p-4 md:p-6">
//                     <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
//                       <div className="flex-1 min-w-0">
//                         <h3 className="font-title text-lg sm:text-xl md:text-2xl font-bold text-navy-800 mb-1 sm:mb-2 break-words">
//                           {selectedImage.title}
//                         </h3>
//                         {selectedImage.description && (
//                           <p className="font-primary text-gray-600 text-sm sm:text-base break-words">
//                             {selectedImage.description}
//                           </p>
//                         )}
//                       </div>
//                       <div className="flex items-center gap-2 flex-shrink-0">
//                         <span className="text-xl sm:text-2xl">{selectedSubCategory.icon}</span>
//                         <span className="font-primary px-2 py-1 sm:px-3 sm:py-1 bg-gradient-to-r from-navy-600 to-blue-600 text-white rounded-full text-xs sm:text-sm whitespace-nowrap">
//                           {selectedCategory.title}
//                         </span>
//                       </div>
//                     </div>

//                     <div className="font-primary flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center justify-between gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-navy-200">
//                       <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
//                         {selectedImage.date && (
//                           <div className="flex items-center gap-1.5 sm:gap-2 text-gray-600 text-sm sm:text-base">
//                             <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
//                             <span>
//                               {new Date(selectedImage.date).toLocaleDateString(
//                                 "en-US",
//                                 {
//                                   weekday: "long",
//                                   year: "numeric",
//                                   month: "long",
//                                   day: "numeric",
//                                 }
//                               )}
//                             </span>
//                           </div>
//                         )}
//                         {selectedImage.venue && (
//                           <div className="flex items-center gap-1.5 sm:gap-2 text-gray-600 text-sm sm:text-base">
//                             <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
//                             <span className="break-words">{selectedImage.venue}</span>
//                           </div>
//                         )}
//                         {selectedImage.year && (
//                           <div className="flex items-center gap-1.5 sm:gap-2 text-gray-600 text-sm sm:text-base">
//                             <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
//                             <span>{selectedImage.year}</span>
//                           </div>
//                         )}
//                       </div>
//                       <span className="px-2 py-1 sm:px-3 sm:py-1 bg-gradient-to-br from-white to-gray-50 text-gray-700 rounded-full text-xs sm:text-sm border border-navy-100 whitespace-nowrap">
//                         {selectedSubCategory.title}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>

        

//         {/* ================= BACK TO TOP ================= */}
//         <motion.div
//           className="flex justify-center mt-6 sm:mt-8 md:mt-10"
//           initial={{ opacity: 0, scale: 0 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.6, delay: 0.5 }}
//           viewport={{ once: true, margin: "-100px" }}
//         >
//           <button
//             onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//             className="font-primary px-3 sm:px-4 py-1.5 sm:py-2.5 bg-gradient-to-r from-navy-600 to-blue-600 text-white rounded-full text-xs sm:text-sm font-medium hover:shadow-lg transition-all duration-300 flex items-center gap-1 sm:gap-2"
//           >
//             <ArrowUp className="w-3 h-3 sm:w-4 sm:h-4" />
//             <span>Back to Top</span>
//           </button>
//         </motion.div>

//         {/* ================= BOTTOM DECORATIVE ELEMENT ================= */}
//         <motion.div
//           className="flex justify-center mt-6 sm:mt-8 md:mt-10"
//           initial={{ opacity: 0, scale: 0 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.6, delay: 0.5 }}
//           viewport={{ once: true, margin: "-100px" }}
//         >
//           <div className="flex items-center gap-2 sm:gap-3 md:gap-4 text-navy-600">
//             <div className="w-4 h-px sm:w-6 md:w-8 lg:w-12 bg-gradient-to-r from-transparent via-navy-400 to-transparent"></div>
//             <div className="flex items-center gap-1 sm:gap-2">
//               <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
//               <span className="text-xs sm:text-sm font-medium">Champions in Action</span>
//               <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
//             </div>
//             <div className="w-4 h-px sm:w-6 md:w-8 lg:w-12 bg-gradient-to-r from-transparent via-navy-400 to-transparent"></div>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default SportsImages;