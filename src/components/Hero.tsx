import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import muazPhoto from "@/assets/muaz-photo.png";
import Scene3D from "./Scene3D";

const Hero = () => {
  return (
    <section id="home" className="hero-bg min-h-screen flex items-center pt-20 relative overflow-hidden">
      {/* 3D Background */}
      <Scene3D />

      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />

      <div className="container mx-auto px-4 lg:px-8 py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
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
              <Sparkles size={14} /> E-Commerce Expert
            </motion.span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-6">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="block"
              >
                Meet Our CEO{" "}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-gradient block"
              >
                Muaz Tanzeel
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="block text-3xl sm:text-4xl lg:text-5xl mt-2"
              >
                Your Partner in E-Commerce Success
              </motion.span>
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-muted-foreground text-lg max-w-lg mb-8 leading-relaxed"
            >
              From Amazon & Shopify to TikTok Shop — helping entrepreneurs build, launch,
              and scale profitable online businesses with complete services including LLC
              formation, brand registry, trademark filing, and more.
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
                Contact on WhatsApp <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#services"
                className="group inline-flex items-center gap-2 bg-card/80 backdrop-blur-sm text-foreground border border-border px-7 py-3.5 rounded-xl font-semibold hover:border-primary/50 hover:shadow-[0_0_20px_hsl(170_80%_38%/0.15)] transition-all duration-300 hover:scale-105"
              >
                Explore Services <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </motion.div>

          {/* Image + stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex justify-center lg:justify-end"
            style={{ perspective: "1000px" }}
          >
            <div className="relative group">
              {/* Glow behind image */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/5 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-60" />
              
              <img
                src={muazPhoto}
                alt="Muaz Tanzeel - E-Commerce Expert"
                className="relative w-72 h-80 sm:w-80 sm:h-96 object-cover object-[center_15%] rounded-2xl shadow-2xl ring-1 ring-primary/10"
              />
              
              {/* Stat cards with glassmorphism */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -left-8 bottom-12 bg-card/80 backdrop-blur-xl rounded-xl p-4 card-elevated border border-border/50"
              >
                <span className="text-2xl font-heading font-bold text-primary">300+</span>
                <p className="text-xs text-muted-foreground mt-1">Clients Served</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1, duration: 0.5 }}
                className="absolute -right-8 top-8 bg-card/80 backdrop-blur-xl rounded-xl p-4 card-elevated border border-border/50"
              >
                <span className="text-2xl font-heading font-bold text-primary">4+</span>
                <p className="text-xs text-muted-foreground mt-1">Years Experience</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
