import amazonLogo from "@/assets/marketplaces/amazon.png";
import amazonAdsLogo from "@/assets/marketplaces/amazon_ads.png";
import ebayLogo from "@/assets/marketplaces/ebay.png";
import tiktokShopLogo from "@/assets/marketplaces/tiktokshop.png";
import etsyLogo from "@/assets/marketplaces/etsy.png";
import googleAdsLogo from "@/assets/marketplaces/googleads.png";
import metaLogo from "@/assets/marketplaces/meta.png";
import shopifyLogo from "@/assets/marketplaces/shopify.png";

const marketplaces = [
  { name: "Amazon", logo: amazonLogo },
  { name: "Amazon Ads", logo: amazonAdsLogo },
  { name: "eBay", logo: ebayLogo },
  { name: "TikTok Shop", logo: tiktokShopLogo },
  { name: "Etsy", logo: etsyLogo },
  { name: "Google Ads", logo: googleAdsLogo },
  { name: "Meta", logo: metaLogo },
  { name: "Shopify", logo: shopifyLogo },
];

const MarketplaceBanner = () => {
  return (
    <section className="py-10 overflow-hidden relative">
      <div className="container mx-auto px-4 mb-8 text-center">
        <h3 className="text-2xl sm:text-3xl font-heading font-bold">
          Master Every Major <span className="text-gradient">Marketplace</span>
        </h3>
      </div>

      <div className="relative overflow-hidden py-8">
        <div
          className="flex w-max min-w-max animate-marquee-left motion-reduce:animate-none items-center"
          style={{ animationDuration: "40s" }}
        >
          {[0, 1, 2].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center gap-10 sm:gap-16 lg:gap-24 pr-10 sm:pr-16 lg:pr-24" aria-hidden={copy > 0}>
              {marketplaces.map((mp, i) => (
                <img
                  key={`${copy}-${i}`}
                  src={mp.logo}
                  alt={mp.name}
                  className="h-14 sm:h-16 lg:h-20 w-auto object-contain transition-transform duration-300 hover:scale-125 cursor-pointer"
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
