import {
  describe,
  it,
  expect,
  vi,
  MockInstance,
  beforeEach,
  afterEach,
} from 'vitest';
import { getSafeWindow } from '.';

let windowSpy: MockInstance;

beforeEach(() => {
  windowSpy = vi.spyOn(window, 'window', 'get');
});

afterEach(() => {
  windowSpy.mockRestore();
});

describe('getSafeWindow', () => {
  it('클라이언트 환경에서는 window 객체를 반환해야 한다', () => {
    const mockWindow = { document: {}, location: {} } as Window;
    windowSpy.mockImplementation(() => mockWindow);

    const result = getSafeWindow();
    expect(result).toBe(mockWindow);
  });

  it('서버 환경에서는 에러를 던져야 한다', () => {
    windowSpy.mockImplementation(() => undefined);

    expect(() => getSafeWindow()).toThrow('서버 환경에서는 window 객체를 가져올 수 없습니다.');
  });
});