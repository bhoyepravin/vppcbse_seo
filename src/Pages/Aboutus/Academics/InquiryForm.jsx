import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Send, CheckCircle, School, Phone, Mail, User, MapPin, BookOpen, ChevronRight, Star, Sparkles, Cloud, Sun, Heart } from "lucide-react";
import { elephantsticker } from "../../../assets";
import axiosInstance from "../../../services/api"; // Update this import path based on your project structure

const InquiryForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    state: "",
    district: "",
    schoolName: "",
    studentClass: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [loadingConfig, setLoadingConfig] = useState(true);
  
  // Dynamic data from API
  const [configData, setConfigData] = useState({
    header: {
      title: "Admission Enquiry Form",
      description: "Fill out the form below and our admission team will contact you within 24 hours"
    },
    leftSide: {
      title: "Why Choose VPP CBSE?",
      features: [
        { icon: "🏆", title: "Academic Excellence", description: "Consistent 100% board results with comprehensive learning approach" },
        { icon: "🧠", title: "Holistic Development", description: "Balanced focus on academics, sports, arts, and personality development" },
        { icon: "🏫", title: "Modern Infrastructure", description: "State-of-the-art facilities including smart classrooms and laboratories" },
        { icon: "👨‍🏫", title: "Expert Faculty", description: "Qualified and experienced teachers with student-centric teaching methods" }
      ],
      officeHours: {
        label: "Office Hours:",
        value: "8:30 AM - 12:00 PM"
      },
      contact: {
        label: "Contact:",
        value: "+91 7507546666"
      }
    },
    form: {
      successTitle: "Thank You for Your Enquiry!",
      successMessage: "We have received your details. Our admission team will contact you shortly at",
      submitAnother: "Submit Another Enquiry",
      submitButton: "Submit Enquiry",
      contactMessage: "Our team will contact you within 24 hours"
    },
    footer: {
      text: "Secure & Confidential"
    }
  });

  const [classOptions, setClassOptions] = useState([
    { value: "playgroup", label: "Playgroup" },
    { value: "nursery", label: "Nursery" },
    { value: "jr_kg", label: "Junior KG" },
    { value: "sr_kg", label: "Senior KG" },
    { value: "grade1", label: "Grade 1" },
    { value: "grade2", label: "Grade 2" }
  ]);

  const [mobileValidation, setMobileValidation] = useState({
    isValid: false,
    message: "",
    prefix: "",
    operator: "",
  });

  // State and District data
  // State and District data
  const stateDistrictData = {
  andhraPradesh: {
    name: "Andhra Pradesh",
    districts: [
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
    ]
  },

  arunachalPradesh: {
    name: "Arunachal Pradesh",
    districts: [
      "Anjaw (Hawai)",
      "Bichom (Napangphung)",
      "Changlang (Changlang)",
      "Dibang Valley (Anini)",
      "East Kameng (Seppa)",
      "East Siang (Pasighat)",
      "Itanagar (Capital)",
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
      "Namsai",
      "Pakke-Kessang (Lemmi)",
      "Papum Pare (Yupia)",
      "Shi-Yomi (Tato)",
      "Siang (Boleng)",
      "Tawang",
      "Tirap (Khonsa)",
      "Upper Siang (Yingkiong)",
      "Upper Subansiri (Daporijo)",
      "West Kameng (Bomdila)",
      "West Siang (Aalo)",
      "Other"
    ]
  },

  assam: {
    name: "Assam",
    districts: [
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
    ]
  },

  bihar: {
    name: "Bihar",
    districts: [
      "Araria",
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
    ]
  },

  chhattisgarh: {
    name: "Chhattisgarh",
    districts: ["Raipur", "Bhilai", "Bilaspur", "Korba", "Durg", "Other"]
  },

  goa: {
    name: "Goa",
    districts: ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Other"]
  },

  gujarat: {
    name: "Gujarat",
    districts: [
      "Ahmedabad",
      "Surat",
      "Vadodara",
      "Rajkot",
      "Bhavnagar",
      "Jamnagar",
      "Other"
    ]
  },

  haryana: {
    name: "Haryana",
    districts: ["Gurgaon", "Faridabad", "Panipat", "Ambala", "Hisar", "Other"]
  },

  himachalPradesh: {
    name: "Himachal Pradesh",
    districts: ["Shimla", "Solan", "Mandi", "Kullu", "Dharamshala", "Other"]
  },

  jharkhand: {
    name: "Jharkhand",
    districts: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh", "Other"]
  },

  karnataka: {
    name: "Karnataka",
    districts: [
      "Bengaluru",
      "Mysuru",
      "Hubli",
      "Mangalore",
      "Belagavi",
      "Davangere",
      "Other"
    ]
  },

  kerala: {
    name: "Kerala",
    districts: [
      "Thiruvananthapuram",
      "Kochi",
      "Kozhikode",
      "Thrissur",
      "Alappuzha",
      "Other"
    ]
  },

  madhyaPradesh: {
    name: "Madhya Pradesh",
    districts: ["Indore", "Bhopal", "Gwalior", "Jabalpur", "Ujjain", "Other"]
  },

  maharashtra: {
    name: "Maharashtra",
    districts: [
      "Ahmednagar",
      "Akola",
      "Amravati",
      "Aurangabad (Chhatrapati Sambhajinagar)",
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
      "Nanded",
      "Nandurbar",
      "Nagpur",
      "Nashik",
      "Osmanabad (Dharashiv)",
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
      "Yavatmal",
      "Other"
    ]
  },

  manipur: {
    name: "Manipur",
    districts: ["Imphal", "Bishnupur", "Thoubal", "Other"]
  },

  meghalaya: {
    name: "Meghalaya",
    districts: ["Shillong", "Tura", "Jowai", "Other"]
  },

  mizoram: {
    name: "Mizoram",
    districts: ["Aizawl", "Lunglei", "Champhai", "Other"]
  },

  nagaland: {
    name: "Nagaland",
    districts: ["Kohima", "Dimapur", "Mokokchung", "Other"]
  },

  odisha: {
    name: "Odisha",
    districts: [
      "Bhubaneswar",
      "Cuttack",
      "Rourkela",
      "Sambalpur",
      "Puri",
      "Other"
    ]
  },

  punjab: {
    name: "Punjab",
    districts: ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Other"]
  },

  rajasthan: {
    name: "Rajasthan",
    districts: ["Jaipur", "Udaipur", "Jodhpur", "Kota", "Ajmer", "Bikaner", "Other"]
  },

  sikkim: {
    name: "Sikkim",
    districts: ["Gangtok", "Gyalshing", "Mangan", "Namchi", "Pakyong", "Soreng"]
  },

  tamilNadu: {
    name: "Tamil Nadu",
    districts: [
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
    ]
  },

  telangana: {
    name: "Telangana",
    districts: [
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
    ]
  },

  tripura: {
    name: "Tripura",
    districts: [
      "Dhalai",
      "Gomati",
      "Khowai",
      "North Tripura",
      "Sepahijala",
      "South Tripura",
      "Unakoti",
      "West Tripura"
    ]
  },

  uttarPradesh: {
    name: "Uttar Pradesh",
    districts: [
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
    ]
  },

  uttarakhand: {
    name: "Uttarakhand",
    districts: [
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
    ]
  },

  westBengal: {
    name: "West Bengal",
    districts: [
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
    ]
  }
};

  // Enhanced TRAI-approved Indian mobile number prefixes with operator info
  const mobileOperators = {
    70: "Jio", 72: "Jio", 73: "Jio", 74: "Jio", 75: "Jio", 76: "Jio", 77: "Jio", 78: "Jio", 79: "Jio",
    98: "Airtel", 99: "Airtel", 96: "Airtel", 97: "Airtel", 81: "Airtel", 84: "Airtel", 85: "Airtel", 86: "Airtel", 88: "Airtel", 89: "Airtel", 82: "Airtel", 83: "Airtel",
    90: "Vodafone Idea", 91: "Vodafone Idea", 92: "Vodafone Idea", 93: "Vodafone Idea", 94: "Vodafone Idea", 95: "Vodafone Idea",
    80: "BSNL", 87: "MTNL",
    60: "Reliance", 61: "Reliance", 62: "Reliance", 63: "Reliance", 64: "Reliance", 65: "Reliance", 66: "Reliance", 67: "Reliance", 68: "Reliance", 69: "Reliance",
    50: "Tata Docomo", 51: "Tata Docomo", 52: "Tata Docomo", 53: "Tata Docomo", 54: "Tata Docomo", 55: "Tata Docomo", 56: "Tata Docomo", 57: "Tata Docomo", 58: "Tata Docomo", 59: "Tata Docomo",
  };

  const validPrefixes = Object.keys(mobileOperators);

  // Fetch config data on component mount
  useEffect(() => {
    fetchFormConfig();
  }, []);

  const fetchFormConfig = async () => {
    try {
      setLoadingConfig(true);
      const response = await axiosInstance.get('/inquiry/form-config');
      if (response.data.success) {
        const { config, classOptions: apiClassOptions } = response.data.data;
        
        // Parse features if they come as string
        let parsedFeatures = config.leftSide.features;
        if (typeof config.leftSide.features === 'string') {
          try {
            parsedFeatures = JSON.parse(config.leftSide.features);
          } catch (e) {
            console.error('Error parsing features:', e);
          }
        }

        setConfigData({
          header: config.header || configData.header,
          leftSide: {
            ...config.leftSide,
            features: parsedFeatures || configData.leftSide.features
          },
          form: config.form || configData.form,
          footer: config.footer || configData.footer
        });

        if (apiClassOptions && apiClassOptions.length > 0) {
          setClassOptions(apiClassOptions);
        }
      }
    } catch (error) {
      console.error('Error fetching form config:', error);
      // Keep using default config
    } finally {
      setLoadingConfig(false);
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

  // Enhanced mobile validation function
  const validateMobileNumber = (mobileNo) => {
    setMobileValidation({
      isValid: false,
      message: "",
      prefix: "",
      operator: "",
    });

    if (!mobileNo) {
      return "Mobile number is required";
    }

    if (!/^\d{10}$/.test(mobileNo)) {
      return "Mobile number must be exactly 10 digits";
    }

    const prefix = mobileNo.substring(0, 2);
    const operator = mobileOperators[prefix];

    if (!validPrefixes.includes(prefix)) {
      return "Please enter a valid Indian mobile number";
    }

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

    setMobileValidation({
      isValid: true,
      message: `Valid ${operator || "Indian"} number`,
      prefix: prefix,
      operator: operator || "Unknown",
    });

    return null;
  };

  // Handle mobile number change
  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);

    setFormData((prev) => ({
      ...prev,
      phone: value,
    }));

    if (errors.phone) {
      setErrors((prev) => ({
        ...prev,
        phone: "",
      }));
    }

    if (value.length === 10) {
      const error = validateMobileNumber(value);
      if (error) {
        setErrors((prev) => ({
          ...prev,
          phone: error,
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

    if (name === "phone") {
      handleMobileChange(e);
      return;
    }

    if (name === "state") {
      setFormData((prev) => ({
        ...prev,
        state: value,
        district: "",
      }));
      return;
    }

     // Prevent digits in name fields
    let filteredValue = value;
    if (name === "firstName" || name === "lastName") {
      // Remove digits and special characters, allow only alphabets (both cases) and spaces
      filteredValue = value.replace(/[^A-Za-z\s]/g, '');
    } else if (name === "schoolName") {
      // Keep original schoolName validation - remove digits but allow alphabets, spaces, and common name characters
      filteredValue = value.replace(/[0-9]/g, '');
    }

    setFormData((prev) => ({
      ...prev,
      [name]: filteredValue,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Form validation function
  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name is required";
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "First Name must be at least 2 characters";
    } else if (!/^[A-Za-z\s.'-]+$/.test(formData.firstName.trim())) {
      newErrors.firstName = "First Name can only contain alphabets and spaces";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = "Last Name must be at least 2 characters";
    } else if (!/^[A-Za-z\s.'-]+$/.test(formData.lastName.trim())) {
      newErrors.lastName = "Last Name can only contain alphabets and spaces";
    }

    if (!formData.schoolName.trim()) {
      newErrors.schoolName = "School Name is required";
    } else if (formData.schoolName.trim().length < 2) {
      newErrors.schoolName = "School Name must be at least 2 characters";
    } else if (!/^[A-Za-z\s.'-]+$/.test(formData.schoolName.trim())) {
      newErrors.schoolName = "School Name can only contain alphabets and spaces";
    }

    if (!formData.state) {
      newErrors.state = "State is required";
    }

    if (!formData.district) {
      newErrors.district = "District is required";
    }

    if (!formData.studentClass) {
      newErrors.studentClass = "Class is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Mobile No. is required";
    } else {
      const mobileError = validateMobileNumber(formData.phone);
      if (mobileError) {
        newErrors.phone = mobileError;
      }
    }

    return newErrors;
  };

  // Submit form to backend
  const submitToBackend = async (data) => {
    setIsLoading(true);
    setApiError(null);

    try {
      // Map frontend field names to backend expected field names
      const submissionData = {
        first_name: data.firstName,
        last_name: data.lastName,
        state: data.state,
        district: data.district,
        school_name: data.schoolName,
        student_class: data.studentClass,
        email: data.email,
        phone: data.phone,
        submitted_at: new Date().toISOString(),
        user_agent: navigator.userAgent
      };

      const response = await axiosInstance.post('/inquiry/submit', submissionData, {
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
        // Map backend validation errors back to frontend field names
        const backendErrors = error.response.data.errors;
        const mappedErrors = {};
        
        Object.keys(backendErrors).forEach(key => {
          // Map backend field names to frontend field names
          if (key === 'first_name') mappedErrors.firstName = backendErrors[key][0];
          else if (key === 'last_name') mappedErrors.lastName = backendErrors[key][0];
          else if (key === 'school_name') mappedErrors.schoolName = backendErrors[key][0];
          else if (key === 'student_class') mappedErrors.studentClass = backendErrors[key][0];
          else mappedErrors[key] = backendErrors[key][0];
        });
        
        setErrors(mappedErrors);
        setApiError("Please check the form for errors.");
      } else {
        setApiError(error.response?.data?.message || error.message || "An error occurred. Please try again.");
      }
      
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);
    setErrors({}); // Clear previous errors
    
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

    const result = await submitToBackend(formData);

    if (result.success) {
      console.log("Form submitted successfully:", formData);
      setIsSubmitted(true);

      // Auto-reset after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          firstName: "",
          lastName: "",
          state: "",
          district: "",
          schoolName: "",
          studentClass: "",
          email: "",
          phone: "",
        });
        setErrors({});
        setMobileValidation({
          isValid: false,
          message: "",
          prefix: "",
          operator: "",
        });
        setApiError(null);
      }, 5000);
    }
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden bg-gradient-to-b from-white to-navy-50/30" id="inquiry">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-navy-100/20 to-blue-100/10 rounded-full -translate-x-24 -translate-y-24"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-tl from-blue-100/10 to-navy-100/20 rounded-full translate-x-24 translate-y-24"></div>

      {/* Creative Doodles */}
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
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ================= Section Header ================= */}
        <motion.div
          className="text-center mb-10 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-500"></div>
            <h2 className="font-title text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gradient-navy">
              {configData.header.title}
            </h2>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-500"></div>
          </div>

          <motion.div
            className="h-1 sm:h-1.5 w-16 sm:w-20 md:w-24 bg-gradient-to-r from-navy-600 via-blue-600 to-navy-600 mx-auto mb-6 sm:mb-8 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: "4rem" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          />
          
          <p className="text-gray-700 max-w-2xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl px-2 sm:px-4">
            {configData.header.description}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Left Side - Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-navy-100 p-4 sm:p-6 md:p-8 h-full">
              {/* Sticker Image - Responsive */}
              <div className="mb-6 sm:mb-8 flex justify-center">
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48">
                  <img
                    src={elephantsticker}
                    alt="School Mascot"
                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                  />
                  {/* Decorative star */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                    <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                  </div>
                </div>
              </div>

              <h3 className="text-base sm:text-lg md:text-xl font-bold text-navy-800 mb-4 sm:mb-6 pb-4 border-b border-navy-100">
                {configData.leftSide.title}
              </h3>

              <div className="space-y-4 sm:space-y-6">
                {configData.leftSide.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3 sm:gap-4"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-navy-100/20 to-blue-100/20 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="text-lg sm:text-xl">{feature.icon}</div>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm sm:text-base mb-1">{feature.title}</p>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-navy-100">
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-800">{configData.leftSide.officeHours.label}</span> {configData.leftSide.officeHours.value}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-800">{configData.leftSide.contact.label}</span> {configData.leftSide.contact.value}
                  </p>
                </div>
              </div>

              {/* Mobile Quick Info */}
              {isMobile && (
                <div className="mt-6 pt-6 border-t border-navy-100">
                  <div className="flex items-center gap-2 text-navy-600">
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-sm font-medium">Quick admission process</span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <div className="lg:col-span-1">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 md:p-12 text-center border border-navy-100"
              >
                <div className="mx-auto flex h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 items-center justify-center rounded-full bg-gradient-to-br from-green-500/10 to-emerald-500/10 mb-6 sm:mb-8">
                  <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-green-600" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-navy-800 mb-3 sm:mb-4">
                  {configData.form.successTitle}
                </h3>
                <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
                  {configData.form.successMessage}
                  <span className="font-semibold text-navy-600">
                    {" "}
                    {formData.email}
                  </span>
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      firstName: "",
                      lastName: "",
                      state: "",
                      district: "",
                      schoolName: "",
                      studentClass: "",
                      email: "",
                      phone: "",
                    });
                  }}
                  className="group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-navy-600 to-blue-600 text-white rounded-lg sm:rounded-xl font-semibold hover:shadow-xl transition-all duration-300 shadow-lg hover:-translate-y-1 transform flex items-center gap-2 sm:gap-3 mx-auto text-sm sm:text-base"
                >
                  <span>{configData.form.submitAnother}</span>
                  <Send className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ) : (
              <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg overflow-hidden border border-navy-100">
                <div className="p-4 sm:p-6 md:p-8">
                  {apiError && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-600 text-sm">{apiError}</p>
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      {/* First Name */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        viewport={{ once: true }}
                        className="sm:col-span-2 lg:col-span-1"
                      >
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                          Student First Name *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            pattern="[A-Za-z\s.'-]+"
                            title="Only alphabets, spaces, apostrophes, periods, and hyphens are allowed"
                            required
                            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border focus:border-navy-500 focus:ring-2 focus:ring-navy-500/20 outline-none transition-all duration-300 bg-white/50 ${
                              errors.firstName ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="Enter first name"
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                          </div>
                        </div>
                        {errors.firstName && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.firstName}
                          </p>
                        )}
                      </motion.div>

                      {/* Last Name */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                        className="sm:col-span-2 lg:col-span-1"
                      >
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                          Last Name *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            pattern="[A-Za-z\s.'-]+"
                            title="Only alphabets, spaces, apostrophes, periods, and hyphens are allowed"
                            required
                            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border focus:border-navy-500 focus:ring-2 focus:ring-navy-500/20 outline-none transition-all duration-300 bg-white/50 ${
                              errors.lastName ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="Enter last name"
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                          </div>
                        </div>
                        {errors.lastName && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.lastName}
                          </p>
                        )}
                      </motion.div>

                      {/* State */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        viewport={{ once: true }}
                      >
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                          State *
                        </label>
                        <div className="relative">
                          <select
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            required
                            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border focus:border-navy-500 focus:ring-2 focus:ring-navy-500/20 outline-none appearance-none bg-white/50 ${
                              errors.state ? "border-red-500" : "border-gray-300"
                            }`}
                          >
                            <option value="">Select State</option>
                            {Object.entries(stateDistrictData).map(([key, value]) => (
                              <option key={key} value={key}>
                                {value.name}
                              </option>
                            ))}
                          </select>
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                          </div>
                        </div>
                        {errors.state && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.state}
                          </p>
                        )}
                      </motion.div>

                      {/* District */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        viewport={{ once: true }}
                      >
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                          District *
                        </label>
                        <div className="relative">
                          <select
                            name="district"
                            value={formData.district}
                            onChange={handleChange}
                            required
                            disabled={!formData.state}
                            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border focus:border-navy-500 focus:ring-2 focus:ring-navy-500/20 outline-none appearance-none bg-white/50 ${
                              errors.district ? "border-red-500" : "border-gray-300"
                            } ${!formData.state ? "bg-gray-100 cursor-not-allowed" : ""}`}
                          >
                            <option value="">
                              {formData.state ? "Select District" : "First select a state"}
                            </option>
                            {formData.state && stateDistrictData[formData.state]?.districts.map((district) => (
                              <option key={district} value={district}>
                                {district}
                              </option>
                            ))}
                          </select>
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                          </div>
                        </div>
                        {errors.district && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.district}
                          </p>
                        )}
                      </motion.div>

                      {/* School Name */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        viewport={{ once: true }}
                      >
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                          Current School *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="schoolName"
                            value={formData.schoolName}
                            onChange={handleChange}
                            pattern="[A-Za-z\s.'-]+"
                            title="Only alphabets, spaces, apostrophes, periods, and hyphens are allowed"
                            required
                            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border focus:border-navy-500 focus:ring-2 focus:ring-navy-500/20 outline-none transition-all duration-300 bg-white/50 ${
                              errors.schoolName ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="Enter school name"
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <School className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                          </div>
                        </div>
                        {errors.schoolName && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.schoolName}
                          </p>
                        )}
                      </motion.div>

                      {/* Class */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        viewport={{ once: true }}
                      >
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                          Current Class *
                        </label>
                        <div className="relative">
                          <select
                            name="studentClass"
                            value={formData.studentClass}
                            onChange={handleChange}
                            required
                            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border focus:border-navy-500 focus:ring-2 focus:ring-navy-500/20 outline-none appearance-none bg-white/50 ${
                              errors.studentClass ? "border-red-500" : "border-gray-300"
                            }`}
                          >
                            <option value="">Select Class</option>
                            {classOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                          </div>
                        </div>
                        {errors.studentClass && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.studentClass}
                          </p>
                        )}
                      </motion.div>

                      {/* Email */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        viewport={{ once: true }}
                        className="sm:col-span-2"
                      >
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border focus:border-navy-500 focus:ring-2 focus:ring-navy-500/20 outline-none transition-all duration-300 bg-white/50 ${
                              errors.email ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="Enter email address"
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                          </div>
                        </div>
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.email}
                          </p>
                        )}
                      </motion.div>

                      {/* Phone */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        viewport={{ once: true }}
                        className="sm:col-span-2"
                      >
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <div className="flex rounded-lg sm:rounded-xl shadow-sm">
                          <span className="inline-flex items-center rounded-l-lg sm:rounded-l-xl border border-r-0 border-gray-300 bg-gray-50/50 px-3 sm:px-4 text-gray-500 text-sm">
                            +91
                          </span>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            maxLength="10"
                            pattern="[0-9]*"
                            inputMode="numeric"
                            className={`w-full rounded-r-lg sm:rounded-r-xl border focus:border-navy-500 focus:ring-2 focus:ring-navy-500/20 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base outline-none transition-all duration-300 bg-white/50 ${
                              errors.phone ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="Enter phone number"
                          />
                        </div>
                        {/* Mobile validation feedback */}
                        {!errors.phone && formData.phone.length === 10 && mobileValidation.isValid && (
                          <div className="mt-1">
                            <p className="text-green-600 text-xs flex items-center gap-1">
                              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              Valid {mobileValidation.operator} number ({mobileValidation.prefix} series)
                            </p>
                          </div>
                        )}
                        {errors.phone && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.phone}
                          </p>
                        )}
                      </motion.div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4 sm:pt-6">
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isLoading}
                        className={`w-full group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-navy-600 to-blue-600 text-white rounded-lg sm:rounded-xl font-semibold hover:shadow-xl transition-all duration-300 shadow-lg hover:-translate-y-1 transform flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base ${
                          isLoading ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                      >
                        {isLoading ? (
                          <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Submitting...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                            <span>{configData.form.submitButton}</span>
                          </>
                        )}
                      </motion.button>
                      <p className="text-center text-gray-600 text-xs sm:text-sm mt-3 sm:mt-4">
                        {configData.form.contactMessage}
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ================= Bottom decorative element ================= */}
        <motion.div
          className="flex justify-center mt-10 sm:mt-12 md:mt-16"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 sm:gap-4 text-navy-600">
            <div className="w-6 h-px sm:w-8 md:w-12 bg-gradient-to-r from-transparent via-navy-400 to-transparent"></div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
              <span className="text-xs sm:text-sm font-medium">{configData.footer.text}</span>
              <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
            </div>
            <div className="w-6 h-px sm:w-8 md:w-12 bg-gradient-to-r from-transparent via-navy-400 to-transparent"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InquiryForm;