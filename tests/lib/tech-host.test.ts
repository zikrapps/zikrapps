import { describe, expect, it } from 'vitest';
import {
  MAIN_SITE_ORIGIN,
  TECH_SUBDOMAIN,
  applyTechSubdomainRequest,
  isTechSubdomainRoot,
  techSubdomainRedirectTarget,
  techSubdomainRewrite,
} from '../../src/lib/tech-host';

describe('tech-host', () => {
  it('rewrites the tech subdomain root to /tech', () => {
    expect(techSubdomainRewrite(TECH_SUBDOMAIN, '/')).toBe('/tech');
    expect(techSubdomainRewrite(TECH_SUBDOMAIN, '')).toBe('/tech');
    expect(techSubdomainRewrite('TECH.ZIKRAPPS.COM', '/')).toBe('/tech');
  });

  it('leaves other hosts and deeper paths unchanged', () => {
    expect(techSubdomainRewrite('zikrapps.com', '/')).toBeNull();
    expect(techSubdomainRewrite(TECH_SUBDOMAIN, '/tech')).toBeNull();
    expect(techSubdomainRewrite(TECH_SUBDOMAIN, '/privacy')).toBeNull();
  });

  it('redirects non-root tech subdomain URLs to zikrapps.com', () => {
    expect(techSubdomainRedirectTarget(new URL('https://tech.zikrapps.com/apps/tazkirah'))).toBe(
      `${MAIN_SITE_ORIGIN}/apps/tazkirah`,
    );
    expect(techSubdomainRedirectTarget(new URL('https://tech.zikrapps.com/tech'))).toBe(
      `${MAIN_SITE_ORIGIN}/tech`,
    );
    expect(techSubdomainRedirectTarget(new URL('https://tech.zikrapps.com/'))).toBeNull();
    expect(techSubdomainRedirectTarget(new URL('https://zikrapps.com/apps/misbaha'))).toBeNull();
  });

  it('rewrites tech subdomain requests before Astro handles them', () => {
    const rewritten = applyTechSubdomainRequest(new Request('https://tech.zikrapps.com/'));
    expect(new URL(rewritten.url).pathname).toBe('/tech');

    const unchanged = applyTechSubdomainRequest(new Request('https://zikrapps.com/'));
    expect(new URL(unchanged.url).pathname).toBe('/');
  });

  it('identifies the tech subdomain root path', () => {
    expect(isTechSubdomainRoot('/')).toBe(true);
    expect(isTechSubdomainRoot('')).toBe(true);
    expect(isTechSubdomainRoot('/tech')).toBe(false);
  });
});
