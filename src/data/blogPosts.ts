export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  category: string;
  keywords: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "amazon-ppc-for-beginners-2026",
    title: "Amazon PPC for Beginners (2026): Step-by-Step Guide",
    description:
      "Learn Amazon PPC for Beginners 2026 with this step-by-step guide. Set up Sponsored Products, choose budgets, avoid mistakes, and grow your Amazon sales.",
    excerpt:
      "If you've recently started selling on Amazon, you've probably heard about Amazon PPC (Pay-Per-Click). This beginner's guide explains everything in simple words.",
    date: "2026-05-05",
    readTime: "6 min read",
    author: "Team Ecomify",
    category: "Amazon",
    keywords: ["Amazon PPC for Beginners 2026", "Amazon advertising", "Sponsored Products", "Amazon PPC guide", "Amazon Seller Central"],
  },
  {
    slug: "shopify-dropshipping-guide-2026",
    title: "Shopify Dropshipping in 2026: Complete Beginner's Guide",
    description:
      "Start your Shopify dropshipping business in 2026. Learn product research, store setup, supplier sourcing, and marketing strategies step by step.",
    excerpt:
      "Dropshipping on Shopify remains one of the easiest ways to start an online business. Here's everything you need to know to launch in 2026.",
    date: "2026-04-27",
    readTime: "8 min read",
    author: "Team Ecomify",
    category: "Shopify",
    keywords: ["Shopify dropshipping 2026", "dropshipping guide", "Shopify store setup", "ecommerce beginners"],
  },
  {
    slug: "tiktok-shop-seller-guide-2026",
    title: "How to Sell on TikTok Shop in 2026: Seller's Guide",
    description:
      "Learn how to sell on TikTok Shop in 2026. Set up your store, create viral content, and leverage TikTok's algorithm to drive massive sales.",
    excerpt:
      "TikTok Shop is exploding in 2026. Learn how to set up your store, create content that converts, and tap into the fastest-growing social commerce platform.",
    date: "2026-04-18",
    readTime: "7 min read",
    author: "Team Ecomify",
    category: "TikTok Shop",
    keywords: ["TikTok Shop 2026", "sell on TikTok", "TikTok ecommerce", "social commerce"],
  },
  {
    slug: "amazon-product-listing-optimization",
    title: "Amazon Product Listing Optimization: Rank Higher & Sell More",
    description:
      "Master Amazon product listing optimization. Learn how to write compelling titles, bullet points, descriptions, and use backend keywords to rank higher.",
    excerpt:
      "Your Amazon listing is your storefront. Learn how to optimize every element — title, images, bullets, and keywords — to rank higher and convert more buyers.",
    date: "2026-04-09",
    readTime: "7 min read",
    author: "Team Ecomify",
    category: "Amazon",
    keywords: ["Amazon listing optimization", "Amazon SEO", "product listing", "Amazon keywords", "A+ Content"],
  },
  {
    slug: "shopify-seo-tips-2026",
    title: "10 Shopify SEO Tips to Drive Free Traffic in 2026",
    description:
      "Boost your Shopify store's organic traffic with these 10 proven SEO tips for 2026. From technical SEO to content marketing strategies.",
    excerpt:
      "Paid ads are expensive. These 10 Shopify SEO tips will help you rank on Google and drive free, consistent traffic to your store in 2026.",
    date: "2026-03-30",
    readTime: "6 min read",
    author: "Team Ecomify",
    category: "Shopify",
    keywords: ["Shopify SEO 2026", "Shopify organic traffic", "ecommerce SEO", "Shopify Google ranking"],
  },
  {
    slug: "amazon-fba-vs-fbm-2026",
    title: "Amazon FBA vs FBM in 2026: Which Is Better for You?",
    description:
      "Compare Amazon FBA and FBM in 2026. Understand fees, logistics, pros and cons to choose the best fulfillment method for your Amazon business.",
    excerpt:
      "FBA or FBM? Both have pros and cons. This guide compares costs, logistics, and scalability so you can pick the right fulfillment strategy for 2026.",
    date: "2026-03-20",
    readTime: "5 min read",
    author: "Team Ecomify",
    category: "Amazon",
    keywords: ["Amazon FBA vs FBM", "FBA 2026", "Amazon fulfillment", "FBM advantages"],
  },
  {
    slug: "ecommerce-email-marketing-guide",
    title: "E-Commerce Email Marketing: Boost Sales with Automation",
    description:
      "Learn e-commerce email marketing strategies that convert. Set up automated flows, write compelling emails, and increase customer lifetime value.",
    excerpt:
      "Email marketing delivers the highest ROI in e-commerce. Learn how to set up automated flows that turn one-time buyers into repeat customers.",
    date: "2026-03-11",
    readTime: "6 min read",
    author: "Team Ecomify",
    category: "Marketing",
    keywords: ["ecommerce email marketing", "email automation", "Klaviyo", "email flows", "customer retention"],
  },
  {
    slug: "product-photography-tips-ecommerce",
    title: "Product Photography Tips That Increase Conversions",
    description:
      "Improve your e-commerce product photos with these actionable tips. Learn lighting, angles, editing, and lifestyle shots that boost conversions.",
    excerpt:
      "Great product photos can double your conversion rate. Learn simple photography techniques that make your products look professional and irresistible.",
    date: "2026-03-02",
    readTime: "5 min read",
    author: "Team Ecomify",
    category: "Marketing",
    keywords: ["product photography ecommerce", "product photos tips", "Amazon product images", "ecommerce conversion"],
  },
  {
    slug: "walmart-marketplace-selling-guide",
    title: "How to Start Selling on Walmart Marketplace in 2026",
    description:
      "Get started on Walmart Marketplace in 2026. Learn application, listing, pricing strategies, and how to compete with Amazon sellers.",
    excerpt:
      "Walmart Marketplace is growing fast. This guide covers everything from application to your first sale — and why smart sellers are diversifying beyond Amazon.",
    date: "2026-02-21",
    readTime: "7 min read",
    author: "Team Ecomify",
    category: "Walmart",
    keywords: ["Walmart Marketplace 2026", "sell on Walmart", "Walmart vs Amazon", "Walmart seller guide"],
  },
  {
    slug: "social-media-strategy-ecommerce-brands",
    title: "Social Media Strategy for E-Commerce Brands in 2026",
    description:
      "Build a winning social media strategy for your e-commerce brand. Learn platform selection, content planning, and paid social tactics for 2026.",
    excerpt:
      "Social media drives discovery and trust. Learn how to build a content strategy across Instagram, TikTok, and Pinterest that actually converts to sales.",
    date: "2026-02-12",
    readTime: "8 min read",
    author: "Team Ecomify",
    category: "Marketing",
    keywords: ["social media ecommerce", "ecommerce social strategy", "Instagram marketing", "TikTok marketing 2026"],
  },
];

export const getPostBySlug = (slug: string): BlogPost | undefined =>
  blogPosts.find((p) => p.slug === slug);
