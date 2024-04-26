import { MockInstance } from 'vitest';
import { getViewportSize } from '.';

let windowSpy: MockInstance;

beforeEach(() => {
  windowSpy = vi.spyOn(window, 'window', 'get');
});

afterEach(() => {
  windowSpy.mockRestore();
});

describe('getViewportSize', () => {
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
