import { getViewportSize } from '.';

let windowSpy: jest.SpyInstance;

beforeEach(() => {
  windowSpy = jest.spyOn(window, 'window', 'get');
});

afterEach(() => {
  windowSpy.mockRestore();
});

describe('getViewportSize', () => {
  // https://github.com/jsdom/jsdom/blob/0cba358253fd5530af0685ac48c2535992464d06/lib/jsdom/browser/Window.js#L587-L588
  it('should return the default width 1024 and height 768 for jsdom', () => {
    const { width, height } = getViewportSize();

    expect(window.innerWidth).toBe(1024);
    expect(window.innerHeight).toBe(768);

    expect(width).toBe(1024);
    expect(height).toBe(768);
  });

  it('should return width 500 and height 300', () => {
    windowSpy.mockImplementation(() => ({
      innerWidth: 500,
      innerHeight: 300,
    }));

    const { width, height } = getViewportSize();

    expect(window.innerWidth).toBe(500);
    expect(window.innerHeight).toBe(300);

    expect(width).toBe(500);
    expect(height).toBe(300);
  });

  it('should return width 0 and height 0 if window is undefined', () => {
    windowSpy.mockImplementation(() => undefined);

    const { width, height } = getViewportSize();

    expect(window).toBeUndefined();

    expect(width).toBe(0);
    expect(height).toBe(0);
  });
});
