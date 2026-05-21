"use client";

import { useEffect, useState } from "react";
import RequestItem from "./RequestItem";

export default function RequestsPanel() {
  const [requests, setRequests] = useState([]);
  const [openId, setOpenId] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ---------- FETCH REQUESTS ---------- */
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch("/api/custom-requests");
        const json = await res.json();

        if (!res.ok) throw new Error("Failed to load requests");

        // sort newest first
        const sorted = json.data.sort(
          (a, b) => new Date(b.request_date) - new Date(a.request_date)
        );

        setRequests(sorted);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  /* ---------- STATUS UPDATE CALLBACK ---------- */
  const handleStatusUpdate = (id, status) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow px-6 py-6">
        <p className="text-gray-500">Loading requests…</p>
      </div>
    );
  }

  return (
    /* OUTER PANEL */
    <div className="bg-white rounded-2xl shadow px-6 py-6">
      {/* Panel Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-primary">
          Custom Package Requests
        </h2>

        {/* STATUS LEGEND */}
        <div className="flex gap-2">
          <span className="px-3 py-1 rounded-full text-sm bg-yellow-400">
            Pending
          </span>
          <span className="px-3 py-1 rounded-full text-sm bg-green-600 text-white">
            Approved
          </span>
          <span className="px-3 py-1 rounded-full text-sm bg-red-500 text-white">
            Rejected
          </span>
        </div>
      </div>

      {/* INNER BOX */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        {requests.length === 0 && (
          <p className="px-6 py-4 text-gray-500">No custom requests yet.</p>
        )}

        {requests.map((req, index) => (
          <RequestItem
            key={req.id}
            data={req}
            isOpen={openId === req.id}
            onToggle={() => setOpenId(openId === req.id ? null : req.id)}
            isLast={index === requests.length - 1}
            onStatusUpdated={handleStatusUpdate}
          />
        ))}
      </div>
    </div>
  );
}
