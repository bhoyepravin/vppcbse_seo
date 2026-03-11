// src/data/programsData.js

import { elephantsticker } from "../../../../assets";

const programsData = [
  {
    id: 1,
    name: "Playgroup",
    age: "Age 2 - 3 years",
    color: "bg-pink-500",
    icon: "🛒",
    image: elephantsticker, // add the image path here
  },
  {
    id: 2,
    name: "Nursery",
    age: "Age 3 - 4 years",
    color: "bg-green-500",
    icon: "🧑",
    image: "/images/nursery.jpg",
  },
  {
    id: 3,
    name: "Junior Kindergarten",
    age: "Age 4 - 5 years",
    color: "bg-blue-600",
    icon: "🎒",
    image: "/images/junior-kindergarten.jpg",
  },
  {
    id: 4,
    name: "Senior Kindergarten",
    age: "Age 5 - 6 years",
    color: "bg-orange-500",
    icon: "🛒",
    image: "/images/senior-kindergarten.jpg",
  },
];

export default programsData;
