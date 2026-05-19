import type { Locale } from '../i18n';

export function appPath(slug: 'tazkirah' | 'misbaha' | 'mehrab', locale: Locale): string {
  return locale === 'en' ? `/apps/${slug}` : `/${locale}/apps/${slug}`;
}

export function contactPath(locale: Locale): string {
  return locale === 'en' ? '/contact' : `/${locale}/contact`;
}

export function homePath(locale: Locale): string {
  return locale === 'en' ? '/' : `/${locale}`;
}
