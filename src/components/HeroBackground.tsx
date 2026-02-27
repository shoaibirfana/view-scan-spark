import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const serviceWords = [
  "Amazon FBA",
  "Shopify",
  "TikTok Shop",
  "eBay",
  "LLC Formation",
  "Brand Registry",
  "Trademark",
  "Product Sourcing",
  "PPC Ads",
  "Walmart",
];

/* ─── Floating service tag ─── */
const FloatingTag = ({
  label,
  style,
  delay,
}: {
  label: string;
  style: React.CSSProperties;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.6 }}
    className="absolute px-3 py-1.5 rounded-full text-xs font-semibold bg-primary/8 text-primary/40 border border-primary/10 backdrop-blur-sm select-none pointer-events-none"
    style={style}
  >
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4 + delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {label}
    </motion.div>
  </motion.div>
);

/* ─── Network canvas for animated lines/dots ─── */
const NetworkCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    // Particles
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      opacity: number;
    }[] = [];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 1,
        opacity: Math.random() * 0.3 + 0.1,
      });
    }

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      // Update & draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(13, 148, 136, ${p.opacity})`;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(13, 148, 136, ${0.08 * (1 - dist / 150)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.7 }}
    />
  );
};

/* ─── Positions for floating tags (spread around hero) ─── */
const tagPositions: { label: string; style: React.CSSProperties; delay: number }[] = [
  { label: "Amazon FBA", style: { top: "12%", left: "5%" }, delay: 0.5 },
  { label: "Shopify", style: { top: "8%", right: "15%" }, delay: 0.8 },
  { label: "TikTok Shop", style: { bottom: "30%", left: "8%" }, delay: 1.1 },
  { label: "Brand Registry", style: { top: "25%", left: "35%" }, delay: 1.4 },
  { label: "LLC Formation", style: { bottom: "15%", right: "8%" }, delay: 1.7 },
  { label: "Product Sourcing", style: { top: "60%", left: "2%" }, delay: 2.0 },
  { label: "Walmart", style: { bottom: "8%", left: "30%" }, delay: 2.3 },
  { label: "PPC Ads", style: { top: "45%", right: "5%" }, delay: 1.0 },
  { label: "Trademark", style: { bottom: "20%", right: "25%" }, delay: 1.5 },
  { label: "eBay", style: { top: "75%", right: "12%" }, delay: 0.7 },
];

const HeroBackground = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Animated network canvas */}
      <NetworkCanvas />

      {/* Gradient orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-10 w-80 h-80 bg-primary/15 rounded-full blur-[100px]"
      />
      <motion.div
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-10 right-10 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[150px]"
      />

      {/* Floating service tags */}
      {tagPositions.map((t) => (
        <FloatingTag key={t.label} label={t.label} style={t.style} delay={t.delay} />
      ))}
    </div>
  );
};

export default HeroBackground;
