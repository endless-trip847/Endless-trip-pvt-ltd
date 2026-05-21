"use client";

import { motion } from "framer-motion";

/* -------- TEMP DATA (Admin-ready) -------- */
const reasons = [
  {
    id: 1,
    icon: "fas fa-globe",
    title: "75+ Countries Explored",
    description:
      "Extensive experience planning trips worldwide with unmatched expertise, ensuring a global perspective on your travels.",
  },
  {
    id: 2,
    icon: "fas fa-handshake",
    title: "20+ Years Trusted Experience",
    description:
      "Over two decades of creating seamless and unforgettable travel experiences, building trust with every journey.",
  },
  {
    id: 3,
    icon: "fas fa-gem",
    title: "Customized & Luxury Packages",
    description:
      "Handcrafted holidays tailored precisely to your preferences and budget, including exclusive luxury options.",
  },
];

/* -------- Animation Variants -------- */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function WhyChooseUs() {
  return (
    <section className="py-12 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* -------- Section Header -------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 px-2">
            Why Choose Endless Trips?
          </h2>

          <div className="w-16 h-[3px] bg-purple-700 mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* -------- Cards -------- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {reasons.map((item) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              className="
                group
                rounded-[15px]
                px-6 sm:px-8 lg:px-[30px] 
                py-8 sm:py-10 lg:py-[50px]
                min-h-[300px] sm:min-h-[350px]
                text-center
                border border-gray-200
                bg-gradient-to-br from-white to-gray-50
                shadow-[0_10px_30px_rgba(0,0,0,0.05)] 
                sm:shadow-[0_15px_40px_rgba(0,0,0,0.08)]
                transition-all duration-[400ms]
                hover:-translate-y-2
                hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]
              "
            >
              {/* Icon */}
              <div className="text-4xl sm:text-5xl mb-5 sm:mb-6 text-orange-500 transition-colors duration-300 group-hover:text-purple-700">
                <i className={item.icon}></i>
              </div>

              {/* Title - Adjusted for mobile */}
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 drop-shadow-sm mb-4 leading-tight break-words">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-gray-500 text-base sm:text-lg leading-relaxed px-1">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
