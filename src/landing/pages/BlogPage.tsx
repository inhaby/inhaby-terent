import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  BookOpen, User, Calendar, Clock, ArrowLeft, Copy, Check, 
  AlertTriangle, Search, FileText, Lightbulb, HelpCircle, 
  Share2, ChevronRight, Globe, Twitter, Linkedin,
  ArrowRight, Mail, ChevronDown, List, X, CornerDownRight, 
  ShieldCheck, FileCheck
} from "lucide-react";
import { Link, useParams, Navigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import OptimizedImage from "../components/OptimizedImage";
import { BLOG_ARTICLES, BlogArticle } from "../data/blogData";

export default function BlogPage() {
  const { slug } = useParams<{ slug: string }>();
  const [activeTab, setActiveTab] = useState<"reader" | "seo">("reader");
  const [activeSection, setActiveSection] = useState("intro");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileTOCOpen, setMobileTOCOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMarkdown, setCopiedMarkdown] = useState(false);
  const [subscribedEmail, setSubscribedEmail] = useState("");
  const [subscribedMessage, setSubscribedMessage] = useState("");

  // Find article by slug
  const article = useMemo(() => {
    return BLOG_ARTICLES.find((a) => a.slug === slug);
  }, [slug]);

  // If article not found, redirect safely to blog listing
  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  // Generate dynamic table of contents sections based on headings
  const parsedSections = useMemo(() => {
    const lines = article.content.split("\n");
    const sectionsList = [{ id: "intro", label: "Introduction" }];
    
    lines.forEach((line) => {
      if (line.startsWith("## ")) {
        const text = line.replace("## ", "").replace(/\*/g, "").trim();
        const id = text.toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
        sectionsList.push({ id, label: text });
      }
    });
    
    return sectionsList;
  }, [article]);

  // FAQ state initialization
  const [faqOpen, setFaqOpen] = useState<Record<number, boolean>>({
    0: true,
    1: false,
    2: false
  });

  const toggleFaq = (index: number) => {
    setFaqOpen((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  // Scroll listener for reading progress bar and active section spy
  useEffect(() => {
    const handleScroll = () => {
      // 1. Reading Progress Bar calculation
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }

      // 2. Active section detection (Scroll spy)
      const scrollPos = window.scrollY + 180; // Offset for sticky headers
      let currentActive = "intro";
      
      parsedSections.forEach((sec) => {
        const element = document.getElementById(sec.id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPos >= top) {
            currentActive = sec.id;
          }
        }
      });
      
      setActiveSection(currentActive);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [parsedSections]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(article.content);
    setCopiedMarkdown(true);
    setTimeout(() => setCopiedMarkdown(false), 2000);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (subscribedEmail.trim() === "") return;
    setSubscribedMessage("Thank you! You have successfully subscribed to the Inhaby Trust dispatch.");
    setSubscribedEmail("");
    setTimeout(() => setSubscribedMessage(""), 5000);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Offset for sticky navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setMobileTOCOpen(false);
    }
  };

  // Dynamically filter 3 related articles
  const relatedArticlesList = useMemo(() => {
    return BLOG_ARTICLES
      .filter((a) => a.id !== article.id)
      .slice(0, 3)
      .map((a) => ({
        title: a.title,
        category: a.category,
        readingTime: a.readingTime,
        date: a.publishedDate,
        image: a.image,
        slug: `/blog/${a.slug}`
      }));
  }, [article]);

  return (
    <div className="bg-background min-h-screen text-foreground relative">
      
      {/* Dynamic Reading Progress Bar */}
      <div 
        className="fixed top-[72px] left-0 h-1 bg-primary z-50 transition-all duration-100" 
        style={{ width: `${scrollProgress}%` }}
        id="reading-progress-bar"
      />

      {/* Decorative ambient gradients */}
      <div className="absolute top-[5%] right-0 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[40%] left-[-10%] w-[600px] h-[600px] bg-primary/2 rounded-full blur-[150px] pointer-events-none" />

      <div className="container px-6 mx-auto pt-24 pb-20 relative z-10">

        {/* Editorial Sub-Navigation Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between border-b border-border/60 pb-6 mb-12 gap-6">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-xs text-muted-foreground font-bold uppercase tracking-widest">
              <Link to="/blog" className="hover:text-primary transition-colors">INHABY Blog</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-primary font-extrabold">{article.category} Journal</span>
            </div>
            <h1 className="text-2xl font-black font-sans tracking-tight">The INHABY Journal</h1>
            <p className="text-xs text-muted-foreground font-medium">Empowering Indian renters with legal protection, data transparency, and zero commission guides.</p>
          </div>

          {/* Interactive Mode Switcher */}
          <div className="flex bg-muted p-1 rounded-2xl border border-border/80 self-start lg:self-center shrink-0">
            <button
              onClick={() => setActiveTab("reader")}
              className={`flex items-center space-x-2 px-5 py-2.5 text-xs font-bold rounded-xl transition-all ${
                activeTab === "reader" 
                  ? "bg-background text-primary shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
              id="btn-article-reader"
            >
              <BookOpen className="w-4 h-4" />
              <span>Premium Article</span>
            </button>
            <button
              onClick={() => setActiveTab("seo")}
              className={`flex items-center space-x-2 px-5 py-2.5 text-xs font-bold rounded-xl transition-all ${
                activeTab === "seo" 
                  ? "bg-background text-primary shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
              id="btn-seo-engine"
            >
              <Search className="w-4 h-4" />
              <span>GEO & SEO Diagnostics</span>
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* TAB 1: PREMIUM EDITORIAL ARTICLE READER */}
        {/* ========================================================= */}
        {activeTab === "reader" ? (
          <div>
            {/* HERO SECTION */}
            <header className="max-w-4xl mx-auto text-center mb-10 space-y-6">
              
              {/* Category Badge & Sparkles */}
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-primary-soft text-primary text-xs font-black uppercase tracking-widest rounded-full border border-primary/20">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{article.seo.primaryCategory}</span>
              </div>

              {/* Title */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground leading-[1.12] font-sans">
                {article.title}
              </h2>

              {/* Meta information panel */}
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-muted-foreground font-semibold pt-2">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold border border-primary/20 text-[10px]">
                    {article.author.avatar}
                  </div>
                  <span className="text-foreground font-bold hover:text-primary transition-colors">{article.author.name}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>Published: {article.publishedDate}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>{article.readingTime}</span>
                </div>
                <div className="flex items-center space-x-1.5 px-2 py-0.5 bg-muted rounded border border-border text-[10px] uppercase font-black text-foreground">
                  Updated: June 2026
                </div>
              </div>

            </header>

            {/* FEATURED IMAGE WITH HOVER INTERACTION */}
            <div className="max-w-5xl mx-auto mb-16 rounded-[2.5rem] overflow-hidden shadow-2xl border border-border group relative aspect-[16/9]" id="featured-image-container">
              <OptimizedImage 
                src={article.image} 
                alt={article.seo.featuredImage.alt}
                aspectRatio="aspect-full h-full w-full"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6 md:p-12">
                <p className="text-white text-xs md:text-sm font-bold tracking-wide drop-shadow-md bg-black/30 backdrop-blur-md py-2 px-4 rounded-xl border border-white/10">
                  {article.seo.featuredImage.suggestion}
                </p>
              </div>
            </div>

            {/* MAIN GRID LAYOUT: STICKY SIDEBAR + EDITORIAL BODY */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* STICKY SIDEBAR (DESKTOP) */}
              <aside className="hidden lg:block lg:col-span-4 space-y-8 sticky top-28" id="desktop-sidebar">
                
                {/* Table of Contents Container */}
                <div className="bg-background border border-border rounded-[2.5rem] p-8 shadow-xs space-y-6">
                  <h3 className="text-xs font-black text-foreground uppercase tracking-wider pb-3 border-b border-border/60 flex items-center justify-between">
                    <span>In This Article</span>
                    <List className="w-4 h-4 text-primary" />
                  </h3>
                  <nav className="space-y-3">
                    {parsedSections.map((section) => {
                      const isActive = activeSection === section.id;
                      return (
                        <button
                          key={section.id}
                          onClick={() => scrollToSection(section.id)}
                          className={`w-full text-left text-xs font-bold transition-all flex items-center space-x-2 py-1 relative cursor-pointer ${
                            isActive 
                              ? "text-primary translate-x-1.5" 
                              : "text-muted-foreground hover:text-foreground hover:translate-x-1"
                          }`}
                        >
                          <CornerDownRight className={`w-3.5 h-3.5 transition-opacity ${isActive ? "opacity-100 text-primary" : "opacity-0"}`} />
                          <span>{section.label}</span>
                        </button>
                      );
                    })}
                  </nav>
                </div>

                {/* Sharing tools */}
                <div className="bg-background border border-border rounded-[2.5rem] p-8 shadow-xs space-y-4">
                  <h4 className="text-xs font-black text-foreground uppercase tracking-widest flex items-center space-x-1.5">
                    <Share2 className="w-3.5 h-3.5 text-primary" />
                    <span>Share With Fellow Renters</span>
                  </h4>
                  <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                    Protect your colleagues and friends from common rental security deposit scams. Direct share links:
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    <button 
                      onClick={handleCopyLink}
                      className="py-2.5 bg-muted border border-border hover:bg-primary-soft hover:text-primary hover:border-primary/20 rounded-xl font-bold text-[11px] text-foreground flex items-center justify-center space-x-1 transition-all cursor-pointer"
                      id="share-btn-link"
                    >
                      {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedLink ? "Copied" : "Copy"}</span>
                    </button>
                    <a 
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.seo.openGraphTitle)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 bg-muted border border-border hover:bg-[#1DA1F2]/10 hover:text-[#1DA1F2] hover:border-[#1DA1F2]/20 rounded-xl font-bold text-[11px] text-foreground flex items-center justify-center space-x-1 transition-all"
                    >
                      <Twitter className="w-3.5 h-3.5" />
                      <span>Tweet</span>
                    </a>
                    <a 
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 bg-muted border border-border hover:bg-[#0A66C2]/10 hover:text-[#0A66C2] hover:border-[#0A66C2]/20 rounded-xl font-bold text-[11px] text-foreground flex items-center justify-center space-x-1 transition-all"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                      <span>Share</span>
                    </a>
                  </div>
                </div>

                {/* Newsletter Box */}
                <div className="bg-muted/50 border border-border rounded-[2.5rem] p-8 shadow-xs space-y-4 relative overflow-hidden" id="newsletter-sidebar">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/3 rounded-full blur-xl pointer-events-none" />
                  <div className="flex items-center space-x-2 text-primary font-extrabold text-xs uppercase tracking-widest">
                    <Mail className="w-4 h-4" />
                    <span>The Inhaby Dispatch</span>
                  </div>
                  <h4 className="text-base font-black text-foreground">Scam-Free Renting Advice</h4>
                  <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                    Join over 12,000+ Indian tenants receiving our monthly digest on tenancy rights, legal templates, and zero brokerage listings.
                  </p>
                  <form onSubmit={handleSubscribe} className="space-y-2 pt-2">
                    <input 
                      type="email" 
                      placeholder="name@company.com" 
                      required
                      value={subscribedEmail}
                      onChange={(e) => setSubscribedEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl text-xs text-foreground font-semibold placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                    />
                    <button 
                      type="submit"
                      className="w-full py-3 bg-primary hover:opacity-95 text-primary-foreground font-bold rounded-xl text-xs transition-opacity shadow-sm cursor-pointer"
                    >
                      Subscribe Free
                    </button>
                  </form>
                  {subscribedMessage && (
                    <motion.p 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[11px] text-emerald-600 font-bold leading-normal mt-2"
                    >
                      {subscribedMessage}
                    </motion.p>
                  )}
                </div>

              </aside>

              {/* ARTICLE BODY CONTENT (8 Cols / Max Width styled for pure readability) */}
              <article className="lg:col-span-8 space-y-8 max-w-[800px] mx-auto leading-relaxed text-sm md:text-base font-medium" id="article-content-body">
                
                <div id="intro" className="scroll-mt-24">
                  {/* Let the markdown handle rendering */}
                </div>

                <ReactMarkdown
                  components={{
                    h1: ({ children }) => <h1 className="text-3xl font-black text-foreground tracking-tight font-sans mt-8 mb-4 border-b border-border pb-2">{children}</h1>,
                    h2: ({ children }) => {
                      const text = String(children || "");
                      const id = text.toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/(^-|-$)/g, "");
                      return (
                        <h2 id={id} className="text-2xl font-black text-foreground tracking-tight font-sans mt-12 mb-6 scroll-mt-24 border-b border-border/40 pb-2 flex items-center">
                          <span className="text-primary mr-3 text-lg">✦</span>
                          {children}
                        </h2>
                      );
                    },
                    h3: ({ children }) => {
                      const text = String(children || "");
                      const id = text.toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/(^-|-$)/g, "");
                      return (
                        <h3 id={id} className="text-lg font-black text-foreground tracking-tight font-sans mt-8 mb-4 scroll-mt-24">
                          {children}
                        </h3>
                      );
                    },
                    p: ({ children }) => <p className="text-muted-foreground font-medium leading-relaxed mb-6">{children}</p>,
                    ul: ({ children }) => <ul className="list-disc list-inside space-y-2 text-muted-foreground font-semibold mb-6 pl-2">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal list-inside space-y-2 text-muted-foreground font-semibold mb-6 pl-2">{children}</ol>,
                    li: ({ children }) => <li className="text-muted-foreground">{children}</li>,
                    blockquote: ({ children }) => {
                      const childEl = Array.isArray(children) ? children[1] || children[0] : children;
                      const contentStr = String((childEl as any)?.props?.children || childEl || "");
                      
                      if (contentStr.includes("⚠️ WARNING") || contentStr.includes("CRITICAL WARNING")) {
                        return (
                          <div className="p-6 md:p-8 bg-rose-500/5 dark:bg-rose-500/10 border-l-4 border-rose-500 rounded-3xl my-8 space-y-3">
                            <div className="flex items-center space-x-2.5 text-rose-600 font-black text-xs uppercase tracking-wider">
                              <AlertTriangle className="w-5 h-5 shrink-0" />
                              <span>CRITICAL WARNING</span>
                            </div>
                            <p className="text-xs sm:text-sm text-foreground/90 font-semibold leading-relaxed">
                              {contentStr.replace(/⚠️ WARNING:?\s*/i, "").replace(/CRITICAL WARNING:?\s*/i, "")}
                            </p>
                          </div>
                        );
                      }
                      
                      if (contentStr.includes("💡 EXPERT TIP")) {
                        return (
                          <div className="p-6 md:p-8 bg-primary/5 border-l-4 border-primary rounded-3xl my-8 space-y-3">
                            <div className="flex items-center space-x-2.5 text-primary font-black text-xs uppercase tracking-wider">
                              <Lightbulb className="w-5 h-5 shrink-0" />
                              <span>💡 EXPERT TIP</span>
                            </div>
                            <p className="text-xs sm:text-sm text-foreground/90 font-semibold leading-relaxed">
                              {contentStr.replace(/💡 EXPERT TIP:?\s*/i, "")}
                            </p>
                          </div>
                        );
                      }

                      if (contentStr.includes("Question:") || contentStr.includes("Direct Answer:")) {
                        const lines = contentStr.split("\n").map(l => l.trim()).filter(Boolean);
                        const question = lines.find(l => l.startsWith("Question:"))?.replace("Question:", "").trim();
                        const answer = lines.find(l => l.startsWith("Direct Answer:"))?.replace("Direct Answer:", "").trim();
                        
                        return (
                          <div className="bg-muted/80 border border-border rounded-3xl p-6 md:p-8 my-8 space-y-4">
                            <div className="flex items-center space-x-2 text-primary font-black text-xs uppercase tracking-wider">
                              <HelpCircle className="w-4 h-4" />
                              <span>Question Engine Overview</span>
                            </div>
                            {question && (
                              <p className="text-sm font-black text-foreground">
                                {question}
                              </p>
                            )}
                            {answer && (
                              <div className="border-l-4 border-primary pl-4 py-1 italic text-xs sm:text-sm md:text-base text-foreground font-semibold leading-relaxed bg-primary/3 pr-2 rounded-r-xl">
                                <strong>Direct Answer:</strong> {answer}
                              </div>
                            )}
                          </div>
                        );
                      }

                      return (
                        <blockquote className="border-l-4 border-primary pl-4 py-2 italic text-muted-foreground my-6 bg-primary-soft/10 pr-2 rounded-r-xl">
                          {children}
                        </blockquote>
                      );
                    },
                    table: ({ children }) => (
                      <div className="overflow-x-auto border border-border rounded-3xl shadow-xs my-8">
                        <table className="w-full text-xs text-left border-collapse">{children}</table>
                      </div>
                    ),
                    thead: ({ children }) => (
                      <thead className="bg-muted/80 text-foreground font-black uppercase border-b border-border text-[10px] tracking-widest">{children}</thead>
                    ),
                    tbody: ({ children }) => (
                      <tbody className="divide-y divide-border/40 font-semibold text-foreground/90 bg-background/50">{children}</tbody>
                    ),
                    tr: ({ children }) => <tr className="hover:bg-muted/20 transition-colors">{children}</tr>,
                    th: ({ children }) => <th className="px-5 py-4">{children}</th>,
                    td: ({ children }) => <td className="px-5 py-4">{children}</td>,
                    hr: () => <hr className="border-border/60 my-12" />
                  }}
                >
                  {article.content}
                </ReactMarkdown>

                {/* WRITTEN AUTHOR CARD BIO */}
                <div className="p-8 bg-muted/40 border border-border rounded-[2.5rem] mt-16 space-y-6">
                  <h4 className="text-xs font-black text-foreground uppercase tracking-wider flex items-center">
                    <User className="w-4 h-4 mr-2 text-primary" />
                    <span>Editorial Compliance Author</span>
                  </h4>
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-xl shrink-0 border border-primary/20">
                      {article.author.avatar}
                    </div>
                    <div className="space-y-3 text-center sm:text-left">
                      <div>
                        <h5 className="font-extrabold text-foreground text-base flex items-center justify-center sm:justify-start">
                          <span>{article.author.name}</span>
                        </h5>
                        <p className="text-xs text-primary font-bold">{article.author.role}</p>
                      </div>
                      <p className="text-xs text-muted-foreground font-semibold leading-relaxed">
                        {article.author.bio}
                      </p>
                      <div className="flex justify-center sm:justify-start space-x-3 text-xs font-bold pt-1">
                        <a href={article.author.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                          Twitter
                        </a>
                        <span className="text-border">|</span>
                        <a href={article.author.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                          LinkedIn
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

              </article>

            </div>

            {/* RELATED ARTICLES */}
            <section className="mt-24 border-t border-border/80 pt-16 space-y-8" id="related-articles-section">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-black text-foreground tracking-tight font-sans">Related Editorial Blueprints</h3>
                  <p className="text-xs text-muted-foreground font-semibold mt-1">Further deep dives on legal checks, state compliance, and tenant guidelines.</p>
                </div>
                <BookOpen className="w-6 h-6 text-primary" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedArticlesList.map((relArticle, idx) => (
                  <Link 
                    key={idx} 
                    to={relArticle.slug}
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="group flex flex-col bg-background border border-border hover:border-primary/30 rounded-[2rem] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 p-4"
                  >
                    <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-4 relative">
                      <OptimizedImage 
                        src={relArticle.image} 
                        alt={relArticle.title} 
                        aspectRatio="aspect-full h-full w-full"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-[10px] text-primary font-black uppercase tracking-wider block mb-1">
                      {relArticle.category}
                    </span>
                    <h4 className="text-sm font-black text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug mb-3">
                      {relArticle.title}
                    </h4>
                    <div className="flex items-center justify-between text-[10px] text-muted-foreground font-extrabold mt-auto pt-2 border-t border-border/40">
                      <span>{relArticle.date}</span>
                      <span className="flex items-center"><Clock className="w-3 h-3 mr-1 text-primary" /> {relArticle.readingTime}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* INTERACTIVE MOBILE FLOAT TRIGGER (BOTTOM BAR TABLE OF CONTENTS) */}
            <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-foreground text-background py-3 px-6 rounded-full shadow-2xl flex items-center space-x-3 text-xs font-black border border-background/25">
              <button 
                onClick={() => setMobileTOCOpen(true)}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <List className="w-4 h-4 text-primary" />
                <span>Article Sections</span>
              </button>
            </div>

            {/* MOBILE TO BOTTOM SHEET PANEL */}
            <AnimatePresence>
              {mobileTOCOpen && (
                <>
                  {/* Backdrop */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setMobileTOCOpen(false)}
                    className="lg:hidden fixed inset-0 bg-black z-50"
                  />
                  
                  {/* Bottom sheet */}
                  <motion.div 
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border rounded-t-[2rem] p-6 z-50 max-h-[80vh] overflow-y-auto"
                  >
                    <div className="flex items-center justify-between pb-4 border-b border-border/60 mb-4">
                      <div className="flex items-center space-x-2">
                        <BookOpen className="w-5 h-5 text-primary" />
                        <span className="text-sm font-black text-foreground">Jump to Section</span>
                      </div>
                      <button 
                        onClick={() => setMobileTOCOpen(false)}
                        className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 text-foreground"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-3.5 py-2">
                      {parsedSections.map((section) => (
                        <button
                          key={section.id}
                          onClick={() => scrollToSection(section.id)}
                          className={`w-full text-left py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-between ${
                            activeSection === section.id 
                              ? "bg-primary text-primary-foreground" 
                              : "bg-muted text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <span>{section.label}</span>
                          <ChevronRight className="w-4 h-4 opacity-70" />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            {/* END OF ARTICLE CTA SECTION */}
            <section className="mt-24 bg-gradient-to-br from-primary/10 via-primary-soft/5 to-transparent border border-primary/20 rounded-[3rem] p-8 md:p-16 text-center max-w-4xl mx-auto space-y-6 relative overflow-hidden" id="final-blog-cta">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/5 rounded-full blur-xl pointer-events-none" />
              
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-2">
                <ShieldCheck className="w-6 h-6" />
              </div>
              
              <h3 className="text-2xl md:text-3xl font-black text-foreground tracking-tight font-sans">
                Looking for a verified rental home?
              </h3>
              
              <p className="text-xs md:text-sm text-muted-foreground font-semibold max-w-xl mx-auto leading-relaxed">
                Skip traditional broker commissions entirely. Browse rental properties 100% vetted for land deed records, direct landlord contact, and secure deposits.
              </p>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
                <Link 
                  to="/"
                  className="w-full sm:w-auto px-8 py-3.5 bg-primary text-primary-foreground hover:opacity-95 text-xs font-extrabold rounded-xl transition-all shadow-sm text-center"
                >
                  Get Started (Tenant Portal)
                </Link>
                <Link 
                  to="/verify" 
                  className="w-full sm:w-auto px-8 py-3.5 bg-background border border-border hover:border-primary/50 text-foreground text-xs font-extrabold rounded-xl transition-all shadow-sm text-center"
                >
                  List Your Property
                </Link>
              </div>
            </section>
          </div>
        ) : (
          
          /* ========================================================= */
          /* TAB 2: GEO & SEO DIAGNOSTICS & SYSTEM DOCUMENTATION */
          /* ========================================================= */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="seo-dashboard-tab">
            
            {/* Left SEO diagnostics */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Box A: Google / Search Console Schema preview */}
              <div className="bg-background border border-border rounded-[2.5rem] p-6 md:p-10 shadow-xs space-y-6">
                <div className="flex items-center space-x-3 pb-4 border-b border-border/60">
                  <div className="p-2.5 bg-primary/10 text-primary rounded-xl">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">Search Engine Crawler Meta Tags</h3>
                    <p className="text-xs text-muted-foreground font-semibold mt-0.5">Optimized tags for standard browser tabs, SEO engines, and search snippets.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-semibold">
                  <div className="space-y-1.5">
                    <span className="text-muted-foreground block">Primary SEO Title Tag</span>
                    <div className="p-4 bg-muted border border-border rounded-xl font-bold text-foreground">
                      {article.seo.seoTitle}
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-muted-foreground block">Relative SEO URL Slug</span>
                    <div className="p-4 bg-muted border border-border rounded-xl font-mono text-primary font-bold">
                      {article.seo.seoSlug}
                    </div>
                  </div>
                  <div className="md:col-span-2 space-y-1.5">
                    <span className="text-muted-foreground block">Meta Description Tag (Strict 155 Characters Limit)</span>
                    <div className="p-4 bg-muted border border-border rounded-xl font-semibold text-foreground/80 leading-relaxed">
                      {article.seo.metaDescription}
                    </div>
                  </div>
                </div>
              </div>

              {/* Box B: Open Graph social markers */}
              <div className="bg-background border border-border rounded-[2.5rem] p-6 md:p-10 shadow-xs space-y-6">
                <div className="flex items-center space-x-3 pb-4 border-b border-border/60">
                  <div className="p-2.5 bg-indigo-500/10 text-indigo-500 rounded-xl">
                    <Share2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">Open Graph (og:tags) & Social Markup</h3>
                    <p className="text-xs text-muted-foreground font-semibold mt-0.5">Previews generated for chat application link previews (Slack, Telegram, WhatsApp).</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-semibold">
                  <div className="space-y-1.5">
                    <span className="text-muted-foreground block">og:title / twitter:title</span>
                    <div className="p-4 bg-muted border border-border rounded-xl font-bold text-foreground">
                      {article.seo.openGraphTitle}
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-muted-foreground block">og:description / twitter:description</span>
                    <div className="p-4 bg-muted border border-border rounded-xl text-foreground/80">
                      {article.seo.openGraphDesc}
                    </div>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <span className="text-muted-foreground block">Open Graph Card Graphic Asset Prompts</span>
                    <div className="p-5 bg-primary/5 border border-primary/20 rounded-2xl space-y-3">
                      <div>
                        <span className="text-[9px] text-primary font-black uppercase tracking-widest block mb-1">Illustration Direction</span>
                        <p className="text-xs font-semibold text-foreground leading-relaxed">{article.seo.featuredImage.suggestion}</p>
                      </div>
                      <div className="pt-2.5 border-t border-primary/10">
                        <span className="text-[9px] text-primary font-black uppercase tracking-widest block mb-1">Accessibility Alt Tag</span>
                        <p className="text-xs font-mono text-muted-foreground">alt="{article.seo.featuredImage.alt}"</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Box C: GEO & AEO structures */}
              <div className="bg-background border border-border rounded-[2.5rem] p-6 md:p-10 shadow-xs space-y-6">
                <div className="flex items-center space-x-3 pb-4 border-b border-border/60">
                  <div className="p-2.5 bg-emerald-500/10 text-emerald-500 rounded-xl">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">GEO & AEO Information Extraction Specifications</h3>
                    <p className="text-xs text-muted-foreground font-semibold mt-0.5">Content engineering optimizations applied to rank on Generative Overviews and LLM citations.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {article.seo.geoAeoFeatures.map((item, index) => (
                    <div key={index} className="p-5 bg-muted/60 border border-border rounded-2xl flex items-start space-x-3.5">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs font-black text-foreground block">{item.type}</span>
                        <p className="text-xs text-muted-foreground leading-relaxed font-semibold">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right SEO Sidebar */}
            <aside className="lg:col-span-4 space-y-8">
              
              {/* LSI/Keywords check */}
              <div className="bg-background border border-border rounded-[2rem] p-6 md:p-8 shadow-xs">
                <h3 className="text-sm font-black text-foreground uppercase tracking-widest mb-4 pb-2 border-b border-border/60 flex items-center justify-between">
                  <span>Semantic Keyword Density</span>
                  <Globe className="w-4 h-4 text-primary" />
                </h3>
                <p className="text-[11px] text-muted-foreground leading-relaxed font-semibold mb-6">
                  Vetted list of key terms mapped naturally throughout the guide to optimize for semantic relevance scores.
                </p>
                <div className="space-y-4">
                  {article.seo.lsiKeywords.map((kw, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs pb-3 border-b border-border/40 last:border-none last:pb-0">
                      <div>
                        <span className="font-bold text-foreground block">"{kw.word}"</span>
                        <span className="text-[9px] text-muted-foreground uppercase tracking-widest font-black">{kw.type}</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <span className="px-2 py-0.5 bg-primary/10 text-primary rounded font-bold text-[10px]">{kw.count}x</span>
                        <Check className="w-4 h-4 text-emerald-500" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Code extraction copy section */}
              <div className="bg-background border border-border rounded-[2rem] p-6 md:p-8 shadow-xs space-y-4">
                <h4 className="text-xs font-black text-foreground uppercase tracking-widest">Raw Article Markdown</h4>
                <p className="text-[11px] text-muted-foreground font-semibold leading-relaxed">
                  Export this article formatted natively in structured Markdown for use in Ghost, Webflow, WordPress, or other editorial platforms.
                </p>
                <button
                  onClick={handleCopyMarkdown}
                  className="w-full py-3 bg-muted border border-border hover:bg-border/60 rounded-xl font-bold text-xs text-foreground flex items-center justify-center space-x-2 transition-all cursor-pointer"
                  id="seo-btn-copy-markdown"
                >
                  {copiedMarkdown ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-500" />
                      <span className="text-emerald-600">Copied Markdown!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-primary" />
                      <span>Copy Raw Markdown</span>
                    </>
                  )}
                </button>
              </div>

            </aside>

          </div>
        )}

      </div>
    </div>
  );
}
