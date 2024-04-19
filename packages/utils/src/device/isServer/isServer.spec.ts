import { isServer } from '.';

let windowSpy: jest.SpyInstance;

beforeEach(() => {
  windowSpy = jest.spyOn(window, 'window', 'get');
});

afterEach(() => {
  windowSpy.mockRestore();
});

describe('isServer', () => {
  it('should return "false" in client environment', () => {
    expect(isServer()).toBe(false);
  });

  it('should return "true" in client environment', () => {
    windowSpy.mockImplementation(() => undefined);

    expect(isServer()).toBe(true);
  });
});
