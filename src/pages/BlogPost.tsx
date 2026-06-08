import { Link, useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, MessageCircle, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPostBySlug } from "@/data/blogPosts";

// ── Original 10 ──
import AmazonPpcBeginners2026 from "@/content/blog/AmazonPpcBeginners2026";
import ShopifyDropshippingGuide2026 from "@/content/blog/ShopifyDropshippingGuide2026";
import TikTokShopSellerGuide2026 from "@/content/blog/TikTokShopSellerGuide2026";
import AmazonProductListingOptimization from "@/content/blog/AmazonProductListingOptimization";
import ShopifySeoTips2026 from "@/content/blog/ShopifySeoTips2026";
import AmazonFbaVsFbm2026 from "@/content/blog/AmazonFbaVsFbm2026";
import EcommerceEmailMarketingGuide from "@/content/blog/EcommerceEmailMarketingGuide";
import ProductPhotographyTips from "@/content/blog/ProductPhotographyTips";
import WalmartMarketplaceSellingGuide from "@/content/blog/WalmartMarketplaceSellingGuide";
import SocialMediaStrategyEcommerce from "@/content/blog/SocialMediaStrategyEcommerce";

// ── New 43 ──
import HowToStartAmazonFba2026 from "@/content/blog/HowToStartAmazonFba2026";
import AmazonProductResearchTools2026 from "@/content/blog/AmazonProductResearchTools2026";
import AmazonSellerAccountSuspendedFix from "@/content/blog/AmazonSellerAccountSuspendedFix";
import HowToSellOnWalmartMarketplace2026 from "@/content/blog/HowToSellOnWalmartMarketplace2026";
import ShopifyStoreSetupChecklist2026 from "@/content/blog/ShopifyStoreSetupChecklist2026";
import AmazonAPlusContentGuide from "@/content/blog/AmazonAPlusContentGuide";
import TikTokShopAffiliateProgramGuide from "@/content/blog/TikTokShopAffiliateProgramGuide";
import EbaySellerAccountSetupGuide from "@/content/blog/EbaySellerAccountSetupGuide";
import AmazonBrandRegistryBenefits from "@/content/blog/AmazonBrandRegistryBenefits";
import ShopifyConversionRateOptimization from "@/content/blog/ShopifyConversionRateOptimization";
import HowToFindProductsToSellOnline2026 from "@/content/blog/HowToFindProductsToSellOnline2026";
import AmazonFbaFeesExplained2026 from "@/content/blog/AmazonFbaFeesExplained2026";
import LlcFormationEcommerceSellers from "@/content/blog/LlcFormationEcommerceSellers";
import AmazonKeywordResearchGuide2026 from "@/content/blog/AmazonKeywordResearchGuide2026";
import ProductSourcingFromChinaGuide from "@/content/blog/ProductSourcingFromChinaGuide";
import AmazonPpcAcosExplained from "@/content/blog/AmazonPpcAcosExplained";
import ShopifyVsAmazon2026 from "@/content/blog/ShopifyVsAmazon2026";
import PrivateLabelAmazon2026 from "@/content/blog/PrivateLabelAmazon2026";
import AmazonListingImagesGuide from "@/content/blog/AmazonListingImagesGuide";
import AmazonWholesaleBusinessModel2026 from "@/content/blog/AmazonWholesaleBusinessModel2026";
import ShopifyEmailMarketingKlaviyoGuide from "@/content/blog/ShopifyEmailMarketingKlaviyoGuide";
import MetaAdsForShopify2026 from "@/content/blog/MetaAdsForShopify2026";
import AmazonSellerCentralCompleteGuide from "@/content/blog/AmazonSellerCentralCompleteGuide";
import HowToGetAmazonReviews2026 from "@/content/blog/HowToGetAmazonReviews2026";
import EcommerceBusinessIdeas2026 from "@/content/blog/EcommerceBusinessIdeas2026";
import TrademarkRegistrationAmazonSellers from "@/content/blog/TrademarkRegistrationAmazonSellers";
import ShopifySeoGuide2026 from "@/content/blog/ShopifySeoGuide2026";
import AmazonRepricingStrategyGuide from "@/content/blog/AmazonRepricingStrategyGuide";
import DropshippingVsAmazonFba2026 from "@/content/blog/DropshippingVsAmazonFba2026";
import ShopifyAppsMustHave2026 from "@/content/blog/ShopifyAppsMustHave2026";
import HowToScaleAmazonBusiness2026 from "@/content/blog/HowToScaleAmazonBusiness2026";
import AmazonInventoryManagementGuide from "@/content/blog/AmazonInventoryManagementGuide";
import HowToSellInternationallyOnAmazon from "@/content/blog/HowToSellInternationallyOnAmazon";
import ShopifyVsWoocommerce2026 from "@/content/blog/ShopifyVsWoocommerce2026";
import AmazonListingOptimizationChecklist from "@/content/blog/AmazonListingOptimizationChecklist";
import HowToStartTikTokShop2026 from "@/content/blog/HowToStartTikTokShop2026";
import AmazonSponsoredProductsGuide2026 from "@/content/blog/AmazonSponsoredProductsGuide2026";
import EcommerceProductPhotographyGuide2026 from "@/content/blog/EcommerceProductPhotographyGuide2026";
import AmazonAccountHealthGuide2026 from "@/content/blog/AmazonAccountHealthGuide2026";
import ShopifyPaymentGatewayOptions2026 from "@/content/blog/ShopifyPaymentGatewayOptions2026";
import EcommerceReturnPolicyGuide from "@/content/blog/EcommerceReturnPolicyGuide";
import LlcVsSoleProprietorshipEcommerce from "@/content/blog/LlcVsSoleProprietorshipEcommerce";
import AmazonPpcCampaignStructureGuide from "@/content/blog/AmazonPpcCampaignStructureGuide";

