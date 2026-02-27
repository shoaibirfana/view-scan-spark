import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

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
    className="absolute px-3 py-1.5 rounded-full text-[11px] font-semibold bg-primary/10 text-primary/60 border border-primary/15 backdrop-blur-sm select-none pointer-events-none"
    style={style}
  >
    <motion.div
      animate={{ y: [0, -6, 0], x: [0, 3, 0] }}
      transition={{ duration: 3 + delay * 0.5, repeat: Infinity, ease: "easeInOut" }}
    >
      {label}
    </motion.div>
  </motion.div>
);

/* ─── Network canvas ─── */
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
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const w = () => canvas.getBoundingClientRect().width;
    const h = () => canvas.getBoundingClientRect().height;

    // More particles, denser
    const particles: {
      x: number; y: number; vx: number; vy: number;
      r: number; opacity: number; pulse: number; pulseSpeed: number;
    }[] = [];

    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * w(),
        y: Math.random() * h(),
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 2.5 + 0.8,
        opacity: Math.random() * 0.5 + 0.15,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.01 + Math.random() * 0.02,
      });
    }

    let time = 0;

    const draw = () => {
      const cw = w();
      const ch = h();
      ctx.clearRect(0, 0, cw, ch);
      time += 0.016;

      // Update & draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;

        // Smooth wrapping
        if (p.x < -10) p.x = cw + 10;
        if (p.x > cw + 10) p.x = -10;
        if (p.y < -10) p.y = ch + 10;
        if (p.y > ch + 10) p.y = -10;

        const pulseOpacity = p.opacity + Math.sin(p.pulse) * 0.1;
        const pulseR = p.r + Math.sin(p.pulse * 1.5) * 0.4;

        // Glow effect
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, pulseR * 3);
        gradient.addColorStop(0, `rgba(13, 148, 136, ${pulseOpacity})`);
        gradient.addColorStop(1, `rgba(13, 148, 136, 0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, pulseR * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, pulseR, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(13, 148, 136, ${pulseOpacity + 0.1})`;
        ctx.fill();
      });

      // Draw connections — increased range
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            const alpha = 0.12 * (1 - dist / 180);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(13, 148, 136, ${alpha})`;
            ctx.lineWidth = 0.8;
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
    />
  );
};

/* ─── More tags, tighter placement ─── */
const tagPositions: { label: string; style: React.CSSProperties; delay: number }[] = [
  { label: "Amazon FBA", style: { top: "10%", left: "4%" }, delay: 0.3 },
  { label: "Shopify", style: { top: "6%", right: "12%" }, delay: 0.5 },
  { label: "TikTok Shop", style: { bottom: "35%", left: "6%" }, delay: 0.7 },
  { label: "Brand Registry", style: { top: "22%", left: "28%" }, delay: 0.9 },
  { label: "LLC Formation", style: { bottom: "18%", right: "6%" }, delay: 1.1 },
  { label: "Product Sourcing", style: { top: "55%", left: "3%" }, delay: 1.3 },
  { label: "Walmart", style: { bottom: "10%", left: "22%" }, delay: 1.5 },
  { label: "PPC Ads", style: { top: "38%", right: "4%" }, delay: 0.6 },
  { label: "Trademark", style: { bottom: "25%", right: "20%" }, delay: 1.0 },
  { label: "eBay", style: { top: "68%", right: "10%" }, delay: 0.4 },
  { label: "EIN Number", style: { top: "15%", left: "48%" }, delay: 1.2 },
  { label: "Account Recovery", style: { bottom: "5%", left: "45%" }, delay: 1.4 },
  { label: "Store Setup", style: { top: "42%", left: "15%" }, delay: 0.8 },
  { label: "Consulting", style: { bottom: "40%", right: "15%" }, delay: 1.6 },
];

const HeroBackground = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Animated network canvas */}
      <NetworkCanvas />

      {/* Gradient orbs — smoother, more visible */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-5 left-5 w-72 h-72 bg-primary/20 rounded-full blur-[80px]"
      />
      <motion.div
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute bottom-5 right-5 w-80 h-80 bg-primary/15 rounded-full blur-[90px]"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.25, 0.1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute top-1/3 left-1/3 w-96 h-96 bg-primary/12 rounded-full blur-[100px]"
      />
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/3 right-1/4 w-60 h-60 bg-primary/10 rounded-full blur-[70px]"
      />

      {/* Floating service tags */}
      {tagPositions.map((t) => (
        <FloatingTag key={t.label} label={t.label} style={t.style} delay={t.delay} />
      ))}
    </div>
  );
};

export default HeroBackground;
