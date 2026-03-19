import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

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

    const getNodeCount = (width: number) => {
      if (width < 480) return 25;
      if (width < 768) return 35;
      if (width < 1024) return 50;
      return 70;
    };

    const CONNECT_DIST = 140;
    const MAX_COUNT = 70;

    let COUNT = 0;
    const px = new Float32Array(MAX_COUNT);
    const py = new Float32Array(MAX_COUNT);
    const vx = new Float32Array(MAX_COUNT);
    const vy = new Float32Array(MAX_COUNT);
    const radii = new Float32Array(MAX_COUNT);

    const initParticles = () => {
      COUNT = getNodeCount(cw);
      for (let i = 0; i < COUNT; i++) {
        let attempts = 0;
        do {
          px[i] = Math.random() * cw;
          py[i] = Math.random() * ch;
          attempts++;
        } while (attempts < 20 && isTooClose(i));
        vx[i] = (Math.random() - 0.5) * 0.3;
        vy[i] = (Math.random() - 0.5) * 0.3;
        radii[i] = Math.random() * 1.5 + 1.2;
      }
    };

    const isTooClose = (idx: number) => {
      const minDist = 40;
      for (let j = 0; j < idx; j++) {
        const dx = px[idx] - px[j];
        const dy = py[idx] - py[j];
        if (dx * dx + dy * dy < minDist * minDist) return true;
      }
      return false;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      cw = rect.width;
      ch = rect.height;
      canvas.width = cw;
      canvas.height = ch;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      initParticles();
      rebuildGrid();
    };

    const CELL = CONNECT_DIST;
    let cols = 0, rows = 0;
    let grid: Int16Array;
    let gridCount: Int16Array;
    const MAX_PER_CELL = 8;

    const rebuildGrid = () => {
      cols = Math.ceil(cw / CELL) || 1;
      rows = Math.ceil(ch / CELL) || 1;
      grid = new Int16Array(cols * rows * MAX_PER_CELL);
      gridCount = new Int16Array(cols * rows);
    };

    resize();
    window.addEventListener("resize", resize);

    const DOT_COLOR = "rgba(13,148,136,";
    const LINE_COLOR = "rgba(13,148,136,";
    let lastTime = performance.now();

    const draw = (now: number) => {
      const dt = Math.min((now - lastTime) / 16.667, 3);
      lastTime = now;
      ctx.clearRect(0, 0, cw, ch);
      gridCount.fill(0);

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

      ctx.lineWidth = 1;
      const distSqMax = CONNECT_DIST * CONNECT_DIST;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const cellIdx = row * cols + col;
          const cCount = gridCount[cellIdx];
          if (cCount === 0) continue;

          for (let dr = 0; dr <= 1; dr++) {
            for (let dc = (dr === 0 ? 0 : -1); dc <= 1; dc++) {
              const nr = row + dr;
              const nc = col + dc;
              if (nr >= rows || nc < 0 || nc >= cols) continue;
              if (dr === 0 && dc === 0) {
                const base = cellIdx * MAX_PER_CELL;
                for (let a = 0; a < cCount; a++) {
                  const i = grid[base + a];
                  for (let b = a + 1; b < cCount; b++) {
                    const j = grid[base + b];
                    const ddx = px[i] - px[j];
                    const ddy = py[i] - py[j];
                    const dSq = ddx * ddx + ddy * ddy;
                    if (dSq < distSqMax) {
                      const alpha = 0.2 * (1 - dSq / distSqMax);
                      ctx.strokeStyle = LINE_COLOR + alpha.toFixed(3) + ")";
                      ctx.beginPath();
                      ctx.moveTo(px[i], py[i]);
                      ctx.lineTo(px[j], py[j]);
                      ctx.stroke();
                    }
                  }
                }
              } else {
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
                      const alpha = 0.2 * (1 - dSq / distSqMax);
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
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

/* ── Floating bubble labels that drift across the hero ── */

const BUBBLE_LABELS = [
  "Brand Registry",
  "Shopify",
  "TikTok Shop",
  "Amazon FBA",
  "Product Sourcing",
  "ITIN Number",
  "LLC Formation",
  "EIN Number",
];

const NAV_HEIGHT = 72; // px reserved for the navbar
const BUBBLE_W = 130; // approx bubble width
const BUBBLE_H = 32;  // approx bubble height
const MIN_DIST = 150;  // min distance between bubble centres
const SPEED = 0.35;    // px per frame-unit

interface BubbleState {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const FloatingBubbles = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<BubbleState[]>([]);
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);
  const animRef = useRef<number>(0);

  const init = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    const minY = NAV_HEIGHT + 10;

    const bubbles: BubbleState[] = [];
    for (let i = 0; i < BUBBLE_LABELS.length; i++) {
      let x: number, y: number, attempts = 0, ok = false;
      do {
        x = Math.random() * (w - BUBBLE_W);
        y = minY + Math.random() * (h - minY - BUBBLE_H);
        ok = true;
        for (const b of bubbles) {
          const dx = x - b.x;
          const dy = y - b.y;
          if (Math.sqrt(dx * dx + dy * dy) < MIN_DIST) { ok = false; break; }
        }
        attempts++;
      } while (!ok && attempts < 60);

      const angle = Math.random() * Math.PI * 2;
      bubbles.push({ x, y, vx: Math.cos(angle) * SPEED, vy: Math.sin(angle) * SPEED });
    }
    bubblesRef.current = bubbles;
    setPositions(bubbles.map(b => ({ x: b.x, y: b.y })));
  }, []);

  useEffect(() => {
    init();
    window.addEventListener("resize", init);
    return () => window.removeEventListener("resize", init);
  }, [init]);

  useEffect(() => {
    let lastTime = performance.now();

    const tick = (now: number) => {
      const el = containerRef.current;
      if (!el) { animRef.current = requestAnimationFrame(tick); return; }
      const dt = Math.min((now - lastTime) / 16.667, 3);
      lastTime = now;

      const w = el.offsetWidth;
      const h = el.offsetHeight;
      const minY = NAV_HEIGHT + 10;
      const bs = bubblesRef.current;

      // Move & bounce off walls
      for (let i = 0; i < bs.length; i++) {
        bs[i].x += bs[i].vx * dt;
        bs[i].y += bs[i].vy * dt;

        if (bs[i].x < 0) { bs[i].x = 0; bs[i].vx = Math.abs(bs[i].vx); }
        if (bs[i].x > w - BUBBLE_W) { bs[i].x = w - BUBBLE_W; bs[i].vx = -Math.abs(bs[i].vx); }
        if (bs[i].y < minY) { bs[i].y = minY; bs[i].vy = Math.abs(bs[i].vy); }
        if (bs[i].y > h - BUBBLE_H) { bs[i].y = h - BUBBLE_H; bs[i].vy = -Math.abs(bs[i].vy); }
      }

      // Repel overlapping bubbles
      for (let i = 0; i < bs.length; i++) {
        for (let j = i + 1; j < bs.length; j++) {
          const dx = bs[j].x - bs[i].x;
          const dy = bs[j].y - bs[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MIN_DIST && dist > 0) {
            const force = (MIN_DIST - dist) * 0.005;
            const nx = dx / dist;
            const ny = dy / dist;
            bs[i].vx -= nx * force;
            bs[i].vy -= ny * force;
            bs[j].vx += nx * force;
            bs[j].vy += ny * force;
          }
        }
      }

      // Clamp speed
      for (let i = 0; i < bs.length; i++) {
        const spd = Math.sqrt(bs[i].vx * bs[i].vx + bs[i].vy * bs[i].vy);
        if (spd > SPEED * 1.5) {
          bs[i].vx = (bs[i].vx / spd) * SPEED;
          bs[i].vy = (bs[i].vy / spd) * SPEED;
        }
      }

      setPositions(bs.map(b => ({ x: b.x, y: b.y })));
      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none hidden md:block">
      {positions.map((pos, i) => (
        <div
          key={BUBBLE_LABELS[i]}
          className="absolute flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card/80 backdrop-blur-md border border-primary/20 shadow-[0_4px_16px_hsl(var(--primary)/0.1)] text-xs font-semibold text-foreground"
          style={{
            transform: `translate(${pos.x}px, ${pos.y}px)`,
            willChange: "transform",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary/70" />
          {BUBBLE_LABELS[i]}
        </div>
      ))}
    </div>
  );
};

const HeroBackground = () => (
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

    <FloatingBubbles />
  </div>
);

export default HeroBackground;
