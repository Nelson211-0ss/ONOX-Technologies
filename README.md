# ONOX Technologies Website

Static multi-page website with clean URLs (no `.html` in links), e.g. `/about/`, `/services/cybersecurity/`.

## Structure

```
src/
  content/site.js       ← company details (phone, email, address, stats)
  content/services.js   ← the 10 services (each gets its own page)
  pages.js              ← text and layout of every page
  layout.js             ← shared header, footer, banner, call to action
  build.js              ← generates the pages into public/
  serve.js              ← local preview server
public/                 ← THE WEBSITE (upload this folder to your host)
  assets/css/style.css
  assets/js/main.js
  assets/img/favicon.svg
  about/index.html, services/index.html, …
```

## Editing

1. Change content in `src/` (start with `src/content/site.js`).
2. Run `npm run build` to regenerate all pages.
3. Run `npm run dev` and open http://localhost:3000 to preview.

Styles and scripts in `public/assets/` are edited directly (no build needed).

> Don't open the HTML files by double-clicking. Clean URLs need a web server, so use `npm run dev`.

## Deploying

Upload the contents of `public/` to any web host (cPanel/Apache, Nginx, Netlify, Vercel, GitHub Pages, Cloudflare Pages).
Each page is a folder with an `index.html`, which every host serves at the folder's URL, so no extra configuration is needed.
`404.html` is used automatically by most hosts for missing pages.
