import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import MarketplaceBanner from "@/components/MarketplaceBanner";
import Results from "@/components/Results";
import About from "@/components/About";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
import Consultancy from "@/components/Consultancy";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <MarketplaceBanner />
      <Services />
      <Results />
      <About />
      <Team />
      <Consultancy />
      <Testimonials />
      <CtaSection />
      <Footer />
    </div>
  );
};

export default Index;
