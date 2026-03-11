import React, { useState, useEffect } from "react";
import circularsData from "../../constant/Infocorner/CircularsData";
import {
  FileText,
  Download,
  ExternalLink,
  Bell,
  AlertCircle,
  Calendar,
  Star,
  Sparkles,
  Cloud,
  Sun,
  Heart,
  Clock,
  ChevronRight,
  BookOpen,
  CheckCircle,
  Globe,
  ArrowRight,
  Award,
} from "lucide-react";
import { motion } from "framer-motion";
import axiosInstance from "../../services/api";

const Circulars = () => {
  const [apiData, setApiData] = useState({
    pageTitle: "Circulars & Notices",
    pageSubtitle: "Official circulars, notices, and announcements from CBSE and our institution. Stay updated with the latest information.",
    cbsePortal: {
      title: "CBSE Official Portal",
      subtitle: "Access all official circulars, notifications, and announcements directly from the Central Board of Secondary Education",
      badge: "Official",
      buttonText: "Visit Portal",
      url: "https://cbse.gov.in/cbsenew/circulars.html",
      features: ["100+ Circulars", "Daily Updates", "Govt. Approved"]
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCircularsData();
  }, []);

  const fetchCircularsData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/circulars-notices');
      
      if (response.data.success) {
        const apiResponse = response.data.data;
        
        // Process the API data
        const processedData = {
          pageTitle: apiResponse.pageTitle || "Circulars & Notices",
          pageSubtitle: apiResponse.pageSubtitle || "Official circulars, notices, and announcements from CBSE and our institution. Stay updated with the latest information.",
          cbsePortal: {
            title: apiResponse.cbsePortal?.title || "CBSE Official Portal",
            subtitle: apiResponse.cbsePortal?.subtitle || "Access all official circulars, notifications, and announcements directly from the Central Board of Secondary Education",
            badge: apiResponse.cbsePortal?.badge || "Official",
            buttonText: apiResponse.cbsePortal?.buttonText || "Visit Portal",
            url: apiResponse.cbsePortal?.url || "https://cbse.gov.in/cbsenew/circulars.html",
            features: apiResponse.cbsePortal?.features?.length > 0 
              ? apiResponse.cbsePortal.features 
              : ["100+ Circulars", "Daily Updates", "Govt. Approved"]
          }
        };
        
        setApiData(processedData);
        setError(null);
      }
    } catch (err) {
      console.error('Error fetching circulars data:', err);
      setError('Failed to load circulars data');
    } finally {
      setLoading(false);
    }
  };

  // Function to handle CBSE Portal click
  const handleCbsePortalClick = () => {
    window.open(
      apiData.cbsePortal.url || "https://cbse.gov.in/cbsenew/circulars.html",
      "_blank",
      "noopener,noreferrer"
    );
  };

  // Function to handle circular download
  const handleCircularDownload = (pdfFile, title) => {
    console.log(`Downloading circular: ${title}`);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return {
          bg: "from-red-50 to-rose-50",
          text: "text-red-600",
          badge: "bg-red-100 text-red-800",
          iconBg: "bg-red-500",
        };
      case "Medium":
        return {
          bg: "from-yellow-50 to-amber-50",
          text: "text-yellow-600",
          badge: "bg-yellow-100 text-yellow-800",
          iconBg: "bg-yellow-500",
        };
      default:
        return {
          bg: "from-blue-50 to-navy-50",
          text: "text-blue-600",
          badge: "bg-blue-100 text-blue-800",
          iconBg: "bg-blue-500",
        };
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-navy-50/30 py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-navy-100/20 to-blue-100/10 rounded-full -translate-x-24 -translate-y-24"></div>
        {/* <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-tl from-blue-100/10 to-navy-100/20 rounded-full translate-x-24 translate-y-24"></div> */}
        
        <div className="text-center relative z-10">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-navy-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading circulars...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-navy-50/30 py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-navy-100/20 to-blue-100/10 rounded-full -translate-x-24 -translate-y-24"></div>
        {/* <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-tl from-blue-100/10 to-navy-100/20 rounded-full translate-x-24 translate-y-24"></div> */}
        
        <div className="text-center relative z-10">
          <p className="text-red-600 text-xl mb-4">⚠️ {error}</p>
          <button 
            onClick={fetchCircularsData}
            className="px-6 py-2 bg-gradient-to-r from-navy-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-navy-50/30 py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-navy-100/20 to-blue-100/10 rounded-full -translate-x-24 -translate-y-24"></div>
      {/* <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-tl from-blue-100/10 to-navy-100/20 rounded-full translate-x-24 translate-y-24"></div> */}

      {/* Creative decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-5 sm:top-20 sm:left-10 opacity-20 animate-bounce">
          <Cloud className="w-8 h-8 sm:w-10 sm:h-10 text-navy-400" />
        </div>
        <div className="absolute top-20 right-8 sm:top-32 sm:right-16 opacity-20 animate-pulse">
          <Sun className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-400" />
        </div>
        <div className="absolute bottom-20 left-10 sm:bottom-32 sm:left-20 opacity-20 animate-bounce">
          <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-pink-400" />
        </div>
        <div className="absolute top-1/3 left-1/4 opacity-15">
          <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-navy-300" />
        </div>
        <div className="absolute bottom-1/3 right-1/4 opacity-15">
          <Bell className="w-6 h-6 sm:w-8 sm:h-8 text-blue-300" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ================= HEADING ================= */}
        <motion.div
          className="text-center mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-500"></div>
            <h1 className="font-title text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gradient-navy">
              {apiData.pageTitle}
            </h1>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-500"></div>
          </div>

          <motion.div
            className="h-1 sm:h-1.5 w-16 sm:w-20 md:w-24 bg-gradient-to-r from-navy-600 via-blue-600 to-navy-600 mx-auto mb-4 sm:mb-6 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: "4rem" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          />
          
          <p className="text-gray-700 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-2 sm:px-4">
            {apiData.pageSubtitle}
          </p>

          {/* Quick Stats - Commented out as in original */}
          {/* <motion.div ... > */}
        </motion.div>

        {/* ================= UPDATED CBSE PORTAL LINK DESIGN ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-12"
        >
          <div
            onClick={handleCbsePortalClick}
            className="relative group cursor-pointer overflow-hidden"
          >
            {/* Main Card with Gradient Border */}
            <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 p-[2px] bg-gradient-to-r from-navy-400 via-blue-500 to-navy-400">
              <div className="absolute inset-0 bg-gradient-to-r from-navy-600 via-blue-600 to-navy-600 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
              <div className="relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute -inset-[100%] bg-gradient-to-r from-navy-600 to-blue-600 rotate-45 transform scale-150 group-hover:animate-shimmer"></div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-navy-100/30 to-transparent rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-100/30 to-transparent rounded-tr-full"></div>
                
                {/* Floating Icons */}
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Globe className="w-16 h-16 text-navy-800" />
                </div>
                <div className="absolute bottom-4 left-4 opacity-10 group-hover:opacity-20 transition-opacity rotate-12">
                  <Award className="w-12 h-12 text-blue-800" />
                </div>

                {/* Content */}
                <div className="relative p-6 sm:p-8 md:p-10">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
                    {/* Left Section */}
                    <div className="flex items-center gap-4 sm:gap-6 flex-1">
                      {/* Icon Container with Animation */}
                      <div className="relative">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-navy-600 via-blue-600 to-navy-700 rounded-xl sm:rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-xl">
                          <Globe className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
                        </div>
                        {/* Pulsing Ring */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-navy-400 to-blue-400 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-50 blur-md group-hover:animate-ping"></div>
                        {/* Mini Badge */}
                        <div className="absolute -top-2 -right-2 w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                          <Star className="w-3 h-3 sm:w-4 sm:h-4 text-white fill-white" />
                        </div>
                      </div>

                      {/* Text Content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-navy-800 via-blue-800 to-navy-800 bg-clip-text text-transparent">
                            {apiData.cbsePortal.title}
                          </h3>
                          <div className="px-2 py-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full">
                            <span className="text-[10px] sm:text-xs font-bold text-white uppercase tracking-wider">{apiData.cbsePortal.badge}</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-xl">
                          {apiData.cbsePortal.subtitle}
                        </p>

                        {/* Feature Tags */}
                        <div className="flex flex-wrap gap-2 mt-3">
                          {apiData.cbsePortal.features.map((feature, index) => (
                            <span 
                              key={index} 
                              className="inline-flex items-center gap-1 px-2 py-1 bg-navy-50 rounded-full text-xs font-medium text-navy-700"
                            >
                              {index === 0 && <CheckCircle className="w-3 h-3" />}
                              {index === 1 && <Clock className="w-3 h-3" />}
                              {index === 2 && <Award className="w-3 h-3" />}
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Section - CTA Button */}
                    <div className="flex-shrink-0">
                      <div className="relative group/btn">
                        {/* Button Background Animation */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-navy-600 to-blue-600 rounded-xl blur opacity-0 group-hover/btn:opacity-75 transition-opacity duration-500"></div>
                        
                        {/* Button */}
                        <div className="relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-navy-600 to-blue-600 rounded-xl shadow-lg hover:shadow-xl transform group-hover/btn:scale-105 transition-all duration-300">
                          <div className="flex items-center gap-3">
                            <span className="text-white font-semibold text-sm sm:text-base md:text-lg whitespace-nowrap">
                              {apiData.cbsePortal.buttonText}
                            </span>
                            <div className="w-6 h-6 sm:w-7 sm:h-7 bg-white/20 rounded-lg flex items-center justify-center group-hover/btn:translate-x-1 transition-transform">
                              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                            </div>
                          </div>
                          
                          {/* Shimmer Effect */}
                          <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-navy-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            </div>

            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-navy-400 rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-blue-400 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-blue-400 rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-navy-400 rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </motion.div>

        {/* ================= REMAINING CODE (ALL COMMENTED OUT AS IN ORIGINAL) ================= */}
        
        {/* <motion.div ... > */}

        {/* ================= BOTTOM INFO SECTION ================= */}
        {/* <motion.div ... > */}

        {/* ================= BOTTOM DECORATIVE ELEMENT ================= */}
        {/* <motion.div ... > */}
      </div>

      {/* Add custom animation styles */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(100%) rotate(45deg);
          }
        }
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
      `}</style>
    </div>
  );
};

export default Circulars;