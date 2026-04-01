const marketplaces = [
  "Amazon",
  "Shopify",
  "TikTok Shop",
  "Walmart",
  "eBay",
  "Etsy",
  "Target Plus",
  "Alibaba",
];

const MarketplaceBanner = () => {
  return (
    <section className="py-12 bg-primary/5 overflow-hidden relative">
      <div className="container mx-auto px-4 mb-6 text-center">
        <h3 className="text-2xl sm:text-3xl font-heading font-bold">
          Master Every Major <span className="text-gradient">Marketplace</span>
        </h3>
      </div>

      <div className="relative overflow-hidden">
        <div
          className="flex w-max min-w-max animate-marquee-left motion-reduce:animate-none"
          style={{ animationDuration: "25s" }}
        >
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 gap-0 pr-0" aria-hidden={copy === 1}>
              {marketplaces.map((name, i) => (
                <div
                  key={`${copy}-${i}`}
                  className="flex items-center gap-3 px-8 py-4 mx-3 rounded-full border border-border/60 bg-card/80 backdrop-blur-sm shadow-sm hover:border-primary/40 hover:shadow-md transition-all duration-300"
                >
                  <span className="w-3 h-3 rounded-full bg-primary/80 shrink-0" />
                  <span className="text-lg font-heading font-semibold text-foreground whitespace-nowrap">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarketplaceBanner;
