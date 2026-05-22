import type { Locale } from '../i18n';

/** Apple App Store marketing badge locale segment (see Apple Media Services badge API). */
export function appStoreBadgeLocale(locale: Locale): string {
  return locale === 'ar' ? 'ar-sa' : 'en-us';
}

export function appStoreBadgeSrc(locale: Locale, surface: 'light' | 'dark'): string {
  const color = surface === 'dark' ? 'white' : 'black';
  const loc = appStoreBadgeLocale(locale);
  return `https://tools.applemediaservices.com/api/badges/download-on-the-app-store/${color}/${loc}?size=250x83`;
}
