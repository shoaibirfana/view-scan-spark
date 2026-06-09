/*
  SEO setup notes (off-page):
  - Submit https://www.teamecomify.com/sitemap.xml to Google Search Console & Bing Webmaster Tools.
  - Share each blog post on LinkedIn, X/Twitter, Facebook, and relevant Reddit/Quora threads.
  - Republish (with canonical link back) on Medium and LinkedIn Articles for backlinks.
*/
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import AmazonPPC from "./pages/AmazonPPC";
import AmazonListing from "./pages/AmazonListing";
import AmazonAccount from "./pages/AmazonAccount";
import WalmartMarketplace from "./pages/WalmartMarketplace";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/amazon-ppc-management" element={<AmazonPPC />} />
            <Route path="/amazon-listing-optimization" element={<AmazonListing />} />
            <Route path="/amazon-account-management" element={<AmazonAccount />} />
            <Route path="/walmart-marketplace" element={<WalmartMarketplace />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
