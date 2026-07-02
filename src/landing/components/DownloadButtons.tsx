import { motion } from "motion/react";

export default function DownloadButtons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 ${className}`}>
      {/* Google Play Button */}
      <motion.a
        href="#"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center bg-black text-white px-4 py-2 rounded-lg border border-slate-800 w-[180px] h-[56px]"
      >
        <svg viewBox="0 0 512 512" className="w-8 h-8 mr-3" xmlns="http://www.w3.org/2000/svg">
          <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1z" fill="#ea4335"/>
          <path d="M80 24.5v463c0 10.3 8.4 18.7 18.7 18.7 4.1 0 8.1-1.4 11.3-3.9L325.3 234.3 80 24.5z" fill="#fbbc04"/>
          <path d="M385.4 174.2L110 330.1c-3.2 2.5-7.2 3.9-11.3 3.9-10.3 0-18.7-8.4-18.7-18.7V24.5L385.4 174.2z" fill="#4285f4"/>
          <path d="M325.3 277.7l-60.1-60.1L104.6 499l220.7-221.3z" fill="#34a853"/>
        </svg>
        <div className="flex flex-col">
          <span className="text-[10px] uppercase leading-none font-medium">GET IT ON</span>
          <span className="text-xl font-bold leading-tight">Google Play</span>
        </div>
      </motion.a>

      {/* App Store Button */}
      <motion.a
        href="#"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center bg-black text-white px-4 py-2 rounded-lg border border-slate-800 w-[180px] h-[56px]"
      >
        <svg viewBox="0 0 384 512" className="w-7 h-7 mr-3" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
        </svg>
        <div className="flex flex-col">
          <span className="text-[10px] leading-none font-medium">Download on the</span>
          <span className="text-xl font-bold leading-tight">App Store</span>
        </div>
      </motion.a>
    </div>
  );
}
