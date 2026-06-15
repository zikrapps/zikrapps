import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const outDir = join(dirname(fileURLToPath(import.meta.url)), '../dist/server');

writeFileSync(
  join(outDir, 'worker-entry.mjs'),
  `import astro from './entry.mjs';

const TECH_SUBDOMAIN = 'tech.zikrapps.com';

function applyTechSubdomainRequest(request) {
  const url = new URL(request.url);
  if (url.hostname.toLowerCase() !== TECH_SUBDOMAIN) return request;
  if (url.pathname !== '/' && url.pathname !== '') return request;
  url.pathname = '/tech';
  return new Request(url, request);
}

export default {
  fetch(request, env, ctx) {
    return astro.fetch(applyTechSubdomainRequest(request), env, ctx);
  },
};
`,
);
