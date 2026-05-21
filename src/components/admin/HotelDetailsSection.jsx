"use client";

export default function HotelDetailsSection({ value = [], onChange }) {
  const hotels = value.length
    ? value
    : [
        {
          hotel_name: "",
          city: "",
          nights: 0,
          star_rating: 0,
          description: "",
        },
      ];

  const updateHotel = (index, key, val) => {
    const updated = [...hotels];
    updated[index] = { ...updated[index], [key]: val };
    onChange(updated);
  };

  const addHotel = () => {
    onChange([
      ...hotels,
      {
        hotel_name: "",
        city: "",
        nights: 0,
        star_rating: 0,
        description: "",
      },
    ]);
  };

  const removeHotel = (index) => {
    const updated = hotels.filter((_, i) => i !== index);
    onChange(updated.length ? updated : []);
  };

  return (
    <div className="max-h-[420px] overflow-y-auto pr-2 space-y-6">
      {hotels.map((hotel, index) => (
        <div key={index} className="border rounded-xl p-4 bg-gray-50 relative">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-semibold text-primary">Hotel {index + 1}</h4>

            {hotels.length > 1 && (
              <button
                type="button"
                onClick={() => removeHotel(index)}
                className="absolute top-3 right-3 bg-red-500 text-white w-7 h-7 rounded-md hover:bg-red-600"
              >
                ✕
              </button>
            )}
          </div>

          {/* Fields */}
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="">
              <label className="form-label ">Hotel Name</label>
              <input
                placeholder="e.g., Grand Hyatt"
                className="input bg-white"
                value={hotel.hotel_name}
                onChange={(e) =>
                  updateHotel(index, "hotel_name", e.target.value)
                }
              />
            </div>

            <div>
              <label className="form-label">City</label>
              <input
                placeholder="e.g., Singapore"
                className="input bg-white"
                value={hotel.city}
                onChange={(e) => updateHotel(index, "city", e.target.value)}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="form-label">Nights</label>
              <input
                type="number"
                min="0"
                className="input bg-white"
                value={hotel.nights}
                onChange={(e) =>
                  updateHotel(index, "nights", Number(e.target.value))
                }
              />
            </div>

            <div>
              <label className="form-label">Star Rating</label>
              <input
                type="number"
                min="0"
                max="5"
                step="0.5"
                className="input bg-white "
                value={hotel.star_rating}
                onChange={(e) =>
                  updateHotel(index, "star_rating", Number(e.target.value))
                }
              />
            </div>
          </div>

          <div>
            <label className="form-label">Description</label>
            <textarea
              placeholder="Brief description of the hotel"
              rows={3}
              className="input resize-none bg-white"
              value={hotel.description}
              onChange={(e) =>
                updateHotel(index, "description", e.target.value)
              }
            />
          </div>
        </div>
      ))}

      {/* Add Hotel */}
      <button
        type="button"
        onClick={addHotel}
        className="mt-4 inline-flex items-center gap-2 border border-blue-500 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50"
      >
        ➕ Add Hotel
      </button>
    </div>
  );
}
