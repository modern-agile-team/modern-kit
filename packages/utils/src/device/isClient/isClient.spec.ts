import {
  describe,
  it,
  expect,
  vi,
  MockInstance,
  beforeEach,
  afterEach,
} from 'vitest';
import { isClient } from '.';

let windowSpy: MockInstance;

beforeEach(() => {
  windowSpy = vi.spyOn(window, 'window', 'get');
});

afterEach(() => {
  windowSpy.mockRestore();
});

describe('isClient', () => {
  it('should return "true" in client environment', () => {
    windowSpy.mockImplementation(() => ({}));
    expect(isClient()).toBe(true);
  });

  it('should return "false" in server environment', () => {
    windowSpy.mockImplementation(() => undefined);

    expect(isClient()).toBe(false);
  });
});
