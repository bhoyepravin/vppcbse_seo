import React, { useState } from "react";
import { Download, Clock } from "lucide-react";
import timetableData from "../../constant/Calendar/timetableData";

const Timetable = () => {
  const [selectedYear, setSelectedYear] = useState("2025-26");

  const handleDownload = (pdfPath) => {
    window.open(pdfPath, "_blank");
  };

  const selectedTimetable = timetableData.find(
    (item) => item.year === selectedYear
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Clock className="w-8 h-8 text-orange-600" />
            <h1 className="text-3xl font-bold text-gray-500">
              School Timetable
            </h1>
          </div>
          <p className="text-gray-600">
            Select academic year to download the timetable
          </p>
        </div>

        {/* Year Selection */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Select Academic Year
          </h2>
          <div className="flex flex-wrap gap-3">
            {timetableData.map((item) => (
              <button
                key={item.year}
                onClick={() => setSelectedYear(item.year)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  selectedYear === item.year
                    ? "bg-orange-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {item.year}
              </button>
            ))}
          </div>
        </div>

        {/* Current Selection Display */}
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            {selectedTimetable?.title}
          </h3>
          <p className="text-gray-600 mb-4">{selectedTimetable?.description}</p>
          <p className="text-gray-500 text-sm mb-6">
            Vidya Prabodhini Prashala 
          </p>

          <button
            onClick={() => handleDownload(selectedTimetable?.pdf)}
            className="inline-flex items-center gap-3 px-8 py-4 bg-orange-600 text-white text-lg font-semibold rounded-lg hover:bg-orange-700 transition-colors shadow-lg hover:shadow-xl"
          >
            <Download className="w-6 h-6" />
            Download {selectedYear} Timetable (PDF)
          </button>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-medium text-gray-700 mb-2">
              Vidya Prabodhini Prashala 
            </h4>
            <p className="text-sm text-gray-500">
              Contains detailed class schedules, periods, and timings
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Updated as per CBSE guidelines and school timings
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>© Vidya Prabodhini Prashala. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Timetable;
