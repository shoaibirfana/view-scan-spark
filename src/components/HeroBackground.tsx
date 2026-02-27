import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

/* ─── Floating service tag — only in right/empty areas ─── */
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
    initial={{ opacity: 0, scale: 0.85 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.8, ease: "easeOut" }}
    className="absolute px-3 py-1.5 rounded-full text-[11px] font-semibold bg-primary/10 text-primary/50 border border-primary/15 backdrop-blur-sm select-none pointer-events-none"
    style={style}
  >
    <motion.div
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 5 + delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {label}
    </motion.div>
  </motion.div>
);

/* ─── Lightweight network canvas ─── */
const NetworkCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let cw = 0;
    let ch = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      cw = rect.width;
      ch = rect.height;
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // 80 particles — good density without lag
    const COUNT = 80;
    const particles = new Float32Array(COUNT * 6); // x, y, vx, vy, r, phase

    for (let i = 0; i < COUNT; i++) {
      const idx = i * 6;
      particles[idx] = Math.random() * cw;      // x
      particles[idx + 1] = Math.random() * ch;   // y
      particles[idx + 2] = (Math.random() - 0.5) * 0.25; // vx — slow & smooth
      particles[idx + 3] = (Math.random() - 0.5) * 0.25; // vy
      particles[idx + 4] = Math.random() * 1.8 + 0.8;    // r
      particles[idx + 5] = Math.random() * Math.PI * 2;   // phase for pulse
    }

    const CONNECT_DIST = 160;
    const CONNECT_DIST_SQ = CONNECT_DIST * CONNECT_DIST;

    const draw = () => {
      ctx.clearRect(0, 0, cw, ch);

      // Update positions
      for (let i = 0; i < COUNT; i++) {
        const idx = i * 6;
        particles[idx] += particles[idx + 2];
        particles[idx + 1] += particles[idx + 3];
        particles[idx + 5] += 0.015;

        // Wrap
        if (particles[idx] < -5) particles[idx] = cw + 5;
        else if (particles[idx] > cw + 5) particles[idx] = -5;
        if (particles[idx + 1] < -5) particles[idx + 1] = ch + 5;
        else if (particles[idx + 1] > ch + 5) particles[idx + 1] = -5;
      }

      // Draw connections first (batch)
      ctx.lineWidth = 0.6;
      for (let i = 0; i < COUNT; i++) {
        const ix = i * 6;
        const ax = particles[ix];
        const ay = particles[ix + 1];
        for (let j = i + 1; j < COUNT; j++) {
          const jx = j * 6;
          const dx = ax - particles[jx];
          const dy = ay - particles[jx + 1];
          const distSq = dx * dx + dy * dy;
          if (distSq < CONNECT_DIST_SQ) {
            const alpha = 0.1 * (1 - distSq / CONNECT_DIST_SQ);
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(particles[jx], particles[jx + 1]);
            ctx.strokeStyle = `rgba(13,148,136,${alpha})`;
            ctx.stroke();
          }
        }
      }

      // Draw dots (batch by similar opacity)
      for (let i = 0; i < COUNT; i++) {
        const idx = i * 6;
        const x = particles[idx];
        const y = particles[idx + 1];
        const r = particles[idx + 4] + Math.sin(particles[idx + 5]) * 0.3;
        const op = 0.3 + Math.sin(particles[idx + 5]) * 0.1;

        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(13,148,136,${op})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

/* ─── Tags placed ONLY in empty/right areas, NOT over text ─── */
const tagPositions: { label: string; style: React.CSSProperties; delay: number }[] = [
  // Top area (above text, safe)
  { label: "Amazon FBA", style: { top: "6%", left: "5%" }, delay: 0.3 },
  { label: "Shopify", style: { top: "4%", right: "8%" }, delay: 0.5 },
  { label: "EIN Number", style: { top: "12%", left: "42%" }, delay: 0.9 },
  // Right half / middle (no text there)
  { label: "Brand Registry", style: { top: "28%", left: "38%" }, delay: 0.7 },
  { label: "PPC Ads", style: { top: "50%", right: "38%" }, delay: 0.6 },
  { label: "Consulting", style: { top: "35%", right: "6%" }, delay: 1.0 },
  { label: "Trademark", style: { bottom: "30%", right: "32%" }, delay: 1.2 },
  // Bottom area (below buttons)
  { label: "Walmart", style: { bottom: "8%", left: "18%" }, delay: 1.1 },
  { label: "Account Recovery", style: { bottom: "5%", left: "42%" }, delay: 1.3 },
  { label: "TikTok Shop", style: { bottom: "12%", right: "10%" }, delay: 0.8 },
  { label: "Product Sourcing", style: { bottom: "18%", right: "38%" }, delay: 1.4 },
];

const HeroBackground = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <NetworkCanvas />

      {/* Gradient orbs */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-10 -left-10 w-72 h-72 bg-primary/15 rounded-full blur-[80px]"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute -bottom-10 -right-10 w-80 h-80 bg-primary/12 rounded-full blur-[90px]"
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.18, 0.08] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute top-1/3 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[80px]"
      />

      {/* Tags only in empty spaces */}
      {tagPositions.map((t) => (
        <FloatingTag key={t.label} label={t.label} style={t.style} delay={t.delay} />
      ))}
    </div>
  );
};

export default HeroBackground;
