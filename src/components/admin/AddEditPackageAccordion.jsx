"use client";

import { useState } from "react";
import ItinerarySection from "./ItinerarySection.jsx";
import HotelDetailsSection from "./HotelDetailsSection";
import FlightDetailsSection from "./FlightDetailsSection.jsx";
import VisaDetailsSection from "./VisaDetailsSection.jsx";
import InclusionsExclusionsSection from "./InclusionsExclusionsSection.jsx";
import TermsConditionsSection from "./TermsConditionsSection.jsx";

const SECTIONS = [
  { title: "Itinerary Details", icon: "fas fa-route" },
  { title: "Hotel Details", icon: "fas fa-hotel" },
  { title: "Flight Details", icon: "fas fa-plane" },
  { title: "Visa Details", icon: "fas fa-passport" },
  { title: "Inclusions & Exclusions", icon: "fas fa-list-check" },
  { title: "Terms & Conditions", icon: "fas fa-file-contract" },
];

export default function AddEditPackageAccordion({ form, setForm }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <>
      {/* ---- SPACING BEFORE ACCORDION (IMPORTANT) ---- */}
      <div className="mt-8">
        {/* ACCORDION GROUP */}
        <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
          {SECTIONS.map((section, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={section.title}
                className={
                  index !== SECTIONS.length - 1
                    ? "border-b border-gray-200"
                    : ""
                }
              >
                {/* HEADER ROW */}
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className={`
                    w-full flex items-center justify-between
                    px-5 py-4 text-left
                    transition-colors duration-200
                    ${
                      isOpen
                        ? "bg-gray-50 border-l-4 border-blue-400"
                        : "hover:bg-gray-50"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <i
                      className={`${section.icon} text-gray-600 w-5 text-center`}
                    ></i>
                    <span className="font-semibold text-gray-800">
                      {section.title}
                    </span>
                  </div>

                  {/* CHEVRON */}
                  <i
                    className={`
                      fas fa-chevron-down text-gray-500 text-sm transition-transform duration-300 ease-out
                      ${isOpen ? "rotate-180" : ""}
                    `}
                  ></i>
                </button>

                {/* CONTENT SHELL */}
                <div
                  className={`
                    overflow-hidden
                    transition-[max-height] duration-500 ease-out
                    ${isOpen ? "max-h-[600px]" : "max-h-0"}
                  `}
                >
                  <div
                    className={`
                      px-5 py-4 text-sm text-gray-500
                      transition-opacity duration-300 ease-out
                      ${isOpen ? "opacity-100 delay-200" : "opacity-0"}
                    `}
                  >
                    {/* Placeholder – real content comes next */}
                    {section.title === "Itinerary Details" && (
                      <ItinerarySection
                        days={form.days}
                        value={form.itinerary}
                        onChange={(itinerary) =>
                          setForm((prev) => ({ ...prev, itinerary }))
                        }
                      />
                    )}

                    {section.title === "Hotel Details" && (
                      <HotelDetailsSection
                        value={form.hotels}
                        onChange={(hotels) =>
                          setForm((prev) => ({ ...prev, hotels }))
                        }
                      />
                    )}

                    {section.title === "Flight Details" && (
                      <FlightDetailsSection
                        value={form.flights}
                        onChange={(flights) =>
                          setForm((prev) => ({ ...prev, flights }))
                        }
                      />
                    )}
                    {section.title === "Visa Details" && (
                      <VisaDetailsSection
                        visas={form.visas}
                        onChange={(visas) =>
                          setForm((prev) => ({ ...prev, visas }))
                        }
                      />
                    )}
                    {section.title === "Inclusions & Exclusions" && (
                      <InclusionsExclusionsSection
                        inclusions={form.inclusions}
                        exclusions={form.exclusions}
                        onChange={({ inclusions, exclusions }) =>
                          setForm((prev) => ({
                            ...prev,
                            inclusions,
                            exclusions,
                          }))
                        }
                      />
                    )}

                    {section.title === "Terms & Conditions" && (
                      <TermsConditionsSection
                        value={form.terms_conditions}
                        onChange={(terms) =>
                          setForm((prev) => ({
                            ...prev,
                            terms_conditions: terms,
                          }))
                        }
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
