import Hero from "@/components/Hero.jsx";
import FeaturedDestinations from "@/components/FeaturedDestinations.jsx";
import WhyChooseUs from "@/components/WhyChooseUs.jsx";
import CTASection from "@/components/CTASection.jsx";

export default function Home() {
  return (
    <>
      {/* <Navbar /> */}
      <Hero />
      <FeaturedDestinations />
      <WhyChooseUs />
      <CTASection />
      {/* <Footer /> */}
      {/* <WhatsAppButton /> */}
    </>
  );
}
