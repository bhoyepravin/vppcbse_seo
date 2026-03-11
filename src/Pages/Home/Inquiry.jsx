import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Send,
  MapPin,
  Phone,
  Mail,
  AlertCircle,
  Check,
  Shield,
  FileText,
  Star,
  Cloud,
  Sun,
  MessageCircle,
  MailCheck,
  Sparkles,
} from "lucide-react";
import axiosInstance from "../../services/api"; // Update this import path based on your project structure

const Inquiry = () => {
  const [contactData, setContactData] = useState({
    phone: "7507546666",
    email: "info@vppcbse.bhonsala.in",
    address: {
      line1: "Dr. B.S. Moonje Marg, Rambhoomi",
      city: "Nashik",
      state: "Maharashtra",
      pinCode: "422005",
      country: "India"
    },
    responseTime: "Within 24 hours",
    officeHours: "8:30 AM - 12:00 PM"
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fixed: Added state, district, and pinCode to initial state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    grade: "",
    email: "",
    mobileNumber: "",
    location: "",
    state: "",
    district: "",
    pinCode: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [mobileValidation, setMobileValidation] = useState({
    isValid: false,
    message: "",
    prefix: "",
    operator: "",
    isTouched: false,
  });

  // Fetch quick contact data on mount
  useEffect(() => {
    fetchQuickContact();
  }, []);

  const fetchQuickContact = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/quick-contact');
      
      if (response.data.success) {
        setContactData(response.data.data);
        setError(null);
      }
    } catch (err) {
      console.error('Error fetching quick contact:', err);
      setError('Failed to load contact information');
    } finally {
      setLoading(false);
    }
  };

  // Enhanced TRAI-approved Indian mobile number prefixes with operator info
  const mobileOperators = {
    // Jio
    70: "Jio", 72: "Jio", 73: "Jio", 74: "Jio", 75: "Jio", 76: "Jio", 77: "Jio", 78: "Jio", 79: "Jio",
    // Airtel
    98: "Airtel", 99: "Airtel", 96: "Airtel", 97: "Airtel", 81: "Airtel", 84: "Airtel", 85: "Airtel", 86: "Airtel", 88: "Airtel", 89: "Airtel", 82: "Airtel", 83: "Airtel",
    // Vodafone Idea
    90: "Vodafone Idea", 91: "Vodafone Idea", 92: "Vodafone Idea", 93: "Vodafone Idea", 94: "Vodafone Idea", 95: "Vodafone Idea",
    // BSNL
    80: "BSNL",
    // MTNL
    87: "MTNL",
    // Reliance Communications
    60: "Reliance", 61: "Reliance", 62: "Reliance", 63: "Reliance", 64: "Reliance", 65: "Reliance", 66: "Reliance", 67: "Reliance", 68: "Reliance", 69: "Reliance",
    // Tata Docomo
    50: "Tata Docomo", 51: "Tata Docomo", 52: "Tata Docomo", 53: "Tata Docomo", 54: "Tata Docomo", 55: "Tata Docomo", 56: "Tata Docomo", 57: "Tata Docomo", 58: "Tata Docomo", 59: "Tata Docomo",
  };

  const validPrefixes = Object.keys(mobileOperators);

  // Enhanced mobile validation function
  const validateMobileNumber = (mobileNo) => {
    setMobileValidation((prev) => ({
      ...prev,
      isValid: false,
      message: "",
      prefix: "",
      operator: "",
    }));

    if (!mobileNo) return "Mobile number is required";
    if (!/^\d{10}$/.test(mobileNo)) return "Mobile number must be exactly 10 digits";

    const prefix = mobileNo.substring(0, 2);
    const operator = mobileOperators[prefix];

    if (!validPrefixes.includes(prefix)) return "Please enter a valid Indian mobile number";

    const invalidPatterns = [
      /^(\d)\1{9}$/, // All same digits
      /^1234567890$/, /^0123456789$/, /^2345678901$/, /^0987654321$/, /^9876543210$/, /^8765432109$/,
      /^(\d{2})\1{4}$/, /^(\d{3})\1{3}$/, /^(\d{4})\1{2}$/, /^(\d{5})\1$/,
      /^1111111111$/, /^2222222222$/, /^3333333333$/, /^4444444444$/, /^5555555555$/,
      /^6666666666$/, /^7777777777$/, /^8888888888$/, /^9999999999$/, /^0000000000$/,
      /^(\d)(\d)(\d)(\d)(\d)(\d)\6\5\4\3\2\1$/, /^(\d)(\d)(\d)(\d)(\d)\5\4\3\2\1$/,
      /^9998887776$/, /^8887776665$/, /^7776665554$/, /^6665554443$/, /^5554443332$/,
      /^1231231234$/, /^9879879876$/, /^4564564567$/,
    ];

    for (const pattern of invalidPatterns) {
      if (pattern.test(mobileNo)) return "Please enter a valid mobile number (test/fake numbers not allowed)";
    }

    setMobileValidation((prev) => ({
      ...prev,
      isValid: true,
      message: `Valid ${operator || "Indian"} number`,
      prefix: prefix,
      operator: operator || "Unknown",
    }));

    return null;
  };

  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);

    setFormData((prev) => ({ ...prev, mobileNumber: value }));

    if (errors.mobileNumber) setErrors((prev) => ({ ...prev, mobileNumber: "" }));
    setSubmitError("");

    if (value.length === 10) {
      const error = validateMobileNumber(value);
      if (error) setErrors((prev) => ({ ...prev, mobileNumber: error }));
    } else if (value.length > 0) {
      setMobileValidation((prev) => ({
        ...prev,
        isValid: false,
        message: "Enter 10-digit mobile number",
        prefix: "",
        operator: "",
        isTouched: true,
      }));
    } else {
      setMobileValidation((prev) => ({
        ...prev,
        isValid: false,
        message: "",
        prefix: "",
        operator: "",
        isTouched: true,
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobileNumber") {
      handleMobileChange(e);
      return;
    }

    // Validation: Prevent numbers in name fields
    if ((name === "firstName" || name === "lastName") && /[0-9]/.test(value)) {
      return;
    }

    // ✅ NEW: Prevent special characters in name fields
    if (
      (name === "firstName" || name === "lastName") &&
      /[.,\/';\\]/.test(value)
    ) {
      return;
    }
    
    // Validation: Pin code should only be numbers
    if (name === "pinCode" && /[^0-9]/.test(value)) {
      return;
    }

    // Logic: Reset district if state changes
    if (name === "state") {
      setFormData({
        ...formData,
        state: value,
        district: "", // Reset district
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
    setSubmitError("");
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validations
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    else if (formData.firstName.trim().length < 2) newErrors.firstName = "First name must be at least 2 characters";

    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    else if (formData.lastName.trim().length < 2) newErrors.lastName = "Last name must be at least 2 characters";

    if (!formData.grade) newErrors.grade = "Please select a grade";

    // Email validation
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Please enter a valid email address";

    // Mobile number validation
    if (!formData.mobileNumber.trim()) newErrors.mobileNumber = "Mobile number is required";
    else {
      const mobileError = validateMobileNumber(formData.mobileNumber);
      if (mobileError) newErrors.mobileNumber = mobileError;
    }

    if (!formData.location.trim()) newErrors.location = "Location is required";
    
    // New Fields Validation
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.district) newErrors.district = "District is required";
    if (!formData.pinCode) newErrors.pinCode = "Pin Code is required";
    else if (formData.pinCode.length !== 6) newErrors.pinCode = "Pin Code must be 6 digits";

    return newErrors;
  };

  const submitToBackend = async (data) => {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Map frontend field names to backend expected field names
      const submissionData = {
        first_name: data.firstName,
        last_name: data.lastName,
        grade: data.grade,
        email: data.email,
        mobile_number: data.mobileNumber,
        location: data.location,
        state: data.state,
        district: data.district,
        pin_code: data.pinCode,
        submitted_at: new Date().toISOString(),
        user_agent: navigator.userAgent
      };

      const response = await axiosInstance.post('/inquiries', submissionData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.data.success) {
        return { success: true, data: response.data };
      } else {
        throw new Error(response.data.message || "Failed to submit inquiry");
      }
    } catch (error) {
      console.error("Submission error:", error);
      
      // Handle validation errors from server
      if (error.response?.data?.errors) {
        const backendErrors = error.response.data.errors;
        const mappedErrors = {};
        
        Object.keys(backendErrors).forEach(key => {
          // Map backend field names to frontend field names
          if (key === 'first_name') mappedErrors.firstName = backendErrors[key][0];
          else if (key === 'last_name') mappedErrors.lastName = backendErrors[key][0];
          else if (key === 'mobile_number') mappedErrors.mobileNumber = backendErrors[key][0];
          else if (key === 'pin_code') mappedErrors.pinCode = backendErrors[key][0];
          else mappedErrors[key] = backendErrors[key][0];
        });
        
        setErrors(mappedErrors);
        setSubmitError("Please check the form for errors.");
      } else {
        setSubmitError(error.response?.data?.message || error.message || "An error occurred. Please try again.");
      }
      
      return { success: false, error: error.message };
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setErrors({});
    
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      const firstError = Object.keys(formErrors)[0];
      const element = document.getElementsByName(firstError)[0];
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.focus();
      }
      return;
    }

    const mobileError = validateMobileNumber(formData.mobileNumber);
    if (mobileError) {
      setErrors((prev) => ({ ...prev, mobileNumber: mobileError }));
      const element = document.getElementsByName("mobileNumber")[0];
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.focus();
      }
      return;
    }

    const result = await submitToBackend(formData);

    if (result.success) {
      console.log("Form submitted:", formData);
      setIsSubmitted(true);
      setTimeout(() => {
        resetForm();
      }, 5000);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      grade: "",
      email: "",
      mobileNumber: "",
      location: "",
      state: "",
      district: "",
      pinCode: "",
    });
    setErrors({});
    setSubmitError("");
    setIsSubmitted(false);
    setMobileValidation({
      isValid: false,
      message: "",
      prefix: "",
      operator: "",
      isTouched: false,
    });
  };

  const popularLocations = [
    "Delhi", "Mumbai", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad",
    "Nagpur", "Nashik", "Aurangabad", "Solapur", "Kolhapur", "Amravati",
    "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar",
    "Mysore", "Mangalore", "Hubli", "Belgaum", "Davangere",
    "Warangal", "Karimnagar", "Nizamabad",
    "Coimbatore", "Madurai", "Trichy", "Salem", "Erode", "Tirunelveli",
    "Howrah", "Durgapur", "Siliguri", "Asansol",
    "Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer", "Bikaner",
    "Lucknow", "Kanpur", "Agra", "Varanasi", "Prayagraj", "Meerut", "Noida", "Greater Noida", "Ghaziabad",
    "Gurgaon", "Faridabad", "Panipat", "Sonipat", "Karnal",
    "Chandigarh", "Ludhiana", "Amritsar", "Jalandhar", "Patiala",
    "Dehradun", "Haridwar", "Roorkee", "Haldwani",
    "Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain",
    "Patna", "Gaya", "Bhagalpur", "Muzaffarpur",
    "Ranchi", "Jamshedpur", "Dhanbad",
    "Bhubaneswar", "Cuttack", "Rourkela", "Sambalpur",
    "Raipur", "Bilaspur", "Durg", "Bhilai",
    "Guwahati", "Dibrugarh", "Silchar",
    "Kochi", "Trivandrum", "Kozhikode", "Thrissur",
    "Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Tirupati",
    "Panaji", "Margao",
    "Shimla", "Solan", "Dharamshala",
    "Srinagar", "Jammu",
    "Imphal", "Shillong", "Aizawl", "Agartala", "Kohima", "Itanagar",
    "Puducherry", "Port Blair", "Daman", "Diu", "Silvassa",
  ];

  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
    "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  ];

   const districts = {
    "Andhra Pradesh": [
    // Coastal & North Coastal Districts
    "Srikakulam",
    "Parvathipuram Manyam",
    "Visakhapatnam",
    "Vizianagaram",
    "Anakapalli",
    "Kakinada",
    "Dr. B.R. Ambedkar Konaseema",
    "Alluri Sitarama Raju (ASR)",
    "East Godavari",
    "Eluru",
    "West Godavari (Bhimavaram)",
    "Krishna",

    // Central & Rayalaseema Districts
    "NTR District (Vijayawada)",
    "Guntur",
    "Bapatla",
    "Palnadu",
    "Prakasam",
    "Sri Potti Sriramulu Nellore (SPSR Nellore)",
    "Tirupati",
    "Chittoor",
    "Annamayya (Rayachoti)",
    "YSR Kadapa",
    "Anantapur",
    "Sri Satya Sai (Puttaparthi)",
    "Kurnool",
    "Nandyal",
    "Sri Balaji District",

    "Other"
  ],

    "Arunachal Pradesh": [
  "Anjaw (Hawai)",
  "Bichom (Napangphung)",
  "Changlang (Changlang)",
  "Dibang Valley (Anini)",
  "East Kameng (Seppa)",
  "East Siang (Pasighat)",
  "Itanagar (Itanagar - Capital)",
  "Kamle (Raga)",
  "Keyi Panyor (Yachuli)",
  "Kra Daadi (Jamin)",
  "Kurung Kumey (Koloriang)",
  "Lepa-Rada (Basar)",
  "Lohit (Tezu)",
  "Longding (Longding)",
  "Lower Dibang Valley (Roing)",
  "Lower Siang (Likabali)",
  "Lower Subansiri (Ziro)",
  "Namsai (Namsai)",
  "Pakke-Kessang (Lemmi)",
  "Papum Pare (Yupia)",
  "Shi-Yomi (Tato)",
  "Siang (Boleng)",
  "Tawang (Tawang Town)",
  "Tirap (Khonsa)",
  "Upper Siang (Yingkiong)",
  "Upper Subansiri (Daporijo)",
  "West Kameng (Bomdila)",
  "West Siang (Aalo)",
  "Other"
],


    Assam: [
  "Baksa",
  "Barpeta",
  "Biswanath",
  "Bongaigaon",
  "Cachar",
  "Charaideo",
  "Chirang",
  "Darrang",
  "Dhemaji",
  "Dhubri",
  "Dibrugarh",
  "Dima Hasao",
  "Goalpara",
  "Golaghat",
  "Hailakandi",
  "Hojai",
  "Jorhat",
  "Kamrup",
  "Kamrup Metropolitan",
  "Karbi Anglong",
  "Karimganj",
  "Kokrajhar",
  "Lakhimpur",
  "Majuli",
  "Morigaon",
  "Nagaon",
  "Nalbari",
  "Sivasagar",
  "Sonitpur",
  "South Salmara-Mankachar",
  "Tinsukia",
  "Tamulpur",
  "Udalguri",
  "West Karbi Anglong",
  "Other"
],


    Bihar: ["Araria",
      "Arwal",
      "Aurangabad",
      "Banka",
      "Begusarai",
      "Bhagalpur",
      "Bhojpur",
      "Buxar",
      "Darbhanga",
      "East Champaran",
      "Gaya",
      "Gopalganj",
      "Jamui",
      "Jehanabad",
      "Kaimur",
      "Katihar",
      "Khagaria",
      "Kishanganj",
      "Lakhisarai",
      "Madhepura",
      "Madhubani",
      "Munger",
      "Muzaffarpur",
      "Nalanda",
      "Nawada",
      "Patna",
      "Purnia",
      "Rohtas",
      "Saharsa",
      "Samastipur",
      "Saran",
      "Sheikhpura",
      "Sheohar",
      "Sitamarhi",
      "Siwan",
      "Supaul",
      "Vaishali",
      "West Champaran"
    ],

    "Chhattisgarh": [
    "Balod",
    "Baloda Bazar-Bhatapara",
    "Balrampur-Ramanujganj",
    "Bastar",
    "Bemetara",
    "Bijapur",
    "Bilaspur",
    "Dantewada (South Bastar)",
    "Dhamtari",
    "Durg",
    "Gariaband",
    "Gaurella-Pendra-Marwahi",
    "Janjgir-Champa",
    "Jashpur",
    "Kabirdham (Kawardha)",
    "Kanker (North Bastar)",
    "Khairagarh-Chhuikhadan-Gandai",
    "Korba",
    "Koriya",
    "Mahasamund",
    "Manendragarh-Chirmiri-Bharatpur",
    "Mohla-Manpur-Ambagarh Chowki",
    "Mungeli",
    "Narayanpur",
    "Raigarh",
    "Raipur",
    "Rajnandgaon",
    "Sakthi",
    "Sarangarh-Bilaigarh",
    "Sukma",
    "Surajpur",
    "Surguja",
    "Utai"
  ],

    Goa: ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Other"],

    Gujarat: [
    "Ahmedabad",
    "Amreli",
    "Anand",
    "Aravalli",
    "Banaskantha",
    "Bharuch",
    "Bhavnagar",
    "Botad",
    "Chhota Udaipur",
    "Dahod",
    "Dang",
    "Devbhoomi Dwarka",
    "Gandhinagar",
    "Gir Somnath",
    "Jamnagar",
    "Junagadh",
    "Kachchh",
    "Kheda",
    "Mahisagar",
    "Mehsana",
    "Morbi",
    "Narmada",
    "Navsari",
    "Panchmahal",
    "Patan",
    "Porbandar",
    "Rajkot",
    "Sabarkantha",
    "Surat",
    "Surendranagar",
    "Tapi",
    "Vadodara",
    "Valsad"
  ],

    Haryana: [
    "Ambala",
    "Bhiwani",
    "Charkhi Dadri",
    "Faridabad",
    "Fatehabad",
    "Gurugram",
    "Hisar",
    "Jhajjar",
    "Jind",
    "Kaithal",
    "Karnal",
    "Kurukshetra",
    "Mahendragarh",
    "Nuh",
    "Palwal",
    "Panchkula",
    "Panipat",
    "Rewari",
    "Rohtak",
    "Sirsa",
    "Sonipat",
    "Yamunanagar"
  ],

    "Himachal Pradesh": [
    "Bilaspur",
    "Chamba",
    "Hamirpur",
    "Kangra",
    "Kinnaur",
    "Kullu",
    "Lahaul And Spiti",
    "Mandi",
    "Shimla",
    "Sirmaur",
    "Solan",
    "Una"
  ],

    "Jharkhand": [
    "Bokaro",
    "Chatra",
    "Deoghar",
    "Dhanbad",
    "Dumka",
    "East Singhbhum",
    "Garhwa",
    "Giridih",
    "Godda",
    "Gumla",
    "Hazaribagh",
    "Jamtara",
    "Khunti",
    "Koderma",
    "Latehar",
    "Lohardaga",
    "Pakur",
    "Palamu",
    "Ramgarh",
    "Ranchi",
    "Sahebganj",
    "Saraikela Kharsawan",
    "Simdega",
    "West Singhbhum"
  ],

    "Karnataka": [
    "Bagalkot",
    "Ballari",
    "Belagavi",
    "Bengaluru Rural",
    "Bengaluru Urban",
    "Bidar",
    "Chamarajanagara",
    "Chikkaballapura",
    "Chikkamagaluru",
    "Chitradurga",
    "Dakshina Kannada",
    "Davanagere",
    "Dharwad",
    "Gadag",
    "Hassan",
    "Haveri",
    "Kalaburagi",
    "Kodagu",
    "Kolar",
    "Koppal",
    "Mandya",
    "Mysuru",
    "Raichur",
    "Ramanagara",
    "Shivamogga",
    "Tumakuru",
    "Udupi",
    "Uttara Kannada",
    "Vijayapura",
    "Vijayanagara",
    "Yadgiri"
  ],

    "Kerala": [
    "Alappuzha",
    "Ernakulam",
    "Idukki",
    "Kannur",
    "Kasaragod",
    "Kollam",
    "Kottayam",
    "Kozhikode",
    "Malappuram",
    "Palakkad",
    "Pathanamthitta",
    "Thiruvananthapuram",
    "Thrissur",
    "Wayanad"
  ],

   "Madhya Pradesh": [
    "Agar Malwa",
    "Alirajpur",
    "Anuppur",
    "Ashoknagar",
    "Balaghat",
    "Barwani",
    "Betul",
    "Bhind",
    "Bhopal",
    "Burhanpur",
    "Chhatarpur",
    "Chhindwara",
    "Damoh",
    "Datia",
    "Dewas",
    "Dhar",
    "Dindori",
    "Guna",
    "Gwalior",
    "Harda",
    "Indore",
    "Jabalpur",
    "Jhabua",
    "Katni",
    "Khandwa",
    "Khargone",
    "Maihar",
    "Mandla",
    "Mandsaur",
    "Mauganj",
    "Morena",
    "Narmadapuram",
    "Narsinghpur",
    "Neemuch",
    "Niwari",
    "Pandhurna",
    "Panna",
    "Raisen",
    "Rajgarh",
    "Ratlam",
    "Rewa",
    "Sagar",
    "Satna",
    "Sehore",
    "Seoni",
    "Shahdol",
    "Shajapur",
    "Sheopur",
    "Shivpuri",
    "Sidhi",
    "Singrauli",
    "Tikamgarh",
    "Ujjain",
    "Umaria",
    "Vidisha"
  ],

    "Maharashtra": [
    "Ahmednagar",
    "Akola",
    "Amravati",
    "Aurangabad",
    "Beed",
    "Bhandara",
    "Buldhana",
    "Chandrapur",
    "Dhule",
    "Gadchiroli",
    "Gondia",
    "Hingoli",
    "Jalgaon",
    "Jalna",
    "Kolhapur",
    "Latur",
    "Mumbai City",
    "Mumbai Suburban",
    "Nagpur",
    "Nanded",
    "Nandurbar",
    "Nashik",
    "Osmanabad",
    "Palghar",
    "Parbhani",
    "Pune",
    "Raigad",
    "Ratnagiri",
    "Sangli",
    "Satara",
    "Sindhudurg",
    "Solapur",
    "Thane",
    "Wardha",
    "Washim",
    "Yavatmal"
  ],


    "Manipur": [
    "Bishnupur",
    "Chandel",
    "Churachandpur",
    "Imphal East",
    "Imphal West",
    "Jiribam",
    "Kakching",
    "Kamjong",
    "Kangpokpi",
    "Noney",
    "Pherzawl",
    "Senapati",
    "Tamenglong",
    "Tengnoupal",
    "Thoubal",
    "Ukhrul"
  ],

     "Meghalaya": [
    "East Khasi Hills",
    "West Khasi Hills",
    "South West Khasi Hills",
    "Eastern West Khasi Hills",
    "Ri-Bhoi",
    "West Jaintia Hills",
    "East Jaintia Hills",
    "North Garo Hills",
    "East Garo Hills",
    "West Garo Hills",
    "South West Garo Hills",
    "South Garo Hills"
  ],

    "Mizoram": [
    "Aizawl",
    "Champhai",
    "Hnahthial",
    "Khawzawl",
    "Kolasib",
    "Lawngtlai",
    "Lunglei",
    "Mamit",
    "Saitual",
    "Serchhip",
    "Siaha"
  ],

    "Nagaland": [
    "Chumoukedima",
    "Dimapur",
    "Kiphire",
    "Kohima",
    "Longleng",
    "Meluri",
    "Mokokchung",
    "Mon",
    "Niuland",
    "Noklak",
    "Peren",
    "Phek",
    "Shamator",
    "Tseminyu",
    "Tuensang",
    "Wokha",
    "Zunheboto"
  ],

    "Odisha": [
    "Angul",
    "Balangir",
    "Balasore",
    "Bargarh",
    "Bhadrak",
    "Boudh",
    "Cuttack",
    "Deogarh",
    "Dhenkanal",
    "Gajapati",
    "Ganjam",
    "Jagatsinghapur",
    "Jajpur",
    "Jharsuguda",
    "Kalahandi",
    "Kandhamal",
    "Kendrapara",
    "Keonjhar",
    "Khordha",
    "Koraput",
    "Malkangiri",
    "Mayurbhanj",
    "Nabarangpur",
    "Nayagarh",
    "Nuapada",
    "Puri",
    "Rayagada",
    "Sambalpur",
    "Subarnapur",
    "Sundargarh"
  ],

     "Punjab": [
    "Amritsar",
    "Barnala",
    "Bathinda",
    "Faridkot",
    "Fatehgarh Sahib",
    "Fazilka",
    "Firozpur",
    "Gurdaspur",
    "Hoshiarpur",
    "Jalandhar",
    "Kapurthala",
    "Ludhiana",
    "Malerkotla",
    "Mansa",
    "Moga",
    "Pathankot",
    "Patiala",
    "Rupnagar",
    "Sahibzada Ajit Singh Nagar",
    "Sangrur",
    "Shahid Bhagat Singh Nagar",
    "Sri Muktsar Sahib",
    "Tarn Taran"
  ],

    
  "Rajasthan": [
    "Ajmer",
    "Alwar",
    "Anupgarh",
    "Balotra",
    "Banswara",
    "Baran",
    "Barmer",
    "Beawar",
    "Bharatpur",
    "Bhilwara",
    "Bikaner",
    "Bundi",
    "Chittorgarh",
    "Churu",
    "Dausa",
    "Deeg",
    "Dholpur",
    "Didwana-Kuchaman",
    "Dudu",
    "Dungarpur",
    "Gangapur City",
    "Hanumangarh",
    "Jaipur",
    "Jaipur Rural",
    "Jaisalmer",
    "Jalore",
    "Jhalawar",
    "Jhunjhunu",
    "Jodhpur",
    "Jodhpur Rural",
    "Karauli",
    "Kekri",
    "Khairthal-Tijara",
    "Kota",
    "Kotputli-Behror",
    "Nagaur",
    "Neem Ka Thana",
    "Pali",
    "Phalodi",
    "Pratapgarh",
    "Rajsamand",
    "Salumbar",
    "Sanchore",
    "Sawai Madhopur",
    "Shahpura",
    "Sikar",
    "Sirohi",
    "Sri Ganganagar",
    "Tonk",
    "Udaipur"
  ],

    Sikkim: [
    "Gangtok",
    "Gyalshing",
    "Mangan",
    "Namchi",
    "Pakyong",
    "Soreng"
  ],

    "Tamil Nadu": [
      "Ariyalur",
      "Chengalpattu",
      "Chennai",
      "Coimbatore",
      "Cuddalore",
      "Dharmapuri",
      "Dindigul",
      "Erode",
      "Kallakurichi",
      "Kanchipuram",
      "Kanyakumari",
      "Karur",
      "Krishnagiri",
      "Madurai",
      "Mayiladuthurai",
      "Nagapattinam",
      "Namakkal",
      "Nilgiris",
      "Perambalur",
      "Pudukkottai",
      "Ramanathapuram",
      "Ranipet",
      "Salem",
      "Sivaganga",
      "Tenkasi",
      "Thanjavur",
      "Theni",
      "Thoothukudi",
      "Tiruchirappalli",
      "Tirunelveli",
      "Tirupattur",
      "Tiruppur",
      "Tiruvallur",
      "Tiruvannamalai",
      "Tiruvarur",
      "Vellore",
      "Viluppuram",
      "Virudhunagar"
    ],

    Telangana: [
    "Adilabad",
    "Bhadradri Kothagudem",
    "Hanumakonda",
    "Hyderabad",
    "Jagtial",
    "Jangaon",
    "Jayashankar Bhupalpally",
    "Jogulamba Gadwal",
    "Kamareddy",
    "Karimnagar",
    "Khammam",
    "Kumuram Bheem Asifabad",
    "Mahabubabad",
    "Mahabubnagar",
    "Mancherial",
    "Medak",
    "Medchal–Malkajgiri",
    "Mulugu",
    "Nagarkurnool",
    "Nalgonda",
    "Narayanpet",
    "Nirmal",
    "Nizamabad",
    "Peddapalli",
    "Rajanna Sircilla",
    "Rangareddy",
    "Sangareddy",
    "Siddipet",
    "Suryapet",
    "Vikarabad",
    "Wanaparthy",
    "Warangal",
    "Yadadri Bhuvanagiri"
  ],

    Tripura: [
    "Dhalai",
    "Gomati",
    "Khowai",
    "North Tripura",
    "Sepahijala",
    "South Tripura",
    "Unakoti",
    "West Tripura"
  ],

    "Uttar Pradesh": [
  "Agra",
  "Aligarh",
  "Ambedkar Nagar",
  "Amethi",
  "Amroha",
  "Auraiya",
  "Ayodhya",
  "Azamgarh",
  "Baghpat",
  "Bahraich",
  "Ballia",
  "Balrampur",
  "Banda",
  "Bara Banki",
  "Bareilly",
  "Basti",
  "Bhadohi",
  "Bijnor",
  "Budaun",
  "Bulandshahr",
  "Chandauli",
  "Chitrakoot",
  "Deoria",
  "Etah",
  "Etawah",
  "Farrukhabad",
  "Fatehpur",
  "Firozabad",
  "Gautam Buddha Nagar",
  "Ghaziabad",
  "Ghazipur",
  "Gonda",
  "Gorakhpur",
  "Hamirpur",
  "Hapur",
  "Hardoi",
  "Hathras",
  "Jalaun",
  "Jaunpur",
  "Jhansi",
  "Kannauj",
  "Kanpur Dehat",
  "Kanpur Nagar",
  "Kasganj",
  "Kaushambi",
  "Kheri",
  "Kushinagar",
  "Lalitpur",
  "Lucknow",
  "Mahoba",
  "Mahrajganj",
  "Mainpuri",
  "Mathura",
  "Mau",
  "Meerut",
  "Mirzapur",
  "Moradabad",
  "Muzaffarnagar",
  "Pilibhit",
  "Pratapgarh",
  "Prayagraj",
  "Rae Bareli",
  "Rampur",
  "Saharanpur",
  "Sambhal",
  "Sant Kabir Nagar",
  "Shahjahanpur",
  "Shamli",
  "Shrawasti",
  "Siddharthnagar",
  "Sitapur",
  "Sonbhadra",
  "Sultanpur",
  "Unnao",
  "Varanasi",
  "Other"
],


    Uttarakhand: [
    "Almora",
    "Bageshwar",
    "Chamoli",
    "Champawat",
    "Dehradun",
    "Haridwar",
    "Nainital",
    "Pauri Garhwal",
    "Pithoragarh",
    "Rudraprayag",
    "Tehri Garhwal",
    "Udham Singh Nagar",
    "Uttarkashi"
  ],

    "West Bengal": [
    "Alipurduar",
    "Bankura",
    "Birbhum",
    "Cooch Behar",
    "Dakshin Dinajpur",
    "Darjeeling",
    "Hooghly",
    "Howrah",
    "Jalpaiguri",
    "Jhargram",
    "Kalimpong",
    "Kolkata",
    "Malda",
    "Murshidabad",
    "Nadia",
    "North 24 Parganas",
    "Paschim Bardhaman",
    "Paschim Medinipur",
    "Purba Bardhaman",
    "Purba Medinipur",
    "Purulia",
    "South 24 Parganas",
    "Uttar Dinajpur"
  ],
  };

  const gradeOptions = ["Nursery", "Junior KG", "Senior KG", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

  // Format address for display
  const addressParts = [
  contactData?.address?.line1,
  contactData?.address?.city,
  `${contactData?.address?.state} - ${contactData?.address?.pinCode}`
].filter(part => part && part.trim() !== '');

const formattedAddress = addressParts.join(', ');

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden gradient-light" id="inquiry-form">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-navy-100/30 to-blue-100/20 rounded-full -translate-x-24 -translate-y-24 sm:-translate-x-32 sm:-translate-y-32 md:-translate-x-40 md:-translate-y-40 lg:-translate-x-48 lg:-translate-y-48"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-to-tl from-blue-100/20 to-navy-100/30 rounded-full translate-x-24 translate-y-24 sm:translate-x-32 sm:translate-y-32 md:translate-x-40 md:translate-y-40 lg:translate-x-48 lg:translate-y-48"></div>

      {/* Creative decorative elements */}
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
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-10 sm:mb-12 md:mb-14 lg:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-500"></div>
            <h2 className="font-title text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gradient-navy">Enquiry Form</h2>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-500"></div>
          </div>

          <motion.div
            className="h-1 sm:h-1.5 w-16 sm:w-20 md:w-24 gradient-navy mx-auto mb-6 sm:mb-7 md:mb-8 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: "4rem" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          />
          <p className="text-navy-700 max-w-2xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl px-2 sm:px-4">
            Fill out the form below and our admission team will contact you within 24 hours
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Contact Info Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-6 sm:p-7 md:p-8 h-full border border-navy-100">
              <div className="flex items-center gap-3 mb-5 sm:mb-6 pb-3 sm:pb-4 border-b border-navy-100">
                <div className="relative">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-navy-600 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center text-white">
                    <FileText className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                    <Star className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-navy-800">Quick Contact</h3>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="h-1 w-4 sm:w-6 bg-navy-500 rounded-full"></div>
                    <div className="h-1 w-2 sm:w-3 bg-blue-500 rounded-full"></div>
                    <div className="h-1 w-1 sm:w-2 bg-navy-400 rounded-full"></div>
                  </div>
                </div>
              </div>

              <div className="space-y-5 sm:space-y-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-navy-50 to-blue-50 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-navy-600" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-navy-600 mb-1">Call Us</p>
                    <p className="text-base sm:text-lg font-semibold text-navy-800">{contactData.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-navy-50 to-blue-50 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-navy-600" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-navy-600 mb-1">Email Us</p>
                    <p className="text-base sm:text-lg font-semibold text-navy-800 break-words">{contactData.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-navy-50 to-blue-50 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-navy-600" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-navy-600 mb-1">Visit Us</p>
                    <p className="text-sm sm:text-base font-semibold text-navy-800">
                      {formattedAddress.split(', ').map((line, i) => (
                        <React.Fragment key={i}>
                          {line}
                          {i < 2 && <br />}
                        </React.Fragment>
                      ))}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 md:pt-8 border-t border-navy-100">
                <p className="text-xs sm:text-sm text-navy-600">
                  <span className="font-semibold">Response Time:</span> {contactData.responseTime}
                </p>
                <p className="text-xs sm:text-sm text-navy-600 mt-2">
                  <span className="font-semibold">Office Hours:</span> {contactData.officeHours}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Form Section */}
          <div className="lg:col-span-2">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-6 sm:p-8 md:p-10 lg:p-12 text-center border border-navy-100"
              >
                <div className="mx-auto flex h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 items-center justify-center rounded-full bg-gradient-to-br from-green-50 to-emerald-50 mb-6 sm:mb-8">
                  <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-green-600" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-navy-900 mb-3 sm:mb-4">Thank You for Your Enquiry!</h3>
                <p className="text-navy-600 mb-6 sm:mb-8 text-sm sm:text-base md:text-lg">
                  We have received your details. Our admission team will contact you shortly at
                  <span className="font-semibold text-navy-600"> {formData.email}</span> or
                  <span className="font-semibold text-navy-600"> +91 {formData.mobileNumber}</span>.
                </p>
                <button
                  onClick={resetForm}
                  className="group px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-4 gradient-navy text-white rounded-lg sm:rounded-xl font-semibold hover:shadow-lg transition-all duration-300 shadow-md hover:-translate-y-1 transform flex items-center gap-2 sm:gap-3 mx-auto text-sm sm:text-base"
                >
                  <span>Submit Another Enquiry</span>
                  <Send className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ) : (
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden border border-navy-100">
                <div className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
                  {submitError && (
                    <div className="mb-6 bg-gradient-to-br from-red-50 to-rose-50 rounded-lg p-4 border border-red-200">
                      <div className="flex items-center gap-3">
                        <AlertCircle className="h-5 w-5 text-red-600" />
                        <p className="text-red-700 text-sm sm:text-base">{submitError}</p>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 md:space-y-10">
                    {/* Row 1: First Name | Last Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                      {["firstName", "lastName"].map((field) => (
                        <motion.div
                          key={field}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: field === "firstName" ? 0.1 : 0.2 }}
                          viewport={{ once: true }}
                        >
                          <label className="block text-xs sm:text-sm font-semibold text-navy-700 mb-2 sm:mb-3">
                            {field === "firstName" ? "Student First Name *" : "Last Name *"}
                          </label>
                          <input
                            type="text"
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            className={`block w-full rounded-lg sm:rounded-xl border ${
                              errors[field] ? "border-red-500" : "border-navy-200"
                            } px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 text-sm sm:text-base placeholder-navy-400 focus:border-navy-500 focus:outline-none focus:ring-3 focus:ring-navy-500/20 transition-all duration-300 bg-white`}
                            placeholder={`Enter student's ${field === "firstName" ? "first" : "last"} name`}
                          />
                          {errors[field] && (
                            <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600 flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" />
                              {errors[field]}
                            </p>
                          )}
                        </motion.div>
                      ))}
                    </div>

                    {/* Row 2: Grade | Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                      {["grade", "email"].map((field) => (
                        <motion.div
                          key={field}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: field === "grade" ? 0.3 : 0.4 }}
                          viewport={{ once: true }}
                        >
                          <label className="block text-xs sm:text-sm font-semibold text-navy-700 mb-2 sm:mb-3">
                            {field === "grade" ? "Grade Seeking Admission For *" : "Email Address *"}
                          </label>
                          {field === "grade" ? (
                            <select
                              name="grade"
                              value={formData.grade}
                              onChange={handleChange}
                              className={`block w-full rounded-lg sm:rounded-xl border ${
                                errors.grade ? "border-red-500" : "border-navy-200"
                              } px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 text-sm sm:text-base focus:border-navy-500 focus:outline-none focus:ring-3 focus:ring-navy-500/20 transition-all duration-300 bg-white`}
                            >
                              <option value="">Select Grade</option>
                              {gradeOptions.map((grade) => (
                                <option key={grade} value={grade}>
                                  {grade}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              className={`block w-full rounded-lg sm:rounded-xl border ${
                                errors.email ? "border-red-500" : "border-navy-200"
                              } px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 text-sm sm:text-base placeholder-navy-400 focus:border-navy-500 focus:outline-none focus:ring-3 focus:ring-navy-500/20 transition-all duration-300 bg-white`}
                              placeholder="Enter parent's email address"
                            />
                          )}
                          {errors[field] && (
                            <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600 flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" />
                              {errors[field]}
                            </p>
                          )}
                        </motion.div>
                      ))}
                    </div>

                    {/* Row 3: Mobile Number */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <label className="block text-xs sm:text-sm font-semibold text-navy-700 mb-2 sm:mb-3">
                        Mobile Number *
                      </label>
                      <div className="space-y-2">
                        <div className="flex rounded-lg sm:rounded-xl shadow-sm bg-white">
                          <span className="inline-flex items-center rounded-l-lg sm:rounded-l-xl border border-r-0 border-navy-200 bg-navy-50 px-3 sm:px-4 md:px-6 text-sm sm:text-base text-navy-500">
                            +91
                          </span>
                          <input
                            type="tel"
                            name="mobileNumber"
                            value={formData.mobileNumber}
                            onChange={handleChange}
                            onBlur={() => setMobileValidation((prev) => ({ ...prev, isTouched: true }))}
                            maxLength="10"
                            className={`block w-full rounded-none rounded-r-lg sm:rounded-r-xl border ${
                              errors.mobileNumber
                                ? "border-red-500"
                                : mobileValidation.isValid && mobileValidation.isTouched
                                ? "border-green-500"
                                : "border-navy-200"
                            } px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 text-sm sm:text-base placeholder-navy-400 focus:border-navy-500 focus:outline-none focus:ring-3 focus:ring-navy-500/20 transition-all duration-300`}
                            placeholder="98765 43210"
                          />
                        </div>

                        {/* Mobile validation feedback */}
                        {mobileValidation.isTouched && formData.mobileNumber && (
                          <div className="mt-1">
                            {mobileValidation.isValid ? (
                              <div className="space-y-1">
                                <p className="text-green-600 text-xs flex items-center gap-1">
                                  <Check className="h-3 w-3" />
                                  Valid {mobileValidation.operator} number ({mobileValidation.prefix} series)
                                </p>
                                <div className="flex items-center gap-2">
                                  <div className="flex-1 h-1 bg-green-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 rounded-full" style={{ width: "100%" }}></div>
                                  </div>
                                  <span className="text-xs text-green-600">✓ Valid number</span>
                                </div>
                              </div>
                            ) : mobileValidation.message ? (
                              <p className="text-amber-600 text-xs flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" />
                                {mobileValidation.message}
                              </p>
                            ) : null}
                          </div>
                        )}

                        <p className="text-xs text-navy-400">Valid Indian numbers start with 6, 7, 8, or 9</p>

                        {errors.mobileNumber && (
                          <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.mobileNumber}
                          </p>
                        )}
                      </div>
                    </motion.div>

                    {/* Row 4: Location */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.55 }}
                      viewport={{ once: true }}
                    >
                      <label className="block text-xs sm:text-sm font-semibold text-navy-700 mb-2 sm:mb-3">Location *</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className={`block w-full rounded-lg sm:rounded-xl border ${
                          errors.location ? "border-red-500" : "border-navy-200"
                        } px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 text-sm sm:text-base placeholder-navy-400 focus:border-navy-500 focus:outline-none focus:ring-3 focus:ring-navy-500/20 transition-all duration-300 bg-white`}
                        placeholder="Enter your city/town"
                      />
                      {errors.location && (
                        <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.location}
                        </p>
                      )}
                    </motion.div>

                    {/* Row 5: State, District */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* State Dropdown */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        viewport={{ once: true }}
                      >
                        <label className="block text-xs sm:text-sm font-semibold text-navy-700 mb-2 sm:mb-3">State *</label>
                        <select
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          className={`block w-full rounded-lg sm:rounded-xl border ${
                            errors.state ? "border-red-500" : "border-navy-200"
                          } px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 text-sm sm:text-base focus:border-navy-500 focus:outline-none focus:ring-3 focus:ring-navy-500/20 transition-all duration-300 bg-white`}
                        >
                          <option value="">Select State</option>
                          {states.map((state) => (
                            <option key={state} value={state}>
                              {state}
                            </option>
                          ))}
                        </select>
                        {errors.state && (
                          <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.state}
                          </p>
                        )}
                      </motion.div>

                      {/* District Dropdown */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.65 }}
                        viewport={{ once: true }}
                      >
                        <label className="block text-xs sm:text-sm font-semibold text-navy-700 mb-2 sm:mb-3">District *</label>
                        <select
                          name="district"
                          value={formData.district}
                          onChange={handleChange}
                          disabled={!formData.state}
                          className={`block w-full rounded-lg sm:rounded-xl border ${
                            errors.district ? "border-red-500" : "border-navy-200"
                          } px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 text-sm sm:text-base focus:border-navy-500 focus:outline-none focus:ring-3 focus:ring-navy-500/20 transition-all duration-300 bg-white disabled:bg-gray-50 disabled:cursor-not-allowed`}
                        >
                          <option value="">{formData.state ? "Select District" : "Select State First"}</option>
                          {formData.state &&
                            districts[formData.state]?.map((district) => (
                              <option key={district} value={district}>
                                {district}
                              </option>
                            ))}
                        </select>
                        {errors.district && (
                          <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.district}
                          </p>
                        )}
                      </motion.div>
                    </div>

                    {/* Row 6: Pin Code */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      viewport={{ once: true }}
                    >
                      <label className="block text-xs sm:text-sm font-semibold text-navy-700 mb-2 sm:mb-3">Pin Code *</label>
                      <input
                        type="text"
                        name="pinCode"
                        value={formData.pinCode}
                        onChange={handleChange}
                        maxLength="6"
                        className={`block w-full rounded-lg sm:rounded-xl border ${
                          errors.pinCode ? "border-red-500" : "border-navy-200"
                        } px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 text-sm sm:text-base placeholder-navy-400 focus:border-navy-500 focus:outline-none focus:ring-3 focus:ring-navy-500/20 transition-all duration-300 bg-white`}
                        placeholder="6-digit Pin Code"
                      />
                      {errors.pinCode && (
                        <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.pinCode}
                        </p>
                      )}
                    </motion.div>

                    {/* Validation summary */}
                    {Object.keys(errors).length > 0 && (
                      <div className="p-4 bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-lg">
                        <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2 text-sm sm:text-base">
                          <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                          Please fix the following errors:
                        </h4>
                        <ul className="list-disc list-inside text-red-700 text-xs sm:text-sm space-y-1">
                          {errors.firstName && <li>First Name: {errors.firstName}</li>}
                          {errors.lastName && <li>Last Name: {errors.lastName}</li>}
                          {errors.grade && <li>Grade: {errors.grade}</li>}
                          {errors.email && <li>Email: {errors.email}</li>}
                          {errors.mobileNumber && <li>Mobile Number: {errors.mobileNumber}</li>}
                          {errors.location && <li>Location: {errors.location}</li>}
                          {errors.state && <li>State: {errors.state}</li>}
                          {errors.district && <li>District: {errors.district}</li>}
                          {errors.pinCode && <li>Pin Code: {errors.pinCode}</li>}
                        </ul>
                      </div>
                    )}

                    {/* Terms & Submit */}
                    <div className="pt-6 sm:pt-8 md:pt-10 border-t border-navy-200">
                      <div className="flex items-start mb-6 sm:mb-8">
                        <input
                          id="terms"
                          name="terms"
                          type="checkbox"
                          required
                          className="h-4 w-4 sm:h-5 sm:w-5 text-navy-600 focus:ring-navy-500 border-navy-300 rounded mt-1"
                        />
                        <label htmlFor="terms" className="ml-3 block text-xs sm:text-sm text-navy-700">
                          I agree to receive communication from the school regarding admission procedures, events, and updates. I confirm that all information provided is accurate to the best of my knowledge.
                        </label>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6">
                        <motion.button
                          type="submit"
                          disabled={isSubmitting}
                          className="flex-1 group px-4 sm:px-6 md:px-8 lg:px-10 py-3 sm:py-3.5 md:py-4 gradient-navy text-white rounded-lg sm:rounded-xl font-semibold focus:outline-none focus:ring-3 focus:ring-navy-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1 transform flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {isSubmitting ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 border-b-2 border-white"></div>
                              <span className="text-xs sm:text-sm md:text-base">Submitting...</span>
                            </>
                          ) : (
                            <>
                              <span>Submit Enquiry</span>
                              <Send className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                            </>
                          )}
                        </motion.button>

                        <button
                          type="button"
                          onClick={resetForm}
                          className="px-4 sm:px-6 md:px-8 lg:px-10 py-3 sm:py-3.5 md:py-4 border border-navy-300 sm:border-2 rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold text-navy-700 bg-white hover:bg-navy-50 focus:outline-none focus:ring-3 focus:ring-navy-200 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1 transform"
                        >
                          Reset Form
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom decorative element */}
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
    </section>
  );
};

