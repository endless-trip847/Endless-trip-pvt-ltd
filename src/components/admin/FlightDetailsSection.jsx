"use client";

export default function FlightDetailsSection({ value = [], onChange }) {
  const flights = value;

  const addFlight = () => {
    onChange([
      ...flights,
      {
        airline: "",
        flightNumber: "",
        from: "",
        to: "",
        departureTime: "",
        arrivalTime: "",
        flightClass: "",
        type: "",
        description: "",
      },
    ]);
  };

  const removeFlight = (index) => {
    onChange(flights.filter((_, i) => i !== index));
  };

  const update = (index, key, value) => {
    const next = [...flights];
    next[index] = { ...next[index], [key]: value };
    onChange(next);
  };

  return (
    <>
      <div className="max-h-[420px] overflow-y-auto pr-2 space-y-4">
        {flights.map((f, index) => (
          <div
            key={index}
            className="relative border border-gray-200 rounded-lg p-4 bg-gray-50"
          >
            {/* Remove Button */}
            <button
              type="button"
              onClick={() => removeFlight(index)}
              className="absolute top-3 right-3 bg-red-500 text-white w-7 h-7 rounded-md hover:bg-red-600"
            >
              ✕
            </button>

            <p className="font-semibold text-primary mb-4">
              Flight {index + 1}
            </p>

            {/* Airline & Flight Number */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Airline
                </label>
                <input
                  className="input bg-white"
                  placeholder="e.g. IndiGo"
                  value={f.airline}
                  onChange={(e) => update(index, "airline", e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Flight Number
                </label>
                <input
                  className="input bg-white"
                  placeholder="e.g. 6E 123"
                  value={f.flightNumber}
                  onChange={(e) =>
                    update(index, "flightNumber", e.target.value)
                  }
                />
              </div>
            </div>

            {/* From & To */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Departure From
                </label>
                <input
                  className="input bg-white"
                  placeholder="BOM"
                  value={f.from}
                  onChange={(e) => update(index, "from", e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Arrival At
                </label>
                <input
                  className="input bg-white"
                  placeholder="GOI"
                  value={f.to}
                  onChange={(e) => update(index, "to", e.target.value)}
                />
              </div>
            </div>

            {/* Time & Class */}
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Departure Time
                </label>
                <input
                  type="time"
                  className="input bg-white"
                  value={f.departureTime}
                  onChange={(e) =>
                    update(index, "departureTime", e.target.value)
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Arrival Time
                </label>
                <input
                  type="time"
                  className="input bg-white"
                  value={f.arrivalTime}
                  onChange={(e) => update(index, "arrivalTime", e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Flight Class
                </label>
                <select
                  className="input bg-white"
                  value={f.flightClass}
                  onChange={(e) => update(index, "flightClass", e.target.value)}
                >
                  <option value="">Select Class</option>
                  <option>Economy</option>
                  <option>Business</option>
                  <option>First</option>
                </select>
              </div>
            </div>

            {/* Flight Type */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Flight Type
              </label>
              <select
                className="input bg-white"
                value={f.type}
                onChange={(e) => update(index, "type", e.target.value)}
              >
                <option value="">Select Type</option>
                <option value="arrival">Arrival</option>
                <option value="departure">Departure</option>
                <option value="internal">Internal</option>
              </select>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                rows={2}
                className="input resize-none bg-white"
                placeholder="Any specific notes"
                value={f.description}
                onChange={(e) => update(index, "description", e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Add Flight */}
      <button
        type="button"
        onClick={addFlight}
        className="mt-4 inline-flex items-center gap-2 border border-blue-500 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50"
      >
        ➕ Add Flight
      </button>
    </>
  );
}
