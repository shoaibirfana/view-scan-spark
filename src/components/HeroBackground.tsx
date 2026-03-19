import { useEffect, useRef } from "react";
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

    // Responsive node count based on screen width
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
      // Space particles with minimum distance
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

    // Spatial grid
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
