import { describe, it, expect, vi, afterEach } from 'vitest';
import { isMobile } from '.';

// node 환경에는 window 가 없으므로, 테스트마다 window 를 주입(stubGlobal)해 클라이언트/서버 환경을 흉내냅니다.
afterEach(() => {
  vi.unstubAllGlobals();
});

describe('isMobile', () => {
  it('모바일 User Agent에 대해 true를 반환해야 한다', () => {
    // [iPhone, iPad, iPod, Android, Windows Phone, BlackBerry, IEMobile, Opera Mini]
    const USER_AGENTS = [
      'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)',
      'Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X)',
      'Mozilla/5.0 (iPod touch; CPU iPhone OS 14_0 like Mac OS X)',
      'Mozilla/5.0 (Linux; Android 11; Pixel 5)',
      'Mozilla/5.0 (Windows Phone 10.0; Android 6.0.1; Xbox; Xbox One)',
      'Mozilla/5.0 (BlackBerry; U; BlackBerry 9800; en)',
      'Mozilla/4.0 (compatible; MSIE 6.0; Windows CE; IEMobile 7.11)',
      'Opera/9.80 (J2ME/MIDP; Opera Mini/7.1.32052/1724; U; en)',
    ];

    USER_AGENTS.forEach((value) => {
      vi.stubGlobal('window', {
        navigator: {
          userAgent: value,
        },
      });

      expect(isMobile()).toBe(true);
    });
  });

  it('서버 환경에서는 false를 반환해야 한다', () => {
    vi.stubGlobal('window', undefined);
    expect(isMobile()).toBe(false);
  });
});
