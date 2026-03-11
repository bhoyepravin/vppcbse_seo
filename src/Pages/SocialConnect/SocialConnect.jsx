import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  QrCode,
  Download,
  Share2,
  Copy,
  Check,
  Smartphone,
} from "lucide-react";
import socialQrData from "../../constant/socialQrData/socialQrData";

const SocialConnect = () => {
  const navigate = useNavigate();
  const data = socialQrData;

  const [selectedQr, setSelectedQr] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(data.categories[0]);

  // Function to download QR code
  const downloadQRCode = (platform, qrUrl) => {
    const link = document.createElement("a");
    link.href = qrUrl;
    link.download = `${platform.title}-qr-code.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function to copy QR code link
  const copyQRCode = async (platform) => {
    // Extract the actual URL from QR code data parameter
    const qrUrl = platform.qrCode;
    try {
      await navigator.clipboard.writeText(qrUrl);
      setCopiedId(platform.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // Function to share QR code
  const shareQRCode = async (platform) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Scan ${platform.title} QR Code`,
          text: `Scan this QR code to ${platform.description}`,
          url: platform.qrCode,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      // Fallback to copy
      copyQRCode(platform);
    }
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
        </button> */}
        {/* <span>/</span> */}
        <span className="font-medium text-gray-500">Social QR Codes</span>
      </div>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl text-[#800000] md:text-4xl font-serif font-semibold text- mb-4">Social QR Codes</h1>
        <div className="w-20 h-1 bg-[#800000] mt-3 mb-4"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <p className="max-w-2xl text-gray-600">
            Scan these QR codes to quickly connect with us on various platforms
            and access our digital services.
          </p>
          <div className="flex items-center gap-4">
            {/* <div className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg font-medium flex items-center gap-2">
              <QrCode className="w-5 h-5" />
              <span className="font-bold">
                {data.categories.reduce(
                  (total, cat) => total + cat.platforms.length,
                  0
                )}
              </span>{" "}
              QR Codes
            </div> */}
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-purple-500" />
              <span className="text-sm text-gray-600">
                Scan with Phone Camera
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Instructions */}
      {/* <div className="mb-8 bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl border border-purple-100">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-purple-100 rounded-lg">
            <Smartphone className="w-8 h-8 text-purple-600" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-lg mb-2">
              How to Use QR Codes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="font-bold text-purple-600">1</span>
                </div>
                <p className="text-gray-600 text-sm">
                  Open camera on your phone
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="font-bold text-purple-600">2</span>
                </div>
                <p className="text-gray-600 text-sm">Point camera at QR code</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="font-bold text-purple-600">3</span>
                </div>
                <p className="text-gray-600 text-sm">
                  Tap notification to open link
                </p>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Category Selection */}
      {/* <div className="mb-10">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Select Category
        </h2>
        <div className="flex flex-wrap gap-3">
          {data.categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full font-medium transition ${
                selectedCategory.id === category.id
                  ? "bg-orange-400 text-white shadow"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.title}
              <span className="ml-2 text-sm opacity-80">
                ({category.platforms.length})
              </span>
            </button>
          ))}
        </div>
      </div> */}

      {/* Selected Category Details */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {selectedCategory.title}
        </h2>
        <p className="text-gray-600 mt-1">{selectedCategory.description}</p>
      </div>

      {/* QR Codes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {selectedCategory.platforms.map((platform) => (
          <div
            key={platform.id}
            className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
          >
            {/* Platform Header */}
           <div className="p-2 bg-[#194369]">


              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{platform.icon}</span>
                  <h3 className="font-bold text-white text-lg">
                    {platform.title}
                  </h3>
                </div>
              </div>
            </div>

            {/* QR Code Display */}
            <div className="p-6 flex flex-col items-center">
              <div className="relative mb-4">
                <img
                  src={platform.qrCode}
                  alt={`${platform.title} QR Code`}
                  className="w-48 h-48 object-contain rounded-lg border-4 border-white shadow-lg"
                  onClick={() => setSelectedQr(platform)}
                />
                <div
                  className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition duration-300 rounded-lg cursor-pointer"
                  onClick={() => setSelectedQr(platform)}
                />
              </div>

              <p className="text-gray-600 text-center text-sm mb-6">
                {platform.description}
              </p>

              {/* Action Buttons */}
              {/* <div className="flex items-center justify-center gap-2 w-full">
                <button
                  onClick={() => downloadQRCode(platform, platform.qrCode)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium"
                >
                  <Download className="w-4 h-4" />
                  Save
                </button>
                <button
                  onClick={() => shareQRCode(platform)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                <button
                  onClick={() => copyQRCode(platform)}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition text-sm font-medium ${
                    copiedId === platform.id
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {copiedId === platform.id ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </button>
              </div> */}
            </div>
          </div>
        ))}
      </div>

      {/* QR Code Modal */}
      {selectedQr && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative max-w-md w-full bg-white rounded-xl overflow-hidden">
            <button
              onClick={() => setSelectedQr(null)}
              className="absolute top-4 right-4 z-10 bg-black/70 text-white p-2 rounded-full hover:bg-black/90 transition"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className={`p-6 ${getColorClass(selectedQr.color, "bg")}`}>
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="text-3xl">{selectedQr.icon}</span>
                <h3 className="text-2xl font-bold text-white">
                  {selectedQr.title}
                </h3>
              </div>
            </div>

            <div className="p-8 flex flex-col items-center">
              <img
                src={selectedQr.qrCode}
                alt={`${selectedQr.title} QR Code`}
                className="w-64 h-64 object-contain mb-6 rounded-lg"
              />

              <p className="text-gray-600 text-center mb-6">
                {selectedQr.description}
              </p>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => downloadQRCode(selectedQr, selectedQr.qrCode)}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download QR
                </button>
                <button
                  onClick={() => copyQRCode(selectedQr)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition flex items-center gap-2"
                >
                  {copiedId === selectedQr.id ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy Link
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function for color classes
const getColorClass = (color, type = "bg") => {
  const colorMap = {
    green: {
      bg: "bg-[#194369]",
      text: "text-green-600",
      light: "bg-green-50",
    },
    blue: {
      bg: "bg-blue-600",
      text: "text-blue-600",
      light: "bg-blue-50",
    },
    red: {
      bg: "bg-red-600",
      text: "text-red-600",
      light: "bg-red-50",
    },
    pink: {
      bg: "bg-pink-600",
      text: "text-pink-600",
      light: "bg-pink-50",
    },
    purple: {
      bg: "bg-purple-600",
      text: "text-purple-600",
      light: "bg-purple-50",
    },
    orange: {
      bg: "bg-orange-600",
      text: "text-orange-600",
      light: "bg-orange-50",
    },
    teal: {
      bg: "bg-[#194369]",
      text: "text-teal-600",
      light: "bg-teal-50",
    },
  };

  return colorMap[color]?.[type] || colorMap.blue[type];
};

export default SocialConnect;
