import { defineMiddleware } from 'astro:middleware';
import { techSubdomainRewrite } from './lib/tech-host';

// Serve the hidden engineering write-up on the tech.zikrapps.com subdomain.
// Production: src/worker-entry.ts rewrites the request URL before Astro serves
// prerendered /index.html (middleware alone cannot intercept static asset hits).
// Dev: this middleware rewrite still applies when previewing with the tech host.
export const onRequest = defineMiddleware((context, next) => {
  const rewritePath = techSubdomainRewrite(context.url.hostname, context.url.pathname);
  if (rewritePath) return context.rewrite(rewritePath);
  return next();
});
