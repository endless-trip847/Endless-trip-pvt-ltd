"use client";

import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/917285064444"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="
        fixed bottom-6 right-6
        bg-[#25D366] text-white
        w-12 h-12
        p-3 rounded-full
        shadow-lg 
        flex items-center justify-center
        hover:scale-107
        transition
        

      "
    >
      <i className="fa-brands fa-whatsapp text-xl"></i>
    </a>
  );
}
