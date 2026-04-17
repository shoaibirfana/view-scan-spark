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
    date: "2026-01-15",
    readTime: "6 min read",
    author: "Team Ecomify",
    category: "Amazon",
    keywords: [
      "Amazon PPC for Beginners 2026",
      "Amazon advertising",
      "Sponsored Products",
      "Amazon PPC guide",
      "Amazon Seller Central",
    ],
  },
];

export const getPostBySlug = (slug: string): BlogPost | undefined =>
  blogPosts.find((p) => p.slug === slug);
