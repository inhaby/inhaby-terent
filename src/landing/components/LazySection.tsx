import React, { useState, useEffect, useRef } from "react";

interface LazySectionProps {
  children: React.ReactNode;
  placeholder: React.ReactNode;
  rootMargin?: string;
  minHeight?: string;
}

export default function LazySection({ 
  children, 
  placeholder, 
  rootMargin = "250px", 
  minHeight = "200px" 
}: LazySectionProps) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    
    if (!("IntersectionObserver" in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className="w-full" style={!isInView ? { minHeight } : undefined}>
      {isInView ? children : placeholder}
    </div>
  );
}
