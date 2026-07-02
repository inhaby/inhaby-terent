import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@inhaby/shared';

export const OAuthCallback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/app', { replace: true });
      } else {
        navigate('/login', { replace: true });
      }
    });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-theme-bg flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-theme-accent border-t-transparent rounded-full animate-spin" />
    </div>
  );
};
