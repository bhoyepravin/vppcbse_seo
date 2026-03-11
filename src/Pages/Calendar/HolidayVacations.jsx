import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Cloud, 
  Sun, 
  Heart, 
  Sparkles, 
  Star, 
  BookOpen,
  Calendar,
  PartyPopper,
  School,
  Moon,
//   PalmTree,
  Gift,
  Snowflake,
  Church
} from "lucide-react";

const HolidayVacations = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [holidays, setHolidays] = useState([]);

  // Sample holiday data - you can replace with API call
  const holidayData = [
    {
      id: 1,
      name: "New Year's Day",
      date: "January 1",
      type: "Public Holiday",
      duration: "1 day",
      description: "Celebration of the new year",
      icon: "PartyPopper",
      color: "bg-blue-100 text-blue-800"
    },
    {
      id: 2,
      name: "Republic Day",
      date: "January 26",
      type: "National Holiday",
      duration: "1 day",
      description: "Celebration of Indian Republic Day",
      icon: "Flag",
      color: "bg-orange-100 text-orange-800"
    },
    {
      id: 3,
      name: "Holi",
      date: "March 8",
      type: "Festival",
      duration: "2 days",
      description: "Festival of colors",
      icon: "Heart",
      color: "bg-pink-100 text-pink-800"
    },
    {
      id: 4,
      name: "Summer Vacation",
      date: "May 15 - June 15",
      type: "Academic Break",
      duration: "30 days",
      description: "Summer break for students",
      icon: "Sun",
      color: "bg-yellow-100 text-yellow-800"
    },
    {
      id: 5,
      name: "Independence Day",
      date: "August 15",
      type: "National Holiday",
      duration: "1 day",
      description: "Indian Independence Day",
      icon: "Flag",
      color: "bg-green-100 text-green-800"
    },
    {
      id: 6,
      name: "Diwali Break",
      date: "October 24 - 28",
      type: "Festival Break",
      duration: "5 days",
      description: "Festival of lights celebration",
      icon: "Sparkles",
      color: "bg-purple-100 text-purple-800"
    },
    {
      id: 7,
      name: "Christmas Break",
      date: "December 24 - 26",
      type: "Festival Break",
      duration: "3 days",
      description: "Christmas celebrations",
      icon: "Gift",
      color: "bg-red-100 text-red-800"
    },
    {
      id: 8,
      name: "Mid-Term Break",
      date: "September 10 - 12",
      type: "Academic Break",
      duration: "3 days",
      description: "Mid-term examination break",
      icon: "BookOpen",
      color: "bg-indigo-100 text-indigo-800"
    }
  ];

  // Years for dropdown
  const years = [2023, 2024, 2025, 2026];
  const months = [
    "All", "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  useEffect(() => {
    // Filter holidays based on selected month
    let filtered = [...holidayData];
    if (selectedMonth !== "All") {
      filtered = filtered.filter(holiday => 
        holiday.date.includes(selectedMonth.slice(0, 3))
      );
    }
    setHolidays(filtered);
  }, [selectedMonth]);

  const getIconComponent = (iconName) => {
    const iconMap = {
      PartyPopper,
      Heart,
      Sun,
      Sparkles,
      Gift,
      BookOpen,
      Flag: Church,
      //PalmTree,
      Snowflake,
      Moon,
      School
    };
    const Icon = iconMap[iconName] || Calendar;
    return <Icon className="w-5 h-5" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-navy-50/30 py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-navy-100/20 to-blue-100/10 rounded-full -translate-x-24 -translate-y-24"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-tl from-blue-100/10 to-navy-100/20 rounded-full translate-x-24 translate-y-24"></div>

      {/* Creative decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-5 sm:top-20 sm:left-10 opacity-20 animate-bounce">
          <Cloud className="w-8 h-8 sm:w-10 sm:h-10 text-navy-400" />
        </div>
        <div className="absolute top-20 right-8 sm:top-32 sm:right-16 opacity-20 animate-pulse">
          <Sun className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-400" />
        </div>
        <div className="absolute bottom-20 left-10 sm:bottom-32 sm:left-20 opacity-20 animate-bounce">
          <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-pink-400" />
        </div>
        <div className="absolute top-1/3 left-1/4 opacity-15">
          <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-navy-300" />
        </div>
        <div className="absolute bottom-1/3 right-1/4 opacity-15">
          <Star className="w-6 h-6 sm:w-8 sm:h-8 text-navy-300" />
        </div>
        <div className="absolute top-1/2 right-10 opacity-10">
          <BookOpen className="w-10 h-10 sm:w-12 sm:h-12 text-blue-300" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ================= HEADER ================= */}
        <motion.div
          className="text-center mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-500"></div>
            <h1 className="font-title text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gradient-navy">
              Academic Calendar
            </h1>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-500"></div>
          </div>

          <motion.div
            className="h-1 sm:h-1.5 w-16 sm:w-20 md:w-24 bg-gradient-to-r from-navy-600 via-blue-600 to-navy-600 mx-auto mb-4 sm:mb-6 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: "4rem" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          />
          
          <p className="text-gray-700 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-2 sm:px-4">
            View and explore the academic calendar by year
          </p>
        </motion.div>

        {/* ================= FILTERS ================= */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Year Filter */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Year
              </label>
              <div className="relative">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent w-full sm:w-40"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Month Filter */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Month
              </label>
              <div className="relative">
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent w-full sm:w-48"
                >
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* ================= HOLIDAYS LIST ================= */}
        <motion.div
          className="mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Holidays & Vacations {selectedYear}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              All scheduled holidays and academic breaks for {selectedYear}
            </p>
          </div>

          {/* Holiday Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {holidays.map((holiday, index) => (
              <motion.div
                key={holiday.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300"
              >
                {/* Card Header */}
                <div className={`p-5 ${holiday.color.split(' ')[0]} border-b`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${holiday.color.split(' ')[0]} bg-opacity-30`}>
                        {getIconComponent(holiday.icon)}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">
                          {holiday.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-700">
                            {holiday.date}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${holiday.color}`}>
                      {holiday.type}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5">
                  <p className="text-gray-600 mb-4">{holiday.description}</p>
                  
                  <div className="flex items-center justify-between border-t pt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-sm text-gray-700">
                        Duration: <span className="font-semibold">{holiday.duration}</span>
                      </span>
                    </div>
                    <button className="text-sm font-medium text-navy-600 hover:text-navy-800 transition-colors duration-200">
                      View Details →
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats Summary */}
          <motion.div
            className="mt-12 bg-gradient-to-r from-navy-50 to-blue-50 rounded-2xl p-6 shadow-sm border border-navy-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-wrap justify-between items-center">
              <div className="text-center flex-1 min-w-[200px] mb-4 sm:mb-0">
                <div className="text-3xl sm:text-4xl font-bold text-navy-700">
                  {holidays.length}
                </div>
                <div className="text-sm sm:text-base text-gray-600">
                  Total Holidays
                </div>
              </div>
              <div className="text-center flex-1 min-w-[200px] mb-4 sm:mb-0">
                <div className="text-3xl sm:text-4xl font-bold text-blue-700">
                  {selectedMonth === "All" ? "12" : "1"}
                </div>
                <div className="text-sm sm:text-base text-gray-600">
                  {selectedMonth === "All" ? "Months" : "Month"}
                </div>
              </div>
              <div className="text-center flex-1 min-w-[200px]">
                <div className="text-3xl sm:text-4xl font-bold text-green-700">
                  47
                </div>
                <div className="text-sm sm:text-base text-gray-600">
                  Total Days Off
                </div>
              </div>
            </div>
          </motion.div>

          {/* Empty State */}
          {holidays.length === 0 && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-navy-100 rounded-full mb-4">
                <Calendar className="w-8 h-8 text-navy-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No holidays found
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                No holidays are scheduled for {selectedMonth} {selectedYear}. Try selecting a different month or year.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default HolidayVacations;