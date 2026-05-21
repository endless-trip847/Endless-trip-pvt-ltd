"use client";

export default function VisaDetailsSection({ visas = [], onChange }) {
  /* ---------- ADD ---------- */
  const addVisa = () => {
    onChange([
      ...visas,
      {
        country: "",
        visa_type: "",
        requirements: "",
        processing_time: "",
        fee: "",
        description: "",
      },
    ]);
  };

  /* ---------- REMOVE ---------- */
  const removeVisa = (index) => {
    onChange(visas.filter((_, i) => i !== index));
  };

  /* ---------- UPDATE ---------- */
  const update = (index, key, value) => {
    const next = [...visas];
    next[index] = { ...next[index], [key]: value };
    onChange(next);
  };

  return (
    <>
      <div className="max-h-[420px] overflow-y-auto pr-2 space-y-4">
        {visas.map((v, index) => (
          <div
            key={index}
            className="relative border border-gray-200 rounded-lg p-4 bg-gray-50"
          >
            {/* REMOVE */}
            <button
              type="button"
              onClick={() => removeVisa(index)}
              className="absolute top-3 right-3 bg-red-500 text-white w-7 h-7 rounded-md hover:bg-red-600"
            >
              ✕
            </button>

            <p className="font-semibold text-primary mb-4">Visa {index + 1}</p>

            {/* Country & Visa Type */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <input
                  className="input bg-white"
                  placeholder="e.g. Thailand"
                  value={v.country}
                  onChange={(e) => update(index, "country", e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Visa Type
                </label>
                <input
                  className="input bg-white"
                  placeholder="Tourist / Business"
                  value={v.visa_type}
                  onChange={(e) => update(index, "visa_type", e.target.value)}
                />
              </div>
            </div>

            {/* Requirements */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Requirements
              </label>
              <textarea
                rows={2}
                className="input resize-none bg-white"
                placeholder="Passport, photos, bank statement..."
                value={v.requirements}
                onChange={(e) => update(index, "requirements", e.target.value)}
              />
            </div>

            {/* Processing Time & Fee */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Processing Time
                </label>
                <input
                  className="input bg-white"
                  placeholder="e.g. 5–7 days"
                  value={v.processing_time}
                  onChange={(e) =>
                    update(index, "processing_time", e.target.value)
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Visa Fee (₹)
                </label>
                <input
                  type="number"
                  className="input bg-white"
                  placeholder="Amount in INR"
                  value={v.fee}
                  onChange={(e) => update(index, "fee", e.target.value)}
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Notes
              </label>
              <textarea
                rows={2}
                className="input resize-none bg-white"
                placeholder="Any special conditions"
                value={v.description}
                onChange={(e) => update(index, "description", e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Add Visa */}
      <button
        type="button"
        onClick={addVisa}
        className="mt-4 inline-flex items-center gap-2 border border-blue-500 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50"
      >
        ➕ Add Visa Detail
      </button>
    </>
  );
}
