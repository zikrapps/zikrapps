import { describe, expect, it, vi } from 'vitest';
import { onRequest } from '../src/middleware';

describe('middleware', () => {
  it('redirects non-root tech subdomain paths to zikrapps.com', async () => {
    const redirect = vi.fn((url: string) => new Response(null, { status: 301, headers: { Location: url } }));
    const next = vi.fn();

    await onRequest(
      {
        url: new URL('https://tech.zikrapps.com/apps/tazkirah'),
        redirect,
      } as never,
      next,
    );

    expect(redirect).toHaveBeenCalledWith('https://zikrapps.com/apps/tazkirah', 301);
    expect(next).not.toHaveBeenCalled();
  });

  it('rewrites tech.zikrapps.com root requests to /tech', async () => {
    const rewrite = vi.fn();
    const next = vi.fn();

    await onRequest(
      {
        url: new URL('https://tech.zikrapps.com/'),
        rewrite,
      } as never,
      next,
    );

    expect(rewrite).toHaveBeenCalledWith('/tech');
    expect(next).not.toHaveBeenCalled();
  });

  it('passes through the main site without tech subdomain redirects', async () => {
    const redirect = vi.fn();
    const rewrite = vi.fn();
    const next = vi.fn().mockResolvedValue(new Response('ok'));

    await onRequest(
      {
        url: new URL('https://zikrapps.com/tech'),
        redirect,
        rewrite,
      } as never,
      next,
    );
    expect(redirect).not.toHaveBeenCalled();
    expect(rewrite).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it('redirects deeper tech subdomain paths to the main site', async () => {
    const redirect = vi.fn((url: string) => new Response(null, { status: 301, headers: { Location: url } }));
    const next = vi.fn();

    await onRequest(
      {
        url: new URL('https://tech.zikrapps.com/privacy'),
        redirect,
      } as never,
      next,
    );
    expect(redirect).toHaveBeenCalledWith('https://zikrapps.com/privacy', 301);
    expect(next).not.toHaveBeenCalled();
  });
});
