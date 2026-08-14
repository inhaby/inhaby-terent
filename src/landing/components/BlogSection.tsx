import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { BookOpen, Clock, ArrowRight, Sparkles } from "lucide-react";
import OptimizedImage from "./OptimizedImage";
import { BLOG_ARTICLES } from "../data/blogData";

export default function BlogSection() {
  // Get 3 curated articles (e.g., trending or first 3)
  const curatedArticles = BLOG_ARTICLES.slice(0, 3);

  return (
    <section id="blog-section" className="py-12 md:py-24 bg-background relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-[20%] right-[-10%] w-[350px] h-[350px] bg-primary/3 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[350px] h-[350px] bg-primary/2 rounded-full blur-[100px] pointer-events-none" />

      <div className="container px-5 sm:px-6 mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="inline-flex items-center space-x-2 px-4 py-1.5 mb-4 text-xs font-bold tracking-widest text-primary uppercase bg-primary-soft rounded-full border border-primary/15">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Inhaby Journal</span>
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-extrabold tracking-tight text-foreground font-sans leading-tight">
            From the Inhaby Journal
          </h2>
          <p className="mt-3 text-sm md:text-lg text-muted-foreground leading-relaxed font-medium">
            Learn about tenancy rights, municipal title deed verifications, and engineering updates from the team building Inhaby.
          </p>
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {curatedArticles.map((article, idx) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex"
            >
              <Link
                to={`/blog/${article.slug}`}
                className="flex flex-col bg-muted/30 border border-border/80 hover:border-primary/25 rounded-[2rem] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg w-full"
              >
                {/* Thumbnail Area */}
                <div className="aspect-[16/10] overflow-hidden relative">
                  <OptimizedImage
                    src={article.image}
                    alt={article.title}
                    aspectRatio="aspect-full h-full w-full"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-background/90 backdrop-blur-md text-primary rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm border border-border/40">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 md:p-8 flex flex-col flex-1 justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-[9px] font-black text-muted-foreground uppercase tracking-widest">
                      <span>{article.publishedDate}</span>
                      <span>•</span>
                      <span className="flex items-center text-primary">
                        <Clock className="w-3 h-3 mr-1" />
                        {article.readingTime}
                      </span>
                    </div>
                    <h4 className="text-base font-black text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">
                      {article.title}
                    </h4>
                    <p className="text-[11px] text-muted-foreground font-semibold leading-relaxed line-clamp-2">
                      {article.description}
                    </p>
                  </div>

                  {/* Footer Author Info */}
                  <div className="flex items-center justify-between pt-5 border-t border-border/40 mt-auto">
                    <div className="flex items-center space-x-2">
                      <div className="w-6.5 h-6.5 rounded-full bg-primary/15 text-primary text-[9px] font-black flex items-center justify-center border border-primary/20">
                        {article.author.avatar}
                      </div>
                      <span className="text-[10px] text-foreground font-extrabold">{article.author.name}</span>
                    </div>
                    <span className="text-xs text-primary font-black flex items-center group-hover:translate-x-1 transition-transform">
                      Read article <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            to="/blog"
            className="inline-flex items-center justify-center space-x-2 px-8 py-3.5 bg-primary text-primary-foreground font-bold rounded-xl text-xs shadow-md hover:opacity-95 transition-opacity"
          >
            <span>Explore all articles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
