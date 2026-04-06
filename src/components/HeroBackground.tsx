import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

/* ── Bubble labels to attach to specific nodes ── */
const BUBBLE_LABELS = ["Amazon FBA", "Shopify", "TikTok Shop", "LLC Formation", "Brand Registry", "Product Sourcing", "Scale Revenue", "EIN Number"];

/* Golden ratio for node placement */
const PHI = 1.618033988749895;

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
      if (width < 480) return 30;
      if (width < 768) return 45;
      if (width < 1024) return 60;
      return 80;
    };

    const CONNECT_DIST = 160;
    const MAX_COUNT = 80;

    let COUNT = 0;
    const px = new Float32Array(MAX_COUNT);
    const py = new Float32Array(MAX_COUNT);
    const vx = new Float32Array(MAX_COUNT);
    const vy = new Float32Array(MAX_COUNT);
    const radii = new Float32Array(MAX_COUNT);
    const hasBubble = new Int8Array(MAX_COUNT);
    const bubbleLabelIdx = new Int8Array(MAX_COUNT);

    const initParticles = () => {
      COUNT = getNodeCount(cw);
      hasBubble.fill(0);
      bubbleLabelIdx.fill(-1);

      const goldenAngle = Math.PI * 2 / (PHI * PHI);
      for (let i = 0; i < COUNT; i++) {
        const t = i / COUNT;
        const angle = i * goldenAngle;
        const r = Math.sqrt(t) * Math.min(cw, ch) * 0.45;
        px[i] = cw / 2 + Math.cos(angle) * r + (Math.random() - 0.5) * 40;
        py[i] = ch / 2 + Math.sin(angle) * r + (Math.random() - 0.5) * 40;
        px[i] = Math.max(20, Math.min(cw - 20, px[i]));
        py[i] = Math.max(20, Math.min(ch - 20, py[i]));
        vx[i] = (Math.random() - 0.5) * 0.25;
        vy[i] = (Math.random() - 0.5) * 0.25;
        radii[i] = Math.random() * 1.5 + 2;
      }

      const bubbleCount = Math.min(BUBBLE_LABELS.length, COUNT);
      const step = Math.max(1, Math.floor(COUNT / bubbleCount));
      for (let b = 0; b < bubbleCount; b++) {
        const nodeIdx = (b * step) % COUNT;
        hasBubble[nodeIdx] = 1;
        bubbleLabelIdx[nodeIdx] = b;
        radii[nodeIdx] = 3.5;
      }

      rebuildGrid();
    };

    const CELL = CONNECT_DIST;
    let cols = 0, rows = 0;
    let grid: Int16Array;
    let gridCount: Int16Array;
    const MAX_PER_CELL = 10;

    const rebuildGrid = () => {
      cols = Math.ceil(cw / CELL) || 1;
      rows = Math.ceil(ch / CELL) || 1;
      grid = new Int16Array(cols * rows * MAX_PER_CELL);
      gridCount = new Int16Array(cols * rows);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      cw = rect.width;
      ch = rect.height;
      canvas.width = cw;
      canvas.height = ch;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      initParticles();
    };

    resize();
    window.addEventListener("resize", resize);

    let lastTime = performance.now();

    const bubbleDiv = document.createElement("div");
    bubbleDiv.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:2;";
    canvas.parentElement?.appendChild(bubbleDiv);

    const bubbleEls: HTMLDivElement[] = [];
    for (let b = 0; b < BUBBLE_LABELS.length; b++) {
      const el = document.createElement("div");
      el.style.cssText = "position:absolute;display:flex;align-items:center;gap:6px;padding:5px 14px;border-radius:9999px;background:rgba(7,132,99,0.12);backdrop-filter:blur(12px);border:1px solid rgba(7,132,99,0.35);font-size:12px;font-weight:600;color:#5dd3b6;white-space:nowrap;pointer-events:none;will-change:transform;transition:none;box-shadow:0 0 12px rgba(7,132,99,0.15);";
      el.innerHTML = `<span style="width:6px;height:6px;border-radius:50%;background:#078463;box-shadow:0 0 6px rgba(7,132,99,0.5);"></span>${BUBBLE_LABELS[b]}`;
      bubbleDiv.appendChild(el);
      bubbleEls.push(el);
    }

    const draw = (now: number) => {
      const dt = Math.min((now - lastTime) / 16.667, 3);
      lastTime = now;
      ctx.clearRect(0, 0, cw, ch);
      gridCount.fill(0);

      for (let i = 0; i < COUNT; i++) {
        px[i] += vx[i] * dt;
        py[i] += vy[i] * dt;
        if (px[i] < 20) { px[i] = 20; vx[i] = Math.abs(vx[i]); }
        else if (px[i] > cw - 20) { px[i] = cw - 20; vx[i] = -Math.abs(vx[i]); }
        if (py[i] < 20) { py[i] = 20; vy[i] = Math.abs(vy[i]); }
        else if (py[i] > ch - 20) { py[i] = ch - 20; vy[i] = -Math.abs(vy[i]); }

        const col = Math.min((px[i] / CELL) | 0, cols - 1);
        const row = Math.min((py[i] / CELL) | 0, rows - 1);
        const cellIdx = row * cols + col;
        const count = gridCount[cellIdx];
        if (count < MAX_PER_CELL) {
          grid[cellIdx * MAX_PER_CELL + count] = i;
          gridCount[cellIdx] = count + 1;
        }
      }

      ctx.lineWidth = 1.2;
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

              const nIdx = dr === 0 && dc === 0 ? cellIdx : nr * cols + nc;
              const nCount = dr === 0 && dc === 0 ? cCount : gridCount[nIdx];
              if (nCount === 0) continue;

              const base1 = cellIdx * MAX_PER_CELL;
              const base2 = nIdx * MAX_PER_CELL;
              const startB = (a: number) => dr === 0 && dc === 0 ? a + 1 : 0;

              for (let a = 0; a < cCount; a++) {
                const i = grid[base1 + a];
                for (let b = startB(a); b < nCount; b++) {
                  const j = grid[base2 + b];
                  if (i === j) continue;
                  const ddx = px[i] - px[j];
                  const ddy = py[i] - py[j];
                  const dSq = ddx * ddx + ddy * ddy;
                  if (dSq < distSqMax) {
                    const proximity = 1 - dSq / distSqMax;
                    const isBubbleEdge = hasBubble[i] || hasBubble[j];
                    const alpha = isBubbleEdge ? 0.35 * proximity : 0.25 * proximity;
                    ctx.lineWidth = isBubbleEdge ? 1.8 : 1.2;
                    ctx.strokeStyle = `rgba(7,132,99,${alpha.toFixed(3)})`;
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

      for (let i = 0; i < COUNT; i++) {
        const isBubble = hasBubble[i];
        const r = radii[i];
        if (isBubble) {
          ctx.beginPath();
          ctx.arc(px[i], py[i], r + 4, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(7,132,99,0.12)";
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(px[i], py[i], r, 0, Math.PI * 2);
        ctx.fillStyle = isBubble ? "rgba(7,132,99,0.8)" : "rgba(7,132,99,0.5)";
        ctx.fill();
      }

      for (let i = 0; i < COUNT; i++) {
        if (hasBubble[i] && bubbleLabelIdx[i] >= 0) {
          const el = bubbleEls[bubbleLabelIdx[i]];
          if (el) {
            el.style.transform = `translate(${px[i] + 8}px, ${py[i] - 14}px)`;
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      bubbleDiv.remove();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
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
  </div>
);

export default HeroBackground;
