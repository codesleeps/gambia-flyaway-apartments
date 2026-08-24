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

export type ApartmentImageItem = string | { src: string; label: string };

/**
 * Derives a clean image label from path or index
 */
export const getImageLabel = (path: string, index: number, customLabel?: string): string => {
  if (customLabel) return customLabel;
  if (!path) return `Photo ${index + 1}`;
  const lower = path.toLowerCase();
  if (lower.includes('lounge') || lower.includes('living')) return 'Lounge';
  if (lower.includes('bedroom') || lower.includes('bedrrom') || lower.includes('bed')) return 'Bedroom';
  if (lower.includes('bathroom') || lower.includes('bath')) return 'Bathroom';
  if (lower.includes('kitchen')) return 'Kitchen';
  if (lower.includes('balcony')) return 'Balcony';
  if (lower.includes('terrace') || lower.includes('patio') || lower.includes('exterior') || lower.includes('garden')) return 'Outdoor';
  return `Photo ${index + 1}`;
};

/**
 * Normalizes an image item into { src: string, label: string }
 */
export const parseImage = (item: ApartmentImageItem, index: number): { src: string; label: string } => {
  if (typeof item === 'object' && item !== null) {
    return {
      src: getImagePath(item.src),
      label: item.label || getImageLabel(item.src, index),
    };
  }
  return {
    src: getImagePath(item || ''),
    label: getImageLabel(item || '', index),
  };
};

/**
 * Normalizes gallery images so each tab maps directly to its exact room image filename (Lounge, Bedroom, Kitchen, Bathroom) with zero duplicate category tabs.
 */
export const parseGallery = (items: ApartmentImageItem[]): { src: string; label: string }[] => {
  if (!items || items.length === 0) return [];

  const seenLabels = new Set<string>();
  const result: { src: string; label: string }[] = [];

  items.forEach((item, idx) => {
    const parsed = parseImage(item, idx);
    if (!seenLabels.has(parsed.label)) {
      seenLabels.add(parsed.label);
      result.push(parsed);
    }
  });

  return result;
};
