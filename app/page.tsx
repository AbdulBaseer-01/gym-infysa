// import Image from "next/image";

import Cta from "@/components/Cta";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Membership from "@/components/Memebership";
import Results from "@/components/Results";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Why from "@/components/Why";

export default function Home() {
  return (
    <div className="min-h-screen ">
      <Hero />
      <Why />
      <Services />
      <Results />
      <Membership />
      <Testimonials />
      <Cta />
      <Footer />
    </div>
  );
}
