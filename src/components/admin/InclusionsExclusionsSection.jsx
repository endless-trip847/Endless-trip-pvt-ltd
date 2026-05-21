"use client";
import { Search } from "lucide-react";
import { useMemo, useState, useEffect } from "react";

/* ---- MASTER DATA ---- */
const MASTER_INCLUSIONS = [
  "International Flights",
  "Domestic Flights",
  "Private Airport Transfers",
  "Private AC Vehicle for Sightseeing",
  "Train Tickets Included",
  "Ferry Tickets / Catamaran Cruise",
  "High-Speed Rail Pass",
  "Luxury Vehicle Upgrade",
  "Car Rental Included",

  "3-Star Hotel Accommodation",
  "4-Star Hotel Accommodation",
  "5-Star Hotel Accommodation",
  "Boutique Hotel Stay",
  "Resort & Spa Stay",
  "Private Villa Accommodation",
  "Houseboat Stay",
  "Heritage Hotel Stay",

  "04 Nights Stay in Singapore with Bed and Breakfast",
  "03 Nights Stay in Kuta with Bed and Breakfast",

  "Daily Breakfast",
  "Daily Lunch",
  "Daily Dinner",
  "Breakfast & Dinner (MAP Plan)",
  "All Meals (AP Plan)",
  "Welcome Drink on Arrival",
  "Special Gala Dinner",
  "Local Food Tasting Tour",
  "Cooking Class Session",

  "All Sightseeing Included",
  "Private Tour Guide",
  "Local Guide for Specific Tours",
  "Tour Manager / Captain",
  "24/7 On-trip Support",

  "Night Safari tour on a seat-in-coach basis",
  "Singapore Familiarisation Drive on a seat-in-coach basis",
  "Sentosa Saver (one-way Mount Faber cable car, Luge & Skyride – 3 rides, and Wings of Time at 7:40 PM)",
  "Gardens by the Bay (two domes) and Sands SkyPark Observation Deck",
  "All tours and transfers on a seat-in-coach basis",
  "Return airport transfers on a private basis in Singapore",
  "Bali Safari Marine Park - Jungle Hooper Legend on Private basis",
  "Full Day Ubud and Kitamani tour on Private basis",

  "All Entrance Fees Included",
  "Museum & Monument Passes",
  "Cultural Show Tickets",
  "Theme Park / Amusement Park Tickets",
  "Public Transport Pass",

  "Safari / Game Drive",
  "Water Sports Package",
  "Scuba Diving / Snorkeling Trip",
  "Spa & Wellness Session",
  "Hot Air Balloon Ride",
  "Trekking & Hiking Permits",
  "Shopping Tour",

  "Visa Assistance",
  "Visa Cost Included",
  "Travel Insurance",
  "Medical Insurance",
  "Porterage Service",
  "SIM Card / eSIM with Data",
  "Honeymoon / Anniversary Freebies",
  "Singapore Visa Charges",
  "Insurance Charges",

  "GST Included",
  "TCS Included",
  "All Tolls & Taxes",
  "Tourism Taxes & Levies",
  "Surcharges Included",

  "Cruise Fare",
  "Cruise Gratuities",
  "Shore Excursions Included",
];

/* ---------- COMPONENT ---------- */

export default function InclusionsExclusionsSection({
  inclusions = [],
  exclusions = [],
  onChange,
}) {
  const [search, setSearch] = useState("");

  // UI map: { item: "include" | "exclude" | "ignore" }
  const [statusMap, setStatusMap] = useState({});

  /* ---------- INIT FROM PARENT (EDIT MODE SAFE) ---------- */
  useEffect(() => {
    const map = {};
    MASTER_INCLUSIONS.forEach((item) => {
      if (inclusions.includes(item)) map[item] = "include";
      else if (exclusions.includes(item)) map[item] = "exclude";
      else map[item] = "ignore";
    });
    setStatusMap(map);
  }, [inclusions, exclusions]);

  /* ---------- SEARCH ---------- */
  const filteredItems = useMemo(() => {
    return MASTER_INCLUSIONS.filter((item) =>
      item.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  /* ---------- UPDATE HANDLER ---------- */
  const setStatus = (item, value) => {
    const next = { ...statusMap, [item]: value };
    setStatusMap(next);

    const nextInclusions = [];
    const nextExclusions = [];

    Object.entries(next).forEach(([key, val]) => {
      if (val === "include") nextInclusions.push(key);
      if (val === "exclude") nextExclusions.push(key);
    });

    onChange({
      inclusions: nextInclusions,
      exclusions: nextExclusions,
    });
  };

  return (
    <div className="space-y-4">
      {/* Instruction */}
      <p className="text-sm text-gray-500 ">
        For each item, choose whether to include it, exclude it, or ignore it.
      </p>

      {/* Search */}
      <div className="relative flex items-center">
        <Search className="absolute left-4 h-4 w-4 text-gray-400 pointer-events-none" />

        <input
          type="text"
          placeholder="       Search for an inclusion or exclusion..."
          className="input pl-12"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Scrollable List */}
      <div className="border rounded-xl max-h-[420px] overflow-y-auto">
        {filteredItems.map((item) => (
          <div
            key={item}
            className="flex items-center justify-between gap-6 px-4 py-3 border-b last:border-b-0"
          >
            {/* Label */}
            <span className="font-medium text-sm text-gray-800">{item}</span>

            {/* Radios */}
            <div className="flex items-center gap-6 text-sm">
              {["include", "exclude", "ignore"].map((opt) => (
                <label
                  key={opt}
                  className="flex items-center gap-1 cursor-pointer"
                >
                  <input
                    type="radio"
                    name={item}
                    checked={statusMap[item] === opt}
                    onChange={() => setStatus(item, opt)}
                  />
                  <span className="capitalize">{opt}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
