"use client";

import { useState } from "react";

export default function RequestItem({
  data,
  isOpen,
  onToggle,
  isLast,
  onStatusUpdated,
}) {
  const STATUS_STYLES = {
    pending: "bg-yellow-400 text-black",
    approved: "bg-green-500 text-white",
    rejected: "bg-red-500 text-white",
  };

  const [currentStatus, setCurrentStatus] = useState(data.status);
  const [selectedStatus, setSelectedStatus] = useState(data.status);

  const [loading, setLoading] = useState(false);

  return (
    <div className={!isLast ? "border-b border-gray-200" : ""}>
      {/* HEADER ROW */}
      <div
        onClick={onToggle}
        className={`
          flex justify-between items-center cursor-pointer
          px-6 py-4 transition-colors duration-200
          ${
            isOpen
              ? "bg-gray-50 border-l-4 border-blue-400"
              : "hover:bg-gray-50"
          }
        `}
      >
        <div className="font-semibold text-gray-800">
          Request from <span className="text-primary">{data.name}</span> for{" "}
          <span className="font-bold">{data.destination}</span>
        </div>

        <div className="flex items-center gap-4">
          <span
            className={`px-3 py-1 text-sm rounded-full capitalize ${STATUS_STYLES[currentStatus]}`}
          >
            {currentStatus}
          </span>

          <span className="text-sm text-gray-500">
            {new Date(data.request_date).toLocaleString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>

          {/* Chevron */}
          <span
            className={`
              text-xl transition-transform duration-300 ease-out
              ${isOpen ? "rotate-180" : "rotate-0"}
            `}
          >
            ⌄
          </span>
        </div>
      </div>

      {/* EXPANDABLE CONTENT */}
      <div
        className={`
          overflow-hidden
          transition-[max-height] duration-550 ease-out
          ${isOpen ? "max-h-[1400px]" : "max-h-0"}
        `}
      >
        <div
          className={`
            px-6 py-5 grid md:grid-cols-2 gap-6 bg-white
            transition-opacity duration-300 ease-out
            ${isOpen ? "opacity-100 delay-200" : "opacity-0"}
          `}
        >
          {/* LEFT */}
          <div className="space-y-2">
            <p>
              <strong>Contact Name:</strong> {data.name}
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a className="text-blue-600 underline">{data.email}</a>
            </p>
            <p>
              <strong>Phone:</strong>{" "}
              <a className="text-blue-600 underline">{data.phone}</a>
            </p>
          </div>

          {/* RIGHT */}
          <div className="space-y-2">
            <p>
              <strong>Destination:</strong> {data.destination}
            </p>
            <p>
              <strong>Travel Date:</strong>{" "}
              {new Date(data.travel_date).toLocaleString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
            <p>
              <strong>Travelers:</strong> {data.travelers}
            </p>
            <p>
              <strong>Budget:</strong> {data.budget}
            </p>
          </div>

          {/* DIVIDER BETWEEN DETAILS & MESSAGE */}
          <div className="md:col-span-2 h-px bg-gray-200" />

          {/* MESSAGE */}
          <div className="md:col-span-2">
            <p className="font-semibold mb-1">Message:</p>
            <p className="italic text-gray-600">{data.message}</p>
          </div>

          {/* DIVIDER BETWEEN MESSAGE & ACTION (NEW) */}
          <div className="md:col-span-2 h-px bg-gray-200" />

          {/* ACTION */}
          <div className="md:col-span-2 flex justify-end gap-3">
            <label className="flex items-center gap-2">
              <span className="font-semibold">Action:</span>
              <select
                className="border rounded px-3 py-2"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                disabled={loading}
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </label>

            <button
              disabled={loading}
              onClick={async () => {
                try {
                  setLoading(true);

                  const res = await fetch(`/api/custom-requests/${data.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ status: selectedStatus }),
                  });

                  if (!res.ok) throw new Error("Update failed");

                  // ✅ update UI ONLY after success
                  setCurrentStatus(selectedStatus);
                  onStatusUpdated?.(data.id, selectedStatus);
                } catch {
                  alert("Failed to update status");
                } finally {
                  setLoading(false);
                }
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-60"
            >
              {loading ? "Updating..." : "Update Status"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
