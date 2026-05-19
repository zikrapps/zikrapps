# Beta APK files

Place your signed beta APK files here. The current expected filenames are:

- `tazkirah-v01.apk` — Tazkirah beta
- `misbaha-v01.apk`  — Misbaha beta

They are served at `/downloads/tazkirah-v01.apk` and `/downloads/misbaha-v01.apk` and linked from the respective app pages via the `apkFilename` field in `src/i18n/*.ts`. To bump a version, drop the new APK in here and update `apkFilename` in `en.ts`, `ar.ts`, and `ur.ts`.

**APK binaries are gitignored** (see `.gitignore`) — they're large (100 MB+) and shouldn't live in git history. Upload them via your hosting provider's dashboard, object storage bucket (e.g. Cloudflare R2 / S3), or your CI pipeline after each beta release.

**Do not commit production signing keys.**
