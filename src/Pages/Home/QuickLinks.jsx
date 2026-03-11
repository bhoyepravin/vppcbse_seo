import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { quicklinksData } from "../../constant/Home/quicklinksData";
import { ArrowUpRight, Sparkles } from "lucide-react";

function QuickLinks() {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden">
      {/* Background decorative elements - responsive sizes */}
      <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full -translate-x-24 -translate-y-24 sm:-translate-x-32 sm:-translate-y-32 md:-translate-x-40 md:-translate-y-40 lg:-translate-x-48 lg:-translate-y-48"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-to-tl from-purple-500/5 to-blue-500/5 rounded-full translate-x-24 translate-y-24 sm:translate-x-32 sm:translate-y-32 md:translate-x-40 md:translate-y-40 lg:translate-x-48 lg:translate-y-48"></div>

      {/* Floating icons - responsive sizes */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-md sm:rounded-lg"
            style={{
              left: `${15 + i * 15}%`,
              top: `${30 + i * 10}%`,
              transform: `rotate(${i * 15}deg)`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header - responsive typography */}
        <motion.div
          className="text-center mb-10 sm:mb-12 md:mb-14 lg:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-500"></div>
            <h2 className="font-title text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gradient-navy">
              {quicklinksData.title}
            </h2>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-500"></div>
          </div>

          <motion.div
            className="h-1 sm:h-1.5 w-16 sm:w-20 md:w-24 gradient-navy mx-auto mb-6 sm:mb-7 md:mb-8 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: "4rem" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          />
          <p className="text-gray-700 max-w-2xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl px-2 sm:px-4">
            Quick access to essential resources and information for students and
            parents.
          </p>
        </motion.div>

        {/* Cards Grid - responsive columns */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {quicklinksData.items.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40, rotateX: 90 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="h-full"
              >
                <Link
                  to={item.link}
                  className="group relative bg-gradient-to-br from-white to-white/90 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-7 lg:p-8 flex flex-col items-center text-center shadow-lg sm:shadow-xl hover:shadow-2xl lg:hover:shadow-3xl transition-all duration-500 h-full backdrop-blur-sm border border-white/50"
                >
                  {/* Corner accent - responsive positioning */}
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-navy-500" />
                  </div>

                  {/* Icon container with glow - responsive sizes */}
                  <div className="relative mb-4 sm:mb-5 md:mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-lg sm:blur-xl group-hover:blur-2xl transition-all duration-500 rounded-xl sm:rounded-2xl"></div>
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center rounded-lg sm:rounded-xl md:rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 text-navy-600 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-500 group-hover:scale-110">
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10" />
                    </div>
                    {/* Pulse animation */}
                    <div className="absolute inset-0 rounded-lg sm:rounded-xl md:rounded-2xl border border-blue-400/0 group-hover:border-blue-400/30 transition-all duration-500 group-hover:animate-pulse"></div>
                  </div>

                  {/* Title with gradient effect - responsive typography */}
                  <p className="relative text-sm sm:text-base md:text-lg font-semibold text-gray-800 transition-all duration-500">
                    {item.title}
                  </p>

                  {/* Hover underline - responsive positioning */}
                  <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 w-8 sm:w-10 md:w-12 h-0.5 bg-gradient-to-r gradient-navy rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* View All Button - responsive padding and typography */}
        <motion.div
          className="flex justify-center mt-10 sm:mt-12 md:mt-14 lg:mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link
            to="/curriculum"
            className="group px-6 py-3 sm:px-8 sm:py-3.5 md:px-10 md:py-4 gradient-navy text-white rounded-lg sm:rounded-xl font-semibold transition-all duration-300 shadow-lg sm:shadow-xl hover:shadow-2xl lg:hover:shadow-3xl hover:-translate-y-1 transform flex items-center gap-2 sm:gap-3 text-sm sm:text-base"
          >
            <span>Browse All Resources</span>
            <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default QuickLinks;