"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
/* ---------------- TEMP DATA (Admin-ready) ---------------- */
// Later this will come from API / Admin Panel
const featuredPackages = [
  {
    id: 1,
    title: "Panoramic Switzerland",
    days: 8,
    nights: 7,
    price: 178000,
    image: "/switzerland.jpeg",
    slug: "panoramic-switzerland",
  },
  {
    id: 2,
    title: "Leh Ladakh",
    days: 6,
    nights: 5,
    price: 40000,
    image: "/ladakh.jpeg",
    slug: "leh-ladakh",
  },
  {
    id: 3,
    title: "Paradise Kashmir",
    days: 6,
    nights: 5,
    price: 30000,
    image: "/kashmir.jpeg",
    slug: "paradise-kashmir",
  },
];

/* ---------------- ANIMATION VARIANTS ---------------- */
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.7,
      ease: "easeOut",
    },
  }),
};

export default function FeaturedDestinations() {
  return (
    <section className="py-24 bg-[#f9fbfb]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* -------- Section Header -------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Featured Destinations
          </h2>
          <div className="w-16 h-[3px] bg-purple-600 mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* -------- Cards Wrapper -------- */}
        <div
          className="
    grid grid-cols-1 gap-8
    md:grid-cols-2
    lg:grid-cols-3
  "
        >
          {featuredPackages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index}
              className="
  bg-white rounded-2xl 
  shadow-[0_15px_40px_rgba(0,0,0,0.08)]
  transition-all duration-[400ms]
  hover:-translate-y-2
  hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]
"
            >
              {/* Image */}
              <div className="relative h-72 w-full overflow-hidden rounded-t-2xl">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  className="object-cover hover:scale-105 transition duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  {pkg.title}
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  {pkg.days} Days / {pkg.nights} Nights
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-bold text-purple-700">
                    ₹{pkg.price.toLocaleString()}
                  </span>

                  <button className="border border-purple-600 text-purple-600 px-4 py-2 rounded-full text-sm hover:bg-purple-600 hover:text-white transition">
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* -------- CTA -------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
          <Link
            href="/packages"
            className="
    mt-8 bg-orange-500
    px-8 py-3 rounded-full
    inline-block
    mx-auto lg:mx-0
    text-black hover:text-white
    font-semibold
    shadow-lg
    transition-colors duration-200

    [text-shadow:0_2px_3px_rgba(0,0,0,0.45)]
    hover:[text-shadow:0_3px_4px_rgba(0,0,0,0.6)]

    drop-shadow-[0_2px_2px_rgba(0,0,0,0.35)]
    hover:drop-shadow-[0_3px_4px_rgba(0,0,0,0.45)]
  "
          >
            View All Destinations
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
