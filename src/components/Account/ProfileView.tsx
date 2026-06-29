import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight } from 'lucide-react';

interface ProfileViewProps {
  profileName: string;
  setProfileName: (val: string) => void;
  profilePhone: string;
  setProfilePhone: (val: string) => void;
  profileEmail: string;
  setProfileEmail: (val: string) => void;
  isEditingProfile: boolean;
  setIsEditingProfile: (val: boolean) => void;
  handleProfileSave: (e: React.FormEvent) => void;
  mobileVerified: boolean;
  emailVerified: boolean;
  govIdStatus: string;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  profileName,
  setProfileName,
  profilePhone,
  setProfilePhone,
  profileEmail,
  setProfileEmail,
  isEditingProfile,
  setIsEditingProfile,
  handleProfileSave,
  mobileVerified,
  emailVerified,
  govIdStatus
}) => {
  return (
    <div className="space-y-6 text-sans select-text">
      <div>
        <h2 className="font-serif text-3xl font-bold text-theme-text-primary tracking-tight">Your Profile</h2>
        <p className="text-xs text-theme-text-secondary mt-1">
          Manage your personal registration details, contact coordinates, and secure credentials.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Profile card / form */}
        <div className="bg-theme-bg border border-theme-border rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-4 border-b border-theme-border/40 pb-4">
            <div className="w-16 h-16 bg-[#f2ede4] dark:bg-theme-border/40 rounded-2xl flex items-center justify-center border-2 border-theme-accent/25 overflow-hidden shrink-0 font-serif font-black text-xl text-theme-accent">
              {profileName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-theme-text-primary leading-none">{profileName}</h3>
              <p className="text-xs text-theme-text-secondary mt-1">{profilePhone}</p>
              <p className="text-[10px] text-theme-text-secondary/70 font-semibold">{profileEmail}</p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {isEditingProfile ? (
              <motion.form 
                key="editing"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleProfileSave}
                className="space-y-4 pt-2"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans">
                  <div>
                    <label className="text-[9px] font-black tracking-widest text-[#a1a1aa] uppercase">Full Name</label>
                    <input 
                      type="text" 
                      value={profileName} 
                      onChange={(e) => setProfileName(e.target.value)}
                      className="w-full p-2.5 bg-theme-surface border border-theme-border rounded-xl text-xs font-bold text-theme-text-primary focus:outline-none focus:ring-1 focus:ring-theme-accent"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-black tracking-widest text-[#a1a1aa] uppercase">Mobile Number</label>
                    <input 
                      type="text" 
                      value={profilePhone} 
                      onChange={(e) => setProfilePhone(e.target.value)}
                      className="w-full p-2.5 bg-theme-surface border border-theme-border rounded-xl text-xs font-bold text-theme-text-primary focus:outline-none focus:ring-1 focus:ring-theme-accent"
                      required
                    />
                  </div>
                </div>
                <div className="font-sans">
                  <label className="text-[9px] font-black tracking-widest text-[#a1a1aa] uppercase">Email Verification</label>
                  <input 
                    type="email" 
                    value={profileEmail} 
                    onChange={(e) => setProfileEmail(e.target.value)}
                    className="w-full p-2.5 bg-theme-surface border border-theme-border rounded-xl text-xs font-bold text-theme-text-primary focus:outline-none focus:ring-1 focus:ring-theme-accent"
                    required
                  />
                </div>
                <div className="flex gap-2 pt-2 font-sans">
                  <button 
                    type="submit"
                    className="flex-1 py-2 bg-theme-accent hover:bg-theme-accent-hover text-white rounded-xl text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Save Changes
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsEditingProfile(false)}
                    className="px-3 py-2 bg-theme-border/40 text-theme-text-secondary hover:bg-theme-border border border-theme-border rounded-xl text-[10px] font-black uppercase tracking-wider cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </motion.form>
            ) : (
              <div key="viewing" className="pt-2">
                <button 
                  onClick={() => setIsEditingProfile(true)}
                  className="bg-theme-accent-soft hover:bg-theme-accent/15 text-theme-accent px-4 py-1.5 border border-theme-accent/25 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-1.5 active:scale-95 transition-all text-sans cursor-pointer shadow-sm"
                >
                  <span>Edit Profile</span>
                  <ChevronRight size={10} className="stroke-[3]" />
                </button>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Verification Checklist */}
        <div className="bg-theme-bg border border-theme-border rounded-2xl p-6 space-y-4">
          <h4 className="text-[10px] font-black text-theme-text-secondary uppercase tracking-[0.2em]">Verification Checklist</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            {/* Mobile state */}
            <div className="flex flex-col justify-between p-4 bg-theme-surface border border-theme-border/60 rounded-xl space-y-2">
              <span className="font-semibold text-theme-text-primary">Mobile Connection</span>
              {mobileVerified ? (
                <span className="text-[9px] font-black text-green-600 bg-green-500/10 px-2 py-0.5 rounded uppercase self-start">✓ Verified</span>
              ) : (
                <span className="text-[9px] font-black text-red-500 bg-red-500/10 px-2 py-0.5 rounded uppercase self-start">✗ Unverified</span>
              )}
            </div>
            {/* Email state */}
            <div className="flex flex-col justify-between p-4 bg-theme-surface border border-theme-border/60 rounded-xl space-y-2">
              <span className="font-semibold text-theme-text-primary">Email Mailbox</span>
              {emailVerified ? (
                <span className="text-[9px] font-black text-green-600 bg-green-500/10 px-2 py-0.5 rounded uppercase self-start">✓ Verified</span>
              ) : (
                <span className="text-[9px] font-black text-red-500 bg-red-500/10 px-2 py-0.5 rounded uppercase self-start">✗ Unverified</span>
              )}
            </div>
            {/* Gov state */}
            <div className="flex flex-col justify-between p-4 bg-theme-surface border border-theme-border/60 rounded-xl space-y-2">
              <span className="font-semibold text-theme-text-primary">Gov ID Clearance</span>
              {govIdStatus === 'Approved' ? (
                <span className="text-[9px] font-black text-green-600 bg-green-500/10 px-2 py-0.5 rounded uppercase self-start">✓ Cleared</span>
              ) : govIdStatus === 'Pending Review' ? (
                <span className="text-[9px] font-black text-indigo-500 bg-indigo-500/10 px-2 py-0.5 rounded uppercase self-start">⏳ Under Review</span>
              ) : govIdStatus === 'Request Changes' ? (
                <span className="text-[9px] font-black text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded uppercase self-start">⚠ Changes Requested</span>
              ) : (
                <span className="text-[9px] font-black text-red-500 bg-red-500/10 px-2 py-0.5 rounded uppercase self-start">🛡 Action Required</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
