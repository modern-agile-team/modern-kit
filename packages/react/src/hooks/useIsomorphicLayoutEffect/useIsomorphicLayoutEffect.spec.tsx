import { describe, it, expect, afterEach, vi } from 'vitest';

// 모듈 평가 시점에 환경을 판단하므로, 매 테스트마다 모듈을 새로 불러옵니다.
// 비교 대상인 react 도 같은 모듈 레지스트리에서 불러와야 동일한 인스턴스가 보장됩니다.
const importModules = async () => {
  const [{ useIsomorphicLayoutEffect }, react] = await Promise.all([
    import('.'),
    import('react'),
  ]);

  return { useIsomorphicLayoutEffect, react };
};

describe('useIsomorphicLayoutEffect', () => {
  afterEach(() => {
    vi.doUnmock('@modern-kit/utils');
    vi.resetModules();
  });

  it('서버 환경에서는 useEffect를 사용해야 합니다', async () => {
    // `window` 는 DOM 환경·pool 에 따라 재정의할 수 없으므로, 환경 판별 함수를 모킹합니다.
    vi.doMock('@modern-kit/utils', async (importOriginal) => ({
      ...(await importOriginal<typeof import('@modern-kit/utils')>()),
      isClient: () => false,
    }));

    const { useIsomorphicLayoutEffect, react } = await importModules();

    expect(useIsomorphicLayoutEffect).toBe(react.useEffect);
  });

  it('클라이언트 환경에서는 useLayoutEffect를 사용해야 합니다', async () => {
    const { useIsomorphicLayoutEffect, react } = await importModules();

    expect(useIsomorphicLayoutEffect).toBe(react.useLayoutEffect);
  });
});
