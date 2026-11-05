// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SITE_URL: jahan site live hai. GitHub Pages ke waqt github.io wala URL,
// rank-ready.com pe shift karte waqt yahan 'https://rank-ready.com' kar dein.
const SITE_URL = process.env.SITE_URL || 'https://myfirmforte-coder.github.io';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'always', // WordPress jaise URLs: /services/seo-audits/
  build: { format: 'directory' },
  integrations: [sitemap()],
  // Purane / doosre URLs ko sahi page pe bhejna (SEO ke liye)
  redirects: {
    '/services/rank-ready-website-design/': '/services/web-development/',
    '/services/semantic-seo/': '/services/semantic-seo-optimization-services/',
    '/services/gmb-management/': '/services/gmb-management-services/',
  },
});
