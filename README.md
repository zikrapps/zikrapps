# Zikr Apps — Marketing Site

A static, multilingual site for **Tazkirah**, **Misbaha**, and **Mehrab** — built with [Astro](https://astro.build) and Tailwind CSS. Design follows the “Modern Islamic Art” mockups: forest green, cream, and gold accents with EN / AR / UR support and RTL layouts.

## Quick start

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # output in dist/
npm run preview
```

## Configure before launch

1. **Contact form** — Copy `.env.example` to `.env` and set `PUBLIC_FORM_ENDPOINT` (Formspree, Web3Forms, or similar).
2. **APK base URL** — Set `PUBLIC_APK_BASE_URL` to a GitHub Releases URL in production (e.g. `https://github.com/<user>/zikrapps/releases/download/v0.1.0-beta`). Leave blank for local dev to serve from `public/downloads/`. See [`docs/HOSTING.md`](docs/HOSTING.md).
3. **Store links** — Edit `src/i18n/en.ts` (and `ar.ts`, `ur.ts`) — update `appStoreUrl` and `playStoreUrl` for each beta app.
4. **Screenshots** — Real PNGs live in `public/images/apps/`. Add more by dropping files in and registering them in `src/lib/app-media.ts`.
5. **Demo videos** — Live in `public/videos/`. Replace per release.
6. **APK files** — In production they're served from GitHub Releases via `PUBLIC_APK_BASE_URL` (see [`docs/HOSTING.md`](docs/HOSTING.md)). Do **not** place `.apk` files inside `public/downloads/` — the Cloudflare adapter rejects any single asset over 25 MiB and the build will fail. Keep local copies outside the project tree.

For the full deployment runbook see [`docs/HOSTING.md`](docs/HOSTING.md).

## Routes

| Path | Description |
|------|-------------|
| `/` | Home (English) |
| `/ar/`, `/ur/` | Localized home |
| `/apps/tazkirah`, `/apps/misbaha`, `/apps/mehrab` | App detail pages |
| `/contact` | Feedback form |
| `/privacy` | Privacy policy (all apps + website) |
| `/copyright` | Copyright & usage rights |

Arabic and Urdu paths are prefixed automatically (`/ar/apps/tazkirah`, etc.).

## Deploy

Build output is static HTML in `dist/`. Deploy to any static host (see hosting notes in the project README or ask in chat).

```bash
npm run build
```

## Project structure

- `src/i18n/` — All copy in English, Arabic, Urdu
- `src/components/` — UI blocks (hero, app sections, sideload guide)
- `src/pages/` — Routes
- `public/downloads/` — Beta APKs (local dev only — gitignored, served from GitHub Releases in prod)
- `public/images/` — Screenshots, brand marks, and design references
- `scripts/build-logo-assets.mjs` — Regenerates brand-mark PNGs from a local source mockup (`design/`, gitignored)

## Security

Found a vulnerability? Please email **salam@zikrapps.com** instead of opening a public issue. See [`SECURITY.md`](SECURITY.md).

## License & ownership

Copyright © 2026 Zikr Apps. All rights reserved.

The source is published publicly for transparency and to enable invited contributions. Public visibility does not grant a license to reuse the code, design, brand marks, or copy. See [`LICENSE`](LICENSE) for full terms.

For partnership or licensing inquiries: **salam@zikrapps.com**.
