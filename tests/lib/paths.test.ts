import { describe, expect, it } from 'vitest';
import {
  appPath,
  contactPath,
  copyrightPath,
  homePath,
  privacyPath,
  techPath,
  withSiteOrigin,
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

  it('builds contact, privacy, copyright, home, and tech paths', () => {
    expect(contactPath('en')).toBe('/contact');
    expect(contactPath('ar')).toBe('/ar/contact');
    expect(privacyPath('en')).toBe('/privacy');
    expect(privacyPath('ur')).toBe('/ur/privacy');
    expect(copyrightPath('en')).toBe('/copyright');
    expect(copyrightPath('ur')).toBe('/ur/copyright');
    expect(homePath('en')).toBe('/');
    expect(homePath('ar')).toBe('/ar');
    expect(techPath()).toBe('/tech');
  });

  it('prefixes paths with the main site origin when requested', () => {
    expect(withSiteOrigin(homePath('en'), 'https://zikrapps.com')).toBe('https://zikrapps.com/');
    expect(withSiteOrigin(techPath(), 'https://zikrapps.com')).toBe('https://zikrapps.com/tech');
    expect(withSiteOrigin('/contact', undefined)).toBe('/contact');
  });
});
