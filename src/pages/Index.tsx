import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import MarketplaceBanner from "@/components/MarketplaceBanner";
import Results from "@/components/Results";
import About from "@/components/About";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
import Consultancy from "@/components/Consultancy";
import BlogPreview from "@/components/BlogPreview";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import LoadingScreen from "@/components/LoadingScreen";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const images = Array.from(document.images);
    const unloaded = images.filter((img) => !img.complete);

    if (unloaded.length === 0) {
      // All already loaded (or no images)
      const timer = setTimeout(() => setIsLoading(false), 400);
      return () => clearTimeout(timer);
    }

    let loaded = 0;
    const check = () => {
      loaded++;
      if (loaded >= unloaded.length) {
        setIsLoading(false);
      }
    };

    unloaded.forEach((img) => {
      img.addEventListener("load", check, { once: true });
      img.addEventListener("error", check, { once: true });
    });

    // Safety timeout
    const fallback = setTimeout(() => setIsLoading(false), 5000);

    return () => {
      clearTimeout(fallback);
      unloaded.forEach((img) => {
        img.removeEventListener("load", check);
        img.removeEventListener("error", check);
      });
    };
  }, []);

  return (
    <div className="min-h-screen">
      <LoadingScreen isLoading={isLoading} />
      <Navbar />
      <Hero startCounters={!isLoading} />
      <MarketplaceBanner />
      <Services />
      <Results />
      <About />
      <Team />
      <Consultancy />
      <Testimonials />
      <BlogPreview />
      <CtaSection />
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Index;
