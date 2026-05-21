"use client";

import { usePathname, useRouter } from "next/navigation";

export default function AdminTabs() {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    {
      label: "Custom Requests",
      icon: "fas fa-envelope-open-text",
      path: "/admin/custom-requests",
    },
    {
      label: "Add / Edit Package",
      icon: "fas fa-plus-circle",
      path: "/admin/add-edit-package",
    },
    {
      label: "Manage Packages",
      icon: "fas fa-list-alt",
      path: "/admin/manage-packages",
    },
  ];

  const base =
    "flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold transition-all duration-200";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {tabs.map((t) => {
        const isActive = pathname.startsWith(t.path);

        return (
          <button
            key={t.path}
            onClick={() => router.push(t.path)}
            className={`${base} ${
              isActive
                ? "bg-gray-100 text-[#4b1d63] shadow-md scale-[1.02]"
                : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-800"
            }`}
          >
            <i className={`${t.icon} text-lg`}></i>
            <span>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}
