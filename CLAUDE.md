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

Home sections in order: Hero, Problem ("The hard truth"), Method (4 pillars), Services (6 cards),
Geo ("future of search"), Results (stats), CaseStudies, Industries, Process (5 steps),
Testimonials, Audit (green form, `#audit`), LatestBlog, Faq (+ FAQ schema), FinalCta.

Content (texts, cards, stats, FAQs) is kept as arrays at the top of each component — edit the array,
not the markup.

## Design tokens
Green `#10B981` (buttons `#0BA976`), purple `#8B5CF6`, navy `#0F172A`, header `#070D1F`,
footer `#020617`, light bg `#F8FAFC`, muted text `#64748B`. Sections: 100px vertical padding
(60px on mobile). Rows: 90% wide, max 1280px. Columns stack at ≤980px; mobile type at ≤767px.

## Rules for changes
1. New page → `src/pages/<slug>/index.astro` using `BaseLayout`, reuse `.sec`/`.row`/`SectionHeading` and the same look.
2. Keep old WordPress URLs. If a URL must change, add a redirect.
3. Always run `npm run build` and make sure it passes before pushing.
4. Push to `main` → GitHub Actions deploys automatically.
5. Images: currently loaded from `https://rank-ready.com/wp-content/uploads/...` (`WP` constant in
   `site.ts`). Before WordPress is removed, copy them into `public/images/` and update paths.

## Going live on rank-ready.com (later)
- `src/data/site.ts`: `NOINDEX = false`.
- Build with `SITE_URL=https://rank-ready.com`.
- Add an FTP deploy step for A2 Hosting cPanel (`public_html`) in `.github/workflows/deploy.yml`
  using repository secrets (FTP_SERVER, FTP_USERNAME, FTP_PASSWORD).

## Still to build
About Us, Services (6 pages), Industries (5 pages), Case Studies, Blog (Markdown content collection), Contact, Privacy Policy, FAQ.
