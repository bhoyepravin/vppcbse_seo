import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Play, Clock, Eye, X, Calendar, Video } from "lucide-react";
import videosData from "../../constant/SportsData/sportsData";

const SportsVideos = () => {
  const navigate = useNavigate();
  const data = videosData;

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(data.categories[0]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(
    data.categories[0].subcategories[0]
  );
  const [videoView, setVideoView] = useState("grid"); // 'grid' or 'list'

  // Calculate total videos
  const totalVideos = data.categories.reduce(
    (total, category) =>
      total +
      category.subcategories.reduce(
        (subTotal, subcategory) => subTotal + subcategory.items.length,
        0
      ),
    0
  );

  // Format duration for display
  const formatDuration = (duration) => {
    return duration;
  };

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
        </button>
        <span>/</span> */}
        <span className="font-medium text-gray-500">Videos</span>
      </div>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl text-[#800000] md:text-4xl font-serif font-semibold text- mb-4">Video Gallery</h1>
        <div className="w-20 h-1 bg-[#800000] mt-3 mb-4"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <p className="max-w-2xl text-gray-600">
            Watch highlights, events, and memorable moments from our school.
            Relive the excitement through our video collection.
          </p>
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 bg-orange-50 text-orange-700 rounded-lg font-medium">
              <span className="font-bold">{totalVideos}</span> Videos
            </div>
            <div className="flex items-center gap-2">
              <Video className="w-5 h-5 text-orange-500" />
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
            onClick={() => setVideoView("grid")}
            className={`p-2 rounded-lg ${
              videoView === "grid"
                ? "bg-orange-100 text-[#0A2343]"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button
            onClick={() => setVideoView("list")}
            className={`p-2 rounded-lg ${
              videoView === "list"
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

      {/* 🔹 Video Category Selection */}
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
          {selectedSubCategory?.items.length} videos
        </p>
      </div>

      {/* 🔹 Video Grid/List View */}
      {videoView === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {selectedSubCategory?.items.map((video) => (
            <div
              key={video.id}
              className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => setSelectedVideo(video)}
            >
              {/* Video Thumbnail */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.alt || video.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition duration-300" />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-orange-500/90 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-8 h-8 text-white ml-1" fill="white" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded-md text-sm font-medium">
                  {formatDuration(video.duration)}
                </div>
              </div>

              {/* Video Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 line-clamp-2 mb-2">
                  {video.title}
                </h3>
                {video.description && (
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {video.description}
                  </p>
                )}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-4">
                    {video.date && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(video.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                    )}
                    {video.views && (
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {video.views}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {formatDuration(video.duration)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // List View
        <div className="space-y-4 mb-12">
          {selectedSubCategory?.items.map((video) => (
            <div
              key={video.id}
              className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => setSelectedVideo(video)}
            >
              <div className="flex">
                {/* Thumbnail */}
                <div className="w-64 h-48 flex-shrink-0 relative overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.alt || video.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-orange-500/90 rounded-full flex items-center justify-center">
                      <Play className="w-8 h-8 text-white ml-1" fill="white" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded-md text-sm">
                    {formatDuration(video.duration)}
                  </div>
                </div>

                {/* Video Info */}
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-800">
                      {video.title}
                    </h3>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {selectedCategory.title}
                    </span>
                  </div>
                  {video.description && (
                    <p className="text-gray-600 mb-4">{video.description}</p>
                  )}
                  <div className="flex items-center gap-6 text-gray-500">
                    {video.date && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(video.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                    )}
                    {video.views && (
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        {video.views} views
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {formatDuration(video.duration)}
                    </div>
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
          <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No Videos Available
          </h3>
          <p className="text-gray-500">
            Videos will be added to this category soon.
          </p>
        </div>
      )}

      {/* 🔹 Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative max-w-5xl w-full bg-white rounded-xl overflow-hidden">
            {/* Close Button */}
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-10 bg-black/70 text-white p-2 rounded-full hover:bg-black/90 transition"
            >
              <X size={24} />
            </button>

            {/* Video Player */}
            <div className="aspect-video bg-black">
              <iframe
                src={selectedVideo.videoUrl}
                title={selectedVideo.title}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Video Details */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{selectedSubCategory.icon}</span>
                    <h3 className="text-2xl font-bold text-gray-800">
                      {selectedVideo.title}
                    </h3>
                  </div>
                  {selectedVideo.description && (
                    <p className="text-gray-600 mb-4">
                      {selectedVideo.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm bg-orange-500 text-white px-3 py-1 rounded-full">
                    {selectedCategory.title}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <div className="flex items-center gap-6">
                  {selectedVideo.date && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-5 h-5" />
                      <span>
                        {new Date(selectedVideo.date).toLocaleDateString(
                          "en-US",
                          {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </span>
                    </div>
                  )}
                  {selectedVideo.duration && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-5 h-5" />
                      <span>{formatDuration(selectedVideo.duration)}</span>
                    </div>
                  )}
                  {selectedVideo.views && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Eye className="w-5 h-5" />
                      <span>{selectedVideo.views} views</span>
                    </div>
                  )}
                </div>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  {selectedSubCategory.title}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 🔹 All Video Categories Overview */}
      <div className="mt-16 pt-8 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          All Video Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.categories.map((category) => {
            const totalCategoryVideos = category.subcategories.reduce(
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
                    {totalCategoryVideos} videos
                  </span>
                  <span className="text-orange-600 font-medium flex items-center gap-1">
                    Watch
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

export default SportsVideos;
