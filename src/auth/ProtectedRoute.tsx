import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// Since TenantAuthContext.tsx will be moved/kept in src/context/TenantAuthContext.tsx or src/app/context/TenantAuthContext.tsx, let's import it from '../context/TenantAuthContext' or create the directory src/context/ if it is shared.
// Actually, useAuth is currently defined in src/context/TenantAuthContext.tsx. Let's import it from '../context/TenantAuthContext' to be safe.
import { useAuth } from '../context/TenantAuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-theme-bg flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-theme-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || !profile) {
    // Redirect to root "/" (Landing Page) for guest session
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export const GuestRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-theme-bg flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-theme-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (user && profile) {
    // Redirect to authenticated tenant application
    return <Navigate to="/app" replace />;
  }

  return <>{children}</>;
};
