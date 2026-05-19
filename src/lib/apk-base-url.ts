/**
 * Base URL for beta APK assets on GitHub Releases (no trailing slash).
 *
 * `PUBLIC_APK_BASE_URL` is read at build time when set in the CI environment.
 * The fallback below keeps production builds working on Cloudflare Workers, where
 * dashboard "Variables and secrets" are runtime-only and do not reach `npm run build`.
 *
 * When you cut a new release, update this fallback and/or the Cloudflare **build**
 * environment variable, then redeploy.
 */
export const APK_BASE_URL = (
  import.meta.env.PUBLIC_APK_BASE_URL ??
  'https://github.com/zikrapps/zikrapps/releases/download/v0.1.0-beta'
).replace(/\/$/, '');
