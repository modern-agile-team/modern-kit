import { useEffect } from 'react';

describe('useIsomorphicLayoutEffect in server', () => {
  it('should return useEffect in server environment', async () => {
    Object.defineProperty(global, 'window', {
      value: undefined,
    });

    const { useIsomorphicLayoutEffect: effect } = await import('.');
    expect(effect).toEqual(useEffect);
  });
});
