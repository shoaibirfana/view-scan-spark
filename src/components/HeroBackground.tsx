import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const BUBBLE_LABELS = [
  "Amazon FBA",
  "Shopify",
  "TikTok Shop",
  "LLC Formation",
  "Brand Registry",
  "Product Sourcing",
  "Scale Revenue",
  "EIN Number",
];

const PHI = 1.618033988749895;
const GOLDEN_ANGLE = (Math.PI * 2) / (PHI * PHI);

type ClusterNode = {
  baseAngle: number;
  orbitRadius: number;
  orbitSpeed: number;
  phase: number;
  size: number;
};

type BubbleInfo = {
  clusterIdx: number;
  // Independent sinusoidal drift for each bubble
  anchorX: number;
  anchorY: number;
  driftXAmp: number;
  driftYAmp: number;
  driftXFreq: number;
  driftYFreq: number;
  driftXPhase: number;
  driftYPhase: number;
  // Previous position for smoothing
  prevX: number;
  prevY: number;
};

type Cluster = {
  anchorX: number;
  anchorY: number;
  driftXAmp: number;
  driftYAmp: number;
  driftXFreq: number;
  driftYFreq: number;
  driftXPhase: number;
  driftYPhase: number;
  nodes: ClusterNode[];
};

type PositionedNode = {
  node: ClusterNode;
  x: number;
  y: number;
};

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

const toHsl = (token: string, alpha = 1) => `hsl(${token.trim().replace(/\s+/g, " ")} / ${alpha})`;

const getRowPattern = (width: number) => {
  if (width < 640) return [2, 2, 2, 2];
  if (width < 1024) return [3, 3, 3];
  return [3, 4, 3];
};

const NetworkCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const rootStyles = getComputedStyle(document.documentElement);
    const primaryToken = rootStyles.getPropertyValue("--primary").trim() || "160 90% 27%";
    const primary = (alpha: number) => toHsl(primaryToken, alpha);

    let animationFrameId = 0;
    let canvasWidth = 0;
    let canvasHeight = 0;
    let clusters: Cluster[] = [];
    let bubbles: BubbleInfo[] = [];

    const bubbleLayer = document.createElement("div");
    bubbleLayer.style.cssText =
      "position:absolute;inset:0;pointer-events:none;z-index:2";
    canvas.parentElement?.appendChild(bubbleLayer);

    const bubbleEls = BUBBLE_LABELS.map((label) => {
      const el = document.createElement("div");
      el.style.cssText = [
        "position:absolute",
        "display:flex",
        "align-items:center",
        "gap:6px",
        "padding:5px 14px",
        "border-radius:9999px",
        `background:${primary(0.12)}`,
        "backdrop-filter:blur(12px)",
        `-webkit-backdrop-filter:blur(12px)`,
        `border:1px solid ${primary(0.34)}`,
        "font-size:12px",
        "font-weight:600",
        `color:${primary(0.92)}`,
        "white-space:nowrap",
        "pointer-events:none",
        "will-change:transform",
        `box-shadow:0 0 18px ${primary(0.16)}`,
        "opacity:0",
        "transition:opacity 0.3s ease",
      ].join(";");
      el.innerHTML = `<span style="width:6px;height:6px;border-radius:9999px;background:${primary(0.82)};box-shadow:0 0 10px ${primary(0.35)};"></span>${label}`;
      bubbleLayer.appendChild(el);
      return el;
    });

    const updateBubbleSizing = () => {
      const compact = canvasWidth < 640;
      bubbleEls.forEach((el) => {
        el.style.fontSize = compact ? "11px" : "12px";
        el.style.padding = compact ? "4px 12px" : "5px 14px";
      });
    };

    const initClusters = () => {
      const rowPattern = getRowPattern(canvasWidth);
      const rowHeight = canvasHeight / rowPattern.length;
      const compact = canvasWidth < 640;
      let clusterIndex = 0;

      clusters = rowPattern.flatMap((rowCount, rowIndex) => {
        const cellWidth = canvasWidth / rowCount;
        const rowCenterY = rowHeight * (rowIndex + 0.5);

        return Array.from({ length: rowCount }, (_, columnIndex) => {
          const localIndex = clusterIndex++;
          const jitterAngle = localIndex * GOLDEN_ANGLE;
          const anchorX = clamp(
            cellWidth * (columnIndex + 0.5) + Math.cos(jitterAngle) * cellWidth * 0.08,
            compact ? 40 : 72,
            canvasWidth - (compact ? 40 : 72),
          );
          const anchorY = clamp(
            rowCenterY + Math.sin(jitterAngle) * rowHeight * 0.08,
            compact ? 34 : 52,
            canvasHeight - (compact ? 34 : 52),
          );

          const nodeCount = compact ? 4 + (localIndex % 2) : 5 + (localIndex % 2);
          const baseOrbit = Math.min(cellWidth, rowHeight) * (compact ? 0.1 : 0.11);

          const nodes = Array.from({ length: nodeCount }, (_, nodeIndex) => ({
            baseAngle: localIndex * 0.48 + nodeIndex * GOLDEN_ANGLE,
            orbitRadius: baseOrbit + nodeIndex * (compact ? 8 : 10),
            orbitSpeed:
              0.00012 *
              (nodeIndex % 2 === 0 ? 1 : -1) *
              (1 + (localIndex % 3) * 0.06),
            phase: localIndex * PHI + nodeIndex * 0.9,
            size: 2.2 + (nodeIndex % 3) * 0.35,
          }));

          const driftRange = compact ? 12 : 20;
          return {
            anchorX,
            anchorY,
            driftXAmp: driftRange + (localIndex % 3) * 4,
            driftYAmp: driftRange * 0.7 + (localIndex % 2) * 3,
            driftXFreq: 0.00006 + (localIndex % 5) * 0.000008,
            driftYFreq: 0.00005 + (localIndex % 4) * 0.000007,
            driftXPhase: localIndex * 1.7,
            driftYPhase: localIndex * 2.3,
            nodes,
          } satisfies Cluster;
        });
      });

      // Initialize bubbles with independent movement, anchored near their cluster
      bubbles = BUBBLE_LABELS.map((_, i) => {
        const clusterIdx = i < clusters.length ? i : i % clusters.length;
        const cluster = clusters[clusterIdx];
        return {
          clusterIdx,
          anchorX: cluster.anchorX,
          anchorY: cluster.anchorY,
          // Very slow, smooth sinusoidal drift — unique per bubble
          driftXAmp: 18 + (i % 4) * 5,
          driftYAmp: 14 + (i % 3) * 4,
          driftXFreq: 0.00003 + (i % 5) * 0.000006,
          driftYFreq: 0.000025 + (i % 4) * 0.000005,
          driftXPhase: i * 2.1 + 0.7,
          driftYPhase: i * 1.8 + 1.3,
          prevX: cluster.anchorX,
          prevY: cluster.anchorY,
        };
      });
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvasWidth = rect.width;
      canvasHeight = rect.height;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      updateBubbleSizing();
      initClusters();
    };

    const LERP = 0.04; // smoothing factor for bubble position

    const draw = (now: number) => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      const positionedClusters: PositionedNode[][] = clusters.map((cluster) => {
        const centerX =
          cluster.anchorX +
          Math.sin(now * cluster.driftXFreq + cluster.driftXPhase) * cluster.driftXAmp;
        const centerY =
          cluster.anchorY +
          Math.sin(now * cluster.driftYFreq + cluster.driftYPhase) * cluster.driftYAmp;

        return cluster.nodes.map((node) => {
          const angle = node.baseAngle + now * node.orbitSpeed;
          const radialWobble = 1 + Math.sin(now * 0.0006 + node.phase) * 0.06;
          const x =
            centerX +
            Math.cos(angle) * node.orbitRadius * radialWobble +
            Math.sin(now * 0.0004 + node.phase) * 1.5;
          const y =
            centerY +
            Math.sin(angle) * node.orbitRadius * (0.85 + Math.cos(now * 0.0005 + node.phase) * 0.04) +
            Math.cos(now * 0.00045 + node.phase) * 1.8;

          return { node, x, y } satisfies PositionedNode;
        });
      });

      // Inter-cluster connections
      const allNodes = positionedClusters.flat();
      const maxDistance = 160;
      const maxDistSq = maxDistance * maxDistance;

      for (let a = 0; a < allNodes.length; a++) {
        for (let b = a + 1; b < allNodes.length; b++) {
          const nodeA = allNodes[a];
          const nodeB = allNodes[b];
          const dx = nodeA.x - nodeB.x;
          const dy = nodeA.y - nodeB.y;
          const distanceSq = dx * dx + dy * dy;

          if (distanceSq > maxDistSq) continue;

          const proximity = 1 - distanceSq / maxDistSq;
          const alpha = 0.04 + proximity * 0.14;

          ctx.beginPath();
          ctx.moveTo(nodeA.x, nodeA.y);
          ctx.lineTo(nodeB.x, nodeB.y);
          ctx.lineWidth = 0.8;
          ctx.strokeStyle = primary(alpha);
          ctx.stroke();
        }
      }

      // Draw nodes
      positionedClusters.forEach((clusterNodes) => {
        clusterNodes.forEach(({ node, x, y }) => {
          ctx.beginPath();
          ctx.arc(x, y, node.size, 0, Math.PI * 2);
          ctx.fillStyle = primary(0.5);
          ctx.fill();
        });
      });

      // Draw bubbles — independent smooth movement
      bubbles.forEach((bubble, i) => {
        const cluster = clusters[bubble.clusterIdx];
        // Bubble follows its own sinusoidal path anchored near the cluster
        const clusterCenterX =
          cluster.anchorX +
          Math.sin(now * cluster.driftXFreq + cluster.driftXPhase) * cluster.driftXAmp;
        const clusterCenterY =
          cluster.anchorY +
          Math.sin(now * cluster.driftYFreq + cluster.driftYPhase) * cluster.driftYAmp;

        // Target position: cluster center + bubble's own sinusoidal offset
        const targetX =
          clusterCenterX +
          Math.sin(now * bubble.driftXFreq + bubble.driftXPhase) * bubble.driftXAmp;
        const targetY =
          clusterCenterY +
          Math.sin(now * bubble.driftYFreq + bubble.driftYPhase) * bubble.driftYAmp;

        // Lerp for ultra-smooth movement
        bubble.prevX += (targetX - bubble.prevX) * LERP;
        bubble.prevY += (targetY - bubble.prevY) * LERP;

        const bx = clamp(bubble.prevX, 8, canvasWidth - 8);
        const by = clamp(bubble.prevY, 8, canvasHeight - 8);

        // Draw a small glowing dot at bubble position
        ctx.beginPath();
        ctx.arc(bx, by, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = primary(0.7);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(bx, by, 7, 0, Math.PI * 2);
        ctx.fillStyle = primary(0.08);
        ctx.fill();

        // Draw line from bubble dot to nearest cluster node
        const clusterNodes = positionedClusters[bubble.clusterIdx];
        if (clusterNodes && clusterNodes.length > 0) {
          let nearestDist = Infinity;
          let nearestNode = clusterNodes[0];
          for (const cn of clusterNodes) {
            const d = (cn.x - bx) ** 2 + (cn.y - by) ** 2;
            if (d < nearestDist) {
              nearestDist = d;
              nearestNode = cn;
            }
          }
          ctx.beginPath();
          ctx.moveTo(bx, by);
          ctx.lineTo(nearestNode.x, nearestNode.y);
          ctx.lineWidth = 1.2;
          ctx.strokeStyle = primary(0.18);
          ctx.stroke();
        }

        // Position DOM bubble label
        const bubbleEl = bubbleEls[i];
        const bubbleWidth = bubbleEl?.offsetWidth || 120;
        const bubbleHeight = bubbleEl?.offsetHeight || 28;
        const labelX = clamp(bx - bubbleWidth / 2, 8, canvasWidth - bubbleWidth - 8);
        const labelY = clamp(by - bubbleHeight - 14, 8, canvasHeight - bubbleHeight - 8);

        bubbleEl.style.opacity = "1";
        bubbleEl.style.transform = `translate(${labelX}px, ${labelY}px)`;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      bubbleLayer.remove();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
};

const HeroBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden">
    <NetworkCanvas />
    <motion.div
      animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      className="absolute -left-10 -top-10 h-72 w-72 rounded-full bg-primary/15 blur-[80px]"
    />
    <motion.div
      animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      className="absolute -bottom-10 -right-10 h-80 w-80 rounded-full bg-primary/12 blur-[90px]"
    />
    <motion.div
      animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.18, 0.08] }}
      transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      className="absolute right-1/4 top-1/3 h-64 w-64 rounded-full bg-primary/10 blur-[80px]"
    />
  </div>
);

export default HeroBackground;
