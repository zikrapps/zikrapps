import { describe, expect, it } from 'vitest';
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from '../../src/lib/social';

describe('social', () => {
  it('exposes the public Instagram profile', () => {
    expect(INSTAGRAM_HANDLE).toBe('zikrapps');
    expect(INSTAGRAM_URL).toBe('https://www.instagram.com/zikrapps/');
  });
});
