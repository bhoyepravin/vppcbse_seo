import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import certificatesData from "../../constant/Disclosure/CertificatesData";
import { 
  FileText, 
  Eye, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Download,
  ExternalLink,
  Calendar,
  Clock,
  BookOpen,
  Star,
  Sparkles,
  Cloud,
  Heart,
  Search,
  Filter,
  Info,
  Shield,
  Lock,
  CheckCircle,
  ZoomIn,
  ZoomOut
} from "lucide-react";
import axiosInstance from "../../services/api";

const Disclosure = () => {
  const [certificateData, setCertificateData] = useState({
    certificates: {
      id: "certificates-section",
      header: {
        title: certificatesData.header?.title || "Certificates & Documents",
        description: certificatesData.header?.description || "Access and explore all official school certificates, affiliations, and important documents",
        decorations: {
          dots: certificatesData.header?.decorations?.dots || [
            { color: "bg-navy-500" },
            { color: "bg-navy-500" }
          ],
          lineColor: certificatesData.header?.decorations?.lineColor || "from-navy-600 via-blue-600 to-navy-600"
        }
      },
      quickStats: certificatesData.quickStats || [
        {
          icon: "FileText",
          label: "Documents",
          value: 7,
          color: "text-navy-600"
        },
        {
          icon: "Shield",
          label: "Official & Verified",
          value: "Verified",
          color: "text-navy-600"
        },
        {
          icon: "Clock",
          label: "Updated Regularly",
          value: "Updated",
          color: "text-navy-600"
        }
      ],
      documents: certificatesData.documents || [],
      categories: certificatesData.categories || [
        "safety",
        "affiliation",
        "health",
        "legal",
        "infrastructure"
      ],
      searchPlaceholder: certificatesData.searchPlaceholder || "Search documents by name, category, or description...",
      filterOptions: certificatesData.filterOptions || {
        all: "All Categories",
        safety: "Safety",
        affiliation: "Affiliation",
        health: "Health",
        legal: "Legal",
        infrastructure: "Infrastructure"
      },
      footer: {
        text: certificatesData.footer?.text || "Official School Documents",
        decorations: {
          lineColor: certificatesData.footer?.decorations?.lineColor || "from-transparent via-navy-400 to-transparent",
          icons: {
            left: certificatesData.footer?.decorations?.icons?.left || "Star",
            right: certificatesData.footer?.decorations?.icons?.right || "Star",
            color: certificatesData.footer?.decorations?.icons?.color || "text-yellow-500"
          }
        }
      }
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [currentDocIndex, setCurrentDocIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/certificates');
      
      if (response.data.success) {
        const apiData = response.data.data;
        
        // Process the API data - fix file URLs
        const processedData = {
          certificates: {
            id: apiData.certificates?.id || "certificates-section",
            header: {
              title: apiData.certificates?.header?.title || "Certificates & Documents",
              description: apiData.certificates?.header?.description || "Access and explore all official school certificates, affiliations, and important documents",
              decorations: {
                dots: apiData.certificates?.header?.decorations?.dots || [
                  { color: "bg-navy-500" },
                  { color: "bg-navy-500" }
                ],
                lineColor: apiData.certificates?.header?.decorations?.lineColor || "from-navy-600 via-blue-600 to-navy-600"
              }
            },
            quickStats: apiData.certificates?.quickStats?.length > 0 
              ? apiData.certificates.quickStats 
              : certificateData.certificates.quickStats,
            documents: apiData.certificates?.documents?.length > 0 
              ? apiData.certificates.documents.map(doc => ({
                  ...doc,
                  file: doc.file?.replace(/\\\//g, '/') || doc.file,
                  // Add default values for UI compatibility
                  verified: true,
                  downloadable: true,
                  category: doc.category || getCategoryFromName(doc.name)
                }))
              : certificateData.certificates.documents,
            categories: apiData.certificates?.categories?.length > 0 
              ? apiData.certificates.categories 
              : certificateData.certificates.categories,
            searchPlaceholder: apiData.certificates?.searchPlaceholder || certificateData.certificates.searchPlaceholder,
            filterOptions: apiData.certificates?.filterOptions || certificateData.certificates.filterOptions,
            footer: {
              text: apiData.certificates?.footer?.text || "Official School Documents",
              decorations: {
                lineColor: apiData.certificates?.footer?.decorations?.lineColor || "from-transparent via-navy-400 to-transparent",
                icons: {
                  left: apiData.certificates?.footer?.decorations?.icons?.left || "Star",
                  right: apiData.certificates?.footer?.decorations?.icons?.right || "Star",
                  color: apiData.certificates?.footer?.decorations?.icons?.color || "text-yellow-500"
                }
              }
            }
          }
        };
        
        setCertificateData(processedData);
        setError(null);
      }
    } catch (err) {
      console.error('Error fetching certificates:', err);
      setError('Failed to load certificates');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to guess category from document name
  const getCategoryFromName = (name) => {
    const nameLower = name.toLowerCase();
    if (nameLower.includes('safety')) return 'safety';
    if (nameLower.includes('affiliation')) return 'affiliation';
    if (nameLower.includes('hygiene') || nameLower.includes('water') || nameLower.includes('health')) return 'health';
    if (nameLower.includes('noc') || nameLower.includes('proprietary')) return 'legal';
    if (nameLower.includes('building') || nameLower.includes('infrastructure')) return 'infrastructure';
    return 'other';
  };

  // Detect mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleDocumentClick = (item, index) => {
    setSelectedDocument(item);
    setCurrentDocIndex(index);
    setZoomLevel(1);
    setIsLoading(true);
  };

  const closeDocumentViewer = () => {
    setSelectedDocument(null);
    setZoomLevel(1);
  };

  const nextDocument = () => {
    if (currentDocIndex < certificateData.certificates.documents.length - 1) {
      const newIndex = currentDocIndex + 1;
      setCurrentDocIndex(newIndex);
      setSelectedDocument(certificateData.certificates.documents[newIndex]);
      setZoomLevel(1);
      setIsLoading(true);
    }
  };

  const prevDocument = () => {
    if (currentDocIndex > 0) {
      const newIndex = currentDocIndex - 1;
      setCurrentDocIndex(newIndex);
      setSelectedDocument(certificateData.certificates.documents[newIndex]);
      setZoomLevel(1);
      setIsLoading(true);
    }
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(3, prev + 0.25));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(0.5, prev - 0.25));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  // Filter and search documents
  const filteredDocuments = certificateData.certificates.documents.filter(item => {
    const matchesSearch = searchTerm === "" || 
      (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.category && item.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = filterCategory === "all" || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = ["all", ...new Set(certificateData.certificates.documents.map(item => item.category).filter(Boolean))];

  // Updated PDF URL with more parameters to hide toolbar and controls
  const getPdfUrl = (fileUrl) => {
    if (!fileUrl) return '';
    // Add multiple parameters to hide as much as possible
    const params = '#toolbar=0&navpanes=0&scrollbar=0&view=FitH&zoom=100';
    return `${fileUrl}${params}`;
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
    
    // Additional attempt to hide PDF controls using iframe content manipulation
    try {
      const iframe = document.querySelector('iframe[title="' + selectedDocument?.name + '"]');
      if (iframe) {
        // Inject CSS into iframe to hide controls (works for same-origin PDFs)
        const style = document.createElement('style');
        style.innerHTML = `
          #toolbarContainer, #sidebarContainer, .toolbar, .navpanels, 
          .pdfViewer .toolbar, .verticalToolbarContainer, .findbar,
          .secondaryToolbar, .overlayContainer, .dialog {
            display: none !important;
          }
          .pdfViewer .page {
            margin: 0 auto !important;
          }
        `;
        
        if (iframe.contentDocument) {
          iframe.contentDocument.head.appendChild(style);
        }
      }
    } catch (e) {
      // Cross-origin errors will be caught silently
      console.log('Cannot modify iframe content due to cross-origin policy');
    }
  };

  const { header, quickStats, documents, searchPlaceholder, filterOptions, footer } = certificateData.certificates;

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-navy-50/30 py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-navy-100/20 to-blue-100/10 rounded-full -translate-x-24 -translate-y-24"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-tl from-blue-100/10 to-navy-100/20 rounded-full translate-x-24 translate-y-24"></div>
        
        <div className="text-center relative z-10">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-navy-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading certificates...</p>
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
        <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-tl from-blue-100/10 to-navy-100/20 rounded-full translate-x-24 translate-y-24"></div>
        
        <div className="text-center relative z-10">
          <p className="text-red-600 text-xl mb-4">⚠️ {error}</p>
          <button 
            onClick={fetchCertificates}
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
          <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-blue-300" />
        </div>
        <div className="absolute top-1/2 right-10 opacity-10">
          <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-blue-300" />
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
              {header?.title || "Certificates & Documents"}
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
            {header?.description || "Access and explore all official school certificates, affiliations, and important documents"}
          </p>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-6"
          >
            {quickStats?.map((stat, index) => (
              <div key={index} className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-gradient-to-br from-navy-50 to-blue-50 rounded-full border border-navy-100">
                {stat.icon === "FileText" && <FileText className={`h-3 w-3 sm:h-4 sm:w-4 ${stat.color || 'text-navy-600'}`} />}
                {stat.icon === "Shield" && <Shield className={`h-3 w-3 sm:h-4 sm:w-4 ${stat.color || 'text-navy-600'}`} />}
                {stat.icon === "Clock" && <Clock className={`h-3 w-3 sm:h-4 sm:w-4 ${stat.color || 'text-navy-600'}`} />}
                <span className="text-xs sm:text-sm font-medium text-navy-700">
                  {stat.value} {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
        {/* ================= DOCUMENTS GRID ================= */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-12"
        >
          {filteredDocuments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredDocuments.map((item, index) => (
                <motion.div
                  key={item.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="group bg-gradient-to-br from-white to-white/90 rounded-xl shadow-lg hover:shadow-2xl border border-navy-100/50 backdrop-blur-sm overflow-hidden cursor-pointer transition-all duration-300"
                  onClick={() => handleDocumentClick(item, index)}
                >
                  <div className="p-4 sm:p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-10 h-10 bg-gradient-to-br from-navy-50 to-blue-50 rounded-lg flex items-center justify-center border border-navy-100">
                            <FileText className="w-5 h-5 text-navy-600" />
                          </div>
                          {item.verified && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center border border-white">
                              <CheckCircle className="w-2.5 h-2.5 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="max-w-[calc(100%-4rem)]">
                          <h3 className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-1">
                            {item.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            {item.category && (
                              <span className="text-xs px-2 py-0.5 bg-gradient-to-r from-navy-50 to-blue-50 text-navy-700 rounded-full border border-navy-100">
                                {item.category}
                              </span>
                            )}
                            {item.date && (
                              <span className="text-xs text-gray-500">
                                {item.date}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-navy-50 to-blue-50 p-2 rounded-lg border border-navy-100 group-hover:bg-gradient-to-br group-hover:from-navy-100 group-hover:to-blue-100 transition-all">
                        <Eye className="w-4 h-4 text-navy-600" />
                      </div>
                    </div>
                    
                    {item.description && (
                      <p className="text-gray-600 text-xs sm:text-sm mb-4 line-clamp-2">
                        {item.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-2">
                        <Lock className="w-3 h-3 text-navy-500" />
                        <span className="text-navy-600">Secure Document</span>
                      </div>
                      <span className="font-medium text-navy-700">ID: {item.id}</span>
                    </div>
                  </div>
                  
                  <div className="px-4 sm:px-6 py-3 bg-gradient-to-r from-gray-50/80 to-white/80 border-t border-navy-100">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600 font-medium">
                        Click to view
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gradient-to-br from-white to-navy-50/50 rounded-2xl border border-navy-100 shadow-sm">
              <div className="w-16 h-16 bg-gradient-to-br from-navy-50 to-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-navy-100">
                <FileText className="w-8 h-8 text-navy-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                No documents found
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Try adjusting your search or filter criteria to find what you're looking for
              </p>
            </div>
          )}
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
            <div className={`w-6 h-px sm:w-8 md:w-12 bg-gradient-to-r ${footer?.decorations?.lineColor || 'from-transparent via-navy-400 to-transparent'}`}></div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              {footer?.decorations?.icons?.left === "Star" && (
                <Star className={`w-3 h-3 sm:w-4 sm:h-4 ${footer?.decorations?.icons?.color || 'text-yellow-500'}`} />
              )}
              <span className="text-xs sm:text-sm font-medium">{footer?.text || "Official School Documents"}</span>
              {footer?.decorations?.icons?.right === "Star" && (
                <Star className={`w-3 h-3 sm:w-4 sm:h-4 ${footer?.decorations?.icons?.color || 'text-yellow-500'}`} />
              )}
            </div>
            <div className={`w-6 h-px sm:w-8 md:w-12 bg-gradient-to-r ${footer?.decorations?.lineColor || 'from-transparent via-navy-400 to-transparent'}`}></div>
          </div>
        </motion.div>
      </div>

      {/* ================= PDF VIEWER MODAL ================= */}
      <AnimatePresence>
        {selectedDocument && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={closeDocumentViewer}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-6xl h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-navy-50 to-blue-50 border-b border-navy-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-navy-600 to-blue-600 rounded-lg flex items-center justify-center">
                    <FileText className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-navy-800">
                    {selectedDocument.name}
                  </h3>
                </div>
                
                <div className="flex items-center gap-2">
                  {/* Navigation Controls - Simplified for CBSE style */}
                  <div className="flex items-center gap-1 mr-2">
                    <button
                      onClick={prevDocument}
                      disabled={currentDocIndex === 0}
                      className={`p-1.5 rounded-lg transition-colors ${
                        currentDocIndex === 0 
                          ? 'opacity-40 cursor-not-allowed' 
                          : 'hover:bg-navy-100'
                      }`}
                    >
                      <ChevronLeft className="w-5 h-5 text-navy-600" />
                    </button>
                    <span className="text-sm font-medium text-navy-700 px-2">
                      {currentDocIndex + 1}/{certificateData.certificates.documents.length}
                    </span>
                    <button
                      onClick={nextDocument}
                      disabled={currentDocIndex === certificateData.certificates.documents.length - 1}
                      className={`p-1.5 rounded-lg transition-colors ${
                        currentDocIndex === certificateData.certificates.documents.length - 1
                          ? 'opacity-40 cursor-not-allowed' 
                          : 'hover:bg-navy-100'
                      }`}
                    >
                      <ChevronRight className="w-5 h-5 text-navy-600" />
                    </button>
                  </div>

                  {/* Zoom Controls - Simplified */}
                  <div className="flex items-center gap-1 mr-2">
                    <button
                      onClick={handleZoomOut}
                      disabled={zoomLevel <= 0.5}
                      className="p-1.5 hover:bg-navy-100 rounded-lg transition-colors disabled:opacity-40"
                      title="Zoom Out"
                    >
                      <ZoomOut className="w-4 h-4 text-navy-600" />
                    </button>
                    <span className="text-sm font-medium text-navy-700 min-w-[50px] text-center">
                      {Math.round(zoomLevel * 100)}%
                    </span>
                    <button
                      onClick={handleZoomIn}
                      disabled={zoomLevel >= 3}
                      className="p-1.5 hover:bg-navy-100 rounded-lg transition-colors disabled:opacity-40"
                      title="Zoom In"
                    >
                      <ZoomIn className="w-4 h-4 text-navy-600" />
                    </button>
                  </div>

                 
                </div>
              </div>

              {/* PDF Viewer */}
              <div className="relative h-[calc(90vh-4rem)] w-full bg-gray-100">
                {/* Loading Indicator */}
                {isLoading && (
                  <div className="absolute inset-0 bg-gradient-to-br from-white to-navy-50/30 flex flex-col items-center justify-center z-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-600"></div>
                    <p className="mt-4 text-gray-600">Loading document...</p>
                  </div>
                )}

                {/* PDF Embed with Zoom */}
                <div 
                  className="w-full h-full overflow-auto"
                  style={{ 
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: 'center center'
                  }}
                >
                  <iframe
                    src={getPdfUrl(selectedDocument.file)}
                    title={selectedDocument.name}
                    className="w-full h-full border-0"
                    style={{ 
                      pointerEvents: zoomLevel === 1 ? 'auto' : 'none',
                      minHeight: '100%',
                      minWidth: '100%'
                    }}
                    onLoad={handleIframeLoad}
                    allow="fullscreen"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* CSS to hide PDF viewer controls - additional styling */}
                <style jsx>{`
                  iframe {
                    -webkit-overflow-scrolling: touch;
                  }
                  
                  /* Hide scrollbar for cleaner look */
                  .overflow-auto::-webkit-scrollbar {
                    width: 8px;
                    height: 8px;
                  }
                  
                  .overflow-auto::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 4px;
                  }
                  
                  .overflow-auto::-webkit-scrollbar-thumb {
                    background: #cbd5e0;
                    border-radius: 4px;
                  }
                  
                  .overflow-auto::-webkit-scrollbar-thumb:hover {
                    background: #94a3b8;
                  }
                `}</style>

                {/* Mobile Info Message */}
                {isMobile && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
                    <div className="flex items-center gap-2">
                      <Info className="w-4 h-4" />
                      <span>View-only mode</span>
                    </div>
                  </div>
                )}
              </div>

             
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Disclosure;