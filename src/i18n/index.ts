import type { Locale, Translations } from './types';
import en from './en';
import ar from './ar';
import ur from './ur';

const dictionaries: Record<Locale, Translations> = { en, ar, ur };

export function getLocaleFromPath(pathname: string): Locale {
  if (pathname.startsWith('/ar')) return 'ar';
  if (pathname.startsWith('/ur')) return 'ur';
  return 'en';
}

export function getTranslations(locale: Locale): Translations {
  return dictionaries[locale];
}

export function localizedPath(path: string, locale: Locale): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (locale === 'en') return clean === '/' ? '/' : clean;
  if (clean === '/') return `/${locale}`;
  return `/${locale}${clean}`;
}

export function switchLocalePath(pathname: string, target: Locale): string {
  const withoutLocale = pathname.replace(/^\/(ar|ur)(\/|$)/, '/');
  const normalized = withoutLocale === '' ? '/' : withoutLocale;
  return localizedPath(normalized, target);
}

export { type Locale, type Translations };
