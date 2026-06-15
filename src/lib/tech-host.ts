export const TECH_SUBDOMAIN = 'tech.zikrapps.com';

/** Returns `/tech` when the tech subdomain root should serve the write-up; otherwise null. */
export function techSubdomainRewrite(hostname: string, pathname: string): '/tech' | null {
  if (hostname.toLowerCase() !== TECH_SUBDOMAIN) return null;
  if (pathname === '/' || pathname === '') return '/tech';
  return null;
}

/** Rewrites tech subdomain root requests before Astro serves prerendered /index.html. */
export function applyTechSubdomainRequest(request: Request): Request {
  const url = new URL(request.url);
  const rewritePath = techSubdomainRewrite(url.hostname, url.pathname);
  if (!rewritePath) return request;
  url.pathname = rewritePath;
  return new Request(url, request);
}
