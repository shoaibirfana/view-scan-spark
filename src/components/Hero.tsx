import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import logo from "@/assets/logo.png";
import heroCenter from "@/assets/hero-center.jpg";
import HeroBackground from "./HeroBackground";

const stats = [
  { value: "300+", label: "Satisfied Clients" },
  { value: "85%", label: "Sales Growth" },
  { value: "12+", label: "Services" },
];

const Hero = () => {
  return (
    <section id="home" className="hero-bg min-h-screen flex items-center pt-20 relative overflow-hidden">
      <HeroBackground />

      <div className="container mx-auto px-4 lg:px-8 py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center relative">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4 bg-primary/10 px-4 py-2 rounded-full backdrop-blur-sm border border-primary/20"
            >
              <img src={logo} alt="" className="w-4 h-4 object-contain" /> Welcome To Our Agency
            </motion.span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-6">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="block"
              >
                Your Trusted
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-gradient block"
              >
                Partner in E-Commerce
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="block"
              >
                Success
              </motion.span>
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-muted-foreground text-lg max-w-lg mb-8 leading-relaxed"
            >
              Empowering entrepreneurs through complete e-commerce solutions — from
              Amazon &amp; Shopify to TikTok Shop. We handle LLC formation, brand
              registry, product sourcing, and everything in between to drive your
              growth and success.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="https://wa.me/19413050102"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-xl font-semibold hover:shadow-[0_0_30px_hsl(160_90%_27%/0.4)] transition-all duration-300 hover:scale-105"
              >
                Get Started <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#services"
                className="group inline-flex items-center gap-2 bg-card/80 backdrop-blur-sm text-foreground border border-border px-7 py-3.5 rounded-xl font-semibold hover:border-primary/50 hover:shadow-[0_0_20px_hsl(165_57%_60%/0.15)] transition-all duration-300 hover:scale-105"
              >
                Explore Services <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex gap-8 mt-10"
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <span className="text-2xl font-heading font-bold text-primary">{s.value}</span>
                  <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

           <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex justify-center items-center mt-8 lg:mt-0"
          >
            <div className="relative w-full max-w-[600px] rounded-2xl overflow-hidden border-2 border-primary/30 shadow-[0_0_40px_hsl(var(--primary)/0.25)]">
              <img
                src={heroCenter}
                alt="E-Commerce"
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
