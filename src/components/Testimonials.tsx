import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import logo from "@/assets/logo.png";
import fatimaImg from "@/assets/testimonial-fatima.png";
import aleenaImg from "@/assets/testimonial-aleena.png";
import hassanImg from "@/assets/testimonial-hassan.jpg";
import davidImg from "@/assets/testimonial-david.png";

const getInitials = (name: string) => name.split(" ").map(n => n[0]).join("").slice(0, 2);

const avatarColors = [
  "bg-emerald-900 text-emerald-300",
  "bg-blue-900 text-blue-300",
  "bg-amber-900 text-amber-300",
  "bg-rose-900 text-rose-300",
  "bg-violet-900 text-violet-300",
  "bg-cyan-900 text-cyan-300",
  "bg-orange-900 text-orange-300",
  "bg-teal-900 text-teal-300",
];

// 12 testimonials — photos and no-photos deliberately mixed so they alternate
const testimonials = [
  { quote: "Team Ecomify helped me set up my Amazon Wholesale account from scratch. Within two months, I was sourcing profitable products and making consistent sales.", name: "Jessica Taylor", role: "Amazon Wholesale", img: fatimaImg },
  { quote: "From LLC formation to EIN filing, Team Ecomify made the entire process seamless. I had my business legally set up within a week.", name: "Sarah Mitchell", role: "LLC & Business Setup", img: null },
  { quote: "Thanks to Team Ecomify, I found top-performing creators for my TikTok Shop. My GMV skyrocketed within weeks — their influencer strategy really delivered.", name: "Emily Johnson", role: "TikTok Shop", img: aleenaImg },
  { quote: "Their Shopify store design was incredible — clean, conversion-focused, and mobile-optimized. My bounce rate dropped by 40%.", name: "James Rodriguez", role: "Shopify Store", img: null },
  { quote: "Team Ecomify handled my entire trademark filing and Amazon Brand Registry. Now my brand is fully protected with access to A+ Content.", name: "Michael Carter", role: "Amazon Brand Registry", img: hassanImg },
  { quote: "I was losing money on ads before Team Ecomify took over. They restructured everything and within 6 weeks my ACoS dropped from 45% to 18%.", name: "Amanda Brooks", role: "Amazon PPC", img: null },
  { quote: "I struggled with Amazon PPC until Team Ecomify stepped in. They revamped my listings, optimized my campaigns, and my sales doubled in just 3 months.", name: "David Owens", role: "Amazon FBA", img: davidImg },
  { quote: "Team Ecomify sourced winning products for my TikTok Shop. My first viral video generated over $12K in sales in just 48 hours.", name: "Chris Patterson", role: "Product Sourcing", img: null },
  { quote: "Their team helped me recover my suspended Amazon account in under 5 days. I thought my business was over, but they got me reinstated quickly.", name: "Rachel Kim", role: "Account Recovery", img: null },
  { quote: "I've worked with multiple agencies before, but Team Ecomify is on another level. They actually care about your growth and follow through.", name: "Brandon Harris", role: "Full-Service Client", img: null },
  { quote: "The ITIN number process felt so complicated until Team Ecomify walked me through it. They handled all the paperwork — faster than expected.", name: "Natalie Cooper", role: "ITIN Filing", img: null },
  { quote: "Team Ecomify built my entire brand from the ground up — logo, packaging, A+ Content, and storefront. My conversion rate has never been higher.", name: "Tyler Washington", role: "Brand Building", img: null },
];

// Duplicate for seamless infinite loop
const allCards = [...testimonials, ...testimonials];

const Card = ({ t, colorIdx }: { t: typeof testimonials[number]; colorIdx: number }) => (
  <div className="w-[320px] sm:w-[340px] flex-shrink-0 bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border/50 flex flex-col mx-2.5">
    <Quote size={18} className="text-primary/30 mb-3" />
    <div className="flex gap-1 mb-3">
      {[...Array(5)].map((_, j) => (
        <Star key={j} size={13} className="fill-primary text-primary" />
      ))}
    </div>
    <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-5">"{t.quote}"</p>
    <div className="flex items-center gap-3">
      {t.img ? (
        <img src={t.img} alt={t.name} className="w-9 h-9 rounded-full object-cover ring-2 ring-primary/20 flex-shrink-0" />
      ) : (
        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${avatarColors[colorIdx % avatarColors.length]}`}>
          {getInitials(t.name)}
        </div>
      )}
      <div>
        <p className="text-sm font-semibold text-card-foreground">{t.name}</p>
        <p className="text-xs text-muted-foreground">{t.role}</p>
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3 bg-primary/10 px-4 py-2 rounded-full">
            <img src={logo} alt="Team Ecomify logo" className="w-4 h-4 object-contain" /> Real People, Real Results
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold mt-4">
            What Our <span className="text-gradient">Clients Say</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto text-sm">
            300+ brands trust Team Ecomify to grow their eCommerce business.
          </p>
        </motion.div>
      </div>

      {/* Single smooth infinite marquee row using CSS animation */}
      <div className="overflow-hidden">
        <style>{`
          @keyframes marquee {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .marquee-track {
            display: flex;
            width: max-content;
            animation: marquee 40s linear infinite;
          }
          .marquee-track:hover {
            animation-play-state: paused;
          }
        `}</style>
        <div className="marquee-track">
          {allCards.map((t, i) => (
            <Card key={i} t={t} colorIdx={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
