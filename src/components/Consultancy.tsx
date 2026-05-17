import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Clock, Shield, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.png";

const benefits = [
  "Personalized marketplace strategy review",
  "Product niche & profitability analysis",
  "Account health & listing optimization tips",
  "Ad spend audit & scaling roadmap",
  "Brand registry & IP protection guidance",
  "Actionable 30-day growth plan",
];

const Consultancy = () => {
  return (
    <section id="consultancy" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3 bg-primary/10 px-4 py-2 rounded-full">
            <img src={logo} alt="" className="w-4 h-4 object-contain" /> Expert Guidance
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4 mt-4">
            Get a <span className="text-gradient">1-on-1 Consultancy</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Book a personalized session with our e-commerce experts. We'll analyze your
            business, identify growth opportunities, and build you a custom roadmap.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-heading font-bold mb-6">
              What You'll Get
            </h3>
            <div className="space-y-4">
              {benefits.map((b, i) => (
                <motion.div
                  key={b}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 size={20} className="text-primary mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{b}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center gap-6 mt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-primary" />
                <span>45-60 min session</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-primary" />
                <span>100% confidential</span>
              </div>
            </div>
          </motion.div>

          {/* Pricing Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-card border border-border rounded-2xl p-8 shadow-[0_8px_40px_hsl(var(--primary)/0.1)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[60px]" />

              <div className="relative z-10">
                <p className="text-xs font-semibold tracking-[0.15em] uppercase text-primary mb-2">
                  One-Time Session
                </p>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-5xl font-heading font-bold text-foreground">$50</span>
                  <span className="text-muted-foreground text-sm">/ session</span>
                </div>
                <p className="text-muted-foreground text-sm mb-8">
                  No subscriptions. No hidden fees. Just results.
                </p>

                <div className="space-y-3 mb-8">
                  {["Live 1-on-1 video/call session", "Custom strategy document", "Priority follow-up support"].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 size={16} className="text-primary shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="https://wa.me/19413050102?text=Hi%2C%20I%27d%20like%20to%20book%20a%20consultancy%20session."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-7 py-4 rounded-xl font-semibold hover:shadow-[0_0_30px_hsl(160_90%_27%/0.4)] transition-all duration-300 hover:scale-[1.02]"
                >
                  <MessageCircle size={18} />
                  Book Consultancy
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>

                <p className="text-center text-xs text-muted-foreground mt-4">
                  Secure your spot — limited slots available weekly
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Consultancy;
