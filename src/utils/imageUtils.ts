/**
 * Resolves static asset image paths for dev and production deployments.
 */
export const getImagePath = (path: string): string => {
  if (!path) return '/images/apartments/apartment-1-800x600.jpg';

  // If path is an absolute URL (http/https/data:), return as is
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }

  // Remove leading slash if any
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // In Vite dev mode, assets in public/ are served at root
  if (import.meta.env.DEV) {
    return `/${cleanPath}`;
  }

  // In production (e.g. GitHub Pages with base path), prepend BASE_URL
  const baseUrl = import.meta.env.BASE_URL || '/';
  const prefix = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  return `${prefix}${cleanPath}`;
};

/**
 * Handle image load errors gracefully by falling back to root path or default placeholder
 */
export const handleImageError = (
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  fallbackPath = '/images/apartments/apartment-1-800x600.jpg'
) => {
  const target = e.currentTarget;
  // Prevent infinite error loop
  if (target.dataset.triedFallback === 'true') {
    return;
  }
  target.dataset.triedFallback = 'true';

  // If currently using BASE_URL prefix, try root path first
  const currentSrc = target.src;
  if (currentSrc.includes('/gambia-flyaway-apartments/')) {
    target.src = currentSrc.replace('/gambia-flyaway-apartments/', '/');
  } else {
    target.src = fallbackPath.startsWith('/') ? fallbackPath : `/${fallbackPath}`;
  }
};
