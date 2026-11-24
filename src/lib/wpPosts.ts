// Purani WordPress site se import kiye gaye blog posts (src/data/wp-posts.json)
// ko saaf HTML mein badalta hai: Divi shortcodes/wrappers hatata hai, paragraphs banata hai,
// links aur images ko nayi site ke raaste par le aata hai, aur headings ke liye IDs banata hai.
import raw from '../data/wp-posts.json';

export interface WpPost {
  id: number; slug: string; date: string; modified: string; title: string; excerpt: string; content: string;
  categories: string[]; tags: string[];
  featured: { src: string; full: string; alt: string } | null;
  seo: { title: string; description: string };
}

const ENT: Record<string, string> = { '&#8217;': '’', '&#8216;': '‘', '&#8220;': '“', '&#8221;': '”', '&#8211;': '–', '&#8212;': '—', '&#8230;': '…', '&#038;': '&', '&amp;': '&', '&nbsp;': ' ', '&#8243;': '″', '&#039;': "'", '&quot;': '"' };
export const decode = (s: string) => s.replace(/&#?\w+;/g, (m) => ENT[m] ?? m);
export const stripTags = (s: string) => decode(s.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();
const slugify = (s: string) => stripTags(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);

// WordPress image URL -> nayi site par local file (scripts/fetch-wp-posts.mjs isi naam se save karta hai)
export const localImg = (u: string) => '/images/blog/wp/' + u.split('/wp-content/uploads/')[1].replace(/\//g, '-');

const BLOCK = 'h[1-6]|ul|ol|blockquote|pre|table|hr|figure|aside';

function autop(html: string): string {
  const keep: string[] = [];
  // pre aur aside ko alag rakh lo taa ke un ke andar kuch na badle
  html = html.replace(/<(pre|aside)[\s\S]*?<\/\1>/g, (m) => { keep.push(m); return '\n\n@@KEEP' + (keep.length - 1) + '@@\n\n'; });
  html = html.replace(new RegExp('(<(?:' + BLOCK + ')[\\s>])', 'g'), '\n\n$1');
  html = html.replace(new RegExp('(</(?:' + BLOCK + ')>|<hr\\s*/?>)', 'g'), '$1\n\n');
  const out = html.split(/\n\s*\n/).map((c) => c.trim()).filter(Boolean).map((c) => {
    if (/^@@KEEP\d+@@$/.test(c)) return c;
    if (new RegExp('^<(?:' + BLOCK + '|p)[\\s>/]').test(c)) return c;
    if (/^<\/|^<li[\s>]/.test(c)) return c;
    return '<p>' + c.replace(/\n/g, '<br />') + '</p>';
  });
  return out.join('\n').replace(/@@KEEP(\d+)@@/g, (_, i) => keep[+i]);
}

export function cleanContent(html: string): { html: string; toc: { id: string; text: string }[]; words: number } {
  let h = html;
  // Divi image module -> <figure><img>
  h = h.replace(/\[et_pb_image[^\]]*?src=(?:&#8221;|")(https?:[^&"]+?)(?:&#8221;|&#8243;|")[^\]]*\]/g, (_, src) => '\n\n<figure><img src="' + src + '" alt="" loading="lazy" /></figure>\n\n');
  h = h.replace(/\[\/?et_pb_[^\]]*\]/g, '');
  // CTA box
  h = h.replace(/<div class="rank-ready-cta">([\s\S]*?)<\/div>/g, (_, inner) => '\n\n<aside class="post-cta">' + autop(inner) + '</aside>\n\n');
  // Divi wrappers aur spans hatao
  h = h.replace(/<\/?div[^>]*>/g, '\n').replace(/<\/?span[^>]*>/g, '');
  h = h.replace(/<span class="et_pb_image_wrap[^>]*>/g, '');
  // attributes saaf karo
  h = h.replace(/\s(?:class|style|id|srcset|sizes|decoding|data-[\w-]+)="[^"]*"/g, (m) => (/class="post-cta"/.test(m) ? m : ''));
  h = h.replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n');
  h = autop(h);
  h = h.replace(/<p>\s*(?:&nbsp;|<br \/>)?\s*<\/p>/g, '');
  // purane posts mein JSON/schema code alag alag paragraphs mein toota hua hai: use code block bana do
  const codeLine = /^<p>(?:[\s{}\[\],]+|&#8220;[^<]*?&#8221;\s*:[^<]*)<\/p>$/;
  const lines = h.split('\n');
  const merged: string[] = [];
  for (let i = 0; i < lines.length; i++) {
    if (codeLine.test(lines[i])) {
      let j = i;
      while (j < lines.length && codeLine.test(lines[j])) j++;
      if (j - i >= 3) {
        const code = lines.slice(i, j).map((l) => l.replace(/^<p>|<\/p>$/g, '').replace(/&#8220;|&#8221;|&#8243;/g, '"')).join('\n');
        merged.push('<pre><code>' + code + '</code></pre>');
        i = j - 1;
        continue;
      }
    }
    merged.push(lines[i]);
  }
  h = merged.join('\n');
  h = h.replace(/<p>\s*<p>/g, '<p>').replace(/<\/p>\s*<\/p>/g, '</p>');
  // paragraph ke andar <br /> = naya paragraph (purane posts mein lines aise hi tooti hui hain)
  h = h.replace(/<p>([\s\S]*?)<\/p>/g, (m, inner) => (/<br \/>/.test(inner) ? '<p>' + inner.split(/<br \/>\s*/).filter((x: string) => x.trim()).join('</p>\n<p>') + '</p>' : m));
  h = h.replace(/<p>\s*<p>/g, '<p>').replace(/<\/p>\s*<\/p>/g, '</p>').replace(/<p>\s*(<\/?(?:li|ul|ol)[^>]*>)\s*<\/p>/g, '$1');
  h = h.replace(/<code><\/code>/g, '').replace(/<p>\s*(?:&#8220;|&#8221;)?`+\s*<\/p>/g, '').replace(/<br \/><\/p>/g, '</p>');
  h = h.replace(/<h1[\s>][\s\S]*?<\/h1>/g, '');
  // links + images
  h = h.replace(/https?:\/\/rank-ready\.com\/wp-content\/uploads\/[^"'\s<>()]+?\.(?:jpe?g|png|webp|gif|svg)/gi, (u) => localImg(u));
  h = h.replace(/href="https?:\/\/(?:www\.)?rank-ready\.com(\/[^"]*)?"/g, (_, p) => 'href="' + (p || '/') + '"');
  h = h.replace(/<a href="(https?:\/\/[^"]+)"/g, '<a href="$1" target="_blank" rel="noopener"');
  h = h.replace(/<img /g, '<img loading="lazy" ').replace(/loading="lazy" loading="lazy"/g, 'loading="lazy"');
  // headings ke liye IDs (table of contents)
  const toc: { id: string; text: string }[] = [];
  const used = new Set<string>();
  const tag = /<h2>/.test(h) ? 'h2' : 'h3'; // kuch purane posts mein h2 nahi, h3 se shuru hote hain
  h = h.replace(new RegExp('<' + tag + '>([\\s\\S]*?)</' + tag + '>', 'g'), (_, t) => {
    let id = slugify(t) || 'section';
    while (used.has(id)) id += '-2';
    used.add(id);
    toc.push({ id, text: stripTags(t) });
    return '<' + tag + ' id="' + id + '">' + t + '</' + tag + '>';
  });
  const words = stripTags(h).split(' ').length;
  return { html: h, toc, words };
}

export const wpPosts = (raw as WpPost[]).slice().sort((a, b) => b.date.localeCompare(a.date));
