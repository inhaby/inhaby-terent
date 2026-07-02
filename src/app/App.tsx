import React from 'react';
import { AuthProvider } from '../context/TenantAuthContext';
import { AppStateProvider } from './AppContext';
import { AppRouter } from './router/AppRouter';

export const TenantApp: React.FC = () => {
  return (
    <AuthProvider>
      <AppStateProvider>
        <AppRouter />
      </AppStateProvider>
    </AuthProvider>
  );
};

export default TenantApp;
