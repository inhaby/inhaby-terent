import React from "react";
import { motion } from "motion/react";

export default function LivingBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Soft Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]"
        style={{
          backgroundImage: `
            radial-gradient(var(--foreground) 1px, transparent 1px),
            linear-gradient(to right, var(--border) 1px, transparent 1px),
            linear-gradient(to bottom, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px, 120px 120px, 120px 120px",
          backgroundPosition: "center center",
        }}
      />

      {/* Blurred Floating Accent Orbs */}
      <motion.div
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 40, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-10 w-96 h-96 bg-primary/4 rounded-full blur-[100px] md:opacity-60"
      />

      <motion.div
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 40, -30, 0],
          scale: [1, 0.95, 1.1, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/4 right-10 w-[450px] h-[450px] bg-primary/3 rounded-full blur-[120px] md:opacity-50"
      />

      <motion.div
        animate={{
          x: [0, 20, -15, 0],
          y: [0, 30, 20, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-2/3 left-1/3 w-[300px] h-[300px] bg-primary/2 rounded-full blur-[90px] md:opacity-40"
      />

      {/* Scattered Low-Opacity Logo Watermarks */}
      <div className="absolute top-[15%] right-[8%] opacity-[0.02] dark:opacity-[0.01]">
        <svg width="180" height="60" viewBox="0 0 240 90" fill="none" stroke="var(--foreground)" strokeWidth="6">
          <circle cx="22" cy="18" r="5" fill="var(--foreground)" stroke="none" />
          <path d="M 22,42 L 22,74 L 40,74 L 40,42 L 56,26 L 82,42 L 82,74 L 64,74 L 64,58 A 8,8 0 0,0 48,58 L 48,74" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div className="absolute bottom-[20%] left-[5%] opacity-[0.015] dark:opacity-[0.008] hidden md:block">
        <svg width="120" height="40" viewBox="0 0 240 90" fill="none" stroke="var(--foreground)" strokeWidth="6">
          <circle cx="22" cy="18" r="5" fill="var(--foreground)" stroke="none" />
          <path d="M 22,42 L 22,74 L 40,74 L 40,42 L 56,26 L 82,42 L 82,74 L 64,74 L 64,58 A 8,8 0 0,0 48,58 L 48,74" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* City-inspired Geometric Outlines & Tiny Houses */}
      <svg className="absolute bottom-0 left-0 right-0 h-40 w-full opacity-[0.015] dark:opacity-[0.008] text-foreground" preserveAspectRatio="none">
        <path 
          d="M0,160 L100,120 L160,140 L240,90 L320,130 L400,110 L500,150 L600,100 L720,130 L850,90 L980,140 L1100,100 L1200,120 L1300,80 L1440,130 L1440,160 Z" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeDasharray="4 4"
        />
        {/* Tiny houses outlines floating */}
        <g stroke="currentColor" strokeWidth="1" fill="none">
          <path d="M150,130 L150,115 L158,108 L166,115 L166,130 Z M158,130 L158,122" />
          <path d="M620,95 L620,83 L626,78 L632,83 L632,95 Z M626,95 L626,88" />
          <path d="M1120,95 L1120,85 L1127,80 L1134,85 L1134,95 Z M1127,95 L1127,89" />
        </g>
      </svg>
    </div>
  );
}
