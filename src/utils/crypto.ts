/**
 * Secure cryptographic helpers for Tadka Time content platform.
 * Utilizes the standard, native Web Crypto API for secure SHA-256 password hashing.
 */

/**
 * Hashes a plaintext password securely using SHA-256.
 * Returns a 64-character hexadecimal representation of the hash.
 */
export async function hashPassword(password: string): Promise<string> {
  if (!password) return '';
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
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
