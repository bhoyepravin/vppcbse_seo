import React, { useState, useEffect } from "react";
import { Calendar, ExternalLink, Smartphone, Monitor, Tablet, Download, BookOpen, Star, Sparkles, Cloud, Sun, Heart, ChevronRight, ChevronLeft, Clock, FileText } from "lucide-react";
import AcademiccalendarData from "../../constant/Calendar/AcademicCalendarData";
import { motion } from "framer-motion";
import axiosInstance from "../../services/api"; // Update this import path based on your project structure

const AcademicCalendar = () => {
  const [calendarData, setCalendarData] = useState({
    academicCalendar: {
      id: "academic-calendar-section",
      header: {
        title: AcademiccalendarData.header?.title || "Academic Calendar",
        description: AcademiccalendarData.header?.description || "View and explore the academic calendar by year"
      },
      calendars: AcademiccalendarData.calendars || [],
      aboutSection: {
        title: AcademiccalendarData.aboutSection?.title || "About Academic Calendar",
        content: AcademiccalendarData.aboutSection?.content || "Our academic calendar includes important dates for examinations, holidays, parent-teacher meetings, cultural events, and other school activities. Regular updates ensure students and parents stay informed throughout the year."
      }
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCalendarId, setSelectedCalendarId] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentCalendarIndex, setCurrentCalendarIndex] = useState(0);

  useEffect(() => {
    fetchAcademicCalendar();
  }, []);

  const fetchAcademicCalendar = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/academic-calendars');
      
      if (response.data.success) {
        const apiData = response.data.data;
        
        // Process the API data - fix PDF URLs
        const processedData = {
          academicCalendar: {
            id: apiData.academicCalendar?.id || "academic-calendar-section",
            header: {
              title: apiData.academicCalendar?.header?.title || "Academic Calendar",
              description: apiData.academicCalendar?.header?.description || "View and explore the academic calendar by year"
            },
            calendars: apiData.academicCalendar?.calendars?.length > 0 
              ? apiData.academicCalendar.calendars.map(cal => ({
                  ...cal,
                  pdf: cal.pdf?.replace(/\\\//g, '/') || cal.pdf
                }))
              : AcademiccalendarData.calendars || [],
            aboutSection: {
              title: apiData.academicCalendar?.aboutSection?.title || "About Academic Calendar",
              content: apiData.academicCalendar?.aboutSection?.content || "Our academic calendar includes important dates for examinations, holidays, parent-teacher meetings, cultural events, and other school activities. Regular updates ensure students and parents stay informed throughout the year."
            }
          }
        };
        
        setCalendarData(processedData);
        
        // Set initial selected calendar
        if (processedData.academicCalendar.calendars.length > 0) {
          const firstCalendar = processedData.academicCalendar.calendars[0];
          setSelectedCalendarId(firstCalendar.id?.toString() || firstCalendar.year || "1");
        }
        
        setError(null);
      }
    } catch (err) {
      console.error('Error fetching academic calendar:', err);
      setError('Failed to load academic calendar');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (calendarData.academicCalendar.calendars.length > 0) {
      // Find initial index
      const initialIndex = calendarData.academicCalendar.calendars.findIndex(
        item => (item.id?.toString() || item.year) === selectedCalendarId
      );
      setCurrentCalendarIndex(initialIndex >= 0 ? initialIndex : 0);
    }
  }, [selectedCalendarId, calendarData.academicCalendar.calendars]);

  const selectedCalendar = calendarData.academicCalendar.calendars.find(
    (item) => (item.id?.toString() || item.year) === selectedCalendarId
  );

  const getPdfUrl = () => {
  if (!selectedCalendar?.pdf) return '';

  // Hide toolbar, nav pane, scrollbar
  const params = '#toolbar=0';

  return `${selectedCalendar.pdf}${params}`;
};

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleCalendarSelect = (calendarId) => {
    setSelectedCalendarId(calendarId);
    setIsLoading(true);
    const newIndex = calendarData.academicCalendar.calendars.findIndex(
      item => (item.id?.toString() || item.year) === calendarId
    );
    setCurrentCalendarIndex(newIndex);
  };

  const handlePreviousCalendar = () => {
    if (currentCalendarIndex > 0) {
      const newIndex = currentCalendarIndex - 1;
      setCurrentCalendarIndex(newIndex);
      const calendarId = calendarData.academicCalendar.calendars[newIndex].id?.toString() || 
                        calendarData.academicCalendar.calendars[newIndex].year;
      setSelectedCalendarId(calendarId);
      setIsLoading(true);
    }
  };

  const handleNextCalendar = () => {
    if (currentCalendarIndex < calendarData.academicCalendar.calendars.length - 1) {
      const newIndex = currentCalendarIndex + 1;
      setCurrentCalendarIndex(newIndex);
      const calendarId = calendarData.academicCalendar.calendars[newIndex].id?.toString() || 
                        calendarData.academicCalendar.calendars[newIndex].year;
      setSelectedCalendarId(calendarId);
      setIsLoading(true);
    }
  };

  const handleDownload = () => {
    if (selectedCalendar?.pdf) {
      window.open(selectedCalendar.pdf, '_blank');
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
          <p className="text-gray-600 text-lg">Loading academic calendar...</p>
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
            onClick={fetchAcademicCalendar}
            className="px-6 py-2 bg-gradient-to-r from-navy-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const { header, calendars, aboutSection } = calendarData.academicCalendar;

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
          <Star className="w-6 h-6 sm:w-8 sm:h-8 text-navy-300" />
        </div>
        <div className="absolute top-1/2 right-10 opacity-10">
          <BookOpen className="w-10 h-10 sm:w-12 sm:h-12 text-blue-300" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ================= HEADER ================= */}
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
              {header?.title || "Academic Calendar"}
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
            {header?.description || "View and explore the academic calendar by year"}
          </p>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-6"
          >
            <div className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-gradient-to-br from-navy-50 to-blue-50 rounded-full border border-navy-100">
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-navy-600" />
              <span className="text-xs sm:text-sm font-medium text-navy-700">
                {calendars.length} Calendars
              </span>
            </div>
            
            <div className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-gradient-to-br from-navy-50 to-blue-50 rounded-full border border-navy-100">
              <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-navy-600" />
              <span className="text-xs sm:text-sm font-medium text-navy-700">
                Updated Annually
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* ================= CALENDAR SELECTION ================= */}
        {calendars.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-8 sm:mb-12"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-navy-100 p-4 sm:p-6">
              {/* Section Header */}
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="relative">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-navy-600 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                    <Star className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-white" />
                  </div>
                </div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-navy-800">
                  Select Calendar
                </h2>
              </div>

              {/* Calendar Selection with Navigation */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                {/* Navigation Arrows */}
                <div className="flex items-center gap-2 sm:order-1">
                  <button
                    onClick={handlePreviousCalendar}
                    disabled={currentCalendarIndex === 0}
                    className="p-2 rounded-lg border border-navy-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-navy-50 transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 text-navy-600" />
                  </button>

                  {/* Calendar Indicators */}
                  <div className="flex items-center gap-1.5">
                    {calendars.map((item, index) => {
                      const calendarId = item.id?.toString() || item.year || index.toString();
                      return (
                        <div
                          key={item.id || index}
                          className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                            selectedCalendarId === calendarId
                              ? "bg-gradient-to-r from-navy-600 to-blue-600 w-3 sm:w-4"
                              : "bg-navy-300"
                          }`}
                        />
                      );
                    })}
                  </div>

                  <button
                    onClick={handleNextCalendar}
                    disabled={currentCalendarIndex === calendars.length - 1}
                    className="p-2 rounded-lg border border-navy-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-navy-50 transition-colors"
                  >
                    <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-navy-600" />
                  </button>
                </div>

                {/* Calendar Buttons */}
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 flex-1 sm:order-2">
                  {calendars.map((item) => {
                    const calendarId = item.id?.toString() || item.year || "";
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleCalendarSelect(calendarId)}
                        className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-medium transition-all duration-300 ${
                          selectedCalendarId === calendarId
                            ? "bg-gradient-to-r from-navy-600 to-blue-600 text-white shadow-lg"
                            : "bg-gradient-to-br from-white to-gray-50 text-gray-700 hover:bg-navy-50 border border-navy-100"
                        } text-sm sm:text-base`}
                      >
                        {item.title || item.year || `Calendar ${item.id}`}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ================= CALENDAR VIEWER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-12"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-navy-100 overflow-hidden">
            {/* Viewer Header */}
            <div className="p-4 sm:p-5 md:p-6 bg-gradient-to-r from-navy-50 to-blue-50 border-b border-navy-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="relative">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-navy-600 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center">
                      <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                      <Star className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-navy-800">
                      {selectedCalendar?.title || "Academic Calendar"}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base mt-1">
                      {selectedCalendar?.description || "School academic calendar"}
                    </p>
                  </div>
                </div>

                {/* Device Indicator and Download */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-br from-white to-gray-50 rounded-lg border border-navy-100">
                    {isMobile ? (
                      <Smartphone className="h-4 w-4 text-navy-600" />
                    ) : window.innerWidth < 1024 ? (
                      <Tablet className="h-4 w-4 text-navy-600" />
                    ) : (
                      <Monitor className="h-4 w-4 text-navy-600" />
                    )}
                    <span className="text-xs sm:text-sm font-medium text-navy-700">
                      {isMobile ? 'Mobile' : window.innerWidth < 1024 ? 'Tablet' : 'Desktop'} View
                    </span>
                  </div>
                  
                  {/* {selectedCalendar?.pdf && (
                    <button
                      onClick={handleDownload}
                      className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-navy-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 text-xs sm:text-sm"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </button>
                  )} */}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-4 sm:p-5 md:p-6">
              {/* Loading Indicator */}
              {isLoading && (
                <div className="flex justify-center mb-4">
                  <div className="flex flex-col items-center gap-3">
                    <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 border-b-2 border-navy-600"></div>
                    <p className="text-gray-600 text-sm sm:text-base">Loading calendar...</p>
                  </div>
                </div>
              )}

              {/* PDF Viewer */}
              <div className="w-full rounded-lg overflow-hidden shadow-lg border border-navy-200 bg-gray-100">
                {selectedCalendar?.pdf ? (
                  <>
                    {/* Mobile Warning */}
                    {isMobile && (
                      <div className="p-3 bg-gradient-to-r from-yellow-50 to-amber-50 border-b border-yellow-200">
                        <p className="text-center text-yellow-800 text-xs sm:text-sm">
                          For best experience, use the download button or open in new tab
                        </p>
                      </div>
                    )}

                    <div className="relative h-[70vh] sm:h-[80vh] w-full">
                      <iframe
                        src={getPdfUrl()}
                        title={`${selectedCalendar?.title || 'Academic Calendar'} ${selectedCalendar?.year || ''}`}
                        className="w-full h-full"
                        style={{ 
                          border: 'none',
                          width: '100%',
                          height: '100%',
                          minHeight: '500px'
                        }}
                        onLoad={handleIframeLoad}
                        allowFullScreen
                        loading="lazy"
                      />
                    </div>

                    {/* External Link for better viewing */}
                    <div className="p-3 bg-gray-50 border-t border-navy-100 flex justify-end">
                      <a
                        href={selectedCalendar.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-navy-600 hover:text-navy-700 text-sm font-medium"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span>Open in new tab</span>
                      </a>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-[60vh] sm:h-[70vh] flex flex-col items-center justify-center bg-gray-100 p-4">
                    <FileText className="h-16 w-16 sm:h-20 sm:w-20 text-gray-400 mb-4" />
                    <p className="text-gray-500 text-center text-sm sm:text-base">
                      No calendar available
                    </p>
                  </div>
                )}
              </div>

              {/* Viewer Info */}
              <div className="mt-4 flex items-center justify-between text-gray-600 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Vidya Prabodhini Prashala</span>
                </div>
                <div className="text-right">
                  <span>{selectedCalendar?.title || 'Academic Calendar'} {selectedCalendar?.year ? `- ${selectedCalendar.year}` : ''}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ================= CALENDAR INFO ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-12"
        >
          <div className="bg-gradient-to-br from-navy-50/80 to-blue-50/80 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-navy-100 p-4 sm:p-5 md:p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-navy-800 mb-3">
                  {aboutSection?.title || "About Academic Calendar"}
                </h3>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  {aboutSection?.content || "Our academic calendar includes important dates for examinations, holidays, parent-teacher meetings, cultural events, and other school activities. Regular updates ensure students and parents stay informed throughout the year."}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ================= BOTTOM DECORATIVE ELEMENT ================= */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 sm:gap-4 text-navy-600">
            <div className="w-6 h-px sm:w-8 md:w-12 bg-gradient-to-r from-transparent via-navy-400 to-transparent"></div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
              <span className="text-xs sm:text-sm font-medium">Plan Your Academic Year</span>
              <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
            </div>
            <div className="w-6 h-px sm:w-8 md:w-12 bg-gradient-to-r from-transparent via-navy-400 to-transparent"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AcademicCalendar;