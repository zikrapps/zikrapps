import type { PrivacyContent } from '../types';

const en: PrivacyContent = {
  title: 'Privacy policy',
  subtitle: 'How Zikr Apps handles information across our website and mobile apps.',
  effectiveDate: 'Last updated: 19 May 2026',
  tableOfContents: 'On this page',
  sections: [
    {
      id: 'overview',
      title: 'Overview',
      paragraphs: [
        'Zikr Apps (“we”, “us”) publishes the website zikrapps.com and the mobile apps Tazkirah, Misbaha, and Mehrab. This policy describes what information each product processes, where it is stored, and which third parties may be involved.',
        'Our apps are built to work without accounts, without third-party advertising SDKs, and without selling your personal data. Details differ by app; the sections below spell out each one.',
      ],
    },
    {
      id: 'website',
      title: 'zikrapps.com (this website)',
      paragraphs: [
        'If you use the contact form, we receive the fields you submit: your name, email address, which app you are writing about, and your message. Submissions are delivered to us through Formspree so we can reply. We use that information only to respond to you — not for mailing lists or unrelated marketing.',
        'The site may use privacy-preserving, aggregate analytics (for example Cloudflare Web Analytics) to understand traffic in general. We do not use cross-site advertising trackers on this website.',
      ],
    },
    {
      id: 'tazkirah',
      title: 'Tazkirah (Umrah & Hajj companion)',
      paragraphs: [
        'Tazkirah is designed to work offline-first. Journey progress, dua read-marks, ṭawāf and saʿī counters, language, and theme preferences are stored only on your device (AsyncStorage). We do not operate a sign-in service, and the app does not send your progress to Zikr Apps servers.',
        'The app does not include analytics or advertising SDKs. If you choose to send feedback, your device opens your email app with a message addressed to salam@zikrapps.com — we only receive what you send.',
      ],
      bullets: [
        'Optional map on iOS may load map tiles from Apple MapKit when you open it; the app does not request location permission for this.',
        'On Android, route maps use bundled images — no live map tile downloads at runtime.',
        'When you tap Qurʾān or hadith references, the app opens quran.com or sunnah.com in an in-app browser. Those sites have their own privacy practices.',
      ],
    },
    {
      id: 'misbaha',
      title: 'Misbaha (tasbīḥ & adhkār counter)',
      paragraphs: [
        'Misbaha stores your dhikr counts, goals, recent count events (up to a limited history on device), and settings such as language, theme, tap weight, haptics, and click sound — all locally via AsyncStorage. Counts stay on your phone unless you choose to export or share them.',
        'There is no account system, no Zikr Apps backend, and no in-app analytics SDK.',
      ],
      bullets: [
        'PDF export creates a file on your device and opens the system share sheet; you decide where it goes.',
        'Reference links may open quran.com or sunnah.com in the browser when you tap them.',
        'Support from Settings opens your email app to salam@zikrapps.com.',
        'The app does not use the microphone (audio playback only for optional tap sounds).',
      ],
    },
    {
      id: 'mehrab',
      title: 'Mehrab (prayer times & qibla)',
      paragraphs: [
        'Mehrab uses your location — from GPS when you allow it, or from a place you search or enter — to compute prayer times and qibla direction on your device. Calculations use established prayer-time formulas locally; we do not rely on a proprietary prayer-time API.',
        'We do not run user accounts or analytics SDKs in Mehrab, and we do not send your coordinates to Zikr Apps servers.',
      ],
      bullets: [
        'Reverse geocoding and place search use OpenStreetMap Nominatim (nominatim.openstreetmap.org). Requests include coordinates or search text so a place name can be shown. See the OpenStreetMap Foundation usage policies for how they handle queries.',
        'Country flags in the UI may load small images from flagcdn.com using an ISO country code only.',
        'On iOS, widgets and Live Activities may read a summary of prayer names and times shared through the app group on your device. That payload is prepared for display and does not include your raw GPS coordinates.',
        'If you enable prayer notifications, alerts are scheduled locally on your device.',
        'Most in-app settings are held in memory and are not written to long-term storage when you close the app, aside from what is needed for widgets as described above.',
      ],
    },
    {
      id: 'sharing',
      title: 'Sharing and retention',
      paragraphs: [
        'We do not sell or rent your personal information. We do not share in-app usage data with advertisers.',
        'We retain contact-form messages only as long as needed to handle your inquiry in our email inbox. App data on your device remains until you uninstall the app or clear its storage.',
      ],
    },
    {
      id: 'children',
      title: 'Children',
      paragraphs: [
        'Our apps and website are not directed at children under 13, and we do not knowingly collect personal information from children.',
      ],
    },
    {
      id: 'changes',
      title: 'Changes to this policy',
      paragraphs: [
        'We may update this page when our products or legal requirements change. The “Last updated” date at the top will change when we do. Continued use of our apps or website after an update means you accept the revised policy.',
      ],
    },
    {
      id: 'contact',
      title: 'Contact',
      paragraphs: [
        'Questions about privacy for any Zikr Apps product:',
        'Email: salam@zikrapps.com',
        'Website: https://zikrapps.com',
      ],
    },
  ],
};

export default en;
