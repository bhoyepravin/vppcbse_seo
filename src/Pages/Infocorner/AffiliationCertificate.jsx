import React from "react";
import affiliationData from "../../constant/Infocorner/AffiliationData";
import { FileText, Download } from "lucide-react";

const AffiliationCertificate = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* ================= HEADING ================= */}
      <div className="text-center mb-10">
        <div className="flex justify-center items-center gap-2">
          {/* <FileText className="w-8 h-8 text-orange-400" /> */}
          <h1 className="text-center text-2xl text-[#800000] md:text-4xl font-serif font-semibold text- mb-4">
            Affiliation Certificates
          </h1>
        </div>
        <div className="w-24 h-1 bg-orange-500 mx-auto mt-4"></div>
        <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
          Official certificates and documents verifying our institutional
          affiliations, accreditations, and recognized partnerships.
        </p>
      </div>

      {/* ================= AFFILIATION LIST ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {affiliationData.map((item) => (
          <div
            key={item.id}
            className="flex flex-col p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200"
          >
            {/* Certificate Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <FileText className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.name}
                </h3>
              </div>
              {item.isVerified && (
                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                  Verified
                </span>
              )}
            </div>

            {/* Certificate Details */}
            <div className="mb-4 flex-grow">
              {item.issuingAuthority && (
                <p className="text-gray-600 text-sm mb-2">
                  <span className="font-medium">Issued by:</span>{" "}
                  {item.issuingAuthority}
                </p>
              )}
              {item.validUntil && (
                <p className="text-gray-600 text-sm mb-2">
                  <span className="font-medium">Valid until:</span>{" "}
                  {item.validUntil}
                </p>
              )}
              {item.description && (
                <p className="text-gray-500 text-sm mt-3">{item.description}</p>
              )}
            </div>

            {/* Download Section */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              {item.fileSize && (
                <span className="text-gray-400 text-sm">{item.fileSize}</span>
              )}
              <a
                href={item.file}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#012343] text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors duration-200"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AffiliationCertificate;
