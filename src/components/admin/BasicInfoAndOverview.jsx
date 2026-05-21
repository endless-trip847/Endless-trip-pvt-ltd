"use client";

import { useState, useEffect } from "react";

/* ---------- DATA ---------- */

const DOMESTIC_LOCATIONS = [
  "Agra",
  "Andaman & Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kashmir, India",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Leh-Ladakh",
  "Madhya Pradesh",
  "Maharashtra",
  "Manali, India",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Ooty",
  "Puducherry",
  "Punjab",
  "Rajasthan, India",
  "Rishikesh",
  "Shimla, India",
  "Sikkim",
  "Sikkim Darjeeling, India",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "Varanasi",
  "West Bengal",
];

const INTERNATIONAL_LOCATIONS = [
  "America",
  "Australia",
  "Baku",
  "Bali",
  "Dubai",
  "Egypt",
  "England & Scotland",
  "Europe",
  "Hong Kong",
  "Hong Kong & Macau",
  "Japan",
  "Macau",
  "Malaysia",
  "Maldives",
  "Nepal",
  "New Zealand",
  "Northern Lights",
  "Paris",
  "Paris, England & Scotland",
  "Pattaya",
  "Philippines",
  "Prague & Budapest",
  "Singapore",
  "Singapore & Malaysia",
  "South Africa",
  "Sri Lanka",
  "Switzerland and Paris",
  "Thailand",
  "Turkey",
  "Vietnam",
];

const PACKAGE_TYPES = [
  "family",
  "honeymoon",
  "adventure",
  "luxury",
  "budget",
  "cultural",
];
const DURATION_CATEGORIES = ["1-3 Days", "4-7 Days", "8-14 Days", "15+ Days"];
const BADGES = ["None", "Bestseller", "Featured", "Special Offer"];

export default function BasicInfoAndOverview({
  form,
  setForm,
  setImageFile,
  isEditMode,
}) {
  const [uploading, setUploading] = useState(false);

  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (form.image_url) {
      setPreview(form.image_url);
    }
  }, [form.image_url]);

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  /* ---------- CLOUDINARY UPLOAD ---------- */

  return (
    <>
      {/* ---------------- BASIC INFORMATION ---------------- */}
      <section className="mb-10">
        <h3 className="text-primary font-semibold text-lg mb-1">
          Basic Information
        </h3>
        <div className="w-20 h-[2px] bg-orange-500 mb-6" />

        {/* Row 1 */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="form-label">Package Title</label>
            <input
              placeholder=""
              className="input"
              required
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
            />
          </div>

          <div>
            <label className="form-label">Location Name</label>
            <select
              className="input"
              required
              value={form.location}
              onChange={(e) => update("location", e.target.value)}
            >
              <option value="">Select location</option>
              <optgroup label="Domestic">
                {DOMESTIC_LOCATIONS.map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </optgroup>
              <optgroup label="International">
                {INTERNATIONAL_LOCATIONS.map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </optgroup>
            </select>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid md:grid-cols-5 gap-6 mb-6">
          <div>
            <label className="form-label">Days</label>
            <input
              type="number"
              min="1"
              required
              className="input"
              value={form.days}
              onChange={(e) => update("days", Number(e.target.value))}
            />
          </div>

          <div>
            <label className="form-label">Nights</label>
            <input
              type="number"
              required
              min="0"
              className="input"
              value={form.nights}
              onChange={(e) => update("nights", Number(e.target.value))}
            />
          </div>

          <div>
            <label className="form-label">Adults</label>
            <input
              type="number"
              min="1"
              required
              className="input"
              value={form.adults}
              onChange={(e) => update("adults", Number(e.target.value))}
            />
          </div>

          <div>
            <label className="form-label">Price (₹)</label>
            <input
              type="number"
              min="0"
              required
              className="input"
              value={form.price}
              onChange={(e) => update("price", Number(e.target.value))}
            />
          </div>

          <div>
            <label className="form-label">Rating</label>
            <input
              type="number"
              step="0.1"
              max="5"
              min="0"
              required
              className="input"
              value={form.rating}
              onChange={(e) => update("rating", e.target.value)}
            />
          </div>
        </div>

        {/* Row 3 */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="form-label">Package Type</label>
            <select
              className="input"
              required
              value={form.packageType}
              onChange={(e) => update("packageType", e.target.value)}
            >
              {PACKAGE_TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="form-label">Duration Category</label>
            <select
              className="input"
              required
              value={form.duration}
              onChange={(e) => update("duration", e.target.value)}
            >
              {DURATION_CATEGORIES.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="form-label">Badge</label>
            <select
              className="input"
              required
              value={form.badge}
              onChange={(e) => update("badge", e.target.value)}
            >
              {BADGES.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 4 */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="form-label">Destination Tags</label>
            <input
              placeholder="e.g., Beach, Mountain, Cultural"
              className="input"
              value={form.destinationTags}
              onChange={(e) => update("destinationTags", e.target.value)}
            />
          </div>

          <div>
            <label className="form-label">Package Image</label>
            <input
              type="file"
              accept="image/*"
              className="input"
              required={!isEditMode}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                setImageFile(file);
                setPreview(URL.createObjectURL(file)); // 👈 preview only
              }}
            />

            {uploading && (
              <p className="text-sm text-orange-500 mt-1">Uploading…</p>
            )}
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-3 h-32 rounded-lg border object-cover"
              />
            )}
          </div>
        </div>
      </section>

      {/* ---------------- PACKAGE OVERVIEW ---------------- */}
      <section className="mb-10">
        <h3 className="text-primary font-semibold text-lg mb-1">
          Package Overview
        </h3>
        <div className="w-20 h-[2px] bg-orange-500 mb-6" />

        <textarea
          placeholder="A detailed and attractive overview of the package."
          rows={4}
          className="input w-full resize-none"
          value={form.overview}
          onChange={(e) => update("overview", e.target.value)}
        />
      </section>
    </>
  );
}
