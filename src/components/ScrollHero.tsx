import { useEffect, useRef, useState } from "react";

/**
 * Cinematic scroll-driven hero — IMAGE SEQUENCE method.
 *
 * FRAMES: 900 frames hosted on Cloudinary, cleanly named
 * frame_001.jpg ... frame_900.jpg (no random suffix).
 *
 * FRAME_BASE = the Cloudinary "upload" URL up to (but not including) the filename.
 * f_auto,q_auto makes Cloudinary serve the best format/quality automatically.
 */
const FRAME_BASE =
  "https://res.cloudinary.com/dxqmakjxj/image/upload/f_auto,q_auto";

const FRAME_COUNT = 900;
// i is 0-based; frames are named starting at 001.
const framePath = (i: number) =>
  `${FRAME_BASE}/frame_${String(i + 1).padStart(3, "0")}.jpg`;


type Overlay = { range: [number, number]; pos: string; title: string; sub?: string; size: string; };

const overlays: Overlay[] = [
  { range: [0.00, 0.13], pos: "top-[7%] left-1/2 -translate-x-1/2 text-center", title: "We Grow eCommerce Brands", sub: "From a plain box to a household name.", size: "text-3xl md:text-5xl" },
  { range: [0.16, 0.30], pos: "bottom-[10%] left-[6%]", title: "Premium Branding", sub: "Packaging & identity that sells.", size: "text-3xl md:text-5xl" },
  { range: [0.33, 0.50], pos: "top-[9%] left-[6%]", title: "Sell Everywhere", sub: "Amazon · Shopify · Walmart · TikTok", size: "text-3xl md:text-5xl" },
  { range: [0.53, 0.68], pos: "top-[9%] left-[6%]", title: "Ads That Convert", sub: "Lower ACoS. Higher ROAS.", size: "text-3xl md:text-5xl" },
  { range: [0.70, 0.85], pos: "top-[7%] left-1/2 -translate-x-1/2 text-center", title: "$5.6M+ Revenue Generated", sub: "Across 300+ brands worldwide.", size: "text-3xl md:text-5xl" },
  { range: [0.87, 1.0], pos: "top-[7%] left-1/2 -translate-x-1/2 text-center", title: "Built to Scale", sub: "Your growth partner from day one.", size: "text-4xl md:text-6xl" },
];

const SCROLL_VH = 700;
// How many frames must load before we hide the loader and allow scrolling.
// We don't wait for ALL frames (esp. with big Cloudinary images) — just an initial batch.
const INITIAL_BATCH = 90;

