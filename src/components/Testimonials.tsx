import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import fatimaImg from "@/assets/testimonial-fatima.png";
import aleenaImg from "@/assets/testimonial-aleena.png";
import hassanImg from "@/assets/testimonial-hassan.jpg";
import davidImg from "@/assets/testimonial-david.png";

const testimonials = [
  {
    quote: "Ecom Surgent helped me launch a fully branded Shopify store under 'FlipNest'. It looks professional and runs smoothly. Loved the support team too!",
    name: "Fatima Amir",
    role: "Student",
    img: fatimaImg,
  },
  {
    quote: "Got my eBay service bundle through Ecom Surgent. Everything from account setup to listing optimization was on point. Great value!",
    name: "Aleena Tahir",
    role: "eBay",
    img: aleenaImg,
  },
  {
    quote: "Ecom Surgent helped me turn my eBay store into a full-time income source. Their beginner-to-pro training was crystal clear and easy to follow.",
    name: "Hassan Raza",
    role: "Shopify",
    img: hassanImg,
  },
  {
    quote: "I had zero experience in online selling. Thanks to Ecom Surgent's 'Zero to Hero' service, I now run my Amazon and Shopify stores smoothly.",
    name: "David Owens",
    role: "Shopify Dubai",
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
            Real People, Real Results
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
