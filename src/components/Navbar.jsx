"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import { Poppins } from "next/font/google"; // Add this import
import Link from "next/link";
import { usePathname } from "next/navigation";

// Configure Poppins font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // Include weights you need
  style: ["normal", "italic"], // Optional
});

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Packages", href: "/packages" },
  { label: "Contact", href: "/contactus" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const pathname = usePathname();

  /* ---------------- Scroll background change ---------------- */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---------------- Smooth scroll handler ---------------- */
  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setActive(id);
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 font-[var(--font-poppins)]
  bg-white/90 backdrop-blur-md
  transition-all duration-300
  ${scrolled ? "shadow-md" : "shadow-none"}
`}
    >
      {/* ---------------- Navbar Row ---------------- */}
      <div
        className={`max-w-7xl mx-auto px-6 flex items-center justify-between transition-all duration-300 ${
          scrolled ? "h-14" : "h-16"
        }`}
      >
        {/* Logo */}
        <div
          className="flex items-center cursor-pointer"
          onClick={() => handleScroll("home")}
        >
          <Link href="/">
            <Image
              src="/logo.jpeg"
              alt="Logo"
              width={140}
              height={40}
              className="h-11 w-auto object-contain"
              priority
            />
          </Link>
        </div>

        {/* ---------------- Desktop Menu ---------------- */}
        <nav
          className={`hidden md:flex items-center gap-10 ${poppins.className}`}
        >
          {" "}
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`relative group tracking-tight
    ${
      pathname === link.href
        ? "text-orange-500 font-semibold"
        : "text-gray-800 font-medium"
    }
  `}
            >
              {link.label}

              <span
                className={`absolute left-0 -bottom-2 h-[2px] bg-orange-500
      transition-[width] duration-300
      ${pathname === link.href ? "w-full" : "w-0 group-hover:w-full"}
    `}
              />
            </Link>
          ))}
        </nav>

        {/* ---------------- Mobile Hamburger ---------------- */}
        <button
          className="md:hidden text-2xl text-gray-800"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* ---------------- Mobile Menu ---------------- */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`md:hidden bg-white border-t shadow-lg ${poppins.className}`}
          >
            <nav className="flex flex-col px-6 py-6 gap-5">
              {NAV_LINKS.map((link) => {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`text-left text-base font-medium tracking-tight
    ${pathname === link.href ? "text-orange-500" : "text-gray-800"}
  `}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
