import { describe, expect, it } from 'vitest';
import { TECH_SUBDOMAIN, applyTechSubdomainRequest, techSubdomainRewrite } from '../../src/lib/tech-host';

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

  it('rewrites tech subdomain requests before Astro handles them', () => {
    const rewritten = applyTechSubdomainRequest(new Request('https://tech.zikrapps.com/'));
    expect(new URL(rewritten.url).pathname).toBe('/tech');

    const unchanged = applyTechSubdomainRequest(new Request('https://zikrapps.com/'));
    expect(new URL(unchanged.url).pathname).toBe('/');
  });
});
