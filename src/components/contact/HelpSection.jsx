"use client";
import { FaHeadset, FaCalendarCheck, FaQuestionCircle } from "react-icons/fa";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HelpSection() {
  // Smooth scroll handler
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  const hoverCard = {
    scale: 1.05,
    boxShadow: "0px 15px 30px rgba(0,0,0,0.2)",
    transition: {
      type: "spring",
      stiffness: 250,
      damping: 20,
    },
  };

  const hoverIcon = {
    rotate: 15,
    y: -3,
    transition: { type: "spring", stiffness: 300, damping: 12 },
  };

  const cards = [
    {
      icon: <FaHeadset />,
      title: "Customer Support",
      desc: "Our dedicated support team is available to assist you with any questions or concerns about your travel plans.",
      link: "tel:+919999999999",
      linkText: "Call Now",
      isLink: true,
    },
    {
      icon: <FaCalendarCheck />,
      title: "Book an Appointment",
      desc: "Schedule a personalized consultation with our travel experts to plan your perfect holiday experience.",
      link: "#ContactForm",
      linkText: "Book Now",
      isLink: false,
    },
    {
      icon: <FaQuestionCircle />,
      title: "Frequently Asked Questions",
      desc: "Find answers to common questions about bookings, payments, travel documents, and more in our comprehensive FAQ.",
      link: "/faq#FAQPage",
      linkText: "View FAQs",
      isLink: false,
      isButton: true,
    },
  ];

  return (
    <section className="bg-gray-100 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-4 sm:mb-8"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            How Can We Help You?
          </h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7 }}
            className="w-24 h-1 bg-purple-600 mx-auto origin-left"
          />
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={hoverCard}
              className="help-card bg-white rounded-lg shadow-md p-6 text-center cursor-pointer"
            >
              <motion.div
                whileHover={hoverIcon}
                className="icon-wrap text-[#421C58] text-[50px] mb-4 inline-block"
              >
                {card.icon}
              </motion.div>
              <h2 className="title text-xl font-semibold mb-2">{card.title}</h2>
              <p className="desc text-gray-600 mb-4">{card.desc}</p>

              {card.isLink && (
                <a
                  href={card.link}
                  className="group inline-block text-[#FD8513] font-semibold hover:text-blue-600 transition-colors duration-300"
                >
                  {card.linkText}
                  <div className="w-24 h-1 bg-[#FD8513] mt-1 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                </a>
              )}

              {card.isButton && (
                <button
                  onClick={() => {
                    const faqSection = document.getElementById("FAQPage");
                    faqSection?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="group inline-block text-[#FD8513] font-semibold hover:text-blue-600 transition-colors duration-300"
                >
                  <Link href={card.link} scroll={false}>
                    {card.linkText}
                    <div className="w-24 h-1 bg-[#FD8513] mt-1 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  </Link>
                </button>
              )}

              {!card.isLink && !card.isButton && (
                <Link
                  href={card.link}
                  className="group inline-block text-[#FD8513] font-semibold hover:text-blue-600 transition-colors duration-300"
                >
                  {card.linkText}
                  <div className="w-24 h-1 bg-[#FD8513] mt-1 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
