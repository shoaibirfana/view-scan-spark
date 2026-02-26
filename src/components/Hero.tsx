import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import muazPhoto from "@/assets/muaz-photo.png";

const Hero = () => {
  return (
    <section id="home" className="hero-bg min-h-screen flex items-center pt-20 relative overflow-hidden">
      {/* Decorative circle */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full border border-primary/10" />
      <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full border border-primary/10" />

      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4 block">
              E-Commerce Expert
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-6">
              I'm{" "}
              <span className="text-gradient">Muaz Tanzeel</span>
              <br />
              Your Partner in E-Commerce Success
            </h1>
            <p className="text-muted-foreground text-lg max-w-lg mb-8 leading-relaxed">
              From Amazon & Shopify to TikTok Shop — I help entrepreneurs build, launch,
              and scale profitable online businesses with complete services including LLC
              formation, brand registry, trademark filing, and more.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://wa.me/19413050102"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Contact Me on WhatsApp <ArrowRight size={18} />
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 bg-foreground text-background px-7 py-3.5 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Explore Services <ArrowRight size={18} />
              </a>
            </div>
          </motion.div>

          {/* Image + stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              <img
                src={muazPhoto}
                alt="Muaz Tanzeel - E-Commerce Expert"
                className="w-72 h-80 sm:w-80 sm:h-96 object-cover object-bottom rounded-2xl shadow-xl"
              />
              {/* Stat cards */}
              <div className="absolute -left-8 bottom-12 bg-card rounded-xl p-4 card-elevated">
                <span className="text-2xl font-heading font-bold text-primary">300+</span>
                <p className="text-xs text-muted-foreground mt-1">Clients Served</p>
              </div>
              <div className="absolute -right-8 top-8 bg-card rounded-xl p-4 card-elevated">
                <span className="text-2xl font-heading font-bold text-primary">5+</span>
                <p className="text-xs text-muted-foreground mt-1">Years Experience</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
