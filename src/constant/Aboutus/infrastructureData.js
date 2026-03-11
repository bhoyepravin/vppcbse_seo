// data/infrastructureData.js

import {
  building_01,
  building_02,
  gallaryimg1,
  gallaryimg2,
  gallaryimg3,
  gallaryimg4,
  gallaryimg5,
  gallaryimg6,
  gallaryimg7,
  infrastructure_1,
  infrastructure_10,
  infrastructure_11,
  infrastructure_12,
  infrastructure_13,
  infrastructure_14,
  infrastructure_2,
  infrastructure_3,
  infrastructure_4,
  infrastructure_5,
  infrastructure_6,
  infrastructure_7,
  infrastructure_8,
  infrastructure_9,
} from "../../assets";

// Import all infrastructure images (assuming you have infrastructure_1.jpg to infrastructure_14.jpg)

const infrastructureData = {
  sections: [
    {
      id: "kg-infrastructure",
      title: "KG Infrastructure",
      subtitle: "Explore Our Campus Virtually",
      description:
        "Take a 360° virtual tour of our state-of-the-art infrastructure, modern classrooms, and extensive facilities.",
      type: "gallery",
      // Using imported images for the first section with alt text
      images: [
        {
          id: 1,
          image: infrastructure_1,
          caption: "School Corridor",
          alt: "VPP_School_Corridor",
        },
        {
          id: 2,
          image: infrastructure_2,
          caption: "School Corridor",
          alt: "VPP_School_Corridor",
        },
        {
          id: 3,
          image: infrastructure_3,
          caption: "School Corridor",
          alt: "VPP_School_Corridor",
        },
        {
          id: 4,
          image: infrastructure_4,
          caption: "School Corridor",
          alt: "VPP_School_Corridor",
        },
        {
          id: 5,
          image: infrastructure_5,
          caption: "School Corridor",
          alt: "VPP_School_Corridor",
        },
        {
          id: 6,
          image: infrastructure_6,
          caption: "School Corridor",
          alt: "VPP_School_Corridor",
        },
        {
          id: 7,
          image: infrastructure_7,
          caption: "Pre Primary Section",
          alt: "Pre Primary Section",
        },
        {
          id: 8,
          image: infrastructure_8,
          caption: "Pre Primary Section",
          alt: "Pre Primary Section",
        },
        {
          id: 9,
          image: infrastructure_9,
          caption: "Pre Primary Section",
          alt: "Pre Primary Section",
        },
        {
          id: 10,
          image: infrastructure_10,
          caption: "Pre Primary Section",
          alt: "Pre Primary Section",
        },
        {
          id: 11,
          image: infrastructure_11,
          caption: "Pre Primary Section",
          alt: "Pre Primary Section",
        },
        {
          id: 12,
          image: infrastructure_12,
          caption: "Pre Primary Section",
          alt: "Pre Primary Section",
        },
        {
          id: 13,
          image: infrastructure_13,
          caption: "Pre Primary Section",
          alt: "Pre Primary Section",
        },
        {
          id: 14,
          image: infrastructure_14,
          caption: "Pre Primary Section",
          alt: "Pre Primary Section",
        },
      ],
    },
    {
      id: "school-building",
      title: "School Building",
      subtitle: "Modern Architecture & Design",
      description:
        "Our school building features contemporary design with spacious classrooms and excellent facilities.",
      type: "gallery",
      images: [
        {
          id: 1,
          image: gallaryimg1,
          caption: "Main Building Front View",
          alt: "School building exterior with modern architecture and green surroundings",
        },
        {
          id: 2,
          image: gallaryimg2,
          caption: "Main Building Front View",
          alt: "School corridors with bright lighting and student artwork displays",
        },
        {
          id: 3,
          image: gallaryimg3,
          caption: "Main Building Front View",
          alt: "Modern classroom with smart board and comfortable seating",
        },
        {
          id: 4,
          image: gallaryimg4,
          caption: "Main Building Front View",
          alt: "Modern classroom with smart board and comfortable seating",
        },
        {
          id: 5,
          image: gallaryimg5,
          caption: "Modern Classroom",
          alt: "Modern classroom with smart board and comfortable seating",
        },
        {
          id: 6,
          image: gallaryimg6,
          caption: "Modern Classroom",
          alt: "Modern classroom with smart board and comfortable seating",
        },
        {
          id: 7,
          image: gallaryimg7,
          caption: "Modern Classroom",
          alt: "Modern classroom with smart board and comfortable seating",
        },
        {
          id: 8,
          image: building_01,
          caption: "School Entrance",
          alt: "School Entrance",
        },
        {
          id: 9,
          image: building_02,
          caption: "School Entrance",
          alt: "School Entrance",
        },
      ],
    },
    
  ],
};

export default infrastructureData;