export default Inquiry;




// ---------------------------------------------------------------------------------------------------------------------------------
// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import {
//   CheckCircle,
//   Send,
//   MapPin,
//   Phone,
//   Mail,
//   AlertCircle,
//   Check,
//   Shield,
//   FileText,
//   Star,
//   Cloud,
//   Sun,
//   MessageCircle,
//   MailCheck,
//   Sparkles,
// } from "lucide-react";

// const Inquiry = () => {
//   // Fixed: Added state, district, and pinCode to initial state
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     grade: "",
//     email: "",
//     mobileNumber: "",
//     location: "",
//     state: "",
//     district: "",
//     pinCode: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [submitError, setSubmitError] = useState("");
//   const [mobileValidation, setMobileValidation] = useState({
//     isValid: false,
//     message: "",
//     prefix: "",
//     operator: "",
//     isTouched: false,
//   });

//   // Enhanced TRAI-approved Indian mobile number prefixes with operator info
//   const mobileOperators = {
//     // Jio
//     70: "Jio", 72: "Jio", 73: "Jio", 74: "Jio", 75: "Jio", 76: "Jio", 77: "Jio", 78: "Jio", 79: "Jio",
//     // Airtel
//     98: "Airtel", 99: "Airtel", 96: "Airtel", 97: "Airtel", 81: "Airtel", 84: "Airtel", 85: "Airtel", 86: "Airtel", 88: "Airtel", 89: "Airtel", 82: "Airtel", 83: "Airtel",
//     // Vodafone Idea
//     90: "Vodafone Idea", 91: "Vodafone Idea", 92: "Vodafone Idea", 93: "Vodafone Idea", 94: "Vodafone Idea", 95: "Vodafone Idea",
//     // BSNL
//     80: "BSNL",
//     // MTNL
//     87: "MTNL",
//     // Reliance Communications
//     60: "Reliance", 61: "Reliance", 62: "Reliance", 63: "Reliance", 64: "Reliance", 65: "Reliance", 66: "Reliance", 67: "Reliance", 68: "Reliance", 69: "Reliance",
//     // Tata Docomo
//     50: "Tata Docomo", 51: "Tata Docomo", 52: "Tata Docomo", 53: "Tata Docomo", 54: "Tata Docomo", 55: "Tata Docomo", 56: "Tata Docomo", 57: "Tata Docomo", 58: "Tata Docomo", 59: "Tata Docomo",
//   };

