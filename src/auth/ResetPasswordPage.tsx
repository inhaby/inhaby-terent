import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Sparkles, AlertCircle, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { supabase, validatePassword, handleAuthError } from '@inhaby/shared';
import { useAppContext } from '../app/AppContext';

export const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Validation errors
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);

  const handlePasswordChange = (val: string) => {
    setPassword(val);
    if (passwordError) setPasswordError(null);
  };

  const handleConfirmPasswordChange = (val: string) => {
    setConfirmPassword(val);
    if (confirmPasswordError) setConfirmPasswordError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setPasswordError(null);
    setConfirmPasswordError(null);

    let hasError = false;
    const passwordVal = validatePassword(password);
    if (passwordVal) {
      setPasswordError(passwordVal);
      hasError = true;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      hasError = true;
    }

    if (hasError) {
      showToast('Please correct validation errors', 'error');
      return;
    }

    setLoading(true);

    try {
      const { error: updateErr } = await supabase.auth.updateUser({
        password: password,
      });

      if (updateErr) {
        const parsed = handleAuthError(updateErr, 'Update password');
        setError(parsed);
        showToast(parsed, 'error');
      } else {
        showToast('Password updated successfully! Redirecting...', 'success');
        setSuccessMessage('Your password has been successfully updated. You may now proceed to sign in.');
        setPassword('');
        setConfirmPassword('');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    } catch (err: any) {
      const parsed = err.message || 'An error occurred during password update.';
      setError(parsed);
      showToast(parsed, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-sans bg-theme-bg relative overflow-hidden transition-colors duration-300">
      {/* Background Accents */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] aspect-square rounded-full bg-theme-accent/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] aspect-square rounded-full bg-theme-accent/5 blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md bg-theme-surface border border-theme-border/60 rounded-[32px] p-8 shadow-xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-theme-accent" />

        {/* Heading */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 mb-2.5">
            <span className="text-2xl font-serif font-black text-theme-text-primary relative select-none">
              Inhaby
              <div className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-theme-accent rounded-full" />
            </span>
            <Sparkles size={16} className="text-theme-accent" />
          </div>
          <p className="text-[10px] text-theme-text-secondary font-black uppercase tracking-widest">
            Set New Password
          </p>
        </div>

        <p className="text-[11px] text-theme-text-secondary text-center leading-relaxed mb-6 font-semibold">
          Create a new secure password for your Inhaby account.
        </p>

        {/* Error Alert */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-semibold rounded-2xl flex items-start gap-2.5"
          >
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </motion.div>
        )}

        {/* Success Alert */}
        {successMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-xs font-semibold rounded-2xl flex items-start gap-2.5"
          >
            <Sparkles size={16} className="shrink-0 mt-0.5 text-green-600" />
            <span>{successMessage}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-text-secondary/60" />
              <input
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                className={`w-full bg-theme-bg/50 border ${passwordError ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' : 'border-theme-border focus:ring-theme-accent/20 focus:border-theme-accent'} rounded-2xl py-3.5 pl-11 pr-4 text-xs font-bold outline-none text-theme-text-primary transition-all placeholder:text-theme-text-secondary/40`}
              />
            </div>
            {passwordError && (
              <p className="text-[10px] text-red-500 font-bold pl-1 leading-normal whitespace-pre-line">{passwordError}</p>
            )}
          </div>

          <div className="space-y-1">
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-text-secondary/60" />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                className={`w-full bg-theme-bg/50 border ${confirmPasswordError ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' : 'border-theme-border focus:ring-theme-accent/20 focus:border-theme-accent'} rounded-2xl py-3.5 pl-11 pr-4 text-xs font-bold outline-none text-theme-text-primary transition-all placeholder:text-theme-text-secondary/40`}
              />
            </div>
            {confirmPasswordError && (
              <p className="text-[10px] text-red-500 font-bold pl-1">{confirmPasswordError}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-theme-accent hover:bg-theme-accent-hover text-white font-bold text-xs uppercase tracking-widest rounded-2xl shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <span>Reset Password</span>
            )}
          </button>
        </form>

        {/* Back Link */}
        <div className="mt-8 text-center pt-4 border-t border-theme-border/60">
          <button
            onClick={() => navigate('/login')}
            className="inline-flex items-center gap-1.5 text-[11px] text-theme-text-secondary hover:text-theme-accent font-bold transition-all"
          >
            <ArrowLeft size={12} />
            <span>Back to Login</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
