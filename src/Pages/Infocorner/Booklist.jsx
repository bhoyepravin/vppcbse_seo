import React from "react";
import booksData from "../../constant/Infocorner/BooksData";
import {
  BookOpen,
  Download,
  Eye,
  Calendar,
  User,
  FileText,
} from "lucide-react";

const Bookslist = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* ================= HEADING ================= */}
      <div className="text-center mb-10">
        <div className="flex justify-center items-center gap-2">
          <BookOpen className="w-8 h-8 text-orange-500" />
          <h1 className="text-3xl md:text-5xl font-bold text-gray-600">
            Books & Publications
          </h1>
        </div>
        <div className="w-24 h-1 bg-orange-500 mx-auto mt-4"></div>
        <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
          Explore our collection of published books, research papers, and
          academic publications authored by our faculty and researchers.
        </p>
      </div>

      {/* ================= BOOKS LIST ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {booksData.map((book) => (
          <div
            key={book.id}
            className="flex flex-col p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-orange-200"
          >
            {/* Book Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-50 rounded-lg">
                  <BookOpen className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {book.title}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
                    <User className="w-4 h-4" />
                    <span>{book.author}</span>
                  </div>
                </div>
              </div>
              {book.isNew && (
                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                  New
                </span>
              )}
            </div>

            {/* Book Details */}
            <div className="mb-4 flex-grow">
              <div className="flex items-center gap-4 text-gray-600 text-sm mb-3">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{book.year}</span>
                </div>
                {book.pages && (
                  <div className="flex items-center gap-1">
                    <FileText className="w-4 h-4" />
                    <span>{book.pages} pages</span>
                  </div>
                )}
              </div>

              {book.category && (
                <div className="mb-3">
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                    {book.category}
                  </span>
                </div>
              )}

              {book.description && (
                <p className="text-gray-500 text-sm mt-3 line-clamp-3">
                  {book.description}
                </p>
              )}

              {book.edition && (
                <p className="text-gray-600 text-sm mt-2">
                  <span className="font-medium">Edition:</span> {book.edition}
                </p>
              )}
            </div>

            {/* Action Section */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-4">
                {book.fileSize && (
                  <span className="text-gray-400 text-sm">{book.fileSize}</span>
                )}
                {book.previewLink && (
                  <a
                    href={book.previewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-orange-500 flex items-center gap-1 text-sm font-medium"
                  >
                    <Eye className="w-4 h-4" />
                    Preview
                  </a>
                )}
              </div>
              <a
                href={book.pdfFile}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors duration-200"
              >
                <Download className="w-4 h-4" />
                Download
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* ================= ADDITIONAL INFORMATION ================= */}
      <div className="mt-12 p-6 bg-orange-50 rounded-lg border border-orange-100">
        <div className="flex items-start gap-4">
          <BookOpen className="w-8 h-8 text-orange-500 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              About Our Publications
            </h3>
            <p className="text-gray-600 mb-4">
              Our publications represent the academic excellence and research
              contributions of our institution. All books and papers undergo
              rigorous review processes to ensure quality and relevance.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {booksData.length}+
                </div>
                <div className="text-sm text-gray-600">Books Published</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">50+</div>
                <div className="text-sm text-gray-600">Research Papers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">100+</div>
                <div className="text-sm text-gray-600">Total Downloads</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">25+</div>
                <div className="text-sm text-gray-600">Authors</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= CTA SECTION ================= */}
      <div className="mt-8 text-center">
        <p className="text-gray-600 mb-6">
          For publication inquiries or collaboration opportunities, please
          contact our publication team.
        </p>
        <button className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900 transition-colors duration-200">
          <BookOpen className="w-5 h-5" />
          Contact Publication Team
        </button>
      </div>
    </div>
  );
};

export default Bookslist;
