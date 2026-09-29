import { describe, it, expect, vi, afterEach } from 'vitest';
import { getSafeWindow } from '.';

// node 환경에는 window 가 없으므로, 테스트마다 window 를 주입(stubGlobal)해 클라이언트/서버 환경을 흉내냅니다.
afterEach(() => {
  vi.unstubAllGlobals();
});

describe('getSafeWindow', () => {
  it('클라이언트 환경에서는 window 객체를 반환해야 한다', () => {
    const mockWindow = { document: {}, location: {} } as Window;
    vi.stubGlobal('window', mockWindow);

    const result = getSafeWindow();
    expect(result).toBe(mockWindow);
  });

  it('서버 환경에서는 에러를 던져야 한다', () => {
    vi.stubGlobal('window', undefined);

    expect(() => getSafeWindow()).toThrow(
      '서버 환경에서는 window 객체를 가져올 수 없습니다.'
    );
  });
});
