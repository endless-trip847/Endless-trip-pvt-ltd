"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {} from "react";

import BasicInfoAndOverview from "./BasicInfoAndOverview";
import AddEditPackageAccordion from "./AddEditPackageAccordion";

/* ---------- INITIAL FORM STATE ---------- */

const INITIAL_FORM = {
  title: "",
  location: "",
  days: "",
  nights: "",
  adults: 2,
  price: "",
  rating: "4.5",
  packageType: "family",
  duration: "1-3 Days",
  badge: "None",
  destinationTags: "",
  overview: "",
  image_url: "",

  // Accordion-driven data
  itinerary: [],
  hotels: [],
  flights: [],
  visas: [],
  inclusions: [],
  exclusions: [],
  terms_conditions: "",
};

export default function AddEditPackage() {
  /* ---------- STATE ---------- */
  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const isEditMode = Boolean(id);

  useEffect(() => {
    if (!isEditMode) return;

    const loadPackage = async () => {
      try {
        setLoading(true);

        const res = await fetch(`/api/packages/${id}`);
        const json = await res.json();

        if (!json.success) throw new Error("Failed to load package");

        const {
          basic,
          itinerary,
          hotels,
          flights,
          visas,
          inclusions,
          exclusions,
        } = json.data;

        setForm({
          ...INITIAL_FORM,

          // Basic info
          title: basic.title || "",
          location: basic.location || "",
          days: basic.days || "",
          nights: basic.nights || "",
          adults: basic.adults || 2,
          price: basic.price || "",
          rating: basic.rating || "4.5",
          packageType: basic.package_type || "family",
          duration: basic.duration_category || "1-3 Days",
          badge: basic.badge || "None",
          destinationTags: basic.destination_type || "",
          overview: basic.description || "",
          image_url: basic.image_url || "",

          // Accordion data
          itinerary: itinerary || [],
          hotels: hotels || [],
          flights: (flights || []).map((f) => ({
            airline: f.airline || "",
            flightNumber: f.flight_number || "",
            from: f.departure_from || "",
            to: f.arrival_at || "",
            departureTime: f.departure_time || "",
            arrivalTime: f.arrival_time || "",
            flightClass: f.class || "",
            type: f.type || "",
            description: f.description || "",
          })),

          //flights: flights || [],
          visas: visas || [],
          inclusions: inclusions || [],
          exclusions: exclusions || [],
          terms_conditions: basic.terms_conditions || "",
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPackage();
  }, [id, isEditMode]);

  /* ---------- SUBMIT HANDLER ---------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setSuccess(false);

    // Basic validation
    if (!form.title || !form.location) {
      setError("Please fill all required fields.");
      return;
    }

    // create mode → image required
    if (!isEditMode && !imageFile) {
      setError("Image is required.");
      return;
    }

    setLoading(true);

    try {
      let imageUrl = form.image_url;

      if (imageFile) {
        const sigRes = await fetch("/api/cloudinary/signature");
        const sigData = await sigRes.json();

        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("api_key", sigData.apiKey);
        formData.append("timestamp", sigData.timestamp);
        formData.append("signature", sigData.signature);
        formData.append("folder", "packages");

        const uploadRes = await fetch(
          `https://api.cloudinary.com/v1_1/${sigData.cloudName}/image/upload`,
          { method: "POST", body: formData }
        );

        const uploadData = await uploadRes.json();
        if (!uploadData.secure_url) {
          throw new Error("Image upload failed");
        }

        imageUrl = uploadData.secure_url;
      }

      const flights = form.flights
        .filter((f) => f.airline || f.type)
        .map((f) => ({
          airline: f.airline,
          flight_number: f.flightNumber || null,
          departure_from: f.from || null,
          arrival_at: f.to || null,
          departure_time: f.departureTime || null,
          arrival_time: f.arrivalTime || null,
          class: f.flightClass || null,
          type: f.type,
          description: f.description || "",
        }));

      const payload = {
        basic: {
          title: form.title,
          description: form.overview,
          price: form.price,
          days: form.days,
          nights: form.nights,
          adults: form.adults,
          destination_type: form.destinationTags,
          duration_category: form.duration,
          package_type: form.packageType,
          rating: form.rating,
          badge: form.badge,
          image_url: imageUrl,
          location: form.location,
        },

        itinerary: form.itinerary,
        hotels: form.hotels,
        flights,
        visas: form.visas,
        inclusions: form.inclusions,
        exclusions: form.exclusions,
        terms_conditions: form.terms_conditions,
      };
      console.log(payload);
      const res = await fetch(
        isEditMode ? `/api/packages/${id}` : "/api/packages",
        {
          method: isEditMode ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to save package");
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ---------- RESET HANDLER ---------- */
  const resetForm = () => {
    if (!success && !window.confirm("Discard current package data?")) return;

    setForm(INITIAL_FORM);
    setError(null);
    setSuccess(false);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ---------- RENDER ---------- */
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow px-6 py-6"
    >
      <h2 className="text-lg font-semibold text-primary mb-6">
        {isEditMode ? "Edit Travel Package" : "Create New Travel Package"}
      </h2>

      {/* BASIC INFO + OVERVIEW */}
      <BasicInfoAndOverview
        form={form}
        setForm={setForm}
        setImageFile={setImageFile}
        isEditMode={isEditMode}
      />

      {/* ACCORDION SECTIONS */}
      <AddEditPackageAccordion form={form} setForm={setForm} />

      {/* FEEDBACK */}
      {error && <p className="text-red-600 text-sm mt-4">{error}</p>}

      {success && (
        <p className="text-green-600 text-sm mt-4">
          Package saved successfully. You can add another.
        </p>
      )}

      {/* ACTION BUTTONS */}
      <div className="flex justify-end gap-4 mt-8">
        {/* {!isEditMode && (
          <button
            type="button"
            onClick={resetForm}
            disabled={loading}
            className="
            px-6 py-3
            rounded-lg
            border border-gray-300
            text-gray-700
            hover:bg-gray-50
            disabled:opacity-50
          "
          >
            Add New Package
          </button>
        )} */}

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="
            bg-[#4b1d63]
            text-white
            px-6 py-3
            rounded-lg
            font-semibold
            shadow-md
            hover:shadow-lg
            hover:brightness-110
            disabled:opacity-60
          "
        >
          {isEditMode ? "Save Changes" : "Create New Travel Package"}
        </button>
      </div>
    </form>
  );
}
