import type { Locale } from '../i18n';

export function appPath(slug: 'tazkirah' | 'misbaha' | 'mehrab', locale: Locale): string {
  return locale === 'en' ? `/apps/${slug}` : `/${locale}/apps/${slug}`;
}

export function contactPath(locale: Locale): string {
  return locale === 'en' ? '/contact' : `/${locale}/contact`;
}

export function privacyPath(locale: Locale): string {
  return locale === 'en' ? '/privacy' : `/${locale}/privacy`;
}

export function copyrightPath(locale: Locale): string {
  return locale === 'en' ? '/copyright' : `/${locale}/copyright`;
}

export function homePath(locale: Locale): string {
  return locale === 'en' ? '/' : `/${locale}`;
}

export function techPath(): string {
  return '/tech';
}

/** Prefix a site-relative path with the main origin when viewing from the tech subdomain. */
export function withSiteOrigin(path: string, siteOrigin?: string): string {
  if (!siteOrigin) return path;
  return new URL(path, siteOrigin).href;
}
