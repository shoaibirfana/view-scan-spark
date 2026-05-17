import { motion } from "framer-motion";
import { MessageCircle, ArrowRight } from "lucide-react";
import logo from "@/assets/logo.png";

const CtaSection = () => {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-primary/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6"
          >
            <img src={logo} alt="Team Ecomify" className="w-10 h-10 object-contain" />
          </motion.div>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-6">
            Ready to Start Your{" "}
            <span className="text-gradient">E-Commerce Journey</span>?
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed text-lg">
            Let's discuss your business goals. Reach out on WhatsApp and we'll help you get
            started right away.
          </p>
          <a
            href="https://wa.me/19413050102"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-[0_0_40px_hsl(160_90%_27%/0.4)] transition-all duration-300 hover:scale-105"
          >
            <MessageCircle size={22} /> Chat on WhatsApp
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <p className="text-sm text-muted-foreground mt-4">+1 (941) 305-0102</p>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
