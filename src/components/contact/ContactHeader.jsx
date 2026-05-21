"use client";
import React from "react";
import { motion } from "framer-motion";

const ContactHeader = () => {
  return (
    <section
      className="
        relative w-full
        h-[380px] sm:h-96 md:h-[480px] lg:h-[550px] xl:h-[600px]
        bg-cover bg-center bg-no-repeat
      "
      style={{ backgroundImage: "url('/unsplash.png')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div
        className="
          relative z-10 flex h-full w-full
          items-center justify-center
          px-4 sm:px-6 lg:px-10
        "
      >

        {/* 📱 MOBILE: text thoda niche */}
        <div
          className="
            text-center w-full
            max-w-[95%] sm:max-w-4xl
            px-2 sm:px-0
            mt-8 sm:mt-0
            sm:translate-y-6 md:translate-y-8 lg:translate-y-10
          "
        >

          {/* Mobile Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="
              sm:hidden
              text-[38px]
              leading-snug
              font-extrabold
              text-white
              mb-4
              tracking-tight
            "
          >
            Design Your <br /> Dream Trip
          </motion.h1>

          {/* Desktop Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="
              hidden sm:block
              text-4xl md:text-6xl lg:text-[68px]
              font-extrabold
              text-white
              mb-6
              leading-tight
            "
          >
            Design Your Dream Trip
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="
              text-[16px]
              sm:text-xl md:text-2xl lg:text-[24px]
              text-white/90
              leading-relaxed
              max-w-[95%] sm:max-w-none
              mx-auto
            "
          >
            Tell us your travel aspirations, and we'll craft a personalized
            itinerary just for you.
          </motion.p>

        </div>
      </div>
    </section>
  );
};

export default ContactHeader;
