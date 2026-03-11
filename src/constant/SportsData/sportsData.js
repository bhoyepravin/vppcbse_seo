const sportsData = {
  categories: [
    {
      id: "cricket",
      title: "Cricket",
      icon: "🏏",
      description: "School cricket team matches and tournaments",
      subcategories: [
        {
          id: "inter-school",
          title: "Inter-School Tournaments",
          icon: "🏆",
          items: [
            {
              id: 1,
              title: "Cricket Finals 2023",
              image:
                "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&auto=format&fit=crop",
              alt: "Cricket match in progress",
              date: "2023-11-15",
              description: "Annual inter-school cricket championship finals",
              venue: "School Cricket Ground",
            },
            {
              id: 2,
              title: "Batting Practice Session",
              image:
                "https://images.unsplash.com/photo-1593351415075-3bac9f45c877?w-800&auto=format&fit=crop",
              alt: "Student practicing batting",
              date: "2023-10-20",
              description: "Regular practice session for junior team",
            },
            {
              id: 3,
              title: "Team Celebration",
              image:
                "https://images.unsplash.com/photo-1552667466-07770ae110d0?w=800&auto=format&fit=crop",
              alt: "Cricket team celebrating victory",
              date: "2023-11-16",
              description: "Celebrating tournament victory",
            },
          ],
        },
        {
          id: "practice-sessions",
          title: "Practice Sessions",
          icon: "🏏",
          items: [
            {
              id: 4,
              title: "Bowling Practice",
              image:
                "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=800&auto=format&fit=crop",
              alt: "Bowling practice session",
              date: "2023-10-10",
              description: "Focus on bowling techniques",
            },
            {
              id: 5,
              title: "Fielding Drills",
              image:
                "https://images.unsplash.com/photo-1592921870789-04563d55041c?w=800&auto=format&fit=crop",
              alt: "Fielding practice",
              date: "2023-10-12",
              description: "Fielding and catching drills",
            },
          ],
        },
      ],
    },
    {
      id: "football",
      title: "Football",
      icon: "⚽",
      description: "Football matches and training sessions",
      subcategories: [
        {
          id: "annual-tournament",
          title: "Annual Football Tournament",
          icon: "🥅",
          items: [
            {
              id: 6,
              title: "Football Championship 2023",
              image:
                "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=800&auto=format&fit=crop",
              alt: "Football match action",
              date: "2023-09-25",
              description: "Annual inter-house football competition",
              venue: "School Football Field",
            },
            {
              id: 7,
              title: "Penalty Shootout",
              image:
                "https://images.unsplash.com/photo-1577223625819-68bb5c5d3d5c?w=800&auto=format&fit=crop",
              alt: "Penalty shootout moment",
              date: "2023-09-26",
              description: "Exciting penalty shootout session",
            },
          ],
        },
        {
          id: "training",
          title: "Training Sessions",
          icon: "🏃",
          items: [
            {
              id: 8,
              title: "Morning Training",
              image:
                "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=800&auto=format&fit=crop",
              alt: "Football training session",
              date: "2023-10-05",
              description: "Early morning fitness training",
            },
          ],
        },
      ],
    },
    {
      id: "basketball",
      title: "Basketball",
      icon: "🏀",
      description: "Basketball games and practice",
      subcategories: [
        {
          id: "school-games",
          title: "School Games",
          icon: "🏆",
          items: [
            {
              id: 9,
              title: "Basketball Tournament Finals",
              image:
                "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&auto=format&fit=crop",
              alt: "Basketball match action",
              date: "2023-12-10",
              description: "Inter-class basketball championship",
              venue: "School Basketball Court",
            },
          ],
        },
      ],
    },
    {
      id: "athletics",
      title: "Athletics",
      icon: "🏃‍♂️",
      description: "Track and field events",
      subcategories: [
        {
          id: "sports-day",
          title: "Annual Sports Day",
          icon: "🎯",
          items: [
            {
              id: 10,
              title: "100m Race Finals",
              image:
                "https://images.unsplash.com/photo-1552674605-db6ffd8facb5?w=800&auto=format&fit=crop",
              alt: "Students running 100m race",
              date: "2023-12-15",
              description: "Annual sports day 100m sprint competition",
            },
            {
              id: 11,
              title: "Long Jump Event",
              image:
                "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&auto=format&fit=crop",
              alt: "Long jump competition",
              date: "2023-12-15",
              description: "Long jump competition during sports day",
            },
          ],
        },
      ],
    },
    {
      id: "badminton",
      title: "Badminton",
      icon: "🏸",
      description: "Badminton matches and practice",
      subcategories: [
        {
          id: "tournaments",
          title: "Tournaments",
          icon: "🎾",
          items: [
            {
              id: 12,
              title: "Badminton Doubles Match",
              image:
                "https://images.unsplash.com/photo-1625463710762-53778c5b7d40?w=800&auto=format&fit=crop",
              alt: "Badminton doubles match",
              date: "2023-11-05",
              description: "Doubles championship match",
            },
          ],
        },
      ],
    },
    {
      id: "swimming",
      title: "Swimming",
      icon: "🏊‍♂️",
      description: "Swimming competitions and training",
      subcategories: [
        {
          id: "swim-meet",
          title: "Swim Meet",
          icon: "🏅",
          items: [
            {
              id: 13,
              title: "Inter-School Swim Meet",
              image:
                "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&auto=format&fit=crop",
              alt: "Swimming competition",
              date: "2023-08-20",
              description: "Annual swimming competition",
            },
          ],
        },
      ],
    },
  ],
};

export default sportsData;
