import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Award, MapPin, Calendar, X, Flag } from "lucide-react";
import nationalData from "../../constant/SportsData/nationalData";

const NationalInternational = () => {
  const navigate = useNavigate();
  const data = nationalData;

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(data.categories[0]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(
    data.categories[0].subcategories[0]
  );
  const [viewMode, setViewMode] = useState("grid");

  const totalPhotos = data.categories.reduce(
    (total, category) =>
      total +
      category.subcategories.reduce(
        (subTotal, subcategory) => subTotal + subcategory.items.length,
        0
      ),
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
        <button
          onClick={() => navigate("/")}
          className="text-gray-600 hover:underline font-medium"
        >
          ← Home
        </button>
        <span>/</span>
        {/* <button
          onClick={() => navigate("/gallery")}
          className="text-gray-600 hover:underline font-medium"
        >
          Gallery
        </button> */}
        {/* <span>/</span> */}
        <span className="font-medium text-gray-500">National</span>
      </div>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl text-[#800000] md:text-4xl font-serif font-semibold text- mb-4">National Gallery</h1>
        <div className="w-20 h-1 bg-[#800000] mt-3 mb-4"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <p className="max-w-2xl text-gray-600">
            Showcasing our school's participation and achievements in
            national-level events, competitions, and programs across India.
          </p>
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 bg-green-50 text-gray-700 rounded-lg font-medium">
              <span className="font-bold">{totalPhotos}</span> Photos
            </div>
            <div className="flex items-center gap-2">
              <Flag className="w-5 h-5 text-gray-600" />
              <span className="text-sm text-gray-600">
                {data.categories.length} Categories
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg ${
              viewMode === "grid"
                ? "bg-orange-100 text-[#0A2343]"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-lg ${
              viewMode === "list"
                ? "bg-orange-100 text-[#0A2343]"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* 🔹 National Category Selection */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Select Category
        </h2>
        <div className="flex flex-wrap gap-3">
          {data.categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category);
                setSelectedSubCategory(category.subcategories[0]);
              }}
              className={`px-5 py-2 rounded-full font-medium transition ${
                selectedCategory.id === category.id
                  ? "bg-[#0A2343] text-white shadow"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.title}
              <span className="ml-2 text-sm opacity-80">
                (
                {category.subcategories.reduce(
                  (total, sub) => total + sub.items.length,
                  0
                )}
                )
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Category Details */}
      <div className="mb-8 bg-gradient-to-r from-orange-50 to-gray-50 p-6 rounded-xl border border-gray-200">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-100 to-orange-50 flex items-center justify-center">
            <span className="text-2xl">{selectedCategory.icon}</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {selectedCategory.title}
            </h2>
            <p className="text-gray-600">{selectedCategory.description}</p>
          </div>
        </div>

        {/* 🔹 Sub-Category Selection */}
        <div className="flex flex-wrap gap-3">
          {selectedCategory.subcategories.map((subcategory) => (
            <button
              key={subcategory.id}
              onClick={() => setSelectedSubCategory(subcategory)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                selectedSubCategory?.id === subcategory.id
                  ? "bg-[#0A2343] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span className="mr-2">{subcategory.icon}</span>
              {subcategory.title}
              <span className="ml-2 text-sm opacity-80">
                ({subcategory.items.length})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Category Info */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {selectedSubCategory?.title}
        </h2>
        <p className="text-gray-600 mt-1">
          {selectedSubCategory?.items.length} photos
        </p>
      </div>

      {/* 🔹 Gallery Grid/List View */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {selectedSubCategory?.items.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => setSelectedImage(item)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.alt || item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-300" />
                {item.achievement && (
                  <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    <Award className="w-3 h-3 inline mr-1" />
                    Award
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 line-clamp-1">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                    {item.description}
                  </p>
                )}
                <div className="flex items-center justify-between mt-3">
                  {item.date && (
                    <div className="flex items-center gap-1 text-gray-500 text-sm">
                      <Calendar className="w-4 h-4" />
                      {new Date(item.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  )}
                  {item.venue && (
                    <div className="flex items-center gap-1 text-gray-500 text-sm">
                      <MapPin className="w-4 h-4" />
                      <span className="truncate max-w-[100px]">
                        {item.venue.split(",")[0]}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // List View
        <div className="space-y-4 mb-12">
          {selectedSubCategory?.items.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => setSelectedImage(item)}
            >
              <div className="flex">
                <div className="w-48 h-48 flex-shrink-0 relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.alt || item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {item.achievement && (
                    <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                      <Award className="w-3 h-3 inline mr-1" />
                      Award
                    </div>
                  )}
                </div>
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-gray-800 text-lg">
                      {item.title}
                    </h3>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      National
                    </span>
                  </div>
                  {item.description && (
                    <p className="text-gray-600 mb-4">{item.description}</p>
                  )}
                  <div className="flex items-center gap-6 text-gray-500">
                    {item.date && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(item.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                    )}
                    {item.venue && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {item.venue}
                      </div>
                    )}
                    {item.achievement && (
                      <div className="flex items-center gap-2 text-green-600">
                        <Award className="w-4 h-4" />
                        {item.achievement}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {selectedSubCategory?.items.length === 0 && (
        <div className="text-center py-16">
          <Flag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No Photos Available
          </h3>
          <p className="text-gray-500">
            National event photos will be added to this category soon.
          </p>
        </div>
      )}

      {/* 🔹 Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-white rounded-xl overflow-hidden">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 bg-black/70 text-white p-2 rounded-full hover:bg-black/90 transition"
            >
              <X size={24} />
            </button>

            <div className="max-h-[70vh] overflow-hidden">
              <img
                src={selectedImage.image}
                alt={selectedImage.alt || selectedImage.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {selectedImage.title}
                  </h3>
                  {selectedImage.description && (
                    <p className="text-gray-600 mt-2">
                      {selectedImage.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{selectedSubCategory.icon}</span>
                  <span className="text-sm bg-green-600 text-white px-3 py-1 rounded-full">
                    National
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-gray-200 pt-4">
                <div className="space-y-3">
                  {selectedImage.date && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-5 h-5" />
                      <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p>
                          {new Date(selectedImage.date).toLocaleDateString(
                            "en-US",
                            {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    </div>
                  )}
                  {selectedImage.venue && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-5 h-5" />
                      <div>
                        <p className="text-sm text-gray-500">Venue</p>
                        <p>{selectedImage.venue}</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="space-y-3">
                  {selectedImage.achievement && (
                    <div className="flex items-center gap-2 text-green-600">
                      <Award className="w-5 h-5" />
                      <div>
                        <p className="text-sm text-green-500">Achievement</p>
                        <p className="font-medium">
                          {selectedImage.achievement}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-gray-600">
                    <Flag className="w-5 h-5" />
                    <div>
                      <p className="text-sm text-gray-500">Level</p>
                      <p className="font-medium">National Level</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 🔹 All National Categories Overview */}
      <div className="mt-16 pt-8 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          All National Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.categories.map((category) => {
            const totalCategoryPhotos = category.subcategories.reduce(
              (total, sub) => total + sub.items.length,
              0
            );
            return (
              <div
                key={category.id}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer border border-gray-100"
                onClick={() => {
                  setSelectedCategory(category);
                  setSelectedSubCategory(category.subcategories[0]);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-100 to-orange-50 flex items-center justify-center">
                    <span className="text-2xl">{category.icon}</span>
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg">
                    {category.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-3 text-sm">
                  {category.description}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-gray-500">
                    {totalCategoryPhotos} photos
                  </span>
                  <span className="text-orange-600 font-medium flex items-center gap-1">
                    View
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NationalInternational;
