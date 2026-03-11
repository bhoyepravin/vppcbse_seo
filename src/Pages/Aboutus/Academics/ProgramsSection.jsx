import React from "react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  Brain, 
  ChevronRight, 
  ChevronLeft,
  BookOpen, 
  Palette, 
  Star, 
  Sparkles,
  Cloud,
  Sun,
  Moon,
  Heart,
  Target,
  Users,
  Award,
  BarChart3,
  Music,
  Activity,
  Globe,
  Calculator,
  Languages,
  Atom,
  GraduationCap,
  Paintbrush,
  Gamepad2,
  Apple,
  TreePine,
  Bird,
  Fish,
  Rabbit,
  Turtle,
  Flower2,
  Cat,
  Dog,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const OurPrograms = () => {
  const navigate = useNavigate();
  const [activeProgram, setActiveProgram] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const programs = [
    {
      id: 1,
      title: "Playgroup",
      age: "Age 2 - 3 years",
      color: "from-pink-500 to-purple-600",
      icon: <Sparkles className="h-6 w-6 sm:h-8 sm:w-8" />,
      description: "First steps into the world of learning with sensory play and basic social interaction",
      activities: ["Sensory Play", "Basic Shapes", "Music Time", "Story Circle"],
      features: ["Safe Environment", "Social Skills", "Motor Development", "Creative Expression"]
    },
    {
      id: 2,
      title: "Nursery",
      age: "Age 3 - 4 years",
      color: "from-blue-500 to-teal-600",
      icon: <BookOpen className="h-6 w-6 sm:h-8 sm:w-8" />,
      description: "Building foundational skills through play-based learning and creative activities",
      activities: ["Alphabet Fun", "Number Games", "Creative Art", "Rhyme Time"],
      features: ["Language Development", "Cognitive Skills", "Art & Craft", "Group Activities"]
    },
    {
      id: 3,
      title: "Junior Kindergarten",
      age: "Age 4 - 5 years",
      color: "from-green-500 to-emerald-600",
      icon: <Palette className="h-6 w-6 sm:h-8 sm:w-8" />,
      description: "Developing cognitive abilities and social skills through structured learning",
      activities: ["Reading Basics", "Math Concepts", "Science Fun", "Team Projects"],
      features: ["Reading Readiness", "Math Foundations", "Science Exploration", "Social Awareness"]
    },
    {
      id: 4,
      title: "Senior Kindergarten",
      age: "Age 5 - 6 years",
      color: "from-orange-500 to-red-600",
      icon: <Star className="h-6 w-6 sm:h-8 sm:w-8" />,
      description: "Preparing for formal schooling with advanced concepts and independent learning",
      activities: ["Reading Fluency", "Basic Math Operations", "Science Experiments", "Problem Solving"],
      features: ["Advanced Reading", "Math Operations", "Scientific Thinking", "Critical Analysis"]
    },
  ];

  const tourImages = [
    { id: 1, src: "/images/classroom.jpg", title: "Smart Classrooms", icon: "🏫" },
    { id: 2, src: "/images/playground.jpg", title: "Play Area", icon: "⚽" },
    { id: 3, src: "/images/library.jpg", title: "Digital Library", icon: "📚" },
    { id: 4, src: "/images/lab.jpg", title: "Science Lab", icon: "🔬" },
    { id: 5, src: "/images/art-room.jpg", title: "Art Studio", icon: "🎨" },
    { id: 6, src: "/images/music-room.jpg", title: "Music Room", icon: "🎵" },
  ];

  const nextSlide = () => {
    setCurrentImageIndex((prev) => (prev + 1) % tourImages.length);
  };

  const prevSlide = () => {
    setCurrentImageIndex((prev) => (prev - 1 + tourImages.length) % tourImages.length);
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  // Auto slide for mobile
  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(() => {
        nextSlide();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [currentImageIndex, isMobile]);

  // Program Card Component
  const ProgramCard = ({ program, index, isMobileView = false }) => {
    if (isMobileView) {
      // Mobile compact card
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
          className="bg-white/95 backdrop-blur-sm rounded-xl shadow-md border border-navy-100 p-3 mx-1"
        >
          <div className="flex items-start gap-2 mb-2">
            <div className="relative flex-shrink-0">
              <div className={`p-2 rounded-lg text-white shadow-sm bg-gradient-to-br ${program.color}`}>
                {React.cloneElement(program.icon, { className: "h-4 w-4" })}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-navy-800 truncate pr-1">
                  {program.title}
                </h3>
                <span className="text-xs text-navy-400 font-medium">0{index + 1}</span>
              </div>
              <p className="text-xs text-gray-600 line-clamp-1 mt-0.5">{program.description}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-1 mb-2">
            {program.activities.slice(0, 2).map((activity, idx) => (
              <span
                key={idx}
                className="inline-block px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-[10px] font-medium border border-gray-200"
              >
                {activity}
              </span>
            ))}
            <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-[10px] font-medium border border-gray-200">
              +{program.activities.length - 2} more
            </span>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-navy-100">
            <span className="text-[10px] text-gray-500">{program.age}</span>
            <div className="flex gap-1">
              {program.features.slice(0, 2).map((feature, idx) => (
                <span key={idx} className="text-[10px] text-navy-600 bg-navy-50 px-1.5 py-0.5 rounded">
                  {feature.split(' ')[0]}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      );
    }

    // Desktop/Tablet card - EXACTLY as your original code
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        viewport={{ once: true }}
        onClick={() => setActiveProgram(index)}
        className={`group bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-navy-100 p-4 sm:p-6 md:p-8 hover:-translate-y-1 h-full cursor-pointer ${
          activeProgram === index ? 'ring-2 ring-navy-300' : ''
        }`}
      >
        <div className="flex items-start justify-between mb-4 sm:mb-6">
          <div className="relative">
            <div className={`p-3 sm:p-4 rounded-lg sm:rounded-xl text-white shadow-lg transition-transform duration-300 group-hover:scale-110 bg-gradient-to-br ${program.color}`}>
              {program.icon}
            </div>
            {/* Doodle decoration */}
            <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
              <Star className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white" />
            </div>
          </div>
          <div className="text-lg sm:text-xl md:text-2xl text-navy-300 font-bold">0{index + 1}</div>
        </div>

        <h3 className="text-base sm:text-lg md:text-xl font-bold text-navy-800 mb-3 sm:mb-4 group-hover:text-navy-700 transition-colors duration-300">
          {program.title}
        </h3>

        <div className="flex items-center gap-1 sm:gap-1.5 mb-3 sm:mb-4">
          <div className="h-1 w-6 sm:w-8 bg-navy-500 rounded-full"></div>
          <div className="h-1 w-3 sm:w-4 bg-blue-500 rounded-full"></div>
          <div className="h-1 w-2 sm:w-2 bg-navy-400 rounded-full"></div>
        </div>

        <p className="text-gray-700 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">{program.description}</p>

        <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
          {program.activities.slice(0, 3).map((activity, idx) => (
            <span
              key={idx}
              className="inline-block px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium border border-gray-200"
            >
              {activity}
            </span>
          ))}
        </div>

        {program.features && (
          <div className="pt-4 sm:pt-6 border-t border-navy-100">
            <ul className="space-y-2 sm:space-y-3">
              {program.features.slice(0, 3).map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2 sm:gap-3 text-gray-700">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-400 flex-shrink-0"></div>
                  <span className="text-xs sm:text-sm font-medium">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden bg-gradient-to-b from-white to-navy-50/30" id="programs">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-navy-100/20 to-blue-100/10 rounded-full -translate-x-24 -translate-y-24"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-tl from-blue-100/10 to-navy-100/20 rounded-full translate-x-24 translate-y-24"></div>

      {/* Creative Doodles for Kids */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating doodles - visible on all screens */}
        <div className="absolute top-10 left-5 sm:top-20 sm:left-10 opacity-20 animate-bounce">
          <Cloud className="w-8 h-8 sm:w-10 sm:h-10 text-navy-400" />
        </div>
        <div className="absolute top-20 right-8 sm:top-32 sm:right-16 opacity-20 animate-pulse">
          <Sun className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-400" />
        </div>
        <div className="absolute bottom-20 left-10 sm:bottom-32 sm:left-20 opacity-20 animate-bounce">
          <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-pink-400" />
        </div>
        <div className="absolute bottom-10 right-5 sm:bottom-20 sm:right-10 opacity-20 animate-pulse">
          <Moon className="w-8 h-8 sm:w-10 sm:h-10 text-blue-300" />
        </div>
        <div className="absolute top-1/3 left-1/4 opacity-15">
          <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-navy-300" />
        </div>
        <div className="absolute bottom-1/3 right-1/4 opacity-15">
          <Star className="w-6 h-6 sm:w-8 sm:h-8 text-navy-300" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ================= Section Header ================= */}
        <motion.div
          className="text-center mb-10 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-500"></div>
            <h2 className="font-title text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gradient-navy">
              Our Early Learning Programs
            </h2>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-500"></div>
          </div>

          <motion.div
            className="h-1 sm:h-1.5 w-16 sm:w-20 md:w-24 bg-gradient-to-r from-navy-600 via-blue-600 to-navy-600 mx-auto mb-6 sm:mb-8 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: "4rem" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          />
          
          <p className="text-gray-700 max-w-2xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl px-2 sm:px-4">
            Nurturing young minds through age-appropriate curriculum designed for optimal development
          </p>
        </motion.div>

        {/* ================= Main Content ================= */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-start">
          {/* Left Column - Introduction */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6 sm:space-y-8"
          >
            {/* Brain Development Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-navy-100 p-4 sm:p-6 md:p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <div className="p-3 sm:p-4 bg-gradient-to-br from-navy-600 to-blue-600 rounded-lg sm:rounded-xl text-white shadow-lg">
                    <Brain className="h-6 w-6 sm:h-8 sm:w-8" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                    <Star className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-navy-800">Critical Brain Development Phase</h3>
                  <p className="text-gray-600 text-sm sm:text-base">Age 2-6 Years</p>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4 text-gray-700 text-sm sm:text-base">
                <p className="leading-relaxed">
                  At <span className="font-bold text-navy-700">VPP CBSE School</span>, we provide optimal stimulation for energizing brain cells during the most critical developmental phase.
                </p>
                
                <p className="leading-relaxed">
                  Over <span className="font-bold text-navy-700">58%</span> of a child's cumulative brain development occurs before age 6, highlighting the importance of appropriate care and stimulation in early years.
                </p>
              </div>

              {/* Development Stats */}
              <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-navy-100">
                <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center">
                  {[
                    { value: "85%", label: "Brain Growth", icon: "🧠", color: "text-navy-600" },
                    { value: "90%", label: "Personality", icon: "😊", color: "text-blue-600" },
                    { value: "75%", label: "Learning", icon: "🎯", color: "text-navy-600" },
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="space-y-1 sm:space-y-2"
                    >
                      <div className="text-2xl sm:text-3xl">{stat.icon}</div>
                      <div className={`text-xl sm:text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                      <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"
            >
              {[
                { icon: "🎨", title: "Creative Expression", color: "bg-pink-50 border-pink-100" },
                { icon: "🎵", title: "Music & Rhythm", color: "bg-blue-50 border-blue-100" },
                { icon: "🧩", title: "Problem Solving", color: "bg-green-50 border-green-100" },
                { icon: "🤝", title: "Social Skills", color: "bg-yellow-50 border-yellow-100" },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className={`${feature.color} rounded-xl p-3 sm:p-4 text-center border shadow-sm hover:shadow-md transition-all duration-300`}
                >
                  <div className="text-xl sm:text-2xl mb-1 sm:mb-2">{feature.icon}</div>
                  <div className="font-semibold text-gray-800 text-xs sm:text-sm leading-tight">{feature.title}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Virtual Tour Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="space-y-4 sm:space-y-6"
            >
              {/* Info Card */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-navy-100">
                <h3 className="font-bold text-navy-800 mb-3 text-lg sm:text-xl">
                  Experience Our Campus Virtually 🎉
                </h3>
                <p className="text-gray-600 text-sm sm:text-base mb-4">
                  Take a guided tour through our facilities, classrooms, and play areas. 
                  See where your child will learn, play, and grow!
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4">
                  {[
                    { icon: "🏫", label: "Classrooms", count: "25+", color: "text-navy-600" },
                    { icon: "🎨", label: "Activity Areas", count: "15+", color: "text-blue-600" },
                    { icon: "⚽", label: "Play Zones", count: "10+", color: "text-navy-600" },
                    { icon: "🌳", label: "Green Space", count: "5 Acres", color: "text-green-600" },
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className={`text-lg sm:text-xl ${feature.color}`}>{feature.icon}</div>
                      <div>
                        <div className="font-semibold text-gray-900 text-xs sm:text-sm">
                          {feature.label}
                        </div>
                        <div className="text-xs text-gray-500">
                          {feature.count}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mobile Slider for Images */}
                <div className="md:hidden">
                  <div className="relative overflow-hidden rounded-xl">
                    {/* Slider Container */}
                    <div
                      className="flex transition-transform duration-300 ease-in-out"
                      style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                    >
                      {tourImages.map((image, index) => (
                        <div key={image.id} className="w-full flex-shrink-0">
                          <div className="relative h-48 w-full rounded-xl overflow-hidden">
                            {/* Placeholder for image */}
                            <div className="absolute inset-0 bg-gradient-to-br from-navy-100/20 to-blue-100/20 flex items-center justify-center">
                              <div className="text-4xl">{image.icon}</div>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                              <h4 className="text-white font-semibold">{image.title}</h4>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Slider Navigation */}
                    <div className="flex justify-between items-center mt-4">
                      <button
                        onClick={prevSlide}
                        className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-navy-600 to-blue-600 text-white shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>

                      {/* Dots Indicator */}
                      <div className="flex gap-1.5">
                        {tourImages.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => goToImage(index)}
                            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                              index === currentImageIndex
                                ? "bg-gradient-to-br from-navy-600 to-blue-600 w-4"
                                : "bg-navy-300"
                            }`}
                          />
                        ))}
                      </div>

                      <button
                        onClick={nextSlide}
                        className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-navy-600 to-blue-600 text-white shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Desktop Grid for Images */}
                <div className="hidden md:grid md:grid-cols-3 gap-3 mt-4">
                  {tourImages.slice(0, 3).map((image, index) => (
                    <div
                      key={image.id}
                      className="relative h-32 rounded-xl overflow-hidden cursor-pointer group"
                      onClick={() => goToImage(index)}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-navy-100/20 to-blue-100/20 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                        <div className="text-3xl">{image.icon}</div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                        <h4 className="text-white font-semibold text-sm">{image.title}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Programs */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-4 sm:space-y-6"
          >
            {/* Desktop/Tablet View - Grid (EXACTLY as original) */}
            <div className="hidden md:grid md:grid-cols-2 gap-4 sm:gap-6">
              {programs.map((program, index) => (
                <ProgramCard key={program.id} program={program} index={index} />
              ))}
            </div>

            {/* Mobile View - Compact Cards */}
            <div className="md:hidden space-y-2">
              {programs.map((program, index) => (
                <ProgramCard 
                  key={program.id} 
                  program={program} 
                  index={index} 
                  isMobileView={true} 
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* ================= Bottom CTA ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12 sm:mt-16 pt-8 border-t border-navy-100"
        >
          <p className="text-gray-600 text-sm sm:text-base mb-6">
            Ready to start your child's educational journey with us?
          </p>
          <button 
            onClick={() => navigate("/contact")}
            className="group px-6 sm:px-8 py-3 bg-gradient-to-br from-navy-600 to-blue-600 text-white rounded-lg sm:rounded-xl font-semibold hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <span className="text-sm sm:text-base">Schedule a Campus Visit</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* ================= Bottom decorative element ================= */}
        <motion.div
          className="flex justify-center mt-8 sm:mt-12"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 sm:gap-4 text-navy-600">
            <div className="w-6 h-px sm:w-8 md:w-12 bg-gradient-to-r from-transparent via-navy-400 to-transparent"></div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
              <span className="text-xs sm:text-sm font-medium">Holistic Development Approach</span>
              <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
            </div>
            <div className="w-6 h-px sm:w-8 md:w-12 bg-gradient-to-r from-transparent via-navy-400 to-transparent"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OurPrograms;

