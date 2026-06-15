import { describe, expect, it } from 'vitest';
import {
  getLocaleFromPath,
  getTranslations,
  localizedPath,
  switchLocalePath,
} from '../../src/i18n';

describe('i18n routing helpers', () => {
  it('detects locale prefixes from pathname', () => {
    expect(getLocaleFromPath('/ar/apps/tazkirah')).toBe('ar');
    expect(getLocaleFromPath('/ur/contact')).toBe('ur');
    expect(getLocaleFromPath('/apps/misbaha')).toBe('en');
  });

  it('returns the dictionary for each locale', () => {
    expect(getTranslations('en').meta.siteTitle).toBe('Zikr Apps');
    expect(getTranslations('ar').nav.brand).toBe('تطبيقات ذكر');
    expect(getTranslations('ur').nav.brand).toBe('ذکر ایپس');
  });

  it('builds localized paths', () => {
    expect(localizedPath('/contact', 'ar')).toBe('/ar/contact');
    expect(localizedPath('/', 'ur')).toBe('/ur');
    expect(localizedPath('privacy', 'en')).toBe('/privacy');
  });

  it('switches locale while preserving the current route', () => {
    expect(switchLocalePath('/ar/apps/misbaha', 'en')).toBe('/apps/misbaha');
    expect(switchLocalePath('/apps/tazkirah', 'ur')).toBe('/ur/apps/tazkirah');
    expect(switchLocalePath('/ur', 'en')).toBe('/');
    expect(switchLocalePath('', 'en')).toBe('/');
  });
});
