export type Locale = 'en' | 'ar' | 'ur';

export interface NavLink {
  label: string;
  href: string;
}

export interface SideloadStep {
  title: string;
  body: string;
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
    success: string;
    privacy: string;
    disclaimer: {
      title: string;
      body: string;
    };
  };
  footer: {
    tagline: string;
    rights: string;
    disclaimer: string;
  };
}
