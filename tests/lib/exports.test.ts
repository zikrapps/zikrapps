import { describe, expect, it } from 'vitest';
import { APK_BASE_URL } from '../../src/lib/apk-base-url';
import { FORM_ENDPOINT, isFormConfigured } from '../../src/lib/form-endpoint';
import { INSTAGRAM_URL } from '../../src/lib/social';
import { appStoreBadgeSrc } from '../../src/lib/store-badges';
import { techSubdomainRewrite } from '../../src/lib/tech-host';

describe('lib module exports', () => {
  it('loads build-time configuration modules', () => {
    expect(FORM_ENDPOINT).toMatch(/^https:\/\//);
    expect(isFormConfigured).toBe(true);
    expect(APK_BASE_URL).toMatch(/^https:\/\/github\.com\/zikrapps\/zikrapps\/releases/);
  });

  it('loads static helpers used across the site', () => {
    expect(INSTAGRAM_URL).toContain('instagram.com');
    expect(appStoreBadgeSrc('en', 'light')).toContain('applemediaservices.com');
    expect(techSubdomainRewrite('tech.zikrapps.com', '/')).toBe('/tech');
  });
});
