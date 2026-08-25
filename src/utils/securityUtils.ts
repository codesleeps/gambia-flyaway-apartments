/**
 * Security and Input Sanitization Utilities
 */

/**
 * Strips HTML tags, script tags, event handlers, and encodes special characters
 * to prevent Cross-Site Scripting (XSS) attacks.
 */
export const sanitizeInput = (input: string): string => {
  if (!input || typeof input !== 'string') return '';

  return input
    // Remove script tags and content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Remove inline event handlers (e.g. onload=, onerror=, onclick=)
    .replace(/\s*on\w+\s*=\s*(?:'[^']*'|"[^"]*"|[^\s>]+)/gi, '')
    // Remove javascript: URLs
    .replace(/javascript\s*:/gi, '')
    // Strip HTML tags
    .replace(/<[^>]*>/g, '')
    // Trim surrounding whitespace
    .trim();
};

/**
 * Validates and normalizes email addresses
 */
export const sanitizeEmail = (email: string): string => {
  const clean = sanitizeInput(email).toLowerCase();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(clean) ? clean : '';
};

/**
 * Sanitizes phone numbers by allowing only numbers, plus sign, hyphens, and spaces
 */
export const sanitizePhone = (phone: string): string => {
  if (!phone) return '';
  return phone.replace(/[^\d+()\s-]/g, '').trim();
};

/**
 * Safely parses JSON strings to prevent prototype pollution and parse errors
 */
export const safeJsonParse = <T>(jsonString: string | null, fallback: T): T => {
  if (!jsonString) return fallback;
  try {
    const parsed = JSON.parse(jsonString);
    // Protect against prototype pollution
    if (parsed && typeof parsed === 'object') {
      delete (parsed as Record<string, unknown>).__proto__;
      delete (parsed as Record<string, unknown>).constructor;
      delete (parsed as Record<string, unknown>).prototype;
    }
    return parsed as T;
  } catch {
    return fallback;
  }
};

/**
 * Simple client-side Rate Limiter / Form Throttler to prevent spam submissions
 */
class RateLimiter {
  private attempts: Map<string, number[]> = new Map();

  isAllowed(key: string, maxAttempts = 5, windowMs = 60000): boolean {
    const now = Date.now();
    const timestamps = this.attempts.get(key) || [];
    
    // Filter timestamps within the current window
    const validTimestamps = timestamps.filter(ts => now - ts < windowMs);

    if (validTimestamps.length >= maxAttempts) {
      return false;
    }

    validTimestamps.push(now);
    this.attempts.set(key, validTimestamps);
    return true;
  }
}

export const rateLimiter = new RateLimiter();
