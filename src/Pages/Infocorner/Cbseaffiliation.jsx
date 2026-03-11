import React, { useState, useEffect } from "react";
import cbseAffiliationData from "../../constant/Infocorner/CbseAffiliationData";
import {
  FileText,
  Download,
  Calendar,
  Shield,
  Flame,
  School,
  CheckCircle,
  Star,
  Sparkles,
  Cloud,
  Sun,
  Heart,
  BookOpen,
  Award,
  Clock,
  ExternalLink,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import axiosInstance from "../../services/api";

const Cbseaffiliation = () => {
  const [apiData, setApiData] = useState({
    cbseAffiliation: {
      id: "cbse-affiliation-section",
      header: {
        title: cbseAffiliationData.header?.title || "CBSE Affiliation Documents",
        description: cbseAffiliationData.header?.description || "Official certificates and documents related to our CBSE affiliation"
      },
      documents: cbseAffiliationData.documents || []
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPdf, setSelectedPdf] = useState(null);

  useEffect(() => {
    fetchCbseAffiliation();
  }, []);

  const fetchCbseAffiliation = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/cbse-affiliation');
      
      if (response.data.success) {
        const apiResponse = response.data.data;
        
        // Process the API data - fix PDF URLs
        const processedData = {
          cbseAffiliation: {
            id: apiResponse.cbseAffiliation?.id || "cbse-affiliation-section",
            header: {
              title: apiResponse.cbseAffiliation?.header?.title || "CBSE Affiliation Documents",
              description: apiResponse.cbseAffiliation?.header?.description || "Official certificates and documents related to our CBSE affiliation"
            },
            documents: apiResponse.cbseAffiliation?.documents?.length > 0 
              ? apiResponse.cbseAffiliation.documents.map(doc => ({
                  ...doc,
                  pdfFile: doc.pdfFile?.replace(/\\\//g, '/') || doc.pdfFile,
                  type: doc.type || "affiliation",
                  description: doc.description || "",
                  isMandatory: doc.isMandatory || false,
                  displayOrder: doc.displayOrder || doc.id,
                  createdAt: doc.createdAt || new Date().toISOString()
                }))
              : cbseAffiliationData.documents || []
          }
        };
        
        setApiData(processedData);
        setError(null);
      }
    } catch (err) {
      console.error('Error fetching CBSE affiliation:', err);
      setError('Failed to load CBSE affiliation documents');
    } finally {
      setLoading(false);
    }
  };

  const { header, documents } = apiData.cbseAffiliation;

  const getIcon = (id) => {
    const idNum = typeof id === 'string' ? parseInt(id) || 1 : id;
    switch (idNum) {
      case 1:
        return <FileText className="h-5 w-5 sm:h-6 sm:w-6" />;
      case 2:
        return <Flame className="h-5 w-5 sm:h-6 sm:w-6" />;
      case 3:
        return <Shield className="h-5 w-5 sm:h-6 sm:w-6" />;
      default:
        return <BookOpen className="h-5 w-5 sm:h-6 sm:w-6" />;
    }
  };

  const getColorClasses = (id) => {
    const idNum = typeof id === 'string' ? parseInt(id) || 1 : id;
    switch (idNum) {
      case 1:
        return {
          bg: "bg-green-50",
          text: "text-green-600",
          badge: "bg-green-100 text-green-800",
          iconBg: "from-green-50 to-emerald-50",
        };
      case 2:
        return {
          bg: "bg-red-50",
          text: "text-red-600",
          badge: "bg-red-100 text-red-800",
          iconBg: "from-red-50 to-rose-50",
        };
      default:
        return {
          bg: "bg-purple-50",
          text: "text-purple-600",
          badge: "bg-purple-100 text-purple-800",
          iconBg: "from-purple-50 to-indigo-50",
        };
    }
  };

  const handleViewPdf = (pdfFile, title) => {
    setSelectedPdf({ url: pdfFile, title });
  };

  const closePdfViewer = () => {
    setSelectedPdf(null);
  };

  const getPdfUrl = (url) => {
    if (!url) return '';
    const params = '#toolbar=0';
    return `${url}${params}`;
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
          <p className="text-gray-600">Loading CBSE affiliation documents...</p>
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
            onClick={fetchCbseAffiliation}
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
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* ================= HEADING ================= */}
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-500"></div>
            <h1 className="font-title text-xl sm:text-2xl md:text-3xl font-bold text-gradient-navy">
              {header?.title || "CBSE Affiliation"}
            </h1>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-500"></div>
          </div>

          <motion.div
            className="h-1 sm:h-1.5 w-16 sm:w-20 bg-gradient-to-r from-navy-600 via-blue-600 to-navy-600 mx-auto mb-4 sm:mb-6 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: "4rem" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          />
          
          {header?.description && (
            <p className="text-gray-700 max-w-2xl mx-auto text-sm sm:text-base px-2 sm:px-4">
              {header.description}
            </p>
          )}
        </motion.div>

        {/* ================= CBSE AFFILIATION LIST ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {documents.length > 0 ? (
            documents.map((certificate) => {
              const colors = getColorClasses(certificate.id);

              return (
                <motion.div
                  key={certificate.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="flex flex-col bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-navy-100 overflow-hidden group"
                >
                  {/* Certificate Header with Icon */}
                  <div className={`p-4 sm:p-5 bg-gradient-to-r ${colors.iconBg} border-b border-navy-100`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="relative">
                          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center ${colors.bg}`}>
                            {getIcon(certificate.id)}
                          </div>
                          <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                            <Star className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-white" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base sm:text-lg font-bold text-navy-800 truncate">
                            {certificate.title}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Type Badge */}
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors.badge}`}>
                        {certificate.type}
                      </span>
                    </div>
                  </div>

                  {/* Certificate Details - Minimal */}
                  <div className="p-4 sm:p-5 flex-grow">
                    {/* Description */}
                    {certificate.description && (
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        {certificate.description}
                      </p>
                    )}
                  </div>

                  {/* Action Section - PDF View Only */}
                  <div className="p-4 sm:p-5 pt-0">
                    <div className="flex justify-center gap-3 pt-4 border-t border-navy-100">
                      <button
                        onClick={() => handleViewPdf(certificate.pdfFile, certificate.title)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-navy-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-sm group/download"
                      >
                        <Download className="w-4 h-4" />
                        <span>View PDF</span>
                      </button>
                    </div>
                  </div>

                  {/* Hover Effect Decoration */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-navy-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-12 bg-white/80 backdrop-blur-sm rounded-xl border border-navy-100">
              <div className="w-16 h-16 bg-navy-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-navy-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700">No documents available</h3>
              <p className="text-gray-500 text-sm mt-2">Check back later for updated documents</p>
            </div>
          )}
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
            <div className="w-6 h-px sm:w-8 bg-gradient-to-r from-transparent via-navy-400 to-transparent"></div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
              <span className="text-xs sm:text-sm font-medium">Official Documents</span>
              <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
            </div>
            <div className="w-6 h-px sm:w-8 bg-gradient-to-r from-transparent via-navy-400 to-transparent"></div>
          </div>
        </motion.div>
      </div>

      {/* ================= PDF VIEWER MODAL ================= */}
      {selectedPdf && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-6xl h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-navy-50 to-blue-50 border-b border-navy-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-navy-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <FileText className="h-4 w-4 text-white" />
                </div>
                <h3 className="text-lg font-bold text-navy-800">
                  {selectedPdf.title}
                </h3>
              </div>
              <button
                onClick={closePdfViewer}
                className="p-2 hover:bg-navy-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-navy-600" />
              </button>
            </div>

            {/* PDF Viewer */}
            <div className="relative h-[calc(90vh-4rem)] w-full">
              <iframe
                src={getPdfUrl(selectedPdf.url)}
                title={selectedPdf.title}
                className="w-full h-full"
                style={{ 
                  border: 'none',
                  width: '100%',
                  height: '100%'
                }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Cbseaffiliation;