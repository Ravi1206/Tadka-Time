/**
 * Secure cryptographic helpers for Tadka Time content platform.
 * Utilizes the standard, native Web Crypto API for secure SHA-256 password hashing.
 */

import bcrypt from 'bcryptjs';

/**
 * Hashes a plaintext password securely using bcrypt.
 */
export async function hashPassword(password: string): Promise<string> {
  if (!password) return '';
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

/**
 * Verifies a plaintext password against a hash (either bcrypt or legacy SHA-256).
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  if (!password || !hash) return false;
  
  // If the hash is a legacy SHA-256 hash (64 hex characters)
  if (hash.length === 64 && !hash.startsWith('$2')) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex === hash;
  }
  
  // Otherwise verify with bcrypt
  try {
    return await bcrypt.compare(password, hash);
  } catch (err) {
    return false;
  }
}

/**
 * Generates an XML sitemap of all active articles and pages.
 */
export function generateSitemapXml(articles: { id: string; slug: string; category: string }[]): string {
  const baseUrl = window.location.origin;
  const currentDate = new Date().toISOString().split('T')[0];
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  
  // Base views
  const categories = ['food', 'business', 'bengaluru', 'puzzles', 'finance', 'shop', 'about'];
  
  xml += `  <url>\n    <loc>${baseUrl}/</loc>\n    <lastmod>${currentDate}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>\n`;
  
  categories.forEach(cat => {
    xml += `  <url>\n    <loc>${baseUrl}/?category=${cat}</loc>\n    <lastmod>${currentDate}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
  });
  
  articles.forEach(art => {
    xml += `  <url>\n    <loc>${baseUrl}/article/${art.slug}</loc>\n    <lastmod>${currentDate}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
  });
  
  xml += `</urlset>`;
  return xml;
}

/**
 * Generates robot.txt content
 */
export function generateRobotsTxt(): string {
  const baseUrl = window.location.origin;
  return `User-agent: *
Allow: /
Disallow: /admin
Disallow: /cms

Sitemap: ${baseUrl}/sitemap.xml`;
}
