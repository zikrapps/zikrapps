import { afterEach, describe, expect, it, vi } from 'vitest';

describe('apk-base-url', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it('uses the committed GitHub Releases fallback when env is unset', async () => {
    vi.stubEnv('PUBLIC_APK_BASE_URL', undefined);
    const { APK_BASE_URL } = await import('../../src/lib/apk-base-url');
    expect(APK_BASE_URL).toBe(
      'https://github.com/zikrapps/zikrapps/releases/download/v0.1.0-beta',
    );
  });

  it('prefers PUBLIC_APK_BASE_URL and strips a trailing slash', async () => {
    vi.stubEnv('PUBLIC_APK_BASE_URL', 'https://example.com/releases/v1/');
    const { APK_BASE_URL } = await import('../../src/lib/apk-base-url');
    expect(APK_BASE_URL).toBe('https://example.com/releases/v1');
  });
});
