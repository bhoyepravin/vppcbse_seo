// // components/Admission/AdmissionProcess.jsx
// components/Admission/AdmissionProcess.jsx
import React, { useState, useEffect } from "react";
import {
  FileText,
  Calendar,
  UserCheck,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  ChevronRight,
  Headphones,
  School,
  MessageCircleQuestion,
  X,
  AlertCircle,
  ExternalLink,
  Download,
  Clock,
  Star,
  Sparkles,
  Cloud,
  Sun,
  Heart,
  ChevronLeft,
} from "lucide-react";
import { admissionProcessData as defaultAdmissionProcessData } from "../../constant/Admission/admissionProcessData";
import { motion } from "framer-motion";
import axiosInstance from "../../services/api"; // Update this import path based on your project structure

const AdmissionProcess = () => {
  const [admissionData, setAdmissionData] = useState({
    admissionProcess: {
      id: "admission-process-section",
      header: {
        title: defaultAdmissionProcessData.title || "Admission Process",
        subtitle: defaultAdmissionProcessData.subtitle || "Simple Step-by-Step Journey",
        description: defaultAdmissionProcessData.description || "Your choice of your child's educational institution is one of the most important decisions of your life. We understand that finding the right school assures you of your child's development and future. Our simple step-by-step process helps us to learn about each other and set expectations to prepare your child for a better tomorrow.",
        welcomeMessage: defaultAdmissionProcessData.welcomeMessage || "You are welcome.",
        decorations: {
          dots: [
            { color: "bg-navy-500" },
            { color: "bg-navy-500" }
          ],
          lineColor: defaultAdmissionProcessData.lineColor || "from-navy-600 via-blue-600 to-navy-600"
        }
      },
      horizontalSteps: defaultAdmissionProcessData.horizontalSteps || [
        {
          title: "Apply Through\\nEnquiry Form",
          description: "Start your journey by filling our online enquiry form",
          icon: "file-text"
        },
        {
          title: "Connect With\\nAdmin Office",
          description: "Get personalized guidance from our admin team",
          icon: "headphones"
        }
      ],
      ageCriteria: {
        title: defaultAdmissionProcessData.ageCriteria?.title || "Minimum Age Criteria for Admission",
        academicYear: defaultAdmissionProcessData.ageCriteria?.academicYear || "2026-2027",
        admissionStatus: defaultAdmissionProcessData.ageCriteria?.admissionStatus || "OPEN",
        classes: defaultAdmissionProcessData.ageCriteria?.classes || [],
        note: defaultAdmissionProcessData.ageCriteria?.note || "Age criteria is calculated as of 31st March of the admission year. For classes beyond Grade 1, age requirement increases by 1 year per grade."
      },
      admissionOpen: {
        academicYear: defaultAdmissionProcessData.admissionOpen?.academicYear || "2026-2027",
        status: defaultAdmissionProcessData.admissionOpen?.status || "OPEN",
        buttonText: defaultAdmissionProcessData.admissionOpen?.buttonText || "Admission Open for Academic Year 2026-27",
        notificationText: defaultAdmissionProcessData.admissionOpen?.notificationText || "Admissions are now open for the academic year 2026-2027. Limited seats available. Apply now to secure your child's future.",
        applyLink: defaultAdmissionProcessData.admissionOpen?.applyLink || "/admissionform",
        enquiryLink: defaultAdmissionProcessData.admissionOpen?.enquiryLink || "/enquiry",
        notificationPopup: defaultAdmissionProcessData.admissionOpen?.notificationPopup || {
          title: null,
          applyButton: null,
          enquireButton: null,
          seatsMessage: null
        }
      },
      quickActions: defaultAdmissionProcessData.quickActions || [],
      cta: {
        buttonText: defaultAdmissionProcessData.cta?.buttonText || "Check Admission Status",
        buttonIcon: defaultAdmissionProcessData.cta?.buttonIcon || "CheckCircle",
        description: defaultAdmissionProcessData.cta?.description || "Click to see current admission availability and important dates"
      },
      footer: {
        text: defaultAdmissionProcessData.footer?.text || "Begin Your Educational Journey",
        decorations: {
          lineColor: defaultAdmissionProcessData.footer?.decorations?.lineColor || "from-transparent via-navy-400 to-transparent",
          icons: {
            left: defaultAdmissionProcessData.footer?.decorations?.icons?.left || "Star",
            right: defaultAdmissionProcessData.footer?.decorations?.icons?.right || "Star",
            color: defaultAdmissionProcessData.footer?.decorations?.icons?.color || "text-yellow-500"
          }
        }
      }
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    fetchAdmissionProcess();
  }, []);

  const fetchAdmissionProcess = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/admission-process');
      
      if (response.data.success) {
        const apiData = response.data.data;
        
        // Process the API data
        const processedData = {
          admissionProcess: {
            id: apiData.admissionProcess?.id || "admission-process-section",
            header: {
              title: apiData.admissionProcess?.header?.title || "Admission Process",
              subtitle: apiData.admissionProcess?.header?.subtitle || "Simple Step-by-Step Journey",
              description: apiData.admissionProcess?.header?.description || "Your choice of your child's educational institution is one of the most important decisions of your life. We understand that finding the right school assures you of your child's development and future. Our simple step-by-step process helps us to learn about each other and set expectations to prepare your child for a better tomorrow.",
              welcomeMessage: apiData.admissionProcess?.header?.welcomeMessage || "You are welcome.",
              decorations: {
                dots: apiData.admissionProcess?.header?.decorations?.dots || [
                  { color: "bg-navy-500" },
                  { color: "bg-navy-500" }
                ],
                lineColor: apiData.admissionProcess?.header?.decorations?.lineColor || "from-navy-600 via-blue-600 to-navy-600"
              }
            },
            horizontalSteps: apiData.admissionProcess?.horizontalSteps?.length > 0 
              ? apiData.admissionProcess.horizontalSteps 
              : defaultAdmissionProcessData.horizontalSteps || [
                  {
                    title: "Apply Through\\nEnquiry Form",
                    description: "Start your journey by filling our online enquiry form",
                    icon: "file-text"
                  },
                  {
                    title: "Connect With\\nAdmin Office",
                    description: "Get personalized guidance from our admin team",
                    icon: "headphones"
                  }
                ],
            ageCriteria: {
              title: apiData.admissionProcess?.ageCriteria?.title || "Minimum Age Criteria for Admission",
              academicYear: apiData.admissionProcess?.ageCriteria?.academicYear || "2026-2027",
              admissionStatus: apiData.admissionProcess?.ageCriteria?.admissionStatus || "OPEN",
              classes: apiData.admissionProcess?.ageCriteria?.classes?.length > 0 
                ? apiData.admissionProcess.ageCriteria.classes 
                : defaultAdmissionProcessData.ageCriteria?.classes || [],
              note: apiData.admissionProcess?.ageCriteria?.note || "Age criteria is calculated as of 31st March of the admission year. For classes beyond Grade 1, age requirement increases by 1 year per grade."
            },
            admissionOpen: {
              academicYear: apiData.admissionProcess?.admissionOpen?.academicYear || "2026-2027",
              status: apiData.admissionProcess?.admissionOpen?.status || "OPEN",
              buttonText: apiData.admissionProcess?.admissionOpen?.buttonText || "Admission Open for Academic Year 2026-27",
              notificationText: apiData.admissionProcess?.admissionOpen?.notificationText || "Admissions are now open for the academic year 2026-2027. Limited seats available. Apply now to secure your child's future.",
              applyLink: apiData.admissionProcess?.admissionOpen?.applyLink || "/admissionform",
              enquiryLink: apiData.admissionProcess?.admissionOpen?.enquiryLink || "/enquiry",
              notificationPopup: apiData.admissionProcess?.admissionOpen?.notificationPopup || {
                title: null,
                applyButton: null,
                enquireButton: null,
                seatsMessage: null
              }
            },
            quickActions: apiData.admissionProcess?.quickActions?.length > 0 
              ? apiData.admissionProcess.quickActions 
              : defaultAdmissionProcessData.quickActions || [],
            cta: {
              buttonText: apiData.admissionProcess?.cta?.buttonText || "Check Admission Status",
              buttonIcon: apiData.admissionProcess?.cta?.buttonIcon || "CheckCircle",
              description: apiData.admissionProcess?.cta?.description || "Click to see current admission availability and important dates"
            },
            footer: {
              text: apiData.admissionProcess?.footer?.text || "Begin Your Educational Journey",
              decorations: {
                lineColor: apiData.admissionProcess?.footer?.decorations?.lineColor || "from-transparent via-navy-400 to-transparent",
                icons: {
                  left: apiData.admissionProcess?.footer?.decorations?.icons?.left || "Star",
                  right: apiData.admissionProcess?.footer?.decorations?.icons?.right || "Star",
                  color: apiData.admissionProcess?.footer?.decorations?.icons?.color || "text-yellow-500"
                }
              }
            }
          }
        };
        
        setAdmissionData(processedData);
        setError(null);
      }
    } catch (err) {
      console.error('Error fetching admission process:', err);
      setError('Failed to load admission information');
    } finally {
      setLoading(false);
    }
  };

  const { header, horizontalSteps, ageCriteria, admissionOpen, cta, footer } = admissionData.admissionProcess;

  const iconMap = {
    phone: <Phone className="h-5 w-5 sm:h-6 sm:w-6" />,
    "user-check": <UserCheck className="h-5 w-5 sm:h-6 sm:w-6" />,
    "file-text": <FileText className="h-5 w-5 sm:h-6 sm:w-6" />,
    "check-circle": <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6" />,
    calendar: <Calendar className="h-5 w-5 sm:h-6 sm:w-6" />,
    mail: <Mail className="h-5 w-5 sm:h-6 sm:w-6" />,
    "map-pin": <MapPin className="h-5 w-5 sm:h-6 sm:w-6" />,
    headphones: <Headphones className="h-5 w-5 sm:h-6 sm:w-6" />,
    school: <School className="h-5 w-5 sm:h-6 sm:w-6" />,
    "message-circle-question": <MessageCircleQuestion className="h-5 w-5 sm:h-6 sm:w-6" />,
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => 
      (prev + 1) % horizontalSteps.length
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      (prev - 1 + horizontalSteps.length) % horizontalSteps.length
    );
  };

  // Auto slide for mobile
  useEffect(() => {
    if (window.innerWidth < 768 && horizontalSteps.length > 0) {
      const interval = setInterval(() => {
        nextSlide();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [currentSlide, horizontalSteps.length]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-navy-50/30 py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-navy-100/20 to-blue-100/10 rounded-full -translate-x-24 -translate-y-24"></div>
        {/* <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-tl from-blue-100/10 to-navy-100/20 rounded-full translate-x-24 translate-y-24"></div> */}
        
        <div className="text-center relative z-10">
          <div className="w-16 h-16 border-4 border-navy-200 border-t-navy-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading admission process...</p>
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
            onClick={fetchAdmissionProcess}
            className="px-6 py-2 bg-gradient-to-r from-navy-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Notification Pop-up Component
  const NotificationPopup = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl max-w-md w-full border border-navy-100"
      >
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                  <Star className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-white" />
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-navy-800">
                Admissions Open
              </h3>
            </div>
            <button
              onClick={() => setShowNotification(false)}
              className="text-gray-500 hover:text-gray-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mb-4 sm:mb-6">
            <p className="text-gray-700 text-sm sm:text-base mb-4">
              {admissionOpen.notificationText}
            </p>
            <div className="bg-gradient-to-br from-blue-50 to-navy-50 border border-blue-100 rounded-lg p-3 sm:p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                <span className="font-semibold text-blue-800 text-sm sm:text-base">
                  Academic Year: {admissionOpen.academicYear}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                <span className="text-blue-700 text-xs sm:text-sm">
                  Limited seats available. Apply early to avoid disappointment.
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={admissionOpen.applyLink}
              className="flex-1 bg-gradient-to-r from-navy-600 to-blue-600 text-white font-semibold py-2 sm:py-3 px-4 rounded-lg hover:shadow-lg transition-all duration-300 text-center flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
              Apply Now
            </a>
            <a
              href={admissionOpen.enquiryLink}
              className="flex-1 border-2 border-navy-600 text-navy-600 font-semibold py-2 sm:py-3 px-4 rounded-lg hover:bg-navy-50 transition-all duration-300 text-center flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <MessageCircleQuestion className="w-4 h-4 sm:w-5 sm:h-5" />
              Enquire Now
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );

  return (
    <>
      {/* Notification Pop-up */}
      {showNotification && <NotificationPopup />}

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
              <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${header?.decorations?.dots?.[0]?.color || 'bg-navy-500'}`}></div>
              <h1 className="font-title text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gradient-navy">
                {header?.title || "Admission Process"}
              </h1>
              <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${header?.decorations?.dots?.[1]?.color || 'bg-navy-500'}`}></div>
            </div>

            <motion.div
              className={`h-1 sm:h-1.5 w-16 sm:w-20 md:w-24 bg-gradient-to-r ${header?.decorations?.lineColor || 'from-navy-600 via-blue-600 to-navy-600'} mx-auto mb-4 sm:mb-6 rounded-full`}
              initial={{ width: 0 }}
              whileInView={{ width: "4rem" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            />
            
            <p className="text-gray-700 max-w-3xl mx-auto text-sm sm:text-base md:text-lg px-2 sm:px-4 mb-4">
              {header?.description || "Your choice of your child's educational institution is one of the most important decisions of your life. We understand that finding the right school assures you of your child's development and future. Our simple step-by-step process helps us to learn about each other and set expectations to prepare your child for a better tomorrow."}
            </p>
            <p className="text-navy-700 font-semibold text-base sm:text-lg md:text-xl">
              {header?.welcomeMessage || "You are welcome."}
            </p>
          </motion.div>

          {/* ================= HORIZONTAL PROCEDURE ================= */}
          {horizontalSteps.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              // className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-navy-100 py-6 sm:py-8 md:py-10 px-4 sm:px-6 md:px-8 mb-8 sm:mb-12"
            >
              {/* Header */}
              <div className="text-center mb-6 sm:mb-8">
                <div className="inline-flex items-center gap-3 mb-4">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-500"></div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-navy-800">
                    Admission Procedure
                  </h3>
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-500"></div>
                </div>
                
                <div className="flex items-center justify-center gap-1 sm:gap-1.5 mb-4">
                  <div className="h-1 w-6 sm:w-8 bg-navy-500 rounded-full"></div>
                  <div className="h-1 w-3 sm:w-4 bg-blue-500 rounded-full"></div>
                  <div className="h-1 w-2 sm:w-2 bg-navy-400 rounded-full"></div>
                </div>
              </div>

              {/* Desktop View */}
              <div className="hidden md:flex justify-between items-center">
                {horizontalSteps.map((step, index) => (
                  <React.Fragment key={step.id || index}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex flex-col items-center text-center w-32"
                    >
                      <div className="relative mb-3">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-navy-50 to-blue-50 border-2 border-navy-100 rounded-lg sm:rounded-xl flex items-center justify-center group hover:from-navy-100 hover:to-blue-100 hover:scale-110 transition-all duration-300">
                          {iconMap[step.icon]}
                        </div>
                        <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                          <Star className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-white" />
                        </div>
                      </div>
                      <p className="text-sm font-semibold text-navy-800 whitespace-pre-line leading-tight mb-1">
                        {step.title}
                      </p>
                      <p className="text-xs text-gray-600 mt-2 hidden lg:block">
                        {step.description}
                      </p>
                      <div className="text-xs text-navy-500 font-medium mt-2">
                        Step {index + 1}
                      </div>
                    </motion.div>

                    {index !== horizontalSteps.length - 1 && (
                      <div className="flex-1 h-0.5 bg-gradient-to-r from-navy-200 via-blue-200 to-navy-200 mx-4"></div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Tablet View */}
              <div className="hidden sm:block md:hidden">
                <div className="grid grid-cols-3 gap-6">
                  {horizontalSteps.slice(0, 3).map((step, index) => (
                    <div key={step.id || index} className="flex flex-col items-center text-center">
                      <div className="relative mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-navy-50 to-blue-50 border-2 border-navy-100 rounded-lg flex items-center justify-center">
                          {iconMap[step.icon]}
                        </div>
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                          <Star className="w-1.5 h-1.5 text-white" />
                        </div>
                      </div>
                      <p className="text-xs font-semibold text-navy-800 whitespace-pre-line leading-tight">
                        {step.title}
                      </p>
                      <div className="text-xs text-navy-500 font-medium mt-1">
                        Step {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile Slider View */}
              <div className="sm:hidden">
                <div className="relative overflow-hidden rounded-xl">
                  {/* Slider Container */}
                  <div
                    className="flex transition-transform duration-300 ease-in-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {horizontalSteps.map((step, index) => (
                      <div key={step.id || index} className="w-full flex-shrink-0 px-2">
                        <div className="bg-white/90 rounded-xl border border-navy-100 p-4 text-center">
                          <div className="relative mb-3 mx-auto w-14 h-14">
                            <div className="w-full h-full bg-gradient-to-br from-navy-50 to-blue-50 border-2 border-navy-100 rounded-lg flex items-center justify-center">
                              {iconMap[step.icon]}
                            </div>
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                              <Star className="w-1.5 h-1.5 text-white" />
                            </div>
                          </div>
                          <p className="text-sm font-semibold text-navy-800 mb-1">
                            {step.title}
                          </p>
                          <p className="text-xs text-gray-600 mb-2">
                            {step.description}
                          </p>
                          <div className="text-xs text-navy-500 font-medium">
                            Step {index + 1} of {horizontalSteps.length}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Slider Navigation */}
                  <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={prevSlide}
                      className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-navy-600 to-blue-600 text-white shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>

                    {/* Dots Indicator */}
                    <div className="flex gap-1.5">
                      {horizontalSteps.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentSlide(index)}
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                            index === currentSlide
                              ? "bg-gradient-to-r from-navy-600 to-blue-600 w-4"
                              : "bg-navy-300"
                          }`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={nextSlide}
                      className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-navy-600 to-blue-600 text-white shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ================= MINIMUM AGE CRITERIA ================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-navy-100 p-4 sm:p-6 md:p-8 mb-8 sm:mb-12"
          >
            <div className="text-center mb-6 sm:mb-8">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-500"></div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-navy-800">
                  {ageCriteria?.title || "Minimum Age Criteria for Admission"}
                </h3>
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-500"></div>
              </div>
              
              <div className="flex items-center justify-center gap-1 sm:gap-1.5 mb-4">
                <div className="h-1 w-6 sm:w-8 bg-navy-500 rounded-full"></div>
                <div className="h-1 w-3 sm:w-4 bg-blue-500 rounded-full"></div>
                <div className="h-1 w-2 sm:w-2 bg-navy-400 rounded-full"></div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
              {ageCriteria?.classes?.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-white to-white/90 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-navy-100 p-3 sm:p-4 text-center group hover:-translate-y-1"
                >
                  <h4 className="text-base sm:text-lg font-bold text-navy-800 mb-2 group-hover:text-navy-700 transition-colors">
                    {item.className}
                  </h4>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy-600 mb-2 group-hover:text-blue-600 transition-colors">
                    {item.age}
                  </div>
                  <p className="text-xs text-gray-600">{item.asOfDate}</p>
                  
                  {/* Decorative element */}
                  <div className="flex justify-center mt-3">
                    <div className="w-6 h-0.5 bg-gradient-to-r from-transparent via-navy-300 to-transparent"></div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Note Section */}
            <div className="mt-6 sm:mt-8 p-4 bg-gradient-to-br from-navy-50/30 to-blue-50/30 rounded-lg border border-navy-100">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-gradient-to-br from-navy-100 to-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 text-navy-600" />
                </div>
                <p className="text-xs sm:text-sm text-gray-600">
                  <span className="font-semibold text-navy-700">Note:</span> {ageCriteria?.note || "Age criteria is calculated as of 31st March of the admission year. For classes beyond Grade 1, age requirement increases by 1 year per grade."}
                </p>
              </div>
            </div>
          </motion.div>

          {/* ================= QUICK ACTIONS ================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12"
          >
            {[
              {
                title: "Apply Online",
                description: "Start your admission application",
                icon: <FileText className="w-6 h-6 sm:w-7 sm:h-7 text-navy-600" />,
                href: admissionOpen?.applyLink || "/admissionform",
                color: "from-navy-50 to-blue-50",
                hoverColor: "from-navy-100 to-blue-100"
              },
              {
                title: "Download Forms",
                description: "Prospectus & admission forms",
                icon: <Download className="w-6 h-6 sm:w-7 sm:h-7 text-navy-600" />,
                href: admissionOpen?.applyLink || "/admissionform",
                color: "from-blue-50 to-navy-50",
                hoverColor: "from-blue-100 to-navy-100"
              },
              {
                title: "Contact Us",
                description: "Talk to admission counselor",
                icon: <Headphones className="w-6 h-6 sm:w-7 sm:h-7 text-navy-600" />,
                href: admissionOpen?.enquiryLink || "/contact-us",
                color: "from-navy-50 to-blue-50",
                hoverColor: "from-navy-100 to-blue-100"
              }
            ].map((action, index) => (
              <motion.a
                key={index}
                href={action.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className={`bg-gradient-to-br ${action.color} backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-navy-100 p-4 sm:p-6 text-center group hover:${action.hoverColor}`}
              >
                <div className="relative mb-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto bg-gradient-to-br from-navy-100 to-blue-100 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:from-navy-200 group-hover:to-blue-200 group-hover:scale-110 transition-all duration-300">
                    {action.icon}
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                    <Star className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-white" />
                  </div>
                </div>
                <h4 className="font-bold text-navy-800 text-base sm:text-lg mb-2 group-hover:text-navy-700 transition-colors">
                  {action.title}
                </h4>
                <p className="text-sm text-gray-600">
                  {action.description}
                </p>
              </motion.a>
            ))}
          </motion.div>

          {/* ================= CTA SECTION ================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-8 sm:mt-12"
          >
            <button
              onClick={() => setShowNotification(true)}
              className="group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-navy-600 to-blue-600 text-white rounded-lg sm:rounded-xl font-semibold hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2 sm:gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1 mx-auto"
            >
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="text-sm sm:text-base md:text-lg">{cta?.buttonText || "Check Admission Status"}</span>
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-gray-600 text-xs sm:text-sm mt-3">
              {cta?.description || "Click to see current admission availability and important dates"}
            </p>
          </motion.div>

          {/* ================= Bottom decorative element ================= */}
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
                <span className="text-xs sm:text-sm font-medium">{footer?.text || "Begin Your Educational Journey"}</span>
                {footer?.decorations?.icons?.right === "Star" && (
                  <Star className={`w-3 h-3 sm:w-4 sm:h-4 ${footer?.decorations?.icons?.color || 'text-yellow-500'}`} />
                )}
              </div>
              <div className={`w-6 h-px sm:w-8 md:w-12 bg-gradient-to-r ${footer?.decorations?.lineColor || 'from-transparent via-navy-400 to-transparent'}`}></div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default AdmissionProcess;

// import React, { useState, useEffect } from "react";
// import {
//   FileText,
//   Calendar,
//   UserCheck,
//   Phone,
//   Mail,
//   MapPin,
//   CheckCircle,
//   ChevronRight,
//   Headphones,
//   School,
//   MessageCircleQuestion,
//   X,
//   AlertCircle,
//   ExternalLink,
//   Download,
//   Clock,
//   Star,
//   Sparkles,
//   Cloud,
//   Sun,
//   Heart,
//   ChevronLeft,
// } from "lucide-react";
// import { admissionProcessData } from "../../constant/Admission/admissionProcessData";
// import { motion } from "framer-motion";

// const AdmissionProcess = () => {
//   const [showNotification, setShowNotification] = useState(false);
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const iconMap = {
//     phone: <Phone className="h-5 w-5 sm:h-6 sm:w-6" />,
//     "user-check": <UserCheck className="h-5 w-5 sm:h-6 sm:w-6" />,
//     "file-text": <FileText className="h-5 w-5 sm:h-6 sm:w-6" />,
//     "check-circle": <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6" />,
//     calendar: <Calendar className="h-5 w-5 sm:h-6 sm:w-6" />,
//     mail: <Mail className="h-5 w-5 sm:h-6 sm:w-6" />,
//     "map-pin": <MapPin className="h-5 w-5 sm:h-6 sm:w-6" />,
//     headphones: <Headphones className="h-5 w-5 sm:h-6 sm:w-6" />,
//     school: <School className="h-5 w-5 sm:h-6 sm:w-6" />,
//     "message-circle-question": <MessageCircleQuestion className="h-5 w-5 sm:h-6 sm:w-6" />,
//   };

//   const nextSlide = () => {
//     setCurrentSlide((prev) => 
//       (prev + 1) % admissionProcessData.horizontalSteps.length
//     );
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => 
//       (prev - 1 + admissionProcessData.horizontalSteps.length) % admissionProcessData.horizontalSteps.length
//     );
//   };

//   // Auto slide for mobile
//   useEffect(() => {
//     if (window.innerWidth < 768) {
//       const interval = setInterval(() => {
//         nextSlide();
//       }, 5000);
//       return () => clearInterval(interval);
//     }
//   }, [currentSlide]);

//   // Notification Pop-up Component
//   const NotificationPopup = () => (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl max-w-md w-full border border-navy-100"
//       >
//         <div className="p-4 sm:p-6">
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center gap-3">
//               <div className="relative">
//                 <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg sm:rounded-xl flex items-center justify-center">
//                   <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
//                 </div>
//                 <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
//                   <Star className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-white" />
//                 </div>
//               </div>
//               <h3 className="text-lg sm:text-xl font-bold text-navy-800">
//                 Admissions Open
//               </h3>
//             </div>
//             <button
//               onClick={() => setShowNotification(false)}
//               className="text-gray-500 hover:text-gray-700 p-1"
//             >
//               <X className="w-5 h-5" />
//             </button>
//           </div>

//           <div className="mb-4 sm:mb-6">
//             <p className="text-gray-700 text-sm sm:text-base mb-4">
//               {admissionProcessData.admissionOpen.notificationText}
//             </p>
//             <div className="bg-gradient-to-br from-blue-50 to-navy-50 border border-blue-100 rounded-lg p-3 sm:p-4">
//               <div className="flex items-center gap-2 mb-2">
//                 <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
//                 <span className="font-semibold text-blue-800 text-sm sm:text-base">
//                   Academic Year: {admissionProcessData.admissionOpen.academicYear}
//                 </span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
//                 <span className="text-blue-700 text-xs sm:text-sm">
//                   Limited seats available. Apply early to avoid disappointment.
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="flex flex-col sm:flex-row gap-3">
//             <a
//               href={admissionProcessData.admissionOpen.applyLink}
//               className="flex-1 bg-gradient-to-r from-navy-600 to-blue-600 text-white font-semibold py-2 sm:py-3 px-4 rounded-lg hover:shadow-lg transition-all duration-300 text-center flex items-center justify-center gap-2 text-sm sm:text-base"
//             >
//               <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
//               Apply Now
//             </a>
//             <a
//               href={admissionProcessData.admissionOpen.enquiryLink}
//               className="flex-1 border-2 border-navy-600 text-navy-600 font-semibold py-2 sm:py-3 px-4 rounded-lg hover:bg-navy-50 transition-all duration-300 text-center flex items-center justify-center gap-2 text-sm sm:text-base"
//             >
//               <MessageCircleQuestion className="w-4 h-4 sm:w-5 sm:h-5" />
//               Enquire Now
//             </a>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );

//   return (
//     <>
//       {/* Notification Pop-up */}
//       {showNotification && <NotificationPopup />}

//       <div className="min-h-screen bg-gradient-to-b from-white to-navy-50/30 py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
//         {/* Background decorative elements */}
//         <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-navy-100/20 to-blue-100/10 rounded-full -translate-x-24 -translate-y-24"></div>
//         <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-tl from-blue-100/10 to-navy-100/20 rounded-full translate-x-24 translate-y-24"></div>

//         {/* Creative decorative elements */}
//         <div className="absolute inset-0 pointer-events-none">
//           <div className="absolute top-10 left-5 sm:top-20 sm:left-10 opacity-20 animate-bounce">
//             <Cloud className="w-8 h-8 sm:w-10 sm:h-10 text-navy-400" />
//           </div>
//           <div className="absolute top-20 right-8 sm:top-32 sm:right-16 opacity-20 animate-pulse">
//             <Sun className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-400" />
//           </div>
//           <div className="absolute bottom-20 left-10 sm:bottom-32 sm:left-20 opacity-20 animate-bounce">
//             <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-pink-400" />
//           </div>
//         </div>

//         <div className="max-w-7xl mx-auto relative z-10">
//           {/* ================= HEADER ================= */}
//           <motion.div
//             className="text-center mb-8 sm:mb-12 md:mb-16"
//             initial={{ opacity: 0, y: -20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             viewport={{ once: true }}
//           >
//             <div className="inline-flex items-center gap-3 mb-4">
//               <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-500"></div>
//               <h1 className="font-title text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gradient-navy">
//                 {admissionProcessData.title}
//               </h1>
//               <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-500"></div>
//             </div>

//             <motion.div
//               className="h-1 sm:h-1.5 w-16 sm:w-20 md:w-24 bg-gradient-to-r from-navy-600 via-blue-600 to-navy-600 mx-auto mb-4 sm:mb-6 rounded-full"
//               initial={{ width: 0 }}
//               whileInView={{ width: "4rem" }}
//               transition={{ duration: 0.8, delay: 0.3 }}
//               viewport={{ once: true }}
//             />
            
//             <p className="text-gray-700 max-w-3xl mx-auto text-sm sm:text-base md:text-lg px-2 sm:px-4 mb-4">
//               {admissionProcessData.description}
//             </p>
//             <p className="text-navy-700 font-semibold text-base sm:text-lg md:text-xl">
//               {admissionProcessData.welcomeMessage}
//             </p>
//           </motion.div>

//           {/* ================= HORIZONTAL PROCEDURE ================= */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//             className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-navy-100 py-6 sm:py-8 md:py-10 px-4 sm:px-6 md:px-8 mb-8 sm:mb-12"
//           >
//             {/* Header */}
//             <div className="text-center mb-6 sm:mb-8">
//               <div className="inline-flex items-center gap-3 mb-4">
//                 <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-500"></div>
//                 <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-navy-800">
//                   Admission Procedure
//                 </h3>
//                 <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-500"></div>
//               </div>
              
//               <div className="flex items-center justify-center gap-1 sm:gap-1.5 mb-4">
//                 <div className="h-1 w-6 sm:w-8 bg-navy-500 rounded-full"></div>
//                 <div className="h-1 w-3 sm:w-4 bg-blue-500 rounded-full"></div>
//                 <div className="h-1 w-2 sm:w-2 bg-navy-400 rounded-full"></div>
//               </div>
//             </div>

//             {/* Desktop View */}
//             <div className="hidden md:flex justify-between items-center">
//               {admissionProcessData.horizontalSteps.map((step, index) => (
//                 <React.Fragment key={step.id}>
//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     transition={{ delay: index * 0.1 }}
//                     viewport={{ once: true }}
//                     className="flex flex-col items-center text-center w-32"
//                   >
//                     <div className="relative mb-3">
//                       <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-navy-50 to-blue-50 border-2 border-navy-100 rounded-lg sm:rounded-xl flex items-center justify-center group hover:from-navy-100 hover:to-blue-100 hover:scale-110 transition-all duration-300">
//                         {iconMap[step.icon]}
//                       </div>
//                       <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
//                         <Star className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-white" />
//                       </div>
//                     </div>
//                     <p className="text-sm font-semibold text-navy-800 whitespace-pre-line leading-tight mb-1">
//                       {step.title}
//                     </p>
//                     <p className="text-xs text-gray-600 mt-2 hidden lg:block">
//                       {step.description}
//                     </p>
//                     <div className="text-xs text-navy-500 font-medium mt-2">
//                       Step {index + 1}
//                     </div>
//                   </motion.div>

//                   {index !== admissionProcessData.horizontalSteps.length - 1 && (
//                     <div className="flex-1 h-0.5 bg-gradient-to-r from-navy-200 via-blue-200 to-navy-200 mx-4"></div>
//                   )}
//                 </React.Fragment>
//               ))}
//             </div>

//             {/* Tablet View */}
//             <div className="hidden sm:block md:hidden">
//               <div className="grid grid-cols-3 gap-6">
//                 {admissionProcessData.horizontalSteps.slice(0, 3).map((step, index) => (
//                   <div key={step.id} className="flex flex-col items-center text-center">
//                     <div className="relative mb-3">
//                       <div className="w-12 h-12 bg-gradient-to-br from-navy-50 to-blue-50 border-2 border-navy-100 rounded-lg flex items-center justify-center">
//                         {iconMap[step.icon]}
//                       </div>
//                       <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
//                         <Star className="w-1.5 h-1.5 text-white" />
//                       </div>
//                     </div>
//                     <p className="text-xs font-semibold text-navy-800 whitespace-pre-line leading-tight">
//                       {step.title}
//                     </p>
//                     <div className="text-xs text-navy-500 font-medium mt-1">
//                       Step {index + 1}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Mobile Slider View */}
//             <div className="sm:hidden">
//               <div className="relative overflow-hidden rounded-xl">
//                 {/* Slider Container */}
//                 <div
//                   className="flex transition-transform duration-300 ease-in-out"
//                   style={{ transform: `translateX(-${currentSlide * 100}%)` }}
//                 >
//                   {admissionProcessData.horizontalSteps.map((step, index) => (
//                     <div key={step.id} className="w-full flex-shrink-0 px-2">
//                       <div className="bg-white/90 rounded-xl border border-navy-100 p-4 text-center">
//                         <div className="relative mb-3 mx-auto w-14 h-14">
//                           <div className="w-full h-full bg-gradient-to-br from-navy-50 to-blue-50 border-2 border-navy-100 rounded-lg flex items-center justify-center">
//                             {iconMap[step.icon]}
//                           </div>
//                           <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
//                             <Star className="w-1.5 h-1.5 text-white" />
//                           </div>
//                         </div>
//                         <p className="text-sm font-semibold text-navy-800 mb-1">
//                           {step.title}
//                         </p>
//                         <p className="text-xs text-gray-600 mb-2">
//                           {step.description}
//                         </p>
//                         <div className="text-xs text-navy-500 font-medium">
//                           Step {index + 1} of {admissionProcessData.horizontalSteps.length}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Slider Navigation */}
//                 <div className="flex justify-between items-center mt-4">
//                   <button
//                     onClick={prevSlide}
//                     className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-navy-600 to-blue-600 text-white shadow-md hover:shadow-lg transition-all duration-300"
//                   >
//                     <ChevronLeft className="h-4 w-4" />
//                   </button>

//                   {/* Dots Indicator */}
//                   <div className="flex gap-1.5">
//                     {admissionProcessData.horizontalSteps.map((_, index) => (
//                       <button
//                         key={index}
//                         onClick={() => setCurrentSlide(index)}
//                         className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
//                           index === currentSlide
//                             ? "bg-gradient-to-r from-navy-600 to-blue-600 w-4"
//                             : "bg-navy-300"
//                         }`}
//                       />
//                     ))}
//                   </div>

//                   <button
//                     onClick={nextSlide}
//                     className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-navy-600 to-blue-600 text-white shadow-md hover:shadow-lg transition-all duration-300"
//                   >
//                     <ChevronRight className="h-4 w-4" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </motion.div>

//           {/* ================= MINIMUM AGE CRITERIA ================= */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//             className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-navy-100 p-4 sm:p-6 md:p-8 mb-8 sm:mb-12"
//           >
//             <div className="text-center mb-6 sm:mb-8">
//               <div className="inline-flex items-center gap-3 mb-4">
//                 <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-500"></div>
//                 <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-navy-800">
//                   {admissionProcessData.ageCriteria.title}
//                 </h3>
//                 <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-500"></div>
//               </div>
              
//               <div className="flex items-center justify-center gap-1 sm:gap-1.5 mb-4">
//                 <div className="h-1 w-6 sm:w-8 bg-navy-500 rounded-full"></div>
//                 <div className="h-1 w-3 sm:w-4 bg-blue-500 rounded-full"></div>
//                 <div className="h-1 w-2 sm:w-2 bg-navy-400 rounded-full"></div>
//               </div>
//             </div>

//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
//               {admissionProcessData.ageCriteria.classes.map((item) => (
//                 <motion.div
//                   key={item.id}
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   whileInView={{ opacity: 1, scale: 1 }}
//                   transition={{ duration: 0.3 }}
//                   viewport={{ once: true }}
//                   className="bg-gradient-to-br from-white to-white/90 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-navy-100 p-3 sm:p-4 text-center group hover:-translate-y-1"
//                 >
//                   <h4 className="text-base sm:text-lg font-bold text-navy-800 mb-2 group-hover:text-navy-700 transition-colors">
//                     {item.className}
//                   </h4>
//                   <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy-600 mb-2 group-hover:text-blue-600 transition-colors">
//                     {item.age}
//                   </div>
//                   <p className="text-xs text-gray-600">{item.asOfDate}</p>
                  
//                   {/* Decorative element */}
//                   <div className="flex justify-center mt-3">
//                     <div className="w-6 h-0.5 bg-gradient-to-r from-transparent via-navy-300 to-transparent"></div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>

//             {/* Note Section */}
//             <div className="mt-6 sm:mt-8 p-4 bg-gradient-to-br from-navy-50/30 to-blue-50/30 rounded-lg border border-navy-100">
//               <div className="flex items-start gap-3">
//                 <div className="w-6 h-6 bg-gradient-to-br from-navy-100 to-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
//                   <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 text-navy-600" />
//                 </div>
//                 <p className="text-xs sm:text-sm text-gray-600">
//                   <span className="font-semibold text-navy-700">Note:</span> Age criteria is calculated as of 31st
//                   March of the admission year. For classes beyond Grade 1, age
//                   requirement increases by 1 year per grade.
//                 </p>
//               </div>
//             </div>
//           </motion.div>

//           {/* ================= QUICK ACTIONS ================= */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//             className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12"
//           >
//             {[
//               {
//                 title: "Apply Online",
//                 description: "Start your admission application",
//                 icon: <FileText className="w-6 h-6 sm:w-7 sm:h-7 text-navy-600" />,
//                 href: "/admissionform",
//                 color: "from-navy-50 to-blue-50",
//                 hoverColor: "from-navy-100 to-blue-100"
//               },
//               {
//                 title: "Download Forms",
//                 description: "Prospectus & admission forms",
//                 icon: <Download className="w-6 h-6 sm:w-7 sm:h-7 text-navy-600" />,
//                 href: "/admissionform",
//                 color: "from-blue-50 to-navy-50",
//                 hoverColor: "from-blue-100 to-navy-100"
//               },
//               {
//                 title: "Contact Us",
//                 description: "Talk to admission counselor",
//                 icon: <Headphones className="w-6 h-6 sm:w-7 sm:h-7 text-navy-600" />,
//                 href: "/contact-us",
//                 color: "from-navy-50 to-blue-50",
//                 hoverColor: "from-navy-100 to-blue-100"
//               }
//             ].map((action, index) => (
//               <motion.a
//                 key={index}
//                 href={action.href}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//                 viewport={{ once: true }}
//                 whileHover={{ y: -5 }}
//                 className={`bg-gradient-to-br ${action.color} backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-navy-100 p-4 sm:p-6 text-center group hover:${action.hoverColor}`}
//               >
//                 <div className="relative mb-4">
//                   <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto bg-gradient-to-br from-navy-100 to-blue-100 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:from-navy-200 group-hover:to-blue-200 group-hover:scale-110 transition-all duration-300">
//                     {action.icon}
//                   </div>
//                   <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
//                     <Star className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-white" />
//                   </div>
//                 </div>
//                 <h4 className="font-bold text-navy-800 text-base sm:text-lg mb-2 group-hover:text-navy-700 transition-colors">
//                   {action.title}
//                 </h4>
//                 <p className="text-sm text-gray-600">
//                   {action.description}
//                 </p>
//               </motion.a>
//             ))}
//           </motion.div>

//           {/* ================= CTA SECTION ================= */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//             className="text-center mt-8 sm:mt-12"
//           >
//             <button
//               onClick={() => setShowNotification(true)}
//               className="group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-navy-600 to-blue-600 text-white rounded-lg sm:rounded-xl font-semibold hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2 sm:gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1 mx-auto"
//             >
//               <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />
//               <span className="text-sm sm:text-base md:text-lg">Check Admission Status</span>
//               <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
//             </button>
//             <p className="text-gray-600 text-xs sm:text-sm mt-3">
//               Click to see current admission availability and important dates
//             </p>
//           </motion.div>

//           {/* ================= Bottom decorative element ================= */}
//           <motion.div
//             className="flex justify-center mt-8 sm:mt-12"
//             initial={{ opacity: 0, scale: 0 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.6, delay: 0.5 }}
//             viewport={{ once: true }}
//           >
//             <div className="flex items-center gap-3 sm:gap-4 text-navy-600">
//               <div className="w-6 h-px sm:w-8 md:w-12 bg-gradient-to-r from-transparent via-navy-400 to-transparent"></div>
//               <div className="flex items-center gap-1.5 sm:gap-2">
//                 <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
//                 <span className="text-xs sm:text-sm font-medium">Begin Your Educational Journey</span>
//                 <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
//               </div>
//               <div className="w-6 h-px sm:w-8 md:w-12 bg-gradient-to-r from-transparent via-navy-400 to-transparent"></div>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdmissionProcess;  