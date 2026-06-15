import { defineMiddleware } from 'astro:middleware';
import { techSubdomainRedirectTarget, techSubdomainRewrite } from './lib/tech-host';

// Serve the hidden engineering write-up on the tech.zikrapps.com subdomain root only.
// Production routing lives in dist/server/worker-entry.mjs (see scripts/wrap-worker-entry.mjs).
export const onRequest = defineMiddleware((context, next) => {
  const redirectTarget = techSubdomainRedirectTarget(context.url);
  if (redirectTarget) return context.redirect(redirectTarget, 301);

  const rewritePath = techSubdomainRewrite(context.url.hostname, context.url.pathname);
  if (rewritePath) return context.rewrite(rewritePath);
  return next();
});
