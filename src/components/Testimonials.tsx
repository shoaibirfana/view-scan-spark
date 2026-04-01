import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
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
];

const Testimonials = () => {
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
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
      </div>
    </section>
  );
};

export default Testimonials;
