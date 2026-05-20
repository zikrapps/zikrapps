import type { Translations } from './types';
import copyright from './copyright/en';
import privacy from './privacy/en';

const en: Translations = {
  meta: {
    siteTitle: 'Zikr Apps',
    siteDescription:
      'Quiet tools for daily remembrance — Tazkirah, Misbaha, and Mehrab. Prayer, dhikr, and direction without noise or ads.',
  },
  nav: {
    brand: 'Zikr Apps',
    tazkirah: 'Tazkirah',
    misbaha: 'Misbaha',
    mehrab: 'Mehrab',
    contact: 'Contact',
    privacy: 'Privacy',
    copyright: 'Copyright',
    exploreApps: 'Explore the apps',
  },
  lang: {
    en: 'English',
    ar: 'العربية',
    ur: 'اردو',
  },
  hero: {
    eyebrow: 'EST. MMXXVI · VOL. 01',
    title: 'Quiet tools for the ',
    titleAccent: 'daily remembrance.',
    description:
      'A small family of apps shaped around prayer, dhikr and direction — built with the same care you would give a worn prayer mat. No noise, no ads, no compromise.',
    cta: 'Explore the apps',
  },
  home: {
    appsEyebrow: 'THREE APPS · ONE INTENTION',
    watchDemo: 'Watch demo',
    closeVideo: 'Close video',
    screenshots: 'Screenshots',
    inBeta: 'Beta',
    inDevelopment: 'Coming soon',
    learnMore: 'Learn more',
    appStore: 'Download on the App Store',
    playStore: 'Get it on Google Play',
    downloadApk: 'Download APK (Android)',
    sideloadTitle: 'How to install on Android',
  },
  apps: {
    tazkirah: {
      name: 'Tazkirah',
      tagline: 'Your companion for Umrah & Hajj',
      description:
        'A mobile app that walks you through Umrah and Hajj step by step — duas, rituals, and progress in one calm, focused place.',
      longDescription: [
        'Flip through stage-by-stage duas in order, mark what you have read, and jump from the journey guide to the right dua for each stop. Track ṭawāf and saʿī with simple taps, log tasbeeh as you go, and see how far you have come on an illustrated route map — with optional map views for key locations.',
        'Built for pilgrims, not tourists: clear structure, no clutter, and support for English, Urdu, Arabic, and more. Switch between Umrah and Hajj modes when your journey calls for it.',
      ],
      closingTagline: 'Know where you are. Remember what to say. Count what matters.',
      features: [
        'Stage-by-stage duas with read-progress',
        'Ṭawāf, saʿī, and tasbeeh counters',
        'Illustrated route map with key locations',
        'Umrah and Hajj modes, multi-language',
      ],
      status: 'beta',
      appStoreUrl: '#',
      playStoreUrl: '#',
      apkFilename: 'tazkirah-v01.apk',
    },
    misbaha: {
      name: 'Misbaha',
      tagline: 'A digital tasbīḥ with intention',
      description:
        'Count dhikr with haptic feedback, presets for common adhkār, and a screen that stays dim for night remembrance.',
      features: [
        'Preset adhkār collections',
        'Custom counters and targets',
        'Haptic tap feedback',
        'Night-friendly display',
      ],
      status: 'beta',
      appStoreUrl: '#',
      playStoreUrl: '#',
      apkFilename: 'misbaha-v01.apk',
    },
    mehrab: {
      name: 'Mehrab',
      tagline: 'Prayer times and qibla',
      description:
        'Accurate prayer times, a clear qibla compass, and a minimal home for the moments before you stand — currently in active development.',
      features: [
        'Location-based prayer times',
        'Qibla compass',
        'Clean pre-prayer focus',
        'Works offline where possible',
      ],
      status: 'development',
    },
  },
  sideload: {
    title: 'Install the beta on Android',
    intro:
      'Because the app is in beta, you can install it directly on your phone. Follow these steps carefully.',
    steps: [
      {
        title: 'Download the APK',
        body: 'Tap the download button above and save the file when prompted.',
      },
      {
        title: 'Allow installation from this browser',
        body: 'When asked, allow your browser or Files app to install unknown apps for this source only.',
      },
      {
        title: 'Open the APK',
        body: 'Open your Downloads folder, tap the APK file, and confirm Install.',
      },
      {
        title: 'Launch the app',
        body: 'Once installed, open the app from your home screen. You can delete the APK file afterward.',
      },
    ],
    note:
      'Only install APKs from zikrapps.com. If your phone warns about unknown sources, that is expected for sideloading — you are choosing to trust this download.',
  },
  contact: {
    title: 'Contact us',
    subtitle: 'Questions, feedback, or beta issues — we read every message.',
    name: 'Your name',
    email: 'Email address',
    app: 'Which app?',
    appOptions: [
      { value: 'general', label: 'General' },
      { value: 'tazkirah', label: 'Tazkirah' },
      { value: 'misbaha', label: 'Misbaha' },
      { value: 'mehrab', label: 'Mehrab' },
    ],
    message: 'Your message',
    submit: 'Send feedback',
    submitting: 'Sending…',
    success: 'Thank you — your message has been sent.',
    error:
      'Something went wrong. Please try again, or email salam@zikrapps.com directly.',
    privacy: 'We use your email only to reply. No mailing lists.',
    disclaimer: {
      title: 'A note on authenticity',
      body: 'The adhkar, duas and supplications included in our apps are drawn from well-known compilations, but human compilation is never beyond error. Please verify the authenticity of any zikr, dua or hadith with respected scholars and authoritative sources before relying on it. If you spot a mistake, we welcome corrections — write to us using the form below.',
    },
  },
  privacy,
  copyright,
  footer: {
    tagline: 'Built with care for those who remember.',
    rights: '© 2026 Zikr Apps. All rights reserved.',
    disclaimer:
      'The authenticity of adhkar and duas should always be verified with respected scholars and authoritative sources.',
  },
};

export default en;
