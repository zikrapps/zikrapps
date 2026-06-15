import { defineMiddleware } from 'astro:middleware';
import { techSubdomainRewrite } from './lib/tech-host';

// Serve the hidden engineering write-up on the tech.zikrapps.com subdomain.
// Requests to the root of that host are rewritten to the /tech route, which is
// otherwise unlinked from any site navigation. On the main site (or localhost)
// /tech remains directly reachable for previewing.
export const onRequest = defineMiddleware((context, next) => {
  const rewritePath = techSubdomainRewrite(context.url.hostname, context.url.pathname);
  if (rewritePath) return context.rewrite(rewritePath);
  return next();
});
