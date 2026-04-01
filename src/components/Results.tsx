import { motion } from "framer-motion";
import logo from "@/assets/logo.png";
import result1 from "@/assets/results/result-1.jpg";
import result2 from "@/assets/results/result-2.jpg";
import result3 from "@/assets/results/result-3.jpg";
import result4 from "@/assets/results/result-4.jpg";
import result5 from "@/assets/results/result-5.jpg";
import result6 from "@/assets/results/result-6.jpg";
import result7 from "@/assets/results/result-7.jpg";
import result8 from "@/assets/results/result-8.jpg";

const row1 = [result1, result2, result3, result4];
const row2 = [result5, result6, result7, result8];

const MarqueeRow = ({
  images,
  direction = "left",
  duration = 30,
}: {
  images: string[];
  direction?: "left" | "right";
  duration?: number;
}) => {
  // Duplicate for seamless loop
  const doubled = [...images, ...images];

  return (
    <div className="relative overflow-hidden py-3">
      <motion.div
        className="flex gap-6"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          x: {
            duration,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      >
        {doubled.map((img, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[340px] sm:w-[400px] lg:w-[460px] rounded-xl overflow-hidden border border-border/50 shadow-[0_8px_30px_hsl(var(--primary)/0.08)] hover:border-primary/30 transition-colors duration-300"
          >
            <img
              src={img}
              alt={`Client result ${(i % images.length) + 1}`}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </motion.div>
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
            <img src={logo} alt="" className="w-4 h-4 object-contain" /> Proven Success
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4 mt-4">
            Results <span className="text-gradient">Don't Lie</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We let the dashboards do the talking. Real students, real products, real payouts.
          </p>
        </motion.div>
      </div>

      {/* Marquee rows — full width, no container constraint */}
      <div className="relative z-10 space-y-6">
        <MarqueeRow images={row1} direction="left" duration={35} />
        <MarqueeRow images={row2} direction="right" duration={40} />
      </div>
    </section>
  );
};

export default Results;
