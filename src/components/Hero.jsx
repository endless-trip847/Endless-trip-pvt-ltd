"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Poppins } from "next/font/google"; // Add this import
import Link from "next/link";

// Configure Poppins font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // Include weights you need
  style: ["normal", "italic"], // Optional
});

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-x-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1368&q=80')",
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/65" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-[150px] grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-white text-center lg:text-left  font-[var(--font-poppins)]
"
        >
          <h1
            className="text-4xl md:text-5xl font-bold leading-tight tracking-tight
 drop-shadow-lg"
          >
            Explore The World <br />
            With <span className="text-orange-400">Endless Trips</span>
          </h1>

          <p
            className="mt-6 text-gray-200 max-w-lg mx-auto lg:mx-0 drop-shadow-md leading-relaxed
"
          >
            20+ years of creating unforgettable journeys to 75+ countries,
            crafting memories that last a lifetime.
          </p>
          <Link href="/packages">
            <button
              className="
    mt-8 bg-orange-500
    px-8 py-3 rounded-full
    mx-auto lg:mx-0 block
    text-black hover:text-white
    font-semibold
    shadow-lg
    transition-colors duration-200

    [text-shadow:0_2px_3px_rgba(0,0,0,0.45)]
    hover:[text-shadow:0_3px_4px_rgba(0,0,0,0.6)]

    drop-shadow-[0_2px_2px_rgba(0,0,0,0.35)]
    hover:drop-shadow-[0_3px_4px_rgba(0,0,0,0.45)]
    transition-colors duration-200
   
  "
            >
              Explore Packages
            </button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="hidden lg:block"
        >
          <Image
            src="/hero-card.jpeg"
            width={520}
            height={350}
            className="rounded-xl shadow-xl"
            alt=""
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="block lg:hidden mt-10"
        >
          <Image
            src="/hero-card.jpeg"
            width={520}
            height={350}
            className="rounded-xl shadow-xl mx-auto"
            alt=""
          />
        </motion.div>
      </div>
    </section>
  );
}
