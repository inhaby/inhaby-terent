import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/TenantAuthContext';
import { Mail, Lock, Sparkles, AlertCircle, ArrowRight, X } from 'lucide-react';
import { motion } from 'motion/react';
import { supabase, validateEmail, handleAuthError } from '@inhaby/shared';
export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const showToast = (msg: string, type?: string) => {
    console.log(`[Toast] [${type || 'info'}]: ${msg}`);
  };
  const { signIn, signInWithGoogle, authError, setAuthError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Validation errors state
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleEmailChange = (val: string) => {
    setEmail(val);
    if (emailError) setEmailError(null);
  };

  const handlePasswordChange = (val: string) => {
    setPassword(val);
    if (passwordError) setPasswordError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setAuthError(null);
    setEmailError(null);
    setPasswordError(null);

    let hasError = false;
    const emailVal = validateEmail(email);
    if (emailVal) {
      setEmailError(emailVal);
      hasError = true;
    }
    if (!password) {
      setPasswordError('Password is required');
      hasError = true;
    }

    if (hasError) {
      showToast('Please fix the validation errors.', 'error');
      return;
    }

    setLoading(true);

    try {
      const { error: signInErr } = await signIn(email, password);
      if (signInErr) {
        const parsed = handleAuthError(signInErr, 'Login');
        setError(parsed);
        showToast(parsed, 'error');
      } else {
        showToast('Signed in successfully!', 'success');
        const redirectUrl = searchParams.get('redirect') || '/app';
        navigate(redirectUrl);
      }
    } catch (err: any) {
      const parsed = err.message || 'An unexpected error occurred.';
      setError(parsed);
      showToast(parsed, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (!email) return;
    setResending(true);
    try {
      const { error: resendErr } = await supabase.auth.resend({
        type: 'signup',
        email: email.replace('@', '+tenant@'),
      });
      if (resendErr) {
        const parsed = handleAuthError(resendErr, 'Resend verification');
        showToast(parsed, 'error');
      } else {
        showToast('Verification email resent successfully! Please check your inbox.', 'success');
      }
    } catch (err: any) {
      showToast(err.message || 'Resend failed.', 'error');
    } finally {
      setResending(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setAuthError(null);
    setLoading(true);
    try {
      const { error: oauthErr } = await signInWithGoogle();
      if (oauthErr) {
        const parsed = handleAuthError(oauthErr, 'Google Login');
        setError(parsed);
        showToast(parsed, 'error');
      }
    } catch (err: any) {
      const parsed = err.message || 'Google OAuth failed.';
      setError(parsed);
      showToast(parsed, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-sans bg-theme-bg relative overflow-hidden transition-colors duration-300">
      {/* Dynamic Background Accents */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] aspect-square rounded-full bg-theme-accent/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] aspect-square rounded-full bg-theme-accent/5 blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md bg-theme-surface border border-theme-border/60 rounded-[32px] p-8 shadow-xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-theme-accent" />

        <button 
          onClick={() => navigate('/landing')}
          className="absolute top-4 right-4 p-2 bg-theme-bg hover:bg-theme-border/40 rounded-full text-theme-text-secondary hover:text-theme-accent active:scale-95 transition-all outline-none z-50 cursor-pointer"
        >
          <X size={16} />
        </button>

        {/* Heading Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 mb-2.5">
            <span className="text-2xl font-serif font-black text-theme-text-primary relative select-none">
              Inhaby
              <div className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-theme-accent rounded-full" />
            </span>
            <Sparkles size={16} className="text-theme-accent" />
          </div>
          <p className="text-[10px] text-theme-text-secondary font-black uppercase tracking-widest">
            Tenant Portal Authentication
          </p>
        </div>

        {/* Errors Alert */}
        {(error || authError) && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-semibold rounded-2xl flex flex-col gap-2"
          >
            <div className="flex items-start gap-2.5">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span>{error || authError}</span>
            </div>
            {((error && error.includes('verified')) || (authError && authError.includes('verified'))) && (
              <button
                type="button"
                onClick={handleResendVerification}
                disabled={resending}
                className="text-[10px] text-theme-accent hover:underline font-bold text-left ml-6 mt-1 uppercase tracking-widest disabled:opacity-50"
              >
                {resending ? 'Resending...' : 'Resend Verification Email'}
              </button>
            )}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-text-secondary/60" />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                className={`w-full bg-theme-bg/50 border ${emailError ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' : 'border-theme-border focus:ring-theme-accent/20 focus:border-theme-accent'} rounded-2xl py-3.5 pl-11 pr-4 text-xs font-bold outline-none text-theme-text-primary transition-all placeholder:text-theme-text-secondary/40`}
              />
            </div>
            {emailError && (
              <p className="text-[10px] text-red-500 font-bold pl-1">{emailError}</p>
            )}
          </div>

          <div className="space-y-1">
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-text-secondary/60" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                className={`w-full bg-theme-bg/50 border ${passwordError ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' : 'border-theme-border focus:ring-theme-accent/20 focus:border-theme-accent'} rounded-2xl py-3.5 pl-11 pr-4 text-xs font-bold outline-none text-theme-text-primary transition-all placeholder:text-theme-text-secondary/40`}
              />
            </div>
            {passwordError && (
              <p className="text-[10px] text-red-500 font-bold pl-1">{passwordError}</p>
            )}
          </div>

          {/* Forgot Password Trigger */}
          <div className="flex justify-end pr-1">
            <button
              type="button"
              onClick={() => navigate('/forgot-password')}
              className="text-[10px] text-theme-text-secondary hover:text-theme-accent font-bold tracking-wider uppercase transition-colors"
            >
              Forgot Password?
            </button>
          </div>

          {/* Action button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-theme-accent hover:bg-theme-accent-hover text-white font-bold text-xs uppercase tracking-widest rounded-2xl shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-theme-border/60" />
          </div>
          <span className="relative px-3 text-[9px] font-black text-theme-text-secondary/60 bg-theme-surface uppercase tracking-widest">
            Or Continue With
          </span>
        </div>

        {/* Google OAuth Login */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full py-3.5 bg-theme-bg border border-theme-border hover:bg-theme-border/20 text-theme-text-primary font-bold text-xs rounded-2xl shadow-sm transition-all duration-300 flex items-center justify-center gap-2.5 disabled:opacity-50 select-none cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span>Google Accounts</span>
        </button>

        {/* Footer Navigation */}
        <div className="mt-8 text-center pt-4 border-t border-theme-border/60">
          <p className="text-[11px] text-theme-text-secondary font-semibold">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/signup')}
              className="text-theme-accent hover:underline font-bold transition-all ml-0.5"
            >
              Sign Up
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
