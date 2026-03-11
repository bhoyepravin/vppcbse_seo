import { affiliationcert } from "../../assets";

// constant/Infocorner/CbseAffiliationData.js
const cbseAffiliationData = [
  {
    id: 1,
    title: "Extension of Affiliation Certificate",
    type: "Affiliation Extension",
    description:
      "Official certificate extending our CBSE affiliation for the next 5-year period, confirming compliance with all board regulations.",
    pdfFile: affiliationcert,
    isMandatory: true,
    
  },
  
  {
    id: 2,
    title: "Senior Secondary Affiliation",
    type: "Senior Secondary",
    description:
      "CBSE affiliation certificate specifically for Senior Secondary level (Classes XI-XII), allowing us to offer higher secondary education under CBSE curriculum.",
    pdfFile: affiliationcert,
    
    isMandatory: true,
  },
];

export default cbseAffiliationData;
