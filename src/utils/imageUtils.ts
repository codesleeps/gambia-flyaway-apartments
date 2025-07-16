// Image optimization utility
export const getOptimizedImageUrl = (imagePath: string, size: 'mobile' | 'tablet' | 'desktop' = 'desktop') => {
  const sizeMap = {
    mobile: 'w_400,h_300',
    tablet: 'w_600,h_450', 
    desktop: 'w_800,h_600'
  };
  
  // For now, return the original path
  // Later you can integrate with image CDN or optimization service
  return imagePath;
};

export const getWebPWithFallback = (imagePath: string) => {
  const webpPath = imagePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  return {
    webp: webpPath,
    fallback: imagePath
  };
};

// Generate responsive image srcSet
export const generateSrcSet = (basePath: string, imageName: string, extension: string) => {
  return [
    `${basePath}/${imageName}-400x300.${extension} 400w`,
    `${basePath}/${imageName}-600x450.${extension} 600w`,
    `${basePath}/${imageName}-800x600.${extension} 800w`
  ].join(', ');
};

// Image loading component props
export interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}
