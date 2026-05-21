"use client";
import React from "react";
import { useEffect, useState } from "react";

import { motion } from "framer-motion";
// import { packagesData } from "../data/data";
import { packagesData } from "../../data/data.js";
// import { packagesData } from "@/data/data";
import Image from "next/image";
import Link from "next/link";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.5,
      delay: i * 0.2, // stagger effect
      ease: "easeOut",
    },
  }),
};

const PackageSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
    <div className="h-72 bg-gray-200" />

    <div className="p-5">
      <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-4" />
      <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-3" />

      <div className="grid grid-cols-3 gap-2 my-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-12 bg-gray-200 rounded" />
        ))}
      </div>

      <div className="h-8 bg-gray-200 rounded w-2/3 mx-auto mt-6" />
      <div className="h-10 bg-gray-300 rounded-full mt-4" />
    </div>
  </div>
);

const DOMESTIC_LOCATIONS = [
  "Agra",
  "Andaman & Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kashmir, India",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Leh-Ladakh",
  "Madhya Pradesh",
  "Maharashtra",
  "Manali, India",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Ooty",
  "Puducherry",
  "Punjab",
  "Rajasthan, India",
  "Rishikesh",
  "Shimla, India",
  "Sikkim",
  "Sikkim Darjeeling, India",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "Varanasi",
  "West Bengal",
];