const contentMap: Record<string, React.ComponentType> = {
  // Original 10
  "amazon-ppc-for-beginners-2026": AmazonPpcBeginners2026,
  "shopify-dropshipping-guide-2026": ShopifyDropshippingGuide2026,
  "tiktok-shop-seller-guide-2026": TikTokShopSellerGuide2026,
  "amazon-product-listing-optimization": AmazonProductListingOptimization,
  "shopify-seo-tips-2026": ShopifySeoTips2026,
  "amazon-fba-vs-fbm-2026": AmazonFbaVsFbm2026,
  "ecommerce-email-marketing-guide": EcommerceEmailMarketingGuide,
  "product-photography-tips-ecommerce": ProductPhotographyTips,
  "walmart-marketplace-selling-guide": WalmartMarketplaceSellingGuide,
  "social-media-strategy-ecommerce-brands": SocialMediaStrategyEcommerce,
  // New 43
  "how-to-start-amazon-fba-2026": HowToStartAmazonFba2026,
  "amazon-product-research-tools-2026": AmazonProductResearchTools2026,
  "amazon-seller-account-suspended-fix": AmazonSellerAccountSuspendedFix,
  "how-to-sell-on-walmart-marketplace-2026": HowToSellOnWalmartMarketplace2026,
  "shopify-store-setup-checklist-2026": ShopifyStoreSetupChecklist2026,
  "amazon-a-plus-content-guide": AmazonAPlusContentGuide,
  "tiktok-shop-affiliate-program-guide": TikTokShopAffiliateProgramGuide,
  "ebay-seller-account-setup-guide": EbaySellerAccountSetupGuide,
  "amazon-brand-registry-benefits": AmazonBrandRegistryBenefits,
  "shopify-conversion-rate-optimization": ShopifyConversionRateOptimization,
  "how-to-find-products-to-sell-online-2026": HowToFindProductsToSellOnline2026,
  "amazon-fba-fees-explained-2026": AmazonFbaFeesExplained2026,
  "llc-formation-ecommerce-sellers": LlcFormationEcommerceSellers,
  "amazon-keyword-research-guide-2026": AmazonKeywordResearchGuide2026,
  "product-sourcing-from-china-guide": ProductSourcingFromChinaGuide,
  "amazon-ppc-acos-explained": AmazonPpcAcosExplained,
  "shopify-vs-amazon-which-is-better-2026": ShopifyVsAmazon2026,
  "private-label-amazon-2026": PrivateLabelAmazon2026,
  "amazon-listing-images-guide": AmazonListingImagesGuide,
  "amazon-wholesale-business-model-2026": AmazonWholesaleBusinessModel2026,
  "shopify-email-marketing-klaviyo-guide": ShopifyEmailMarketingKlaviyoGuide,
  "meta-ads-for-shopify-2026": MetaAdsForShopify2026,
  "amazon-seller-central-complete-guide": AmazonSellerCentralCompleteGuide,
  "how-to-get-amazon-reviews-2026": HowToGetAmazonReviews2026,
  "ecommerce-business-ideas-2026": EcommerceBusinessIdeas2026,
  "trademark-registration-amazon-sellers": TrademarkRegistrationAmazonSellers,
  "shopify-seo-guide-2026": ShopifySeoGuide2026,
  "amazon-repricing-strategy-guide": AmazonRepricingStrategyGuide,
  "dropshipping-vs-amazon-fba-2026": DropshippingVsAmazonFba2026,
  "shopify-apps-must-have-2026": ShopifyAppsMustHave2026,
  "how-to-scale-amazon-business-2026": HowToScaleAmazonBusiness2026,
  "amazon-inventory-management-guide": AmazonInventoryManagementGuide,
  "how-to-sell-internationally-on-amazon": HowToSellInternationallyOnAmazon,
  "shopify-vs-woocommerce-2026": ShopifyVsWoocommerce2026,
  "amazon-listing-optimization-checklist": AmazonListingOptimizationChecklist,
  "how-to-start-tiktok-shop-2026": HowToStartTikTokShop2026,
  "amazon-sponsored-products-guide-2026": AmazonSponsoredProductsGuide2026,
  "ecommerce-product-photography-guide-2026": EcommerceProductPhotographyGuide2026,
  "amazon-account-health-guide-2026": AmazonAccountHealthGuide2026,
  "shopify-payment-gateway-options-2026": ShopifyPaymentGatewayOptions2026,
  "ecommerce-return-policy-guide": EcommerceReturnPolicyGuide,
  "llc-vs-sole-proprietorship-ecommerce": LlcVsSoleProprietorshipEcommerce,
  "amazon-ppc-campaign-structure-guide": AmazonPpcCampaignStructureGuide,
};

