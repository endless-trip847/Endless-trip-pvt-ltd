"use client";
import Link from "next/link";

import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="relative py-24 ">
      {/* Gradient Background */}
      <div
        className="absolute inset-0 shadow-[inset_0_8px_20px_rgba(0,0,0,0.25),inset_0_-8px_20px_rgba(0,0,0,0.25)]
bg-[linear-gradient(45deg,#4a1f60_0%,#8b3a73_20%,#ff8c1a_100%)]"
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white"
      >
        <h2 className="text-3xl md:text-4xl font-bold">
          Ready for Your Next Adventure?
        </h2>

        <p className="mt-4 text-lg text-white/90">
          Let us craft your perfect holiday experience, tailored just for you.
        </p>
        <Link href="/contactus">
          <button
            className="
    mt-10
    px-12 py-4
    rounded-full

    bg-white
    text-[#1f042d]
    font-semibold text-lg

    shadow-md
    transition-all duration-300 ease-out

    [text-shadow:0_2px_3px_rgba(0,0,0,0.45)]

    hover:-translate-y-[2px]
    hover:shadow-xl
    hover:text-[#5d2775]
    hover:[text-shadow:0_3px_4px_rgba(0,0,0,0.6)]

    active:translate-y-0
    active:shadow-md
  "
          >
            Contact Us Now
          </button>
        </Link>
      </motion.div>
    </section>
  );
}
