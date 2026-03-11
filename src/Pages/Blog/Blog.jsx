import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import blogData from "../../constant/Blog/blogData";
import { Calendar, ArrowRight, Home, ChevronRight } from "lucide-react";
import axiosInstance from "../../services/api";

const BlogPage = () => {
  const navigate = useNavigate();
  const [apiData, setApiData] = useState({
    blog: {
      hero: {
        title: blogData.hero?.title || "Blogs by VPP School",
        image: blogData.hero?.image || ""
      },
      title: blogData.title || "Blog & Updates",
      description: blogData.description || "Explore news, achievements, events, and activities at Vidya Prabodhini Prashala School.",
      categories: blogData.categories || []
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    fetchBlogData();
  }, []);

  const fetchBlogData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/blog');
      
      if (response.data.success) {
        const apiResponse = response.data.data;
        
        // Process the API data - fix image URLs
        const processedData = {
          blog: {
            hero: {
              title: apiResponse.blog?.hero?.title || "Blogs by VPP School",
              image: apiResponse.blog?.hero?.image?.replace(/\\\//g, '/') || blogData.hero?.image || ""
            },
            title: apiResponse.blog?.title || "Blog & Updates",
            description: apiResponse.blog?.description || "Explore news, achievements, events, and activities at Vidya Prabodhini Prashala School.",
            categories: apiResponse.blog?.categories?.map(category => ({
              ...category,
              id: category.id || `category-${Math.random()}`,
              blogs: category.blogs?.map(blog => ({
                ...blog,
                image: blog.image?.replace(/\\\//g, '/') || blog.image,
                path: blog.path || `/blog/${blog.id}`
              })) || []
            })) || []
          }
        };
        
        setApiData(processedData);
        
        // Set initial selected category
        if (processedData.blog.categories.length > 0) {
          setSelectedCategory(processedData.blog.categories[0]);
        }
        
        setError(null);
      }
    } catch (err) {
      console.error('Error fetching blog data:', err);
      setError('Failed to load blog');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setVisibleCount(6);
    // Scroll to blogs section
    document.getElementById("blog-grid")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-navy-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-navy-200 border-t-navy-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading blog...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-navy-50/30 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-xl mb-4">⚠️ {error}</p>
          <button 
            onClick={fetchBlogData}
            className="px-6 py-2 bg-gradient-to-r from-navy-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const { blog } = apiData;
  const currentCategory = selectedCategory || (blog.categories.length > 0 ? blog.categories[0] : null);
  const visibleBlogs = currentCategory ? currentCategory.blogs.slice(0, visibleCount) : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-navy-50/30">
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-navy-100/20 to-blue-100/10 rounded-full -translate-x-24 -translate-y-24"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-tl from-blue-100/10 to-navy-100/20 rounded-full translate-x-24 translate-y-24"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 relative z-10">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-6 sm:mb-8 text-sm sm:text-base text-gray-600"
          >
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1 text-gray-600 hover:text-navy-700 transition-colors duration-200 font-medium group"
            >
              <Home className="w-4 h-4" />
              <span className="group-hover:underline">Home</span>
            </button>
            <ChevronRight className="w-4 h-4" />
            <span className="font-semibold text-navy-700">Blog</span>
          </motion.div>

          {/* Hero Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-500"></div>
              <h1 className="font-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gradient-navy">
                {blog.title}
              </h1>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-500"></div>
            </div>

            <motion.div
              className="h-1 sm:h-1.5 w-16 sm:w-20 md:w-24 bg-gradient-to-r from-navy-600 via-blue-600 to-navy-600 mx-auto mb-4 sm:mb-6 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "4rem" }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            
            <p className="text-gray-700 max-w-3xl mx-auto text-sm sm:text-base md:text-lg px-2 sm:px-4">
              {blog.description}
            </p>
          </motion.div>

          {/* Hero Image */}
          {blog.hero?.image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative group w-full max-w-6xl mx-auto"
            >
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl">
                <img
                  src={blog.hero.image}
                  alt={blog.hero.title || "Blogs by VPP School"}
                  className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover transform transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' text-anchor='middle' fill='%23999'%3EImage Not Found%3C/text%3E%3C/svg%3E";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 md:bottom-10 md:left-10">
                  <h2 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold max-w-2xl">
                    {blog.hero.title}
                  </h2>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        {/* Category Filter */}
        {blog.categories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-10 sm:mb-12 md:mb-16"
          >
            <h2 className="text-center text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-6 sm:mb-8">
              Explore by Category
            </h2>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
              {blog.categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-full font-medium text-sm sm:text-base transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                    currentCategory?.id === category.id
                      ? "bg-gradient-to-r from-navy-600 to-blue-600 text-white shadow-lg shadow-blue-500/30"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Selected Category Info */}
        {currentCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10 sm:mb-12"
          >
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              {currentCategory.title}
            </h3>
            {currentCategory.description && (
              <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
                {currentCategory.description}
              </p>
            )}
            <div className="h-1 w-20 sm:w-24 bg-gradient-to-r from-navy-600 via-blue-600 to-navy-600 mx-auto mt-4 rounded-full"></div>
          </motion.div>
        )}

        {/* Blog Grid */}
        <div id="blog-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {visibleBlogs.length > 0 ? (
            visibleBlogs.map((blog, index) => (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100 group"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden h-48 sm:h-56 md:h-64">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' text-anchor='middle' fill='%23999'%3ENo Image%3C/text%3E%3C/svg%3E";
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-navy-700">
                      {currentCategory?.title}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-3 text-gray-500 text-xs sm:text-sm mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{blog.date}</span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                    <span>{blog.readTime || "5 min read"}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-navy-700 transition-colors duration-200">
                    {blog.title}
                  </h3>

                  <p className="text-gray-600 text-sm sm:text-base mb-4 line-clamp-3">
                    {blog.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <button
                      onClick={() => navigate(`${blog.path || `/blog/${blog.id}`}`)}
                      className="flex items-center gap-2 text-navy-600 hover:text-navy-800 font-medium text-sm sm:text-base group/readmore"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 group-hover/readmore:translate-x-1 transition-transform duration-200" />
                    </button>
                    <div className="flex items-center gap-2">
                      {blog.tags?.slice(0, 2).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-navy-50 text-navy-700 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))
          ) : (
            <div className="col-span-full text-center py-12 sm:py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-navy-100 rounded-full mb-4 sm:mb-6">
                <Calendar className="w-8 h-8 sm:w-10 sm:h-10 text-navy-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                No articles found
              </h3>
              <p className="text-gray-600 max-w-md mx-auto text-sm sm:text-base">
                No articles available in this category. Check back soon for new content!
              </p>
            </div>
          )}
        </div>

        {/* Load More Button */}
        {currentCategory && visibleCount < currentCategory.blogs.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mt-12 sm:mt-16"
          >
            <button
              onClick={handleLoadMore}
              className="px-8 py-3 sm:px-10 sm:py-4 bg-gradient-to-r from-navy-600 to-blue-600 text-white rounded-full font-medium text-sm sm:text-base hover:from-navy-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl shadow-blue-500/30"
            >
              Load More Articles
            </button>
            <p className="text-gray-500 text-sm mt-4">
              Showing {visibleBlogs.length} of {currentCategory.blogs.length} articles
            </p>
          </motion.div>
        )}
      </section>

      {/* Footer Decoration */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4 text-navy-600">
            <div className="w-8 h-px sm:w-12 md:w-16 bg-gradient-to-r from-transparent via-navy-400 to-transparent"></div>
            <span className="text-xs sm:text-sm font-medium">
              Stay Updated with Our Blog
            </span>
            <div className="w-8 h-px sm:w-12 md:w-16 bg-gradient-to-r from-transparent via-navy-400 to-transparent"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPage;



// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import blogData from "../../constant/Blog/blogData";
// import { Calendar, ArrowRight, Home, ChevronRight } from "lucide-react";

// const BlogPage = () => {
//   const navigate = useNavigate();
//   const [selectedCategory, setSelectedCategory] = useState(blogData.categories[0]);
//   const [visibleCount, setVisibleCount] = useState(6);

//   const handleCategoryChange = (category) => {
//     setSelectedCategory(category);
//     setVisibleCount(6);
//     // Scroll to blogs section
//     document.getElementById("blog-grid")?.scrollIntoView({ behavior: "smooth" });
//   };

//   const handleLoadMore = () => {
//     setVisibleCount((prev) => prev + 3);
//   };

//   const visibleBlogs = selectedCategory.blogs.slice(0, visibleCount);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white to-navy-50/30">
//       {/* ================= HERO SECTION ================= */}
//       <section className="relative overflow-hidden">
//         {/* Background decorative elements */}
//         <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-navy-100/20 to-blue-100/10 rounded-full -translate-x-24 -translate-y-24"></div>
//         <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-tl from-blue-100/10 to-navy-100/20 rounded-full translate-x-24 translate-y-24"></div>

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 relative z-10">
//           {/* Breadcrumb */}
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="flex items-center gap-2 mb-6 sm:mb-8 text-sm sm:text-base text-gray-600"
//           >
//             <button
//               onClick={() => navigate("/")}
//               className="flex items-center gap-1 text-gray-600 hover:text-navy-700 transition-colors duration-200 font-medium group"
//             >
//               <Home className="w-4 h-4" />
//               <span className="group-hover:underline">Home</span>
//             </button>
//             <ChevronRight className="w-4 h-4" />
//             <span className="font-semibold text-navy-700">Blog</span>
//           </motion.div>

//           {/* Hero Title */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.1 }}
//             className="text-center mb-8 sm:mb-12"
//           >
//             <div className="inline-flex items-center gap-3 mb-4">
//               <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-500"></div>
//               <h1 className="font-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gradient-navy">
//                 {blogData.title}
//               </h1>
//               <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-navy-500"></div>
//             </div>

//             <motion.div
//               className="h-1 sm:h-1.5 w-16 sm:w-20 md:w-24 bg-gradient-to-r from-navy-600 via-blue-600 to-navy-600 mx-auto mb-4 sm:mb-6 rounded-full"
//               initial={{ width: 0 }}
//               animate={{ width: "4rem" }}
//               transition={{ duration: 0.8, delay: 0.3 }}
//             />
            
//             <p className="text-gray-700 max-w-3xl mx-auto text-sm sm:text-base md:text-lg px-2 sm:px-4">
//               {blogData.description}
//             </p>
//           </motion.div>

//           {/* Hero Image */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.7, delay: 0.2 }}
//             className="relative group w-full max-w-6xl mx-auto"
//           >
//             <div className="relative overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl">
//               <img
//                 src={blogData.hero.image}
//                 alt="Blogs by VPP School"
//                 className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover transform transition-transform duration-700 group-hover:scale-105"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
//               <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 md:bottom-10 md:left-10">
//                 <h2 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold max-w-2xl">
//                   {blogData.hero.title}
//                 </h2>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* ================= MAIN CONTENT ================= */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
//         {/* Category Filter */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className="mb-10 sm:mb-12 md:mb-16"
//         >
//           <h2 className="text-center text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-6 sm:mb-8">
//             Explore by Category
//           </h2>
//           <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
//             {blogData.categories.map((category) => (
//               <button
//                 key={category.id}
//                 onClick={() => handleCategoryChange(category)}
//                 className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-full font-medium text-sm sm:text-base transition-all duration-300 transform hover:scale-105 active:scale-95 ${
//                   selectedCategory.id === category.id
//                     ? "bg-gradient-to-r from-navy-600 to-blue-600 text-white shadow-lg shadow-blue-500/30"
//                     : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
//                 }`}
//               >
//                 {category.title}
//               </button>
//             ))}
//           </div>
//         </motion.div>

//         {/* Selected Category Info */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5 }}
//           className="text-center mb-10 sm:mb-12"
//         >
//           <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3">
//             {selectedCategory.title}
//           </h3>
//           <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
//             {selectedCategory.description}
//           </p>
//           <div className="h-1 w-20 sm:w-24 bg-gradient-to-r from-navy-600 via-blue-600 to-navy-600 mx-auto mt-4 rounded-full"></div>
//         </motion.div>

//         {/* Blog Grid */}
//         <div id="blog-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
//           {visibleBlogs.map((blog, index) => (
//             <motion.article
//               key={blog.id}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               viewport={{ once: true }}
//               whileHover={{ y: -10, transition: { duration: 0.2 } }}
//               className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100 group"
//             >
//               {/* Image Container */}
//               <div className="relative overflow-hidden h-48 sm:h-56 md:h-64">
//                 <img
//                   src={blog.image}
//                   alt={blog.title}
//                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                 />
//                 <div className="absolute top-4 left-4">
//                   <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-navy-700">
//                     {blog.category || selectedCategory.title}
//                   </span>
//                 </div>
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               </div>

//               {/* Content */}
//               <div className="p-5 sm:p-6">
//                 <div className="flex items-center gap-3 text-gray-500 text-xs sm:text-sm mb-3">
//                   <div className="flex items-center gap-1">
//                     <Calendar className="w-4 h-4" />
//                     <span>{blog.date}</span>
//                   </div>
//                   <div className="w-1 h-1 rounded-full bg-gray-300"></div>
//                   <span>{blog.readTime || "5 min read"}</span>
//                 </div>

//                 <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-navy-700 transition-colors duration-200">
//                   {blog.title}
//                 </h3>

//                 <p className="text-gray-600 text-sm sm:text-base mb-4 line-clamp-3">
//                   {blog.description}
//                 </p>

//                 <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//                   <button
//                     onClick={() => navigate(`${blog.path}`)}
//                     className="flex items-center gap-2 text-navy-600 hover:text-navy-800 font-medium text-sm sm:text-base group/readmore"
//                   >
//                     Read More
//                     <ArrowRight className="w-4 h-4 group-hover/readmore:translate-x-1 transition-transform duration-200" />
//                   </button>
//                   <div className="flex items-center gap-2">
//                     {blog.tags?.slice(0, 2).map((tag, idx) => (
//                       <span
//                         key={idx}
//                         className="px-2 py-1 bg-navy-50 text-navy-700 text-xs rounded-full"
//                       >
//                         {tag}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </motion.article>
//           ))}
//         </div>

//         {/* Load More Button */}
//         {visibleCount < selectedCategory.blogs.length && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5 }}
//             className="text-center mt-12 sm:mt-16"
//           >
//             <button
//               onClick={handleLoadMore}
//               className="px-8 py-3 sm:px-10 sm:py-4 bg-gradient-to-r from-navy-600 to-blue-600 text-white rounded-full font-medium text-sm sm:text-base hover:from-navy-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl shadow-blue-500/30"
//             >
//               Load More Articles
//             </button>
//             <p className="text-gray-500 text-sm mt-4">
//               Showing {visibleBlogs.length} of {selectedCategory.blogs.length} articles
//             </p>
//         </motion.div>
//         )}

//         {/* No Articles Message */}
//         {visibleBlogs.length === 0 && (
//           <div className="text-center py-12 sm:py-16">
//             <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-navy-100 rounded-full mb-4 sm:mb-6">
//               <Calendar className="w-8 h-8 sm:w-10 sm:h-10 text-navy-600" />
//             </div>
//             <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
//               No articles found
//             </h3>
//             <p className="text-gray-600 max-w-md mx-auto text-sm sm:text-base">
//               No articles available in this category. Check back soon for new content!
//             </p>
//           </div>
//         )}
//       </section>

//       {/* Footer Decoration */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
//         <motion.div
//           className="flex justify-center"
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//         >
//           <div className="flex items-center gap-4 text-navy-600">
//             <div className="w-8 h-px sm:w-12 md:w-16 bg-gradient-to-r from-transparent via-navy-400 to-transparent"></div>
//             <span className="text-xs sm:text-sm font-medium">
//               Stay Updated with Our Blog
//             </span>
//             <div className="w-8 h-px sm:w-12 md:w-16 bg-gradient-to-r from-transparent via-navy-400 to-transparent"></div>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default BlogPage;