//   const validPrefixes = Object.keys(mobileOperators);

//   // Enhanced mobile validation function
//   const validateMobileNumber = (mobileNo) => {
//     setMobileValidation((prev) => ({
//       ...prev,
//       isValid: false,
//       message: "",
//       prefix: "",
//       operator: "",
//     }));

//     if (!mobileNo) return "Mobile number is required";
//     if (!/^\d{10}$/.test(mobileNo)) return "Mobile number must be exactly 10 digits";

//     const prefix = mobileNo.substring(0, 2);
//     const operator = mobileOperators[prefix];

//     if (!validPrefixes.includes(prefix)) return "Please enter a valid Indian mobile number";

//     const invalidPatterns = [
//       /^(\d)\1{9}$/, // All same digits
//       /^1234567890$/, /^0123456789$/, /^2345678901$/, /^0987654321$/, /^9876543210$/, /^8765432109$/,
//       /^(\d{2})\1{4}$/, /^(\d{3})\1{3}$/, /^(\d{4})\1{2}$/, /^(\d{5})\1$/,
//       /^1111111111$/, /^2222222222$/, /^3333333333$/, /^4444444444$/, /^5555555555$/,
//       /^6666666666$/, /^7777777777$/, /^8888888888$/, /^9999999999$/, /^0000000000$/,
//       /^(\d)(\d)(\d)(\d)(\d)(\d)\6\5\4\3\2\1$/, /^(\d)(\d)(\d)(\d)(\d)\5\4\3\2\1$/,
//       /^9998887776$/, /^8887776665$/, /^7776665554$/, /^6665554443$/, /^5554443332$/,
//       /^1231231234$/, /^9879879876$/, /^4564564567$/,
//     ];

