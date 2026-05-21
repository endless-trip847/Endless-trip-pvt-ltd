"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin/custom-requests");
    } else {
      setError("Invalid password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 md:p-10 rounded-xl shadow-lg w-full max-w-md"
      >
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <div className="relative w-36 h-36">
            <Image
              src="/logo.jpeg"
              alt="Endless Trips Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-[#290d39] text-center mb-6">
          Admin Panel Login
        </h1>

        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded-sm px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-[#4b1d63]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          type="submit"
          className="w-full bg-[#4b1d63] text-white py-3 rounded-lg font-semibold hover:bg-[#3a154d] transition-colors duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
}
