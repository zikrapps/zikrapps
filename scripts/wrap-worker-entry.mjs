import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const outDir = join(dirname(fileURLToPath(import.meta.url)), '../dist/server');

writeFileSync(
  join(outDir, 'worker-entry.mjs'),
  `import astro from './entry.mjs';

const TECH_SUBDOMAIN = 'tech.zikrapps.com';

function isTechSubdomainRoot(url) {
  return (
    url.hostname.toLowerCase() === TECH_SUBDOMAIN &&
    (url.pathname === '/' || url.pathname === '')
  );
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Serve the prerendered /tech page directly. Cloudflare can return /index.html
    // for / before the Astro handler runs, so do not rely on middleware rewrite alone.
    if (isTechSubdomainRoot(url)) {
      url.pathname = '/tech/index.html';
      return env.ASSETS.fetch(new Request(url, request));
    }

    return astro.fetch(request, env, ctx);
  },
};
`,
);
