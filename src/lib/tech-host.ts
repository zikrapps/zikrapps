export const TECH_SUBDOMAIN = 'tech.zikrapps.com';

/** Returns `/tech` when the tech subdomain root should serve the write-up; otherwise null. */
export function techSubdomainRewrite(hostname: string, pathname: string): '/tech' | null {
  if (hostname.toLowerCase() !== TECH_SUBDOMAIN) return null;
  if (pathname === '/' || pathname === '') return '/tech';
  return null;
}
