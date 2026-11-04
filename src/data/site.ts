// ============================================================
// SITE SETTINGS — phone, email, links, menu sab yahan se badlein.
// Yahan change karne se poori site mein khud update ho jata hai.
// ============================================================

// true = Google index na kare (temporary domain ke liye).
// rank-ready.com pe live karte waqt false kar dein.
export const NOINDEX = true;

export const site = {
  name: 'Rank Ready',
  title: 'Rank Ready — Websites That Come Pre-Ranked | SEO + GEO Agency',
  description:
    'We build Rank-Ready websites engineered for traditional SEO and generative engines like ChatGPT, Perplexity, and Google AI Overviews.',
  phone: '+44 7830 006343',
  phoneLink: 'tel:+447830006343',
  whatsapp: 'https://wa.me/+447830006343',
  email: 'info@rank-ready.com',
  calendly: 'https://calendly.com/rankready/initial-consultation/',
  // Forms ke liye Web3Forms access key (web3forms.com se free). Khali ho to form email app kholta hai.
  web3formsKey: '',
  // NOTE: images abhi purani WordPress site se aa rahi hain.
  // WordPress band karne se pehle inhe public/images/ mein daal ke path badalna hai.
  logo: 'https://rank-ready.com/wp-content/uploads/2026/05/logo-reverse.png',
};

export const WP = 'https://rank-ready.com/wp-content/uploads/2026/05/';

export const mainMenu = [
  { label: 'About Us', href: '/about-us/' },
  {
    label: 'Services',
    href: '/services/',
    children: [
      { label: 'Web Development Services', href: '/services/web-development/' },
      { label: 'Semantic SEO', href: '/services/semantic-seo-optimization-services/' },
      { label: 'Local Landing Pages', href: '/services/local-landing-pages/' },
      { label: 'GMB Management Services', href: '/services/gmb-management-services/' },
      { label: 'AI GEO Optimization', href: '/services/ai-geo-optimization/' },
      { label: 'SEO Audits', href: '/services/seo-audits/' },
    ],
  },
  {
    label: 'Industries',
    href: '/industries/',
    children: [
      { label: 'Legal', href: '/industries/legal/' },
      { label: 'Medical & Dental', href: '/industries/medical-dental/' },
      { label: 'Home Services', href: '/industries/home-services/' },
      { label: 'Real Estate', href: '/industries/real-estate/' },
      { label: 'Ecommerce', href: '/industries/ecommerce-website-and-seo/' },
    ],
  },
  { label: 'Case Studies', href: '/case-studies/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Contact', href: '/contact/' },
];
