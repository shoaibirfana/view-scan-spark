import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import logo from "@/assets/logo.png";
import fatimaImg from "@/assets/testimonial-fatima.png";
import aleenaImg from "@/assets/testimonial-aleena.png";
import hassanImg from "@/assets/testimonial-hassan.jpg";
import davidImg from "@/assets/testimonial-david.png";

const testimonials = [
  {
    quote: "Team Ecomify helped me set up my Amazon Wholesale account from scratch. Within two months, I was sourcing profitable products and making consistent sales. Their step-by-step guidance was a game changer!",
    name: "Jessica Taylor",
    role: "Amazon Wholesale",
    img: fatimaImg,
  },
  {
    quote: "Thanks to Team Ecomify, I found top-performing creators for my TikTok Shop. My GMV skyrocketed within weeks — their influencer strategy and content planning really delivered results.",
    name: "Emily Johnson",
    role: "TikTok Shop",
    img: aleenaImg,
  },
  {
    quote: "Team Ecomify handled my entire trademark filing and Amazon Brand Registry process. Now my brand is fully protected and I have access to A+ Content and Sponsored Brand Ads.",
    name: "Michael Carter",
    role: "Amazon Brand Registry",
    img: hassanImg,
  },
  {
    quote: "I struggled with Amazon PPC and listing optimization until Team Ecomify stepped in. They revamped my listings, optimized my campaigns, and my sales doubled in just 3 months.",
    name: "David Owens",
    role: "Amazon FBA",
    img: davidImg,
  },
  {
    quote: "From LLC formation to EIN filing, Team Ecomify made the entire process seamless. I had my business legally set up within a week and was ready to start selling on Amazon right away.",
    name: "Sarah Mitchell",
    role: "LLC & Business Setup",
    img: fatimaImg,
  },
  {
    quote: "Their Shopify store design was incredible — clean, conversion-focused, and mobile-optimized. My bounce rate dropped by 40% and my average order value went up significantly.",
    name: "James Rodriguez",
    role: "Shopify Store",
    img: hassanImg,
  },
  {
    quote: "I was losing money on ads before Team Ecomify took over my PPC campaigns. They restructured everything and within 6 weeks my ACoS dropped from 45% to 18%. Absolutely worth every penny.",
    name: "Amanda Brooks",
    role: "Amazon PPC",
    img: aleenaImg,
  },
  {
    quote: "Team Ecomify sourced winning products for my TikTok Shop that perfectly matched trending content. My first viral video generated over $12K in sales in just 48 hours.",
    name: "Chris Patterson",
    role: "Product Sourcing",
    img: davidImg,
  },
  {
    quote: "Their team helped me recover my suspended Amazon account in under 5 days. I thought my business was over, but they drafted the perfect appeal and got me reinstated quickly.",
    name: "Rachel Kim",
    role: "Account Recovery",
    img: fatimaImg,
  },
  {
    quote: "I've worked with multiple agencies before, but Team Ecomify is on another level. They don't just set things up — they actually care about your growth and follow through on every detail.",
    name: "Brandon Harris",
    role: "Full-Service Client",
    img: hassanImg,
  },
  {
    quote: "The ITIN number process felt so complicated until Team Ecomify walked me through it. They handled all the paperwork and I received my ITIN faster than I expected.",
    name: "Natalie Cooper",
    role: "ITIN Filing",
    img: aleenaImg,
  },
  {
    quote: "Team Ecomify built my entire brand from the ground up — logo, packaging, A+ Content, and storefront. My products now look premium and my conversion rate has never been higher.",
    name: "Tyler Washington",
    role: "Brand Building",
    img: davidImg,
  },
];

const CARDS_PER_PAGE_LG = 4;
const CARDS_PER_PAGE_SM = 2;

const Testimonials = () => {
  const [page, setPage] = useState(0);

  const getCardsPerPage = () => {
    if (typeof window !== "undefined" && window.innerWidth >= 1024) return CARDS_PER_PAGE_LG;
    return CARDS_PER_PAGE_SM;
  };

  const cardsPerPage = getCardsPerPage();
  const totalPages = Math.ceil(testimonials.length / cardsPerPage);

  const next = () => setPage((p) => (p + 1) % totalPages);
  const prev = () => setPage((p) => (p - 1 + totalPages) % totalPages);

  const visible = testimonials.slice(page * cardsPerPage, page * cardsPerPage + cardsPerPage);

  return (
    <section id="testimonials" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3 bg-primary/10 px-4 py-2 rounded-full">
            <img src={logo} alt="" className="w-4 h-4 object-contain" /> Real People, Real Results
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4 mt-4">
            What Our Clients Have To Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Many of our students and clients have built successful online brands, earning consistent
            revenue and transitioning into full-time entrepreneurship.
          </p>
        </motion.div>

        <div className="relative">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visible.map((t, i) => (
              <motion.div
                key={`${page}-${t.name}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="group relative bg-card/80 backdrop-blur-sm rounded-xl p-6 card-elevated border border-border/50 hover:border-primary/30 flex flex-col transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 flex flex-col flex-1">
                  <Quote size={20} className="text-primary/30 mb-3" />
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={14} className="fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-6">
                    "{t.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src={t.img}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20"
                    />
                    <div>
                      <p className="text-sm font-semibold text-card-foreground">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={prev}
              className="p-2 rounded-full bg-card border border-border hover:border-primary/50 text-muted-foreground hover:text-primary transition-all duration-200"
              aria-label="Previous testimonials"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i === page ? "bg-primary w-6" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="p-2 rounded-full bg-card border border-border hover:border-primary/50 text-muted-foreground hover:text-primary transition-all duration-200"
              aria-label="Next testimonials"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
