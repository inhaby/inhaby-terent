import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import LandingHeader from "./components/LandingHeader";
import Footer from "./components/Footer";
import ThemeSwitcher from "./components/ThemeSwitcher";
import LivingBackground from "./components/LivingBackground";
import { LanguageProvider } from "../landing/context/LanguageContext";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export const LandingApp: React.FC = () => {
  const location = useLocation();
  const isDemo = location.pathname === "/demo" || location.pathname === "/live-demo";

  return (
    <LanguageProvider>
      <div className={`bg-background text-foreground selection:bg-primary/20 selection:text-primary relative ${isDemo ? "h-full overflow-hidden" : "min-h-screen"}`}>
        <ScrollToTop />
        {!isDemo && <LivingBackground />}
        {!isDemo && <LandingHeader />}
        
        <Outlet />
        
        {!isDemo && <Footer />}
        {!isDemo && <ThemeSwitcher />}
      </div>
    </LanguageProvider>
  );
};
