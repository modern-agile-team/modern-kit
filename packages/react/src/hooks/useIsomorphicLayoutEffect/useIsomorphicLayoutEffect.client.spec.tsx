import { useEffect, useLayoutEffect } from 'react';

describe('useIsomorphicLayoutEffect', () => {
  it('should return useLayoutEffect in client environment', async () => {
    const { useIsomorphicLayoutEffect } = await import('.');
    expect(useIsomorphicLayoutEffect).toEqual(useLayoutEffect);
  });
});
