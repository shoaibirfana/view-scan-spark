import { motion } from "framer-motion";
import logo from "@/assets/logo.png";
import r1 from "@/assets/results/result-1.png";
import r2 from "@/assets/results/result-2.png";
import r3 from "@/assets/results/result-3.png";
import r4 from "@/assets/results/result-4.png";
import r5 from "@/assets/results/result-5.png";
import r6 from "@/assets/results/result-6.png";
import r7 from "@/assets/results/result-7.png";
import r8 from "@/assets/results/result-8.png";

const resultCards = [r1, r2, r3, r4, r5, r6, r7, r8];

const row1 = resultCards.slice(0, 4);
const row2 = resultCards.slice(4);

const MarqueeRow = ({
  images,
  direction = "left",
  duration = 30,
}: {
  images: string[];
  direction?: "left" | "right";
  duration?: number;
}) => {
  const animationClass = direction === "left" ? "animate-marquee-left" : "animate-marquee-right";

  return (
    <div className="relative overflow-hidden py-3 group">
      <div
        className={`flex w-max min-w-max ${animationClass} motion-reduce:animate-none group-hover:[animation-play-state:paused]`}
        style={{ animationDuration: `${duration}s` }}
      >
        {[0, 1].map((copyIndex) => (
          <div key={copyIndex} className="flex shrink-0 gap-6 pr-6" aria-hidden={copyIndex === 1}>
            {images.map((img, i) => (
              <div
                key={`${copyIndex}-${i}`}
                className="flex-shrink-0 w-[340px] sm:w-[400px] lg:w-[460px] rounded-xl overflow-hidden border border-border/50 bg-card shadow-[0_8px_30px_hsl(var(--primary)/0.08)] hover:border-primary/40 hover:shadow-[0_0_30px_hsl(var(--primary)/0.25)] transition-all duration-500"
              >
                <img
                  src={img}
                  alt={`Client result ${i + 1}`}
                  className="w-full h-auto object-cover aspect-[16/10]"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const Results = () => {
  return (
    <section id="results" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3 bg-primary/10 px-4 py-2 rounded-full">
            <img src={logo} alt="Team Ecomify logo" className="w-4 h-4 object-contain" /> Proven Success
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4 mt-4">
            Results <span className="text-gradient">Don't Lie</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We let the dashboards do the talking. Real students, real products, real payouts.
          </p>
        </motion.div>
      </div>

      <div className="relative z-10 space-y-6">
        <MarqueeRow images={row1} direction="left" duration={35} />
        <MarqueeRow images={row2} direction="right" duration={40} />
      </div>
    </section>
  );
};

export default Results;
