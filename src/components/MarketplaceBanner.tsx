import amazonLogo from "@/assets/marketplaces/amazon.png";
import shopifyLogo from "@/assets/marketplaces/shopify.png";
import tiktokLogo from "@/assets/marketplaces/tiktok.png";
import walmartLogo from "@/assets/marketplaces/walmart.png";
import ebayLogo from "@/assets/marketplaces/ebay.png";
import etsyLogo from "@/assets/marketplaces/etsy.png";
import targetLogo from "@/assets/marketplaces/target.png";
import alibabaLogo from "@/assets/marketplaces/alibaba.png";

const marketplaces = [
  { name: "Amazon", logo: amazonLogo },
  { name: "Shopify", logo: shopifyLogo },
  { name: "TikTok Shop", logo: tiktokLogo },
  { name: "Walmart", logo: walmartLogo },
  { name: "eBay", logo: ebayLogo },
  { name: "Etsy", logo: etsyLogo },
  { name: "Target Plus", logo: targetLogo },
  { name: "Alibaba", logo: alibabaLogo },
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
            <div key={copy} className="flex shrink-0 gap-4 pr-4" aria-hidden={copy === 1}>
              {marketplaces.map((mp, i) => (
                <div
                  key={`${copy}-${i}`}
                  className="flex items-center justify-center px-6 py-3 rounded-full border border-border/60 bg-card/80 backdrop-blur-sm shadow-sm hover:border-primary/40 hover:shadow-md transition-all duration-300"
                >
                  <img
                    src={mp.logo}
                    alt={mp.name}
                    className="w-10 h-10 object-contain"
                    loading="lazy"
                    width={40}
                    height={40}
                  />
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
