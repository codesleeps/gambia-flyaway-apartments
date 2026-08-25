import React, { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
  type?: string;
}

const DEFAULT_TITLE = "Gambia Flyaway Apartments | Luxury Self-Catering Rentals in Kerr Serign, The Gambia";
const DEFAULT_DESCRIPTION = "Book luxury self-catering apartments in Kerr Serign, The Gambia. Featuring modern amenities, air conditioning, fast Wi-Fi, fully equipped kitchens, and prime access to Senegambia beaches.";
const DEFAULT_KEYWORDS = "Gambia apartment rentals, Kerr Serign apartments, Gambia self catering, holiday apartments Gambia, Senegambia accommodation, Gambia holiday rentals, Gambia stay";
const DEFAULT_OG_IMAGE = "/images/hero/hero-800x600.jpg";
const DEFAULT_SITE_URL = "https://gambiaflyaway.com";

export const SEO: React.FC<SEOProps> = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  ogImage = DEFAULT_OG_IMAGE,
  canonicalUrl,
  type = "website"
}) => {
  useEffect(() => {
    // 1. Update Document Title
    document.title = title;

    // Helper function to update or create meta tags
    const setMetaTag = (selector: string, attrName: string, attrValue: string, contentValue: string) => {
      let element = document.querySelector(selector) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', contentValue);
    };

    // Helper function for link tags
    const setLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // 2. Standard Meta Tags
    setMetaTag('meta[name="description"]', 'name', 'description', description);
    setMetaTag('meta[name="keywords"]', 'name', 'keywords', keywords);
    setMetaTag('meta[name="author"]', 'name', 'author', 'Gambia Flyaway Apartments');

    // 3. Open Graph Meta Tags
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', type);
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', ogImage);

    // 4. Twitter Meta Tags
    setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);

    // 5. Canonical URL
    const finalCanonical = canonicalUrl || `${DEFAULT_SITE_URL}${window.location.pathname}${window.location.search}`;
    setLinkTag('canonical', finalCanonical);

  }, [title, description, keywords, ogImage, canonicalUrl, type]);

  return null;
};

export default SEO;
