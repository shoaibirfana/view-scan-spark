import { motion } from "framer-motion";
import { Star } from "lucide-react";
import fatimaImg from "@/assets/testimonial-fatima.png";
import aleenaImg from "@/assets/testimonial-aleena.png";
import hassanImg from "@/assets/testimonial-hassan.jpg";
import davidImg from "@/assets/testimonial-david.png";

const testimonials = [
  {
    quote: "Helped me launch a fully branded Shopify store under 'FlipNest'. It looks professional and runs smoothly. Loved the support team too!",
    name: "Fatima Amir",
    role: "Student",
    img: fatimaImg,
  },
  {
    quote: "Got my eBay service bundle through Muaz. Everything from account setup to listing optimization was on point. Great value!",
    name: "Aleena Tahir",
    role: "eBay Seller",
    img: aleenaImg,
  },
  {
    quote: "Helped me turn my eBay store into a full-time income source. The beginner-to-pro training was crystal clear and easy to follow.",
    name: "Hassan Raza",
    role: "Shopify Seller",
    img: hassanImg,
  },
  {
    quote: "I had zero experience in online selling. Thanks to the 'Zero to Hero' service, I now run my Amazon and Shopify stores smoothly.",
    name: "David Owens",
    role: "Shopify Dubai",
    img: davidImg,
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3 block">
            Real People, Real Results
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
            What Our Clients Have To Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Many clients have built successful online brands, earning consistent revenue and
            transitioning into full-time entrepreneurship.
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
              className="bg-card rounded-xl p-6 card-elevated flex flex-col"
            >
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
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-card-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
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
