import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { supabase } from '@inhaby/shared';

// Auth guards
import { ProtectedRoute, GuestRoute } from '../auth/ProtectedRoute';

// Landing Website components
import { LandingApp } from '../landing/LandingApp';
import HomePage from '../landing/pages/HomePage';
import DemoPage from '../landing/pages/DemoPage';
import PhotosPage from '../landing/pages/PhotosPage';
import VerifiedOwnersPage from '../landing/pages/VerifiedOwnersPage';
import PricingPage from '../landing/pages/PricingPage';
import SavingsCalculatorPage from '../landing/pages/SavingsCalculatorPage';
import VerificationPage from '../landing/pages/VerificationPage';
import BlogListingPage from '../landing/pages/BlogListingPage';
import BlogPage from '../landing/pages/BlogPage';

// Standalone Auth pages
import { LoginPage } from '../auth/LoginPage';
import { SignupPage } from '../auth/SignupPage';
import { ForgotPasswordPage } from '../auth/ForgotPassword';
import { ResetPasswordPage } from '../auth/ResetPasswordPage';
import { OAuthCallback } from '../auth/OAuthCallback';

import { AuthProvider } from '../context/TenantAuthContext';
import { TenantApp } from '../app/App';

import AboutPage from '../landing/pages/AboutPage';
import HelpPage from '../landing/pages/HelpPage';

// Wrapper for Landing page to redirect if session exists
const LandingPageRoute: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setHasSession(!!session);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-theme-bg flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-theme-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (hasSession) {
    return <Navigate to="/app" replace />;
  }

  return <HomePage />;
};

export const RootRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* A. Landing Website (Guest pages) */}
        <Route element={<LandingApp />}>
          <Route path="/" element={<Navigate to="/landing" replace />} />
          <Route path="/landing" element={<LandingPageRoute />} />
          <Route path="/demo" element={<DemoPage />} />
          <Route path="/live-demo" element={<DemoPage />} />
          <Route path="/photos" element={<PhotosPage />} />
          <Route path="/verified-owners" element={<VerifiedOwnersPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/savings" element={<SavingsCalculatorPage />} />
          <Route path="/verify" element={<VerificationPage />} />
          <Route path="/blog" element={<BlogListingPage />} />
          <Route path="/blog/:slug" element={<BlogPage />} />
          <Route path="/founder/genofogu" element={<BlogPage overrideSlug="about-genofogu" />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/help" element={<HelpPage />} />
          
          {/* City browse routes */}
          <Route path="/pg/:city" element={<LandingPageRoute />} />
          <Route path="/apartments/:city" element={<LandingPageRoute />} />
          <Route path="/flats/:city" element={<LandingPageRoute />} />
          <Route path="/studio/:city" element={<LandingPageRoute />} />
        </Route>

        {/* B. Guest Auth pages */}
        <Route element={<AuthProvider><GuestRoute><Outlet /></GuestRoute></AuthProvider>}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Route>

        {/* C. OAuth Callback handler */}
        <Route path="/auth/callback" element={<OAuthCallback />} />

        {/* D. Authenticated Tenant Application */}
        <Route path="/app/*" element={<ProtectedRoute><TenantApp /></ProtectedRoute>} />

        {/* E. Catch-all redirect to root */}
        <Route path="*" element={<Navigate to="/landing" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RootRouter;
