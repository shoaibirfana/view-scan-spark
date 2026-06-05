import { motion } from "framer-motion";
import { ArrowRight, Star, Lock, Zap } from "lucide-react";
import heroCenter from "@/assets/hero-center.png";
import HeroBackground from "./HeroBackground";
import { useCountUp } from "@/hooks/use-count-up";

interface HeroProps {
  startCounters?: boolean;
}

const stats = [
  { value: "300+", label: "Satisfied Clients" },
  { value: "85%", label: "Sales Growth" },
  { value: "12+", label: "Services" },
];

const heroMetrics = [
  { end: 5600000, prefix: "$", suffix: "+", label: "Revenue Generated" },
  { end: 180000, prefix: "", suffix: "+", label: "Orders Delivered" },
  { end: 800000, prefix: "$", suffix: "+", label: "Ads Spend Managed" },
  { end: 8, prefix: "", suffix: "+", label: "Brands Launched" },
];

function formatMetric(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(n >= 10_000 ? 0 : 1).replace(/\.0$/, "")}K`;
  return n.toString();
}

const MetricCounter = ({ end, prefix, suffix, label, ready }: typeof heroMetrics[number] & { ready: boolean }) => {
  const { count, ref } = useCountUp(end, 4000, true, ready);
  return (
    <div ref={ref} className="flex flex-col items-center justify-center py-4 px-2">
      <span className="text-lg sm:text-xl lg:text-2xl font-heading font-bold text-primary-foreground">
        {prefix}{formatMetric(count)}{suffix}
      </span>
      <span className="text-[10px] sm:text-xs text-primary-foreground/80 text-center leading-tight mt-1">
        {label}
      </span>
    </div>
  );
};

const Hero = ({ startCounters = true }: HeroProps) => {
  return (
    <section id="home" className="hero-bg min-h-screen flex items-center pt-20 relative overflow-hidden">
      <HeroBackground />

      <div className="container mx-auto px-4 lg:px-8 py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-6 text-white">
              <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="block">
                We Grow
              </motion.span>
              <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }} className="text-gradient block">
                Amazon &amp; eCommerce
              </motion.span>
              <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }} className="block">
                Brands.
              </motion.span>
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-white/80 text-lg max-w-lg mb-8 leading-relaxed"
            >
              From Amazon PPC and listing optimization to full store management — Team Ecomify has generated $5.6M+ in client revenue across 300+ brands worldwide.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://wa.me/19413050102"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-xl font-semibold hover:shadow-[0_0_30px_hsl(160_90%_27%/0.4)] transition-all duration-300 hover:scale-105"
                >
                  Get a Free Audit <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#services"
                  className="group inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white border border-white/20 px-7 py-3.5 rounded-xl font-semibold hover:border-white/40 hover:bg-white/15 transition-all duration-300 hover:scale-105"
                >
                  Our Services <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-x-6 gap-y-3 mt-6 text-sm text-white/85">
                <span className="inline-flex items-center gap-1.5">
                  <Star size={14} className="fill-yellow-400 text-yellow-400" /> 300+ satisfied clients
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Lock size={14} className="text-primary" /> No long-term contracts
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Zap size={14} className="text-primary" /> Reply within 1 hour
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex gap-8 mt-10"
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <span className="text-2xl font-heading font-bold text-primary">{s.value}</span>
                  <p className="text-xs text-white/70 mt-1">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col items-center mt-8 lg:mt-0"
          >
            <div className="relative w-full max-w-[600px] rounded-2xl overflow-hidden border-2 border-primary/30 shadow-[0_0_40px_hsl(var(--primary)/0.25)]">
              <img src={heroCenter} alt="E-Commerce Success Journey" className="w-full h-auto object-cover" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="w-full max-w-[600px] mt-4 grid grid-cols-4 bg-primary rounded-xl overflow-hidden"
            >
              {heroMetrics.map((m, i) => (
                <div key={m.label} className={i < heroMetrics.length - 1 ? "border-r border-primary-foreground/20" : ""}>
                  <MetricCounter {...m} ready={startCounters} />
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
