import { describe, it, expect, vi, afterEach } from 'vitest';
import { getViewportSize } from '.';

// node 환경에는 window 가 없으므로, 테스트마다 window 를 주입(stubGlobal)해 클라이언트/서버 환경을 흉내냅니다.
afterEach(() => {
  vi.unstubAllGlobals();
});

describe('getViewportSize', () => {
  it('width 500과 height 300을 반환해야 합니다.', () => {
    vi.stubGlobal('window', {
      innerWidth: 500,
      innerHeight: 300,
    });

    const { width, height } = getViewportSize();

    expect(window.innerWidth).toBe(500);
    expect(window.innerHeight).toBe(300);

    expect(width).toBe(500);
    expect(height).toBe(300);
  });

  it('window가 정의되지 않은 경우 width 0과 height 0을 반환해야 합니다.', () => {
    vi.stubGlobal('window', undefined);

    const { width, height } = getViewportSize();

    expect(window).toBeUndefined();

    expect(width).toBe(0);
    expect(height).toBe(0);
  });
});
