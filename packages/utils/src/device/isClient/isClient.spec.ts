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
  it('클라이언트 환경에서는 true를 반환해야 한다', () => {
    windowSpy.mockImplementation(() => ({}));
    expect(isClient()).toBeTruthy();
  });

  it('서버 환경에서는 false를 반환해야 한다', () => {
    windowSpy.mockImplementation(() => undefined);

    expect(isClient()).toBeFalsy();
  });
});
