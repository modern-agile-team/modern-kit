import { describe, it, expect, vi, afterEach } from 'vitest';
import { isClient } from '.';

// node 환경에는 window 가 없으므로, 테스트마다 window 를 주입(stubGlobal)해 클라이언트/서버 환경을 흉내냅니다.
afterEach(() => {
  vi.unstubAllGlobals();
});

describe('isClient', () => {
  it('클라이언트 환경에서는 true를 반환해야 한다', () => {
    vi.stubGlobal('window', {});
    expect(isClient()).toBeTruthy();
  });

  it('서버 환경에서는 false를 반환해야 한다', () => {
    vi.stubGlobal('window', undefined);

    expect(isClient()).toBeFalsy();
  });
});
