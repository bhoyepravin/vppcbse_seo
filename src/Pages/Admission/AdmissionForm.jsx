import React, { useState, useEffect } from "react";

const AdmissionForm = () => {
  // API Configuration
  const API_BASE_URL = "https://vppcms.demovoting.com/api";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [debugMode, setDebugMode] = useState(false);

  // TRAI-approved Indian mobile number prefixes
  const TRAI_VALID_PREFIXES = [
    "70",
    "71",
    "72",
    "73",
    "74",
    "75",
    "76",
    "77",
    "78",
    "79",
    "80",
    "81",
    "82",
    "83",
    "84",
    "85",
    "86",
    "87",
    "88",
    "89",
    "90",
    "91",
    "92",
    "93",
    "94",
    "95",
    "96",
    "97",
    "98",
    "99",
    "60",
    "61",
    "62",
    "63",
    "64",
    "65",
    "66",
    "67",
    "68",
    "69",
    "50",
    "51",
    "52",
    "53",
    "54",
    "55",
    "56",
    "57",
    "58",
    "59",
  ];

  // Fake number patterns to block
  const FAKE_NUMBER_PATTERNS = [
    /^(\d)\1{9}$/,
    /^1234567890$/,
    /^0987654321$/,
    /^0123456789$/,
    /^(\d{5})\1$/,
    /^(\d{3})\1{2}$/,
    /^1111111111$|^2222222222$|^3333333333$|^4444444444$|^5555555555$|^6666666666$|^7777777777$|^8888888888$|^9999999999$|^0000000000$/,
  ];

  // Add state for document checkboxes
  const [documentCheckboxes, setDocumentCheckboxes] = useState({
    birthCertificate: false,
    parentsPhoto: false,
    schoolLeavingCertificate: false,
    reportCard: false,
    studentAadharCard: false,
    medicalCertificate: false,
    casteCertificate: false,
    passportPhoto: false,
    familyPhoto: false,
  });

  const [form, setForm] = useState({
    // Section 1: School Metadata
    formNo: `FORM-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    schoolName: "VIDYA PRABODHINI PRASHALA",
    schoolAddress: "",
    cbseAffiliationNo: "",
    schoolCode: "",
    schoolUDISENo: "",

    // Section 2: Admission Details
    admissionForClass: "",
    academicYear: `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`,

    // Section 3: Student Particulars
    studentFirstName: "",
    studentMiddleName: "",
    studentLastName: "",

    // Personal Details
    dateOfBirth: "",
    placeOfBirth: "",
    bloodGroup: "",
    religion: "",
    caste: "",
    subCaste: "",
    category: "",
    motherTongue: "",
    nationality: "Indian",

    // Academic Background
    lastExaminationPassed: "",
    examinationYear: "",
    nameOfLastSchoolAttended: "",

    // Identity Information
    penNumber: "",
    aadharNumber: "",

    // Address Details
    permanentAddress: "",
    district: "",
    state: "",
    pinCode: "",
    localAddress: "",
    localPinCode: "",

    // Section 5: Father's Details
    fatherFirstName: "",
    fatherMiddleName: "",
    fatherLastName: "",
    fatherEducationalQualification: "",
    fatherOccupation: "",
    fatherAnnualIncome: "",
    fatherEmailID: "",
    fatherMobileNo1: "",
    fatherMobileNo2: "",
    fatherAadharNumber: "",
    fatherPANNumber: "",

    // Section 6: Mother's Details
    motherFirstName: "",
    motherMiddleName: "",
    motherLastName: "",
    motherEducationalQualification: "",
    motherOccupation: "",
    motherAnnualIncome: "",
    motherEmailID: "",
    motherMobileNumber: "",
    motherAadharNumber: "",
    motherPANNumber: "",

    // Section 7: Additional Information
    medicalHistory: "",
    studentAchievements: "",

    // Declaration Section
    declarationPlace: "",
    declarationDate: new Date().toISOString().split("T")[0],
  });

  // Add this function to handle checkbox changes
  const handleDocumentCheckboxChange = (documentName) => {
    setDocumentCheckboxes((prev) => ({
      ...prev,
      [documentName]: !prev[documentName],
    }));
  };

  // Declaration checkboxes and signatures state
  const [declaration, setDeclaration] = useState({
    readRules: false,
    agreeFees: false,
    confirmInfo: false,
    fatherSignature: { file: null, preview: null, error: null },
    motherSignature: { file: null, preview: null, error: null },
  });

  const [errors, setErrors] = useState({});
  const [isSameAddress, setIsSameAddress] = useState(false);

  // Validation state for mobile numbers
  const [mobileValidations, setMobileValidations] = useState({
    fatherMobileNo1: { isValid: false, message: "" },
    fatherMobileNo2: { isValid: false, message: "" },
    motherMobileNumber: { isValid: false, message: "" },
  });

  // States for dropdowns
  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
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

    Chhattisgarh: ["Raipur", "Bhilai", "Bilaspur", "Korba", "Durg", "Other"],

    Goa: ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Other"],

    Gujarat: [
      "Ahmedabad",
      "Surat",
      "Vadodara",
      "Rajkot",
      "Bhavnagar",
      "Jamnagar",
      "Other",
    ],

    Haryana: ["Gurgaon", "Faridabad", "Panipat", "Ambala", "Hisar", "Other"],

    "Himachal Pradesh": [
      "Shimla",
      "Solan",
      "Mandi",
      "Kullu",
      "Dharamshala",
      "Other",
    ],

    Jharkhand: [
      "Ranchi",
      "Jamshedpur",
      "Dhanbad",
      "Bokaro",
      "Hazaribagh",
      "Other",
    ],

    Karnataka: [
      "Bengaluru",
      "Mysuru",
      "Hubli",
      "Mangalore",
      "Belagavi",
      "Davangere",
      "Other",
    ],

    Kerala: [
      "Thiruvananthapuram",
      "Kochi",
      "Kozhikode",
      "Thrissur",
      "Alappuzha",
      "Other",
    ],

    "Madhya Pradesh": [
      "Indore",
      "Bhopal",
      "Gwalior",
      "Jabalpur",
      "Ujjain",
      "Other",
    ],

    Maharashtra: [
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
],


    Manipur: ["Imphal", "Bishnupur", "Thoubal", "Other"],

    Meghalaya: ["Shillong", "Tura", "Jowai", "Other"],

    Mizoram: ["Aizawl", "Lunglei", "Champhai", "Other"],

    Nagaland: ["Kohima", "Dimapur", "Mokokchung", "Other"],

    Odisha: [
      "Bhubaneswar",
      "Cuttack",
      "Rourkela",
      "Sambalpur",
      "Puri",
      "Other",
    ],

    Punjab: [
      "Ludhiana",
      "Amritsar",
      "Jalandhar",
      "Patiala",
      "Bathinda",
      "Other",
    ],

    Rajasthan: [
      "Jaipur",
      "Udaipur",
      "Jodhpur",
      "Kota",
      "Ajmer",
      "Bikaner",
      "Other",
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

  const bloodGroups = [
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-",
    "Under Investigation",
  ];

  const categories = ["General", "OBC", "SC", "ST", "VJNT", "SBC", "Other"];

  const religions = [
    "Hindu",
    "Muslim",
    "Christian",
    "Sikh",
    "Buddhist",
    "Jain",
    "Other",
  ];

  const motherTongues = [
  // Scheduled Languages (22)
  "Assamese",
  "Bengali",
  "Bodo",
  "Dogri",
   "English",
  "Gujarati",
  "Hindi",
  "Kannada",
  "Kashmiri",
  "Konkani",
  "Maithili",
  "Malayalam",
  "Manipuri (Meitei)",
  "Marathi",
  "Nepali",
  "Odia",
  "Punjabi",
  "Sanskrit",
  "Santali",
  "Sindhi",
  "Tamil",
  "Telugu",
  "Urdu",
];


  const castes = [
    "General",
    "OBC",
    "SC",
    "ST",
    "VJNT",
    "SBC",
    "Maratha",
    "Brahmin",
    "Kshatriya",
    "Vaishya",
    "Other",
  ];

  // Classes up to 10th only (removed 11th-12th)
  const classes = [
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

  // Generate years for Last Exam Passed dropdown (last 20 years)
  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = 0; i <= 20; i++) {
      years.push(currentYear - i);
    }
    return years;
  };

  const yearOptions = generateYearOptions();

  // Handle copy permanent address to local address
  useEffect(() => {
    if (isSameAddress) {
      setForm((prev) => ({
        ...prev,
        localAddress: prev.permanentAddress,
        localPinCode: prev.pinCode,
      }));
    }
  }, [isSameAddress, form.permanentAddress, form.pinCode]);

  // For development only - enable debug mode
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      setDebugMode(true);
    }
  }, []);

  // TRAI Mobile Number Validation Function
  const validateTRAIMobileNumber = (mobileNo, fieldName) => {
    if (!mobileNo || mobileNo.trim() === "") {
      return { isValid: false, message: "Mobile number is required" };
    }

    if (!/^\d{10}$/.test(mobileNo)) {
      return { isValid: false, message: "Mobile number must be 10 digits" };
    }

    const prefix = mobileNo.substring(0, 2);
    if (!TRAI_VALID_PREFIXES.includes(prefix)) {
      return { isValid: false, message: "Not a valid Indian mobile number" };
    }

    for (const pattern of FAKE_NUMBER_PATTERNS) {
      if (pattern.test(mobileNo)) {
        return {
          isValid: false,
          message: "Please enter a valid mobile number",
        };
      }
    }

    if (mobileNo.startsWith("0")) {
      return { isValid: false, message: "Mobile number cannot start with 0" };
    }

    const repeatedPatterns = [/^(\d{2})\1{4}$/, /^(\d{3})\1{2}\d{1}$/];

    for (const pattern of repeatedPatterns) {
      if (pattern.test(mobileNo)) {
        return { isValid: false, message: "Invalid number pattern detected" };
      }
    }

    return {
      isValid: true,
      message: `✓ Valid Indian mobile number (${getOperatorInfo(prefix)})`,
    };
  };

  // Get operator information based on prefix
  const getOperatorInfo = (prefix) => {
    const operatorMap = {
      70: "BSNL/Airtel/Jio",
      71: "BSNL/Airtel/Jio",
      72: "BSNL/Airtel/Jio",
      73: "BSNL/Airtel/Jio",
      74: "BSNL/Airtel/Jio",
      75: "BSNL/Airtel/Jio",
      76: "BSNL/Airtel/Jio",
      77: "BSNL/Airtel/Jio",
      78: "BSNL/Airtel/Jio",
      79: "BSNL/Airtel/Jio",
      80: "BSNL/Airtel/Jio",
      81: "BSNL/Airtel/Jio",
      82: "BSNL/Airtel/Jio",
      83: "BSNL/Airtel/Jio",
      84: "BSNL/Airtel/Jio",
      85: "BSNL/Airtel/Jio",
      86: "BSNL/Airtel/Jio",
      87: "BSNL/Airtel/Jio",
      88: "BSNL/Airtel/Jio",
      89: "BSNL/Airtel/Jio",
      90: "BSNL/Airtel/Jio",
      91: "BSNL/Airtel/Jio",
      92: "BSNL/Airtel/Jio",
      93: "BSNL/Airtel/Jio",
      94: "BSNL/Airtel/Jio",
      95: "BSNL/Airtel/Jio",
      96: "BSNL/Airtel/Jio",
      97: "BSNL/Airtel/Jio",
      98: "BSNL/Airtel/Jio",
      99: "BSNL/Airtel/Jio",
      60: "BSNL/Airtel/Jio",
      61: "BSNL/Airtel/Jio",
      62: "BSNL/Airtel/Jio",
      63: "BSNL/Airtel/Jio",
      64: "BSNL/Airtel/Jio",
      65: "BSNL/Airtel/Jio",
      66: "BSNL/Airtel/Jio",
      67: "BSNL/Airtel/Jio",
      68: "BSNL/Airtel/Jio",
      69: "BSNL/Airtel/Jio",
      50: "M2M/IoT",
      51: "M2M/IoT",
      52: "M2M/IoT",
      53: "M2M/IoT",
      54: "M2M/IoT",
      55: "M2M/IoT",
      56: "M2M/IoT",
      57: "M2M/IoT",
      58: "M2M/IoT",
      59: "M2M/IoT",
    };
    return operatorMap[prefix] || "Indian Operator";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Add validation for fields that should not contain digits
    const noDigitFields = [
      'studentFirstName', 'studentMiddleName', 'studentLastName',
      'placeOfBirth', 'subCaste', 'nameOfLastSchoolAttended',
      'fatherFirstName', 'fatherMiddleName', 'fatherLastName',
      'fatherOccupation', 'motherFirstName', 'motherMiddleName', 
      'motherLastName', 'motherOccupation', 'declarationPlace'
    ];

    // Special handling for mobile numbers
    if (name.includes("Mobile")) {
      const numericValue = value.replace(/\D/g, "");
      const limitedValue = numericValue.slice(0, 10);
      
      setForm((prev) => ({
        ...prev,
        [name]: limitedValue,
      }));

      if (limitedValue.length === 10) {
        const validation = validateTRAIMobileNumber(limitedValue, name);
        setMobileValidations((prev) => ({
          ...prev,
          [name]: validation,
        }));
      } else if (limitedValue.length === 0) {
        setMobileValidations((prev) => ({
          ...prev,
          [name]: { isValid: false, message: "" },
        }));
      }
    } 
    // Handle fields that should not contain digits
    else if (noDigitFields.includes(name)) {
      // Remove any digits from the input
      const textOnlyValue = value.replace(/[0-9]/g, "");
      
      setForm((prev) => ({
        ...prev,
        [name]: textOnlyValue,
      }));
    } else if (name === "aadharNumber" || name.includes("Aadhar")) {
    const numericValue = value.replace(/\D/g, "");
    const limitedValue = numericValue.slice(0, 12);
    setForm((prev) => ({
      ...prev,
      [name]: limitedValue,
    }));
    } else if (name === "penNumber") {
      const numericValue = value.replace(/\D/g, "");
      const limitedValue = numericValue.slice(0, 12);
      setForm((prev) => ({
        ...prev,
        [name]: limitedValue,
      }));
    } else if (name === "pinCode" || name === "localPinCode") {
      const numericValue = value.replace(/\D/g, "");
      const limitedValue = numericValue.slice(0, 6);
      setForm((prev) => ({
        ...prev,
        [name]: limitedValue,
      }));
    } else if (name === "state") {
      // When state changes, reset district
      setForm((prev) => ({
        ...prev,
        [name]: value,
        district: "",
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  // Handle declaration checkboxes
  const handleDeclarationChange = (e) => {
    const { name, checked } = e.target;
    setDeclaration({
      ...declaration,
      [name]: checked,
    });
  };

  // Handle signature upload
  const handleSignatureUpload = (parent, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setDeclaration((prev) => ({
        ...prev,
        [parent]: {
          file: file,
          preview: reader.result,
          error: null,
        },
      }));
    };
    reader.readAsDataURL(file);
  };

  // Clear signature
  const clearSignature = (parent) => {
    setDeclaration((prev) => ({
      ...prev,
      [parent]: { file: null, preview: null, error: null },
    }));
  };

  // const validate = () => {
  //   const newErrors = {};

    const validate = () => {
  const newErrors = {};
  
  // Add digit validation for text-only fields
  const textOnlyFields = [
    { field: 'studentFirstName', label: 'Student First Name' },
    { field: 'studentLastName', label: 'Student Last Name' },
    { field: 'placeOfBirth', label: 'Place of Birth' },
    { field: 'subCaste', label: 'Sub-Caste' },
    { field: 'nameOfLastSchoolAttended', label: 'Name of Last School Attended' },
    { field: 'fatherFirstName', label: 'Father First Name' },
    { field: 'fatherLastName', label: 'Father Last Name' },
    { field: 'fatherOccupation', label: 'Father Occupation' },
    { field: 'motherFirstName', label: 'Mother First Name' },
    { field: 'motherLastName', label: 'Mother Last Name' },
    { field: 'motherOccupation', label: 'Mother Occupation' },
    { field: 'declarationPlace', label: 'Declaration Place' },
  ];

  // Check for digits in text-only fields
  textOnlyFields.forEach(({ field, label }) => {
    if (form[field] && /\d/.test(form[field])) {
      newErrors[field] = `${label} should not contain numbers`;
    }
  });

    // Required fields validation
    const requiredFields = [
      "admissionForClass",
      "studentFirstName",
      "studentLastName",
      "dateOfBirth",
      "category",
      "permanentAddress",
      "district",
      "state",
      "pinCode",
      "fatherFirstName",
      "fatherLastName",
      "fatherMobileNo1",
      "motherFirstName",
      "motherLastName",
    ];

    requiredFields.forEach((field) => {
      if (!form[field] || form[field].trim() === "") {
        newErrors[field] = "This field is required";
      }
    });

    // Mobile number validation using TRAI standards
    if (form.fatherMobileNo1) {
      const fatherMobileValidation = validateTRAIMobileNumber(
        form.fatherMobileNo1,
        "fatherMobileNo1"
      );
      if (!fatherMobileValidation.isValid) {
        newErrors.fatherMobileNo1 = fatherMobileValidation.message;
      }
    }

    if (form.fatherMobileNo2 && form.fatherMobileNo2.trim() !== "") {
      const fatherMobile2Validation = validateTRAIMobileNumber(
        form.fatherMobileNo2,
        "fatherMobileNo2"
      );
      if (!fatherMobile2Validation.isValid) {
        newErrors.fatherMobileNo2 = fatherMobile2Validation.message;
      }
    }

    if (form.motherMobileNumber && form.motherMobileNumber.trim() !== "") {
      const motherMobileValidation = validateTRAIMobileNumber(
        form.motherMobileNumber,
        "motherMobileNumber"
      );
      if (!motherMobileValidation.isValid) {
        newErrors.motherMobileNumber = motherMobileValidation.message;
      }
    }

    // Check if both mobile numbers are the same
    if (
      form.fatherMobileNo1 &&
      form.fatherMobileNo2 &&
      form.fatherMobileNo1 === form.fatherMobileNo2
    ) {
      newErrors.fatherMobileNo2 = "Cannot be same as primary mobile number";
    }

    if (
      form.fatherMobileNo1 &&
      form.motherMobileNumber &&
      form.fatherMobileNo1 === form.motherMobileNumber
    ) {
      newErrors.motherMobileNumber = "Cannot be same as father's mobile number";
    }

    // Declaration validation
    if (
      !declaration.readRules ||
      !declaration.agreeFees ||
      !declaration.confirmInfo
    ) {
      newErrors.declaration = "Please agree to all declaration statements";
    }

    // Format validations
    if (form.penNumber && !/^[0-9]{12}$/.test(form.penNumber)) {
      newErrors.penNumber = "PEN No. must be 12 digits";
    }

    if (form.aadharNumber && !/^[0-9]{12}$/.test(form.aadharNumber)) {
      newErrors.aadharNumber = "Aadhar must be 12 digits";
    }

    if (form.pinCode && !/^[0-9]{6}$/.test(form.pinCode)) {
      newErrors.pinCode = "Pincode must be 6 digits";
    }

    if (form.localPinCode && !/^[0-9]{6}$/.test(form.localPinCode)) {
      newErrors.localPinCode = "Pincode must be 6 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Reset form function
  const resetForm = () => {
    setForm({
      formNo: `FORM-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      schoolName: "VIDYA PRABODHINI PRASHALA",
      schoolAddress: "",
      cbseAffiliationNo: "",
      schoolCode: "",
      schoolUDISENo: "",
      admissionForClass: "",
      academicYear: `${new Date().getFullYear()}-${
        new Date().getFullYear() + 1
      }`,
      studentFirstName: "",
      studentMiddleName: "",
      studentLastName: "",
      dateOfBirth: "",
      placeOfBirth: "",
      bloodGroup: "",
      religion: "",
      caste: "",
      subCaste: "",
      category: "",
      motherTongue: "",
      nationality: "Indian",
      lastExaminationPassed: "",
      examinationYear: "",
      nameOfLastSchoolAttended: "",
      penNumber: "",
      aadharNumber: "",
      permanentAddress: "",
      district: "",
      state: "",
      pinCode: "",
      localAddress: "",
      localPinCode: "",
      fatherFirstName: "",
      fatherMiddleName: "",
      fatherLastName: "",
      fatherEducationalQualification: "",
      fatherOccupation: "",
      fatherAnnualIncome: "",
      fatherEmailID: "",
      fatherMobileNo1: "",
      fatherMobileNo2: "",
      fatherAadharNumber: "",
      fatherPANNumber: "",
      motherFirstName: "",
      motherMiddleName: "",
      motherLastName: "",
      motherEducationalQualification: "",
      motherOccupation: "",
      motherAnnualIncome: "",
      motherEmailID: "",
      motherMobileNumber: "",
      motherAadharNumber: "",
      motherPANNumber: "",
      medicalHistory: "",
      studentAchievements: "",
      declarationPlace: "",
      declarationDate: new Date().toISOString().split("T")[0],
    });

    setDeclaration({
      readRules: false,
      agreeFees: false,
      confirmInfo: false,
      fatherSignature: { file: null, preview: null, error: null },
      motherSignature: { file: null, preview: null, error: null },
    });

    setErrors({});
    setMobileValidations({
      fatherMobileNo1: { isValid: false, message: "" },
      fatherMobileNo2: { isValid: false, message: "" },
      motherMobileNumber: { isValid: false, message: "" },
    });
    setIsSameAddress(false);
    setSubmitError(null);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(false);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare form data for submission
      const formData = new FormData();

      // Convert form state to match API field names (snake_case)
      const apiData = {
        // School Metadata
        school_name: "VIDYA PRABODHINI PRASHALA",
        school_address: form.schoolAddress || null,
        cbse_affiliation_no: form.cbseAffiliationNo || null,
        school_code: form.schoolCode || null,
        school_udise_no: form.schoolUDISENo || null,

        // Admission Details
        admission_for_class: form.admissionForClass,
        academic_year: form.academicYear,

        // Student Particulars
        student_first_name: form.studentFirstName,
        student_middle_name: form.studentMiddleName || null,
        student_last_name: form.studentLastName,
        date_of_birth: form.dateOfBirth,
        place_of_birth: form.placeOfBirth || null,
        blood_group: form.bloodGroup || null,
        religion: form.religion || null,
        caste: form.caste || null,
        sub_caste: form.subCaste || null,
        category: form.category,
        mother_tongue: form.motherTongue || null,
        nationality: form.nationality,

        // Academic Background
        last_examination_passed: form.lastExaminationPassed || null,
        examination_year: form.examinationYear || null,
        name_of_last_school_attended: form.nameOfLastSchoolAttended || null,

        // Identity Information
        pen_number: form.penNumber || null,
        aadhar_number: form.aadharNumber || null,

        // Address Details
        permanent_address: form.permanentAddress,
        district: form.district,
        state: form.state,
        pin_code: form.pinCode,
        local_address: form.localAddress || null,
        local_pin_code: form.localPinCode || null,

        // Father's Details
        father_first_name: form.fatherFirstName,
        father_middle_name: form.fatherMiddleName || null,
        father_last_name: form.fatherLastName,
        father_educational_qualification:
          form.fatherEducationalQualification || null,
        father_occupation: form.fatherOccupation || null,
        father_annual_income: form.fatherAnnualIncome || null,
        father_email_id: form.fatherEmailID || null,
        father_mobile_no1: form.fatherMobileNo1,
        father_mobile_no2: form.fatherMobileNo2 || null,
        father_aadhar_number: form.fatherAadharNumber || null,
        father_pan_number: form.fatherPANNumber || null,

        // Mother's Details
        mother_first_name: form.motherFirstName,
        mother_middle_name: form.motherMiddleName || null,
        mother_last_name: form.motherLastName,
        mother_educational_qualification:
          form.motherEducationalQualification || null,
        mother_occupation: form.motherOccupation || null,
        mother_annual_income: form.motherAnnualIncome || null,
        mother_email_id: form.motherEmailID || null,
        mother_mobile_number: form.motherMobileNumber || null,
        mother_aadhar_number: form.motherAadharNumber || null,
        mother_pan_number: form.motherPANNumber || null,

        // Additional Information
        medical_history: form.medicalHistory || null,
        student_achievements: form.studentAchievements || null,

        // Declaration
        declaration_place: form.declarationPlace || null,
        declaration_date: form.declarationDate,

        // Set initial status
        status: "pending",
      };

      // Append JSON data
      formData.append("data", JSON.stringify(apiData));

      // Also try appending all fields individually
      Object.keys(apiData).forEach((key) => {
        if (apiData[key] !== null && apiData[key] !== undefined) {
          formData.append(key, apiData[key]);
        }
      });

      // Append signature files if available
      if (declaration.fatherSignature.file) {
        formData.append("father_signature", declaration.fatherSignature.file);
      }

      if (declaration.motherSignature.file) {
        formData.append("mother_signature", declaration.motherSignature.file);
      }

      const response = await fetch(`${API_BASE_URL}/admissions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(apiData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitSuccess(true);
        console.log("Form submitted successfully:", result);

        // Reset form after successful submission
        setTimeout(() => {
          resetForm();
        }, 3000);
      } else {
        handleApiErrors(result);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError(
        "Network error. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to handle API errors
  const handleApiErrors = (result) => {
    if (result.errors) {
      const errorMessages = Object.entries(result.errors)
        .map(([field, message]) => {
          const readableField = field
            .replace(/_/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase());
          return `${readableField}: ${
            Array.isArray(message) ? message.join(", ") : message
          }`;
        })
        .join("\n");

      setSubmitError(`Please fix the following errors:\n${errorMessages}`);
    } else {
      const errorMessage =
        result.message || "Submission failed. Please try again.";
      setSubmitError(errorMessage);
    }
  };

  // Calculate age for display
  const calculateAge = () => {
    if (!form.dateOfBirth) return 0;
    const birthDate = new Date(form.dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  // Render Mobile Number Input with TRAI validation
  const renderMobileInput = (name, label, required = false) => {
    const validation = mobileValidations[name];

    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center">
            <span className="text-gray-600 font-medium">+91</span>
            <div className="w-px h-4 bg-gray-300 mx-2"></div>
          </div>
          <input
            type="tel"
            name={name}
            value={form[name]}
            onChange={handleChange}
            placeholder="7507546666"
            maxLength="10"
            pattern="[0-9]*"
            inputMode="numeric"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F07B3D] focus:border-transparent transition-all pl-16 ${
              errors[name]
                ? "border-red-500"
                : validation?.isValid
                ? "border-green-500"
                : "border-gray-300"
            }`}
            required={required}
          />
        </div>

        {validation?.isValid && (
          <p className="text-green-600 text-xs mt-1 flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            {validation.message}
          </p>
        )}

        {errors[name] && (
          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {errors[name]}
          </p>
        )}
      </div>
    );
  };

  // Render Document List Section (without upload functionality)
  const renderDocumentListSection = () => (
    <section className="bg-gray-50 p-6 rounded-xl border border-gray-300">
      <h2 className="text-xl font-bold text-gray-700 mb-4 pb-2 border-b border-blue-200">
        📁 Documents Required
      </h2>

      {/* Documents for Registration */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">
          Documents Required for Registration
        </h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border hover:bg-blue-50 transition-colors">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                id="birthCertificate"
                checked={documentCheckboxes.birthCertificate}
                onChange={() =>
                  handleDocumentCheckboxChange("birthCertificate")
                }
                className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="birthCertificate"
                className="font-medium text-gray-700 cursor-pointer"
              >
                Original Birth Certificate
              </label>
              <p className="text-sm text-gray-500">
                (Municipal / Government authority only - Certificate issued by
                doctors/nursing homes not accepted)
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border hover:bg-blue-50 transition-colors">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                id="parentsPhoto"
                checked={documentCheckboxes.parentsPhoto}
                onChange={() => handleDocumentCheckboxChange("parentsPhoto")}
                className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="parentsPhoto"
                className="font-medium text-gray-700 cursor-pointer"
              >
                Combined Photograph of Parents
              </label>
              <p className="text-sm text-gray-500">
                (Required for pre-school admission only)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Documents for Admission */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">
          Documents to be Submitted at the Time of Admission
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            {
              id: "schoolLeavingCertificate",
              label: "School Leaving / Transfer Certificate",
            },
            { id: "reportCard", label: "Previous Year's Report Card" },
            { id: "studentAadharCard", label: "Aadhar Card of the Student" },
            { id: "medicalCertificate", label: "Medical Certificate" },
            {
              id: "casteCertificate",
              label: "Caste Certificate of Father (if applicable)",
            },
            {
              id: "passportPhoto",
              label: "One Recent Passport-size Colour Photograph",
            },
            { id: "familyPhoto", label: "One Family Photograph" },
          ].map((doc) => (
            <div
              key={doc.id}
              className="flex items-start space-x-3 p-3 bg-white rounded-lg border hover:bg-blue-50 transition-colors"
            >
              <div className="flex items-center h-5 mt-1">
                <input
                  type="checkbox"
                  id={doc.id}
                  checked={documentCheckboxes[doc.id]}
                  onChange={() => handleDocumentCheckboxChange(doc.id)}
                  className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor={doc.id}
                  className="font-medium text-gray-700 text-sm cursor-pointer"
                >
                  {doc.label}
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Document Checklist Summary */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-semibold text-blue-800">📋 Document Checklist</h4>
          <span className="text-sm font-medium text-blue-700">
            {
              Object.values(documentCheckboxes).filter((checked) => checked)
                .length
            }{" "}
            of {Object.keys(documentCheckboxes).length} checked
          </span>
        </div>
        <div className="w-full bg-blue-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
            style={{
              width: `${
                (Object.values(documentCheckboxes).filter((checked) => checked)
                  .length /
                  Object.keys(documentCheckboxes).length) *
                100
              }%`,
            }}
          ></div>
        </div>
        <p className="text-xs text-blue-600 mt-2">
          ✓ Check all documents that you have ready for submission
        </p>
      </div>

      {/* Important Notes */}
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h4 className="font-semibold text-yellow-800 mb-2">
          📌 Important Notes:
        </h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>
            • Registration/Admission fees are not refundable and not
            transferable to another year
          </li>
          <li>
            • Fresh registration is required for subsequent year admission
          </li>
          <li>
            • Admission form will be considered invalid if documents are missing
          </li>
          <li>• Submit all documents at the time of admission</li>
        </ul>
      </div>
    </section>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-2xl rounded-2xl">
      {/* Success/Error Messages */}
      {submitSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 text-green-500 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-green-700 font-medium">
              Admission form submitted successfully! Form will reset in a few
              seconds.
            </p>
          </div>
        </div>
      )}

      {submitError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 text-red-500 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 11-16 0 8 8 0 0116 0zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <div className="text-red-700">
              <p className="font-medium mb-1">Submission Error:</p>
              <p className="text-sm whitespace-pre-line">{submitError}</p>
            </div>
          </div>
        </div>
      )}

      {/* School Header */}
      <div className="text-center mb-8 border-b-2 border-blue-200 pb-6">
        <h1 className="font-title text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gradient-navy">
          VIDYA PRABODHINI PRASHALA
        </h1>
        <p className="text-gray-600 mt-2">(Affiliated with CBSE, New Delhi)</p>
        <p className="text-sm text-gray-500 mt-1">ADMISSION FORM</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* School Metadata Section */}
        {/* <section className="bg-gray-50 p-6 rounded-xl border border-gray-300">
          <h2 className="text-xl font-bold text-gray-700 mb-4 pb-2 border-b border-blue-200">
            School Information
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Form No.
              </label>
              <input
                type="text"
                name="formNo"
                value={form.formNo}
                readOnly
                className="input bg-gray-100"
              />
            </div>
          </div>
        </section> */}

        {/* Admission Details */}
        <section className="bg-gray-50 p-6 rounded-xl border border-gray-300">
          <h2 className="text-xl font-bold text-gray-700 mb-4 pb-2 border-b border-blue-200">
            Admission Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Admission for the Class *
              </label>
              <select
                name="admissionForClass"
                value={form.admissionForClass}
                onChange={handleChange}
                className="input"
                required
              >
                <option value="">Select Class</option>
                {classes.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
              {errors.admissionForClass && (
                <p className="error">{errors.admissionForClass}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Academic Year *
              </label>
              <input
                type="text"
                name="academicYear"
                value={form.academicYear}
                readOnly
                className="input bg-gray-100"
              />
              <p className="text-xs text-gray-500 mt-1">
                Current academic year only
              </p>
            </div>
          </div>
        </section>

        {/* Student Particulars */}
        <section className="bg-gray-50 p-6 rounded-xl border border-gray-300">
          <h2 className="text-xl font-bold text-gray-700 mb-4 pb-2 border-b border-blue-200">
            Particulars of Student
          </h2>

          {/* Student Name - Block Letters */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Student Name (IN BLOCK LETTERS)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <input
                  type="text"
                  name="studentFirstName"
                  placeholder="First Name *"
                  value={form.studentFirstName}
                  onChange={handleChange}
                  className="input uppercase"
                  pattern="[A-Za-z\s]*" // Add this
                  required
                />
                {errors.studentFirstName && (
                  <p className="error">{errors.studentFirstName}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="studentMiddleName"
                  placeholder="Middle Name"
                  value={form.studentMiddleName}
                  onChange={handleChange}
                  className="input uppercase"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="studentLastName"
                  placeholder="Last Name *"
                  value={form.studentLastName}
                  onChange={handleChange}
                  className="input uppercase"
                  required
                />
                {errors.studentLastName && (
                  <p className="error">{errors.studentLastName}</p>
                )}
              </div>
            </div>
          </div>

          {/* Personal Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth *
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={form.dateOfBirth}
                onChange={handleChange}
                className="input"
                required
              />
              {form.dateOfBirth && (
                <p className="text-xs text-gray-500 mt-1">
                  Age: {calculateAge()} years
                </p>
              )}
              {errors.dateOfBirth && (
                <p className="error">{errors.dateOfBirth}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Place of Birth
              </label>
              <input
                type="text"
                name="placeOfBirth"
                placeholder="Place of Birth"
                value={form.placeOfBirth}
                onChange={handleChange}
                pattern="[A-Za-z\s]*" 
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Blood Group
              </label>
              <select
                name="bloodGroup"
                value={form.bloodGroup}
                onChange={handleChange}
                className="input"
              >
                <option value="">Select Blood Group</option>
                {bloodGroups.map((bg) => (
                  <option key={bg} value={bg}>
                    {bg}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Religion
              </label>
              <select
                name="religion"
                value={form.religion}
                onChange={handleChange}
                className="input"
              >
                <option value="">Select Religion</option>
                {religions.map((rel) => (
                  <option key={rel} value={rel}>
                    {rel}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Caste and Category Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Caste
              </label>
              <select
                name="caste"
                value={form.caste}
                onChange={handleChange}
                className="input"
              >
                <option value="">Select Caste</option>
                {castes.map((caste) => (
                  <option key={caste} value={caste}>
                    {caste}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sub-Caste
              </label>
              <input
                type="text"
                name="subCaste"
                placeholder="Sub-Caste"
                value={form.subCaste}
                onChange={handleChange}
                className="input"
                pattern="[A-Za-z\s]*"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="input"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && <p className="error">{errors.category}</p>}
            </div>
          </div>

          {/* Mother Tongue and Nationality */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mother Tongue
              </label>
              <select
                name="motherTongue"
                value={form.motherTongue}
                onChange={handleChange}
                className="input"
              >
                <option value="">Select Mother Tongue</option>
                {motherTongues.map((tongue) => (
                  <option key={tongue} value={tongue}>
                    {tongue}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nationality
              </label>
              <select
                name="nationality"
                value={form.nationality}
                onChange={handleChange}
                className="input"
              >
                <option value="Indian">Indian</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Academic Background */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              Academic Background
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Examination Passed
                </label>
                <input
                  type="text"
                  name="lastExaminationPassed"
                  placeholder="e.g., 10th Standard"
                  value={form.lastExaminationPassed}
                  onChange={handleChange}
                  className="input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Year
                </label>
                <select
                  name="examinationYear"
                  value={form.examinationYear}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="">Select Year</option>
                  {yearOptions.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name of Last School Attended
                </label>
                <input
                  type="text"
                  name="nameOfLastSchoolAttended"
                  placeholder="Previous School Name"
                  value={form.nameOfLastSchoolAttended}
                  onChange={handleChange}
                  className="input"
                  pattern="[A-Za-z0-9\s\-.,()&]*"
                />
              </div>
            </div>
          </div>

          {/* Identity Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                PEN Number
              </label>
              <input
                type="text"
                name="penNumber"
                placeholder="12-digit PEN No. (e.g., 123456789012)"
                value={form.penNumber}
                onChange={handleChange}
                className="input"
                maxLength="12"
              />
              <p className="text-xs text-gray-500 mt-1">
                Example: 123456789012
              </p>
              {errors.penNumber && <p className="error">{errors.penNumber}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Aadhar Number of Student
              </label>
              <input
                type="text"
                name="aadharNumber"
                placeholder="12-digit Aadhar"
                value={form.aadharNumber}
                onChange={handleChange}
                className="input"
                maxLength="12"
              />
              {errors.aadharNumber && (
                <p className="error">{errors.aadharNumber}</p>
              )}
            </div>
          </div>

          {/* Address Details */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                Permanent Address
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address *
                  </label>
                  <textarea
                    name="permanentAddress"
                    placeholder="Full Permanent Address"
                    value={form.permanentAddress}
                    onChange={handleChange}
                    rows="3"
                    className="input"
                    required
                  />
                  {errors.permanentAddress && (
                    <p className="error">{errors.permanentAddress}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State *
                    </label>
                    <select
                      name="state"
                      value={form.state}
                      onChange={handleChange}
                      className="input"
                      required
                    >
                      <option value="">Select State</option>
                      {states.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                    {errors.state && <p className="error">{errors.state}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      District *
                    </label>
                    <select
                      name="district"
                      value={form.district}
                      onChange={handleChange}
                      className="input"
                      required
                      disabled={!form.state}
                    >
                      <option value="">
                        {form.state ? "Select District" : "Select State First"}
                      </option>
                      {form.state &&
                        districts[form.state]?.map((district) => (
                          <option key={district} value={district}>
                            {district}
                          </option>
                        ))}
                    </select>
                    {errors.district && (
                      <p className="error">{errors.district}</p>
                    )}
                  </div>

                  

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pin Code *
                    </label>
                    <input
                      type="text"
                      name="pinCode"
                      placeholder="6-digit Pin Code"
                      value={form.pinCode}
                      onChange={handleChange}
                      className="input"
                      maxLength="6"
                      required
                    />
                    {errors.pinCode && (
                      <p className="error">{errors.pinCode}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Local Address */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-700">
                  Local Address (for communication)
                </h3>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="sameAddress"
                    checked={isSameAddress}
                    onChange={(e) => setIsSameAddress(e.target.checked)}
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                  <label
                    htmlFor="sameAddress"
                    className="ml-2 text-sm text-gray-700"
                  >
                    Same as Permanent Address
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <textarea
                    name="localAddress"
                    placeholder="Local Address"
                    value={form.localAddress}
                    onChange={handleChange}
                    rows="2"
                    className="input"
                    disabled={isSameAddress}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Local Pin Code
                  </label>
                  <input
                    type="text"
                    name="localPinCode"
                    placeholder="Local Pin Code"
                    value={form.localPinCode}
                    onChange={handleChange}
                    className="input"
                    maxLength="6"
                    disabled={isSameAddress}
                  />
                  {errors.localPinCode && (
                    <p className="error">{errors.localPinCode}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Father's Details */}
        <section className="bg-gray-50 p-6 rounded-xl border border-gray-300">
          <h2 className="text-xl font-bold text-gray-700 mb-4 pb-2 border-b border-blue-200">
            Father's Details
          </h2>

          {/* Father's Name - Block Letters */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Father's Name (IN BLOCK LETTERS)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <input
                  type="text"
                  name="fatherFirstName"
                  placeholder="First Name *"
                  value={form.fatherFirstName}
                  onChange={handleChange}
                  className="input uppercase"
                  required
                />
                {errors.fatherFirstName && (
                  <p className="error">{errors.fatherFirstName}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="fatherMiddleName"
                  placeholder="Middle Name"
                  value={form.fatherMiddleName}
                  onChange={handleChange}
                  className="input uppercase"
                  pattern="[A-Za-z\s]*"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="fatherLastName"
                  placeholder="Last Name *"
                  value={form.fatherLastName}
                  onChange={handleChange}
                  className="input uppercase"
                  required
                />
                {errors.fatherLastName && (
                  <p className="error">{errors.fatherLastName}</p>
                )}
              </div>
            </div>
          </div>

          {/* Father's Professional Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Educational Qualification
              </label>
              <input
                type="text"
                name="fatherEducationalQualification"
                placeholder="Highest Qualification"
                value={form.fatherEducationalQualification}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Occupation
              </label>
              <input
                type="text"
                name="fatherOccupation"
                placeholder="Occupation"
                value={form.fatherOccupation}
                onChange={handleChange}
                className="input"
                pattern="[A-Za-z\s]*"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Annual Income
              </label>
              <input
                type="text"
                name="fatherAnnualIncome"
                placeholder="Annual Income"
                value={form.fatherAnnualIncome}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email ID
              </label>
              <input
                type="email"
                name="fatherEmailID"
                placeholder="Email Address"
                value={form.fatherEmailID}
                onChange={handleChange}
                className="input"
              />
            </div>
          </div>

          {/* Father's Contact & Identity */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {renderMobileInput("fatherMobileNo1", "Mobile No. 1 *", true)}
            {renderMobileInput("fatherMobileNo2", "Mobile No. 2", false)}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Aadhar Number
              </label>
              <input
                type="text"
                name="fatherAadharNumber"
                placeholder="Father's Aadhar"
                value={form.fatherAadharNumber}
                onChange={handleChange}
                className="input"
                maxLength="12"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                PAN Number
              </label>
              <input
                type="text"
                name="fatherPANNumber"
                placeholder="PAN No. (e.g., ABCDE1234F)"
                value={form.fatherPANNumber}
                onChange={handleChange}
                className="input"
                maxLength="10"
              />
              <p className="text-xs text-gray-500 mt-1">Example: ABCDE1234F</p>
            </div>
          </div>
        </section>

        {/* Mother's Details */}
        <section className="bg-gray-50 p-6 rounded-xl border border-gray-300">
          <h2 className="text-xl font-bold text-gray-700 mb-4 pb-2 border-b border-blue-200">
            Mother's Details
          </h2>

          {/* Mother's Name - Block Letters */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mother's Name (IN BLOCK LETTERS)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <input
                  type="text"
                  name="motherFirstName"
                  placeholder="First Name *"
                  value={form.motherFirstName}
                  onChange={handleChange}
                  className="input uppercase"
                  pattern="[A-Za-z\s]*" 
                  required
                />
                {errors.motherFirstName && (
                  <p className="error">{errors.motherFirstName}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="motherMiddleName"
                  placeholder="Middle Name"
                  value={form.motherMiddleName}
                  onChange={handleChange}
                  className="input uppercase"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="motherLastName"
                  placeholder="Last Name *"
                  value={form.motherLastName}
                  onChange={handleChange}
                  className="input uppercase"
                  required
                />
                {errors.motherLastName && (
                  <p className="error">{errors.motherLastName}</p>
                )}
              </div>
            </div>
          </div>

          {/* Mother's Professional Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Educational Qualification
              </label>
              <input
                type="text"
                name="motherEducationalQualification"
                placeholder="Highest Qualification"
                value={form.motherEducationalQualification}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Occupation
              </label>
              <input
                type="text"
                name="motherOccupation"
                placeholder="Occupation"
                value={form.motherOccupation}
                onChange={handleChange}
                pattern="[A-Za-z\s]*" 
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Annual Income
              </label>
              <input
                type="text"
                name="motherAnnualIncome"
                placeholder="Annual Income"
                value={form.motherAnnualIncome}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email ID
              </label>
              <input
                type="email"
                name="motherEmailID"
                placeholder="Email Address"
                value={form.motherEmailID}
                onChange={handleChange}
                className="input"
              />
            </div>
          </div>

          {/* Mother's Contact & Identity */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {renderMobileInput("motherMobileNumber", "Mobile Number", false)}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Aadhar Number
              </label>
              <input
                type="text"
                name="motherAadharNumber"
                placeholder="Mother's Aadhar"
                value={form.motherAadharNumber}
                onChange={handleChange}
                className="input"
                maxLength="12"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                PAN Number
              </label>
              <input
                type="text"
                name="motherPANNumber"
                placeholder="PAN No. (e.g., ABCDE1234F)"
                value={form.motherPANNumber}
                onChange={handleChange}
                className="input"
                maxLength="10"
              />
              <p className="text-xs text-gray-500 mt-1">Example: ABCDE1234F</p>
            </div>
          </div>
        </section>

        {/* Additional Information */}
        <section className="bg-gray-50 p-6 rounded-xl border border-gray-300">
          <h2 className="text-xl font-bold text-gray-700 mb-4 pb-2 border-b border-blue-200">
            Additional Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Medical History of the Student
              </label>
              <textarea
                name="medicalHistory"
                placeholder="Any medical conditions, allergies, etc."
                value={form.medicalHistory}
                onChange={handleChange}
                rows="4"
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Achievements of the Student
              </label>
              <textarea
                name="studentAchievements"
                placeholder="Academic or extracurricular achievements"
                value={form.studentAchievements}
                onChange={handleChange}
                rows="4"
                className="input"
              />
            </div>
          </div>
        </section>

        {/* Document List Section (without uploads) */}
        {renderDocumentListSection()}

        {/* Declaration Section with checkboxes and signature upload */}
        <section className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
          <h2 className="text-xl font-bold text-gray-700 mb-4 pb-2 border-b border-yellow-300">
            Declaration of Parents / Guardian
          </h2>

          <div className="mb-4 text-sm text-gray-700 space-y-4">
            {/* Declaration Statements with Checkboxes */}
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="flex items-center h-5 mt-0.5">
                  <input
                    type="checkbox"
                    name="readRules"
                    checked={declaration.readRules}
                    onChange={handleDeclarationChange}
                    className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="font-medium">
                    We have read and understood the school rules and regulations
                    as printed in the school almanac and we abide by them.
                  </label>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex items-center h-5 mt-0.5">
                  <input
                    type="checkbox"
                    name="agreeFees"
                    checked={declaration.agreeFees}
                    onChange={handleDeclarationChange}
                    className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="font-medium">
                    We undertake to pay the school fees on due date.
                  </label>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex items-center h-5 mt-0.5">
                  <input
                    type="checkbox"
                    name="confirmInfo"
                    checked={declaration.confirmInfo}
                    onChange={handleDeclarationChange}
                    className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="font-medium">
                    We confirm that the information provided above is true and
                    correct based on valid government documents.
                  </label>
                </div>
              </div>
            </div>

            {errors.declaration && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{errors.declaration}</p>
              </div>
            )}
          </div>

          {/* Place, Date and Signature Uploads */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Place
              </label>
              <input
                type="text"
                name="declarationPlace"
                placeholder="Place"
                value={form.declarationPlace}
                onChange={handleChange}
                pattern="[A-Za-z\s]*" 
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                name="declarationDate"
                value={form.declarationDate}
                onChange={handleChange}
                className="input"
              />
            </div>

            {/* Father's Signature Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Signature of Father / Guardian
              </label>
              <div className="border border-gray-300 rounded-lg p-2 bg-white">
                {declaration.fatherSignature.preview ? (
                  <div className="space-y-2">
                    <img
                      src={declaration.fatherSignature.preview}
                      alt="Father's Signature"
                      className="h-12 object-contain mx-auto"
                    />
                    <div className="flex justify-center space-x-2">
                      <button
                        type="button"
                        onClick={() => clearSignature("fatherSignature")}
                        className="text-xs text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-1">
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png,.svg"
                      onChange={(e) =>
                        handleSignatureUpload("fatherSignature", e)
                      }
                      className="block w-full text-xs text-gray-500"
                    />
                    <p className="text-xs text-gray-400">JPG/PNG/SVG</p>
                  </div>
                )}
              </div>
            </div>

            {/* Mother's Signature Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Signature of Mother
              </label>
              <div className="border border-gray-300 rounded-lg p-2 bg-white">
                {declaration.motherSignature.preview ? (
                  <div className="space-y-2">
                    <img
                      src={declaration.motherSignature.preview}
                      alt="Mother's Signature"
                      className="h-12 object-contain mx-auto"
                    />
                    <div className="flex justify-center space-x-2">
                      <button
                        type="button"
                        onClick={() => clearSignature("motherSignature")}
                        className="text-xs text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-1">
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png,.svg"
                      onChange={(e) =>
                        handleSignatureUpload("motherSignature", e)
                      }
                      className="block w-full text-xs text-gray-500"
                    />
                    <p className="text-xs text-gray-400">JPG/PNG/SVG</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-600 italic mb-6 p-3 bg-white rounded-lg border">
            <p className="font-medium mb-1">Important Note:</p>
            <p>
              Information provided above will be recorded in the School General
              Register and no change will be permitted later.
            </p>
          </div>
        </section>

        {/* Submit Button */}
        <div className="text-center pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-10 py-4 gradient-navy text-white text-lg font-semibold rounded-lg  transition duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Submitting...
              </span>
            ) : (
              "Submit Admission Form"
            )}
          </button>

          <p className="text-sm text-gray-500 mt-3">
            Note: All fields marked with * are mandatory
          </p>
          <p className="text-sm text-blue-600 mt-2">
            ✓ Please check all declaration boxes before submitting
          </p>
        </div>
      </form>
    </div>
  );
};

// CSS styles
const styles = `
  .input {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    transition: all 0.2s;
    background-color: white;
  }

  .input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  .input:disabled {
    background-color: #f3f4f6;
    cursor: not-allowed;
  }

  .input.uppercase {
    text-transform: uppercase;
  }

  .input.bg-gray-100 {
    background-color: #f3f4f6;
  }

  .error {
    color: #ef4444;
    font-size: 0.75rem;
    margin-top: 0.25rem;
  }

  textarea.input {
    resize: vertical;
    min-height: 80px;
  }

  /* Hide number input arrows */
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button,
  input[type="tel"]::-webkit-inner-spin-button,
  input[type="tel"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  input[type="number"],
  input[type="tel"] {
    -moz-appearance: textfield;
  }
`;

// Add the styles to the document head
if (typeof document !== "undefined") {
  const styleElement = document.createElement("style");
  styleElement.innerHTML = styles;
  document.head.appendChild(styleElement);
}

export default AdmissionForm;

// import React, { useState, useEffect } from "react";

// const AdmissionForm = () => {
//   // API Configuration
//   const API_BASE_URL = "https://vppcms.demovoting.com/api";
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitSuccess, setSubmitSuccess] = useState(false);
//   const [submitError, setSubmitError] = useState(null);
//   const [debugMode, setDebugMode] = useState(false);

//   // TRAI-approved Indian mobile number prefixes
//   const TRAI_VALID_PREFIXES = [
//     "70",
//     "71",
//     "72",
//     "73",
//     "74",
//     "75",
//     "76",
//     "77",
//     "78",
//     "79", // New numbering series
//     "80",
//     "81",
//     "82",
//     "83",
//     "84",
//     "85",
//     "86",
//     "87",
//     "88",
//     "89", // Existing series
//     "90",
//     "91",
//     "92",
//     "93",
//     "94",
//     "95",
//     "96",
//     "97",
//     "98",
//     "99", // Existing series
//     "60",
//     "61",
//     "62",
//     "63",
//     "64",
//     "65",
//     "66",
//     "67",
//     "68",
//     "69", // Existing series
//     "50",
//     "51",
//     "52",
//     "53",
//     "54",
//     "55",
//     "56",
//     "57",
//     "58",
//     "59", // M2M/IoT
//   ];

//   // Fake number patterns to block
//   const FAKE_NUMBER_PATTERNS = [
//     /^(\d)\1{9}$/, // All same digits (0000000000, 1111111111, etc.)
//     /^1234567890$/, // Sequential ascending
//     /^0987654321$/, // Sequential descending
//     /^0123456789$/, // 0-9 sequential
//     /^(\d{5})\1$/, // Repeated pattern (1234512345)
//     /^(\d{3})\1{2}$/, // Triple repeated pattern (123123123)
//     /^1111111111$|^2222222222$|^3333333333$|^4444444444$|^5555555555$|^6666666666$|^7777777777$|^8888888888$|^9999999999$|^0000000000$/,
//   ];

//   const [form, setForm] = useState({
//     // Section 1: School Metadata (Pre-filled/Administrative - will be auto-filled)
//     formNo: `FORM-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
//     schoolName: "VIDYA PRABODHINI PRASHALA",
//     schoolAddress: "",
//     cbseAffiliationNo: "",
//     schoolCode: "",
//     schoolUDISENo: "",

//     // Section 2: Admission Details
//     admissionForClass: "",
//     academicYear: "",

//     // Section 3: Student Particulars
//     studentFirstName: "",
//     studentMiddleName: "",
//     studentLastName: "",

//     // Personal Details
//     dateOfBirth: "",
//     placeOfBirth: "",
//     bloodGroup: "",
//     religion: "",
//     caste: "",
//     subCaste: "",
//     category: "",
//     motherTongue: "",
//     nationality: "Indian",

//     // Academic Background
//     lastExaminationPassed: "",
//     examinationYear: "",
//     nameOfLastSchoolAttended: "",

//     // Identity Information
//     penNumber: "",
//     aadharNumber: "",

//     // Address Details
//     permanentAddress: "",
//     district: "",
//     state: "",
//     pinCode: "",
//     localAddress: "",
//     localPinCode: "",

//     // Section 5: Father's Details
//     fatherFirstName: "",
//     fatherMiddleName: "",
//     fatherLastName: "",
//     fatherEducationalQualification: "",
//     fatherOccupation: "",
//     fatherAnnualIncome: "",
//     fatherEmailID: "",
//     fatherMobileNo1: "",
//     fatherMobileNo2: "",
//     fatherAadharNumber: "",
//     fatherPANNumber: "",

//     // Section 6: Mother's Details
//     motherFirstName: "",
//     motherMiddleName: "",
//     motherLastName: "",
//     motherEducationalQualification: "",
//     motherOccupation: "",
//     motherAnnualIncome: "",
//     motherEmailID: "",
//     motherMobileNumber: "",
//     motherAadharNumber: "",
//     motherPANNumber: "",

//     // Section 7: Additional Information
//     medicalHistory: "",
//     studentAchievements: "",

//     // Declaration Section
//     declarationPlace: "",
//     declarationDate: new Date().toISOString().split("T")[0],
//   });

//   // Document Upload States with size validation
//   const [uploadedDocuments, setUploadedDocuments] = useState({
//     birthCertificate: {
//       file: null,
//       preview: null,
//       uploaded: false,
//       error: null,
//     },
//     parentsPhoto: { file: null, preview: null, uploaded: false, error: null },
//     schoolLeavingCertificate: {
//       file: null,
//       preview: null,
//       uploaded: false,
//       error: null,
//     },
//     reportCard: { file: null, preview: null, uploaded: false, error: null },
//     studentAadharCard: {
//       file: null,
//       preview: null,
//       uploaded: false,
//       error: null,
//     },
//     medicalCertificate: {
//       file: null,
//       preview: null,
//       uploaded: false,
//       error: null,
//     },
//     casteCertificate: {
//       file: null,
//       preview: null,
//       uploaded: false,
//       error: null,
//     },
//     passportPhoto: { file: null, preview: null, uploaded: false, error: null },
//     familyPhoto: { file: null, preview: null, uploaded: false, error: null },
//   });

//   const [studentPhoto, setStudentPhoto] = useState({
//     file: null,
//     preview: null,
//     error: null,
//   });

//   // Declaration checkboxes and signatures state
//   const [declaration, setDeclaration] = useState({
//     readRules: false,
//     agreeFees: false,
//     confirmInfo: false,
//     fatherSignature: { file: null, preview: null, error: null },
//     motherSignature: { file: null, preview: null, error: null },
//   });

//   const [errors, setErrors] = useState({});
//   const [isSameAddress, setIsSameAddress] = useState(false);

//   // Validation state for mobile numbers
//   const [mobileValidations, setMobileValidations] = useState({
//     fatherMobileNo1: { isValid: false, message: "" },
//     fatherMobileNo2: { isValid: false, message: "" },
//     motherMobileNumber: { isValid: false, message: "" },
//   });

//   // States for dropdowns
//   const states = [
//     "Maharashtra",
//     "Gujarat",
//     "Karnataka",
//     "Tamil Nadu",
//     "Kerala",
//     "Rajasthan",
//     "Madhya Pradesh",
//     "Uttar Pradesh",
//     "West Bengal",
//     "Delhi",
//     "Other",
//   ];

//   const districts = {
//     Maharashtra: ["Nashik", "Pune", "Mumbai", "Nagpur", "Thane", "Aurangabad"],
//     Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar"],
//     Karnataka: ["Bengaluru", "Mysuru", "Hubli", "Mangalore"],
//     "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem"],
//     Kerala: ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur"],
//     Rajasthan: ["Jaipur", "Udaipur", "Jodhpur", "Kota"],
//     "Madhya Pradesh": ["Indore", "Bhopal", "Gwalior", "Jabalpur"],
//     "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra"],
//     "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Asansol"],
//     Delhi: ["New Delhi", "North Delhi", "South Delhi", "East Delhi"],
//     Other: ["Other"],
//   };

//   const bloodGroups = [
//     "A+",
//     "A-",
//     "B+",
//     "B-",
//     "AB+",
//     "AB-",
//     "O+",
//     "O-",
//     "Other",
//   ];
//   const categories = ["General", "OBC", "SC", "ST", "VJNT", "SBC", "Other"];
//   const religions = [
//     "Hindu",
//     "Muslim",
//     "Christian",
//     "Sikh",
//     "Buddhist",
//     "Jain",
//     "Other",
//   ];
//   const motherTongues = ["Marathi", "Hindi", "English", "Gujarati", "Other"];

//   const classes = [
//     "Nursery",
//     "LKG",
//     "UKG",
//     "1st",
//     "2nd",
//     "3rd",
//     "4th",
//     "5th",
//     "6th",
//     "7th",
//     "8th",
//     "9th",
//     "10th",
//   ];

//   // File size limits in bytes
//   const FILE_LIMITS = {
//     IMAGE_MAX_SIZE: 200 * 1024,
//     PDF_MAX_SIZE: 1024 * 1024,
//     SIGNATURE_MAX_SIZE: 200 * 1024,
//   };

//   const currentYear = new Date().getFullYear();
//   const academicYears = [
//     `${currentYear}-${currentYear + 1}`,
//     `${currentYear + 1}-${currentYear + 2}`,
//     `${currentYear + 2}-${currentYear + 3}`,
//   ];

//   // Handle copy permanent address to local address
//   useEffect(() => {
//     if (isSameAddress) {
//       setForm((prev) => ({
//         ...prev,
//         localAddress: prev.permanentAddress,
//         localPinCode: prev.pinCode,
//       }));
//     }
//   }, [isSameAddress, form.permanentAddress, form.pinCode]);

//   // For development only - enable debug mode
//   useEffect(() => {
//     if (process.env.NODE_ENV === "development") {
//       setDebugMode(true);
//     }
//   }, []);

//   // TRAI Mobile Number Validation Function
//   const validateTRAIMobileNumber = (mobileNo, fieldName) => {
//     if (!mobileNo || mobileNo.trim() === "") {
//       return { isValid: false, message: "Mobile number is required" };
//     }

//     // Check if it's exactly 10 digits
//     if (!/^\d{10}$/.test(mobileNo)) {
//       return { isValid: false, message: "Mobile number must be 10 digits" };
//     }

//     // Check if it starts with a valid TRAI prefix
//     const prefix = mobileNo.substring(0, 2);
//     if (!TRAI_VALID_PREFIXES.includes(prefix)) {
//       return { isValid: false, message: "Not a valid Indian mobile number" };
//     }

//     // Check for fake number patterns
//     for (const pattern of FAKE_NUMBER_PATTERNS) {
//       if (pattern.test(mobileNo)) {
//         return {
//           isValid: false,
//           message: "Please enter a valid mobile number",
//         };
//       }
//     }

//     // Additional validation for specific invalid numbers
//     if (mobileNo.startsWith("0")) {
//       return { isValid: false, message: "Mobile number cannot start with 0" };
//     }

//     // Check for repeated sequences (like 1212121212, 1234123412)
//     const repeatedPatterns = [
//       /^(\d{2})\1{4}$/, // Double repeated 5 times
//       /^(\d{3})\1{2}\d{1}$/, // Triple repeated with variation
//     ];

//     for (const pattern of repeatedPatterns) {
//       if (pattern.test(mobileNo)) {
//         return { isValid: false, message: "Invalid number pattern detected" };
//       }
//     }

//     // If it passes all checks
//     return {
//       isValid: true,
//       message: `✓ Valid Indian mobile number (${getOperatorInfo(prefix)})`,
//     };
//   };

//   // Get operator information based on prefix
//   const getOperatorInfo = (prefix) => {
//     const operatorMap = {
//       70: "BSNL/Airtel/Jio",
//       71: "BSNL/Airtel/Jio",
//       72: "BSNL/Airtel/Jio",
//       73: "BSNL/Airtel/Jio",
//       74: "BSNL/Airtel/Jio",
//       75: "BSNL/Airtel/Jio",
//       76: "BSNL/Airtel/Jio",
//       77: "BSNL/Airtel/Jio",
//       78: "BSNL/Airtel/Jio",
//       79: "BSNL/Airtel/Jio",
//       80: "BSNL/Airtel/Jio",
//       81: "BSNL/Airtel/Jio",
//       82: "BSNL/Airtel/Jio",
//       83: "BSNL/Airtel/Jio",
//       84: "BSNL/Airtel/Jio",
//       85: "BSNL/Airtel/Jio",
//       86: "BSNL/Airtel/Jio",
//       87: "BSNL/Airtel/Jio",
//       88: "BSNL/Airtel/Jio",
//       89: "BSNL/Airtel/Jio",
//       90: "BSNL/Airtel/Jio",
//       91: "BSNL/Airtel/Jio",
//       92: "BSNL/Airtel/Jio",
//       93: "BSNL/Airtel/Jio",
//       94: "BSNL/Airtel/Jio",
//       95: "BSNL/Airtel/Jio",
//       96: "BSNL/Airtel/Jio",
//       97: "BSNL/Airtel/Jio",
//       98: "BSNL/Airtel/Jio",
//       99: "BSNL/Airtel/Jio",
//       60: "BSNL/Airtel/Jio",
//       61: "BSNL/Airtel/Jio",
//       62: "BSNL/Airtel/Jio",
//       63: "BSNL/Airtel/Jio",
//       64: "BSNL/Airtel/Jio",
//       65: "BSNL/Airtel/Jio",
//       66: "BSNL/Airtel/Jio",
//       67: "BSNL/Airtel/Jio",
//       68: "BSNL/Airtel/Jio",
//       69: "BSNL/Airtel/Jio",
//       50: "M2M/IoT",
//       51: "M2M/IoT",
//       52: "M2M/IoT",
//       53: "M2M/IoT",
//       54: "M2M/IoT",
//       55: "M2M/IoT",
//       56: "M2M/IoT",
//       57: "M2M/IoT",
//       58: "M2M/IoT",
//       59: "M2M/IoT",
//     };
//     return operatorMap[prefix] || "Indian Operator";
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // Special handling for mobile numbers
//     if (name.includes("Mobile")) {
//       // Only allow numbers
//       const numericValue = value.replace(/\D/g, "");
//       // Limit to 10 digits
//       const limitedValue = numericValue.slice(0, 10);

//       setForm((prev) => ({
//         ...prev,
//         [name]: limitedValue,
//       }));

//       // Validate mobile number in real-time
//       if (limitedValue.length === 10) {
//         const validation = validateTRAIMobileNumber(limitedValue, name);
//         setMobileValidations((prev) => ({
//           ...prev,
//           [name]: validation,
//         }));
//       } else if (limitedValue.length === 0) {
//         setMobileValidations((prev) => ({
//           ...prev,
//           [name]: { isValid: false, message: "" },
//         }));
//       }
//     } else if (name === "aadharNumber" || name.includes("Aadhar")) {
//       // Handle Aadhar numbers
//       const numericValue = value.replace(/\D/g, "");
//       const limitedValue = numericValue.slice(0, 12);
//       setForm((prev) => ({
//         ...prev,
//         [name]: limitedValue,
//       }));
//     } else if (name === "pinCode" || name === "localPinCode") {
//       // Handle Pin Codes
//       const numericValue = value.replace(/\D/g, "");
//       const limitedValue = numericValue.slice(0, 6);
//       setForm((prev) => ({
//         ...prev,
//         [name]: limitedValue,
//       }));
//     } else {
//       setForm((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }

//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors({
//         ...errors,
//         [name]: null,
//       });
//     }
//   };

//   // Handle declaration checkboxes
//   const handleDeclarationChange = (e) => {
//     const { name, checked } = e.target;
//     setDeclaration({
//       ...declaration,
//       [name]: checked,
//     });
//   };

//   // File type validation
//   const isValidFileType = (file, allowedTypes) => {
//     const fileType = file.type.toLowerCase();
//     const fileExtension = file.name.split(".").pop().toLowerCase();

//     const allowedExtensions = allowedTypes.map((type) => type.toLowerCase());
//     const isTypeAllowed = allowedTypes.some(
//       (type) =>
//         fileType.includes(type.toLowerCase()) ||
//         allowedExtensions.includes(fileExtension)
//     );

//     return isTypeAllowed;
//   };

//   // File size validation
//   const isValidFileSize = (file, maxSize) => {
//     return file.size <= maxSize;
//   };

//   // Format file size for display
//   const formatFileSize = (bytes) => {
//     if (bytes < 1024) return bytes + " bytes";
//     else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
//     else return (bytes / (1024 * 1024)).toFixed(1) + " MB";
//   };

//   // Handle signature upload with validation
//   const handleSignatureUpload = (parent, e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setDeclaration((prev) => ({
//       ...prev,
//       [parent]: {
//         ...prev[parent],
//         error: null,
//       },
//     }));

//     if (!isValidFileType(file, ["jpg", "jpeg", "png", "svg"])) {
//       setDeclaration((prev) => ({
//         ...prev,
//         [parent]: {
//           ...prev[parent],
//           error:
//             "Invalid file type. Only JPG, JPEG, PNG, SVG files are allowed.",
//         },
//       }));
//       return;
//     }

//     if (!isValidFileSize(file, FILE_LIMITS.SIGNATURE_MAX_SIZE)) {
//       setDeclaration((prev) => ({
//         ...prev,
//         [parent]: {
//           ...prev[parent],
//           error: `File size too large. Maximum size is ${formatFileSize(
//             FILE_LIMITS.SIGNATURE_MAX_SIZE
//           )}. Your file: ${formatFileSize(file.size)}`,
//         },
//       }));
//       return;
//     }

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setDeclaration((prev) => ({
//         ...prev,
//         [parent]: {
//           file: file,
//           preview: reader.result,
//           error: null,
//         },
//       }));
//     };
//     reader.readAsDataURL(file);
//   };

//   // Clear signature
//   const clearSignature = (parent) => {
//     setDeclaration((prev) => ({
//       ...prev,
//       [parent]: { file: null, preview: null, error: null },
//     }));
//   };

//   // Handle file uploads with validation
//   const handleFileUpload = (documentType, e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setUploadedDocuments((prev) => ({
//       ...prev,
//       [documentType]: {
//         ...prev[documentType],
//         error: null,
//       },
//     }));

//     const isImage =
//       documentType.includes("Photo") ||
//       documentType === "passportPhoto" ||
//       documentType === "familyPhoto" ||
//       documentType === "parentsPhoto";

//     const isPDF =
//       documentType.includes("Certificate") ||
//       documentType === "reportCard" ||
//       documentType === "studentAadharCard" ||
//       documentType === "birthCertificate";

//     if (isImage && !isValidFileType(file, ["jpg", "jpeg", "png"])) {
//       setUploadedDocuments((prev) => ({
//         ...prev,
//         [documentType]: {
//           ...prev[documentType],
//           error: "Invalid file type. Only JPG, JPEG, PNG files are allowed.",
//         },
//       }));
//       return;
//     }

//     if (isPDF && !isValidFileType(file, ["pdf"])) {
//       setUploadedDocuments((prev) => ({
//         ...prev,
//         [documentType]: {
//           ...prev[documentType],
//           error: "Invalid file type. Only PDF files are allowed.",
//         },
//       }));
//       return;
//     }

//     const maxSize = isImage
//       ? FILE_LIMITS.IMAGE_MAX_SIZE
//       : FILE_LIMITS.PDF_MAX_SIZE;
//     if (!isValidFileSize(file, maxSize)) {
//       setUploadedDocuments((prev) => ({
//         ...prev,
//         [documentType]: {
//           ...prev[documentType],
//           error: `File size too large. Maximum size is ${formatFileSize(
//             maxSize
//           )}. Your file: ${formatFileSize(file.size)}`,
//         },
//       }));
//       return;
//     }

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setUploadedDocuments((prev) => ({
//         ...prev,
//         [documentType]: {
//           file: file,
//           preview: reader.result,
//           uploaded: true,
//           error: null,
//         },
//       }));
//     };
//     reader.readAsDataURL(file);
//   };

//   // Handle student photo upload with validation
//   const handleStudentPhotoUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setStudentPhoto({ file: null, preview: null, error: null });

//     if (!isValidFileType(file, ["jpg", "jpeg", "png"])) {
//       setStudentPhoto({
//         file: null,
//         preview: null,
//         error: "Invalid file type. Only JPG, JPEG, PNG files are allowed.",
//       });
//       return;
//     }

//     if (!isValidFileSize(file, FILE_LIMITS.IMAGE_MAX_SIZE)) {
//       setStudentPhoto({
//         file: null,
//         preview: null,
//         error: `File size too large. Maximum size is ${formatFileSize(
//           FILE_LIMITS.IMAGE_MAX_SIZE
//         )}. Your file: ${formatFileSize(file.size)}`,
//       });
//       return;
//     }

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setStudentPhoto({
//         file: file,
//         preview: reader.result,
//         error: null,
//       });
//     };
//     reader.readAsDataURL(file);
//   };

//   const validate = () => {
//     const newErrors = {};

//     // Required fields validation
//     const requiredFields = [
//       "admissionForClass",
//       "academicYear",
//       "studentFirstName",
//       "studentLastName",
//       "dateOfBirth",
//       "category",
//       "permanentAddress",
//       "district",
//       "state",
//       "pinCode",
//       "fatherFirstName",
//       "fatherLastName",
//       "fatherMobileNo1",
//       "motherFirstName",
//       "motherLastName",
//     ];

//     requiredFields.forEach((field) => {
//       if (!form[field] || form[field].trim() === "") {
//         newErrors[field] = "This field is required";
//       }
//     });

//     // Mobile number validation using TRAI standards
//     if (form.fatherMobileNo1) {
//       const fatherMobileValidation = validateTRAIMobileNumber(
//         form.fatherMobileNo1,
//         "fatherMobileNo1"
//       );
//       if (!fatherMobileValidation.isValid) {
//         newErrors.fatherMobileNo1 = fatherMobileValidation.message;
//       }
//     }

//     if (form.fatherMobileNo2 && form.fatherMobileNo2.trim() !== "") {
//       const fatherMobile2Validation = validateTRAIMobileNumber(
//         form.fatherMobileNo2,
//         "fatherMobileNo2"
//       );
//       if (!fatherMobile2Validation.isValid) {
//         newErrors.fatherMobileNo2 = fatherMobile2Validation.message;
//       }
//     }

//     if (form.motherMobileNumber && form.motherMobileNumber.trim() !== "") {
//       const motherMobileValidation = validateTRAIMobileNumber(
//         form.motherMobileNumber,
//         "motherMobileNumber"
//       );
//       if (!motherMobileValidation.isValid) {
//         newErrors.motherMobileNumber = motherMobileValidation.message;
//       }
//     }

//     // Check if both mobile numbers are the same
//     if (
//       form.fatherMobileNo1 &&
//       form.fatherMobileNo2 &&
//       form.fatherMobileNo1 === form.fatherMobileNo2
//     ) {
//       newErrors.fatherMobileNo2 = "Cannot be same as primary mobile number";
//     }

//     if (
//       form.fatherMobileNo1 &&
//       form.motherMobileNumber &&
//       form.fatherMobileNo1 === form.motherMobileNumber
//     ) {
//       newErrors.motherMobileNumber = "Cannot be same as father's mobile number";
//     }

//     // Declaration validation
//     if (
//       !declaration.readRules ||
//       !declaration.agreeFees ||
//       !declaration.confirmInfo
//     ) {
//       newErrors.declaration = "Please agree to all declaration statements";
//     }

//     // Format validations
//     if (form.aadharNumber && !/^[0-9]{12}$/.test(form.aadharNumber)) {
//       newErrors.aadharNumber = "Aadhar must be 12 digits";
//     }

//     if (form.pinCode && !/^[0-9]{6}$/.test(form.pinCode)) {
//       newErrors.pinCode = "Pincode must be 6 digits";
//     }

//     if (form.localPinCode && !/^[0-9]{6}$/.test(form.localPinCode)) {
//       newErrors.localPinCode = "Pincode must be 6 digits";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Reset form function
//   const resetForm = () => {
//     setForm({
//       formNo: `FORM-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
//       schoolName: "VIDYA PRABODHINI PRASHALA",
//       schoolAddress: "",
//       cbseAffiliationNo: "",
//       schoolCode: "",
//       schoolUDISENo: "",
//       admissionForClass: "",
//       academicYear: "",
//       studentFirstName: "",
//       studentMiddleName: "",
//       studentLastName: "",
//       dateOfBirth: "",
//       placeOfBirth: "",
//       bloodGroup: "",
//       religion: "",
//       caste: "",
//       subCaste: "",
//       category: "",
//       motherTongue: "",
//       nationality: "Indian",
//       lastExaminationPassed: "",
//       examinationYear: "",
//       nameOfLastSchoolAttended: "",
//       penNumber: "",
//       aadharNumber: "",
//       permanentAddress: "",
//       district: "",
//       state: "",
//       pinCode: "",
//       localAddress: "",
//       localPinCode: "",
//       fatherFirstName: "",
//       fatherMiddleName: "",
//       fatherLastName: "",
//       fatherEducationalQualification: "",
//       fatherOccupation: "",
//       fatherAnnualIncome: "",
//       fatherEmailID: "",
//       fatherMobileNo1: "",
//       fatherMobileNo2: "",
//       fatherAadharNumber: "",
//       fatherPANNumber: "",
//       motherFirstName: "",
//       motherMiddleName: "",
//       motherLastName: "",
//       motherEducationalQualification: "",
//       motherOccupation: "",
//       motherAnnualIncome: "",
//       motherEmailID: "",
//       motherMobileNumber: "",
//       motherAadharNumber: "",
//       motherPANNumber: "",
//       medicalHistory: "",
//       studentAchievements: "",
//       declarationPlace: "",
//       declarationDate: new Date().toISOString().split("T")[0],
//     });

//     setUploadedDocuments({
//       birthCertificate: {
//         file: null,
//         preview: null,
//         uploaded: false,
//         error: null,
//       },
//       parentsPhoto: { file: null, preview: null, uploaded: false, error: null },
//       schoolLeavingCertificate: {
//         file: null,
//         preview: null,
//         uploaded: false,
//         error: null,
//       },
//       reportCard: { file: null, preview: null, uploaded: false, error: null },
//       studentAadharCard: {
//         file: null,
//         preview: null,
//         uploaded: false,
//         error: null,
//       },
//       medicalCertificate: {
//         file: null,
//         preview: null,
//         uploaded: false,
//         error: null,
//       },
//       casteCertificate: {
//         file: null,
//         preview: null,
//         uploaded: false,
//         error: null,
//       },
//       passportPhoto: {
//         file: null,
//         preview: null,
//         uploaded: false,
//         error: null,
//       },
//       familyPhoto: { file: null, preview: null, uploaded: false, error: null },
//     });

//     setStudentPhoto({
//       file: null,
//       preview: null,
//       error: null,
//     });

//     setDeclaration({
//       readRules: false,
//       agreeFees: false,
//       confirmInfo: false,
//       fatherSignature: { file: null, preview: null, error: null },
//       motherSignature: { file: null, preview: null, error: null },
//     });

//     setErrors({});
//     setMobileValidations({
//       fatherMobileNo1: { isValid: false, message: "" },
//       fatherMobileNo2: { isValid: false, message: "" },
//       motherMobileNumber: { isValid: false, message: "" },
//     });
//     setIsSameAddress(false);
//     setSubmitError(null);
//   };

//   // Test API function (for debugging)
//   const testApiCall = async () => {
//     const testData = {
//       school_name: "VIDYA PRABODHINI PRASHALA",
//       admission_for_class: "1st",
//       academic_year: "2024-2025",
//       student_first_name: "Test",
//       student_last_name: "Student",
//       date_of_birth: "2018-01-01",
//       category: "General",
//       permanent_address: "Test Address",
//       district: "Test",
//       state: "Maharashtra",
//       pin_code: "411001",
//       father_first_name: "TestFather",
//       father_last_name: "Test",
//       father_mobile_no1: "9876543210",
//       mother_first_name: "TestMother",
//       mother_last_name: "Test",
//       declaration_date: new Date().toISOString().split("T")[0],
//       status: "pending",
//     };

//     try {
//       console.log("Testing API with minimal data:", testData);

//       const response = await fetch(`${API_BASE_URL}/admissions`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//         body: JSON.stringify(testData),
//       });

//       const result = await response.json();
//       console.log("Test API Response:", result);

//       if (result.success) {
//         alert("Test API call successful!");
//       } else {
//         alert(
//           `Test API failed: ${JSON.stringify(result.errors || result.message)}`
//         );
//       }
//     } catch (error) {
//       console.error("Test API error:", error);
//       alert("Test API call failed: " + error.message);
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitError(null);
//     setSubmitSuccess(false);

//     if (!validate()) {
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       // Prepare form data for submission
//       const formData = new FormData();

//       // Convert form state to match API field names (snake_case)
//       const apiData = {
//         // School Metadata
//         school_name: "VIDYA PRABODHINI PRASHALA",
//         school_address: form.schoolAddress || null,
//         cbse_affiliation_no: form.cbseAffiliationNo || null,
//         school_code: form.schoolCode || null,
//         school_udise_no: form.schoolUDISENo || null,

//         // Admission Details
//         admission_for_class: form.admissionForClass,
//         academic_year: form.academicYear,

//         // Student Particulars
//         student_first_name: form.studentFirstName,
//         student_middle_name: form.studentMiddleName || null,
//         student_last_name: form.studentLastName,
//         date_of_birth: form.dateOfBirth,
//         place_of_birth: form.placeOfBirth || null,
//         blood_group: form.bloodGroup || null,
//         religion: form.religion || null,
//         caste: form.caste || null,
//         sub_caste: form.subCaste || null,
//         category: form.category,
//         mother_tongue: form.motherTongue || null,
//         nationality: form.nationality,

//         // Academic Background
//         last_examination_passed: form.lastExaminationPassed || null,
//         examination_year: form.examinationYear || null,
//         name_of_last_school_attended: form.nameOfLastSchoolAttended || null,

//         // Identity Information
//         pen_number: form.penNumber || null,
//         aadhar_number: form.aadharNumber || null,

//         // Address Details
//         permanent_address: form.permanentAddress,
//         district: form.district,
//         state: form.state,
//         pin_code: form.pinCode,
//         local_address: form.localAddress || null,
//         local_pin_code: form.localPinCode || null,

//         // Father's Details
//         father_first_name: form.fatherFirstName,
//         father_middle_name: form.fatherMiddleName || null,
//         father_last_name: form.fatherLastName,
//         father_educational_qualification:
//           form.fatherEducationalQualification || null,
//         father_occupation: form.fatherOccupation || null,
//         father_annual_income: form.fatherAnnualIncome || null,
//         father_email_id: form.fatherEmailID || null,
//         father_mobile_no1: form.fatherMobileNo1,
//         father_mobile_no2: form.fatherMobileNo2 || null,
//         father_aadhar_number: form.fatherAadharNumber || null,
//         father_pan_number: form.fatherPANNumber || null,

//         // Mother's Details
//         mother_first_name: form.motherFirstName,
//         mother_middle_name: form.motherMiddleName || null,
//         mother_last_name: form.motherLastName,
//         mother_educational_qualification:
//           form.motherEducationalQualification || null,
//         mother_occupation: form.motherOccupation || null,
//         mother_annual_income: form.motherAnnualIncome || null,
//         mother_email_id: form.motherEmailID || null,
//         mother_mobile_number: form.motherMobileNumber || null,
//         mother_aadhar_number: form.motherAadharNumber || null,
//         mother_pan_number: form.motherPANNumber || null,

//         // Additional Information
//         medical_history: form.medicalHistory || null,
//         student_achievements: form.studentAchievements || null,

//         // Declaration
//         declaration_place: form.declarationPlace || null,
//         declaration_date: form.declarationDate,

//         // Set initial status
//         status: "pending",
//       };

//       // Log the data for debugging
//       if (debugMode) {
//         console.log("Submitting API data:", apiData);
//       }

//       // Append JSON data - Try different formats
//       formData.append("data", JSON.stringify(apiData));

//       // Also try appending all fields individually
//       Object.keys(apiData).forEach((key) => {
//         if (apiData[key] !== null && apiData[key] !== undefined) {
//           formData.append(key, apiData[key]);
//         }
//       });

//       // Append student photo
//       if (studentPhoto.file) {
//         formData.append("student_photo", studentPhoto.file);
//       }

//       // Append all document files
//       Object.keys(uploadedDocuments).forEach((key) => {
//         if (uploadedDocuments[key].file) {
//           formData.append(key, uploadedDocuments[key].file);
//         }
//       });

//       // Append signature files
//       if (declaration.fatherSignature.file) {
//         formData.append("father_signature", declaration.fatherSignature.file);
//       }

//       if (declaration.motherSignature.file) {
//         formData.append("mother_signature", declaration.motherSignature.file);
//       }

//       // Log FormData for debugging
//       if (debugMode) {
//         console.log("FormData entries:");
//         for (let pair of formData.entries()) {
//           console.log(
//             pair[0] + ", " + (pair[0] === "data" ? "JSON data" : typeof pair[1])
//           );
//         }
//       }

//       // Try sending as plain JSON first (without files) to test
//       // If this works, then the issue is with FormData
//       const testResponse = await fetch(`${API_BASE_URL}/admissions`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//         body: JSON.stringify(apiData),
//       });

//       const testResult = await testResponse.json();

//       if (debugMode) {
//         console.log("JSON-only test response:", testResult);
//       }

//       if (testResult.success) {
//         // JSON worked, now try with FormData for files
//         const response = await fetch(`${API_BASE_URL}/admissions`, {
//           method: "POST",
//           headers: {
//             Accept: "application/json",
//           },
//           body: formData,
//         });

//         const result = await response.json();

//         if (debugMode) {
//           console.log("Full FormData API Response:", result);
//         }

//         if (result.success) {
//           setSubmitSuccess(true);
//           console.log("Form submitted successfully:", result);

//           // Reset form after successful submission
//           setTimeout(() => {
//             resetForm();
//           }, 3000);
//         } else {
//           // Handle API validation errors
//           handleApiErrors(result);
//         }
//       } else {
//         // Handle JSON test errors
//         handleApiErrors(testResult);
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       setSubmitError(
//         "Network error. Please check your connection and try again."
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Helper function to handle API errors
//   const handleApiErrors = (result) => {
//     if (result.errors) {
//       console.error("Validation errors:", result.errors);

//       // Create user-friendly error messages
//       const errorMessages = Object.entries(result.errors)
//         .map(([field, message]) => {
//           // Convert snake_case to readable field names
//           const readableField = field
//             .replace(/_/g, " ")
//             .replace(/\b\w/g, (l) => l.toUpperCase());
//           return `${readableField}: ${
//             Array.isArray(message) ? message.join(", ") : message
//           }`;
//         })
//         .join("\n");

//       setSubmitError(`Please fix the following errors:\n${errorMessages}`);

//       // Also set field-specific errors for display
//       const fieldErrors = {};
//       Object.entries(result.errors).forEach(([field, messages]) => {
//         // Convert snake_case to camelCase for our form state
//         const camelCaseField = field.replace(/_([a-z])/g, (g) =>
//           g[1].toUpperCase()
//         );
//         fieldErrors[camelCaseField] = Array.isArray(messages)
//           ? messages[0]
//           : messages;
//       });

//       setErrors((prev) => ({ ...prev, ...fieldErrors }));
//     } else {
//       const errorMessage =
//         result.message || "Submission failed. Please try again.";
//       setSubmitError(errorMessage);
//     }
//   };

//   // Calculate age for display
//   const calculateAge = () => {
//     if (!form.dateOfBirth) return 0;
//     const birthDate = new Date(form.dateOfBirth);
//     const today = new Date();
//     let age = today.getFullYear() - birthDate.getFullYear();
//     const monthDiff = today.getMonth() - birthDate.getMonth();
//     if (
//       monthDiff < 0 ||
//       (monthDiff === 0 && today.getDate() < birthDate.getDate())
//     ) {
//       age--;
//     }
//     return age;
//   };

//   // Render Mobile Number Input with TRAI validation
//   const renderMobileInput = (name, label, required = false) => {
//     const validation = mobileValidations[name];

//     return (
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           {label} {required && <span className="text-red-500">*</span>}
//         </label>
//         <div className="relative">
//           <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center">
//             <span className="text-gray-600 font-medium">+91</span>
//             <div className="w-px h-4 bg-gray-300 mx-2"></div>
//           </div>
//           <input
//             type="tel"
//             name={name}
//             value={form[name]}
//             onChange={handleChange}
//             placeholder="9876543210"
//             maxLength="10"
//             pattern="[0-9]*"
//             inputMode="numeric"
//             className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F07B3D] focus:border-transparent transition-all pl-16 ${
//               errors[name]
//                 ? "border-red-500"
//                 : validation?.isValid
//                 ? "border-green-500"
//                 : "border-gray-300"
//             }`}
//             required={required}
//           />
//         </div>

//         {/* Validation messages */}
//         {validation?.isValid && (
//           <p className="text-green-600 text-xs mt-1 flex items-center gap-1">
//             <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
//               <path
//                 fillRule="evenodd"
//                 d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                 clipRule="evenodd"
//               />
//             </svg>
//             {validation.message}
//           </p>
//         )}

//         {errors[name] && (
//           <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
//             <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
//               <path
//                 fillRule="evenodd"
//                 d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
//                 clipRule="evenodd"
//               />
//             </svg>
//             {errors[name]}
//           </p>
//         )}

//         {!errors[name] &&
//           !validation?.isValid &&
//           form[name] &&
//           form[name].length === 10 && (
//             <p className="text-yellow-600 text-xs mt-1">
//               Validating mobile number...
//             </p>
//           )}
//       </div>
//     );
//   };

//   // Render document upload section
//   const renderDocumentUploadSection = () => (
//     <section className="bg-gray-50 p-6 rounded-xl border border-gray-300">
//       <h2 className="text-xl font-bold text-gray-700 mb-4 pb-2 border-b border-blue-200">
//         📁 Documents Upload
//       </h2>

//       {/* File Requirements Info */}
//       <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
//         <h3 className="font-semibold text-blue-800 mb-2">
//           📋 File Requirements:
//         </h3>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
//           <div className="flex items-center">
//             <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
//             <span className="font-medium">Images:</span>
//             <span className="ml-2">≤ 200 KB, JPG/PNG, 150 DPI</span>
//           </div>
//           <div className="flex items-center">
//             <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
//             <span className="font-medium">PDFs:</span>
//             <span className="ml-2">≤ 1 MB, PDF format</span>
//           </div>
//           <div className="flex items-center">
//             <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
//             <span className="font-medium">Signatures:</span>
//             <span className="ml-2">≤ 200 KB, JPG/PNG/SVG</span>
//           </div>
//         </div>
//       </div>

//       {/* Student Photo Upload */}
//       <div className="mb-6">
//         <h3 className="text-lg font-semibold text-gray-700 mb-3">
//           Student Passport Size Photograph
//         </h3>
//         <div className="flex items-center space-x-6">
//           <div className="w-32 h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
//             {studentPhoto.preview ? (
//               <img
//                 src={studentPhoto.preview}
//                 alt="Student"
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <div className="text-center p-4">
//                 <div className="text-gray-400 mb-2">Upload Photo</div>
//                 <p className="text-xs text-gray-500">Passport size (35x45mm)</p>
//               </div>
//             )}
//           </div>
//           <div className="flex-1">
//             <div className="space-y-2">
//               <input
//                 type="file"
//                 accept=".jpg,.jpeg,.png"
//                 onChange={handleStudentPhotoUpload}
//                 className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//               />
//               <p className="text-sm text-gray-500">
//                 Max size: 200 KB | Format: JPG, JPEG, PNG | DPI: 150
//               </p>
//               {studentPhoto.error && (
//                 <div className="p-2 bg-red-50 border border-red-200 rounded">
//                   <p className="text-red-600 text-sm">{studentPhoto.error}</p>
//                 </div>
//               )}
//               {studentPhoto.file && !studentPhoto.error && (
//                 <div className="p-2 bg-green-50 border border-green-200 rounded">
//                   <p className="text-green-600 text-sm">
//                     ✓ File uploaded: {studentPhoto.file.name} (
//                     {formatFileSize(studentPhoto.file.size)})
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Documents for Registration */}
//       <div className="mb-8">
//         <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">
//           Documents Required for Registration
//         </h3>
//         <div className="space-y-4">
//           {/* Birth Certificate */}
//           <div className="flex items-start space-x-4 p-3 bg-white rounded-lg border">
//             <div className="flex items-center h-5">
//               <input
//                 type="checkbox"
//                 checked={uploadedDocuments.birthCertificate.uploaded}
//                 readOnly
//                 className="h-4 w-4 text-green-600 rounded focus:ring-blue-500"
//               />
//             </div>
//             <div className="flex-1">
//               <label className="font-medium text-gray-700">
//                 Original Birth Certificate
//               </label>
//               <p className="text-sm text-gray-500">
//                 (Municipal / Government authority only - Certificate issued by
//                 doctors/nursing homes not accepted)
//               </p>
//               <div className="mt-2 space-y-1">
//                 <input
//                   type="file"
//                   accept=".pdf,.jpg,.jpeg,.png"
//                   onChange={(e) => handleFileUpload("birthCertificate", e)}
//                   className="block w-full text-sm text-gray-500 file:mr-4 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//                 />
//                 <p className="text-xs text-gray-500">
//                   Max size: 1 MB | Format: PDF preferred
//                 </p>
//                 {uploadedDocuments.birthCertificate.error && (
//                   <p className="text-red-500 text-xs">
//                     {uploadedDocuments.birthCertificate.error}
//                   </p>
//                 )}
//                 {uploadedDocuments.birthCertificate.file &&
//                   !uploadedDocuments.birthCertificate.error && (
//                     <p className="text-green-600 text-xs">
//                       ✓ {uploadedDocuments.birthCertificate.file.name} (
//                       {formatFileSize(
//                         uploadedDocuments.birthCertificate.file.size
//                       )}
//                       )
//                     </p>
//                   )}
//               </div>
//             </div>
//             {uploadedDocuments.birthCertificate.preview && (
//               <div className="w-16 h-20 border rounded overflow-hidden">
//                 <img
//                   src={uploadedDocuments.birthCertificate.preview}
//                   alt="Birth Certificate"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             )}
//           </div>

//           {/* Parents Photo */}
//           <div className="flex items-start space-x-4 p-3 bg-white rounded-lg border">
//             <div className="flex items-center h-5">
//               <input
//                 type="checkbox"
//                 checked={uploadedDocuments.parentsPhoto.uploaded}
//                 readOnly
//                 className="h-4 w-4 text-green-600 rounded focus:ring-blue-500"
//               />
//             </div>
//             <div className="flex-1">
//               <label className="font-medium text-gray-700">
//                 Combined Photograph of Parents
//               </label>
//               <p className="text-sm text-gray-500">
//                 (Required for pre-school admission only)
//               </p>
//               <div className="mt-2 space-y-1">
//                 <input
//                   type="file"
//                   accept=".jpg,.jpeg,.png"
//                   onChange={(e) => handleFileUpload("parentsPhoto", e)}
//                   className="block w-full text-sm text-gray-500 file:mr-4 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//                 />
//                 <p className="text-xs text-gray-500">
//                   Max size: 200 KB | Format: JPG, JPEG, PNG | DPI: 150
//                 </p>
//                 {uploadedDocuments.parentsPhoto.error && (
//                   <p className="text-red-500 text-xs">
//                     {uploadedDocuments.parentsPhoto.error}
//                   </p>
//                 )}
//                 {uploadedDocuments.parentsPhoto.file &&
//                   !uploadedDocuments.parentsPhoto.error && (
//                     <p className="text-green-600 text-xs">
//                       ✓ {uploadedDocuments.parentsPhoto.file.name} (
//                       {formatFileSize(uploadedDocuments.parentsPhoto.file.size)}
//                       )
//                     </p>
//                   )}
//               </div>
//             </div>
//             {uploadedDocuments.parentsPhoto.preview && (
//               <div className="w-16 h-20 border rounded overflow-hidden">
//                 <img
//                   src={uploadedDocuments.parentsPhoto.preview}
//                   alt="Parents Photo"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Documents for Admission */}
//       <div>
//         <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">
//           Documents to be Submitted at the Time of Admission
//         </h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {[
//             {
//               key: "schoolLeavingCertificate",
//               label: "School Leaving / Transfer Certificate",
//               type: "pdf",
//               maxSize: "1 MB",
//             },
//             {
//               key: "reportCard",
//               label: "Previous Year's Report Card",
//               type: "pdf",
//               maxSize: "1 MB",
//             },
//             {
//               key: "studentAadharCard",
//               label: "Aadhar Card of the Student",
//               type: "pdf",
//               maxSize: "1 MB",
//             },
//             {
//               key: "medicalCertificate",
//               label: "Medical Certificate",
//               type: "pdf",
//               maxSize: "1 MB",
//             },
//             {
//               key: "casteCertificate",
//               label: "Caste Certificate of Father (if applicable)",
//               type: "pdf",
//               maxSize: "1 MB",
//             },
//             {
//               key: "passportPhoto",
//               label: "One Recent Passport-size Colour Photograph",
//               type: "image",
//               maxSize: "200 KB",
//             },
//             {
//               key: "familyPhoto",
//               label: "One Family Photograph",
//               type: "image",
//               maxSize: "200 KB",
//             },
//           ].map((doc, index) => (
//             <div
//               key={doc.key}
//               className={`flex items-start space-x-3 p-3 bg-white rounded-lg border ${
//                 index >= 4 ? "md:col-span-1" : ""
//               }`}
//             >
//               <div className="flex items-center h-5 mt-1">
//                 <input
//                   type="checkbox"
//                   checked={uploadedDocuments[doc.key].uploaded}
//                   readOnly
//                   className="h-4 w-4 text-green-600 rounded focus:ring-blue-500"
//                 />
//               </div>
//               <div className="flex-1 min-w-0">
//                 <label className="font-medium text-gray-700 text-sm">
//                   {doc.label}
//                 </label>
//                 <div className="mt-1 space-y-1">
//                   <input
//                     type="file"
//                     accept={doc.type === "image" ? ".jpg,.jpeg,.png" : ".pdf"}
//                     onChange={(e) => handleFileUpload(doc.key, e)}
//                     className="block w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//                   />
//                   <p className="text-xs text-gray-500">
//                     Max size: {doc.maxSize} | Format:{" "}
//                     {doc.type === "image" ? "JPG, JPEG, PNG" : "PDF"} | DPI:{" "}
//                     {doc.type === "image" ? "150" : "N/A"}
//                   </p>
//                   {uploadedDocuments[doc.key].error && (
//                     <p className="text-red-500 text-xs">
//                       {uploadedDocuments[doc.key].error}
//                     </p>
//                   )}
//                   {uploadedDocuments[doc.key].file &&
//                     !uploadedDocuments[doc.key].error && (
//                       <p className="text-green-600 text-xs">
//                         ✓ {uploadedDocuments[doc.key].file.name} (
//                         {formatFileSize(uploadedDocuments[doc.key].file.size)})
//                       </p>
//                     )}
//                 </div>
//               </div>
//               {uploadedDocuments[doc.key].preview && (
//                 <div className="w-12 h-16 border rounded overflow-hidden flex-shrink-0">
//                   <img
//                     src={uploadedDocuments[doc.key].preview}
//                     alt={doc.label}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Important Notes */}
//       <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
//         <h4 className="font-semibold text-yellow-800 mb-2">
//           📌 Important Notes:
//         </h4>
//         <ul className="text-sm text-yellow-700 space-y-1">
//           <li>
//             • Registration/Admission fees are not refundable and not
//             transferable to another year
//           </li>
//           <li>
//             • Fresh registration is required for subsequent year admission
//           </li>
//           <li>
//             • Admission form will be considered invalid if documents are missing
//             or don't meet requirements
//           </li>
//           <li>
//             • For best quality, ensure images are 150 DPI and properly cropped
//           </li>
//         </ul>
//       </div>
//     </section>
//   );

//   return (
//     <div className="max-w-6xl mx-auto p-6 bg-white shadow-2xl rounded-2xl">
//       {/* Success/Error Messages */}
//       {submitSuccess && (
//         <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
//           <div className="flex items-center">
//             <svg
//               className="w-5 h-5 text-green-500 mr-2"
//               fill="currentColor"
//               viewBox="0 0 20 20"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                 clipRule="evenodd"
//               />
//             </svg>
//             <p className="text-green-700 font-medium">
//               Admission form submitted successfully! Form will reset in a few
//               seconds.
//             </p>
//           </div>
//         </div>
//       )}

//       {submitError && (
//         <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
//           <div className="flex items-center">
//             <svg
//               className="w-5 h-5 text-red-500 mr-2"
//               fill="currentColor"
//               viewBox="0 0 20 20"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
//                 clipRule="evenodd"
//               />
//             </svg>
//             <div className="text-red-700">
//               <p className="font-medium mb-1">Submission Error:</p>
//               <p className="text-sm whitespace-pre-line">{submitError}</p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Debug Section */}
//       {debugMode && (
//         <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
//           <div className="flex justify-between items-center mb-2">
//             <h3 className="font-bold text-purple-800">Debug Mode</h3>
//             <button
//               onClick={() => setDebugMode(false)}
//               className="text-xs px-2 py-1 bg-purple-600 text-white rounded"
//             >
//               Hide
//             </button>
//           </div>
//           <div className="space-y-2">
//             <button
//               onClick={testApiCall}
//               className="px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700"
//             >
//               Test API (JSON only)
//             </button>
//             <p className="text-xs text-purple-600">
//               API Base URL: {API_BASE_URL}
//             </p>
//           </div>
//         </div>
//       )}

//       {/* School Header */}
//       <div className="text-center mb-8 border-b-2 border-blue-200 pb-6">
//         <h1 className="text-3xl font-extrabold text-gray-500">
//           VIDYA PRABODHINI PRASHALA
//         </h1>
//         <p className="text-gray-600 mt-2">(Affiliated with CBSE, New Delhi)</p>
//         <p className="text-sm text-gray-500 mt-1">ADMISSION FORM</p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-8">
//         {/* School Metadata Section */}
//         <section className="bg-gray-50 p-6 rounded-xl border border-gray-300">
//           <h2 className="text-xl font-bold text-gray-700 mb-4 pb-2 border-b border-blue-200">
//             School Information
//           </h2>
//           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Form No.
//               </label>
//               <input
//                 type="text"
//                 name="formNo"
//                 value={form.formNo}
//                 readOnly
//                 className="input bg-gray-100"
//               />
//             </div>
//           </div>
//         </section>

//         {/* Admission Details */}
//         <section className="bg-gray-50 p-6 rounded-xl border border-gray-300">
//           <h2 className="text-xl font-bold text-gray-700 mb-4 pb-2 border-b border-blue-200">
//             Admission Details
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Admission for the Class *
//               </label>
//               <select
//                 name="admissionForClass"
//                 value={form.admissionForClass}
//                 onChange={handleChange}
//                 className="input"
//                 required
//               >
//                 <option value="">Select Class</option>
//                 {classes.map((cls) => (
//                   <option key={cls} value={cls}>
//                     {cls}
//                   </option>
//                 ))}
//               </select>
//               {errors.admissionForClass && (
//                 <p className="error">{errors.admissionForClass}</p>
//               )}
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Academic Year *
//               </label>
//               <select
//                 name="academicYear"
//                 value={form.academicYear}
//                 onChange={handleChange}
//                 className="input"
//                 required
//               >
//                 <option value="">2025-26</option>
//                 {/* {academicYears.map((year) => (
//                   <option key={year} value={year}>
//                     {year}
//                   </option>
//                 ))} */}
//               </select>
//               {errors.academicYear && (
//                 <p className="error">{errors.academicYear}</p>
//               )}
//             </div>
//           </div>
//         </section>

//         {/* Student Particulars */}
//         <section className="bg-gray-50 p-6 rounded-xl border border-gray-300">
//           <h2 className="text-xl font-bold text-gray-700 mb-4 pb-2 border-b border-blue-200">
//             Particulars of Student
//           </h2>

//           {/* Student Name - Block Letters */}
//           <div className="mb-6">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Student Name (IN BLOCK LETTERS)
//             </label>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div>
//                 <input
//                   type="text"
//                   name="studentFirstName"
//                   placeholder="First Name *"
//                   value={form.studentFirstName}
//                   onChange={handleChange}
//                   className="input uppercase"
//                   required
//                 />
//                 {errors.studentFirstName && (
//                   <p className="error">{errors.studentFirstName}</p>
//                 )}
//               </div>
//               <div>
//                 <input
//                   type="text"
//                   name="studentMiddleName"
//                   placeholder="Middle Name"
//                   value={form.studentMiddleName}
//                   onChange={handleChange}
//                   className="input uppercase"
//                 />
//               </div>
//               <div>
//                 <input
//                   type="text"
//                   name="studentLastName"
//                   placeholder="Last Name *"
//                   value={form.studentLastName}
//                   onChange={handleChange}
//                   className="input uppercase"
//                   required
//                 />
//                 {errors.studentLastName && (
//                   <p className="error">{errors.studentLastName}</p>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Personal Details Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Date of Birth *
//               </label>
//               <input
//                 type="date"
//                 name="dateOfBirth"
//                 value={form.dateOfBirth}
//                 onChange={handleChange}
//                 className="input"
//                 required
//               />
//               {form.dateOfBirth && (
//                 <p className="text-xs text-gray-500 mt-1">
//                   Age: {calculateAge()} years
//                 </p>
//               )}
//               {errors.dateOfBirth && (
//                 <p className="error">{errors.dateOfBirth}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Place of Birth
//               </label>
//               <input
//                 type="text"
//                 name="placeOfBirth"
//                 placeholder="Place of Birth"
//                 value={form.placeOfBirth}
//                 onChange={handleChange}
//                 className="input"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Blood Group
//               </label>
//               <select
//                 name="bloodGroup"
//                 value={form.bloodGroup}
//                 onChange={handleChange}
//                 className="input"
//               >
//                 <option value="">Select Blood Group</option>
//                 {bloodGroups.map((bg) => (
//                   <option key={bg} value={bg}>
//                     {bg}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Religion
//               </label>
//               <select
//                 name="religion"
//                 value={form.religion}
//                 onChange={handleChange}
//                 className="input"
//               >
//                 <option value="">Select Religion</option>
//                 {religions.map((rel) => (
//                   <option key={rel} value={rel}>
//                     {rel}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* Caste and Category Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Caste
//               </label>
//               <input
//                 type="text"
//                 name="caste"
//                 placeholder="Caste"
//                 value={form.caste}
//                 onChange={handleChange}
//                 className="input"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Sub-Caste
//               </label>
//               <input
//                 type="text"
//                 name="subCaste"
//                 placeholder="Sub-Caste"
//                 value={form.subCaste}
//                 onChange={handleChange}
//                 className="input"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Category *
//               </label>
//               <select
//                 name="category"
//                 value={form.category}
//                 onChange={handleChange}
//                 className="input"
//                 required
//               >
//                 <option value="">Select Category</option>
//                 {categories.map((cat) => (
//                   <option key={cat} value={cat}>
//                     {cat}
//                   </option>
//                 ))}
//               </select>
//               {errors.category && <p className="error">{errors.category}</p>}
//             </div>
//           </div>

//           {/* Mother Tongue and Nationality */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Mother Tongue
//               </label>
//               <select
//                 name="motherTongue"
//                 value={form.motherTongue}
//                 onChange={handleChange}
//                 className="input"
//               >
//                 <option value="">Select Mother Tongue</option>
//                 {motherTongues.map((tongue) => (
//                   <option key={tongue} value={tongue}>
//                     {tongue}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Nationality
//               </label>
//               <select
//                 name="nationality"
//                 value={form.nationality}
//                 onChange={handleChange}
//                 className="input"
//               >
//                 <option value="Indian">Indian</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>
//           </div>

//           {/* Academic Background */}
//           <div className="mb-6">
//             <h3 className="text-lg font-semibold text-gray-700 mb-3">
//               Academic Background
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Last Examination Passed
//                 </label>
//                 <input
//                   type="text"
//                   name="lastExaminationPassed"
//                   placeholder="e.g., 10th Standard"
//                   value={form.lastExaminationPassed}
//                   onChange={handleChange}
//                   className="input"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Year
//                 </label>
//                 <input
//                   type="text"
//                   name="examinationYear"
//                   placeholder="Year"
//                   value={form.examinationYear}
//                   onChange={handleChange}
//                   className="input"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Name of Last School Attended
//                 </label>
//                 <input
//                   type="text"
//                   name="nameOfLastSchoolAttended"
//                   placeholder="Previous School Name"
//                   value={form.nameOfLastSchoolAttended}
//                   onChange={handleChange}
//                   className="input"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Identity Information */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 PEN Number
//               </label>
//               <input
//                 type="text"
//                 name="penNumber"
//                 placeholder="PEN Number"
//                 value={form.penNumber}
//                 onChange={handleChange}
//                 className="input"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Aadhar Number of Student
//               </label>
//               <input
//                 type="text"
//                 name="aadharNumber"
//                 placeholder="12-digit Aadhar"
//                 value={form.aadharNumber}
//                 onChange={handleChange}
//                 className="input"
//                 maxLength="12"
//               />
//               {errors.aadharNumber && (
//                 <p className="error">{errors.aadharNumber}</p>
//               )}
//             </div>
//           </div>

//           {/* Address Details */}
//           <div className="space-y-6">
//             <div>
//               <h3 className="text-lg font-semibold text-gray-700 mb-3">
//                 Permanent Address
//               </h3>
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Address *
//                   </label>
//                   <textarea
//                     name="permanentAddress"
//                     placeholder="Full Permanent Address"
//                     value={form.permanentAddress}
//                     onChange={handleChange}
//                     rows="3"
//                     className="input"
//                     required
//                   />
//                   {errors.permanentAddress && (
//                     <p className="error">{errors.permanentAddress}</p>
//                   )}
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       District *
//                     </label>
//                     <input
//                       type="text"
//                       name="district"
//                       placeholder="District"
//                       value={form.district}
//                       onChange={handleChange}
//                       className="input"
//                       required
//                     />
//                     {errors.district && (
//                       <p className="error">{errors.district}</p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       State *
//                     </label>
//                     <select
//                       name="state"
//                       value={form.state}
//                       onChange={handleChange}
//                       className="input"
//                       required
//                     >
//                       <option value="">Select State</option>
//                       {states.map((state) => (
//                         <option key={state} value={state}>
//                           {state}
//                         </option>
//                       ))}
//                     </select>
//                     {errors.state && <p className="error">{errors.state}</p>}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Pin Code *
//                     </label>
//                     <input
//                       type="text"
//                       name="pinCode"
//                       placeholder="6-digit Pin Code"
//                       value={form.pinCode}
//                       onChange={handleChange}
//                       className="input"
//                       maxLength="6"
//                       required
//                     />
//                     {errors.pinCode && (
//                       <p className="error">{errors.pinCode}</p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Local Address */}
//             <div>
//               <div className="flex items-center justify-between mb-3">
//                 <h3 className="text-lg font-semibold text-gray-700">
//                   Local Address (for communication)
//                 </h3>
//                 <div className="flex items-center">
//                   <input
//                     type="checkbox"
//                     id="sameAddress"
//                     checked={isSameAddress}
//                     onChange={(e) => setIsSameAddress(e.target.checked)}
//                     className="h-4 w-4 text-blue-600 rounded"
//                   />
//                   <label
//                     htmlFor="sameAddress"
//                     className="ml-2 text-sm text-gray-700"
//                   >
//                     Same as Permanent Address
//                   </label>
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <div>
//                   <textarea
//                     name="localAddress"
//                     placeholder="Local Address"
//                     value={form.localAddress}
//                     onChange={handleChange}
//                     rows="2"
//                     className="input"
//                     disabled={isSameAddress}
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Local Pin Code
//                   </label>
//                   <input
//                     type="text"
//                     name="localPinCode"
//                     placeholder="Local Pin Code"
//                     value={form.localPinCode}
//                     onChange={handleChange}
//                     className="input"
//                     maxLength="6"
//                     disabled={isSameAddress}
//                   />
//                   {errors.localPinCode && (
//                     <p className="error">{errors.localPinCode}</p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Father's Details */}
//         <section className="bg-gray-50 p-6 rounded-xl border border-gray-300">
//           <h2 className="text-xl font-bold text-gray-700 mb-4 pb-2 border-b border-blue-200">
//             Father's Details
//           </h2>

//           {/* Father's Name - Block Letters */}
//           <div className="mb-6">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Father's Name (IN BLOCK LETTERS)
//             </label>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div>
//                 <input
//                   type="text"
//                   name="fatherFirstName"
//                   placeholder="First Name *"
//                   value={form.fatherFirstName}
//                   onChange={handleChange}
//                   className="input uppercase"
//                   required
//                 />
//                 {errors.fatherFirstName && (
//                   <p className="error">{errors.fatherFirstName}</p>
//                 )}
//               </div>
//               <div>
//                 <input
//                   type="text"
//                   name="fatherMiddleName"
//                   placeholder="Middle Name"
//                   value={form.fatherMiddleName}
//                   onChange={handleChange}
//                   className="input uppercase"
//                 />
//               </div>
//               <div>
//                 <input
//                   type="text"
//                   name="fatherLastName"
//                   placeholder="Last Name *"
//                   value={form.fatherLastName}
//                   onChange={handleChange}
//                   className="input uppercase"
//                   required
//                 />
//                 {errors.fatherLastName && (
//                   <p className="error">{errors.fatherLastName}</p>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Father's Professional Information */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Educational Qualification
//               </label>
//               <input
//                 type="text"
//                 name="fatherEducationalQualification"
//                 placeholder="Highest Qualification"
//                 value={form.fatherEducationalQualification}
//                 onChange={handleChange}
//                 className="input"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Occupation
//               </label>
//               <input
//                 type="text"
//                 name="fatherOccupation"
//                 placeholder="Occupation"
//                 value={form.fatherOccupation}
//                 onChange={handleChange}
//                 className="input"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Annual Income
//               </label>
//               <input
//                 type="text"
//                 name="fatherAnnualIncome"
//                 placeholder="Annual Income"
//                 value={form.fatherAnnualIncome}
//                 onChange={handleChange}
//                 className="input"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Email ID
//               </label>
//               <input
//                 type="email"
//                 name="fatherEmailID"
//                 placeholder="Email Address"
//                 value={form.fatherEmailID}
//                 onChange={handleChange}
//                 className="input"
//               />
//             </div>
//           </div>

//           {/* Father's Contact & Identity */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//             {renderMobileInput("fatherMobileNo1", "Mobile No. 1 *", true)}

//             {renderMobileInput("fatherMobileNo2", "Mobile No. 2", false)}

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Aadhar Number
//               </label>
//               <input
//                 type="text"
//                 name="fatherAadharNumber"
//                 placeholder="Father's Aadhar"
//                 value={form.fatherAadharNumber}
//                 onChange={handleChange}
//                 className="input"
//                 maxLength="12"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 PAN Number
//               </label>
//               <input
//                 type="text"
//                 name="fatherPANNumber"
//                 placeholder="Father's PAN"
//                 value={form.fatherPANNumber}
//                 onChange={handleChange}
//                 className="input"
//                 maxLength="10"
//               />
//             </div>
//           </div>
//         </section>

//         {/* Mother's Details */}
//         <section className="bg-gray-50 p-6 rounded-xl border border-gray-300">
//           <h2 className="text-xl font-bold text-gray-700 mb-4 pb-2 border-b border-blue-200">
//             Mother's Details
//           </h2>

//           {/* Mother's Name - Block Letters */}
//           <div className="mb-6">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Mother's Name (IN BLOCK LETTERS)
//             </label>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div>
//                 <input
//                   type="text"
//                   name="motherFirstName"
//                   placeholder="First Name *"
//                   value={form.motherFirstName}
//                   onChange={handleChange}
//                   className="input uppercase"
//                   required
//                 />
//                 {errors.motherFirstName && (
//                   <p className="error">{errors.motherFirstName}</p>
//                 )}
//               </div>
//               <div>
//                 <input
//                   type="text"
//                   name="motherMiddleName"
//                   placeholder="Middle Name"
//                   value={form.motherMiddleName}
//                   onChange={handleChange}
//                   className="input uppercase"
//                 />
//               </div>
//               <div>
//                 <input
//                   type="text"
//                   name="motherLastName"
//                   placeholder="Last Name *"
//                   value={form.motherLastName}
//                   onChange={handleChange}
//                   className="input uppercase"
//                   required
//                 />
//                 {errors.motherLastName && (
//                   <p className="error">{errors.motherLastName}</p>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Mother's Professional Information */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Educational Qualification
//               </label>
//               <input
//                 type="text"
//                 name="motherEducationalQualification"
//                 placeholder="Highest Qualification"
//                 value={form.motherEducationalQualification}
//                 onChange={handleChange}
//                 className="input"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Occupation
//               </label>
//               <input
//                 type="text"
//                 name="motherOccupation"
//                 placeholder="Occupation"
//                 value={form.motherOccupation}
//                 onChange={handleChange}
//                 className="input"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Annual Income
//               </label>
//               <input
//                 type="text"
//                 name="motherAnnualIncome"
//                 placeholder="Annual Income"
//                 value={form.motherAnnualIncome}
//                 onChange={handleChange}
//                 className="input"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Email ID
//               </label>
//               <input
//                 type="email"
//                 name="motherEmailID"
//                 placeholder="Email Address"
//                 value={form.motherEmailID}
//                 onChange={handleChange}
//                 className="input"
//               />
//             </div>
//           </div>

//           {/* Mother's Contact & Identity */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             {renderMobileInput("motherMobileNumber", "Mobile Number", false)}

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Aadhar Number
//               </label>
//               <input
//                 type="text"
//                 name="motherAadharNumber"
//                 placeholder="Mother's Aadhar"
//                 value={form.motherAadharNumber}
//                 onChange={handleChange}
//                 className="input"
//                 maxLength="12"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 PAN Number
//               </label>
//               <input
//                 type="text"
//                 name="motherPANNumber"
//                 placeholder="Mother's PAN"
//                 value={form.motherPANNumber}
//                 onChange={handleChange}
//                 className="input"
//                 maxLength="10"
//               />
//             </div>
//           </div>
//         </section>

//         {/* Additional Information */}
//         <section className="bg-gray-50 p-6 rounded-xl border border-gray-300">
//           <h2 className="text-xl font-bold text-gray-700 mb-4 pb-2 border-b border-blue-200">
//             Additional Information
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Medical History of the Student
//               </label>
//               <textarea
//                 name="medicalHistory"
//                 placeholder="Any medical conditions, allergies, etc."
//                 value={form.medicalHistory}
//                 onChange={handleChange}
//                 rows="4"
//                 className="input"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Achievements of the Student
//               </label>
//               <textarea
//                 name="studentAchievements"
//                 placeholder="Academic or extracurricular achievements"
//                 value={form.studentAchievements}
//                 onChange={handleChange}
//                 rows="4"
//                 className="input"
//               />
//             </div>
//           </div>
//         </section>

//         {/* Document Upload Section */}
//         {renderDocumentUploadSection()}

//         {/* Declaration Section with checkboxes and signature upload */}
//         <section className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
//           <h2 className="text-xl font-bold text-gray-700 mb-4 pb-2 border-b border-yellow-300">
//             Declaration of Parents / Guardian
//           </h2>

//           <div className="mb-4 text-sm text-gray-700 space-y-4">
//             {/* Declaration Statements with Checkboxes */}
//             <div className="space-y-3">
//               <div className="flex items-start space-x-3">
//                 <div className="flex items-center h-5 mt-0.5">
//                   <input
//                     type="checkbox"
//                     name="readRules"
//                     checked={declaration.readRules}
//                     onChange={handleDeclarationChange}
//                     className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="font-medium">
//                     We have read and understood the school rules and regulations
//                     as printed in the school almanac and we abide by them.
//                   </label>
//                 </div>
//               </div>

//               <div className="flex items-start space-x-3">
//                 <div className="flex items-center h-5 mt-0.5">
//                   <input
//                     type="checkbox"
//                     name="agreeFees"
//                     checked={declaration.agreeFees}
//                     onChange={handleDeclarationChange}
//                     className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="font-medium">
//                     We undertake to pay the school fees on due date.
//                   </label>
//                 </div>
//               </div>

//               <div className="flex items-start space-x-3">
//                 <div className="flex items-center h-5 mt-0.5">
//                   <input
//                     type="checkbox"
//                     name="confirmInfo"
//                     checked={declaration.confirmInfo}
//                     onChange={handleDeclarationChange}
//                     className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="font-medium">
//                     We confirm that the information provided above is true and
//                     correct based on valid government documents.
//                   </label>
//                 </div>
//               </div>
//             </div>

//             {errors.declaration && (
//               <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
//                 <p className="text-red-600 text-sm">{errors.declaration}</p>
//               </div>
//             )}
//           </div>

//           {/* Place, Date and Signature Uploads */}
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Place
//               </label>
//               <input
//                 type="text"
//                 name="declarationPlace"
//                 placeholder="Place"
//                 value={form.declarationPlace}
//                 onChange={handleChange}
//                 className="input"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Date
//               </label>
//               <input
//                 type="date"
//                 name="declarationDate"
//                 value={form.declarationDate}
//                 onChange={handleChange}
//                 className="input"
//               />
//             </div>

//             {/* Father's Signature Upload */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Signature of Father / Guardian
//               </label>
//               <div className="border border-gray-300 rounded-lg p-2 bg-white">
//                 {declaration.fatherSignature.preview ? (
//                   <div className="space-y-2">
//                     <img
//                       src={declaration.fatherSignature.preview}
//                       alt="Father's Signature"
//                       className="h-12 object-contain mx-auto"
//                     />
//                     {declaration.fatherSignature.file &&
//                       !declaration.fatherSignature.error && (
//                         <p className="text-green-600 text-xs text-center">
//                           ✓{" "}
//                           {formatFileSize(
//                             declaration.fatherSignature.file.size
//                           )}
//                         </p>
//                       )}
//                     <div className="flex justify-center space-x-2">
//                       <button
//                         type="button"
//                         onClick={() => clearSignature("fatherSignature")}
//                         className="text-xs text-red-600 hover:text-red-800"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="text-center space-y-1">
//                     <input
//                       type="file"
//                       accept=".jpg,.jpeg,.png,.svg"
//                       onChange={(e) =>
//                         handleSignatureUpload("fatherSignature", e)
//                       }
//                       className="block w-full text-xs text-gray-500"
//                     />
//                     <p className="text-xs text-gray-400">
//                       Max size: 200 KB | JPG/PNG/SVG
//                     </p>
//                     {declaration.fatherSignature.error && (
//                       <p className="text-red-500 text-xs mt-1">
//                         {declaration.fatherSignature.error}
//                       </p>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Mother's Signature Upload */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Signature of Mother
//               </label>
//               <div className="border border-gray-300 rounded-lg p-2 bg-white">
//                 {declaration.motherSignature.preview ? (
//                   <div className="space-y-2">
//                     <img
//                       src={declaration.motherSignature.preview}
//                       alt="Mother's Signature"
//                       className="h-12 object-contain mx-auto"
//                     />
//                     {declaration.motherSignature.file &&
//                       !declaration.motherSignature.error && (
//                         <p className="text-green-600 text-xs text-center">
//                           ✓{" "}
//                           {formatFileSize(
//                             declaration.motherSignature.file.size
//                           )}
//                         </p>
//                       )}
//                     <div className="flex justify-center space-x-2">
//                       <button
//                         type="button"
//                         onClick={() => clearSignature("motherSignature")}
//                         className="text-xs text-red-600 hover:text-red-800"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="text-center space-y-1">
//                     <input
//                       type="file"
//                       accept=".jpg,.jpeg,.png,.svg"
//                       onChange={(e) =>
//                         handleSignatureUpload("motherSignature", e)
//                       }
//                       className="block w-full text-xs text-gray-500"
//                     />
//                     <p className="text-xs text-gray-400">
//                       Max size: 200 KB | JPG/PNG/SVG
//                     </p>
//                     {declaration.motherSignature.error && (
//                       <p className="text-red-500 text-xs mt-1">
//                         {declaration.motherSignature.error}
//                       </p>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           <div className="text-sm text-gray-600 italic mb-6 p-3 bg-white rounded-lg border">
//             <p className="font-medium mb-1">Important Note:</p>
//             <p>
//               Information provided above will be recorded in the School General
//               Register and no change will be permitted later.
//             </p>
//           </div>
//         </section>

//         {/* Submit Button */}
//         <div className="text-center pt-6">
//           {Object.values(uploadedDocuments).some((doc) => doc.error) ||
//           studentPhoto.error ||
//           declaration.fatherSignature.error ||
//           declaration.motherSignature.error ? (
//             <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
//               <p className="text-red-600">
//                 Please fix all file upload errors before submitting
//               </p>
//             </div>
//           ) : null}

//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="px-10 py-4 bg-orange-600 text-white text-lg font-semibold rounded-lg hover:bg-orange-700 transition duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {isSubmitting ? (
//               <span className="flex items-center justify-center">
//                 <svg
//                   className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   ></circle>
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                   ></path>
//                 </svg>
//                 Submitting...
//               </span>
//             ) : (
//               "Submit Admission Form"
//             )}
//           </button>

//           <p className="text-sm text-gray-500 mt-3">
//             Note: All fields marked with * are mandatory
//           </p>
//           <p className="text-sm text-blue-600 mt-2">
//             ✓ Please check all declaration boxes before submitting
//           </p>
//           <p className="text-xs text-gray-500 mt-1">
//             Images: ≤ 200 KB | PDFs: ≤ 1 MB | Signatures: ≤ 200 KB | DPI: 150
//           </p>
//         </div>
//       </form>
//     </div>
//   );
// };

// // Add these styles to your CSS file or in a <style> tag
// const styles = `
//   .input {
//     width: 100%;
//     padding: 0.75rem 1rem;
//     border: 1px solid #d1d5db;
//     border-radius: 0.5rem;
//     font-size: 0.875rem;
//     transition: all 0.2s;
//     background-color: white;
//   }

//   .input:focus {
//     outline: none;
//     border-color: #3b82f6;
//     box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
//   }

//   .input:disabled {
//     background-color: #f3f4f6;
//     cursor: not-allowed;
//   }

//   .input.uppercase {
//     text-transform: uppercase;
//   }

//   .error {
//     color: #ef4444;
//     font-size: 0.75rem;
//     margin-top: 0.25rem;
//   }

//   .input.bg-gray-100 {
//     background-color: #f3f4f6;
//   }

//   textarea.input {
//     resize: vertical;
//     min-height: 80px;
//   }

//   /* File input styling */
//   input[type="file"]::file-selector-button {
//     border: 2px solid #3b82f6;
//     padding: 0.2em 0.4em;
//     border-radius: 0.2em;
//     background-color: #eff6ff;
//     transition: 0.2s;
//   }

//   input[type="file"]::file-selector-button:hover {
//     background-color: #dbeafe;
//   }

//   /* Checkbox styling */
//   input[type="checkbox"] {
//     border-color: #6b7280;
//   }

//   input[type="checkbox"]:checked {
//     background-color: #3b82f6;
//     border-color: #3b82f6;
//   }

//   /* Hide number input arrows */
//   input[type="number"]::-webkit-inner-spin-button,
//   input[type="number"]::-webkit-outer-spin-button,
//   input[type="tel"]::-webkit-inner-spin-button,
//   input[type="tel"]::-webkit-outer-spin-button {
//     -webkit-appearance: none;
//     margin: 0;
//   }

//   input[type="number"],
//   input[type="tel"] {
//     -moz-appearance: textfield;
//   }
// `;

// // Add the styles to the document head
// if (typeof document !== "undefined") {
//   const styleElement = document.createElement("style");
//   styleElement.innerHTML = styles;
//   document.head.appendChild(styleElement);
// }

// export default AdmissionForm;

// import React, { useState, useEffect } from "react";

// const AdmissionForm = () => {
//   // API Configuration
//   const API_BASE_URL = "https://vppcms.demovoting.com/api";
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitSuccess, setSubmitSuccess] = useState(false);
//   const [submitError, setSubmitError] = useState(null);
//   const [debugMode, setDebugMode] = useState(false);

//   const [form, setForm] = useState({
//     // Section 1: School Metadata (Pre-filled/Administrative - will be auto-filled)
//     formNo: `FORM-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
//     schoolName: "VIDYA PRABODHINI PRASHALA",
//     schoolAddress: "",
//     cbseAffiliationNo: "",
//     schoolCode: "",
//     schoolUDISENo: "",

//     // Section 2: Admission Details
//     admissionForClass: "",
//     academicYear: "",

//     // Section 3: Student Particulars
//     studentFirstName: "",
//     studentMiddleName: "",
//     studentLastName: "",

//     // Personal Details
//     dateOfBirth: "",
//     placeOfBirth: "",
//     bloodGroup: "",
//     religion: "",
//     caste: "",
//     subCaste: "",
//     category: "",
//     motherTongue: "",
//     nationality: "Indian",

//     // Academic Background
//     lastExaminationPassed: "",
//     examinationYear: "",
//     nameOfLastSchoolAttended: "",

//     // Identity Information
//     penNumber: "",
//     aadharNumber: "",

//     // Address Details
//     permanentAddress: "",
//     district: "",
//     state: "",
//     pinCode: "",
//     localAddress: "",
//     localPinCode: "",

//     // Section 5: Father's Details
//     fatherFirstName: "",
//     fatherMiddleName: "",
//     fatherLastName: "",
//     fatherEducationalQualification: "",
//     fatherOccupation: "",
//     fatherAnnualIncome: "",
//     fatherEmailID: "",
//     fatherMobileNo1: "",
//     fatherMobileNo2: "",
//     fatherAadharNumber: "",
//     fatherPANNumber: "",

//     // Section 6: Mother's Details
//     motherFirstName: "",
//     motherMiddleName: "",
//     motherLastName: "",
//     motherEducationalQualification: "",
//     motherOccupation: "",
//     motherAnnualIncome: "",
//     motherEmailID: "",
//     motherMobileNumber: "",
//     motherAadharNumber: "",
//     motherPANNumber: "",

//     // Section 7: Additional Information
//     medicalHistory: "",
//     studentAchievements: "",

//     // Declaration Section
//     declarationPlace: "",
//     declarationDate: new Date().toISOString().split("T")[0],
//   });

//   // Document Upload States with size validation
//   const [uploadedDocuments, setUploadedDocuments] = useState({
//     birthCertificate: {
//       file: null,
//       preview: null,
//       uploaded: false,
//       error: null,
//     },
//     parentsPhoto: { file: null, preview: null, uploaded: false, error: null },
//     schoolLeavingCertificate: {
//       file: null,
//       preview: null,
//       uploaded: false,
//       error: null,
//     },
//     reportCard: { file: null, preview: null, uploaded: false, error: null },
//     studentAadharCard: {
//       file: null,
//       preview: null,
//       uploaded: false,
//       error: null,
//     },
//     medicalCertificate: {
//       file: null,
//       preview: null,
//       uploaded: false,
//       error: null,
//     },
//     casteCertificate: {
//       file: null,
//       preview: null,
//       uploaded: false,
//       error: null,
//     },
//     passportPhoto: { file: null, preview: null, uploaded: false, error: null },
//     familyPhoto: { file: null, preview: null, uploaded: false, error: null },
//   });

//   const [studentPhoto, setStudentPhoto] = useState({
//     file: null,
//     preview: null,
//     error: null,
//   });

//   // Declaration checkboxes and signatures state
//   const [declaration, setDeclaration] = useState({
//     readRules: false,
//     agreeFees: false,
//     confirmInfo: false,
//     fatherSignature: { file: null, preview: null, error: null },
//     motherSignature: { file: null, preview: null, error: null },
//   });

//   const [errors, setErrors] = useState({});
//   const [isSameAddress, setIsSameAddress] = useState(false);

//   // States for dropdowns
//   const states = [
//     "Maharashtra",
//     "Gujarat",
//     "Karnataka",
//     "Tamil Nadu",
//     "Kerala",
//     "Rajasthan",
//     "Madhya Pradesh",
//     "Uttar Pradesh",
//     "West Bengal",
//     "Delhi",
//     "Other",
//   ];

//   const districts = {
//     Maharashtra: ["Nashik", "Pune", "Mumbai", "Nagpur", "Thane", "Aurangabad"],
//     Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar"],
//     Karnataka: ["Bengaluru", "Mysuru", "Hubli", "Mangalore"],
//     "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem"],
//     Kerala: ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur"],
//     Rajasthan: ["Jaipur", "Udaipur", "Jodhpur", "Kota"],
//     "Madhya Pradesh": ["Indore", "Bhopal", "Gwalior", "Jabalpur"],
//     "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra"],
//     "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Asansol"],
//     Delhi: ["New Delhi", "North Delhi", "South Delhi", "East Delhi"],
//     Other: ["Other"],
//   };

//   const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
//   const categories = ["General", "OBC", "SC", "ST", "VJNT", "SBC", "Other"];
//   const religions = [
//     "Hindu",
//     "Muslim",
//     "Christian",
//     "Sikh",
//     "Buddhist",
//     "Jain",
//     "Other",
//   ];
//   const motherTongues = ["Marathi", "Hindi", "English", "Gujarati", "Other"];

//   const classes = [
//     "Nursery",
//     "LKG",
//     "UKG",
//     "1st",
//     "2nd",
//     "3rd",
//     "4th",
//     "5th",
//     "6th",
//     "7th",
//     "8th",
//     "9th",
//     "10th",
//     "11th",
//     "12th",
//   ];

//   // File size limits in bytes
//   const FILE_LIMITS = {
//     IMAGE_MAX_SIZE: 200 * 1024,
//     PDF_MAX_SIZE: 1024 * 1024,
//     SIGNATURE_MAX_SIZE: 200 * 1024,
//   };

//   const currentYear = new Date().getFullYear();
//   const academicYears = [
//     `${currentYear}-${currentYear + 1}`,
//     `${currentYear + 1}-${currentYear + 2}`,
//     `${currentYear + 2}-${currentYear + 3}`,
//   ];

//   // Handle copy permanent address to local address
//   useEffect(() => {
//     if (isSameAddress) {
//       setForm((prev) => ({
//         ...prev,
//         localAddress: prev.permanentAddress,
//         localPinCode: prev.pinCode,
//       }));
//     }
//   }, [isSameAddress, form.permanentAddress, form.pinCode]);

//   // For development only - enable debug mode
//   useEffect(() => {
//     if (process.env.NODE_ENV === "development") {
//       setDebugMode(true);
//     }
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm({
//       ...form,
//       [name]: type === "checkbox" ? checked : value,
//     });

//     if (errors[name]) {
//       setErrors({
//         ...errors,
//         [name]: null,
//       });
//     }
//   };

//   // Handle declaration checkboxes
//   const handleDeclarationChange = (e) => {
//     const { name, checked } = e.target;
//     setDeclaration({
//       ...declaration,
//       [name]: checked,
//     });
//   };

//   // File type validation
//   const isValidFileType = (file, allowedTypes) => {
//     const fileType = file.type.toLowerCase();
//     const fileExtension = file.name.split(".").pop().toLowerCase();

//     const allowedExtensions = allowedTypes.map((type) => type.toLowerCase());
//     const isTypeAllowed = allowedTypes.some(
//       (type) =>
//         fileType.includes(type.toLowerCase()) ||
//         allowedExtensions.includes(fileExtension)
//     );

//     return isTypeAllowed;
//   };

//   // File size validation
//   const isValidFileSize = (file, maxSize) => {
//     return file.size <= maxSize;
//   };

//   // Format file size for display
//   const formatFileSize = (bytes) => {
//     if (bytes < 1024) return bytes + " bytes";
//     else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
//     else return (bytes / (1024 * 1024)).toFixed(1) + " MB";
//   };

//   // Handle signature upload with validation
//   const handleSignatureUpload = (parent, e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setDeclaration((prev) => ({
//       ...prev,
//       [parent]: {
//         ...prev[parent],
//         error: null,
//       },
//     }));

//     if (!isValidFileType(file, ["jpg", "jpeg", "png", "svg"])) {
//       setDeclaration((prev) => ({
//         ...prev,
//         [parent]: {
//           ...prev[parent],
//           error:
//             "Invalid file type. Only JPG, JPEG, PNG, SVG files are allowed.",
//         },
//       }));
//       return;
//     }

//     if (!isValidFileSize(file, FILE_LIMITS.SIGNATURE_MAX_SIZE)) {
//       setDeclaration((prev) => ({
//         ...prev,
//         [parent]: {
//           ...prev[parent],
//           error: `File size too large. Maximum size is ${formatFileSize(
//             FILE_LIMITS.SIGNATURE_MAX_SIZE
//           )}. Your file: ${formatFileSize(file.size)}`,
//         },
//       }));
//       return;
//     }

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setDeclaration((prev) => ({
//         ...prev,
//         [parent]: {
//           file: file,
//           preview: reader.result,
//           error: null,
//         },
//       }));
//     };
//     reader.readAsDataURL(file);
//   };

//   // Clear signature
//   const clearSignature = (parent) => {
//     setDeclaration((prev) => ({
//       ...prev,
//       [parent]: { file: null, preview: null, error: null },
//     }));
//   };

//   // Handle file uploads with validation
//   const handleFileUpload = (documentType, e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setUploadedDocuments((prev) => ({
//       ...prev,
//       [documentType]: {
//         ...prev[documentType],
//         error: null,
//       },
//     }));

//     const isImage =
//       documentType.includes("Photo") ||
//       documentType === "passportPhoto" ||
//       documentType === "familyPhoto" ||
//       documentType === "parentsPhoto";

//     const isPDF =
//       documentType.includes("Certificate") ||
//       documentType === "reportCard" ||
//       documentType === "studentAadharCard" ||
//       documentType === "birthCertificate";

//     if (isImage && !isValidFileType(file, ["jpg", "jpeg", "png"])) {
//       setUploadedDocuments((prev) => ({
//         ...prev,
//         [documentType]: {
//           ...prev[documentType],
//           error: "Invalid file type. Only JPG, JPEG, PNG files are allowed.",
//         },
//       }));
//       return;
//     }

//     if (isPDF && !isValidFileType(file, ["pdf"])) {
//       setUploadedDocuments((prev) => ({
//         ...prev,
//         [documentType]: {
//           ...prev[documentType],
//           error: "Invalid file type. Only PDF files are allowed.",
//         },
//       }));
//       return;
//     }

//     const maxSize = isImage
//       ? FILE_LIMITS.IMAGE_MAX_SIZE
//       : FILE_LIMITS.PDF_MAX_SIZE;
//     if (!isValidFileSize(file, maxSize)) {
//       setUploadedDocuments((prev) => ({
//         ...prev,
//         [documentType]: {
//           ...prev[documentType],
//           error: `File size too large. Maximum size is ${formatFileSize(
//             maxSize
//           )}. Your file: ${formatFileSize(file.size)}`,
//         },
//       }));
//       return;
//     }

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setUploadedDocuments((prev) => ({
//         ...prev,
//         [documentType]: {
//           file: file,
//           preview: reader.result,
//           uploaded: true,
//           error: null,
//         },
//       }));
//     };
//     reader.readAsDataURL(file);
//   };

//   // Handle student photo upload with validation
//   const handleStudentPhotoUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setStudentPhoto({ file: null, preview: null, error: null });

//     if (!isValidFileType(file, ["jpg", "jpeg", "png"])) {
//       setStudentPhoto({
//         file: null,
//         preview: null,
//         error: "Invalid file type. Only JPG, JPEG, PNG files are allowed.",
//       });
//       return;
//     }

//     if (!isValidFileSize(file, FILE_LIMITS.IMAGE_MAX_SIZE)) {
//       setStudentPhoto({
//         file: null,
//         preview: null,
//         error: `File size too large. Maximum size is ${formatFileSize(
//           FILE_LIMITS.IMAGE_MAX_SIZE
//         )}. Your file: ${formatFileSize(file.size)}`,
//       });
//       return;
//     }

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setStudentPhoto({
//         file: file,
//         preview: reader.result,
//         error: null,
//       });
//     };
//     reader.readAsDataURL(file);
//   };

//   const validate = () => {
//     const newErrors = {};

//     // Required fields validation
//     const requiredFields = [
//       "admissionForClass",
//       "academicYear",
//       "studentFirstName",
//       "studentLastName",
//       "dateOfBirth",
//       "category",
//       "permanentAddress",
//       "district",
//       "state",
//       "pinCode",
//       "fatherFirstName",
//       "fatherLastName",
//       "fatherMobileNo1",
//       "motherFirstName",
//       "motherLastName",
//     ];

//     requiredFields.forEach((field) => {
//       if (!form[field] || form[field].trim() === "") {
//         newErrors[field] = "This field is required";
//       }
//     });

//     // Declaration validation
//     if (
//       !declaration.readRules ||
//       !declaration.agreeFees ||
//       !declaration.confirmInfo
//     ) {
//       newErrors.declaration = "Please agree to all declaration statements";
//     }

//     // Format validations
//     if (form.aadharNumber && !/^[0-9]{12}$/.test(form.aadharNumber)) {
//       newErrors.aadharNumber = "Aadhar must be 12 digits";
//     }

//     if (form.fatherMobileNo1 && !/^[0-9]{10}$/.test(form.fatherMobileNo1)) {
//       newErrors.fatherMobileNo1 = "Mobile must be 10 digits";
//     }

//     if (
//       form.motherMobileNumber &&
//       !/^[0-9]{10}$/.test(form.motherMobileNumber)
//     ) {
//       newErrors.motherMobileNumber = "Mobile must be 10 digits";
//     }

//     if (form.pinCode && !/^[0-9]{6}$/.test(form.pinCode)) {
//       newErrors.pinCode = "Pincode must be 6 digits";
//     }

//     if (form.localPinCode && !/^[0-9]{6}$/.test(form.localPinCode)) {
//       newErrors.localPinCode = "Pincode must be 6 digits";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Reset form function
//   const resetForm = () => {
//     setForm({
//       formNo: `FORM-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
//       schoolName: "VIDYA PRABODHINI PRASHALA",
//       schoolAddress: "",
//       cbseAffiliationNo: "",
//       schoolCode: "",
//       schoolUDISENo: "",
//       admissionForClass: "",
//       academicYear: "",
//       studentFirstName: "",
//       studentMiddleName: "",
//       studentLastName: "",
//       dateOfBirth: "",
//       placeOfBirth: "",
//       bloodGroup: "",
//       religion: "",
//       caste: "",
//       subCaste: "",
//       category: "",
//       motherTongue: "",
//       nationality: "Indian",
//       lastExaminationPassed: "",
//       examinationYear: "",
//       nameOfLastSchoolAttended: "",
//       penNumber: "",
//       aadharNumber: "",
//       permanentAddress: "",
//       district: "",
//       state: "",
//       pinCode: "",
//       localAddress: "",
//       localPinCode: "",
//       fatherFirstName: "",
//       fatherMiddleName: "",
//       fatherLastName: "",
//       fatherEducationalQualification: "",
//       fatherOccupation: "",
//       fatherAnnualIncome: "",
//       fatherEmailID: "",
//       fatherMobileNo1: "",
//       fatherMobileNo2: "",
//       fatherAadharNumber: "",
//       fatherPANNumber: "",
//       motherFirstName: "",
//       motherMiddleName: "",
//       motherLastName: "",
//       motherEducationalQualification: "",
//       motherOccupation: "",
//       motherAnnualIncome: "",
//       motherEmailID: "",
//       motherMobileNumber: "",
//       motherAadharNumber: "",
//       motherPANNumber: "",
//       medicalHistory: "",
//       studentAchievements: "",
//       declarationPlace: "",
//       declarationDate: new Date().toISOString().split("T")[0],
//     });

//     setUploadedDocuments({
//       birthCertificate: {
//         file: null,
//         preview: null,
//         uploaded: false,
//         error: null,
//       },
//       parentsPhoto: { file: null, preview: null, uploaded: false, error: null },
//       schoolLeavingCertificate: {
//         file: null,
//         preview: null,
//         uploaded: false,
//         error: null,
//       },
//       reportCard: { file: null, preview: null, uploaded: false, error: null },
//       studentAadharCard: {
//         file: null,
//         preview: null,
//         uploaded: false,
//         error: null,
//       },
//       medicalCertificate: {
//         file: null,
//         preview: null,
//         uploaded: false,
//         error: null,
//       },
//       casteCertificate: {
//         file: null,
//         preview: null,
//         uploaded: false,
//         error: null,
//       },
//       passportPhoto: {
//         file: null,
//         preview: null,
//         uploaded: false,
//         error: null,
//       },
//       familyPhoto: { file: null, preview: null, uploaded: false, error: null },
//     });

//     setStudentPhoto({
//       file: null,
//       preview: null,
//       error: null,
//     });

//     setDeclaration({
//       readRules: false,
//       agreeFees: false,
//       confirmInfo: false,
//       fatherSignature: { file: null, preview: null, error: null },
//       motherSignature: { file: null, preview: null, error: null },
//     });

//     setErrors({});
//     setIsSameAddress(false);
//     setSubmitError(null);
//   };

//   // Test API function (for debugging)
//   const testApiCall = async () => {
//     const testData = {
//       school_name: "VIDYA PRABODHINI PRASHALA",
//       admission_for_class: "1st",
//       academic_year: "2024-2025",
//       student_first_name: "Test",
//       student_last_name: "Student",
//       date_of_birth: "2018-01-01",
//       category: "General",
//       permanent_address: "Test Address",
//       district: "Test",
//       state: "Maharashtra",
//       pin_code: "411001",
//       father_first_name: "TestFather",
//       father_last_name: "Test",
//       father_mobile_no1: "9876543210",
//       mother_first_name: "TestMother",
//       mother_last_name: "Test",
//       declaration_date: new Date().toISOString().split("T")[0],
//       status: "pending",
//     };

//     try {
//       console.log("Testing API with minimal data:", testData);

//       const response = await fetch(`${API_BASE_URL}/admissions`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//         body: JSON.stringify(testData),
//       });

//       const result = await response.json();
//       console.log("Test API Response:", result);

//       if (result.success) {
//         alert("Test API call successful!");
//       } else {
//         alert(
//           `Test API failed: ${JSON.stringify(result.errors || result.message)}`
//         );
//       }
//     } catch (error) {
//       console.error("Test API error:", error);
//       alert("Test API call failed: " + error.message);
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitError(null);
//     setSubmitSuccess(false);

//     if (!validate()) {
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       // Prepare form data for submission
//       const formData = new FormData();

//       // Convert form state to match API field names (snake_case)
//       const apiData = {
//         // School Metadata
//         school_name: "VIDYA PRABODHINI PRASHALA",
//         school_address: form.schoolAddress || null,
//         cbse_affiliation_no: form.cbseAffiliationNo || null,
//         school_code: form.schoolCode || null,
//         school_udise_no: form.schoolUDISENo || null,

//         // Admission Details
//         admission_for_class: form.admissionForClass,
//         academic_year: form.academicYear,

//         // Student Particulars
//         student_first_name: form.studentFirstName,
//         student_middle_name: form.studentMiddleName || null,
//         student_last_name: form.studentLastName,
//         date_of_birth: form.dateOfBirth,
//         place_of_birth: form.placeOfBirth || null,
//         blood_group: form.bloodGroup || null,
//         religion: form.religion || null,
//         caste: form.caste || null,
//         sub_caste: form.subCaste || null,
//         category: form.category,
//         mother_tongue: form.motherTongue || null,
//         nationality: form.nationality,

//         // Academic Background
//         last_examination_passed: form.lastExaminationPassed || null,
//         examination_year: form.examinationYear || null,
//         name_of_last_school_attended: form.nameOfLastSchoolAttended || null,

//         // Identity Information
//         pen_number: form.penNumber || null,
//         aadhar_number: form.aadharNumber || null,

//         // Address Details
//         permanent_address: form.permanentAddress,
//         district: form.district,
//         state: form.state,
//         pin_code: form.pinCode,
//         local_address: form.localAddress || null,
//         local_pin_code: form.localPinCode || null,

//         // Father's Details
//         father_first_name: form.fatherFirstName,
//         father_middle_name: form.fatherMiddleName || null,
//         father_last_name: form.fatherLastName,
//         father_educational_qualification:
//           form.fatherEducationalQualification || null,
//         father_occupation: form.fatherOccupation || null,
//         father_annual_income: form.fatherAnnualIncome || null,
//         father_email_id: form.fatherEmailID || null,
//         father_mobile_no1: form.fatherMobileNo1,
//         father_mobile_no2: form.fatherMobileNo2 || null,
//         father_aadhar_number: form.fatherAadharNumber || null,
//         father_pan_number: form.fatherPANNumber || null,

//         // Mother's Details
//         mother_first_name: form.motherFirstName,
//         mother_middle_name: form.motherMiddleName || null,
//         mother_last_name: form.motherLastName,
//         mother_educational_qualification:
//           form.motherEducationalQualification || null,
//         mother_occupation: form.motherOccupation || null,
//         mother_annual_income: form.motherAnnualIncome || null,
//         mother_email_id: form.motherEmailID || null,
//         mother_mobile_number: form.motherMobileNumber || null,
//         mother_aadhar_number: form.motherAadharNumber || null,
//         mother_pan_number: form.motherPANNumber || null,

//         // Additional Information
//         medical_history: form.medicalHistory || null,
//         student_achievements: form.studentAchievements || null,

//         // Declaration
//         declaration_place: form.declarationPlace || null,
//         declaration_date: form.declarationDate,

//         // Set initial status
//         status: "pending",
//       };

//       // Log the data for debugging
//       if (debugMode) {
//         console.log("Submitting API data:", apiData);
//       }

//       // Append JSON data - Try different formats
//       formData.append("data", JSON.stringify(apiData));

//       // Also try appending all fields individually
//       Object.keys(apiData).forEach((key) => {
//         if (apiData[key] !== null && apiData[key] !== undefined) {
//           formData.append(key, apiData[key]);
//         }
//       });

//       // Append student photo
//       if (studentPhoto.file) {
//         formData.append("student_photo", studentPhoto.file);
//       }

//       // Append all document files
//       Object.keys(uploadedDocuments).forEach((key) => {
//         if (uploadedDocuments[key].file) {
//           formData.append(key, uploadedDocuments[key].file);
//         }
//       });

//       // Append signature files
//       if (declaration.fatherSignature.file) {
//         formData.append("father_signature", declaration.fatherSignature.file);
//       }

//       if (declaration.motherSignature.file) {
//         formData.append("mother_signature", declaration.motherSignature.file);
//       }

//       // Log FormData for debugging
//       if (debugMode) {
//         console.log("FormData entries:");
//         for (let pair of formData.entries()) {
//           console.log(
//             pair[0] + ", " + (pair[0] === "data" ? "JSON data" : typeof pair[1])
//           );
//         }
//       }

//       // Try sending as plain JSON first (without files) to test
//       // If this works, then the issue is with FormData
//       const testResponse = await fetch(`${API_BASE_URL}/admissions`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//         body: JSON.stringify(apiData),
//       });

//       const testResult = await testResponse.json();

//       if (debugMode) {
//         console.log("JSON-only test response:", testResult);
//       }

//       if (testResult.success) {
//         // JSON worked, now try with FormData for files
//         const response = await fetch(`${API_BASE_URL}/admissions`, {
//           method: "POST",
//           headers: {
//             Accept: "application/json",
//           },
//           body: formData,
//         });

//         const result = await response.json();

//         if (debugMode) {
//           console.log("Full FormData API Response:", result);
//         }

//         if (result.success) {
//           setSubmitSuccess(true);
//           console.log("Form submitted successfully:", result);

//           // Reset form after successful submission
//           setTimeout(() => {
//             resetForm();
//           }, 3000);
//         } else {
//           // Handle API validation errors
//           handleApiErrors(result);
//         }
//       } else {
//         // Handle JSON test errors
//         handleApiErrors(testResult);
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       setSubmitError(
//         "Network error. Please check your connection and try again."
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Helper function to handle API errors
//   const handleApiErrors = (result) => {
//     if (result.errors) {
//       console.error("Validation errors:", result.errors);

//       // Create user-friendly error messages
//       const errorMessages = Object.entries(result.errors)
//         .map(([field, message]) => {
//           // Convert snake_case to readable field names
//           const readableField = field
//             .replace(/_/g, " ")
//             .replace(/\b\w/g, (l) => l.toUpperCase());
//           return `${readableField}: ${
//             Array.isArray(message) ? message.join(", ") : message
//           }`;
//         })
//         .join("\n");

//       setSubmitError(`Please fix the following errors:\n${errorMessages}`);

//       // Also set field-specific errors for display
//       const fieldErrors = {};
//       Object.entries(result.errors).forEach(([field, messages]) => {
//         // Convert snake_case to camelCase for our form state
//         const camelCaseField = field.replace(/_([a-z])/g, (g) =>
//           g[1].toUpperCase()
//         );
//         fieldErrors[camelCaseField] = Array.isArray(messages)
//           ? messages[0]
//           : messages;
//       });

//       setErrors((prev) => ({ ...prev, ...fieldErrors }));
//     } else {
//       const errorMessage =
//         result.message || "Submission failed. Please try again.";
//       setSubmitError(errorMessage);
//     }
//   };

//   // Calculate age for display
//   const calculateAge = () => {
//     if (!form.dateOfBirth) return 0;
//     const birthDate = new Date(form.dateOfBirth);
//     const today = new Date();
//     let age = today.getFullYear() - birthDate.getFullYear();
//     const monthDiff = today.getMonth() - birthDate.getMonth();
//     if (
//       monthDiff < 0 ||
//       (monthDiff === 0 && today.getDate() < birthDate.getDate())
//     ) {
//       age--;
//     }
//     return age;
//   };

//   // Render document upload section
//   const renderDocumentUploadSection = () => (
//     <section className="bg-gray-50 p-6 rounded-xl border border-gray-300">
//       <h2 className="text-xl font-bold text-gray-700 mb-4 pb-2 border-b border-blue-200">
//         📁 Documents Upload
//       </h2>

//       {/* File Requirements Info */}
//       <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
//         <h3 className="font-semibold text-blue-800 mb-2">
//           📋 File Requirements:
//         </h3>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
//           <div className="flex items-center">
//             <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
//             <span className="font-medium">Images:</span>
//             <span className="ml-2">≤ 200 KB, JPG/PNG, 150 DPI</span>
//           </div>
//           <div className="flex items-center">
//             <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
//             <span className="font-medium">PDFs:</span>
//             <span className="ml-2">≤ 1 MB, PDF format</span>
//           </div>
//           <div className="flex items-center">
//             <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
//             <span className="font-medium">Signatures:</span>
//             <span className="ml-2">≤ 200 KB, JPG/PNG/SVG</span>
//           </div>
//         </div>
//       </div>

//       {/* Student Photo Upload */}
//       <div className="mb-6">
//         <h3 className="text-lg font-semibold text-gray-700 mb-3">
//           Student Passport Size Photograph
//         </h3>
//         <div className="flex items-center space-x-6">
//           <div className="w-32 h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
//             {studentPhoto.preview ? (
//               <img
//                 src={studentPhoto.preview}
//                 alt="Student"
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <div className="text-center p-4">
//                 <div className="text-gray-400 mb-2">Upload Photo</div>
//                 <p className="text-xs text-gray-500">Passport size (35x45mm)</p>
//               </div>
//             )}
//           </div>
//           <div className="flex-1">
//             <div className="space-y-2">
//               <input
//                 type="file"
//                 accept=".jpg,.jpeg,.png"
//                 onChange={handleStudentPhotoUpload}
//                 className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//               />
//               <p className="text-sm text-gray-500">
//                 Max size: 200 KB | Format: JPG, JPEG, PNG | DPI: 150
//               </p>
//               {studentPhoto.error && (
//                 <div className="p-2 bg-red-50 border border-red-200 rounded">
//                   <p className="text-red-600 text-sm">{studentPhoto.error}</p>
//                 </div>
//               )}
//               {studentPhoto.file && !studentPhoto.error && (
//                 <div className="p-2 bg-green-50 border border-green-200 rounded">
//                   <p className="text-green-600 text-sm">
//                     ✓ File uploaded: {studentPhoto.file.name} (
//                     {formatFileSize(studentPhoto.file.size)})
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Documents for Registration */}
//       <div className="mb-8">
//         <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">
//           Documents Required for Registration
//         </h3>
//         <div className="space-y-4">
//           {/* Birth Certificate */}
//           <div className="flex items-start space-x-4 p-3 bg-white rounded-lg border">
//             <div className="flex items-center h-5">
//               <input
//                 type="checkbox"
//                 checked={uploadedDocuments.birthCertificate.uploaded}
//                 readOnly
//                 className="h-4 w-4 text-green-600 rounded focus:ring-blue-500"
//               />
//             </div>
//             <div className="flex-1">
//               <label className="font-medium text-gray-700">
//                 Original Birth Certificate
//               </label>
//               <p className="text-sm text-gray-500">
//                 (Municipal / Government authority only - Certificate issued by
//                 doctors/nursing homes not accepted)
//               </p>
//               <div className="mt-2 space-y-1">
//                 <input
//                   type="file"
//                   accept=".pdf,.jpg,.jpeg,.png"
//                   onChange={(e) => handleFileUpload("birthCertificate", e)}
//                   className="block w-full text-sm text-gray-500 file:mr-4 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//                 />
//                 <p className="text-xs text-gray-500">
//                   Max size: 1 MB | Format: PDF preferred
//                 </p>
//                 {uploadedDocuments.birthCertificate.error && (
//                   <p className="text-red-500 text-xs">
//                     {uploadedDocuments.birthCertificate.error}
//                   </p>
//                 )}
//                 {uploadedDocuments.birthCertificate.file &&
//                   !uploadedDocuments.birthCertificate.error && (
//                     <p className="text-green-600 text-xs">
//                       ✓ {uploadedDocuments.birthCertificate.file.name} (
//                       {formatFileSize(
//                         uploadedDocuments.birthCertificate.file.size
//                       )}
//                       )
//                     </p>
//                   )}
//               </div>
//             </div>
//             {uploadedDocuments.birthCertificate.preview && (
//               <div className="w-16 h-20 border rounded overflow-hidden">
//                 <img
//                   src={uploadedDocuments.birthCertificate.preview}
//                   alt="Birth Certificate"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             )}
//           </div>

//           {/* Parents Photo */}
//           <div className="flex items-start space-x-4 p-3 bg-white rounded-lg border">
//             <div className="flex items-center h-5">
//               <input
//                 type="checkbox"
//                 checked={uploadedDocuments.parentsPhoto.uploaded}
//                 readOnly
//                 className="h-4 w-4 text-green-600 rounded focus:ring-blue-500"
//               />
//             </div>
//             <div className="flex-1">
//               <label className="font-medium text-gray-700">
//                 Combined Photograph of Parents
//               </label>
//               <p className="text-sm text-gray-500">
//                 (Required for pre-school admission only)
//               </p>
//               <div className="mt-2 space-y-1">
//                 <input
//                   type="file"
//                   accept=".jpg,.jpeg,.png"
//                   onChange={(e) => handleFileUpload("parentsPhoto", e)}
//                   className="block w-full text-sm text-gray-500 file:mr-4 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//                 />
//                 <p className="text-xs text-gray-500">
//                   Max size: 200 KB | Format: JPG, JPEG, PNG | DPI: 150
//                 </p>
//                 {uploadedDocuments.parentsPhoto.error && (
//                   <p className="text-red-500 text-xs">
//                     {uploadedDocuments.parentsPhoto.error}
//                   </p>
//                 )}
//                 {uploadedDocuments.parentsPhoto.file &&
//                   !uploadedDocuments.parentsPhoto.error && (
//                     <p className="text-green-600 text-xs">
//                       ✓ {uploadedDocuments.parentsPhoto.file.name} (
//                       {formatFileSize(uploadedDocuments.parentsPhoto.file.size)}
//                       )
//                     </p>
//                   )}
//               </div>
//             </div>
//             {uploadedDocuments.parentsPhoto.preview && (
//               <div className="w-16 h-20 border rounded overflow-hidden">
//                 <img
//                   src={uploadedDocuments.parentsPhoto.preview}
//                   alt="Parents Photo"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Documents for Admission */}
//       <div>
//         <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">
//           Documents to be Submitted at the Time of Admission
//         </h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {[
//             {
//               key: "schoolLeavingCertificate",
//               label: "School Leaving / Transfer Certificate",
//               type: "pdf",
//               maxSize: "1 MB",
//             },
//             {
//               key: "reportCard",
//               label: "Previous Year's Report Card",
//               type: "pdf",
//               maxSize: "1 MB",
//             },
//             {
//               key: "studentAadharCard",
//               label: "Aadhar Card of the Student",
//               type: "pdf",
//               maxSize: "1 MB",
//             },
//             {
//               key: "medicalCertificate",
//               label: "Medical Certificate",
//               type: "pdf",
//               maxSize: "1 MB",
//             },
//             {
//               key: "casteCertificate",
//               label: "Caste Certificate of Father (if applicable)",
//               type: "pdf",
//               maxSize: "1 MB",
//             },
//             {
//               key: "passportPhoto",
//               label: "One Recent Passport-size Colour Photograph",
//               type: "image",
//               maxSize: "200 KB",
//             },
//             {
//               key: "familyPhoto",
//               label: "One Family Photograph",
//               type: "image",
//               maxSize: "200 KB",
//             },
//           ].map((doc, index) => (
//             <div
//               key={doc.key}
//               className={`flex items-start space-x-3 p-3 bg-white rounded-lg border ${
//                 index >= 4 ? "md:col-span-1" : ""
//               }`}
//             >
//               <div className="flex items-center h-5 mt-1">
//                 <input
//                   type="checkbox"
//                   checked={uploadedDocuments[doc.key].uploaded}
//                   readOnly
//                   className="h-4 w-4 text-green-600 rounded focus:ring-blue-500"
//                 />
//               </div>
//               <div className="flex-1 min-w-0">
//                 <label className="font-medium text-gray-700 text-sm">
//                   {doc.label}
//                 </label>
//                 <div className="mt-1 space-y-1">
//                   <input
//                     type="file"
//                     accept={doc.type === "image" ? ".jpg,.jpeg,.png" : ".pdf"}
//                     onChange={(e) => handleFileUpload(doc.key, e)}
//                     className="block w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//                   />
//                   <p className="text-xs text-gray-500">
//                     Max size: {doc.maxSize} | Format:{" "}
//                     {doc.type === "image" ? "JPG, JPEG, PNG" : "PDF"} | DPI:{" "}
//                     {doc.type === "image" ? "150" : "N/A"}
//                   </p>
//                   {uploadedDocuments[doc.key].error && (
//                     <p className="text-red-500 text-xs">
//                       {uploadedDocuments[doc.key].error}
//                     </p>
//                   )}
//                   {uploadedDocuments[doc.key].file &&
//                     !uploadedDocuments[doc.key].error && (
//                       <p className="text-green-600 text-xs">
//                         ✓ {uploadedDocuments[doc.key].file.name} (
//                         {formatFileSize(uploadedDocuments[doc.key].file.size)})
//                       </p>
//                     )}
//                 </div>
//               </div>
//               {uploadedDocuments[doc.key].preview && (
//                 <div className="w-12 h-16 border rounded overflow-hidden flex-shrink-0">
//                   <img
//                     src={uploadedDocuments[doc.key].preview}
//                     alt={doc.label}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Important Notes */}
//       <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
//         <h4 className="font-semibold text-yellow-800 mb-2">
//           📌 Important Notes:
//         </h4>
//         <ul className="text-sm text-yellow-700 space-y-1">
//           <li>
//             • Registration/Admission fees are not refundable and not
//             transferable to another year
//           </li>
//           <li>
//             • Fresh registration is required for subsequent year admission
//           </li>
//           <li>
//             • Admission form will be considered invalid if documents are missing
//             or don't meet requirements
//           </li>
//           <li>
//             • For best quality, ensure images are 150 DPI and properly cropped
//           </li>
//         </ul>
//       </div>
//     </section>
//   );

//   return (
//     <div className="max-w-6xl mx-auto p-6 bg-white shadow-2xl rounded-2xl">
//       {/* Success/Error Messages */}
//       {submitSuccess && (
//         <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
//           <div className="flex items-center">
//             <svg
//               className="w-5 h-5 text-green-500 mr-2"
//               fill="currentColor"
//               viewBox="0 0 20 20"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                 clipRule="evenodd"
//               />
//             </svg>
//             <p className="text-green-700 font-medium">
//               Admission form submitted successfully! Form will reset in a few
//               seconds.
//             </p>
//           </div>
//         </div>
//       )}

//       {submitError && (
//         <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
//           <div className="flex items-center">
//             <svg
//               className="w-5 h-5 text-red-500 mr-2"
//               fill="currentColor"
//               viewBox="0 0 20 20"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
//                 clipRule="evenodd"
//               />
//             </svg>
//             <div className="text-red-700">
//               <p className="font-medium mb-1">Submission Error:</p>
//               <p className="text-sm whitespace-pre-line">{submitError}</p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Debug Section */}
//       {debugMode && (
//         <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
//           <div className="flex justify-between items-center mb-2">
//             <h3 className="font-bold text-purple-800">Debug Mode</h3>
//             <button
//               onClick={() => setDebugMode(false)}
//               className="text-xs px-2 py-1 bg-purple-600 text-white rounded"
//             >
//               Hide
//             </button>
//           </div>
//           <div className="space-y-2">
//             <button
//               onClick={testApiCall}
//               className="px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700"
//             >
//               Test API (JSON only)
//             </button>
//             <p className="text-xs text-purple-600">
//               API Base URL: {API_BASE_URL}
//             </p>
//           </div>
//         </div>
//       )}

//       {/* School Header */}
//       <div className="text-center mb-8 border-b-2 border-blue-200 pb-6">
//         <h1 className="text-3xl font-extrabold text-gray-500">
//           VIDYA PRABODHINI PRASHALA
//         </h1>
//         <p className="text-gray-600 mt-2">(Affiliated with CBSE, New Delhi)</p>
//         <p className="text-sm text-gray-500 mt-1">ADMISSION FORM</p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-8">
//         {/* School Metadata Section */}
//         <section className="bg-gray-50 p-6 rounded-xl border border-gray-300">
//           <h2 className="text-xl font-bold text-gray-700 mb-4 pb-2 border-b border-blue-200">
//             School Information
//           </h2>
//           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Form No.
//               </label>
//               <input
//                 type="text"
//                 name="formNo"
//                 value={form.formNo}
//                 readOnly
//                 className="input bg-gray-100"
//               />
//             </div>
//           </div>
//         </section>

//         {/* Admission Details */}
//         <section className="bg-gray-50 p-6 rounded-xl border border-gray-300">
//           <h2 className="text-xl font-bold text-gray-700 mb-4 pb-2 border-b border-blue-200">
//             Admission Details
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Admission for the Class *
//               </label>
//               <select
//                 name="admissionForClass"
//                 value={form.admissionForClass}
//                 onChange={handleChange}
//                 className="input"
//                 required
//               >
//                 <option value="">Select Class</option>
//                 {classes.map((cls) => (
//                   <option key={cls} value={cls}>
//                     {cls}
//                   </option>
//                 ))}
//               </select>
//               {errors.admissionForClass && (
//                 <p className="error">{errors.admissionForClass}</p>
//               )}
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Academic Year *
//               </label>
//               <select
//                 name="academicYear"
//                 value={form.academicYear}
//                 onChange={handleChange}
//                 className="input"
//                 required
//               >
//                 <option value="">Select Year</option>
//                 {academicYears.map((year) => (
//                   <option key={year} value={year}>
//                     {year}
//                   </option>
//                 ))}
//               </select>
//               {errors.academicYear && (
//                 <p className="error">{errors.academicYear}</p>
//               )}
//             </div>
//           </div>
//         </section>

//         {/* Student Particulars */}
//         <section className="bg-gray-50 p-6 rounded-xl border border-gray-300">
//           <h2 className="text-xl font-bold text-gray-700 mb-4 pb-2 border-b border-blue-200">
//             Particulars of Student
//           </h2>

//           {/* Student Name - Block Letters */}
//           <div className="mb-6">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Student Name (IN BLOCK LETTERS)
//             </label>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div>
//                 <input
//                   type="text"
//                   name="studentFirstName"
//                   placeholder="First Name *"
//                   value={form.studentFirstName}
//                   onChange={handleChange}
//                   className="input uppercase"
//                   required
//                 />
//                 {errors.studentFirstName && (
//                   <p className="error">{errors.studentFirstName}</p>
//                 )}
//               </div>
//               <div>
//                 <input
//                   type="text"
//                   name="studentMiddleName"
//                   placeholder="Middle Name"
//                   value={form.studentMiddleName}
//                   onChange={handleChange}
//                   className="input uppercase"
//                 />
//               </div>
//               <div>
//                 <input
//                   type="text"
//                   name="studentLastName"
//                   placeholder="Last Name *"
//                   value={form.studentLastName}
//                   onChange={handleChange}
//                   className="input uppercase"
//                   required
//                 />
//                 {errors.studentLastName && (
//                   <p className="error">{errors.studentLastName}</p>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Personal Details Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Date of Birth *
//               </label>
//               <input
//                 type="date"
//                 name="dateOfBirth"
//                 value={form.dateOfBirth}
//                 onChange={handleChange}
//                 className="input"
//                 required
//               />
//               {form.dateOfBirth && (
//                 <p className="text-xs text-gray-500 mt-1">
//                   Age: {calculateAge()} years
//                 </p>
//               )}
//               {errors.dateOfBirth && (
//                 <p className="error">{errors.dateOfBirth}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Place of Birth
//               </label>
//               <input
//                 type="text"
//                 name="placeOfBirth"
//                 placeholder="Place of Birth"
//                 value={form.placeOfBirth}
//                 onChange={handleChange}
//                 className="input"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Blood Group
//               </label>
//               <select
//                 name="bloodGroup"
//                 value={form.bloodGroup}
//                 onChange={handleChange}
//                 className="input"
//               >
//                 <option value="">Select Blood Group</option>
//                 {bloodGroups.map((bg) => (
//                   <option key={bg} value={bg}>
//                     {bg}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Religion
//               </label>
//               <select
//                 name="religion"
//                 value={form.religion}
//                 onChange={handleChange}
//                 className="input"
//               >
//                 <option value="">Select Religion</option>
//                 {religions.map((rel) => (
//                   <option key={rel} value={rel}>
//                     {rel}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* Caste and Category Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Caste
//               </label>
//               <input
//                 type="text"
//                 name="caste"
//                 placeholder="Caste"
//                 value={form.caste}
//                 onChange={handleChange}
//                 className="input"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Sub-Caste
//               </label>
//               <input
//                 type="text"
//                 name="subCaste"
//                 placeholder="Sub-Caste"
//                 value={form.subCaste}
//                 onChange={handleChange}
//                 className="input"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Category *
//               </label>
//               <select
//                 name="category"
//                 value={form.category}
//                 onChange={handleChange}
//                 className="input"
//                 required
//               >
//                 <option value="">Select Category</option>
//                 {categories.map((cat) => (
//                   <option key={cat} value={cat}>
//                     {cat}
//                   </option>
//                 ))}
//               </select>
//               {errors.category && <p className="error">{errors.category}</p>}
//             </div>
//           </div>

//           {/* Mother Tongue and Nationality */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Mother Tongue
//               </label>
//               <select
//                 name="motherTongue"
//                 value={form.motherTongue}
//                 onChange={handleChange}
//                 className="input"
//               >
//                 <option value="">Select Mother Tongue</option>
//                 {motherTongues.map((tongue) => (
//                   <option key={tongue} value={tongue}>
//                     {tongue}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Nationality
//               </label>
//               <select
//                 name="nationality"
//                 value={form.nationality}
//                 onChange={handleChange}
//                 className="input"
//               >
//                 <option value="Indian">Indian</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>
//           </div>

//           {/* Academic Background */}
//           <div className="mb-6">
//             <h3 className="text-lg font-semibold text-gray-700 mb-3">
//               Academic Background
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Last Examination Passed
//                 </label>
//                 <input
//                   type="text"
//                   name="lastExaminationPassed"
//                   placeholder="e.g., 10th Standard"
//                   value={form.lastExaminationPassed}
//                   onChange={handleChange}
//                   className="input"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Year
//                 </label>
//                 <input
//                   type="text"
//                   name="examinationYear"
//                   placeholder="Year"
//                   value={form.examinationYear}
//                   onChange={handleChange}
//                   className="input"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Name of Last School Attended
//                 </label>
//                 <input
//                   type="text"
//                   name="nameOfLastSchoolAttended"
//                   placeholder="Previous School Name"
//                   value={form.nameOfLastSchoolAttended}
//                   onChange={handleChange}
//                   className="input"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Identity Information */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 PEN Number
//               </label>
//               <input
//                 type="text"
//                 name="penNumber"
//                 placeholder="PEN Number"
//                 value={form.penNumber}
//                 onChange={handleChange}
//                 className="input"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Aadhar Number of Student
//               </label>
//               <input
//                 type="text"
//                 name="aadharNumber"
//                 placeholder="12-digit Aadhar"
//                 value={form.aadharNumber}
//                 onChange={handleChange}
//                 className="input"
//                 maxLength="12"
//               />
//               {errors.aadharNumber && (
//                 <p className="error">{errors.aadharNumber}</p>
//               )}
//             </div>
//           </div>

//           {/* Address Details */}
//           <div className="space-y-6">
//             <div>
//               <h3 className="text-lg font-semibold text-gray-700 mb-3">
//                 Permanent Address
//               </h3>
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Address *
//                   </label>
//                   <textarea
//                     name="permanentAddress"
//                     placeholder="Full Permanent Address"
//                     value={form.permanentAddress}
//                     onChange={handleChange}
//                     rows="3"
//                     className="input"
//                     required
//                   />
//                   {errors.permanentAddress && (
//                     <p className="error">{errors.permanentAddress}</p>
//                   )}
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       District *
//                     </label>
//                     <input
//                       type="text"
//                       name="district"
//                       placeholder="District"
//                       value={form.district}
//                       onChange={handleChange}
//                       className="input"
//                       required
//                     />
//                     {errors.district && (
//                       <p className="error">{errors.district}</p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       State *
//                     </label>
//                     <select
//                       name="state"
//                       value={form.state}
//                       onChange={handleChange}
//                       className="input"
//                       required
//                     >
//                       <option value="">Select State</option>
//                       {states.map((state) => (
//                         <option key={state} value={state}>
//                           {state}
//                         </option>
//                       ))}
//                     </select>
//                     {errors.state && <p className="error">{errors.state}</p>}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Pin Code *
//                     </label>
//                     <input
//                       type="text"
//                       name="pinCode"
//                       placeholder="6-digit Pin Code"
//                       value={form.pinCode}
//                       onChange={handleChange}
//                       className="input"
//                       maxLength="6"
//                       required
//                     />
//                     {errors.pinCode && (
//                       <p className="error">{errors.pinCode}</p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Local Address */}
//             <div>
//               <div className="flex items-center justify-between mb-3">
//                 <h3 className="text-lg font-semibold text-gray-700">
//                   Local Address (for communication)
//                 </h3>
//                 <div className="flex items-center">
//                   <input
//                     type="checkbox"
//                     id="sameAddress"
//                     checked={isSameAddress}
//                     onChange={(e) => setIsSameAddress(e.target.checked)}
//                     className="h-4 w-4 text-blue-600 rounded"
//                   />
//                   <label
//                     htmlFor="sameAddress"
//                     className="ml-2 text-sm text-gray-700"
//                   >
//                     Same as Permanent Address
//                   </label>
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <div>
//                   <textarea
//                     name="localAddress"
//                     placeholder="Local Address"
//                     value={form.localAddress}
//                     onChange={handleChange}
//                     rows="2"
//                     className="input"
//                     disabled={isSameAddress}
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Local Pin Code
//                   </label>
//                   <input
//                     type="text"
//                     name="localPinCode"
//                     placeholder="Local Pin Code"
//                     value={form.localPinCode}
//                     onChange={handleChange}
//                     className="input"
//                     maxLength="6"
//                     disabled={isSameAddress}
//                   />
//                   {errors.localPinCode && (
//                     <p className="error">{errors.localPinCode}</p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Father's Details */}
//         <section className="bg-gray-50 p-6 rounded-xl border border-gray-300">
//           <h2 className="text-xl font-bold text-gray-700 mb-4 pb-2 border-b border-blue-200">
//             Father's Details
//           </h2>

//           {/* Father's Name - Block Letters */}
//           <div className="mb-6">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Father's Name (IN BLOCK LETTERS)
//             </label>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div>
//                 <input
//                   type="text"
//                   name="fatherFirstName"
//                   placeholder="First Name *"
//                   value={form.fatherFirstName}
//                   onChange={handleChange}
//                   className="input uppercase"
//                   required
//                 />
//                 {errors.fatherFirstName && (
//                   <p className="error">{errors.fatherFirstName}</p>
//                 )}
//               </div>
//               <div>
//                 <input
//                   type="text"
//                   name="fatherMiddleName"
//                   placeholder="Middle Name"
//                   value={form.fatherMiddleName}
//                   onChange={handleChange}
//                   className="input uppercase"
//                 />
//               </div>
//               <div>
//                 <input
//                   type="text"
//                   name="fatherLastName"
//                   placeholder="Last Name *"
//                   value={form.fatherLastName}
//                   onChange={handleChange}
//                   className="input uppercase"
//                   required
//                 />
//                 {errors.fatherLastName && (
//                   <p className="error">{errors.fatherLastName}</p>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Father's Professional Information */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Educational Qualification
//               </label>
//               <input
//                 type="text"
//                 name="fatherEducationalQualification"
//                 placeholder="Highest Qualification"
//                 value={form.fatherEducationalQualification}
//                 onChange={handleChange}
//                 className="input"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Occupation
//               </label>
//               <input
//                 type="text"
//                 name="fatherOccupation"
//                 placeholder="Occupation"
//                 value={form.fatherOccupation}
//                 onChange={handleChange}
//                 className="input"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Annual Income
//               </label>
//               <input
//                 type="text"
//                 name="fatherAnnualIncome"
//                 placeholder="Annual Income"
//                 value={form.fatherAnnualIncome}
//                 onChange={handleChange}
//                 className="input"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Email ID
//               </label>
//               <input
//                 type="email"
//                 name="fatherEmailID"
//                 placeholder="Email Address"
//                 value={form.fatherEmailID}
//                 onChange={handleChange}
//                 className="input"
//               />
//             </div>
//           </div>

//           {/* Father's Contact & Identity */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Mobile No. 1 *
//               </label>
//               <input
//                 type="text"
//                 name="fatherMobileNo1"
//                 placeholder="10-digit Mobile No"
//                 value={form.fatherMobileNo1}
//                 onChange={handleChange}
//                 className="input"
//                 maxLength="10"
//                 required
//               />
//               {errors.fatherMobileNo1 && (
//                 <p className="error">{errors.fatherMobileNo1}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Mobile No. 2
//               </label>
//               <input
//                 type="text"
//                 name="fatherMobileNo2"
//                 placeholder="Alternate Mobile No"
//                 value={form.fatherMobileNo2}
//                 onChange={handleChange}
//                 className="input"
//                 maxLength="10"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Aadhar Number
//               </label>
//               <input
//                 type="text"
//                 name="fatherAadharNumber"
//                 placeholder="Father's Aadhar"
//                 value={form.fatherAadharNumber}
//                 onChange={handleChange}
//                 className="input"
//                 maxLength="12"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 PAN Number
//               </label>
//               <input
//                 type="text"
//                 name="fatherPANNumber"
//                 placeholder="Father's PAN"
//                 value={form.fatherPANNumber}
//                 onChange={handleChange}
//                 className="input"
//                 maxLength="10"
//               />
//             </div>
//           </div>
//         </section>

//         {/* Mother's Details */}
//         <section className="bg-gray-50 p-6 rounded-xl border border-gray-300">
//           <h2 className="text-xl font-bold text-gray-700 mb-4 pb-2 border-b border-blue-200">
//             Mother's Details
//           </h2>

//           {/* Mother's Name - Block Letters */}
//           <div className="mb-6">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Mother's Name (IN BLOCK LETTERS)
//             </label>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div>
//                 <input
//                   type="text"
//                   name="motherFirstName"
//                   placeholder="First Name *"
//                   value={form.motherFirstName}
//                   onChange={handleChange}
//                   className="input uppercase"
//                   required
//                 />
//                 {errors.motherFirstName && (
//                   <p className="error">{errors.motherFirstName}</p>
//                 )}
//               </div>
//               <div>
//                 <input
//                   type="text"
//                   name="motherMiddleName"
//                   placeholder="Middle Name"
//                   value={form.motherMiddleName}
//                   onChange={handleChange}
//                   className="input uppercase"
//                 />
//               </div>
//               <div>
//                 <input
//                   type="text"
//                   name="motherLastName"
//                   placeholder="Last Name *"
//                   value={form.motherLastName}
//                   onChange={handleChange}
//                   className="input uppercase"
//                   required
//                 />
//                 {errors.motherLastName && (
//                   <p className="error">{errors.motherLastName}</p>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Mother's Professional Information */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Educational Qualification
//               </label>
//               <input
//                 type="text"
//                 name="motherEducationalQualification"
//                 placeholder="Highest Qualification"
//                 value={form.motherEducationalQualification}
//                 onChange={handleChange}
//                 className="input"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Occupation
//               </label>
//               <input
//                 type="text"
//                 name="motherOccupation"
//                 placeholder="Occupation"
//                 value={form.motherOccupation}
//                 onChange={handleChange}
//                 className="input"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Annual Income
//               </label>
//               <input
//                 type="text"
//                 name="motherAnnualIncome"
//                 placeholder="Annual Income"
//                 value={form.motherAnnualIncome}
//                 onChange={handleChange}
//                 className="input"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Email ID
//               </label>
//               <input
//                 type="email"
//                 name="motherEmailID"
//                 placeholder="Email Address"
//                 value={form.motherEmailID}
//                 onChange={handleChange}
//                 className="input"
//               />
//             </div>
//           </div>

//           {/* Mother's Contact & Identity */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Mobile Number
//               </label>
//               <input
//                 type="text"
//                 name="motherMobileNumber"
//                 placeholder="10-digit Mobile No"
//                 value={form.motherMobileNumber}
//                 onChange={handleChange}
//                 className="input"
//                 maxLength="10"
//               />
//               {errors.motherMobileNumber && (
//                 <p className="error">{errors.motherMobileNumber}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Aadhar Number
//               </label>
//               <input
//                 type="text"
//                 name="motherAadharNumber"
//                 placeholder="Mother's Aadhar"
//                 value={form.motherAadharNumber}
//                 onChange={handleChange}
//                 className="input"
//                 maxLength="12"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 PAN Number
//               </label>
//               <input
//                 type="text"
//                 name="motherPANNumber"
//                 placeholder="Mother's PAN"
//                 value={form.motherPANNumber}
//                 onChange={handleChange}
//                 className="input"
//                 maxLength="10"
//               />
//             </div>
//           </div>
//         </section>

//         {/* Additional Information */}
//         <section className="bg-gray-50 p-6 rounded-xl border border-gray-300">
//           <h2 className="text-xl font-bold text-gray-700 mb-4 pb-2 border-b border-blue-200">
//             Additional Information
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Medical History of the Student
//               </label>
//               <textarea
//                 name="medicalHistory"
//                 placeholder="Any medical conditions, allergies, etc."
//                 value={form.medicalHistory}
//                 onChange={handleChange}
//                 rows="4"
//                 className="input"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Achievements of the Student
//               </label>
//               <textarea
//                 name="studentAchievements"
//                 placeholder="Academic or extracurricular achievements"
//                 value={form.studentAchievements}
//                 onChange={handleChange}
//                 rows="4"
//                 className="input"
//               />
//             </div>
//           </div>
//         </section>

//         {/* Document Upload Section */}
//         {renderDocumentUploadSection()}

//         {/* Declaration Section with checkboxes and signature upload */}
//         <section className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
//           <h2 className="text-xl font-bold text-gray-700 mb-4 pb-2 border-b border-yellow-300">
//             Declaration of Parents / Guardian
//           </h2>

//           <div className="mb-4 text-sm text-gray-700 space-y-4">
//             {/* Declaration Statements with Checkboxes */}
//             <div className="space-y-3">
//               <div className="flex items-start space-x-3">
//                 <div className="flex items-center h-5 mt-0.5">
//                   <input
//                     type="checkbox"
//                     name="readRules"
//                     checked={declaration.readRules}
//                     onChange={handleDeclarationChange}
//                     className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="font-medium">
//                     We have read and understood the school rules and regulations
//                     as printed in the school almanac and we abide by them.
//                   </label>
//                 </div>
//               </div>

//               <div className="flex items-start space-x-3">
//                 <div className="flex items-center h-5 mt-0.5">
//                   <input
//                     type="checkbox"
//                     name="agreeFees"
//                     checked={declaration.agreeFees}
//                     onChange={handleDeclarationChange}
//                     className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="font-medium">
//                     We undertake to pay the school fees on due date.
//                   </label>
//                 </div>
//               </div>

//               <div className="flex items-start space-x-3">
//                 <div className="flex items-center h-5 mt-0.5">
//                   <input
//                     type="checkbox"
//                     name="confirmInfo"
//                     checked={declaration.confirmInfo}
//                     onChange={handleDeclarationChange}
//                     className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="font-medium">
//                     We confirm that the information provided above is true and
//                     correct based on valid government documents.
//                   </label>
//                 </div>
//               </div>
//             </div>

//             {errors.declaration && (
//               <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
//                 <p className="text-red-600 text-sm">{errors.declaration}</p>
//               </div>
//             )}
//           </div>

//           {/* Place, Date and Signature Uploads */}
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Place
//               </label>
//               <input
//                 type="text"
//                 name="declarationPlace"
//                 placeholder="Place"
//                 value={form.declarationPlace}
//                 onChange={handleChange}
//                 className="input"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Date
//               </label>
//               <input
//                 type="date"
//                 name="declarationDate"
//                 value={form.declarationDate}
//                 onChange={handleChange}
//                 className="input"
//               />
//             </div>

//             {/* Father's Signature Upload */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Signature of Father / Guardian
//               </label>
//               <div className="border border-gray-300 rounded-lg p-2 bg-white">
//                 {declaration.fatherSignature.preview ? (
//                   <div className="space-y-2">
//                     <img
//                       src={declaration.fatherSignature.preview}
//                       alt="Father's Signature"
//                       className="h-12 object-contain mx-auto"
//                     />
//                     {declaration.fatherSignature.file &&
//                       !declaration.fatherSignature.error && (
//                         <p className="text-green-600 text-xs text-center">
//                           ✓{" "}
//                           {formatFileSize(
//                             declaration.fatherSignature.file.size
//                           )}
//                         </p>
//                       )}
//                     <div className="flex justify-center space-x-2">
//                       <button
//                         type="button"
//                         onClick={() => clearSignature("fatherSignature")}
//                         className="text-xs text-red-600 hover:text-red-800"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="text-center space-y-1">
//                     <input
//                       type="file"
//                       accept=".jpg,.jpeg,.png,.svg"
//                       onChange={(e) =>
//                         handleSignatureUpload("fatherSignature", e)
//                       }
//                       className="block w-full text-xs text-gray-500"
//                     />
//                     <p className="text-xs text-gray-400">
//                       Max size: 200 KB | JPG/PNG/SVG
//                     </p>
//                     {declaration.fatherSignature.error && (
//                       <p className="text-red-500 text-xs mt-1">
//                         {declaration.fatherSignature.error}
//                       </p>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Mother's Signature Upload */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Signature of Mother
//               </label>
//               <div className="border border-gray-300 rounded-lg p-2 bg-white">
//                 {declaration.motherSignature.preview ? (
//                   <div className="space-y-2">
//                     <img
//                       src={declaration.motherSignature.preview}
//                       alt="Mother's Signature"
//                       className="h-12 object-contain mx-auto"
//                     />
//                     {declaration.motherSignature.file &&
//                       !declaration.motherSignature.error && (
//                         <p className="text-green-600 text-xs text-center">
//                           ✓{" "}
//                           {formatFileSize(
//                             declaration.motherSignature.file.size
//                           )}
//                         </p>
//                       )}
//                     <div className="flex justify-center space-x-2">
//                       <button
//                         type="button"
//                         onClick={() => clearSignature("motherSignature")}
//                         className="text-xs text-red-600 hover:text-red-800"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="text-center space-y-1">
//                     <input
//                       type="file"
//                       accept=".jpg,.jpeg,.png,.svg"
//                       onChange={(e) =>
//                         handleSignatureUpload("motherSignature", e)
//                       }
//                       className="block w-full text-xs text-gray-500"
//                     />
//                     <p className="text-xs text-gray-400">
//                       Max size: 200 KB | JPG/PNG/SVG
//                     </p>
//                     {declaration.motherSignature.error && (
//                       <p className="text-red-500 text-xs mt-1">
//                         {declaration.motherSignature.error}
//                       </p>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           <div className="text-sm text-gray-600 italic mb-6 p-3 bg-white rounded-lg border">
//             <p className="font-medium mb-1">Important Note:</p>
//             <p>
//               Information provided above will be recorded in the School General
//               Register and no change will be permitted later.
//             </p>
//           </div>
//         </section>

//         {/* Submit Button */}
//         <div className="text-center pt-6">
//           {Object.values(uploadedDocuments).some((doc) => doc.error) ||
//           studentPhoto.error ||
//           declaration.fatherSignature.error ||
//           declaration.motherSignature.error ? (
//             <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
//               <p className="text-red-600">
//                 Please fix all file upload errors before submitting
//               </p>
//             </div>
//           ) : null}

//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="px-10 py-4 bg-orange-600 text-white text-lg font-semibold rounded-lg hover:bg-orange-700 transition duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {isSubmitting ? (
//               <span className="flex items-center justify-center">
//                 <svg
//                   className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   ></circle>
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                   ></path>
//                 </svg>
//                 Submitting...
//               </span>
//             ) : (
//               "Submit Admission Form"
//             )}
//           </button>

//           <p className="text-sm text-gray-500 mt-3">
//             Note: All fields marked with * are mandatory
//           </p>
//           <p className="text-sm text-blue-600 mt-2">
//             ✓ Please check all declaration boxes before submitting
//           </p>
//           <p className="text-xs text-gray-500 mt-1">
//             Images: ≤ 200 KB | PDFs: ≤ 1 MB | Signatures: ≤ 200 KB | DPI: 150
//           </p>
//         </div>
//       </form>
//     </div>
//   );
// };

// // Add these styles to your CSS file or in a <style> tag
// const styles = `
//   .input {
//     width: 100%;
//     padding: 0.75rem 1rem;
//     border: 1px solid #d1d5db;
//     border-radius: 0.5rem;
//     font-size: 0.875rem;
//     transition: all 0.2s;
//     background-color: white;
//   }

//   .input:focus {
//     outline: none;
//     border-color: #3b82f6;
//     box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
//   }

//   .input:disabled {
//     background-color: #f3f4f6;
//     cursor: not-allowed;
//   }

//   .input.uppercase {
//     text-transform: uppercase;
//   }

//   .error {
//     color: #ef4444;
//     font-size: 0.75rem;
//     margin-top: 0.25rem;
//   }

//   .input.bg-gray-100 {
//     background-color: #f3f4f6;
//   }

//   textarea.input {
//     resize: vertical;
//     min-height: 80px;
//   }

//   /* File input styling */
//   input[type="file"]::file-selector-button {
//     border: 2px solid #3b82f6;
//     padding: 0.2em 0.4em;
//     border-radius: 0.2em;
//     background-color: #eff6ff;
//     transition: 0.2s;
//   }

//   input[type="file"]::file-selector-button:hover {
//     background-color: #dbeafe;
//   }

//   /* Checkbox styling */
//   input[type="checkbox"] {
//     border-color: #6b7280;
//   }

//   input[type="checkbox"]:checked {
//     background-color: #3b82f6;
//     border-color: #3b82f6;
//   }
// `;

// // Add the styles to the document head
// if (typeof document !== "undefined") {
//   const styleElement = document.createElement("style");
//   styleElement.innerHTML = styles;
//   document.head.appendChild(styleElement);
// }

// export default AdmissionForm;
