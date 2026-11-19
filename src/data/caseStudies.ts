// CASE STUDIES — tabs (filter buttons) aur har case study ka chhota summary.
// Naya case study page banayein to yahan bhi ek line add kar dein — tabs aur "More case studies" khud update ho jayenge.

export const caseTabs = [
  { label: 'All Case Studies', href: '/case-studies/' },
  { label: 'Semantic SEO', href: '/semantic-seo-case-study/' },
  { label: 'Local SEO', href: '/case-studies/local-seo-dental-group/' },
  { label: 'GEO / AI', href: '/case-studies/geo-ai-saas-citations/' },
  { label: 'Website Design', href: '/case-studies/website-design-dtc-rebuild/' },
  { label: 'GMB', href: '/case-study-top-rankings-for-a-cbd/' },
];

// "More case studies" cards (har case study page ke neeche dikhte hain).
export const caseSummaries = [
  { href: '/semantic-seo-case-study/', icon: 'fas fa-project-diagram', photo: '/images/services/seo-2.jpg', tag: 'SEMANTIC SEO', title: 'Boosting Organic Performance with Semantic SEO', stat: '+340%', statLabel: 'organic clicks' },
  { href: '/case-studies/local-seo-dental-group/', icon: 'fas fa-tooth', photo: '/images/services/dent-3.jpg', tag: 'LOCAL SEO', title: '120 Location Pages, Zero Duplicate Content', stat: '+890%', statLabel: 'local pack appearances' },
  { href: '/case-studies/geo-ai-saas-citations/', icon: 'fas fa-robot', photo: '/images/services/ai-woman.jpg', tag: 'GEO / AI', title: 'Cited by ChatGPT in 3 Weeks', stat: '0 → 74%', statLabel: 'AI citation rate' },
  { href: '/case-studies/website-design-dtc-rebuild/', icon: 'fas fa-shopping-bag', photo: '/images/services/ec-pack.jpg', tag: 'WEBSITE DESIGN', title: 'Full Rebuild → #1 in 6 Months', stat: '+$180K', statLabel: 'organic revenue' },
  { href: '/case-study-top-rankings-for-a-cbd/', icon: 'fas fa-map-marker-alt', photo: '/images/services/gmb-shop.jpg', tag: 'GMB', title: 'Top Google Rankings for a CBD Dispensary in Honolulu', stat: '6.1% → 59.2%', statLabel: 'share of local voice' },
];
