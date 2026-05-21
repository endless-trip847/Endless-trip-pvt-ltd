"use client";

export default function TermsConditionsSection({ value, onChange }) {
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Package Specific Terms & Conditions
      </label>

      <textarea
        rows={6}
        className="input w-full resize-none"
        placeholder="Enter specific terms and conditions for this package."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
