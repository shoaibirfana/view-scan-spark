import amazonLogo from "@/assets/marketplaces/amazon.png";
import ebayLogo from "@/assets/marketplaces/ebay.png";
import tiktokShopLogo from "@/assets/marketplaces/tiktokshop.png";
import etsyLogo from "@/assets/marketplaces/etsy.png";
import googleAdsLogo from "@/assets/marketplaces/googleads.png";
import metaLogo from "@/assets/marketplaces/meta.png";

const marketplaces = [
  { name: "Amazon", logo: amazonLogo, className: "h-10 sm:h-12 lg:h-14" },
  { name: "eBay", logo: ebayLogo, className: "h-10 sm:h-12 lg:h-14" },
  { name: "TikTok Shop", logo: tiktokShopLogo, className: "h-8 sm:h-10 lg:h-12" },
  { name: "Etsy", logo: etsyLogo, className: "h-10 sm:h-12 lg:h-14" },
  { name: "Google Ads", logo: googleAdsLogo, className: "h-8 sm:h-10 lg:h-12" },
  { name: "Meta", logo: metaLogo, className: "h-6 sm:h-8 lg:h-9" },
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
                  className={`${mp.className} w-auto object-contain transition-transform duration-300 hover:scale-125 cursor-pointer`}
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
