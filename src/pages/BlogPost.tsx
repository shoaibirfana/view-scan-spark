import { Link, useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, MessageCircle, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPostBySlug } from "@/data/blogPosts";
import AmazonPpcBeginners2026 from "@/content/blog/AmazonPpcBeginners2026";

const contentMap: Record<string, React.ComponentType> = {
  "amazon-ppc-for-beginners-2026": AmazonPpcBeginners2026,
};

const BlogPost = () => {
  const { slug = "" } = useParams();
  const post = getPostBySlug(slug);
  const Content = contentMap[slug];

  if (!post || !Content) return <Navigate to="/blog" replace />;

  const siteUrl = typeof window !== "undefined" ? window.location.origin : "";
  const url = `${siteUrl}/blog/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    author: { "@type": "Organization", name: post.author },
    datePublished: post.date,
    keywords: post.keywords.join(", "),
    mainEntityOfPage: url,
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
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Navbar />

      <main className="pt-32 pb-20">
        <article className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft size={16} /> Back to Blog
            </Link>

            <header className="mb-10">
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-5">
                <span className="bg-primary/10 text-primary font-semibold px-3 py-1 rounded-full">
                  {post.category}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Calendar size={12} />
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock size={12} /> {post.readTime}
                </span>
                <span>By {post.author}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-heading font-bold leading-tight mb-4">
                {post.title}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {post.excerpt}
              </p>
            </header>

            <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-foreground prose-p:text-foreground/85 prose-p:leading-relaxed prose-strong:text-foreground prose-a:text-primary prose-li:text-foreground/85">
              <Content />
            </div>

            {/* CTA */}
            <div className="mt-14 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-heading font-bold mb-3">
                Need Help Scaling Your Amazon Store?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Our team handles campaign setup, keyword research, and profit
                optimization so you can focus on growth.{" "}
                <Link to="/#services" className="text-primary font-semibold">
                  See all services
                </Link>
                .
              </p>
              <a
                href="https://wa.me/19413050102?text=Hi%20Team%20Ecomify%2C%20I%20need%20help%20with%20Amazon%20PPC."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-xl font-semibold hover:opacity-90 transition-opacity"
              >
                <MessageCircle size={18} /> Talk to an Expert
                <ArrowRight size={16} />
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
