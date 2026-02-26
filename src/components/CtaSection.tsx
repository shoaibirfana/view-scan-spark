import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const CtaSection = () => {
  return (
    <section id="contact" className="py-24 hero-bg">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-6">
            Ready to Start Your E-Commerce Journey?
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Let's discuss your business goals. Reach out on WhatsApp and I'll help you get
            started right away.
          </p>
          <a
            href="https://wa.me/19413050102"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity"
          >
            <MessageCircle size={22} /> Chat on WhatsApp
          </a>
          <p className="text-sm text-muted-foreground mt-4">+1 (941) 305-0102</p>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
