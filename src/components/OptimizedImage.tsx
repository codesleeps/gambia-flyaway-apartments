import React, { useState } from 'react';

export interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'eager' | 'lazy';
  priority?: boolean;
  sizes?: string;
  fallbackSrc?: string;
  onError?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({ 
  src, 
  alt, 
  width,
  height,
  className = '', 
  sizes = '(max-width: 768px) 400px, (max-width: 1024px) 600px, 800px',
  priority = false,
  fallbackSrc = '/images/placeholder-apartment.jpg',
  onError,
  onLoad,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  // Fallback gradient for failed images
  const fallbackGradient = "bg-gradient-to-br from-orange-100 to-orange-200";

  if (hasError) {
    return (
      <div className={`${className} ${fallbackGradient} flex items-center justify-center`}>
        <div className="text-orange-600 text-center">
          <div className="text-2xl mb-2">🏠</div>
          <p className="text-sm">Image not available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading placeholder */}
      {!isLoaded && (
        <div className={`absolute inset-0 ${fallbackGradient} animate-pulse flex items-center justify-center`}>
          <div className="text-orange-600">
            <div className="text-2xl">📸</div>
          </div>
        </div>
      )}
      
      {/* Actual image */}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={handleLoad}
        onError={handleError}
        loading={priority ? 'eager' : 'lazy'}
        sizes={sizes}
      />
    </div>
  );
};

export default OptimizedImage;
