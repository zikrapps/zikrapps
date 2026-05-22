export type Locale = 'en' | 'ar' | 'ur';

export interface NavLink {
  label: string;
  href: string;
}

export interface SideloadStep {
  title: string;
  body: string;
}

export interface PrivacySection {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface PrivacyContent {
  title: string;
  subtitle: string;
  effectiveDate: string;
  tableOfContents: string;
  sections: PrivacySection[];
}

export interface AppContent {
  name: string;
  tagline: string;
  description: string;
  /** Optional longer multi-paragraph description shown on the app detail page. */
  longDescription?: string[];
  /** Optional poetic closing line shown after the long description. */
  closingTagline?: string;
  features: string[];
  status: 'beta' | 'development';
  appStoreUrl?: string;
  playStoreUrl?: string;
  /** Shown when Play listing is not live yet (e.g. Tazkirah). */
  playStoreComingSoon?: boolean;
  /** Short line under the app name / above download buttons (App Store live). */
  storeAvailability?: string;
  /** Android distribution note (Play soon + APK beta). */
  storeAndroidNote?: string;
  apkFilename?: string;
}

export interface Translations {
  meta: {
    siteTitle: string;
    siteDescription: string;
  };
  nav: {
    brand: string;
    tazkirah: string;
    misbaha: string;
    mehrab: string;
    contact: string;
    privacy: string;
    copyright: string;
    exploreApps: string;
  };
  lang: {
    en: string;
    ar: string;
    ur: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    description: string;
    cta: string;
  };
  home: {
    appsEyebrow: string;
    watchDemo: string;
    closeVideo: string;
    screenshots: string;
    inBeta: string;
    inDevelopment: string;
    learnMore: string;
    appStore: string;
    playStore: string;
    downloadApk: string;
    playStoreComingSoon: string;
    sideloadTitle: string;
  };
  apps: {
    tazkirah: AppContent;
    misbaha: AppContent;
    mehrab: AppContent;
  };
  sideload: {
    title: string;
    intro: string;
    steps: SideloadStep[];
    note: string;
  };
  contact: {
    title: string;
    subtitle: string;
    name: string;
    email: string;
    app: string;
    appOptions: { value: string; label: string }[];
    message: string;
    submit: string;
    submitting: string;
    success: string;
    error: string;
    privacy: string;
    disclaimer: {
      title: string;
      body: string;
    };
  };
  privacy: PrivacyContent;
  copyright: PrivacyContent;
  footer: {
    tagline: string;
    instagramAria: string;
    instagramHandle: string;
    rights: string;
    disclaimer: string;
  };
}
