import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Store, ShoppingCart, Video, Tag, Building2, Shield,
  FileText, RefreshCw, Package, BarChart3, Users, Warehouse,
  ChevronDown, ChevronUp, Send,
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

const Services = () => {
  const [showAll, setShowAll] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const [cols, setCols] = useState(4);
  const [customName, setCustomName] = useState("");
  const [customService, setCustomService] = useState("");
  const [customDetails, setCustomDetails] = useState("");

  useEffect(() => {
    const detectCols = () => {
      if (!gridRef.current) return;
      const firstChild = gridRef.current.children[0] as HTMLElement | undefined;
      if (!firstChild) return;
      const gridWidth = gridRef.current.offsetWidth;
      const childWidth = firstChild.offsetWidth;
      if (childWidth > 0) {
        setCols(Math.max(1, Math.round(gridWidth / childWidth)));
      }
    };

    const timeout = setTimeout(detectCols, 100);
    window.addEventListener("resize", detectCols);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", detectCols);
    };
  }, []);

  const initialCount = cols * 2;
  const visible = showAll ? services : services.slice(0, initialCount);

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hi! I'd like to request a custom e-commerce service.\n\nName: ${customName}\nService Needed: ${customService}\nDetails: ${customDetails}`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/19413050102?text=${encoded}`, "_blank");
  };

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

        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
        {services.length > initialCount && (
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

        {/* Custom Service Request - only visible when expanded */}
        <AnimatePresence>
          {showAll && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-16"
            >
              <div className="max-w-2xl mx-auto rounded-2xl border border-primary/20 bg-card/60 backdrop-blur-xl p-8 sm:p-10 shadow-[0_8px_40px_hsl(var(--primary)/0.08)]">
                <div className="text-center mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Send className="text-primary" size={26} />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-card-foreground">
                    Get Your Own <span className="text-gradient">Custom Service</span>
                  </h3>
                  <p className="text-muted-foreground text-sm mt-2 max-w-md mx-auto">
                    Don't see what you need? Tell us about your e-commerce requirement and we'll create a tailored solution just for you.
                  </p>
                </div>

                <form onSubmit={handleCustomSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Your Name</label>
                    <input
                      type="text"
                      required
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background/80 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Service You Need</label>
                    <input
                      type="text"
                      required
                      value={customService}
                      onChange={(e) => setCustomService(e.target.value)}
                      placeholder="e.g. Etsy Store Setup, Inventory Management..."
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background/80 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Additional Details</label>
                    <textarea
                      required
                      value={customDetails}
                      onChange={(e) => setCustomDetails(e.target.value)}
                      rows={3}
                      placeholder="Describe your requirements, budget, and timeline..."
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background/80 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3.5 rounded-xl font-semibold hover:shadow-[0_0_30px_hsl(var(--primary)/0.3)] transition-all duration-300 hover:scale-[1.02]"
                  >
                    <Send size={18} />
                    Send Request via WhatsApp
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Services;