const ScrollHero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedRef = useRef<boolean[]>([]);
  const [ready, setReady] = useState(false);
  const [loadPct, setLoadPct] = useState(0);
  const [progress, setProgress] = useState(0);
  const lastDrawn = useRef(-1);

  // Preload frames
  useEffect(() => {
    let loaded = 0;
    let cancelled = false;
    const imgs: HTMLImageElement[] = new Array(FRAME_COUNT);
    const flags: boolean[] = new Array(FRAME_COUNT).fill(false);
    loadedRef.current = flags;
    imagesRef.current = imgs;

    const loadOne = (i: number) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        imgs[i] = img;
        img.onload = () => {
          flags[i] = true;
          loaded++;
          setLoadPct(Math.round((loaded / FRAME_COUNT) * 100));
          if (i === 0) drawFrame(0);
          resolve();
        };
        img.onerror = () => {
          loaded++;
          setLoadPct(Math.round((loaded / FRAME_COUNT) * 100));
          resolve();
        };
        img.src = framePath(i);
      });

    // Phase 1: load the OPENING frames strictly IN ORDER (small parallel window),
    // so the hero always starts from frame 0 — never a random later frame.
    const loadInOrder = async () => {
      const CONCURRENCY = 6;
      // Initial batch in order
      for (let i = 0; i < INITIAL_BATCH && i < FRAME_COUNT; i += CONCURRENCY) {
        if (cancelled) return;
        const chunk: Promise<void>[] = [];
        for (let j = i; j < i + CONCURRENCY && j < INITIAL_BATCH && j < FRAME_COUNT; j++) {
          chunk.push(loadOne(j));
        }
        await Promise.all(chunk);
      }
      // Only NOW reveal the hero — opening frames are guaranteed present and in order.
      if (!cancelled) setReady(true);

      // Phase 2: load the rest in order, in the background.
      for (let i = INITIAL_BATCH; i < FRAME_COUNT; i += CONCURRENCY) {
        if (cancelled) return;
        const chunk: Promise<void>[] = [];
        for (let j = i; j < i + CONCURRENCY && j < FRAME_COUNT; j++) {
          chunk.push(loadOne(j));
        }
        await Promise.all(chunk);
      }
    };

    loadInOrder();

    // Safety: if the network is very slow, reveal after a longer grace period
    // (long enough that the opening batch should be done).
    const safety = setTimeout(() => { if (!cancelled) setReady(true); }, 20000);
    return () => { cancelled = true; clearTimeout(safety); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const drawFrame = (idx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let useIdx = idx;
    if (!loadedRef.current[useIdx]) {
      // Prefer the nearest EARLIER loaded frame so we never jump far ahead
      // (which previously made the hero appear to start at a late frame).
      let found = -1;
      for (let d = 1; d <= idx; d++) {
        if (loadedRef.current[idx - d]) { found = idx - d; break; }
      }
      // Only look forward as a last resort, and only a little.
      if (found === -1) {
        for (let d = 1; d <= 8 && idx + d < FRAME_COUNT; d++) {
          if (loadedRef.current[idx + d]) { found = idx + d; break; }
        }
      }
      if (found === -1) return; // nothing suitable yet — leave current frame
      useIdx = found;
    }
    const img = imagesRef.current[useIdx];
    if (!img || !img.complete || !img.naturalWidth) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const cw = canvas.clientWidth, ch = canvas.clientHeight;
    // Option A — STRETCH to fill: draw the whole frame across the full canvas.
    // No cropping, no gaps. May distort slightly if canvas ratio != 16:9.
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, 0, 0, cw, ch);
  };

  // Canvas sizing — use the canvas's actual rendered size (it's shorter than the window
  // because it sits below the navbar), so frames aren't stretched.
  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width || window.innerWidth;
      const h = rect.height || window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawFrame(lastDrawn.current < 0 ? 0 : lastDrawn.current);
    };
    resize();
    // run again shortly after mount so layout is settled
    const t = setTimeout(resize, 100);
    window.addEventListener("resize", resize);
    return () => { clearTimeout(t); window.removeEventListener("resize", resize); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Continuous loop — direct 1:1 scroll → frame mapping
  useEffect(() => {
    let raf = 0;
    let displayedFrame = 0;     // the frame we're actually showing (eased)
    const MAX_STEP = 6;         // max frames advanced per tick → caps fast-scroll speed
    const EASE = 0.15;          // smoothing factor

    const loop = () => {
      const sec = sectionRef.current;
      if (sec) {
        const rect = sec.getBoundingClientRect();
        const total = sec.offsetHeight - window.innerHeight;
        const scrolled = Math.min(Math.max(-rect.top, 0), total);
        const p = total > 0 ? scrolled / total : 0;
        const targetFrame = p * (FRAME_COUNT - 1);

        // Ease displayed frame toward the scroll target, but never jump more
        // than MAX_STEP frames in a single tick. This makes a hard/fast scroll
        // still play through the animation smoothly instead of skipping it.
        let delta = (targetFrame - displayedFrame) * EASE;
        if (delta > MAX_STEP) delta = MAX_STEP;
        if (delta < -MAX_STEP) delta = -MAX_STEP;
        displayedFrame += delta;
        if (Math.abs(targetFrame - displayedFrame) < 0.25) displayedFrame = targetFrame;

        const frame = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(displayedFrame)));
        if (frame !== lastDrawn.current) {
          lastDrawn.current = frame;
          drawFrame(frame);
        }
        setProgress(p);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Navbar height in px — video sits BELOW this so nothing is ever hidden behind the navbar.
  const NAV_H = 72;

  return (
    <section ref={sectionRef} id="home" style={{ height: `${SCROLL_VH}vh`, background: "#020c06" }} className="relative">
      {/* Solid dark bar filling the navbar area so the (transparent-edge) navbar sits on dark, not on the video */}
      <div className="sticky top-0 w-full z-[1]" style={{ height: `${NAV_H}px`, background: "#020c06" }} />

      {/* Video viewport — starts below the navbar, fills the rest of the screen */}
      <div
        className="sticky w-full overflow-hidden"
        style={{ top: `${NAV_H}px`, height: `calc(100vh - ${NAV_H}px)`, marginTop: `-${NAV_H}px` }}
      >
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />


        {!ready && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center" style={{ background: "#020c06" }}>
            <div className="text-2xl font-heading font-bold tracking-[0.3em] mb-5">
              <span style={{ color: "rgb(7,193,120)" }}>TEAM</span> <span className="text-white">ECOMIFY</span>
            </div>
            <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-150" style={{ width: `${loadPct}%`, background: "rgb(7,193,120)" }} />
            </div>
            <p className="text-[10px] mt-3 tracking-widest uppercase" style={{ color: "rgba(255,255,255,.4)" }}>Loading… {loadPct}%</p>
          </div>
        )}

        {ready && overlays.map((o, i) => {
          const [s, e] = o.range;
          let opacity = 0;
          if (progress >= s && progress <= e) {
            const span = e - s, inEnd = s + span * 0.3, outStart = e - span * 0.3;
            // If this overlay starts at the very top (s === 0), show it fully right away
            // (no fade-in) so the opening headline is visible before any scrolling.
            if (s === 0) {
              opacity = progress > outStart ? (e - progress) / (e - outStart) : 1;
            } else if (progress < inEnd) {
              opacity = (progress - s) / (inEnd - s);
            } else if (progress > outStart) {
              opacity = (e - progress) / (e - outStart);
            } else {
              opacity = 1;
            }
          }
          return (
            <div key={i} className={`absolute z-20 max-w-[82%] md:max-w-[42%] pointer-events-none ${o.pos}`}
              style={{ opacity, transform: `${o.pos.includes("-translate-x-1/2") ? "translateX(-50%) " : ""}translateY(${(1 - opacity) * 14}px)`, transition: "opacity 0.12s linear", textShadow: "0 2px 40px rgba(0,0,0,0.95)" }}>
              <h2 className={`font-heading font-bold text-white leading-tight ${o.size}`}>{o.title}</h2>
              {o.sub && <p className="mt-2 text-sm md:text-base" style={{ color: "rgba(255,255,255,.75)" }}>{o.sub}</p>}
            </div>
          );
        })}

        {ready && progress > 0.9 && (
          <div className="absolute z-20 bottom-[12%] left-1/2 -translate-x-1/2 flex gap-3" style={{ opacity: (progress - 0.9) / 0.1 }}>
            <a href="https://wa.me/19413050102" target="_blank" rel="noopener noreferrer" className="px-7 py-3.5 rounded-xl font-semibold text-sm pointer-events-auto" style={{ background: "rgb(7,138,79)", color: "#fff", boxShadow: "0 0 28px rgba(7,193,120,.5)" }}>Get a Free Audit</a>
            <a href="#services" className="px-7 py-3.5 rounded-xl font-semibold text-sm pointer-events-auto" style={{ border: "1px solid rgba(7,193,120,.4)", color: "#fff", background: "rgba(7,193,120,.08)" }}>Our Services</a>
          </div>
        )}

        {ready && progress < 0.04 && (
          <div className="absolute z-20 bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ color: "rgba(255,255,255,.5)" }}>
            <span className="text-xs tracking-widest uppercase">Scroll to explore</span>
            <span className="animate-bounce text-lg">↓</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default ScrollHero;
