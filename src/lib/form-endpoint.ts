/**
 * Formspree (or compatible) POST endpoint for the contact form.
 *
 * Set after signup at https://formspree.io — paste your form URL below.
 * `PUBLIC_FORM_ENDPOINT` overrides this when present at build time.
 *
 * On Cloudflare Workers, dashboard "Variables and secrets" are runtime-only;
 * the committed fallback below is what production builds use (same as APK URLs).
 */
const FORMSPREE_FALLBACK = 'https://formspree.io/f/REPLACE_ME';

export const FORM_ENDPOINT = (
  import.meta.env.PUBLIC_FORM_ENDPOINT ?? FORMSPREE_FALLBACK
).trim();

/** True when a real Formspree (or Web3Forms) URL is configured. */
export const isFormConfigured =
  FORM_ENDPOINT.length > 0 && !FORM_ENDPOINT.includes('REPLACE_ME');