const BlogPost = () => {
  const { slug = "" } = useParams();
  const post = getPostBySlug(slug);
  const Content = contentMap[slug];

  if (!post || !Content) return <Navigate to="/blog" replace />;

  const siteUrl = "https://teamecomify.com";
  const url = `${siteUrl}/blog/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    author: { "@type": "Organization", name: post.author, url: siteUrl },
    publisher: { "@type": "Organization", name: "Team Ecomify", url: siteUrl },
    datePublished: post.date,
    dateModified: post.date,
    keywords: post.keywords.join(", "),
    mainEntityOfPage: url,
    url,
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{`${post.title} | Team Ecomify Blog`}</title>
        <meta name="description" content={post.description} />
        <meta name="keywords" content={post.keywords.join(", ")} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:url" content={url} />
        <meta property="og:site_name" content="Team Ecomify" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Navbar />

      <main className="pt-32 pb-20">
        <article className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
              <ArrowLeft size={16} /> Back to Blog
            </Link>

            <header className="mb-10">
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-5">
                <span className="bg-primary/10 text-primary font-semibold px-3 py-1 rounded-full">{post.category}</span>
                <span className="inline-flex items-center gap-1"><Calendar size={12} />{new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                <span className="inline-flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                <span>By {post.author}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-heading font-bold leading-tight mb-4">{post.title}</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">{post.excerpt}</p>
            </header>

            <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-foreground prose-p:text-foreground/85 prose-p:leading-relaxed prose-strong:text-foreground prose-a:text-primary prose-li:text-foreground/85">
              <Content />
            </div>

            {/* CTA */}
            <div className="mt-14 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-heading font-bold mb-3">Need Help Growing Your eCommerce Business?</h3>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Our team handles everything — Amazon PPC, listing optimization, account management, Shopify, and more.{" "}
                <Link to="/#services" className="text-primary font-semibold">See all services</Link>.
              </p>
              <a
                href="https://wa.me/19413050102?text=Hi%20Team%20Ecomify%2C%20I%20read%20your%20blog%20and%20need%20help%20with%20my%20eCommerce%20business."
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-xl font-semibold hover:opacity-90 transition-opacity"
              >
                <MessageCircle size={18} /> Talk to an Expert <ArrowRight size={16} />
              </a>
            </div>
          </motion.div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
