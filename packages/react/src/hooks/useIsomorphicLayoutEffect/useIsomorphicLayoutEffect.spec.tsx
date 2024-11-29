import { describe, it, expect, afterEach, vi } from 'vitest';
import { useEffect, useLayoutEffect } from 'react';

describe('useIsomorphicLayoutEffect', () => {
  const originWindow = global.window;

  afterEach(() => {
    vi.resetModules();
  });

  it('서버 환경에서는 useEffect를 사용해야 합니다', async () => {
    Object.defineProperty(global, 'window', {
      value: undefined,
    });

    const { useIsomorphicLayoutEffect } = await import('.');
    expect(useIsomorphicLayoutEffect).toEqual(useEffect);
  });

  it('클라이언트 환경에서는 useLayoutEffect를 사용해야 합니다', async () => {
    Object.defineProperty(global, 'window', {
      value: originWindow,
    });

    const { useIsomorphicLayoutEffect } = await import('.');
    expect(useIsomorphicLayoutEffect).toEqual(useLayoutEffect);
  });
});
