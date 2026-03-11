import React, { useState } from "react";
import { X } from "lucide-react";

const statesWithDistricts = {
  Maharashtra: ["Nashik", "Pune", "Mumbai", "Nagpur"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
  Karnataka: ["Bengaluru", "Mysuru"],
};

const InquiryModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    state: "",
    district: "",
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";

    if (!/^[6-9]\d{9}$/.test(formData.mobile))
      newErrors.mobile = "Enter valid 10-digit mobile number";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Enter valid email address";

    if (!formData.address.trim()) newErrors.address = "Address is required";

    if (!formData.state) newErrors.state = "State is required";

    if (!formData.district) newErrors.district = "District is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    console.log("Inquiry Submitted:", formData);
    alert("Inquiry submitted successfully!");
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 backdrop-blur-sm z-40" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl w-full max-w-lg shadow-lg relative">
          {/* Header */}
          <div className="bg-[#B25344] text-white px-6 py-4 rounded-t-xl flex justify-between items-center">
            <h2 className="text-lg font-semibold">Inquiry Form</h2>
            <button onClick={onClose}>
              <X size={20} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Name */}
            <div>
              <label className="text-sm font-medium">Name</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 mt-1"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name}</p>
              )}
            </div>

            {/* Mobile */}
            <div>
              <label className="text-sm font-medium">Mobile</label>
              <input
                type="tel"
                maxLength={10}
                className="w-full border rounded px-3 py-2 mt-1"
                value={formData.mobile}
                onChange={(e) =>
                  setFormData({ ...formData, mobile: e.target.value })
                }
              />
              {errors.mobile && (
                <p className="text-red-500 text-xs">{errors.mobile}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full border rounded px-3 py-2 mt-1"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="text-sm font-medium">Address</label>
              <textarea
                rows="2"
                className="w-full border rounded px-3 py-2 mt-1"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
              {errors.address && (
                <p className="text-red-500 text-xs">{errors.address}</p>
              )}
            </div>

            {/* State */}
            <div>
              <label className="text-sm font-medium">State</label>
              <select
                className="w-full border rounded px-3 py-2 mt-1"
                value={formData.state}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    state: e.target.value,
                    district: "",
                  })
                }
              >
                <option value="">Select State</option>
                {Object.keys(statesWithDistricts).map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              {errors.state && (
                <p className="text-red-500 text-xs">{errors.state}</p>
              )}
            </div>

            {/* District */}
            <div>
              <label className="text-sm font-medium">District</label>
              <select
                className="w-full border rounded px-3 py-2 mt-1"
                value={formData.district}
                onChange={(e) =>
                  setFormData({ ...formData, district: e.target.value })
                }
                disabled={!formData.state}
              >
                <option value="">Select District</option>
                {formData.state &&
                  statesWithDistricts[formData.state].map((dist) => (
                    <option key={dist} value={dist}>
                      {dist}
                    </option>
                  ))}
              </select>
              {errors.district && (
                <p className="text-red-500 text-xs">{errors.district}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#B25344] text-white py-2 rounded hover:bg-[#021A5E] transition"
            >
              Submit Inquiry
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default InquiryModal;
