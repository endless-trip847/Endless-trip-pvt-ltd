"use client";

import { useEffect } from "react";

export default function ItinerarySection({ days, value = [], onChange }) {
  /* -------------------------------------------------------
     Sync itinerary length with days
     ------------------------------------------------------- */
  useEffect(() => {
    const totalDays = Number(days);

    // Guard
    if (!totalDays || totalDays < 1) {
      if (value.length !== 0) onChange([]);
      return;
    }

    // Build correct-length itinerary WITHOUT infinite loop
    if (value.length !== totalDays) {
      const updated = Array.from({ length: totalDays }, (_, i) => {
        return (
          value[i] || {
            day_number: i + 1,
            title: "",
            description: "",
          }
        );
      });

      onChange(updated);
    }
  }, [days]); // ⚠️ ONLY depend on days (critical)

  /* -------------------------------------------------------
     Update helpers
     ------------------------------------------------------- */
  const updateDay = (index, field, fieldValue) => {
    const updated = [...value];
    updated[index] = {
      ...updated[index],
      [field]: fieldValue,
    };
    onChange(updated);
  };

  /* -------------------------------------------------------
     UI
     ------------------------------------------------------- */
  return (
    <div
      className="
        max-h-[520px]
        overflow-y-auto
        pr-2
        space-y-4
      "
    >
      {value.map((day, index) => (
        <div
          key={index}
          className="
            bg-gray-50
            border
            border-gray-200
            rounded-xl
            p-4
          "
        >
          {/* HEADER */}
          <div className="font-semibold text-gray-800 mb-3">
            Day {index + 1}
          </div>

          {/* TITLE */}
          <input
            type="text"
            placeholder="e.g., Arrival & City Tour"
            className="input mb-3 bg-white"
            value={day.title}
            onChange={(e) => updateDay(index, "title", e.target.value)}
          />

          {/* DESCRIPTION */}
          <textarea
            rows={3}
            placeholder={`Describe the activities for Day ${index + 1}`}
            className="input w-full resize-none bg-white"
            value={day.description}
            onChange={(e) => updateDay(index, "description", e.target.value)}
          />
        </div>
      ))}

      {value.length === 0 && (
        <p className="text-sm text-gray-500">
          Enter number of days to build itinerary.
        </p>
      )}
    </div>
  );
}
