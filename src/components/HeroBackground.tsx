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

/* ─── Optimized particle network using spatial grid ─── */
const NetworkCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let cw = 0;
    let ch = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      cw = rect.width;
      ch = rect.height;
      // Use 1x resolution — much faster, still looks great
      canvas.width = cw;
      canvas.height = ch;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const COUNT = 70;
    const CONNECT_DIST = 140;

    // Separate typed arrays for x, y, vx, vy — cache friendly
    const px = new Float32Array(COUNT);
    const py = new Float32Array(COUNT);
    const vx = new Float32Array(COUNT);
    const vy = new Float32Array(COUNT);
    const radii = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
      px[i] = Math.random() * (cw || 1200);
      py[i] = Math.random() * (ch || 800);
      vx[i] = (Math.random() - 0.5) * 0.3;
      vy[i] = (Math.random() - 0.5) * 0.3;
      radii[i] = Math.random() * 1.5 + 1;
    }

    // Spatial grid for O(n) neighbor lookup instead of O(n²)
    const CELL = CONNECT_DIST;
    let cols = 0;
    let rows = 0;
    let grid: Int16Array;
    let gridCount: Int16Array;
    const MAX_PER_CELL = 8;

    const rebuildGrid = () => {
      cols = Math.ceil(cw / CELL) || 1;
      rows = Math.ceil(ch / CELL) || 1;
      grid = new Int16Array(cols * rows * MAX_PER_CELL);
      gridCount = new Int16Array(cols * rows);
    };
    rebuildGrid();
    
    const origResize = resize;
    const resizeWithGrid = () => { origResize(); rebuildGrid(); };
    window.removeEventListener("resize", resize);
    window.addEventListener("resize", resizeWithGrid);

    // Pre-compute teal color string
    const DOT_COLOR = "rgba(13,148,136,";
    const LINE_COLOR = "rgba(13,148,136,";

    let lastTime = performance.now();

    const draw = (now: number) => {
      // Delta time for frame-rate independent movement
      const dt = Math.min((now - lastTime) / 16.667, 3); // normalize to 60fps, cap at 3x
      lastTime = now;

      ctx.clearRect(0, 0, cw, ch);

      // Clear grid
      gridCount.fill(0);

      // Update positions & populate grid
      for (let i = 0; i < COUNT; i++) {
        px[i] += vx[i] * dt;
        py[i] += vy[i] * dt;

        if (px[i] < 0) px[i] += cw;
        else if (px[i] > cw) px[i] -= cw;
        if (py[i] < 0) py[i] += ch;
        else if (py[i] > ch) py[i] -= ch;

        const col = Math.min((px[i] / CELL) | 0, cols - 1);
        const row = Math.min((py[i] / CELL) | 0, rows - 1);
        const cellIdx = row * cols + col;
        const count = gridCount[cellIdx];
        if (count < MAX_PER_CELL) {
          grid[cellIdx * MAX_PER_CELL + count] = i;
          gridCount[cellIdx] = count + 1;
        }
      }

      // Draw connections using grid neighbors only
      ctx.lineWidth = 1;
      const distSqMax = CONNECT_DIST * CONNECT_DIST;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const cellIdx = row * cols + col;
          const cCount = gridCount[cellIdx];
          if (cCount === 0) continue;

          // Check this cell + right, bottom, bottom-right, bottom-left neighbors
          for (let dr = 0; dr <= 1; dr++) {
            for (let dc = (dr === 0 ? 0 : -1); dc <= 1; dc++) {
              const nr = row + dr;
              const nc = col + dc;
              if (nr >= rows || nc < 0 || nc >= cols) continue;
              if (dr === 0 && dc === 0) {
                // Same cell — compare within
                const base = cellIdx * MAX_PER_CELL;
                for (let a = 0; a < cCount; a++) {
                  const i = grid[base + a];
                  for (let b = a + 1; b < cCount; b++) {
                    const j = grid[base + b];
                    const ddx = px[i] - px[j];
                    const ddy = py[i] - py[j];
                    const dSq = ddx * ddx + ddy * ddy;
                    if (dSq < distSqMax) {
                      const alpha = 0.18 * (1 - dSq / distSqMax);
                      ctx.strokeStyle = LINE_COLOR + alpha.toFixed(3) + ")";
                      ctx.beginPath();
                      ctx.moveTo(px[i], py[i]);
                      ctx.lineTo(px[j], py[j]);
                      ctx.stroke();
                    }
                  }
                }
              } else {
                // Neighbor cell
                const nIdx = nr * cols + nc;
                const nCount = gridCount[nIdx];
                if (nCount === 0) continue;
                const base1 = cellIdx * MAX_PER_CELL;
                const base2 = nIdx * MAX_PER_CELL;
                for (let a = 0; a < cCount; a++) {
                  const i = grid[base1 + a];
                  for (let b = 0; b < nCount; b++) {
                    const j = grid[base2 + b];
                    const ddx = px[i] - px[j];
                    const ddy = py[i] - py[j];
                    const dSq = ddx * ddx + ddy * ddy;
                    if (dSq < distSqMax) {
                      const alpha = 0.18 * (1 - dSq / distSqMax);
                      ctx.strokeStyle = LINE_COLOR + alpha.toFixed(3) + ")";
                      ctx.beginPath();
                      ctx.moveTo(px[i], py[i]);
                      ctx.lineTo(px[j], py[j]);
                      ctx.stroke();
                    }
                  }
                }
              }
            }
          }
        }
      }

      // Draw dots — bigger, more visible
      for (let i = 0; i < COUNT; i++) {
        ctx.beginPath();
        ctx.arc(px[i], py[i], radii[i], 0, Math.PI * 2);
        ctx.fillStyle = DOT_COLOR + "0.45)";
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resizeWithGrid);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

/* ─── Tags in empty spaces only ─── */
const tagPositions: { label: string; style: React.CSSProperties; delay: number }[] = [
  { label: "Amazon FBA", style: { top: "6%", left: "5%" }, delay: 0.3 },
  { label: "Shopify", style: { top: "4%", right: "8%" }, delay: 0.5 },
  { label: "EIN Number", style: { top: "12%", left: "42%" }, delay: 0.9 },
  { label: "Brand Registry", style: { top: "28%", left: "38%" }, delay: 0.7 },
  { label: "PPC Ads", style: { top: "50%", right: "38%" }, delay: 0.6 },
  { label: "Consulting", style: { top: "35%", right: "6%" }, delay: 1.0 },
  { label: "Trademark", style: { bottom: "30%", right: "32%" }, delay: 1.2 },
  { label: "Walmart", style: { bottom: "8%", left: "18%" }, delay: 1.1 },
  { label: "Account Recovery", style: { bottom: "5%", left: "42%" }, delay: 1.3 },
  { label: "TikTok Shop", style: { bottom: "12%", right: "10%" }, delay: 0.8 },
  { label: "Product Sourcing", style: { bottom: "18%", right: "38%" }, delay: 1.4 },
];

const HeroBackground = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <NetworkCanvas />

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

      {tagPositions.map((t) => (
        <FloatingTag key={t.label} label={t.label} style={t.style} delay={t.delay} />
      ))}
    </div>
  );
};

export default HeroBackground;