//     for (const pattern of invalidPatterns) {
//       if (pattern.test(mobileNo)) return "Please enter a valid mobile number (test/fake numbers not allowed)";
//     }

//     setMobileValidation((prev) => ({
//       ...prev,
//       isValid: true,
//       message: `Valid ${operator || "Indian"} number`,
//       prefix: prefix,
//       operator: operator || "Unknown",
//     }));

//     return null;
//   };

//   const handleMobileChange = (e) => {
//     const value = e.target.value.replace(/\D/g, "").slice(0, 10);

//     setFormData((prev) => ({ ...prev, mobileNumber: value }));

//     if (errors.mobileNumber) setErrors((prev) => ({ ...prev, mobileNumber: "" }));
//     setSubmitError("");

//     if (value.length === 10) {
//       const error = validateMobileNumber(value);
//       if (error) setErrors((prev) => ({ ...prev, mobileNumber: error }));
//     } else if (value.length > 0) {
//       setMobileValidation((prev) => ({
//         ...prev,
//         isValid: false,
//         message: "Enter 10-digit mobile number",
//         prefix: "",
//         operator: "",
//         isTouched: true,
//       }));
//     } else {
//       setMobileValidation((prev) => ({
//         ...prev,
//         isValid: false,
//         message: "",
//         prefix: "",
//         operator: "",
//         isTouched: true,
//       }));
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "mobileNumber") {
//       handleMobileChange(e);
//       return;
//     }

//     // Validation: Prevent numbers in name fields
//     if ((name === "firstName" || name === "lastName") && /[0-9]/.test(value)) {
//       return;
//     }

//      // ✅ NEW: Prevent special characters in name fields
//   if (
//     (name === "firstName" || name === "lastName") &&
//     /[.,\/';\\]/.test(value)
//   ) {
//     return;
//   }
    
//     // Validation: Pin code should only be numbers
//     if (name === "pinCode" && /[^0-9]/.test(value)) {
//       return;
//     }

//     // Logic: Reset district if state changes
//     if (name === "state") {
//       setFormData({
//         ...formData,
//         state: value,
//         district: "", // Reset district
//       });
//     } else {
//       setFormData({
//         ...formData,
//         [name]: value,
//       });
//     }

//     if (errors[name]) {
//       setErrors({
//         ...errors,
//         [name]: "",
//       });
//     }
//     setSubmitError("");
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     // Name validations
//     if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
//     else if (formData.firstName.trim().length < 2) newErrors.firstName = "First name must be at least 2 characters";

//     if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
//     else if (formData.lastName.trim().length < 2) newErrors.lastName = "Last name must be at least 2 characters";

//     if (!formData.grade) newErrors.grade = "Please select a grade";

//     // Email validation
//     if (!formData.email.trim()) newErrors.email = "Email is required";
//     else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Please enter a valid email address";

//     // Mobile number validation
//     if (!formData.mobileNumber.trim()) newErrors.mobileNumber = "Mobile number is required";
//     else {
//       const mobileError = validateMobileNumber(formData.mobileNumber);
//       if (mobileError) newErrors.mobileNumber = mobileError;
//     }

//     if (!formData.location.trim()) newErrors.location = "Location is required";
    
//     // New Fields Validation
//     if (!formData.state) newErrors.state = "State is required";
//     if (!formData.district) newErrors.district = "District is required";
//     if (!formData.pinCode) newErrors.pinCode = "Pin Code is required";
//     else if (formData.pinCode.length !== 6) newErrors.pinCode = "Pin Code must be 6 digits";

//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formErrors = validateForm();

//     if (Object.keys(formErrors).length > 0) {
//       setErrors(formErrors);
//       const firstError = Object.keys(formErrors)[0];
//       const element = document.getElementsByName(firstError)[0];
//       if (element) {
//         element.scrollIntoView({ behavior: "smooth", block: "center" });
//         element.focus();
//       }
//       return;
//     }

//     const mobileError = validateMobileNumber(formData.mobileNumber);
//     if (mobileError) {
//       setErrors((prev) => ({ ...prev, mobileNumber: mobileError }));
//       const element = document.getElementsByName("mobileNumber")[0];
//       if (element) {
//         element.scrollIntoView({ behavior: "smooth", block: "center" });
//         element.focus();
//       }
//       return;
//     }

//     setIsSubmitting(true);
//     setSubmitError("");

//     try {
//       await new Promise((resolve) => setTimeout(resolve, 1500));
//       console.log("Form submitted:", formData);
//       setIsSubmitted(true);
//       setTimeout(() => {
//         resetForm();
//       }, 3000);
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       setSubmitError("Failed to submit form. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       firstName: "",
//       lastName: "",
//       grade: "",
//       email: "",
//       mobileNumber: "",
//       location: "",
//       state: "",
//       district: "",
//       pinCode: "",
//     });
//     setErrors({});
//     setSubmitError("");
//     setIsSubmitted(false);
//     setMobileValidation({
//       isValid: false,
//       message: "",
//       prefix: "",
//       operator: "",
//       isTouched: false,
//     });
//   };

//   const popularLocations = [
//     "Delhi", "Mumbai", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad",
//     "Nagpur", "Nashik", "Aurangabad", "Solapur", "Kolhapur", "Amravati",
//     "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar",
//     "Mysore", "Mangalore", "Hubli", "Belgaum", "Davangere",
//     "Warangal", "Karimnagar", "Nizamabad",
//     "Coimbatore", "Madurai", "Trichy", "Salem", "Erode", "Tirunelveli",
//     "Howrah", "Durgapur", "Siliguri", "Asansol",
//     "Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer", "Bikaner",
//     "Lucknow", "Kanpur", "Agra", "Varanasi", "Prayagraj", "Meerut", "Noida", "Greater Noida", "Ghaziabad",
//     "Gurgaon", "Faridabad", "Panipat", "Sonipat", "Karnal",
//     "Chandigarh", "Ludhiana", "Amritsar", "Jalandhar", "Patiala",
//     "Dehradun", "Haridwar", "Roorkee", "Haldwani",
//     "Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain",
//     "Patna", "Gaya", "Bhagalpur", "Muzaffarpur",
//     "Ranchi", "Jamshedpur", "Dhanbad",
//     "Bhubaneswar", "Cuttack", "Rourkela", "Sambalpur",
//     "Raipur", "Bilaspur", "Durg", "Bhilai",
//     "Guwahati", "Dibrugarh", "Silchar",
//     "Kochi", "Trivandrum", "Kozhikode", "Thrissur",
//     "Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Tirupati",
//     "Panaji", "Margao",
//     "Shimla", "Solan", "Dharamshala",
//     "Srinagar", "Jammu",
//     "Imphal", "Shillong", "Aizawl", "Agartala", "Kohima", "Itanagar",
//     "Puducherry", "Port Blair", "Daman", "Diu", "Silvassa",
//   ];

//   const states = [
//     "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
//     "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
//     "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
//     "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
//   ];

//    const districts = {
//     "Andhra Pradesh": [
//     // Coastal & North Coastal Districts
//     "Srikakulam",
//     "Parvathipuram Manyam",
//     "Visakhapatnam",
//     "Vizianagaram",
//     "Anakapalli",
//     "Kakinada",
//     "Dr. B.R. Ambedkar Konaseema",
//     "Alluri Sitarama Raju (ASR)",
//     "East Godavari",
//     "Eluru",
//     "West Godavari (Bhimavaram)",
//     "Krishna",

//     // Central & Rayalaseema Districts
//     "NTR District (Vijayawada)",
//     "Guntur",
//     "Bapatla",
//     "Palnadu",
//     "Prakasam",
//     "Sri Potti Sriramulu Nellore (SPSR Nellore)",
//     "Tirupati",
//     "Chittoor",
//     "Annamayya (Rayachoti)",
//     "YSR Kadapa",
//     "Anantapur",
//     "Sri Satya Sai (Puttaparthi)",
//     "Kurnool",
//     "Nandyal",
//     "Sri Balaji District",

//     "Other"
//   ],

//     "Arunachal Pradesh": [
//   "Anjaw (Hawai)",
//   "Bichom (Napangphung)",
//   "Changlang (Changlang)",
//   "Dibang Valley (Anini)",
//   "East Kameng (Seppa)",
//   "East Siang (Pasighat)",
//   "Itanagar (Itanagar - Capital)",
//   "Kamle (Raga)",
//   "Keyi Panyor (Yachuli)",
//   "Kra Daadi (Jamin)",
//   "Kurung Kumey (Koloriang)",
//   "Lepa-Rada (Basar)",
//   "Lohit (Tezu)",
//   "Longding (Longding)",
//   "Lower Dibang Valley (Roing)",
//   "Lower Siang (Likabali)",
//   "Lower Subansiri (Ziro)",
//   "Namsai (Namsai)",
//   "Pakke-Kessang (Lemmi)",
//   "Papum Pare (Yupia)",
//   "Shi-Yomi (Tato)",
//   "Siang (Boleng)",
//   "Tawang (Tawang Town)",
//   "Tirap (Khonsa)",
//   "Upper Siang (Yingkiong)",
//   "Upper Subansiri (Daporijo)",
//   "West Kameng (Bomdila)",
//   "West Siang (Aalo)",
//   "Other"
// ],


//     Assam: [
//   "Baksa",
//   "Barpeta",
//   "Biswanath",
//   "Bongaigaon",
//   "Cachar",
//   "Charaideo",
//   "Chirang",
//   "Darrang",
//   "Dhemaji",
//   "Dhubri",
//   "Dibrugarh",
//   "Dima Hasao",
//   "Goalpara",
//   "Golaghat",
//   "Hailakandi",
//   "Hojai",
//   "Jorhat",
//   "Kamrup",
//   "Kamrup Metropolitan",
//   "Karbi Anglong",
//   "Karimganj",
//   "Kokrajhar",
//   "Lakhimpur",
//   "Majuli",
//   "Morigaon",
//   "Nagaon",
//   "Nalbari",
//   "Sivasagar",
//   "Sonitpur",
//   "South Salmara-Mankachar",
//   "Tinsukia",
//   "Tamulpur",
//   "Udalguri",
//   "West Karbi Anglong",
//   "Other"
// ],


//     Bihar: ["Araria",
//       "Arwal",
//       "Aurangabad",
//       "Banka",
//       "Begusarai",
//       "Bhagalpur",
//       "Bhojpur",
//       "Buxar",
//       "Darbhanga",
//       "East Champaran",
//       "Gaya",
//       "Gopalganj",
//       "Jamui",
//       "Jehanabad",
//       "Kaimur",
//       "Katihar",
//       "Khagaria",
//       "Kishanganj",
//       "Lakhisarai",
//       "Madhepura",
//       "Madhubani",
//       "Munger",
//       "Muzaffarpur",
//       "Nalanda",
//       "Nawada",
//       "Patna",
//       "Purnia",
//       "Rohtas",
//       "Saharsa",
//       "Samastipur",
//       "Saran",
//       "Sheikhpura",
//       "Sheohar",
//       "Sitamarhi",
//       "Siwan",
//       "Supaul",
//       "Vaishali",
//       "West Champaran"
//     ],

//     "Chhattisgarh": [
//     "Balod",
//     "Baloda Bazar-Bhatapara",
//     "Balrampur-Ramanujganj",
//     "Bastar",
//     "Bemetara",
//     "Bijapur",
//     "Bilaspur",
//     "Dantewada (South Bastar)",
//     "Dhamtari",
//     "Durg",
//     "Gariaband",
//     "Gaurella-Pendra-Marwahi",
//     "Janjgir-Champa",
//     "Jashpur",
//     "Kabirdham (Kawardha)",
//     "Kanker (North Bastar)",
//     "Khairagarh-Chhuikhadan-Gandai",
//     "Korba",
//     "Koriya",
//     "Mahasamund",
//     "Manendragarh-Chirmiri-Bharatpur",
//     "Mohla-Manpur-Ambagarh Chowki",
//     "Mungeli",
//     "Narayanpur",
//     "Raigarh",
//     "Raipur",
//     "Rajnandgaon",
//     "Sakthi",
//     "Sarangarh-Bilaigarh",
//     "Sukma",
//     "Surajpur",
//     "Surguja",
//     "Utai"
//   ],

//     Goa: ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Other"],

//     Gujarat: [
//     "Ahmedabad",
//     "Amreli",
//     "Anand",
//     "Aravalli",
//     "Banaskantha",
//     "Bharuch",
//     "Bhavnagar",
//     "Botad",
//     "Chhota Udaipur",
//     "Dahod",
//     "Dang",
//     "Devbhoomi Dwarka",
//     "Gandhinagar",
//     "Gir Somnath",
//     "Jamnagar",
//     "Junagadh",
//     "Kachchh",
//     "Kheda",
//     "Mahisagar",
//     "Mehsana",
//     "Morbi",
//     "Narmada",
//     "Navsari",
//     "Panchmahal",
//     "Patan",
//     "Porbandar",
//     "Rajkot",
//     "Sabarkantha",
//     "Surat",
//     "Surendranagar",
//     "Tapi",
//     "Vadodara",
//     "Valsad"
//   ],

//     Haryana: [
//     "Ambala",
//     "Bhiwani",
//     "Charkhi Dadri",
//     "Faridabad",
//     "Fatehabad",
//     "Gurugram",
//     "Hisar",
//     "Jhajjar",
//     "Jind",
//     "Kaithal",
//     "Karnal",
//     "Kurukshetra",
//     "Mahendragarh",
//     "Nuh",
//     "Palwal",
//     "Panchkula",
//     "Panipat",
//     "Rewari",
//     "Rohtak",
//     "Sirsa",
//     "Sonipat",
//     "Yamunanagar"
//   ],

//     "Himachal Pradesh": [
//     "Bilaspur",
//     "Chamba",
//     "Hamirpur",
//     "Kangra",
//     "Kinnaur",
//     "Kullu",
//     "Lahaul And Spiti",
//     "Mandi",
//     "Shimla",
//     "Sirmaur",
//     "Solan",
//     "Una"
//   ],

//     "Jharkhand": [
//     "Bokaro",
//     "Chatra",
//     "Deoghar",
//     "Dhanbad",
//     "Dumka",
//     "East Singhbhum",
//     "Garhwa",
//     "Giridih",
//     "Godda",
//     "Gumla",
//     "Hazaribagh",
//     "Jamtara",
//     "Khunti",
//     "Koderma",
//     "Latehar",
//     "Lohardaga",
//     "Pakur",
//     "Palamu",
//     "Ramgarh",
//     "Ranchi",
//     "Sahebganj",
//     "Saraikela Kharsawan",
//     "Simdega",
//     "West Singhbhum"
//   ],

//     "Karnataka": [
//     "Bagalkot",
//     "Ballari",
//     "Belagavi",
//     "Bengaluru Rural",
//     "Bengaluru Urban",
//     "Bidar",
//     "Chamarajanagara",
//     "Chikkaballapura",
//     "Chikkamagaluru",
//     "Chitradurga",
//     "Dakshina Kannada",
//     "Davanagere",
//     "Dharwad",
//     "Gadag",
//     "Hassan",
//     "Haveri",
//     "Kalaburagi",
//     "Kodagu",
//     "Kolar",
//     "Koppal",
//     "Mandya",
//     "Mysuru",
//     "Raichur",
//     "Ramanagara",
//     "Shivamogga",
//     "Tumakuru",
//     "Udupi",
//     "Uttara Kannada",
//     "Vijayapura",
//     "Vijayanagara",
//     "Yadgiri"
//   ],

//     "Kerala": [
//     "Alappuzha",
//     "Ernakulam",
//     "Idukki",
//     "Kannur",
//     "Kasaragod",
//     "Kollam",
//     "Kottayam",
//     "Kozhikode",
//     "Malappuram",
//     "Palakkad",
//     "Pathanamthitta",
//     "Thiruvananthapuram",
//     "Thrissur",
//     "Wayanad"
//   ],

//    "Madhya Pradesh": [
//     "Agar Malwa",
//     "Alirajpur",
//     "Anuppur",
//     "Ashoknagar",
//     "Balaghat",
//     "Barwani",
//     "Betul",
//     "Bhind",
//     "Bhopal",
//     "Burhanpur",
//     "Chhatarpur",
//     "Chhindwara",
//     "Damoh",
//     "Datia",
//     "Dewas",
//     "Dhar",
//     "Dindori",
//     "Guna",
//     "Gwalior",
//     "Harda",
//     "Indore",
//     "Jabalpur",
//     "Jhabua",
//     "Katni",
//     "Khandwa",
//     "Khargone",
//     "Maihar",
//     "Mandla",
//     "Mandsaur",
//     "Mauganj",
//     "Morena",
//     "Narmadapuram",
//     "Narsinghpur",
//     "Neemuch",
//     "Niwari",
//     "Pandhurna",
//     "Panna",
//     "Raisen",
//     "Rajgarh",
//     "Ratlam",
//     "Rewa",
//     "Sagar",
//     "Satna",
//     "Sehore",
//     "Seoni",
//     "Shahdol",
//     "Shajapur",
//     "Sheopur",
//     "Shivpuri",
//     "Sidhi",
//     "Singrauli",
//     "Tikamgarh",
//     "Ujjain",
//     "Umaria",
//     "Vidisha"
//   ],

//     "Maharashtra": [
//     "Ahmednagar",
//     "Akola",
//     "Amravati",
//     "Aurangabad",
//     "Beed",
//     "Bhandara",
//     "Buldhana",
//     "Chandrapur",
//     "Dhule",
//     "Gadchiroli",
//     "Gondia",
//     "Hingoli",
//     "Jalgaon",
//     "Jalna",
//     "Kolhapur",
//     "Latur",
//     "Mumbai City",
//     "Mumbai Suburban",
//     "Nagpur",
//     "Nanded",
//     "Nandurbar",
//     "Nashik",
//     "Osmanabad",
//     "Palghar",
//     "Parbhani",
//     "Pune",
//     "Raigad",
//     "Ratnagiri",
//     "Sangli",
//     "Satara",
//     "Sindhudurg",
//     "Solapur",
//     "Thane",
//     "Wardha",
//     "Washim",
//     "Yavatmal"
//   ],


//     "Manipur": [
//     "Bishnupur",
//     "Chandel",
//     "Churachandpur",
//     "Imphal East",
//     "Imphal West",
//     "Jiribam",
//     "Kakching",
//     "Kamjong",
//     "Kangpokpi",
//     "Noney",
//     "Pherzawl",
//     "Senapati",
//     "Tamenglong",
//     "Tengnoupal",
//     "Thoubal",
//     "Ukhrul"
//   ],

//      "Meghalaya": [
//     "East Khasi Hills",
//     "West Khasi Hills",
//     "South West Khasi Hills",
//     "Eastern West Khasi Hills",
//     "Ri-Bhoi",
//     "West Jaintia Hills",
//     "East Jaintia Hills",
//     "North Garo Hills",
//     "East Garo Hills",
//     "West Garo Hills",
//     "South West Garo Hills",
//     "South Garo Hills"
//   ],

//     "Mizoram": [
//     "Aizawl",
//     "Champhai",
//     "Hnahthial",
//     "Khawzawl",
//     "Kolasib",
//     "Lawngtlai",
//     "Lunglei",
//     "Mamit",
//     "Saitual",
//     "Serchhip",
//     "Siaha"
//   ],

//     "Nagaland": [
//     "Chumoukedima",
//     "Dimapur",
//     "Kiphire",
//     "Kohima",
//     "Longleng",
//     "Meluri",
//     "Mokokchung",
//     "Mon",
//     "Niuland",
//     "Noklak",
//     "Peren",
//     "Phek",
//     "Shamator",
//     "Tseminyu",
//     "Tuensang",
//     "Wokha",
//     "Zunheboto"
//   ],

//     "Odisha": [
//     "Angul",
//     "Balangir",
//     "Balasore",
//     "Bargarh",
//     "Bhadrak",
//     "Boudh",
//     "Cuttack",
//     "Deogarh",
//     "Dhenkanal",
//     "Gajapati",
//     "Ganjam",
//     "Jagatsinghapur",
//     "Jajpur",
//     "Jharsuguda",
//     "Kalahandi",
//     "Kandhamal",
//     "Kendrapara",
//     "Keonjhar",
//     "Khordha",
//     "Koraput",
//     "Malkangiri",
//     "Mayurbhanj",
//     "Nabarangpur",
//     "Nayagarh",
//     "Nuapada",
//     "Puri",
//     "Rayagada",
//     "Sambalpur",
//     "Subarnapur",
//     "Sundargarh"
//   ],

//      "Punjab": [
//     "Amritsar",
//     "Barnala",
//     "Bathinda",
//     "Faridkot",
//     "Fatehgarh Sahib",
//     "Fazilka",
//     "Firozpur",
//     "Gurdaspur",
//     "Hoshiarpur",
//     "Jalandhar",
//     "Kapurthala",
//     "Ludhiana",
//     "Malerkotla",
//     "Mansa",
//     "Moga",
//     "Pathankot",
//     "Patiala",
//     "Rupnagar",
//     "Sahibzada Ajit Singh Nagar",
//     "Sangrur",
//     "Shahid Bhagat Singh Nagar",
//     "Sri Muktsar Sahib",
//     "Tarn Taran"
//   ],

    
//   "Rajasthan": [
//     "Ajmer",
//     "Alwar",
//     "Anupgarh",
//     "Balotra",
//     "Banswara",
//     "Baran",
//     "Barmer",
//     "Beawar",
//     "Bharatpur",
//     "Bhilwara",
//     "Bikaner",
//     "Bundi",
//     "Chittorgarh",
//     "Churu",
//     "Dausa",
//     "Deeg",
//     "Dholpur",
//     "Didwana-Kuchaman",
//     "Dudu",
//     "Dungarpur",
//     "Gangapur City",
//     "Hanumangarh",
//     "Jaipur",
//     "Jaipur Rural",
//     "Jaisalmer",
//     "Jalore",
//     "Jhalawar",
//     "Jhunjhunu",
//     "Jodhpur",
//     "Jodhpur Rural",
//     "Karauli",
//     "Kekri",
//     "Khairthal-Tijara",
//     "Kota",
//     "Kotputli-Behror",
//     "Nagaur",
//     "Neem Ka Thana",
//     "Pali",
//     "Phalodi",
//     "Pratapgarh",
//     "Rajsamand",
//     "Salumbar",
//     "Sanchore",
//     "Sawai Madhopur",
//     "Shahpura",
//     "Sikar",
//     "Sirohi",
//     "Sri Ganganagar",
//     "Tonk",
//     "Udaipur"
//   ],

//     Sikkim: [
//     "Gangtok",
//     "Gyalshing",
//     "Mangan",
//     "Namchi",
//     "Pakyong",
//     "Soreng"
//   ],

//     "Tamil Nadu": [
//       "Ariyalur",
//       "Chengalpattu",
//       "Chennai",
//       "Coimbatore",
//       "Cuddalore",
//       "Dharmapuri",
//       "Dindigul",
//       "Erode",
//       "Kallakurichi",
//       "Kanchipuram",
//       "Kanyakumari",
//       "Karur",
//       "Krishnagiri",
//       "Madurai",
//       "Mayiladuthurai",
//       "Nagapattinam",
//       "Namakkal",
//       "Nilgiris",
//       "Perambalur",
//       "Pudukkottai",
//       "Ramanathapuram",
//       "Ranipet",
//       "Salem",
//       "Sivaganga",
//       "Tenkasi",
//       "Thanjavur",
//       "Theni",
//       "Thoothukudi",
//       "Tiruchirappalli",
//       "Tirunelveli",
//       "Tirupattur",
//       "Tiruppur",
//       "Tiruvallur",
//       "Tiruvannamalai",
//       "Tiruvarur",
//       "Vellore",
//       "Viluppuram",
//       "Virudhunagar"
//     ],

//     Telangana: [
//     "Adilabad",
//     "Bhadradri Kothagudem",
//     "Hanumakonda",
//     "Hyderabad",
//     "Jagtial",
//     "Jangaon",
//     "Jayashankar Bhupalpally",
//     "Jogulamba Gadwal",
//     "Kamareddy",
//     "Karimnagar",
//     "Khammam",
//     "Kumuram Bheem Asifabad",
//     "Mahabubabad",
//     "Mahabubnagar",
//     "Mancherial",
//     "Medak",
//     "Medchal–Malkajgiri",
//     "Mulugu",
//     "Nagarkurnool",
//     "Nalgonda",
//     "Narayanpet",
//     "Nirmal",
//     "Nizamabad",
//     "Peddapalli",
//     "Rajanna Sircilla",
//     "Rangareddy",
//     "Sangareddy",
//     "Siddipet",
//     "Suryapet",
//     "Vikarabad",
//     "Wanaparthy",
//     "Warangal",
//     "Yadadri Bhuvanagiri"
//   ],

//     Tripura: [
//     "Dhalai",
//     "Gomati",
//     "Khowai",
//     "North Tripura",
//     "Sepahijala",
//     "South Tripura",
//     "Unakoti",
//     "West Tripura"
//   ],

//     "Uttar Pradesh": [
//   "Agra",
//   "Aligarh",
//   "Ambedkar Nagar",
//   "Amethi",
//   "Amroha",
//   "Auraiya",
//   "Ayodhya",
//   "Azamgarh",
//   "Baghpat",
//   "Bahraich",
//   "Ballia",
//   "Balrampur",
//   "Banda",
//   "Bara Banki",
//   "Bareilly",
//   "Basti",
//   "Bhadohi",
//   "Bijnor",
//   "Budaun",
//   "Bulandshahr",
//   "Chandauli",
//   "Chitrakoot",
//   "Deoria",
//   "Etah",
//   "Etawah",
//   "Farrukhabad",
//   "Fatehpur",
//   "Firozabad",
//   "Gautam Buddha Nagar",
//   "Ghaziabad",
//   "Ghazipur",
//   "Gonda",
//   "Gorakhpur",
//   "Hamirpur",
//   "Hapur",
//   "Hardoi",
//   "Hathras",
//   "Jalaun",
//   "Jaunpur",
//   "Jhansi",
//   "Kannauj",
//   "Kanpur Dehat",
//   "Kanpur Nagar",
//   "Kasganj",
//   "Kaushambi",
//   "Kheri",
//   "Kushinagar",
//   "Lalitpur",
//   "Lucknow",
//   "Mahoba",
//   "Mahrajganj",
//   "Mainpuri",
//   "Mathura",
//   "Mau",
//   "Meerut",
//   "Mirzapur",
//   "Moradabad",
//   "Muzaffarnagar",
//   "Pilibhit",
//   "Pratapgarh",
//   "Prayagraj",
//   "Rae Bareli",
//   "Rampur",
//   "Saharanpur",
//   "Sambhal",
//   "Sant Kabir Nagar",
//   "Shahjahanpur",
//   "Shamli",
//   "Shrawasti",
//   "Siddharthnagar",
//   "Sitapur",
//   "Sonbhadra",
//   "Sultanpur",
//   "Unnao",
//   "Varanasi",
//   "Other"
// ],


//     Uttarakhand: [
//     "Almora",
//     "Bageshwar",
//     "Chamoli",
//     "Champawat",
//     "Dehradun",
//     "Haridwar",
//     "Nainital",
//     "Pauri Garhwal",
//     "Pithoragarh",
//     "Rudraprayag",
//     "Tehri Garhwal",
//     "Udham Singh Nagar",
//     "Uttarkashi"
//   ],

//     "West Bengal": [
//     "Alipurduar",
//     "Bankura",
//     "Birbhum",
//     "Cooch Behar",
//     "Dakshin Dinajpur",
//     "Darjeeling",
//     "Hooghly",
//     "Howrah",
//     "Jalpaiguri",
//     "Jhargram",
//     "Kalimpong",
//     "Kolkata",
//     "Malda",
//     "Murshidabad",
//     "Nadia",
//     "North 24 Parganas",
//     "Paschim Bardhaman",
//     "Paschim Medinipur",
//     "Purba Bardhaman",
//     "Purba Medinipur",
//     "Purulia",
//     "South 24 Parganas",
//     "Uttar Dinajpur"
//   ],
//   };

//   const gradeOptions = ["Nursery", "Junior KG", "Senior KG", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

//   return (
//     <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden gradient-light" id="inquiry-form">
//       {/* Background decorative elements */}
//       <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-navy-100/30 to-blue-100/20 rounded-full -translate-x-24 -translate-y-24 sm:-translate-x-32 sm:-translate-y-32 md:-translate-x-40 md:-translate-y-40 lg:-translate-x-48 lg:-translate-y-48"></div>
//       <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-to-tl from-blue-100/20 to-navy-100/30 rounded-full translate-x-24 translate-y-24 sm:translate-x-32 sm:translate-y-32 md:translate-x-40 md:translate-y-40 lg:translate-x-48 lg:translate-y-48"></div>

//       {/* Creative decorative elements */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute top-10 left-5 sm:top-20 sm:left-10 opacity-20 animate-bounce">
//           <Cloud className="w-8 h-8 sm:w-10 sm:h-10 text-navy-400" />
//         </div>
//         <div className="absolute top-20 right-8 sm:top-32 sm:right-16 opacity-20 animate-pulse">
//           <Sun className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-400" />
//         </div>
//         <div className="absolute bottom-20 left-10 sm:bottom-32 sm:left-20 opacity-20 animate-bounce">
//           <MessageCircle className="w-8 h-8 sm:w-10 sm:h-10 text-green-400" />
//         </div>
//         <div className="absolute bottom-10 right-5 sm:bottom-20 sm:right-10 opacity-20 animate-pulse">
//           <MailCheck className="w-8 h-8 sm:w-10 sm:h-10 text-blue-300" />
//         </div>
//         <div className="absolute top-1/3 left-1/4 opacity-15">
//           <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-navy-300" />
//         </div>
//       </div>

//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         <motion.div
//           className="text-center mb-10 sm:mb-12 md:mb-14 lg:mb-16"
//           initial={{ opacity: 0, y: -20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//         >
//           <div className="inline-flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
//             <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-500"></div>
//             <h2 className="font-title text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gradient-navy">Enquiry Form</h2>
//             <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-500"></div>
//           </div>

//           <motion.div
//             className="h-1 sm:h-1.5 w-16 sm:w-20 md:w-24 gradient-navy mx-auto mb-6 sm:mb-7 md:mb-8 rounded-full"
//             initial={{ width: 0 }}
//             whileInView={{ width: "4rem" }}
//             transition={{ duration: 0.8, delay: 0.3 }}
//             viewport={{ once: true }}
//           />
//           <p className="text-navy-700 max-w-2xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl px-2 sm:px-4">
//             Fill out the form below and our admission team will contact you within 24 hours
//           </p>
//         </motion.div>

       

//         <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
//           {/* Contact Info Sidebar */}
//           <motion.div
//             initial={{ opacity: 0, x: -30 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//             className="lg:col-span-1"
//           >
//             <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-6 sm:p-7 md:p-8 h-full border border-navy-100">
//               <div className="flex items-center gap-3 mb-5 sm:mb-6 pb-3 sm:pb-4 border-b border-navy-100">
//                 <div className="relative">
//                   <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-navy-600 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center text-white">
//                     <FileText className="h-5 w-5 sm:h-6 sm:w-6" />
//                   </div>
//                   <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
//                     <Star className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-white" />
//                   </div>
//                 </div>
//                 <div>
//                   <h3 className="text-lg sm:text-xl font-bold text-navy-800">Quick Contact</h3>
//                   <div className="flex items-center gap-1 mt-1">
//                     <div className="h-1 w-4 sm:w-6 bg-navy-500 rounded-full"></div>
//                     <div className="h-1 w-2 sm:w-3 bg-blue-500 rounded-full"></div>
//                     <div className="h-1 w-1 sm:w-2 bg-navy-400 rounded-full"></div>
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-5 sm:space-y-6">
//                 <div className="flex items-start gap-3 sm:gap-4">
//                   <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-navy-50 to-blue-50 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
//                     <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-navy-600" />
//                   </div>
//                   <div>
//                     <p className="text-xs sm:text-sm text-navy-600 mb-1">Call Us</p>
//                     <p className="text-base sm:text-lg font-semibold text-navy-800">7507546666</p>
//                   </div>
//                 </div>

//                 <div className="flex items-start gap-3 sm:gap-4">
//                   <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-navy-50 to-blue-50 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
//                     <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-navy-600" />
//                   </div>
//                   <div>
//                     <p className="text-xs sm:text-sm text-navy-600 mb-1">Email Us</p>
//                     <p className="text-base sm:text-lg font-semibold text-navy-800 break-words">info@vppcbse.bhonsala.in</p>
//                   </div>
//                 </div>

//                 <div className="flex items-start gap-3 sm:gap-4">
//                   <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-navy-50 to-blue-50 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
//                     <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-navy-600" />
//                   </div>
//                   <div>
//                     <p className="text-xs sm:text-sm text-navy-600 mb-1">Visit Us</p>
//                     <p className="text-sm sm:text-base font-semibold text-navy-800">
//                       Dr. B.S. Moonje Marg, Rambhoomi
//                       <br />
//                       Nashik, Maharashtra 422005
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 md:pt-8 border-t border-navy-100">
//                 <p className="text-xs sm:text-sm text-navy-600">
//                   <span className="font-semibold">Response Time:</span> Within 24 hours
//                 </p>
//                 <p className="text-xs sm:text-sm text-navy-600 mt-2">
//                   <span className="font-semibold">Office Hours:</span> 8:30 AM - 12:00 PM
//                 </p>
//               </div>
//             </div>
//           </motion.div>

//           {/* Form Section */}
//           <div className="lg:col-span-2">
//             {isSubmitted ? (
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-6 sm:p-8 md:p-10 lg:p-12 text-center border border-navy-100"
//               >
//                 <div className="mx-auto flex h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 items-center justify-center rounded-full bg-gradient-to-br from-green-50 to-emerald-50 mb-6 sm:mb-8">
//                   <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-green-600" />
//                 </div>
//                 <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-navy-900 mb-3 sm:mb-4">Thank You for Your Enquiry!</h3>
//                 <p className="text-navy-600 mb-6 sm:mb-8 text-sm sm:text-base md:text-lg">
//                   We have received your details. Our admission team will contact you shortly at
//                   <span className="font-semibold text-navy-600"> {formData.email}</span> or
//                   <span className="font-semibold text-navy-600"> +91 {formData.mobileNumber}</span>.
//                 </p>
//                 <button
//                   onClick={resetForm}
//                   className="group px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-4 gradient-navy text-white rounded-lg sm:rounded-xl font-semibold hover:shadow-lg transition-all duration-300 shadow-md hover:-translate-y-1 transform flex items-center gap-2 sm:gap-3 mx-auto text-sm sm:text-base"
//                 >
//                   <span>Submit Another Enquiry</span>
//                   <Send className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
//                 </button>
//               </motion.div>
//             ) : (
//               <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden border border-navy-100">
//                 <div className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
//                   {submitError && (
//                     <div className="mb-6 bg-gradient-to-br from-red-50 to-rose-50 rounded-lg p-4 border border-red-200">
//                       <div className="flex items-center gap-3">
//                         <AlertCircle className="h-5 w-5 text-red-600" />
//                         <p className="text-red-700 text-sm sm:text-base">{submitError}</p>
//                       </div>
//                     </div>
//                   )}

//                   <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 md:space-y-10">
//   {/* Row 1: First Name | Last Name */}
//   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
//     {["firstName", "lastName"].map((field) => (
//       <motion.div
//         key={field}
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ delay: field === "firstName" ? 0.1 : 0.2 }}
//         viewport={{ once: true }}
//       >
//         <label className="block text-xs sm:text-sm font-semibold text-navy-700 mb-2 sm:mb-3">
//           {field === "firstName" ? "Student First Name *" : "Last Name *"}
//         </label>
//         <input
//           type="text"
//           name={field}
//           value={formData[field]}
//           onChange={handleChange}
//           className={`block w-full rounded-lg sm:rounded-xl border ${
//             errors[field] ? "border-red-500" : "border-navy-200"
//           } px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 text-sm sm:text-base placeholder-navy-400 focus:border-navy-500 focus:outline-none focus:ring-3 focus:ring-navy-500/20 transition-all duration-300 bg-white`}
//           placeholder={`Enter student's ${field === "firstName" ? "first" : "last"} name`}
//         />
//         {errors[field] && (
//           <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600 flex items-center gap-1">
//             <AlertCircle className="h-3 w-3" />
//             {errors[field]}
//           </p>
//         )}
//       </motion.div>
//     ))}
//   </div>

