export type AppSlug = 'tazkirah' | 'misbaha' | 'mehrab';

export interface AppScreenshot {
  src: string;
  alt: string;
}

export interface AppMedia {
  screenshots: AppScreenshot[];
  showVideo?: boolean;
}

export const appMedia: Partial<Record<AppSlug, AppMedia>> = {
  tazkirah: {
    showVideo: true,
    screenshots: [
      {
        src: '/images/apps/tazkirah-guide.png',
        alt: 'Tazkirah Guide with step-by-step Hajj Tamattu checklist',
      },
      {
        src: '/images/apps/tazkirah-tawaf.png',
        alt: 'Tazkirah Tawaf counter with seven-round progress',
      },
      {
        src: '/images/apps/tazkirah-sai.png',
        alt: "Tazkirah Sa'i counter between Safa and Marwah",
      },
    ],
  },
  misbaha: {
    showVideo: true,
    screenshots: [
      {
        src: '/images/apps/misbaha-today.png',
        alt: 'Misbaha Today dashboard with daily taps and goal focus',
      },
      {
        src: '/images/apps/misbaha-goals.png',
        alt: 'Misbaha Goals with plans and suggested dhikr programs',
      },
      {
        src: '/images/apps/misbaha-visualize.png',
        alt: 'Misbaha Visualize lifetime stats and activity chart',
      },
    ],
  },
};

export function getAppScreenshots(slug: AppSlug): AppScreenshot[] {
  return appMedia[slug]?.screenshots ?? [];
}

export function getDemoVideoSrc(slug: AppSlug): string | null {
  if (appMedia[slug]?.showVideo !== true) return null;
  return `/videos/${slug}-demo.mp4`;
}

export function getScreenshotUrls(slug: AppSlug, fallbackPrefix: string): string[] {
  const custom = getAppScreenshots(slug);
  if (custom.length > 0) return custom.map((s) => s.src);
  return [1, 2, 3].map((n) => `/images/apps/${fallbackPrefix}-${n}.svg`);
}
