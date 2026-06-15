import { describe, expect, it } from 'vitest';
import {
  appMedia,
  getAppScreenshots,
  getDemoVideoSrc,
  getScreenshotUrls,
} from '../../src/lib/app-media';

describe('app-media', () => {
  it('returns configured screenshots for known apps', () => {
    const shots = getAppScreenshots('tazkirah');
    expect(shots).toHaveLength(3);
    expect(shots[0]?.src).toBe('/images/apps/tazkirah-guide.png');
  });

  it('returns an empty list for apps without media', () => {
    expect(getAppScreenshots('mehrab')).toEqual([]);
  });

  it('returns demo video paths only when showVideo is enabled', () => {
    expect(getDemoVideoSrc('tazkirah')).toBe('/videos/tazkirah-demo.mp4');
    expect(getDemoVideoSrc('misbaha')).toBe('/videos/misbaha-demo.mp4');
    expect(getDemoVideoSrc('mehrab')).toBeNull();
  });

  it('falls back to numbered SVG placeholders when no custom screenshots exist', () => {
    expect(getScreenshotUrls('mehrab', 'mehrab')).toEqual([
      '/images/apps/mehrab-1.svg',
      '/images/apps/mehrab-2.svg',
      '/images/apps/mehrab-3.svg',
    ]);
  });

  it('returns custom screenshot URLs when configured', () => {
    expect(getScreenshotUrls('misbaha', 'misbaha')).toEqual([
      '/images/apps/misbaha-today.png',
      '/images/apps/misbaha-goals.png',
      '/images/apps/misbaha-visualize.png',
    ]);
  });

  it('registers demo videos for beta apps with screenshots', () => {
    expect(appMedia.tazkirah?.showVideo).toBe(true);
    expect(appMedia.misbaha?.screenshots).toHaveLength(3);
  });
});
