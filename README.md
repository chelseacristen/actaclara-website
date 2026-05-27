# actaclara.com — public landing page

Standalone Vite + React + TypeScript landing page for **actaclara.com**.
Extracted verbatim from the private ActaClara demo-app at commit `8bb55a41`
on 2026-05-27. No backend, no API calls — contact form opens a `mailto:`
to `contact@actaclara.com`.

## Stack
- Vite 8 + React 19 + TypeScript
- Tailwind v4 (CSS-only utilities used; safe to keep)
- No router, no server — single page, fully static

## Local dev

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # → dist/
npm run preview      # serve dist/ locally
```

## Deploy — GitHub + Cloudflare Pages

### 1. Push to a new GitHub repo

```bash
# Inside /home/ubuntu/actaclara-website-export
gh repo create actaclara-website --public --source=. --remote=origin --push
#   OR manually:
# git remote add origin git@github.com:<your-handle>/actaclara-website.git
# git branch -M main
# git push -u origin main
```

### 2. Connect to Cloudflare Pages

1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Select the `actaclara-website` repo.
3. Build settings:
   - **Framework preset:** `Vite`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** `/` (default)
   - **Node version:** 20 (set via env var `NODE_VERSION=20` if Cloudflare defaults to older)
4. Save & deploy. First build runs immediately.

### 3. Attach `actaclara.com` domain

1. In the Pages project → **Custom domains** → **Set up a custom domain**.
2. Enter `actaclara.com` and `www.actaclara.com`.
3. If the domain is on Cloudflare DNS, records are auto-created (CNAME apex flattening). If on another registrar, follow the CNAME/A instructions Cloudflare displays.
4. Wait for SSL provisioning (~1–5 min). Site is live.

### 4. Future updates

```bash
# edit files locally → commit → push
git add -A && git commit -m "update copy" && git push
# Cloudflare auto-builds & deploys on push to main
```

## Contents

- `index.html` — root HTML, loads `/src/main.tsx`
- `src/main.tsx` — React mount
- `src/App.tsx` — single-route → `<LandingPage />`
- `src/pages/LandingPage.tsx` — hero, "COMING SOON", Contact CTA, footer
- `src/components/ContactModal.tsx` — modal wrapper
- `src/components/ContactForm.tsx` — **mailto** variant (no backend)
- `src/components/ChevronLogo.tsx` — brand chevron SVG
- `src/index.css` + `src/styles/tokens.css` — design tokens
- `branding/ActaClaraBranding.html` — visual reference (not shipped to `dist/`)
