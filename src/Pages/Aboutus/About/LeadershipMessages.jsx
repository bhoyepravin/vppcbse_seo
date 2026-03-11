import React, { useState, useEffect } from "react";
import { LEADERSHIP_MESSAGES as defaultLeadershipMessages } from "../../../constant/Aboutus/leadershipMessagesData";
import { motion } from "framer-motion";
import { Quote, Award, UserCheck, Star } from "lucide-react";
import axiosInstance from "../../../services/api"; // Update this import path based on your project structure

const LeadershipMessages = () => {
  const [leadershipData, setLeadershipData] = useState({
    leadershipMessages: {
      id: "leadership-messages-section",
      header: {
        title: defaultLeadershipMessages.header?.title || "Leadership Messages",
        description: defaultLeadershipMessages.header?.description || "Insights and guidance from our esteemed leadership team",
        decorations: {
          dots: [
            { color: "bg-navy-500" },
            { color: "bg-navy-500" }
          ]
        }
      },
      messages: defaultLeadershipMessages.messages || [],
      footer: {
        text: defaultLeadershipMessages.footer?.text || "Guiding Lights",
        decorations: {
          lineColor: defaultLeadershipMessages.footer?.decorations?.lineColor || "from-transparent via-navy-400 to-transparent"
        }
      }
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLeadershipMessages();
  }, []);

  const fetchLeadershipMessages = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/leadership-messages');
      
      if (response.data.success) {
        const apiData = response.data.data;
        
        // Process the API data
        const processedData = {
          leadershipMessages: {
            id: apiData.leadershipMessages?.id || "leadership-messages-section",
            header: {
              title: apiData.leadershipMessages?.header?.title || defaultLeadershipMessages.header?.title || "Leadership Messages",
              description: apiData.leadershipMessages?.header?.description || defaultLeadershipMessages.header?.description || "Insights and guidance from our esteemed leadership team",
              decorations: {
                dots: apiData.leadershipMessages?.header?.decorations?.dots || [
                  { color: "bg-navy-500" },
                  { color: "bg-navy-500" }
                ]
              }
            },
            messages: apiData.leadershipMessages?.messages?.length > 0 
              ? apiData.leadershipMessages.messages.map(msg => ({
                  ...msg,
                  photo: {
                    src: msg.photo?.src?.replace(/\\\//g, '/') || msg.photo?.src,
                    alt: msg.photo?.alt || msg.alt || "Leadership photo"
                  },
                  rating: msg.rating || 5
                }))
              : defaultLeadershipMessages.messages || [],
            footer: {
              text: apiData.leadershipMessages?.footer?.text || defaultLeadershipMessages.footer?.text || "Guiding Lights",
              decorations: {
                lineColor: apiData.leadershipMessages?.footer?.decorations?.lineColor || defaultLeadershipMessages.footer?.decorations?.lineColor || "from-transparent via-navy-400 to-transparent"
              }
            }
          }
        };
        
        setLeadershipData(processedData);
        setError(null);
      }
    } catch (err) {
      console.error('Error fetching leadership messages:', err);
      setError('Failed to load leadership messages');
    } finally {
      setLoading(false);
    }
  };

  const icons = [Quote, Award, UserCheck, Star];
  const { header, messages, footer } = leadershipData.leadershipMessages;

  // Loading state
  if (loading) {
    return (
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden bg-gradient-to-b from-white to-navy-50/30 min-h-[400px] flex items-center justify-center">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-navy-100/20 to-blue-100/10 rounded-full -translate-x-24 -translate-y-24"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-tl from-blue-100/10 to-navy-100/20 rounded-full translate-x-24 translate-y-24"></div>
        
        <div className="text-center relative z-10">
          <div className="w-16 h-16 border-4 border-navy-200 border-t-navy-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading leadership messages...</p>
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
            onClick={fetchLeadershipMessages}
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
        {/* Section Header */}
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
              {header?.title || "Leadership Messages"}
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
            {header?.description || "Insights and guidance from our esteemed leadership team"}
          </p>
        </motion.div>

        {/* Leadership Messages */}
        <div className="space-y-8 sm:space-y-10 md:space-y-12">
          {messages.map((item, index) => {
            const Icon = icons[index % icons.length];
            return (
              <motion.div
                key={item.id || index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-navy-100 overflow-hidden"
              >
                <div className="flex flex-col lg:flex-row">
                  
                  {/* Image Section with Stats */}
                  <div className="lg:w-2/5 xl:w-1/3 p-6 sm:p-8 flex flex-col items-center justify-center bg-gradient-to-b from-navy-50 to-blue-50">
                    <div className="relative group w-full max-w-xs sm:max-w-sm mx-auto">
                      <div className="absolute -inset-3 sm:-inset-4 rounded-xl sm:rounded-2xl blur opacity-20 sm:opacity-30 group-hover:opacity-40 transition-opacity duration-500"></div>
                      <img
                        src={item.photo?.src || item.photo}
                        alt={item.photo?.alt || item.title || "Leadership"}
                        className="relative w-48 h-56 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-full lg:h-auto rounded-xl sm:rounded-2xl shadow-lg object-cover transform transition-transform duration-700 group-hover:scale-[1.02] z-10 mx-auto"
                        onError={(e) => {
                          console.error('Image failed to load:', item.photo?.src);
                          e.target.style.backgroundColor = '#e2e8f0';
                        }}
                      />
                      
                      {/* Icon badge */}
                      <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-navy-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg z-20">
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                      </div>
                    </div>
                    
                    {/* Title & Stats - Mobile */}
                    <div className="mt-6 sm:mt-8 text-center lg:hidden">
                      <h3 className="text-xl sm:text-2xl font-bold text-navy-800 mb-1">
                        {item.title}
                      </h3>
                      <h4 className="text-lg sm:text-xl text-navy-600 font-medium">
                        {item.name}
                      </h4>
                      <div className="flex items-center justify-center gap-1 mt-2 text-yellow-500">
                        {[...Array(item.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                        ))}
                      </div>
                    </div>
                    
                    
                  </div>

                  {/* Content Section */}
                  <div className="lg:w-3/5 xl:w-2/3 p-6 sm:p-8 md:p-10 lg:p-12">
                    {/* Title & Stars - Desktop */}
                    <div className="hidden lg:block mb-6 md:mb-8">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-2xl md:text-3xl font-bold text-navy-800 mb-2">
                            {item.title}
                          </h3>
                          <h4 className="text-xl md:text-2xl text-navy-600 font-medium">
                            {item.name}
                          </h4>
                        </div>
                        <div className="flex items-center gap-1 text-yellow-500">
                          {[...Array(item.rating || 5)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 md:w-6 md:h-6 fill-current" />
                          ))}
                        </div>
                      </div>
                      <div className="w-16 md:w-20 h-1.5 gradient-navy rounded-full mt-4"></div>
                    </div>

                    {/* Message */}
                    <div className="relative">
                      <Quote className="absolute -top-2 -left-2 sm:-top-3 sm:-left-3 w-8 h-8 sm:w-10 sm:h-10 text-navy-200 opacity-50" />
                      <div className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed sm:leading-loose space-y-4 sm:space-y-6 pl-8 sm:pl-10 pr-4 sm:pr-6">
                        <p>{item.message}</p>
                      </div>
                      <Quote className="absolute bottom-0 -right-2 sm:-right-3 w-8 h-8 sm:w-10 sm:h-10 text-navy-200 opacity-50 transform rotate-180" />
                    </div>

                    {/* Signature/Footer */}
                    <div className="mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t border-navy-100">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="text-navy-700">
                          <p className="font-bold text-lg">{item.name}</p>
                          <p className="text-sm">{item.title}</p>
                          <p className="text-xs text-navy-600 mt-2">
                            {item.school || "Vidya Prabodhini Prashala"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom decorative element */}
        <motion.div
          className="flex justify-center mt-10 sm:mt-12 md:mt-16"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4 text-navy-600">
            <div className={`w-8 h-px sm:w-12 md:w-16 bg-gradient-to-r ${footer?.decorations?.lineColor || 'from-transparent via-navy-400 to-transparent'}`}></div>
            <span className="text-xs sm:text-sm font-medium">{footer?.text || "Guiding Lights"}</span>
            <div className={`w-8 h-px sm:w-12 md:w-16 bg-gradient-to-r ${footer?.decorations?.lineColor || 'from-transparent via-navy-400 to-transparent'}`}></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LeadershipMessages;


// import React from "react";
// import { LEADERSHIP_MESSAGES } from "../../../constant/Aboutus/leadershipMessagesData";
// import { motion } from "framer-motion";
// import { Quote, Award, UserCheck, Star } from "lucide-react";

// const LeadershipMessages = () => {
//   const icons = [Quote, Award, UserCheck, Star];

//   return (
//     <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden bg-gradient-to-b from-white to-navy-50/30">
//       {/* Background decorative elements */}
//       <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-navy-100/20 to-blue-100/10 rounded-full -translate-x-24 -translate-y-24"></div>
//       <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-tl from-blue-100/10 to-navy-100/20 rounded-full translate-x-24 translate-y-24"></div>

//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         {/* Section Header */}
//         <motion.div
//           className="text-center mb-10 sm:mb-12 md:mb-16"
//           initial={{ opacity: 0, y: -20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//         >
//           <div className="inline-flex items-center gap-3 mb-4">
//             <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-500"></div>
//             <h2 className="font-title text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gradient-navy">
//               Leadership Messages
//             </h2>
//             <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-500"></div>
//           </div>
          
//           <motion.div
//             className="h-1 sm:h-1.5 w-16 sm:w-20 md:w-24 gradient-navy mx-auto mb-6 sm:mb-8 rounded-full"
//             initial={{ width: 0 }}
//             whileInView={{ width: "4rem" }}
//             transition={{ duration: 0.8, delay: 0.3 }}
//             viewport={{ once: true }}
//           />
//           <p className="text-gray-700 max-w-2xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl px-2 sm:px-4">
//             Insights and guidance from our esteemed leadership team
//           </p>
//         </motion.div>

//         {/* Leadership Messages */}
//         <div className="space-y-8 sm:space-y-10 md:space-y-12">
//           {LEADERSHIP_MESSAGES.map((item, index) => {
//             const Icon = icons[index % icons.length];
//             return (
//               <motion.div
//                 key={item.id}
//                 initial={{ opacity: 0, y: 40 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: index * 0.2 }}
//                 viewport={{ once: true }}
//                 className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-navy-100 overflow-hidden"
//               >
//                 <div className="flex flex-col lg:flex-row">
                  
//                   {/* Image Section with Stats */}
//                   <div className="lg:w-2/5 xl:w-1/3 p-6 sm:p-8 flex flex-col items-center justify-center bg-gradient-to-b from-navy-50 to-blue-50">
//                     <div className="relative group w-full max-w-xs sm:max-w-sm mx-auto">
//                       <div className="absolute -inset-3 sm:-inset-4  rounded-xl sm:rounded-2xl blur opacity-20 sm:opacity-30 group-hover:opacity-40 transition-opacity duration-500"></div>
//                       <img
//                         src={item.photo}
//                         alt={item.title}
//                         className="relative w-48 h-56 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-full lg:h-auto rounded-xl sm:rounded-2xl shadow-lg object-cover transform transition-transform duration-700 group-hover:scale-[1.02] z-10 mx-auto"
//                       />
                      
//                       {/* Icon badge */}
//                       <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-navy-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg z-20">
//                         <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
//                       </div>
//                     </div>
                    
//                     {/* Title & Stats - Mobile */}
//                     <div className="mt-6 sm:mt-8 text-center lg:hidden">
//                       <h3 className="text-xl sm:text-2xl font-bold text-navy-800 mb-1">
//                         {item.title}
//                       </h3>
//                       <h4 className="text-lg sm:text-xl text-navy-600 font-medium">
//                         {item.name}
//                       </h4>
//                       <div className="flex items-center justify-center gap-1 mt-2 text-yellow-500">
//                         {[...Array(5)].map((_, i) => (
//                           <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
//                         ))}
//                       </div>
//                     </div>
                    
                    
//                   </div>

//                   {/* Content Section */}
//                   <div className="lg:w-3/5 xl:w-2/3 p-6 sm:p-8 md:p-10 lg:p-12">
//                     {/* Title & Stars - Desktop */}
//                     <div className="hidden lg:block mb-6 md:mb-8">
//                       <div className="flex items-start justify-between">
//                         <div>
//                           <h3 className="text-2xl md:text-3xl font-bold text-navy-800 mb-2">
//                             {item.title}
//                           </h3>
//                           <h4 className="text-xl md:text-2xl text-navy-600 font-medium">
//                             {item.name}
//                           </h4>
//                         </div>
//                         <div className="flex items-center gap-1 text-yellow-500">
//                           {[...Array(5)].map((_, i) => (
//                             <Star key={i} className="w-5 h-5 md:w-6 md:h-6 fill-current" />
//                           ))}
//                         </div>
//                       </div>
//                       <div className="w-16 md:w-20 h-1.5 gradient-navy rounded-full mt-4"></div>
//                     </div>

//                     {/* Message */}
//                     <div className="relative">
//                       <Quote className="absolute -top-2 -left-2 sm:-top-3 sm:-left-3 w-8 h-8 sm:w-10 sm:h-10 text-navy-200 opacity-50" />
//                       <div className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed sm:leading-loose space-y-4 sm:space-y-6 pl-8 sm:pl-10 pr-4 sm:pr-6">
//                         <p>{item.message}</p>
//                       </div>
//                       <Quote className="absolute bottom-0 -right-2 sm:-right-3 w-8 h-8 sm:w-10 sm:h-10 text-navy-200 opacity-50 transform rotate-180" />
//                     </div>

//                     {/* Signature/Footer */}
//                     <div className="mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t border-navy-100">
//                       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//                         <div className="text-navy-700">
//                           <p className="font-bold text-lg">{item.name}</p>
//                           <p className="text-sm">{item.title}</p>
//                           <p className="text-xs text-navy-600 mt-2">
//                             Vidya Prabodhini Prashala
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>

//         {/* Bottom decorative element */}
//         <motion.div
//           className="flex justify-center mt-10 sm:mt-12 md:mt-16"
//           initial={{ opacity: 0, scale: 0 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.6, delay: 0.5 }}
//           viewport={{ once: true }}
//         >
//           <div className="flex items-center gap-4 text-navy-600">
//             <div className="w-8 h-px sm:w-12 md:w-16 bg-gradient-to-r from-transparent via-navy-400 to-transparent"></div>
//             <span className="text-xs sm:text-sm font-medium">Guiding Lights</span>
//             <div className="w-8 h-px sm:w-12 md:w-16 bg-gradient-to-r from-transparent via-navy-400 to-transparent"></div>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default LeadershipMessages;