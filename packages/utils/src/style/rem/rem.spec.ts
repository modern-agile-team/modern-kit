import {
  describe,
  it,
  expect,
  vi,
  MockInstance,
  beforeEach,
  afterEach,
} from 'vitest';
import { rem } from '.';

const originWindow = globalThis.window;
let getComputedStyleSpy: MockInstance;

beforeEach(() => {
  getComputedStyleSpy = vi.spyOn(window, 'getComputedStyle');
  getComputedStyleSpy.mockReturnValue({ fontSize: '16px' });
});

afterEach(() => {
  globalThis.window = originWindow;
  getComputedStyleSpy.mockRestore();
});

describe('rem', () => {
  it('옵션 없이 픽셀을 rem으로 변환해야 한다. (루트 폰트 크기: 16px)', () => {
    expect(rem(16)).toBe('1rem');
    expect(rem(20)).toBe('1.25rem');
    expect(rem(32)).toBe('2rem');
    expect(rem(32)).toBe('2rem'); // cached
  });

  it('옵션 없이 픽셀을 rem으로 변환해야 한다. (루트 폰트 크기: 24px)', () => {
    getComputedStyleSpy.mockReturnValue({ fontSize: '24px' });

    expect(rem(24)).toBe('1rem');
    expect(rem(30)).toBe('1.25rem');
    expect(rem(36)).toBe('1.5rem');
  });

  it('픽셀을 rem으로 변환하고 "rem" 접미사를 제거해야 한다. (루트 폰트 크기: 16px)', () => {
    expect(rem(16, { suffix: false })).toBe(1);
    expect(rem(24, { suffix: false })).toBe(1.5);
    expect(rem(32, { suffix: false })).toBe(2);
  });

  it('픽셀을 rem으로 변환하고 소수점 자릿수를 고정해야 한다. (루트 폰트 크기: 16px)', () => {
    expect(rem(17)).toBe('1.0625rem');

    expect(rem(17, { toFixedDigits: NaN })).toBe('1rem');
    expect(rem(17, { toFixedDigits: 0 })).toBe('1rem');
    expect(rem(17, { toFixedDigits: 1 })).toBe('1.1rem');
    expect(rem(17, { toFixedDigits: 2 })).toBe('1.06rem');
    expect(rem(17, { toFixedDigits: 3 })).toBe('1.063rem');
    expect(rem(17, { toFixedDigits: 4 })).toBe('1.0625rem');
    expect(rem(17, { toFixedDigits: 10 })).toBe('1.0625rem');
  });

  it('toFixedDigits가 범위를 벗어나면 에러를 발생시켜야 한다.', () => {
    expect(() => rem(16, { toFixedDigits: -1 })).toThrowError();
    expect(() => rem(16, { toFixedDigits: 101 })).toThrowError();
  });

  it('클라이언트 환경이 아닐 경우 에러를 발생시켜야 한다.', () => {
    globalThis.window = undefined as any;

    expect(() => rem(16)).toThrowError();
  });
});
