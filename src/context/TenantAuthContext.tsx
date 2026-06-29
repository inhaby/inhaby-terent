import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, User, UserRoleName } from '@inhaby/shared';

interface AuthContextType {
  user: any | null;
  profile: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, name: string, phone?: string) => Promise<{ error: any }>;
  signInWithGoogle: () => Promise<{ error: any }>;
  signOut: () => Promise<{ error: any }>;
  resetPassword: (email: string) => Promise<{ error: any }>;
  refreshProfile: () => Promise<void>;
  authError: string | null;
  setAuthError: (err: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  const fetchProfile = async (userId: string, email: string) => {
    try {
      const { data, error } = await supabase
        .from('tenant_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        // If not found in tenant_profiles, check if this is an existing auth user
        // that needs a tenant profile created (e.g. from Google login)
        const currentUser = (await supabase.auth.getUser()).data.user;
        if (currentUser && currentUser.id === userId) {
          const { error: userInsertErr } = await supabase
            .from('tenant_users')
            .insert({ id: userId, email: email })
            .select();

          if (!userInsertErr) {
            const { data: newProfile, error: profileInsertErr } = await supabase
              .from('tenant_profiles')
              .insert({
                id: userId,
                name: currentUser.user_metadata?.name || 'New Tenant',
                phone: currentUser.user_metadata?.phone || '',
                avatar_url: currentUser.user_metadata?.avatar_url || '',
                is_verified: false
              })
              .select()
              .single();

            if (!profileInsertErr && newProfile) {
              setProfile({
                id: newProfile.id,
                email: email,
                name: newProfile.name,
                phone: newProfile.phone || '',
                avatarUrl: newProfile.avatar_url || '',
                role: 'tenant',
                isActive: true,
                createdAt: newProfile.created_at
              });
              setAuthError(null);
              return;
            }
          }
        }
        
        console.error('Error fetching tenant profile:', error);
        setProfile(null);
        setAuthError('This account does not have access to the Tenant Application.');
      } else {
        setProfile({
          id: data.id,
          email: email,
          name: data.name || '',
          phone: data.phone || '',
          avatarUrl: data.avatar_url || '',
          role: 'tenant',
          isActive: true,
          createdAt: data.created_at
        });
        setAuthError(null);
      }
    } catch (err) {
      console.error('Error in fetchProfile:', err);
      setProfile(null);
      setAuthError('An unexpected error occurred while loading your profile.');
    }
  };

  const refreshProfile = async () => {
    if (user?.id) {
      const email = user.email ? user.email.replace('+tenant', '') : '';
      await fetchProfile(user.id, email);
    }
  };

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session) {
        setUser(session.user);
        const email = session.user.email ? session.user.email.replace('+tenant', '') : '';
        await fetchProfile(session.user.id, email);
      } else {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setLoading(true);
      if (session) {
        setUser(session.user);
        const email = session.user.email ? session.user.email.replace('+tenant', '') : '';
        await fetchProfile(session.user.id, email);
      } else {
        setUser(null);
        setProfile(null);
        setAuthError(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setAuthError(null);
    const suffixedEmail = email.replace('@', '+tenant@');
    const { error } = await supabase.auth.signInWithPassword({ email: suffixedEmail, password });
    setLoading(false);
    return { error };
  };

  const signUp = async (email: string, password: string, name: string, phone?: string) => {
    setLoading(true);
    setAuthError(null);
    const suffixedEmail = email.replace('@', '+tenant@');
    const { data, error } = await supabase.auth.signUp({
      email: suffixedEmail,
      password,
      options: {
        data: {
          name,
          role: 'tenant',
          phone,
          app: 'tenant'
        }
      }
    });

    // Handle updates if profile needs to be created or adjusted
    if (!error && data.user) {
      try {
        await supabase
          .from('tenant_profiles')
          .update({ name, phone })
          .eq('id', data.user.id);
      } catch (err) {
        console.error('Error updating tenant profile metadata:', err);
      }
    }
    setLoading(false);
    return { error };
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    setAuthError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent'
        },
        redirectTo: window.location.origin
      }
    });
    setLoading(false);
    return { error };
  };

  const signOut = async () => {
    setLoading(true);
    let signOutErr = null;
    try {
      const { error } = await supabase.auth.signOut();
      signOutErr = error;
    } catch (e: any) {
      console.error("Supabase signOut error:", e);
    }
    
    // Clear React states
    setUser(null);
    setProfile(null);
    setAuthError(null);
    
    // Clear browser storage
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (e) {
      console.error("Browser storage clear error:", e);
    }
    
    setLoading(false);
    return { error: signOutErr };
  };

  const resetPassword = async (email: string) => {
    setLoading(true);
    setAuthError(null);
    const suffixedEmail = email.replace('@', '+tenant@');
    const { error } = await supabase.auth.resetPasswordForEmail(suffixedEmail, {
      redirectTo: `${window.location.origin}/reset-password`
    });
    setLoading(false);
    return { error };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signIn,
        signUp,
        signInWithGoogle,
        signOut,
        resetPassword,
        refreshProfile,
        authError,
        setAuthError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
