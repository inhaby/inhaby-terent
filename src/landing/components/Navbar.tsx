import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { useLanguage } from "../context/LanguageContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-md border-b border-border transition-all">
      <div className="container px-4 sm:px-6 py-2.5 md:py-4 mx-auto flex justify-between items-center">
        {/* Left: INHABY Logo */}
        <Link to="/" className="hover:opacity-90 transition-opacity flex items-center">
          <Logo className="h-7.5 md:h-10" />
        </Link>
        
        {/* Center: Main Links (Desktop) */}
        <div className="hidden lg:flex items-center space-x-8 text-sm font-semibold text-muted-foreground">
          <Link to="/savings" className="hover:text-primary transition-colors">{t("nav.savings")}</Link>
          <a href="https://careers.inhaby.com" className="hover:text-primary transition-colors">{t("nav.careers")}</a>
          <Link to="/pricing" className="hover:text-primary transition-colors">{t("nav.pricing")}</Link>
          <Link to="/blog" className="hover:text-primary transition-colors">{t("nav.blog")}</Link>
          <a href="https://help.inhaby.com" className="hover:text-primary transition-colors">{t("nav.help")}</a>
        </div>
        
        {/* Right / Mobile & Tablet Actions: Login & Hamburger */}
        <div className="flex items-center space-x-3">
          {/* Primary Login Button (Visible on Desktop, Tablet, and Mobile) */}
          <motion.a
            href="https://inhaby.com"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-5 py-2 md:px-6 md:py-2.5 text-xs md:text-sm font-black text-primary-foreground bg-primary rounded-xl shadow-md shadow-primary/15 hover:opacity-95 transition-all flex items-center justify-center whitespace-nowrap cursor-pointer"
          >
            {t("nav.login")}
          </motion.a>

          {/* Hamburger Menu (Visible on lg-hidden, i.e., Tablet and Mobile) */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 text-foreground hover:bg-muted rounded-xl transition-colors focus:outline-none min-w-[40px] min-h-[40px] flex items-center justify-center cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Drawer Overlay and Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-xs h-screen w-screen"
            />

            {/* Slide-in Drawer from Right */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed top-0 right-0 bottom-0 z-50 w-4/5 max-w-[340px] h-screen bg-background border-l border-border shadow-2xl p-6 flex flex-col justify-between overflow-y-auto"
            >
              <div className="space-y-6">
                {/* Header inside Menu */}
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <Logo className="h-8" />
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-muted rounded-xl text-foreground focus:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
                  >
                    <X className="w-5.5 h-5.5" />
                  </button>
                </div>

                {/* Primary Menu Links inside Hamburger */}
                <div className="flex flex-col space-y-1">
                  <Link
                    to="/savings"
                    onClick={() => setIsOpen(false)}
                    className="text-base font-bold text-foreground hover:text-primary transition-colors py-3 px-2 rounded-xl hover:bg-muted flex items-center"
                  >
                    {t("nav.savings")}
                  </Link>
                  <a
                    href="https://careers.inhaby.com"
                    onClick={() => setIsOpen(false)}
                    className="text-base font-bold text-foreground hover:text-primary transition-colors py-3 px-2 rounded-xl hover:bg-muted flex items-center"
                  >
                    {t("nav.careers")}
                  </a>
                  <Link
                    to="/pricing"
                    onClick={() => setIsOpen(false)}
                    className="text-base font-bold text-foreground hover:text-primary transition-colors py-3 px-2 rounded-xl hover:bg-muted flex items-center"
                  >
                    {t("nav.pricing")}
                  </Link>
                  <Link
                    to="/blog"
                    onClick={() => setIsOpen(false)}
                    className="text-base font-bold text-foreground hover:text-primary transition-colors py-3 px-2 rounded-xl hover:bg-muted flex items-center"
                  >
                    {t("nav.blog")}
                  </Link>
                  <a
                    href="https://help.inhaby.com"
                    onClick={() => setIsOpen(false)}
                    className="text-base font-bold text-foreground hover:text-primary transition-colors py-3 px-2 rounded-xl hover:bg-muted flex items-center"
                  >
                    {t("nav.help")}
                  </a>
                </div>
              </div>

              {/* Bottom Brand Slogan */}
              <div className="pt-6 mt-8 border-t border-border/40 text-center text-[10px] font-bold text-muted-foreground tracking-widest uppercase">
                INHABY ECOSYSTEM
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
