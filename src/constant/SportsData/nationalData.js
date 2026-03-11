const nationalData = {
  categories: [
    {
      id: "national-competitions",
      title: "National Competitions",
      icon: "🏆",
      description: "Participation in national-level competitions and olympiads",
      subcategories: [
        {
          id: "science-olympiad",
          title: "Science Olympiad",
          icon: "🔬",
          items: [
            {
              id: 1,
              title: "National Science Olympiad Winners 2023",
              image:
                "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop",
              alt: "Science olympiad winners",
              date: "2023-11-20",
              description:
                "Our students securing top positions in the National Science Olympiad held in New Delhi",
              venue: "National Science Centre, Delhi",
              achievement: "1st Prize - Physics Category",
            },
            {
              id: 2,
              title: "Science Olympiad Preparation Camp",
              image:
                "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&auto=format&fit=crop",
              alt: "Science preparation camp",
              date: "2023-10-15",
              description:
                "Intensive training camp for national science olympiad participants",
              venue: "School Science Lab",
            },
          ],
        },
        {
          id: "math-competition",
          title: "Mathematics Competition",
          icon: "🧮",
          items: [
            {
              id: 3,
              title: "National Mathematics Championship",
              image:
                "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop",
              alt: "Math competition",
              date: "2023-09-25",
              description:
                "Students participating in the annual National Mathematics Championship",
              venue: "IIT Mumbai",
              achievement: "Team Bronze Medal",
            },
          ],
        },
      ],
    },
    {
      id: "cultural-events",
      title: "Cultural Events",
      icon: "🎭",
      description: "National-level cultural festivals and performances",
      subcategories: [
        {
          id: "youth-festival",
          title: "National Youth Festival",
          icon: "🎪",
          items: [
            {
              id: 4,
              title: "National Youth Festival 2023",
              image:
                "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop",
              alt: "Youth festival performance",
              date: "2023-01-12",
              description:
                "Traditional dance performance at the National Youth Festival",
              venue: "Pune, Maharashtra",
              achievement: "Best Traditional Dance Award",
            },
          ],
        },
        {
          id: "music-competition",
          title: "Music Competition",
          icon: "🎵",
          items: [
            {
              id: 5,
              title: "National Music Competition Finals",
              image:
                "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&auto=format&fit=crop",
              alt: "Music competition",
              date: "2023-08-30",
              description:
                "School choir performing at the National Music Competition",
              venue: "Chennai Music Academy",
            },
          ],
        },
      ],
    },
    {
      id: "sports-national",
      title: "Sports Nationals",
      icon: "⚽",
      description: "National-level sports championships and tournaments",
      subcategories: [
        {
          id: "school-games",
          title: "School Games Nationals",
          icon: "🏅",
          items: [
            {
              id: 6,
              title: "National School Games - Athletics",
              image:
                "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop",
              alt: "National school games athletics",
              date: "2023-12-05",
              description:
                "Our athletes representing the state at National School Games",
              venue: "Jawaharlal Nehru Stadium, Delhi",
              achievement: "Gold - 100m Sprint",
            },
            {
              id: 7,
              title: "National School Basketball Championship",
              image:
                "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&auto=format&fit=crop",
              alt: "Basketball championship",
              date: "2023-11-18",
              description:
                "Girls basketball team at the national championships",
              venue: "Indira Gandhi Indoor Stadium",
            },
          ],
        },
        {
          id: "cricket-nationals",
          title: "Cricket Nationals",
          icon: "🏏",
          items: [
            {
              id: 8,
              title: "National School Cricket Tournament",
              image:
                "https://images.unsplash.com/photo-1593351415075-3bac9f45c877?w=800&auto=format&fit=crop",
              alt: "National cricket tournament",
              date: "2023-10-22",
              description:
                "Cricket team participating in the National School Tournament",
              venue: "Eden Gardens, Kolkata",
            },
          ],
        },
      ],
    },
    {
      id: "leadership-programs",
      title: "Leadership Programs",
      icon: "👑",
      description: "National leadership and youth development programs",
      subcategories: [
        {
          id: "youth-parliament",
          title: "Youth Parliament",
          icon: "🏛️",
          items: [
            {
              id: 9,
              title: "National Youth Parliament 2023",
              image:
                "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop",
              alt: "Youth parliament session",
              date: "2023-07-15",
              description:
                "Students participating in the National Youth Parliament session",
              venue: "Parliament House, Delhi",
            },
          ],
        },
        {
          id: "ncc-camp",
          title: "NCC Camps",
          icon: "🪖",
          items: [
            {
              id: 10,
              title: "National NCC Camp",
              image:
                "https://images.unsplash.com/photo-1586965855110-7d7c0c8e2c3c?w=800&auto=format&fit=crop",
              alt: "NCC camp activities",
              date: "2023-06-20",
              description: "NCC cadets at the annual national camp",
              venue: "NCC Academy, Hyderabad",
            },
          ],
        },
      ],
    },
    {
      id: "educational-tours",
      title: "Educational Tours",
      icon: "🗺️",
      description: "National educational tours and field trips",
      subcategories: [
        {
          id: "historical-tours",
          title: "Historical Sites Tour",
          icon: "🏯",
          items: [
            {
              id: 11,
              title: "Educational Tour to Delhi Monuments",
              image:
                "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&auto=format&fit=crop",
              alt: "Delhi monuments tour",
              date: "2023-02-18",
              description: "Students visiting historical monuments in Delhi",
              venue: "Red Fort, Delhi",
            },
          ],
        },
        {
          id: "science-centers",
          title: "Science Centers Visit",
          icon: "🚀",
          items: [
            {
              id: 12,
              title: "Visit to ISRO Space Center",
              image:
                "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&auto=format&fit=crop",
              alt: "ISRO visit",
              date: "2023-03-10",
              description: "Students visiting ISRO Space Center in Bangalore",
              venue: "ISRO Headquarters, Bangalore",
            },
          ],
        },
      ],
    },
  ],
};

export default nationalData;
