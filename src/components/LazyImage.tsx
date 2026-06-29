import React, { useState, useEffect, useRef } from 'react';

// Dynamic helper to construct LQIP Unsplash URLs
const getLQIPUrl = (url: string | undefined): string => {
  if (!url) return '';
  if (url.includes('images.unsplash.com')) {
    let cleanUrl = url;
    if (cleanUrl.includes('w=')) {
      cleanUrl = cleanUrl.replace(/w=\d+/, 'w=30');
    } else if (!cleanUrl.includes('?')) {
      cleanUrl += '?w=30';
    } else {
      cleanUrl += '&w=30';
    }
    
    if (cleanUrl.includes('q=')) {
      cleanUrl = cleanUrl.replace(/q=\d+/, 'q=10');
    } else if (!cleanUrl.includes('?')) {
      cleanUrl += '?q=10';
    } else {
      cleanUrl += '&q=10';
    }
    
    if (!cleanUrl.includes('blur=')) {
      cleanUrl += '&blur=5';
    }
    return cleanUrl;
  }
  return url;
};

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  placeholderColor?: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  placeholderColor = 'bg-theme-border/20',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const imageRef = useRef<HTMLDivElement | null>(null);

  // Generate tiny thumbnail URL
  const lqipUrl = getLQIPUrl(src);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '200px 0px', // start loading early when within 200px of viewport
      }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [src]);

  return (
    <div className={`relative overflow-hidden w-full h-full ${placeholderColor}`} ref={imageRef}>
      {/* Background/placeholder: LQIP thumbnail blurred inside */}
      {lqipUrl && !isLoaded && (
        <img
          src={lqipUrl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover blur-md scale-110 opacity-90"
        />
      )}
      
      {/* Solid absolute animated pulse if thumbnail is not available */}
      {!lqipUrl && !isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-tr from-theme-border/20 to-theme-border/40" />
      )}
      
      {shouldLoad && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          className={`transition-all duration-700 ease-out will-change-transform ${
            isLoaded ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-[0.98]'
          } ${className}`}
          loading="lazy"
          {...props}
        />
      )}
    </div>
  );
};

