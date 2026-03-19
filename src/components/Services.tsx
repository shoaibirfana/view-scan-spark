import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Store, ShoppingCart, Video, Tag, Building2, Shield,
  FileText, RefreshCw, Package, BarChart3, Users, Warehouse,
  ChevronDown, ChevronUp,
} from "lucide-react";
import logo from "@/assets/logo.png";

const services = [
  { icon: Store, title: "Amazon Store Management", desc: "Complete Amazon seller account setup, product listing optimization, PPC campaigns, and full store management." },
  { icon: ShoppingCart, title: "Shopify Store Development", desc: "Custom Shopify store design, development, theme customization, and ready-to-run store packages." },
  { icon: Video, title: "TikTok Shop Setup", desc: "Launch your TikTok Shop with product listings, content strategy, and influencer marketing guidance." },
  { icon: Tag, title: "eBay Seller Account Setup", desc: "Professional eBay account setup with listing optimization, store branding, and sales strategy." },
  { icon: Building2, title: "LLC Formation", desc: "Complete LLC registration in the USA with compliance, EIN number, and all legal documentation." },
  { icon: Shield, title: "Trademark & Brand Registry", desc: "Protect your brand with trademark filing and Amazon/platform brand registry services." },
  { icon: FileText, title: "EIN Number & Reports", desc: "Get your EIN number, tax compliance setup, financial reports, and business documentation." },
  { icon: RefreshCw, title: "Suspended Account Reactivation", desc: "Expert help to recover and reactivate suspended Amazon, eBay, or Shopify seller accounts." },
  { icon: Package, title: "Product Sourcing from China", desc: "Verified supplier sourcing, quality control, competitive pricing, and logistics management." },
  { icon: BarChart3, title: "Marketing & PPC Management", desc: "Data-driven advertising campaigns across Amazon PPC, Facebook Ads, and Google Ads." },
  { icon: Users, title: "Business Consulting", desc: "One-on-one e-commerce consulting to scale your business with proven strategies and insights." },
  { icon: Warehouse, title: "Walmart Store Setup", desc: "Get approved and launch your Walmart Marketplace seller account with optimized listings." },
];

const INITIAL_COUNT = 8; // 2 rows × 4 cols on xl

const Services = () => {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? services : services.slice(0, INITIAL_COUNT);

  return (
    <section id="services" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3 bg-primary/10 px-4 py-2 rounded-full">
            <img src={logo} alt="" className="w-4 h-4 object-contain" /> What We Offer
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold mt-4">
            Everything You Need to{" "}
            <span className="text-gradient">Build & Scale</span>
            <br />
            Your E-Commerce Business
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {visible.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.04, duration: 0.4 }}
                className="group relative rounded-2xl p-6 border border-primary/10 bg-card/40 backdrop-blur-xl shadow-[0_8px_32px_hsl(var(--primary)/0.06)] hover:border-primary/30 hover:shadow-[0_8px_40px_hsl(var(--primary)/0.12)] transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                    <service.icon className="text-primary" size={24} />
                  </div>
                  <h3 className="font-heading font-semibold text-card-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {service.desc}
                  </p>
                  <a
                    href="#contact"
                    className="text-primary text-sm font-semibold hover:underline inline-flex items-center gap-1 group-hover:gap-2 transition-all"
                  >
                    Get Started →
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Show More / Show Less */}
        {services.length > INITIAL_COUNT && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mt-10"
          >
            <button
              onClick={() => setShowAll((v) => !v)}
              className="group inline-flex items-center gap-2 px-7 py-3 rounded-full bg-card/60 backdrop-blur-xl border border-primary/20 text-sm font-semibold text-foreground hover:border-primary/40 hover:shadow-[0_0_24px_hsl(var(--primary)/0.12)] transition-all duration-300"
            >
              {showAll ? "Show Less" : "Explore More Services"}
              {showAll ? (
                <ChevronUp size={16} className="text-primary group-hover:-translate-y-0.5 transition-transform" />
              ) : (
                <ChevronDown size={16} className="text-primary group-hover:translate-y-0.5 transition-transform" />
              )}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Services;
