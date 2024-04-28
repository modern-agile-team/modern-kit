import { useEffect, useLayoutEffect } from 'react';

describe('useIsomorphicLayoutEffect', () => {
  const originWindow = global.window;

  afterEach(() => {
    vi.resetModules();
  });

  it('should be useEffect in server environment', async () => {
    Object.defineProperty(global, 'window', {
      value: undefined,
    });

    const { useIsomorphicLayoutEffect } = await import('.');
    expect(useIsomorphicLayoutEffect).toEqual(useEffect);
  });

  it('should be useLayoutEffect in client environment', async () => {
    Object.defineProperty(global, 'window', {
      value: originWindow,
    });

    const { useIsomorphicLayoutEffect } = await import('.');
    expect(useIsomorphicLayoutEffect).toEqual(useLayoutEffect);
  });
});
