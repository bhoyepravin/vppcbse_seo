import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Shield, Heart, Trophy, Target, 
  Users, TreePine, Flag, Lightbulb,
  HandHeart, Brain
} from "lucide-react";
import axiosInstance from "../../../services/api"; // Update this import path based on your project structure

// Map icon strings to actual components
const iconMap = {
  Shield: Shield,
  Heart: Heart,
  Trophy: Trophy,
  Target: Target,
  Brain: Brain,
  Lightbulb: Lightbulb,
  HandHeart: HandHeart,
  Users: Users,
  TreePine: TreePine,
  Flag: Flag
};

const OurValues = () => {
  const [valuesData, setValuesData] = useState({
    ourValues: {
      id: "our-values-section",
      header: {
        title: "Our Values",
        description: "Core principles that guide our educational journey and community culture",
        decorations: {
          dots: [
            { color: "bg-navy-500" },
            { color: "bg-navy-500" }
          ]
        }
      },
      values: [
        {
          id: 1,
          title: "INTEGRITY",
          description: "Upholding honesty and strong moral principles in every action.",
          icon: "Shield",
          color: "from-blue-500 to-blue-700"
        },
        {
          id: 2,
          title: "RESPECT",
          description: "Valuing diversity, empathy, and mutual understanding.",
          icon: "Heart",
          color: "from-pink-500 to-pink-700"
        },
        {
          id: 3,
          title: "EXCELLENCE",
          description: "Striving for continuous improvement and high standards.",
          icon: "Trophy",
          color: "from-yellow-500 to-yellow-700"
        },
        {
          id: 4,
          title: "RESPONSIBILITY",
          description: "Taking ownership of actions and contributing positively to the community.",
          icon: "Target",
          color: "from-green-500 to-green-700"
        },
        {
          id: 5,
          title: "DISCIPLINE",
          description: "Maintaining consistency, focus, and self-control.",
          icon: "Brain",
          color: "from-purple-500 to-purple-700"
        },
        {
          id: 6,
          title: "INNOVATION",
          description: "Encouraging creativity, problem-solving, and adaptability.",
          icon: "Lightbulb",
          color: "from-orange-500 to-orange-700"
        },
        {
          id: 7,
          title: "COMPASSION",
          description: "Caring for others and promoting kindness and service.",
          icon: "HandHeart",
          color: "from-red-500 to-red-700"
        },
        {
          id: 8,
          title: "TEAMWORK",
          description: "Building cooperation and collaboration among all stakeholders.",
          icon: "Users",
          color: "from-cyan-500 to-cyan-700"
        },
        {
          id: 9,
          title: "ENVIRONMENTAL AWARENESS",
          description: "Promoting sustainable practices and respect for nature.",
          icon: "TreePine",
          color: "from-emerald-500 to-emerald-700"
        },
        {
          id: 10,
          title: "PATRIOTISM",
          description: "Instilling pride in the nation's heritage and commitment to its progress.",
          icon: "Flag",
          color: "from-rose-500 to-rose-700"
        }
      ],
      footer: {
        text: "Guiding Principles",
        decorations: {
          lineColor: "from-transparent via-navy-400 to-transparent"
        }
      }
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOurValues();
  }, []);

  const fetchOurValues = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/our-values');
      
      if (response.data.success) {
        const apiData = response.data.data;
        
        // Process the API data
        const processedData = {
          ourValues: {
            id: apiData.ourValues?.id || "our-values-section",
            header: {
              title: apiData.ourValues?.header?.title || "Our Values",
              description: apiData.ourValues?.header?.description || "Core principles that guide our educational journey and community culture",
              decorations: {
                dots: apiData.ourValues?.header?.decorations?.dots || [
                  { color: "bg-navy-500" },
                  { color: "bg-navy-500" }
                ]
              }
            },
            values: apiData.ourValues?.values?.length > 0 
              ? apiData.ourValues.values 
              : [
                  {
                    id: 1,
                    title: "INTEGRITY",
                    description: "Upholding honesty and strong moral principles in every action.",
                    icon: "Shield",
                    color: "from-blue-500 to-blue-700"
                  },
                  {
                    id: 2,
                    title: "RESPECT",
                    description: "Valuing diversity, empathy, and mutual understanding.",
                    icon: "Heart",
                    color: "from-pink-500 to-pink-700"
                  },
                  {
                    id: 3,
                    title: "EXCELLENCE",
                    description: "Striving for continuous improvement and high standards.",
                    icon: "Trophy",
                    color: "from-yellow-500 to-yellow-700"
                  },
                  {
                    id: 4,
                    title: "RESPONSIBILITY",
                    description: "Taking ownership of actions and contributing positively to the community.",
                    icon: "Target",
                    color: "from-green-500 to-green-700"
                  },
                  {
                    id: 5,
                    title: "DISCIPLINE",
                    description: "Maintaining consistency, focus, and self-control.",
                    icon: "Brain",
                    color: "from-purple-500 to-purple-700"
                  },
                  {
                    id: 6,
                    title: "INNOVATION",
                    description: "Encouraging creativity, problem-solving, and adaptability.",
                    icon: "Lightbulb",
                    color: "from-orange-500 to-orange-700"
                  },
                  {
                    id: 7,
                    title: "COMPASSION",
                    description: "Caring for others and promoting kindness and service.",
                    icon: "HandHeart",
                    color: "from-red-500 to-red-700"
                  },
                  {
                    id: 8,
                    title: "TEAMWORK",
                    description: "Building cooperation and collaboration among all stakeholders.",
                    icon: "Users",
                    color: "from-cyan-500 to-cyan-700"
                  },
                  {
                    id: 9,
                    title: "ENVIRONMENTAL AWARENESS",
                    description: "Promoting sustainable practices and respect for nature.",
                    icon: "TreePine",
                    color: "from-emerald-500 to-emerald-700"
                  },
                  {
                    id: 10,
                    title: "PATRIOTISM",
                    description: "Instilling pride in the nation's heritage and commitment to its progress.",
                    icon: "Flag",
                    color: "from-rose-500 to-rose-700"
                  }
                ],
            footer: {
              text: apiData.ourValues?.footer?.text || "Guiding Principles",
              decorations: {
                lineColor: apiData.ourValues?.footer?.decorations?.lineColor || "from-transparent via-navy-400 to-transparent"
              }
            }
          }
        };
        
        setValuesData(processedData);
        setError(null);
      }
    } catch (err) {
      console.error('Error fetching our values:', err);
      setError('Failed to load our values');
    } finally {
      setLoading(false);
    }
  };

  const { header, values, footer } = valuesData.ourValues;

  // Loading state
  if (loading) {
    return (
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden bg-gradient-to-b from-white to-navy-50/30 min-h-[400px] flex items-center justify-center">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-navy-100/20 to-blue-100/10 rounded-full -translate-x-24 -translate-y-24"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-tl from-blue-100/10 to-navy-100/20 rounded-full translate-x-24 translate-y-24"></div>
        
        <div className="text-center relative z-10">
          <div className="w-16 h-16 border-4 border-navy-200 border-t-navy-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading our values...</p>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden bg-gradient-to-b from-white to-navy-50/30 min-h-[400px] flex items-center justify-center">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-navy-100/20 to-blue-100/10 rounded-full -translate-x-24 -translate-y-24"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-tl from-blue-100/10 to-navy-100/20 rounded-full translate-x-24 translate-y-24"></div>
        
        <div className="text-center relative z-10">
          <p className="text-red-600 text-xl mb-4">⚠️ {error}</p>
          <button 
            onClick={fetchOurValues}
            className="px-6 py-2 gradient-navy text-white rounded-lg hover:opacity-90 transition-colors"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden bg-gradient-to-b from-white to-navy-50/30">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-navy-100/20 to-blue-100/10 rounded-full -translate-x-24 -translate-y-24"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-tl from-blue-100/10 to-navy-100/20 rounded-full translate-x-24 translate-y-24"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <motion.div
          className="text-center mb-10 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${header?.decorations?.dots?.[0]?.color || 'bg-navy-500'}`}></div>
            <h2 className="font-title text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gradient-navy">
              {header?.title || "Our Values"}
            </h2>
            <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${header?.decorations?.dots?.[1]?.color || 'bg-navy-500'}`}></div>
          </div>
          
          <motion.div
            className="h-1 sm:h-1.5 w-16 sm:w-20 md:w-24 gradient-navy mx-auto mb-6 sm:mb-8 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: "4rem" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          />
          <p className="text-gray-700 max-w-2xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl px-2 sm:px-4">
            {header?.description || "Core principles that guide our educational journey and community culture"}
          </p>
        </motion.div>

        {/* Values Grid - Responsive */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 md:gap-6">
          {values.map((item, index) => {
            // Get the icon component from the map, fallback to Shield if not found
            const Icon = iconMap[item.icon] || Shield;
            
            return (
              <motion.div
                key={item.id || index}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-lg hover:shadow-xl transition-all duration-500 border border-navy-100 group cursor-pointer z-10"
              >
                {/* Icon with gradient */}
                <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 bg-gradient-to-br ${item.color} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-500`}>
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                </div>

                {/* Title - Responsive typography */}
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-navy-800 mb-2 text-center leading-tight group-hover:text-gradient-navy transition-all duration-300">
                  {item.title}
                </h3>

                {/* Description - Hidden on small screens, shown on hover */}
                <div className="relative">
                  <p className="text-gray-600 text-xs sm:text-sm text-center leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 absolute top-0 left-0 right-0 bg-white/90 backdrop-blur-sm p-2 sm:p-3 rounded-lg shadow-lg -z-10 group-hover:z-30">
                    {item.description}
                  </p>
                  
                  {/* Mobile touch-friendly description */}
                  <div className="block sm:hidden mt-2">
                    <p className="text-gray-600 text-xs text-center leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Decorative bottom element */}
        <motion.div
          className="flex justify-center mt-10 sm:mt-12 md:mt-16"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4 text-navy-600">
            <div className={`w-8 h-px sm:w-12 md:w-16 bg-gradient-to-r ${footer?.decorations?.lineColor || 'from-transparent via-navy-400 to-transparent'}`}></div>
            <span className="text-xs sm:text-sm font-medium">{footer?.text || "Guiding Principles"}</span>
            <div className={`w-8 h-px sm:w-12 md:w-16 bg-gradient-to-r ${footer?.decorations?.lineColor || 'from-transparent via-navy-400 to-transparent'}`}></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OurValues;