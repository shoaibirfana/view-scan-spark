import { motion } from "framer-motion";
<<<<<<< HEAD
import { ArrowRight } from "lucide-react";
=======
import { ArrowRight, Star, Lock, Zap } from "lucide-react";
>>>>>>> 05217bc72bdcf6146af743a93749a67c87328a73
import heroCenter from "@/assets/hero-center.png";
import { useCountUp } from "@/hooks/use-count-up";

interface HeroProps { startCounters?: boolean; }

const heroMetrics = [
  { end: 5600000, prefix: "$", suffix: "+", label: "Revenue Generated" },
  { end: 180000,  prefix: "",  suffix: "+", label: "Orders Delivered"  },
  { end: 800000,  prefix: "$", suffix: "+", label: "Ads Managed"       },
  { end: 300,     prefix: "",  suffix: "+", label: "Brands Served"     },
];

function fmt(n: number) {
  if (n >= 1_000_000) return `${(n/1_000_000).toFixed(1).replace(/\.0$/,"")}M`;
  if (n >= 1_000)     return `${(n/1_000).toFixed(n>=10_000?0:1).replace(/\.0$/,"")}K`;
  return String(n);
}

const Metric = ({ end, prefix, suffix, label, ready }: typeof heroMetrics[number] & { ready: boolean }) => {
  const { count, ref } = useCountUp(end, 3500, true, ready);
  return (
    <div ref={ref} className="flex flex-col items-center justify-center py-4 px-1">
      <span className="text-base sm:text-lg font-heading font-bold text-primary-foreground">{prefix}{fmt(count)}{suffix}</span>
      <span className="text-[9px] sm:text-[10px] text-primary-foreground/75 text-center mt-0.5 leading-tight">{label}</span>
    </div>
  );
};

const Hero = ({ startCounters = true }: HeroProps) => (
  <section id="home" className="hero-bg relative min-h-screen flex items-center pt-20 overflow-hidden">

<<<<<<< HEAD
    {/* Soft animated gradient blobs — light, on-theme */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute rounded-full"
        style={{ width:520, height:520, top:"-10%", left:"-8%", background:"radial-gradient(circle, hsl(160 90% 27% / 0.14), transparent 70%)" }}
        animate={{ x:[0,40,0], y:[0,30,0] }}
        transition={{ duration:14, repeat:Infinity, ease:"easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{ width:460, height:460, bottom:"-12%", right:"-6%", background:"radial-gradient(circle, hsl(165 80% 35% / 0.12), transparent 70%)" }}
        animate={{ x:[0,-35,0], y:[0,-25,0] }}
        transition={{ duration:16, repeat:Infinity, ease:"easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{ width:360, height:360, top:"30%", right:"25%", background:"radial-gradient(circle, hsl(160 90% 27% / 0.08), transparent 70%)" }}
        animate={{ scale:[1,1.15,1], opacity:[0.6,1,0.6] }}
        transition={{ duration:10, repeat:Infinity, ease:"easeInOut" }}
      />
    </div>

    {/* Subtle dot grid overlay */}
    <div className="absolute inset-0 pointer-events-none opacity-[0.4]"
         style={{ backgroundImage:"radial-gradient(hsl(160 90% 27% / 0.07) 1px, transparent 1px)", backgroundSize:"28px 28px" }} />

    <div className="container mx-auto px-4 lg:px-8 py-20 relative z-10">
      <div className="grid lg:grid-cols-2 gap-12 items-center">

        {/* ── LEFT ── */}
        <div>
=======
      <div className="container mx-auto px-4 lg:px-8 py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center relative">
>>>>>>> 05217bc72bdcf6146af743a93749a67c87328a73
          <motion.div
            initial={{opacity:0,y:-12}} animate={{opacity:1,y:0}} transition={{duration:.6,delay:.1}}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20"
          >
<<<<<<< HEAD
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"/>
            Trusted by 300+ eCommerce Brands
          </motion.div>

          <h1 className="font-heading font-bold leading-[1.08] tracking-tight mb-6" style={{fontSize:"clamp(2.5rem,4.5vw,3.8rem)"}}>
            {[
              {text:"We Grow",   grad:false},
              {text:"Amazon &",  grad:false},
              {text:"eCommerce", grad:true },
              {text:"Brands.",   grad:false},
            ].map((l,i)=>(
              <motion.span key={i} initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}}
                transition={{delay:.15+i*.1,duration:.65,ease:[.16,1,.3,1]}}
                className={`block ${l.grad?"text-gradient":"text-foreground"}`}
              >{l.text}</motion.span>
            ))}
          </h1>

          <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.6,duration:.7}}
            className="mb-8 leading-relaxed max-w-lg text-muted-foreground" style={{fontSize:"1.05rem"}}
          >
            From Amazon PPC and listing optimization to full store management —
            Team Ecomify has generated{" "}
            <span className="text-foreground font-semibold">$5.6M+</span> in client revenue
            across <span className="text-foreground font-semibold">300+ brands</span> worldwide.
          </motion.p>

          <motion.div initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{delay:.72,duration:.6}}
            className="flex flex-wrap gap-3 mb-8"
          >
            <a href="https://wa.me/19413050102" target="_blank" rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 font-semibold text-sm px-7 py-3.5 rounded-xl bg-primary text-primary-foreground transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_28px_hsl(160_90%_27%/0.4)]"
            >
              Get a Free Audit
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform"/>
            </a>
            <a href="#services"
              className="group inline-flex items-center gap-2 font-semibold text-sm px-7 py-3.5 rounded-xl bg-card text-foreground border border-border transition-all duration-300 hover:scale-[1.03] hover:border-primary/40"
            >
              Our Services
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform"/>
            </a>
          </motion.div>

          {/* Trust row */}
          <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.85,duration:.6}}
            className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground"
          >
            <span className="flex items-center gap-1.5"><span className="text-primary font-bold">★★★★★</span> 300+ satisfied clients</span>
            <span className="flex items-center gap-1.5"><span className="text-primary">📋</span> Short &amp; long term contracts</span>
            <span className="flex items-center gap-1.5"><span className="text-primary">⚡</span> Reply within 1 hour</span>
