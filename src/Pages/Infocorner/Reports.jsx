import React from "react";
import reportsData from "../../constant/Infocorner/CircularsData";
import { FileText, Download, Calendar, AlertCircle } from "lucide-react";

const Reports = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* ================= HEADING ================= */}
      <div className="text-center mb-10">
        <div className="flex justify-center items-center gap-2">
          <FileText className="w-8 h-8 text-orange-500" />
          <h1 className="text-3xl md:text-5xl font-bold text-gray-600">
            Reports & Documents
          </h1>
        </div>
        <div className="w-24 h-1 bg-orange-500 mx-auto mt-4"></div>
        <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
          Access various institutional reports, annual publications, and
          official documents categorized by type and year.
        </p>
      </div>

      {/* ================= REPORTS CATEGORIES ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportsData.map((report) => (
          <div
            key={report.id}
            className="flex flex-col p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-orange-200"
          >
            {/* Report Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg ${
                    report.type === "Annual"
                      ? "bg-green-50"
                      : report.type === "Financial"
                      ? "bg-blue-50"
                      : report.type === "Academic"
                      ? "bg-purple-50"
                      : report.type === "Research"
                      ? "bg-pink-50"
                      : "bg-orange-50"
                  }`}
                >
                  <FileText
                    className={`w-6 h-6 ${
                      report.type === "Annual"
                        ? "text-green-500"
                        : report.type === "Financial"
                        ? "text-blue-500"
                        : report.type === "Academic"
                        ? "text-purple-500"
                        : report.type === "Research"
                        ? "text-pink-500"
                        : "text-orange-500"
                    }`}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {report.title}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
                    <Calendar className="w-4 h-4" />
                    <span>{report.year}</span>
                    {report.quarter && (
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">
                        Q{report.quarter}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {report.isMandatory && (
                <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">
                  Required
                </span>
              )}
            </div>

            {/* Report Details */}
            <div className="mb-4 flex-grow">
              <div className="mb-3">
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    report.type === "Annual"
                      ? "bg-green-100 text-green-800"
                      : report.type === "Financial"
                      ? "bg-blue-100 text-blue-800"
                      : report.type === "Academic"
                      ? "bg-purple-100 text-purple-800"
                      : report.type === "Research"
                      ? "bg-pink-100 text-pink-800"
                      : "bg-orange-100 text-orange-800"
                  }`}
                >
                  {report.type} Report
                </span>
              </div>

              {report.description && (
                <p className="text-gray-500 text-sm mt-3 line-clamp-2">
                  {report.description}
                </p>
              )}

              <div className="mt-4 space-y-2">
                {report.publishedDate && (
                  <p className="text-gray-600 text-sm">
                    <span className="font-medium">Published:</span>{" "}
                    {report.publishedDate}
                  </p>
                )}
                {report.pages && (
                  <p className="text-gray-600 text-sm">
                    <span className="font-medium">Pages:</span> {report.pages}
                  </p>
                )}
                {report.fileFormat && (
                  <p className="text-gray-600 text-sm">
                    <span className="font-medium">Format:</span>{" "}
                    {report.fileFormat}
                  </p>
                )}
              </div>
            </div>

            {/* Action Section */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-4">
                {report.fileSize && (
                  <span className="text-gray-400 text-sm">
                    {report.fileSize}
                  </span>
                )}
                {report.hasSummary && (
                  <a
                    href={report.summaryLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-orange-500 flex items-center gap-1 text-sm font-medium"
                  >
                    <FileText className="w-4 h-4" />
                    Summary
                  </a>
                )}
              </div>
              <div className="flex gap-2">
                {report.externalLink && (
                  <a
                    href={report.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 border border-orange-500 text-orange-500 font-semibold rounded-lg hover:bg-orange-50 transition-colors duration-200 text-sm"
                  >
                    View Online
                  </a>
                )}
                <a
                  href={report.pdfFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors duration-200"
                >
                  <Download className="w-4 h-4" />
                  Download
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
