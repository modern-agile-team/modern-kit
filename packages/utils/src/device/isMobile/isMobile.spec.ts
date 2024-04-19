import { isMobile } from '.';

let windowSpy: jest.SpyInstance;

beforeEach(() => {
  windowSpy = jest.spyOn(window, 'window', 'get');
});

afterEach(() => {
  windowSpy.mockRestore();
});

describe('isMobile', () => {
  it('should return true for mobile user agents', () => {
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
      Object.defineProperty(window.navigator, 'userAgent', {
        value,
        configurable: true,
      });

      expect(isMobile()).toBe(true);
    });
  });

  it('should return false for server environment', () => {
    windowSpy.mockImplementation(() => undefined);
    expect(isMobile()).toBe(false);
  });
});
