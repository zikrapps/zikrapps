import { describe, expect, it } from 'vitest';
import {
  appPath,
  contactPath,
  copyrightPath,
  homePath,
  privacyPath,
} from '../../src/lib/paths';

describe('paths', () => {
  it('builds English app paths without locale prefix', () => {
    expect(appPath('tazkirah', 'en')).toBe('/apps/tazkirah');
    expect(appPath('misbaha', 'en')).toBe('/apps/misbaha');
    expect(appPath('mehrab', 'en')).toBe('/apps/mehrab');
  });

  it('builds localized app paths for ar and ur', () => {
    expect(appPath('misbaha', 'ar')).toBe('/ar/apps/misbaha');
    expect(appPath('tazkirah', 'ur')).toBe('/ur/apps/tazkirah');
  });

  it('builds contact, privacy, copyright, and home paths', () => {
    expect(contactPath('en')).toBe('/contact');
    expect(contactPath('ar')).toBe('/ar/contact');
    expect(privacyPath('en')).toBe('/privacy');
    expect(privacyPath('ur')).toBe('/ur/privacy');
    expect(copyrightPath('en')).toBe('/copyright');
    expect(copyrightPath('ur')).toBe('/ur/copyright');
    expect(homePath('en')).toBe('/');
    expect(homePath('ar')).toBe('/ar');
  });
});
