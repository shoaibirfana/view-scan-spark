import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blogPosts";

const Blog = () => {
  const siteUrl = typeof window !== "undefined" ? window.location.origin : "";

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Blog — E-Commerce Insights & Guides | Team Ecomify</title>
        <meta
          name="description"
          content="Read the Team Ecomify blog for actionable e-commerce guides on Amazon PPC, Shopify, TikTok Shop, and scaling your online brand in 2026."
        />
        <link rel="canonical" href={`${siteUrl}/blog`} />
        <meta property="og:title" content="Team Ecomify Blog — E-Commerce Insights" />
        <meta
          property="og:description"
          content="Actionable guides on Amazon PPC, Shopify, TikTok Shop, and scaling your online brand."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}/blog`} />
      </Helmet>

      <Navbar />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4 bg-primary/10 px-4 py-2 rounded-full">
              Our Blog
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-5 leading-tight">
              E-Commerce Insights &amp; <span className="text-gradient">Growth Guides</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Practical strategies on Amazon, Shopify, and TikTok Shop — written by
              operators who run real stores.
            </p>
          </motion.header>

          <div className="grid gap-8 md:grid-cols-2">
            {blogPosts.map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card-elevated bg-card rounded-2xl p-7 border border-border flex flex-col"
              >
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                  <span className="bg-primary/10 text-primary font-semibold px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Calendar size={12} />
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock size={12} />
                    {post.readTime}
                  </span>
                </div>
                <h2 className="text-2xl font-heading font-bold mb-3 leading-snug">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="hover:text-primary transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="text-muted-foreground mb-6 flex-1">{post.excerpt}</p>
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-primary font-semibold group"
                >
                  Read article
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
