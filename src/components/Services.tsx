import { motion } from "framer-motion";
import {
  Store, ShoppingCart, Video, Tag, Building2, Shield,
  FileText, RefreshCw, Package, BarChart3, Users, Warehouse,
} from "lucide-react";

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
  return (
    <section id="services" className="py-24 bg-background relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3 bg-primary/10 px-4 py-2 rounded-full">
            What We Offer
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold mt-4">
            Everything You Need to{" "}
            <span className="text-gradient">Build & Scale</span>
            <br />
            Your E-Commerce Business
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group relative bg-card/80 backdrop-blur-sm rounded-xl p-6 card-elevated border border-border/50 hover:border-primary/30 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <service.icon className="text-primary" size={24} />
                </div>
                <h3 className="font-heading font-semibold text-card-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {service.desc}
                </p>
                <a
                  href="https://wa.me/19413050102"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary text-sm font-semibold hover:underline inline-flex items-center gap-1 group-hover:gap-2 transition-all"
                >
                  Get Started →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
