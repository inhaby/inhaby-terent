import { useState } from "react";
import { motion } from "motion/react";
import { Twitter, Instagram, Linkedin, Github, Mail, Globe, Sun, Moon, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useLanguage, languages } from "../context/LanguageContext";
import Logo from "./Logo";

const footerColumns = [
  {
    title: "Products",
    links: [
      { name: "Tenant Portal", href: "https://inhaby.com", external: true },
      { name: "Owner Portal", href: "https://owner.inhaby.com", external: true },
      { name: "Verification", href: "/verify", external: false },
      { name: "Pricing", href: "/pricing", external: false },
      { name: "Support Desk", href: "mailto:support@inhaby.com", external: true },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Inhaby", href: "#", external: false },
      { name: "Trust Blog", href: "/blog", external: false },
      { name: "Our Mission", href: "#", external: false },
      { name: "Careers (Hiring!)", href: "#", external: false },
      { name: "Contact Verification", href: "#", external: false },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "#", external: false },
      { name: "Terms of Service", href: "#", external: false },
      { name: "E-Stamp Integrity", href: "#", external: false },
      { name: "Security Protocols", href: "#", external: false },
    ],
  },
];

const socialLinks = [
  { icon: Twitter, href: "https://x.com/inhaby", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com/officialinhaby", label: "Instagram (Official)" },
  { icon: Instagram, href: "https://instagram.com/inhabyindia", label: "Instagram (India)" },
  { icon: Linkedin, href: "https://linkedin.com/company/inhaby", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/inhaby", label: "GitHub" },
];

export default function Footer() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  const currentLanguage = languages.find((l) => l.code === language) || languages[0];

  const mobileColumns = [
    ...footerColumns,
    {
      title: "Contact & Support",
      links: [], // Empty links to identify type, content handled explicitly
      content: (
        <div className="space-y-2 text-left">
          <p className="text-xs text-muted-foreground font-semibold leading-relaxed">
            Inhaby Support is active 24/7. Reach out via email or visit our offices:
          </p>
          <div className="text-xs text-foreground font-bold space-y-1 pt-1">
            <p>Email: support@inhaby.com</p>
            <p>Corporate Hub: Indiranagar, Bangalore, KA</p>
          </div>
        </div>
      )
    }
  ];

  return (
    <footer className="bg-background border-t border-border pt-12 pb-12 relative z-10">
      <div className="container px-5 sm:px-6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Brand & Newsletter Section */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <div>
              <Logo className="h-10 mb-4" />
              <p className="mt-4 text-muted-foreground text-sm leading-relaxed max-w-md">
                Helping people rent homes in India with complete trust, document verification, price transparency, and zero brokerage.
              </p>
              <div className="inline-flex items-center space-x-2 mt-4 text-primary font-bold text-xs tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Live Better. Stay Smarter.</span>
              </div>
            </div>
            
            {/* Newsletter form */}
            <div className="space-y-4">
              <h4 className="text-xs font-extrabold text-foreground uppercase tracking-wider">Stay Verified & Updated</h4>
              <p className="text-xs text-muted-foreground font-semibold">Join 15,000+ renters. Receive premium landlord listings and safety tips directly.</p>
              <form className="flex max-w-md bg-muted p-1 border border-border rounded-2xl" onSubmit={(e) => e.preventDefault()}>
                <div className="relative flex-grow flex items-center">
                  <Mail className="absolute left-3.5 w-4 h-4 text-muted-foreground" />
                  <input 
                    type="email" 
                    placeholder="Enter your email address" 
                    className="w-full pl-10 pr-4 py-3 bg-transparent text-sm text-foreground outline-none border-none font-semibold focus:ring-0 placeholder:text-muted-foreground/60"
                  />
                </div>
                <button className="px-6 py-3 bg-primary text-primary-foreground text-xs font-extrabold rounded-xl hover:bg-primary/90 transition-colors shadow-sm">
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Contact coordinates section */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-end justify-center text-center lg:text-right space-y-6">
            <h3 className="text-2xl font-extrabold text-foreground max-w-sm tracking-tight leading-snug">
              Have a property to list? Let us verify it.
            </h3>
            <div className="inline-flex items-center space-x-3 px-6 py-3.5 bg-muted border border-border rounded-full hover:border-primary/20 transition-all cursor-pointer group">
              <Mail className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-sm font-extrabold text-foreground">support@inhaby.com</span>
            </div>
          </div>
        </div>

        {/* Mobile Accordions (Only on mobile) */}
        <div className="sm:hidden border-t border-border/60 pt-8 mb-10 space-y-3">
          {mobileColumns.map((column, idx) => {
            const isOpen = activeAccordion === idx;
            return (
              <div key={column.title} className="border border-border rounded-2xl overflow-hidden bg-muted/10">
                <button
                  type="button"
                  onClick={() => setActiveAccordion(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-extrabold text-xs uppercase tracking-wider text-foreground select-none cursor-pointer"
                >
                  <span>{column.title}</span>
                  <span className="text-primary text-sm font-bold">{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen && (
                  <div className="p-5 bg-background border-t border-border/40">
                    {"content" in column ? (
                      column.content
                    ) : (
                      <ul className="space-y-3">
                        {column.links.map((link) => (
                          <li key={link.name}>
                            {link.external ? (
                              <a 
                                href={link.href}
                                className="text-xs font-semibold text-muted-foreground hover:text-primary transition-colors block py-0.5"
                              >
                                {link.name}
                              </a>
                            ) : (
                              <Link 
                                to={link.href} 
                                className="text-xs font-semibold text-muted-foreground hover:text-primary transition-colors block py-0.5"
                              >
                                {link.name}
                              </Link>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Desktop / Tablet Links Grid (Hidden on Mobile) */}
        <div className="hidden sm:grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 pt-16 border-t border-border/60">
          {footerColumns.map((column) => (
            <div key={column.title} className="space-y-4">
              <h4 className="text-xs font-extrabold text-foreground uppercase tracking-wider">{column.title}</h4>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.name}>
                    {link.external ? (
                      <a 
                        href={link.href}
                        className="text-xs font-semibold text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link 
                        to={link.href} 
                        className="text-xs font-semibold text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Custom Contact column in Footer */}
          <div className="space-y-4 text-left">
            <h4 className="text-xs font-extrabold text-foreground uppercase tracking-wider">Contact & Support</h4>
            <p className="text-xs text-muted-foreground font-semibold leading-relaxed">
              Inhaby Support is active 24/7. Reach out via email or visit our offices:
            </p>
            <div className="text-xs text-foreground font-bold space-y-1">
              <p>Email: support@inhaby.com</p>
              <p>Corporate Hub: Indiranagar, Bangalore, KA</p>
            </div>
          </div>
        </div>

        {/* Bottom Metadata row (Language, Theme Toggle, Social, Copyright) */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Copyright, Language selector, and Theme Toggle */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6 text-xs text-muted-foreground font-semibold">
            <span>© {new Date().getFullYear()} Inhaby Inc.</span>
            
            {/* Interactive Language dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center space-x-1.5 cursor-pointer hover:text-primary transition-colors font-bold"
              >
                <Globe className="w-3.5 h-3.5 text-primary animate-pulse" />
                <span>{currentLanguage.nativeName}</span>
              </button>
              
              {isLangDropdownOpen && (
                <div className="absolute bottom-7 left-0 bg-background border border-border p-1.5 rounded-xl shadow-xl flex flex-col space-y-1 min-w-[140px] z-50">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setIsLangDropdownOpen(false);
                      }}
                      className={`text-[11px] font-bold text-left px-2.5 py-1.5 rounded-lg transition-colors w-full cursor-pointer ${
                        language === l.code
                          ? "bg-primary-soft text-primary"
                          : "hover:bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {l.nativeName} ({l.name})
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* In-Footer Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="flex items-center space-x-1.5 cursor-pointer hover:text-primary transition-colors"
              aria-label="Toggle theme appearance"
            >
              {theme === "light" ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-primary" />
                  <span>Dark Mode</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-primary" />
                  <span>Light Mode</span>
                </>
              )}
            </button>
          </div>

          {/* Social Icons Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary-soft transition-all"
                aria-label={social.label}
              >
                <social.icon className="w-3.5 h-3.5" />
              </motion.a>
            ))}
          </div>

        </div>
      </div>
    </footer>
  );
}
