import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import videoData from "../../constant/GalleryData/videoData";
import { 
  PlayCircle, 
  X, 
  Youtube, 
  Video,
  Calendar,
  Clock,
  Star,
  Sparkles,
  Cloud,
  Heart,
  Eye,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ThumbsUp,
  Share2,
  Download
} from "lucide-react";
import axiosInstance from "../../services/api"; // Update this import path based on your project structure

// Swiper for mobile
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Videos = () => {
  const [videosData, setVideosData] = useState({
    videos: {
      id: "videos-section",
      header: {
        title: videoData.title || "School Videos",
        description: videoData.description || "Explore school events, celebrations, activities, and campus life through videos."
      },
      quickStats: videoData.quickStats || [
        {
          icon: "Video",
          label: "Videos",
          value: 2,
          color: "text-navy-600"
        },
        {
          icon: "Clock",
          label: "HD Quality",
          value: "HD",
          color: "text-navy-600"
        },
        {
          icon: "PlayCircle",
          label: "Stream & Download",
          value: "Stream",
          color: "text-navy-600"
        }
      ],
      videos: videoData.videos || [],
      categories: videoData.categories || ["all"],
      aboutSection: {
        title: videoData.aboutSection?.title || "About School Videos",
        description: videoData.aboutSection?.description || "Our video collection showcases school events, performances, achievements, and daily activities. All videos are professionally recorded and edited to provide the best viewing experience."
      },
      settings: {
        videosPerPage: videoData.settings?.videosPerPage || {
          mobile: 4,
          desktop: 6
        },
        autoplayDelay: videoData.settings?.autoplayDelay || 5000,
        enableSwiper: videoData.settings?.enableSwiper || true,
        enablePagination: videoData.settings?.enablePagination || true
      },
      footer: {
        text: videoData.footer?.text || "School Memories in Motion",
        decorations: {
          lineColor: videoData.footer?.decorations?.lineColor || "from-transparent via-navy-400 to-transparent",
          icons: {
            left: videoData.footer?.decorations?.icons?.left || "Star",
            right: videoData.footer?.decorations?.icons?.right || "Star",
            color: videoData.footer?.decorations?.icons?.color || "text-yellow-500"
          }
        }
      }
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [videoViews, setVideoViews] = useState({});
  const videoContainerRef = useRef(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  // Handle body scroll and hide everything when modal opens/closes
  useEffect(() => {
    if (activeVideo) {
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
  }, [activeVideo]);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/videos');
      
      if (response.data.success) {
        const apiData = response.data.data;
        
        // Process the API data - fix image URLs
        const processedData = {
          videos: {
            id: apiData.videos?.id || "videos-section",
            header: {
              title: apiData.videos?.header?.title || "School Videos",
              description: apiData.videos?.header?.description || "Explore school events, celebrations, activities, and campus life through videos."
            },
            quickStats: apiData.videos?.quickStats?.length > 0 
              ? apiData.videos.quickStats 
              : videosData.videos.quickStats,
            videos: apiData.videos?.videos?.map(video => ({
              ...video,
              thumbnail: video.thumbnail?.replace(/\\\//g, '/') || video.thumbnail,
              videoFile: video.videoFile?.replace(/\\\//g, '/') || video.videoFile,
              // Extract YouTube ID from URL if present
              youtubeId: video.youtubeUrl ? extractYouTubeId(video.youtubeUrl) : null
            })) || [],
            categories: apiData.videos?.categories?.length > 0 
              ? apiData.videos.categories 
              : ["all", ...new Set(videosData.videos.videos?.map(v => v.category).filter(Boolean))],
            aboutSection: {
              title: apiData.videos?.aboutSection?.title || "About School Videos",
              description: apiData.videos?.aboutSection?.description || "Our video collection showcases school events, performances, achievements, and daily activities. All videos are professionally recorded and edited to provide the best viewing experience."
            },
            settings: {
              videosPerPage: apiData.videos?.settings?.videosPerPage || {
                mobile: 4,
                desktop: 6
              },
              autoplayDelay: apiData.videos?.settings?.autoplayDelay || 5000,
              enableSwiper: apiData.videos?.settings?.enableSwiper !== undefined ? apiData.videos.settings.enableSwiper : true,
              enablePagination: apiData.videos?.settings?.enablePagination !== undefined ? apiData.videos.settings.enablePagination : true
            },
            footer: {
              text: apiData.videos?.footer?.text || "School Memories in Motion",
              decorations: {
                lineColor: apiData.videos?.footer?.decorations?.lineColor || "from-transparent via-navy-400 to-transparent",
                icons: {
                  left: apiData.videos?.footer?.decorations?.icons?.left || "Star",
                  right: apiData.videos?.footer?.decorations?.icons?.right || "Star",
                  color: apiData.videos?.footer?.decorations?.icons?.color || "text-yellow-500"
                }
              }
            }
          }
        };
        
        setVideosData(processedData);
        setError(null);
      }
    } catch (err) {
      console.error('Error fetching videos:', err);
      setError('Failed to load videos');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to extract YouTube ID from URL
  const extractYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Get categories
  const categories = ["all", ...new Set(videosData.videos.videos.map(video => video.category).filter(Boolean))];

  // Filter videos by category
  const filteredVideos = videosData.videos.videos.filter(video => 
    selectedCategory === "all" || video.category === selectedCategory
  );

  // Get videos per page from settings
  const VIDEOS_PER_PAGE = isMobile 
    ? (videosData.videos.settings?.videosPerPage?.mobile || 4) 
    : (videosData.videos.settings?.videosPerPage?.desktop || 6);

  // Get paginated videos
  const getPaginatedVideos = () => {
    const startIndex = (currentPage - 1) * VIDEOS_PER_PAGE;
    const endIndex = startIndex + VIDEOS_PER_PAGE;
    return filteredVideos.slice(startIndex, endIndex);
  };

  // Get total pages
  const totalPages = Math.ceil(filteredVideos.length / VIDEOS_PER_PAGE);

  // Get thumbnail
  const getThumbnail = (video) => {
    if (video.type === "youtube" && video.youtubeId) {
      return `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`;
    }
    return video.thumbnail;
  };

  // Handle video play
  const handleVideoPlay = (video) => {
    setActiveVideo(video);
    // Increment view count
    setVideoViews(prev => ({
      ...prev,
      [video.id]: (prev[video.id] || 0) + 1
    }));
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (videoContainerRef.current) {
      videoContainerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // Handle escape key press
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && activeVideo) {
        setActiveVideo(null);
      }
    };
    
    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [activeVideo]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-navy-50/30 py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-navy-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading videos...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-navy-50/30 py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-xl mb-4">⚠️ {error}</p>
          <button 
            onClick={fetchVideos}
            className="px-6 py-2 bg-gradient-to-r from-navy-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const { header, quickStats, aboutSection, footer, settings } = videosData.videos;

  // Video Card Component
  const VideoCard = ({ video, thumbnail, onClick }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-navy-100"
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-gray-100 to-navy-50/30">
        <img
          src={thumbnail}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
          onError={(e) => {
            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' text-anchor='middle' fill='%23999'%3EVideo%3C/text%3E%3C/svg%3E";
          }}
        />
        
        {/* Play Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
              <PlayCircle className="w-12 h-12 sm:w-14 sm:h-14 text-white" />
            </div>
          </div>
        </div>

        {/* Video Badge */}
        <div className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
          {video.type === "youtube" ? (
            <span className="flex items-center gap-1">
              <Youtube className="w-3 h-3" />
              YouTube
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <Video className="w-3 h-3" />
              MP4
            </span>
          )}
        </div>

        {/* Duration Badge */}
        {video.duration && (
          <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium backdrop-blur-sm">
            {video.duration}
          </div>
        )}

        {/* View Count Badge */}
        {videoViews[video.id] > 0 && (
          <div className="absolute top-3 left-3 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium backdrop-blur-sm flex items-center gap-1">
            <Eye className="w-3 h-3" />
            {videoViews[video.id]}
          </div>
        )}
      </div>

      {/* Video Info */}
      <div className="p-4 sm:p-5 md:p-6">
        <h3 className="font-title font-bold text-navy-800 text-base sm:text-lg mb-2 line-clamp-2">
          {video.title}
        </h3>
        
        {video.description && (
          <p className="font-primary text-gray-600 text-sm mb-3 line-clamp-2">
            {video.description}
          </p>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {video.category && (
              <span className="font-primary px-2 py-1 bg-gradient-to-r from-navy-50 to-blue-50 text-navy-700 rounded text-xs font-medium border border-navy-100">
                {video.category}
              </span>
            )}
            
            {video.date && (
              <span className="font-primary text-gray-500 text-xs flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(video.date).toLocaleDateString("en-US", { 
                  month: "short", 
                  day: "numeric", 
                  year: "numeric" 
                })}
              </span>
            )}
          </div>

          <div className="text-navy-600 opacity-0 group-hover:opacity-100 transition-opacity">
            <PlayCircle className="w-5 h-5" />
          </div>
        </div>
      </div>
    </motion.div>
  );

  // Pagination Component
  const PaginationComponent = () => {
    if (totalPages <= 1) return null;

    return (
      <div className="mt-8 flex flex-col items-center gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-navy-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-navy-50 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-navy-600" />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: Math.min(5, totalPages) }).map((_, index) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = index + 1;
              } else if (currentPage <= 3) {
                pageNum = index + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + index;
              } else {
                pageNum = currentPage - 2 + index;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-8 h-8 rounded-lg font-medium transition-all ${
                    currentPage === pageNum
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
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-navy-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-navy-50 transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-navy-600" />
          </button>
        </div>

        <div className="text-sm text-gray-600">
          Page {currentPage} of {totalPages} • Showing {getPaginatedVideos().length} of {filteredVideos.length} videos
        </div>
      </div>
    );
  };

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
          <Video className="w-6 h-6 sm:w-8 sm:h-8 text-blue-300" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10" ref={videoContainerRef}>
        {/* ================= HEADER ================= */}
        <motion.div
          className="text-center mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-500"></div>
            <h1 className="font-title text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gradient-navy">
              {header?.title || "School Videos"}
            </h1>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-500"></div>
          </div>

          <motion.div
            className="h-1 sm:h-1.5 w-16 sm:w-20 md:w-24 bg-gradient-to-r from-navy-600 via-blue-600 to-navy-600 mx-auto mb-4 sm:mb-6 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "4rem" }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          
          <p className="text-gray-700 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-2 sm:px-4">
            {header?.description || "Explore school events, celebrations, activities, and campus life through videos."}
          </p>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-6"
          >
            {quickStats?.map((stat, index) => (
              <div key={index} className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-gradient-to-br from-navy-50 to-blue-50 rounded-full border border-navy-100">
                {stat.icon === "Video" && <Video className={`h-3 w-3 sm:h-4 sm:w-4 ${stat.color || 'text-navy-600'}`} />}
                {stat.icon === "Clock" && <Clock className={`h-3 w-3 sm:h-4 sm:w-4 ${stat.color || 'text-navy-600'}`} />}
                {stat.icon === "PlayCircle" && <PlayCircle className={`h-3 w-3 sm:h-4 sm:w-4 ${stat.color || 'text-navy-600'}`} />}
                <span className="text-xs sm:text-sm font-medium text-navy-700">
                  {stat.value} {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ================= CATEGORY FILTER ================= */}
        <motion.div
          className="mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-navy-100 p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-navy-600 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <PlayCircle className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                  <Star className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-white" />
                </div>
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-navy-800">
                Filter Videos
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`font-primary px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium transition-all ${selectedCategory === category
                      ? "bg-gradient-to-r from-navy-600 to-blue-600 text-white"
                      : "bg-gradient-to-br from-white to-gray-50 text-gray-700 hover:bg-navy-50 border border-navy-100"
                    }`}
                >
                  {category === "all" ? "All Videos" : category}
                </button>
              ))}
            </div>

            {/* Results Counter */}
            <div className="mt-4 flex items-center justify-between text-gray-600 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-medium text-navy-700">
                  {filteredVideos.length} {filteredVideos.length === 1 ? 'video' : 'videos'} found
                </span>
              </div>
              {selectedCategory !== "all" && (
                <span className="text-xs bg-gradient-to-r from-navy-100 to-blue-100 text-navy-700 px-2 py-1 rounded-full border border-navy-200">
                  {selectedCategory}
                </span>
              )}
            </div>
          </div>
        </motion.div>

        {/* ================= MOBILE: SWIPER ================= */}
        {isMobile && settings?.enableSwiper && (
          <div className="mb-8 sm:mb-12">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={16}
              slidesPerView={1.2}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: settings?.autoplayDelay || 5000, disableOnInteraction: false }}
              className="pb-12"
            >
              {getPaginatedVideos().map((video) => (
                <SwiperSlide key={video.id}>
                  <VideoCard
                    video={video}
                    thumbnail={getThumbnail(video)}
                    onClick={() => handleVideoPlay(video)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Mobile Pagination */}
            {settings?.enablePagination && <PaginationComponent />}
          </div>
        )}

        {/* ================= DESKTOP: GRID ================= */}
        {!isMobile && (
          <div className="mb-8 sm:mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {getPaginatedVideos().map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  thumbnail={getThumbnail(video)}
                  onClick={() => handleVideoPlay(video)}
                />
              ))}
            </div>

            {/* Desktop Pagination */}
            {settings?.enablePagination && <PaginationComponent />}
          </div>
        )}

        {/* ================= VIDEO MODAL ================= */}
        <AnimatePresence>
          {activeVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[99999] bg-blue/95 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4"
              onClick={() => setActiveVideo(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative w-full max-w-2xl lg:max-w-3xl bg-gradient-to-br from-navy-900 to-black rounded-lg sm:rounded-xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  className="absolute top-1 right-1 sm:top-2 sm:right-2 z-10 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full transition-colors backdrop-blur-sm"
                  onClick={() => setActiveVideo(null)}
                >
                  <X className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>

                {/* Video Container */}
                <div className="relative aspect-video bg-black">
                  {activeVideo.type === "youtube" ? (
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${activeVideo.youtubeId || extractYouTubeId(activeVideo.youtubeUrl)}?autoplay=1&rel=0&modestbranding=1`}
                      title={activeVideo.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      src={activeVideo.videoFile}
                      controls
                      autoPlay
                      playsInline
                      className="w-full h-full"
                    />
                  )}
                </div>

                {/* Video Info - Ultra Compact */}
                <div className="p-2 sm:p-3">
                  {/* Title Row */}
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-title text-xs sm:text-sm font-bold text-white line-clamp-1 flex-1">
                      {activeVideo.title}
                    </h3>
                    
                    {/* Category Badge */}
                    {activeVideo.category && (
                      <span className="px-1.5 py-0.5 bg-gradient-to-r from-navy-600 to-blue-600 text-white rounded-full text-[10px] sm:text-xs whitespace-nowrap">
                        {activeVideo.category}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  {activeVideo.description && (
                    <p className="text-gray-300 text-[10px] sm:text-xs mb-1 line-clamp-1">
                      {activeVideo.description}
                    </p>
                  )}

                  {/* Metadata Row */}
                  <div className="flex items-center justify-between gap-1">
                    <div className="flex items-center gap-1">
                      {/* Date */}
                      {activeVideo.date && (
                        <div className="flex items-center gap-0.5 text-gray-400 bg-black/20 px-1 py-0.5 rounded">
                          <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                          <span className="text-[9px] sm:text-xs whitespace-nowrap">
                            {new Date(activeVideo.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric"
                            })}
                          </span>
                        </div>
                      )}

                      {/* Duration */}
                      {activeVideo.duration && (
                        <div className="flex items-center gap-0.5 text-gray-400 bg-black/20 px-1 py-0.5 rounded">
                          <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                          <span className="text-[9px] sm:text-xs">
                            {activeVideo.duration}
                          </span>
                        </div>
                      )}

                      {/* Views */}
                      <div className="flex items-center gap-0.5 text-gray-400 bg-black/20 px-1 py-0.5 rounded">
                        <Eye className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        <span className="text-[9px] sm:text-xs">
                          {videoViews[activeVideo.id] || 1}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-0.5">
                      <button className="p-1 bg-white/10 hover:bg-white/20 text-white rounded transition-colors">
                        <ThumbsUp className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      </button>
                      <button className="p-1 bg-white/10 hover:bg-white/20 text-white rounded transition-colors">
                        <Share2 className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      </button>
                      {activeVideo.downloadable && (
                        <a
                          href={activeVideo.videoFile}
                          download
                          className="p-1 bg-gradient-to-r from-navy-600 to-blue-600 text-white rounded hover:shadow-lg transition-all"
                        >
                          <Download className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ================= INFO SECTION ================= */}
        <motion.div
          className="mt-8 sm:mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-br from-navy-50/80 to-blue-50/80 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-navy-100 p-4 sm:p-5 md:p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-navy-800 mb-3">
                  {aboutSection?.title || "About School Videos"}
                </h3>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  {aboutSection?.description || "Our video collection showcases school events, performances, achievements, and daily activities. All videos are professionally recorded and edited to provide the best viewing experience."}
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="bg-white/80 rounded-lg p-3 text-center border border-navy-100">
                    <div className="text-xl sm:text-2xl font-bold text-navy-700 mb-1">
                      {videosData.videos.videos.length}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">Total Videos</div>
                  </div>
                  <div className="bg-white/80 rounded-lg p-3 text-center border border-navy-100">
                    <div className="text-xl sm:text-2xl font-bold text-navy-700 mb-1">
                      {categories.length - 1}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">Categories</div>
                  </div>
                  <div className="bg-white/80 rounded-lg p-3 text-center border border-navy-100">
                    <div className="text-xl sm:text-2xl font-bold text-navy-700 mb-1">HD</div>
                    <div className="text-xs sm:text-sm text-gray-600">Quality</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
              <span className="text-xs sm:text-sm font-medium">{footer?.text || "School Memories in Motion"}</span>
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

export default Videos;



// import React, { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import videoData from "../../constant/GalleryData/videoData";
// import { 
//   PlayCircle, 
//   X, 
//   Youtube, 
//   Video,
//   Calendar,
//   Clock,
//   Star,
//   Sparkles,
//   Cloud,
//   Heart,
//   Eye,
//   ChevronLeft,
//   ChevronRight,
//   Maximize2,
//   ThumbsUp,
//   Share2,
//   Download
// } from "lucide-react";

// // Swiper for mobile
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// const Videos = () => {
//   const [activeVideo, setActiveVideo] = useState(null);
//   const [isMobile, setIsMobile] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [videoViews, setVideoViews] = useState({});
//   const videoContainerRef = useRef(null);

//   // Videos per page
//   const VIDEOS_PER_PAGE = isMobile ? 4 : 6;

//   // Check if mobile
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   // Get categories
//   const categories = ["all", ...new Set(videoData.videos.map(video => video.category).filter(Boolean))];

//   // Filter videos by category
//   const filteredVideos = videoData.videos.filter(video => 
//     selectedCategory === "all" || video.category === selectedCategory
//   );

//   // Get paginated videos
//   const getPaginatedVideos = () => {
//     const startIndex = (currentPage - 1) * VIDEOS_PER_PAGE;
//     const endIndex = startIndex + VIDEOS_PER_PAGE;
//     return filteredVideos.slice(startIndex, endIndex);
//   };

//   // Get total pages
//   const totalPages = Math.ceil(filteredVideos.length / VIDEOS_PER_PAGE);

//   // Get thumbnail
//   const getThumbnail = (video) => {
//     if (video.type === "youtube") {
//       return `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`;
//     }
//     return video.thumbnail;
//   };

//   // Handle video play
//   const handleVideoPlay = (video) => {
//     setActiveVideo(video);
//     // Increment view count
//     setVideoViews(prev => ({
//       ...prev,
//       [video.id]: (prev[video.id] || 0) + 1
//     }));
//   };

//   // Handle page change
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//     if (videoContainerRef.current) {
//       videoContainerRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   // Handle category change
//   const handleCategoryChange = (category) => {
//     setSelectedCategory(category);
//     setCurrentPage(1);
//   };

//   // Video Card Component
//   const VideoCard = ({ video, thumbnail, onClick }) => (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4 }}
//       whileHover={{ y: -5 }}
//       onClick={onClick}
//       className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-navy-100"
//     >
//       {/* Thumbnail Container */}
//       <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-gray-100 to-navy-50/30">
//         <img
//           src={thumbnail}
//           alt={video.title}
//           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
//           loading="lazy"
//         />
        
//         {/* Play Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
//               <PlayCircle className="w-12 h-12 sm:w-14 sm:h-14 text-white" />
//             </div>
//           </div>
//         </div>

//         {/* Video Badge */}
//         <div className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
//           {video.type === "youtube" ? (
//             <span className="flex items-center gap-1">
//               <Youtube className="w-3 h-3" />
//               YouTube
//             </span>
//           ) : (
//             <span className="flex items-center gap-1">
//               <Video className="w-3 h-3" />
//               MP4
//             </span>
//           )}
//         </div>

//         {/* Duration Badge */}
//         {video.duration && (
//           <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium backdrop-blur-sm">
//             {video.duration}
//           </div>
//         )}

//         {/* View Count Badge */}
//         {videoViews[video.id] > 0 && (
//           <div className="absolute top-3 left-3 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium backdrop-blur-sm flex items-center gap-1">
//             <Eye className="w-3 h-3" />
//             {videoViews[video.id]}
//           </div>
//         )}
//       </div>

//       {/* Video Info */}
//       <div className="p-4 sm:p-5 md:p-6">
//         <h3 className="font-title font-bold text-navy-800 text-base sm:text-lg mb-2 line-clamp-2">
//           {video.title}
//         </h3>
        
//         {video.description && (
//           <p className="font-primary text-gray-600 text-sm mb-3 line-clamp-2">
//             {video.description}
//           </p>
//         )}

//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             {video.category && (
//               <span className="font-primary px-2 py-1 bg-gradient-to-r from-navy-50 to-blue-50 text-navy-700 rounded text-xs font-medium border border-navy-100">
//                 {video.category}
//               </span>
//             )}
            
//             {video.date && (
//               <span className="font-primary text-gray-500 text-xs flex items-center gap-1">
//                 <Calendar className="w-3 h-3" />
//                 {new Date(video.date).toLocaleDateString("en-US", { 
//                   month: "short", 
//                   day: "numeric", 
//                   year: "numeric" 
//                 })}
//               </span>
//             )}
//           </div>

//           <div className="text-navy-600 opacity-0 group-hover:opacity-100 transition-opacity">
//             <PlayCircle className="w-5 h-5" />
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );

//   // Pagination Component
//   const PaginationComponent = () => {
//     if (totalPages <= 1) return null;

//     return (
//       <div className="mt-8 flex flex-col items-center gap-4">
//         <div className="flex items-center gap-2">
//           <button
//             onClick={() => handlePageChange(currentPage - 1)}
//             disabled={currentPage === 1}
//             className="p-2 rounded-lg border border-navy-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-navy-50 transition-colors"
//           >
//             <ChevronLeft className="w-4 h-4 text-navy-600" />
//           </button>

//           <div className="flex items-center gap-2">
//             {Array.from({ length: Math.min(5, totalPages) }).map((_, index) => {
//               let pageNum;
//               if (totalPages <= 5) {
//                 pageNum = index + 1;
//               } else if (currentPage <= 3) {
//                 pageNum = index + 1;
//               } else if (currentPage >= totalPages - 2) {
//                 pageNum = totalPages - 4 + index;
//               } else {
//                 pageNum = currentPage - 2 + index;
//               }

//               return (
//                 <button
//                   key={pageNum}
//                   onClick={() => handlePageChange(pageNum)}
//                   className={`w-8 h-8 rounded-lg font-medium transition-all ${
//                     currentPage === pageNum
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
//             onClick={() => handlePageChange(currentPage + 1)}
//             disabled={currentPage === totalPages}
//             className="p-2 rounded-lg border border-navy-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-navy-50 transition-colors"
//           >
//             <ChevronRight className="w-4 h-4 text-navy-600" />
//           </button>
//         </div>

//         <div className="text-sm text-gray-600">
//           Page {currentPage} of {totalPages} • Showing {getPaginatedVideos().length} of {filteredVideos.length} videos
//         </div>
//       </div>
//     );
//   };

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
//           <Video className="w-6 h-6 sm:w-8 sm:h-8 text-blue-300" />
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto relative z-10" ref={videoContainerRef}>
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
//               {videoData.title}
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
//             {videoData.description}
//           </p>

//           {/* Quick Stats */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.4 }}
//             className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-6"
//           >
//             <div className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-gradient-to-br from-navy-50 to-blue-50 rounded-full border border-navy-100">
//               <Video className="h-3 w-3 sm:h-4 sm:w-4 text-navy-600" />
//               <span className="text-xs sm:text-sm font-medium text-navy-700">
//                 {videoData.videos.length} Videos
//               </span>
//             </div>
//             <div className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-gradient-to-br from-navy-50 to-blue-50 rounded-full border border-navy-100">
//               <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-navy-600" />
//               <span className="text-xs sm:text-sm font-medium text-navy-700">
//                 HD Quality
//               </span>
//             </div>
//             <div className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-gradient-to-br from-navy-50 to-blue-50 rounded-full border border-navy-100">
//               <PlayCircle className="h-3 w-3 sm:h-4 sm:w-4 text-navy-600" />
//               <span className="text-xs sm:text-sm font-medium text-navy-700">
//                 Stream & Download
//               </span>
//             </div>
//           </motion.div>
//         </motion.div>

//         {/* ================= CATEGORY FILTER ================= */}
//         <motion.div
//           className="mb-8 sm:mb-12"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-navy-100 p-4 sm:p-6">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="relative">
//                 <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-navy-600 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center">
//                   <PlayCircle className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
//                 </div>
//                 <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
//                   <Star className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-white" />
//                 </div>
//               </div>
//               <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-navy-800">
//                 Filter Videos
//               </h2>
//             </div>

//             <div className="flex flex-wrap gap-2">
//               {categories.map((category) => (
//                 <button
//                   key={category}
//                   onClick={() => handleCategoryChange(category)}
//                   className={`font-primary px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium transition-all ${selectedCategory === category
//                       ? "bg-gradient-to-r from-navy-600 to-blue-600 text-white"
//                       : "bg-gradient-to-br from-white to-gray-50 text-gray-700 hover:bg-navy-50 border border-navy-100"
//                     }`}
//                 >
//                   {category === "all" ? "All Videos" : category}
//                 </button>
//               ))}
//             </div>

//             {/* Results Counter */}
//             <div className="mt-4 flex items-center justify-between text-gray-600 text-sm">
//               <div className="flex items-center gap-2">
//                 <span className="font-medium text-navy-700">
//                   {filteredVideos.length} {filteredVideos.length === 1 ? 'video' : 'videos'} found
//                 </span>
//               </div>
//               {selectedCategory !== "all" && (
//                 <span className="text-xs bg-gradient-to-r from-navy-100 to-blue-100 text-navy-700 px-2 py-1 rounded-full border border-navy-200">
//                   {selectedCategory}
//                 </span>
//               )}
//             </div>
//           </div>
//         </motion.div>

//         {/* ================= MOBILE: SWIPER ================= */}
//         {isMobile && (
//           <div className="mb-8 sm:mb-12">
//             <Swiper
//               modules={[Navigation, Pagination, Autoplay]}
//               spaceBetween={16}
//               slidesPerView={1.2}
//               navigation
//               pagination={{ clickable: true }}
//               autoplay={{ delay: 5000, disableOnInteraction: false }}
//               className="pb-12"
//             >
//               {getPaginatedVideos().map((video) => (
//                 <SwiperSlide key={video.id}>
//                   <VideoCard
//                     video={video}
//                     thumbnail={getThumbnail(video)}
//                     onClick={() => handleVideoPlay(video)}
//                   />
//                 </SwiperSlide>
//               ))}
//             </Swiper>

//             {/* Mobile Pagination */}
//             <PaginationComponent />
//           </div>
//         )}

//         {/* ================= DESKTOP: GRID ================= */}
//         {!isMobile && (
//           <div className="mb-8 sm:mb-12">
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
//               {getPaginatedVideos().map((video) => (
//                 <VideoCard
//                   key={video.id}
//                   video={video}
//                   thumbnail={getThumbnail(video)}
//                   onClick={() => handleVideoPlay(video)}
//                 />
//               ))}
//             </div>

//             {/* Desktop Pagination */}
//             <PaginationComponent />
//           </div>
//         )}

//         {/* ================= VIDEO MODAL ================= */}
//         <AnimatePresence>
//           {activeVideo && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
//               onClick={() => setActiveVideo(null)}
//             >
//               <motion.div
//                 initial={{ scale: 0.9, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.9, opacity: 0 }}
//                 transition={{ duration: 0.3 }}
//                 className="relative w-full max-w-6xl bg-gradient-to-br from-navy-900 to-black rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 {/* Close Button */}
//                 <button
//                   className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors backdrop-blur-sm"
//                   onClick={() => setActiveVideo(null)}
//                 >
//                   <X className="w-6 h-6" />
//                 </button>

//                 {/* Video Container */}
//                 <div className="relative aspect-video bg-black">
//                   {activeVideo.type === "youtube" ? (
//                     <iframe
//                       className="w-full h-full"
//                       src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
//                       title={activeVideo.title}
//                       frameBorder="0"
//                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                       allowFullScreen
//                     />
//                   ) : (
//                     <video
//                       src={activeVideo.src}
//                       controls
//                       autoPlay
//                       playsInline
//                       className="w-full h-full"
//                     />
//                   )}

//                   {/* Fullscreen Toggle */}
//                   <button
//                     className="absolute bottom-4 right-4 bg-black/50 text-white p-2 rounded backdrop-blur-sm hover:bg-black/70 transition-colors"
//                     onClick={() => {
//                       const iframe = document.querySelector('iframe');
//                       if (iframe) {
//                         if (iframe.requestFullscreen) {
//                           iframe.requestFullscreen();
//                         }
//                       }
//                     }}
//                   >
//                     <Maximize2 className="w-5 h-5" />
//                   </button>
//                 </div>

//                 {/* Video Info */}
//                 <div className="p-6 sm:p-8">
//                   <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
//                     <div className="flex-1">
//                       <h3 className="font-title text-xl sm:text-2xl font-bold text-white mb-2">
//                         {activeVideo.title}
//                       </h3>
                      
//                       {activeVideo.description && (
//                         <p className="font-primary text-gray-300 text-sm sm:text-base">
//                           {activeVideo.description}
//                         </p>
//                       )}
//                     </div>

//                     <div className="flex items-center gap-4">
//                       {/* Views Count */}
//                       <div className="flex items-center gap-2 text-gray-300">
//                         <Eye className="w-4 h-4" />
//                         <span className="text-sm">
//                           {videoViews[activeVideo.id] || 1} views
//                         </span>
//                       </div>

//                       {/* Category Badge */}
//                       {activeVideo.category && (
//                         <span className="px-3 py-1 bg-gradient-to-r from-navy-600 to-blue-600 text-white rounded-full text-sm">
//                           {activeVideo.category}
//                         </span>
//                       )}
//                     </div>
//                   </div>

//                   {/* Video Metadata */}
//                   <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
//                     {activeVideo.date && (
//                       <div className="flex items-center gap-2 text-gray-400">
//                         <Calendar className="w-4 h-4" />
//                         <span className="font-primary text-sm">
//                           {new Date(activeVideo.date).toLocaleDateString("en-US", {
//                             weekday: "long",
//                             month: "long",
//                             day: "numeric",
//                             year: "numeric"
//                           })}
//                         </span>
//                       </div>
//                     )}

//                     {activeVideo.duration && (
//                       <div className="flex items-center gap-2 text-gray-400">
//                         <Clock className="w-4 h-4" />
//                         <span className="font-primary text-sm">
//                           {activeVideo.duration}
//                         </span>
//                       </div>
//                     )}

//                     {/* Action Buttons */}
//                     <div className="flex items-center gap-2 ml-auto">
//                       <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
//                         <ThumbsUp className="w-4 h-4" />
//                         <span className="text-sm">Like</span>
//                       </button>
//                       <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
//                         <Share2 className="w-4 h-4" />
//                         <span className="text-sm">Share</span>
//                       </button>
//                       {activeVideo.downloadable && (
//                         <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-navy-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all">
//                           <Download className="w-4 h-4" />
//                           <span className="text-sm">Download</span>
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* ================= INFO SECTION ================= */}
//         <motion.div
//           className="mt-8 sm:mt-12"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.3 }}
//           viewport={{ once: true }}
//         >
//           <div className="bg-gradient-to-br from-navy-50/80 to-blue-50/80 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-navy-100 p-4 sm:p-5 md:p-6">
//             <div className="flex flex-col md:flex-row gap-6">
//               <div className="flex-1">
//                 <h3 className="text-base sm:text-lg md:text-xl font-bold text-navy-800 mb-3">
//                   About School Videos
//                 </h3>
//                 <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
//                   Our video collection showcases school events, performances, achievements, and daily activities. 
//                   All videos are professionally recorded and edited to provide the best viewing experience.
//                 </p>
//               </div>
//               <div className="flex-shrink-0">
//                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//                   <div className="bg-white/80 rounded-lg p-3 text-center border border-navy-100">
//                     <div className="text-xl sm:text-2xl font-bold text-navy-700 mb-1">
//                       {videoData.videos.length}
//                     </div>
//                     <div className="text-xs sm:text-sm text-gray-600">Total Videos</div>
//                   </div>
//                   <div className="bg-white/80 rounded-lg p-3 text-center border border-navy-100">
//                     <div className="text-xl sm:text-2xl font-bold text-navy-700 mb-1">
//                       {categories.length - 1}
//                     </div>
//                     <div className="text-xs sm:text-sm text-gray-600">Categories</div>
//                   </div>
//                   <div className="bg-white/80 rounded-lg p-3 text-center border border-navy-100">
//                     <div className="text-xl sm:text-2xl font-bold text-navy-700 mb-1">HD</div>
//                     <div className="text-xs sm:text-sm text-gray-600">Quality</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
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
//               <span className="text-xs sm:text-sm font-medium">School Memories in Motion</span>
//               <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
//             </div>
//             <div className="w-6 h-px sm:w-8 md:w-12 bg-gradient-to-r from-transparent via-navy-400 to-transparent"></div>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Videos;