//   {/* Row 2: Grade | Email */}
//   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
//     {["grade", "email"].map((field) => (
//       <motion.div
//         key={field}
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ delay: field === "grade" ? 0.3 : 0.4 }}
//         viewport={{ once: true }}
//       >
//         <label className="block text-xs sm:text-sm font-semibold text-navy-700 mb-2 sm:mb-3">
//           {field === "grade" ? "Grade Seeking Admission For *" : "Email Address *"}
//         </label>
//         {field === "grade" ? (
//           <select
//             name="grade"
//             value={formData.grade}
//             onChange={handleChange}
//             className={`block w-full rounded-lg sm:rounded-xl border ${
//               errors.grade ? "border-red-500" : "border-navy-200"
//             } px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 text-sm sm:text-base focus:border-navy-500 focus:outline-none focus:ring-3 focus:ring-navy-500/20 transition-all duration-300 bg-white`}
//           >
//             <option value="">Select Grade</option>
//             {gradeOptions.map((grade) => (
//               <option key={grade} value={grade}>
//                 {grade}
//               </option>
//             ))}
//           </select>
//         ) : (
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className={`block w-full rounded-lg sm:rounded-xl border ${
//               errors.email ? "border-red-500" : "border-navy-200"
//             } px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 text-sm sm:text-base placeholder-navy-400 focus:border-navy-500 focus:outline-none focus:ring-3 focus:ring-navy-500/20 transition-all duration-300 bg-white`}
//             placeholder="Enter parent's email address"
//           />
//         )}
//         {errors[field] && (
//           <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600 flex items-center gap-1">
//             <AlertCircle className="h-3 w-3" />
//             {errors[field]}
//           </p>
//         )}
//       </motion.div>
//     ))}
//   </div>

