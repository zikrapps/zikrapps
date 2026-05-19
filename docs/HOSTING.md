# Hosting & launch runbook — `zikrapps.com`

This is the concrete launch plan for the site. The domain `zikrapps.com` is already registered on **Cloudflare Registrar**.

**Target stack** (≈ **$94/year all-in**, of which $84 is Gmail and $10 is the domain):

| Concern | Service | Cost / yr |
|---|---|---|
| Domain | Cloudflare Registrar (already done) | ~$10 |
| Static site | Cloudflare Pages | $0 |
| APK distribution | GitHub Releases | $0 |
| Email — real Gmail @ `zikrapps.com` | Google Workspace Business Starter | $84 |
| Site analytics (geo, referrers) | Cloudflare Web Analytics | $0 |
| Download analytics (optional) | Cloudflare Worker shim | $0 |

Estimated time to ship end-to-end: **2–3 hours** of focused work.

> **Dependency order matters.** You want everything tied to `@zikrapps.com` from the start — including your GitHub account — so Workspace comes *before* GitHub. Cloudflare Pages comes last because it just connects the GitHub repo (which has to exist) to the domain (which is already done).

---

## Phase 0 · One-time housekeeping (5 min)

1. **Verify the `.gitignore` excludes APKs** (already done — see `public/downloads/*.apk`). APKs are distributed via GitHub Releases, not via git.
2. **Copy `.env.example` to `.env`** and leave values blank for now; we'll fill them as we go.
   ```bash
   cp .env.example .env
   ```
3. **Reserve the GitHub username `zikrapps`.** Open `https://github.com/zikrapps` in a private window. If it 404s, the name is available — grab it in Phase 2. Fallbacks: `zikr-apps`, `zikrappshq`, `getzikrapps`.

---

## Phase 1 · Set up Gmail at `@zikrapps.com` (30 min)

Do this **first** so every account you create afterwards (GitHub, Cloudflare team, Formspree, app stores) is registered on a domain you own — not your personal email. Switching later is annoying.

We use **Google Workspace Business Starter** ($7/user/month, ≈$84/yr) so you get the real Gmail interface, Drive, Calendar, and Meet on your domain.

