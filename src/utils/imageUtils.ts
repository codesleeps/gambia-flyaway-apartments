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
 * Normalizes an array of gallery images and automatically numbers duplicated labels (e.g., Bedroom 1, Bedroom 2)
 */
export const parseGallery = (items: ApartmentImageItem[]): { src: string; label: string }[] => {
  if (!items || items.length === 0) return [];

  const rawResolved = items.map((item, idx) => {
    if (typeof item === 'object' && item !== null) {
      return {
        src: getImagePath(item.src),
        label: item.label,
        isCustom: true,
      };
    }
    return {
      src: getImagePath(item || ''),
      label: getImageLabel(item || '', idx),
      isCustom: false,
    };
  });

  const labelCounts: Record<string, number> = {};
  rawResolved.forEach((item) => {
    labelCounts[item.label] = (labelCounts[item.label] || 0) + 1;
  });

  const labelIndices: Record<string, number> = {};
  return rawResolved.map((item) => {
    if (item.isCustom) {
      return { src: item.src, label: item.label };
    }
    if (labelCounts[item.label] > 1) {
      labelIndices[item.label] = (labelIndices[item.label] || 0) + 1;
      return {
        src: item.src,
        label: `${item.label} ${labelIndices[item.label]}`,
      };
    }
    return { src: item.src, label: item.label };
  });
};
