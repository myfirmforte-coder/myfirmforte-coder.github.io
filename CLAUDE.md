# Rank Ready website — AI instructions

This is the Astro rebuild of rank-ready.com (originally WordPress + Divi). The owner is not a
developer: they describe changes in simple Urdu/English and the AI makes them. Keep the design
**pixel-identical** to the original unless the owner asks for a design change.

## How it is built
- Astro 7, static output (`dist/`). No frameworks, no Tailwind. Plain HTML + scoped `<style>` per component.
- Fonts: Inter (headings/body of sections), Open Sans (base), Montserrat (top bar) via Google Fonts.
- Icons: Font Awesome 5 free (`fas fa-*`, `fab fa-*`).
- Trailing slashes on every URL (`/services/seo-audits/`) — keep the same URLs as the old WordPress site for SEO.

## Where things live
| What | File |
|---|---|
| Phone, email, WhatsApp, Calendly, logo, menu links, `NOINDEX` switch | `src/data/site.ts` |
| Colors, fonts, buttons, layout helpers (`.sec`, `.row`, `.grid g-3`…) | `src/styles/global.css` |
| `<head>`, SEO meta, schema, header/footer wrapper | `src/layouts/BaseLayout.astro` |
| Top bar + logo + menu + "Make an Appointment" | `src/components/Header.astro` |
| Footer | `src/components/Footer.astro` |
| "RA" chat bubble | `src/components/ChatWidget.astro` |
| Section heading (eyebrow/title/sub) | `src/components/SectionHeading.astro` |
| Home page order | `src/pages/index.astro` |
| Home sections (one file each) | `src/components/home/*.astro` |
| Service page design (shared by all service pages) | `src/components/ServicePage.astro` — pages in `src/pages/services/<slug>/index.astro` only pass a `data` object |
| Reusable FAQ list / bottom CTA | `src/components/FaqList.astro`, `src/components/CtaBanner.astro` |
| Redirects (old URL → new URL) | `redirects` in `astro.config.mjs` |

Home sections in order: Hero, Problem ("The hard truth"), Method (4 pillars), Services (6 cards),
Geo ("future of search"), Results (stats), CaseStudies, Industries, Process (5 steps),
Testimonials, Audit (green form, `#audit`), LatestBlog, Faq (+ FAQ schema), FinalCta.

Content (texts, cards, stats, FAQs) is kept as arrays at the top of each component — edit the array,
not the markup.

## Design tokens
Green `#10B981` (buttons `#0BA976`), purple `#8B5CF6`, navy `#0F172A`, header `#070D1F`,
footer `#020617`, light bg `#F8FAFC`, muted text `#64748B`. Sections: 100px vertical padding
(60px on mobile). Rows: 90% wide, max 1280px. Columns stack at ≤980px; mobile type at ≤767px.

## New design style (owner-approved, use on every redesigned page)
Pages already in this style: Home (`/`), About, Services hub. Old home design kept at `/home-page-old/`.
- No purple and no emoji anywhere — real Font Awesome icons only.
- Highlighted heading words: two-shade green text gradient
  `linear-gradient(90deg, #6EE7B7 0%, #059669 100%)` + `background-clip: text` + `box-decoration-break: clone`.
- Icon tiles: same two-shade gradient (`135deg, #6EE7B7 → #059669`), white icon, radius ~14px,
  shadow `0 12px 24px -12px rgba(5,150,105,.6), inset 0 1px 0 rgba(255,255,255,.35)`.
  Small check marks use the same gradient. "Problem" icons may use red two-shade (`#FCA5A5 → #DC2626`).
- Dark hero (`#0B1224 → #020617`), white stats strip overlapping the hero, dark-green feature card
  (`#064E3B → #065F46 → #0F172A`), final CTA `#020617 → #0F172A → #064E3B`.
- Button arrows: `<i class="fas fa-arrow-right rr-btn-arrow"></i>`.
- Photos: real photos in `public/images/...` (fetched once via a GitHub Actions workflow), never hotlinked.

## Rules for changes
1. New page → `src/pages/<slug>/index.astro` using `BaseLayout`, reuse `.sec`/`.row`/`SectionHeading` and the same look.
2. Keep old WordPress URLs. If a URL must change, add a redirect.
3. Always run `npm run build` and make sure it passes before pushing.
4. Push to `main` → GitHub Actions deploys automatically.
5. Images live in `public/images/` (served at `/images/...`). Never hotlink the old WordPress site.

## Going live on rank-ready.com (later)
- `src/data/site.ts`: `NOINDEX = false`.
- Build with `SITE_URL=https://rank-ready.com`.
- Add an FTP deploy step for A2 Hosting cPanel (`public_html`) in `.github/workflows/deploy.yml`
  using repository secrets (FTP_SERVER, FTP_USERNAME, FTP_PASSWORD).

## Still to build
About Us, Services (6 pages), Industries (5 pages), Case Studies, Blog (Markdown content collection), Contact, Privacy Policy, FAQ.
