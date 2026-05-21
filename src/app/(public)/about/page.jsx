"use client"; // Add this at the top since Framer Motion needs client-side rendering

import { motion, useInView, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function AboutPage() {
  // Refs for scroll animations
  const storyRef = useRef(null);
  const visionRef = useRef(null);
  const teamRef = useRef(null);
  const achievementsRef = useRef(null);

  // State for counter values
  const [countriesCount, setCountriesCount] = useState(0);
  const [travelersCount, setTravelersCount] = useState(0);
  const [toursCount, setToursCount] = useState(0);
  const [awardsCount, setAwardsCount] = useState(0);

  // Check if elements are in view
  const storyInView = useInView(storyRef, { once: true, amount: 0.3 });
  const visionInView = useInView(visionRef, { once: true, amount: 0.3 });
  const teamInView = useInView(teamRef, { once: true, amount: 0.3 });
  const achievementsInView = useInView(achievementsRef, {
    once: true,
    amount: 0.3,
  });

  // Counter animation function
  useEffect(() => {
    if (achievementsInView) {
      // Animate countries count from 0 to 75
      const countriesControls = animate(0, 75, {
        duration: 2,
        onUpdate(value) {
          setCountriesCount(Math.floor(value));
        },
      });

      // Animate travelers count from 0 to 10000
      const travelersControls = animate(0, 10000, {
        duration: 2,
        onUpdate(value) {
          setTravelersCount(Math.floor(value));
        },
      });

      // Animate tours count from 0 to 500
      const toursControls = animate(0, 500, {
        duration: 2,
        onUpdate(value) {
          setToursCount(Math.floor(value));
        },
      });

      // Animate awards count from 0 to 25
      const awardsControls = animate(0, 25, {
        duration: 2,
        onUpdate(value) {
          setAwardsCount(Math.floor(value));
        },
      });

      return () => {
        countriesControls.stop();
        travelersControls.stop();
        toursControls.stop();
        awardsControls.stop();
      };
    }
  }, [achievementsInView]);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  };

  const scaleUp = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  const counterAnimation = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="beach-bg text-white  py-20 md:py-32 px-6"
      >
        <div className="container mx-auto max-w-4xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            About Endless Trips
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl mb-8"
          >
            With over 20 years of experience, we are one of India's leading tour
            operators, dedicated to helping travel enthusiasts explore the
            world's most incredible destinations.
          </motion.p>
        </div>
      </motion.header>

      {/* ================= OUR STORY SECTION ================= */}
      <section ref={storyRef} className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Title */}
          <motion.div
            initial="hidden"
            animate={storyInView ? "visible" : "hidden"}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Story</h2>
            <div className="w-20 h-1 bg-[#2c3e50] mx-auto rounded"></div>
          </motion.div>

          {/* Content */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Text */}
            <motion.div
              initial="hidden"
              animate={storyInView ? "visible" : "hidden"}
              variants={slideInLeft}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-[2.2rem] font-bold text-[#421c58] leading-[1.3] mb-[30px] ;">
                Creating Unforgettable Journeys Since 2011
              </h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={storyInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-gray-600 mb-6 leading-relaxed"
              >
                Endless Trips Private Limited was founded with a simple mission:
                to make world-class travel accessible to everyone. What began as
                a small travel agency in Ahmedabad has grown into one of India's
                most trusted tour operators. Our expert team works closely with
                clients to handcraft the holiday of a lifetime, ensuring every
                trip is seamless and unforgettable. We specialize in
                international tours, flight ticketing, and domestic
                travel—particularly to Goa, where we hold unmatched expertise.
                Thanks to the immense trust and belief of our customers, we have
                successfully planned holidays to more than 75 countries
                worldwide. Our commitment to excellence has earned us numerous
                awards and a loyal customer base that continues to grow.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={storyInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-gray-600 leading-relaxed"
              >
                Our expert team works closely with clients to handcraft the
                holiday of a lifetime, ensuring every trip is seamless and
                unforgettable. We specialize in international tours, flight
                ticketing, and domestic travel—particularly to Goa, where we
                hold unmatched expertise.
              </motion.p>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial="hidden"
              animate={storyInView ? "visible" : "hidden"}
              variants={slideInRight}
              transition={{ duration: 0.8 }}
              className="rounded-xl overflow-hidden shadow-lg beach-bg-2 min-h-[400px] md:min-h-[450px] w-full"
            ></motion.div>
          </div>
        </div>
      </section>

      {/* ================= OUR VISION & MISSION ================= */}
      <section ref={visionRef} className="py-24 bg-[#f8faf9]">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Section Title */}
          <motion.div
            initial="hidden"
            animate={visionInView ? "visible" : "hidden"}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <h2 className="text-4xl font-bold text-[#2c3e50] mb-4">
              Our Vision & Mission
            </h2>
            <div className="w-28 h-1 bg-[#421c58] mx-auto rounded"></div>
          </motion.div>

          {/* Cards */}
          <motion.div
            initial="hidden"
            animate={visionInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-12"
          >
            {/* Mission Card */}
            <motion.div
              variants={scaleUp}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-xl p-12 relative hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="absolute left-0 top-0 h-full w-1.5 bg-orange-500 rounded-l-2xl"></div>

              <div className="text-center">
                <motion.div
                  initial={{ rotate: -180, opacity: 0 }}
                  animate={
                    visionInView
                      ? { rotate: 0, opacity: 1 }
                      : { rotate: -180, opacity: 0 }
                  }
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="w-14 h-14 mx-auto mb-6 flex items-center justify-center rounded-full bg-[#421c58]/10"
                >
                  <i className="fas fa-bullseye text-[#421c58] text-2xl font-bold "></i>
                </motion.div>

                <h3 className="text-2xl font-bold text-[#2c3e50] mb-6">
                  Our Mission
                </h3>

                <p className="text-gray-600 leading-relaxed text-lg">
                  To provide exceptional travel experiences that exceed our
                  clients' expectations through personalized service, expert
                  knowledge, and attention to detail. We aim to make world
                  exploration accessible, enjoyable, and unforgettable for every
                  traveler.
                </p>
              </div>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              variants={scaleUp}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-12 relative hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="absolute left-0 top-0 h-full w-1.5 bg-orange-500 rounded-l-2xl"></div>

              <div className="text-center">
                <motion.div
                  initial={{ rotate: -180, opacity: 0 }}
                  animate={
                    visionInView
                      ? { rotate: 0, opacity: 1 }
                      : { rotate: -180, opacity: 0 }
                  }
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="w-14 h-14 mx-auto mb-6 flex items-center justify-center rounded-full bg-[#421c58]/10"
                >
                  <i className="fas fa-eye text-[#421c58] text-2xl font-bold"></i>
                </motion.div>
                <h3 className="text-2xl font-bold text-[#2c3e50] mb-6">
                  Our Vision
                </h3>

                <p className="text-gray-600 leading-relaxed text-lg">
                  To be recognized as India's most trusted and innovative travel
                  company, setting new standards in the industry while
                  maintaining our commitment to sustainable tourism and
                  authentic cultural experiences for our clients.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================= MEET OUR EXPERT TEAM ================= */}
      <section ref={teamRef} className="py-28 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Section Heading */}
          <motion.div
            initial="hidden"
            animate={teamInView ? "visible" : "hidden"}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <h2 className="text-[3rem] font-extrabold text-[#2c3e50] mb-4">
              Meet Our Expert Team
            </h2>
            <div className="w-36 h-1.5 bg-[#421c58] mx-auto rounded-full"></div>
          </motion.div>

          {/* Cards */}
          <motion.div
            initial="hidden"
            animate={teamInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-16"
          >
            {/* Card 1 - ANKIT SINGH MANDLOI */}
            <motion.div
              variants={scaleUp}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-white rounded-3xl shadow-xl px-14 py-16 text-center hover:shadow-2xl transition-all duration-300"
            >
              <h3 className="text-2xl font-extrabold text-[#3b145f] tracking-wide mb-2">
                ANKIT SINGH MANDLOI
              </h3>
              <p className="text-orange-500 font-semibold text-lg mb-10">
                Founder & CEO
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-12 max-w-md mx-auto">
                With 20+ years in the travel industry, ANKIT's vision and
                leadership drive our company's success and innovation.
              </p>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-14 h-14 mx-auto rounded-full bg-gray-200 flex items-center justify-center"
              >
                <i className="fas fa-envelope text-[#421c58] text-xl font-bold"></i>
              </motion.div>
            </motion.div>

            {/* Card 2 - RAGINI THAKUR */}
            <motion.div
              variants={scaleUp}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-white rounded-3xl shadow-xl px-14 py-16 text-center hover:shadow-2xl transition-all duration-300"
            >
              <h3 className="text-2xl font-extrabold text-[#3b145f] tracking-wide mb-2">
                RAGINI THAKUR
              </h3>
              <p className="text-orange-500 font-semibold text-lg mb-10">
                Director & Co-Founder
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-12 max-w-md mx-auto">
                RAGINI ensures every trip is flowlessly executed, leveraging her
                7+ years of experience in seamless travel logistics.
              </p>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-14 h-14 mx-auto rounded-full bg-gray-200 flex items-center justify-center"
              >
                <i className="fas fa-envelope text-[#421c58] text-xl font-bold "></i>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================= OUR ACHIEVEMENTS ================= */}
      <section
        ref={achievementsRef}
        className="relative py-16 sm:py-20 md:py-28 text-white overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0 beach-bg-3 bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative container mx-auto px-4 sm:px-6 max-w-7xl">
          {/* Heading */}
          <motion.div
            initial="hidden"
            animate={achievementsInView ? "visible" : "hidden"}
            variants={fadeInUp}
            className="text-center mb-12 md:mb-20"
          >
            <h2 className="text-[2rem] sm:text-[2.4rem] md:text-[2.8rem] font-bold capitalize text-white">
              Our Achievements In Numbers
            </h2>

            {/* Purple line */}
            <div className="w-14 sm:w-16 h-[3px] bg-[#6b21a8] mx-auto mt-3 rounded-full"></div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial="hidden"
            animate={achievementsInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 text-center"
          >
            {/* Item 1 - Countries Covered */}
            <motion.div
              variants={counterAnimation}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center"
            >
              <motion.i
                initial={{ rotate: -180, opacity: 0 }}
                animate={
                  achievementsInView
                    ? { rotate: 0, opacity: 1 }
                    : { rotate: -180, opacity: 0 }
                }
                transition={{ duration: 0.6 }}
                className="fas fa-globe-asia text-5xl text-orange-500"
              ></motion.i>
              <motion.h3
                initial={{ opacity: 0, scale: 0.5 }}
                animate={
                  achievementsInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.5 }
                }
                transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
                className="text-[3rem] sm:text-[3.5rem] md:text-[4rem] font-extrabold leading-none mt-3"
              >
                {countriesCount}
              </motion.h3>
              <p className="text-lg sm:text-xl font-semibold opacity-90 mt-3">
                Countries Covered
              </p>
            </motion.div>

            {/* Item 2 - Happy Travelers */}
            <motion.div
              variants={counterAnimation}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center text-center"
            >
              <motion.i
                initial={{ rotate: -180, opacity: 0 }}
                animate={
                  achievementsInView
                    ? { rotate: 0, opacity: 1 }
                    : { rotate: -180, opacity: 0 }
                }
                transition={{ delay: 0.1, duration: 0.6 }}
                className="fas fa-users text-5xl text-orange-500"
              ></motion.i>
              <motion.h3
                initial={{ opacity: 0, scale: 0.5 }}
                animate={
                  achievementsInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.5 }
                }
                transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
                className="text-[3rem] sm:text-[3.5rem] md:text-[4rem] font-extrabold leading-none mt-3"
              >
                {travelersCount}
              </motion.h3>
              <p className="text-lg sm:text-xl font-semibold opacity-90 mt-3">
                Happy Travelers
              </p>
            </motion.div>

            {/* Item 3 - Tours Organized */}
            <motion.div
              variants={counterAnimation}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center"
            >
              <motion.i
                initial={{ rotate: -180, opacity: 0 }}
                animate={
                  achievementsInView
                    ? { rotate: 0, opacity: 1 }
                    : { rotate: -180, opacity: 0 }
                }
                transition={{ delay: 0.2, duration: 0.6 }}
                className="fas fa-plane text-5xl text-orange-500"
              ></motion.i>
              <motion.h3
                initial={{ opacity: 0, scale: 0.5 }}
                animate={
                  achievementsInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.5 }
                }
                transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
                className="text-[3rem] sm:text-[3.5rem] md:text-[4rem] font-extrabold leading-none mt-3"
              >
                {toursCount}
              </motion.h3>
              <p className="text-lg sm:text-xl font-semibold opacity-90 mt-3">
                Tours Organized
              </p>
            </motion.div>

            {/* Item 4 - Awards Won */}
            <motion.div
              variants={counterAnimation}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center"
            >
              <motion.i
                initial={{ rotate: -180, opacity: 0 }}
                animate={
                  achievementsInView
                    ? { rotate: 0, opacity: 1 }
                    : { rotate: -180, opacity: 0 }
                }
                transition={{ delay: 0.3, duration: 0.6 }}
                className="fas fa-award text-5xl text-orange-500"
              ></motion.i>
              <motion.h3
                initial={{ opacity: 0, scale: 0.5 }}
                animate={
                  achievementsInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.5 }
                }
                transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
                className="text-[3rem] sm:text-[3.5rem] md:text-[4rem] font-extrabold leading-none mt-3"
              >
                {awardsCount}
              </motion.h3>
              <p className="text-lg sm:text-xl font-semibold opacity-90 mt-3">
                Awards Won
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default AboutPage;
