import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { MessageCircle, Check, Type, List, FileText, Image, Tag, Camera } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const included = [
  { icon: Type, title: "Title Optimization", desc: "Keyword-rich, character-perfect titles that rank and convert from the first impression." },
  { icon: List, title: "Bullet Points", desc: "Benefit-driven bullets that handle objections and pre-sell shoppers before they scroll." },
  { icon: FileText, title: "Product Description", desc: "Compelling long-form copy that supports A+ Content and reinforces buying intent." },
  { icon: Image, title: "A+ Content", desc: "Visual modules, comparison charts, and brand storytelling that lift conversion 5–10%." },
  { icon: Tag, title: "Backend Keywords", desc: "Hidden search terms that capture long-tail traffic without cluttering the front-end copy." },
  { icon: Camera, title: "Image Guidance", desc: "Detailed shot lists and infographic briefs your photographer or designer can execute on." },
];

const faqs = [
  { q: "How long does Amazon listing optimization take?", a: "Most listings are delivered in 3–5 business days, including keyword research, copy, and backend search terms." },
  { q: "Will optimization actually rank my product higher?", a: "Yes — properly indexed, keyword-aligned listings rank higher organically and convert more of the traffic they get, which compounds rank further." },
  { q: "Do you handle A+ Content design too?", a: "We write the copy, structure the modules, and provide image briefs. We can also handle the visual design if needed." },
  { q: "Can you optimize listings in multiple Amazon marketplaces?", a: "Yes. We support US, CA, UK, EU, AU, and other Amazon marketplaces with native-quality copy." },
];

const AmazonListing = () => {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Amazon Listing Optimization",
    provider: { "@type": "Organization", name: "Team Ecomify", url: "https://teamecomify.com" },
    areaServed: "Worldwide",
    description: "Keyword-rich Amazon listing optimization — titles, bullets, descriptions, A+ Content, and backend search terms.",
    url: "https://teamecomify.com/amazon-listing-optimization",
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Amazon Listing Optimization Services | Team Ecomify</title>
        <meta name="description" content="Rank higher on Amazon with expert listing optimization. Team Ecomify writes keyword-rich titles, bullet points, A+ Content, and backend search terms that convert." />
        <link rel="canonical" href="https://teamecomify.com/amazon-listing-optimization" />
        <meta property="og:title" content="Amazon Listing Optimization Services | Team Ecomify" />
        <meta property="og:description" content="Keyword-rich Amazon listings that rank higher and convert more shoppers." />
        <meta property="og:url" content="https://teamecomify.com/amazon-listing-optimization" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(serviceLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      </Helmet>

      <Navbar />

      <main className="pt-32 pb-20">
        <section className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4 bg-primary/10 px-4 py-2 rounded-full">Listing Optimization</span>
            <h1 className="text-4xl md:text-6xl font-heading font-bold leading-tight mb-5">
              Amazon Listing Optimization — <span className="text-gradient">Rank Higher, Sell More</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              Keyword-driven titles, persuasive bullets, premium A+ Content, and indexed backend search terms — every element tuned to win the click and close the sale.
            </p>
            <a href="https://wa.me/19413050102" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-xl font-semibold hover:opacity-90 transition-opacity">
              <MessageCircle size={18} /> Request a Listing Audit
            </a>
          </motion.div>
        </section>

        <section className="container mx-auto px-4 lg:px-8 max-w-5xl mt-20">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12">What's Included</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {included.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }} className="rounded-2xl p-6 border border-primary/10 bg-card/40 backdrop-blur-xl shadow-[0_8px_32px_hsl(var(--primary)/0.06)]">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="text-primary" size={24} />
                </div>
                <h3 className="font-heading font-semibold text-card-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 lg:px-8 max-w-3xl mt-20">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <motion.div key={f.q} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.05 }} className="rounded-2xl p-6 border border-primary/10 bg-card/40 backdrop-blur-xl">
                <h3 className="font-heading font-semibold text-card-foreground mb-2 flex items-start gap-2">
                  <Check className="text-primary mt-1 shrink-0" size={18} /> {f.q}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed pl-7">{f.a}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 lg:px-8 max-w-3xl mt-20 text-center">
          <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-2xl p-10">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-3">Ready to Rank Higher?</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">Send us your ASIN on WhatsApp and we'll review it for free.</p>
            <a href="https://wa.me/19413050102" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-xl font-semibold hover:opacity-90 transition-opacity">
              <MessageCircle size={18} /> Chat With Us on WhatsApp
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AmazonListing;
