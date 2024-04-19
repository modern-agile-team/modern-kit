import { isClient } from '.';

let windowSpy: jest.SpyInstance;

beforeEach(() => {
  windowSpy = jest.spyOn(window, 'window', 'get');
});

afterEach(() => {
  windowSpy.mockRestore();
});

describe('isClient', () => {
  it('should return "true" in client environment', () => {
    expect(isClient()).toBe(true);
  });

  it('should return "false" in server environment', () => {
    windowSpy.mockImplementation(() => undefined);

    expect(isClient()).toBe(false);
  });
});
