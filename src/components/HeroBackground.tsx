import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const BUBBLE_LABELS = [
  "Amazon FBA", "Shopify", "TikTok Shop", "LLC Formation",
  "Brand Registry", "Product Sourcing", "Scale Revenue", "EIN Number"
];

const PHI = 1.618033988749895;

/* Each cluster: a center position + N nodes orbiting nearby, only intra-cluster connections */
interface Cluster {
  cx: number; cy: number;       // cluster center
  cvx: number; cvy: number;     // cluster drift velocity
  nodes: { ox: number; oy: number; r: number }[]; // offsets from center
  bubbleIdx: number;            // which BUBBLE_LABELS index, or -1
  bubbleNode: number;           // which node in cluster gets the bubble
}

const NetworkCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let cw = 0, ch = 0;
    let clusters: Cluster[] = [];

    const CLUSTER_RADIUS = 80; // how far nodes spread from cluster center
    const CONNECT_DIST = 100;  // max connection distance within cluster
    const NODES_PER_CLUSTER_MIN = 5;
    const NODES_PER_CLUSTER_MAX = 8;
    const NUM_CLUSTERS = 12; // total clusters, 8 have bubbles

    const initClusters = () => {
      clusters = [];
      const goldenAngle = Math.PI * 2 / (PHI * PHI);

      for (let c = 0; c < NUM_CLUSTERS; c++) {
        const t = c / NUM_CLUSTERS;
        const angle = c * goldenAngle;
        const dist = Math.sqrt(t) * Math.min(cw, ch) * 0.4 + 60;
        const cx = cw / 2 + Math.cos(angle) * dist + (Math.random() - 0.5) * 60;
        const cy = ch / 2 + Math.sin(angle) * dist + (Math.random() - 0.5) * 60;

        const nodeCount = NODES_PER_CLUSTER_MIN + Math.floor(Math.random() * (NODES_PER_CLUSTER_MAX - NODES_PER_CLUSTER_MIN + 1));
        const nodes: Cluster["nodes"] = [];

        for (let n = 0; n < nodeCount; n++) {
          const na = (n / nodeCount) * Math.PI * 2 + Math.random() * 0.8;
          const nr = Math.random() * CLUSTER_RADIUS * 0.7 + 15;
          nodes.push({
            ox: Math.cos(na) * nr,
            oy: Math.sin(na) * nr,
            r: Math.random() * 1.5 + 1.8,
          });
        }

        clusters.push({
          cx: Math.max(80, Math.min(cw - 80, cx)),
          cy: Math.max(80, Math.min(ch - 80, cy)),
          cvx: (Math.random() - 0.5) * 0.3,
          cvy: (Math.random() - 0.5) * 0.3,
          nodes,
          bubbleIdx: c < BUBBLE_LABELS.length ? c : -1,
          bubbleNode: 0, // bubble attaches to first node
        });

        // Make bubble node larger
        if (c < BUBBLE_LABELS.length) {
          nodes[0].r = 3.5;
        }
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      cw = rect.width;
      ch = rect.height;
      canvas.width = cw;
      canvas.height = ch;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      initClusters();
    };

    resize();
    window.addEventListener("resize", resize);

    let lastTime = performance.now();

    // Bubble DOM elements
    const bubbleDiv = document.createElement("div");
    bubbleDiv.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:2;";
    canvas.parentElement?.appendChild(bubbleDiv);

    const bubbleEls: HTMLDivElement[] = [];
    for (let b = 0; b < BUBBLE_LABELS.length; b++) {
      const el = document.createElement("div");
      el.style.cssText = "position:absolute;display:flex;align-items:center;gap:6px;padding:5px 14px;border-radius:9999px;background:rgba(7,132,99,0.12);backdrop-filter:blur(12px);border:1px solid rgba(7,132,99,0.35);font-size:12px;font-weight:600;color:#5dd3b6;white-space:nowrap;pointer-events:none;will-change:transform;box-shadow:0 0 12px rgba(7,132,99,0.15);";
      el.innerHTML = `<span style="width:6px;height:6px;border-radius:50%;background:#078463;box-shadow:0 0 6px rgba(7,132,99,0.5);"></span>${BUBBLE_LABELS[b]}`;
      bubbleDiv.appendChild(el);
      bubbleEls.push(el);
    }

    const draw = (now: number) => {
      const dt = Math.min((now - lastTime) / 16.667, 3);
      lastTime = now;
      ctx.clearRect(0, 0, cw, ch);

      for (const cluster of clusters) {
        // Move cluster center
        cluster.cx += cluster.cvx * dt;
        cluster.cy += cluster.cvy * dt;

        // Bounce cluster center
        if (cluster.cx < 80) { cluster.cx = 80; cluster.cvx = Math.abs(cluster.cvx); }
        else if (cluster.cx > cw - 80) { cluster.cx = cw - 80; cluster.cvx = -Math.abs(cluster.cvx); }
        if (cluster.cy < 80) { cluster.cy = 80; cluster.cvy = Math.abs(cluster.cvy); }
        else if (cluster.cy > ch - 80) { cluster.cy = ch - 80; cluster.cvy = -Math.abs(cluster.cvy); }

        const { nodes } = cluster;
        const absX: number[] = [];
        const absY: number[] = [];

        // Compute absolute positions
        for (let n = 0; n < nodes.length; n++) {
          absX.push(cluster.cx + nodes[n].ox);
          absY.push(cluster.cy + nodes[n].oy);
        }

        // Draw intra-cluster connections only
        const distSqMax = CONNECT_DIST * CONNECT_DIST;
        for (let a = 0; a < nodes.length; a++) {
          for (let b = a + 1; b < nodes.length; b++) {
            const ddx = absX[a] - absX[b];
            const ddy = absY[a] - absY[b];
            const dSq = ddx * ddx + ddy * ddy;
            if (dSq < distSqMax) {
              const proximity = 1 - dSq / distSqMax;
              const isBubbleEdge = (cluster.bubbleIdx >= 0) && (a === cluster.bubbleNode || b === cluster.bubbleNode);
              const alpha = isBubbleEdge ? 0.4 * proximity : 0.28 * proximity;
              ctx.lineWidth = isBubbleEdge ? 1.8 : 1.2;
              ctx.strokeStyle = `rgba(7,132,99,${alpha.toFixed(3)})`;
              ctx.beginPath();
              ctx.moveTo(absX[a], absY[a]);
              ctx.lineTo(absX[b], absY[b]);
              ctx.stroke();
            }
          }
        }

        // Draw nodes
        for (let n = 0; n < nodes.length; n++) {
          const isBubble = cluster.bubbleIdx >= 0 && n === cluster.bubbleNode;
          const r = nodes[n].r;

          if (isBubble) {
            ctx.beginPath();
            ctx.arc(absX[n], absY[n], r + 4, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(7,132,99,0.12)";
            ctx.fill();
          }

          ctx.beginPath();
          ctx.arc(absX[n], absY[n], r, 0, Math.PI * 2);
          ctx.fillStyle = isBubble ? "rgba(7,132,99,0.8)" : "rgba(7,132,99,0.5)";
          ctx.fill();
        }

        // Position bubble label
        if (cluster.bubbleIdx >= 0 && cluster.bubbleIdx < bubbleEls.length) {
          const bn = cluster.bubbleNode;
          const el = bubbleEls[cluster.bubbleIdx];
          el.style.transform = `translate(${absX[bn] + 8}px, ${absY[bn] - 14}px)`;
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
