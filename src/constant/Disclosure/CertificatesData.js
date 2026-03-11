import {
  affiliationcert,
  buildingsafty,
  firesaftycert,
  hyginecert,
  noc,
  nonproprietary,
  watercert,
} from "../../assets";

const certificatesData = [
  {
    id: 1,
    name: "Fire Safety Certificate",
    file: firesaftycert,
  },
  {
    id: 2,
    name: " Building Safety",
    file: buildingsafty,
  },
  {
    id: 3,
    name: "Extension of Affiliation Certificate",
    file: affiliationcert,
  },
  {
    id: 4,
    name: "Hygiene Certificate",
    file: hyginecert,
  },
  {
    id: 5,
    name: "NOC",
    file: noc,
  },
  {
    id: 6,
    name: "Non-Proprietary Document",
    file: nonproprietary,
  },
  {
    id: 7,
    name: "Water Certificate",
    file: watercert,
  },
];

export default certificatesData;
