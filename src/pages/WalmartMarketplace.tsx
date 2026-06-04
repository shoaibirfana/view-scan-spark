import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { MessageCircle, Check, UserCheck, ListChecks, DollarSign, Settings } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const included = [
  { icon: UserCheck, title: "Seller Approval Help", desc: "Application strategy, documentation prep, and follow-up to get you approved on Walmart Marketplace." },
  { icon: ListChecks, title: "Listing Optimization", desc: "Walmart-native titles, key features, descriptions, and attributes that win the Buy Box." },
  { icon: DollarSign, title: "Pricing Strategy", desc: "Competitive repricing and Pro Seller Badge strategy to dominate Walmart search results." },
  { icon: Settings, title: "Account Management", desc: "Daily order management, performance monitoring, reviews, and ongoing growth optimization." },
];

const faqs = [
  { q: "How hard is it to get approved on Walmart Marketplace?", a: "Walmart is selective. Approval depends on your sales history, product mix, and tax/business documentation. We package your application to maximize approval odds." },
  { q: "Is Walmart Marketplace worth it for Amazon sellers?", a: "Yes. Walmart has less competition than Amazon, lower referral fees in many categories, and growing traffic — making it the strongest second channel for Amazon brands." },
  { q: "Do you handle Walmart Fulfillment Services (WFS)?", a: "Yes. We help you enroll in WFS, send inventory, and use the Pro Seller and TwoDay tags to lift conversion." },
  { q: "Can you migrate my Amazon listings to Walmart?", a: "Absolutely. We re-format your catalog for Walmart's spec, rewrite copy for Walmart shoppers, and load it via bulk feeds." },
];

const WalmartMarketplace = () => {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Walmart Marketplace Management",
    provider: { "@type": "Organization", name: "Team Ecomify", url: "https://teamecomify.com" },
    areaServed: "United States",
    description: "Walmart Marketplace seller approval, listing setup, pricing strategy, and ongoing account management.",
    url: "https://teamecomify.com/walmart-marketplace",
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Walmart Marketplace Management Services | Team Ecomify</title>
        <meta name="description" content="Launch and grow your Walmart Marketplace store with Team Ecomify. We handle seller approval, listing setup, pricing strategy, and ongoing account management." />
        <link rel="canonical" href="https://teamecomify.com/walmart-marketplace" />
        <meta property="og:title" content="Walmart Marketplace Management Services | Team Ecomify" />
        <meta property="og:description" content="Launch and grow on Walmart Marketplace with expert seller approval and account management." />
        <meta property="og:url" content="https://teamecomify.com/walmart-marketplace" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(serviceLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      </Helmet>

      <Navbar />

      <main className="pt-32 pb-20">
        <section className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4 bg-primary/10 px-4 py-2 rounded-full">Walmart Marketplace</span>
            <h1 className="text-4xl md:text-6xl font-heading font-bold leading-tight mb-5">
              Walmart Marketplace Management — <span className="text-gradient">Expand Beyond Amazon</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              From seller approval to optimized listings, competitive pricing, and daily account management — we'll get you live on Walmart and scaling fast.
            </p>
            <a href="https://wa.me/19413050102" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-xl font-semibold hover:opacity-90 transition-opacity">
              <MessageCircle size={18} /> Start Selling on Walmart
            </a>
          </motion.div>
        </section>

        <section className="container mx-auto px-4 lg:px-8 max-w-5xl mt-20">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12">What's Included</h2>
          <div className="grid md:grid-cols-2 gap-6">
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
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-3">Ready to Launch on Walmart?</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">Chat with our Walmart specialists on WhatsApp.</p>
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

export default WalmartMarketplace;
