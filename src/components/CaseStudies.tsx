import { motion } from "framer-motion";
import { TrendingUp, Target, ShoppingBag, Award, ArrowRight } from "lucide-react";

const caseStudies = [
  {
    niche: "Home & Kitchen (Amazon FBA Private Label)",
    client: "US-based seller, launched 2023",
    heroStat: "$84K",
    heroLabel: "revenue in 6 months",
    icon: ShoppingBag,
    challenge: "Launching a new private label product with zero reviews, high competition, and a $3,000 launch budget.",
    didItems: [
      "Full listing optimization with keyword-rich title and A+ Content",
      "Strategic PPC launch campaign with exact-match targeting",
      "Review generation strategy",
      "Competitor gap analysis",
    ],
    results: [
      { value: "$84K", label: "Revenue 6 mo" },
      { value: "68% → 19%", label: "ACoS dropped" },
      { value: "Page 1", label: "for 12 keywords" },
      { value: "4.7★", label: "340+ reviews" },
    ],
    waMessage: "Hi! I'd love to learn more about your Amazon FBA private label service.",
  },
  {
    niche: "Fashion Accessories (Shopify + Meta Ads)",
    client: "UK-based brand expanding to US market",
    heroStat: "5.6x",
    heroLabel: "monthly revenue growth",
    icon: TrendingUp,
    challenge: "Poor Shopify conversion rate (0.8%), high Meta Ads CPM, no email list, no brand identity.",
    didItems: [
      "Complete Shopify redesign with conversion-focused layout",
      "Meta Ads creative strategy with UGC video content",
      "Klaviyo email automation (welcome, abandoned cart, post-purchase)",
      "Brand identity overhaul",
    ],
    results: [
      { value: "0.8% → 3.4%", label: "Conv. rate" },
      { value: "31%", label: "Email revenue" },
      { value: "4.2x", label: "Meta ROAS" },
      { value: "$12K → $67K", label: "Monthly revenue" },
    ],
    waMessage: "Hi! I'm interested in your Shopify + Meta Ads growth service.",
  },
  {
    niche: "Health & Beauty (Multi-marketplace)",
    client: "Established Amazon seller wanting to diversify",
    heroStat: "$28K",
    heroLabel: "new Walmart revenue/mo",
    icon: Award,
    challenge: "Amazon account health issues, over-reliance on one platform, suspended listing for a top ASIN.",
    didItems: [
      "Walmart Marketplace seller approval and full account setup",
      "Transferred and optimized 40+ listings",
      "Suspended Amazon listing reinstated via appeal",
      "PPC campaigns launched on both platforms simultaneously",
    ],
    results: [
      { value: "$0 → $28K/mo", label: "Walmart in 90 days" },
      { value: "4 days", label: "Amazon reinstated" },
      { value: "+$41K/mo", label: "Combined revenue" },
      { value: "100%", label: "Account health" },
    ],
    waMessage: "Hi! I'd like to learn about Walmart Marketplace expansion.",
  },
];

const CaseStudies = () => {
  return (
    <section className="py-24 bg-[hsl(160,40%,6%)] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3 bg-primary/15 px-4 py-2 rounded-full">
            <Target size={14} /> Client Success Stories
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mt-4 text-white">
            Real Results From <span className="text-gradient">Real Clients</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto mt-4">
            Not just screenshots — here's exactly what we did and the numbers we delivered.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {caseStudies.map((cs, i) => (
            <motion.div
              key={cs.niche}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[hsl(160,35%,9%)] border border-[hsl(160,40%,15%)] rounded-2xl p-6 flex flex-col hover:border-primary/40 hover:shadow-[0_0_40px_hsl(160_90%_27%/0.25)] transition-all duration-500"
            >
              <div className="flex items-start justify-between mb-5">
                <div>
                  <span className="inline-block text-[10px] font-semibold tracking-wider uppercase text-primary bg-primary/15 px-3 py-1 rounded-full mb-3">
                    {cs.niche}
                  </span>
                  <p className="text-xs text-white/50">{cs.client}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0">
                  <cs.icon size={20} className="text-primary" />
                </div>
              </div>

              <div className="mb-6 pb-6 border-b border-white/10">
                <div className="text-4xl font-heading font-bold text-gradient">{cs.heroStat}</div>
                <p className="text-sm text-white/60 mt-1">{cs.heroLabel}</p>
              </div>

              <div className="space-y-5 flex-1">
                <div>
                  <h4 className="text-xs font-semibold tracking-wider uppercase text-white/50 mb-2">Challenge</h4>
                  <p className="text-sm text-white/80 leading-relaxed">{cs.challenge}</p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold tracking-wider uppercase text-white/50 mb-2">What We Did</h4>
                  <ul className="space-y-1.5">
                    {cs.didItems.map((item) => (
                      <li key={item} className="text-sm text-white/80 leading-relaxed flex gap-2">
                        <span className="text-primary mt-1">•</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-semibold tracking-wider uppercase text-white/50 mb-2">Results</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {cs.results.map((r) => (
                      <div key={r.label} className="bg-primary/10 border border-primary/20 rounded-lg px-3 py-2">
                        <div className="text-sm font-bold text-primary">{r.value}</div>
                        <div className="text-[10px] text-white/60 mt-0.5">{r.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <a
                href={`https://wa.me/19413050102?text=${encodeURIComponent(cs.waMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all"
              >
                View details <ArrowRight size={14} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
