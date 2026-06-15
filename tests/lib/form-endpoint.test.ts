import { afterEach, describe, expect, it, vi } from 'vitest';

describe('form-endpoint', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it('uses the committed Formspree fallback when env is unset', async () => {
    vi.stubEnv('PUBLIC_FORM_ENDPOINT', undefined);
    const { FORM_ENDPOINT, isFormConfigured } = await import('../../src/lib/form-endpoint');
    expect(FORM_ENDPOINT).toBe('https://formspree.io/f/xaqkqoyk');
    expect(isFormConfigured).toBe(true);
  });

  it('prefers PUBLIC_FORM_ENDPOINT and trims whitespace', async () => {
    vi.stubEnv('PUBLIC_FORM_ENDPOINT', '  https://formspree.io/f/custom  ');
    const { FORM_ENDPOINT } = await import('../../src/lib/form-endpoint');
    expect(FORM_ENDPOINT).toBe('https://formspree.io/f/custom');
  });

  it('marks placeholder endpoints as not configured', async () => {
    vi.stubEnv('PUBLIC_FORM_ENDPOINT', 'https://formspree.io/f/REPLACE_ME');
    const { isFormConfigured } = await import('../../src/lib/form-endpoint');
    expect(isFormConfigured).toBe(false);
  });
});
