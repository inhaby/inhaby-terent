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

  const fetchProfile = async (userId: string, email: string, currentUser?: any) => {
    console.log("[TenantAuth] Fetching profile for userId:", userId, "email:", email);
    try {
      const { data, error } = await supabase
        .from('tenant_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.warn("[TenantAuth] Profile not found in tenant_profiles. Attempting to create one for userId:", userId);
        const userObj = currentUser || (await supabase.auth.getUser()).data.user;
        if (userObj && userObj.id === userId) {
          console.log("[TenantAuth] Inserting record into tenant_users table for userId:", userId);
          const { error: userInsertErr } = await supabase
            .from('tenant_users')
            .insert({ id: userId, email: email })
            .select();

          if (!userInsertErr) {
            console.log("[TenantAuth] Inserting record into tenant_profiles table for userId:", userId);
            const { data: newProfile, error: profileInsertErr } = await supabase
              .from('tenant_profiles')
              .insert({
                id: userId,
                name: userObj.user_metadata?.name || 'New Tenant',
                phone: userObj.user_metadata?.phone || '',
                avatar_url: userObj.user_metadata?.avatar_url || '',
                is_verified: false
              })
              .select()
              .single();

            if (!profileInsertErr && newProfile) {
              console.log("[TenantAuth] Profile created successfully for userId:", userId);
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
            } else {
              console.error("[TenantAuth] Failed to create tenant_profile record:", profileInsertErr);
            }
          } else {
            console.error("[TenantAuth] Failed to insert tenant_user record:", userInsertErr);
          }
        } else {
          console.error("[TenantAuth] User object mismatch or missing for userId:", userId);
        }
        
        console.error('Error fetching tenant profile:', error);
        setProfile(null);
        setAuthError('This account does not have access to the Tenant Application.');
      } else {
        console.log("[TenantAuth] Profile loaded successfully for userId:", userId);
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
      console.error('[TenantAuth] Unexpected error in fetchProfile:', err);
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
    console.log("[TenantAuth] Setting up onAuthStateChange listener");
    setLoading(true);

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(`[TenantAuth] onAuthStateChange event: ${event}, session:`, session ? `present (user: ${session.user?.email})` : 'null');
      if (session) {
        // Only set loading=true when we have real async work to do (profile fetch)
        setLoading(true);
        setUser(session.user);
        const email = session.user.email ? session.user.email.replace('+tenant', '') : '';
        await fetchProfile(session.user.id, email, session.user);
        setLoading(false);
      } else {
        // SIGNED_OUT — state already cleared by signOut(); no async work needed
        setUser(null);
        setProfile(null);
        setAuthError(null);
        setLoading(false);
      }
    });

    return () => {
      console.log("[TenantAuth] Cleaning up auth listener");
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
        redirectTo: window.location.origin,
        // RC-1 fix: pass app='tenant' into raw_user_meta_data so the
        // handle_new_user DB trigger creates tenant_users + tenant_profiles
        // on first Google OAuth signup (trigger checks: app_meta = 'tenant').
        // `data` is supported at runtime but missing from this version's TS types.
        data: { app: 'tenant' }
      } as any
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
    
    // Only clear Supabase auth-related keys — avoid wiping all localStorage
    // which would destroy app preferences and cached state
    try {
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.startsWith('sb-') || key.includes('supabase'))) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(k => localStorage.removeItem(k));
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
