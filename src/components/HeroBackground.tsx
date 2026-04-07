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
  bubbleLabelIdx: number;
};

type Cluster = {
  anchorX: number;
  anchorY: number;
  offsetX: number;
  offsetY: number;
  vx: number;
  vy: number;
  limitX: number;
  limitY: number;
  radius: number;
  nodes: ClusterNode[];
};

type PositionedNode = {
  angle: number;
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
    let lastTime = performance.now();

    const bubbleLayer = document.createElement("div");
    bubbleLayer.style.cssText = [
      "position:absolute",
      "inset:0",
      "pointer-events:none",
      "z-index:2",
    ].join(";");
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
        `border:1px solid ${primary(0.34)}`,
        "font-size:12px",
        "font-weight:600",
        `color:${primary(0.92)}`,
        "white-space:nowrap",
        "pointer-events:none",
        "will-change:transform",
        "transition:none",
        `box-shadow:0 0 18px ${primary(0.16)}`,
        "opacity:0",
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
          const bubbleLabelIdx = localIndex < BUBBLE_LABELS.length ? localIndex : -1;
          const bubbleNodeIndex = bubbleLabelIdx >= 0 ? (localIndex + 1) % nodeCount : -1;
          const baseOrbit = Math.min(cellWidth, rowHeight) * (compact ? 0.1 : 0.11);

          const nodes = Array.from({ length: nodeCount }, (_, nodeIndex) => {
            const isBubbleNode = nodeIndex === bubbleNodeIndex;
            return {
              baseAngle: localIndex * 0.48 + nodeIndex * GOLDEN_ANGLE,
              orbitRadius: baseOrbit + nodeIndex * (compact ? 8 : 10) + (isBubbleNode ? 4 : 0),
              orbitSpeed:
                (isBubbleNode ? 0.00024 : 0.00018) *
                (nodeIndex % 2 === 0 ? 1 : -1) *
                (1 + (localIndex % 3) * 0.08),
              phase: localIndex * PHI + nodeIndex * 0.9,
              size: isBubbleNode ? 3.9 : 2.2 + (nodeIndex % 3) * 0.35,
              bubbleLabelIdx: isBubbleNode ? bubbleLabelIdx : -1,
            } satisfies ClusterNode;
          });

          return {
            anchorX,
            anchorY,
            offsetX: (Math.random() - 0.5) * 10,
            offsetY: (Math.random() - 0.5) * 10,
            vx: (Math.cos(jitterAngle) >= 0 ? 1 : -1) * (compact ? 0.07 : 0.09 + (localIndex % 3) * 0.01),
            vy: (Math.sin(jitterAngle) >= 0 ? 1 : -1) * (compact ? 0.05 : 0.07 + (localIndex % 2) * 0.01),
            limitX: Math.min(cellWidth * 0.18, compact ? 18 : 30),
            limitY: Math.min(rowHeight * 0.16, compact ? 14 : 24),
            radius: Math.max(...nodes.map((node) => node.orbitRadius)) + 18,
            nodes,
          } satisfies Cluster;
        });
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

    const draw = (now: number) => {
      const dt = Math.min((now - lastTime) / 16.667, 2.5);
      lastTime = now;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      bubbleEls.forEach((el) => {
        el.style.opacity = "0";
      });

      const positionedClusters: PositionedNode[][] = clusters.map((cluster) => {
        cluster.offsetX += cluster.vx * dt;
        cluster.offsetY += cluster.vy * dt;

        if (Math.abs(cluster.offsetX) > cluster.limitX) {
          cluster.offsetX = clamp(cluster.offsetX, -cluster.limitX, cluster.limitX);
          cluster.vx *= -1;
        }

        if (Math.abs(cluster.offsetY) > cluster.limitY) {
          cluster.offsetY = clamp(cluster.offsetY, -cluster.limitY, cluster.limitY);
          cluster.vy *= -1;
        }

        const centerX = cluster.anchorX + cluster.offsetX;
        const centerY = cluster.anchorY + cluster.offsetY;

        ctx.beginPath();
        ctx.arc(centerX, centerY, cluster.radius, 0, Math.PI * 2);
        ctx.fillStyle = primary(0.04);
        ctx.fill();

        return cluster.nodes.map((node) => {
          const angle = node.baseAngle + now * node.orbitSpeed;
          const radialWobble = 1 + Math.sin(now * 0.0011 + node.phase) * 0.08;
          const x =
            centerX +
            Math.cos(angle) * node.orbitRadius * radialWobble +
            Math.sin(now * 0.00065 + node.phase) * 2.5;
          const y =
            centerY +
            Math.sin(angle) * node.orbitRadius * (0.8 + Math.cos(now * 0.0008 + node.phase) * 0.05) +
            Math.cos(now * 0.00072 + node.phase) * 3;

          return { angle, node, x, y } satisfies PositionedNode;
        });
      });

      positionedClusters.forEach((clusterNodes) => {
        for (let a = 0; a < clusterNodes.length; a++) {
          for (let b = a + 1; b < clusterNodes.length; b++) {
            const nodeA = clusterNodes[a];
            const nodeB = clusterNodes[b];
            const dx = nodeA.x - nodeB.x;
            const dy = nodeA.y - nodeB.y;
            const emphasized = nodeA.node.bubbleLabelIdx >= 0 || nodeB.node.bubbleLabelIdx >= 0;
            const maxDistance = emphasized ? 118 : 92;
            const distanceSq = dx * dx + dy * dy;

            if (distanceSq > maxDistance * maxDistance) continue;

            const proximity = 1 - distanceSq / (maxDistance * maxDistance);
            const alpha = emphasized ? 0.16 + proximity * 0.36 : 0.08 + proximity * 0.24;

            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.lineWidth = emphasized ? 1.8 : 1.2;
            ctx.strokeStyle = primary(alpha);
            ctx.stroke();
          }
        }
      });

      positionedClusters.forEach((clusterNodes) => {
        clusterNodes.forEach(({ angle, node, x, y }) => {
          if (node.bubbleLabelIdx >= 0) {
            ctx.beginPath();
            ctx.arc(x, y, node.size + 4, 0, Math.PI * 2);
            ctx.fillStyle = primary(0.12);
            ctx.fill();
          }

          ctx.beginPath();
          ctx.arc(x, y, node.size, 0, Math.PI * 2);
          ctx.fillStyle = node.bubbleLabelIdx >= 0 ? primary(0.82) : primary(0.56);
          ctx.fill();

          if (node.bubbleLabelIdx >= 0) {
            const bubbleEl = bubbleEls[node.bubbleLabelIdx];
            const bubbleWidth = bubbleEl?.offsetWidth || 120;
            const bubbleHeight = bubbleEl?.offsetHeight || 28;
            const offsetX = Math.cos(angle) >= 0 ? 14 : -bubbleWidth - 14;
            const offsetY = Math.sin(angle) >= 0 ? 12 : -bubbleHeight - 12;
            const targetX = clamp(x + offsetX, 8, canvasWidth - bubbleWidth - 8);
            const targetY = clamp(y + offsetY, 8, canvasHeight - bubbleHeight - 8);

            bubbleEl.style.opacity = "1";
            bubbleEl.style.transform = `translate(${targetX}px, ${targetY}px)`;
          }
        });
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
