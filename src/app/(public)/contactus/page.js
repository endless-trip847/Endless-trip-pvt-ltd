import React from "react";
import CustomForm from "@/components/contact/ContactForm";
import HelpSection from "@/components/contact/HelpSection";
import ContactHeader from "@/components/contact/ContactHeader";

const Page = () => {
  return (
    <div>
      <ContactHeader />
      <CustomForm />
      <HelpSection />
      {/* ❌ FAQ yaha nahi */}
    </div>
  );
};

export default Page;
