import { motion } from "framer-motion";
import { Check, Award } from "lucide-react";
import muazPhoto from "@/assets/muaz-photo.png";

const highlights = [
  "Amazon, Shopify, TikTok & eBay Expert",
  "LLC, Trademark & Brand Registry Services",
  "300+ Clients Worldwide",
  "Suspended Account Recovery Specialist",
  "Product Sourcing from China",
  "End-to-End Business Setup",
];

const stats = [
  { value: "300+", label: "Clients Served" },
  { value: "4+", label: "Years Experience" },
  { value: "12+", label: "Services Offered" },
  { value: "100%", label: "Client Satisfaction" },
];

const About = () => {
  return (
    <section id="about" className="py-24 hero-bg relative overflow-hidden">
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-transparent rounded-3xl blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
              <img
                src={muazPhoto}
                alt="Muaz Tanzeel"
                className="relative w-72 h-80 sm:w-80 sm:h-96 object-cover object-[center_15%] rounded-2xl shadow-2xl ring-1 ring-primary/10"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground rounded-xl p-3 shadow-lg"
              >
                <Award size={28} />
              </motion.div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3 bg-primary/10 px-4 py-2 rounded-full">
              About Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-6 mt-4">
              Our CEO, <span className="text-gradient">Muaz Tanzeel</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              A dedicated e-commerce professional with 4+ years of experience helping
              entrepreneurs launch and scale their online businesses across Amazon, Shopify,
              TikTok, eBay, and Walmart.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Whether you need a complete business setup — from LLC formation and EIN numbers
              to brand registry and trademark filing — or expert help recovering a suspended
              account, our team has you covered. Our mission is to simplify your e-commerce journey
              so you can focus on growing.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {highlights.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check size={12} className="text-primary" />
                  </div>
                  <span className="text-sm text-foreground">{item}</span>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center bg-card/80 backdrop-blur-sm rounded-xl p-4 card-elevated border border-border/50"
                >
                  <span className="text-2xl font-heading font-bold text-primary">{stat.value}</span>
                  <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
