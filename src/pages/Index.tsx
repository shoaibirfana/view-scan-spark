import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import ScrollHero from "@/components/ScrollHero";
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
import CaseStudies from "@/components/CaseStudies";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const images = Array.from(document.images);
    const unloaded = images.filter((img) => !img.complete);

    if (unloaded.length === 0) {
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
      <Helmet>
        <title>Amazon PPC & eCommerce Growth Agency | Team Ecomify</title>
        <meta name="description" content="Team Ecomify helps Amazon and eCommerce brands grow with expert PPC management, listing optimization, account management, and marketplace strategy. 300+ satisfied clients." />
        <link rel="canonical" href="https://www.teamecomify.com/" />
        <meta property="og:title" content="Amazon PPC & eCommerce Growth Agency | Team Ecomify" />
        <meta property="og:description" content="Team Ecomify helps Amazon and eCommerce brands grow with expert PPC management, listing optimization, and marketplace strategy. 300+ satisfied clients." />
        <meta property="og:url" content="https://www.teamecomify.com/" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Team Ecomify",
          "url": "https://www.teamecomify.com",
          "logo": "https://www.teamecomify.com/logo.png",
          "description": "eCommerce growth agency specializing in Amazon PPC, listing optimization, account management, and marketplace management.",
          "telephone": "+1-941-305-0102",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-941-305-0102",
            "contactType": "sales",
            "availableLanguage": "English"
          },
          "sameAs": [
            "https://www.linkedin.com/company/teamecomify",
            "https://www.facebook.com/teamecomify"
          ]
        })}</script>
      </Helmet>
      <LoadingScreen isLoading={isLoading} />
      <Navbar />
      <ScrollHero />
      <MarketplaceBanner />
      <Services />
      <CaseStudies />
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
