import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import MarketplaceBanner from "@/components/MarketplaceBanner";
import Results from "@/components/Results";
import CaseStudies from "@/components/CaseStudies";
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
      <Helmet>
        <title>Amazon PPC & eCommerce Growth Agency | Team Ecomify</title>
        <meta name="description" content="Team Ecomify helps Amazon and eCommerce brands grow with expert PPC management, listing optimization, account management, and marketplace strategy. 300+ satisfied clients." />
        <link rel="canonical" href="https://teamecomify.com/" />
        <meta property="og:title" content="Amazon PPC & eCommerce Growth Agency | Team Ecomify" />
        <meta property="og:description" content="Team Ecomify helps Amazon and eCommerce brands grow with expert PPC management, listing optimization, and marketplace strategy. 300+ satisfied clients." />
        <meta property="og:url" content="https://teamecomify.com/" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Team Ecomify",
          "url": "https://teamecomify.com",
          "logo": "https://teamecomify.com/logo.png",
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
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "What does an Amazon PPC agency do?", "acceptedAnswer": { "@type": "Answer", "text": "An Amazon PPC agency manages your Sponsored Products, Sponsored Brands, and Sponsored Display campaigns to maximize sales while minimizing wasted ad spend." } },
            { "@type": "Question", "name": "How much does Amazon PPC management cost?", "acceptedAnswer": { "@type": "Answer", "text": "Team Ecomify offers flexible Amazon PPC management packages. Contact us on WhatsApp for a custom quote based on your ad budget and goals." } },
            { "@type": "Question", "name": "Can you manage Walmart Marketplace accounts?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Team Ecomify provides complete Walmart Marketplace seller account setup, listing optimization, and ongoing management." } },
            { "@type": "Question", "name": "How long does Amazon listing optimization take?", "acceptedAnswer": { "@type": "Answer", "text": "Our team typically delivers optimized Amazon listings within 3–5 business days, including keyword research, title, bullet points, description, and backend search terms." } }
          ]
        })}</script>
      </Helmet>
      <LoadingScreen isLoading={isLoading} />
      <Navbar />
      <Hero startCounters={!isLoading} />
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
