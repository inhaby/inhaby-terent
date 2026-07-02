import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../landing/components/Navbar";
import Footer from "../landing/components/Footer";
import ThemeSwitcher from "../landing/components/ThemeSwitcher";
import LivingBackground from "../landing/components/LivingBackground";
import { LanguageProvider } from "../landing/context/LanguageContext";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export const PublicLayout: React.FC = () => {
  const location = useLocation();
  const isDemo = location.pathname === "/demo" || location.pathname === "/live-demo";

  return (
    <LanguageProvider>
      <div className={`bg-background text-foreground selection:bg-primary/20 selection:text-primary relative ${isDemo ? "h-full overflow-hidden" : "min-h-screen"}`}>
        <ScrollToTop />
        {!isDemo && <LivingBackground />}
        {!isDemo && <Navbar />}
        
        <Outlet />
        
        {!isDemo && <Footer />}
        {!isDemo && <ThemeSwitcher />}
      </div>
    </LanguageProvider>
  );
};
