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
    <section className="py-10 overflow-hidden relative">
      <div className="container mx-auto px-4 mb-8 text-center">
        <h3 className="text-2xl sm:text-3xl font-heading font-bold">
          Master Every Major <span className="text-gradient">Marketplace</span>
        </h3>
      </div>

      <div className="relative overflow-hidden">
        <div
          className="flex w-max min-w-max animate-marquee-left motion-reduce:animate-none items-center"
          style={{ animationDuration: "30s" }}
        >
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center gap-20 pr-20" aria-hidden={copy === 1}>
              {marketplaces.map((mp, i) => (
                <img
                  key={`${copy}-${i}`}
                  src={mp.logo}
                  alt={mp.name}
                  className="h-24 sm:h-32 lg:h-36 w-auto object-contain opacity-75 hover:opacity-100 transition-opacity duration-300"
                  loading="lazy"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarketplaceBanner;
