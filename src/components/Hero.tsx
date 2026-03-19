import { motion } from "framer-motion";
import { ArrowRight, ShoppingCart, Globe, TrendingUp, Package, Store, BarChart3, Rocket, DollarSign, ShieldCheck } from "lucide-react";
import logo from "@/assets/logo.png";
import HeroBackground from "./HeroBackground";

const HERO_VIDEO_URL = "https://res.cloudinary.com/dxqmakjxj/video/upload/v1773947313/Untitled_design_hkkoxn.mp4";

const orbitItems = [
  { icon: ShoppingCart, label: "Amazon FBA", delay: 0 },
  { icon: Store, label: "Shopify", delay: 1 },
  { icon: Globe, label: "Global Reach", delay: 2 },
  { icon: TrendingUp, label: "Growth", delay: 3 },
  { icon: Package, label: "Sourcing", delay: 4 },
  { icon: BarChart3, label: "Analytics", delay: 5 },
];

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
          {/* Floating glass bubbles between text and video — desktop only */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-48 z-20 pointer-events-none">
            {[
              { icon: Rocket, text: "Launch Fast", top: "18%", delay: 0 },
              { icon: DollarSign, text: "Scale Revenue", top: "48%", delay: 0.3 },
              { icon: ShieldCheck, text: "Brand Protection", top: "76%", delay: 0.6 },
            ].map((bubble) => (
              <motion.div
                key={bubble.text}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + bubble.delay, duration: 0.6, ease: "easeOut" }}
                className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2.5 rounded-full bg-card/70 backdrop-blur-md border border-primary/25 shadow-[0_4px_20px_hsl(var(--primary)/0.12)]"
                style={{ top: bubble.top }}
              >
                <bubble.icon className="text-primary w-4 h-4 shrink-0" />
                <span className="text-xs font-semibold text-foreground whitespace-nowrap">{bubble.text}</span>
              </motion.div>
            ))}
          </div>
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
                className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-xl font-semibold hover:shadow-[0_0_30px_hsl(170_80%_38%/0.4)] transition-all duration-300 hover:scale-105"
              >
                Get Started <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#services"
                className="group inline-flex items-center gap-2 bg-card/80 backdrop-blur-sm text-foreground border border-border px-7 py-3.5 rounded-xl font-semibold hover:border-primary/50 hover:shadow-[0_0_20px_hsl(170_80%_38%/0.15)] transition-all duration-300 hover:scale-105"
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

          {/* Right side — video with orbiting icons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex justify-center items-center mt-8 lg:mt-0"
          >
            {/* Orbiting items */}
            {orbitItems.map((item, i) => {
              const angle = (360 / orbitItems.length) * i;
              return (
                <motion.div
                  key={item.label}
                  className="absolute z-20 w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] lg:w-[400px] lg:h-[400px]"
                  animate={{ rotate: [angle, angle + 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: item.delay * 0.3 }}
                  style={{ transformOrigin: "center center" }}
                >
                  <motion.div
                    animate={{ rotate: [-(angle), -(angle + 360)] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: item.delay * 0.3 }}
                    className="absolute -top-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
                  >
                    <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-card/90 backdrop-blur-md border border-primary/30 shadow-[0_0_15px_hsl(var(--primary)/0.2)] flex items-center justify-center">
                      <item.icon className="text-primary w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <span className="text-[8px] sm:text-[10px] font-semibold text-muted-foreground whitespace-nowrap">{item.label}</span>
                  </motion.div>
                </motion.div>
              );
            })}

            {/* Video in center */}
            <div className="relative w-[220px] h-[220px] sm:w-[270px] sm:h-[270px] lg:w-[340px] lg:h-[340px] rounded-full overflow-hidden border-2 border-primary/30 shadow-[0_0_40px_hsl(var(--primary)/0.25)]">
              <video
                src={HERO_VIDEO_URL}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
