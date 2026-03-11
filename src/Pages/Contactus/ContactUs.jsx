import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ExternalLink,
  Navigation,
  Globe,
  Building,
  Users,
  MessageSquare,
  Heart,
  Star,
  Sparkles,
  Cloud,
  Send,
  ChevronRight
} from "lucide-react";
import { contactUsData as defaultContactUsData } from "../../constant/Contactus/contactUsData";
import axiosInstance from "../../services/api"; // Update this import path based on your project structure

const ContactUs = () => {
  const [contactData, setContactData] = useState({
    contactUs: {
      id: "contact-us-section",
      header: {
        title: defaultContactUsData.header?.title || "Contact Us",
        description: defaultContactUsData.header?.description || "Get in touch with us. We're here to help and answer any questions you might have.",
        decorations: {
          dots: [
            { color: "bg-navy-500" },
            { color: "bg-navy-500" }
          ],
          lineColor: defaultContactUsData.header?.decorations?.lineColor || "from-navy-600 via-blue-600 to-navy-600"
        }
      },
      contactDetails: {
        title: defaultContactUsData.contactDetails?.title || "Contact Information",
        subtitle: defaultContactUsData.contactDetails?.subtitle || "Reach out to us through any of these channels",
        items: defaultContactUsData.contactDetails?.items || []
      },
      officeHours: {
        title: defaultContactUsData.officeHours?.title || "Office Hours",
        icon: defaultContactUsData.officeHours?.icon || "Clock",
        hours: defaultContactUsData.officeHours?.hours || [
          {
            days: "Monday - Friday",
            time: "8:00 AM - 4:00 PM",
            isOpen: true
          },
          {
            days: "Saturday",
            time: "9:00 AM - 1:00 PM",
            isOpen: true
          },
          {
            days: "Sunday",
            time: "Closed",
            isOpen: false
          }
        ]
      },
      cta: {
        text: defaultContactUsData.cta?.text || "Send us an Email",
        icon: defaultContactUsData.cta?.icon || "Send",
        hoverIcon: defaultContactUsData.cta?.hoverIcon || "ChevronRight"
      },
      map: {
        title: defaultContactUsData.map?.title || "Our Location",
        subtitle: defaultContactUsData.map?.subtitle || "Find us easily with directions",
        embedUrl: defaultContactUsData.map?.embedUrl || "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d432.0137821062885!2d73.75400732954571!3d20.008474559323567!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddeb85fab84bf9%3A0x5f2e809d4e352b3b!2sVidya%20Prabodhini%20Prashala%20(%20C.B.S.E%20)!5e1!3m2!1sen!2sin!4v1768134378635!5m2!1sen!2sin",
        addressDisplay: defaultContactUsData.map?.addressDisplay || {
          title: "Full School Address:",
          landmark: "Near School Premises"
        },
        actions: defaultContactUsData.map?.actions || {
          getDirections: {
            text: "Get Directions",
            icon: "Navigation"
          },
          openInMaps: {
            text: "Open in Maps",
            icon: "ExternalLink"
          }
        },
        loadingText: defaultContactUsData.map?.loadingText || "Loading map..."
      },
      footer: {
        text: defaultContactUsData.footer?.text || "We're Here to Help",
        decorations: {
          lineColor: defaultContactUsData.footer?.decorations?.lineColor || "from-transparent via-navy-400 to-transparent",
          icons: {
            left: defaultContactUsData.footer?.decorations?.icons?.left || "Star",
            right: defaultContactUsData.footer?.decorations?.icons?.right || "Star",
            color: defaultContactUsData.footer?.decorations?.icons?.color || "text-yellow-500"
          }
        }
      }
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    fetchContactUs();
  }, []);

  const fetchContactUs = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/contact-us');
      
      if (response.data.success) {
        const apiData = response.data.data;
        
        // Process the API data
        const processedData = {
          contactUs: {
            id: apiData.contactUs?.id || "contact-us-section",
            header: {
              title: apiData.contactUs?.header?.title || "Contact Us",
              description: apiData.contactUs?.header?.description || "Get in touch with us. We're here to help and answer any questions you might have.",
              decorations: {
                dots: apiData.contactUs?.header?.decorations?.dots || [
                  { color: "bg-navy-500" },
                  { color: "bg-navy-500" }
                ],
                lineColor: apiData.contactUs?.header?.decorations?.lineColor || "from-navy-600 via-blue-600 to-navy-600"
              }
            },
            contactDetails: {
              title: apiData.contactUs?.contactDetails?.title || "Contact Information",
              subtitle: apiData.contactUs?.contactDetails?.subtitle || "Reach out to us through any of these channels",
              items: apiData.contactUs?.contactDetails?.items?.length > 0 
                ? apiData.contactUs.contactDetails.items 
                : defaultContactUsData.contactDetails?.items || []
            },
            officeHours: {
              title: apiData.contactUs?.officeHours?.title || "Office Hours",
              icon: apiData.contactUs?.officeHours?.icon || "Clock",
              hours: apiData.contactUs?.officeHours?.hours?.length > 0 
                ? apiData.contactUs.officeHours.hours 
                : defaultContactUsData.officeHours?.hours || [
                    {
                      days: "Monday - Friday",
                      time: "8:00 AM - 4:00 PM",
                      isOpen: true
                    },
                    {
                      days: "Saturday",
                      time: "9:00 AM - 1:00 PM",
                      isOpen: true
                    },
                    {
                      days: "Sunday",
                      time: "Closed",
                      isOpen: false
                    }
                  ]
            },
            cta: {
              text: apiData.contactUs?.cta?.text || "Send us an Email",
              icon: apiData.contactUs?.cta?.icon || "Send",
              hoverIcon: apiData.contactUs?.cta?.hoverIcon || "ChevronRight"
            },
            map: {
              title: apiData.contactUs?.map?.title || "Our Location",
              subtitle: apiData.contactUs?.map?.subtitle || "Find us easily with directions",
              embedUrl: apiData.contactUs?.map?.embedUrl || "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d432.0137821062885!2d73.75400732954571!3d20.008474559323567!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddeb85fab84bf9%3A0x5f2e809d4e352b3b!2sVidya%20Prabodhini%20Prashala%20(%20C.B.S.E%20)!5e1!3m2!1sen!2sin!4v1768134378635!5m2!1sen!2sin",
              addressDisplay: apiData.contactUs?.map?.addressDisplay || {
                title: "Full School Address:",
                landmark: "Near School Premises"
              },
              actions: apiData.contactUs?.map?.actions || {
                getDirections: {
                  text: "Get Directions",
                  icon: "Navigation"
                },
                openInMaps: {
                  text: "Open in Maps",
                  icon: "ExternalLink"
                }
              },
              loadingText: apiData.contactUs?.map?.loadingText || "Loading map..."
            },
            footer: {
              text: apiData.contactUs?.footer?.text || "We're Here to Help",
              decorations: {
                lineColor: apiData.contactUs?.footer?.decorations?.lineColor || "from-transparent via-navy-400 to-transparent",
                icons: {
                  left: apiData.contactUs?.footer?.decorations?.icons?.left || "Star",
                  right: apiData.contactUs?.footer?.decorations?.icons?.right || "Star",
                  color: apiData.contactUs?.footer?.decorations?.icons?.color || "text-yellow-500"
                }
              }
            }
          }
        };
        
        setContactData(processedData);
        setError(null);
      }
    } catch (err) {
      console.error('Error fetching contact us:', err);
      setError('Failed to load contact information');
    } finally {
      setLoading(false);
    }
  };

  // Map icons to contact types
  const getIcon = (label) => {
    switch(label?.toLowerCase()) {
      case 'address':
        return <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 'phone':
        return <Phone className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 'email':
        return <Mail className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 'website':
        return <Globe className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 'working hours':
        return <Clock className="w-5 h-5 sm:w-6 sm:h-6" />;
      default:
        return <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />;
    }
  };

  const { header, contactDetails, officeHours, cta, map, footer } = contactData.contactUs;

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-navy-50/30 py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden flex items-center justify-center">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-navy-100/20 to-blue-100/10 rounded-full -translate-x-24 -translate-y-24"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-tl from-blue-100/10 to-navy-100/20 rounded-full translate-x-24 translate-y-24"></div>
        
        <div className="text-center relative z-10">
          <div className="w-16 h-16 border-4 border-navy-200 border-t-navy-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading contact information...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-navy-50/30 py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden flex items-center justify-center">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-navy-100/20 to-blue-100/10 rounded-full -translate-x-24 -translate-y-24"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-tl from-blue-100/10 to-navy-100/20 rounded-full translate-x-24 translate-y-24"></div>
        
        <div className="text-center relative z-10">
          <p className="text-red-600 text-xl mb-4">⚠️ {error}</p>
          <button 
            onClick={fetchContactUs}
            className="px-6 py-2 bg-gradient-to-r from-navy-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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
          <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-300" />
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
              {header?.title || "Contact Us"}
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
          
          <p className="text-gray-700 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-2 sm:px-4">
            {header?.description || "Get in touch with us. We're here to help and answer any questions you might have."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
          {/* ================= CONTACT DETAILS ================= */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-navy-100 overflow-hidden">
              {/* Header */}
              <div className="p-4 sm:p-5 md:p-6 bg-gradient-to-r from-navy-50 to-blue-50 border-b border-navy-100">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="relative">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-navy-600 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center">
                      <Building className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                      <Star className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-white" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-navy-800">
                      {contactDetails?.title || "Contact Information"}
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base mt-1">
                      {contactDetails?.subtitle || "Reach out to us through any of these channels"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Cards */}
              <div className="p-4 sm:p-5 md:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-6">
                  {contactDetails?.items?.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: (item.id * 0.1) || 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -3 }}
                      className="group bg-gradient-to-br from-white to-gray-50/80 rounded-xl border border-navy-100 p-4 sm:p-5 hover:shadow-lg hover:border-navy-200 transition-all duration-300 cursor-pointer"
                    >
                      <a
                        href={item.link}
                        target={item.target || (item.label === "Address" ? "_blank" : "_self")}
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-navy-50 to-blue-50 rounded-lg flex items-center justify-center group-hover:from-navy-100 group-hover:to-blue-100 transition-all border border-navy-100">
                            <div className="text-navy-600">
                              {getIcon(item.label)}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-navy-700 transition-colors">
                                {item.label}
                              </h3>
                              <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 text-navy-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            {item.label === "Address" ? (
                              <p className="text-gray-600 text-xs sm:text-sm group-hover:text-navy-600 transition-colors whitespace-pre-line leading-relaxed">
                                {item.value}
                              </p>
                            ) : (
                              <p className="text-gray-600 text-xs sm:text-sm group-hover:text-navy-600 transition-colors line-clamp-2">
                                {item.value}
                              </p>
                            )}
                          </div>
                        </div>
                      </a>
                    </motion.div>
                  ))}
                </div>

                {/* Contact Info Section */}
                <div className="bg-gradient-to-br from-navy-50/50 to-blue-50/50 rounded-xl border border-navy-100 p-4 sm:p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-navy-600 to-blue-600 rounded-lg flex items-center justify-center">
                      <Clock className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-navy-800">
                      {officeHours?.title || "Office Hours"}
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {officeHours?.hours?.map((hour, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-navy-100/50 last:border-0">
                        <span className="text-sm text-gray-700">{hour.days}</span>
                        <span className={`text-sm font-medium ${hour.isOpen ? 'text-navy-700' : 'text-red-500'}`}>
                          {hour.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <div className="mt-6">
                  <a
                    href={`mailto:${contactDetails?.items?.find(d => d.label === "Email")?.value || "contact@school.edu"}`}
                    className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-navy-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base group"
                  >
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                    {cta?.text || "Send us an Email"}
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ================= GOOGLE MAP ================= */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-navy-100 overflow-hidden h-full">
              {/* Header */}
              <div className="p-4 sm:p-5 md:p-6 bg-gradient-to-r from-navy-50 to-blue-50 border-b border-navy-100">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="relative">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-navy-600 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center">
                      <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                      <Star className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-white" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-navy-800">
                      {map?.title || "Our Location"}
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base mt-1">
                      {map?.subtitle || "Find us easily with directions"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Map Container */}
              <div className="p-4 sm:p-5 md:p-6">
                {/* Full Address Display */}
                <div className="mb-6 p-4 bg-gradient-to-br from-navy-50/50 to-blue-50/50 rounded-xl border border-navy-100">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-navy-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-navy-800 text-sm sm:text-base mb-2">
                        {map?.addressDisplay?.title || "Full School Address:"}
                      </h3>
                      <p className="text-gray-700 text-sm sm:text-base whitespace-pre-line leading-relaxed">
                        {contactDetails?.items?.find(d => d.label === "Address")?.value}
                      </p>
                      <p className="text-gray-500 text-xs sm:text-sm mt-3">
                        {map?.addressDisplay?.landmark?.replace("Near", "Landmark: Near") || 
                         `Landmark: Near ${contactDetails?.items?.find(d => d.label === "Address")?.value?.split(',')[0] || "School Premises"}`}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative rounded-xl overflow-hidden shadow-lg border border-navy-200 bg-gray-100 h-[400px] sm:h-[450px] md:h-[500px]">
                  {/* Map Loading State */}
                  {!mapLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-navy-50/50 z-10">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">{map?.loadingText || "Loading map..."}</p>
                      </div>
                    </div>
                  )}

                  <iframe
                    src={map?.embedUrl}
                    className="absolute inset-0 w-full h-full border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="School Location - Google Maps"
                    onLoad={() => setMapLoaded(true)}
                  />
                </div>

                {/* Map Actions */}
                <div className="mt-4 flex flex-col sm:flex-row gap-3">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(contactDetails?.items?.find(d => d.label === "Address")?.value || "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-navy-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base"
                  >
                    <Navigation className="w-4 h-4 sm:w-5 sm:h-5" />
                    {map?.actions?.getDirections?.text || "Get Directions"}
                  </a>
                  <a
                    href={map?.embedUrl?.replace("/embed", "")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 border-2 border-navy-600 text-navy-600 font-semibold rounded-lg hover:bg-navy-50 transition-all duration-300 text-sm sm:text-base"
                  >
                    <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                    {map?.actions?.openInMaps?.text || "Open in Maps"}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

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
              <span className="text-xs sm:text-sm font-medium">{footer?.text || "We're Here to Help"}</span>
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

export default ContactUs;


// import React from "react";
// import { motion } from "framer-motion";
// import { 
//   MapPin, 
//   Phone, 
//   Mail, 
//   Clock, 
//   ExternalLink,
//   Navigation,
//   Globe,
//   Building,
//   Users,
//   MessageSquare,
//   Heart,
//   Star,
//   Sparkles,
//   Cloud,
//   Send,
//   ChevronRight
// } from "lucide-react";
// import { contactUsData } from "../../constant/Contactus/contactUsData";

// const ContactUs = () => {
//   // Map icons to contact types
//   const getIcon = (label) => {
//     switch(label.toLowerCase()) {
//       case 'address':
//         return <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />;
//       case 'phone':
//         return <Phone className="w-5 h-5 sm:w-6 sm:h-6" />;
//       case 'email':
//         return <Mail className="w-5 h-5 sm:w-6 sm:h-6" />;
//       case 'website':
//         return <Globe className="w-5 h-5 sm:w-6 sm:h-6" />;
//       case 'working hours':
//         return <Clock className="w-5 h-5 sm:w-6 sm:h-6" />;
//       default:
//         return <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />;
//     }
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
//           <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-300" />
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto relative z-10">
//         {/* ================= HEADER ================= */}
//         <motion.div
//           className="text-center mb-8 sm:mb-12 md:mb-16"
//           initial={{ opacity: 0, y: -20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//         >
//           <div className="inline-flex items-center gap-3 mb-4">
//             <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-500"></div>
//             <h1 className="font-title text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gradient-navy">
//               Contact Us
//             </h1>
//             <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-500"></div>
//           </div>

//           <motion.div
//             className="h-1 sm:h-1.5 w-16 sm:w-20 md:w-24 bg-gradient-to-r from-navy-600 via-blue-600 to-navy-600 mx-auto mb-4 sm:mb-6 rounded-full"
//             initial={{ width: 0 }}
//             whileInView={{ width: "4rem" }}
//             transition={{ duration: 0.8, delay: 0.3 }}
//             viewport={{ once: true }}
//           />
          
//           <p className="text-gray-700 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-2 sm:px-4">
//             Get in touch with us. We're here to help and answer any questions you might have.
//           </p>

          
//         </motion.div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
//           {/* ================= CONTACT DETAILS ================= */}
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//           >
//             <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-navy-100 overflow-hidden">
//               {/* Header */}
//               <div className="p-4 sm:p-5 md:p-6 bg-gradient-to-r from-navy-50 to-blue-50 border-b border-navy-100">
//                 <div className="flex items-center gap-3 sm:gap-4">
//                   <div className="relative">
//                     <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-navy-600 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center">
//                       <Building className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
//                     </div>
//                     <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
//                       <Star className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-white" />
//                     </div>
//                   </div>
//                   <div>
//                     <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-navy-800">
//                       Contact Information
//                     </h2>
//                     <p className="text-gray-600 text-sm sm:text-base mt-1">
//                       Reach out to us through any of these channels
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Contact Cards */}
//               <div className="p-4 sm:p-5 md:p-6">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-6">
//                   {contactUsData.details.map((item) => (
//                     <motion.div
//                       key={item.id}
//                       initial={{ opacity: 0, y: 20 }}
//                       whileInView={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.4, delay: item.id * 0.1 }}
//                       viewport={{ once: true }}
//                       whileHover={{ y: -3 }}
//                       className="group bg-gradient-to-br from-white to-gray-50/80 rounded-xl border border-navy-100 p-4 sm:p-5 hover:shadow-lg hover:border-navy-200 transition-all duration-300 cursor-pointer"
//                     >
//                       <a
//                         href={item.link}
//                         target={item.label === "Address" ? "_blank" : "_self"}
//                         rel="noopener noreferrer"
//                         className="block"
//                       >
//                         <div className="flex items-start gap-3 sm:gap-4">
//                           <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-navy-50 to-blue-50 rounded-lg flex items-center justify-center group-hover:from-navy-100 group-hover:to-blue-100 transition-all border border-navy-100">
//                             <div className="text-navy-600">
//                               {getIcon(item.label)}
//                             </div>
//                           </div>
//                           <div className="flex-1 min-w-0">
//                             <div className="flex items-center gap-2 mb-1">
//                               <h3 className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-navy-700 transition-colors">
//                                 {item.label}
//                               </h3>
//                               <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 text-navy-400 opacity-0 group-hover:opacity-100 transition-opacity" />
//                             </div>
//                             {item.label === "Address" ? (
//                               <p className="text-gray-600 text-xs sm:text-sm group-hover:text-navy-600 transition-colors whitespace-pre-line leading-relaxed">
//                                 {item.value}
//                               </p>
//                             ) : (
//                               <p className="text-gray-600 text-xs sm:text-sm group-hover:text-navy-600 transition-colors line-clamp-2">
//                                 {item.value}
//                               </p>
//                             )}
//                           </div>
//                         </div>
//                       </a>
//                     </motion.div>
//                   ))}
//                 </div>

//                 {/* Contact Info Section */}
//                 <div className="bg-gradient-to-br from-navy-50/50 to-blue-50/50 rounded-xl border border-navy-100 p-4 sm:p-5">
//                   <div className="flex items-center gap-3 mb-3">
//                     <div className="w-8 h-8 bg-gradient-to-br from-navy-600 to-blue-600 rounded-lg flex items-center justify-center">
//                       <Clock className="w-4 h-4 text-white" />
//                     </div>
//                     <h3 className="text-base sm:text-lg font-semibold text-navy-800">
//                       Office Hours
//                     </h3>
//                   </div>
//                   <div className="space-y-2">
//                     <div className="flex justify-between items-center py-2 border-b border-navy-100/50">
//                       <span className="text-sm text-gray-700">Monday - Friday</span>
//                       <span className="text-sm font-medium text-navy-700">8:00 AM - 4:00 PM</span>
//                     </div>
//                     <div className="flex justify-between items-center py-2 border-b border-navy-100/50">
//                       <span className="text-sm text-gray-700">Saturday</span>
//                       <span className="text-sm font-medium text-navy-700">9:00 AM - 1:00 PM</span>
//                     </div>
//                     <div className="flex justify-between items-center py-2">
//                       <span className="text-sm text-gray-700">Sunday</span>
//                       <span className="text-sm font-medium text-navy-700">Closed</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* CTA Button */}
//                 <div className="mt-6">
//                   <a
//                     href={`mailto:${contactUsData.details.find(d => d.label === "Email")?.value || "contact@school.edu"}`}
//                     className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-navy-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base group"
//                   >
//                     <Send className="w-4 h-4 sm:w-5 sm:h-5" />
//                     Send us an Email
//                     <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </motion.div>

//           {/* ================= GOOGLE MAP ================= */}
//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//           >
//             <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-navy-100 overflow-hidden h-full">
//               {/* Header */}
//               <div className="p-4 sm:p-5 md:p-6 bg-gradient-to-r from-navy-50 to-blue-50 border-b border-navy-100">
//                 <div className="flex items-center gap-3 sm:gap-4">
//                   <div className="relative">
//                     <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-navy-600 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center">
//                       <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
//                     </div>
//                     <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
//                       <Star className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-white" />
//                     </div>
//                   </div>
//                   <div>
//                     <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-navy-800">
//                       Our Location
//                     </h2>
//                     <p className="text-gray-600 text-sm sm:text-base mt-1">
//                       Find us easily with directions
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Map Container */}
//               <div className="p-4 sm:p-5 md:p-6">
//                 {/* Full Address Display */}
//                 <div className="mb-6 p-4 bg-gradient-to-br from-navy-50/50 to-blue-50/50 rounded-xl border border-navy-100">
//                   <div className="flex items-start gap-3">
//                     <MapPin className="w-5 h-5 text-navy-600 flex-shrink-0 mt-0.5" />
//                     <div className="flex-1">
//                       <h3 className="font-semibold text-navy-800 text-sm sm:text-base mb-2">
//                         Full School Address:
//                       </h3>
//                       <p className="text-gray-700 text-sm sm:text-base whitespace-pre-line leading-relaxed">
//                         {contactUsData.details.find(d => d.label === "Address")?.value}
//                       </p>
//                       <p className="text-gray-500 text-xs sm:text-sm mt-3">
//                         Landmark: Near {contactUsData.details.find(d => d.label === "Address")?.value?.split(',')[0] || "School Premises"}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="relative rounded-xl overflow-hidden shadow-lg border border-navy-200 bg-gray-100 h-[400px] sm:h-[450px] md:h-[500px]">
//                   {/* Map Loading State */}
//                   <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-navy-50/50">
//                     <div className="text-center">
//                       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-600 mx-auto mb-4"></div>
//                       <p className="text-gray-600">Loading map...</p>
//                     </div>
//                   </div>

//                   <iframe
//                     src={contactUsData.mapEmbedUrl}
//                     className="absolute inset-0 w-full h-full border-0"
//                     allowFullScreen
//                     loading="lazy"
//                     referrerPolicy="no-referrer-when-downgrade"
//                     title="School Location - Google Maps"
//                   />
//                 </div>

//                 {/* Map Actions */}
//                 <div className="mt-4 flex flex-col sm:flex-row gap-3">
//                   <a
//                     href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(contactUsData.details.find(d => d.label === "Address")?.value || "")}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-navy-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base"
//                   >
//                     <Navigation className="w-4 h-4 sm:w-5 sm:h-5" />
//                     Get Directions
//                   </a>
//                   <a
//                     href={contactUsData.mapEmbedUrl.replace("/embed", "")}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 border-2 border-navy-600 text-navy-600 font-semibold rounded-lg hover:bg-navy-50 transition-all duration-300 text-sm sm:text-base"
//                   >
//                     <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
//                     Open in Maps
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </div>

        

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
//               <span className="text-xs sm:text-sm font-medium">We're Here to Help</span>
//               <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
//             </div>
//             <div className="w-6 h-px sm:w-8 md:w-12 bg-gradient-to-r from-transparent via-navy-400 to-transparent"></div>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default ContactUs;