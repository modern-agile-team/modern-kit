import { MockInstance } from 'vitest';
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
  it('should convert pixels to rem without any options. (Root FontSize: 16px)', () => {
    expect(rem(16)).toBe(1);
    expect(rem(24)).toBe(1.5);
    expect(rem(32)).toBe(2);
  });

  it('should convert pixels to rem without any options. (Root FontSize: 24px)', () => {
    getComputedStyleSpy.mockReturnValue({ fontSize: '24px' });

    expect(rem(24)).toBe(1);
    expect(rem(30)).toBe(1.25);
    expect(rem(36)).toBe(1.5);
  });

  it('should convert pixels to rem and add "rem" suffix. (Root FontSize: 16px)', () => {
    expect(rem(16, { suffix: true })).toBe('1rem');
    expect(rem(24, { suffix: true })).toBe('1.5rem');
    expect(rem(32, { suffix: true })).toBe('2rem');
  });

  it('should convert pixels to rem with fixed decimal places. (Root FontSize: 16px)', () => {
    expect(rem(17)).toBe(1.0625);

    expect(rem(17, { toFixedDigits: 0 })).toBe(1); // toFixed Default behavior
    expect(rem(17, { toFixedDigits: NaN })).toBe(1); // toFixed Default behavior
    expect(rem(17, { toFixedDigits: 1 })).toBe(1.1);
    expect(rem(17, { toFixedDigits: 2 })).toBe(1.06);
    expect(rem(17, { toFixedDigits: 3 })).toBe(1.063);
    expect(rem(17, { toFixedDigits: 4 })).toBe(1.0625);
    expect(rem(17, { toFixedDigits: 10 })).toBe(1.0625);
  });

  it('should throw an error if toFixedDigits is out of range.', () => {
    expect(() => rem(16, { toFixedDigits: -1 })).toThrowError();
    expect(() => rem(16, { toFixedDigits: 101 })).toThrowError();
  });

  it('should throw an error if not executed in a client environment.', () => {
    globalThis.window = undefined as any;

    expect(() => rem(16)).toThrowError();
  });
});