=======
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
>>>>>>> 05217bc72bdcf6146af743a93749a67c87328a73
          </motion.div>
        </div>

        {/* ── RIGHT ── */}
        <motion.div
          initial={{opacity:0,scale:.94}} animate={{opacity:1,scale:1}}
          transition={{duration:.9,delay:.3,ease:[.16,1,.3,1]}}
          className="relative flex flex-col items-center mt-8 lg:mt-0"
        >
          <div className="absolute inset-0 rounded-3xl blur-[70px] pointer-events-none"
               style={{background:"hsl(160 90% 27% / 0.12)",transform:"scale(.85)"}}/>

          {/* image + Last 30 days badge */}
          <div className="relative w-full max-w-[560px] rounded-2xl overflow-hidden border border-primary/20 shadow-[0_0_50px_hsl(160_90%_27%/0.18)]">
            <img src={heroCenter} alt="eCommerce Growth" className="w-full h-auto object-cover"/>

            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-card/90 border border-primary/30 text-primary backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"/>
              Last 30 days
            </div>
          </div>

          {/* metrics bar */}
          <motion.div
            initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{delay:.9,duration:.6}}
            className="w-full max-w-[560px] mt-3 grid grid-cols-4 rounded-xl overflow-hidden bg-primary shadow-[0_12px_40px_hsl(160_90%_27%/0.35)]"
          >
            {heroMetrics.map((m,i)=>(
              <div key={m.label} className={i<3?"border-r border-primary-foreground/15":""}>
                <Metric {...m} ready={startCounters}/>
              </div>
            ))}
          </motion.div>

          {/* live badge */}
          <motion.div
            initial={{opacity:0,scale:.7}} animate={{opacity:1,scale:1}}
            transition={{delay:1.1,duration:.5,ease:[.34,1.56,.64,1]}}
            className="absolute -top-4 -right-2 rounded-xl px-3 py-2 hidden lg:block bg-card border border-primary/25 shadow-lg"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"/>
              <span className="text-xs font-semibold text-foreground">Live Support</span>
            </div>
            <p className="text-[10px] mt-0.5 text-muted-foreground">Avg. reply in 4 min</p>
          </motion.div>
        </motion.div>

      </div>
    </div>
  </section>
);

export default Hero;
