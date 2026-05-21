"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ManagePackages() {
  const router = useRouter();

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  /* ---------- FETCH PACKAGES ---------- */
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await fetch("/api/packages");
        const data = await res.json();
        if (data.success) setPackages(data.data);
      } catch (err) {
        console.error("Failed to load packages", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  /* ---------- DELETE ---------- */
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this package?")) return;

    try {
      setDeletingId(id);
      const res = await fetch(`/api/packages/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (data.success) {
        setPackages((prev) => prev.filter((p) => p.id !== id));
      } else {
        alert("Failed to delete package");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow px-8 py-7">
      {/* ---------- TITLE ---------- */}
      <h2 className="text-xl font-semibold text-[#4b1d63] mb-6">
        Manage Existing Packages
      </h2>

      {/* Title divider */}
      <div className="h-[2px] bg-gray-200 " />

      {/* ---------- CONTENT ---------- */}
      {loading ? (
        <p className="text-gray-500 text-base">Loading packages…</p>
      ) : packages.length === 0 ? (
        <p className="text-gray-500 text-base">No packages found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            {/* ---------- TABLE HEADER ---------- */}
            <thead>
              <tr className="border-b-2 border-gray-300 bg-gray-50">
                <th className="py-4 px-3 text-left text-base font-semibold text-gray-800 w-16">
                  ID
                </th>
                <th className="py-4 px-3 text-left text-base font-semibold text-gray-800">
                  Title
                </th>
                <th className="py-4 px-3 text-left text-base font-semibold text-gray-800">
                  Location
                </th>
                <th className="py-4 px-3 text-left text-base font-semibold text-gray-800">
                  Price (₹)
                </th>
                <th className="py-4 px-3 text-right text-base font-semibold text-gray-800 w-44">
                  Actions
                </th>
              </tr>
            </thead>

            {/* ---------- TABLE BODY ---------- */}
            <tbody>
              {packages.map((pkg) => (
                <tr
                  key={pkg.id}
                  className="
                    border-b
                    last:border-b-2
                    last:border-gray-300
                    hover:bg-gray-100
                    transition
                  "
                >
                  <td className="py-2 px-3 text-base text-gray-800">
                    {pkg.id}
                  </td>

                  <td className="py-2 px-3 text-base font-medium text-gray-900">
                    {pkg.title}
                  </td>

                  <td className="py-2 px-3 text-base text-gray-800">
                    {pkg.location || "-"}
                  </td>

                  <td className="py-2 px-3 text-base text-gray-800">
                    ₹{Number(pkg.price).toLocaleString("en-IN")}
                  </td>

                  <td className="py-2 px-3">
                    <div className="flex justify-end gap-3">
                      {/* EDIT BUTTON */}
                      <button
                        type="button"
                        onClick={() =>
                          router.push(`/admin/add-edit-package?id=${pkg.id}`)
                        }
                        className="
    inline-flex items-center gap-1
    px-4 py-2 rounded-md
    border border-blue-500
    text-blue-600
    font-medium

    transition-all duration-200 ease-out

    hover:bg-blue-600
    hover:text-white
    hover:shadow-md
  "
                      >
                        {" "}
                        <i className="fas fa-edit me-1"></i>
                        Edit
                      </button>

                      {/* DELETE BUTTON */}
                      <button
                        type="button"
                        disabled={deletingId === pkg.id}
                        onClick={() => handleDelete(pkg.id)}
                        className="
    inline-flex items-center gap-1
    px-4 py-2 rounded-md
    border border-red-500
    text-red-600
    font-medium

    transition-all duration-200 ease-out

    hover:bg-red-600
    hover:text-white
    hover:shadow-md
  "
                      >
                        <i className="fas fa-trash me-1"></i>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
