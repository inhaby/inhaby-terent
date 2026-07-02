import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ThemeSwitcher from "./components/ThemeSwitcher";
import LivingBackground from "./components/LivingBackground";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import HomePage from "./pages/HomePage";
import PhotosPage from "./pages/PhotosPage";
import VerifiedOwnersPage from "./pages/VerifiedOwnersPage";
import PricingPage from "./pages/PricingPage";
import SavingsCalculatorPage from "./pages/SavingsCalculatorPage";
import VerificationPage from "./pages/VerificationPage";
import BlogPage from "./pages/BlogPage";
import BlogListingPage from "./pages/BlogListingPage";
import DemoPage from "./pages/DemoPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent() {
  const location = useLocation();
  const isDemo = location.pathname === "/demo" || location.pathname === "/live-demo";

  return (
    <div className={`bg-background selection:bg-primary/20 selection:text-primary relative ${isDemo ? "h-full overflow-hidden" : "min-h-screen"}`}>
      {!isDemo && <LivingBackground />}
      {!isDemo && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/demo" element={<DemoPage />} />
        <Route path="/live-demo" element={<DemoPage />} />
        <Route path="/photos" element={<PhotosPage />} />
        <Route path="/verified-owners" element={<VerifiedOwnersPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/savings" element={<SavingsCalculatorPage />} />
        <Route path="/verify" element={<VerificationPage />} />
        <Route path="/blog" element={<BlogListingPage />} />
        <Route path="/blog/:slug" element={<BlogPage />} />
      </Routes>
      {!isDemo && <Footer />}
      {!isDemo && <ThemeSwitcher />}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
          <ScrollToTop />
          <AppContent />
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
}