//   {/* Row 3: Mobile Number */}
//   <motion.div
//     initial={{ opacity: 0, y: 20 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     transition={{ delay: 0.5 }}
//     viewport={{ once: true }}
//   >
//     <label className="block text-xs sm:text-sm font-semibold text-navy-700 mb-2 sm:mb-3">
//       Mobile Number *
//     </label>
//     <div className="space-y-2">
//       <div className="flex rounded-lg sm:rounded-xl shadow-sm bg-white">
//         <span className="inline-flex items-center rounded-l-lg sm:rounded-l-xl border border-r-0 border-navy-200 bg-navy-50 px-3 sm:px-4 md:px-6 text-sm sm:text-base text-navy-500">
//           +91
//         </span>
//         <input
//           type="tel"
//           name="mobileNumber"
//           value={formData.mobileNumber}
//           onChange={handleChange}
//           onBlur={() => setMobileValidation((prev) => ({ ...prev, isTouched: true }))}
//           maxLength="10"
//           className={`block w-full rounded-none rounded-r-lg sm:rounded-r-xl border ${
//             errors.mobileNumber
//               ? "border-red-500"
//               : mobileValidation.isValid && mobileValidation.isTouched
//               ? "border-green-500"
//               : "border-navy-200"
//           } px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 text-sm sm:text-base placeholder-navy-400 focus:border-navy-500 focus:outline-none focus:ring-3 focus:ring-navy-500/20 transition-all duration-300`}
//           placeholder="98765 43210"
//         />
//       </div>