1. **Sign up:** [workspace.google.com](https://workspace.google.com/business/signup) → **Get started**.
   - Business name: `Zikr Apps`
   - Number of employees: `Just you`
   - Country: yours
   - Domain: `zikrapps.com` (choose "Yes, I have one")
   - Pick **Business Starter** ($7/user/mo). There's usually a ~14% first-year discount.
   - Create your primary account — in this project we use `salam@zikrapps.com` (`salam` = "peace" — on-brand for an Islamic apps suite). This becomes both your Gmail address *and* the email you'll use to register GitHub, Cloudflare team membership, Formspree, app stores, etc.
2. **Verify domain ownership.** Google gives you a TXT record to add. In **Cloudflare → DNS → Records**, add it. Click "Verify" in Google — usually completes in under a minute.
3. **Add MX records for Gmail.** Replace any existing MX records (if Cloudflare Email Routing was on, disable it first). Use Google's modern MX:
   ```
   Type: MX   Name: @   Priority: 1   Content: smtp.google.com
   ```
   That single record is the new, simplified Workspace MX. (The old five-record set still works if you've already added it.)
4. **Add SPF.** In DNS:
   ```
   Type: TXT   Name: @   Content: v=spf1 include:_spf.google.com ~all
   ```
   If you already have an SPF record, *merge* the `include:_spf.google.com` into it — don't add a second SPF record.
5. **Add DKIM.** In Workspace admin: **Apps → Google Workspace → Gmail → Authenticate email**. Generate the DKIM key (2048-bit), paste the resulting TXT record into Cloudflare DNS, then click "Start authentication" in Workspace.
6. **Add DMARC** (mild policy to start):
   ```
   Type: TXT   Name: _dmarc   Content: v=DMARC1; p=none; rua=mailto:salam@zikrapps.com
   ```
7. **Add aliases for the inboxes you'll publish.** In Workspace admin: **Directory → Users → [your user] → User information → Add alias**. Suggested aliases (all routed to the same inbox):
   - `contact@zikrapps.com`
   - `hello@zikrapps.com`
   - `support@zikrapps.com`
   - `feedback@zikrapps.com`
8. **Test:** send yourself a mail to `contact@zikrapps.com` from a non-Google address (e.g. your personal Gmail). It should appear in the new Workspace inbox within seconds.
9. **Optional — Gmail "Send mail as" for aliases.** In Gmail → **Settings → Accounts → Send mail as**, add each alias so you can compose *from* `contact@zikrapps.com` (not just receive at it).

✅ Phase 1 done. Real Gmail at `salam@zikrapps.com` and `contact@zikrapps.com`, with proper SPF/DKIM/DMARC for deliverability.

---

## Phase 2 · Create the GitHub identity for the project (20 min)

You're keeping this separate from your personal GitHub on purpose — easier branding, cleaner ownership, easier to hand off later. Recommended structure: **one new personal "shell" account** + **one organization** named `zikrapps`. Both are free for public repos.

1. **Sign out** of GitHub completely (or use a private browser window) so you don't accidentally create things under your personal account.
2. **Create the shell user.** Go to [github.com/signup](https://github.com/signup):
   - Email: `salam@zikrapps.com`
   - Username: e.g. `zikrapps-admin` (this name is just the org's billing owner — almost nobody will ever see it).
   - Verify the email when GitHub sends the confirmation to your new Gmail inbox.
   - Enable 2FA immediately (Settings → Password and authentication → enable a TOTP app like 1Password / Authy).
3. **Create the organization.** While signed in as `zikrapps-admin`: **+ menu → New organization → Free plan**.
   - Organization name: `zikrapps` (or your reserved fallback).
   - Contact email: `salam@zikrapps.com`.
   - Add your *personal* GitHub username as a member with **Owner** role too. That way you can push from your existing machine with your personal SSH key without having to juggle credentials — but the repos still *belong* to `zikrapps`. (Optional but recommended.)
4. **Create the repo on the org.** Either via the web UI (`github.com/organizations/zikrapps/repositories/new`) or via gh CLI:
   ```bash
   # First time only on this machine, you may need to log in fresh:
   gh auth login    # choose 'github.com' → 'HTTPS' → log in with browser
   # Then create the repo under the org:
   gh repo create zikrapps/zikrapps --public --source=. --remote=origin --push
   ```
   The repo is `github.com/zikrapps/zikrapps` (the website). Later you'll add `tazkirah-android`, `misbaha-android`, etc. as sibling repos in the same org.
5. **Confirm:** `https://github.com/zikrapps/zikrapps` resolves to the freshly pushed code.

> **If you'd rather stay simple:** skip step 3 and 4. Create a *single* personal account named `zikrapps` (using `salam@zikrapps.com`), then push to `github.com/zikrapps/zikrapps` (which here is `user/repo`, not `org/repo`). You can promote to an org later. Trade-off: harder to add multiple repos cleanly, harder to hand off ownership.

✅ Phase 2 done. The code now lives at `github.com/zikrapps/zikrapps`, not on your personal account.

---

## Phase 3 · Deploy the static site on Cloudflare Pages (20 min)

1. **Open** [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Authorize Cloudflare on the **`zikrapps-admin`** GitHub user (you may need to add it as a second authorized GitHub account inside the Cloudflare GitHub app). Pick the `zikrapps/zikrapps` repo.
3. **Build settings:**
   - Framework preset: `Astro`
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: *(blank)*
   - Environment variables (Production):
     - `PUBLIC_FORM_ENDPOINT` — leave blank for now (set in Phase 6).
     - `PUBLIC_APK_BASE_URL` — leave blank for now (set in Phase 4).
4. **Save & Deploy.** First build takes ~1 min. You'll get a `*.pages.dev` URL — open it and verify the site loads at `/`, `/ar/`, `/ur/`, and `/contact`.
5. **Attach the custom domain:**
   - In the Pages project → **Custom domains** → **Set up a custom domain** → `zikrapps.com`.
   - Cloudflare adds the CNAME automatically (since the domain is on the same account). HTTPS is provisioned in ~1 min.
   - Add `www.zikrapps.com` as a second custom domain and let Cloudflare 301-redirect it to the apex (set under **Rules → Redirect Rules**, or check the "redirect www → apex" option in the Custom domains setup).
6. **Visit `https://zikrapps.com`** — site should be live.

✅ Phase 3 done. The site is on the internet, free, with auto-deploy on every `git push` to `main` of `zikrapps/zikrapps`.

---

## Phase 4 · Publish the APKs via GitHub Releases (15 min)

1. **Locate your local APK files.** Keep them **outside** the project tree (e.g. `~/opt/zikrapps-local-apks/`) — the Cloudflare Workers adapter rejects builds containing any file over 25 MiB, so `*.apk` files inside `public/downloads/` will break `npm run build` locally.
   ```bash
   ls -lh ~/opt/zikrapps-local-apks/*.apk
   ```
2. **Cut a release on GitHub** under the org repo:
   ```bash
   gh release create v0.1.0-beta \
     --repo zikrapps/zikrapps \
     --title "v0.1.0 beta" \
     --notes "First public beta. Misbaha and Tazkirah Android builds. Sideload only." \
     ~/opt/zikrapps-local-apks/tazkirah-v01.apk \
     ~/opt/zikrapps-local-apks/misbaha-v01.apk
   ```
   (or use the GitHub web UI: `github.com/zikrapps/zikrapps/releases/new` → upload both `.apk` files as assets)
3. **Grab the base download URL.** It looks like:
   ```
   https://github.com/zikrapps/zikrapps/releases/download/v0.1.0-beta
   ```
4. **Wire it into the deploy.** In Cloudflare Pages → your project → **Settings → Environment variables → Production**, set:
   ```
   PUBLIC_APK_BASE_URL = https://github.com/zikrapps/zikrapps/releases/download/v0.1.0-beta
   ```
5. **Redeploy** (Pages → Deployments → click "Retry deployment" on the latest, or push any commit).
6. **Smoke-test:** open `https://zikrapps.com/apps/tazkirah`, click "Download APK (Android)". The browser should download `tazkirah-v01.apk` from `github.com`.

### Bumping a version later

When you ship `v0.2.0-beta`:

1. Update `apkFilename` in `src/i18n/{en,ar,ur}.ts` to the new filename (e.g. `tazkirah-v02.apk`).
2. `gh release create v0.2.0-beta tazkirah-v02.apk misbaha-v02.apk ...`
3. In Pages → Environment variables, bump `PUBLIC_APK_BASE_URL` to end with `.../v0.2.0-beta`.
4. Push the i18n change to trigger a redeploy.

The whole release flow takes < 5 min once you've done it once.

✅ Phase 4 done. APKs are served from GitHub at zero bandwidth cost.

---

## Phase 5 · Analytics (10 min)

### Site analytics — Cloudflare Web Analytics

1. **Cloudflare dashboard → Analytics & Logs → Web Analytics → Add a site.**
2. Pick `zikrapps.com` (server-side, no JS snippet needed — Cloudflare measures it from the edge).
3. Done. Within ~10 min you'll see: countries, top pages, top referrers, devices, browsers. No cookies, no GDPR banner.

### Download analytics — optional

GitHub Releases shows total download counts per release on the release page itself. That gives you "how many" but not "from where."

If you want per-download geographic data, deploy a tiny Cloudflare Worker that sits in front of the GitHub URL:

```js
// workers/apk-redirect.js
export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    const file = url.pathname.split('/').pop();
    // Log to Logpush / Workers KV / Analytics Engine here if you want.
    console.log(JSON.stringify({
      file,
      country: req.cf?.country,
      city: req.cf?.city,
      referer: req.headers.get('referer'),
      ts: Date.now(),
    }));
    return Response.redirect(`${env.GITHUB_BASE}/${file}`, 302);
  },
};
```

Set `GITHUB_BASE` as a Worker secret to your `PUBLIC_APK_BASE_URL`, bind the Worker to `dl.zikrapps.com/*`, and change `PUBLIC_APK_BASE_URL` in Pages to `https://dl.zikrapps.com`. Free tier: 100k requests/day.

**Skip this for now if you're launching today** — GitHub's own counter is enough until you have real traffic.

✅ Phase 5 done.

---

## Phase 6 · Wire up the contact form (15 min)

The form currently posts to whatever `PUBLIC_FORM_ENDPOINT` is set to. Pick a provider:

| Provider | Free tier | Best for |
|---|---|---|
| **Formspree** | 50 submissions/mo | Quickest setup |
| **Web3Forms** | unlimited (with ads in their dashboard) | Higher volume, free |
| Brevo / Sendinblue | 300/day | If you also want newsletters later |

1. Sign up for the provider **using `salam@zikrapps.com`** (consistency: every third-party account on the brand's domain). Point the form to deliver to `contact@zikrapps.com` (now active in Phase 1).
2. Grab the endpoint URL (e.g. `https://formspree.io/f/xyzabc`).
3. In Cloudflare Pages → Environment variables, set `PUBLIC_FORM_ENDPOINT` to that URL.
4. Redeploy.
5. Submit a test message from `/contact`; verify it lands in your Gmail.

✅ Phase 6 done.

---

## Phase 7 · Pre-launch polish (30 min)

- [ ] **App store links.** Replace the `appStoreUrl: '#'` / `playStoreUrl: '#'` placeholders in `src/i18n/{en,ar,ur}.ts` when stores accept the apps.
- [ ] **Walk all three locales.** Visit `/`, `/ar/`, `/ur/`, and click into each app + contact. Verify RTL looks right on the Arabic and Urdu pages.
- [ ] **Mobile pass.** Open the site on a real Android phone, install one APK end-to-end through the sideload guide.
- [ ] **Lighthouse.** Run a Lighthouse audit; aim for ≥ 95 on Performance and Accessibility.
- [ ] **Search Console.** Add `zikrapps.com` to [Google Search Console](https://search.google.com/search-console) (verify via Cloudflare TXT). Submit `https://zikrapps.com/sitemap-index.xml` if you've enabled the sitemap integration; otherwise just submit the four main URLs.
- [ ] **Social previews.** Verify the Open Graph image renders — try `https://www.opengraph.xyz/url/https%3A%2F%2Fzikrapps.com`.

---

## Operations: what to do for each future release

1. Bump version in i18n if filename changes.
2. `gh release create vX.Y.Z-beta ...apks`.
3. Update `PUBLIC_APK_BASE_URL` in Pages env vars.
4. Push i18n change → auto-deploy.

That's it. The site is on free hosting forever, the email is the only recurring spend, and the APK distribution costs nothing per release.

---

## Total monthly cost when the apps are in the stores

When the apps eventually ship to Play and App Store, you'll remove the APK download CTAs and the Cloudflare Worker. At that point:

- Domain: ~$0.83/mo
- Gmail: $7/mo
- Hosting: $0
- **Total: ~$7.83/mo** for the marketing site indefinitely.

If you also drop Gmail (downgrade to Cloudflare Email Routing forwarding to your personal Gmail), you're at ~$0.83/mo — basically free.
