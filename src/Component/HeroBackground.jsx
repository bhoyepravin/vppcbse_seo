// components/HeroBackground.jsx
import React from "react";
import { heroImg } from "../assets";

const HeroBackground = () => {
  return (
    <div className="absolute inset-0 -z-20 overflow-hidden">
      <img
        src={heroImg}
        alt="Hero background"
        className="absolute top-0 left-0 w-full h-full object-cover"
        loading="eager" // Loads immediately for hero section
      />
      {/* Light overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-transparent"></div>
    </div>
  );
};

export default HeroBackground;
