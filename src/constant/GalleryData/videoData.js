// constant/VideoData/videoData.js

import { vppvideo } from "../../assets";

const videoData = {
  title: "School Videos",
  description:
    "Explore school events, celebrations, activities, and campus life through videos.",

  videos: [
    {
      id: 1,
      title: "Annual Day Celebration",
      type: "youtube",
      youtubeId: "qPrZNlo8oF8?si",
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc1dxyzNnTQ_inQ0-rU2t8cMD5UQIvnwD_yQ&s",
    },
    {
      id: 2,
      title: "Independence Day Program",
      type: "youtube",
      youtubeId: "9bZkp7q19f",
    },
    {
      id: 3,
      title: "Sports Day Highlights",
      type: "local",
      src: vppvideo,
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr9HIw-OQTLHZdPDfg9Nq0jmpT82Wqt59Zfw&s",
    },
    {
      id: 4,
      title: "Annual Function Practice",
      type: "local",
      src: "/videos/annual-function.mp4",
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvvJUivndZ-_HxaK3w9zSMuHGvBR37ydyamg&s",
    },
  ],
};

export default videoData;
