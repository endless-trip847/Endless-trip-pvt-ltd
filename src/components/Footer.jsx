"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Packages", href: "/packages" },
  { label: "Contact", href: "/contactus" },
];

export default function Footer() {
  return (
    <footer className="bg-[#4a1f60] text-white pt-20">
      <div className="max-w-6xl mx-auto px-6 pb-8">
        {/* -------- Top Grid -------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 min-h-[260px]">
          {/* About */}
          <div>
            <h4 className="text-orange-400 font-semibold text-2xl mb-4">
              About Endless Trips
            </h4>

            <div className="w-10 h-[3px] bg-orange-400 mb-4 rounded-full" />

            <p className="text-md text-white leading-relaxed">
              One of India’s leading tour operators with over 20 years of
              experience, specializing in international tours, flight ticketing,
              and domestic travel.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              {["facebook-f", "twitter", "instagram", "linkedin-in"].map(
                (icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="
                    group w-12 h-12 rounded-full
                    bg-white/10 flex items-center justify-center
                    transition-all duration-300
                    hover:bg-orange-500 hover:scale-110
                  "
                  >
                    <i
                      className={`fab fa-${icon} text-white transition-colors duration-300`}
                    ></i>
                  </a>
                )
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="px-10">
            <h4 className="text-orange-400 font-semibold text-2xl mb-4">
              Quick Links
            </h4>
            <div className="w-10 h-[3px] bg-orange-400 mb-4 rounded-full" />

            <ul className="space-y-3 text-md text-white/80">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="
          group flex items-center gap-2
          transition-all duration-300
          hover:text-orange-400
        "
                  >
                    <i className="fas fa-chevron-right text-orange-400 transition-transform duration-300 group-hover:translate-x-2"></i>

                    <span className="transition-transform duration-300 group-hover:translate-x-2">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Destinations */}
          <div>
            <h4
              className="text-orange-400 font-semibold text-[1.49rem]
  mb-4 leading-tight"
            >
              Popular Destinations
            </h4>
            <div className="w-10 h-[3px] bg-orange-400 mb-4 rounded-full" />

            <ul className="space-y-3 text-md text-white/80">
              {["Dubai", "Ladakh", "Thailand", "Goa", "Philippines"].map(
                (place) => (
                  <li
                    key={place}
                    className="
    group flex items-center gap-2
    cursor-pointer
    transition-all duration-300
    hover:text-orange-400
  "
                  >
                    <i className="fas fa-map-marker-alt text-orange-400 transition-transform duration-300 group-hover:translate-x-2"></i>

                    <span className="transition-transform duration-300 group-hover:translate-x-2">
                      {place}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-orange-400 font-semibold text-2xl mb-4">
              Contact Info
            </h4>
            <div className="w-10 h-[3px] bg-orange-400 mb-4 rounded-full" />

            <ul className="space-y-4 text-md text-white/80">
              <li
                className="
    group flex gap-3 cursor-pointer
    transition-all duration-300
  "
              >
                <i className="fas fa-phone text-orange-400 transition-transform duration-300 group-hover:translate-x-2"></i>

                <span className="transition-transform duration-300 group-hover:translate-x-2">
                  226 ,2nd Floor, D-block, Olive Green, Gota, Ahmedabad,
                  Daskroi, Gujarat, India, 382481
                </span>
              </li>
              <li
                className="
    group flex gap-3 cursor-pointer
    transition-all duration-300
  "
              >
                <i className="fas fa-phone text-orange-400 transition-transform duration-300 group-hover:translate-x-2"></i>

                <span className="transition-transform duration-300 group-hover:translate-x-2">
                  +91 7285064444
                </span>
              </li>

              <li
                className="
    group flex gap-3 cursor-pointer
    transition-all duration-300
  "
              >
                <i className="fas fa-phone text-orange-400 transition-transform duration-300 group-hover:translate-x-2"></i>

                <span className="transition-transform duration-300 group-hover:translate-x-2">
                  info@endlesstrips.in
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* -------- Bottom Bar -------- */}
        <div className="mt-16 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-white/60">
          <span>Privacy Policy</span>
          <span>
            © 2025 Endless Trips Private Limited. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
