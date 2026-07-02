import React, { useState, useEffect } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  lowResSrc?: string;
  aspectRatio?: string;
}

export default function OptimizedImage({
  src,
  lowResSrc,
  alt = "",
  className = "",
  aspectRatio = "aspect-video",
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(lowResSrc || "");
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!lowResSrc) {
      setCurrentSrc(src);
      return;
    }

    const img = new Image();
    img.src = src;
    img.onload = () => {
      setCurrentSrc(src);
      setIsLoaded(true);
    };
  }, [src, lowResSrc]);

  // Optimize Unsplash URLs for responsive size and WebP format
  const getOptimizedUrl = (url: string) => {
    if (url.includes("unsplash.com")) {
      let optimized = url;
      if (!url.includes("fm=")) {
        optimized += "&fm=webp";
      }
      if (!url.includes("q=")) {
        optimized += "&q=75";
      }
      return optimized;
    }
    return url;
  };

  const optimizedSrc = getOptimizedUrl(currentSrc || src);

  return (
    <div className={`relative overflow-hidden ${aspectRatio} bg-muted`}>
      {/* Subtle theme-aware shimmer effect if loading and motion not reduced */}
      {!isLoaded && !prefersReduced && (
        <div className="absolute inset-0 shimmer-bg animate-shimmer" />
      )}
      
      <img
        src={optimizedSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-all duration-700 ${
          isLoaded || !lowResSrc ? "blur-0 scale-100" : "blur-md scale-105"
        } ${className}`}
        onLoad={() => setIsLoaded(true)}
        loading={props.loading || "lazy"}
        referrerPolicy="no-referrer"
        {...props}
      />
    </div>
  );
}
