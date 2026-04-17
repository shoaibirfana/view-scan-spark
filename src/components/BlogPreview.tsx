import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";

const BlogPreview = () => {
  const posts = blogPosts.slice(0, 3);

  return (
    <section id="blog" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div>
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3 bg-primary/10 px-4 py-2 rounded-full">
              From the Blog
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold leading-tight">
              Latest <span className="text-gradient">Blog Posts</span>
            </h2>
            <p className="text-muted-foreground mt-3 max-w-lg">
              Practical e-commerce guides to help you launch and scale faster.
            </p>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-primary font-semibold group self-start md:self-auto"
          >
            View all posts
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-elevated bg-card rounded-2xl p-6 border border-border flex flex-col"
            >
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
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
              <h3 className="text-xl font-heading font-bold mb-2 leading-snug">
                <Link to={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                  {post.title}
                </Link>
              </h3>
              <p className="text-muted-foreground text-sm mb-5 flex-1">{post.excerpt}</p>
              <Link
                to={`/blog/${post.slug}`}
                className="inline-flex items-center gap-2 text-primary font-semibold text-sm group"
              >
                Read more
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
