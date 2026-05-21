"use client";

import React, { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function PackageDetails({ params }) {
  const { id } = React.use(params);
  const [packageData, setPackageData] = useState(null);

  const [loading, setLoading] = useState(true);
  const [inquiryLoading, setInquiryLoading] = useState(false);
  const [inquiryStatus, setInquiryStatus] = useState(null);

  async function handleInquirySubmit(e) {
    e.preventDefault();
    setInquiryLoading(true);
    setInquiryStatus(null);

    const formData = new FormData(e.target);

    const payload = {
      package_name: basic.title,
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      setInquiryStatus(json);

      if (json.success) {
        e.target.reset();
      }
    } catch (error) {
      setInquiryStatus({
        success: false,
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setInquiryLoading(false);
    }
  }

  // const packageData = packagesData.find((pkg) => pkg.id === Number(id));

  // if (!packageData) notFound();

  const PackageDetailsSkeleton = () => {
    return (
      <div className="max-w-7xl mx-auto px-6 py-10 animate-pulse">
        {/* ===== HERO IMAGE ===== */}
        <div className="w-full h-[420px] bg-gray-200 rounded-3xl mb-10" />

        {/* ===== TITLE + RATING ===== */}
        <div className="text-center mb-8">
          <div className="h-8 bg-gray-200 rounded w-2/3 mx-auto mb-4" />
          <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto" />
        </div>

        {/* ===== META INFO ===== */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-20 bg-gray-200 rounded-xl" />
          ))}
        </div>

        {/* ===== PRICE + CTA ===== */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-10">
          <div className="h-10 bg-gray-200 rounded w-48" />
          <div className="flex gap-4">
            <div className="h-12 w-36 bg-gray-300 rounded-full" />
            <div className="h-12 w-36 bg-gray-200 rounded-full" />
          </div>
        </div>

        {/* ===== DESCRIPTION ===== */}
        <div className="space-y-4 mb-10">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-11/12" />
          <div className="h-4 bg-gray-200 rounded w-10/12" />
          <div className="h-4 bg-gray-200 rounded w-9/12" />
        </div>

        {/* ===== INCLUSIONS / EXCLUSIONS ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-gray-200 h-48 rounded-2xl" />
          <div className="bg-gray-200 h-48 rounded-2xl" />
        </div>
      </div>
    );
  };

  function RelatedCard({ pkg }) {
    return (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition transform hover:-translate-y-2 hover:shadow-xl">
        {/* Image */}
        <div className="relative h-52">
          <Image
            src={pkg.image_url}
            alt={pkg.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-1">{pkg.title}</h3>

          <p className="text-gray-500 mb-12">{pkg.location}</p>

          <Link href={`/packages/${pkg.id}`}>
            <button className="w-full border-2 border-purple-700 text-purple-700 py-2 rounded-full font-semibold hover:bg-purple-700 hover:text-white transition">
              View Details
            </button>
          </Link>
        </div>
      </div>
    );
  }

  function RelatedPackages({ currentPackage }) {
    const [related, setRelated] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (!currentPackage) return;

      const fetchRelated = async () => {
        try {
          const res = await fetch("/api/packages");
          const json = await res.json();

          const allPackages = json.data || [];

          const filtered = allPackages
            .filter((pkg) => pkg.id !== currentPackage.id)
            .sort((a, b) => {
              // same package_type first
              if (
                a.package_type === currentPackage.package_type &&
                b.package_type !== currentPackage.package_type
              ) {
                return -1;
              }
              if (
                a.package_type !== currentPackage.package_type &&
                b.package_type === currentPackage.package_type
              ) {
                return 1;
              }
              // then by rating
              return b.rating - a.rating;
            })
            .slice(0, 3);

          setRelated(filtered);
        } catch (err) {
          console.error("Failed to load related packages", err);
        } finally {
          setLoading(false);
        }
      };

      fetchRelated();
    }, [currentPackage]);

    if (loading) {
      return (
        <p className="text-center text-gray-500 py-10">
          Loading recommendations...
        </p>
      );
    }

    if (!related.length) return null;

    return (
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#421c58] mb-12 relative inline-block">
            You Might Also Like
            <span className="absolute -bottom-4 left-0 w-full h-1 bg-orange-500"></span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {related.map((pkg) => (
              <RelatedCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const res = await fetch(`/api/packages/${id}`);

        if (!res.ok) {
          notFound();
        }

        const json = await res.json();
        setPackageData(json.data);
      } catch (error) {
        console.error(error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchPackage();
  }, [id]);

  if (loading) {
    return <PackageDetailsSkeleton />;
  }

  if (!packageData) notFound();

  const { basic, itinerary, inclusions, exclusions } = packageData;

  return (
    <div className="w-full">
      {/* ================= HERO ================= */}
      {/* <div className="relative w-full h-[260px] sm:h-[440px]">
        <Image
          src={basic.image_url}
          alt={basic.title}
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white px-4 text-center">
          <h1 className="text-3xl sm:text-5xl font-bold mb-4">{basic.title}</h1>

          <div className="flex gap-6 text-sm sm:text-base">
            <div>
              <i className="fas fa-calendar-alt mr-2"></i>
              {basic.days} / {basic.nights}
            </div>
            <div>
              <i className="fas fa-star mr-2"></i>
              Rating: {basic.rating}
            </div>
          </div>
        </div>
      </div> */}

      {/* ================= HERO SECTION ================= */}
      <div className="details-header">
        <img src={basic.image_url} alt={basic.title} className="bg-image" />

        <div className="container">
          <h1>{basic.title}</h1>
          <p>{basic.location}</p>

          <div className="package-meta">
            <span>
              <i className="fas fa-calendar-alt"></i>
              {basic.days} Days / {basic.nights} Nights
            </span>

            <span>
              <i className="fas fa-star"></i>
              Rating: {basic.rating} / 5.0
            </span>
          </div>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="bg-[#e9ecef] py-12 px-4 sm:px-6">
        {/* ===== INNER WRAPPER (content width) ===== */}
        <div className="max-w-5xl mx-auto">
          {/* Title */}
          <h2 className="text-3xl sm:text-4xl font-bold text-[#421c58] mb-12 relative inline-block">
            Package Overview
            <span className="absolute -bottom-4 left-0 w-full h-1  bg-orange-500"></span>
          </h2>

          {/* GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* ================= LEFT ================= */}
            <div className="lg:col-span-2 space-y-10">
              {/* Description */}
              <p className="text-gray-700 leading-relaxed">
                {basic.description ||
                  "Detailed itinerary and inclusions are listed below."}
              </p>

              <div className="space-y-4">
                {/* ================= DAILY ITINERARY ================= */}
                <details className="group rounded-xl border bg-white overflow-hidden">
                  <summary className="flex items-center justify-between px-6 py-4 cursor-pointer font-semibold text-[#421c58] group-open:bg-[#f7f4fb]">
                    <span className="flex items-center gap-3">
                      <i className="fas fa-route text-[#421c58]"></i>
                      Daily Itinerary
                    </span>

                    {/* MAIN ARROW */}
                    <i className="fas fa-chevron-down inline-block transform transition-transform duration-300 ease-in-out group-open:rotate-180"></i>
                  </summary>

                  <div className="p-5 space-y-3">
                    {itinerary.map((item) => (
                      <details
                        key={item.day}
                        className="inner-group rounded-lg border border-gray-200 bg-white open:bg-[#f5f5f5] transition-colors duration-200"
                      >
                        <summary className="flex justify-between items-center px-4 py-3 cursor-pointer font-semibold text-gray-800">
                          <span>
                            Day {item.day}:{" "}
                            <span className="text-[#421c58]">{item.title}</span>
                          </span>

                          {/* DAY ARROW - now using inner-group instead of group */}
                          <i className="fas fa-chevron-down inline-block transform transition-transform duration-300 ease-in-out inner-group-open:rotate-180"></i>
                        </summary>

                        <div className="px-4 py-4 text-gray-700 leading-relaxed bg-white">
                          {item.description}
                        </div>
                      </details>
                    ))}
                  </div>
                </details>

                {/* ================= INCLUSIONS ================= */}
                <details className="group rounded-xl border bg-white overflow-hidden">
                  <summary className="flex items-center justify-between px-6 py-4 cursor-pointer font-semibold text-[#421c58]  group-open:bg-[#f7f4fb]">
                    <span className="flex items-center gap-3">
                      <i className="fas fa-plus-circle text-[#421c58]"></i>
                      Inclusions
                    </span>
                    <i className="fas fa-chevron-down transition-transform duration-300 group-open:rotate-180"></i>
                  </summary>

                  <ul className="p-6 space-y-3 text-gray-700">
                    {inclusions.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <i className="fas fa-check-circle text-green-600 mt-1"></i>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </details>

                {/* ================= EXCLUSIONS ================= */}
                <details className="group rounded-xl border bg-white overflow-hidden">
                  <summary className="flex items-center justify-between px-6 py-4 cursor-pointer font-semibold text-gray-800  group-open:bg-[#f7f4fb]">
                    <span className="flex items-center gap-3">
                      <i className="fas fa-minus-circle text-[#421c58]"></i>
                      Exclusions
                    </span>
                    <i className="fas fa-chevron-down transition-transform duration-300 group-open:rotate-180"></i>
                  </summary>

                  <ul className="p-6 space-y-3 text-gray-700">
                    {exclusions.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <i className="fas fa-times-circle text-[#421c58] mt-1"></i>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </details>

                {/* ================= TERMS & CONDITIONS ================= */}
                <details className="group rounded-xl border bg-white overflow-hidden">
                  <summary className="flex items-center justify-between px-6 py-4 cursor-pointer font-semibold text-gray-800  group-open:bg-[#f7f4fb]">
                    <span className="flex items-center gap-3">
                      <i className="fas fa-file-contract text-[#421c58]"></i>
                      Terms & Conditions
                    </span>
                    <i className="fas fa-chevron-down transition-transform duration-300 group-open:rotate-180"></i>
                  </summary>

                  <div className="p-6 text-gray-700 text-sm leading-relaxed">
                    {basic.terms_conditions}
                  </div>
                </details>
              </div>
            </div>

            {/* ================= RIGHT ================= */}
            <div className="w-full max-w-sm mx-auto lg:mx-0 lg:sticky lg:top-24 h-fit">
              <div className="bg-white rounded-xl shadow-lg p-6">
                {/* Price */}
                <div className="text-center border-b pb-4 mb-4">
                  <p className="text-sm text-gray-500">Starting From</p>
                  <p className="text-3xl font-bold text-purple-700">
                    ₹{Number(basic.price).toLocaleString("en-IN")}
                  </p>
                  <p className="text-sm text-gray-500">per person</p>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-center mb-6">
                  Send an Inquiry
                </h3>

                {/* Form */}
                <form className="space-y-4" onSubmit={handleInquirySubmit}>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Full Name"
                    className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500"
                  />

                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Email"
                    className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500"
                  />

                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="Phone"
                    className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500"
                  />

                  <textarea
                    name="message"
                    rows="3"
                    className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500"
                    defaultValue={`I'm interested in the "${basic.title}" package. Please share more details.`}
                  />

                  <button
                    type="submit"
                    disabled={inquiryLoading}
                    className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 rounded-md transition disabled:opacity-60"
                  >
                    {inquiryLoading ? "Sending..." : "Send Inquiry"}
                  </button>

                  {inquiryStatus && (
                    <p
                      className={`text-sm text-center ${
                        inquiryStatus.success
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {inquiryStatus.message}
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= YOU MIGHT ALSO LIKE ================= */}
      {packageData && <RelatedPackages currentPackage={basic} />}
    </div>
  );
}
