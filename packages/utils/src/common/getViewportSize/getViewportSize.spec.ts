import {
  describe,
  it,
  expect,
  vi,
  MockInstance,
  beforeEach,
  afterEach,
} from 'vitest';
import { getViewportSize } from '.';

let windowSpy: MockInstance;

beforeEach(() => {
  windowSpy = vi.spyOn(window, 'window', 'get');
});

afterEach(() => {
  windowSpy.mockRestore();
});

describe('getViewportSize', () => {
  it('width 500과 height 300을 반환해야 합니다.', () => {
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

  it('window가 정의되지 않은 경우 width 0과 height 0을 반환해야 합니다.', () => {
    windowSpy.mockImplementation(() => undefined);

    const { width, height } = getViewportSize();

    expect(window).toBeUndefined();

    expect(width).toBe(0);
    expect(height).toBe(0);
  });
});
