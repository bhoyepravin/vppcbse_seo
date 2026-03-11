import { awards1, awards3, basketballtour1, curriculum, InvestitureCere1, personalizesupport, rakhi3, sciencelab } from "../../assets";

const blogData = {
  hero: {
    title: "Blogs by VPP School",
    image: curriculum,
  },

  title: "Blog & Updates",
  description:
    "Explore news, achievements, events, and activities at Vidya Prabodhini Prashala School.",

  categories: [
    {
      id: "events",
      title: "Events",
      blogs: [
        {
          id: 1,
          title: "Annual Day Celebration 2025",
          image: InvestitureCere1,
          description:
            "A grand celebration showcasing student talent and discipline.",
          date: "12 Jan 2025",
          path:"/images"
        },
        {
          id: 2,
          title: "Sports Day Highlights",
          image: basketballtour1,
          description:
            "Students displayed teamwork and sportsmanship during Sports Day.",
          date: "05 Feb 2025",
          path:"/images"
        },
      ],
    },

    {
      id: "academics",
      title: "Academics",
      blogs: [
        {
          id: 3,
          title: "Board Exam Preparation Workshop",
          image: personalizesupport,
          description:
            "A special workshop to guide students for CBSE board exams.",
          date: "20 Jan 2025",
          path:"/images"
        },
        {
          id: 4,
          title: "Science Exhibition 2025",
          image: sciencelab,
          description:
            "Innovative science projects presented by our young minds.",
          date: "28 Jan 2025",
          path:"/images"
        },
      ],
    },

    {
      id: "achievements",
      title: "Achievements",
      blogs: [
        {
          id: 5,
          title: "State Level Sports Winners",
          image: awards1,
          description:
            "Our students secured top positions at the state-level sports meet.",
          date: "10 Feb 2025",
          path:"/images"
        },
        {
          id: 6,
          title: "Olympiad Success Story",
          image: awards3,
          description:
            "Students achieved excellence in national-level Olympiads.",
          date: "18 Feb 2025",
          path:"/images"
        },
      ],
    },

    {
      id: "activities",
      title: "Activities",
      blogs: [
        {
          id: 7,
          title: "Tree Plantation Drive",
          image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
          description:
            "Students actively participated in an eco-friendly initiative.",
          date: "05 Mar 2025",
          path:"/images"
        },
        {
          id: 8,
          title: "Art & Craft Workshop",
          image: rakhi3,
          description:
            "Creativity flourished during the art and craft workshop.",
          date: "12 Mar 2025",
          path:"/images"
        },
      ],
    },
  ],
};

export default blogData;