//       {/* Mobile validation feedback */}
//       {mobileValidation.isTouched && formData.mobileNumber && (
//         <div className="mt-1">
//           {mobileValidation.isValid ? (
//             <div className="space-y-1">
//               <p className="text-green-600 text-xs flex items-center gap-1">
//                 <Check className="h-3 w-3" />
//                 Valid {mobileValidation.operator} number ({mobileValidation.prefix} series)
//               </p>
//               <div className="flex items-center gap-2">
//                 <div className="flex-1 h-1 bg-green-200 rounded-full overflow-hidden">
//                   <div className="h-full bg-green-500 rounded-full" style={{ width: "100%" }}></div>
//                 </div>
//                 <span className="text-xs text-green-600">✓ Valid number</span>
//               </div>
//             </div>
//           ) : mobileValidation.message ? (
//             <p className="text-amber-600 text-xs flex items-center gap-1">
//               <AlertCircle className="h-3 w-3" />
//               {mobileValidation.message}
//             </p>
//           ) : null}
//         </div>
//       )}

//       <p className="text-xs text-navy-400">Valid Indian numbers start with 6, 7, 8, or 9</p>

//       {errors.mobileNumber && (
//         <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
//           <AlertCircle className="h-3 w-3" />
//           {errors.mobileNumber}
//         </p>
//       )}
//     </div>
//   </motion.div>

