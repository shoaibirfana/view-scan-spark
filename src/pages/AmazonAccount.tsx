import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { MessageCircle, Check, Package, Megaphone, Boxes, MessageSquare, Activity, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const included = [
  { icon: Package, title: "Listing Management", desc: "Daily monitoring, content updates, variations, and Buy Box defense across your full catalog." },
  { icon: Megaphone, title: "PPC Management", desc: "Full Sponsored Products, Brands, and Display campaign management baked in." },
  { icon: Boxes, title: "Inventory Alerts", desc: "FBA restock forecasting and lead-time tracking so you never run out — or over-order." },
  { icon: MessageSquare, title: "Customer Feedback", desc: "Review request automation, negative feedback removal, and reputation management." },
  { icon: Activity, title: "Account Health Monitoring", desc: "Daily account health checks — performance metrics, policy compliance, and IP issues." },
  { icon: ShieldCheck, title: "Compliance Handling", desc: "Plan-of-action drafting, suspension prevention, and category approval support." },
];

const faqs = [
  { q: "What does Amazon account management include?", a: "Everything: listings, PPC, inventory, customer service, feedback, account health, and compliance. We act as your in-house Amazon team." },
  { q: "Do I keep ownership of my Amazon Seller account?", a: "Absolutely. We work inside your Seller Central with limited user permissions — you own the account, brand, and inventory at all times." },
  { q: "How is account management priced?", a: "We offer flat monthly retainers and revenue-share options depending on store size. Message us on WhatsApp for a custom quote." },
  { q: "Can you help recover a suspended account?", a: "Yes. We draft Plans of Action, handle Seller Performance appeals, and have a strong track record of reactivating suspended accounts." },
];

const AmazonAccount = () => {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Amazon Account Management",
    provider: { "@type": "Organization", name: "Team Ecomify", url: "https://teamecomify.com" },
    areaServed: "Worldwide",
    description: "Full-service Amazon seller account management — listings, PPC, inventory, customer service, compliance.",
    url: "https://teamecomify.com/amazon-account-management",
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Amazon Account Management Services | Team Ecomify</title>
        <meta name="description" content="Full Amazon seller account management by Team Ecomify. We handle listings, PPC, inventory, customer service, and compliance so you can focus on growth." />
        <link rel="canonical" href="https://teamecomify.com/amazon-account-management" />
        <meta property="og:title" content="Amazon Account Management Services | Team Ecomify" />
        <meta property="og:description" content="Full-service Amazon seller account management — we run it, you grow." />
        <meta property="og:url" content="https://teamecomify.com/amazon-account-management" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(serviceLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      </Helmet>

      <Navbar />

      <main className="pt-32 pb-20">
        <section className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4 bg-primary/10 px-4 py-2 rounded-full">Account Management</span>
            <h1 className="text-4xl md:text-6xl font-heading font-bold leading-tight mb-5">
              Full Amazon Account Management — <span className="text-gradient">We Run It For You</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              Hand your Seller Central to a dedicated team. We handle listings, advertising, inventory, customer service, account health, and compliance — every day.
            </p>
            <a href="https://wa.me/19413050102" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-xl font-semibold hover:opacity-90 transition-opacity">
              <MessageCircle size={18} /> Book a Strategy Call
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
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-3">Hand Off Your Amazon Store With Confidence</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">Get a free account review and pricing on WhatsApp.</p>
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

export default AmazonAccount;
