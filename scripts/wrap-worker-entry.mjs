import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const outDir = join(dirname(fileURLToPath(import.meta.url)), '../dist/server');

// Keep in sync with src/lib/tech-host.ts
writeFileSync(
  join(outDir, 'worker-entry.mjs'),
  `import astro from './entry.mjs';

const TECH_SUBDOMAIN = 'tech.zikrapps.com';
const MAIN_SITE_ORIGIN = 'https://zikrapps.com';

function isTechSubdomainRoot(url) {
  return (
    url.hostname.toLowerCase() === TECH_SUBDOMAIN &&
    (url.pathname === '/' || url.pathname === '')
  );
}

function techSubdomainRedirectTarget(url) {
  if (url.hostname.toLowerCase() !== TECH_SUBDOMAIN) return null;
  if (isTechSubdomainRoot(url)) return null;
  return new URL(\`\${url.pathname}\${url.search}\`, MAIN_SITE_ORIGIN).href;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const redirectTarget = techSubdomainRedirectTarget(url);
    if (redirectTarget) {
      return Response.redirect(redirectTarget, 301);
    }

    if (isTechSubdomainRoot(url)) {
      url.pathname = '/tech/index.html';
      return env.ASSETS.fetch(new Request(url, request));
    }

    return astro.fetch(request, env, ctx);
  },
};
`,
);
