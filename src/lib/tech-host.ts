export const TECH_SUBDOMAIN = 'tech.zikrapps.com';
export const MAIN_SITE_ORIGIN = 'https://zikrapps.com';

export function isTechSubdomain(hostname: string): boolean {
  return hostname.toLowerCase() === TECH_SUBDOMAIN;
}

export function isTechSubdomainRoot(pathname: string): boolean {
  return pathname === '/' || pathname === '';
}

/** Returns `/tech` when the tech subdomain root should serve the write-up; otherwise null. */
export function techSubdomainRewrite(hostname: string, pathname: string): '/tech' | null {
  if (!isTechSubdomain(hostname)) return null;
  if (isTechSubdomainRoot(pathname)) return '/tech';
  return null;
}

/** Redirect non-root tech subdomain URLs to the same path on zikrapps.com. */
export function techSubdomainRedirectTarget(url: URL): string | null {
  if (!isTechSubdomain(url.hostname)) return null;
  if (isTechSubdomainRoot(url.pathname)) return null;
  return new URL(`${url.pathname}${url.search}`, MAIN_SITE_ORIGIN).href;
}

/** Rewrites tech subdomain root requests before Astro serves prerendered /index.html. */
export function applyTechSubdomainRequest(request: Request): Request {
  const url = new URL(request.url);
  const rewritePath = techSubdomainRewrite(url.hostname, url.pathname);
  if (!rewritePath) return request;
  url.pathname = rewritePath;
  return new Request(url, request);
}
