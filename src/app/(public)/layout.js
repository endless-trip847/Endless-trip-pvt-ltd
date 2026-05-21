import "../globals.css";
import Navbar from "@/components/Navbar.jsx";
import WhatsAppButton from "@/components/WhatsAppButton.jsx";
import Footer from "@/components/Footer.jsx";





export const metadata = {
  title: "Endless Trips - Explore the World",
  description:
    "Explore domestic and international travel packages with best prices, expert planning, and 24/7 support.",
};

export default function PublicLayout({ children }) {
  return (
    <>
      <Navbar />

      <main className="min-h-screen">{children}</main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