//   {/* Row 4: State, District, City (Taluka) */}
//   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//     {/* State Dropdown */}
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ delay: 0.55 }}
//       viewport={{ once: true }}
//     >
//       <label className="block text-xs sm:text-sm font-semibold text-navy-700 mb-2 sm:mb-3">State *</label>
//       <select
//         name="state"
//         value={formData.state}
//         onChange={handleChange}
//         className={`block w-full rounded-lg sm:rounded-xl border ${
//           errors.state ? "border-red-500" : "border-navy-200"
//         } px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 text-sm sm:text-base focus:border-navy-500 focus:outline-none focus:ring-3 focus:ring-navy-500/20 transition-all duration-300 bg-white`}
//       >
//         <option value="">Select State</option>
//         {states.map((state) => (
//           <option key={state} value={state}>
//             {state}
//           </option>
//         ))}
//       </select>
//       {errors.state && (
//         <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600 flex items-center gap-1">
//           <AlertCircle className="h-3 w-3" />
//           {errors.state}
//         </p>
//       )}
//     </motion.div>

//     {/* District Dropdown */}
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ delay: 0.6 }}
//       viewport={{ once: true }}
//     >
//       <label className="block text-xs sm:text-sm font-semibold text-navy-700 mb-2 sm:mb-3">District *</label>
//       <select
//         name="district"
//         value={formData.district}
//         onChange={handleChange}
//         disabled={!formData.state}
//         className={`block w-full rounded-lg sm:rounded-xl border ${
//           errors.district ? "border-red-500" : "border-navy-200"
//         } px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 text-sm sm:text-base focus:border-navy-500 focus:outline-none focus:ring-3 focus:ring-navy-500/20 transition-all duration-300 bg-white disabled:bg-gray-50 disabled:cursor-not-allowed`}
//       >
//         <option value="">{formData.state ? "Select District" : "Select State First"}</option>
//         {formData.state &&
//           districts[formData.state]?.map((district) => (
//             <option key={district} value={district}>
//               {district}
//             </option>
//           ))}
//       </select>
//       {errors.district && (
//         <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600 flex items-center gap-1">
//           <AlertCircle className="h-3 w-3" />
//           {errors.district}
//         </p>
//       )}
//     </motion.div>

//     {/* City/Taluka Input - Changed to select dropdown */}
//     {/* <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ delay: 0.65 }}
//       viewport={{ once: true }}
//     >
//       <label className="block text-xs sm:text-sm font-semibold text-navy-700 mb-2 sm:mb-3">Taluka *</label>
//       <select
//         name="taluka"
//         value={formData.taluka}
//         onChange={handleChange}
//         disabled={!formData.district}
//         className={`block w-full rounded-lg sm:rounded-xl border ${
//           errors.taluka ? "border-red-500" : "border-navy-200"
//         } px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 text-sm sm:text-base focus:border-navy-500 focus:outline-none focus:ring-3 focus:ring-navy-500/20 transition-all duration-300 bg-white disabled:bg-gray-50 disabled:cursor-not-allowed`}
//       >
//         <option value="">{formData.district ? "Select Taluka" : "Select District First"}</option>
//         {formData.district &&
//           formData.state &&
//           districts[formData.state]?.[formData.district]?.map((taluka) => (
//             <option key={taluka} value={taluka}>
//               {taluka}
//             </option>
//           ))}
//       </select>
//       {errors.taluka && (
//         <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600 flex items-center gap-1">
//           <AlertCircle className="h-3 w-3" />
//           {errors.taluka}
//         </p>
//       )}
//     </motion.div> */}
//   </div>

//   {/* Row 5: Pin Code */}
//   <motion.div
//     initial={{ opacity: 0, y: 20 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     transition={{ delay: 0.7 }}
//     viewport={{ once: true }}
//   >
//     <label className="block text-xs sm:text-sm font-semibold text-navy-700 mb-2 sm:mb-3">Pin Code *</label>
//     <input
//       type="text"
//       name="pinCode"
//       value={formData.pinCode}
//       onChange={handleChange}
//       maxLength="6"
//       className={`block w-full rounded-lg sm:rounded-xl border ${
//         errors.pinCode ? "border-red-500" : "border-navy-200"
//       } px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 text-sm sm:text-base placeholder-navy-400 focus:border-navy-500 focus:outline-none focus:ring-3 focus:ring-navy-500/20 transition-all duration-300 bg-white`}
//       placeholder="6-digit Pin Code"
//     />
//     {errors.pinCode && (
//       <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600 flex items-center gap-1">
//         <AlertCircle className="h-3 w-3" />
//         {errors.pinCode}
//       </p>
//     )}
//   </motion.div>

//   {/* Validation summary */}
//   {Object.keys(errors).length > 0 && (
//     <div className="p-4 bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-lg">
//       <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2 text-sm sm:text-base">
//         <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5" />
//         Please fix the following errors:
//       </h4>
//       <ul className="list-disc list-inside text-red-700 text-xs sm:text-sm space-y-1">
//         {errors.firstName && <li>First Name: {errors.firstName}</li>}
//         {errors.lastName && <li>Last Name: {errors.lastName}</li>}
//         {errors.grade && <li>Grade: {errors.grade}</li>}
//         {errors.email && <li>Email: {errors.email}</li>}
//         {errors.mobileNumber && <li>Mobile Number: {errors.mobileNumber}</li>}
//         {errors.state && <li>State: {errors.state}</li>}
//         {errors.district && <li>District: {errors.district}</li>}
//         {errors.taluka && <li>Taluka: {errors.taluka}</li>}
//         {errors.pinCode && <li>Pin Code: {errors.pinCode}</li>}
//       </ul>
//     </div>
//   )}

//   {/* Terms & Submit */}
//   <div className="pt-6 sm:pt-8 md:pt-10 border-t border-navy-200">
//     <div className="flex items-start mb-6 sm:mb-8">
//       <input
//         id="terms"
//         name="terms"
//         type="checkbox"
//         required
//         className="h-4 w-4 sm:h-5 sm:w-5 text-navy-600 focus:ring-navy-500 border-navy-300 rounded mt-1"
//       />
//       <label htmlFor="terms" className="ml-3 block text-xs sm:text-sm text-navy-700">
//         I agree to receive communication from the school regarding admission procedures, events, and updates. I confirm that all information provided is accurate to the best of my knowledge.
//       </label>
//     </div>

//     <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6">
//       <motion.button
//         type="submit"
//         disabled={isSubmitting}
//         className="flex-1 group px-4 sm:px-6 md:px-8 lg:px-10 py-3 sm:py-3.5 md:py-4 gradient-navy text-white rounded-lg sm:rounded-xl font-semibold focus:outline-none focus:ring-3 focus:ring-navy-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1 transform flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
//         whileHover={{ scale: 1.02 }}
//         whileTap={{ scale: 0.98 }}
//       >
//         {isSubmitting ? (
//           <>
//             <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 border-b-2 border-white"></div>
//             <span className="text-xs sm:text-sm md:text-base">Submitting...</span>
//           </>
//         ) : (
//           <>
//             <span>Submit Enquiry</span>
//             <Send className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
//           </>
//         )}
//       </motion.button>

//       <button
//         type="button"
//         onClick={resetForm}
//         className="px-4 sm:px-6 md:px-8 lg:px-10 py-3 sm:py-3.5 md:py-4 border border-navy-300 sm:border-2 rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold text-navy-700 bg-white hover:bg-navy-50 focus:outline-none focus:ring-3 focus:ring-navy-200 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1 transform"
//       >
//         Reset Form
//       </button>
//     </div>
//   </div>
// </form>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Bottom decorative element */}
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
//               <span className="text-xs sm:text-sm font-medium">Your Journey Starts Here</span>
//               <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
//             </div>
//             <div className="w-6 h-px sm:w-8 md:w-12 bg-gradient-to-r from-transparent via-navy-400 to-transparent"></div>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default Inquiry;