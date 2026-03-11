import React from "react";
import StudentJourney from "./StudentJourney";
import InfoSection from "./InfoSection";
import QuickLinks from "./QuickLinks";
import OurAchievements from "./OurAchievements";
import VppStudentJourney from "./VppStudentJourney";
import VppSchoolTour from "./VppSchoolTour";
import VppLatestNews from "./VppLatestNews";
import HeroSection from "./Herosection";
import Inquiry from "./Inquiry";
import AboutHero from "./AboutHero";

// Color scheme configuration
const colorScheme = {
  primary: {
    light: "#f5f3ff",
    medium: "#ede9fe",
    dark: "#4c1d95",
  },
  secondary: {
    light: "#fef7ff",
    medium: "#f3e8ff",
  },
  accent: {
    light: "#e0e7ff",
    medium: "#a78bfa",
    dark: "#7c3aed",
  },
};

function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-gradient-to-br from-purple-400/10 to-blue-400/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-gradient-to-br from-indigo-400/10 to-purple-400/5 rounded-full blur-3xl"></div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #7c3aed 1px, transparent 1px),
              linear-gradient(to bottom, #7c3aed 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      {/* Hero Section - Deep gradient */}
      <section className="relative z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#1e1b4b] to-[#312e81]"></div>
        <HeroSection />
      </section>
      <section>
        <AboutHero />
      </section>
      {/* Student Journey - Light gradient */}
      <section className="relative z-10">
        <StudentJourney />
      </section>

      {/* Info Section - Purple tint gradient */}
      <section className="relative z-10">
        <InfoSection />
      </section>

      {/* Inquiry Form - Light lavender gradient */}
      <section className="relative z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#fef7ff] via-[#f3e8ff] to-[#e9d5ff]"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white/30 to-transparent"></div>
        </div>
        <Inquiry />
      </section>

      {/* Quick Links - Light blue gradient */}
      <section className="relative z-10">
  {/* Background Gradient */}
  <div className="absolute inset-0 bg-gradient-to-b from-navy-50 via-navy-100 to-navy-200"></div>

  {/* Top Divider Line */}
  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-navy-400 to-transparent"></div>

  <QuickLinks />
</section>



      {/* Achievements - Light purple gradient */}
      <section className="relative z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#9bc1e5] via-[#9bc1e5] to-[#4685c6]"></div>
        <OurAchievements />
      </section>

      {/* Student Journey Gallery - Dark gradient */}
      <section className="relative z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#346cac] via-[#346cac] to-[#2c578b]"></div>
        <VppStudentJourney />
      </section>

      {/* School Tour - Light gradient with pattern */}
      <section className="relative z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0]"></div>
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(#7c3aed 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
        <VppSchoolTour />
      </section>

      {/* Latest News - Gradient with subtle pattern */}
      <section className="relative z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#fef7ff] via-[#f3e8ff] to-[#ede9fe]"></div>
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(45deg, #a78bfa 1px, transparent 1px)`,
              backgroundSize: "30px 30px",
            }}
          ></div>
        </div>
        <VppLatestNews />
      </section>

      {/* Floating decorative elements */}
      <div className="hidden lg:block pointer-events-none">
        <div className="fixed left-20 top-[25%] w-4 h-4 rounded-full bg-gradient-to-br from-purple-400/30 to-blue-400/20 animate-pulse shadow-lg"></div>
        <div className="fixed right-32 top-[40%] w-6 h-6 rounded-full bg-gradient-to-br from-blue-400/30 to-purple-400/20 animate-pulse delay-300 shadow-lg"></div>
        <div className="fixed left-1/3 top-[60%] w-3 h-3 rounded-full bg-gradient-to-br from-indigo-400/30 to-purple-400/20 animate-pulse delay-700 shadow-lg"></div>
        <div className="fixed right-1/4 top-[75%] w-5 h-5 rounded-full bg-gradient-to-br from-purple-400/30 to-pink-400/20 animate-pulse delay-500 shadow-lg"></div>
      </div>
    </div>
  );
}

export default Home;
