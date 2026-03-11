import React, { useState, useEffect } from "react";
import {
  User,
  Calendar,
  School,
  BookOpen,
  Mail,
  Phone,
  Send,
  UserCircle,
  AlertCircle,
  FileText,
  Eye,
  Download,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
  X,
  CheckCircle,
  Star,
  Sparkles,
  Cloud,
  Sun,
  Heart,
  MessageCircle,
  HelpCircle,
  Clipboard,
  MailCheck,
  Shield,
  ChevronDown,
} from "lucide-react";
import { motion } from "framer-motion";

// API base URL - update this to match your Laravel server
const API_BASE_URL = "https://vppcms.demovoting.com/api";

const AdmissionEnquiryForm = () => {
  // Form state
  const [formData, setFormData] = useState({
    full_name: "",
    date_of_birth: "",
    admission_class: "",
    last_exam: "",
    father_name: "",
    email: "",
    mobile_no: "",
    additional_info: "",
  });

  // Enquiries list state
  const [enquiries, setEnquiries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [perPage, setPerPage] = useState(15);
  const [loading, setLoading] = useState(false);
  const [showEnquiries, setShowEnquiries] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [showMobileList, setShowMobileList] = useState(false);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [mobileValidation, setMobileValidation] = useState({
    isValid: false,
    message: "",
    prefix: "",
    operator: "",
  });

  const classOptions = [
    "SELECT CLASS",
    "Nursery",
    "Junior KG",
    "Senior KG",
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
    "X",
  ];

  // Last Examination passed/appeared options
  const lastExamOptions = [
    "SELECT LAST EXAM",
    "Nursery",
    "Junior KG",
    "Senior KG",
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
    "X",
    "XI",
    "XII",
    "Other",
  ];

  // Enhanced TRAI-approved Indian mobile number prefixes with operator info
  const mobileOperators = {
    // Jio
    70: "Jio",
    72: "Jio",
    73: "Jio",
    74: "Jio",
    75: "Jio",
    76: "Jio",
    77: "Jio",
    78: "Jio",
    79: "Jio",

    // Airtel
    98: "Airtel",
    99: "Airtel",
    96: "Airtel",
    97: "Airtel",
    81: "Airtel",
    84: "Airtel",
    85: "Airtel",
    86: "Airtel",
    88: "Airtel",
    89: "Airtel",
    82: "Airtel",
    83: "Airtel",

    // Vodafone Idea
    90: "Vodafone Idea",
    91: "Vodafone Idea",
    92: "Vodafone Idea",
    93: "Vodafone Idea",
    94: "Vodafone Idea",
    95: "Vodafone Idea",

    // BSNL
    80: "BSNL",

    // MTNL
    87: "MTNL",

    // Reliance Communications
    60: "Reliance",
    61: "Reliance",
    62: "Reliance",
    63: "Reliance",
    64: "Reliance",
    65: "Reliance",
    66: "Reliance",
    67: "Reliance",
    68: "Reliance",
    69: "Reliance",

    // Tata Docomo
    50: "Tata Docomo",
    51: "Tata Docomo",
    52: "Tata Docomo",
    53: "Tata Docomo",
    54: "Tata Docomo",
    55: "Tata Docomo",
    56: "Tata Docomo",
    57: "Tata Docomo",
    58: "Tata Docomo",
    59: "Tata Docomo",
  };

  // Valid prefixes (all keys from mobileOperators)
  const validPrefixes = Object.keys(mobileOperators);

  // Fetch enquiries from API
  const fetchEnquiries = async (page = 1) => {
    setLoading(true);
    try {
      let url = `${API_BASE_URL}/admission-enquiries?page=${page}&per_page=${perPage}`;

      if (searchTerm) {
        url += `&search=${encodeURIComponent(searchTerm)}`;
      }
      if (statusFilter) {
        url += `&status=${encodeURIComponent(statusFilter)}`;
      }
      if (classFilter) {
        url += `&class=${encodeURIComponent(classFilter)}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();

      if (result.success) {
        setEnquiries(result.data.data || []);
        setCurrentPage(result.data.current_page);
        setTotalPages(result.data.last_page);
        setTotalItems(result.data.total);
      }
    } catch (error) {
      console.error("Error fetching enquiries:", error);
      setSubmitError("Failed to load enquiries. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch enquiries on component mount and when filters change
  useEffect(() => {
    if (showEnquiries) {
      fetchEnquiries(currentPage);
    }
  }, [
    showEnquiries,
    currentPage,
    perPage,
    searchTerm,
    statusFilter,
    classFilter,
  ]);

  // Enhanced mobile validation function
  const validateMobileNumber = (mobileNo) => {
    // Reset validation state
    setMobileValidation({
      isValid: false,
      message: "",
      prefix: "",
      operator: "",
    });

    // Check if empty
    if (!mobileNo) {
      return "Mobile number is required";
    }

    // Check if it's exactly 10 digits
    if (!/^\d{10}$/.test(mobileNo)) {
      return "Mobile number must be exactly 10 digits";
    }

    // Check if it starts with a valid TRAI prefix
    const prefix = mobileNo.substring(0, 2);
    const operator = mobileOperators[prefix];

    if (!validPrefixes.includes(prefix)) {
      return "Please enter a valid Indian mobile number";
    }

    // Comprehensive fake number detection
    const invalidPatterns = [
      /^(\d)\1{9}$/,
      /^1234567890$/,
      /^0123456789$/,
      /^2345678901$/,
      /^0987654321$/,
      /^9876543210$/,
      /^8765432109$/,
      /^(\d{2})\1{4}$/,
      /^(\d{3})\1{3}$/,
      /^(\d{4})\1{2}$/,
      /^(\d{5})\1$/,
      /^1111111111$/,
      /^2222222222$/,
      /^3333333333$/,
      /^4444444444$/,
      /^5555555555$/,
      /^6666666666$/,
      /^7777777777$/,
      /^8888888888$/,
      /^9999999999$/,
      /^0000000000$/,
      /^(\d)(\d)(\d)(\d)(\d)(\d)\6\5\4\3\2\1$/,
      /^(\d)(\d)(\d)(\d)(\d)\5\4\3\2\1$/,
      /^9998887776$/,
      /^8887776665$/,
      /^7776665554$/,
      /^6665554443$/,
      /^5554443332$/,
      /^1231231234$/,
      /^9879879876$/,
      /^4564564567$/,
    ];

    for (const pattern of invalidPatterns) {
      if (pattern.test(mobileNo)) {
        return "Please enter a valid mobile number (test/fake numbers not allowed)";
      }
    }

      const blockInvalidNameKeys = (e) => {
  // Block numbers + special characters
  if (/[0-9.,\/';\\_\-]/.test(e.key)) {
    e.preventDefault();
  }
};
    // Update validation state for valid numbers
    setMobileValidation({
      isValid: true,
      message: `Valid ${operator || "Indian"} number`,
      prefix: prefix,
      operator: operator || "Unknown",
    });

    return null; // No error
  };

  // Handle mobile number change
  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);

    setFormData((prev) => ({
      ...prev,
      mobile_no: value,
    }));

    // Clear previous errors
    if (errors.mobile_no) {
      setErrors((prev) => ({
        ...prev,
        mobile_no: "",
      }));
    }

    setSubmitError("");

    // Validate only if we have 10 digits
    if (value.length === 10) {
      const error = validateMobileNumber(value);
      if (error) {
        setErrors((prev) => ({
          ...prev,
          mobile_no: error,
        }));
      }
    } else if (value.length > 0) {
      setMobileValidation({
        isValid: false,
        message: "Enter 10-digit mobile number",
        prefix: "",
        operator: "",
      });
    } else {
      setMobileValidation({
        isValid: false,
        message: "",
        prefix: "",
        operator: "",
      });
    }
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobile_no") {
      handleMobileChange(e);
      return;
    }

    // Prevent digits in name fields
    let filteredValue = value;
    if (name === "full_name" || name === "father_name") {
      // Remove digits and allow only alphabets, spaces, and common name characters
      filteredValue = value.replace(/[0-9]/g, '');
    }

    setFormData((prev) => ({
      ...prev,
      [name]: filteredValue,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
    setSubmitError("");
  };

  // Form validation function
  // const validateForm = () => {
  //   const newErrors = {};

  //   // Full Name validation
  //   if (!formData.full_name.trim()) {
  //     newErrors.full_name = "Full Name is required";
  //   } else if (formData.full_name.trim().length < 2) {
  //     newErrors.full_name = "Full Name must be at least 2 characters";
  //   } else if (!/^[A-Za-z\s.'-]+$/.test(formData.full_name.trim())) {
  //     newErrors.full_name = "Full Name can only contain alphabets and spaces";
  //   }

  //   // Date of Birth validation
  //   if (!formData.date_of_birth) {
  //     newErrors.date_of_birth = "Date of Birth is required";
  //   } else {
  //     const dob = new Date(formData.date_of_birth);
  //     const today = new Date();
  //     if (dob >= today) {
  //       newErrors.date_of_birth = "Date of Birth must be in the past";
  //     }
  //     const age = today.getFullYear() - dob.getFullYear();
  //     if (age < 2) {
  //       newErrors.date_of_birth = "Student must be at least 2 years old";
  //     }
  //     if (age > 18) {
  //       newErrors.date_of_birth = "Student age seems incorrect";
  //     }
  //   }

  //   // Admission Class validation
  //   if (
  //     !formData.admission_class ||
  //     formData.admission_class === "SELECT CLASS"
  //   ) {
  //     newErrors.admission_class = "Please select a class";
  //   }

  //   // Last Exam validation
  //   if (!formData.last_exam || formData.last_exam === "SELECT LAST EXAM") {
  //     newErrors.last_exam = "Please select last examination passed/appeared";
  //   }

  //   // Father's Name validation
  //   if (!formData.father_name.trim()) {
  //     newErrors.father_name = "Father's Name is required";
  //   } else if (formData.father_name.trim().length < 2) {
  //     newErrors.father_name = "Father's Name must be at least 2 characters";
  //   } else if (!/^[A-Za-z\s.'-]+$/.test(formData.father_name.trim())) {
  //     newErrors.father_name = "Father's Name can only contain alphabets and spaces";
  //   }

  //   // Email validation
  //   if (!formData.email.trim()) {
  //     newErrors.email = "Email is required";
  //   } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
  //     newErrors.email = "Email is invalid";
  //   }

  //   // Mobile number validation
  //   if (!formData.mobile_no.trim()) {
  //     newErrors.mobile_no = "Mobile No. is required";
  //   } else {
  //     const mobileError = validateMobileNumber(formData.mobile_no);
  //     if (mobileError) {
  //       newErrors.mobile_no = mobileError;
  //     }
  //   }

  //   return newErrors;
  // };

  const validateForm = () => {
  const newErrors = {};

  // Full Name validation
  if (!formData.full_name.trim()) {
    newErrors.full_name = "Full Name is required";
  } else if (formData.full_name.trim().length < 2) {
    newErrors.full_name = "Full Name must be at least 2 characters";
  } else if (!/^[A-Za-z\s]+$/.test(formData.full_name.trim())) {
    newErrors.full_name =
      "Full Name can only contain alphabets and spaces (no special characters)";
  }

  // Date of Birth validation
  if (!formData.date_of_birth) {
    newErrors.date_of_birth = "Date of Birth is required";
  } else {
    const dob = new Date(formData.date_of_birth);
    const today = new Date();
    if (dob >= today) {
      newErrors.date_of_birth = "Date of Birth must be in the past";
    }
    const age = today.getFullYear() - dob.getFullYear();
    if (age < 2) {
      newErrors.date_of_birth = "Student must be at least 2 years old";
    }
    if (age > 18) {
      newErrors.date_of_birth = "Student age seems incorrect";
    }
  }

  // Admission Class validation
  if (!formData.admission_class || formData.admission_class === "SELECT CLASS") {
    newErrors.admission_class = "Please select a class";
  }

  // Last Exam validation
  if (!formData.last_exam || formData.last_exam === "SELECT LAST EXAM") {
    newErrors.last_exam =
      "Please select last examination passed/appeared";
  }

  // Father's Name validation
  if (!formData.father_name.trim()) {
    newErrors.father_name = "Father's Name is required";
  } else if (formData.father_name.trim().length < 2) {
    newErrors.father_name =
      "Father's Name must be at least 2 characters";
  } else if (!/^[A-Za-z\s]+$/.test(formData.father_name.trim())) {
    newErrors.father_name =
      "Father's Name can only contain alphabets and spaces (no special characters)";
  }

  // Email validation
  if (!formData.email.trim()) {
    newErrors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = "Email is invalid";
  }

  // Mobile number validation
  if (!formData.mobile_no.trim()) {
    newErrors.mobile_no = "Mobile No. is required";
  } else {
    const mobileError = validateMobileNumber(formData.mobile_no);
    if (mobileError) {
      newErrors.mobile_no = mobileError;
    }
  }

  return newErrors;
};

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Format date-time for display
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "new":
        return "bg-yellow-100 text-yellow-800";
      case "contacted":
        return "bg-blue-100 text-blue-800";
      case "follow_up":
        return "bg-purple-100 text-purple-800";
      case "admitted":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get status display text
  const getStatusText = (status) => {
    switch (status) {
      case "new":
        return "New";
      case "contacted":
        return "Contacted";
      case "follow_up":
        return "Follow Up";
      case "admitted":
        return "Admitted";
      case "rejected":
        return "Rejected";
      default:
        return status;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const firstError = Object.keys(validationErrors)[0];
      const element = document.getElementsByName(firstError)[0];
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.focus();
      }
      return;
    }

    const mobileError = validateMobileNumber(formData.mobile_no);
    if (mobileError) {
      setErrors((prev) => ({
        ...prev,
        mobile_no: mobileError,
      }));
      const element = document.getElementsByName("mobile_no")[0];
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.focus();
      }
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const apiData = {
        full_name: formData.full_name,
        date_of_birth: formData.date_of_birth,
        admission_class: formData.admission_class,
        last_exam: formData.last_exam,
        father_name: formData.father_name,
        email: formData.email,
        mobile_no: formData.mobile_no,
        additional_info: formData.additional_info || "",
      };

      const response = await fetch(`${API_BASE_URL}/admission-enquiry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(apiData),
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 422 && result.errors) {
          const apiErrors = {};
          Object.keys(result.errors).forEach((key) => {
            apiErrors[key] = result.errors[key][0];
          });
          setErrors(apiErrors);
          throw new Error("Validation failed");
        }
        throw new Error(
          result.message || `Submission failed with status ${response.status}`
        );
      }

      setIsSubmitting(false);
      setIsSubmitted(true);

      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          full_name: "",
          date_of_birth: "",
          admission_class: "",
          last_exam: "",
          father_name: "",
          email: "",
          mobile_no: "",
          additional_info: "",
        });
        setErrors({});
        setMobileValidation({
          isValid: false,
          message: "",
          prefix: "",
          operator: "",
        });

        if (showEnquiries) {
          fetchEnquiries(1);
        }
      }, 3000);
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitError(
        error.message || "Failed to submit form. Please try again."
      );
      setIsSubmitting(false);
    }
  };

  // Render form field
  const renderFormField = (fieldConfig) => {
    const {
      label,
      name,
      type = "text",
      placeholder,
      icon: Icon,
      required = true,
      rows,
      options,
    } = fieldConfig;

    const error = errors[name];
    const value = formData[name];

    return (
      <div className="mb-4 sm:mb-6">
        <label className="block text-gray-700 text-xs sm:text-sm font-semibold mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative">
          {Icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
          )}
          {type === "select" ? (
            <select
              name={name}
              value={value}
              onChange={handleChange}
              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent transition-all ${
                Icon ? "pl-10 sm:pl-12" : "pl-3 sm:pl-4"
              } ${error ? "border-red-500" : "border-gray-300"}`}
            >
              {options.map((option, index) => (
                <option key={index} value={option} disabled={index === 0}>
                  {option}
                </option>
              ))}
            </select>
          ) : type === "textarea" ? (
            <textarea
              name={name}
              value={value}
              onChange={handleChange}
              placeholder={placeholder}
              rows={rows}
              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent transition-all ${
                Icon ? "pl-10 sm:pl-12" : "pl-3 sm:pl-4"
              } ${error ? "border-red-500" : "border-gray-300"}`}
            />
          ) : name === "mobile_no" ? (
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                <span className="text-gray-500 text-xs sm:text-sm">+91</span>
                <div className="w-px h-3 sm:h-4 bg-gray-300 mx-1"></div>
              </div>
              <input
                type="tel"
                name={name}
                value={value}
                onChange={handleChange}
                placeholder="98765 43210"
                maxLength="10"
                pattern="[0-9]*"
                inputMode="numeric"
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent transition-all pl-16 sm:pl-20 ${
                  error ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>
          ) : (
            <input
  type={type}
  name={name}
  value={value}
  onChange={handleChange}
  onKeyDown={
    name === "full_name" || name === "father_name"
      ? (e) => {
          if (/[0-9.,\/';\\_\-]/.test(e.key)) {
            e.preventDefault();
          }
        }
      : undefined
  }
  placeholder={placeholder}
  pattern={
    name === "full_name" || name === "father_name"
      ? "[A-Za-z\\s.'-]+"
      : undefined
  }
  title={
    name === "full_name" || name === "father_name"
      ? "Only alphabets and spaces are allowed"
      : undefined
  }
  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent transition-all ${
    Icon ? "pl-10 sm:pl-12" : "pl-3 sm:pl-4"
  } ${error ? "border-red-500" : "border-gray-300"}`}
/>
          )}
        </div>

        {/* Mobile number validation feedback */}
        {name === "mobile_no" &&
          !error &&
          value.length === 10 &&
          mobileValidation.isValid && (
            <div className="mt-1 sm:mt-2">
              <p className="text-green-600 text-xs flex items-center gap-1">
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Valid {mobileValidation.operator} number (
                {mobileValidation.prefix} series)
              </p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 h-1 bg-green-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: "100%" }}
                  ></div>
                </div>
                <span className="text-xs text-green-600">✓ Valid number</span>
              </div>
            </div>
          )}

        {error && (
          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {error}
          </p>
        )}
      </div>
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("");
    setClassFilter("");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-navy-50/30 py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-navy-100/20 to-blue-100/10 rounded-full -translate-x-24 -translate-y-24"></div>
      {/* <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-tl from-blue-100/10 to-navy-100/20 rounded-full translate-x-24 translate-y-24"></div> */}

      {/* Creative decorative elements - Inquiry related */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-5 sm:top-20 sm:left-10 opacity-20 animate-bounce">
          <Cloud className="w-8 h-8 sm:w-10 sm:h-10 text-navy-400" />
        </div>
        <div className="absolute top-20 right-8 sm:top-32 sm:right-16 opacity-20 animate-pulse">
          <Sun className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-400" />
        </div>
        <div className="absolute bottom-20 left-10 sm:bottom-32 sm:left-20 opacity-20 animate-bounce">
          <MessageCircle className="w-8 h-8 sm:w-10 sm:h-10 text-green-400" />
        </div>
        <div className="absolute bottom-10 right-5 sm:bottom-20 sm:right-10 opacity-20 animate-pulse">
          <MailCheck className="w-8 h-8 sm:w-10 sm:h-10 text-blue-300" />
        </div>
        <div className="absolute top-1/3 left-1/4 opacity-15">
          <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-navy-300" />
        </div>
        <div className="absolute bottom-1/3 right-1/4 opacity-15">
          <HelpCircle className="w-6 h-6 sm:w-8 sm:h-8 text-purple-300" />
        </div>
        <div className="absolute top-1/2 left-10 opacity-10">
          <Clipboard className="w-10 h-10 sm:w-12 sm:h-12 text-navy-200" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
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
              Admission Enquiry Form
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
            Begin your child's educational journey with us. Fill out the form below and 
            our admission team will get in touch with you shortly.
          </p>
        </motion.div>

       

        {/* ================= FORM SECTION ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-navy-100 overflow-hidden mb-8 sm:mb-12"
        >
          {/* Form Header */}
          <div className="p-4 sm:p-5 md:p-6 bg-gradient-to-r from-navy-50 to-blue-50 border-b border-navy-100">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="relative">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-navy-600 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center text-white">
                  <FileText className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                  <Star className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-navy-800">
                  Enquiry Form
                </h2>
                <div className="flex items-center gap-1 mt-1">
                  <div className="h-1 w-4 sm:w-6 bg-navy-500 rounded-full"></div>
                  <div className="h-1 w-2 sm:w-3 bg-blue-500 rounded-full"></div>
                  <div className="h-1 w-1 sm:w-2 bg-navy-400 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Success Message */}
          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="m-4 sm:m-6 md:m-8"
            >
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 sm:p-6 border border-green-200">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg sm:rounded-xl flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:w-6 text-green-600" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                      <Star className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-navy-800 mb-1">
                      Enquiry Submitted Successfully!
                    </h3>
                    <p className="text-gray-700 text-sm sm:text-base">
                      Thank you for your interest. Our admission team will contact 
                      you within 24 hours on <span className="font-semibold text-navy-700">+91 {formData.mobile_no}</span>.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Submit Error Message */}
          {submitError && (
            <div className="m-4 sm:m-6 md:m-8">
              <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-4 sm:p-6 border border-red-200">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-500/20 to-rose-500/20 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <X className="w-5 h-5 sm:w-6 sm:w-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-red-800 mb-1">
                      Submission Failed
                    </h3>
                    <p className="text-red-700 text-sm sm:text-base">{submitError}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Form Content */}
          <div className="p-4 sm:p-5 md:p-6 lg:p-8">
            <form onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Left Column */}
                <div>
                  {renderFormField({
                    label: "Full Name",
                    name: "full_name",
                    placeholder: "Enter Full name",
                    icon: User,
                  })}

                  {renderFormField({
                    label: "Date of Birth",
                    name: "date_of_birth",
                    type: "date",
                    icon: Calendar,
                  })}

                  {renderFormField({
                    label: "Admission in Class",
                    name: "admission_class",
                    type: "select",
                    options: classOptions,
                    icon: School,
                  })}

                  {renderFormField({
                    label: "Last Examination passed/appeared",
                    name: "last_exam",
                    type: "select",
                    options: lastExamOptions,
                    icon: BookOpen,
                  })}
                </div>

                {/* Right Column */}
                <div>
                  {renderFormField({
                    label: "Father's Name",
                    name: "father_name",
                    placeholder: "Full Name of father",
                    icon: UserCircle,
                  })}

                  {renderFormField({
                    label: "Your Email",
                    name: "email",
                    type: "email",
                    placeholder: "Email address",
                    icon: Mail,
                  })}

                  {renderFormField({
                    label: "Your Mobile No.",
                    name: "mobile_no",
                    type: "tel",
                    placeholder: "Enter 10-digit Mobile No.",
                    icon: Phone,
                  })}

                  {renderFormField({
                    label: "Additional Information (Optional)",
                    name: "additional_info",
                    type: "textarea",
                    placeholder:
                      "Any specific queries or information you'd like to share...",
                    icon: FileText,
                    required: false,
                    rows: 3,
                  })}
                </div>
              </div>

              {/* Form validation summary */}
              {(Object.keys(errors).length > 0 || submitError) && (
                <div className="mt-6 p-4 bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-lg">
                  <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2 text-sm sm:text-base">
                    <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                    Please fix the following errors:
                  </h4>
                  <ul className="list-disc list-inside text-red-700 text-xs sm:text-sm space-y-1">
                    {errors.full_name && <li>Full Name: {errors.full_name}</li>}
                    {errors.date_of_birth && (
                      <li>Date of Birth: {errors.date_of_birth}</li>
                    )}
                    {errors.admission_class && (
                      <li>Admission Class: {errors.admission_class}</li>
                    )}
                    {errors.last_exam && <li>Last Exam: {errors.last_exam}</li>}
                    {errors.father_name && (
                      <li>Father's Name: {errors.father_name}</li>
                    )}
                    {errors.email && <li>Email: {errors.email}</li>}
                    {errors.mobile_no && (
                      <li>Mobile Number: {errors.mobile_no}</li>
                    )}
                    {submitError && <li>Submission Error: {submitError}</li>}
                  </ul>
                </div>
              )}

              {/* Submit Button */}
              <div className="mt-6 sm:mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-navy-600 to-blue-600 hover:shadow-lg hover:-translate-y-0.5"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                      Submit Enquiry
                    </>
                  )}
                </button>

                <p className="text-center text-gray-600 text-xs sm:text-sm mt-3 sm:mt-4">
                  By submitting this form, you agree to our{" "}
                  <a
                    href="/privacy-policy"
                    className="text-navy-600 hover:underline font-medium"
                  >
                    Privacy Policy
                  </a>
                </p>
              </div>
            </form>
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
            <div className="w-6 h-px sm:w-8 md:w-12 bg-gradient-to-r from-transparent via-navy-400 to-transparent"></div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
              <span className="text-xs sm:text-sm font-medium">Your Journey Starts Here</span>
              <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
            </div>
            <div className="w-6 h-px sm:w-8 md:w-12 bg-gradient-to-r from-transparent via-navy-400 to-transparent"></div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }

        select option:disabled {
          color: #9ca3af;
        }

        select option:not(:disabled) {
          color: #1f2937;
        }

        /* Hide number input arrows */
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
};

export default AdmissionEnquiryForm;


