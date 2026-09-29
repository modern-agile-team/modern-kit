import { describe, it, expect, vi, afterEach } from 'vitest';
import { getOS } from '.';

// node 환경에는 window 가 없으므로, 테스트마다 window 를 주입(stubGlobal)해 클라이언트/서버 환경을 흉내냅니다.
afterEach(() => {
  vi.unstubAllGlobals();
});

describe('getOS', () => {
  it('User Agent 값에 해당하는 OS를 반환해야 한다', () => {
    const USER_AGENTS_OBJ = {
      ios: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)',
      android: 'Mozilla/5.0 (Linux; Android 11; Pixel 5)',
      web: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      otherMobile: 'Mozilla/5.0 (BlackBerry; U; BlackBerry 9800; en)',
    };

    Object.entries(USER_AGENTS_OBJ).forEach(([key, value]) => {
      vi.stubGlobal('window', {
        navigator: {
          userAgent: value,
        },
      });

      expect(getOS()).toBe(key);
    });
  });

  it('서버 환경에서는 "server"를 반환해야 한다', () => {
    vi.stubGlobal('window', undefined);
    expect(getOS()).toBe('server');
  });
});
