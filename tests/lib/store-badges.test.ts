import { describe, expect, it } from 'vitest';
import { appStoreBadgeLocale, appStoreBadgeSrc } from '../../src/lib/store-badges';

describe('store-badges', () => {
  it('maps Arabic to ar-sa and other locales to en-us', () => {
    expect(appStoreBadgeLocale('ar')).toBe('ar-sa');
    expect(appStoreBadgeLocale('en')).toBe('en-us');
    expect(appStoreBadgeLocale('ur')).toBe('en-us');
  });

  it('builds Apple badge URLs for light and dark surfaces', () => {
    expect(appStoreBadgeSrc('en', 'light')).toBe(
      'https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83',
    );
    expect(appStoreBadgeSrc('ar', 'dark')).toBe(
      'https://tools.applemediaservices.com/api/badges/download-on-the-app-store/white/ar-sa?size=250x83',
    );
  });
});
