import React from "react";
import { committeeData } from "../../constant/Aboutus/CommitteeData/committeeData";
import { Download, Mail, User, Briefcase, Users, Shield } from "lucide-react";
import { motion } from "framer-motion";

const ManagementCommittee = () => {
  const handleDownload = (filePath, fileName) => {
    const link = document.createElement("a");
    link.href = filePath;
    link.download = fileName || filePath.split("/").pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden bg-gradient-to-b from-white to-navy-50/30">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-navy-100/20 to-blue-100/10 rounded-full -translate-x-24 -translate-y-24"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-tl from-blue-100/10 to-navy-100/20 rounded-full translate-x-24 translate-y-24"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ================= Header ================= */}
        <motion.div
          className="text-center mb-10 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-500"></div>
            <h1 className="font-title text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gradient-navy">
              {committeeData.hero.title}
            </h1>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-500"></div>
          </div>

          <motion.div
            className="h-1 sm:h-1.5 w-16 sm:w-20 md:w-24 gradient-navy mx-auto mb-6 sm:mb-8 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: "4rem" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          />
          
          <p className="text-gray-700 max-w-2xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl px-2 sm:px-4">
            {committeeData.hero.description}
          </p>
        </motion.div>

        {/* ================= Sections ================= */}
        <div className="space-y-8 sm:space-y-10 md:space-y-12">
          {committeeData.sections.map((section, sectionIndex) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: sectionIndex * 0.2 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-navy-100 overflow-hidden"
            >
              {/* Section Header */}
              <div className="p-5 sm:p-6 md:p-8 bg-gradient-to-r from-navy-50 to-blue-50 border-b border-navy-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-navy-600 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-navy-800">
                    {section.title}
                  </h2>
                </div>
                {section.description && (
                  <p className="text-gray-700 text-sm sm:text-base ml-0 sm:ml-3 pl-0 sm:pl-14">
                    {section.description}
                  </p>
                )}
              </div>

              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full divide-y divide-navy-100">
                  <thead>
                    <tr className="bg-gradient-to-r from-navy-50/50 to-blue-50/50">
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-navy-700 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>Member</span>
                        </div>
                      </th>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-navy-700 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4" />
                          <span>Designation</span>
                        </div>
                      </th>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-navy-700 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4" />
                          <span>Role</span>
                        </div>
                      </th>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-navy-700 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          <span>Contact</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-navy-100">
                    {section.members.map((member, memberIndex) => (
                      <tr
                        key={member.id}
                        className={`hover:bg-navy-50/30 transition-colors duration-200 ${
                          memberIndex % 2 === 0 ? "bg-white" : "bg-navy-50/10"
                        }`}
                      >
                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                          <div className="text-sm sm:text-base font-medium text-navy-900">
                            {member.name}
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                          <div className="text-sm sm:text-base text-navy-700 font-medium">
                            {member.designation}
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4">
                          <div className="text-sm sm:text-base text-navy-600">
                            {member.role}
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                          <a
                            href={`mailto:${member.contact}`}
                            className="text-sm sm:text-base text-navy-600 hover:text-navy-800 hover:underline transition-colors duration-200"
                          >
                            {member.contact}
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden">
                <div className="p-4 sm:p-5 space-y-4">
                  {section.members.map((member) => (
                    <div
                      key={member.id}
                      className="bg-gradient-to-br from-white to-navy-50/30 rounded-xl p-4 border border-navy-100 shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-base sm:text-lg font-semibold text-navy-900">
                            {member.name}
                          </h4>
                          <p className="text-sm sm:text-base text-navy-700 font-medium mt-1">
                            {member.designation}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-navy-600 mb-1">
                          <Shield className="h-3 w-3" />
                          <span className="font-medium">Role:</span>
                        </div>
                        <p className="text-sm sm:text-base text-navy-600 pl-5">
                          {member.role}
                        </p>
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-navy-600 mb-1">
                          <Mail className="h-3 w-3" />
                          <span className="font-medium">Contact:</span>
                        </div>
                        <a
                          href={`mailto:${member.contact}`}
                          className="text-sm sm:text-base text-navy-600 hover:text-navy-800 hover:underline transition-colors duration-200 pl-5 block"
                        >
                          {member.contact}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ================= Bottom decorative element ================= */}
        <motion.div
          className="flex justify-center mt-10 sm:mt-12 md:mt-16"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4 text-navy-600">
            <div className="w-8 h-px sm:w-12 md:w-16 bg-gradient-to-r from-transparent via-navy-400 to-transparent"></div>
            <span className="text-xs sm:text-sm font-medium">Governance & Leadership</span>
            <div className="w-8 h-px sm:w-12 md:w-16 bg-gradient-to-r from-transparent via-navy-400 to-transparent"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ManagementCommittee;