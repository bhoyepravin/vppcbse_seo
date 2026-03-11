import React from "react";
import { teachersData } from "../../constant/Aboutus/Teachers/teachersData";
import { motion } from "framer-motion";
import { User, Book, GraduationCap, Award, Users, Briefcase } from "lucide-react";

const Teachers = () => {
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
              {teachersData.hero.title}
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
        </motion.div>

        {/* ================= About Faculty Section ================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-navy-100 mb-8 sm:mb-10 md:mb-12"
        >
          <div className="p-5 sm:p-6 md:p-8">
            <div className="flex items-start gap-3 mb-4 sm:mb-5 md:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-navy-600 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                <Book className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-navy-800">
                {teachersData.about.title}
              </h2>
            </div>
            
            <div className="pl-0 sm:pl-14">
              <p className="text-gray-700 leading-relaxed text-justify text-sm sm:text-base md:text-lg">
                {teachersData.about.content}
              </p>
            </div>
          </div>
        </motion.div>

        {/* ================= Departments Sections ================= */}
        <div className="space-y-8 sm:space-y-10 md:space-y-12">
          {teachersData.departments.map((department, sectionIndex) => (
            <motion.div
              key={department.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: sectionIndex * 0.2 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-navy-100 overflow-hidden"
            >
              {/* Department Header */}
              <div className="p-5 sm:p-6 md:p-8 bg-gradient-to-r from-navy-50 to-blue-50 border-b border-navy-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-navy-600 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-navy-800">
                      {department.title}
                    </h2>
                    {department.description && (
                      <p className="text-gray-700 text-sm sm:text-base mt-1">
                        {department.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full divide-y divide-navy-100">
                  <thead>
                    <tr className="bg-gradient-to-r from-navy-50/50 to-blue-50/50">
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-navy-700 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>Teacher</span>
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
                          <Book className="h-4 w-4" />
                          <span>Subject</span>
                        </div>
                      </th>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-navy-700 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <Award className="h-4 w-4" />
                          <span>Qualification & Experience</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-navy-100">
                    {department.teachers.map((teacher, teacherIndex) => (
                      <tr
                        key={teacher.id}
                        className={`hover:bg-navy-50/30 transition-colors duration-200 ${
                          teacherIndex % 2 === 0 ? "bg-white" : "bg-navy-50/10"
                        }`}
                      >
                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                          <div className="text-sm sm:text-base font-medium text-navy-900">
                            {teacher.name}
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                          <div className="text-sm sm:text-base text-navy-700 font-medium">
                            {teacher.designation}
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4">
                          <div className="text-sm sm:text-base text-navy-600 font-medium">
                            {teacher.subject}
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4">
                          <div className="text-sm sm:text-base text-navy-600">
                            <div className="font-medium">
                              {teacher.qualification}
                            </div>
                            <div className="text-gray-500 mt-1">
                              {teacher.experience}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden">
                <div className="p-4 sm:p-5 space-y-4">
                  {department.teachers.map((teacher) => (
                    <div
                      key={teacher.id}
                      className="bg-gradient-to-br from-white to-navy-50/30 rounded-xl p-4 border border-navy-100 shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                      <div className="mb-3">
                        <h4 className="text-base sm:text-lg font-semibold text-navy-900 mb-1">
                          {teacher.name}
                        </h4>
                        <p className="text-sm sm:text-base text-navy-700 font-medium">
                          {teacher.designation}
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <div>
                          <div className="flex items-center gap-2 text-xs sm:text-sm text-navy-600 mb-1">
                            <Book className="h-3 w-3" />
                            <span className="font-medium">Subject:</span>
                          </div>
                          <p className="text-sm sm:text-base text-navy-600 pl-5">
                            {teacher.subject}
                          </p>
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-2 text-xs sm:text-sm text-navy-600 mb-1">
                            <Award className="h-3 w-3" />
                            <span className="font-medium">Qualification:</span>
                          </div>
                          <p className="text-sm sm:text-base text-navy-600 pl-5">
                            {teacher.qualification}
                          </p>
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-2 text-xs sm:text-sm text-navy-600 mb-1">
                            <Briefcase className="h-3 w-3" />
                            <span className="font-medium">Experience:</span>
                          </div>
                          <p className="text-sm sm:text-base text-gray-500 pl-5">
                            {teacher.experience}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ================= NON-TEACHING STAFF ================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-10 sm:mt-12 md:mt-14"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-navy-100 overflow-hidden">
            {/* Non-Teaching Staff Header */}
            <div className="p-5 sm:p-6 md:p-8 bg-gradient-to-r from-navy-50 to-blue-50 border-b border-navy-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-navy-600 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-navy-800">
                  Non-Teaching Staff
                </h2>
              </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full divide-y divide-navy-100">
                <thead>
                  <tr className="bg-gradient-to-r from-navy-50/50 to-blue-50/50">
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-navy-700 uppercase">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>Name</span>
                      </div>
                    </th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-navy-700 uppercase">
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4" />
                        <span>Designation</span>
                      </div>
                    </th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-navy-700 uppercase">
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4" />
                        <span>Qualification</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-navy-100">
                  {teachersData.nonTeachingStaff.map((staff, index) => (
                    <tr
                      key={staff.id}
                      className={`hover:bg-navy-50/30 transition-colors duration-200 ${
                        index % 2 === 0 ? "bg-white" : "bg-navy-50/10"
                      }`}
                    >
                      <td className="px-4 sm:px-6 py-3 sm:py-4 font-medium text-navy-900">
                        {staff.name}
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-navy-700">
                        {staff.designation}
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-navy-600">
                        {staff.qualification}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden">
              <div className="p-4 sm:p-5 space-y-4">
                {teachersData.nonTeachingStaff.map((staff) => (
                  <div
                    key={staff.id}
                    className="bg-gradient-to-br from-white to-navy-50/30 rounded-xl p-4 border border-navy-100 shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="mb-2">
                      <h4 className="text-base sm:text-lg font-semibold text-navy-900">
                        {staff.name}
                      </h4>
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-navy-600 mb-1">
                          <Briefcase className="h-3 w-3" />
                          <span className="font-medium">Designation:</span>
                        </div>
                        <p className="text-sm sm:text-base text-navy-700 pl-5">
                          {staff.designation}
                        </p>
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-navy-600 mb-1">
                          <Award className="h-3 w-3" />
                          <span className="font-medium">Qualification:</span>
                        </div>
                        <p className="text-sm sm:text-base text-navy-600 pl-5">
                          {staff.qualification}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ================= Bottom decorative element ================= */}
        <motion.div
          className="flex justify-center mt-10 sm:mt-12 md:mt-16"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4 text-navy-600">
            <div className="w-8 h-px sm:w-12 md:w-16 bg-gradient-to-r from-transparent via-navy-400 to-transparent"></div>
            <span className="text-xs sm:text-sm font-medium">Dedicated Educators</span>
            <div className="w-8 h-px sm:w-12 md:w-16 bg-gradient-to-r from-transparent via-navy-400 to-transparent"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
export default Teachers;