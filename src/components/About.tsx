import { motion } from "framer-motion";
import { Check } from "lucide-react";
import muazPhoto from "@/assets/muaz-photo.png";

const highlights = [
  "Amazon, Shopify, TikTok & eBay Expert",
  "LLC, Trademark & Brand Registry Services",
  "500+ Clients Worldwide",
  "Suspended Account Recovery Specialist",
  "Product Sourcing from China",
  "End-to-End Business Setup",
];

const stats = [
  { value: "500+", label: "Clients Served" },
  { value: "5+", label: "Years Experience" },
  { value: "12+", label: "Services Offered" },
  { value: "100%", label: "Client Satisfaction" },
];

const About = () => {
  return (
    <section id="about" className="py-24 hero-bg">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <img
              src={muazPhoto}
              alt="Muaz Tanzeel"
              className="w-72 h-80 sm:w-80 sm:h-96 object-cover rounded-2xl shadow-xl"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3 block">
              About Me
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-6">
              Hi, I'm <span className="text-gradient">Muaz Tanzeel</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              I'm a dedicated e-commerce professional with 5+ years of experience helping
              entrepreneurs launch and scale their online businesses across Amazon, Shopify,
              TikTok, eBay, and Walmart.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Whether you need a complete business setup — from LLC formation and EIN numbers
              to brand registry and trademark filing — or expert help recovering a suspended
              account, I've got you covered.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {highlights.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <Check size={16} className="text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center bg-card rounded-xl p-4 card-elevated">
                  <span className="text-2xl font-heading font-bold text-primary">{stat.value}</span>
                  <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
