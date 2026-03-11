const videosData = {
  categories: [
    {
      id: "school-events",
      title: "School Events",
      icon: "🎓",
      description: "Major school events and celebrations",
      subcategories: [
        {
          id: "annual-day",
          title: "Annual Day",
          icon: "🎭",
          items: [
            {
              id: 1,
              title: "Annual Day 2023 - Cultural Performances",
              videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
              thumbnail:
                "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop",
              alt: "Annual day cultural performance",
              date: "2023-12-20",
              description:
                "Full coverage of our Annual Day celebrations with student performances",
              duration: "45:20",
              views: "1.2K",
            },
            {
              id: 2,
              title: "Prize Distribution Ceremony",
              videoUrl: "https://www.youtube.com/embed/tgbNymZ7vqY",
              thumbnail:
                "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop",
              alt: "Prize distribution",
              date: "2023-12-20",
              description:
                "Award ceremony for outstanding student achievements",
              duration: "25:15",
              views: "890",
            },
          ],
        },
        {
          id: "sports-day",
          title: "Sports Day",
          icon: "🏅",
          items: [
            {
              id: 3,
              title: "Sports Day 2023 - Highlights",
              videoUrl: "https://www.youtube.com/embed/9bZkp7q19f0",
              thumbnail:
                "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&auto=format&fit=crop",
              alt: "Sports day highlights",
              date: "2023-11-15",
              description:
                "Best moments from our annual sports day competitions",
              duration: "32:45",
              views: "1.5K",
            },
          ],
        },
      ],
    },
    {
      id: "academic",
      title: "Academic Activities",
      icon: "📚",
      description: "Classroom activities and learning sessions",
      subcategories: [
        {
          id: "science-fair",
          title: "Science Fair",
          icon: "🔬",
          items: [
            {
              id: 4,
              title: "Science Fair 2023 - Project Presentations",
              videoUrl: "https://www.youtube.com/embed/LDU_Txk06tM",
              thumbnail:
                "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop",
              alt: "Science fair projects",
              date: "2023-10-25",
              description: "Student science projects and innovations",
              duration: "38:10",
              views: "1.1K",
            },
          ],
        },
      ],
    },
    {
      id: "extra-curricular",
      title: "Extra Curricular",
      icon: "🎨",
      description: "Music, dance, art and other activities",
      subcategories: [
        {
          id: "music-concert",
          title: "Music Concert",
          icon: "🎵",
          items: [
            {
              id: 5,
              title: "Annual Music Concert 2023",
              videoUrl: "https://www.youtube.com/embed/0KSOMA3QBU0",
              thumbnail:
                "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&auto=format&fit=crop",
              alt: "Music concert",
              date: "2023-09-30",
              description: "School band and choir performances",
              duration: "52:30",
              views: "2.3K",
            },
          ],
        },
        {
          id: "dance-performance",
          title: "Dance Performance",
          icon: "💃",
          items: [
            {
              id: 6,
              title: "Traditional Dance Performance",
              videoUrl: "https://www.youtube.com/embed/VBlFHuCzPgY",
              thumbnail:
                "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop",
              alt: "Dance performance",
              date: "2023-08-15",
              description:
                "Traditional dance performances for Independence Day",
              duration: "28:45",
              views: "1.8K",
            },
          ],
        },
      ],
    },
    {
      id: "sports-videos",
      title: "Sports Videos",
      icon: "⚽",
      description: "Game highlights and sports events",
      subcategories: [
        {
          id: "cricket-matches",
          title: "Cricket Matches",
          icon: "🏏",
          items: [
            {
              id: 7,
              title: "Inter-School Cricket Finals 2023",
              videoUrl: "https://www.youtube.com/embed/2Z4m4lnjxkY",
              thumbnail:
                "https://images.unsplash.com/photo-1593351415075-3bac9f45c877?w=800&auto=format&fit=crop",
              alt: "Cricket match",
              date: "2023-11-10",
              description: "Full match coverage of cricket finals",
              duration: "1:15:20",
              views: "3.2K",
            },
          ],
        },
        {
          id: "football-tournament",
          title: "Football Tournament",
          icon: "🥅",
          items: [
            {
              id: 8,
              title: "Football Championship Highlights",
              videoUrl: "https://www.youtube.com/embed/FM7MFYoylVs",
              thumbnail:
                "https://images.unsplash.com/photo-1577223625819-68bb5c5d3d5c?w=800&auto=format&fit=crop",
              alt: "Football match",
              date: "2023-09-20",
              description:
                "Highlights from the inter-school football tournament",
              duration: "22:15",
              views: "2.1K",
            },
          ],
        },
      ],
    },
    {
      id: "student-achievements",
      title: "Student Achievements",
      icon: "🏆",
      description: "Student success stories and awards",
      subcategories: [
        {
          id: "competitions",
          title: "Competitions",
          icon: "🥇",
          items: [
            {
              id: 9,
              title: "Debate Competition Winners 2023",
              videoUrl: "https://www.youtube.com/embed/9bZkp7q19f0",
              thumbnail:
                "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&auto=format&fit=crop",
              alt: "Debate competition",
              date: "2023-10-15",
              description: "Final round of the inter-school debate competition",
              duration: "41:30",
              views: "1.4K",
            },
          ],
        },
      ],
    },
  ],
};

export default videosData;
