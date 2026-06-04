import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { MessageCircle, Check, Target, Search, TrendingUp, Filter, BarChart3 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const included = [
  { icon: Target, title: "Campaign Setup & Structure", desc: "Sponsored Products, Brands, and Display campaigns architected for scale and profitability." },
  { icon: Search, title: "Keyword Research", desc: "Deep search-term mining using Helium 10 & Brand Analytics to capture high-intent traffic." },
  { icon: TrendingUp, title: "Bid Optimization", desc: "Daily bid adjustments by placement, dayparting, and search term performance." },
  { icon: Filter, title: "Negative Keyword Management", desc: "Continuous pruning to cut wasted spend and drive ACOS down month over month." },
  { icon: BarChart3, title: "Weekly Reporting", desc: "Clear, actionable reports — ad spend, ACOS, TACOS, sales, and what we did this week." },
];

const faqs = [
  { q: "What is Amazon PPC?", a: "Amazon PPC (Pay-Per-Click) is Amazon's advertising platform — Sponsored Products, Sponsored Brands, and Sponsored Display — where you pay only when a shopper clicks your ad." },
  { q: "How quickly will I see results from PPC management?", a: "Most accounts see improved ACOS within 2–3 weeks. Sales growth typically compounds over 60–90 days as we identify winning keywords and scale them." },
  { q: "What's a good ACOS for my Amazon store?", a: "It depends on your margins. Most brands target 15–25% ACOS for profitability, but launch campaigns and brand defense campaigns may run higher by design." },
  { q: "Do I need a big ad budget to start?", a: "No. We work with budgets starting around $1,500/month in ad spend and scale efficiently as profitable keywords are validated." },
];

const AmazonPPC = () => {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Amazon PPC Management",
    provider: { "@type": "Organization", name: "Team Ecomify", url: "https://teamecomify.com" },
    areaServed: "Worldwide",
    description: "Expert Amazon PPC management — Sponsored Products, Brands, and Display ads to lower ACOS and grow revenue.",
    url: "https://teamecomify.com/amazon-ppc-management",
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Amazon PPC Management Services | Team Ecomify</title>
        <meta name="description" content="Team Ecomify's Amazon PPC experts manage Sponsored Products, Sponsored Brands & Display ads to lower your ACOS and grow revenue. Get a free audit today." />
        <link rel="canonical" href="https://teamecomify.com/amazon-ppc-management" />
        <meta property="og:title" content="Amazon PPC Management Services | Team Ecomify" />
        <meta property="og:description" content="Expert Amazon PPC management to lower ACOS and grow revenue." />
        <meta property="og:url" content="https://teamecomify.com/amazon-ppc-management" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(serviceLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      </Helmet>

      <Navbar />

      <main className="pt-32 pb-20">
        <section className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4 bg-primary/10 px-4 py-2 rounded-full">Amazon PPC</span>
            <h1 className="text-4xl md:text-6xl font-heading font-bold leading-tight mb-5">
              Amazon PPC Management That <span className="text-gradient">Grows Your Revenue</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              We run profitable Sponsored Products, Sponsored Brands, and Sponsored Display campaigns — cutting wasted spend and scaling the keywords that convert.
            </p>
            <a href="https://wa.me/19413050102" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-xl font-semibold hover:opacity-90 transition-opacity">
              <MessageCircle size={18} /> Get a Free PPC Audit
            </a>
          </motion.div>
        </section>

        <section className="container mx-auto px-4 lg:px-8 max-w-5xl mt-20">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4">What Is Amazon PPC, And What Do We Do?</h2>
          <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-12">
            Amazon PPC is the fastest way to put your products in front of buyers actively searching for what you sell. Our team builds, optimizes, and scales every campaign type so each dollar of ad spend pulls its weight — and your organic rank climbs alongside it.
          </p>
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
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-3">Ready to Lower Your ACOS?</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">Talk to a Team Ecomify PPC expert on WhatsApp and get a free account audit.</p>
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

export default AmazonPPC;
