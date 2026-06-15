import { describe, expect, it } from 'vitest';
import ar from '../../src/i18n/ar';
import en from '../../src/i18n/en';
import ur from '../../src/i18n/ur';
import type { Translations } from '../../src/i18n/types';

const locales: Record<string, Translations> = { en, ar, ur };

function collectKeys(value: unknown, prefix = ''): string[] {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    return prefix ? [prefix] : [];
  }

  return Object.entries(value as Record<string, unknown>).flatMap(([key, nested]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    if (nested !== null && typeof nested === 'object' && !Array.isArray(nested)) {
      return collectKeys(nested, path);
    }
    return [path];
  });
}

describe('translation dictionaries', () => {
  it('keeps the same key structure across locales', () => {
    const enKeys = collectKeys(en).sort();
    expect(collectKeys(ar).sort()).toEqual(enKeys);
    expect(collectKeys(ur).sort()).toEqual(enKeys);
  });

  it('keeps beta apps on live App Store links with Play coming-soon messaging', () => {
    for (const locale of Object.values(locales)) {
      for (const slug of ['tazkirah', 'misbaha'] as const) {
        const app = locale.apps[slug];
        expect(app.status).toBe('beta');
        expect(app.appStoreUrl).toMatch(/^https:\/\/apps\.apple\.com\//);
        expect(app.playStoreComingSoon).toBe(true);
        expect(app.storeAvailability).toBeTruthy();
        expect(app.storeAndroidNote).toBeTruthy();
        expect(app.apkFilename).toMatch(/\.apk$/);
      }
    }
  });

  it('keeps Mehrab in development without store URLs', () => {
    for (const locale of Object.values(locales)) {
      const mehrab = locale.apps.mehrab;
      expect(mehrab.status).toBe('development');
      expect(mehrab.appStoreUrl).toBeUndefined();
      expect(mehrab.apkFilename).toBeUndefined();
    }
  });
});
