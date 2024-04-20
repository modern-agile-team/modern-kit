import {
  describe,
  expect,
  it,
  vi,
  beforeEach,
  afterEach,
  MockInstance,
} from 'vitest';
import { getOS } from '.';

let windowSpy: MockInstance;

beforeEach(() => {
  windowSpy = vi.spyOn(window, 'window', 'get');
});

afterEach(() => {
  windowSpy.mockRestore();
});

describe('getOS', () => {
  it('should return the OS corresponding to the useragent value', () => {
    const USER_AGENTS_OBJ = {
      ios: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)',
      android: 'Mozilla/5.0 (Linux; Android 11; Pixel 5)',
      web: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      otherMobile: 'Mozilla/5.0 (BlackBerry; U; BlackBerry 9800; en)',
    };

    Object.entries(USER_AGENTS_OBJ).forEach(([key, value]) => {
      windowSpy.mockImplementation(() => {
        return {
          navigator: {
            userAgent: value,
          },
        };
      });

      expect(getOS()).toBe(key);
    });
  });

  it('should return "server" for server environment', () => {
    windowSpy.mockImplementation(() => undefined);
    expect(getOS()).toBe('server');
  });
});