const page = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [draftFilters, setDraftFilters] = useState({
    destination: "all",
    type: "all",
    duration: "all",
    maxPrice: 500000,
    sort: "popular",
  });

  const [appliedFilters, setAppliedFilters] = useState(draftFilters);

  const handleChange = (key, value) => {
    setDraftFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // useEffect(() => {
  //   const fetchPackages = async () => {
  //     try {
  //       const res = await fetch("/api/packages");

  //       if (!res.ok) {
  //         throw new Error("Failed to fetch packages");
  //       }

  //       const json = await res.json();
  //       setPackages(json.data); // 👈 API response
  //     } catch (err) {
  //       console.error(err);
  //       setError("Unable to load packages");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchPackages();
  // }, []);

  useEffect(() => {
    let isMounted = true;

    const cached = sessionStorage.getItem("packages");

    // 1️⃣ Show cached data instantly
    if (cached) {
      setPackages(JSON.parse(cached));
      setLoading(false);
    }

    const fetchPackages = async () => {
      try {
        const res = await fetch("/api/packages", {
          cache: "no-store",
        });

        if (!res.ok) throw new Error("Failed to fetch packages");

        const json = await res.json();
        if (!isMounted) return;

        // 2️⃣ Update UI immediately
        setPackages(json.data);

        // 3️⃣ Store in cache when browser is idle ✅
        if ("requestIdleCallback" in window) {
          requestIdleCallback(() => {
            sessionStorage.setItem("packages", JSON.stringify(json.data));
          });
        } else {
          // Fallback for Safari / older browsers
          setTimeout(() => {
            sessionStorage.setItem("packages", JSON.stringify(json.data));
          }, 0);
        }
      } catch (err) {
        console.error(err);
        if (!cached) setError("Unable to load packages");
      } finally {
        if (!cached && isMounted) setLoading(false);
      }
    };

    fetchPackages();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredPackages = packages
    .filter((pkg) => {
      if (appliedFilters.destination !== "all") {
        const isDomestic = DOMESTIC_LOCATIONS.includes(pkg.location);

        if (appliedFilters.destination === "domestic" && !isDomestic)
          return false;

        if (appliedFilters.destination === "international" && isDomestic)
          return false;

        if (
          appliedFilters.destination !== "domestic" &&
          appliedFilters.destination !== "international" &&
          pkg.location !== appliedFilters.destination
        )
          return false;
      }

      if (
        appliedFilters.type !== "all" &&
        pkg.package_type !== appliedFilters.type
      )
        return false;

      if (appliedFilters.duration !== "all") {
        if (appliedFilters.duration === "short" && pkg.days > 3) return false;
        if (
          appliedFilters.duration === "medium" &&
          (pkg.days < 4 || pkg.days > 7)
        )
          return false;
        if (
          appliedFilters.duration === "long" &&
          (pkg.days < 8 || pkg.days > 14)
        )
          return false;
        if (appliedFilters.duration === "extended" && pkg.days < 15)
          return false;
      }

      if (pkg.price > appliedFilters.maxPrice) return false;

      return true;
    })
    .sort((a, b) => {
      switch (appliedFilters.sort) {
        case "price_asc":
          return a.price - b.price;
        case "price_desc":
          return b.price - a.price;
        case "duration_asc":
          return a.days - b.days;
        case "duration_desc":
          return b.days - a.days;
        default:
          return b.rating - a.rating;
      }
    });

  return (
    <>
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <PackageSkeleton key={i} />
          ))}
        </div>
      )}

      {error && <p className="text-center text-red-500 py-10">{error}</p>}

      <section className="relative min-h-[70vh] flex items-center justify-center text-white px-6 overflow-hidden">
        {/* ===== BACKGROUND IMAGE (Smooth Fade + GPU) ===== */}

        <Image
          src="/hero-packages.png"
          alt="Travel Packages Hero"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* ===== GRADIENT OVERLAY ===== */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80 z-10" />

        {/* ===== CONTENT (Staggered Smooth Motion) ===== */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.18,
                delayChildren: 0.25,
              },
            },
          }}
          className="relative z-20 mx-auto max-w-5xl text-center will-change-transform transform-gpu"
        >
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 18 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: "easeOut" },
              },
            }}
            className="font-bold text-4xl sm:text-5xl md:text-6xl text-shadow heading-font mb-6"
          >
            Explore Our Travel Packages
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 18 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.9, ease: "easeOut" },
              },
            }}
            className="text-base sm:text-lg md:text-2xl text-shadow mb-8 max-w-3xl mx-auto"
          >
            Discover handcrafted holidays to the world's most incredible
            destinations, with over 75 countries to choose from.
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.9, ease: "easeOut" },
              },
            }}
            className="mt-10"
          >
            <button
              onClick={() => {
                document
                  .getElementById("packageContainer")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="text-white hero-box-shadow bg-[#e07210] px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg md:text-xl font-bold transition transform hover:scale-105"
            >
              Find Your Dream Trip
            </button>
          </motion.div>
        </motion.div>
      </section>

      <section className="bg-[#f4f7f6] px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
          {/* Filters */}
          <div className="lg:w-1/4">
            <div className="filters w-full bg-white rounded-2xl shadow-lg p-6 lg:p-7 mb-6 lg:mb-0 lg:sticky lg:top-28">
              <h2 className="text-xl sm:text-2xl font font-bold text-[#421c58] mb-4 text-center lg:text-left">
                Filter Packages
              </h2>
              <hr className="mb-6 border" />
              {/* Destination */}
              <div className="mb-5">
                <label className="block dropdown-heading text-sm font-semibold mb-2">
                  Destination
                </label>
                <select
                  value={draftFilters.destination}
                  onChange={(e) => handleChange("destination", e.target.value)}
                  className="w-full dropdown-border rounded-lg px-4 py-3 text-sm text-[#333] focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">All Destinations</option>

                  <optgroup label="By Region">
                    <option value="domestic">Domestic</option>
                    <option value="international">International</option>
                  </optgroup>

                  <optgroup label="By Place">
                    {Array.from(new Set(packages.map((p) => p.location))).map(
                      (loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      )
                    )}
                  </optgroup>
                </select>
              </div>
              {/* Package Type */}
              <div className="mb-5">
                <label className="block dropdown-heading text-sm font-semibold mb-2">
                  Package Type
                </label>
                <select
                  value={draftFilters.type}
                  onChange={(e) => handleChange("type", e.target.value)}
                  className="w-full dropdown-border rounded-lg px-4 py-3 text-sm text-[#333] focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">All Types</option>
                  <option value="family">Family</option>
                  <option value="honeymoon">Honeymoon</option>
                  <option value="adventure">Adventure</option>
                  <option value="luxury">Luxury</option>
                  <option value="budget">Budget</option>
                </select>
              </div>
              {/* Duration */}
              <div className="mb-6">
                <label className="block dropdown-heading text-sm font-semibold mb-2">
                  Duration
                </label>
                <select
                  value={draftFilters.duration}
                  onChange={(e) => handleChange("duration", e.target.value)}
                  className="w-full dropdown-border rounded-lg px-4 py-3 text-sm text-[#333] focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">Any Duration</option>
                  <option value="short">1–3 Days</option>
                  <option value="medium">4–7 Days</option>
                  <option value="long">8–14 Days</option>
                  <option value="extended">15+ Days</option>
                </select>
              </div>
              {/* Price Range */}
              <div className="mb-6">
                <label className="block dropdown-heading text-sm font-semibold mb-3">
                  Price Range
                </label>

                <input
                  type="range"
                  min="10000"
                  max="500000"
                  value={draftFilters.maxPrice}
                  onChange={(e) =>
                    handleChange("maxPrice", Number(e.target.value))
                  }
                  className="w-full accent-[#421c58]"
                />

                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>₹10,000</span>
                  <span>
                    ₹{draftFilters.maxPrice.toLocaleString("en-IN")}
                  </span>{" "}
                </div>
              </div>
              {/* Button */}
              <button
                onClick={() => {
                  setAppliedFilters(draftFilters);
                  document
                    .getElementById("packageContainer")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full hero-btn text-white py-3 rounded-lg text-sm font-semibold transition hover:opacity-90 filter-btn cursor-pointer"
              >
                Apply Filters
              </button>
            </div>
          </div>

          <div className="lg:w-3/4" id="packageContainer">
            {/* Header */}
            <div className="flex flex-col md:flex-row  md:items-center md:justify-between mb-8 gap-4 ">
              {/* LEFT: COUNT */}
              <h3 className="text-xl md:text-2xl font-bold  text-[#28093a]">
                Showing{" "}
                <span className="font-bold text-[#28093a]">
                  {filteredPackages.length}
                </span>{" "}
                Packages
              </h3>

              {/* RIGHT: SORT */}
              <div className="flex items-center gap-3">
                <label className="text-base md:text-lg font-semibold text-gray-600">
                  Sort By:
                </label>

                <select
                  value={appliedFilters.sort}
                  onChange={(e) =>
                    setAppliedFilters((prev) => ({
                      ...prev,
                      sort: e.target.value,
                    }))
                  }
                  className="
        border border-gray-300 
        rounded-lg 
        text-base md:text-lg px-5 py-3
        
        font-medium
        text-[#2c3e50]
        bg-white
        shadow-sm
        focus:outline-none 
        focus:ring-2 
        focus:ring-[#421c58]
      "
                >
                  <option value="popular">Popular</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="duration_asc">Duration: Short to Long</option>
                  <option value="duration_desc">Duration: Long to Short</option>
                </select>
              </div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch">
              {filteredPackages.map((pkg, index) => (
                <Link key={pkg.id} href={`/packages/${pkg.id}`}>
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="h-full"
                  >
                    <motion.div
                      className="relative bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transition flex flex-col h-full"
                      whileHover={{
                        scale: 1.05,
                        y: -10,
                        boxShadow: "0px 15px 30px rgba(0,0,0,0.2)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 20,
                      }}
                    >
                      {/* ===== BADGE (PHP SAME) ===== */}
                      {pkg.badge && (
                        <span className="absolute top-4 right-4 z-10 bg-[#fd8513] text-white text-xs font-semibold px-4 py-1 rounded-full shadow">
                          {pkg.badge}
                        </span>
                      )}

                      {/* ===== IMAGE ===== */}
                      <div className="relative h-72 overflow-hidden">
                        <Image
                          src={pkg.image_url}
                          alt={pkg.title}
                          fill
                          loading="lazy"
                          //priority={index < 3}
                          // placeholder="blur"

                          // blurDataURL="/image-blur.png"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 hover:scale-110"
                        />
                      </div>

                      {/* ===== CONTENT ===== */}
                      <div className="p-5 text-center flex flex-col h-full">
                        {/* TITLE */}
                        <h4 className="text-2xl font-bold text-[#2c3e50] mb-3">
                          {pkg.title}
                        </h4>

                        {/* ===== RATING (PHP LOGIC SAME) ===== */}
                        {pkg.rating > 0 && (
                          <div className="flex justify-center items-center gap-1 text-yellow-400 text-sm mb-2">
                            {[1, 2, 3, 4, 5].map((i) => {
                              if (i <= Math.floor(pkg.rating)) {
                                return <i key={i} className="fas fa-star" />;
                              }
                              if (i - 0.5 <= pkg.rating) {
                                return (
                                  <i key={i} className="fas fa-star-half-alt" />
                                );
                              }
                              return <i key={i} className="far fa-star" />;
                            })}
                            <span className="text-gray-500 ml-1">
                              ({pkg.rating})
                            </span>
                          </div>
                        )}

                        {/* LOCATION */}
                        <div className="text-sm text-gray-500 flex justify-center items-center gap-1 mb-4">
                          <i className="fas fa-map-marker-alt text-[#421c58]" />
                          <p className="text-[#6c757d]">{pkg.location}</p>
                        </div>

                        {/* ===== INFO STRIP ===== */}
                        <div className="-mx-6 grid grid-cols-3 text-xs text-gray-600 border-t border-b border-[#e9ecef] py-3 mb-2">
                          <div className="relative text-center flex flex-col items-center gap-1">
                            <i className="fas fa-calendar-alt text-[#e07210] text-2xl"></i>
                            <span className="font-bold text-[#333]">
                              {pkg.days} Days
                            </span>
                            <span className="absolute right-0 top-0 bottom-0 w-px bg-[#e9ecef]" />
                          </div>

                          <div className="relative text-center flex flex-col items-center gap-1">
                            <i className="fas fa-moon text-[#e07210] text-2xl"></i>
                            <span className="font-bold text-[#333]">
                              {pkg.nights} Nights
                            </span>
                            <span className="absolute right-0 top-0 bottom-0 w-px bg-[#e9ecef]" />
                          </div>

                          <div className="text-center flex flex-col items-center gap-1">
                            <i className="fas fa-users text-[#e07210] text-2xl"></i>
                            <span className="font-bold text-[#333]">
                              {pkg.adults} Adults
                            </span>
                          </div>
                        </div>

                        {/* PRICE */}
                        <div className="mt-auto">
                          <p className="text-[#6c757d] text-center mb-1">
                            Starting from
                          </p>
                          <p className="text-4xl font-bold text-[#421c58] mb-4">
                            ₹{Number(pkg.price).toLocaleString("en-IN")}
                          </p>

                          <button className="w-full mt-4 border-2 border-[#421c58] text-[#421c58] py-2 rounded-full text-sm font-semibold hover:bg-[#421c58] hover:text-white transition">
                            View Details
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
