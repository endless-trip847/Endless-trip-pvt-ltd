"use client";

import { useState } from "react";

const domesticLocations = [
  "Agra", "Goa", "Kerala", "Manali, India", "Rajasthan, India", "Shimla, India",
];

const internationalLocations = [
  "Dubai", "Bali", "Thailand", "Singapore", "Maldives", "Europe",
];

export default function AdminPackagesPage() {
  const [form, setForm] = useState({
    title: "",
    location_name: "",
    days: "",
    nights: "",
    adults: 2,
    price: "",
    rating: "4.5",
    package_type: "family",
    duration_category: "medium",
    badge: "",
    destination_type: "",
    description: "",
    image: null,
  });

  function handleChange(e) {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const fd = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null) fd.append(key, value);
    });

    const res = await fetch("/api/admin/packages", {
      method: "POST",
      body: fd,
    });

    const data = await res.json();
    if (data.success) {
      alert("Package added successfully");
    } else {
      alert(data.error || "Something went wrong");
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-semibold mb-6 text-[#421c58]">
        Create New Travel Package
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* ================= BASIC INFORMATION ================= */}
        <section>
          <h2 className="text-lg font-semibold border-b pb-2 mb-4 text-[#421c58]">
            Basic Information
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="title"
              placeholder="Package Title"
              className="border rounded px-4 py-2"
              required
              onChange={handleChange}
            />

            <select
              name="location_name"
              className="border rounded px-4 py-2"
              required
              onChange={handleChange}
            >
              <option value="">Select Location</option>
              <optgroup label="Domestic">
                {domesticLocations.map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </optgroup>
              <optgroup label="International">
                {internationalLocations.map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </optgroup>
            </select>
          </div>

          <div className="grid md:grid-cols-5 gap-4 mt-4">
            <input name="days" type="number" placeholder="Days" className="border px-3 py-2 rounded" onChange={handleChange} />
            <input name="nights" type="number" placeholder="Nights" className="border px-3 py-2 rounded" onChange={handleChange} />
            <input name="adults" type="number" placeholder="Adults" className="border px-3 py-2 rounded" onChange={handleChange} />
            <input name="price" type="number" placeholder="Price ₹" className="border px-3 py-2 rounded" onChange={handleChange} />
            <input name="rating" type="number" step="0.1" max="5" placeholder="Rating" className="border px-3 py-2 rounded" onChange={handleChange} />
          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <select name="package_type" className="border px-3 py-2 rounded" onChange={handleChange}>
              {["family", "honeymoon", "adventure", "luxury", "budget"].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>

            <select name="duration_category" className="border px-3 py-2 rounded" onChange={handleChange}>
              <option value="short">1–3 Days</option>
              <option value="medium">4–7 Days</option>
              <option value="long">8–14 Days</option>
              <option value="extended">15+ Days</option>
            </select>

            <select name="badge" className="border px-3 py-2 rounded" onChange={handleChange}>
              <option value="">No Badge</option>
              <option>Bestseller</option>
              <option>Featured</option>
              <option>Special Offer</option>
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <input
              name="destination_type"
              placeholder="Destination Type (Beach, Mountain)"
              className="border px-4 py-2 rounded"
              onChange={handleChange}
            />

            <input
              type="file"
              name="image"
              accept="image/*"
              className="border px-4 py-2 rounded"
              onChange={handleChange}
              required
            />
          </div>
        </section>

        {/* ================= OVERVIEW ================= */}
        <section>
          <h2 className="text-lg font-semibold border-b pb-2 mb-4 text-[#421c58]">
            Package Overview
          </h2>

          <textarea
            name="description"
            rows="4"
            className="w-full border px-4 py-3 rounded"
            placeholder="Detailed description of the package"
            onChange={handleChange}
          />
        </section>

        <button
          type="submit"
          className="bg-[#421c58] text-white px-8 py-3 rounded hover:bg-[#5a277d]"
        >
          Add New Package
        </button>
      </form>
    </div>
  );
}
