import { MockInstance } from 'vitest';
import { isServer } from '.';

let windowSpy: MockInstance;

beforeEach(() => {
  windowSpy = vi.spyOn(window, 'window', 'get');
});

afterEach(() => {
  windowSpy.mockRestore();
});

describe('isServer', () => {
  it('should return "false" in client environment', () => {
    windowSpy.mockImplementation(() => ({}));

    expect(isServer()).toBe(false);
  });

  it('should return "true" in server environment', () => {
    windowSpy.mockImplementation(() => undefined);

    expect(isServer()).toBe(true);
  });
});
