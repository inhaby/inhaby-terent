import React from 'react';

export const AboutView: React.FC = () => {
  return (
    <div className="space-y-6 text-sans leading-relaxed select-text">
      <div>
        <h2 className="font-serif text-3xl font-bold text-theme-text-primary tracking-tight">About Homstay</h2>
        <p className="text-xs text-theme-text-secondary mt-1">
          Pioneering direct broker-free rental hospitality & premium verification coordinates.
        </p>
      </div>

      <div className="space-y-5 text-sm font-medium text-theme-text-primary">
        <div className="space-y-2">
          <h3 className="font-serif text-xl font-bold text-theme-text-primary">Who We Are</h3>
          <p className="text-[#5a5a5a] dark:text-[#bebebe]">
            Homstay is India’s foremost tech-based direct-to-owner property leasing platform. We completely eliminate mediating broker systems, offering clean, verified, ready-to-book private accommodations, luxury cottages, and villas across premier urban sectors.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-theme-bg border border-theme-border rounded-2xl space-y-1.5">
            <h4 className="font-serif text-lg font-bold text-theme-accent leading-none">Our Mission</h4>
            <p className="text-[#656565] dark:text-[#a5a5a5] text-xs">
              To construct reliable, completely transparent zero-commission real estate matches powered by unified legal safeguards, immutable identity validations, and seamless billing logs.
            </p>
          </div>
          <div className="p-4 bg-theme-bg border border-theme-border rounded-2xl space-y-1.5">
            <h4 className="font-serif text-lg font-bold text-theme-accent leading-none">Our Vision</h4>
            <p className="text-[#656565] dark:text-[#a5a5a5] text-xs">
              A digital ecosystem where renting any property is as instant and reliable as booking an overnight vacation room: highly protected, authenticated, and simple to handle from a phone.
            </p>
          </div>
        </div>

        <div className="space-y-2 border-t border-theme-border/55 pt-4 font-sans">
          <h3 className="font-serif text-xl font-bold text-theme-text-primary">Why Homstay</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs">
            <div className="p-3 border border-theme-border rounded-xl space-y-1">
              <p className="font-black text-theme-text-primary">0% Commission</p>
              <p className="text-[#6a6a6a] dark:text-[#9a9a9a] text-[11px]">Strict policy of zero broker cut-offs and zero administration commissions.</p>
            </div>
            <div className="p-3 border border-theme-border rounded-xl space-y-1">
              <p className="font-black text-theme-text-primary">Verified listings</p>
              <p className="text-[#6a6a6a] dark:text-[#9a9a9a] text-[11px]">Physical on-site identity check and structural condition inspection before publication.</p>
            </div>
            <div className="p-3 border border-theme-border rounded-xl space-y-1">
              <p className="font-black text-theme-text-primary">Secure Agreements</p>
              <p className="text-[#6a6a6a] dark:text-[#9a9a9a] text-[11px]">Standardized smart leases vetted by law lawyers on an integrated secure database.</p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-[#fbf9f4] dark:bg-theme-border/25 border border-theme-border rounded-2xl text-xs space-y-2 font-sans">
          <p className="font-black text-[#5a5a5a] dark:text-white uppercase tracking-widest text-[9.5px]">Corporate Support Contacts</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-theme-text-primary font-semibold">
            <p>HQ Address: <span className="text-theme-text-secondary font-medium">Level 5, WeWork Tech Tower, Outer Ring Road, Bengaluru, IN</span></p>
            <p>Inquiries: <span className="text-theme-text-secondary font-medium select-all">hello@homstay.com</span></p>
            <p>Help Hotline: <span className="text-theme-text-secondary font-medium select-all">+91 80 4567 8910</span></p>
            <p>Timing: <span className="text-theme-text-secondary font-medium">Mon - Sat (9:00 AM - 7:00 PM IST)</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};
