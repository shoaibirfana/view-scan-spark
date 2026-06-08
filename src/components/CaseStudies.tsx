import { motion } from "framer-motion";

const caseStudies = [
  {
    niche: "Home & Kitchen · Amazon FBA",
    heroStat: "$84K Revenue",
    title: "Amazon FBA Private Label Launch",
    client: "US-based seller, launched 2023",
    challenge: "Launching a new private label product with zero reviews, high competition, and a $3,000 launch budget.",
    whatWeDid: "Full listing optimization with keyword-rich title and A+ Content, strategic PPC launch campaign with exact-match targeting, review generation strategy, competitor gap analysis.",
    results: [
      { label: "Revenue (6 months)", value: "$84,000" },
      { label: "ACoS dropped to", value: "19%" },
      { label: "Page 1 keywords", value: "12" },
      { label: "Avg. rating", value: "4.7★ (340+ reviews)" },
    ],
    waLink: "https://wa.me/19413050102?text=Hi!%20I'm%20interested%20in%20Amazon%20FBA%20launch%20services.",
  },
  {
    niche: "Fashion Accessories · Shopify + Meta Ads",
    heroStat: "0.8% → 3.4% CVR",
    title: "Shopify DTC Brand Turnaround",
    client: "UK-based brand expanding to US market",
    challenge: "Poor Shopify conversion rate (0.8%), high Meta Ads CPM, no email list, no brand identity.",
    whatWeDid: "Complete Shopify store redesign with conversion-focused layout, Meta Ads creative strategy with UGC video content, Klaviyo email automation (welcome, abandoned cart, post-purchase flows), brand identity overhaul.",
    results: [
      { label: "Conversion rate", value: "0.8% → 3.4%" },
      { label: "Email revenue share", value: "31%" },
      { label: "Meta ROAS", value: "4.2x" },
      { label: "Monthly revenue", value: "$12K → $67K" },
    ],
    waLink: "https://wa.me/19413050102?text=Hi!%20I'm%20interested%20in%20Shopify%20store%20development.",
  },
  {
    niche: "Health & Beauty · Multi-Marketplace",
    heroStat: "$28K/mo in 90 Days",
    title: "Walmart Marketplace Expansion",
    client: "Established Amazon seller wanting to diversify",
    challenge: "Amazon account health issues, over-reliance on one platform, suspended listing for a top ASIN.",
    whatWeDid: "Walmart Marketplace seller approval and full account setup, transferred and optimized 40+ listings, suspended Amazon listing reinstated via appeal, PPC campaigns launched on both platforms simultaneously.",
    results: [
      { label: "Walmart revenue", value: "$28K/month" },
      { label: "Listing reinstated", value: "4 days" },
      { label: "Combined revenue +", value: "$41K/month" },
      { label: "Account health", value: "100%" },
    ],
    waLink: "https://wa.me/19413050102?text=Hi!%20I'm%20interested%20in%20Walmart%20Marketplace%20setup.",
  },
];

const CaseStudies = () => {
  return (
    <section className="py-24 bg-[hsl(160,40%,6%)] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-primary/5 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3 bg-primary/10 px-4 py-2 rounded-full">
            Client Success Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold mt-4 text-white">
            Real Results From <span className="text-gradient">Real Clients</span>
          </h2>
          <p className="text-[hsl(160,20%,60%)] mt-4 max-w-xl mx-auto">
            Not just screenshots — here's exactly what we did and the numbers we delivered.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid lg:grid-cols-3 gap-6">
          {caseStudies.map((cs, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[hsl(160,35%,9%)] border border-[hsl(160,40%,15%)] rounded-2xl overflow-hidden flex flex-col"
            >
              {/* Top: niche badge + hero stat */}
              <div className="px-6 pt-6 pb-4 border-b border-[hsl(160,40%,13%)]">
                <span className="inline-block text-xs font-semibold bg-primary/15 text-primary px-3 py-1 rounded-full mb-3">
                  {cs.niche}
                </span>
                <div className="text-3xl font-heading font-bold text-primary">{cs.heroStat}</div>
                <div className="text-sm text-[hsl(160,20%,55%)] mt-1">{cs.client}</div>
              </div>

              {/* Body */}
              <div className="px-6 py-5 flex flex-col gap-4 flex-1">
                {/* Challenge */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-[hsl(160,40%,45%)] mb-1.5">Challenge</h4>
                  <p className="text-sm text-[hsl(160,15%,65%)] leading-relaxed">{cs.challenge}</p>
                </div>

                {/* What We Did */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-[hsl(160,40%,45%)] mb-1.5">What We Did</h4>
                  <p className="text-sm text-[hsl(160,15%,65%)] leading-relaxed">{cs.whatWeDid}</p>
                </div>

                {/* Results grid */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-[hsl(160,40%,45%)] mb-2">Results</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {cs.results.map((r, j) => (
                      <div key={j} className="bg-[hsl(160,40%,6%)] border border-[hsl(160,40%,13%)] rounded-lg px-3 py-2">
                        <div className="text-primary font-bold text-sm">{r.value}</div>
                        <div className="text-[hsl(160,15%,50%)] text-xs mt-0.5">{r.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA link */}
                <a
                  href={cs.waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto text-primary text-sm font-semibold hover:underline inline-flex items-center gap-1"
                >
                  View details →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
