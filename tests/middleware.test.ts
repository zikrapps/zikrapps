import { describe, expect, it, vi } from 'vitest';
import { onRequest } from '../src/middleware';

describe('middleware', () => {
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

  it('passes through other hosts and deeper tech subdomain paths', async () => {
    const rewrite = vi.fn();
    const next = vi.fn().mockResolvedValue(new Response('ok'));

    await onRequest(
      {
        url: new URL('https://zikrapps.com/tech'),
        rewrite,
      } as never,
      next,
    );
    expect(rewrite).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();

    rewrite.mockClear();
    next.mockClear();

    await onRequest(
      {
        url: new URL('https://tech.zikrapps.com/privacy'),
        rewrite,
      } as never,
      next,
    );
    expect(rewrite).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});
