import { motion } from "framer-motion";
import { infoSectionData } from "../../constant/Home/infoSectionData";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

function InfoSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden bg-gradient-to-b from-white to-navy-50">
      {/* Background decorative elements - responsive sizes */}
      <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-gradient-to-br from-navy-100/20 to-blue-100/10 rounded-full -translate-x-24 -translate-y-24 sm:-translate-x-32 sm:-translate-y-32 md:-translate-x-48 md:-translate-y-48"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-gradient-to-tl from-blue-100/10 to-navy-100/20 rounded-full translate-x-24 translate-y-24 sm:translate-x-32 sm:translate-y-32 md:translate-x-48 md:translate-y-48"></div>

      {/* Animated grid pattern - responsive spacing */}
      <div className="absolute inset-0 opacity-3 md:opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #0075c4 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header - responsive typography */}
        <motion.div
          className="text-center mb-10 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-400"></div>
            <h2 className="font-title text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gradient-navy">
              {infoSectionData.title}
            </h2>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-400"></div>
          </div>

          <motion.div
            className="h-1 sm:h-1.5 w-16 sm:w-20 md:w-24 gradient-navy mx-auto mb-6 sm:mb-8 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: "4rem" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          />
          <p className="text-navy-700 max-w-2xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl px-2 sm:px-0">
            Quick access to important information and resources for students,
            parents, and staff.
          </p>
        </motion.div>

        {/* Cards Grid - responsive columns */}
        <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          {infoSectionData.items.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ scale: [1, 1.02, 1.05], y: -5 }}
                className="h-full"
              >
                <Link
                  to={item.link}
                  className="group relative bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 flex flex-col items-center text-center shadow-md sm:shadow-lg hover:shadow-xl transition-all duration-500 h-full border border-navy-100 hover:border-navy-200"
                >
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-navy-500/5 to-blue-500/5 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Icon container - responsive sizes */}
                  <div className="relative mb-4 sm:mb-5 md:mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-navy-400/20 to-blue-400/20 blur-lg sm:blur-xl group-hover:blur-2xl transition-all duration-500 rounded-xl sm:rounded-2xl"></div>
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center rounded-lg sm:rounded-xl md:rounded-2xl bg-gradient-to-br from-navy-50 to-blue-50 text-navy-600 group-hover:from-navy-100 group-hover:to-blue-100 transition-all duration-500">
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10" />
                    </div>
                    <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 gradient-navy rounded-full flex items-center justify-center">
                      <Sparkles className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 text-white" />
                    </div>
                  </div>

                  {/* Title - responsive typography */}
                  <p className="relative text-sm sm:text-base md:text-lg font-semibold text-navy-800 group-hover:text-gradient-navy transition-all duration-500 mb-1 sm:mb-2">
                    {item.title}
                  </p>

                  {/* Subtitle/Description if exists */}
                  {item.description && (
                    <p className="text-xs sm:text-sm text-navy-600/70 mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  )}

                  {/* Hover indicator */}
                  <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-1/2 transform -translate-x-1/2 w-6 h-0.5 sm:w-8 sm:h-1 bg-gradient-to-r from-navy-400 to-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Decorative bottom element - responsive */}
        <motion.div
          className="flex justify-center mt-10 sm:mt-12 md:mt-16"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 sm:gap-4 text-navy-600">
            <div className="w-8 h-px sm:w-12 md:w-16 bg-gradient-to-r from-transparent via-navy-400 to-transparent"></div>
            <span className="text-xs sm:text-sm font-medium">Essential Resources</span>
            <div className="w-8 h-px sm:w-12 md:w-16 bg-gradient-to-r from-transparent via-navy-400 to-transparent"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default InfoSection;