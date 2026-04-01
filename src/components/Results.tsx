import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

type ResultCardConfig = {
  title: string;
  value: string;
  subtitle: string;
  accent: string;
  accentSoft: string;
  bars: number[];
};

const createResultCard = ({
  title,
  value,
  subtitle,
  accent,
  accentSoft,
  bars,
}: ResultCardConfig) => {
  const chartBars = bars
    .map((height, index) => {
      const barWidth = 48;
      const gap = 22;
      const barHeight = Math.round(36 + (height / 230) * 96);
      const x = 110 + index * (barWidth + gap);
      const y = 460 - barHeight;
      const opacity = (0.62 + index * 0.03).toFixed(2);

      return `<rect x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" rx="14" fill="${accent}" opacity="${opacity}" />`;
    })
    .join("");

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="920" height="580" viewBox="0 0 920 580" fill="none">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="920" y2="580" gradientUnits="userSpaceOnUse">
          <stop stop-color="#07111E" />
          <stop offset="1" stop-color="#111827" />
        </linearGradient>
        <radialGradient id="glow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(780 104) rotate(132) scale(214 168)">
          <stop stop-color="${accentSoft}" stop-opacity="0.32" />
          <stop offset="1" stop-color="${accentSoft}" stop-opacity="0" />
        </radialGradient>
      </defs>

      <rect width="920" height="580" rx="36" fill="url(#bg)" />
      <circle cx="780" cy="104" r="164" fill="url(#glow)" />
      <rect x="34" y="34" width="852" height="82" rx="20" fill="#0F172A" fill-opacity="0.96" />
      <rect x="62" y="57" width="156" height="16" rx="8" fill="${accent}" />
      <rect x="62" y="84" width="196" height="10" rx="5" fill="#334155" />
      <rect x="726" y="57" width="122" height="36" rx="18" fill="${accent}" fill-opacity="0.18" />
      <text x="758" y="81" fill="#E2E8F0" font-size="16" font-family="Arial, sans-serif" font-weight="700">Live</text>

      <text x="62" y="184" fill="#E5EEF8" font-size="32" font-family="Arial, sans-serif" font-weight="700">${title}</text>
      <text x="62" y="246" fill="#FFFFFF" font-size="60" font-family="Arial, sans-serif" font-weight="700">${value}</text>
      <text x="62" y="282" fill="#94A3B8" font-size="24" font-family="Arial, sans-serif">${subtitle}</text>

      <rect x="648" y="154" width="208" height="118" rx="24" fill="#0B1323" />
      <text x="674" y="195" fill="#94A3B8" font-size="18" font-family="Arial, sans-serif">Growth</text>
      <text x="674" y="236" fill="${accentSoft}" font-size="36" font-family="Arial, sans-serif" font-weight="700">+24%</text>
      <rect x="674" y="250" width="116" height="10" rx="5" fill="${accent}" fill-opacity="0.28" />

      <rect x="62" y="318" width="796" height="184" rx="28" fill="#0B1323" />
      <line x1="96" y1="460" x2="830" y2="460" stroke="#1E293B" stroke-width="2" />
      <line x1="96" y1="412" x2="830" y2="412" stroke="#172033" stroke-width="2" />
      <line x1="96" y1="364" x2="830" y2="364" stroke="#172033" stroke-width="2" />
      ${chartBars}

      <rect x="62" y="522" width="168" height="16" rx="8" fill="${accent}" fill-opacity="0.16" />
      <rect x="246" y="522" width="122" height="16" rx="8" fill="#1E293B" />
      <rect x="384" y="522" width="144" height="16" rx="8" fill="#1E293B" />
    </svg>
  `)}`;
};

const resultCards = [
  createResultCard({
    title: "Amazon Revenue",
    value: "$128,430",
    subtitle: "Last 30 days",
    accent: "#F59E0B",
    accentSoft: "#FCD34D",
    bars: [92, 118, 108, 136, 150, 142, 176, 170, 206, 228],
  }),
  createResultCard({
    title: "Shopify Orders",
    value: "2,480",
    subtitle: "Store growth +18%",
    accent: "#22C55E",
    accentSoft: "#86EFAC",
    bars: [80, 96, 112, 104, 132, 146, 154, 174, 188, 202],
  }),
  createResultCard({
    title: "TikTok Shop",
    value: "$64,920",
    subtitle: "Best seller momentum",
    accent: "#F43F5E",
    accentSoft: "#FDA4AF",
    bars: [74, 92, 104, 124, 116, 140, 162, 184, 176, 198],
  }),
  createResultCard({
    title: "Walmart Sales",
    value: "$47,310",
    subtitle: "Weekly payout view",
    accent: "#38BDF8",
    accentSoft: "#7DD3FC",
    bars: [88, 100, 94, 120, 138, 146, 154, 168, 180, 214],
  }),
  createResultCard({
    title: "Marketplace Deposit",
    value: "$18,700",
    subtitle: "Funds cleared today",
    accent: "#A855F7",
    accentSoft: "#D8B4FE",
    bars: [60, 72, 84, 96, 110, 124, 136, 148, 166, 178],
  }),
  createResultCard({
    title: "Profit Snapshot",
    value: "$32,140",
    subtitle: "High margin products",
    accent: "#F97316",
    accentSoft: "#FDBA74",
    bars: [82, 110, 98, 126, 116, 150, 144, 178, 196, 216],
  }),
  createResultCard({
    title: "Conversion Lift",
    value: "7.4%",
    subtitle: "Traffic to checkout",
    accent: "#EAB308",
    accentSoft: "#FDE047",
    bars: [54, 68, 78, 90, 104, 118, 132, 146, 162, 178],
  }),
  createResultCard({
    title: "Scaling Overview",
    value: "$91,860",
    subtitle: "Cross-channel growth",
    accent: "#14B8A6",
    accentSoft: "#5EEAD4",
    bars: [96, 106, 118, 132, 148, 166, 182, 196, 208, 224],
  }),
];

const row1 = resultCards.slice(0, 4);
const row2 = resultCards.slice(4);

const MarqueeRow = ({
  images,
  direction = "left",
  duration = 30,
}: {
  images: string[];
  direction?: "left" | "right";
  duration?: number;
}) => {
  const doubled = [...images, ...images];
  const animationClass = direction === "left" ? "animate-marquee-left" : "animate-marquee-right";

  return (
    <div className="relative overflow-hidden py-3">
      <div
        className={`flex gap-6 ${animationClass}`}
        style={{ animationDuration: `${duration}s` }}
      >
        {doubled.map((img, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[340px] sm:w-[400px] lg:w-[460px] rounded-xl overflow-hidden border border-border/50 shadow-[0_8px_30px_hsl(var(--primary)/0.08)] hover:border-primary/30 transition-colors duration-300"
          >
            <img
              src={img}
              alt={`Client result ${(i % images.length) + 1}`}
              className="w-full h-auto object-cover"
              loading="lazy"
              width={920}
              height={580}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const Results = () => {
  return (
    <section id="results" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3 bg-primary/10 px-4 py-2 rounded-full">
            <img src={logo} alt="" className="w-4 h-4 object-contain" /> Proven Success
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4 mt-4">
            Results <span className="text-gradient">Don't Lie</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We let the dashboards do the talking. Real students, real products, real payouts.
          </p>
        </motion.div>
      </div>

      <div className="relative z-10 space-y-6">
        <MarqueeRow images={row1} direction="left" duration={35} />
        <MarqueeRow images={row2} direction="right" duration={40} />
      </div>
    </section>
  );
};

export default Results;
