"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    destination: "",
    travelDates: "",
    travelers: "",
    budget: "",
    details: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/custom-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          destination: formData.destination,
          travel_date: formData.travelDates,
          travelers: formData.travelers,
          budget: formData.budget,
          message: formData.details,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setSuccess(true);

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        destination: "",
        travelDates: "",
        travelers: "",
        budget: "",
        details: "",
      });

      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error(error);
      alert("Failed to submit request. Please try again.");
    }
  };

  const inputClass =
    "w-full px-5 py-4 text-[#6C757D] placeholder-[#6C757D] bg-white border border-[#6C757D] rounded-lg outline-none transition focus:border-[#421C58]";

  return (
    <section
      id="ContactForm"
      className="min-h-screen bg-gray-50 py-12 sm:py-16 px-4 font-sans"
    >
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12"
        >
          <h2 className="hidden sm:block text-4xl md:text-5xl lg:text-[60px] font-bold text-[#2C3E50] mb-4">
            Request A Custom Package
          </h2>
          <h2 className="block sm:hidden text-3xl font-bold text-[#2C3E50] mb-4">
            <span className="block">Request A</span>
            <span className="block">Custom Package</span>
          </h2>
          <div className="w-30 h-1 bg-[#421C58] mx-auto"></div>
        </motion.div>

        {/* FORM CARD */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-xl shadow-lg p-6 sm:p-8 lg:p-12"
        >
          <h3 className="text-[28px] sm:text-[32px] font-bold text-[#421C58] mb-6">
            Your Travel Details
            <div className="w-20 h-1 bg-orange-600 mt-2"></div>
          </h3>

          {success && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-600 font-semibold text-center mb-6"
            >
              Data submitted successfully ✅
            </motion.p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder="Your Full Name"
                className={inputClass}
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Your Email Address"
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number (Optional)"
                className={inputClass}
              />
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                placeholder="Preferred Destination(s)"
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <input
                type="date"
                name="travelDates"
                value={formData.travelDates}
                onChange={handleChange}
                placeholder="Preferred Travel Dates"
                className={inputClass}
              />
              <input
                type="number"
                name="travelers"
                value={formData.travelers}
                onChange={handleChange}
                placeholder="Number of Travelers"
                className={inputClass}
              />
            </div>

            <select
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              required
              className={inputClass}
            >
              <option value="">Select Estimated Budget Per Person</option>
              <option value="Under ₹50,000">Under ₹50,000</option>
              <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
              <option value="₹1,00,000 - ₹2,00,000">
                ₹1,00,000 - ₹2,00,000
              </option>
              <option value="₹2,00,000+">₹2,00,000+</option>
              <option value="Flexible">Flexible</option>
            </select>

            <textarea
              name="details"
              rows={6}
              value={formData.details}
              onChange={handleChange}
              placeholder="Tell us more about your ideal trip..."
              className={inputClass}
            />

            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full sm:w-auto px-10 py-4 bg-[#FD8513]
                hover:bg-orange-500 text-white font-semibold rounded-full transition"
              >
                Submit Request
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
