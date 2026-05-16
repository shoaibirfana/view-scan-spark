import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import logo from "@/assets/logo.png";
import heroCenter from "@/assets/hero-center.png";
import { useCountUp } from "@/hooks/use-count-up";

gsap.registerPlugin(ScrollTrigger);

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
      <span className="text-lg sm:text-xl lg:text-2xl font-heading font-bold text-white">
        {prefix}{formatMetric(count)}{suffix}
      </span>
      <span className="text-[10px] sm:text-xs text-white/80 text-center leading-tight mt-1">
        {label}
      </span>
    </div>
  );
};

const Hero = ({ startCounters = true }: HeroProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let trigger: ScrollTrigger | null = null;

    const setup = () => {
      // Pause looping playback, GSAP will drive currentTime
      try { video.pause(); } catch {}
      const duration = video.duration || 6;

      trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=250%",
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
          const t = self.progress * duration;
          if (Number.isFinite(t)) {
            try { video.currentTime = Math.min(duration - 0.01, Math.max(0, t)); } catch {}
          }
        },
      });

      ScrollTrigger.refresh();
    };

    if (video.readyState >= 1 && video.duration) {
      setup();
    } else {
      video.addEventListener("loadedmetadata", setup, { once: true });
    }

    return () => {
      trigger?.kill();
      video.removeEventListener("loadedmetadata", setup);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative w-full h-screen overflow-hidden flex items-center pt-20"
    >
      {/* Fullscreen background video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/hero-bg.mp4"
        muted
        autoPlay
        playsInline
        preload="auto"
        loop
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/45 z-[1]" />

      <div className="container mx-auto px-4 lg:px-8 py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center relative">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-white mb-4 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20"
            >
              <img src={logo} alt="" className="w-4 h-4 object-contain" /> Welcome To Our Agency
            </motion.span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-6 text-white">
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
              className="text-white/85 text-lg max-w-lg mb-8 leading-relaxed"
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
                className="group inline-flex items-center gap-2 bg-[#00C48C] text-white px-7 py-3.5 rounded-xl font-semibold hover:shadow-[0_0_30px_rgba(0,196,140,0.55)] transition-all duration-300 hover:scale-105"
              >
                Get Started <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#services"
                className="group inline-flex items-center gap-2 bg-transparent backdrop-blur-sm text-white border border-white/60 px-7 py-3.5 rounded-xl font-semibold hover:border-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
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
                  <span className="text-2xl font-heading font-bold text-white">{s.value}</span>
                  <p className="text-xs text-white/75 mt-1">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right column: Image + Metrics */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col items-center mt-8 lg:mt-0"
          >
            <div className="relative w-full max-w-[600px] rounded-2xl overflow-hidden border-2 border-white/20 shadow-[0_0_40px_rgba(0,196,140,0.25)]">
              <img
                src={heroCenter}
                alt="E-Commerce Success Journey"
                className="w-full h-auto object-cover"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="w-full max-w-[600px] mt-4 grid grid-cols-4 bg-[#00C48C]/90 backdrop-blur-md rounded-xl overflow-hidden"
            >
              {heroMetrics.map((m, i) => (
                <div
                  key={m.label}
                  className={i < heroMetrics.length - 1 ? "border-r border-white/20" : ""}
                >
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
