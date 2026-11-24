// Ek dafa chalne wala script: purani WordPress site (rank-ready.com) se saare blog posts
// public REST API se PARHTA hai (kuch change nahi karta) aur yahan save karta hai:
//   src/data/wp-posts.json        -> posts ka text (title, content, date, category, SEO)
//   public/images/blog/wp/...     -> posts ke andar aur featured images
import fs from 'node:fs';
import path from 'node:path';

const BASE = 'https://rank-ready.com';
const HEAD = { 'User-Agent': 'Mozilla/5.0 (RankReady migration)' };
const IMG_DIR = 'public/images/blog/wp';

async function getJson(url) {
  const r = await fetch(url, { headers: HEAD });
  if (!r.ok) throw new Error('HTTP ' + r.status + ' ' + url);
  return r.json();
}

const posts = await getJson(BASE + '/wp-json/wp/v2/posts?per_page=100&_embed=wp:featuredmedia,wp:term');
console.log('posts:', posts.length);

const out = posts.map((p) => {
  const m = (p._embedded && p._embedded['wp:featuredmedia'] && p._embedded['wp:featuredmedia'][0]) || null;
  const sizes = (m && m.media_details && m.media_details.sizes) || {};
  const pick = sizes.large || sizes.full || sizes.medium_large || null;
  const terms = (p._embedded && p._embedded['wp:term']) || [];
  const cats = (terms[0] || []).map((t) => t.name);
  const tags = (terms[1] || []).map((t) => t.name);
  const y = p.yoast_head_json || {};
  return {
    id: p.id,
    slug: p.slug,
    date: p.date,
    modified: p.modified,
    title: p.title.rendered,
    excerpt: p.excerpt.rendered,
    content: p.content.rendered,
    categories: cats,
    tags: tags,
    featured: m ? { src: pick ? pick.source_url : m.source_url, full: m.source_url, alt: m.alt_text || '' } : null,
    seo: { title: y.title || '', description: y.description || y.og_description || '' },
  };
});

// Saari images jo posts mein hain (content + featured) download karo
const re = /https?:\/\/rank-ready\.com\/wp-content\/uploads\/[^"'\s<>()]+?\.(?:jpe?g|png|webp|gif|svg)/gi;
const urls = new Set();
for (const p of out) {
  for (const u of p.content.match(re) || []) urls.add(u);
  if (p.featured) { urls.add(p.featured.src); }
}
fs.mkdirSync(IMG_DIR, { recursive: true });
let ok = 0, fail = 0;
for (const u of urls) {
  const file = path.join(IMG_DIR, u.split('/wp-content/uploads/')[1].replace(/\//g, '-'));
  try {
    const r = await fetch(u, { headers: HEAD });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    fs.writeFileSync(file, Buffer.from(await r.arrayBuffer()));
    ok++;
  } catch (e) { console.log('FAILED', u, e.message); fail++; }
}
console.log('images ok:', ok, 'failed:', fail);

fs.writeFileSync('src/data/wp-posts.json', JSON.stringify(out, null, 1));
console.log('saved src/data/wp-posts.json');
