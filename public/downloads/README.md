# Beta APK downloads — production-only

In production, APKs are served from **GitHub Releases**, not from this directory. The site builds its download links using `PUBLIC_APK_BASE_URL` (configured in your Cloudflare project settings).

For the current release-and-bump workflow, see [`docs/HOSTING.md` → Phase 4](../../docs/HOSTING.md).

## Do not place `.apk` files in this directory

The Cloudflare adapter validates every file in `dist/` against the 25 MiB Workers asset limit. A `tazkirah-v01.apk` (≈145 MiB) or `misbaha-v01.apk` (≈83 MiB) in here will cause **`npm run build` to fail locally** with:

```
Error: Asset too large. Cloudflare Workers supports assets with sizes of up to 25 MiB.
```

Keep local APK copies somewhere **outside the project tree**, e.g. `~/opt/zikrapps-local-apks/`. Upload them to GitHub Releases when you cut a new beta. Then update `PUBLIC_APK_BASE_URL` in Cloudflare to point at the new tag.

## Never commit production signing keys.
