import { motion } from "motion/react";

interface AppBadgeProps {
  type: "apple" | "google";
  theme?: "light" | "dark";
}

export default function AppBadge({ type, theme = "dark" }: AppBadgeProps) {
  const isDark = theme === "dark";
  
  const bgColor = isDark ? "bg-black" : "bg-white border border-slate-200";
  const textColor = isDark ? "text-white" : "text-black";
  
  if (type === "apple") {
    return (
      <motion.a
        href="#"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center px-4 py-2 rounded-xl ${bgColor} ${textColor} transition-all duration-200 w-fit min-w-[160px]`}
      >
        <svg viewBox="0 0 384 512" className="w-6 h-6 mr-3 fill-current">
          <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
        </svg>
        <div className="flex flex-col">
          <span className="text-[10px] font-medium leading-tight">Download on the</span>
          <span className="text-lg font-semibold leading-tight -mt-0.5">App Store</span>
        </div>
      </motion.a>
    );
  }

  return (
    <motion.a
      href="#"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`flex items-center px-4 py-2 rounded-xl ${bgColor} ${textColor} transition-all duration-200 w-fit min-w-[160px]`}
    >
      <svg viewBox="0 0 512 512" className="w-6 h-6 mr-3">
        <path fill="#4db6ac" d="M7.9 7.2l249.1 248.8L7.9 504.8c-2.4-4.4-3.9-9.5-3.9-15V22.2c0-5.5 1.5-10.6 3.9-15z" />
        <path fill="#d32f2f" d="M7.9 504.8L257 256 398.4 397.4 56.4 508.3c-15.4 9.1-33.1 9.1-48.5-3.5z" />
        <path fill="#fbc02d" d="M508.1 231.5l-109.7-64.4L257 256l141.4 141.4 109.7-64.4c15.4-9.1 25.1-25.1 25.1-42.7s-9.7-33.6-25.1-42.8z" />
        <path fill="#388e3c" d="M7.9 7.2C23.3-5.4 41-5.4 56.4 3.7l342 163.4L257 256 7.9 7.2z" />
      </svg>
      <div className="flex flex-col">
        <span className="text-[10px] font-medium leading-tight uppercase">GET IT ON</span>
        <span className="text-lg font-semibold leading-tight -mt-0.5">Google Play</span>
      </div>
    </motion.a>
  );
}
