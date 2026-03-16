import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import logo from "@/assets/logo.png";

import team1 from "@/assets/team-1.png";
import team2 from "@/assets/team-2.png";
import team3 from "@/assets/team-3.jpg";
import team4 from "@/assets/team-4.jpg";
import team5 from "@/assets/team-5.jpg";
import team6 from "@/assets/team-6.jpg";
import team7 from "@/assets/team-7.jpg";
import team8 from "@/assets/team-8.jpg";
import team9 from "@/assets/team-9.jpg";
import team10 from "@/assets/team-10.jpg";

const members = [
  { name: "Ayesha Khan", role: "Amazon Specialist", photo: team1 },
  { name: "Sara Ahmed", role: "Shopify Expert", photo: team2 },
  { name: "Hina Malik", role: "Brand Strategist", photo: team3 },
  { name: "Nadia Hussain", role: "TikTok Shop Manager", photo: team4 },
  { name: "Zainab Tariq", role: "Product Sourcing Lead", photo: team5 },
  { name: "Fatima Raza", role: "Account Recovery Expert", photo: team6 },
  { name: "Amina Javed", role: "Trademark Specialist", photo: team7 },
  { name: "Sana Noor", role: "eBay Specialist", photo: team8 },
  { name: "Mariam Ali", role: "Walmart Expert", photo: team9 },
  { name: "Rabia Sheikh", role: "LLC Formation Lead", photo: team10 },
];

const VISIBLE = 3;
const INTERVAL = 3500;

const Team = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const maxIndex = members.length - VISIBLE;

  const next = () => setIndex((i) => (i >= maxIndex ? 0 : i + 1));
  const prev = () => setIndex((i) => (i <= 0 ? maxIndex : i - 1));

  return (
    <section ref={sectionRef} className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3 bg-primary/10 px-4 py-2 rounded-full">
            <img src={logo} alt="" className="w-4 h-4 object-contain" /> Our Team
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold mt-4">
            Meet the <span className="text-gradient">Experts</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Our talented team works around the clock to help your e-commerce business thrive.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-5xl mx-auto">
          <button
            onClick={prev}
            className="absolute -left-4 sm:-left-10 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute -right-4 sm:-right-10 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
          >
            <ChevronRight size={20} />
          </button>

          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${index * (100 / VISIBLE)}%)`, gap: '1.5rem' }}
            >
              {members.map((m, i) => (
                <div
                  key={i}
                  className="flex-shrink-0"
                  style={{ width: `calc(${100 / VISIBLE}% - 1rem)` }}
                >
                  <div className="bg-card/80 backdrop-blur-sm rounded-2xl overflow-hidden card-elevated border border-border/50 group">
                    <div className="aspect-[3/4] overflow-hidden">
                      <img
                        src={m.photo}
                        alt={m.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5 text-center">
                      <h3 className="font-heading font-semibold text-foreground">{m.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{m.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === index ? "bg-primary w-6" : "bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
